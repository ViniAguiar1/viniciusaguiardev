# Monorepo e zona `/uses` — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar o portfólio num monorepo Turborepo (moldura como pacote) sem mudar nada para quem visita, e depois servir `/[locale]/uses` de um segundo app Next.js atrás do mesmo domínio via multi-zones — com post em 25/09.

**Architecture:** Etapa 1 move o app para `apps/portfolio` e extrai `@repo/i18n`, `@repo/ui`, `@repo/shell`, `@repo/config`, provando "idêntico" por comparação de HTML e de seletores CSS contra um golden capturado antes de mover qualquer arquivo. Etapa 2 cria `apps/uses` (assetPrefix `/uses-static`, header `x-zone`), o portfólio faz `rewrites` para `USES_ZONE_URL`, e a moldura decide entre navegação client-side e de documento por um mapa de zonas.

**Tech Stack:** pnpm workspaces, Turborepo, Next.js 16.1.6 (Turbopack), React 19.1, Tailwind 4, Vitest, Playwright (descartável, fora do repo).

**Spec:** `docs/superpowers/specs/2026-09-24-monorepo-zona-uses-design.md`

## Global Constraints

- `nvm use 24` antes de `pnpm` (resolve 24.21.0). pnpm só; nunca `npm install`. `packageManager` da raiz continua `pnpm@10.33.0` (hoje em `package.json#packageManager`).
- CI em Node 20; nada pode exigir Node > 20 no portfólio/zona.
- Nomes: pacotes `@repo/i18n`, `@repo/ui`, `@repo/shell`, `@repo/config`; apps `portfolio` e `uses` (campo `name` do `package.json`).
- Dentro de pacotes: **nunca** `@/`; só relativo ou `@repo/*`. Dentro de apps, `@/` continua apontando para a raiz do app.
- Etapa 1 não muda nada visível: golden HTML e conjunto de seletores CSS idênticos (normalizando só hashes/buildId).
- Todo texto visível em 5 locales (`pt`, `en`, `es`, `jp`, `fr`); o guard `i18n-coverage` passa a varrer `packages/`.
- Zona: `assetPrefix: "/uses-static"`, header `x-zone: uses`, `robots.txt` com `Disallow: /`, dev na porta 3001.
- Portfólio: rewrites `/:locale(pt|en|es|jp|fr)/uses` e `/uses-static/:path*` → `USES_ZONE_URL`; produção sem `USES_ZONE_URL` falha o build; dev default `http://localhost:3001`.
- JSON-LD `Organization`, script Umami e fontes `next/font` ficam no `layout.tsx` de cada app.
- Ações externas (push, PR, Root Directory, projeto Vercel, env var) pedem confirmação ao Vinicius na hora.
- Post em 25/09/2026, primeira pessoa, experimento, números medidos, anônimo quanto a empregador. Conversa em PT-BR.

## Review Focus

1. **Classe Tailwind usada só dentro de um pacote** — sem `@source`, some do CSS e o componente fica sem estilo com todos os checks verdes. (Coberto: Task 4 Step 6 e Task 6 Step 4 — comparação do conjunto de seletores CSS contra o golden.)
2. **Navegação client-side para rota de outra zona** — `router.push("/pt/busca")` a partir da zona `uses` daria 404 client-side. (Coberto: Task 7 — testes de `linkMode`; Task 10 — Playwright busca/Home a partir da zona.)
3. **Usuário acessa `/uses` sem locale ou `/pt/uses/`** — deve cair na zona com locale, não em 404 do portfólio. (Coberto: Task 7 — `zoneFor("/pt/uses/")`; Task 10 — `GET /uses` → 308 para `/pt/uses` e servido pela zona.)
4. **Deploy do portfólio sem `USES_ZONE_URL`** — rewrite para `undefined/pt/uses` quebraria só em runtime. (Coberto: Task 9 — `usesRewrites()` lança sem URL em produção.)
5. **Tema entre zonas** — trocar para claro na zona e voltar ao portfólio deve manter claro. (Coberto: Task 10 — Playwright.)

---

## File Structure

**Raiz (Etapa 1)**

| Arquivo | Responsabilidade |
|---|---|
| `pnpm-workspace.yaml` | `apps/*`, `packages/*` |
| `turbo.json` | tarefas `build`, `lint`, `typecheck`, `test`, `aeo`, `dev` |
| `package.json` | scripts que delegam ao turbo; `packageManager`; devDep `turbo` |
| `.github/workflows/ci.yml` | mesmas etapas, via turbo |

**`packages/config`**: `tsconfig.base.json`, `eslint.config.mjs` (fábrica) · **`packages/i18n/src`**: `index.ts` (ex-`lib/i18n.ts`), `server.ts` (ex-`lib/i18n-server.ts`) · **`packages/ui/src`**: `components/*` (ex-`components/ui/*` + `section-eyebrow.tsx`), `utils.ts`, `hooks/use-mobile.ts`, `styles/globals.css` · **`packages/shell/src`**: `app-sidebar.tsx`, `right-sidebar.tsx`, `mobile-header.tsx`, `footer.tsx`, `sidebar-nav-link.tsx`, `search-button.tsx`, `language-toggle.tsx`, `theme-toggle.tsx`, `theme-provider.tsx`, `site-shell.tsx`, `zones.ts`, `zone-link.tsx`, `zones.test.ts`.

