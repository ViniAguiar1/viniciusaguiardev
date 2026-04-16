import Link from "next/link"
import { getLocale, t } from "@/lib/i18n-server"
import { EngineeringTopic } from "@/components/engineering-topic"
import { JsonLd } from "@/components/json-ld"

const siteUrl = "https://viniciusaguiardev.com.br"

export async function generateMetadata() {
  const locale = await getLocale()
  return {
    title: t(locale, "Engenharia", "Engineering", "Ingeniería"),
    description: t(
      locale,
      "Arquitetura de sistemas, decisões técnicas e problemas reais resolvidos em produção.",
      "Architecture decisions, trade-offs, and real problems solved in production.",
      "Decisiones de arquitectura, trade-offs y problemas reales resueltos en producción."
    ),
  }
}

export default async function EngineeringPage() {
  const locale = await getLocale()

  const faq = locale === "en"
    ? [
        { q: "What is multi-tenant architecture?", a: "A design pattern where multiple organizations share the same application and database, but each tenant's data is isolated. The most common approach in modern SaaS is shared database with tenant_id column and PostgreSQL Row Level Security (RLS) as a safety net." },
        { q: "How to handle payment webhooks reliably?", a: "Use a layered approach: validate signatures on every event, enforce idempotency with stored event IDs, ack immediately and process in background, validate state transitions with a state machine, run periodic reconciliation jobs, and route failed events to a dead letter queue." },
        { q: "How to integrate AI into production systems?", a: "Treat AI as a system component, not a standalone feature. Process messages asynchronously, register data back into your database, implement fallbacks for when the LLM is unavailable, and monitor response quality. The key is reliability — the system must work even when the AI provider has issues." },
        { q: "What is the circuit breaker pattern?", a: "A resilience pattern for third-party API integrations. When an external API starts failing, the circuit breaker 'opens' and returns fallback responses instead of cascading the failure through your system. After a cooldown period, it allows test requests to check if the service recovered." },
      ]
    : locale === "es"
    ? [
        { q: "¿Qué es la arquitectura multi-tenant?", a: "Un patrón de diseño donde múltiples organizaciones comparten la misma aplicación y base de datos, pero los datos de cada tenant están aislados. El enfoque más común en SaaS moderno es base de datos compartida con columna tenant_id y Row Level Security (RLS) de PostgreSQL como red de seguridad." },
        { q: "¿Cómo manejar webhooks de pago de forma confiable?", a: "Use un enfoque en capas: valide firmas en cada evento, garantice idempotencia con IDs de eventos almacenados, responda inmediatamente y procese en background, valide transiciones de estado con state machine, ejecute jobs de reconciliación periódicos y dirija eventos fallidos a una dead letter queue." },
        { q: "¿Cómo integrar IA en sistemas de producción?", a: "Trate la IA como un componente del sistema, no una feature aislada. Procese mensajes de forma asíncrona, registre datos de vuelta en la base de datos, implemente fallbacks para cuando el LLM no esté disponible y monitoree la calidad de las respuestas. El punto central es confiabilidad — el sistema debe funcionar incluso cuando el proveedor de IA tiene problemas." },
        { q: "¿Qué es el patrón circuit breaker?", a: "Un patrón de resiliencia para integraciones con APIs de terceros. Cuando una API externa empieza a fallar, el circuit breaker se 'abre' y retorna respuestas fallback en lugar de propagar la falla por el sistema. Después de un período de cooldown, permite solicitudes de prueba para verificar si el servicio se recuperó." },
      ]
    : [
        { q: "O que é arquitetura multi-tenant?", a: "Um padrão de design onde múltiplas organizações compartilham a mesma aplicação e banco de dados, mas os dados de cada tenant são isolados. A abordagem mais comum em SaaS moderno é banco compartilhado com coluna tenant_id e Row Level Security (RLS) do PostgreSQL como rede de segurança." },
        { q: "Como lidar com webhooks de pagamento de forma confiável?", a: "Use uma abordagem em camadas: valide assinaturas em cada evento, garanta idempotência com IDs de eventos armazenados, responda imediatamente e processe em background, valide transições de estado com state machine, execute jobs de reconciliação periódicos e direcione eventos com falha para uma dead letter queue." },
        { q: "Como integrar IA em sistemas de produção?", a: "Trate a IA como um componente do sistema, não uma feature isolada. Processe mensagens de forma assíncrona, registre dados de volta no banco, implemente fallbacks para quando o LLM estiver indisponível e monitore a qualidade das respostas. O ponto central é confiabilidade — o sistema precisa funcionar mesmo quando o provedor de IA tem problemas." },
        { q: "O que é o padrão circuit breaker?", a: "Um padrão de resiliência para integrações com APIs terceiras. Quando uma API externa começa a falhar, o circuit breaker 'abre' e retorna respostas fallback ao invés de propagar a falha pelo sistema. Após um período de cooldown, permite requisições de teste para verificar se o serviço se recuperou." },
      ]

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: t(locale, "Engenharia", "Engineering", "Ingeniería"),
          description: t(locale,
            "Arquitetura de sistemas, decisões técnicas e problemas reais resolvidos em produção.",
            "Architecture decisions, trade-offs, and real problems solved in production.",
            "Decisiones de arquitectura, trade-offs y problemas reales resueltos en producción."
          ),
          url: `${siteUrl}/engenharia`,
          author: { "@type": "Person", name: "Vinicius Aguiar", url: siteUrl },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />

      {/* Hero */}
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t(locale, "Engenharia", "Engineering", "Ingeniería")}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          {t(locale,
            "Sistemas que projetei e operei em produção — decisões de arquitetura, trade-offs e restrições reais.",
            "Systems I've designed and operated in production — architecture decisions, trade-offs, and real constraints.",
            "Sistemas que diseñé y operé en producción — decisiones de arquitectura, trade-offs y restricciones reales."
          )}
        </p>
      </header>

      {/* Expandable topics */}
      <section className="space-y-3 mb-12">
        <EngineeringTopic
          title={t(locale, "Arquitetura SaaS — Plataforma Vertical", "SaaS Architecture — Vertical Platform", "Arquitectura SaaS — Plataforma Vertical")}
          subtitle={t(locale, "Plataforma multi-módulo: agenda, vendas, financeiro, IA no WhatsApp", "Multi-module platform: scheduling, sales, finance, WhatsApp AI", "Plataforma multi-módulo: agenda, ventas, financiero, IA en WhatsApp")}
        >
          <div className="space-y-5">
            <p className="text-sm leading-relaxed">
              {t(locale,
                "Plataforma SaaS multi-módulo para pequenos negócios em um vertical específico. Projetei o sistema para lidar com agenda, vendas, financeiro, comissões e automações via WhatsApp — tudo operando como um único produto com dados compartilhados.",
                "Multi-module SaaS platform serving small businesses in a specific vertical. I designed the system to handle scheduling, sales, finance, commissions, and WhatsApp automations — all operating as a single product with shared data.",
                "Plataforma SaaS multi-módulo para pequeños negocios en un vertical específico. Diseñé el sistema para manejar agenda, ventas, financiero, comisiones y automatizaciones vía WhatsApp — todo operando como un único producto con datos compartidos."
              )}
            </p>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                {t(locale, "Decisões-chave", "Key Decisions", "Decisiones clave")}
              </h4>
              <ul className="text-sm space-y-1.5">
                <li className="flex items-start gap-2"><span className="text-muted-foreground mt-0.5">-</span>{t(locale, "Arquitetura orientada a eventos para pipeline WhatsApp → LLM → PostgreSQL", "Event-driven architecture for WhatsApp → LLM → PostgreSQL pipeline", "Arquitectura orientada a eventos para pipeline WhatsApp → LLM → PostgreSQL")}</li>
                <li className="flex items-start gap-2"><span className="text-muted-foreground mt-0.5">-</span>{t(locale, "Transações atômicas para manter vendas, comissões e pagamentos sempre sincronizados", "Atomic transactions to keep sales, commissions and payments always in sync", "Transacciones atómicas para mantener ventas, comisiones y pagos siempre sincronizados")}</li>
                <li className="flex items-start gap-2"><span className="text-muted-foreground mt-0.5">-</span>{t(locale, "Integração de IA no WhatsApp para atendimento automatizado e recomendação de produtos", "AI integration in WhatsApp for automated support and product recommendations", "Integración de IA en WhatsApp para atención automatizada y recomendación de productos")}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "WhatsApp API", "OpenAI", "Stripe"].map((tech) => (
                  <span key={tech} className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-xs">{tech}</span>
                ))}
              </div>
            </div>
            <div className="rounded-md border border-border bg-muted/20 p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Trade-off</h4>
              <p className="text-sm leading-relaxed">
                {t(locale,
                  "Os fluxos de IA no WhatsApp precisavam ser confiáveis o suficiente para fechar vendas automaticamente. A escolha era entre processamento síncrono (mais simples, mas bloqueia na latência do LLM) vs. fila de eventos assíncrona. Optamos pelo assíncrono — o usuário recebe um ack imediato e a resposta da IA é processada em background com lógica de retry. Isso adicionou complexidade mas eliminou mensagens perdidas durante picos do provedor.",
                  "WhatsApp AI flows needed to be reliable enough to close sales automatically. The choice was between synchronous processing (simpler, but blocks on LLM latency) vs. async event queue. We went with async — the user gets an immediate ack, and the AI response is processed in background with retry logic. This added complexity but eliminated dropped messages during provider spikes.",
                  "Los flujos de IA en WhatsApp necesitaban ser confiables para cerrar ventas automáticamente. La elección era entre procesamiento síncrono (más simple, pero bloquea en la latencia del LLM) vs. cola de eventos asíncrona. Optamos por el asíncrono — el usuario recibe un ack inmediato y la respuesta de la IA se procesa en background con lógica de retry. Esto agregó complejidad pero eliminó mensajes perdidos durante picos del proveedor."
                )}
              </p>
            </div>
          </div>
        </EngineeringTopic>

        <EngineeringTopic
          title={t(locale, "Isolamento de dados Multi-tenant", "Multi-tenant Data Isolation", "Aislamiento de datos Multi-tenant")}
          subtitle={t(locale, "Banco compartilhado + tenant_id + RLS — avaliou 3 estratégias, escolheu simplicidade", "Shared DB + tenant_id + RLS — evaluated 3 strategies, chose simplicity", "Base compartida + tenant_id + RLS — evaluó 3 estrategias, eligió simplicidad")}
        >
          <div className="space-y-5">
            <p className="text-sm leading-relaxed">
              {t(locale,
                "Para produtos SaaS que atendem múltiplos negócios, o isolamento de tenants é uma decisão arquitetural central. Avaliei três estratégias e implementei a abordagem de banco compartilhado com defesa em profundidade.",
                "For SaaS products serving multiple businesses, tenant isolation is a core architectural decision. I evaluated three strategies and implemented the shared database approach with defense-in-depth.",
                "Para productos SaaS que atienden múltiples negocios, el aislamiento de tenants es una decisión arquitectural central. Evalué tres estrategias e implementé el enfoque de base compartida con defensa en profundidad."
              )}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { title: t(locale, "DB por tenant", "DB per tenant", "DB por tenant"), desc: t(locale, "Máximo isolamento, alto custo operacional", "Max isolation, high operational cost", "Máximo aislamiento, alto costo operacional"), status: t(locale, "Descartado", "Discarded", "Descartado") },
                { title: t(locale, "Schema por tenant", "Schema per tenant", "Schema por tenant"), desc: t(locale, "Bom isolamento, complexidade de migrações", "Good isolation, migration complexity", "Buen aislamiento, complejidad de migraciones"), status: t(locale, "Descartado", "Discarded", "Descartado") },
                { title: t(locale, "DB compartilhado + tenant_id", "Shared DB + tenant_id", "DB compartida + tenant_id"), desc: t(locale, "Melhor custo/simplicidade, requer RLS", "Best cost/simplicity ratio, needs RLS", "Mejor costo/simplicidad, requiere RLS"), status: t(locale, "Escolhido", "Chosen", "Elegido") },
              ].map((s) => (
                <div key={s.title} className="rounded-md border border-border p-3">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-medium">{s.title}</h4>
                    <span className={`text-[10px] font-medium rounded-full px-2 py-0.5 ${s.status === "Chosen" || s.status === "Escolhido" || s.status === "Elegido" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-muted text-muted-foreground"}`}>{s.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">{t(locale, "Camadas de isolamento", "Isolation Layers", "Capas de aislamiento")}</h4>
              <ul className="text-sm space-y-1.5">
                <li className="flex items-start gap-2"><span className="font-mono text-xs text-muted-foreground bg-muted/40 rounded px-1.5 py-0.5">1</span>{t(locale, "Camada de aplicação — todas as queries filtradas por session.tenantId automaticamente", "Application layer — all queries filtered by session.tenantId automatically", "Capa de aplicación — todas las queries filtradas por session.tenantId automáticamente")}</li>
                <li className="flex items-start gap-2"><span className="font-mono text-xs text-muted-foreground bg-muted/40 rounded px-1.5 py-0.5">2</span>{t(locale, "Camada de banco — Row Level Security (RLS) do PostgreSQL como rede de segurança", "Database layer — PostgreSQL Row Level Security (RLS) as safety net", "Capa de base de datos — Row Level Security (RLS) de PostgreSQL como red de seguridad")}</li>
                <li className="flex items-start gap-2"><span className="font-mono text-xs text-muted-foreground bg-muted/40 rounded px-1.5 py-0.5">3</span>{t(locale, "Performance — índices compostos em (tenant_id, ...) + particionamento de tabelas para tenants grandes", "Performance — composite indexes on (tenant_id, ...) + table partitioning for large tenants", "Performance — índices compuestos en (tenant_id, ...) + particionamiento de tablas para tenants grandes")}</li>
              </ul>
            </div>
            <Link href="/posts/multi-tenant-architecture-postgresql" className="text-sm text-primary hover:underline inline-block">
              {t(locale, "Ler implementação completa →", "Read full implementation →", "Leer implementación completa →")}
            </Link>
          </div>
        </EngineeringTopic>

        <EngineeringTopic
          title={t(locale, "Pagamentos e integrações externas", "Payments & External Integrations", "Pagos e integraciones externas")}
          subtitle={t(locale, "Webhooks, idempotência, fluxos PIX em múltiplos provedores", "Webhooks, idempotency, PIX flows across multiple providers", "Webhooks, idempotencia, flujos PIX en múltiples proveedores")}
        >
          <div className="space-y-5">
            <p className="text-sm leading-relaxed">
              {t(locale,
                "Integrei sistemas de pagamento em múltiplos produtos em produção — Stripe, Mercado Pago e Asaas. Cada um tem padrões de webhook, modos de falha e garantias de consistência diferentes.",
                "I've integrated payment systems across multiple production products — Stripe, Mercado Pago and Asaas. Each has different webhook patterns, failure modes, and consistency guarantees.",
                "Integré sistemas de pago en múltiples productos en producción — Stripe, Mercado Pago y Asaas. Cada uno tiene patrones de webhook, modos de falla y garantías de consistencia diferentes."
              )}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-md border border-border p-4">
                <h4 className="text-sm font-medium mb-2">{t(locale, "Arquitetura de Webhooks", "Webhook Architecture", "Arquitectura de Webhooks")}</h4>
                <ul className="text-xs space-y-1.5 text-muted-foreground">
                  <li>- {t(locale, "Validação de assinatura em cada evento recebido", "Signature validation on every incoming event", "Validación de firma en cada evento recibido")}</li>
                  <li>- {t(locale, "Chaves de idempotência para evitar processamento duplicado", "Idempotency keys to prevent duplicate processing", "Claves de idempotencia para evitar procesamiento duplicado")}</li>
                  <li>- {t(locale, "Processamento assíncrono — ack imediato, processa em background", "Async processing — ack immediately, process in background", "Procesamiento asíncrono — ack inmediato, procesa en background")}</li>
                  <li>- {t(locale, "Dead letter queue para eventos com falha", "Dead letter queue for failed events", "Dead letter queue para eventos con falla")}</li>
                </ul>
              </div>
              <div className="rounded-md border border-border p-4">
                <h4 className="text-sm font-medium mb-2">{t(locale, "Preocupações reais", "Real-world Concerns", "Preocupaciones reales")}</h4>
                <ul className="text-xs space-y-1.5 text-muted-foreground">
                  <li>- {t(locale, "Atrasos na confirmação de PIX variam entre provedores", "PIX confirmation delays vary between providers", "Atrasos en la confirmación de PIX varían entre proveedores")}</li>
                  <li>- {t(locale, "Retries de webhook chegando fora de ordem", "Webhook retries arriving out of order", "Retries de webhook llegando fuera de orden")}</li>
                  <li>- {t(locale, "Reconciliação entre estado local e estado do provedor", "Reconciliation between local state and provider state", "Reconciliación entre estado local y estado del proveedor")}</li>
                  <li>- {t(locale, "Degradação graciosa quando o provedor está fora", "Graceful degradation when provider is down", "Degradación graciosa cuando el proveedor está caído")}</li>
                </ul>
              </div>
            </div>
            <Link href="/posts/webhook-architecture-payment-providers" className="text-sm text-primary hover:underline inline-block">
              {t(locale, "Ler implementação completa →", "Read full implementation →", "Leer implementación completa →")}
            </Link>
          </div>
        </EngineeringTopic>
      </section>

      {/* Problems Solved */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-xl font-semibold">{t(locale, "Problemas resolvidos em produção", "Problems Solved in Production", "Problemas resueltos en producción")}</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {[
              { signal: t(locale, "Latência de API", "API latency", "Latencia de API"), detail: t(locale, "Timeouts de APIs terceiras causando falhas em cascata no checkout — resolvido com circuit breaker e respostas fallback", "Third-party API timeouts causing cascading failures in checkout — solved with circuit breaker pattern and fallback responses", "Timeouts de APIs de terceros causando fallas en cascada en el checkout — resuelto con circuit breaker y respuestas fallback") },
              { signal: t(locale, "Inconsistências de marketplace", "Marketplace inconsistencies", "Inconsistencias de marketplace"), detail: t(locale, "APIs de marketplaces externos retornando dados inconsistentes — camada de abstração normalizando schemas em modelo unificado", "External marketplace APIs returning inconsistent product data — built abstraction layer normalizing different schemas into unified model", "APIs de marketplaces externos retornando datos inconsistentes — capa de abstracción normalizando schemas en modelo unificado") },
              { signal: t(locale, "Migração de legado", "Legacy migration", "Migración de legado"), detail: t(locale, "Migrando sistemas de clientes de monolito PHP para React + Next.js sem downtime — abordagem incremental strangler fig", "Migrating client systems from PHP monolith to React + Next.js without downtime — incremental strangler fig approach", "Migrando sistemas de clientes de monolito PHP a React + Next.js sin downtime — enfoque incremental strangler fig") },
              { signal: t(locale, "Performance em escala", "Performance at scale", "Rendimiento a escala"), detail: t(locale, "Tempos de resposta da API degradando com crescimento de usuários — otimização de queries, caching estratégico, chamadas paralelas", "API response times degrading with growing user base — query optimization, strategic caching, parallel API calls", "Tiempos de respuesta de la API degradando con crecimiento de usuarios — optimización de queries, caching estratégico, llamadas paralelas") },
              { signal: t(locale, "UX cross-platform", "Cross-platform UX", "UX cross-platform"), detail: t(locale, "Manter UX consistente entre React (web) e React Native (mobile) — design tokens e contratos de componentes compartilhados", "Maintaining consistent UX between React (web) and React Native (mobile) — shared design tokens and component contracts", "Mantener UX consistente entre React (web) y React Native (mobile) — design tokens y contratos de componentes compartidos") },
              { signal: t(locale, "Consistência de dados", "Data consistency", "Consistencia de datos"), detail: t(locale, "Módulos financeiros (vendas + comissões + pagamentos) perdendo sincronia — transações atômicas com advisory locks do PostgreSQL", "Financial modules (sales + commissions + payments) drifting out of sync — atomic transactions with PostgreSQL advisory locks", "Módulos financieros (ventas + comisiones + pagos) perdiendo sincronía — transacciones atómicas con advisory locks de PostgreSQL") },
            ].map((item) => (
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
          <h2 className="text-xl font-semibold">{t(locale, "Sistemas de IA em produção", "AI Systems in Production", "Sistemas de IA en producción")}</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="rounded-lg border border-border bg-card p-6 space-y-5">
          <p className="text-sm leading-relaxed">
            {t(locale,
              "Não chatbots — pipelines em produção onde IA é um componente em um sistema maior, com fallbacks, monitoramento e dados reais fluindo.",
              "Not chatbots — production pipelines where AI is a component in a larger system, with fallbacks, monitoring, and real data flowing through.",
              "No chatbots — pipelines en producción donde IA es un componente en un sistema mayor, con fallbacks, monitoreo y datos reales fluyendo."
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-md border border-border p-4">
              <h3 className="text-sm font-medium mb-2">{t(locale, "Agente IA no WhatsApp", "WhatsApp AI Agent", "Agente IA en WhatsApp")}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t(locale,
                  "Agente com LLM para atendimento, recomendação de produtos e finalização de vendas. Mensagens processadas de forma assíncrona, dados registrados no PostgreSQL. Fallback para matching por regras quando LLM está indisponível.",
                  "LLM-powered agent handling customer service, product recommendations and sales completion. Messages processed async, data registered back into PostgreSQL. Fallback to rule-based matching when LLM is unavailable.",
                  "Agente con LLM para atención, recomendación de productos y cierre de ventas. Mensajes procesados de forma asíncrona, datos registrados en PostgreSQL. Fallback a matching por reglas cuando LLM no está disponible."
                )}
              </p>
            </div>
            <div className="rounded-md border border-border p-4">
              <h3 className="text-sm font-medium mb-2">{t(locale, "Pipeline RAG (LangChain + pgVector)", "RAG Pipeline (LangChain + pgVector)", "Pipeline RAG (LangChain + pgVector)")}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t(locale,
                  "Ingestão de documentos → chunking → geração de embeddings → armazenamento vetorial no PostgreSQL com pgVector → busca semântica com top-K como contexto para LLM.",
                  "Document ingestion → chunk splitting → embedding generation → vector storage in PostgreSQL with pgVector → semantic search with top-K retrieval as LLM context.",
                  "Ingestión de documentos → chunking → generación de embeddings → almacenamiento vectorial en PostgreSQL con pgVector → búsqueda semántica con top-K como contexto para LLM."
                )}
              </p>
              <Link href="/posts/rag-langchain-postgres-fullcycle" className="text-xs text-primary hover:underline mt-2 inline-block">
                {t(locale, "Ler implementação completa →", "Read full implementation →", "Leer implementación completa →")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-xl font-semibold">{t(locale, "Perguntas frequentes", "Frequently Asked Questions", "Preguntas frecuentes")}</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="space-y-4">
          {faq.map((item) => (
            <div key={item.q} className="rounded-lg border border-border bg-card p-5">
              <h3 className="text-sm font-semibold">{item.q}</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Deep dives */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-xl font-semibold">{t(locale, "Aprofundamentos", "Deep Dives", "Profundizaciones")}</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { title: t(locale, "Arquitetura de Webhooks para Pagamentos", "Webhook Architecture for Payments", "Arquitectura de Webhooks para Pagos"), desc: t(locale, "Idempotência, reconciliação, fluxos PIX", "Idempotency, reconciliation, PIX flows", "Idempotencia, reconciliación, flujos PIX"), href: "/posts/webhook-architecture-payment-providers" },
            { title: t(locale, "Arquitetura Multi-tenant", "Multi-tenant Architecture", "Arquitectura Multi-tenant"), desc: t(locale, "Banco compartilhado, RLS, particionamento", "Shared DB, RLS, partitioning", "Base compartida, RLS, particionamiento"), href: "/posts/multi-tenant-architecture-postgresql" },
            { title: t(locale, "RAG com LangChain", "RAG with LangChain", "RAG con LangChain"), desc: t(locale, "Embeddings, pgVector, busca semântica", "Embeddings, pgVector, semantic search", "Embeddings, pgVector, búsqueda semántica"), href: "/posts/rag-langchain-postgres-fullcycle" },
            { title: t(locale, "Design Systems em escala", "Design Systems at Scale", "Design Systems a escala"), desc: t(locale, "Shadcn UI, tokens, contratos de componentes", "Shadcn UI, tokens, component contracts", "Shadcn UI, tokens, contratos de componentes"), href: "/posts/design-system-shadcn-tailwind" },
          ].map((post) => (
            <Link key={post.href} href={post.href} className="group rounded-lg border border-border bg-card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
              <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{post.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
