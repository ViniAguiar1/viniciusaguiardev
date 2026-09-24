# Monorepo e zona `/uses`: micro frontend por rota

**Data:** 2026-09-24
**Status:** Aprovado em conversa — aguardando revisão do spec escrito
**Post:** 25/09/2026, 5 idiomas

## Contexto

O portfólio é um app Next.js 16 único (`app/`, `components/`, `lib/`, `data/`, `hooks/`, `scripts/`, `public/` na raiz), com pnpm, CI no GitHub Actions (lint → typecheck → test → build → AEO) e deploy na Vercel. O post de 24/09 demonstrou micro frontend **dentro da página** (Web Component Angular). Este experimento demonstra o outro modelo, **divisão por rota** (multi-zones), no nível em que empresas grandes fazem: monorepo com a moldura do site como pacote compartilhado.

A moldura hoje é: fontes Geist, `app/globals.css` (tokens + Tailwind 4), `ThemeProvider` (`next-themes`, `attribute="data-theme"`, default `dark`), `AppSidebar`, `RightSidebar`, `MobileHeader`, `Footer`, `SidebarNavLink`, `SearchButton`, `LanguageToggle`, `ModeToggle`, `components/ui/sidebar.tsx` (shadcn, 716 linhas) e o JSON-LD `Organization` + script Umami no layout. Ela navega com `next/link` e `router.push` (sidebar, footer, busca → `/busca`, troca de idioma).

## Objetivo

1. **Etapa 1** — transformar o repo num monorepo Turborepo sem mudar nada para quem visita.
2. **Etapa 2** — servir `/[locale]/uses` a partir de um segundo app Next.js, com deploy próprio, atrás do mesmo domínio.
3. Um post (25/09) com números medidos das duas etapas.

## Decisões tomadas na conversa

| Decisão | Escolha | Motivo |
|---|---|---|
| Nível | "Big tech": moldura como pacote compartilhado num monorepo | Copiar moldura (A) gera divergência; moldura mínima (B) degrada a experiência |
| Roteamento entre zonas | Multi-zones nativo do Next.js (`rewrites`) | Vercel Microfrontends pode ter custo; o autor não pode ter custo agora |
| Orquestração | Turborepo + pnpm workspaces | Padrão do ecossistema Next/Vercel; `turbo-ignore` dá deploy independente de graça |
| Fases | Duas etapas, cada uma com critério de aceite próprio | A Etapa 1 muda o Root Directory na Vercel; isolar o risco antes de adicionar a zona |

## Fora do escopo

- Vercel Microfrontends (`microfrontends.json`, roteamento no edge, `PrefetchCrossZoneLinks`) — citado no post como o que o produto pago resolve.
- Prefetch entre zonas.
- Fallback quando a zona cai (rewrite não tem fallback) — trade-off documentado no post.
- Pacotes com build próprio/publicação em registry. Pacotes internos, consumidos como fonte TS.
- Qualquer mudança visual ou de conteúdo no site.

## Etapa 1 — Monorepo sem mudar comportamento

### Estrutura

```
apps/
  portfolio/          app de hoje: app/ (sem nada da moldura), data/, lib/posts*, lib/mfe*, lib/blog/,
                      lib/inline-md.tsx, components/ específicos de página, scripts/, public/,
                      next.config.ts, proxy.ts, vitest.config.ts, vercel.json
packages/
  i18n/               lib/i18n.ts, lib/i18n-server.ts           → @repo/i18n, @repo/i18n/server
  ui/                 components/ui/*, lib/utils.ts (cn, MONO_CHIP), hooks/use-mobile.ts,
                      components/section-eyebrow.tsx, globals.css → @repo/ui/*
  shell/              app-sidebar, right-sidebar, mobile-header, footer, sidebar-nav-link,
                      search-button, language-toggle, theme-toggle, theme-provider,
                      fontes, SiteShell (moldura do <body>), zones.ts, ZoneLink, navigate
                                                                → @repo/shell/*
  config/             tsconfig base, ESLint compartilhado       → @repo/config/*
turbo.json
pnpm-workspace.yaml
package.json          raiz: scripts que delegam ao turbo; packageManager fixo
```

Critério de fronteira: um arquivo vai para um pacote se **as duas zonas** precisam dele; senão fica no app. `components/micro-frontend.tsx`, `code-block`, `projects-grid` etc. ficam em `apps/portfolio`.

