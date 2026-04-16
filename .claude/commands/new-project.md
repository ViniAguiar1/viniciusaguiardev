Add a new project to the portfolio.

## Instructions

1. Ask for: project name, category, URL (optional), and a brief description
2. Add the project to the `projects` array in `data/projects.ts`
3. Each project must have:
   - `slug` — kebab-case identifier
   - `name` — display name
   - `logo` — path to logo (prefer `/images/name-logo.png`, fallback to `/logos/name.svg` placeholder)
   - `tagline` — `{ pt: "...", en: "...", es: "..." }` — one line max
   - `description` — `{ pt: "...", en: "...", es: "..." }` — 1-2 sentences
   - `category` — one of: SaaS, Marketplace, ERP, Platform, E-commerce, Agency, App, EdTech, Travel, Health, Logistics, HealthTech, Automotive
   - `url` — optional external link

4. If no real logo is available, create a placeholder SVG in `public/logos/`:
   ```
   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#COLOR" opacity="0.15"/><text x="16" y="21" text-anchor="middle" font-family="system-ui,sans-serif" font-size="16" font-weight="600" fill="#COLOR">X</text></svg>
   ```
   Replace X with first letter and COLOR with a hex color matching the category.

5. If the project has a website, use WebFetch to get accurate tagline and description — do NOT guess
6. Add the category color in `components/projects-grid.tsx` `categoryColors` if it's a new category
7. Run `pnpm build` to verify
