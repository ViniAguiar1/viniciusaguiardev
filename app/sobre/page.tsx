import { cn } from "@/lib/utils"
import { getDictionary, getLocale, t } from "@/lib/i18n-server"
import { ExperienceItem } from "@/components/experience-item"

export async function generateMetadata() {
  const locale = await getLocale()
  return {
    title: t(locale, "Sobre", "About", "Acerca"),
    description: t(
      locale,
      "Trajetória, experiência profissional, habilidades e tech stack de Vinicius Aguiar — Software Engineer.",
      "Journey, professional experience, skills and tech stack of Vinicius Aguiar — Software Engineer.",
      "Trayectoria, experiencia profesional, habilidades y tech stack de Vinicius Aguiar — Software Engineer."
    ),
  }
}

const experiencesPt = [
  {
    period: "Nov 2025 — atual · Tempo integral · Minas Gerais, Brasil · Remoto",
    title: "Mid-level Software Engineer · Holy Solutions",
    summary:
      "Desenvolvimento de aplicações web e mobile utilizando React, Next.js e React Native, com foco em interfaces escaláveis e experiências centradas no usuário.",
    details: [
      "Desenvolvimento end-to-end de features com APIs externas, pagamentos e serviços com IA",
      "Desenvolvimento de interfaces web e mobile com React, Next.js e React Native",
      "Integração com APIs externas e sistemas de pagamento (Asaas)",
      "Criação de componentes reutilizáveis e padronização de Design System",
      "Participação em decisões técnicas de arquitetura frontend e integrações de sistemas",
      "Deploy e operação de aplicações em ambientes AWS",
    ],
  },
  {
    period: "Ago 2025 — atual · Meio período · Remoto",
    title: "Software Engineer · Vox Pet Digital",
    summary:
      "Atuação como Software Engineer no SaaS Vox Pet Digital para pet shops e clínicas veterinárias, participando diretamente da evolução do produto.",
    details: [
      "Implementação de módulos de agenda, vendas, financeiro e comissões",
      "Desenvolvimento de automações via WhatsApp conectadas ao fluxo operacional",
      "Integração de IA no WhatsApp para atendimento automatizado e recomendação de produtos/serviços",
      "Fluxos de finalização de vendas com registro dos dados no sistema",
      "Stack: React, Next.js, Node.js, TypeScript e PostgreSQL",
      "Integrações: WhatsApp, OpenAI, Mercado Pago e Stripe",
      "Acompanhamento de deploy e operação do sistema em produção",
    ],
  },
  {
    period: "Abr 2025 — Jan 2026 · Tempo integral · São Paulo, Brasil · Remoto",
    title: "Software Engineer · Stack Labs",
    summary:
      "Atuei no desenvolvimento de aplicações web e mobile para diferentes clientes, entregando interfaces performáticas e escaláveis com React, Next.js e React Native.",
    details: [
      "Criação de interfaces responsivas e performáticas com React, React Native e Next.js",
      "Construção de componentes reutilizáveis e arquitetura frontend orientada a escalabilidade",
      "Integração com APIs REST e serviços externos (pagamentos, notificações, autenticação, analytics)",
      "Otimização de performance, experiência do usuário e redução de erros em produção",
      "Acompanhamento de deploys, monitoramento de logs e colaboração em todo o ciclo de desenvolvimento",
    ],
  },
  {
    period: "Mai 2025 — Nov 2025 · Tempo integral · São Paulo, Brasil · Remoto",
    title: "Software Engineer · MovePro",
    summary:
      "Participei do desenvolvimento completo da plataforma MovePro (web + mobile), contribuindo para interfaces críticas usadas por milhares de usuários e liderando integrações essenciais.",
    details: [
      "Desenvolvimento das interfaces web com React e Next.js, com foco em performance e escalabilidade",
      "Criação e manutenção do aplicativo mobile com React Native e Expo",
      "Integração com serviços externos como Stripe, FatSecret, Google e Firebase",
      "Otimização de queries e consumo de APIs, reduzindo tempo de carregamento e latência",
      "Implementação de monitoramento com Crashlytics, logs e métricas",
      "Desenvolvimento de componentes e UX consistente para todo o ecossistema MovePro",
      "Participação em decisões técnicas, ciclos de release e evolução do produto",
    ],
  },
  {
    period: "Mai 2024 — Jun 2025 · Híbrido",
    title: "Web Developer / Mobile Developer · Easytogo",
    summary:
      "Desenvolvimento de interfaces web e mobile com React, Next.js, React Native e Flutter em ambiente ágil e orientado a produto.",
    details: [
      "Desenvolvimento com React e Next.js",
      "Aplicações mobile com React Native e Flutter",
      "Integração com APIs conectadas a fluxos reais de usuário",
      "Trabalho em ambiente ágil com Scrum",
    ],
  },
]