### Pacotes

- Nome `@repo/<nome>`, `"private": true`, `exports` apontando para os `.ts/.tsx` fonte.
- Apps listam os pacotes em `transpilePackages` no `next.config.ts`.
- Alias `@/` continua válido **dentro de cada app**. Dentro dos pacotes, imports relativos ou `@repo/*` — nunca `@/`.
- `SiteShell` recebe `zone` (ver Etapa 2) e renderiza o que hoje está dentro de `<body>` no layout (Umami, JSON-LD Organization, `ThemeProvider`, `SidebarProvider`, sidebars, header mobile, `children`, footer). O `<html>`, `generateMetadata` e fontes continuam no layout de cada app, que importa as fontes de `@repo/shell/fonts`.

### Tailwind 4

O CSS de cada app importa `@repo/ui/globals.css` e declara `@source` para `../../packages/ui` e `../../packages/shell` (caminhos relativos ao CSS do app). Sem isso as classes usadas só dentro dos pacotes não são geradas — a falha é silenciosa (componente sem estilo, todos os checks verdes).

### Navegação (preparação para a Etapa 2)

`@repo/shell/zones.ts` define as zonas; na Etapa 1 só existe `portfolio`, e `ZoneLink`/`navigate` se comportam exatamente como `next/link`/`router.push` hoje. Todos os pontos da moldura que navegam passam a usar `ZoneLink`/`navigate`.

### Ferramentas e CI

- `turbo.json` com tarefas `build`, `lint`, `typecheck`, `test` (dependência `^build` não se aplica — pacotes são fonte) e `aeo` (só em `apps/portfolio`).
- Scripts da raiz: `pnpm build|lint|typecheck|test|aeo` → `turbo run <tarefa>`. `CLAUDE.md` e `README.md` atualizados com os comandos.
- CI: mesmas etapas, agora via turbo, Node 20, `pnpm install --frozen-lockfile` na raiz.
- `lib/i18n-coverage.test.ts` (fica em `apps/portfolio`) passa a varrer também `packages/*/src` — a regra dos 5 idiomas continua cobrindo os textos da moldura.
- `pnpm blog:cover` e `pnpm aeo` continuam funcionando a partir da raiz (delegam ao app).

### Vercel

- `vercel.json` vai para `apps/portfolio/`.
- **No merge da Etapa 1, o Vinicius muda o Root Directory do projeto para `apps/portfolio`.** Entre a mudança e o merge um deploy pode falhar; build falho não substitui o deploy de produção ativo.
- Ignored Build Step: `npx turbo-ignore` (configurado na Etapa 2, quando existem dois projetos).

### Critério de aceite da Etapa 1 — "idêntico" medido

1. **Antes** de mover qualquer arquivo: build de produção do estado atual, servir e salvar o HTML de **todas** as rotas do sitemap + `/pt/busca` + uma rota 404, em `$SCRATCHPAD/golden/before/`.
2. Depois da Etapa 1: mesmo procedimento em `$SCRATCHPAD/golden/after/`.
3. Comparação página a página após normalizar só o que é de build (hashes em nomes de arquivos `/_next/static/...`, `buildId`, nonces). **Qualquer outra diferença bloqueia a etapa.**
4. O CSS gerado é comparado pelo conjunto de seletores (não pelo hash) — pega classe perdida por `@source` faltando.
5. `lint`, `typecheck`, `test`, `build`, `aeo` (≥ 90) verdes via turbo.

## Etapa 2 — Zona `/uses`

### App `apps/uses`

- Next.js 16, mesma versão do portfólio, `package.json` `name: "uses"`.
- Rotas: `app/[locale]/uses/page.tsx` (movida de `apps/portfolio`) + `app/[locale]/layout.tsx` (usa `SiteShell zone="uses"`) + `app/robots.ts`.
- `components/editor-config-sheet.tsx` move junto (só a `/uses` usa).
- `proxy.ts` próprio: define `x-locale`/`x-pathname` como o do portfólio e redireciona sem locale para `/pt/uses`.
- `next.config.ts`:
  - `assetPrefix: "/uses-static"` — assets da zona não colidem com os do portfólio no mesmo domínio.
  - header `x-zone: uses` em todas as respostas (observabilidade: DevTools mostra qual app atendeu).
