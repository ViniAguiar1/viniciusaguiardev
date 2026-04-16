# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Dev server (Turbopack)
pnpm build        # Production build (Turbopack)
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
pnpm aeo          # AEO readiness check (threshold 90/100, fails CI if below)
```

Uses **pnpm** (not npm/yarn). Node 20 in CI. Turbopack is the bundler for both dev and build.

## CI Pipeline

Runs on every PR to `main`: lint → typecheck → build → AEO check. Deploy is automatic via Vercel (preview on PRs, production on merge).

## Architecture

Next.js 16 App Router portfolio with trilingual support (PT-BR / EN / ES).

### i18n System

- `Locale` type: `"pt" | "en" | "es"` — read from `lang` cookie via `getLocale()` in `lib/i18n-server.ts`
- `getDictionary(locale)` returns typed UI translations (nav, home, about, projects, etc.)
- `t(locale, pt, en, es)` helper for inline trilingual strings in server components
- Blog posts use suffix pattern: base fields are PT, `_en` suffix for English, `_es` for Spanish (e.g., `title_en`, `blocks_es`)
- Project taglines/descriptions use `{ pt: string; en: string; es?: string }` objects

### Blog Posts

JSON files in `data/posts/`. Each has `blocks` (array of paragraph/code/heading/list/image) for PT, `blocks_en` for EN, `blocks_es` for ES. Post loader in `lib/posts.ts` applies locale suffix automatically via `applyLocaleToData()`.

### Projects

Typed array in `data/projects.ts`. Each project has slug, name, logo path, trilingual tagline/description, category, and optional URL. Displayed via `ProjectsGrid` client component with floating modal (Radix Dialog).

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
