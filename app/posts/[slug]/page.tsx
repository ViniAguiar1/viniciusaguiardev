import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug, ContentBlock } from "@/lib/posts"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { CodeBlock } from "@/components/code-block"
import { renderInline } from "@/lib/inline-md"
import React from "react"
import { getLocale } from "@/lib/i18n-server"

type PageProps = {
  params: { slug: string }
}

export function generateStaticParams() {
  // Gera apenas pelos slugs independentes de idioma
  return getAllPosts("pt").map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const locale = await getLocale()
  const post = getPostBySlug(params.slug, locale)
  if (!post) return { title: "Post não encontrado" }
  return {
    title: `${post.title} | Blog`,
    description: post.description ?? undefined,
  }
}

export default async function PostPage({ params }: PageProps) {
  const locale = await getLocale()
  const post = getPostBySlug(params.slug, locale)
  if (!post) return notFound()

  const blocks = (post.blocks || []) as ContentBlock[]

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12">
      {post.tag ? (
        <span
          className={cn(
            "uppercase text-white text-xs font-semibold px-3 py-1 rounded shadow-sm mb-4 inline-block",
            post.tagColor || "bg-primary text-primary-foreground"
          )}
        >
          {post.tag}
        </span>
      ) : null}

      <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-2">
        {post.title}
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        {post.date}
        {post.readTime ? ` · ${post.readTime}` : null}
      </p>

      <article className="space-y-6 text-base leading-relaxed">
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
                  <p key={i} className="text-foreground/90">
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
                      className="rounded-md border border-border"
                    />
                    {block.alt ? (
                      <span className="text-xs text-muted-foreground">{block.alt}</span>
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
              default:
                return null
            }
          })
        ) : (
          <p className="text-muted-foreground">Em breve conteúdo deste post.</p>
        )}
      </article>
    </div>
  )
}
