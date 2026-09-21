import Link from "next/link"
import { cn, MONO_CHIP } from "@/lib/utils"
import { getDictionary, getLocale, t } from "@/lib/i18n-server"
import { buildAlternates, localePath } from "@/lib/i18n"
import { ExperienceItem } from "@/components/experience-item"
import { experiences } from "@/data/experiences"
import { FadeIn } from "@/components/fade-in"
import { SectionEyebrow } from "@/components/section-eyebrow"

export async function generateMetadata() {
  const locale = await getLocale()
  return {
    title: t(locale, { pt: "Sobre", en: "About", es: "Acerca", jp: "プロフィール", fr: "À propos" }),
    description: t(locale, { pt: "Trajetória, experiência profissional, habilidades e tech stack de Vinicius Aguiar — Senior Product Engineer.", en: "Journey, professional experience, skills and tech stack of Vinicius Aguiar — Senior Product Engineer.", es: "Trayectoria, experiencia profesional, habilidades y tech stack de Vinicius Aguiar — Senior Product Engineer.", jp: "Vinicius Aguiar（シニアプロダクトエンジニア）の経歴、実務経験、スキル、技術スタック。", fr: "Parcours, expérience professionnelle, compétences et tech stack de Vinicius Aguiar — Senior Product Engineer." }),
    alternates: buildAlternates("/sobre", locale),
  }
}