const experiencesEn = [
  {
    period: "Nov 2025 — present · Full-time · Minas Gerais, Brazil · Remote",
    title: "Mid-level Software Engineer · Holy Solutions",
    summary:
      "Development of web and mobile applications using React, Next.js and React Native, focused on building scalable interfaces and user-centric experiences.",
    details: [
      "End-to-end feature development with external APIs, payment systems and AI-powered services",
      "Development of web and mobile interfaces with React, Next.js and React Native",
      "Integration with external APIs and payment systems (Asaas)",
      "Creation of reusable components and Design System standardization",
      "Participation in technical decisions for frontend architecture and system integrations",
      "Deployment and operation of applications in AWS cloud environments",
    ],
  },
  {
    period: "Aug 2025 — present · Part-time · Remote",
    title: "Software Engineer · Vox Pet Digital",
    summary:
      "Software Engineer at Vox Pet Digital (SaaS for pet shops and veterinary clinics), contributing directly to product evolution across core business modules.",
    details: [
      "Implementation of modules such as scheduling, sales, finance and commissions",
      "Development of WhatsApp automation workflows connected to operations",
      "AI integration in WhatsApp for automated support, recommendations and sales completion",
      "Data registration from AI-assisted flows back into the SaaS platform",
      "Stack: React, Next.js, Node.js, TypeScript and PostgreSQL",
      "Integrations: WhatsApp, OpenAI, Mercado Pago and Stripe",
      "Follow-up on system deployment and production operation",
    ],
  },
  {
    period: "Apr 2025 — Jan 2026 · Full-time · São Paulo, Brazil · Remote",
    title: "Software Engineer · Stack Labs",
    summary:
      "Development of web and mobile applications for different clients, delivering scalable and high-performance interfaces with React, Next.js and React Native.",
    details: [
      "Creation of responsive and high-performance interfaces with React, React Native and Next.js",
      "Reusable components and frontend architecture focused on scalability",
      "Integration with REST APIs and external services (payments, notifications, auth, analytics)",
      "Performance and UX optimization with reduction of production errors",
      "Follow-up on deployments, log monitoring and full-cycle collaboration",
    ],
  },
  {
    period: "May 2025 — Nov 2025 · Full-time · São Paulo, Brazil · Remote",
    title: "Software Engineer · MovePro",
    summary:
      "Contributed to end-to-end development of the MovePro platform (web + mobile), building critical interfaces used by thousands of users and leading key integrations.",
    details: [
      "Development of web interfaces with React and Next.js focused on performance and scalability",
      "Creation and maintenance of the mobile app using React Native and Expo",
      "Integration with Stripe, FatSecret, Google and Firebase services",
      "Query and API consumption optimization to reduce loading time and latency",
      "Monitoring implementation with Crashlytics, logs and product metrics",
      "UX-consistent component development across the MovePro ecosystem",
      "Participation in technical decisions, release cycles and product evolution",
    ],
  },
  {
    period: "May 2024 — Jun 2025 · Hybrid",
    title: "Web Developer / Mobile Developer · Easytogo",
    summary:
      "Development of responsive web and mobile interfaces using React, Next.js, React Native and Flutter in an agile and product-oriented environment.",
    details: [
      "Development with React and Next.js",
      "Mobile applications with React Native and Flutter",
      "API integrations connected to real-world user workflows",
      "Agile teamwork using Scrum",
    ],
  },
]