**`apps/portfolio`**: tudo que é do app hoje. **`apps/uses`** (Etapa 2): `app/[locale]/layout.tsx`, `app/[locale]/uses/page.tsx`, `app/robots.ts`, `app/globals.css`, `components/editor-config-sheet.tsx`, `proxy.ts`, `next.config.ts`, `package.json`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`.

## Mapa de imports (Tasks 3–5)

| Antes | Depois (em apps) | Depois (dentro de pacotes) |
|---|---|---|
| `@/lib/i18n` | `@repo/i18n` | `@repo/i18n` |
| `@/lib/i18n-server` | `@repo/i18n/server` | `@repo/i18n/server` |
| `@/lib/utils` | `@repo/ui/utils` | `@repo/ui/utils` (no próprio ui: `../utils`) |
| `@/components/ui/<x>` | `@repo/ui/components/<x>` | idem (no próprio ui: `./<x>`) |
| `@/hooks/use-mobile` | `@repo/ui/hooks/use-mobile` | no ui: `../hooks/use-mobile` |
| `@/components/section-eyebrow` | `@repo/ui/components/section-eyebrow` | idem |
| `@/components/<shell>` (9 arquivos da moldura) | `@repo/shell/<shell>` | no shell: `./<shell>` |

---

## ETAPA 1 — Monorepo sem mudar comportamento

### Task 1: Golden do estado atual

**Files:**
- Create (fora do repo): `$SP/golden/capture.py`, `$SP/golden/compare.py`, `$SP/golden/before/**` — onde `$SP=/private/tmp/claude-501/-Users-viniciusaguiar-viniciusaguiardev/47d303de-841c-4774-b4bb-9d190d458917/scratchpad`

**Interfaces:**
- Produces: `python3 $SP/golden/capture.py <port> <outdir>` salva `<outdir>/pages/<slug>.html` para cada URL do sitemap + `/pt/busca` + `/pt/nao-existe-404`, e `<outdir>/selectors.txt` (conjunto ordenado de seletores de todos os CSS linkados na home). `python3 $SP/golden/compare.py <a> <b>` imprime diferenças normalizadas e sai 1 se houver.

- [ ] **Step 1: `capture.py`**

```python
import re, sys, os, urllib.request
port, out = sys.argv[1], sys.argv[2]
base = f"http://localhost:{port}"
os.makedirs(f"{out}/pages", exist_ok=True)

def get(path):
    try:
        with urllib.request.urlopen(base + path) as r:
            return r.status, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", "replace")

_, sm = get("/sitemap.xml")
paths = sorted({re.sub(r"^https?://[^/]+", "", u) for u in re.findall(r"<loc>([^<]+)</loc>", sm)})
paths += ["/pt/busca", "/pt/nao-existe-404"]
for p in paths:
    status, html = get(p)
    name = (p.strip("/") or "root").replace("/", "__")
    open(f"{out}/pages/{name}.html", "w").write(f"<!-- status {status} -->\n{html}")

_, home = get("/pt")
sels = set()
for href in sorted(set(re.findall(r'href="([^"]+\.css[^"]*)"', home))):
    _, css = get(href)
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    for block in re.findall(r"([^{}@;]+)\{", css):
        for s in block.split(","):
            s = s.strip()
            if s:
                sels.add(s)
open(f"{out}/selectors.txt", "w").write("\n".join(sorted(sels)) + "\n")
print(f"{len(paths)} páginas, {len(sels)} seletores")
```

- [ ] **Step 2: `compare.py`**

```python
import re, sys, os, difflib
a, b = sys.argv[1], sys.argv[2]

def norm(s):
    s = re.sub(r"/_next/static/[^\"'\s)]+", "/_next/static/X", s)
    s = re.sub(r"/uses-static/_next/static/[^\"'\s)]+", "/_next/static/X", s)
    s = re.sub(r'"buildId":"[^"]+"', '"buildId":"X"', s)
    s = re.sub(r'nonce="[^"]+"', 'nonce="X"', s)
    s = re.sub(r"\\\"buildId\\\":\\\"[^\\\"]+\\\"", "BUILDID", s)
    s = re.sub(r'"[a-zA-Z0-9_-]{21}"', '"ID"', s)  # ids do flight payload
    return s

bad = 0
pa, pb = sorted(os.listdir(f"{a}/pages")), sorted(os.listdir(f"{b}/pages"))
if pa != pb:
    print("conjunto de páginas difere:", set(pa) ^ set(pb)); bad = 1
for f in sorted(set(pa) & set(pb)):
    x, y = norm(open(f"{a}/pages/{f}").read()), norm(open(f"{b}/pages/{f}").read())
    if x != y:
        bad = 1
        d = list(difflib.unified_diff(x.split(">"), y.split(">"), lineterm="", n=0))[:12]
        print(f"== {f}\n" + "\n".join(d))
sa, sb = set(open(f"{a}/selectors.txt").read().split("\n")), set(open(f"{b}/selectors.txt").read().split("\n"))
if sa != sb:
    bad = 1
    print("seletores só no antes:", sorted(sa - sb)[:30])
    print("seletores só no depois:", sorted(sb - sa)[:30])
print("IDÊNTICO" if not bad else "DIFERENTE")
sys.exit(bad)
```

- [ ] **Step 3: Capturar o golden (branch `feat/monorepo-zona-uses`, antes de mover qualquer arquivo)**

```bash
cd /Users/viniciusaguiar/viniciusaguiardev && nvm use 24
lsof -ti:3457 && echo "PORTA OCUPADA"
pnpm build && (pnpm start -p 3457 > /tmp/claude-501/start.log 2>&1 &)
python3 $SP/golden/capture.py 3457 $SP/golden/before
lsof -ti:3457 | xargs kill; sleep 1; lsof -ti:3457 || echo port-free
```

Expected: `N páginas, M seletores` com N ≥ 130.

- [ ] **Step 4: Sanidade do comparador** — capturar de novo em `$SP/golden/before2` (outro `pnpm build` + start) e rodar `compare.py before before2`.
Expected: `IDÊNTICO`. Se não, ajustar só `norm()` para o que é genuinamente de build (registrar no ledger qual padrão entrou e por quê) até dar idêntico — nunca normalizar conteúdo.

Sem commit (nada no repo).

---

### Task 2: Esqueleto do workspace e app movido para `apps/portfolio`

**Files:**
- Create: `pnpm-workspace.yaml`, `turbo.json`, `packages/config/{package.json,tsconfig.base.json,eslint.config.mjs}`
- Move (git mv): `app components data hooks lib public scripts proxy.ts next.config.ts postcss.config.mjs vitest.config.ts vercel.json components.json eslint.config.mjs tsconfig.json package.json` → `apps/portfolio/` (`docs/`, `.github/`, `.claude/`, `CLAUDE.md`, `README.md`, `LICENSE` ficam na raiz)
- Modify: `package.json` (raiz nova), `apps/portfolio/package.json` (novo, a partir do atual), `apps/portfolio/tsconfig.json`, `apps/portfolio/eslint.config.mjs`, `.gitignore`

**Interfaces:**
- Produces: `pnpm build|lint|typecheck|test|aeo` na raiz executam o turbo; `apps/portfolio` builda sozinho.

- [ ] **Step 1: Mover** (`docs/` fica na raiz; `.env` também — ver Step 5)

```bash
mkdir -p apps/portfolio packages
git mv app components data hooks lib public scripts proxy.ts next.config.ts postcss.config.mjs vitest.config.ts vercel.json components.json eslint.config.mjs tsconfig.json apps/portfolio/
git mv package.json apps/portfolio/package.json
```

- [ ] **Step 2: `pnpm-workspace.yaml`**

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

- [ ] **Step 3: `package.json` da raiz**

```json
{
  "name": "viniciusaguiardev",
  "private": true,
  "packageManager": "pnpm@10.33.0",
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "typecheck": "turbo run typecheck",
    "test": "turbo run test",
    "aeo": "turbo run aeo",
    "blog:cover": "pnpm --filter portfolio blog:cover"
  },
  "devDependencies": {
    "turbo": "^2.11.4"
  }
}
```

Em `apps/portfolio/package.json`: `"name": "portfolio"`, remover `packageManager` (vive na raiz), manter scripts e deps.

- [ ] **Step 4: `turbo.json`**

```json
{
  "$schema": "https://turborepo.com/schema.json",
  "tasks": {
    "build": { "outputs": [".next/**", "!.next/cache/**"], "env": ["USES_ZONE_URL", "NODE_ENV"] },
    "lint": {},
    "typecheck": {},
    "test": {},
    "aeo": { "dependsOn": [] },
    "dev": { "cache": false, "persistent": true }
  }
}
```

- [ ] **Step 5: `.env` e `.gitignore`** — `git mv` não move `.env` (ignorado). `mv .env apps/portfolio/.env` (o `blog:cover` usa `--env-file=.env` relativo ao app). No `.gitignore` da raiz, trocar `/.next/`, `/out/`, `/build`, `/node_modules`, `next-env.d.ts`, `*.tsbuildinfo` por padrões sem barra inicial (`.next/`, `out/`, `node_modules/`, `.turbo/`, `**/next-env.d.ts`) para valerem em todos os apps. `/mfe-angular-inspector/` continua na raiz; mover a pasta física `mfe-angular-inspector/` para fora do caminho não é necessário.

- [ ] **Step 6: `packages/config`**

`packages/config/package.json`:
```json
{ "name": "@repo/config", "private": true, "version": "0.0.0",
  "exports": { "./tsconfig.base.json": "./tsconfig.base.json", "./eslint": "./eslint.config.mjs" } }
