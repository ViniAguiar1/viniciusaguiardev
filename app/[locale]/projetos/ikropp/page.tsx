import { getLocale, t } from "@/lib/i18n-server"
import { SlideInPage } from "@/components/slide-in-page"
import { FadeIn } from "@/components/fade-in"
import { ImageGallery } from "@/components/image-gallery"
import Image from "next/image"
import Link from "next/link"

export async function generateMetadata() {
  const locale = await getLocale()
  return {
    title: t(
      locale,
      "iKropp — SaaS de gestão para clínicas de estética",
      "iKropp — Management SaaS for aesthetics clinics",
      "iKropp — SaaS de gestión para clínicas de estética"
    ),
    description: t(
      locale,
      "Plataforma com 50k+ usuários para gestão de clínicas de estética. Agenda, clientes, anamneses, profissionais e modernização de legado.",
      "Platform with 50k+ users for aesthetics clinic management. Scheduling, clients, anamnesis, professionals and legacy modernization.",
      "Plataforma con 50k+ usuarios para gestión de clínicas de estética. Agenda, clientes, anamnesis, profesionales y modernización de legado."
    ),
  }
}

export default async function IKroppPage() {
  const locale = await getLocale()

  const content = {
    pt: {
      back: "Voltar aos projetos",
      badge: "50k+ usuários",
      title: "iKropp",
      subtitle:
        "Plataforma SaaS de gestão para clínicas de estética e profissionais de saúde — do agendamento à anamnese.",
      purposeTitle: "O propósito",
      purposeText1:
        "Clínicas de estética, biomédicos e esteticistas lidam com uma operação complexa: agenda de múltiplos profissionais, cadastro de clientes com histórico de procedimentos, anamneses detalhadas, controle de serviços e produtos. A maioria usa ferramentas genéricas que não entendem o fluxo do setor.",
      purposeText2:
        "O iKropp resolve isso com uma plataforma vertical: construída especificamente para o setor de estética e saúde, cobrindo o ciclo completo da operação em um único sistema. São mais de 50.000 usuários ativos usando a plataforma no dia a dia.",
      purposeText3:
        "O resultado é controle operacional real — profissionais focam no atendimento, não em planilhas. Gestores têm visibilidade sobre agenda, faturamento e produtividade sem precisar alternar entre ferramentas.",
      roleTitle: "Meu papel",
      roleText:
        "Atuei como Software Engineer full stack com foco forte em frontend, experiência do usuário e evolução de produto em ambiente de produção com 50k+ usuários.",
      roleItems: [
        "Desenvolvimento e evolução de módulos críticos: agenda, clientes/pacientes, profissionais e fluxos operacionais",
        "Implementação de funcionalidades com regras de negócio complexas, especialmente no módulo de agenda",
        "Modernização do sistema legado (PHP 5.3) para arquitetura moderna com React, Next.js e TypeScript",
        "Construção e padronização do Design System — reutilização de componentes e consistência visual",
        "Integração com APIs externas e sistemas de pagamento",
        "Decisões de system design: separação de responsabilidades, escalabilidade e manutenção",
        "Testes end-to-end com Cypress para módulos críticos",
      ],
      challengesTitle: "Desafios técnicos",
      challenges: [
        {
          title: "Modernização de legado",
          desc: "Migração gradual de PHP 5.3 para React + Next.js + TypeScript, mantendo a operação de 50k+ usuários sem interrupção.",
        },
        {
          title: "Módulo de agenda",
          desc: "Regras de negócio complexas: múltiplos profissionais, horários sobrepostos, bloqueios, recorrência e visualização por dia/semana/mês.",
        },
        {
          title: "Design System em escala",
          desc: "Padronização visual e de componentes em um produto com muitos módulos, garantindo consistência e velocidade de desenvolvimento.",
        },
        {
          title: "Produção com 50k+ usuários",
          desc: "Manutenção contínua, evolução de features em uso ativo, confiabilidade e performance em escala real.",
        },
      ],
      statsTitle: "Escala",
      stats: [
        { value: "50k+", label: "usuários ativos" },
        { value: "Web + Mobile", label: "multiplataforma" },
      ],
      stackTitle: "Stack técnica",
      stackItems: [
        "React + Next.js + TypeScript",
        "React Native (mobile)",
        "Laravel (API backend)",
        "PHP 5.3 (legado em migração)",
        "Docker + AWS",
        "WebSockets",
        "Cypress (E2E)",
        "Design System",
      ],
      visitCta: "Acessar iKropp",
      screenshotsTitle: "A plataforma",
    },
    en: {
      back: "Back to projects",
      badge: "50k+ users",
      title: "iKropp",
      subtitle:
        "Management SaaS platform for aesthetics clinics and health professionals — from scheduling to anamnesis.",
      purposeTitle: "The purpose",
      purposeText1:
        "Aesthetics clinics, biomedical professionals and aestheticians deal with complex operations: scheduling for multiple professionals, client records with procedure history, detailed anamnesis, service and product management. Most use generic tools that don't understand the sector's workflow.",
      purposeText2:
        "iKropp solves this with a vertical platform: built specifically for the aesthetics and health sector, covering the complete operational cycle in a single system. Over 50,000 active users rely on the platform daily.",
      purposeText3:
        "The result is real operational control — professionals focus on patient care, not spreadsheets. Managers have visibility over scheduling, revenue and productivity without switching between tools.",
      roleTitle: "My role",
      roleText:
        "I worked as a full stack Software Engineer with a strong focus on frontend, user experience and product evolution in a production environment with 50k+ users.",
      roleItems: [
        "Development and evolution of critical modules: scheduling, clients/patients, professionals and operational workflows",
        "Implementation of features with complex business rules, especially in the scheduling module",
        "Legacy system modernization (PHP 5.3) to modern architecture with React, Next.js and TypeScript",
        "Design System implementation — component reuse and visual consistency",
        "Integration with external APIs and payment systems",
        "System design decisions: separation of concerns, scalability and maintainability",
        "End-to-end testing with Cypress for critical modules",
      ],
      challengesTitle: "Technical challenges",
      challenges: [
        {
          title: "Legacy modernization",
          desc: "Gradual migration from PHP 5.3 to React + Next.js + TypeScript, keeping 50k+ users' operations running without interruption.",
        },
        {
          title: "Scheduling module",
          desc: "Complex business rules: multiple professionals, overlapping slots, blocks, recurrence and day/week/month views.",
        },
        {
          title: "Design System at scale",
          desc: "Visual and component standardization across a product with many modules, ensuring consistency and development velocity.",
        },
        {
          title: "Production with 50k+ users",
          desc: "Continuous maintenance, feature evolution on actively used modules, reliability and performance at real scale.",
        },
      ],
      statsTitle: "Scale",
      stats: [
        { value: "50k+", label: "active users" },
        { value: "Web + Mobile", label: "cross-platform" },
      ],
      stackTitle: "Tech stack",
      stackItems: [
        "React + Next.js + TypeScript",
        "React Native (mobile)",
        "Laravel (API backend)",
        "PHP 5.3 (legacy in migration)",
        "Docker + AWS",
        "WebSockets",
        "Cypress (E2E)",
        "Design System",
      ],
      visitCta: "Visit iKropp",
      screenshotsTitle: "The platform",
    },
    es: {
      back: "Volver a proyectos",
      badge: "50k+ usuarios",
      title: "iKropp",
      subtitle:
        "Plataforma SaaS de gestión para clínicas de estética y profesionales de salud — del agendamiento a la anamnesis.",
      purposeTitle: "El propósito",
      purposeText1:
        "Clínicas de estética, biomédicos y esteticistas lidian con una operación compleja: agenda de múltiples profesionales, registro de clientes con historial de procedimientos, anamnesis detalladas, control de servicios y productos. La mayoría usa herramientas genéricas que no entienden el flujo del sector.",
      purposeText2:
        "iKropp resuelve esto con una plataforma vertical: construida específicamente para el sector de estética y salud, cubriendo el ciclo completo de la operación en un único sistema. Son más de 50.000 usuarios activos usando la plataforma diariamente.",
      purposeText3:
        "El resultado es control operacional real — profesionales se enfocan en la atención, no en planillas. Gestores tienen visibilidad sobre agenda, facturación y productividad sin necesidad de alternar entre herramientas.",
      roleTitle: "Mi rol",
      roleText:
        "Actué como Software Engineer full stack con fuerte enfoque en frontend, experiencia del usuario y evolución de producto en ambiente de producción con 50k+ usuarios.",
      roleItems: [
        "Desarrollo y evolución de módulos críticos: agenda, clientes/pacientes, profesionales y flujos operacionales",
        "Implementación de funcionalidades con reglas de negocio complejas, especialmente en el módulo de agenda",
        "Modernización del sistema legado (PHP 5.3) hacia arquitectura moderna con React, Next.js y TypeScript",
        "Construcción y estandarización del Design System — reutilización de componentes y consistencia visual",
        "Integración con APIs externas y sistemas de pago",
        "Decisiones de system design: separación de responsabilidades, escalabilidad y mantenimiento",
        "Tests end-to-end con Cypress para módulos críticos",
      ],
      challengesTitle: "Desafíos técnicos",
      challenges: [
        {
          title: "Modernización de legado",
          desc: "Migración gradual de PHP 5.3 a React + Next.js + TypeScript, manteniendo la operación de 50k+ usuarios sin interrupción.",
        },
        {
          title: "Módulo de agenda",
          desc: "Reglas de negocio complejas: múltiples profesionales, horarios superpuestos, bloqueos, recurrencia y visualización por día/semana/mes.",
        },
        {
          title: "Design System a escala",
          desc: "Estandarización visual y de componentes en un producto con muchos módulos, garantizando consistencia y velocidad de desarrollo.",
        },
        {
          title: "Producción con 50k+ usuarios",
          desc: "Mantenimiento continuo, evolución de features en uso activo, confiabilidad y rendimiento a escala real.",
        },
      ],
      statsTitle: "Escala",
      stats: [
        { value: "50k+", label: "usuarios activos" },
        { value: "Web + Mobile", label: "multiplataforma" },
      ],
      stackTitle: "Stack técnico",
      stackItems: [
        "React + Next.js + TypeScript",
        "React Native (mobile)",
        "Laravel (API backend)",
        "PHP 5.3 (legado en migración)",
        "Docker + AWS",
        "WebSockets",
        "Cypress (E2E)",
        "Design System",
      ],
      visitCta: "Acceder a iKropp",
      screenshotsTitle: "La plataforma",
    },
  }

  const c = content[locale]

  return (
    <SlideInPage>
      <div className="w-full max-w-4xl mx-auto px-4 py-12">
        {/* Back link */}
        <Link
          href="/projetos"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition mb-8"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          {c.back}
        </Link>

        {/* Header */}
        <FadeIn>
          <header className="mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-full mb-4">
              {c.badge}
            </span>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-lg border border-border bg-muted/30 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/ikropp.png"
                  alt="iKropp"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                {c.title}
              </h1>
            </div>

            <p className="text-lg text-muted-foreground max-w-2xl">
              {c.subtitle}
            </p>
          </header>
        </FadeIn>

        {/* Purpose */}
        <FadeIn delay={100}>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">
              {c.purposeTitle}
            </h2>
            <div className="space-y-4 text-foreground/85 leading-relaxed">
              <p>{c.purposeText1}</p>
              <p>{c.purposeText2}</p>
              <p>{c.purposeText3}</p>
            </div>
          </section>
        </FadeIn>

        {/* My Role */}
        <FadeIn delay={150}>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold tracking-tight mb-2">
              {c.roleTitle}
            </h2>
            <p className="text-sm text-muted-foreground mb-4">{c.roleText}</p>
            <ul className="space-y-2">
              {c.roleItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/85">
                  <span className="text-muted-foreground mt-0.5 flex-shrink-0">-</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </FadeIn>

        {/* Challenges */}
        <FadeIn delay={200}>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">
              {c.challengesTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {c.challenges.map((challenge, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border bg-card p-5"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold mb-1">
                        {challenge.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {challenge.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={250}>
          <section className="mb-12">
            <div className="grid grid-cols-2 gap-4">
              {c.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-border bg-card p-4 text-center"
                >
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Screenshots placeholder */}
        <FadeIn delay={300}>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">
              {c.screenshotsTitle}
            </h2>
            <ImageGallery
              images={[
                {
                  src: "/ikropp/dashboard-ikropp.png.jpeg",
                  alt: "iKropp — Dashboard principal da clínica",
                },
                {
                  src: "/ikropp/agenda-ikropp.png.jpeg",
                  alt: "iKropp — Sistema de agendamento de consultas",
                },
                {
                  src: "/ikropp/servicos-ikropp.png.jpeg",
                  alt: "iKropp — Gestão de serviços e procedimentos",
                },
              ]}
            />
          </section>
        </FadeIn>

        {/* Stack */}
        <FadeIn delay={350}>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">
              {c.stackTitle}
            </h2>
            <div className="flex flex-wrap gap-2">
              {c.stackItems.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-medium rounded-full border border-border bg-card"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={400}>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://ikropp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:opacity-90 transition text-center inline-flex items-center justify-center gap-2"
            >
              {c.visitCta}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5-6H18m0 0v4.5m0-4.5L10.5 13.5" />
              </svg>
            </a>
          </div>
        </FadeIn>
      </div>
    </SlideInPage>
  )
}
