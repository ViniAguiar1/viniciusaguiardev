export const LOCALES = ["pt", "en", "es", "jp", "fr"] as const
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

/** Matches a leading locale segment, derived from LOCALES so it never goes stale. */
const LOCALE_PREFIX_RE = new RegExp(`^/(${LOCALES.join("|")})(/.*|$)`)

/** Strip the locale prefix from a path. `/pt/sobre` → `/sobre` */
export function stripLocale(pathname: string): string {
  const match = pathname.match(LOCALE_PREFIX_RE)
  if (!match) return pathname
  const rest = match[2]
  return rest && rest !== "" ? rest : "/"
}

/** HTML lang attribute mapping (more specific than the locale code) */
const HTML_LANGS: Record<Locale, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
  jp: "ja-JP",
  fr: "fr-FR",
}

export function localeToHtmlLang(locale: Locale): string {
  return HTML_LANGS[locale]
}

/** Open Graph locale mapping */
const OG_LOCALES: Record<Locale, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
  jp: "ja_JP",
  fr: "fr_FR",
}

export function localeToOgLocale(locale: Locale): string {
  return OG_LOCALES[locale]
}

/**
 * Inline translation helper. Pass an object keyed by locale.
 * `pt` is required and used as fallback when the requested locale has no entry.
 *
 * @example
 *   t(locale, { pt: "Sobre", en: "About", es: "Acerca" })
 */
export function t(locale: Locale, translations: Partial<Record<Locale, string>> & { pt: string }): string {
  return translations[locale] ?? translations.pt
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
