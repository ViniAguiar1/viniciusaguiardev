# Micro frontend Angular no blog — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Um post-experimento cujo bloco central é um app Angular (repo e deploy próprios) carregado em runtime dentro da página Next.js do portfólio.

**Architecture:** O MFE é um app Angular 22 zoneless compilado para um único ES module (`inspector.js`) que registra o custom element `<mfe-inspector>` via Angular Elements, publicado num projeto Vercel próprio. O portfólio ganha um tipo de bloco `mfe` (validado por allowlist de origem) e um componente client que importa o módulo remoto quando o bloco entra no viewport, passa `locale`/`theme` como entrada, escuta `mfe:ping` como saída e degrada para um aviso em caso de falha.

**Tech Stack:** Next.js 16 / React 19 / TypeScript / Vitest (portfólio); Angular 22.2 + `@angular/elements` + Vitest via `ng test` (MFE); Vercel.

**Spec:** `docs/superpowers/specs/2026-09-24-mfe-angular-post-design.md`

## Global Constraints

- Sempre `nvm use 24` antes de `pnpm` (só existe sob Node 24). Gerenciador: **pnpm** nos dois projetos; nunca `npm install`.
- Portfólio: tudo numa branch só, `feat/blog-mfe-angular`.
- MFE mora em `mfe-angular-inspector/` na raiz do portfólio, **no `.gitignore` do portfólio**, com git próprio → `https://github.com/ViniAguiar1/mfe-angular-inspector` (repo hoje vazio e privado; vira público).
- URL do módulo: `https://mfe-angular-inspector.vercel.app/inspector.js`. Tag: `mfe-inspector`.
- Allowlist de origem: `MFE_ORIGINS = ["https://mfe-angular-inspector.vercel.app"]`. Tag válida: `/^[a-z][a-z0-9]*-[a-z0-9-]*$/`.
- Timeout de carregamento: **8000 ms**. IntersectionObserver `rootMargin: "200px"`. Placeholder com altura mínima **320px**.
- Headers de `inspector.js`: `Access-Control-Allow-Origin: *`, `Timing-Allow-Origin: *`, `Cache-Control: public, max-age=60, stale-while-revalidate=300`.
- Contrato: entradas `locale` (`pt|en|es|jp|fr`, desconhecido → `pt`) e `theme` (`light|dark`); saída `CustomEvent("mfe:ping", { detail: { angularVersion, at }, bubbles: true, composed: true })`; `ViewEncapsulation.ShadowDom`.
- Todo texto visível em 5 locales. No portfólio, `t(locale, { pt, en, es, jp, fr })` — o guard `lib/i18n-coverage.test.ts` falha se faltar um.
- Post em primeira pessoa enquadrado como **experimento**; números **medidos**, nunca estimados; post anônimo (sem nome de empregador).
- Ações externas (push, repo público, projeto Vercel, PR) **pedem confirmação ao Vinicius na hora**.
- Comunicação com o Vinicius em PT-BR.

## Review Focus

1. **Tema resolvido só no cliente** — `resolvedTheme` do `next-themes` é `undefined` no primeiro render; o painel deve nascer `light` e trocar para `dark` sem remontar o custom element. (Coberto: Task 4, Step 1 — `resolveTheme(undefined) === "light"`.)
2. **Remoto responde 200 mas não registra a tag** (bundle errado, tag renomeada) — `whenDefined` nunca resolve; deve cair no aviso após 8 s, não ficar carregando para sempre. (Coberto: Task 2 — teste de timeout com importer pendente.)
3. **Navegar entre posts e voltar** — o módulo já foi importado e o elemento já está definido; o bloco deve ficar pronto de novo sem erro de `customElements.define` duplicado. (Coberto: guarda no `main.ts` da Task 6 + verificação 7 da Task 8.)
4. **`detail` do evento malformado** — um `mfe:ping` sem `angularVersion`/`at` string não pode quebrar o hospedeiro. (Coberto: Task 4, Step 1 — `parsePing`.)
5. **`transferSize` = 0** — módulo servido do cache do browser zera o tamanho; o painel deve dizer "cache", não "0 KB". (Coberto: Task 6, Step 1 — `formatCost`.)

---

## File Structure

**Portfólio**

| Arquivo | Responsabilidade |
|---|---|
| `.gitignore`, `tsconfig.json`, `eslint.config.mjs`, `vitest.config.ts` | Ignorar `mfe-angular-inspector/` |
| `lib/mfe.ts` (novo) | Allowlist, validação de tag, carregamento com timeout — sem React, testável em Node |
| `lib/mfe.test.ts` (novo) | Testes de `lib/mfe.ts` |
| `lib/posts.ts` | Tipo `MfeBlock` e ramo `mfe` em `normalizeBlocks()` |
| `lib/posts.test.ts` | Casos do bloco `mfe` |
| `lib/mfe-host.ts` (novo) | Funções puras do hospedeiro: `resolveTheme`, `parsePing` |
| `lib/mfe-host.test.ts` (novo) | Testes de `lib/mfe-host.ts` |
| `components/micro-frontend.tsx` (novo) | Componente client que compõe o MFE |
| `app/[locale]/posts/[slug]/page.tsx` | `case "mfe"` |
| `data/posts/micro-frontend-angular-inside-nextjs.json` (novo) | O post |
| `public/blog/micro-frontend-angular-inside-nextjs/` (novo) | Capa |

**MFE (`mfe-angular-inspector/`, repo próprio)**

| Arquivo | Responsabilidade |
|---|---|
| `scripts/build-info.mjs` | Gera `src/build-info.generated.ts` (SHA + horário) |
| `scripts/finalize.mjs` | Garante saída de arquivo único e renomeia `main.js` → `inspector.js` |
| `src/main.ts` | Bootstrap zoneless + registro do custom element |
| `src/app/messages.ts` | Dicionário dos 5 locales + `resolveLocale` |
| `src/app/format.ts` | `formatCost` |
| `src/app/inspector.component.ts` | O painel |
| `src/app/*.spec.ts` | Testes |
| `vercel.json` | Build, saída e headers |

---

### Task 1: Portfólio ignora a pasta do MFE

**Files:**
- Modify: `.gitignore`, `tsconfig.json`, `eslint.config.mjs`, `vitest.config.ts`

