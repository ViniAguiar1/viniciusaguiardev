# viniciusaguiar.dev

Personal portfolio and blog built with Next.js, showcasing my work as a Software Engineer.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4, Shadcn UI
- **Themes:** next-themes (light/dark/system)
- **i18n:** PT-BR / EN (cookie-based)
- **Deploy:** Vercel
- **CI:** GitHub Actions (lint, typecheck, build)

## Pages

- `/` — Home with blog posts
- `/sobre` — About, experience, tech stack
- `/projetos` — Projects portfolio with modal details
- `/posts/[slug]` — Blog post (JSON-based, bilingual)

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run TypeScript check |

## Project Structure

```
app/              # Pages and layouts (App Router)
components/       # React components
  ui/             # Shadcn UI base components
data/             # Blog posts (JSON) and projects data
lib/              # Utilities, i18n, post loading
public/           # Static assets, logos, PDFs
```

## CI/CD

- **CI:** GitHub Actions runs lint + typecheck + build on every PR to `main`
- **Deploy:** Vercel (automatic preview on PRs, production on merge to `main`)

## Author

**Vinicius Aguiar** — Software Engineer

- [LinkedIn](https://www.linkedin.com/in/viniciusaguiar-araujo/)
- [GitHub](https://github.com/ViniAguiar1)
