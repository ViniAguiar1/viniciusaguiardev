import { getAllPosts } from "@/lib/posts"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { getDictionary, getLocale, t } from "@/lib/i18n-server"
import { JsonLd } from "@/components/json-ld"
import { FadeIn } from "@/components/fade-in"

export default async function Home() {
  const locale = await getLocale()
  const articles = getAllPosts(locale)
  const dict = getDictionary(locale)

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Vinicius Aguiar",
          url: "https://viniciusaguiardev.com.br",
          description: dict.home.description,
          author: {
            "@type": "Person",
            name: "Vinicius Aguiar",
            jobTitle: "Software Engineer",
            url: "https://viniciusaguiardev.com.br",
            sameAs: [
              "https://github.com/ViniAguiar1",
              "https://www.linkedin.com/in/viniciusaguiar-araujo/",
            ],
          },
        }}
      />

      {/* HERO */}
      <FadeIn>
      <header className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start">

          {/* LEFT: texto */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              {dict.home.title}
            </h1>

            <p className="mt-2 text-lg text-muted-foreground max-w-xl">
              {dict.home.subtitle}
            </p>

            <p className="mt-2 text-sm text-muted-foreground max-w-xl">
              {dict.home.description}
            </p>
          </div>

          {/* RIGHT: botões empilhados */}
          <div className="inline-grid grid-cols-1 gap-2 md:justify-self-end">
            <Link
              href="/Curriculo-Vinicius-Aguiar.pdf"
              target="_blank"
              data-umami-event="cv-download"
              data-umami-event-source="hero"
              className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 transition text-center"
            >
              {dict.home.ctaResume}
            </Link>

            <Link
              href="https://api.whatsapp.com/send?phone=5511915369113&text=Ol%C3%A1%2C%20vim%20pelo%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar."
              target="_blank"
              data-umami-event="contact-click"
              data-umami-event-source="hero"
              className="px-4 py-2 text-sm rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition text-center"
            >
              {dict.home.ctaContact}
            </Link>

            <Link
              href="/sobre"
              className="px-4 py-2 text-sm rounded-md border border-border hover:bg-muted transition text-center"
            >
              {dict.home.ctaAbout}
            </Link>
          </div>

        </div>
      </header>
      </FadeIn>

      {/* ENGINEERING PREVIEW */}
      <FadeIn delay={100}>
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold tracking-tight">
              {t(locale, "Como eu penso sobre sistemas", "How I think about systems", "Cómo pienso sobre sistemas")}
            </h2>
            <Link
              href="/engenharia"
              className="text-sm text-muted-foreground hover:text-foreground transition inline-flex items-center gap-1"
            >
              {t(locale, "Ver tudo", "See all", "Ver todo")}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                topicId: "saas-architecture",
                title: t(locale, "Arquitetura SaaS", "SaaS Architecture", "Arquitectura SaaS"),
                desc: t(
                  locale,
                  "Multi-módulo com pipeline WhatsApp → LLM → PostgreSQL e transações atômicas para vendas e pagamentos.",
                  "Multi-module with WhatsApp → LLM → PostgreSQL pipeline and atomic transactions for sales and payments.",
                  "Multi-módulo con pipeline WhatsApp → LLM → PostgreSQL y transacciones atómicas para ventas y pagos."
                ),
                icon: "M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z",
              },
              {
                topicId: "multi-tenant",
                title: t(locale, "Multi-tenant + RLS", "Multi-tenant + RLS", "Multi-tenant + RLS"),
                desc: t(
                  locale,
                  "Banco compartilhado com tenant_id, Row Level Security e índices compostos para isolamento real.",
                  "Shared database with tenant_id, Row Level Security and composite indexes for real isolation.",
                  "Base compartida con tenant_id, Row Level Security e índices compuestos para aislamiento real."
                ),
                icon: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125",
              },
              {
                topicId: "payments",
                title: t(locale, "Pagamentos & Webhooks", "Payments & Webhooks", "Pagos & Webhooks"),
                desc: t(
                  locale,
                  "Idempotência, validação de assinatura, dead letter queue e reconciliação com Asaas e Mercado Pago.",
                  "Idempotency, signature validation, dead letter queue and reconciliation with Asaas and Mercado Pago.",
                  "Idempotencia, validación de firma, dead letter queue y reconciliación con Asaas y Mercado Pago."
                ),
                icon: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z",
              },
            ].map((topic) => (
              <Link
                key={topic.title}
                href={`/engenharia?topic=${topic.topicId}`}
                className="group rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 text-muted-foreground mb-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d={topic.icon} />
                </svg>
                <h3 className="text-sm font-semibold mb-1">{topic.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{topic.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* POSTS */}
      <main>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {articles.map((article, index) => (
            <FadeIn key={article.slug} delay={Math.min(index * 50, 200)}>
            <article
              className={cn(
                "rounded-lg border border-border bg-card text-card-foreground shadow p-6 flex flex-col justify-between min-h-45 transition-transform hover:-translate-y-1 hover:shadow-lg relative cursor-pointer"
              )}
            >
              <Link
                href={`/posts/${article.slug}`}
                aria-label={`Ir para ${article.title}`}
                className="absolute inset-0"
              />

              <div>

                {article.tag ? (
                  <span
                    className={cn(
                      "absolute text-white left-6 top-6 uppercase text-xs font-semibold px-3 py-1 rounded shadow-sm",
                      article.tagColor || "bg-primary text-primary-foreground"
                    )}
                  >
                    {article.tag}
                  </span>
                ) : null}

                <div className="mt-8">

                  <span className="text-xs text-muted-foreground block mb-1">
                    {article.date}
                    {article.readTime ? ` · ${article.readTime}` : null}
                  </span>

                  <h3 className="text-lg md:text-xl font-semibold mb-1 leading-snug">
                    {article.title}
                  </h3>

                  {article.description ? (
                    <p className="text-sm text-muted-foreground">
                      {article.description}
                    </p>
                  ) : null}

                </div>

              </div>

            </article>
            </FadeIn>
          ))}

        </div>

      </main>

    </div>
  )
}