**Interfaces:**
- Produces: a pasta `mfe-angular-inspector/` é invisível para git, `tsc`, ESLint e Vitest do portfólio.

- [ ] **Step 1: Criar uma sonda que quebraria as ferramentas**

```bash
mkdir -p mfe-angular-inspector
printf 'const x: number = "quebra"\nexport default x\n' > mfe-angular-inspector/probe.ts
printf 'import { it, expect } from "vitest"\nit("sonda", () => expect(1).toBe(2))\n' > mfe-angular-inspector/probe.test.ts
```

- [ ] **Step 2: Confirmar que hoje elas quebram**

Run: `nvm use 24 && pnpm typecheck; pnpm test 2>&1 | tail -5; git status --short`
Expected: `typecheck` falha em `mfe-angular-inspector/probe.ts`; `test` falha em `probe.test.ts`; `git status` lista `?? mfe-angular-inspector/`.

- [ ] **Step 3: Adicionar as exclusões**

`.gitignore`, no fim:

```
# Micro frontend Angular — repo próprio (github.com/ViniAguiar1/mfe-angular-inspector)
/mfe-angular-inspector/
```

`tsconfig.json`:

```json
  "exclude": [
    "node_modules",
    "mfe-angular-inspector"
  ]
```

`eslint.config.mjs`, dentro de `ignores`:

```js
      "next-env.d.ts",
      "mfe-angular-inspector/**",
```

`vitest.config.ts`:

```ts
    exclude: ["node_modules", ".next", "scripts", "mfe-angular-inspector"],
```

- [ ] **Step 4: Confirmar que as quatro ferramentas ignoram a sonda**

Run: `pnpm typecheck && pnpm lint && pnpm test 2>&1 | grep -E "Tests|FAIL"; git status --short`
Expected: typecheck e lint limpos; `Tests  31 passed`; `git status` **não** lista `mfe-angular-inspector/`.

- [ ] **Step 5: Remover a sonda e commitar**

```bash
rm mfe-angular-inspector/probe.ts mfe-angular-inspector/probe.test.ts
git add .gitignore tsconfig.json eslint.config.mjs vitest.config.ts
git commit -m "chore: portfolio ignora a pasta do micro frontend Angular"
```

---

### Task 2: `lib/mfe.ts` — allowlist, tag e carregamento com timeout

**Files:**
- Create: `lib/mfe.ts`
- Test: `lib/mfe.test.ts`

**Interfaces:**
- Produces:
  - `MFE_ORIGINS: readonly string[]`
  - `MFE_TIMEOUT_MS = 8000`
  - `isAllowedMfeSrc(src: string): boolean`
  - `isValidCustomElementTag(tag: string): boolean`
  - `loadRemoteModule(load: () => Promise<unknown>, timeoutMs?: number): Promise<void>` — resolve quando `load` resolve; rejeita se `load` rejeitar ou passar do timeout.

- [ ] **Step 1: Escrever os testes**

```ts
import { describe, it, expect, vi, afterEach } from "vitest"
import { isAllowedMfeSrc, isValidCustomElementTag, loadRemoteModule, MFE_TIMEOUT_MS } from "./mfe"

describe("isAllowedMfeSrc", () => {
  it("aceita https na origem permitida", () => {
    expect(isAllowedMfeSrc("https://mfe-angular-inspector.vercel.app/inspector.js")).toBe(true)
  })
  it("recusa outra origem", () => {
    expect(isAllowedMfeSrc("https://evil.example.com/inspector.js")).toBe(false)
  })
  it("recusa subdomínio que só começa igual", () => {
    expect(isAllowedMfeSrc("https://mfe-angular-inspector.vercel.app.evil.com/x.js")).toBe(false)
  })
  it("recusa http", () => {
    expect(isAllowedMfeSrc("http://mfe-angular-inspector.vercel.app/inspector.js")).toBe(false)
  })
  it("recusa lixo", () => {
    expect(isAllowedMfeSrc("not a url")).toBe(false)
    expect(isAllowedMfeSrc("")).toBe(false)
  })
})

describe("isValidCustomElementTag", () => {
  it("aceita nome com hífen", () => {
    expect(isValidCustomElementTag("mfe-inspector")).toBe(true)
  })
  it("recusa sem hífen, maiúscula ou começo inválido", () => {
    expect(isValidCustomElementTag("inspector")).toBe(false)
    expect(isValidCustomElementTag("Mfe-Inspector")).toBe(false)
    expect(isValidCustomElementTag("1-inspector")).toBe(false)
    expect(isValidCustomElementTag("mfe-<script>")).toBe(false)
  })
})

describe("loadRemoteModule", () => {
  afterEach(() => vi.useRealTimers())

  it("resolve quando o load resolve", async () => {
    await expect(loadRemoteModule(() => Promise.resolve())).resolves.toBeUndefined()
  })

  it("rejeita quando o load rejeita", async () => {
    await expect(loadRemoteModule(() => Promise.reject(new Error("404")))).rejects.toThrow("404")
  })

  it("rejeita por timeout quando o load nunca termina", async () => {
    vi.useFakeTimers()
    const pending = loadRemoteModule(() => new Promise(() => {}))
    const assertion = expect(pending).rejects.toThrow(/timeout/)
    await vi.advanceTimersByTimeAsync(MFE_TIMEOUT_MS)
    await assertion
  })
})
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `pnpm vitest run lib/mfe.test.ts`
Expected: FAIL — `Cannot find module './mfe'`.

- [ ] **Step 3: Implementar**

```ts
// Tudo que decide se o site executa código de outra origem mora aqui,
// sem React, para ser testável em Node.

export const MFE_ORIGINS: readonly string[] = ["https://mfe-angular-inspector.vercel.app"]

export const MFE_TIMEOUT_MS = 8000

const CUSTOM_ELEMENT_TAG = /^[a-z][a-z0-9]*-[a-z0-9-]*$/

export function isAllowedMfeSrc(src: string): boolean {
  let url: URL
  try {
    url = new URL(src)
  } catch {
    return false
  }
  return url.protocol === "https:" && MFE_ORIGINS.includes(url.origin)
}

export function isValidCustomElementTag(tag: string): boolean {
  return CUSTOM_ELEMENT_TAG.test(tag)
}

