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
      "Vox Pet Digital — SaaS para clínicas veterinárias",
      "Vox Pet Digital — Veterinary clinic SaaS",
      "Vox Pet Digital — SaaS para clínicas veterinarias"
    ),
    description: t(
      locale,
      "SaaS vertical com 95 modelos Prisma, IA no WhatsApp, migração Express→NestJS, multi-tenant + multi-filial.",
      "Vertical SaaS with 95 Prisma models, WhatsApp AI, Express→NestJS migration, multi-tenant + multi-branch.",
      "SaaS vertical con 95 modelos Prisma, IA en WhatsApp, migración Express→NestJS, multi-tenant + multi-filial."
    ),
  }
}

export default async function VoxPetPage() {
  const locale = await getLocale()

  const content = {
    pt: {
      back: "Voltar aos projetos",
      badge: "SaaS em produção",
      title: "Vox Pet Digital",
      subtitle:
        "SaaS vertical para pet shops e clínicas veterinárias — do agendamento à NF-e, com IA no WhatsApp.",
      purposeTitle: "O propósito",
      purposeText1:
        "Clínicas veterinárias e pet shops são negócios complexos: lidam com agendamentos, prontuários, vacinas, vendas, estoque, comissões, notas fiscais e atendimento ao cliente — tudo ao mesmo tempo. A maioria usa planilhas ou sistemas genéricos que não entendem a rotina do segmento.",
      purposeText2:
        "O Vox Pet Digital nasceu para ser o sistema que cobre o ciclo completo desse negócio. Uma plataforma única que integra gestão operacional, financeira e atendimento automatizado via WhatsApp — permitindo que clínicas foquem no cuidado animal, não em planilhas.",
      purposeText3:
        "O diferencial é que a plataforma cresce junto com o negócio: uma clínica com 1 unidade usa os mesmos módulos que uma rede com 5 filiais. Multi-tenant + multi-filial de verdade, não um workaround.",
      challengesTitle: "Desafios técnicos",
      challenges: [
        {
          title: "Migração Express → NestJS",
          desc: "Strangler fig pattern: v1 (41 controllers) e v2 (12 módulos NestJS) coexistindo no mesmo processo, com regras rígidas pro código novo.",
        },
        {
          title: "WhatsApp + IA 24h",
          desc: "Agente com 10 tools, RAG por tenant, Whisper para áudio, memória de conversa e follow-up automático via cron.",
        },
        {
          title: "Multi-tenant + multi-filial",
          desc: "95 modelos Prisma, 93 com tenant_id, 76 com branch_id. Transferência de estoque entre filiais com workflow de aprovação.",
        },
        {
          title: "NF-e com fallback",
          desc: "Dois providers (Focus NFe + NFe.io), fila resiliente processando a cada 30s, import de XML de fornecedores.",
        },
      ],
      screenshotsTitle: "A plataforma",
      stackTitle: "Stack técnica",
      stackItems: [
        "Next.js 16 + React 19",
        "NestJS + Express (v1/v2)",
        "PostgreSQL 16 + Prisma",
        "OpenAI (GPT-4o-mini + Whisper)",
        "Baileys (WhatsApp)",
        "Stripe + Mercado Pago + Asaas",
        "Focus NFe + NFe.io",
        "Firebase Admin",
        "MUI v7 + shadcn/ui + Tailwind v4",
      ],
      caseStudyCta: "Ler case study técnico",
      visitCta: "Acessar Vox Pet",
    },
    en: {
      back: "Back to projects",
      badge: "SaaS in production",
      title: "Vox Pet Digital",
      subtitle:
        "Vertical SaaS for pet shops and veterinary clinics — from scheduling to invoices, with WhatsApp AI.",
      purposeTitle: "The purpose",
      purposeText1:
        "Veterinary clinics and pet shops are complex businesses: they handle appointments, medical records, vaccines, sales, inventory, commissions, invoices and customer service — all at the same time. Most use spreadsheets or generic systems that don't understand the segment's routine.",
      purposeText2:
        "Vox Pet Digital was built to be the system that covers the complete cycle of this business. A single platform integrating operational management, financials and automated WhatsApp customer service — so clinics can focus on animal care, not spreadsheets.",
      purposeText3:
        "The differentiator is that the platform scales with the business: a clinic with 1 location uses the same modules as a chain with 5 branches. Real multi-tenant + multi-branch, not a workaround.",
      challengesTitle: "Technical challenges",
      challenges: [
        {
          title: "Express → NestJS migration",
          desc: "Strangler fig pattern: v1 (41 controllers) and v2 (12 NestJS modules) coexisting in the same process, with strict rules for new code.",
        },
        {
          title: "24/7 WhatsApp + AI",
          desc: "Agent with 10 tools, per-tenant RAG, Whisper for audio, conversation memory and automated follow-up via cron.",
        },
        {
          title: "Multi-tenant + multi-branch",
          desc: "95 Prisma models, 93 with tenant_id, 76 with branch_id. Inter-branch stock transfers with approval workflow.",
        },
        {
          title: "Invoices with fallback",
          desc: "Two providers (Focus NFe + NFe.io), resilient queue processing every 30s, supplier XML import.",
        },
      ],
      screenshotsTitle: "The platform",
      stackTitle: "Tech stack",
      stackItems: [
        "Next.js 16 + React 19",
        "NestJS + Express (v1/v2)",
        "PostgreSQL 16 + Prisma",
        "OpenAI (GPT-4o-mini + Whisper)",
        "Baileys (WhatsApp)",
        "Stripe + Mercado Pago + Asaas",
        "Focus NFe + NFe.io",
        "Firebase Admin",
        "MUI v7 + shadcn/ui + Tailwind v4",
      ],
      caseStudyCta: "Read technical case study",
      visitCta: "Visit Vox Pet",
    },
    es: {
      back: "Volver a proyectos",
      badge: "SaaS en producción",
      title: "Vox Pet Digital",
      subtitle:
        "SaaS vertical para pet shops y clínicas veterinarias — del agendamiento a la facturación, con IA en WhatsApp.",
      purposeTitle: "El propósito",
      purposeText1:
        "Las clínicas veterinarias y pet shops son negocios complejos: manejan citas, historiales médicos, vacunas, ventas, inventario, comisiones, facturas y atención al cliente — todo al mismo tiempo. La mayoría usa planillas o sistemas genéricos que no entienden la rutina del segmento.",
      purposeText2:
        "Vox Pet Digital nació para ser el sistema que cubre el ciclo completo de este negocio. Una plataforma única que integra gestión operacional, financiera y atención automatizada vía WhatsApp — permitiendo que las clínicas se enfoquen en el cuidado animal, no en planillas.",
      purposeText3:
        "El diferencial es que la plataforma crece junto con el negocio: una clínica con 1 sucursal usa los mismos módulos que una red con 5 sucursales. Multi-tenant + multi-filial de verdad, no un workaround.",
      challengesTitle: "Desafíos técnicos",
      challenges: [
        {
          title: "Migración Express → NestJS",
          desc: "Strangler fig pattern: v1 (41 controllers) y v2 (12 módulos NestJS) coexistiendo en el mismo proceso, con reglas estrictas para el código nuevo.",
        },
        {
          title: "WhatsApp + IA 24h",
          desc: "Agente con 10 tools, RAG por tenant, Whisper para audio, memoria de conversación y follow-up automático vía cron.",
        },
        {
          title: "Multi-tenant + multi-filial",
          desc: "95 modelos Prisma, 93 con tenant_id, 76 con branch_id. Transferencia de inventario entre sucursales con workflow de aprobación.",
        },
        {
          title: "NF-e con fallback",
          desc: "Dos providers (Focus NFe + NFe.io), cola resiliente procesando cada 30s, import de XML de proveedores.",
        },
      ],
      screenshotsTitle: "La plataforma",
      stackTitle: "Stack técnico",
      stackItems: [
        "Next.js 16 + React 19",
        "NestJS + Express (v1/v2)",
        "PostgreSQL 16 + Prisma",
        "OpenAI (GPT-4o-mini + Whisper)",
        "Baileys (WhatsApp)",
        "Stripe + Mercado Pago + Asaas",
        "Focus NFe + NFe.io",
        "Firebase Admin",
        "MUI v7 + shadcn/ui + Tailwind v4",
      ],
      caseStudyCta: "Leer case study técnico",
      visitCta: "Acceder a Vox Pet",
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
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {c.badge}
            </span>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-lg border border-border bg-muted/30 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/vox-pet-digital.png"
                  alt="Vox Pet Digital"
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

        {/* Technical Challenges */}
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

        {/* Numbers */}
        {/* Screenshots */}
        <FadeIn delay={300}>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">
              {c.screenshotsTitle}
            </h2>
            <ImageGallery
              images={[
                {
                  src: "/vox/dashboard-vox.jpeg",
                  alt: "Vox Pet Digital — Dashboard principal com métricas da clínica",
                },
                {
                  src: "/vox/agenda-vox.png.jpeg",
                  alt: "Vox Pet Digital — Sistema de agendamento de consultas",
                },
                {
                  src: "/vox/vendas-vox.png.jpeg",
                  alt: "Vox Pet Digital — Módulo de vendas e PDV",
                },
                {
                  src: "/vox/whatsapp-vox.png.jpeg",
                  alt: "Vox Pet Digital — Atendimento automatizado via WhatsApp com IA",
                },
              ]}
            />
          </section>
        </FadeIn>

        {/* Stack */}
        <FadeIn delay={400}>
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
        <FadeIn delay={500}>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/posts/case-study-vox-pet"
              className="px-5 py-2.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:opacity-90 transition text-center"
            >
              {c.caseStudyCta}
            </Link>
            <a
              href="https://voxpetdigital.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-sm font-medium rounded-md border border-border hover:bg-muted transition text-center inline-flex items-center justify-center gap-2"
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
