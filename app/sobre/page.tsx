import { cn } from "@/lib/utils"
import { getDictionary, getLocale } from "@/lib/i18n-server"
import { ExperienceItem } from "@/components/experience-item"

export const metadata = {
  title: "Sobre",
  description:
    "Trajetória, experiência profissional, habilidades e tech stack de Vinicius Aguiar — Software Engineer.",
}

export default async function SobrePage() {
  const locale = await getLocale()
  const dict = getDictionary(locale)
  const experiences =
    locale === "en"
      ? [
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
      : [
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

            {locale === "en" ? (
              <>
                <p className="mt-4 leading-relaxed">
                  Frontend Software Engineer specialized in building modern web and mobile applications
                  using the JavaScript/TypeScript ecosystem, with strong focus on React, Next.js and
                  React Native.
                </p>

                <p className="mt-3 leading-relaxed text-sm text-muted-foreground">
                  Experience developing and operating SaaS products in production, including API
                  integrations, authentication systems, payment services and real-world user workflows.
                </p>

                <p className="mt-3 leading-relaxed text-sm text-muted-foreground">
                  Product-driven execution with cloud-based delivery (AWS, CI/CD and containerized
                  services), plus AI-augmented automation flows integrated into real applications.
                </p>
              </>
            ) : (
              <>
                <p className="mt-4 leading-relaxed">
                  Frontend Software Engineer especializado no desenvolvimento de aplicações web e
                  mobile modernas com o ecossistema JavaScript/TypeScript, com forte atuação em
                  React, Next.js e React Native.
                </p>

                <p className="mt-3 leading-relaxed text-sm text-muted-foreground">
                  Experiência no desenvolvimento e operação de produtos SaaS em produção, incluindo
                  integrações com APIs, sistemas de autenticação, serviços de pagamento e fluxos reais
                  de usuários.
                </p>

                <p className="mt-3 leading-relaxed text-sm text-muted-foreground">
                  Execução orientada a produto com entrega em cloud (AWS, CI/CD e serviços em
                  contêineres), além de automações com IA integradas a aplicações reais.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-xl font-semibold mb-3">{locale === "en" ? "Skills" : "Habilidades"}</h3>

          {locale === "en" ? (
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>React, Next.js, TypeScript</li>
              <li>React Native, Node.js, Flutter, Swift (iOS)</li>
              <li>HTML5, CSS3, Tailwind, Design System</li>
              <li>REST API integrations, authentication and payment flows</li>
              <li>Testing, performance and production readiness</li>
            </ul>
          ) : (
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>React, Next.js, TypeScript</li>
              <li>React Native, Node.js, Flutter, Swift (iOS)</li>
              <li>HTML5, CSS3, Tailwind, Design System</li>
              <li>Integrações REST API, autenticação e fluxos de pagamento</li>
              <li>Testes, performance e prontidão para produção</li>
            </ul>
          )}
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-xl font-semibold mb-3">{locale === "en" ? "Interests" : "Interesses"}</h3>

          {locale === "en" ? (
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>User Experience and accessibility</li>
              <li>Frontend architecture and performance</li>
              <li>AI applied to digital products</li>
            </ul>
          ) : (
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Experiência do Usuário e acessibilidade</li>
              <li>Arquitetura frontend e performance</li>
              <li>IA aplicada a produtos digitais</li>
            </ul>
          )}
        </div>
      </section>

      {/* Experience */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">{locale === "en" ? "Experience" : "Experiência"}</h2>

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
            "React",
            "React Native",
            "Next.js",
            "Node.js",
            "TypeScript",
            "HTML5",
            "CSS3",
            "Tailwind",
            "PostgreSQL",
            "Docker",
            "AWS",
            "Git",
            "Swift (iOS)",
            "Flutter",
            "Go",
            "Java",
            "CI/CD",
            "Testing",
            "Accessibility",
            "Design System",
            "Linux/macOS",
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-muted/40 px-2 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Core Concepts */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">
          {locale === "en" ? "Core Concepts" : "Conceitos-chave"}
        </h2>

        {locale === "en" ? (
          <ul className="mt-4 list-disc pl-5 space-y-2 text-sm">
            <li>SaaS Architecture and production-ready system design</li>
            <li>REST APIs, system integrations, authentication and payment services</li>
            <li>AI Agents and automation workflows integrated into real products</li>
            <li>Cloud delivery with AWS, CI/CD pipelines and containerized services</li>
            <li>Testing strategy, reliability, performance and usability</li>
            <li>Agile execution with Scrum/Kanban and iterative product cycles</li>
          </ul>
        ) : (
          <ul className="mt-4 list-disc pl-5 space-y-2 text-sm">
            <li>Arquitetura SaaS e desenho de sistemas prontos para produção</li>
            <li>REST APIs, integrações, autenticação e serviços de pagamento</li>
            <li>Agentes de IA e fluxos de automação integrados a produtos reais</li>
            <li>Entrega em cloud com AWS, pipelines de CI/CD e serviços em contêineres</li>
            <li>Estratégia de testes, confiabilidade, performance e usabilidade</li>
            <li>Execução ágil com Scrum/Kanban e ciclos iterativos de produto</li>
          </ul>
        )}
      </section>

      {/* Projects */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">
          {locale === "en" ? "Featured Projects" : "Projetos em destaque"}
        </h2>

        {locale === "en" ? (
          <ul className="mt-4 list-disc pl-5 space-y-2 text-sm">
            <li>
              <span className="font-medium">Vox Pet Digital</span>
              <span className="text-muted-foreground">
                {" "}
                — SaaS platform for pet shops and veterinary clinics focused on
                scheduling, customer management and digital services.
              </span>
            </li>

            <li>
              <span className="font-medium">X-Drop</span>
              <span className="text-muted-foreground">
                {" "}
                — solution for e-commerce automation and marketplace
                integrations focused on operational efficiency.
              </span>
            </li>
          </ul>
        ) : (
          <ul className="mt-4 list-disc pl-5 space-y-2 text-sm">
            <li>
              <span className="font-medium">Vox Pet Digital</span>
              <span className="text-muted-foreground">
                {" "}
                — plataforma SaaS para pet shops e clínicas veterinárias com
                foco em gestão, agendamentos e relacionamento com clientes.
              </span>
            </li>

            <li>
              <span className="font-medium">X-Drop</span>
              <span className="text-muted-foreground">
                {" "}
                — solução voltada à automação de e-commerce e integração com
                marketplaces.
              </span>
            </li>
          </ul>
        )}
      </section>

      {/* Contact */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">
          {locale === "en" ? "Contact" : "Contato"}
        </h2>

        <ul className="mt-4 space-y-2 text-sm">
          <li>
            Email:{" "}
            <a
              className="text-primary underline-offset-4 hover:underline"
              href="mailto:vinicius.aguiar1@icloud.com"
            >
              vinicius.aguiar1@icloud.com
            </a>
          </li>

          <li>
            GitHub:{" "}
            <a
              className="text-primary underline-offset-4 hover:underline"
              href="https://github.com/ViniAguiar1"
              target="_blank"
              rel="noreferrer"
            >
              @ViniAguiar1
            </a>
          </li>

          <li>
            LinkedIn:{" "}
            <a
              className="text-primary underline-offset-4 hover:underline"
              href="https://www.linkedin.com/in/viniciusaguiar-araujo/"
              target="_blank"
              rel="noreferrer"
            >
              viniciusaguiar-araujo
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}
