import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/posts"
import { LOCALES, DEFAULT_LOCALE, SITE_URL, localePath, localeToHtmlLang, type Locale } from "@/lib/i18n"

type StaticEntry = {
  path: string
  changeFrequency: "weekly" | "monthly"
  priority: number
}

const STATIC_ENTRIES: StaticEntry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/sobre", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projetos", changeFrequency: "monthly", priority: 0.8 },
  { path: "/engenharia", changeFrequency: "monthly", priority: 0.9 },
  { path: "/uses", changeFrequency: "monthly", priority: 0.6 },
  { path: "/projetos/x-drop", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projetos/vox-pet-digital", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projetos/ikropp", changeFrequency: "monthly", priority: 0.8 },
]

function buildLanguageAlternates(path: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const locale of LOCALES) {
    out[localeToHtmlLang(locale)] = `${SITE_URL}${localePath(locale, path)}`
  }
  out["x-default"] = `${SITE_URL}${localePath(DEFAULT_LOCALE, path)}`
  return out
}

function entriesFor(path: string, changeFrequency: "weekly" | "monthly", priority: number): MetadataRoute.Sitemap {
  const languages = buildLanguageAlternates(path)
  const lastModified = new Date()
  return LOCALES.map((locale: Locale) => ({
    url: `${SITE_URL}${localePath(locale, path)}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  // getAllPosts já exclui drafts — eles não devem aparecer no sitemap
  const postSlugs = getAllPosts("pt").map((p) => p.slug)

  const staticEntries = STATIC_ENTRIES.flatMap((e) => entriesFor(e.path, e.changeFrequency, e.priority))
  const postEntries = postSlugs.flatMap((slug) => entriesFor(`/posts/${slug}`, "monthly", 0.7))

  return [...staticEntries, ...postEntries]
}
