import Link from "next/link"
import { getLocale } from "@/lib/i18n-server"
import { EngineeringTopic } from "@/components/engineering-topic"

export const metadata = {
  title: "Engineering | Engenharia",
  description:
    "Arquitetura de sistemas, decisões técnicas e problemas reais resolvidos em produção.",
}

export default async function EngineeringPage() {
  const locale = await getLocale()
  const en = locale === "en"

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      {/* Hero */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {en ? "Engineering" : "Engenharia"}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          {en
            ? "Systems I've designed and operated in production — architecture decisions, trade-offs, and real constraints."
            : "Sistemas que projetei e operei em produção — decisões de arquitetura, trade-offs e restrições reais."}
        </p>
      </header>

      {/* Expandable topics */}
      <section className="space-y-3 mb-12">
        {/* Topic 1: SaaS Architecture */}
        <EngineeringTopic
          title={en ? "SaaS Architecture — Vertical Platform" : "Arquitetura SaaS — Plataforma Vertical"}
          subtitle={en
            ? "Multi-module platform: scheduling, sales, finance, WhatsApp AI"
            : "Plataforma multi-módulo: agenda, vendas, financeiro, IA no WhatsApp"}
        >
          <div className="space-y-5">
            <p className="text-sm leading-relaxed">
              {en
                ? "Multi-module SaaS platform serving small businesses in a specific vertical. I designed the system to handle scheduling, sales, finance, commissions, and WhatsApp automations — all operating as a single product with shared data."
                : "Plataforma SaaS multi-módulo para pequenos negócios em um vertical específico. Projetei o sistema para lidar com agenda, vendas, financeiro, comissões e automações via WhatsApp — tudo operando como um único produto com dados compartilhados."}
            </p>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                {en ? "Key Decisions" : "Decisões-chave"}
              </h4>
              <ul className="text-sm space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground mt-0.5">-</span>
                  {en
                    ? "Event-driven architecture for WhatsApp → LLM → PostgreSQL pipeline"
                    : "Arquitetura orientada a eventos para pipeline WhatsApp → LLM → PostgreSQL"}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground mt-0.5">-</span>
                  {en
                    ? "Atomic transactions to keep sales, commissions and payments always in sync"
                    : "Transações atômicas para manter vendas, comissões e pagamentos sempre sincronizados"}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground mt-0.5">-</span>
                  {en
                    ? "AI integration in WhatsApp for automated support and product recommendations"
                    : "Integração de IA no WhatsApp para atendimento automatizado e recomendação de produtos"}
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "WhatsApp API", "OpenAI", "Stripe"].map((t) => (
                  <span key={t} className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-xs">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-md border border-border bg-muted/20 p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                Trade-off
              </h4>
              <p className="text-sm leading-relaxed">
                {en
                  ? "WhatsApp AI flows needed to be reliable enough to close sales automatically. The choice was between synchronous processing (simpler, but blocks on LLM latency) vs. async event queue. We went with async — the user gets an immediate ack, and the AI response is processed in background with retry logic. This added complexity but eliminated dropped messages during provider spikes."
                  : "Os fluxos de IA no WhatsApp precisavam ser confiáveis o suficiente para fechar vendas automaticamente. A escolha era entre processamento síncrono (mais simples, mas bloqueia na latência do LLM) vs. fila de eventos assíncrona. Optamos pelo assíncrono — o usuário recebe um ack imediato e a resposta da IA é processada em background com lógica de retry. Isso adicionou complexidade mas eliminou mensagens perdidas durante picos do provedor."}
              </p>
            </div>
          </div>
        </EngineeringTopic>

        {/* Topic 2: Multi-tenant */}
        <EngineeringTopic
          title={en ? "Multi-tenant Data Isolation" : "Isolamento de dados Multi-tenant"}
          subtitle={en
            ? "Shared DB + tenant_id + RLS — evaluated 3 strategies, chose simplicity"
            : "Banco compartilhado + tenant_id + RLS — avaliou 3 estratégias, escolheu simplicidade"}
        >
          <div className="space-y-5">
            <p className="text-sm leading-relaxed">
              {en
                ? "For SaaS products serving multiple businesses, tenant isolation is a core architectural decision. I evaluated three strategies and implemented the shared database approach with defense-in-depth."
                : "Para produtos SaaS que atendem múltiplos negócios, o isolamento de tenants é uma decisão arquitetural central. Avaliei três estratégias e implementei a abordagem de banco compartilhado com defesa em profundidade."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  title: en ? "DB per tenant" : "DB por tenant",
                  desc: en ? "Max isolation, high operational cost" : "Máximo isolamento, alto custo operacional",
                  status: en ? "Discarded" : "Descartado",
                },
                {
                  title: en ? "Schema per tenant" : "Schema por tenant",
                  desc: en ? "Good isolation, migration complexity" : "Bom isolamento, complexidade de migrações",
                  status: en ? "Discarded" : "Descartado",
                },
                {
                  title: en ? "Shared DB + tenant_id" : "DB compartilhado + tenant_id",
                  desc: en ? "Best cost/simplicity ratio, needs RLS" : "Melhor custo/simplicidade, requer RLS",
                  status: en ? "Chosen" : "Escolhido",
                },
              ].map((s) => (
                <div key={s.title} className="rounded-md border border-border p-3">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-medium">{s.title}</h4>
                    <span className={`text-[10px] font-medium rounded-full px-2 py-0.5 ${
                      s.status === "Chosen" || s.status === "Escolhido"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {s.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                {en ? "Isolation Layers" : "Camadas de isolamento"}
              </h4>
              <ul className="text-sm space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-xs text-muted-foreground bg-muted/40 rounded px-1.5 py-0.5">1</span>
                  {en
                    ? "Application layer — all queries filtered by session.tenantId automatically"
                    : "Camada de aplicação — todas as queries filtradas por session.tenantId automaticamente"}
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-xs text-muted-foreground bg-muted/40 rounded px-1.5 py-0.5">2</span>
                  {en
                    ? "Database layer — PostgreSQL Row Level Security (RLS) as safety net"
                    : "Camada de banco — Row Level Security (RLS) do PostgreSQL como rede de segurança"}
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-xs text-muted-foreground bg-muted/40 rounded px-1.5 py-0.5">3</span>
                  {en
                    ? "Performance — composite indexes on (tenant_id, ...) + table partitioning for large tenants"
                    : "Performance — índices compostos em (tenant_id, ...) + particionamento de tabelas para tenants grandes"}
                </li>
              </ul>
            </div>

            <Link
              href="/posts/multi-tenant-architecture-postgresql"
              className="text-sm text-primary hover:underline inline-block"
            >
              {en ? "Read full implementation →" : "Ler implementação completa →"}
            </Link>
          </div>
        </EngineeringTopic>

        {/* Topic 3: Payments */}
        <EngineeringTopic
          title={en ? "Payments & External Integrations" : "Pagamentos e integrações externas"}
          subtitle={en
            ? "Webhooks, idempotency, PIX flows across multiple providers"
            : "Webhooks, idempotência, fluxos PIX em múltiplos provedores"}
        >
          <div className="space-y-5">
            <p className="text-sm leading-relaxed">
              {en
                ? "I've integrated payment systems across multiple production products — Stripe, Mercado Pago and Asaas. Each has different webhook patterns, failure modes, and consistency guarantees."
                : "Integrei sistemas de pagamento em múltiplos produtos em produção — Stripe, Mercado Pago e Asaas. Cada um tem padrões de webhook, modos de falha e garantias de consistência diferentes."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-md border border-border p-4">
                <h4 className="text-sm font-medium mb-2">
                  {en ? "Webhook Architecture" : "Arquitetura de Webhooks"}
                </h4>
                <ul className="text-xs space-y-1.5 text-muted-foreground">
                  <li>- {en ? "Signature validation on every incoming event" : "Validação de assinatura em cada evento recebido"}</li>
                  <li>- {en ? "Idempotency keys to prevent duplicate processing" : "Chaves de idempotência para evitar processamento duplicado"}</li>
                  <li>- {en ? "Async processing — ack immediately, process in background" : "Processamento assíncrono — ack imediato, processa em background"}</li>
                  <li>- {en ? "Dead letter queue for failed events" : "Dead letter queue para eventos com falha"}</li>
                </ul>
              </div>

              <div className="rounded-md border border-border p-4">
                <h4 className="text-sm font-medium mb-2">
                  {en ? "Real-world Concerns" : "Preocupações reais"}
                </h4>
                <ul className="text-xs space-y-1.5 text-muted-foreground">
                  <li>- {en ? "PIX confirmation delays vary between providers" : "Atrasos na confirmação de PIX variam entre provedores"}</li>
                  <li>- {en ? "Webhook retries arriving out of order" : "Retries de webhook chegando fora de ordem"}</li>
                  <li>- {en ? "Reconciliation between local state and provider state" : "Reconciliação entre estado local e estado do provedor"}</li>
                  <li>- {en ? "Graceful degradation when provider is down" : "Degradação graciosa quando o provedor está fora"}</li>
                </ul>
              </div>
            </div>
          </div>
        </EngineeringTopic>
      </section>

      {/* Problems Solved */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-xl font-semibold">
            {en ? "Problems Solved in Production" : "Problemas resolvidos em produção"}
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {(en ? [
              { signal: "API latency", detail: "Third-party API timeouts causing cascading failures in checkout — solved with circuit breaker pattern and fallback responses" },
              { signal: "Marketplace inconsistencies", detail: "External marketplace APIs returning inconsistent product data — built abstraction layer normalizing different schemas into unified model" },
              { signal: "Legacy migration", detail: "Migrating client systems from PHP monolith to React + Next.js without downtime — incremental strangler fig approach" },
              { signal: "Performance at scale", detail: "API response times degrading with growing user base — query optimization, strategic caching, parallel API calls" },
              { signal: "Cross-platform UX", detail: "Maintaining consistent UX between React (web) and React Native (mobile) — shared design tokens and component contracts" },
              { signal: "Data consistency", detail: "Financial modules (sales + commissions + payments) drifting out of sync — atomic transactions with PostgreSQL advisory locks" },
            ] : [
              { signal: "Latência de API", detail: "Timeouts de APIs terceiras causando falhas em cascata no checkout — resolvido com circuit breaker e respostas fallback" },
              { signal: "Inconsistências de marketplace", detail: "APIs de marketplaces externos retornando dados inconsistentes — camada de abstração normalizando schemas em modelo unificado" },
              { signal: "Migração de legado", detail: "Migrando sistemas de clientes de monolito PHP para React + Next.js sem downtime — abordagem incremental strangler fig" },
              { signal: "Performance em escala", detail: "Tempos de resposta da API degradando com crescimento de usuários — otimização de queries, caching estratégico, chamadas paralelas" },
              { signal: "UX cross-platform", detail: "Manter UX consistente entre React (web) e React Native (mobile) — design tokens e contratos de componentes compartilhados" },
              { signal: "Consistência de dados", detail: "Módulos financeiros (vendas + comissões + pagamentos) perdendo sincronia — transações atômicas com advisory locks do PostgreSQL" },
            ]).map((item) => (
              <div key={item.signal} className="py-2">
                <h3 className="text-sm font-medium">{item.signal}</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI in Production */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-xl font-semibold">
            {en ? "AI Systems in Production" : "Sistemas de IA em produção"}
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="rounded-lg border border-border bg-card p-6 space-y-5">
          <p className="text-sm leading-relaxed">
            {en
              ? "Not chatbots — production pipelines where AI is a component in a larger system, with fallbacks, monitoring, and real data flowing through."
              : "Não chatbots — pipelines em produção onde IA é um componente em um sistema maior, com fallbacks, monitoramento e dados reais fluindo."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-md border border-border p-4">
              <h3 className="text-sm font-medium mb-2">
                {en ? "WhatsApp AI Agent" : "Agente IA no WhatsApp"}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {en
                  ? "LLM-powered agent handling customer service, product recommendations and sales completion. Messages processed async, data registered back into PostgreSQL. Fallback to rule-based matching when LLM is unavailable."
                  : "Agente com LLM para atendimento, recomendação de produtos e finalização de vendas. Mensagens processadas de forma assíncrona, dados registrados no PostgreSQL. Fallback para matching por regras quando LLM está indisponível."}
              </p>
            </div>

            <div className="rounded-md border border-border p-4">
              <h3 className="text-sm font-medium mb-2">
                {en ? "RAG Pipeline (LangChain + pgVector)" : "Pipeline RAG (LangChain + pgVector)"}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {en
                  ? "Document ingestion → chunk splitting → embedding generation → vector storage in PostgreSQL with pgVector → semantic search with top-K retrieval as LLM context."
                  : "Ingestão de documentos → chunking → geração de embeddings → armazenamento vetorial no PostgreSQL com pgVector → busca semântica com top-K como contexto para LLM."}
              </p>
              <Link
                href="/posts/rag-langchain-postgres-fullcycle"
                className="text-xs text-primary hover:underline mt-2 inline-block"
              >
                {en ? "Read full implementation →" : "Ler implementação completa →"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Deep dives */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-xl font-semibold">
            {en ? "Deep Dives" : "Aprofundamentos"}
          </h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              title: en ? "Multi-tenant Architecture" : "Arquitetura Multi-tenant",
              desc: en ? "Shared DB, RLS, partitioning" : "Banco compartilhado, RLS, particionamento",
              href: "/posts/multi-tenant-architecture-postgresql",
            },
            {
              title: en ? "RAG with LangChain" : "RAG com LangChain",
              desc: en ? "Embeddings, pgVector, semantic search" : "Embeddings, pgVector, busca semântica",
              href: "/posts/rag-langchain-postgres-fullcycle",
            },
            {
              title: en ? "Design Systems at Scale" : "Design Systems em escala",
              desc: en ? "Shadcn UI, tokens, component contracts" : "Shadcn UI, tokens, contratos de componentes",
              href: "/posts/design-system-shadcn-tailwind",
            },
          ].map((post) => (
            <Link
              key={post.href}
              href={post.href}
              className="group rounded-lg border border-border bg-card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{post.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