const experiencesEs = [
  {
    period: "Nov 2025 — presente · Tiempo completo · Minas Gerais, Brasil · Remoto",
    title: "Mid-level Software Engineer · Holy Solutions",
    summary:
      "Desarrollo de aplicaciones web y móviles con React, Next.js y React Native, enfocado en interfaces escalables y experiencias centradas en el usuario.",
    details: [
      "Desarrollo end-to-end de features con APIs externas, pagos y servicios con IA",
      "Desarrollo de interfaces web y móviles con React, Next.js y React Native",
      "Integración con APIs externas y sistemas de pago (Asaas)",
      "Creación de componentes reutilizables y estandarización de Design System",
      "Participación en decisiones técnicas de arquitectura frontend e integraciones de sistemas",
      "Deploy y operación de aplicaciones en ambientes AWS",
    ],
  },
  {
    period: "Ago 2025 — presente · Medio tiempo · Remoto",
    title: "Software Engineer · Vox Pet Digital",
    summary:
      "Software Engineer en el SaaS Vox Pet Digital para pet shops y clínicas veterinarias, participando directamente en la evolución del producto.",
    details: [
      "Implementación de módulos de agenda, ventas, financiero y comisiones",
      "Desarrollo de automatizaciones vía WhatsApp conectadas al flujo operacional",
      "Integración de IA en WhatsApp para atención automatizada y recomendación de productos/servicios",
      "Flujos de cierre de ventas con registro de datos en el sistema",
      "Stack: React, Next.js, Node.js, TypeScript y PostgreSQL",
      "Integraciones: WhatsApp, OpenAI, Mercado Pago y Stripe",
      "Seguimiento de deploy y operación del sistema en producción",
    ],
  },
  {
    period: "Abr 2025 — Ene 2026 · Tiempo completo · São Paulo, Brasil · Remoto",
    title: "Software Engineer · Stack Labs",
    summary:
      "Desarrollo de aplicaciones web y móviles para diferentes clientes, entregando interfaces performantes y escalables con React, Next.js y React Native.",
    details: [
      "Creación de interfaces responsivas y performantes con React, React Native y Next.js",
      "Componentes reutilizables y arquitectura frontend orientada a escalabilidad",
      "Integración con APIs REST y servicios externos (pagos, notificaciones, autenticación, analytics)",
      "Optimización de performance, experiencia de usuario y reducción de errores en producción",
      "Seguimiento de deploys, monitoreo de logs y colaboración en todo el ciclo de desarrollo",
    ],
  },
  {
    period: "May 2025 — Nov 2025 · Tiempo completo · São Paulo, Brasil · Remoto",
    title: "Software Engineer · MovePro",
    summary:
      "Participé en el desarrollo completo de la plataforma MovePro (web + móvil), contribuyendo en interfaces críticas usadas por miles de usuarios y liderando integraciones esenciales.",
    details: [
      "Desarrollo de interfaces web con React y Next.js, enfocado en performance y escalabilidad",
      "Creación y mantenimiento de la app móvil con React Native y Expo",
      "Integración con servicios externos como Stripe, FatSecret, Google y Firebase",
      "Optimización de queries y consumo de APIs, reduciendo tiempo de carga y latencia",
      "Implementación de monitoreo con Crashlytics, logs y métricas de producto",
      "Desarrollo de componentes y UX consistente en todo el ecosistema MovePro",
      "Participación en decisiones técnicas, ciclos de release y evolución del producto",
    ],
  },
  {
    period: "May 2024 — Jun 2025 · Híbrido",
    title: "Web Developer / Mobile Developer · Easytogo",
    summary:
      "Desarrollo de interfaces web y móviles con React, Next.js, React Native y Flutter en ambiente ágil y orientado a producto.",
    details: [
      "Desarrollo con React y Next.js",
      "Aplicaciones móviles con React Native y Flutter",
      "Integración con APIs conectadas a flujos reales de usuario",
      "Trabajo en ambiente ágil con Scrum",
    ],
  },
]

