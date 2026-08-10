Create a new blog post for the portfolio.

## Instructions

1. Ask for: title (PT), topic, and key points to cover
2. Create a JSON file in `data/posts/` following the existing format
3. The post must cover **all five locales** — `pt` is the base, the other four use the
   `_${locale}` suffix (`en`, `es`, `jp`, `fr`). Required fields:
   - `slug` — kebab-case, used as filename and URL
   - `title` + `title_en` / `title_es` / `title_jp` / `title_fr`
   - `description` + the four suffixed variants
   - `date` + the four suffixed variants
   - `readTime` + the four suffixed variants
   - `tag` + the four suffixed variants
   - `tagColor` (Tailwind class like `bg-blue-700`) — single value, not localized
   - `blocks` (PT) + `blocks_en` / `blocks_es` / `blocks_jp` / `blocks_fr`

   Optional: `featured` (bool), `order` (number, lower = first among featured),
   `showOnHome: false` (keeps it out of the home grid), `ogImage`, `draft`.

   `lib/i18n-coverage.test.ts` fails if any of the five is missing a field — it is
   the guard, so run `pnpm test` before considering the post done.

4. Format per locale:
   | field | pt | en | es | jp | fr |
   |---|---|---|---|---|---|
   | `date` | `15 de abr de 2026` | `Apr 15, 2026` | `15 de abr. de 2026` | `2026年4月15日` | `15 avril 2026` |
   | `readTime` | `12 min de leitura` | `12 min read` | `12 min de lectura` | `12分で読めます` | `12 min de lecture` |

5. Block types available:
   - `{ "type": "paragraph", "text": "..." }` — supports `**bold**` and `` `code` `` inline
   - `{ "type": "heading", "text": "...", "level": 2 }` (level 2, 3, or 4)
   - `{ "type": "code", "code": "...", "language": "typescript" }`
   - `{ "type": "list", "items": ["...", "..."], "ordered": false }`
   - `{ "type": "image", "src": "/image.svg", "alt": "...", "width": 900, "height": 440 }`

6. Code blocks must be **byte-identical across all five locales** — only text blocks get
   translated. Write code comments in English so they read the same in every locale.
   Image `src`/`width`/`height` are shared too; only `alt` is translated.
7. Write like a senior engineer explaining systems, not like a blog. Anchor the post on a
   real decision with a concrete number or trade-off — never invent facts or metrics.
8. Generating the JSON with a throwaway Python script (code blocks defined once, one dict of
   strings per locale) is the reliable way to keep the five versions structurally in sync.
9. After creating, run `pnpm test` (i18n coverage) and `pnpm build` to verify it loads.

## Reference

`data/posts/frontend-observability-checkout-crash.json` — most recent, covers all five
locales, uses an inline SVG diagram from `public/`.
`data/posts/webhook-architecture-payment-providers.json` — good example of writing style.
