import { getAllPosts } from "@/lib/posts"
import { cn, MONO_CHIP } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { getDictionary, getLocale, t } from "@repo/i18n/server"
import { localePath } from "@repo/i18n"
import { JsonLd } from "@/components/json-ld"
import { FadeIn } from "@/components/fade-in"
import { SectionEyebrow } from "@/components/section-eyebrow"

export default async function Home() {
  const locale = await getLocale()
  // Curadoria: a home mostra só os posts com showOnHome (todos seguem na busca e no sitemap)
  const articles = getAllPosts(locale).filter((article) => article.showOnHome)
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
            jobTitle: "Senior Product Engineer",
            url: "https://viniciusaguiardev.com.br",
            sameAs: [
              "https://github.com/ViniAguiar1",
              "https://www.linkedin.com/in/viniciusaguiar-araujo/",
            ],
          },
        }}
      />

      {/* O hero saiu a pedido do Vinicius (2026-09-20): a sidebar já mostra
          nome e cargo, então repetir os dois no topo da coluna era a
          redundância mais visível da página. Sobra só o h1 acessível — a home
          precisa de exatamente um, e sem ele os h2 das seções abaixo ficam
          pendurados em nada. dict.home.title/subtitle/description seguem
          alimentando metadata e JSON-LD. */}
      <h1 className="sr-only">{dict.home.title}</h1>

      {/* ENGINEERING PREVIEW */}
      <FadeIn delay={100}>
        <section className="mb-16">
          <SectionEyebrow index="01">
            {t(locale, { pt: "Engenharia", en: "Engineering", es: "Ingeniería", jp: "エンジニアリング", fr: "Ingénierie" })}
          </SectionEyebrow>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-medium tracking-[-0.02em] text-fg">
              {t(locale, { pt: "Como eu penso sobre sistemas", en: "How I think about systems", es: "Cómo pienso sobre sistemas", jp: "システムをどう設計するか", fr: "Comment je pense les systèmes" })}
            </h2>
            <Link
              href={localePath(locale, "/engenharia")}
              className="text-sm text-mu hover:text-fg transition inline-flex items-center gap-1"
            >
              {t(locale, { pt: "Ver tudo", en: "See all", es: "Ver todo", jp: "すべて見る", fr: "Voir tout" })}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                topicId: "frontend-performance",
                title: t(locale, { pt: "Performance de Frontend", en: "Frontend Performance", es: "Performance de Frontend", jp: "フロントエンドパフォーマンス", fr: "Performance Frontend" }),
                desc: t(locale, { pt: "Reconstrução de inbox com paginação cursor-based e virtualização de lista — payload de 6,7 MB para 19 KB (~400x), sem travamentos com milhares de registros.", en: "Inbox rebuild with cursor-based pagination and list virtualization — payload from 6.7 MB down to 19 KB (~400x), no UI freezes with thousands of records.", es: "Reconstrucción de inbox con paginación cursor-based y virtualización de lista — payload de 6,7 MB a 19 KB (~400x), sin bloqueos con miles de registros.", jp: "カーソルベースのページネーションとリスト仮想化によるインボックス再構築 — ペイロードを6.7MBから19KBへ（約1/400）、数千件でもUIフリーズなし。", fr: "Reconstruction de l'inbox avec pagination cursor-based et virtualisation de liste — payload de 6,7 MB à 19 KB (~400x), sans blocages avec des milliers d'enregistrements." }),
                icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
              },
              {
                topicId: "multi-tenant",
                title: t(locale, { pt: "Multi-tenant + RLS", en: "Multi-tenant + RLS", es: "Multi-tenant + RLS", jp: "マルチテナント + RLS", fr: "Multi-tenant + RLS" }),
                desc: t(locale, { pt: "Banco compartilhado com tenant_id, Row Level Security e índices compostos para isolamento real.", en: "Shared database with tenant_id, Row Level Security and composite indexes for real isolation.", es: "Base compartida con tenant_id, Row Level Security e índices compuestos para aislamiento real.", jp: "tenant_idを使った共有データベース、Row Level Security、複合インデックスによる実質的な分離。", fr: "Base de données partagée avec tenant_id, Row Level Security et index composites pour une isolation réelle." }),
                icon: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125",
              },
              {
                topicId: "payments",
                title: t(locale, { pt: "Pagamentos & Webhooks", en: "Payments & Webhooks", es: "Pagos & Webhooks", jp: "決済 & Webhook", fr: "Paiements & Webhooks" }),
                desc: t(locale, { pt: "Idempotência, validação de assinatura, dead letter queue e reconciliação com Asaas e Mercado Pago.", en: "Idempotency, signature validation, dead letter queue and reconciliation with Asaas and Mercado Pago.", es: "Idempotencia, validación de firma, dead letter queue y reconciliación con Asaas y Mercado Pago.", jp: "冪等性、署名検証、デッドレターキュー、AsaasおよびMercado Pagoとの照合。", fr: "Idempotence, validation de signature, dead letter queue et réconciliation avec Asaas et Mercado Pago." }),
                icon: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z",
              },
            ].map((topic) => (
              <Link
                key={topic.title}
                href={localePath(locale, `/engenharia?topic=${topic.topicId}`)}
                className="group border border-line bg-card p-4 transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 text-mu mb-2" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d={topic.icon} />
                </svg>
                <h3 className="text-sm font-semibold mb-1">{topic.title}</h3>
                <p className="text-xs text-mu leading-relaxed">{topic.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* POSTS */}
      <section className="border-t border-line pt-12 mb-16">

        <SectionEyebrow index="02">
          {t(locale, { pt: "Escrita", en: "Writing", es: "Escritura", jp: "執筆", fr: "Écrits" })}
        </SectionEyebrow>

        {/* A seção não tem título visível — sem um h2, os títulos dos posts
            ficam pendurados no heading da seção anterior. */}
        <h2 className="sr-only">
          {t(locale, { pt: "Escrita", en: "Writing", es: "Escritura", jp: "執筆", fr: "Écrits" })}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {articles.map((article, index) => (
            <FadeIn key={article.slug} delay={Math.min(index * 50, 200)}>
            <article className="border border-line bg-card flex flex-col min-h-45 transition-[transform,border-color] hover:-translate-y-1 hover:border-field relative cursor-pointer">
              <Link
                href={localePath(locale, `/posts/${article.slug}`)}
                aria-label={`Ir para ${article.title}`}
                className="absolute inset-0 z-10"
              />

              {/* A capa é decorativa: o título do post está logo abaixo, em
                  texto, então um alt descrevendo o render seria redundância
                  que o leitor de tela anuncia duas vezes. */}
              {article.cover ? (
                <div className="relative aspect-video border-b border-line overflow-hidden">
                  <Image
                    src={`/blog/${article.slug}/cover.webp`}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                  {article.tag ? (
                    <span className={cn(MONO_CHIP, "absolute left-4 top-4 z-20 bg-canvas/80 backdrop-blur-sm")}>
                      {article.tag}
                    </span>
                  ) : null}
                </div>
              ) : null}

              <div className="p-6 flex flex-col flex-1">

                {/* Sem capa o chip não tem onde se apoiar: entra no fluxo. */}
                {!article.cover && article.tag ? (
                  <span className={cn(MONO_CHIP, "self-start mb-4")}>
                    {article.tag}
                  </span>
                ) : null}

                <span className="text-xs text-mu block mb-1">
                  {article.date}
                  {article.readTime ? ` · ${article.readTime}` : null}
                </span>

                <h3 className="text-lg md:text-xl font-semibold mb-1 leading-snug">
                  {article.title}
                </h3>

                {article.description ? (
                  <p className="text-sm text-mu">
                    {article.description}
                  </p>
                ) : null}

              </div>

            </article>
            </FadeIn>
          ))}

        </div>

      </section>

    </div>
  )
}
