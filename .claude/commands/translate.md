Translate content to all supported languages (PT-BR, EN, ES).

## Instructions

1. Ask what needs translation: a page, post, component, or specific text
2. Follow these rules:

### For pages (inline content)

- Use `t(locale, pt, en, es)` helper for all user-facing strings
- Section titles, labels, descriptions, buttons — everything must be trilingual
- Technical terms can stay in English across all languages (e.g., "Design System", "CI/CD", "deploy")

### For blog posts (JSON)

- Base fields (`title`, `blocks`, etc.) are always PT-BR
- Add `_en` suffix fields for English, `_es` for Spanish
- Code blocks stay IDENTICAL — only translate text, paragraph, heading, and list blocks
- Date format: PT "15 de abril de 2026" / EN "Apr 15, 2026" / ES "15 de abr. de 2026"
- readTime: PT "X min de leitura" / EN "X min read" / ES "X min de lectura"

### For projects (data/projects.ts)

- `tagline` and `description` use `{ pt: "...", en: "...", es: "..." }`
- `es` is optional (falls back to `pt` when missing)

### Quality

- Do NOT use Google Translate style — write natural, fluent text in each language
- PT-BR uses "você" (not "tu"), "engenheiro de software" (not "Software Engineer")
- ES uses Latin American Spanish (not Spain Spanish)
- When in doubt about a company/product description, use WebFetch to check the real website
