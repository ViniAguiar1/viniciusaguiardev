"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"
import { isLocale, localePath, DEFAULT_LOCALE, type Locale } from "@/lib/i18n"
import { cn, MONO_CHIP } from "@/lib/utils"

type SearchPost = {
  slug: string
  title: string
  description: string
  tag?: string
  cover: boolean
}

type SearchProject = {
  slug: string
  name: string
  logo?: string
  tagline: string
  category: string
  detailPage?: string
}

interface SearchContentProps {
  posts: SearchPost[]
  projects: SearchProject[]
  locale: string
  labels: {
    placeholder: string
    posts: string
    projects: string
    noResults: string
    hint: string
  }
}

/**
 * Remove diacríticos antes de comparar. Num site em PT-BR ninguém digita
 * acento na caixa de busca, então "virtualizacao" precisa achar
 * "virtualização" — sem isso a busca falha no caso mais comum.
 */
function dobrar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
}

/** Onde o termo casou importa: título vale mais que tag, que vale mais que
 *  descrição. 0 significa que não casou. */
function pontuar(termo: string, campos: { titulo: string; tag?: string; desc: string }): number {
  if (!termo) return 1
  const t = dobrar(campos.titulo)
  const g = dobrar(campos.tag ?? "")
  const d = dobrar(campos.desc)
  if (t.includes(termo)) return 3
  if (g && g.includes(termo)) return 2
  if (d.includes(termo)) return 1
  return 0
}

export function SearchContent({ posts, projects, locale, labels }: SearchContentProps) {
  const safeLocale: Locale = isLocale(locale) ? locale : DEFAULT_LOCALE
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(() => searchParams.get("q") ?? "")

  // Query na URL: permite compartilhar uma busca e faz o botão voltar
  // funcionar. replace em vez de push para não empilhar uma entrada de
  // histórico por tecla digitada.
  useEffect(() => {
    const atual = searchParams.get("q") ?? ""
    if (atual === query) return
    const id = setTimeout(() => {
      router.replace(query ? `?q=${encodeURIComponent(query)}` : "?", { scroll: false })
    }, 250)
    return () => clearTimeout(id)
  }, [query, router, searchParams])

  const termo = dobrar(query)

  // Sem termo a lista sai inteira, em vez de uma página em branco: a busca
  // vira um índice navegável do que existe no site.
  const postsFiltrados = useMemo(
    () =>
      posts
        .map((p) => ({ p, s: pontuar(termo, { titulo: p.title, tag: p.tag, desc: p.description }) }))
        .filter((r) => r.s > 0)
        .sort((a, b) => b.s - a.s)
        .map((r) => r.p),
    [termo, posts],
  )

  const projetosFiltrados = useMemo(
    () =>
      projects
        .map((p) => ({ p, s: pontuar(termo, { titulo: p.name, tag: p.category, desc: p.tagline }) }))
        .filter((r) => r.s > 0)
        .sort((a, b) => b.s - a.s)
        .map((r) => r.p),
    [termo, projects],
  )

  const temResultado = postsFiltrados.length > 0 || projetosFiltrados.length > 0

  // Projeto sem página de detalhe cai na grade, ancorado no próprio card —
  // antes todos caíam em /projetos e o visitante tinha que procurar de novo.
  const destinoProjeto = (p: SearchProject) =>
    p.detailPage
      ? localePath(safeLocale, p.detailPage)
      : `${localePath(safeLocale, "/projetos")}#${p.slug}`

  return (
    <div>
      <div className="relative mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-mu" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={labels.placeholder}
          aria-label={labels.placeholder}
          autoFocus
          className="w-full border border-field bg-surface pl-11 pr-4 py-3.5 text-sm text-fg placeholder:text-mu outline-none transition-colors focus:border-fg"
        />
      </div>

      {termo && !temResultado ? (
        <p className="py-12 text-center text-sm text-mu">
          {labels.noResults} &ldquo;{query}&rdquo;
        </p>
      ) : null}

      {postsFiltrados.length > 0 ? (
        <section className="mb-10">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-mu">
            {labels.posts} · {postsFiltrados.length}
          </p>
          <div className="flex flex-col gap-2">
            {postsFiltrados.map((post) => (
              <Link
                key={post.slug}
                href={localePath(safeLocale, `/posts/${post.slug}`)}
                className="group flex items-start gap-4 border border-line bg-card p-4 transition-colors hover:border-field"
              >
                {post.cover ? (
                  <div className="relative flex-shrink-0 w-[72px] aspect-video overflow-hidden border border-line">
                    <Image
                      src={`/blog/${post.slug}/cover.webp`}
                      alt=""
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="min-w-0 flex-1">
                  {post.tag ? <span className={cn(MONO_CHIP)}>{post.tag}</span> : null}
                  <h2 className="mt-1.5 text-sm font-semibold leading-snug text-fg">{post.title}</h2>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-mu">{post.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {projetosFiltrados.length > 0 ? (
        <section>
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-mu">
            {labels.projects} · {projetosFiltrados.length}
          </p>
          <div className="flex flex-col gap-2">
            {projetosFiltrados.map((project) => (
              <Link
                key={project.slug}
                href={destinoProjeto(project)}
                className="group flex items-center gap-4 border border-line bg-card p-4 transition-colors hover:border-field"
              >
                {project.logo ? (
                  <div className="relative flex-shrink-0 w-10 h-10 border border-line bg-plate flex items-center justify-center overflow-hidden p-1">
                    <Image
                      src={project.logo}
                      alt=""
                      width={28}
                      height={28}
                      className="object-contain w-full h-full"
                    />
                  </div>
                ) : null}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="text-sm font-semibold text-fg">{project.name}</h2>
                    <span className={cn(MONO_CHIP, "flex-shrink-0")}>{project.category}</span>
                  </div>
                  <p className="mt-1 line-clamp-1 text-xs text-mu">{project.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
