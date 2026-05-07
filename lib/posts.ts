import fs from "fs"
import path from "path"
import { cache } from "react"
import type { Locale } from "@/lib/i18n-server"

export type ParagraphBlock = {
  type: "paragraph"
  text: string
}

export type CodeBlock = {
  type: "code"
  code: string
  language?: string
}

export type ImageBlock = {
  type: "image"
  src: string
  alt?: string
  width?: number
  height?: number
}

export type HeadingBlock = {
  type: "heading"
  text: string
  level?: 2 | 3 | 4
}

export type ListBlock = {
  type: "list"
  ordered?: boolean
  items: string[]
}

export type ContentBlock = ParagraphBlock | CodeBlock | ImageBlock | HeadingBlock | ListBlock

export type Post = {
  slug: string
  title: string
  description?: string
  date: string
  readTime?: string
  tag?: string
  tagColor?: string
  content?: string
  blocks?: ContentBlock[]
}

const postsDir = path.join(process.cwd(), "data", "posts")
const isProd = process.env.NODE_ENV === "production"

// Em produção, JSONs são imutáveis até o próximo deploy — vale persistir
// o resultado entre requests. Em dev mantemos sempre fresh para o autor ver
// mudanças sem reiniciar o servidor.
const rawFileCache = new Map<string, RawPostData>()
const localePostsCache = new Map<Locale, Post[]>()

function readRawPost(file: string): RawPostData | null {
  if (isProd) {
    const cached = rawFileCache.get(file)
    if (cached) return cached
  }
  try {
    const fullPath = path.join(postsDir, file)
    const raw = fs.readFileSync(fullPath, "utf-8")
    const data = JSON.parse(raw) as RawPostData
    if (isProd) rawFileCache.set(file, data)
    return data
  } catch {
    return null
  }
}

function buildPost(file: string, raw: RawPostData, locale: Locale): Post {
  const data = applyLocaleToData(raw, locale)
  const slug = data.slug ?? file.replace(/\.json$/, "")
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    readTime: data.readTime ?? "",
    tag: data.tag ?? "",
    tagColor: data.tagColor ?? "",
    content: data.content ?? "",
    blocks: normalizeBlocks(data),
  }
}

export const getAllPosts = cache((locale: Locale = "pt"): Post[] => {
  if (isProd) {
    const cached = localePostsCache.get(locale)
    if (cached) return cached
  }
  if (!fs.existsSync(postsDir)) return []

  const files = fs
    .readdirSync(postsDir)
    // Ignora arquivos ocultos e "AppleDouble" (._*) criados pelo macOS
    .filter((f) => f.endsWith(".json") && !f.startsWith("."))

  const posts: Post[] = []
  for (const file of files) {
    const raw = readRawPost(file)
    if (!raw) continue
    posts.push(buildPost(file, raw, locale))
  }

  if (isProd) localePostsCache.set(locale, posts)
  return posts
})

export const getPostBySlug = cache((slug: string, locale: Locale = "pt"): Post | null => {
  const directFile = `${slug}.json`
  const directPath = path.join(postsDir, directFile)
  if (fs.existsSync(directPath)) {
    const raw = readRawPost(directFile)
    if (raw) return buildPost(directFile, raw, locale)
  }

  const all = getAllPosts(locale)
  return all.find((p) => p.slug === slug) ?? null
})

function normalizeBlocks(data: Partial<Post> & { blocks?: unknown[] }): ContentBlock[] {
  // Se o JSON já trouxe blocks no formato esperado, filtra e normaliza
  if (Array.isArray(data.blocks)) {
    const allowed: ContentBlock[] = []
    for (const raw of data.blocks as unknown[]) {
      if (!raw || typeof raw !== "object") continue
      const b = raw as Record<string, unknown>
      const type = typeof b.type === "string" ? b.type : ""
      if (type === "paragraph" && typeof b.text === "string") {
        allowed.push({ type: "paragraph", text: b.text })
      } else if (type === "code" && typeof b.code === "string") {
        allowed.push({ type: "code", code: b.code, language: typeof b.language === "string" ? b.language : undefined })
      } else if (type === "image" && typeof (b as { src?: unknown }).src === "string") {
        const img: ImageBlock = { type: "image", src: (b as { src: string }).src }
        if (typeof b.alt === "string") img.alt = b.alt
        if (typeof b.width === "number") img.width = b.width
        if (typeof b.height === "number") img.height = b.height
        allowed.push(img)
      } else if (type === "heading" && typeof b.text === "string") {
        const level = (b.level as HeadingBlock["level"]) || undefined
        allowed.push({ type: "heading", text: b.text, level })
      } else if (type === "list" && Array.isArray(b.items)) {
        const items = b.items
          .map((it: unknown) => (typeof it === "string" ? it : ""))
          .filter(Boolean)
        if (items.length) {
          const ordered = Boolean((b as { ordered?: unknown }).ordered)
          allowed.push({ type: "list", ordered, items })
        }
      }
    }
    if (allowed.length) return allowed
  }

  // Fallback: usar content em parágrafos
  const source = (data.content || data.description || "").trim()
  if (source) {
    return source
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map<ParagraphBlock>((text) => ({ type: "paragraph", text }))
  }

  return []
}

type RawPostData = Partial<Post> & {
  title_en?: string
  description_en?: string
  content_en?: string
  blocks_en?: unknown[]
  date_en?: string
  readTime_en?: string
  tag_en?: string
  title_es?: string
  description_es?: string
  content_es?: string
  blocks_es?: unknown[]
  date_es?: string
  readTime_es?: string
  tag_es?: string
  blocks?: unknown[]
}

function applyLocaleToData(original: RawPostData, locale: Locale) {
  type LocalizedData = Omit<Partial<Post>, "blocks"> & { blocks?: unknown[] }
  const data = { ...(original as Record<string, unknown>) } as LocalizedData

  const suffix = locale === "en" ? "_en" : locale === "es" ? "_es" : null

  if (suffix) {
    const raw = original as Record<string, unknown>
    if (typeof raw[`title${suffix}`] === "string") data.title = raw[`title${suffix}`] as string
    if (typeof raw[`description${suffix}`] === "string") data.description = raw[`description${suffix}`] as string
    if (typeof raw[`content${suffix}`] === "string") data.content = raw[`content${suffix}`] as string
    if (Array.isArray(raw[`blocks${suffix}`])) data.blocks = raw[`blocks${suffix}`] as unknown[]
    if (typeof raw[`date${suffix}`] === "string") data.date = raw[`date${suffix}`] as string
    if (typeof raw[`readTime${suffix}`] === "string") data.readTime = raw[`readTime${suffix}`] as string
    if (typeof raw[`tag${suffix}`] === "string") data.tag = raw[`tag${suffix}`] as string
  }

  return data as Partial<Post> & { blocks?: unknown[] }
}
