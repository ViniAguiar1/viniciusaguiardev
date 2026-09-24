import { Suspense } from "react"
import { getLocale, t } from "@repo/i18n/server"
import { buildAlternates } from "@repo/i18n"
import { getAllPosts } from "@/lib/posts"
import { projects } from "@/data/projects"
import { SearchContent } from "@/components/search-content"
import { FadeIn } from "@/components/fade-in"
import { SectionEyebrow } from "@/components/section-eyebrow"

export async function generateMetadata() {
  const locale = await getLocale()
  return {
    title: t(locale, { pt: "Busca", en: "Search", es: "Búsqueda", jp: "検索", fr: "Recherche" }),
    description: t(locale, { pt: "Busque por posts, projetos e conteúdo no portfólio.", en: "Search for posts, projects and content in the portfolio.", es: "Busca posts, proyectos y contenido en el portafolio.", jp: "投稿、プロジェクト、ポートフォリオのコンテンツを検索。", fr: "Recherchez des articles, projets et contenus du portfolio." }),
    alternates: buildAlternates("/busca", locale),
  }
}

export default async function SearchPage() {
  const locale = await getLocale()

  const posts = getAllPosts(locale).map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description ?? "",
    tag: p.tag,
    cover: p.cover,
  }))

  const projectList = projects.map((p) => ({
    slug: p.slug,
    name: p.name,
    logo: p.logo,
    tagline: p.tagline[locale] ?? p.tagline.pt,
    category: p.category,
    detailPage: p.detailPage,
  }))

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12">
      <FadeIn>
        <header className="mb-8">
          <SectionEyebrow index="01">
            {t(locale, { pt: "Busca", en: "Search", es: "Búsqueda", jp: "検索", fr: "Recherche" })}
          </SectionEyebrow>
          <h1 className="font-medium leading-[1.05] tracking-[-0.025em] text-fg [font-size:clamp(1.875rem,3.6vw,3rem)]">
            {t(locale, { pt: "Busca", en: "Search", es: "Búsqueda", jp: "検索", fr: "Recherche" })}
          </h1>
          <p className="text-mu mt-3 leading-relaxed">
            {t(locale, { pt: "Encontre posts, projetos e conteúdo técnico.", en: "Find posts, projects and technical content.", es: "Encuentra posts, proyectos y contenido técnico.", jp: "投稿、プロジェクト、技術コンテンツを探す。", fr: "Trouvez des articles, projets et contenus techniques." })}
          </p>
        </header>
      </FadeIn>

      <FadeIn delay={100}>
        <Suspense fallback={null}>
        <SearchContent
          posts={posts}
          projects={projectList}
          locale={locale}
          labels={{
            placeholder: t(locale, { pt: "Digite para buscar...", en: "Type to search...", es: "Escribe para buscar...", jp: "入力して検索...", fr: "Tapez pour rechercher..." }),
            posts: t(locale, { pt: "Posts", en: "Posts", es: "Posts", jp: "投稿", fr: "Articles" }),
            projects: t(locale, { pt: "Projetos", en: "Projects", es: "Proyectos", jp: "プロジェクト", fr: "Projets" }),
            noResults: t(locale, { pt: "Nenhum resultado para", en: "No results for", es: "Sin resultados para", jp: "該当なし：", fr: "Aucun résultat pour" }),
            hint: t(locale, { pt: "Digite algo para buscar posts e projetos.", en: "Type something to search posts and projects.", es: "Escribe algo para buscar posts y proyectos.", jp: "投稿やプロジェクトを検索するには入力してください。", fr: "Tapez quelque chose pour rechercher des articles et projets." }),
          }}
        />
        </Suspense>
      </FadeIn>
    </div>
  )
}