export function loadRemoteModule(load: () => Promise<unknown>, timeoutMs = MFE_TIMEOUT_MS): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`micro frontend: timeout after ${timeoutMs}ms`)), timeoutMs)
    load().then(
      () => {
        clearTimeout(timer)
        resolve()
      },
      (err: unknown) => {
        clearTimeout(timer)
        reject(err)
      },
    )
  })
}
```

- [ ] **Step 4: Rodar e ver passar**

Run: `pnpm vitest run lib/mfe.test.ts`
Expected: PASS (10 testes).

- [ ] **Step 5: Commit**

```bash
git add lib/mfe.ts lib/mfe.test.ts
git commit -m "feat(mfe): allowlist de origem, validacao de tag e carregamento com timeout"
```

---

### Task 3: Bloco `mfe` no carregador de posts

**Files:**
- Modify: `lib/posts.ts` (tipos no topo; `normalizeBlocks()` ~linha 164)
- Test: `lib/posts.test.ts` (dentro de `describe("normalizeBlocks")`)

**Interfaces:**
- Consumes: `isAllowedMfeSrc`, `isValidCustomElementTag` (Task 2)
- Produces: `export type MfeBlock = { type: "mfe"; src: string; tag: string }`, incluído em `ContentBlock`.

- [ ] **Step 1: Escrever os testes**

```ts
  it("aceita bloco mfe com origem permitida e tag valida", () => {
    const result = normalizeBlocks({
      blocks: [{ type: "mfe", src: "https://mfe-angular-inspector.vercel.app/inspector.js", tag: "mfe-inspector" }],
    })
    expect(result).toEqual([
      { type: "mfe", src: "https://mfe-angular-inspector.vercel.app/inspector.js", tag: "mfe-inspector" },
    ])
  })

  it("descarta bloco mfe com origem fora da allowlist, sem https ou com tag invalida", () => {
    const result = normalizeBlocks({
      blocks: [
        { type: "mfe", src: "https://evil.example.com/x.js", tag: "mfe-inspector" },
        { type: "mfe", src: "http://mfe-angular-inspector.vercel.app/inspector.js", tag: "mfe-inspector" },
        { type: "mfe", src: "https://mfe-angular-inspector.vercel.app/inspector.js", tag: "inspector" },
        { type: "mfe", tag: "mfe-inspector" },
        { type: "paragraph", text: "sobra" },
      ],
    })
    expect(result).toEqual([{ type: "paragraph", text: "sobra" }])
  })
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `pnpm vitest run lib/posts.test.ts`
Expected: FAIL no primeiro teste novo (bloco descartado → array vazio cai no fallback).

- [ ] **Step 3: Implementar**

Em `lib/posts.ts`, depois de `ListBlock`:

```ts
// Micro frontend carregado em runtime. `src` passa por allowlist de origem
// em normalizeBlocks: o site executa esse código, então ele só pode vir de
// um deploy nosso.
export type MfeBlock = {
  type: "mfe"
  src: string
  tag: string
}

export type ContentBlock = ParagraphBlock | CodeBlock | ImageBlock | HeadingBlock | ListBlock | MfeBlock
```

Import no topo:

```ts
import { isAllowedMfeSrc, isValidCustomElementTag } from "@/lib/mfe"
```

Em `normalizeBlocks()`, novo ramo depois do de `list`:

```ts
      } else if (type === "mfe" && typeof b.src === "string" && typeof b.tag === "string") {
        if (isAllowedMfeSrc(b.src) && isValidCustomElementTag(b.tag)) {
          allowed.push({ type: "mfe", src: b.src, tag: b.tag })
        }
      }
```

- [ ] **Step 4: Rodar e ver passar**

Run: `pnpm vitest run lib/posts.test.ts && pnpm typecheck`
Expected: PASS; typecheck limpo (o `switch` da página tem `default`, então não quebra ainda).

- [ ] **Step 5: Commit**

```bash
git add lib/posts.ts lib/posts.test.ts
git commit -m "feat(blog): bloco mfe validado por allowlist de origem"
```

---

### Task 4: Componente `MicroFrontend` e `case "mfe"` na página

**Files:**
- Create: `lib/mfe-host.ts`, `lib/mfe-host.test.ts`, `components/micro-frontend.tsx`
- Modify: `app/[locale]/posts/[slug]/page.tsx` (import + `case "mfe"` no `switch`, antes do `default`)

**Interfaces:**
- Consumes: `loadRemoteModule` (Task 2), `MfeBlock` (Task 3), `t`, `localeToHtmlLang`, `Locale` de `@/lib/i18n`, `useTheme` de `next-themes`.
- Produces:
  - `resolveTheme(resolved: string | undefined): "light" | "dark"`
  - `parsePing(detail: unknown): { angularVersion: string; at: string } | null`
  - `<MicroFrontend src tag locale />`

- [ ] **Step 1: Testes das funções puras**

```ts
import { describe, it, expect } from "vitest"
import { resolveTheme, parsePing } from "./mfe-host"

describe("resolveTheme", () => {
  it("dark so quando o next-themes resolve dark", () => {
    expect(resolveTheme("dark")).toBe("dark")
    expect(resolveTheme("light")).toBe("light")
    expect(resolveTheme(undefined)).toBe("light")
    expect(resolveTheme("system")).toBe("light")
  })
})

describe("parsePing", () => {
  it("aceita detail bem formado", () => {
    expect(parsePing({ angularVersion: "22.2.0", at: "2026-09-24T14:03:21.000Z" })).toEqual({
      angularVersion: "22.2.0",
      at: "2026-09-24T14:03:21.000Z",
    })
  })
  it("recusa detail malformado sem lancar", () => {
    expect(parsePing(null)).toBeNull()
    expect(parsePing("x")).toBeNull()
    expect(parsePing({ angularVersion: 22 })).toBeNull()
    expect(parsePing({ angularVersion: "22", at: "nao e data" })).toBeNull()
  })
})
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `pnpm vitest run lib/mfe-host.test.ts`
Expected: FAIL — módulo inexistente.

- [ ] **Step 3: Implementar `lib/mfe-host.ts`**

```ts
export type MfePing = { angularVersion: string; at: string }