- `app/robots.ts` da zona: `Disallow: /` — o domínio direto da zona não é indexado. Buscadores chegam pelo domínio principal, cujo robots é do portfólio.
- Canonical e hreflang via `buildAlternates` já usam `SITE_URL` (domínio principal).

### Portfólio

- Remove `app/[locale]/uses`.
- `next.config.ts` → `rewrites()` (afterFiles):
  - `/:locale(pt|en|es|jp|fr)/uses` → `${USES_ZONE_URL}/:locale/uses`
  - `/uses-static/:path*` → `${USES_ZONE_URL}/uses-static/:path*`
- `USES_ZONE_URL` obrigatória no build de produção (build falha sem ela); em dev, default `http://localhost:3001`.
- `app/sitemap.ts` continua listando `/uses`.

### Zonas na moldura

```ts
// @repo/shell/zones.ts
export type Zone = "portfolio" | "uses"
export function zoneFor(pathname: string): Zone   // /:locale/uses(/…)? → "uses"; resto → "portfolio"
export function isSameZone(current: Zone, href: string): boolean
```

- `ZoneLink`: mesma zona → `next/link`; outra zona → `<a href>` (carregamento completo).
- `navigate(router, current, href)`: mesma zona → `router.push`; outra → `window.location.assign`.
- Hrefs externos (`http…`, `mailto:`) passam direto como hoje.
- `LOCALES` vem de `@repo/i18n` — o padrão de locale do mapa deriva dele, nunca lista à mão.

### Deploy independente

- Projeto Vercel `uses` (criado pelo Vinicius, plano gratuito), Root Directory `apps/uses`, domínio a definir por ele.
- `USES_ZONE_URL` no projeto do portfólio (todos os ambientes).
- Ignored Build Step nos dois projetos: `npx turbo-ignore --fallback=HEAD^1`. Commit só em `apps/uses` → portfólio não rebuilda; só em `apps/portfolio` → zona não rebuilda; em `packages/*` → os dois.

### Falha

Zona fora do ar → `/xx/uses` responde erro do rewrite; o resto do site segue. Sem fallback (fora do escopo). O post contrasta com o MFE Angular, onde só o bloco caía.

### Critério de aceite da Etapa 2

1. **Unitários:** `zoneFor`, `isSameZone` (locales todos, `/uses` sem locale, `/usesx`, subcaminhos, externos).
2. **Playwright** com portfólio (3000) + zona (3001) em build de produção, `USES_ZONE_URL=http://localhost:3001`:
   - `GET /pt/uses` pelo portfólio → 200, header `x-zone: uses`, conteúdo da página.
   - Assets `/uses-static/...` carregam (sem 404 no console).
   - Troca de idioma dentro da zona (`/pt/uses` → `/en/uses`) é client-side (sem novo documento).
   - Clicar em Home/Projetos/busca a partir da zona gera navegação de documento (full load) e cai no portfólio.
   - A partir do portfólio, link para `/uses` gera full load e cai na zona.
   - Tema escolhido persiste entre zonas (mesma origem → mesmo `localStorage` do `next-themes`).
   - `GET <zona>/robots.txt` → `Disallow: /`.
3. **HTML golden da `/uses`:** conteúdo idêntico ao da Etapa 1, diferenças só em assets/prefixo.
4. **Medições para o post:** mediana de navegação client-side vs. entre zonas; linhas/arquivos da moldura compartilhada; o que `turbo-ignore` decide para um commit em cada área.

## O post (25/09)

Slug provisório `route-based-micro-frontend-monorepo`, 5 idiomas, primeira pessoa como **experimento**, números só medidos. Arco: o modelo que faltou no post de 24/09 → por que a parte cara é a moldura, não a página → monorepo com pacotes → o mapa de zonas e o link que sabe atravessar → o que o produto pago da Vercel faria → custo medido → quando não vale. Linka o post de 24/09. Capa via `pnpm blog:cover`.

## Ações externas (confirmação na hora)

- Mudança do Root Directory do projeto do portfólio (Vinicius, no merge da Etapa 1).
- Criação do projeto `uses` e da variável `USES_ZONE_URL` (Vinicius).
- Push da branch e PRs.
