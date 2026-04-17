import { getLocale, t } from "@/lib/i18n-server"
import { SlideInPage } from "@/components/slide-in-page"
import { FadeIn } from "@/components/fade-in"
import Image from "next/image"
import Link from "next/link"

export async function generateMetadata() {
  const locale = await getLocale()
  return {
    title: t(
      locale,
      "X-Drop — Plataforma SaaS de Dropshipping",
      "X-Drop — Dropshipping SaaS Platform",
      "X-Drop — Plataforma SaaS de Dropshipping"
    ),
    description: t(
      locale,
      "Como construí uma plataforma que conecta fornecedores de confiança com sellers que querem entrar no mundo de vendas online.",
      "How I built a platform connecting trusted suppliers with sellers entering the online sales world.",
      "Cómo construí una plataforma que conecta proveedores de confianza con sellers que quieren entrar al mundo de ventas online."
    ),
  }
}

export default async function XDropPage() {
  const locale = await getLocale()

  const content = {
    pt: {
      back: "Voltar aos projetos",
      badge: "SaaS em produção",
      title: "X-Drop",
      subtitle:
        "Conectando fornecedores de confiança com sellers que querem entrar no mundo de vendas online.",
      purposeTitle: "O propósito",
      purposeText1:
        "O mercado de dropshipping no Brasil cresce rápido, mas tem um problema estrutural: sellers iniciantes não sabem em quem confiar. Existem milhares de fornecedores, mas encontrar os confiáveis — que entregam no prazo, com qualidade e com margem viável — é um processo manual, demorado e cheio de riscos.",
      purposeText2:
        "A X-Drop nasceu para resolver isso. A plataforma conecta fornecedores verificados com sellers que querem começar ou escalar suas operações em marketplaces como Mercado Livre e Shopee, eliminando a barreira de entrada e oferecendo toda a infraestrutura de gestão que um vendedor precisa.",
      purposeText3:
        "Não é só uma ferramenta de gestão — é um ecossistema. O fornecedor ganha canal de distribuição. O seller ganha acesso a produtos confiáveis, com catálogo pronto para publicar, integração direta com marketplaces e gestão financeira centralizada.",
      howTitle: "Como funciona",
      howItems: [
        "O fornecedor cadastra seus produtos com preços, fotos e prazos de envio",
        "O seller escolhe os produtos, publica nos marketplaces com um clique e define sua margem",
        "Quando o pedido entra, a X-Drop roteia automaticamente para o fornecedor, que faz o envio direto",
        "O seller acompanha tudo — pedidos, pagamentos, comissões e lucro — em um único painel",
      ],
      numbersTitle: "Resultados em 2 meses",
      revenue: "R$ 30k+",
      revenueLabel: "faturamento processado",
      users: "100+",
      usersLabel: "usuários ativos",
      orders: "400+",
      ordersLabel: "pedidos processados",
      mrr: "R$ 20k",
      mrrLabel: "MRR",
      stackTitle: "Stack técnica",
      stackItems: [
        "React + Next.js + TypeScript",
        "Swift UI (iOS nativo)",
        "NestJS (API backend)",
        "PostgreSQL + Firebase",
        "Docker + AWS",
        "Asaas + Mercado Pago",
        "Mercado Livre API + Shopee API",
      ],
      caseStudyCta: "Ler case study técnico",
      visitCta: "Acessar X-Drop",
      screenshotsTitle: "A plataforma",
    },
    en: {
      back: "Back to projects",
      badge: "SaaS in production",
      title: "X-Drop",
      subtitle:
        "Connecting trusted suppliers with sellers entering the online sales world.",
      purposeTitle: "The purpose",
      purposeText1:
        "The dropshipping market in Brazil is growing fast, but it has a structural problem: beginner sellers don't know who to trust. There are thousands of suppliers, but finding reliable ones — who deliver on time, with quality and viable margins — is a manual, time-consuming process full of risks.",
      purposeText2:
        "X-Drop was built to solve this. The platform connects verified suppliers with sellers who want to start or scale their operations on marketplaces like Mercado Livre and Shopee, eliminating the entry barrier and providing all the management infrastructure a seller needs.",
      purposeText3:
        "It's not just a management tool — it's an ecosystem. Suppliers gain a distribution channel. Sellers gain access to reliable products, with a catalog ready to publish, direct marketplace integration and centralized financial management.",
      howTitle: "How it works",
      howItems: [
        "Suppliers register their products with prices, photos and shipping timelines",
        "Sellers choose products, publish to marketplaces with one click and set their margin",
        "When an order comes in, X-Drop automatically routes it to the supplier, who ships directly",
        "Sellers track everything — orders, payments, commissions and profit — in a single dashboard",
      ],
      numbersTitle: "Results in 2 months",
      revenue: "R$ 30k+",
      revenueLabel: "processed revenue",
      users: "100+",
      usersLabel: "active users",
      orders: "400+",
      ordersLabel: "orders processed",
      mrr: "R$ 20k",
      mrrLabel: "MRR",
      stackTitle: "Tech stack",
      stackItems: [
        "React + Next.js + TypeScript",
        "Swift UI (iOS nativo)",
        "NestJS (API backend)",
        "PostgreSQL + Firebase",
        "Docker + AWS",
        "Asaas + Mercado Pago",
        "Mercado Livre API + Shopee API",
      ],
      caseStudyCta: "Read technical case study",
      visitCta: "Visit X-Drop",
      screenshotsTitle: "The platform",
    },
    es: {
      back: "Volver a proyectos",
      badge: "SaaS en producción",
      title: "X-Drop",
      subtitle:
        "Conectando proveedores de confianza con sellers que quieren entrar al mundo de ventas online.",
      purposeTitle: "El propósito",
      purposeText1:
        "El mercado de dropshipping en Brasil crece rápido, pero tiene un problema estructural: los sellers principiantes no saben en quién confiar. Existen miles de proveedores, pero encontrar los confiables — que entregan a tiempo, con calidad y con márgenes viables — es un proceso manual, demorado y lleno de riesgos.",
      purposeText2:
        "X-Drop nació para resolver eso. La plataforma conecta proveedores verificados con sellers que quieren comenzar o escalar sus operaciones en marketplaces como Mercado Livre y Shopee, eliminando la barrera de entrada y ofreciendo toda la infraestructura de gestión que un vendedor necesita.",
      purposeText3:
        "No es solo una herramienta de gestión — es un ecosistema. El proveedor gana un canal de distribución. El seller gana acceso a productos confiables, con catálogo listo para publicar, integración directa con marketplaces y gestión financiera centralizada.",
      howTitle: "Cómo funciona",
      howItems: [
        "El proveedor registra sus productos con precios, fotos y plazos de envío",
        "El seller elige los productos, publica en los marketplaces con un clic y define su margen",
        "Cuando entra un pedido, X-Drop lo enruta automáticamente al proveedor, que hace el envío directo",
        "El seller acompaña todo — pedidos, pagos, comisiones y ganancia — en un único panel",
      ],
      numbersTitle: "Resultados en 2 meses",
      revenue: "R$ 30k+",
      revenueLabel: "facturación procesada",
      users: "100+",
      usersLabel: "usuarios activos",
      orders: "400+",
      ordersLabel: "pedidos procesados",
      mrr: "R$ 20k",
      mrrLabel: "MRR",
      stackTitle: "Stack técnico",
      stackItems: [
        "React + Next.js + TypeScript",
        "Swift UI (iOS nativo)",
        "NestJS (API backend)",
        "PostgreSQL + Firebase",
        "Docker + AWS",
        "Asaas + Mercado Pago",
        "Mercado Livre API + Shopee API",
      ],
      caseStudyCta: "Leer case study técnico",
      visitCta: "Acceder a X-Drop",
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
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
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
                  src="/images/x-droplogo.png"
                  alt="X-Drop"
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

        {/* How it works */}
        <FadeIn delay={200}>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">
              {c.howTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {c.howItems.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-4 rounded-lg border border-border bg-card"
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-sm text-foreground/85 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Numbers */}
        <FadeIn delay={300}>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">
              {c.numbersTitle}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: c.revenue, label: c.revenueLabel },
                { value: c.users, label: c.usersLabel },
                { value: c.orders, label: c.ordersLabel },
                { value: c.mrr, label: c.mrrLabel },
              ].map((stat) => (
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
        <FadeIn delay={400}>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">
              {c.screenshotsTitle}
            </h2>
            {/* Web Dashboard */}
            <div className="rounded-lg border border-border overflow-hidden mb-6">
              <Image
                src="/dashboard-xdrop.png.jpeg"
                alt="X-Drop Dashboard — visão geral com métricas de vendas, faturamento e sellers ativos"
                width={1280}
                height={760}
                className="w-full h-auto"
              />
            </div>

            {/* Mobile App */}
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
                <span className="text-sm font-medium">
                  {locale === "en" ? "iOS App — Swift UI (native)" : locale === "es" ? "App iOS — Swift UI (nativo)" : "App iOS — Swift UI (nativo)"}
                </span>
                <a
                  href="https://apps.apple.com/us/app/xdrop/id6749638204"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-xs text-muted-foreground hover:text-foreground transition inline-flex items-center gap-1"
                >
                  App Store
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5-6H18m0 0v4.5m0-4.5L10.5 13.5" />
                  </svg>
                </a>
              </div>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="rounded-lg border border-border overflow-hidden">
                  <Image
                    src="/dashboard-app-xdrop.webp"
                    alt="X-Drop iOS App — Dashboard executivo com métricas de vendas e faturamento"
                    width={390}
                    height={844}
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-lg border border-border overflow-hidden">
                  <Image
                    src="/balance-screen.webp"
                    alt="X-Drop iOS App — Tela de saldo com PIX e gestão financeira"
                    width={390}
                    height={844}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Stack */}
        <FadeIn delay={500}>
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
        <FadeIn delay={600}>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/posts/case-study-xdrop"
              className="px-5 py-2.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:opacity-90 transition text-center"
            >
              {c.caseStudyCta}
            </Link>
            <a
              href="https://xdrop.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-sm font-medium rounded-md border border-border hover:bg-muted transition text-center inline-flex items-center justify-center gap-2"
            >
              {c.visitCta}
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5-6H18m0 0v4.5m0-4.5L10.5 13.5"
                />
              </svg>
            </a>
            <a
              href="https://apps.apple.com/us/app/xdrop/id6749638204"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-sm font-medium rounded-md border border-border hover:bg-muted transition text-center inline-flex items-center justify-center gap-2"
            >
              App Store (iOS)
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5-6H18m0 0v4.5m0-4.5L10.5 13.5"
                />
              </svg>
            </a>
          </div>
        </FadeIn>
      </div>
    </SlideInPage>
  )
}