export default async function SobrePage() {
  const locale = await getLocale()
  const dict = getDictionary(locale)

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      <header className="mb-8">
        <SectionEyebrow index="01">
            {t(locale, { pt: "Sobre", en: "About", es: "Acerca", jp: "プロフィール", fr: "À propos" })}
          </SectionEyebrow>
          <h1 className="font-medium leading-[1.05] tracking-[-0.025em] text-fg [font-size:clamp(1.875rem,3.6vw,3rem)]">{dict.about.title}</h1>
        <p className="text-mu mt-2">{dict.about.subtitle}</p>
      </header>

      {/* Bio sem caixa: envolver prosa numa borda nao acrescenta nada, e as
          seis caixas identicas empilhadas davam o mesmo peso visual para bio,
          skills, experiencia e contato. Agora sao secoes separadas por filete,
          com eyebrow numerado — o mesmo idioma da home e da /projetos. */}
      <FadeIn>
        <section className="max-w-2xl">

        
          
            <p className="mt-4 leading-relaxed">
              {t(locale, { pt: "Senior Product Engineer com mentalidade de produto, especializado em construir aplicações web e mobile rápidas e escaláveis com React, Next.js e React Native — com foco em performance e experiência do usuário.", en: "Senior Product Engineer with a product mindset, specialized in building fast, scalable web and mobile applications with React, Next.js and React Native — focused on performance and user experience.", es: "Senior Product Engineer con mentalidad de producto, especializado en construir aplicaciones web y móviles rápidas y escalables con React, Next.js y React Native — con foco en performance y experiencia de usuario.", jp: "プロダクト思考のシニアプロダクトエンジニア。React、Next.js、React Nativeによる高速でスケーラブルなWeb・モバイルアプリケーション構築を専門とし、パフォーマンスとユーザー体験に注力。", fr: "Senior Product Engineer doté d'une culture produit, spécialisé dans le développement d'applications web et mobiles rapides et scalables en React, Next.js et React Native — axé sur la performance et l'expérience utilisateur." })}
            </p>

            <p className="mt-3 leading-relaxed text-sm text-mu">
              {t(locale, { pt: "Na Chattie, atuo diretamente na evolução da frente de frontend de uma plataforma de outreach com IA usada por 165+ empresas. Reconstruí o inbox principal (~20.000 registros por workspace) com paginação cursor-based e virtualização de lista — reduzindo o payload inicial de ~6,7 MB para ~19 KB (~400x) e eliminando travamentos de interface.", en: "At Chattie, I work directly on the evolution of the frontend of an AI outreach platform used by 165+ companies. I rebuilt the main inbox (~20,000 records per workspace) with cursor-based pagination and list virtualization — cutting the initial payload from ~6.7 MB to ~19 KB (~400x) and eliminating UI freezes.", es: "En Chattie, actúo directamente en la evolución del frontend de una plataforma de outreach con IA usada por 165+ empresas. Reconstruí el inbox principal (~20.000 registros por workspace) con paginación cursor-based y virtualización de lista — reduciendo el payload inicial de ~6,7 MB a ~19 KB (~400x) y eliminando bloqueos de interfaz.", jp: "Chattieでは、165社以上が利用するAIアウトリーチプラットフォームのフロントエンドの進化に直接携わっています。メインインボックス（ワークスペースあたり約20,000件）をカーソルベースのページネーションとリスト仮想化で再構築し、初期ペイロードを約6.7MBから約19KBへ（約1/400）削減、UIのフリーズを解消しました。", fr: "Chez Chattie, je travaille directement à l'évolution du frontend d'une plateforme d'outreach IA utilisée par 165+ entreprises. J'ai reconstruit l'inbox principale (~20 000 enregistrements par workspace) avec une pagination cursor-based et une virtualisation de liste — réduisant le payload initial de ~6,7 MB à ~19 KB (~400x) et éliminant les blocages de l'interface." })}
            </p>

            <p className="mt-3 leading-relaxed text-sm text-mu">
              {t(locale, { pt: "Capacidade full-stack como diferencial: integrações de pagamento, arquitetura multi-tenant, sistemas de IA (Anthropic Claude, Vercel AI SDK) e entrega em cloud (AWS, CI/CD) — sempre operando produtos SaaS reais em produção.", en: "Full-stack range as a differentiator: payment integrations, multi-tenant architecture, AI systems (Anthropic Claude, Vercel AI SDK) and cloud delivery (AWS, CI/CD) — always operating real SaaS products in production.", es: "Capacidad full-stack como diferencial: integraciones de pago, arquitectura multi-tenant, sistemas de IA (Anthropic Claude, Vercel AI SDK) y entrega en cloud (AWS, CI/CD) — siempre operando productos SaaS reales en producción.", jp: "フルスタック対応力が強み：決済連携、マルチテナントアーキテクチャ、AIシステム（Anthropic Claude、Vercel AI SDK）、クラウドデリバリー（AWS、CI/CD） — 常に実際のSaaSプロダクトを本番環境で運用。", fr: "Une capacité full-stack comme atout : intégrations de paiement, architecture multi-tenant, systèmes d'IA (Anthropic Claude, Vercel AI SDK) et déploiement cloud (AWS, CI/CD) — toujours sur des produits SaaS réels en production." })}
            </p>
        </section>
      </FadeIn>

      <div className="my-10 h-px bg-line" />

      <FadeIn>
        <section>
          <SectionEyebrow index="02">
            {t(locale, { pt: "Experiência", en: "Experience", es: "Experiencia", jp: "実務経験", fr: "Expérience" })}
          </SectionEyebrow>

        <ol className="mt-6 relative border-l border-line pl-6 space-y-10">
          {experiences.map((experience) => (
            <li key={`${experience.company}-${experience.period.pt}`} className="relative">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -left-[29px] top-1 h-2.5 w-2.5 rounded-full",
                  experience.current ? "bg-fg" : "bg-line"
                )}
              />
              <ExperienceItem experience={experience} locale={locale} />
            </li>
          ))}
        </ol>
        </section>
      </FadeIn>

      <div className="my-10 h-px bg-line" />

      <FadeIn>
        <section>
          <SectionEyebrow index="03">
            {t(locale, { pt: "Skills", en: "Skills", es: "Skills", jp: "スキル", fr: "Compétences" })}
          </SectionEyebrow>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-mu">
            {t(locale, { pt: "Habilidades", en: "Skills", es: "Habilidades", jp: "スキル", fr: "Compétences" })}
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>React, Next.js, TypeScript</li>
            <li>React Native, Node.js, Flutter, Swift (iOS)</li>
            <li>HTML5, CSS3, Tailwind, Design System</li>
            <li>
              {t(locale, { pt: "Integrações REST API, autenticação e fluxos de pagamento", en: "REST API integrations, authentication and payment flows", es: "Integraciones REST API, autenticación y flujos de pago", jp: "REST API連携、認証、決済フロー", fr: "Intégrations API REST, authentification et flux de paiement" })}
            </li>
            <li>
              {t(locale, { pt: "Testes, performance e prontidão para produção", en: "Testing, performance and production readiness", es: "Testing, rendimiento y preparación para producción", jp: "テスト、パフォーマンス、本番環境への準備", fr: "Tests, performance et préparation à la mise en production" })}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-mu">
            {t(locale, { pt: "Interesses", en: "Interests", es: "Intereses", jp: "興味", fr: "Centres d'intérêt" })}
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>
              {t(locale, { pt: "Experiência do Usuário e acessibilidade", en: "User Experience and accessibility", es: "Experiencia de Usuario y accesibilidad", jp: "ユーザー体験とアクセシビリティ", fr: "Expérience utilisateur et accessibilité" })}
            </li>
            <li>
              {t(locale, { pt: "Arquitetura frontend e performance", en: "Frontend architecture and performance", es: "Arquitectura frontend y rendimiento", jp: "フロントエンドアーキテクチャとパフォーマンス", fr: "Architecture frontend et performance" })}
            </li>
            <li>
              {t(locale, { pt: "IA aplicada a produtos digitais", en: "AI applied to digital products", es: "IA aplicada a productos digitales", jp: "デジタルプロダクトに応用するAI", fr: "IA appliquée aux produits numériques" })}
            </li>
          </ul>
        </div>
          </div>
        </section>
      </FadeIn>

      <div className="my-10 h-px bg-line" />

      <FadeIn>
        <section>
          <SectionEyebrow index="04">
            {t(locale, { pt: "Tech Stack", en: "Tech Stack", es: "Tech Stack", jp: "技術スタック", fr: "Tech Stack" })}
          </SectionEyebrow>

        
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "React", "React Native", "Next.js", "Node.js", "NestJS",
            "TypeScript", "HTML5", "CSS3", "Tailwind", "PostgreSQL",
            "MongoDB", "Firebase", "Docker", "Kubernetes", "AWS",
            "Git", "Swift (iOS)", "Flutter", "Go", "Java",
            "CI/CD", "Testing", "Accessibility", "Design System",
            "Linux/macOS",
          ].map((tag) => (
            <span key={tag} className={MONO_CHIP}>
              {tag}
            </span>
          ))}
        </div>
        </section>
      </FadeIn>

      <div className="my-10 h-px bg-line" />

      <FadeIn>
        <section>
          <SectionEyebrow index="05">
            {t(locale, { pt: "Conceitos-chave", en: "Core Concepts", es: "Conceptos clave", jp: "重要な概念", fr: "Concepts clés" })}
          </SectionEyebrow>

        <ul className="mt-4 list-disc pl-5 space-y-2 text-sm">
          <li>{t(locale, { pt: "Performance de frontend — paginação cursor-based, virtualização de listas e otimização de payload", en: "Frontend performance — cursor-based pagination, list virtualization and payload optimization", es: "Performance de frontend — paginación cursor-based, virtualización de listas y optimización de payload", jp: "フロントエンドパフォーマンス — カーソルベースのページネーション、リスト仮想化、ペイロード最適化", fr: "Performance frontend — pagination cursor-based, virtualisation de listes et optimisation du payload" })}</li>
          <li>{t(locale, { pt: "Arquitetura SaaS e desenho de sistemas prontos para produção", en: "SaaS Architecture and production-ready system design", es: "Arquitectura SaaS y diseño de sistemas listos para producción", jp: "SaaSアーキテクチャと本番環境向けシステム設計", fr: "Architecture SaaS et conception de systèmes prêts pour la production" })}</li>
          <li>{t(locale, { pt: "REST APIs, integrações, autenticação e serviços de pagamento", en: "REST APIs, system integrations, authentication and payment services", es: "REST APIs, integraciones, autenticación y servicios de pago", jp: "REST API、連携、認証、決済サービス", fr: "API REST, intégrations, authentification et services de paiement" })}</li>
          <li>{t(locale, { pt: "Agentes de IA e fluxos de automação integrados a produtos reais", en: "AI Agents and automation workflows integrated into real products", es: "Agentes de IA y flujos de automatización integrados a productos reales", jp: "実プロダクトに統合されたAIエージェントと自動化フロー", fr: "Agents d'IA et flux d'automatisation intégrés à des produits réels" })}</li>
          <li>{t(locale, { pt: "Entrega em cloud com AWS, pipelines de CI/CD e serviços em contêineres", en: "Cloud delivery with AWS, CI/CD pipelines and containerized services", es: "Entrega en cloud con AWS, pipelines de CI/CD y servicios en contenedores", jp: "AWSへのクラウドデリバリー、CI/CDパイプライン、コンテナ化されたサービス", fr: "Déploiement cloud avec AWS, pipelines de CI/CD et services conteneurisés" })}</li>
          <li>{t(locale, { pt: "Estratégia de testes, confiabilidade, performance e usabilidade", en: "Testing strategy, reliability, performance and usability", es: "Estrategia de testing, confiabilidad, rendimiento y usabilidad", jp: "テスト戦略、信頼性、パフォーマンス、ユーザビリティ", fr: "Stratégie de tests, fiabilité, performance et utilisabilité" })}</li>
          <li>{t(locale, { pt: "Execução ágil com Scrum/Kanban e ciclos iterativos de produto", en: "Agile execution with Scrum/Kanban and iterative product cycles", es: "Ejecución ágil con Scrum/Kanban y ciclos iterativos de producto", jp: "Scrum/Kanbanによるアジャイル実行と反復的なプロダクトサイクル", fr: "Exécution agile avec Scrum/Kanban et cycles produit itératifs" })}</li>
        </ul>
        </section>
      </FadeIn>

      <div className="my-10 h-px bg-line" />

      <FadeIn>
        <Link
          href={localePath(locale, "/projetos")}
          className="group inline-flex items-center gap-3 text-sm text-fg transition-colors hover:text-mu"
        >
          {t(locale, { pt: "Ver todos os projetos", en: "See all projects", es: "Ver todos los proyectos", jp: "すべてのプロジェクトを見る", fr: "Voir tous les projets" })}
          <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>
      </FadeIn>
    </div>
  )
}