export default async function SobrePage() {
  const locale = await getLocale()
  const dict = getDictionary(locale)
  const experiences = locale === "en" ? experiencesEn : locale === "es" ? experiencesEs : experiencesPt

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
              {t(
                locale,
                "Frontend Software Engineer especializado no desenvolvimento de aplicações web e mobile modernas com o ecossistema JavaScript/TypeScript, com forte atuação em React, Next.js e React Native.",
                "Frontend Software Engineer specialized in building modern web and mobile applications using the JavaScript/TypeScript ecosystem, with strong focus on React, Next.js and React Native.",
                "Frontend Software Engineer especializado en el desarrollo de aplicaciones web y móviles modernas con el ecosistema JavaScript/TypeScript, con fuerte enfoque en React, Next.js y React Native."
              )}
            </p>

            <p className="mt-3 leading-relaxed text-sm text-muted-foreground">
              {t(
                locale,
                "Experiência no desenvolvimento e operação de produtos SaaS em produção, incluindo integrações com APIs, sistemas de autenticação, serviços de pagamento e fluxos reais de usuários.",
                "Experience developing and operating SaaS products in production, including API integrations, authentication systems, payment services and real-world user workflows.",
                "Experiencia en el desarrollo y operación de productos SaaS en producción, incluyendo integraciones con APIs, sistemas de autenticación, servicios de pago y flujos reales de usuarios."
              )}
            </p>

            <p className="mt-3 leading-relaxed text-sm text-muted-foreground">
              {t(
                locale,
                "Execução orientada a produto com entrega em cloud (AWS, CI/CD e serviços em contêineres), além de automações com IA integradas a aplicações reais.",
                "Product-driven execution with cloud-based delivery (AWS, CI/CD and containerized services), plus AI-augmented automation flows integrated into real applications.",
                "Ejecución orientada a producto con entrega en cloud (AWS, CI/CD y servicios en contenedores), además de automatizaciones con IA integradas a aplicaciones reales."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-xl font-semibold mb-3">
            {t(locale, "Habilidades", "Skills", "Habilidades")}
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>React, Next.js, TypeScript</li>
            <li>React Native, Node.js, Flutter, Swift (iOS)</li>
            <li>HTML5, CSS3, Tailwind, Design System</li>
            <li>
              {t(
                locale,
                "Integrações REST API, autenticação e fluxos de pagamento",
                "REST API integrations, authentication and payment flows",
                "Integraciones REST API, autenticación y flujos de pago"
              )}
            </li>
            <li>
              {t(
                locale,
                "Testes, performance e prontidão para produção",
                "Testing, performance and production readiness",
                "Testing, rendimiento y preparación para producción"
              )}
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-xl font-semibold mb-3">
            {t(locale, "Interesses", "Interests", "Intereses")}
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>
              {t(
                locale,
                "Experiência do Usuário e acessibilidade",
                "User Experience and accessibility",
                "Experiencia de Usuario y accesibilidad"
              )}
            </li>
            <li>
              {t(
                locale,
                "Arquitetura frontend e performance",
                "Frontend architecture and performance",
                "Arquitectura frontend y rendimiento"
              )}
            </li>
            <li>
              {t(
                locale,
                "IA aplicada a produtos digitais",
                "AI applied to digital products",
                "IA aplicada a productos digitales"
              )}
            </li>
          </ul>
        </div>
      </section>

      {/* Experience */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">
          {t(locale, "Experiência", "Experience", "Experiencia")}
        </h2>

        <div className="mt-4 space-y-8">
          {experiences.map((experience) => (
            <ExperienceItem
              key={`${experience.title}-${experience.period}`}
              locale={locale}
              period={experience.period}
              title={experience.title}
              summary={experience.summary}
              details={experience.details}
            />
          ))}
        </div>
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
          {t(locale, "Conceitos-chave", "Core Concepts", "Conceptos clave")}
        </h2>

        <ul className="mt-4 list-disc pl-5 space-y-2 text-sm">
          <li>{t(locale, "Arquitetura SaaS e desenho de sistemas prontos para produção", "SaaS Architecture and production-ready system design", "Arquitectura SaaS y diseño de sistemas listos para producción")}</li>
          <li>{t(locale, "REST APIs, integrações, autenticação e serviços de pagamento", "REST APIs, system integrations, authentication and payment services", "REST APIs, integraciones, autenticación y servicios de pago")}</li>
          <li>{t(locale, "Agentes de IA e fluxos de automação integrados a produtos reais", "AI Agents and automation workflows integrated into real products", "Agentes de IA y flujos de automatización integrados a productos reales")}</li>
          <li>{t(locale, "Entrega em cloud com AWS, pipelines de CI/CD e serviços em contêineres", "Cloud delivery with AWS, CI/CD pipelines and containerized services", "Entrega en cloud con AWS, pipelines de CI/CD y servicios en contenedores")}</li>
          <li>{t(locale, "Estratégia de testes, confiabilidade, performance e usabilidade", "Testing strategy, reliability, performance and usability", "Estrategia de testing, confiabilidad, rendimiento y usabilidad")}</li>
          <li>{t(locale, "Execução ágil com Scrum/Kanban e ciclos iterativos de produto", "Agile execution with Scrum/Kanban and iterative product cycles", "Ejecución ágil con Scrum/Kanban y ciclos iterativos de producto")}</li>
        </ul>
      </section>

      {/* Projects */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">
          {t(locale, "Projetos em destaque", "Featured Projects", "Proyectos destacados")}
        </h2>

        <ul className="mt-4 list-disc pl-5 space-y-2 text-sm">
          <li>
            <span className="font-medium">Vox Pet Digital</span>
            <span className="text-muted-foreground">
              {" — "}
              {t(
                locale,
                "plataforma SaaS para pet shops e clínicas veterinárias com foco em gestão, agendamentos e relacionamento com clientes.",
                "SaaS platform for pet shops and veterinary clinics focused on scheduling, customer management and digital services.",
                "plataforma SaaS para pet shops y clínicas veterinarias enfocada en gestión, agendamiento y relación con clientes."
              )}
            </span>
          </li>
          <li>
            <span className="font-medium">X-Drop</span>
            <span className="text-muted-foreground">
              {" — "}
              {t(
                locale,
                "solução voltada à automação de e-commerce e integração com marketplaces.",
                "solution for e-commerce automation and marketplace integrations focused on operational efficiency.",
                "solución enfocada en automatización de e-commerce e integración con marketplaces."
              )}
            </span>
          </li>
        </ul>
      </section>

      {/* Contact */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">
          {t(locale, "Contato", "Contact", "Contacto")}
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
