import { getDictionary, getLocale, t } from "@repo/i18n/server"
import { buildAlternates } from "@repo/i18n"
import { projects } from "@/data/projects"
import { ProjectsGrid } from "@/components/projects-grid"
import { FadeIn } from "@/components/fade-in"
import { SectionEyebrow } from "@/components/section-eyebrow"

export async function generateMetadata() {
  const locale = await getLocale()
  return {
    title: t(locale, { pt: "Projetos", en: "Projects", es: "Proyectos", jp: "プロジェクト", fr: "Projets" }),
    description: t(locale, { pt: "Empresas e produtos onde atuei — SaaS, marketplaces, ERPs e plataformas digitais.", en: "Companies and products I've worked on — SaaS, marketplaces, ERPs and digital platforms.", es: "Empresas y productos donde trabajé — SaaS, marketplaces, ERPs y plataformas digitales.", jp: "携わった企業とプロダクト — SaaS、マーケットプレイス、ERP、デジタルプラットフォーム。", fr: "Entreprises et produits sur lesquels j'ai travaillé — SaaS, marketplaces, ERP et plateformes digitales." }),
    alternates: buildAlternates("/projetos", locale),
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
          <SectionEyebrow index="01">
            {t(locale, { pt: "Projetos", en: "Projects", es: "Proyectos", jp: "プロジェクト", fr: "Projets" })}
          </SectionEyebrow>
          <h1 className="font-medium leading-[1.05] tracking-[-0.025em] text-fg [font-size:clamp(1.875rem,3.6vw,3rem)]">
            {dict.projects.title}
          </h1>
          <p className="text-mu mt-3 max-w-2xl leading-relaxed">
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

    </div>
  )
}
