import { getLocale, t } from "@/lib/i18n-server"
import { getAllPosts } from "@/lib/posts"
import { projects } from "@/data/projects"
import { SearchContent } from "@/components/search-content"
import { FadeIn } from "@/components/fade-in"

export async function generateMetadata() {
  const locale = await getLocale()
  return {
    title: t(locale, "Busca", "Search", "Búsqueda"),
    description: t(
      locale,
      "Busque por posts, projetos e conteúdo no portfólio.",
      "Search for posts, projects and content in the portfolio.",
      "Busca posts, proyectos y contenido en el portafolio."
    ),
  }
}

export default async function SearchPage() {
  const locale = await getLocale()

  const posts = getAllPosts(locale).map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description ?? "",
    tag: p.tag,
    tagColor: p.tagColor,
  }))

  const projectList = projects.map((p) => ({
    slug: p.slug,
    name: p.name,
    logo: p.logo,
    tagline: p.tagline[locale] ?? p.tagline.pt,
    category: p.category,
  }))

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12">
      <FadeIn>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t(locale, "Busca", "Search", "Búsqueda")}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t(
              locale,
              "Encontre posts, projetos e conteúdo técnico.",
              "Find posts, projects and technical content.",
              "Encuentra posts, proyectos y contenido técnico."
            )}
          </p>
        </header>
      </FadeIn>

      <FadeIn delay={100}>
        <SearchContent
          posts={posts}
          projects={projectList}
          locale={locale}
          labels={{
            placeholder: t(locale, "Digite para buscar...", "Type to search...", "Escribe para buscar..."),
            posts: t(locale, "Posts", "Posts", "Posts"),
            projects: t(locale, "Projetos", "Projects", "Proyectos"),
            noResults: t(locale, "Nenhum resultado para", "No results for", "Sin resultados para"),
            hint: t(locale, "Digite algo para buscar posts e projetos.", "Type something to search posts and projects.", "Escribe algo para buscar posts y proyectos."),
          }}
        />
      </FadeIn>
    </div>
  )
}
