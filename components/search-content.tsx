"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, FileText, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"

type SearchPost = {
  slug: string
  title: string
  description: string
  tag?: string
  tagColor?: string
}

type SearchProject = {
  slug: string
  name: string
  logo: string
  tagline: string
  category: string
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

export function SearchContent({ posts, projects, locale, labels }: SearchContentProps) {
  const [query, setQuery] = useState("")

  const q = query.toLowerCase().trim()

  const filteredPosts = useMemo(() => {
    if (!q) return []
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tag && p.tag.toLowerCase().includes(q))
    )
  }, [q, posts])

  const filteredProjects = useMemo(() => {
    if (!q) return []
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }, [q, projects])

  const hasResults = filteredPosts.length > 0 || filteredProjects.length > 0

  return (
    <div>
      {/* Search input */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={labels.placeholder}
          autoFocus
          className="w-full rounded-lg border border-border bg-card pl-12 pr-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </div>

      {/* Empty state */}
      {!q && (
        <p className="text-sm text-muted-foreground text-center py-12">
          {labels.hint}
        </p>
      )}

      {/* No results */}
      {q && !hasResults && (
        <p className="text-sm text-muted-foreground text-center py-12">
          {labels.noResults} &ldquo;{query}&rdquo;
        </p>
      )}

      {/* Posts results */}
      {filteredPosts.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {labels.posts}
            </h2>
            <span className="text-xs text-muted-foreground">({filteredPosts.length})</span>
          </div>
          <div className="space-y-2">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="group flex items-start gap-4 rounded-lg border border-border bg-card p-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {post.tag && (
                      <span className={cn("text-[10px] font-semibold uppercase px-2 py-0.5 rounded text-white", post.tagColor || "bg-primary")}>
                        {post.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Projects results */}
      {filteredProjects.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {labels.projects}
            </h2>
            <span className="text-xs text-muted-foreground">({filteredProjects.length})</span>
          </div>
          <div className="space-y-2">
            {filteredProjects.map((project) => (
              <Link
                key={project.slug}
                href="/projetos"
                className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="relative flex-shrink-0 w-10 h-10 rounded-lg border border-border bg-muted/30 flex items-center justify-center overflow-hidden">
                  <Image src={project.logo} alt={project.name} width={28} height={28} className="object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <span className="text-[10px] font-medium rounded-full px-2 py-0.5 bg-muted text-muted-foreground">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {project.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
