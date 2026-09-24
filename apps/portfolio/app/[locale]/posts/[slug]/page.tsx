import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug, ContentBlock } from "@/lib/posts"
import { cn, MONO_CHIP } from "@repo/ui/utils"
import Image from "next/image"
import { CodeBlock } from "@/components/code-block"
import { MicroFrontend } from "@/components/micro-frontend"
import { renderInline } from "@/lib/inline-md"
import React from "react"
import { getLocale } from "@repo/i18n/server"
import { LOCALES, isLocale, buildAlternates, SITE_URL, localePath, type Locale } from "@repo/i18n"
import { JsonLd } from "@/components/json-ld"

type PageProps = {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  const slugs = getAllPosts("pt").map((p) => p.slug)
  return LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, locale: rawLocale } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : await getLocale()
  const post = getPostBySlug(slug, locale)
  if (!post) return { title: "Post não encontrado" }
  const url = `${SITE_URL}${localePath(locale, `/posts/${slug}`)}`
  // Um ogImage declarado no JSON ganha da capa gerada: é trabalho manual e
  // não deve ser atropelado. Sem os dois, cai no card genérico do site.
  const ogImage =
    post.ogImage ||
    (post.cover ? `/blog/${slug}/og.jpg` : "/og-image.png")
  return {
    title: `${post.title} | Blog`,
    description: post.description ?? undefined,
    alternates: buildAlternates(`/posts/${slug}`, locale),
    // Drafts ficam acessíveis pela URL para preview, mas fora dos buscadores
    robots: post.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      url,
      siteName: "Vinicius Aguiar",
      title: post.title,
      description: post.description ?? undefined,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description ?? undefined,
      images: [ogImage],
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug, locale: rawLocale } = await params
  const locale: Locale = isLocale(rawLocale) ? rawLocale : await getLocale()
  const post = getPostBySlug(slug, locale)
  if (!post) return notFound()

  const blocks = (post.blocks || []) as ContentBlock[]

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12 overflow-hidden">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description ?? "",
          // ISO 8601, nunca `post.date`: aquela é localizada e o schema.org
          // não parseia "16 de abril de 2026" nem "2026年4月16日".
          datePublished: post.publishedAt,
          url: `${SITE_URL}${localePath(locale, `/posts/${slug}`)}`,
          author: {
            "@type": "Person",
            name: "Vinicius Aguiar",
            url: SITE_URL,
          },
          publisher: {
            "@type": "Person",
            name: "Vinicius Aguiar",
          },
        }}
      />
      {post.tag ? (
        <span
          className={cn(MONO_CHIP, "mb-4 inline-block")}
        >
          {post.tag}
        </span>
      ) : null}

      <h1 className="text-[clamp(1.875rem,3.6vw,3rem)] font-medium leading-[1.05] tracking-[-0.025em] mb-3 break-words text-fg">
        {post.title}
      </h1>
      <p className="text-xs font-mono uppercase tracking-[0.16em] text-mu mb-10">
        {post.date}
        {post.readTime ? ` · ${post.readTime}` : null}
      </p>

      <article className="space-y-6 text-[17px] leading-[1.75] min-w-0 text-fg">
        {blocks.length ? (
          blocks.map((block, i) => {
            switch (block.type) {
              case "heading": {
                const tagName: "h2" | "h3" | "h4" = block.level === 3 ? "h3" : block.level === 4 ? "h4" : "h2"
                const className = cn(
                  "font-semibold tracking-tight",
                  tagName === "h2" ? "text-2xl mt-8" : tagName === "h3" ? "text-xl mt-6" : "text-lg mt-4"
                )
                return React.createElement(tagName, { key: i, className }, renderInline(block.text))
              }
              case "paragraph":
                return (
                  <p key={i} className="text-fg">
                    {renderInline(block.text)}
                  </p>
                )
              case "code":
                return <CodeBlock key={i} code={block.code} language={block.language} />
              case "image":
                return (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <Image
                      src={block.src}
                      alt={block.alt || "Imagem do post"}
                      width={block.width || 1200}
                      height={block.height || 675}
                      className="border border-line w-full h-auto"
                    />
                    {block.alt ? (
                      <span className="text-xs text-mu">{block.alt}</span>
                    ) : null}
                  </div>
                )
              case "list": {
                const ListTag = block.ordered ? "ol" : "ul"
                return (
                  <ListTag
                    key={i}
                    className={cn(
                      block.ordered ? "list-decimal" : "list-disc",
                      "pl-6 space-y-1"
                    )}
                  >
                    {block.items.map((item, idx) => (
                      <li key={idx}>{renderInline(item)}</li>
                    ))}
                  </ListTag>
                )
              }
              case "mfe":
                return <MicroFrontend key={i} src={block.src} tag={block.tag} locale={locale} />
              default:
                return null
            }
          })
        ) : (
          <p className="text-mu">Em breve conteúdo deste post.</p>
        )}
      </article>
    </div>
  )
}
