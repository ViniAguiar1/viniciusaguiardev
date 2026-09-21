import fs from "fs"
import path from "path"
import { cache } from "react"
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n"

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
  // Data já formatada para exibição, por locale ("16 de abril de 2026").
  // Serve à leitura humana e a mais nada: não é ordenável nem parseável.
  date: string
  // ISO 8601. É o que ordena as listagens e o que vai para o schema.org,
  // que rejeita qualquer outro formato. Existe porque `date` é localizada:
  // "2026年4月16日" e "16 avril 2026" são o mesmo dia e nenhuma das duas
  // ordena.
  publishedAt: string
  readTime?: string
  tag?: string
  content?: string
  blocks?: ContentBlock[]
  draft?: boolean
  // Imagem Open Graph própria do post (fallback: /og-image.png do site)
  ogImage?: string
  // false => fora da grid da home (continua em busca, sitemap e URL direta)
  showOnHome?: boolean
  // Derivado do disco, não do JSON: há capa em public/blog/<slug>/cover.webp.
  // Deriva em vez de declarar porque este loader já lê do disco — um campo
  // manual poderia dizer true com o arquivo ausente.
  cover: boolean
}

const postsDir = path.join(process.cwd(), "data", "posts")
const coversDir = path.join(process.cwd(), "public", "blog")
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
    publishedAt: typeof data.publishedAt === "string" ? data.publishedAt : "",
    readTime: data.readTime ?? "",
    tag: data.tag ?? "",
    content: data.content ?? "",
    blocks: normalizeBlocks(data),
    draft: Boolean(data.draft),
    ogImage: typeof data.ogImage === "string" ? data.ogImage : undefined,
    showOnHome: data.showOnHome !== false,
    cover: fs.existsSync(path.join(coversDir, slug, "cover.webp")),
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
    const post = buildPost(file, raw, locale)
    // Drafts ficam fora de qualquer listagem (home, busca, sitemap) até publicar
    if (post.draft) continue
    posts.push(post)
  }

  // Mais recente primeiro. Substituiu uma curadoria manual (featured + order)
  // que acabou deixando três posts de frontend no topo de toda listagem e
  // enterrando arquitetura, pagamentos e IA — o oposto do posicionamento.
  //
  // Desempate por slug, não pela ordem de leitura do diretório: cinco posts
  // dividem a mesma data de importação e sem um critério estável a listagem
  // mudaria conforme o sistema de arquivos.
  posts.sort((a, b) => {
    if (a.publishedAt !== b.publishedAt) return a.publishedAt < b.publishedAt ? 1 : -1
    return a.slug.localeCompare(b.slug)
  })

  if (isProd) localePostsCache.set(locale, posts)
  return posts
})

// Acesso direto por slug inclui drafts — permite pré-visualizar pela URL
// enquanto o post não aparece em listagens (a página aplica noindex).
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

export function normalizeBlocks(data: Omit<Partial<Post>, "blocks"> & { blocks?: unknown[] }): ContentBlock[] {
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

export type RawPostData = Partial<Post> & {
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
  title_jp?: string
  description_jp?: string
  content_jp?: string
  blocks_jp?: unknown[]
  date_jp?: string
  readTime_jp?: string
  tag_jp?: string
  title_fr?: string
  description_fr?: string
  content_fr?: string
  blocks_fr?: unknown[]
  date_fr?: string
  readTime_fr?: string
  tag_fr?: string
  blocks?: unknown[]
}

export function applyLocaleToData(original: RawPostData, locale: Locale) {
  type LocalizedData = Omit<Partial<Post>, "blocks"> & { blocks?: unknown[] }
  const data = { ...(original as Record<string, unknown>) } as LocalizedData

  const suffix = locale === DEFAULT_LOCALE ? null : `_${locale}`

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

  return data as Omit<Partial<Post>, "blocks"> & { blocks?: unknown[] }
}
