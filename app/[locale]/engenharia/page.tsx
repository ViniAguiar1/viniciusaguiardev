import Link from "next/link"
import { getLocale, t } from "@/lib/i18n-server"
import { localePath, buildAlternates } from "@/lib/i18n"
import { EngineeringTopic } from "@/components/engineering-topic"
import { JsonLd } from "@/components/json-ld"
import { FadeIn } from "@/components/fade-in"

const siteUrl = "https://viniciusaguiardev.com.br"

export async function generateMetadata() {
  const locale = await getLocale()
  return {
    title: t(locale, { pt: "Engenharia", en: "Engineering", es: "Ingeniería", jp: "エンジニアリング" }),
    description: t(locale, { pt: "Arquitetura de sistemas, decisões técnicas e problemas reais resolvidos em produção.", en: "Architecture decisions, trade-offs, and real problems solved in production.", es: "Decisiones de arquitectura, trade-offs y problemas reales resueltos en producción.", jp: "システムアーキテクチャ、技術的判断、本番環境で解決した実際の問題。" }),
    alternates: buildAlternates("/engenharia", locale),
  }
}

type PageProps = {
  searchParams: Promise<{ topic?: string }>
}

export default async function EngineeringPage({ searchParams }: PageProps) {
  const locale = await getLocale()
  const { topic } = await searchParams

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
    : locale === "jp"
    ? [
        { q: "マルチテナントアーキテクチャとは何ですか？", a: "複数の組織が同じアプリケーションとデータベースを共有しながら、各テナントのデータは分離される設計パターンです。最近のSaaSで最も一般的なアプローチは、tenant_id カラムを持つ共有データベースと、セーフティネットとしての PostgreSQL の Row Level Security（RLS）です。" },
        { q: "決済Webhookを信頼性高く処理するには？", a: "多層的なアプローチを使います：すべてのイベントで署名を検証し、保存したイベントIDで冪等性を担保し、即座にackを返してバックグラウンドで処理し、ステートマシンで状態遷移を検証し、定期的な照合ジョブを実行し、失敗したイベントはデッドレターキューへ振り分けます。" },
        { q: "本番システムにAIを統合するには？", a: "AIを単独の機能ではなく、システムの一部として扱います。メッセージを非同期で処理し、データをデータベースへ書き戻し、LLMが利用できないときのフォールバックを実装し、応答品質を監視します。要点は信頼性です — AIプロバイダーに問題があってもシステムは動作し続けなければなりません。" },
        { q: "サーキットブレーカーパターンとは何ですか？", a: "サードパーティAPI連携のためのレジリエンスパターンです。外部APIが失敗し始めると、サーキットブレーカーが「開き」、障害をシステム全体に波及させる代わりにフォールバック応答を返します。クールダウン期間の後、サービスが回復したかを確認するためのテストリクエストを許可します。" },
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
          name: t(locale, { pt: "Engenharia", en: "Engineering", es: "Ingeniería", jp: "エンジニアリング" }),
          description: t(locale, { pt: "Arquitetura de sistemas, decisões técnicas e problemas reais resolvidos em produção.", en: "Architecture decisions, trade-offs, and real problems solved in production.", es: "Decisiones de arquitectura, trade-offs y problemas reales resueltos en producción.", jp: "システムアーキテクチャ、技術的判断、本番環境で解決した実際の問題。" }),
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
      <FadeIn>
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t(locale, { pt: "Engenharia", en: "Engineering", es: "Ingeniería", jp: "エンジニアリング" })}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          {t(locale, { pt: "Sistemas que projetei e operei em produção — decisões de arquitetura, trade-offs e restrições reais.", en: "Systems I've designed and operated in production — architecture decisions, trade-offs, and real constraints.", es: "Sistemas que diseñé y operé en producción — decisiones de arquitectura, trade-offs y restricciones reales.", jp: "本番環境で設計・運用したシステム — アーキテクチャ判断、トレードオフ、実際の制約。" })}
        </p>
      </header>
      </FadeIn>

      {/* Expandable topics */}
      <FadeIn delay={100}>
      <section className="space-y-3 mb-12">
        <EngineeringTopic
          id="saas-architecture"
          defaultOpen={topic === "saas-architecture"}
          title={t(locale, { pt: "Arquitetura SaaS — Plataforma Vertical", en: "SaaS Architecture — Vertical Platform", es: "Arquitectura SaaS — Plataforma Vertical", jp: "SaaSアーキテクチャ — バーティカルプラットフォーム" })}
          subtitle={t(locale, { pt: "Plataforma multi-módulo: agenda, vendas, financeiro, IA no WhatsApp", en: "Multi-module platform: scheduling, sales, finance, WhatsApp AI", es: "Plataforma multi-módulo: agenda, ventas, financiero, IA en WhatsApp", jp: "マルチモジュールプラットフォーム：予約、販売、財務、WhatsApp上のAI" })}
        >
          <div className="space-y-5">
            <p className="text-sm leading-relaxed">
              {t(locale, { pt: "Plataforma SaaS multi-módulo para pequenos negócios em um vertical específico. Projetei o sistema para lidar com agenda, vendas, financeiro, comissões e automações via WhatsApp — tudo operando como um único produto com dados compartilhados.", en: "Multi-module SaaS platform serving small businesses in a specific vertical. I designed the system to handle scheduling, sales, finance, commissions, and WhatsApp automations — all operating as a single product with shared data.", es: "Plataforma SaaS multi-módulo para pequeños negocios en un vertical específico. Diseñé el sistema para manejar agenda, ventas, financiero, comisiones y automatizaciones vía WhatsApp — todo operando como un único producto con datos compartidos.", jp: "特定バーティカル向けの中小企業を対象としたマルチモジュールSaaSプラットフォーム。予約、販売、財務、手数料、WhatsApp自動化を扱うシステムを設計 — すべてが共有データを持つ単一プロダクトとして稼働。" })}
            </p>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                {t(locale, { pt: "Decisões-chave", en: "Key Decisions", es: "Decisiones clave", jp: "重要な判断" })}
              </h4>
              <ul className="text-sm space-y-1.5">
                <li className="flex items-start gap-2"><span className="text-muted-foreground mt-0.5">-</span>{t(locale, { pt: "Arquitetura orientada a eventos para pipeline WhatsApp → LLM → PostgreSQL", en: "Event-driven architecture for WhatsApp → LLM → PostgreSQL pipeline", es: "Arquitectura orientada a eventos para pipeline WhatsApp → LLM → PostgreSQL", jp: "WhatsApp → LLM → PostgreSQLパイプラインのためのイベント駆動アーキテクチャ" })}</li>
                <li className="flex items-start gap-2"><span className="text-muted-foreground mt-0.5">-</span>{t(locale, { pt: "Transações atômicas para manter vendas, comissões e pagamentos sempre sincronizados", en: "Atomic transactions to keep sales, commissions and payments always in sync", es: "Transacciones atómicas para mantener ventas, comisiones y pagos siempre sincronizados", jp: "販売、手数料、決済を常に同期させるためのアトミックトランザクション" })}</li>
                <li className="flex items-start gap-2"><span className="text-muted-foreground mt-0.5">-</span>{t(locale, { pt: "Integração de IA no WhatsApp para atendimento automatizado e recomendação de produtos", en: "AI integration in WhatsApp for automated support and product recommendations", es: "Integración de IA en WhatsApp para atención automatizada y recomendación de productos", jp: "WhatsAppへのAI統合による自動応対と商品推薦" })}</li>
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
                {t(locale, { pt: "Os fluxos de IA no WhatsApp precisavam ser confiáveis o suficiente para fechar vendas automaticamente. A escolha era entre processamento síncrono (mais simples, mas bloqueia na latência do LLM) vs. fila de eventos assíncrona. Optamos pelo assíncrono — o usuário recebe um ack imediato e a resposta da IA é processada em background com lógica de retry. Isso adicionou complexidade mas eliminou mensagens perdidas durante picos do provedor.", en: "WhatsApp AI flows needed to be reliable enough to close sales automatically. The choice was between synchronous processing (simpler, but blocks on LLM latency) vs. async event queue. We went with async — the user gets an immediate ack, and the AI response is processed in background with retry logic. This added complexity but eliminated dropped messages during provider spikes.", es: "Los flujos de IA en WhatsApp necesitaban ser confiables para cerrar ventas automáticamente. La elección era entre procesamiento síncrono (más simple, pero bloquea en la latencia del LLM) vs. cola de eventos asíncrona. Optamos por el asíncrono — el usuario recibe un ack inmediato y la respuesta de la IA se procesa en background con lógica de retry. Esto agregó complejidad pero eliminó mensajes perdidos durante picos del proveedor.", jp: "WhatsAppのAIフローは、販売を自動完了できるほど信頼性が必要でした。選択肢は同期処理（シンプルだがLLMレイテンシでブロックする）と非同期イベントキューでした。非同期を選択 — ユーザーは即座にackを受け取り、AIの応答はリトライロジックを伴ってバックグラウンドで処理されます。複雑さは増しましたが、プロバイダーのピーク時にメッセージが失われる問題はなくなりました。" })}
              </p>
            </div>
          </div>
        </EngineeringTopic>

        <EngineeringTopic
          id="multi-tenant"
          defaultOpen={topic === "multi-tenant"}
          title={t(locale, { pt: "Isolamento de dados Multi-tenant", en: "Multi-tenant Data Isolation", es: "Aislamiento de datos Multi-tenant", jp: "マルチテナントのデータ分離" })}
          subtitle={t(locale, { pt: "Banco compartilhado + tenant_id + RLS — avaliou 3 estratégias, escolheu simplicidade", en: "Shared DB + tenant_id + RLS — evaluated 3 strategies, chose simplicity", es: "Base compartida + tenant_id + RLS — evaluó 3 estrategias, eligió simplicidad", jp: "共有DB + tenant_id + RLS — 3つの戦略を比較し、シンプルさを選択" })}
        >
          <div className="space-y-5">
            <p className="text-sm leading-relaxed">
              {t(locale, { pt: "Para produtos SaaS que atendem múltiplos negócios, o isolamento de tenants é uma decisão arquitetural central. Avaliei três estratégias e implementei a abordagem de banco compartilhado com defesa em profundidade.", en: "For SaaS products serving multiple businesses, tenant isolation is a core architectural decision. I evaluated three strategies and implemented the shared database approach with defense-in-depth.", es: "Para productos SaaS que atienden múltiples negocios, el aislamiento de tenants es una decisión arquitectural central. Evalué tres estrategias e implementé el enfoque de base compartida con defensa en profundidad.", jp: "複数の企業にサービスを提供するSaaSプロダクトでは、テナント分離は中心的なアーキテクチャ判断です。3つの戦略を評価し、多層防御を伴う共有DBアプローチを実装しました。" })}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { title: t(locale, { pt: "DB por tenant", en: "DB per tenant", es: "DB por tenant", jp: "テナント単位のDB" }), desc: t(locale, { pt: "Máximo isolamento, alto custo operacional", en: "Max isolation, high operational cost", es: "Máximo aislamiento, alto costo operacional", jp: "最大の分離、高い運用コスト" }), status: t(locale, { pt: "Descartado", en: "Discarded", es: "Descartado", jp: "却下" }) },
                { title: t(locale, { pt: "Schema por tenant", en: "Schema per tenant", es: "Schema por tenant", jp: "テナント単位のスキーマ" }), desc: t(locale, { pt: "Bom isolamento, complexidade de migrações", en: "Good isolation, migration complexity", es: "Buen aislamiento, complejidad de migraciones", jp: "良好な分離、マイグレーションの複雑さ" }), status: t(locale, { pt: "Descartado", en: "Discarded", es: "Descartado", jp: "却下" }) },
                { title: t(locale, { pt: "DB compartilhado + tenant_id", en: "Shared DB + tenant_id", es: "DB compartida + tenant_id", jp: "共有DB + tenant_id" }), desc: t(locale, { pt: "Melhor custo/simplicidade, requer RLS", en: "Best cost/simplicity ratio, needs RLS", es: "Mejor costo/simplicidad, requiere RLS", jp: "コストとシンプルさのバランスが最良、RLSが必要" }), status: t(locale, { pt: "Escolhido", en: "Chosen", es: "Elegido", jp: "採用" }) },
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
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">{t(locale, { pt: "Camadas de isolamento", en: "Isolation Layers", es: "Capas de aislamiento", jp: "分離のレイヤー" })}</h4>
              <ul className="text-sm space-y-1.5">
                <li className="flex items-start gap-2"><span className="font-mono text-xs text-muted-foreground bg-muted/40 rounded px-1.5 py-0.5">1</span>{t(locale, { pt: "Camada de aplicação — todas as queries filtradas por session.tenantId automaticamente", en: "Application layer — all queries filtered by session.tenantId automatically", es: "Capa de aplicación — todas las queries filtradas por session.tenantId automáticamente", jp: "アプリケーション層 — すべてのクエリがsession.tenantIdで自動フィルタリング" })}</li>
                <li className="flex items-start gap-2"><span className="font-mono text-xs text-muted-foreground bg-muted/40 rounded px-1.5 py-0.5">2</span>{t(locale, { pt: "Camada de banco — Row Level Security (RLS) do PostgreSQL como rede de segurança", en: "Database layer — PostgreSQL Row Level Security (RLS) as safety net", es: "Capa de base de datos — Row Level Security (RLS) de PostgreSQL como red de seguridad", jp: "DB層 — PostgreSQLのRow Level Security（RLS）をセーフティネットとして利用" })}</li>
                <li className="flex items-start gap-2"><span className="font-mono text-xs text-muted-foreground bg-muted/40 rounded px-1.5 py-0.5">3</span>{t(locale, { pt: "Performance — índices compostos em (tenant_id, ...) + particionamento de tabelas para tenants grandes", en: "Performance — composite indexes on (tenant_id, ...) + table partitioning for large tenants", es: "Performance — índices compuestos en (tenant_id, ...) + particionamiento de tablas para tenants grandes", jp: "パフォーマンス — (tenant_id, ...) の複合インデックス + 大規模テナント向けのテーブルパーティショニング" })}</li>
              </ul>
            </div>
            <Link href={localePath(locale, "/posts/multi-tenant-architecture-postgresql")} className="text-sm text-primary hover:underline inline-block">
              {t(locale, { pt: "Ler implementação completa →", en: "Read full implementation →", es: "Leer implementación completa →", jp: "実装の詳細を読む →" })}
            </Link>
          </div>
        </EngineeringTopic>

        <EngineeringTopic
          id="payments"
          defaultOpen={topic === "payments"}
          title={t(locale, { pt: "Pagamentos e integrações externas", en: "Payments & External Integrations", es: "Pagos e integraciones externas", jp: "決済と外部連携" })}
          subtitle={t(locale, { pt: "Webhooks, idempotência, fluxos PIX em múltiplos provedores", en: "Webhooks, idempotency, PIX flows across multiple providers", es: "Webhooks, idempotencia, flujos PIX en múltiples proveedores", jp: "Webhook、冪等性、複数プロバイダーのPIXフロー" })}
        >
          <div className="space-y-5">
            <p className="text-sm leading-relaxed">
              {t(locale, { pt: "Integrei sistemas de pagamento em múltiplos produtos em produção — Stripe, Mercado Pago e Asaas. Cada um tem padrões de webhook, modos de falha e garantias de consistência diferentes.", en: "I've integrated payment systems across multiple production products — Stripe, Mercado Pago and Asaas. Each has different webhook patterns, failure modes, and consistency guarantees.", es: "Integré sistemas de pago en múltiples productos en producción — Stripe, Mercado Pago y Asaas. Cada uno tiene patrones de webhook, modos de falla y garantías de consistencia diferentes.", jp: "本番環境の複数プロダクトに決済システムを統合しました — Stripe、Mercado Pago、Asaas。それぞれWebhookのパターン、失敗モード、整合性保証が異なります。" })}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-md border border-border p-4">
                <h4 className="text-sm font-medium mb-2">{t(locale, { pt: "Arquitetura de Webhooks", en: "Webhook Architecture", es: "Arquitectura de Webhooks", jp: "Webhookアーキテクチャ" })}</h4>
                <ul className="text-xs space-y-1.5 text-muted-foreground">
                  <li>- {t(locale, { pt: "Validação de assinatura em cada evento recebido", en: "Signature validation on every incoming event", es: "Validación de firma en cada evento recibido", jp: "受信した各イベントの署名検証" })}</li>
                  <li>- {t(locale, { pt: "Chaves de idempotência para evitar processamento duplicado", en: "Idempotency keys to prevent duplicate processing", es: "Claves de idempotencia para evitar procesamiento duplicado", jp: "重複処理を防ぐための冪等性キー" })}</li>
                  <li>- {t(locale, { pt: "Processamento assíncrono — ack imediato, processa em background", en: "Async processing — ack immediately, process in background", es: "Procesamiento asíncrono — ack inmediato, procesa en background", jp: "非同期処理 — 即座にack、バックグラウンドで処理" })}</li>
                  <li>- {t(locale, { pt: "Dead letter queue para eventos com falha", en: "Dead letter queue for failed events", es: "Dead letter queue para eventos con falla", jp: "失敗したイベント用のデッドレターキュー" })}</li>
                </ul>
              </div>
              <div className="rounded-md border border-border p-4">
                <h4 className="text-sm font-medium mb-2">{t(locale, { pt: "Preocupações reais", en: "Real-world Concerns", es: "Preocupaciones reales", jp: "実際の懸念事項" })}</h4>
                <ul className="text-xs space-y-1.5 text-muted-foreground">
                  <li>- {t(locale, { pt: "Atrasos na confirmação de PIX variam entre provedores", en: "PIX confirmation delays vary between providers", es: "Atrasos en la confirmación de PIX varían entre proveedores", jp: "PIX確認の遅延はプロバイダー間で異なる" })}</li>
                  <li>- {t(locale, { pt: "Retries de webhook chegando fora de ordem", en: "Webhook retries arriving out of order", es: "Retries de webhook llegando fuera de orden", jp: "順不同で到着するWebhookリトライ" })}</li>
                  <li>- {t(locale, { pt: "Reconciliação entre estado local e estado do provedor", en: "Reconciliation between local state and provider state", es: "Reconciliación entre estado local y estado del proveedor", jp: "ローカル状態とプロバイダー状態の照合" })}</li>
                  <li>- {t(locale, { pt: "Degradação graciosa quando o provedor está fora", en: "Graceful degradation when provider is down", es: "Degradación graciosa cuando el proveedor está caído", jp: "プロバイダー停止時の優雅な機能低下" })}</li>
                </ul>
              </div>
            </div>
            <Link href={localePath(locale, "/posts/webhook-architecture-payment-providers")} className="text-sm text-primary hover:underline inline-block">
              {t(locale, { pt: "Ler implementação completa →", en: "Read full implementation →", es: "Leer implementación completa →", jp: "実装の詳細を読む →" })}
            </Link>
          </div>
        </EngineeringTopic>
      </section>
      </FadeIn>

      {/* Problems Solved */}
      <FadeIn delay={200}>
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-xl font-semibold">{t(locale, { pt: "Problemas resolvidos em produção", en: "Problems Solved in Production", es: "Problemas resueltos en producción", jp: "本番環境で解決した問題" })}</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {[
              { signal: t(locale, { pt: "Latência de API", en: "API latency", es: "Latencia de API", jp: "APIレイテンシ" }), detail: t(locale, { pt: "Timeouts de APIs terceiras causando falhas em cascata no checkout — resolvido com circuit breaker e respostas fallback", en: "Third-party API timeouts causing cascading failures in checkout — solved with circuit breaker pattern and fallback responses", es: "Timeouts de APIs de terceros causando fallas en cascada en el checkout — resuelto con circuit breaker y respuestas fallback", jp: "サードパーティAPIのタイムアウトによるチェックアウトのカスケード障害 — サーキットブレーカーとフォールバック応答で解決" }) },
              { signal: t(locale, { pt: "Inconsistências de marketplace", en: "Marketplace inconsistencies", es: "Inconsistencias de marketplace", jp: "マーケットプレイスの不整合" }), detail: t(locale, { pt: "APIs de marketplaces externos retornando dados inconsistentes — camada de abstração normalizando schemas em modelo unificado", en: "External marketplace APIs returning inconsistent product data — built abstraction layer normalizing different schemas into unified model", es: "APIs de marketplaces externos retornando datos inconsistentes — capa de abstracción normalizando schemas en modelo unificado", jp: "外部マーケットプレイスAPIから返ってくる不整合なデータ — スキーマを統一モデルに正規化する抽象化レイヤー" }) },
              { signal: t(locale, { pt: "Migração de legado", en: "Legacy migration", es: "Migración de legado", jp: "レガシーマイグレーション" }), detail: t(locale, { pt: "Migrando sistemas de clientes de monolito PHP para React + Next.js sem downtime — abordagem incremental strangler fig", en: "Migrating client systems from PHP monolith to React + Next.js without downtime — incremental strangler fig approach", es: "Migrando sistemas de clientes de monolito PHP a React + Next.js sin downtime — enfoque incremental strangler fig", jp: "クライアントのPHPモノリスをReact + Next.jsへダウンタイムなしで段階的に移行 — strangler figアプローチ" }) },
              { signal: t(locale, { pt: "Performance em escala", en: "Performance at scale", es: "Rendimiento a escala", jp: "スケール時のパフォーマンス" }), detail: t(locale, { pt: "Tempos de resposta da API degradando com crescimento de usuários — otimização de queries, caching estratégico, chamadas paralelas", en: "API response times degrading with growing user base — query optimization, strategic caching, parallel API calls", es: "Tiempos de respuesta de la API degradando con crecimiento de usuarios — optimización de queries, caching estratégico, llamadas paralelas", jp: "ユーザー増加に伴うAPI応答時間の劣化 — クエリ最適化、戦略的キャッシング、並列呼び出し" }) },
              { signal: t(locale, { pt: "UX cross-platform", en: "Cross-platform UX", es: "UX cross-platform", jp: "クロスプラットフォームUX" }), detail: t(locale, { pt: "Manter UX consistente entre React (web) e React Native (mobile) — design tokens e contratos de componentes compartilhados", en: "Maintaining consistent UX between React (web) and React Native (mobile) — shared design tokens and component contracts", es: "Mantener UX consistente entre React (web) y React Native (mobile) — design tokens y contratos de componentes compartidos", jp: "React（Web）とReact Native（モバイル）間で一貫したUXを維持 — デザイントークンとコンポーネント契約を共有" }) },
              { signal: t(locale, { pt: "Consistência de dados", en: "Data consistency", es: "Consistencia de datos", jp: "データの一貫性" }), detail: t(locale, { pt: "Módulos financeiros (vendas + comissões + pagamentos) perdendo sincronia — transações atômicas com advisory locks do PostgreSQL", en: "Financial modules (sales + commissions + payments) drifting out of sync — atomic transactions with PostgreSQL advisory locks", es: "Módulos financieros (ventas + comisiones + pagos) perdiendo sincronía — transacciones atómicas con advisory locks de PostgreSQL", jp: "財務モジュール（販売 + 手数料 + 決済）の同期ずれ — PostgreSQLのアドバイザリロックによるアトミックトランザクションで解決" }) },
            ].map((item) => (
              <div key={item.signal} className="py-2">
                <h3 className="text-sm font-medium">{item.signal}</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      {/* AI in Production */}
      <FadeIn delay={300}>
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-xl font-semibold">{t(locale, { pt: "Sistemas de IA em produção", en: "AI Systems in Production", es: "Sistemas de IA en producción", jp: "本番環境のAIシステム" })}</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="rounded-lg border border-border bg-card p-6 space-y-5">
          <p className="text-sm leading-relaxed">
            {t(locale, { pt: "Não chatbots — pipelines em produção onde IA é um componente em um sistema maior, com fallbacks, monitoramento e dados reais fluindo.", en: "Not chatbots — production pipelines where AI is a component in a larger system, with fallbacks, monitoring, and real data flowing through.", es: "No chatbots — pipelines en producción donde IA es un componente en un sistema mayor, con fallbacks, monitoreo y datos reales fluyendo.", jp: "チャットボットではなく — AIがより大きなシステムの一部として機能する本番パイプライン。フォールバック、モニタリング、実データの流れを伴う。" })}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-md border border-border p-4">
              <h3 className="text-sm font-medium mb-2">{t(locale, { pt: "Agente IA no WhatsApp", en: "WhatsApp AI Agent", es: "Agente IA en WhatsApp", jp: "WhatsApp上のAIエージェント" })}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t(locale, { pt: "Agente com LLM para atendimento, recomendação de produtos e finalização de vendas. Mensagens processadas de forma assíncrona, dados registrados no PostgreSQL. Fallback para matching por regras quando LLM está indisponível.", en: "LLM-powered agent handling customer service, product recommendations and sales completion. Messages processed async, data registered back into PostgreSQL. Fallback to rule-based matching when LLM is unavailable.", es: "Agente con LLM para atención, recomendación de productos y cierre de ventas. Mensajes procesados de forma asíncrona, datos registrados en PostgreSQL. Fallback a matching por reglas cuando LLM no está disponible.", jp: "顧客対応、商品推薦、販売完了のためのLLMエージェント。メッセージは非同期で処理され、データはPostgreSQLに保存。LLMが利用できない場合はルールベースのマッチングにフォールバック。" })}
              </p>
            </div>
            <div className="rounded-md border border-border p-4">
              <h3 className="text-sm font-medium mb-2">{t(locale, { pt: "Pipeline RAG (LangChain + pgVector)", en: "RAG Pipeline (LangChain + pgVector)", es: "Pipeline RAG (LangChain + pgVector)", jp: "RAGパイプライン（LangChain + pgVector）" })}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t(locale, { pt: "Ingestão de documentos → chunking → geração de embeddings → armazenamento vetorial no PostgreSQL com pgVector → busca semântica com top-K como contexto para LLM.", en: "Document ingestion → chunk splitting → embedding generation → vector storage in PostgreSQL with pgVector → semantic search with top-K retrieval as LLM context.", es: "Ingestión de documentos → chunking → generación de embeddings → almacenamiento vectorial en PostgreSQL con pgVector → búsqueda semántica con top-K como contexto para LLM.", jp: "ドキュメント取り込み → チャンキング → 埋め込み生成 → pgVectorによるPostgreSQLへのベクトル保存 → top-Kの意味検索結果をLLMのコンテキストとして使用。" })}
              </p>
              <Link href={localePath(locale, "/posts/rag-langchain-postgres-fullcycle")} className="text-xs text-primary hover:underline mt-2 inline-block">
                {t(locale, { pt: "Ler implementação completa →", en: "Read full implementation →", es: "Leer implementación completa →", jp: "実装の詳細を読む →" })}
              </Link>
            </div>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* FAQ */}
      <FadeIn delay={400}>
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-xl font-semibold">{t(locale, { pt: "Perguntas frequentes", en: "Frequently Asked Questions", es: "Preguntas frecuentes", jp: "よくある質問" })}</h2>
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
      </FadeIn>

      {/* Deep dives */}
      <FadeIn delay={500}>
      <section>
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-xl font-semibold">{t(locale, { pt: "Aprofundamentos", en: "Deep Dives", es: "Profundizaciones", jp: "詳細" })}</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { title: t(locale, { pt: "Circuit Breaker em Node.js", en: "Circuit Breaker in Node.js", es: "Circuit Breaker en Node.js", jp: "Node.jsのサーキットブレーカー" }), desc: t(locale, { pt: "State machine, fallbacks, retry e monitoramento", en: "State machine, fallbacks, retry and monitoring", es: "State machine, fallbacks, retry y monitoreo", jp: "ステートマシン、フォールバック、リトライ、モニタリング" }), href: "/posts/circuit-breaker-nodejs" },
            { title: t(locale, { pt: "Arquitetura de Webhooks para Pagamentos", en: "Webhook Architecture for Payments", es: "Arquitectura de Webhooks para Pagos", jp: "決済向けWebhookアーキテクチャ" }), desc: t(locale, { pt: "Idempotência, reconciliação, fluxos PIX", en: "Idempotency, reconciliation, PIX flows", es: "Idempotencia, reconciliación, flujos PIX", jp: "冪等性、照合、PIXフロー" }), href: "/posts/webhook-architecture-payment-providers" },
            { title: t(locale, { pt: "Arquitetura Multi-tenant", en: "Multi-tenant Architecture", es: "Arquitectura Multi-tenant", jp: "マルチテナントアーキテクチャ" }), desc: t(locale, { pt: "Banco compartilhado, RLS, particionamento", en: "Shared DB, RLS, partitioning", es: "Base compartida, RLS, particionamiento", jp: "共有DB、RLS、パーティショニング" }), href: "/posts/multi-tenant-architecture-postgresql" },
            { title: t(locale, { pt: "RAG com LangChain", en: "RAG with LangChain", es: "RAG con LangChain", jp: "LangChainによるRAG" }), desc: t(locale, { pt: "Embeddings, pgVector, busca semântica", en: "Embeddings, pgVector, semantic search", es: "Embeddings, pgVector, búsqueda semántica", jp: "埋め込み、pgVector、意味検索" }), href: "/posts/rag-langchain-postgres-fullcycle" },
            { title: t(locale, { pt: "Design Systems em escala", en: "Design Systems at Scale", es: "Design Systems a escala", jp: "スケールするデザインシステム" }), desc: t(locale, { pt: "Shadcn UI, tokens, contratos de componentes", en: "Shadcn UI, tokens, component contracts", es: "Shadcn UI, tokens, contratos de componentes", jp: "Shadcn UI、デザイントークン、コンポーネント契約" }), href: "/posts/design-system-shadcn-tailwind" },
          ].map((post) => (
            <Link key={post.href} href={localePath(locale, post.href)} className="group rounded-lg border border-border bg-card p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
              <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{post.desc}</p>
            </Link>
          ))}
        </div>
      </section>
      </FadeIn>
    </div>
  )
}
