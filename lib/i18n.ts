export const LOCALES = ["pt", "en", "es"] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = "pt"

export function isLocale(value: string | undefined | null): value is Locale {
  return LOCALES.includes(value as Locale)
}

/** Build a URL path prefixed with the given locale. `/sobre` → `/pt/sobre` */
export function localePath(locale: Locale, path: string): string {
  if (!path || path === "/") return `/${locale}`
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `/${locale}${normalized}`
}

/** Strip the locale prefix from a path. `/pt/sobre` → `/sobre` */
export function stripLocale(pathname: string): string {
  const match = pathname.match(/^\/(pt|en|es)(\/.*|$)/)
  if (!match) return pathname
  const rest = match[2]
  return rest && rest !== "" ? rest : "/"
}

/** HTML lang attribute mapping (more specific than the locale code) */
export function localeToHtmlLang(locale: Locale): string {
  if (locale === "en") return "en-US"
  if (locale === "es") return "es-ES"
  return "pt-BR"
}

/** Helper for inline trilingual strings */
export function t(locale: Locale, pt: string, en: string, es: string): string {
  if (locale === "en") return en
  if (locale === "es") return es
  return pt
}

export const SITE_URL = "https://viniciusaguiardev.com.br"

/**
 * Build the `alternates` object for Next.js `Metadata` so each page exposes
 * canonical + hreflang links to the other locales.
 *
 * @param path - The unlocalized path, e.g. "/sobre" or "/posts/foo"
 * @param currentLocale - The locale of the page being rendered
 */
export function buildAlternates(path: string, currentLocale: Locale) {
  const canonical = `${SITE_URL}${localePath(currentLocale, path)}`
  const languages: Record<string, string> = {}
  for (const locale of LOCALES) {
    languages[localeToHtmlLang(locale)] = `${SITE_URL}${localePath(locale, path)}`
  }
  languages["x-default"] = `${SITE_URL}${localePath(DEFAULT_LOCALE, path)}`
  return { canonical, languages }
}