// next-themes só sabe o tema no cliente: no primeiro render vem undefined.
export function resolveTheme(resolved: string | undefined): "light" | "dark" {
  return resolved === "dark" ? "dark" : "light"
}

// O detail vem de código de outra origem: tratar como entrada não confiável.
export function parsePing(detail: unknown): MfePing | null {
  if (!detail || typeof detail !== "object") return null
  const { angularVersion, at } = detail as Record<string, unknown>
  if (typeof angularVersion !== "string" || typeof at !== "string") return null
  if (Number.isNaN(Date.parse(at))) return null
  return { angularVersion, at }
}
```

Run: `pnpm vitest run lib/mfe-host.test.ts` → PASS.

- [ ] **Step 4: Implementar `components/micro-frontend.tsx`**

```tsx
"use client"

import { createElement, useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { t, localeToHtmlLang, type Locale } from "@/lib/i18n"
import { loadRemoteModule } from "@/lib/mfe"
import { parsePing, resolveTheme, type MfePing } from "@/lib/mfe-host"

type Status = "idle" | "loading" | "ready" | "error"

type Props = { src: string; tag: string; locale: Locale }

export function MicroFrontend({ src, tag, locale }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const elementRef = useRef<HTMLElement>(null)
  const [status, setStatus] = useState<Status>("idle")
  const [ping, setPing] = useState<MfePing | null>(null)
  const { resolvedTheme } = useTheme()
  const theme = resolveTheme(resolvedTheme)

  // Só busca o módulo remoto quando o bloco se aproxima do viewport:
  // quem não rola até aqui não paga o bundle do Angular.
  useEffect(() => {
    const node = wrapperRef.current
    if (!node || status !== "idle") return
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        observer.disconnect()
        setStatus("loading")
        loadRemoteModule(async () => {
          await import(/* webpackIgnore: true */ /* turbopackIgnore: true */ src)
          await customElements.whenDefined(tag)
        }).then(
          () => setStatus("ready"),
          () => setStatus("error"),
        )
      },
      { rootMargin: "200px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [src, tag, status])

  useEffect(() => {
    const el = elementRef.current
    if (status !== "ready" || !el) return
    const onPing = (event: Event) => {
      const parsed = parsePing((event as CustomEvent).detail)
      if (parsed) setPing(parsed)
    }
    el.addEventListener("mfe:ping", onPing)
    return () => el.removeEventListener("mfe:ping", onPing)
  }, [status])

  return (
    <div ref={wrapperRef} className="not-prose">
      <div className="min-h-[320px] border border-line">
        {status === "ready" ? (
          createElement(tag, { ref: elementRef, locale, theme })
        ) : (
          <p className="p-6 text-sm text-mu">
            {status === "error"
              ? t(locale, {
                  pt: "O micro frontend não carregou — o resto do post segue funcionando.",
                  en: "The micro frontend didn't load — the rest of the post still works.",
                  es: "El micro frontend no cargó — el resto del post sigue funcionando.",
                  jp: "マイクロフロントエンドを読み込めませんでした。記事の他の部分は通常どおり動作します。",
                  fr: "Le micro frontend ne s'est pas chargé — le reste de l'article fonctionne toujours.",
                })
              : t(locale, {
                  pt: "Carregando o micro frontend Angular…",
                  en: "Loading the Angular micro frontend…",
                  es: "Cargando el micro frontend Angular…",
                  jp: "Angularのマイクロフロントエンドを読み込み中…",
                  fr: "Chargement du micro frontend Angular…",
                })}
          </p>
        )}
      </div>
      <p aria-live="polite" className="mt-2 font-mono text-xs text-mu">
        {ping
          ? t(locale, {
              pt: "Evento recebido do micro frontend: Angular {version} às {time}",
              en: "Event received from the micro frontend: Angular {version} at {time}",
              es: "Evento recibido del micro frontend: Angular {version} a las {time}",
              jp: "マイクロフロントエンドからイベントを受信：Angular {version}（{time}）",
              fr: "Événement reçu du micro frontend : Angular {version} à {time}",
            })
              .replace("{version}", ping.angularVersion)
              .replace("{time}", new Date(ping.at).toLocaleTimeString(localeToHtmlLang(locale)))
          : t(locale, {
              pt: "Nenhum evento do micro frontend ainda.",
              en: "No events from the micro frontend yet.",
              es: "Todavía no hay eventos del micro frontend.",
              jp: "マイクロフロントエンドからのイベントはまだありません。",
              fr: "Aucun événement du micro frontend pour l'instant.",
            })}
      </p>
    </div>
  )
}
```

- [ ] **Step 5: Ligar na página**

Em `app/[locale]/posts/[slug]/page.tsx`, import:

```tsx
import { MicroFrontend } from "@/components/micro-frontend"
```

No `switch (block.type)`, antes de `default:`:

```tsx
              case "mfe":
                return <MicroFrontend key={i} src={block.src} tag={block.tag} locale={locale} />
```

- [ ] **Step 6: Checks**

Run: `pnpm lint && pnpm typecheck && pnpm test 2>&1 | grep -E "Tests|FAIL"`
Expected: limpos; testes passando, incluindo o guard de i18n (os quatro `t()` novos têm os 5 locales). Se o ESLint acusar `react-hooks/set-state-in-effect` no primeiro effect, o `setStatus` já está dentro do callback assíncrono do observer — não mover para o corpo do effect.

- [ ] **Step 7: Commit**

```bash
git add lib/mfe-host.ts lib/mfe-host.test.ts components/micro-frontend.tsx "app/[locale]/posts/[slug]/page.tsx"
git commit -m "feat(blog): componente que compoe micro frontend remoto no post"
```

---

### Task 5: Scaffold do MFE com build de arquivo único

**Files (em `mfe-angular-inspector/`):**
- Create: projeto Angular, `scripts/build-info.mjs`, `scripts/finalize.mjs`
- Modify: `angular.json`, `package.json`, `.gitignore`

**Interfaces:**
- Produces: `pnpm build` gera exatamente `dist/mfe-angular-inspector/browser/inspector.js`; `src/build-info.generated.ts` exporta `BUILD_INFO: { sha: string; builtAt: string }`.

- [ ] **Step 1: Gerar o projeto**

```bash
cd /Users/viniciusaguiar/viniciusaguiardev
rmdir mfe-angular-inspector 2>/dev/null
nvm use 24
pnpm dlx @angular/cli@22.2 new mfe-angular-inspector --package-manager pnpm --style css --ssr false --routing false --skip-git --zoneless --defaults
cd mfe-angular-inspector
pnpm add @angular/elements@22.2
```

Se `--zoneless` for rejeitado por já ser o padrão na v22, remover a flag e seguir.

- [ ] **Step 2: Git próprio apontando para o repo do MFE**

```bash
git init -b main
git remote add origin https://github.com/ViniAguiar1/mfe-angular-inspector.git
```

No `.gitignore` do MFE, acrescentar:

```
/src/build-info.generated.ts
```

- [ ] **Step 3: `scripts/build-info.mjs`**

```js
// Grava SHA e horário do build para o painel exibir. Na Vercel, o SHA vem
// de VERCEL_GIT_COMMIT_SHA; localmente, do git.
import { execSync } from "node:child_process"
import { writeFileSync } from "node:fs"

function shortSha() {
  const fromVercel = process.env.VERCEL_GIT_COMMIT_SHA
  if (fromVercel) return fromVercel.slice(0, 7)
  try {
    return execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim()
  } catch {
    return "local"
  }
}

const info = { sha: shortSha(), builtAt: new Date().toISOString() }
writeFileSync("src/build-info.generated.ts", `export const BUILD_INFO = ${JSON.stringify(info)} as const\n`)
console.log("build-info:", info)
```

- [ ] **Step 4: `scripts/finalize.mjs`**

```js
// O hospedeiro importa UMA URL. Se o build gerar chunks, o contrato quebra
// em silêncio — então falha alto aqui.
import { readdirSync, renameSync } from "node:fs"
import path from "node:path"

const dir = "dist/mfe-angular-inspector/browser"
const js = readdirSync(dir).filter((f) => f.endsWith(".js"))
if (js.length !== 1 || js[0] !== "main.js") {
  console.error(`esperado só main.js em ${dir}, encontrado: ${js.join(", ") || "(nada)"}`)
  process.exit(1)
}
renameSync(path.join(dir, "main.js"), path.join(dir, "inspector.js"))
console.log(`ok: ${dir}/inspector.js`)
```

- [ ] **Step 5: `angular.json` — em `projects.mfe-angular-inspector.architect.build.options`**

```json
"browser": "src/main.ts",
"index": false,
"outputHashing": "none",
"polyfills": [],
"styles": []
```

Remover `"assets"` apontando para `public` se ele copiar favicon para a saída (a saída deve ter só `inspector.js`). Em `configurations.production.budgets`, subir o `initial` para `"maximumWarning": "300kB", "maximumError": "500kB"` — o painel não pode falhar o build por budget, mas um estouro grande deve.

- [ ] **Step 6: `package.json` do MFE — scripts**

```json
"prebuild": "node scripts/build-info.mjs",
"build": "ng build && node scripts/finalize.mjs",
"pretest": "node scripts/build-info.mjs",
"test": "ng test --watch=false"
```

- [ ] **Step 7: Build de verificação**

Run: `pnpm build && ls dist/mfe-angular-inspector/browser`
Expected: `build-info: { sha: 'local', ... }`, `ok: .../inspector.js`, e o diretório contém **só** `inspector.js` (neste ponto o `main.ts` ainda é o do scaffold — tudo bem).

- [ ] **Step 8: Commit (no repo do MFE)**

```bash
git add -A
git commit -m "chore: scaffold Angular 22 com build de arquivo unico"
```

---

### Task 6: O painel `<mfe-inspector>`

**Files (em `mfe-angular-inspector/`):**
- Create: `src/app/messages.ts`, `src/app/format.ts`, `src/app/inspector.component.ts`, `src/app/format.spec.ts`, `src/app/messages.spec.ts`, `src/app/inspector.component.spec.ts`
- Replace: `src/main.ts`
- Delete: `src/app/app.ts`, `src/app/app.html`, `src/app/app.css`, `src/app/app.config.ts`, `src/app/app.spec.ts` e `src/index.html` se existirem (o scaffold não é usado)

**Interfaces:**
- Consumes: `BUILD_INFO` (Task 5)
- Produces: custom element `mfe-inspector` com propriedades/atributos `locale`, `theme`; evento `mfe:ping`.

- [ ] **Step 1: Testes das funções puras**

`src/app/format.spec.ts`:

```ts
import { formatCost } from "./format"

describe("formatCost", () => {
  it("mostra KB e ms quando houve transferência", () => {
    expect(formatCost({ transferSize: 51_200, duration: 123.4 }, "cache")).toBe("50.0 KB · 123 ms")
  })
  it("diz cache quando transferSize é 0", () => {
    expect(formatCost({ transferSize: 0, duration: 2 }, "cache")).toBe("cache · 2 ms")
  })
  it("traço quando não há entrada de timing", () => {
    expect(formatCost(undefined, "cache")).toBe("—")
  })
})
```

`src/app/messages.spec.ts`:

```ts
import { MESSAGES, resolveLocale } from "./messages"

describe("resolveLocale", () => {
  it("aceita os cinco locales do site", () => {
    for (const l of ["pt", "en", "es", "jp", "fr"]) expect(resolveLocale(l)).toBe(l)
  })
  it("cai em pt para desconhecido ou vazio", () => {
    expect(resolveLocale("de")).toBe("pt")
    expect(resolveLocale("")).toBe("pt")
  })
  it("todo locale tem as mesmas chaves", () => {
    const keys = Object.keys(MESSAGES.pt).sort()
    for (const l of Object.keys(MESSAGES)) expect(Object.keys(MESSAGES[l as keyof typeof MESSAGES]).sort()).toEqual(keys)
  })
})
```

Run: `pnpm test` → FAIL (módulos inexistentes).

- [ ] **Step 2: `src/app/format.ts`**

```ts
export type TimingLike = { transferSize: number; duration: number }

// transferSize = 0 significa cache do browser (ou Timing-Allow-Origin ausente):
// dizer "0 KB" seria mentir sobre o peso do módulo.
export function formatCost(entry: TimingLike | undefined, cachedLabel: string): string {
  if (!entry) return "—"
  const ms = `${Math.round(entry.duration)} ms`
  if (entry.transferSize === 0) return `${cachedLabel} · ${ms}`
  return `${(entry.transferSize / 1024).toFixed(1)} KB · ${ms}`
}
```

- [ ] **Step 3: `src/app/messages.ts`**

```ts
export const LOCALES = ["pt", "en", "es", "jp", "fr"] as const
export type Locale = (typeof LOCALES)[number]

export function resolveLocale(value: string): Locale {
  return (LOCALES as readonly string[]).includes(value) ? (value as Locale) : "pt"
}

type Messages = {
  title: string
  framework: string
  origin: string
  build: string
  cost: string
  cached: string
  ping: string
}

export const MESSAGES: Record<Locale, Messages> = {
  pt: {
    title: "Este painel é um app Angular com deploy próprio",
    framework: "Framework",
    origin: "Carregado de",
    build: "Build",
    cost: "Custo deste módulo",
    cached: "cache",
    ping: "Enviar evento para o site",
  },
  en: {
    title: "This panel is an Angular app with its own deploy",
    framework: "Framework",
    origin: "Loaded from",
    build: "Build",
    cost: "Cost of this module",
    cached: "cache",
    ping: "Send an event to the site",
  },
  es: {
    title: "Este panel es una app Angular con su propio deploy",
    framework: "Framework",
    origin: "Cargado desde",
    build: "Build",
    cost: "Costo de este módulo",
    cached: "caché",
    ping: "Enviar un evento al sitio",
  },
  jp: {
    title: "このパネルは独自にデプロイされたAngularアプリです",
    framework: "フレームワーク",
    origin: "読み込み元",
    build: "ビルド",
    cost: "このモジュールのコスト",
    cached: "キャッシュ",
    ping: "サイトにイベントを送信",
  },
  fr: {
    title: "Ce panneau est une app Angular avec son propre déploiement",
    framework: "Framework",
    origin: "Chargé depuis",
    build: "Build",
    cost: "Coût de ce module",
    cached: "cache",
    ping: "Envoyer un événement au site",
  },
}
```

Run: `pnpm test` → format e messages PASS.

- [ ] **Step 4: Teste do componente**

`src/app/inspector.component.spec.ts`:

```ts
import { TestBed } from "@angular/core/testing"
import { VERSION } from "@angular/core"
import { InspectorComponent } from "./inspector.component"

describe("InspectorComponent", () => {
  function setup(locale = "pt", theme = "light") {
    const fixture = TestBed.createComponent(InspectorComponent)
    fixture.componentRef.setInput("locale", locale)
    fixture.componentRef.setInput("theme", theme)
    fixture.detectChanges()
    const host = fixture.nativeElement as HTMLElement
    const root = host.shadowRoot ?? host
    return { fixture, host, root }
  }

  it("renderiza no idioma pedido e cai em pt no desconhecido", () => {
    expect(setup("en").root.textContent).toContain("Loaded from")
    expect(setup("de").root.textContent).toContain("Carregado de")
  })

  it("marca o host com a classe dark no tema escuro e remove no claro", () => {
    const { fixture, host } = setup("pt", "dark")
    expect(host.classList.contains("dark")).toBe(true)
    fixture.componentRef.setInput("theme", "light")
    fixture.detectChanges()
    expect(host.classList.contains("dark")).toBe(false)
  })

  it("dispara mfe:ping com a versão do Angular, bubbles e composed", () => {
    const { host, root } = setup()
    let received: CustomEvent | null = null
    host.addEventListener("mfe:ping", (e) => (received = e as CustomEvent))
    ;(root.querySelector("button") as HTMLButtonElement).click()
    expect(received).not.toBeNull()
    expect(received!.detail.angularVersion).toBe(VERSION.full)
    expect(Number.isNaN(Date.parse(received!.detail.at))).toBe(false)
    expect(received!.bubbles).toBe(true)
    expect(received!.composed).toBe(true)
  })
})
```

Run: `pnpm test` → FAIL (componente inexistente).

- [ ] **Step 5: `src/app/inspector.component.ts`**

```ts
import { Component, ElementRef, VERSION, ViewEncapsulation, computed, inject, input } from "@angular/core"
import { BUILD_INFO } from "../build-info.generated"
import { formatCost, type TimingLike } from "./format"
import { MESSAGES, resolveLocale } from "./messages"

// URL de onde ESTE módulo foi carregado — no post, o deploy do MFE, não o site.
const MODULE_URL = import.meta.url

function ownTiming(): TimingLike | undefined {
  return performance.getEntriesByName(MODULE_URL)[0] as PerformanceResourceTiming | undefined
}

@Component({
  selector: "mfe-inspector-root",
  encapsulation: ViewEncapsulation.ShadowDom,
  host: { "[class.dark]": "isDark()" },
  template: `
    <section>
      <p class="eyebrow">&lt;mfe-inspector&gt;</p>
      <h3>{{ m().title }}</h3>
      <dl>
        <dt>{{ m().framework }}</dt><dd>Angular {{ angularVersion }}</dd>
        <dt>{{ m().origin }}</dt><dd>{{ origin }}</dd>
        <dt>{{ m().build }}</dt><dd>{{ build.sha }} · {{ build.builtAt }}</dd>
        <dt>{{ m().cost }}</dt><dd>{{ cost() }}</dd>
      </dl>
      <button type="button" (click)="ping()">{{ m().ping }}</button>
    </section>
  `,
  styles: `
    :host { --bg: #ffffff; --fg: #111111; --mu: #6b6b6b; --line: #e4e4e4; --accent: #dd0031;
            display: block; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
    :host(.dark) { --bg: #0e0e0e; --fg: #ededed; --mu: #9a9a9a; --line: #2a2a2a; }
    section { background: var(--bg); color: var(--fg); padding: 24px; min-height: 272px; }
    .eyebrow { color: var(--accent); font-size: 12px; margin: 0 0 8px; }
    h3 { font-size: 18px; margin: 0 0 16px; font-family: system-ui, sans-serif; }
    dl { display: grid; grid-template-columns: max-content 1fr; gap: 6px 16px; font-size: 13px; margin: 0 0 20px; }
    dt { color: var(--mu); }
    dd { margin: 0; overflow-wrap: anywhere; }
    button { font: inherit; font-size: 13px; color: var(--fg); background: transparent;
             border: 1px solid var(--line); padding: 8px 12px; cursor: pointer; }
    button:hover { border-color: var(--accent); }
  `,
})
export class InspectorComponent {
  readonly locale = input<string>("pt")
  readonly theme = input<string>("light")

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef)

  protected readonly m = computed(() => MESSAGES[resolveLocale(this.locale())])
  protected readonly isDark = computed(() => this.theme() === "dark")
  protected readonly cost = computed(() => formatCost(ownTiming(), this.m().cached))

  protected readonly angularVersion = VERSION.full
  protected readonly origin = new URL(MODULE_URL).origin
  protected readonly build = BUILD_INFO

  protected ping(): void {
    this.host.nativeElement.dispatchEvent(
      new CustomEvent("mfe:ping", {
        detail: { angularVersion: this.angularVersion, at: new Date().toISOString() },
        bubbles: true,
        composed: true,
      }),
    )
  }
}
```

- [ ] **Step 6: `src/main.ts`**

```ts
import { provideZonelessChangeDetection } from "@angular/core"
import { createApplication } from "@angular/platform-browser"
import { createCustomElement } from "@angular/elements"
import { InspectorComponent } from "./app/inspector.component"

const TAG = "mfe-inspector"

// Registrar o mesmo nome duas vezes lança erro no browser — acontece se o
// hospedeiro importar o módulo de novo (navegação entre posts, HMR).
if (!customElements.get(TAG)) {
  createApplication({ providers: [provideZonelessChangeDetection()] }).then((app) => {
    customElements.define(TAG, createCustomElement(InspectorComponent, { injector: app.injector }))
  })
}
```

Apagar os arquivos do scaffold listados em **Files**.

- [ ] **Step 7: Testes e build**

Run: `pnpm test && pnpm build && ls -la dist/mfe-angular-inspector/browser`
Expected: todos os specs PASS; saída com só `inspector.js`. Anotar o tamanho do arquivo (vai para a Task 9).

- [ ] **Step 8: Commit (repo do MFE)**

```bash
git add -A
git commit -m "feat: painel mfe-inspector com contrato locale/theme e evento mfe:ping"
```

---

### Task 7: Deploy do MFE (ações externas — confirmar com o Vinicius antes de cada uma)

**Files (em `mfe-angular-inspector/`):**
- Create: `vercel.json`, `README.md`

- [ ] **Step 1: `vercel.json`**

```json
{
  "framework": null,
  "installCommand": "pnpm install --frozen-lockfile",
  "buildCommand": "pnpm build",
  "outputDirectory": "dist/mfe-angular-inspector/browser",
  "headers": [
    {
      "source": "/inspector.js",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Timing-Allow-Origin", "value": "*" },
        { "key": "Cache-Control", "value": "public, max-age=60, stale-while-revalidate=300" }
      ]
    }
  ]
}
```

- [ ] **Step 2: `README.md` curto**

```markdown
# mfe-angular-inspector

Micro frontend Angular 22 publicado como um único ES module (`inspector.js`) que registra o custom element `<mfe-inspector>`. É o experimento do post "micro frontend Angular dentro de um blog Next.js" em viniciusaguiardev.com.br.

Contrato: atributos `locale` (`pt|en|es|jp|fr`) e `theme` (`light|dark`); evento `mfe:ping` com `{ angularVersion, at }`.

    pnpm install
    pnpm test
    pnpm build   # → dist/mfe-angular-inspector/browser/inspector.js
```

Commit: `git add -A && git commit -m "chore: vercel.json com CORS, Timing-Allow-Origin e cache curto"`

- [ ] **Step 3: (confirmar) Push e repo público**

```bash
git push -u origin main
gh repo edit ViniAguiar1/mfe-angular-inspector --visibility public --accept-visibility-change-consequences
```

- [ ] **Step 4: (confirmar) Projeto na Vercel ligado ao repo**

```bash
vercel link --yes --project mfe-angular-inspector
vercel git connect
vercel --prod
```

Se o CLI (57.x) não criar o projeto com esse nome ou o domínio `mfe-angular-inspector.vercel.app` não ficar disponível, **parar** e avisar: a URL entra na allowlist e no JSON do post, então muda em três lugares (`lib/mfe.ts`, `lib/mfe.test.ts`, `lib/posts.test.ts`).

- [ ] **Step 5: Verificar o deploy de fora**

Run: `curl -sI https://mfe-angular-inspector.vercel.app/inspector.js`
Expected: `200`, `content-type` JavaScript, `access-control-allow-origin: *`, `timing-allow-origin: *`, `cache-control: public, max-age=60, stale-while-revalidate=300`.

---

### Task 8: Integração real no portfólio

**Files:**
- Create: `data/posts/micro-frontend-angular-inside-nextjs.json` (versão mínima com `"draft": true`)
- Create (descartável, fora do repo): `$SCRATCHPAD/mfe-e2e.mjs`

- [ ] **Step 1: Post rascunho mínimo**

JSON com os 5 locales de `title`, `description`, `date`, `readTime`, `tag`, `publishedAt: "2026-09-24"`, `"draft": true`, e em `blocks` + os quatro `blocks_<locale>` um parágrafo e o bloco:

```json
{ "type": "mfe", "src": "https://mfe-angular-inspector.vercel.app/inspector.js", "tag": "mfe-inspector" }
```

(O draft não aparece em listagens, mas abre por URL direta.)

- [ ] **Step 2: Build de produção e servidor**

```bash
lsof -ti:3457 && echo "PORTA OCUPADA — matar pelo PID antes"
pnpm build && (pnpm start -p 3457 > /tmp/claude-501/start.log 2>&1 &)
```

- [ ] **Step 3: Script Playwright descartável**

```bash
cd "$SCRATCHPAD" && pnpm dlx playwright@latest install chromium
```

`$SCRATCHPAD/mfe-e2e.mjs`:

```js
import { chromium } from "playwright"

const base = "http://localhost:3457"
const browser = await chromium.launch()
const page = await browser.newPage()
const requests = []
page.on("request", (r) => requests.push(r.url()))

await page.goto(`${base}/pt/posts/micro-frontend-angular-inside-nextjs`)
await page.locator("mfe-inspector").scrollIntoViewIfNeeded()
await page.waitForFunction(() => customElements.get("mfe-inspector"), null, { timeout: 10000 })

const text = () => page.locator("mfe-inspector").evaluate((el) => el.shadowRoot.textContent)
console.log("1 origem remota:", requests.some((u) => u.startsWith("https://mfe-angular-inspector.vercel.app/inspector.js")))
console.log("1 texto pt:", (await text()).includes("Carregado de"))

// THEME_TOGGLE: seletor real do toggle, lido do HTML servido antes de rodar
await page.locator(THEME_TOGGLE).first().click()
await page.waitForTimeout(300)
console.log("2 tema no host:", await page.locator("mfe-inspector").evaluate((el) => el.classList.contains("dark")))

await page.locator("mfe-inspector").evaluate((el) => el.shadowRoot.querySelector("button").click())
console.log("4 evento no hospedeiro:", await page.getByText(/Evento recebido do micro frontend/).isVisible())

await page.goto(`${base}/en/posts/micro-frontend-angular-inside-nextjs`)
await page.locator("mfe-inspector").scrollIntoViewIfNeeded()
await page.waitForFunction(() => customElements.get("mfe-inspector"))
console.log("3 texto en:", (await text()).includes("Loaded from"))

await browser.close()
```

Antes de rodar, abrir o HTML servido e definir no topo do script `const THEME_TOGGLE = "<seletor>"` com o que `components/theme-toggle.tsx` realmente renderiza. O resultado da linha 2 precisa vir do clique real no toggle — nunca injetar a classe `dark` à mão.

Run: `node $SCRATCHPAD/mfe-e2e.mjs`
Expected: as cinco linhas `true`.

- [ ] **Step 4: Caminho de falha**

Trocar temporariamente o `src` do rascunho para `https://mfe-angular-inspector.vercel.app/nao-existe.js`, rebuild, e verificar com o Playwright que a página mostra "O micro frontend não carregou" e que o título e os parágrafos continuam renderizados. Restaurar o `src`.

- [ ] **Step 5: Navegar e voltar**

No script: ir de `/pt/posts/micro-frontend-angular-inside-nextjs` para outro post via link e voltar com `page.goBack()`; o painel precisa estar pronto de novo e `page.on("pageerror")` não pode ter registrado `NotSupportedError` de `customElements.define`.

- [ ] **Step 6: Deploy independente**

Mudar o `title` pt do `messages.ts` do MFE (ex.: acrescentar " (v2)"), commit, push; após o deploy da Vercel e ~60 s de cache, recarregar o post **sem rebuildar o portfólio** e confirmar o texto novo. Reverter a mudança no MFE com outro commit e push.

- [ ] **Step 7: Encerrar servidor**

```bash
lsof -ti:3457 | xargs kill; sleep 1; lsof -ti:3457 || echo port-free
```

- [ ] **Step 8: Commit**

```bash
git add data/posts/micro-frontend-angular-inside-nextjs.json
git commit -m "feat(blog): rascunho do post com o bloco mfe"
```

---

### Task 9: Medições

- [ ] **Step 1: Peso do módulo**

```bash
curl -s https://mfe-angular-inspector.vercel.app/inspector.js -o /tmp/claude-501/inspector.js
wc -c /tmp/claude-501/inspector.js
curl -s -H "Accept-Encoding: br" -o /dev/null -w "%{size_download}\n" https://mfe-angular-inspector.vercel.app/inspector.js
curl -s -H "Accept-Encoding: gzip" -o /dev/null -w "%{size_download}\n" https://mfe-angular-inspector.vercel.app/inspector.js
```

- [ ] **Step 2: Tempo de carregamento** — no Playwright, `performance.getEntriesByName(url)[0]` → `duration` e `transferSize`, 5 cargas frias (contexto novo por carga); registrar mediana.

- [ ] **Step 3: Anotar** os números (bruto, br, gzip, mediana de duração) num bloco de texto para a Task 10. Nenhum número entra no post sem vir daqui.

---

### Task 10: O post (texto, 5 idiomas, capa) — revisão do Vinicius

**Files:**
- Modify: `data/posts/micro-frontend-angular-inside-nextjs.json` (remover `draft`)
- Create: `public/blog/micro-frontend-angular-inside-nextjs/{cover.webp,og.jpg}`

- [ ] **Step 1: Escrever em inglês** com a estrutura do spec §4 (hipótese → bloco `mfe` logo cedo → três modelos → contrato → custo medido → quando não vale → link `https://github.com/ViniAguiar1/mfe-angular-inspector`). Primeira pessoa, experimento, números da Task 9. Blocos `code` com trechos reais de `main.ts`, do contrato e do hospedeiro — idênticos nos 5 locales.

- [ ] **Step 2: Traduzir** para pt, es, jp, fr com um script Python descartável em `$SCRATCHPAD` que define os blocos de código uma vez e afirma que a estrutura (tipos e contagem de itens) é igual nos 5 locales, como nos posts anteriores. `readTime` pela contagem real de palavras.

- [ ] **Step 3: Capa** — `coverSubject` em inglês sem texto nem cor (ex.: um objeto de material e forma diferentes encaixado com precisão num nicho de uma estrutura maior); `pnpm blog:cover micro-frontend-angular-inside-nextjs`, ver as 3 candidatas, escolher com `--pick`, conferir `og.jpg` e `cover.webp`.

- [ ] **Step 4: Mostrar a versão PT ao Vinicius e esperar aprovação.** Ajustes nos 5 locales.

- [ ] **Step 5: Commit**

```bash
git add data/posts/micro-frontend-angular-inside-nextjs.json public/blog/micro-frontend-angular-inside-nextjs/
git commit -m "feat(blog): post-experimento com micro frontend Angular"
```

---

### Task 11: Checks finais e PR (confirmar antes do push)

- [ ] **Step 1:** `pnpm lint && pnpm typecheck && pnpm test && pnpm build && pnpm aeo`
Expected: tudo verde; AEO ≥ 90.

- [ ] **Step 2:** Rodar de novo o Playwright da Task 8 contra o build final (post sem `draft`) — cinco `true`.

- [ ] **Step 3: (confirmar)** `git push -u origin feat/blog-mfe-angular` e `gh pr create` com resumo e verificação; mandar o link ao Vinicius.
