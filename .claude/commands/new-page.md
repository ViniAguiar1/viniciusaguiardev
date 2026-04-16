Create a new page in the portfolio.

## Instructions

1. Ask for: page name, route path, and purpose
2. Follow this checklist for every new page:

### Required Steps

- [ ] Create `app/<route>/page.tsx`
- [ ] Use `generateMetadata()` (async, reads locale) — NOT static `export const metadata`
- [ ] Add trilingual title and description using `t(locale, pt, en, es)`
- [ ] Wrap sections in `<FadeIn>` component for scroll animations
- [ ] Add container: `<div className="w-full max-w-5xl mx-auto px-4 py-12">`

### Navigation

- [ ] Add key to `Dictionary` type in `lib/i18n-server.ts`
- [ ] Add translations in `pt`, `en`, `es` dictionary objects
- [ ] Add `<SidebarNavLink>` in `components/app-sidebar.tsx`

### SEO (if content-heavy page)

- [ ] Add `<JsonLd>` with WebPage or appropriate schema
- [ ] Verify AEO score stays 100/100 with `pnpm run aeo`

### Final

- [ ] Run `pnpm build` to verify
- [ ] Test in mobile viewport (< 1024px)
- [ ] Test all 3 languages (PT/EN/ES)
