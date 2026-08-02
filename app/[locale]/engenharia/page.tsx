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
    title: t(locale, { pt: "Engenharia", en: "Engineering", es: "Ingeniería", jp: "エンジニアリング", fr: "Ingénierie" }),
    description: t(locale, { pt: "Arquitetura de sistemas, decisões técnicas e problemas reais resolvidos em produção.", en: "Architecture decisions, trade-offs, and real problems solved in production.", es: "Decisiones de arquitectura, trade-offs y problemas reales resueltos en producción.", jp: "システムアーキテクチャ、技術的判断、本番環境で解決した実際の問題。", fr: "Architecture de systèmes, décisions techniques et problèmes réels résolus en production." }),
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
        { q: "What is cursor-based pagination and when should you use it?", a: "Instead of OFFSET/LIMIT, each page is fetched from a cursor — a stable pointer to the last loaded record (e.g., created_at + id). This keeps read cost constant on large lists and prevents duplicated or skipped items when new records arrive mid-navigation. It's the right choice for feeds and inboxes; the trade-off is losing direct jumps to an arbitrary page." },
        { q: "What is multi-tenant architecture?", a: "A design pattern where multiple organizations share the same application and database, but each tenant's data is isolated. The most common approach in modern SaaS is shared database with tenant_id column and PostgreSQL Row Level Security (RLS) as a safety net." },
        { q: "How to handle payment webhooks reliably?", a: "Use a layered approach: validate signatures on every event, enforce idempotency with stored event IDs, ack immediately and process in background, validate state transitions with a state machine, run periodic reconciliation jobs, and route failed events to a dead letter queue." },
        { q: "How to integrate AI into production systems?", a: "Treat AI as a system component, not a standalone feature. Process messages asynchronously, register data back into your database, implement fallbacks for when the LLM is unavailable, and monitor response quality. The key is reliability — the system must work even when the AI provider has issues." },
        { q: "What is the circuit breaker pattern?", a: "A resilience pattern for third-party API integrations. When an external API starts failing, the circuit breaker 'opens' and returns fallback responses instead of cascading the failure through your system. After a cooldown period, it allows test requests to check if the service recovered." },
      ]
    : locale === "es"
    ? [
        { q: "¿Qué es la paginación cursor-based y cuándo usarla?", a: "En lugar de OFFSET/LIMIT, cada página se busca a partir de un cursor — un puntero estable al último registro cargado (ej.: created_at + id). Esto mantiene el costo de lectura constante en listas grandes y evita ítems duplicados o saltados cuando llegan nuevos registros durante la navegación. Es la elección correcta para feeds e inboxes; el trade-off es perder el salto directo a una página arbitraria." },
        { q: "¿Qué es la arquitectura multi-tenant?", a: "Un patrón de diseño donde múltiples organizaciones comparten la misma aplicación y base de datos, pero los datos de cada tenant están aislados. El enfoque más común en SaaS moderno es base de datos compartida con columna tenant_id y Row Level Security (RLS) de PostgreSQL como red de seguridad." },
        { q: "¿Cómo manejar webhooks de pago de forma confiable?", a: "Use un enfoque en capas: valide firmas en cada evento, garantice idempotencia con IDs de eventos almacenados, responda inmediatamente y procese en background, valide transiciones de estado con state machine, ejecute jobs de reconciliación periódicos y dirija eventos fallidos a una dead letter queue." },
        { q: "¿Cómo integrar IA en sistemas de producción?", a: "Trate la IA como un componente del sistema, no una feature aislada. Procese mensajes de forma asíncrona, registre datos de vuelta en la base de datos, implemente fallbacks para cuando el LLM no esté disponible y monitoree la calidad de las respuestas. El punto central es confiabilidad — el sistema debe funcionar incluso cuando el proveedor de IA tiene problemas." },
        { q: "¿Qué es el patrón circuit breaker?", a: "Un patrón de resiliencia para integraciones con APIs de terceros. Cuando una API externa empieza a fallar, el circuit breaker se 'abre' y retorna respuestas fallback en lugar de propagar la falla por el sistema. Después de un período de cooldown, permite solicitudes de prueba para verificar si el servicio se recuperó." },
      ]
    : locale === "jp"
    ? [
        { q: "カーソルベースのページネーションとは何ですか？いつ使うべきですか？", a: "OFFSET/LIMITの代わりに、各ページはカーソル — 最後に読み込んだレコードへの安定したポインタ（例：created_at + id）— から取得します。大きなリストでも読み取りコストが一定に保たれ、ナビゲーション中に新しいレコードが追加されても項目の重複や抜けを防げます。フィードやインボックスに最適な選択です。トレードオフは任意のページへ直接ジャンプできなくなることです。" },
        { q: "マルチテナントアーキテクチャとは何ですか？", a: "複数の組織が同じアプリケーションとデータベースを共有しながら、各テナントのデータは分離される設計パターンです。最近のSaaSで最も一般的なアプローチは、tenant_id カラムを持つ共有データベースと、セーフティネットとしての PostgreSQL の Row Level Security（RLS）です。" },
        { q: "決済Webhookを信頼性高く処理するには？", a: "多層的なアプローチを使います：すべてのイベントで署名を検証し、保存したイベントIDで冪等性を担保し、即座にackを返してバックグラウンドで処理し、ステートマシンで状態遷移を検証し、定期的な照合ジョブを実行し、失敗したイベントはデッドレターキューへ振り分けます。" },
        { q: "本番システムにAIを統合するには？", a: "AIを単独の機能ではなく、システムの一部として扱います。メッセージを非同期で処理し、データをデータベースへ書き戻し、LLMが利用できないときのフォールバックを実装し、応答品質を監視します。要点は信頼性です — AIプロバイダーに問題があってもシステムは動作し続けなければなりません。" },
        { q: "サーキットブレーカーパターンとは何ですか？", a: "サードパーティAPI連携のためのレジリエンスパターンです。外部APIが失敗し始めると、サーキットブレーカーが「開き」、障害をシステム全体に波及させる代わりにフォールバック応答を返します。クールダウン期間の後、サービスが回復したかを確認するためのテストリクエストを許可します。" },
      ]
    : locale === "fr"
    ? [
        { q: "Qu'est-ce que la pagination cursor-based et quand l'utiliser ?", a: "Au lieu d'OFFSET/LIMIT, chaque page est récupérée à partir d'un cursor — un pointeur stable vers le dernier enregistrement chargé (ex. : created_at + id). Cela maintient le coût de lecture constant sur les grandes listes et évite les éléments dupliqués ou sautés quand de nouveaux enregistrements arrivent pendant la navigation. C'est le bon choix pour les feeds et les inboxes ; le trade-off est de perdre le saut direct vers une page arbitraire." },
        { q: "Qu'est-ce que l'architecture multi-tenant ?", a: "Un design pattern où plusieurs organisations partagent la même application et la même base de données, mais où les données de chaque tenant sont isolées. L'approche la plus courante dans le SaaS moderne est une base partagée avec une colonne tenant_id et le Row Level Security (RLS) de PostgreSQL comme filet de sécurité." },
        { q: "Comment traiter les webhooks de paiement de façon fiable ?", a: "Utilisez une approche en couches : validez les signatures sur chaque événement, garantissez l'idempotence avec des IDs d'événements stockés, répondez immédiatement et traitez en background, validez les transitions d'état avec une state machine, exécutez des jobs de réconciliation périodiques et dirigez les événements en échec vers une dead letter queue." },
        { q: "Comment intégrer l'IA dans des systèmes de production ?", a: "Considérez l'IA comme un composant du système, pas comme une feature isolée. Traitez les messages de façon asynchrone, réécrivez les données dans la base, implémentez des fallbacks au cas où le LLM serait indisponible et surveillez la qualité des réponses. Le point central est la fiabilité — le système doit fonctionner même quand le fournisseur d'IA a des problèmes." },
        { q: "Qu'est-ce que le pattern circuit breaker ?", a: "Un pattern de résilience pour les intégrations avec des APIs tierces. Quand une API externe commence à échouer, le circuit breaker « s'ouvre » et renvoie des réponses fallback au lieu de propager la panne à travers le système. Après une période de cooldown, il autorise des requêtes de test pour vérifier si le service est rétabli." },
      ]
    : [
        { q: "O que é paginação cursor-based e quando usar?", a: "Em vez de OFFSET/LIMIT, cada página é buscada a partir de um cursor — um ponteiro estável para o último registro carregado (ex.: created_at + id). Isso mantém o custo de leitura constante em listas grandes e evita itens duplicados ou pulados quando novos registros chegam durante a navegação. É a escolha certa para feeds e inboxes; o trade-off é perder o salto direto para uma página arbitrária." },
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
          name: t(locale, { pt: "Engenharia", en: "Engineering", es: "Ingeniería", jp: "エンジニアリング", fr: "Ingénierie" }),
          description: t(locale, { pt: "Arquitetura de sistemas, decisões técnicas e problemas reais resolvidos em produção.", en: "Architecture decisions, trade-offs, and real problems solved in production.", es: "Decisiones de arquitectura, trade-offs y problemas reales resueltos en producción.", jp: "システムアーキテクチャ、技術的判断、本番環境で解決した実際の問題。", fr: "Architecture de systèmes, décisions techniques et problèmes réels résolus en production." }),
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
          {t(locale, { pt: "Engenharia", en: "Engineering", es: "Ingeniería", jp: "エンジニアリング", fr: "Ingénierie" })}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          {t(locale, { pt: "Sistemas que projetei e operei em produção — decisões de arquitetura, trade-offs e restrições reais.", en: "Systems I've designed and operated in production — architecture decisions, trade-offs, and real constraints.", es: "Sistemas que diseñé y operé en producción — decisiones de arquitectura, trade-offs y restricciones reales.", jp: "本番環境で設計・運用したシステム — アーキテクチャ判断、トレードオフ、実際の制約。", fr: "Des systèmes que j'ai conçus et exploités en production — décisions d'architecture, trade-offs et contraintes réelles." })}
        </p>
      </header>
      </FadeIn>

      {/* Expandable topics */}
      <FadeIn delay={100}>
      <section className="space-y-3 mb-12">
        <EngineeringTopic
          id="frontend-performance"
          defaultOpen={topic === "frontend-performance"}
          title={t(locale, { pt: "Performance de Frontend — Inbox em escala", en: "Frontend Performance — Inbox at Scale", es: "Performance de Frontend — Inbox a escala", jp: "フロントエンドパフォーマンス — スケールするインボックス", fr: "Performance Frontend — Inbox à grande échelle" })}
          subtitle={t(locale, { pt: "Paginação cursor-based + virtualização — payload de 6,7 MB para 19 KB (~400x)", en: "Cursor-based pagination + virtualization — payload from 6.7 MB to 19 KB (~400x)", es: "Paginación cursor-based + virtualización — payload de 6,7 MB a 19 KB (~400x)", jp: "カーソルベースのページネーション + 仮想化 — ペイロードを6.7MBから19KBへ（約1/400）", fr: "Pagination cursor-based + virtualisation — payload de 6,7 MB à 19 KB (~400x)" })}
        >
          <div className="space-y-5">
            <p className="text-sm leading-relaxed">
              {t(locale, { pt: "Reconstruí o inbox principal de uma plataforma de outreach com IA usada por 100+ empresas. Workspaces acumulam ~20.000 registros, e o fetch inicial carregava tudo de uma vez: payload de ~6,7 MB, travamentos de interface e carregamentos de vários segundos.", en: "I rebuilt the main inbox of an AI outreach platform used by 100+ companies. Workspaces accumulate ~20,000 records, and the initial fetch loaded everything at once: a ~6.7 MB payload, UI freezes and multi-second loads.", es: "Reconstruí el inbox principal de una plataforma de outreach con IA usada por 100+ empresas. Los workspaces acumulan ~20.000 registros, y el fetch inicial cargaba todo de una vez: payload de ~6,7 MB, bloqueos de interfaz y cargas de varios segundos.", jp: "100社以上が利用するAIアウトリーチプラットフォームのメインインボックスを再構築しました。ワークスペースには約20,000件のレコードが蓄積され、初期フェッチはすべてを一度に読み込んでいました：約6.7MBのペイロード、UIのフリーズ、数秒かかる読み込み。", fr: "J'ai reconstruit l'inbox principal d'une plateforme d'outreach avec IA utilisée par 100+ entreprises. Les workspaces accumulent ~20 000 enregistrements, et le fetch initial chargeait tout d'un coup : payload de ~6,7 MB, blocages de l'interface et chargements de plusieurs secondes." })}
            </p>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                {t(locale, { pt: "Decisões-chave", en: "Key Decisions", es: "Decisiones clave", jp: "重要な判断", fr: "Décisions clés" })}
              </h4>
              <ul className="text-sm space-y-1.5">
                <li className="flex items-start gap-2"><span className="text-muted-foreground mt-0.5">-</span>{t(locale, { pt: "Paginação cursor-based em vez de offset — custo de leitura constante e sem itens duplicados ou pulados quando novas conversas chegam", en: "Cursor-based pagination instead of offset — constant read cost and no duplicated or skipped items when new conversations arrive", es: "Paginación cursor-based en lugar de offset — costo de lectura constante y sin ítems duplicados o saltados cuando llegan nuevas conversaciones", jp: "オフセットではなくカーソルベースのページネーション — 読み取りコストが一定で、新しい会話が届いても項目の重複や抜けが発生しない", fr: "Pagination cursor-based au lieu d'offset — coût de lecture constant et aucun élément dupliqué ou sauté quand de nouvelles conversations arrivent" })}</li>
                <li className="flex items-start gap-2"><span className="text-muted-foreground mt-0.5">-</span>{t(locale, { pt: "Virtualização de lista — só as linhas visíveis são renderizadas, mantendo o DOM pequeno mesmo com milhares de registros", en: "List virtualization — only visible rows are rendered, keeping the DOM small even with thousands of records", es: "Virtualización de lista — solo se renderizan las filas visibles, manteniendo el DOM pequeño incluso con miles de registros", jp: "リスト仮想化 — 表示中の行だけをレンダリングし、数千件でもDOMを小さく保つ", fr: "Virtualisation de liste — seules les lignes visibles sont rendues, ce qui garde le DOM petit même avec des milliers d'enregistrements" })}</li>
                <li className="flex items-start gap-2"><span className="text-muted-foreground mt-0.5">-</span>{t(locale, { pt: "Resultado: payload inicial de ~6,7 MB para ~19 KB (~400x), eliminando travamentos de interface", en: "Result: initial payload from ~6.7 MB to ~19 KB (~400x), eliminating UI freezes", es: "Resultado: payload inicial de ~6,7 MB a ~19 KB (~400x), eliminando bloqueos de interfaz", jp: "結果：初期ペイロードを約6.7MBから約19KBへ（約1/400）削減し、UIフリーズを解消", fr: "Résultat : payload initial de ~6,7 MB à ~19 KB (~400x), éliminant les blocages de l'interface" })}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Stack</h4>
              <div className="flex flex-wrap gap-1.5">
                {["React", "Next.js", "TypeScript"].map((tech) => (
                  <span key={tech} className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-xs">{tech}</span>
                ))}
              </div>
            </div>
            <div className="rounded-md border border-border bg-muted/20 p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Trade-off</h4>
              <p className="text-sm leading-relaxed">
                {t(locale, { pt: "Cursor-based abre mão do salto direto para uma página arbitrária — aceitável para um inbox, que é navegado como um fluxo cronológico, não como uma tabela paginada. A virtualização adicionou complexidade (medição de alturas, scroll restoration), mas era a única forma de manter a interface fluida: paginação sozinha reduz o payload, e não o custo de renderizar milhares de linhas acumuladas no DOM.", en: "Cursor-based gives up direct jumps to an arbitrary page — acceptable for an inbox, which is navigated as a chronological stream, not a paginated table. Virtualization added complexity (height measurement, scroll restoration), but it was the only way to keep the interface fluid: pagination alone reduces the payload, not the cost of rendering thousands of accumulated rows in the DOM.", es: "Cursor-based renuncia al salto directo a una página arbitraria — aceptable para un inbox, que se navega como un flujo cronológico, no como una tabla paginada. La virtualización agregó complejidad (medición de alturas, scroll restoration), pero era la única forma de mantener la interfaz fluida: la paginación sola reduce el payload, no el costo de renderizar miles de filas acumuladas en el DOM.", jp: "カーソルベースでは任意のページへの直接ジャンプができなくなります — インボックスはページ番号付きのテーブルではなく時系列のストリームとして閲覧されるため、許容できるトレードオフです。仮想化は複雑さ（高さの計測、スクロール位置の復元）を増やしましたが、インターフェースを滑らかに保つ唯一の方法でした：ページネーションだけではペイロードは減っても、DOMに蓄積された数千行のレンダリングコストは減らないためです。", fr: "Le cursor-based renonce au saut direct vers une page arbitraire — acceptable pour un inbox, qui se parcourt comme un flux chronologique et non comme un tableau paginé. La virtualisation a ajouté de la complexité (mesure des hauteurs, scroll restoration), mais c'était la seule façon de garder l'interface fluide : la pagination seule réduit le payload, pas le coût de rendu de milliers de lignes accumulées dans le DOM." })}
              </p>
            </div>
            <Link href={localePath(locale, "/posts/inbox-cursor-pagination-virtualization")} className="text-sm text-primary hover:underline inline-block">
              {t(locale, { pt: "Ler implementação completa →", en: "Read full implementation →", es: "Leer implementación completa →", jp: "実装の詳細を読む →", fr: "Lire l'implémentation complète →" })}
            </Link>
          </div>
        </EngineeringTopic>

        <EngineeringTopic
          id="saas-architecture"
          defaultOpen={topic === "saas-architecture"}
          title={t(locale, { pt: "Arquitetura SaaS — Plataforma Vertical", en: "SaaS Architecture — Vertical Platform", es: "Arquitectura SaaS — Plataforma Vertical", jp: "SaaSアーキテクチャ — バーティカルプラットフォーム", fr: "Architecture SaaS — Plateforme verticale" })}
          subtitle={t(locale, { pt: "Plataforma multi-módulo: agenda, vendas, financeiro, IA no WhatsApp", en: "Multi-module platform: scheduling, sales, finance, WhatsApp AI", es: "Plataforma multi-módulo: agenda, ventas, financiero, IA en WhatsApp", jp: "マルチモジュールプラットフォーム：予約、販売、財務、WhatsApp上のAI", fr: "Plateforme multi-module : agenda, ventes, finances, IA sur WhatsApp" })}
        >
          <div className="space-y-5">
            <p className="text-sm leading-relaxed">
              {t(locale, { pt: "Plataforma SaaS multi-módulo para pequenos negócios em um vertical específico. Projetei o sistema para lidar com agenda, vendas, financeiro, comissões e automações via WhatsApp — tudo operando como um único produto com dados compartilhados.", en: "Multi-module SaaS platform serving small businesses in a specific vertical. I designed the system to handle scheduling, sales, finance, commissions, and WhatsApp automations — all operating as a single product with shared data.", es: "Plataforma SaaS multi-módulo para pequeños negocios en un vertical específico. Diseñé el sistema para manejar agenda, ventas, financiero, comisiones y automatizaciones vía WhatsApp — todo operando como un único producto con datos compartidos.", jp: "特定バーティカル向けの中小企業を対象としたマルチモジュールSaaSプラットフォーム。予約、販売、財務、手数料、WhatsApp自動化を扱うシステムを設計 — すべてが共有データを持つ単一プロダクトとして稼働。", fr: "Plateforme SaaS multi-module pour les petites entreprises d'un vertical spécifique. J'ai conçu le système pour gérer l'agenda, les ventes, les finances, les commissions et les automatisations via WhatsApp — le tout fonctionnant comme un produit unique avec des données partagées." })}
            </p>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                {t(locale, { pt: "Decisões-chave", en: "Key Decisions", es: "Decisiones clave", jp: "重要な判断", fr: "Décisions clés" })}
              </h4>
              <ul className="text-sm space-y-1.5">
                <li className="flex items-start gap-2"><span className="text-muted-foreground mt-0.5">-</span>{t(locale, { pt: "Arquitetura orientada a eventos para pipeline WhatsApp → LLM → PostgreSQL", en: "Event-driven architecture for WhatsApp → LLM → PostgreSQL pipeline", es: "Arquitectura orientada a eventos para pipeline WhatsApp → LLM → PostgreSQL", jp: "WhatsApp → LLM → PostgreSQLパイプラインのためのイベント駆動アーキテクチャ", fr: "Architecture orientée événements pour le pipeline WhatsApp → LLM → PostgreSQL" })}</li>
                <li className="flex items-start gap-2"><span className="text-muted-foreground mt-0.5">-</span>{t(locale, { pt: "Transações atômicas para manter vendas, comissões e pagamentos sempre sincronizados", en: "Atomic transactions to keep sales, commissions and payments always in sync", es: "Transacciones atómicas para mantener ventas, comisiones y pagos siempre sincronizados", jp: "販売、手数料、決済を常に同期させるためのアトミックトランザクション", fr: "Transactions atomiques pour garder ventes, commissions et paiements toujours synchronisés" })}</li>
                <li className="flex items-start gap-2"><span className="text-muted-foreground mt-0.5">-</span>{t(locale, { pt: "Integração de IA no WhatsApp para atendimento automatizado e recomendação de produtos", en: "AI integration in WhatsApp for automated support and product recommendations", es: "Integración de IA en WhatsApp para atención automatizada y recomendación de productos", jp: "WhatsAppへのAI統合による自動応対と商品推薦", fr: "Intégration d'IA sur WhatsApp pour le service client automatisé et la recommandation de produits" })}</li>
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
                {t(locale, { pt: "Os fluxos de IA no WhatsApp precisavam ser confiáveis o suficiente para fechar vendas automaticamente. A escolha era entre processamento síncrono (mais simples, mas bloqueia na latência do LLM) vs. fila de eventos assíncrona. Optamos pelo assíncrono — o usuário recebe um ack imediato e a resposta da IA é processada em background com lógica de retry. Isso adicionou complexidade mas eliminou mensagens perdidas durante picos do provedor.", en: "WhatsApp AI flows needed to be reliable enough to close sales automatically. The choice was between synchronous processing (simpler, but blocks on LLM latency) vs. async event queue. We went with async — the user gets an immediate ack, and the AI response is processed in background with retry logic. This added complexity but eliminated dropped messages during provider spikes.", es: "Los flujos de IA en WhatsApp necesitaban ser confiables para cerrar ventas automáticamente. La elección era entre procesamiento síncrono (más simple, pero bloquea en la latencia del LLM) vs. cola de eventos asíncrona. Optamos por el asíncrono — el usuario recibe un ack inmediato y la respuesta de la IA se procesa en background con lógica de retry. Esto agregó complejidad pero eliminó mensajes perdidos durante picos del proveedor.", jp: "WhatsAppのAIフローは、販売を自動完了できるほど信頼性が必要でした。選択肢は同期処理（シンプルだがLLMレイテンシでブロックする）と非同期イベントキューでした。非同期を選択 — ユーザーは即座にackを受け取り、AIの応答はリトライロジックを伴ってバックグラウンドで処理されます。複雑さは増しましたが、プロバイダーのピーク時にメッセージが失われる問題はなくなりました。", fr: "Les flux d'IA sur WhatsApp devaient être assez fiables pour conclure des ventes automatiquement. Le choix se faisait entre un traitement synchrone (plus simple, mais qui bloque sur la latence du LLM) et une file d'événements asynchrone. Nous avons opté pour l'asynchrone — l'utilisateur reçoit un ack immédiat et la réponse de l'IA est traitée en background avec une logique de retry. Cela a ajouté de la complexité mais a éliminé les messages perdus pendant les pics du fournisseur." })}
              </p>
            </div>
          </div>
        </EngineeringTopic>

        <EngineeringTopic
          id="multi-tenant"
          defaultOpen={topic === "multi-tenant"}
          title={t(locale, { pt: "Isolamento de dados Multi-tenant", en: "Multi-tenant Data Isolation", es: "Aislamiento de datos Multi-tenant", jp: "マルチテナントのデータ分離", fr: "Isolation des données Multi-tenant" })}
          subtitle={t(locale, { pt: "Banco compartilhado + tenant_id + RLS — avaliou 3 estratégias, escolheu simplicidade", en: "Shared DB + tenant_id + RLS — evaluated 3 strategies, chose simplicity", es: "Base compartida + tenant_id + RLS — evaluó 3 estrategias, eligió simplicidad", jp: "共有DB + tenant_id + RLS — 3つの戦略を比較し、シンプルさを選択", fr: "Base partagée + tenant_id + RLS — 3 stratégies évaluées, simplicité retenue" })}
        >
          <div className="space-y-5">
            <p className="text-sm leading-relaxed">
              {t(locale, { pt: "Para produtos SaaS que atendem múltiplos negócios, o isolamento de tenants é uma decisão arquitetural central. Avaliei três estratégias e implementei a abordagem de banco compartilhado com defesa em profundidade.", en: "For SaaS products serving multiple businesses, tenant isolation is a core architectural decision. I evaluated three strategies and implemented the shared database approach with defense-in-depth.", es: "Para productos SaaS que atienden múltiples negocios, el aislamiento de tenants es una decisión arquitectural central. Evalué tres estrategias e implementé el enfoque de base compartida con defensa en profundidad.", jp: "複数の企業にサービスを提供するSaaSプロダクトでは、テナント分離は中心的なアーキテクチャ判断です。3つの戦略を評価し、多層防御を伴う共有DBアプローチを実装しました。", fr: "Pour les produits SaaS qui servent plusieurs entreprises, l'isolation des tenants est une décision d'architecture centrale. J'ai évalué trois stratégies et implémenté l'approche base partagée avec défense en profondeur." })}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { title: t(locale, { pt: "DB por tenant", en: "DB per tenant", es: "DB por tenant", jp: "テナント単位のDB", fr: "DB par tenant" }), desc: t(locale, { pt: "Máximo isolamento, alto custo operacional", en: "Max isolation, high operational cost", es: "Máximo aislamiento, alto costo operacional", jp: "最大の分離、高い運用コスト", fr: "Isolation maximale, coût opérationnel élevé" }), status: t(locale, { pt: "Descartado", en: "Discarded", es: "Descartado", jp: "却下", fr: "Écarté" }), chosen: false },
                { title: t(locale, { pt: "Schema por tenant", en: "Schema per tenant", es: "Schema por tenant", jp: "テナント単位のスキーマ", fr: "Schema par tenant" }), desc: t(locale, { pt: "Bom isolamento, complexidade de migrações", en: "Good isolation, migration complexity", es: "Buen aislamiento, complejidad de migraciones", jp: "良好な分離、マイグレーションの複雑さ", fr: "Bonne isolation, complexité des migrations" }), status: t(locale, { pt: "Descartado", en: "Discarded", es: "Descartado", jp: "却下", fr: "Écarté" }), chosen: false },
                { title: t(locale, { pt: "DB compartilhado + tenant_id", en: "Shared DB + tenant_id", es: "DB compartida + tenant_id", jp: "共有DB + tenant_id", fr: "DB partagée + tenant_id" }), desc: t(locale, { pt: "Melhor custo/simplicidade, requer RLS", en: "Best cost/simplicity ratio, needs RLS", es: "Mejor costo/simplicidad, requiere RLS", jp: "コストとシンプルさのバランスが最良、RLSが必要", fr: "Meilleur rapport coût/simplicité, nécessite RLS" }), status: t(locale, { pt: "Escolhido", en: "Chosen", es: "Elegido", jp: "採用", fr: "Retenu" }), chosen: true },
              ].map((s) => (
                <div key={s.title} className="rounded-md border border-border p-3">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs font-medium">{s.title}</h4>
                    <span className={`text-[10px] font-medium rounded-full px-2 py-0.5 ${s.chosen ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-muted text-muted-foreground"}`}>{s.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">{t(locale, { pt: "Camadas de isolamento", en: "Isolation Layers", es: "Capas de aislamiento", jp: "分離のレイヤー", fr: "Couches d'isolation" })}</h4>
              <ul className="text-sm space-y-1.5">
                <li className="flex items-start gap-2"><span className="font-mono text-xs text-muted-foreground bg-muted/40 rounded px-1.5 py-0.5">1</span>{t(locale, { pt: "Camada de aplicação — todas as queries filtradas por session.tenantId automaticamente", en: "Application layer — all queries filtered by session.tenantId automatically", es: "Capa de aplicación — todas las queries filtradas por session.tenantId automáticamente", jp: "アプリケーション層 — すべてのクエリがsession.tenantIdで自動フィルタリング", fr: "Couche applicative — toutes les queries filtrées automatiquement par session.tenantId" })}</li>
                <li className="flex items-start gap-2"><span className="font-mono text-xs text-muted-foreground bg-muted/40 rounded px-1.5 py-0.5">2</span>{t(locale, { pt: "Camada de banco — Row Level Security (RLS) do PostgreSQL como rede de segurança", en: "Database layer — PostgreSQL Row Level Security (RLS) as safety net", es: "Capa de base de datos — Row Level Security (RLS) de PostgreSQL como red de seguridad", jp: "DB層 — PostgreSQLのRow Level Security（RLS）をセーフティネットとして利用", fr: "Couche base de données — Row Level Security (RLS) de PostgreSQL comme filet de sécurité" })}</li>
                <li className="flex items-start gap-2"><span className="font-mono text-xs text-muted-foreground bg-muted/40 rounded px-1.5 py-0.5">3</span>{t(locale, { pt: "Performance — índices compostos em (tenant_id, ...) + particionamento de tabelas para tenants grandes", en: "Performance — composite indexes on (tenant_id, ...) + table partitioning for large tenants", es: "Performance — índices compuestos en (tenant_id, ...) + particionamiento de tablas para tenants grandes", jp: "パフォーマンス — (tenant_id, ...) の複合インデックス + 大規模テナント向けのテーブルパーティショニング", fr: "Performance — index composites sur (tenant_id, ...) + partitionnement de tables pour les gros tenants" })}</li>
              </ul>
            </div>
            <Link href={localePath(locale, "/posts/multi-tenant-architecture-postgresql")} className="text-sm text-primary hover:underline inline-block">
              {t(locale, { pt: "Ler implementação completa →", en: "Read full implementation →", es: "Leer implementación completa →", jp: "実装の詳細を読む →", fr: "Lire l'implémentation complète →" })}
            </Link>
          </div>
        </EngineeringTopic>

        <EngineeringTopic
          id="payments"
          defaultOpen={topic === "payments"}
          title={t(locale, { pt: "Pagamentos e integrações externas", en: "Payments & External Integrations", es: "Pagos e integraciones externas", jp: "決済と外部連携", fr: "Paiements et intégrations externes" })}
          subtitle={t(locale, { pt: "Webhooks, idempotência, fluxos PIX em múltiplos provedores", en: "Webhooks, idempotency, PIX flows across multiple providers", es: "Webhooks, idempotencia, flujos PIX en múltiples proveedores", jp: "Webhook、冪等性、複数プロバイダーのPIXフロー", fr: "Webhooks, idempotence, flux PIX chez plusieurs fournisseurs" })}
        >
          <div className="space-y-5">
            <p className="text-sm leading-relaxed">
              {t(locale, { pt: "Integrei sistemas de pagamento em múltiplos produtos em produção — Stripe, Mercado Pago e Asaas. Cada um tem padrões de webhook, modos de falha e garantias de consistência diferentes.", en: "I've integrated payment systems across multiple production products — Stripe, Mercado Pago and Asaas. Each has different webhook patterns, failure modes, and consistency guarantees.", es: "Integré sistemas de pago en múltiples productos en producción — Stripe, Mercado Pago y Asaas. Cada uno tiene patrones de webhook, modos de falla y garantías de consistencia diferentes.", jp: "本番環境の複数プロダクトに決済システムを統合しました — Stripe、Mercado Pago、Asaas。それぞれWebhookのパターン、失敗モード、整合性保証が異なります。", fr: "J'ai intégré des systèmes de paiement dans plusieurs produits en production — Stripe, Mercado Pago et Asaas. Chacun a des patterns de webhook, des modes de défaillance et des garanties de cohérence qui lui sont propres." })}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-md border border-border p-4">
                <h4 className="text-sm font-medium mb-2">{t(locale, { pt: "Arquitetura de Webhooks", en: "Webhook Architecture", es: "Arquitectura de Webhooks", jp: "Webhookアーキテクチャ", fr: "Architecture de Webhooks" })}</h4>
                <ul className="text-xs space-y-1.5 text-muted-foreground">
                  <li>- {t(locale, { pt: "Validação de assinatura em cada evento recebido", en: "Signature validation on every incoming event", es: "Validación de firma en cada evento recibido", jp: "受信した各イベントの署名検証", fr: "Validation de signature sur chaque événement reçu" })}</li>
                  <li>- {t(locale, { pt: "Chaves de idempotência para evitar processamento duplicado", en: "Idempotency keys to prevent duplicate processing", es: "Claves de idempotencia para evitar procesamiento duplicado", jp: "重複処理を防ぐための冪等性キー", fr: "Clés d'idempotence pour éviter le traitement en double" })}</li>
                  <li>- {t(locale, { pt: "Processamento assíncrono — ack imediato, processa em background", en: "Async processing — ack immediately, process in background", es: "Procesamiento asíncrono — ack inmediato, procesa en background", jp: "非同期処理 — 即座にack、バックグラウンドで処理", fr: "Traitement asynchrone — ack immédiat, traitement en background" })}</li>
                  <li>- {t(locale, { pt: "Dead letter queue para eventos com falha", en: "Dead letter queue for failed events", es: "Dead letter queue para eventos con falla", jp: "失敗したイベント用のデッドレターキュー", fr: "Dead letter queue pour les événements en échec" })}</li>
                </ul>
              </div>
              <div className="rounded-md border border-border p-4">
                <h4 className="text-sm font-medium mb-2">{t(locale, { pt: "Preocupações reais", en: "Real-world Concerns", es: "Preocupaciones reales", jp: "実際の懸念事項", fr: "Préoccupations réelles" })}</h4>
                <ul className="text-xs space-y-1.5 text-muted-foreground">
                  <li>- {t(locale, { pt: "Atrasos na confirmação de PIX variam entre provedores", en: "PIX confirmation delays vary between providers", es: "Atrasos en la confirmación de PIX varían entre proveedores", jp: "PIX確認の遅延はプロバイダー間で異なる", fr: "Les délais de confirmation PIX varient selon les fournisseurs" })}</li>
                  <li>- {t(locale, { pt: "Retries de webhook chegando fora de ordem", en: "Webhook retries arriving out of order", es: "Retries de webhook llegando fuera de orden", jp: "順不同で到着するWebhookリトライ", fr: "Retries de webhook arrivant dans le désordre" })}</li>
                  <li>- {t(locale, { pt: "Reconciliação entre estado local e estado do provedor", en: "Reconciliation between local state and provider state", es: "Reconciliación entre estado local y estado del proveedor", jp: "ローカル状態とプロバイダー状態の照合", fr: "Réconciliation entre l'état local et l'état du fournisseur" })}</li>
                  <li>- {t(locale, { pt: "Degradação graciosa quando o provedor está fora", en: "Graceful degradation when provider is down", es: "Degradación graciosa cuando el proveedor está caído", jp: "プロバイダー停止時の優雅な機能低下", fr: "Dégradation gracieuse quand le fournisseur est indisponible" })}</li>
                </ul>
              </div>
            </div>
            <Link href={localePath(locale, "/posts/webhook-architecture-payment-providers")} className="text-sm text-primary hover:underline inline-block">
              {t(locale, { pt: "Ler implementação completa →", en: "Read full implementation →", es: "Leer implementación completa →", jp: "実装の詳細を読む →", fr: "Lire l'implémentation complète →" })}
            </Link>
          </div>
        </EngineeringTopic>
      </section>
      </FadeIn>

      {/* Problems Solved */}
      <FadeIn delay={200}>
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-xl font-semibold">{t(locale, { pt: "Problemas resolvidos em produção", en: "Problems Solved in Production", es: "Problemas resueltos en producción", jp: "本番環境で解決した問題", fr: "Problèmes résolus en production" })}</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {[
              { signal: t(locale, { pt: "Performance de frontend", en: "Frontend performance", es: "Performance de frontend", jp: "フロントエンドパフォーマンス", fr: "Performance frontend" }), detail: t(locale, { pt: "Inbox de um SaaS B2B carregando ~20.000 conversas de uma vez (~6,7 MB por requisição) — paginação cursor-based + virtualização de lista, payload de ~19 KB e fim dos travamentos de interface", en: "A B2B SaaS inbox loading ~20,000 conversations at once (~6.7 MB per request) — cursor-based pagination + list virtualization, ~19 KB payload and no more UI freezes", es: "Inbox de un SaaS B2B cargando ~20.000 conversaciones de una vez (~6,7 MB por request) — paginación cursor-based + virtualización de lista, payload de ~19 KB y fin de los bloqueos de interfaz", jp: "B2B SaaSのインボックスが約20,000件の会話を一度に読み込み（リクエストあたり約6.7MB） — カーソルベースのページネーション + リスト仮想化で約19KBのペイロードにし、UIフリーズを解消", fr: "Inbox d'un SaaS B2B chargeant ~20 000 conversations d'un coup (~6,7 MB par requête) — pagination cursor-based + virtualisation de liste, payload de ~19 KB et fin des blocages de l'interface" }) },
              { signal: t(locale, { pt: "Latência de API", en: "API latency", es: "Latencia de API", jp: "APIレイテンシ", fr: "Latence d'API" }), detail: t(locale, { pt: "Timeouts de APIs de marketplaces causando falhas em cascata no checkout de uma operação de dropshipping — circuit breaker com fallbacks e monitoramento (implementação completa no blog)", en: "Marketplace API timeouts causing cascading failures in a dropshipping operation's checkout — circuit breaker with fallbacks and monitoring (full implementation on the blog)", es: "Timeouts de APIs de marketplaces causando fallas en cascada en el checkout de una operación de dropshipping — circuit breaker con fallbacks y monitoreo (implementación completa en el blog)", jp: "マーケットプレイスAPIのタイムアウトがドロップシッピング事業のチェックアウトでカスケード障害を発生 — フォールバックと監視を備えたサーキットブレーカーで解決（実装の詳細はブログに）", fr: "Timeouts d'APIs de marketplaces provoquant des défaillances en cascade dans le checkout d'une opération de dropshipping — circuit breaker avec fallbacks et monitoring (implémentation complète sur le blog)" }) },
              { signal: t(locale, { pt: "Inconsistências de marketplace", en: "Marketplace inconsistencies", es: "Inconsistencias de marketplace", jp: "マーケットプレイスの不整合", fr: "Incohérences de marketplace" }), detail: t(locale, { pt: "APIs do Mercado Livre e da Shopee retornando dados de produto inconsistentes — adapter pattern normalizando os schemas em um modelo unificado", en: "Mercado Livre and Shopee APIs returning inconsistent product data — adapter pattern normalizing both schemas into a unified model", es: "APIs de Mercado Livre y Shopee retornando datos de producto inconsistentes — adapter pattern normalizando los schemas en un modelo unificado", jp: "Mercado LivreとShopeeのAPIが不整合な商品データを返す問題 — アダプターパターンで両スキーマを統一モデルに正規化", fr: "Les APIs de Mercado Livre et de Shopee renvoyant des données produit incohérentes — adapter pattern normalisant les schemas dans un modèle unifié" }) },
              { signal: t(locale, { pt: "Migração de legado", en: "Legacy migration", es: "Migración de legado", jp: "レガシーマイグレーション", fr: "Migration du legacy" }), detail: t(locale, { pt: "Plataforma de estética com 50k+ usuários saindo de um monolito PHP 5.3 para React + Next.js sem downtime — migração incremental, tela a tela (strangler fig)", en: "An aesthetics platform with 50k+ users moving off a PHP 5.3 monolith to React + Next.js without downtime — incremental, screen-by-screen migration (strangler fig)", es: "Plataforma de estética con 50k+ usuarios saliendo de un monolito PHP 5.3 hacia React + Next.js sin downtime — migración incremental, pantalla por pantalla (strangler fig)", jp: "5万人以上が利用するエステ向けプラットフォームをPHP 5.3のモノリスからReact + Next.jsへダウンタイムなしで移行 — 画面単位の段階的移行（strangler fig）", fr: "Plateforme d'esthétique avec 50k+ utilisateurs migrant d'un monolithe PHP 5.3 vers React + Next.js sans downtime — migration incrémentale, écran par écran (strangler fig)" }) },
              { signal: t(locale, { pt: "Performance em escala", en: "Performance at scale", es: "Rendimiento a escala", jp: "スケール時のパフォーマンス", fr: "Performance à grande échelle" }), detail: t(locale, { pt: "Tempos de resposta degradando com o crescimento da base em uma plataforma de saúde web + mobile — otimização de queries, caching estratégico e chamadas paralelas", en: "Response times degrading as the user base of a web + mobile health platform grew — query optimization, strategic caching and parallel calls", es: "Tiempos de respuesta degradando con el crecimiento de la base en una plataforma de salud web + mobile — optimización de queries, caching estratégico y llamadas paralelas", jp: "Web + モバイルのヘルスケアプラットフォームでユーザー増加に伴い応答時間が劣化 — クエリ最適化、戦略的キャッシング、並列呼び出しで解決", fr: "Temps de réponse qui se dégradaient avec la croissance de la base d'utilisateurs sur une plateforme de santé web + mobile — optimisation de queries, caching stratégique et appels parallèles" }) },
              { signal: t(locale, { pt: "UX cross-platform", en: "Cross-platform UX", es: "UX cross-platform", jp: "クロスプラットフォームUX", fr: "UX cross-platform" }), detail: t(locale, { pt: "Manter UX consistente entre React (web) e React Native (mobile) no mesmo produto — design tokens e contratos de componentes compartilhados", en: "Keeping UX consistent between React (web) and React Native (mobile) in the same product — shared design tokens and component contracts", es: "Mantener UX consistente entre React (web) y React Native (mobile) en el mismo producto — design tokens y contratos de componentes compartidos", jp: "同一プロダクト内でReact（Web）とReact Native（モバイル）のUXを一貫させる — デザイントークンとコンポーネント契約を共有", fr: "Garder une UX cohérente entre React (web) et React Native (mobile) dans le même produit — design tokens et contrats de composants partagés" }) },
              { signal: t(locale, { pt: "Consistência de dados", en: "Data consistency", es: "Consistencia de datos", jp: "データの一貫性", fr: "Cohérence des données" }), detail: t(locale, { pt: "Módulos financeiros de um SaaS para pet shops (vendas + comissões + pagamentos) perdendo sincronia — transações atômicas com advisory locks do PostgreSQL", en: "Financial modules of a pet shop SaaS (sales + commissions + payments) drifting out of sync — atomic transactions with PostgreSQL advisory locks", es: "Módulos financieros de un SaaS para pet shops (ventas + comisiones + pagos) perdiendo sincronía — transacciones atómicas con advisory locks de PostgreSQL", jp: "ペットショップ向けSaaSの財務モジュール（販売 + 手数料 + 決済）の同期ずれ — PostgreSQLのアドバイザリロックによるアトミックトランザクションで解決", fr: "Modules financiers d'un SaaS pour pet shops (ventes + commissions + paiements) qui se désynchronisaient — transactions atomiques avec les advisory locks de PostgreSQL" }) },
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
          <h2 className="text-xl font-semibold">{t(locale, { pt: "Sistemas de IA em produção", en: "AI Systems in Production", es: "Sistemas de IA en producción", jp: "本番環境のAIシステム", fr: "Systèmes d'IA en production" })}</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="rounded-lg border border-border bg-card p-6 space-y-5">
          <p className="text-sm leading-relaxed">
            {t(locale, { pt: "Não chatbots — pipelines em produção onde IA é um componente em um sistema maior, com fallbacks, monitoramento e dados reais fluindo.", en: "Not chatbots — production pipelines where AI is a component in a larger system, with fallbacks, monitoring, and real data flowing through.", es: "No chatbots — pipelines en producción donde IA es un componente en un sistema mayor, con fallbacks, monitoreo y datos reales fluyendo.", jp: "チャットボットではなく — AIがより大きなシステムの一部として機能する本番パイプライン。フォールバック、モニタリング、実データの流れを伴う。", fr: "Pas de chatbots — des pipelines en production où l'IA est un composant d'un système plus large, avec fallbacks, monitoring et de vraies données qui circulent." })}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-md border border-border p-4">
              <h3 className="text-sm font-medium mb-2">{t(locale, { pt: "Agente IA no WhatsApp", en: "WhatsApp AI Agent", es: "Agente IA en WhatsApp", jp: "WhatsApp上のAIエージェント", fr: "Agent IA sur WhatsApp" })}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t(locale, { pt: "Agente com LLM para atendimento, recomendação de produtos e finalização de vendas. Mensagens processadas de forma assíncrona, dados registrados no PostgreSQL. Fallback para matching por regras quando LLM está indisponível.", en: "LLM-powered agent handling customer service, product recommendations and sales completion. Messages processed async, data registered back into PostgreSQL. Fallback to rule-based matching when LLM is unavailable.", es: "Agente con LLM para atención, recomendación de productos y cierre de ventas. Mensajes procesados de forma asíncrona, datos registrados en PostgreSQL. Fallback a matching por reglas cuando LLM no está disponible.", jp: "顧客対応、商品推薦、販売完了のためのLLMエージェント。メッセージは非同期で処理され、データはPostgreSQLに保存。LLMが利用できない場合はルールベースのマッチングにフォールバック。", fr: "Agent avec LLM pour le service client, la recommandation de produits et la finalisation des ventes. Messages traités de façon asynchrone, données enregistrées dans PostgreSQL. Fallback vers un matching par règles quand le LLM est indisponible." })}
              </p>
            </div>
            <div className="rounded-md border border-border p-4">
              <h3 className="text-sm font-medium mb-2">{t(locale, { pt: "Pipeline RAG (LangChain + pgVector)", en: "RAG Pipeline (LangChain + pgVector)", es: "Pipeline RAG (LangChain + pgVector)", jp: "RAGパイプライン（LangChain + pgVector）", fr: "Pipeline RAG (LangChain + pgVector)" })}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t(locale, { pt: "Ingestão de documentos → chunking → geração de embeddings → armazenamento vetorial no PostgreSQL com pgVector → busca semântica com top-K como contexto para LLM.", en: "Document ingestion → chunk splitting → embedding generation → vector storage in PostgreSQL with pgVector → semantic search with top-K retrieval as LLM context.", es: "Ingestión de documentos → chunking → generación de embeddings → almacenamiento vectorial en PostgreSQL con pgVector → búsqueda semántica con top-K como contexto para LLM.", jp: "ドキュメント取り込み → チャンキング → 埋め込み生成 → pgVectorによるPostgreSQLへのベクトル保存 → top-Kの意味検索結果をLLMのコンテキストとして使用。", fr: "Ingestion de documents → chunking → génération d'embeddings → stockage vectoriel dans PostgreSQL avec pgVector → recherche sémantique avec top-K comme contexte pour le LLM." })}
              </p>
              <Link href={localePath(locale, "/posts/rag-langchain-postgres-fullcycle")} className="text-xs text-primary hover:underline mt-2 inline-block">
                {t(locale, { pt: "Ler implementação completa →", en: "Read full implementation →", es: "Leer implementación completa →", jp: "実装の詳細を読む →", fr: "Lire l'implémentation complète →" })}
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
          <h2 className="text-xl font-semibold">{t(locale, { pt: "Perguntas frequentes", en: "Frequently Asked Questions", es: "Preguntas frecuentes", jp: "よくある質問", fr: "Questions fréquentes" })}</h2>
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
          <h2 className="text-xl font-semibold">{t(locale, { pt: "Aprofundamentos", en: "Deep Dives", es: "Profundizaciones", jp: "詳細", fr: "Approfondissements" })}</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { title: t(locale, { pt: "Inbox React em escala", en: "React Inbox at Scale", es: "Inbox React a escala", jp: "スケールするReactインボックス", fr: "Inbox React à grande échelle" }), desc: t(locale, { pt: "Cursor, virtualização, 6,7 MB → 19 KB por requisição", en: "Cursor, virtualization, 6.7 MB → 19 KB per request", es: "Cursor, virtualización, 6,7 MB → 19 KB por request", jp: "カーソル、仮想化、リクエストあたり6.7MB → 19KB", fr: "Cursor, virtualisation, 6,7 MB → 19 KB par requête" }), href: "/posts/inbox-cursor-pagination-virtualization" },
            { title: t(locale, { pt: "Circuit Breaker em Node.js", en: "Circuit Breaker in Node.js", es: "Circuit Breaker en Node.js", jp: "Node.jsのサーキットブレーカー", fr: "Circuit Breaker en Node.js" }), desc: t(locale, { pt: "State machine, fallbacks, retry e monitoramento", en: "State machine, fallbacks, retry and monitoring", es: "State machine, fallbacks, retry y monitoreo", jp: "ステートマシン、フォールバック、リトライ、モニタリング", fr: "State machine, fallbacks, retry et monitoring" }), href: "/posts/circuit-breaker-nodejs" },
            { title: t(locale, { pt: "Arquitetura de Webhooks para Pagamentos", en: "Webhook Architecture for Payments", es: "Arquitectura de Webhooks para Pagos", jp: "決済向けWebhookアーキテクチャ", fr: "Architecture de Webhooks pour les paiements" }), desc: t(locale, { pt: "Idempotência, reconciliação, fluxos PIX", en: "Idempotency, reconciliation, PIX flows", es: "Idempotencia, reconciliación, flujos PIX", jp: "冪等性、照合、PIXフロー", fr: "Idempotence, réconciliation, flux PIX" }), href: "/posts/webhook-architecture-payment-providers" },
            { title: t(locale, { pt: "Arquitetura Multi-tenant", en: "Multi-tenant Architecture", es: "Arquitectura Multi-tenant", jp: "マルチテナントアーキテクチャ", fr: "Architecture Multi-tenant" }), desc: t(locale, { pt: "Banco compartilhado, RLS, particionamento", en: "Shared DB, RLS, partitioning", es: "Base compartida, RLS, particionamiento", jp: "共有DB、RLS、パーティショニング", fr: "Base partagée, RLS, partitionnement" }), href: "/posts/multi-tenant-architecture-postgresql" },
            { title: t(locale, { pt: "RAG com LangChain", en: "RAG with LangChain", es: "RAG con LangChain", jp: "LangChainによるRAG", fr: "RAG avec LangChain" }), desc: t(locale, { pt: "Embeddings, pgVector, busca semântica", en: "Embeddings, pgVector, semantic search", es: "Embeddings, pgVector, búsqueda semántica", jp: "埋め込み、pgVector、意味検索", fr: "Embeddings, pgVector, recherche sémantique" }), href: "/posts/rag-langchain-postgres-fullcycle" },
            { title: t(locale, { pt: "Design Systems em escala", en: "Design Systems at Scale", es: "Design Systems a escala", jp: "スケールするデザインシステム", fr: "Design Systems à grande échelle" }), desc: t(locale, { pt: "Shadcn UI, tokens, contratos de componentes", en: "Shadcn UI, tokens, component contracts", es: "Shadcn UI, tokens, contratos de componentes", jp: "Shadcn UI、デザイントークン、コンポーネント契約", fr: "Shadcn UI, tokens, contrats de composants" }), href: "/posts/design-system-shadcn-tailwind" },
            { title: t(locale, { pt: "Docker para devs frontend", en: "Docker for Frontend Devs", es: "Docker para devs frontend", jp: "フロントエンド開発者のためのDocker", fr: "Docker pour les devs frontend" }), desc: t(locale, { pt: "Dockerfile, multi-stage builds, dev/prod", en: "Dockerfile, multi-stage builds, dev/prod", es: "Dockerfile, multi-stage builds, dev/prod", jp: "Dockerfile、マルチステージビルド、dev/prod", fr: "Dockerfile, multi-stage builds, dev/prod" }), href: "/posts/docker-for-frontend-devs" },
            { title: t(locale, { pt: "Iniciando no TypeScript", en: "Getting Started with TypeScript", es: "Iniciando en TypeScript", jp: "TypeScript入門", fr: "Démarrer avec TypeScript" }), desc: t(locale, { pt: "Tipos, interfaces, generics, utility types", en: "Types, interfaces, generics, utility types", es: "Tipos, interfaces, generics, utility types", jp: "型、インターフェース、ジェネリクス、ユーティリティ型", fr: "Types, interfaces, generics, utility types" }), href: "/posts/starting-typescript" },
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