```

`packages/config/tsconfig.base.json` = o `compilerOptions` atual **sem** `paths`, `plugins` e `incremental`.

`packages/config/eslint.config.mjs`:
```js
import nextConfig from "eslint-config-next"

export function createConfig(extraIgnores = []) {
  return [
    ...nextConfig,
    { ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts", ...extraIgnores] },
    { files: ["**/components/ui/**", "src/components/**"], rules: { "react-hooks/purity": "off" } },
  ]
}
```
(`eslint-config-next` vira dependência de `@repo/config`.)

`apps/portfolio/eslint.config.mjs`:
```js
import { createConfig } from "@repo/config/eslint"
export default createConfig()
```

`apps/portfolio/tsconfig.json`: `"extends": "@repo/config/tsconfig.base.json"`, mantendo `plugins`, `incremental`, `paths: {"@/*": ["./*"]}`, `include`, `exclude` (sem `mfe-angular-inspector`, que agora é irmão na raiz). `apps/portfolio/package.json` ganha `"@repo/config": "workspace:*"` em devDependencies.

- [ ] **Step 7: `next.config.ts` do portfólio** — acrescentar raiz do Turbopack (pacotes vivem fora do app):

```ts
import path from "node:path"
// ...
turbopack: { root: path.join(__dirname, "../..") },
```

- [ ] **Step 8: vitest do portfólio** — `exclude` volta a `["node_modules", ".next", "scripts"]` (a pasta do MFE não está mais embaixo do app).

- [ ] **Step 9: Instalar e rodar**

```bash
rm -rf node_modules && pnpm install
pnpm lint && pnpm typecheck && pnpm test && pnpm build && pnpm aeo
```
Expected: tudo verde; `Tests 46 passed`; AEO 100/100.

- [ ] **Step 10: Golden**

```bash
cd apps/portfolio && (pnpm start -p 3457 > /tmp/claude-501/start.log 2>&1 &); cd ../..
python3 $SP/golden/capture.py 3457 $SP/golden/after-t2 && python3 $SP/golden/compare.py $SP/golden/before $SP/golden/after-t2
lsof -ti:3457 | xargs kill
```
Expected: `IDÊNTICO`.

- [ ] **Step 11: Commit** — `git add -A && git commit -m "chore(monorepo): workspace pnpm + turbo, app movido para apps/portfolio"`

---

### Task 3: `@repo/i18n`

**Files:**
- Move: `apps/portfolio/lib/i18n.ts` → `packages/i18n/src/index.ts`; `apps/portfolio/lib/i18n-server.ts` → `packages/i18n/src/server.ts`
- Create: `packages/i18n/{package.json,tsconfig.json}`
- Modify: todo import `@/lib/i18n` / `@/lib/i18n-server` em `apps/portfolio`; `apps/portfolio/{package.json,next.config.ts}`

**Interfaces:**
- Produces: `@repo/i18n` (tudo que `lib/i18n.ts` exporta hoje: `LOCALES`, `Locale`, `DEFAULT_LOCALE`, `isLocale`, `localePath`, `stripLocale`, `localeToHtmlLang`, `localeToOgLocale`, `t`, `buildAlternates`, `SITE_URL`); `@repo/i18n/server` (`getLocale`, `getDictionary`, `Dictionary`, reexports).

- [ ] **Step 1: Mover e criar o pacote**

```bash
mkdir -p packages/i18n/src
git mv apps/portfolio/lib/i18n.ts packages/i18n/src/index.ts
git mv apps/portfolio/lib/i18n-server.ts packages/i18n/src/server.ts
```

`packages/i18n/package.json`:
```json
{ "name": "@repo/i18n", "private": true, "version": "0.0.0", "type": "module",
  "exports": { ".": "./src/index.ts", "./server": "./src/server.ts" },
  "scripts": { "typecheck": "tsc --noEmit" },
  "peerDependencies": { "next": "16.1.6" },
  "devDependencies": { "@repo/config": "workspace:*", "typescript": "^5", "next": "16.1.6", "@types/node": "^20" } }
```

`packages/i18n/tsconfig.json`: `{ "extends": "@repo/config/tsconfig.base.json", "include": ["src"] }`

Em `server.ts`, trocar `from "@/lib/i18n"` por `from "./index"`.

- [ ] **Step 2: Reescrever imports do app** (script descartável em `$SP/rewrite.mjs`, com a tabela "Mapa de imports"; roda sobre `apps/portfolio/**/*.{ts,tsx}`, trocando só especificadores exatos entre aspas)

```js
import { readFileSync, writeFileSync } from "node:fs"
import { globSync } from "node:fs"
const map = JSON.parse(process.argv[3])           // { "@/lib/i18n": "@repo/i18n", ... }
for (const f of globSync(`${process.argv[2]}/**/*.{ts,tsx}`, { exclude: (p) => p.includes("node_modules") || p.includes(".next") })) {
  let s = readFileSync(f, "utf8"), o = s
  for (const [from, to] of Object.entries(map)) s = s.replaceAll(`"${from}"`, `"${to}"`)
  if (s !== o) { writeFileSync(f, s); console.log("rewrote", f) }
}
```

Run: `node $SP/rewrite.mjs apps/portfolio '{"@/lib/i18n":"@repo/i18n","@/lib/i18n-server":"@repo/i18n/server"}'`
Depois: `grep -rn '"@/lib/i18n' apps/portfolio --include=*.ts --include=*.tsx` → Expected: nada.

- [ ] **Step 3: Ligar no app** — `apps/portfolio/package.json` deps: `"@repo/i18n": "workspace:*"`; `next.config.ts`: `transpilePackages: ["@repo/i18n"]`. `pnpm install`.

- [ ] **Step 4: Verificar** — `pnpm lint && pnpm typecheck && pnpm test && pnpm build && pnpm aeo` + golden (`after-t3`) igual ao `before`.
Expected: verdes; `IDÊNTICO`.

- [ ] **Step 5: Commit** — `git commit -am "refactor(monorepo): extrai @repo/i18n"` (com `git add packages/i18n`).

---

### Task 4: `@repo/ui` + Tailwind multi-pacote

**Files:**
- Move: `apps/portfolio/components/ui/*` → `packages/ui/src/components/`; `apps/portfolio/components/section-eyebrow.tsx` → `packages/ui/src/components/section-eyebrow.tsx`; `apps/portfolio/lib/utils.ts` → `packages/ui/src/utils.ts`; `apps/portfolio/hooks/use-mobile.ts` → `packages/ui/src/hooks/use-mobile.ts`; `apps/portfolio/app/globals.css` → `packages/ui/src/styles/globals.css`; `apps/portfolio/components.json` → `packages/ui/components.json`
- Create: `packages/ui/{package.json,tsconfig.json}`, novo `apps/portfolio/app/globals.css`
- Modify: imports no app e dentro do ui; `apps/portfolio/lib/design-system.test.ts`

**Interfaces:**
- Produces: `@repo/ui/components/<x>`, `@repo/ui/utils` (`cn`, `MONO_CHIP`), `@repo/ui/hooks/use-mobile` (`useIsMobile`), `@repo/ui/globals.css`.

- [ ] **Step 1: Mover** (comandos `git mv` conforme **Files**) e criar `packages/ui/package.json`:

```json
{ "name": "@repo/ui", "private": true, "version": "0.0.0", "type": "module",
  "exports": {
    "./components/*": "./src/components/*.tsx",
    "./utils": "./src/utils.ts",
    "./hooks/*": "./src/hooks/*.ts",
    "./globals.css": "./src/styles/globals.css"
  },
  "scripts": { "typecheck": "tsc --noEmit", "lint": "eslint src" },
  "dependencies": { "@radix-ui/react-dialog": "^1.1.15", "@radix-ui/react-dropdown-menu": "^2.1.16", "@radix-ui/react-separator": "^1.1.7", "@radix-ui/react-slot": "^1.2.3", "@radix-ui/react-tooltip": "^1.2.8", "class-variance-authority": "^0.7.1", "clsx": "^2.1.1", "lucide-react": "^0.545.0", "tailwind-merge": "^3.3.1", "tw-animate-css": "^1.4.0" },
  "peerDependencies": { "react": "19.1.0", "react-dom": "19.1.0" },
  "devDependencies": { "@repo/config": "workspace:*", "typescript": "^5", "@types/react": "^19", "@types/react-dom": "^19", "eslint": "^9" } }
```
`packages/ui/tsconfig.json`: extends base, `"include": ["src"]`, `"compilerOptions": {"jsx": "react-jsx"}`. `packages/ui/eslint.config.mjs`: `import { createConfig } from "@repo/config/eslint"; export default createConfig()`.

- [ ] **Step 2: Imports dentro do ui** — em `packages/ui/src/components/*`: `@/lib/utils` → `../utils`; `@/components/ui/<x>` → `./<x>`; `@/hooks/use-mobile` → `../hooks/use-mobile`. `components.json`: `"css": "src/styles/globals.css"`, aliases `components`/`ui` → `@repo/ui/components`, `utils` → `@repo/ui/utils`, `hooks` → `@repo/ui/hooks`.

- [ ] **Step 3: Imports no app** — `node $SP/rewrite.mjs apps/portfolio '{"@/lib/utils":"@repo/ui/utils","@/hooks/use-mobile":"@repo/ui/hooks/use-mobile","@/components/section-eyebrow":"@repo/ui/components/section-eyebrow","@/components/ui/button":"@repo/ui/components/button","@/components/ui/dropdown-menu":"@repo/ui/components/dropdown-menu","@/components/ui/input":"@repo/ui/components/input","@/components/ui/separator":"@repo/ui/components/separator","@/components/ui/sheet":"@repo/ui/components/sheet","@/components/ui/sidebar":"@repo/ui/components/sidebar","@/components/ui/skeleton":"@repo/ui/components/skeleton","@/components/ui/tooltip":"@repo/ui/components/tooltip"}'`
Depois: `grep -rn '"@/components/ui\|"@/lib/utils\|"@/hooks' apps/portfolio --include=*.ts --include=*.tsx` → nada.

- [ ] **Step 4: CSS do app** — novo `apps/portfolio/app/globals.css`:

```css
@import "@repo/ui/globals.css";
/* Tailwind 4 só gera classes que encontra. Os pacotes vivem fora do app:
   sem estes @source, componentes da moldura saem sem estilo e nenhum check
   acusa. Caminhos relativos a este arquivo. */
@source "../../../packages/ui/src";
@source "../../../packages/shell/src";
```
Layout continua `import "../globals.css"`. `apps/portfolio/package.json`: `"@repo/ui": "workspace:*"`; `transpilePackages: ["@repo/i18n", "@repo/ui"]`.

- [ ] **Step 5: `design-system.test.ts`** — `SCAN_DIRS` passa a `["app", "components", "lib", "../../packages/ui/src", "../../packages/shell/src"]` e `SKIPPED_DIR` passa a considerar `path.join("..", "..", "packages", "ui", "src", "components")` além de `components/ui` (os geradores do shadcn). Rodar `pnpm --filter portfolio test` antes do resto: Expected: passa (mesmos arquivos, novos caminhos).

- [ ] **Step 6: Verificar** — `pnpm install && pnpm lint && pnpm typecheck && pnpm test && pnpm build && pnpm aeo` + golden `after-t4` vs `before`.
Expected: verdes; `IDÊNTICO` (incluindo `seletores` — se aparecer "seletores só no antes", é `@source` faltando/errado).

- [ ] **Step 7: Commit** — `refactor(monorepo): extrai @repo/ui com Tailwind varrendo os pacotes`

---

### Task 5: `@repo/shell` + zonas (Etapa 1: uma zona só)

**Files:**
- Move → `packages/shell/src/`: `app-sidebar.tsx`, `right-sidebar.tsx`, `mobile-header.tsx`, `footer.tsx`, `sidebar-nav-link.tsx`, `search-button.tsx`, `language-toggle.tsx`, `theme-toggle.tsx`, `theme-provider.tsx`
- Create: `packages/shell/{package.json,tsconfig.json,eslint.config.mjs}`, `packages/shell/src/{zones.ts,zones.test.ts,zone-link.tsx,site-shell.tsx}`, `packages/shell/vitest.config.ts`
- Modify: `apps/portfolio/app/[locale]/layout.tsx`, `apps/portfolio/lib/i18n-coverage.test.ts`

**Interfaces:**
- Produces:
  - `type Zone = "portfolio"` (Etapa 2 acrescenta `"uses"`)
  - `zoneFor(pathname: string): Zone`
  - `linkMode(current: Zone, href: string): "client" | "document" | "external"`
  - `<ZoneLink href zone? ...anchorProps>` — lê a zona do contexto
  - `useZoneNavigate(): (href: string) => void`
  - `<SiteShell zone: Zone>{children}</SiteShell>` + `ZoneContext`

- [ ] **Step 1: Teste das zonas (Etapa 1)**

`packages/shell/src/zones.test.ts`:
```ts
import { describe, it, expect } from "vitest"
import { zoneFor, linkMode } from "./zones"

describe("zonas — etapa 1", () => {
  it("todo caminho é do portfolio", () => {
    for (const p of ["/pt", "/en/projetos", "/pt/uses", "/pt/posts/x"]) expect(zoneFor(p)).toBe("portfolio")
  })
  it("mesma zona navega no cliente", () => {
    expect(linkMode("portfolio", "/pt/sobre")).toBe("client")
  })
  it("externos e mailto passam direto", () => {
    expect(linkMode("portfolio", "https://github.com/x")).toBe("external")
    expect(linkMode("portfolio", "mailto:a@b.c")).toBe("external")
  })
})
```
`packages/shell/vitest.config.ts`: `export default { test: { environment: "node", include: ["src/**/*.test.ts"] } }`; `package.json` script `"test": "vitest run"`.

Run: `pnpm --filter @repo/shell test` → FAIL (módulo inexistente).

- [ ] **Step 2: `zones.ts`**

```ts
// A que app (zona) pertence cada caminho do domínio. Navegar dentro da mesma
// zona pode ser client-side; atravessar zonas exige carregar o documento,
// porque a rota não existe no app atual.
export type Zone = "portfolio"

export function zoneFor(_pathname: string): Zone {
  return "portfolio"
}

export type LinkMode = "client" | "document" | "external"

export function linkMode(current: Zone, href: string): LinkMode {
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//")) return "external"
  const pathname = href.split(/[?#]/)[0] || "/"
  return zoneFor(pathname) === current ? "client" : "document"
}
```
Run → PASS.

- [ ] **Step 3: `zone-link.tsx` e `site-shell.tsx`**

```tsx
// zone-link.tsx
"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createContext, useContext, type AnchorHTMLAttributes, type ReactNode } from "react"
import { linkMode, type Zone } from "./zones"

export const ZoneContext = createContext<Zone>("portfolio")

export function ZoneProvider({ zone, children }: { zone: Zone; children: ReactNode }) {
  return <ZoneContext.Provider value={zone}>{children}</ZoneContext.Provider>
}

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode }

export function ZoneLink({ href, children, ...rest }: Props) {
  const zone = useContext(ZoneContext)
  if (linkMode(zone, href) === "client") return <Link href={href} {...rest}>{children}</Link>
  return <a href={href} {...rest}>{children}</a>
}

export function useZoneNavigate() {
  const zone = useContext(ZoneContext)
  const router = useRouter()
  return (href: string) => {
    if (linkMode(zone, href) === "client") router.push(href)
    else window.location.assign(href)
  }
}
```

```tsx
// site-shell.tsx — moldura de dentro do <body>; <html>, fontes, Umami e JSON-LD ficam no layout do app
import type { ReactNode } from "react"
import { SidebarProvider } from "@repo/ui/components/sidebar"
import { AppSidebar } from "./app-sidebar"
import { RightSidebar } from "./right-sidebar"
import { MobileHeader } from "./mobile-header"
import { Footer } from "./footer"
import { ThemeProvider } from "./theme-provider"
import { ZoneProvider } from "./zone-link"
import type { Zone } from "./zones"

export function SiteShell({ zone, children }: { zone: Zone; children: ReactNode }) {
  return (
    <ZoneProvider zone={zone}>
      <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
            <MobileHeader />
            {children}
            <Footer />
          </main>
          <RightSidebar />
        </SidebarProvider>
      </ThemeProvider>
    </ZoneProvider>
  )
}
```
(Copiar os props do `ThemeProvider` e o markup **exatamente** do `layout.tsx` atual — o golden compara.)

- [ ] **Step 4: Mover a moldura e trocar navegação**
  - `git mv` dos 9 arquivos para `packages/shell/src/`.
  - Imports internos: `@/components/<shell>` → `./<shell>`; `@/components/ui/*` → `@repo/ui/components/*`; `@/lib/utils` → `@repo/ui/utils`; `@/lib/i18n*` → `@repo/i18n` / `@repo/i18n/server`.
  - `sidebar-nav-link.tsx`: `Link` de `next/link` → `ZoneLink` de `./zone-link`.
  - `footer.tsx`, `right-sidebar.tsx`: `Link` → `ZoneLink`.
  - `search-button.tsx`: `const navigate = useZoneNavigate()`; `router.push(searchPath)` → `navigate(searchPath)` (nos dois lugares); remover `useRouter`.
  - `language-toggle.tsx`: idem, `router.push(localePath(next, rest))` → `navigate(localePath(next, rest))`.
  - `packages/shell/package.json` (exports `"./*": "./src/*.tsx"`, `"./zones": "./src/zones.ts"`; deps `next-themes`, `react-icons`, `lucide-react`, `@repo/ui`, `@repo/i18n`; peers `next`, `react`), `tsconfig.json`, `eslint.config.mjs` como nos outros pacotes.

- [ ] **Step 5: Layout do portfólio** — `apps/portfolio/app/[locale]/layout.tsx` troca o bloco `ThemeProvider…/ThemeProvider` por `<SiteShell zone="portfolio">{children}</SiteShell>`, mantendo `<html>`, fontes, `<Script>` Umami e `<JsonLd>` Organization onde estão. Rewrite de imports no app: `@/components/<shell>` → `@repo/shell/<shell>` (para qualquer outro consumidor). `transpilePackages: ["@repo/i18n", "@repo/ui", "@repo/shell"]`, dep `"@repo/shell": "workspace:*"`.

- [ ] **Step 6: Guard de i18n** — `apps/portfolio/lib/i18n-coverage.test.ts`: `SCAN_DIRS` passa a `["app", "components", "../../packages/shell/src", "../../packages/ui/src"]` e o `SKIPPED_DIR` equivalente para `../../packages/ui/src/components` (shadcn). Adicionar teste de sanidade que falha se a varredura não achar nenhum arquivo de `packages/shell/src`:

```ts
  it("varre a moldura em packages/shell", () => {
    const files = collectFiles("../../packages/shell/src")
    expect(files.some((f) => f.endsWith("footer.tsx"))).toBe(true)
  })
```

- [ ] **Step 7: Verificar** — `pnpm install && pnpm lint && pnpm typecheck && pnpm test && pnpm build && pnpm aeo` + golden `after-t5` vs `before`.
Expected: verdes; `IDÊNTICO`.

- [ ] **Step 8: Commit** — `refactor(monorepo): extrai @repo/shell com mapa de zonas`

---

### Task 6: CI, docs e fechamento da Etapa 1

**Files:**
- Modify: `.github/workflows/ci.yml`, `CLAUDE.md`, `README.md`, `apps/portfolio/package.json` (script `aeo` já existe), skills do projeto em `.claude/skills/*` que citam caminhos (`data/posts`, `app/`…) — só caminhos.

- [ ] **Step 1: CI** — manter passos; `pnpm run lint|typecheck|test|build|aeo` na raiz já delegam ao turbo. Acrescentar cache do turbo:

```yaml
      - uses: actions/cache@v4
        with:
          path: .turbo
          key: turbo-${{ runner.os }}-${{ github.sha }}
          restore-keys: turbo-${{ runner.os }}-
```
e `env: TURBO_CACHE_DIR: .turbo` no job.

- [ ] **Step 2: Docs** — `CLAUDE.md`: estrutura `apps/`+`packages/`, onde mora cada coisa (tabela do "Mapa de imports"), regra "nunca `@/` em pacotes", `@source` obrigatório, Root Directory `apps/portfolio` na Vercel. Caminhos antigos (`lib/i18n.ts`, `components/language-toggle.tsx`, etc.) atualizados na seção "Adding a locale". `README.md`: comandos.

- [ ] **Step 3: Rodada limpa** — `rm -rf node_modules apps/*/node_modules packages/*/node_modules .turbo && pnpm install --frozen-lockfile && pnpm lint && pnpm typecheck && pnpm test && pnpm build && pnpm aeo`.
Expected: verdes.

- [ ] **Step 4: Golden final da Etapa 1** — `after-e1` vs `before` → `IDÊNTICO`. Registrar no ledger nº de páginas e seletores comparados.

- [ ] **Step 5: Commit** — `chore(monorepo): CI via turbo e docs da nova estrutura`

- [ ] **Step 6: (confirmar) Push + PR da Etapa 1** — PR explica a mudança de Root Directory. **O Vinicius muda o Root Directory para `apps/portfolio` e faz o merge.** Depois do deploy de produção, verificar `curl -s https://viniciusaguiardev.com.br/pt` 200 e o golden contra produção (`capture.py` apontado para o domínio real exige trocar `base`; alternativa: comparar 5 páginas principais à mão).

---

## ETAPA 2 — Zona `/uses` (branch nova a partir da `main` com a Etapa 1)

### Task 7: Zonas com `uses`

**Files:**
- Modify: `packages/shell/src/zones.ts`, `packages/shell/src/zones.test.ts`

**Interfaces:**
- Produces: `type Zone = "portfolio" | "uses"`; `zoneFor`, `linkMode` com a semântica abaixo; `USES_PATH_PATTERN` (string) para os rewrites.

- [ ] **Step 1: Testes novos** (substituem os da Etapa 1 que diziam "tudo é portfolio")

```ts
import { describe, it, expect } from "vitest"
import { zoneFor, linkMode } from "./zones"
import { LOCALES } from "@repo/i18n"

describe("zoneFor", () => {
  it("uses em todos os locales, com ou sem barra final e subcaminhos", () => {
    for (const l of LOCALES) {
      expect(zoneFor(`/${l}/uses`)).toBe("uses")
      expect(zoneFor(`/${l}/uses/`)).toBe("uses")
      expect(zoneFor(`/${l}/uses/algo`)).toBe("uses")
    }
  })
  it("não confunde prefixo nem locale inválido", () => {
    expect(zoneFor("/pt/usesx")).toBe("portfolio")
    expect(zoneFor("/de/uses")).toBe("portfolio")
    expect(zoneFor("/pt/posts/uses")).toBe("portfolio")
    expect(zoneFor("/pt")).toBe("portfolio")
  })
  it("/uses sem locale é da zona uses (o proxy dela redireciona para /pt/uses)", () => {
    expect(zoneFor("/uses")).toBe("uses")
  })
})

describe("linkMode", () => {
  it("mesma zona → client; outra zona → document", () => {
    expect(linkMode("uses", "/en/uses")).toBe("client")
    expect(linkMode("uses", "/pt/busca")).toBe("document")
    expect(linkMode("uses", "/pt")).toBe("document")
    expect(linkMode("portfolio", "/pt/uses")).toBe("document")
    expect(linkMode("portfolio", "/pt/projetos")).toBe("client")
  })
  it("query e hash não mudam a zona", () => {
    expect(linkMode("portfolio", "/pt/uses?x=1#y")).toBe("document")
  })
  it("externos passam direto", () => {
    expect(linkMode("uses", "https://github.com")).toBe("external")
  })
})
```
Run: `pnpm --filter @repo/shell test` → FAIL.

- [ ] **Step 2: Implementação**

```ts
import { LOCALES } from "@repo/i18n"

export type Zone = "portfolio" | "uses"

const LOCALE_GROUP = `(?:${LOCALES.join("|")})`
const USES = new RegExp(`^(?:/${LOCALE_GROUP})?/uses(?:/.*)?$`)

// Usado pelos rewrites do portfólio (path-to-regexp do Next).
export const USES_LOCALE_PARAM = `:locale(${LOCALES.join("|")})`

export function zoneFor(pathname: string): Zone {
  return USES.test(pathname) ? "uses" : "portfolio"
}
```
(`linkMode` fica igual.) Run → PASS. `@repo/shell` passa a depender de `@repo/i18n` (já depende).

- [ ] **Step 3: Commit** — `feat(shell): mapa de zonas com a zona uses`

---

### Task 8: App `apps/uses`

**Files:**
- Create: `apps/uses/{package.json,next.config.ts,proxy.ts,tsconfig.json,postcss.config.mjs,eslint.config.mjs,app/globals.css,app/robots.ts,app/[locale]/layout.tsx}`
- Move: `apps/portfolio/app/[locale]/uses/page.tsx` → `apps/uses/app/[locale]/uses/page.tsx`; `apps/portfolio/components/editor-config-sheet.tsx` → `apps/uses/components/editor-config-sheet.tsx`
- Test: `apps/uses/app/robots.test.ts`, `apps/uses/vitest.config.ts`

**Interfaces:**
- Consumes: `SiteShell`, `Zone` (Task 7); `@repo/i18n`, `@repo/i18n/server`, `@repo/ui/*`.
- Produces: app que responde `/:locale/uses` com header `x-zone: uses` e assets em `/uses-static/_next/...`.

- [ ] **Step 1: Teste do robots**

```ts
import { describe, it, expect } from "vitest"
import robots from "./robots"

describe("robots da zona", () => {
  it("bloqueia tudo no domínio direto da zona", () => {
    expect(robots()).toEqual({ rules: [{ userAgent: "*", disallow: "/" }] })
  })
})
```
`apps/uses/vitest.config.ts` = o do portfólio (alias `@` → raiz do app). Run → FAIL.

- [ ] **Step 2: `app/robots.ts`**

```ts
import type { MetadataRoute } from "next"

// Este domínio é o deploy da zona. Quem indexa a /uses chega pelo domínio
// principal, cujo robots é do portfólio; aqui é conteúdo duplicado.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", disallow: "/" }] }
}
```
Run → PASS.

- [ ] **Step 3: `next.config.ts`**

```ts
import path from "node:path"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Assets da zona não podem colidir com os do portfólio no mesmo domínio:
  // o portfólio reescreve /uses-static/* para cá.
  assetPrefix: "/uses-static",
  transpilePackages: ["@repo/i18n", "@repo/ui", "@repo/shell"],
  turbopack: { root: path.join(__dirname, "../..") },
  async headers() {
    return [{ source: "/(.*)", headers: [{ key: "x-zone", value: "uses" }] }]
  },
}

export default nextConfig
```

- [ ] **Step 4: `proxy.ts`** — cópia do `proxy.ts` do portfólio (mesmos `x-locale`/`x-pathname`), com redirect de caminho sem locale para `/${DEFAULT_LOCALE}${pathname}`, importando de `@repo/i18n`; `matcher: ["/((?!_next|uses-static|api|.*\\..*).*)"]`.

- [ ] **Step 5: Layout** — `apps/uses/app/[locale]/layout.tsx` = o do portfólio com `<SiteShell zone="uses">`, mesmas fontes, mesmo Umami e mesmo JSON-LD Organization, `generateStaticParams` com `LOCALES`, `generateMetadata` com o mesmo `metadataBase`/template de título. `app/globals.css` idêntico ao do portfólio (import + 2 `@source`). `postcss.config.mjs`, `eslint.config.mjs`, `tsconfig.json` como no portfólio.

- [ ] **Step 6: Página** — `git mv` da página e do `editor-config-sheet`; imports da página já estão em `@repo/*` (Etapa 1) exceto `@/components/editor-config-sheet`, que continua válido no novo app.

- [ ] **Step 7: `package.json`** — `name: "uses"`; scripts `dev: next dev --turbopack -p 3001`, `build: next build --turbopack`, `start: next start -p 3001`, `lint`, `typecheck`, `test`; deps iguais às necessárias (next, react, react-dom, next-themes, lucide-react, @repo/*); devDeps (tailwind, postcss, typescript, vitest, @types/*).

- [ ] **Step 8: Verificar** — `pnpm install && pnpm --filter uses build && pnpm --filter uses test && pnpm --filter uses typecheck && pnpm --filter uses lint`.
Expected: verde; build lista `/[locale]/uses` com 5 páginas estáticas.

- [ ] **Step 9: Commit** — `feat(uses): zona /uses como app Next.js próprio`

---

### Task 9: Portfólio reescreve `/uses` para a zona

**Files:**
- Create: `apps/portfolio/lib/zones-rewrites.ts`, `apps/portfolio/lib/zones-rewrites.test.ts`
- Modify: `apps/portfolio/next.config.ts`; delete `apps/portfolio/app/[locale]/uses/` (já movido na Task 8)

**Interfaces:**
- Consumes: `USES_LOCALE_PARAM` (Task 7).
- Produces: `usesRewrites(env: { USES_ZONE_URL?: string; NODE_ENV?: string }): { source: string; destination: string }[]`

- [ ] **Step 1: Testes**

```ts
import { describe, it, expect } from "vitest"
import { usesRewrites } from "./zones-rewrites"

describe("usesRewrites", () => {
  it("reescreve a página e os assets da zona", () => {
    expect(usesRewrites({ USES_ZONE_URL: "https://uses.example.com", NODE_ENV: "production" })).toEqual([
      { source: "/:locale(pt|en|es|jp|fr)/uses", destination: "https://uses.example.com/:locale/uses" },
      { source: "/:locale(pt|en|es|jp|fr)/uses/:path*", destination: "https://uses.example.com/:locale/uses/:path*" },
      { source: "/uses", destination: "https://uses.example.com/uses" },
      { source: "/uses-static/:path*", destination: "https://uses.example.com/uses-static/:path*" },
    ])
  })
  it("remove barra final da URL", () => {
    expect(usesRewrites({ USES_ZONE_URL: "https://u.com/", NODE_ENV: "production" })[0].destination).toBe("https://u.com/:locale/uses")
  })
  it("em dev usa localhost:3001 por padrão", () => {
    expect(usesRewrites({ NODE_ENV: "development" })[0].destination).toBe("http://localhost:3001/:locale/uses")
  })
  it("em produção sem USES_ZONE_URL falha alto", () => {
    expect(() => usesRewrites({ NODE_ENV: "production" })).toThrow(/USES_ZONE_URL/)
  })
})
```
Run → FAIL.

- [ ] **Step 2: Implementação**

```ts
import { USES_LOCALE_PARAM } from "@repo/shell/zones"

type Env = { USES_ZONE_URL?: string; NODE_ENV?: string }

// /uses é servida por outro app (apps/uses). Sem a URL em produção o rewrite
// apontaria para "undefined/..." e só quebraria em runtime — então o build falha.
export function usesRewrites(env: Env) {
  const raw = env.USES_ZONE_URL ?? (env.NODE_ENV === "production" ? undefined : "http://localhost:3001")
  if (!raw) throw new Error("USES_ZONE_URL é obrigatória no build de produção (URL do deploy da zona /uses)")
  const zone = raw.replace(/\/$/, "")
  return [
    { source: `/${USES_LOCALE_PARAM}/uses`, destination: `${zone}/:locale/uses` },
    { source: `/${USES_LOCALE_PARAM}/uses/:path*`, destination: `${zone}/:locale/uses/:path*` },
    { source: "/uses", destination: `${zone}/uses` },
    { source: "/uses-static/:path*", destination: `${zone}/uses-static/:path*` },
  ]
}
```
Run → PASS.

- [ ] **Step 3: `next.config.ts`** — `async rewrites() { return usesRewrites(process.env) }`. O `proxy.ts` do portfólio precisa **não** redirecionar `/uses` (sem locale) para `/pt/uses` antes do rewrite? Não importa: o redirect leva a `/pt/uses`, que é reescrito. Manter.

- [ ] **Step 4: Verificar** — `pnpm test && pnpm typecheck && pnpm lint`; `USES_ZONE_URL=http://localhost:3001 pnpm --filter portfolio build` → verde; `NODE_ENV=production pnpm --filter portfolio build` **sem** a variável → falha com a mensagem (confirmar e seguir).

- [ ] **Step 5: Commit** — `feat(portfolio): /uses reescrita para a zona via USES_ZONE_URL`

---

### Task 10: Deploy independente, dev local e verificação real

**Files:**
- Modify: `turbo.json` (dev), `apps/portfolio/package.json` (`dev` na 3000), `CLAUDE.md` (como rodar as duas zonas)
- Create (fora do repo): `$SP/e2e/zones.mjs`

- [ ] **Step 1: Ignored Build Step** — documentar em `CLAUDE.md` e no PR: nos dois projetos Vercel, "Ignored Build Step" = `npx turbo-ignore --fallback=HEAD^1`. Verificar localmente a decisão:

```bash
git stash -u  # se houver algo
npx turbo-ignore portfolio --fallback=HEAD^1; echo portfolio=$?
npx turbo-ignore uses --fallback=HEAD^1; echo uses=$?
```
Anotar os códigos (0 = pula build, 1 = builda) para o último commit, que mexe só no portfólio.

- [ ] **Step 2: Build de produção das duas zonas e servir**

```bash
pnpm --filter uses build && (cd apps/uses && pnpm start > /tmp/claude-501/uses.log 2>&1 &)
USES_ZONE_URL=http://localhost:3001 pnpm --filter portfolio build
(cd apps/portfolio && pnpm start -p 3457 > /tmp/claude-501/start.log 2>&1 &)
```

- [ ] **Step 3: Playwright** — `$SP/e2e/zones.mjs` (viewport 1440×900) imprime `true` para cada item:
  1. `GET http://localhost:3457/pt/uses` → status 200 e `response.headers()["x-zone"] === "uses"`.
  2. Nenhuma request `/uses-static/...` com status ≥ 400; nenhum erro de console.
  3. Na `/pt/uses`, trocar idioma para inglês pelo `LanguageToggle` → URL `/en/uses` **sem** novo documento (`page.on("framenavigated")` + `performance.getEntriesByType("navigation").length` inalterado, ou marcador `window.__marker` sobrevive).
  4. Na `/en/uses`, clicar em Home da sidebar → novo documento (marcador some) e URL `/en`; header `x-zone` ausente.
  5. Na home do portfólio, clicar no link da sidebar para Uses/Ferramentas → novo documento com `x-zone: uses`.
  6. `⌘K` na zona → `/xx/busca` com novo documento.
  7. Tema: na zona, trocar para claro; ir para a home; `document.documentElement.dataset.theme === "light"`.
  8. `GET http://localhost:3001/robots.txt` contém `Disallow: /`; `GET http://localhost:3457/robots.txt` **não** bloqueia `/`.
  9. `GET http://localhost:3457/uses` → termina em `/pt/uses` servido pela zona.
  10. Medição: mediana de 5 navegações client-side (idioma dentro da zona) vs. 5 entre zonas (zona → home), em ms até `load`.

- [ ] **Step 4: Golden da `/uses`** — capturar `/xx/uses` (5 locales) pelo portfólio na 3457 e comparar com `$SP/golden/before/pages/xx__uses.html` usando `compare.py` num diretório só com essas 5 páginas. Expected: diferenças **apenas** em caminhos de asset (`/uses-static/...`) — ajustar `norm()` já cobre; qualquer diferença de texto bloqueia.

- [ ] **Step 5: Encerrar servidores** — `lsof -ti:3457 | xargs kill; lsof -ti:3001 | xargs kill`; conferir portas livres.

- [ ] **Step 6: Commit** — `chore: dev das duas zonas e docs de deploy independente`

---

### Task 11: Deploy real (ações do Vinicius) e medições

- [ ] **Step 1: (Vinicius)** criar projeto Vercel `uses` (Root Directory `apps/uses`, Ignored Build Step `npx turbo-ignore --fallback=HEAD^1`), escolher domínio; no projeto do portfólio, `USES_ZONE_URL=<https://domínio-da-zona>` e o mesmo Ignored Build Step.
- [ ] **Step 2: Verificar a zona de fora** — `curl -sI <zona>/pt/uses` (200, `x-zone: uses`), `curl -s <zona>/robots.txt` (`Disallow: /`).
- [ ] **Step 3: Verificar pelo preview do PR do portfólio** — `/pt/uses` com `x-zone: uses`; Playwright da Task 10 apontado para o preview (itens 1–7).
- [ ] **Step 4: Medições** — anotar no ledger: tamanho da moldura compartilhada (`wc -l packages/shell/src/*.tsx packages/ui/src/**/*`), nº de arquivos por pacote, decisão do `turbo-ignore` para 3 commits sintéticos (só zona, só portfólio, só shell — em branch descartável, sem push), medianas da Task 10 Step 3 item 10.

---

### Task 12: O post (25/09)

**Files:**
- Create: `apps/portfolio/data/posts/route-based-micro-frontend-monorepo.json`, `apps/portfolio/public/blog/route-based-micro-frontend-monorepo/{cover.webp,og.jpg}`

- [ ] **Step 1:** Escrever em inglês (arco do spec §"O post"), `date` 25/09/2026 nos 5 formatos, `publishedAt: "2026-09-25"`, tag Frontend/Architecture, link para o post de 24/09 no locale do leitor, blocos `code` idênticos nos 5 locales (trechos reais de `zones.ts`, `usesRewrites`, `next.config` da zona). Números só do ledger.
- [ ] **Step 2:** Traduzir para pt/es/jp/fr com script descartável que afirma estrutura idêntica.
- [ ] **Step 3:** `coverSubject` + `pnpm blog:cover route-based-micro-frontend-monorepo`, escolher com `--pick`, conferir `og.jpg`/`cover.webp`.
- [ ] **Step 4:** Mostrar PT ao Vinicius; ajustes nos 5 locales.
- [ ] **Step 5:** `pnpm test && pnpm build && pnpm aeo`; commit `feat(blog): post sobre micro frontend por rota com monorepo`.

---

### Task 13: Checks finais, revisão e PR da Etapa 2 (confirmar antes do push)

- [ ] **Step 1:** Rodada limpa (`--frozen-lockfile`) + `lint typecheck test build aeo` + Playwright da Task 10.
- [ ] **Step 2:** Revisão final independente da branch (review-package) — reclassificar por efeito; corrigir Critical/Important com teste que falha antes.
- [ ] **Step 3: (confirmar)** push + PR com o passo a passo de Vercel (projeto `uses`, `USES_ZONE_URL`, Ignored Build Step); link para o Vinicius.
