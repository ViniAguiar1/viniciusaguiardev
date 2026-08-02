# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
nvm use 24        # Always run first — pnpm is only available under Node 24
pnpm dev          # Dev server (Turbopack)
pnpm build        # Production build (Turbopack)
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
pnpm aeo          # AEO readiness check (threshold 90/100, fails CI if below)
```

Uses **pnpm** (not npm/yarn). Node 24 locally (via nvm), Node 20 in CI. Turbopack is the bundler for both dev and build.

## CI Pipeline

Runs on every PR to `main`: lint → typecheck → build → AEO check. Deploy is automatic via Vercel (preview on PRs, production on merge).

## Architecture

Next.js 16 App Router portfolio with five locales (PT-BR / EN / ES / JA / FR).

### i18n System

- `Locale` type: `"pt" | "en" | "es" | "jp" | "fr"` — resolved from the `x-locale` request header (set by `proxy.ts` from the URL's locale prefix) via `getLocale()` in `lib/i18n-server.ts`
- `getDictionary(locale)` returns typed UI translations (nav, home, about, projects, etc.)
- `t(locale, { pt: "...", en: "...", es: "...", jp: "...", fr: "..." })` helper for inline strings in server components — takes an object keyed by locale, not positional args; only `pt` is required
- Blog posts use suffix pattern: base fields are PT, other locales use `_${locale}` suffix (e.g., `title_en`, `blocks_jp`, `description_fr`) — derived uniformly in `lib/posts.ts`, not a hardcoded list per locale
- Project taglines/descriptions use `LocalizedString` (`data/projects.ts`): `Partial<Record<Locale, string>> & { pt: string }` — only `pt` is required, so a missing locale is not a compile error, it silently falls back to Portuguese (this is what `lib/i18n-coverage.test.ts` guards against)
- Adding a locale — the routing layer (proxy, sitemap, hreflang, `generateStaticParams`) derives from `LOCALES`, so it needs no edit. Four code sites do:
  1. `lib/i18n.ts` — append to `LOCALES` and to the `HTML_LANGS`/`OG_LOCALES` maps
  2. `lib/i18n-server.ts` — write the new `Dictionary` and add its branch to `getDictionary()` (an if-chain, not a map: a missing branch silently returns the PT dictionary)
  3. `components/language-toggle.tsx` — add the entry to `flags` and `labels`
  4. `data/experiences.test.ts` — add the locale to the `contractWord` map

  Also update the locale list in `README.md` and `public/llms.txt` — prose, unguarded. Sites 1 and 3 are `Record<Locale, …>`, so `pnpm typecheck` fails until they are filled; site 4 is a bare object literal, caught by `strict: true` in tsconfig (TS7053); site 2's fallback is caught by `lib/i18n-coverage.test.ts`, which also fails until every translation object and post covers the new locale. Verified empirically by adding a sixth locale with only step 1 applied: `tsc` flagged sites 3 and 4 (plus every `Localized` in `data/experiences.ts`), and the guard flagged the dictionary fallback, 294 incomplete objects and 66 missing post fields.

### Blog Posts

JSON files in `data/posts/`. Each has `blocks` (array of paragraph/code/heading/list/image) for PT, plus `blocks_${locale}` for every other locale. Post loader in `lib/posts.ts` applies the locale suffix automatically via `applyLocaleToData()`.

### Projects

Typed array in `data/projects.ts`. Each project has slug, name, logo path, tagline/description, category, and optional URL. Displayed via `ProjectsGrid` client component with floating modal (Radix Dialog).

### Layout Structure

Root layout wraps everything in `SidebarProvider` with three zones:
- **Left:** `AppSidebar` (profile, nav links — hidden below 1024px, opens as drawer on mobile)
- **Center:** `MobileHeader` (hamburger + search + toggles, visible below 1024px) + page content
- **Right:** `RightSidebar` (home, search, language/theme toggles — hidden below 1024px)

Mobile breakpoint is **1024px** (set in `hooks/use-mobile.ts`), not the default 768px. This covers tablets and iPads.

### SEO / AEO

The `scripts/aeo-check.ts` validates 17 signals across 5 categories (AI Access, Schema Presence, Meta Quality, Content Structure, Citability). Key files it checks for: `app/robots.ts`, `app/sitemap.ts`, `public/llms.txt`, `components/json-ld.tsx`, FAQPage schema in engineering page, Article schema in post pages, Organization schema in layout, canonical URL, OG image. Score must stay ≥ 90/100.

### Key Patterns

- Shadcn UI components in `components/ui/` — don't modify directly unless fixing Shadcn bugs
- `cn()` utility from `lib/utils.ts` (clsx + tailwind-merge) for conditional classes
- `FadeIn` component wraps sections for scroll-triggered animations (Intersection Observer)
- `EngineeringTopic` opens content in a right-side Sheet (50% desktop, 100% mobile)
- `SidebarNavLink` closes the mobile drawer on navigation
- Pages use `generateMetadata()` (async, reads locale) instead of static `metadata` export

### ESLint

`react-hooks/purity` is disabled for `components/ui/**` (Shadcn generated code). Direct import from `eslint-config-next` (no FlatCompat wrapper).
