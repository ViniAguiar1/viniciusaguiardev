import { getDictionary, getLocale } from "@/lib/i18n-server"
import { getFeaturedProjects, getOtherProjects } from "@/data/projects"
import { ProjectCard } from "@/components/project-card"
import { ProjectGridCard } from "@/components/project-grid-card"

export const metadata = {
  title: "Projetos | Projects",
  description: "Projetos reais que construí — SaaS, plataformas e integrações.",
}

export default async function ProjectsPage() {
  const locale = await getLocale()
  const dict = getDictionary(locale)
  const featured = getFeaturedProjects()
  const others = getOtherProjects()

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {dict.projects.title}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          {dict.projects.subtitle}
        </p>
      </header>

      {/* Featured Projects */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-xl font-semibold">
            {dict.projects.featured}
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="space-y-6">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} />
          ))}
        </div>
      </section>

      {/* All Projects */}
      {others.length > 0 && (
        <section className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-semibold">
              {dict.projects.all}
            </h2>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {others.map((project) => (
              <ProjectGridCard key={project.slug} project={project} locale={locale} />
            ))}
          </div>
        </section>
      )}

      {/* Summary stats */}
      <section className="mt-12 rounded-lg border border-border bg-card p-6 md:p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold">4+</div>
            <div className="text-sm text-muted-foreground mt-1">
              {locale === "en" ? "Production Projects" : "Projetos em produção"}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold">SaaS</div>
            <div className="text-sm text-muted-foreground mt-1">
              {locale === "en" ? "Architecture Focus" : "Foco em arquitetura"}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold">10+</div>
            <div className="text-sm text-muted-foreground mt-1">
              {locale === "en" ? "Integrations Delivered" : "Integrações entregues"}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold">Web + Mobile</div>
            <div className="text-sm text-muted-foreground mt-1">
              {locale === "en" ? "Full-stack Delivery" : "Entrega full-stack"}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
