Create a new blog post for the portfolio.

## Instructions

1. Ask for: title (PT), topic, and key points to cover
2. Create a JSON file in `data/posts/` following the existing format
3. The file must include ALL of these fields:
   - `slug` — kebab-case, used as filename and URL
   - `title` / `title_en` / `title_es`
   - `description` / `description_en` / `description_es`
   - `date` / `date_en` / `date_es` (format: "15 de abril de 2026" / "Apr 15, 2026" / "15 de abr. de 2026")
   - `readTime` / `readTime_en` / `readTime_es` (format: "X min de leitura" / "X min read" / "X min de lectura")
   - `tag` / `tag_en` / `tag_es`
   - `tagColor` (Tailwind class like "bg-blue-700")
   - `blocks` (PT), `blocks_en`, `blocks_es`

4. Block types available:
   - `{ "type": "paragraph", "text": "..." }`
   - `{ "type": "heading", "text": "...", "level": 2 }` (level 2, 3, or 4)
   - `{ "type": "code", "code": "...", "language": "typescript" }`
   - `{ "type": "list", "items": ["...", "..."], "ordered": false }`
   - `{ "type": "image", "src": "/image.png", "alt": "..." }`

5. Code blocks must be IDENTICAL across all 3 languages — only translate text blocks
6. Write like a senior engineer explaining systems, not like a blog
7. After creating, run `pnpm build` to verify it loads correctly

## Reference

Look at `data/posts/webhook-architecture-payment-providers.json` as the best example of format and writing style.
