import { getDictionary, getLocale, t } from "@/lib/i18n-server"
import { projects } from "@/data/projects"
import { ProjectsGrid } from "@/components/projects-grid"
import { FadeIn } from "@/components/fade-in"

export async function generateMetadata() {
  const locale = await getLocale()
  return {
    title: t(locale, "Projetos", "Projects", "Proyectos"),
    description: t(
      locale,
      "Empresas e produtos onde atuei como Software Engineer — SaaS, marketplaces, ERPs e plataformas digitais.",
      "Companies and products where I worked as a Software Engineer — SaaS, marketplaces, ERPs and digital platforms.",
      "Empresas y productos donde trabajé como Software Engineer — SaaS, marketplaces, ERPs y plataformas digitales."
    ),
  }
}

export default async function ProjectsPage() {
  const locale = await getLocale()
  const dict = getDictionary(locale)

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <FadeIn>
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {dict.projects.title}
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            {dict.projects.subtitle}
          </p>
        </header>
      </FadeIn>

      {/* Projects grid + modal */}
      <FadeIn delay={100}>
        <section>
          <ProjectsGrid projects={projects} locale={locale} />
        </section>
      </FadeIn>

      {/* Footer stats */}
      <FadeIn delay={200}>
      <section className="mt-10 rounded-lg border border-border bg-card p-6">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold">{projects.length}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {t(locale, "Projetos", "Projects", "Proyectos")}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold">6+</div>
            <div className="text-xs text-muted-foreground mt-1">
              {t(locale, "Segmentos", "Industries", "Sectores")}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold">Web + Mobile</div>
            <div className="text-xs text-muted-foreground mt-1">
              {t(locale, "Entrega full-stack", "Full-stack Delivery", "Entrega full-stack")}
            </div>
          </div>
        </div>
      </section>
      </FadeIn>
    </div>
  )
}
