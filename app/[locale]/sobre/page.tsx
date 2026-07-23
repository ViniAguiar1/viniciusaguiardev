import { cn } from "@/lib/utils"
import { getDictionary, getLocale, t } from "@/lib/i18n-server"
import { buildAlternates } from "@/lib/i18n"
import { ExperienceItem } from "@/components/experience-item"
import { experiences } from "@/data/experiences"

export async function generateMetadata() {
  const locale = await getLocale()
  return {
    title: t(locale, { pt: "Sobre", en: "About", es: "Acerca", jp: "プロフィール" }),
    description: t(locale, { pt: "Trajetória, experiência profissional, habilidades e tech stack de Vinicius Aguiar — Frontend Engineer.", en: "Journey, professional experience, skills and tech stack of Vinicius Aguiar — Frontend Engineer.", es: "Trayectoria, experiencia profesional, habilidades y tech stack de Vinicius Aguiar — Frontend Engineer.", jp: "Vinicius Aguiar（フロントエンドエンジニア）の経歴、実務経験、スキル、技術スタック。" }),
    alternates: buildAlternates("/sobre", locale),
  }
}

export default async function SobrePage() {
  const locale = await getLocale()
  const dict = getDictionary(locale)

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{dict.about.title}</h1>
        <p className="text-muted-foreground mt-2">{dict.about.subtitle}</p>
      </header>

      <section className={cn("rounded-lg border border-border bg-card text-card-foreground p-6 md:p-8")}>
        <div className="flex flex-col gap-6 md:gap-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Vinicius Aguiar</h2>

            <p className="mt-4 leading-relaxed">
              {t(locale, { pt: "Frontend Engineer com mentalidade de produto, especializado em construir aplicações web e mobile rápidas e escaláveis com React, Next.js e React Native — com foco em performance e experiência do usuário.", en: "Frontend Engineer with a product mindset, specialized in building fast, scalable web and mobile applications with React, Next.js and React Native — focused on performance and user experience.", es: "Frontend Engineer con mentalidad de producto, especializado en construir aplicaciones web y móviles rápidas y escalables con React, Next.js y React Native — con foco en performance y experiencia de usuario.", jp: "プロダクト思考のフロントエンドエンジニア。React、Next.js、React Nativeによる高速でスケーラブルなWeb・モバイルアプリケーション構築を専門とし、パフォーマンスとユーザー体験に注力。" })}
            </p>

            <p className="mt-3 leading-relaxed text-sm text-muted-foreground">
              {t(locale, { pt: "Na Chattie, atuo diretamente na evolução da frente de frontend de uma plataforma de outreach com IA usada por 100+ empresas. Reconstruí o inbox principal (~20.000 registros por workspace) com paginação cursor-based e virtualização de lista — reduzindo o payload inicial de ~6,7 MB para ~19 KB (~400x) e eliminando travamentos de interface.", en: "At Chattie, I work directly on the evolution of the frontend of an AI outreach platform used by 100+ companies. I rebuilt the main inbox (~20,000 records per workspace) with cursor-based pagination and list virtualization — cutting the initial payload from ~6.7 MB to ~19 KB (~400x) and eliminating UI freezes.", es: "En Chattie, actúo directamente en la evolución del frontend de una plataforma de outreach con IA usada por 100+ empresas. Reconstruí el inbox principal (~20.000 registros por workspace) con paginación cursor-based y virtualización de lista — reduciendo el payload inicial de ~6,7 MB a ~19 KB (~400x) y eliminando bloqueos de interfaz.", jp: "Chattieでは、100社以上が利用するAIアウトリーチプラットフォームのフロントエンドの進化に直接携わっています。メインインボックス（ワークスペースあたり約20,000件）をカーソルベースのページネーションとリスト仮想化で再構築し、初期ペイロードを約6.7MBから約19KBへ（約1/400）削減、UIのフリーズを解消しました。" })}
            </p>

            <p className="mt-3 leading-relaxed text-sm text-muted-foreground">
              {t(locale, { pt: "Capacidade full-stack como diferencial: integrações de pagamento, arquitetura multi-tenant, sistemas de IA (Anthropic Claude, Vercel AI SDK) e entrega em cloud (AWS, CI/CD) — sempre operando produtos SaaS reais em produção.", en: "Full-stack range as a differentiator: payment integrations, multi-tenant architecture, AI systems (Anthropic Claude, Vercel AI SDK) and cloud delivery (AWS, CI/CD) — always operating real SaaS products in production.", es: "Capacidad full-stack como diferencial: integraciones de pago, arquitectura multi-tenant, sistemas de IA (Anthropic Claude, Vercel AI SDK) y entrega en cloud (AWS, CI/CD) — siempre operando productos SaaS reales en producción.", jp: "フルスタック対応力が強み：決済連携、マルチテナントアーキテクチャ、AIシステム（Anthropic Claude、Vercel AI SDK）、クラウドデリバリー（AWS、CI/CD） — 常に実際のSaaSプロダクトを本番環境で運用。" })}
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-xl font-semibold mb-3">
            {t(locale, { pt: "Habilidades", en: "Skills", es: "Habilidades", jp: "スキル" })}
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>React, Next.js, TypeScript</li>
            <li>React Native, Node.js, Flutter, Swift (iOS)</li>
            <li>HTML5, CSS3, Tailwind, Design System</li>
            <li>
              {t(locale, { pt: "Integrações REST API, autenticação e fluxos de pagamento", en: "REST API integrations, authentication and payment flows", es: "Integraciones REST API, autenticación y flujos de pago", jp: "REST API連携、認証、決済フロー" })}
            </li>
            <li>
              {t(locale, { pt: "Testes, performance e prontidão para produção", en: "Testing, performance and production readiness", es: "Testing, rendimiento y preparación para producción", jp: "テスト、パフォーマンス、本番環境への準備" })}
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-xl font-semibold mb-3">
            {t(locale, { pt: "Interesses", en: "Interests", es: "Intereses", jp: "興味" })}
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>
              {t(locale, { pt: "Experiência do Usuário e acessibilidade", en: "User Experience and accessibility", es: "Experiencia de Usuario y accesibilidad", jp: "ユーザー体験とアクセシビリティ" })}
            </li>
            <li>
              {t(locale, { pt: "Arquitetura frontend e performance", en: "Frontend architecture and performance", es: "Arquitectura frontend y rendimiento", jp: "フロントエンドアーキテクチャとパフォーマンス" })}
            </li>
            <li>
              {t(locale, { pt: "IA aplicada a produtos digitais", en: "AI applied to digital products", es: "IA aplicada a productos digitales", jp: "デジタルプロダクトに応用するAI" })}
            </li>
          </ul>
        </div>
      </section>

      {/* Experience */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">
          {t(locale, { pt: "Experiência", en: "Experience", es: "Experiencia", jp: "実務経験" })}
        </h2>

        <ol className="mt-6 relative border-l border-border pl-6 space-y-10">
          {experiences.map((experience) => (
            <li key={experience.company} className="relative">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -left-[29px] top-1 h-2.5 w-2.5 rounded-full",
                  experience.current ? "bg-emerald-500 ring-4 ring-emerald-500/20" : "bg-border"
                )}
              />
              <ExperienceItem experience={experience} locale={locale} />
            </li>
          ))}
        </ol>
      </section>

      {/* Tech Stack */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">Tech Stack</h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "React", "React Native", "Next.js", "Node.js", "TypeScript",
            "HTML5", "CSS3", "Tailwind", "PostgreSQL", "Docker",
            "AWS", "Git", "Swift (iOS)", "Flutter", "Go",
            "Java", "CI/CD", "Testing", "Accessibility", "Design System",
            "Linux/macOS",
          ].map((tag) => (
            <span key={tag} className="rounded-md border border-border bg-muted/40 px-2 py-1 text-xs">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Core Concepts */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">
          {t(locale, { pt: "Conceitos-chave", en: "Core Concepts", es: "Conceptos clave", jp: "重要な概念" })}
        </h2>

        <ul className="mt-4 list-disc pl-5 space-y-2 text-sm">
          <li>{t(locale, { pt: "Performance de frontend — paginação cursor-based, virtualização de listas e otimização de payload", en: "Frontend performance — cursor-based pagination, list virtualization and payload optimization", es: "Performance de frontend — paginación cursor-based, virtualización de listas y optimización de payload", jp: "フロントエンドパフォーマンス — カーソルベースのページネーション、リスト仮想化、ペイロード最適化" })}</li>
          <li>{t(locale, { pt: "Arquitetura SaaS e desenho de sistemas prontos para produção", en: "SaaS Architecture and production-ready system design", es: "Arquitectura SaaS y diseño de sistemas listos para producción", jp: "SaaSアーキテクチャと本番環境向けシステム設計" })}</li>
          <li>{t(locale, { pt: "REST APIs, integrações, autenticação e serviços de pagamento", en: "REST APIs, system integrations, authentication and payment services", es: "REST APIs, integraciones, autenticación y servicios de pago", jp: "REST API、連携、認証、決済サービス" })}</li>
          <li>{t(locale, { pt: "Agentes de IA e fluxos de automação integrados a produtos reais", en: "AI Agents and automation workflows integrated into real products", es: "Agentes de IA y flujos de automatización integrados a productos reales", jp: "実プロダクトに統合されたAIエージェントと自動化フロー" })}</li>
          <li>{t(locale, { pt: "Entrega em cloud com AWS, pipelines de CI/CD e serviços em contêineres", en: "Cloud delivery with AWS, CI/CD pipelines and containerized services", es: "Entrega en cloud con AWS, pipelines de CI/CD y servicios en contenedores", jp: "AWSへのクラウドデリバリー、CI/CDパイプライン、コンテナ化されたサービス" })}</li>
          <li>{t(locale, { pt: "Estratégia de testes, confiabilidade, performance e usabilidade", en: "Testing strategy, reliability, performance and usability", es: "Estrategia de testing, confiabilidad, rendimiento y usabilidad", jp: "テスト戦略、信頼性、パフォーマンス、ユーザビリティ" })}</li>
          <li>{t(locale, { pt: "Execução ágil com Scrum/Kanban e ciclos iterativos de produto", en: "Agile execution with Scrum/Kanban and iterative product cycles", es: "Ejecución ágil con Scrum/Kanban y ciclos iterativos de producto", jp: "Scrum/Kanbanによるアジャイル実行と反復的なプロダクトサイクル" })}</li>
        </ul>
      </section>

      {/* Projects */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">
          {t(locale, { pt: "Projetos em destaque", en: "Featured Projects", es: "Proyectos destacados", jp: "注目のプロジェクト" })}
        </h2>

        <ul className="mt-4 list-disc pl-5 space-y-2 text-sm">
          <li>
            <span className="font-medium">Vox Pet Digital</span>
            <span className="text-muted-foreground">
              {" — "}
              {t(locale, { pt: "plataforma SaaS para pet shops e clínicas veterinárias com foco em gestão, agendamentos e relacionamento com clientes.", en: "SaaS platform for pet shops and veterinary clinics focused on scheduling, customer management and digital services.", es: "plataforma SaaS para pet shops y clínicas veterinarias enfocada en gestión, agendamiento y relación con clientes.", jp: "ペットショップと動物病院向けのSaaSプラットフォーム。管理、予約、顧客関係構築に特化。" })}
            </span>
          </li>
          <li>
            <span className="font-medium">X-Drop</span>
            <span className="text-muted-foreground">
              {" — "}
              {t(locale, { pt: "solução voltada à automação de e-commerce e integração com marketplaces.", en: "solution for e-commerce automation and marketplace integrations focused on operational efficiency.", es: "solución enfocada en automatización de e-commerce e integración con marketplaces.", jp: "Eコマース自動化とマーケットプレイス連携を中心としたソリューション。" })}
            </span>
          </li>
        </ul>
      </section>

      {/* Contact */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">
          {t(locale, { pt: "Contato", en: "Contact", es: "Contacto", jp: "連絡先" })}
        </h2>

        <ul className="mt-4 space-y-2 text-sm">
          <li>
            Email:{" "}
            <a className="text-primary underline-offset-4 hover:underline" href="mailto:vinicius.aguiar1@icloud.com">
              vinicius.aguiar1@icloud.com
            </a>
          </li>
          <li>
            GitHub:{" "}
            <a className="text-primary underline-offset-4 hover:underline" href="https://github.com/ViniAguiar1" target="_blank" rel="noreferrer">
              @ViniAguiar1
            </a>
          </li>
          <li>
            LinkedIn:{" "}
            <a className="text-primary underline-offset-4 hover:underline" href="https://www.linkedin.com/in/viniciusaguiar-araujo/" target="_blank" rel="noreferrer">
              viniciusaguiar-araujo
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}
