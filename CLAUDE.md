# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
nvm use 24        # Always run first — pnpm is only available under Node 24
pnpm dev          # Dev servers (turbo run dev)
pnpm build        # Production builds (turbo run build)
pnpm lint         # ESLint em apps e pacotes
pnpm typecheck    # tsc --noEmit em apps e pacotes
pnpm test         # Vitest em apps e pacotes
pnpm aeo          # AEO readiness check do portfolio (threshold 90/100, fails CI if below)
pnpm --filter portfolio <script>   # rodar um script de um app só
```

Uses **pnpm** (not npm/yarn). Node 24 locally (via nvm), Node 20 in CI. Turbopack is the bundler for both dev and build.

The pnpm version is pinned in `package.json#packageManager` and is the single source for all three environments — CI's `pnpm/action-setup` reads it (don't add a `version:` input back, the action errors on both) and Vercel resolves it from there. Never run `npm install` here: npm ignores `pnpm-lock.yaml` and resolves the tree from scratch.

## CI Pipeline

Runs on every PR to `main`: lint → typecheck → test → build → AEO check (all via turbo). Deploy is automatic via Vercel (preview on PRs, production on merge).

`apps/portfolio/vercel.json` sets the install command to `pnpm install --frozen-lockfile`. It exists because the Vercel project was configured to run `npm install`, which ignored the committed lockfile — deploys resolved dependencies fresh every time, and broke outright once `sharp` entered the tree (npm's `edgesOut` bug on `linux-x64`). Settings in `vercel.json` override the dashboard.

## Monorepo

pnpm workspaces + Turborepo. The Vercel project's Root Directory is `apps/portfolio`, with "Include files outside the Root Directory in the Build Step" enabled (the build needs `packages/`). `pnpm blog:cover` reads `apps/portfolio/.env` (the script runs with the app as cwd).

Turbo: every task depends on a `transit` node (`dependsOn: ["^transit"]`), so a change in any `packages/*` invalidates the cache of the apps that use it — without it, CI would replay a stale `portfolio#test` after a change only in the shell.

```
apps/portfolio/     o site (páginas, data/, posts, scripts, public/)
packages/i18n/      @repo/i18n (LOCALES, t, buildAlternates…) e @repo/i18n/server (getLocale, getDictionary)
packages/ui/        @repo/ui — shadcn, cn(), use-mobile, section-eyebrow, globals.css (tokens + Tailwind)
packages/shell/     @repo/shell — a moldura (sidebars, header mobile, footer, busca, idioma, tema), SiteShell, zonas
packages/config/    @repo/config — tsconfig base e ESLint compartilhados
```

- Dentro de pacotes, **nunca** `@/` — só relativo ou `@repo/*`. Dentro de um app, `@/` aponta para a raiz do app.
- Pacotes são fonte TypeScript: cada app lista-os em `transpilePackages` e o `turbopack.root` aponta para a raiz do repo.
- **Tailwind só gera classes que encontra.** O `app/globals.css` de cada app declara `@source` para `packages/ui/src` e `packages/shell/src`; sem isso a moldura sai sem estilo e nenhum check acusa.
- Navegação da moldura passa por `ZoneLink` / `useZoneNavigate` (`@repo/shell/zone-link`), que decidem entre navegação client-side e de documento pelo mapa de zonas (`@repo/shell/zones`).
- Fontes `next/font`, script Umami e JSON-LD `Organization` ficam no `layout.tsx` de cada app (o AEO lê o layout do app).

## Architecture

Next.js 16 App Router portfolio with five locales (PT-BR / EN / ES / JA / FR).

### i18n System

- `Locale` type: `"pt" | "en" | "es" | "jp" | "fr"` — resolved from the `x-locale` request header (set by `proxy.ts` from the URL's locale prefix) via `getLocale()` in `packages/i18n/src/server.ts` (`@repo/i18n/server`)
- `getDictionary(locale)` returns typed UI translations (nav, home, about, projects, etc.)
- `t(locale, { pt: "...", en: "...", es: "...", jp: "...", fr: "..." })` helper for inline strings in server components — takes an object keyed by locale, not positional args; only `pt` is required
- Blog posts use suffix pattern: base fields are PT, other locales use `_${locale}` suffix (e.g., `title_en`, `blocks_jp`, `description_fr`) — derived uniformly in `lib/posts.ts`, not a hardcoded list per locale
- Project taglines/descriptions use `LocalizedString` (`apps/portfolio/data/projects.ts`): `Partial<Record<Locale, string>> & { pt: string }` — only `pt` is required, so a missing locale is not a compile error, it silently falls back to Portuguese (this is what `apps/portfolio/lib/i18n-coverage.test.ts` guards against — it also scans `packages/shell/src`)
- Adding a locale — the routing layer (proxy, sitemap, hreflang, `generateStaticParams`) derives from `LOCALES`, so it needs no edit. Four code sites do:
  1. `packages/i18n/src/index.ts` — append to `LOCALES` and to the `HTML_LANGS`/`OG_LOCALES` maps
  2. `packages/i18n/src/server.ts` — write the new `Dictionary` and add its branch to `getDictionary()` (an if-chain, not a map: a missing branch silently returns the PT dictionary)
  3. `packages/shell/src/language-toggle.tsx` — add the entry to `flags` and `labels`
  4. `apps/portfolio/data/experiences.test.ts` — add the locale to the `contractWord` map

  Also update the locale list in `README.md` and `apps/portfolio/public/llms.txt` — prose, unguarded. Sites 1 and 3 are `Record<Locale, …>`, so `pnpm typecheck` fails until they are filled; site 4 is a bare object literal, caught by `strict: true` in tsconfig (TS7053); site 2's fallback is caught by `lib/i18n-coverage.test.ts`, which also fails until every translation object and post covers the new locale. Verified empirically by adding a sixth locale with only step 1 applied: `tsc` flagged sites 3 and 4 (plus every `Localized` in `data/experiences.ts`), and the guard flagged the dictionary fallback, 294 incomplete objects and 66 missing post fields.

### Blog Posts

JSON files in `apps/portfolio/data/posts/`. Each has `blocks` (array of paragraph/code/heading/list/image) for PT, plus `blocks_${locale}` for every other locale. Post loader in `lib/posts.ts` applies the locale suffix automatically via `applyLocaleToData()`.

### Projects

Typed array in `apps/portfolio/data/projects.ts`. Each project has slug, name, logo path, tagline/description, category, and optional URL. Displayed via `ProjectsGrid` client component with floating modal (Radix Dialog).

### Layout Structure

Root layout wraps everything in `SidebarProvider` with three zones:
- **Left:** `AppSidebar` (profile, nav links — hidden below 1024px, opens as drawer on mobile)
- **Center:** `MobileHeader` (hamburger + search + toggles, visible below 1024px) + page content
- **Right:** `RightSidebar` (home, search, language/theme toggles — hidden below 1024px)

Mobile breakpoint is **1024px** (set in `packages/ui/src/hooks/use-mobile.ts`), not the default 768px. This covers tablets and iPads.

### SEO / AEO

The `apps/portfolio/scripts/aeo-check.ts` validates (paths below are relative to `apps/portfolio`) 17 signals across 5 categories (AI Access, Schema Presence, Meta Quality, Content Structure, Citability). Key files it checks for: `app/robots.ts`, `app/sitemap.ts`, `public/llms.txt`, `components/json-ld.tsx`, FAQPage schema in engineering page, Article schema in post pages, Organization schema in layout, canonical URL, OG image. Score must stay ≥ 90/100.

### Key Patterns

- Shadcn UI components in `packages/ui/src/components/` (`@repo/ui/components/*`) — don't modify directly unless fixing Shadcn bugs
- `cn()` utility from `@repo/ui/utils` (`packages/ui/src/utils.ts`) (clsx + tailwind-merge) for conditional classes
- `FadeIn` component wraps sections for scroll-triggered animations (Intersection Observer)
- `EngineeringTopic` opens content in a right-side Sheet (50% desktop, 100% mobile)
- `SidebarNavLink` closes the mobile drawer on navigation
- Pages use `generateMetadata()` (async, reads locale) instead of static `metadata` export

### ESLint

Shared config in `packages/config/eslint.config.mjs` (`createConfig()`), used by every app and package. `react-hooks/purity` is disabled for Shadcn generated code. Direct import from `eslint-config-next` (no FlatCompat wrapper).
