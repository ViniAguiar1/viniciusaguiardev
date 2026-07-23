import { cn } from "@/lib/utils"
import { getDictionary, getLocale, t } from "@/lib/i18n-server"
import { buildAlternates } from "@/lib/i18n"
import { ExperienceItem } from "@/components/experience-item"

export async function generateMetadata() {
  const locale = await getLocale()
  return {
    title: t(locale, { pt: "Sobre", en: "About", es: "Acerca", jp: "プロフィール" }),
    description: t(locale, { pt: "Trajetória, experiência profissional, habilidades e tech stack de Vinicius Aguiar — Frontend Engineer.", en: "Journey, professional experience, skills and tech stack of Vinicius Aguiar — Frontend Engineer.", es: "Trayectoria, experiencia profesional, habilidades y tech stack de Vinicius Aguiar — Frontend Engineer.", jp: "Vinicius Aguiar（フロントエンドエンジニア）の経歴、実務経験、スキル、技術スタック。" }),
    alternates: buildAlternates("/sobre", locale),
  }
}

const experiencesPt = [
  {
    period: "Jul 2026 — atual · Tempo integral · Remoto",
    title: "Frontend Engineer · Chattie",
    summary:
      "Lidero a frente de frontend de uma plataforma de outreach com IA usada por 100+ empresas, com foco em performance, escalabilidade e entrega de ponta a ponta.",
    details: [
      "Liderança da frente de frontend de uma plataforma de outreach com IA usada por 100+ empresas",
      "Reconstrução do inbox principal (~20.000 registros por workspace) com paginação cursor-based e virtualização de lista — payload inicial de ~6,7 MB para ~19 KB (~400x), eliminando travamentos de interface e carregamentos de vários segundos",
      "Contribuição em decisões de arquitetura voltadas a escalabilidade e manutenibilidade, entregando features de ponta a ponta (design → produção)",
      "Atuação adicional em backend, sistemas de IA (Anthropic Claude, Vercel AI SDK) e confiabilidade, além do escopo principal de frontend",
      "90%+ de cobertura de testes automatizados (unitários e de integração) nas features entregues",
    ],
  },
  {
    period: "Nov 2025 — Jul 2026 · Tempo integral · Minas Gerais, Brasil · Remoto",
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

const experiencesEn = [
  {
    period: "Jul 2026 — present · Full-time · Remote",
    title: "Frontend Engineer · Chattie",
    summary:
      "Leading the frontend of an AI outreach platform used by 100+ companies, focused on performance, scalability and end-to-end delivery.",
    details: [
      "Leading the frontend of an AI-powered outreach platform used by 100+ companies",
      "Rebuilt the platform's main inbox (~20,000 records per workspace) with cursor-based pagination and list virtualization — initial payload from ~6.7 MB to ~19 KB (~400x), eliminating UI freezes and multi-second loads",
      "Contributing to architecture decisions focused on scalability and maintainability, shipping features end to end (design → production)",
      "Additional work on backend, AI systems (Anthropic Claude, Vercel AI SDK) and reliability, beyond the core frontend scope",
      "Maintaining 90%+ automated test coverage (unit and integration) on shipped features",
    ],
  },
  {
    period: "Nov 2025 — Jul 2026 · Full-time · Minas Gerais, Brazil · Remote",
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

const experiencesEs = [
  {
    period: "Jul 2026 — presente · Tiempo completo · Remoto",
    title: "Frontend Engineer · Chattie",
    summary:
      "Lidero el frontend de una plataforma de outreach con IA usada por 100+ empresas, con foco en performance, escalabilidad y entrega end-to-end.",
    details: [
      "Liderazgo del frontend de una plataforma de outreach con IA usada por 100+ empresas",
      "Reconstrucción del inbox principal (~20.000 registros por workspace) con paginación cursor-based y virtualización de lista — payload inicial de ~6,7 MB a ~19 KB (~400x), eliminando bloqueos de interfaz y cargas de varios segundos",
      "Contribución en decisiones de arquitectura orientadas a escalabilidad y mantenibilidad, entregando features de punta a punta (diseño → producción)",
      "Trabajo adicional en backend, sistemas de IA (Anthropic Claude, Vercel AI SDK) y confiabilidad, más allá del alcance principal de frontend",
      "90%+ de cobertura de tests automatizados (unitarios y de integración) en las features entregadas",
    ],
  },
  {
    period: "Nov 2025 — Jul 2026 · Tiempo completo · Minas Gerais, Brasil · Remoto",
    title: "Mid-level Software Engineer · Holy Solutions",
    summary:
      "Desarrollo de aplicaciones web y móviles con React, Next.js y React Native, enfocado en interfaces escalables y experiencias centradas en el usuario.",
    details: [
      "Desarrollo end-to-end de features con APIs externas, pagos y servicios con IA",
      "Desarrollo de interfaces web y móviles con React, Next.js y React Native",
      "Integración con APIs externas y sistemas de pago (Asaas)",
      "Creación de componentes reutilizables y estandarización de Design System",
      "Participación en decisiones técnicas de arquitectura frontend e integraciones de sistemas",
      "Deploy y operación de aplicaciones en ambientes AWS",
    ],
  },
  {
    period: "Ago 2025 — presente · Medio tiempo · Remoto",
    title: "Software Engineer · Vox Pet Digital",
    summary:
      "Software Engineer en el SaaS Vox Pet Digital para pet shops y clínicas veterinarias, participando directamente en la evolución del producto.",
    details: [
      "Implementación de módulos de agenda, ventas, financiero y comisiones",
      "Desarrollo de automatizaciones vía WhatsApp conectadas al flujo operacional",
      "Integración de IA en WhatsApp para atención automatizada y recomendación de productos/servicios",
      "Flujos de cierre de ventas con registro de datos en el sistema",
      "Stack: React, Next.js, Node.js, TypeScript y PostgreSQL",
      "Integraciones: WhatsApp, OpenAI, Mercado Pago y Stripe",
      "Seguimiento de deploy y operación del sistema en producción",
    ],
  },
  {
    period: "Abr 2025 — Ene 2026 · Tiempo completo · São Paulo, Brasil · Remoto",
    title: "Software Engineer · Stack Labs",
    summary:
      "Desarrollo de aplicaciones web y móviles para diferentes clientes, entregando interfaces performantes y escalables con React, Next.js y React Native.",
    details: [
      "Creación de interfaces responsivas y performantes con React, React Native y Next.js",
      "Componentes reutilizables y arquitectura frontend orientada a escalabilidad",
      "Integración con APIs REST y servicios externos (pagos, notificaciones, autenticación, analytics)",
      "Optimización de performance, experiencia de usuario y reducción de errores en producción",
      "Seguimiento de deploys, monitoreo de logs y colaboración en todo el ciclo de desarrollo",
    ],
  },
  {
    period: "May 2025 — Nov 2025 · Tiempo completo · São Paulo, Brasil · Remoto",
    title: "Software Engineer · MovePro",
    summary:
      "Participé en el desarrollo completo de la plataforma MovePro (web + móvil), contribuyendo en interfaces críticas usadas por miles de usuarios y liderando integraciones esenciales.",
    details: [
      "Desarrollo de interfaces web con React y Next.js, enfocado en performance y escalabilidad",
      "Creación y mantenimiento de la app móvil con React Native y Expo",
      "Integración con servicios externos como Stripe, FatSecret, Google y Firebase",
      "Optimización de queries y consumo de APIs, reduciendo tiempo de carga y latencia",
      "Implementación de monitoreo con Crashlytics, logs y métricas de producto",
      "Desarrollo de componentes y UX consistente en todo el ecosistema MovePro",
      "Participación en decisiones técnicas, ciclos de release y evolución del producto",
    ],
  },
  {
    period: "May 2024 — Jun 2025 · Híbrido",
    title: "Web Developer / Mobile Developer · Easytogo",
    summary:
      "Desarrollo de interfaces web y móviles con React, Next.js, React Native y Flutter en ambiente ágil y orientado a producto.",
    details: [
      "Desarrollo con React y Next.js",
      "Aplicaciones móviles con React Native y Flutter",
      "Integración con APIs conectadas a flujos reales de usuario",
      "Trabajo en ambiente ágil con Scrum",
    ],
  },
]

const experiencesJp = [
  {
    period: "2026年7月 — 現在 · フルタイム · リモート",
    title: "フロントエンドエンジニア · Chattie",
    summary:
      "100社以上が利用するAIアウトリーチプラットフォームのフロントエンドをリード。パフォーマンス、スケーラビリティ、エンドツーエンドの提供に注力。",
    details: [
      "100社以上が利用するAIアウトリーチプラットフォームのフロントエンドをリード",
      "メインインボックス（ワークスペースあたり約20,000件）をカーソルベースのページネーションとリスト仮想化で再構築 — 初期ペイロードを約6.7MBから約19KBへ（約1/400）削減し、UIのフリーズと数秒かかる読み込みを解消",
      "スケーラビリティと保守性を重視したアーキテクチャの意思決定に貢献し、機能をエンドツーエンド（デザイン → 本番）で提供",
      "主担当のフロントエンドに加え、バックエンド、AIシステム（Anthropic Claude、Vercel AI SDK）、信頼性にも従事",
      "提供する機能で90%以上の自動テストカバレッジ（ユニット・統合）を維持",
    ],
  },
  {
    period: "2025年11月 — 2026年7月 · フルタイム · ブラジル・ミナスジェライス州 · リモート",
    title: "ミドルレベル ソフトウェアエンジニア · Holy Solutions",
    summary:
      "React、Next.js、React Native によるWeb・モバイルアプリケーション開発。スケーラブルなインターフェースとユーザー中心の体験に注力。",
    details: [
      "外部API、決済、AIサービスを用いた機能のエンドツーエンド開発",
      "React、Next.js、React Native によるWeb・モバイルインターフェースの開発",
      "外部APIおよび決済システム（Asaas）との連携",
      "再利用可能なコンポーネントの作成とデザインシステムの標準化",
      "フロントエンドアーキテクチャおよびシステム連携の技術的意思決定への参加",
      "AWS環境でのアプリケーションのデプロイと運用",
    ],
  },
  {
    period: "2025年8月 — 現在 · パートタイム · リモート",
    title: "ソフトウェアエンジニア · Vox Pet Digital",
    summary:
      "ペットショップおよび動物病院向けSaaS「Vox Pet Digital」のソフトウェアエンジニアとして、プロダクトの進化に直接関与。",
    details: [
      "予約、販売、財務、手数料モジュールの実装",
      "業務フローと連携したWhatsApp自動化の開発",
      "自動応対と商品・サービス推薦のためのWhatsAppへのAI統合",
      "システムへのデータ登録を伴う販売完了フロー",
      "スタック：React、Next.js、Node.js、TypeScript、PostgreSQL",
      "連携：WhatsApp、OpenAI、Mercado Pago、Stripe",
      "本番環境でのデプロイと運用のフォローアップ",
    ],
  },
  {
    period: "2025年4月 — 2026年1月 · フルタイム · ブラジル・サンパウロ · リモート",
    title: "ソフトウェアエンジニア · Stack Labs",
    summary:
      "さまざまなクライアント向けのWeb・モバイルアプリケーション開発。React、Next.js、React Native で高性能かつスケーラブルなインターフェースを提供。",
    details: [
      "React、React Native、Next.js によるレスポンシブで高性能なインターフェースの作成",
      "再利用可能なコンポーネントとスケーラビリティを重視したフロントエンドアーキテクチャ",
      "REST APIおよび外部サービス（決済、通知、認証、分析）との連携",
      "パフォーマンス最適化、ユーザー体験の向上、本番環境のエラー削減",
      "デプロイのフォローアップ、ログ監視、開発サイクル全体での協働",
    ],
  },
  {
    period: "2025年5月 — 2025年11月 · フルタイム · ブラジル・サンパウロ · リモート",
    title: "ソフトウェアエンジニア · MovePro",
    summary:
      "MovePro プラットフォーム（Web + モバイル）の全面的な開発に参加。数千人のユーザーが利用する重要なインターフェースに貢献し、主要な連携をリード。",
    details: [
      "React と Next.js によるWebインターフェース開発。パフォーマンスとスケーラビリティに注力",
      "React Native と Expo によるモバイルアプリの開発と保守",
      "Stripe、FatSecret、Google、Firebase などの外部サービスとの連携",
      "クエリとAPI呼び出しの最適化による読み込み時間とレイテンシの削減",
      "Crashlytics、ログ、プロダクトメトリクスによる監視の実装",
      "MovePro エコシステム全体で一貫したコンポーネントとUXの開発",
      "技術的意思決定、リリースサイクル、プロダクトの進化への参加",
    ],
  },
  {
    period: "2024年5月 — 2025年6月 · ハイブリッド",
    title: "Web開発者 / モバイル開発者 · Easytogo",
    summary:
      "アジャイルかつプロダクト志向の環境で、React、Next.js、React Native、Flutter によるWeb・モバイルインターフェースの開発。",
    details: [
      "React と Next.js による開発",
      "React Native と Flutter によるモバイルアプリケーション",
      "実際のユーザーフローに接続されたAPIとの連携",
      "Scrum によるアジャイル環境での業務",
    ],
  },
]

export default async function SobrePage() {
  const locale = await getLocale()
  const dict = getDictionary(locale)
  const experiences = locale === "en" ? experiencesEn : locale === "es" ? experiencesEs : locale === "jp" ? experiencesJp : experiencesPt

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

            <p className="mt-4 leading-relaxed">
              {t(locale, { pt: "Frontend Engineer com mentalidade de produto, especializado em construir aplicações web e mobile rápidas e escaláveis com React, Next.js e React Native — com foco em performance e experiência do usuário.", en: "Frontend Engineer with a product mindset, specialized in building fast, scalable web and mobile applications with React, Next.js and React Native — focused on performance and user experience.", es: "Frontend Engineer con mentalidad de producto, especializado en construir aplicaciones web y móviles rápidas y escalables con React, Next.js y React Native — con foco en performance y experiencia de usuario.", jp: "プロダクト思考のフロントエンドエンジニア。React、Next.js、React Nativeによる高速でスケーラブルなWeb・モバイルアプリケーション構築を専門とし、パフォーマンスとユーザー体験に注力。" })}
            </p>

            <p className="mt-3 leading-relaxed text-sm text-muted-foreground">
              {t(locale, { pt: "Na Chattie, lidero a frente de frontend de uma plataforma de outreach com IA usada por 100+ empresas. Reconstruí o inbox principal (~20.000 registros por workspace) com paginação cursor-based e virtualização de lista — reduzindo o payload inicial de ~6,7 MB para ~19 KB (~400x) e eliminando travamentos de interface.", en: "At Chattie, I lead the frontend of an AI outreach platform used by 100+ companies. I rebuilt the main inbox (~20,000 records per workspace) with cursor-based pagination and list virtualization — cutting the initial payload from ~6.7 MB to ~19 KB (~400x) and eliminating UI freezes.", es: "En Chattie, lidero el frontend de una plataforma de outreach con IA usada por 100+ empresas. Reconstruí el inbox principal (~20.000 registros por workspace) con paginación cursor-based y virtualización de lista — reduciendo el payload inicial de ~6,7 MB a ~19 KB (~400x) y eliminando bloqueos de interfaz.", jp: "Chattieでは、100社以上が利用するAIアウトリーチプラットフォームのフロントエンドをリードしています。メインインボックス（ワークスペースあたり約20,000件）をカーソルベースのページネーションとリスト仮想化で再構築し、初期ペイロードを約6.7MBから約19KBへ（約1/400）削減、UIのフリーズを解消しました。" })}
            </p>

            <p className="mt-3 leading-relaxed text-sm text-muted-foreground">
              {t(locale, { pt: "Capacidade full-stack como diferencial: integrações de pagamento, arquitetura multi-tenant, sistemas de IA (Anthropic Claude, Vercel AI SDK) e entrega em cloud (AWS, CI/CD) — sempre operando produtos SaaS reais em produção.", en: "Full-stack range as a differentiator: payment integrations, multi-tenant architecture, AI systems (Anthropic Claude, Vercel AI SDK) and cloud delivery (AWS, CI/CD) — always operating real SaaS products in production.", es: "Capacidad full-stack como diferencial: integraciones de pago, arquitectura multi-tenant, sistemas de IA (Anthropic Claude, Vercel AI SDK) y entrega en cloud (AWS, CI/CD) — siempre operando productos SaaS reales en producción.", jp: "フルスタック対応力が強み：決済連携、マルチテナントアーキテクチャ、AIシステム（Anthropic Claude、Vercel AI SDK）、クラウドデリバリー（AWS、CI/CD） — 常に実際のSaaSプロダクトを本番環境で運用。" })}
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-xl font-semibold mb-3">
            {t(locale, { pt: "Habilidades", en: "Skills", es: "Habilidades", jp: "スキル" })}
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>React, Next.js, TypeScript</li>
            <li>React Native, Node.js, Flutter, Swift (iOS)</li>
            <li>HTML5, CSS3, Tailwind, Design System</li>
            <li>
              {t(locale, { pt: "Integrações REST API, autenticação e fluxos de pagamento", en: "REST API integrations, authentication and payment flows", es: "Integraciones REST API, autenticación y flujos de pago", jp: "REST API連携、認証、決済フロー" })}
            </li>
            <li>
              {t(locale, { pt: "Testes, performance e prontidão para produção", en: "Testing, performance and production readiness", es: "Testing, rendimiento y preparación para producción", jp: "テスト、パフォーマンス、本番環境への準備" })}
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-xl font-semibold mb-3">
            {t(locale, { pt: "Interesses", en: "Interests", es: "Intereses", jp: "興味" })}
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>
              {t(locale, { pt: "Experiência do Usuário e acessibilidade", en: "User Experience and accessibility", es: "Experiencia de Usuario y accesibilidad", jp: "ユーザー体験とアクセシビリティ" })}
            </li>
            <li>
              {t(locale, { pt: "Arquitetura frontend e performance", en: "Frontend architecture and performance", es: "Arquitectura frontend y rendimiento", jp: "フロントエンドアーキテクチャとパフォーマンス" })}
            </li>
            <li>
              {t(locale, { pt: "IA aplicada a produtos digitais", en: "AI applied to digital products", es: "IA aplicada a productos digitales", jp: "デジタルプロダクトに応用するAI" })}
            </li>
          </ul>
        </div>
      </section>

      {/* Experience */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">
          {t(locale, { pt: "Experiência", en: "Experience", es: "Experiencia", jp: "実務経験" })}
        </h2>

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
            "React", "React Native", "Next.js", "Node.js", "TypeScript",
            "HTML5", "CSS3", "Tailwind", "PostgreSQL", "Docker",
            "AWS", "Git", "Swift (iOS)", "Flutter", "Go",
            "Java", "CI/CD", "Testing", "Accessibility", "Design System",
            "Linux/macOS",
          ].map((tag) => (
            <span key={tag} className="rounded-md border border-border bg-muted/40 px-2 py-1 text-xs">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Core Concepts */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">
          {t(locale, { pt: "Conceitos-chave", en: "Core Concepts", es: "Conceptos clave", jp: "重要な概念" })}
        </h2>

        <ul className="mt-4 list-disc pl-5 space-y-2 text-sm">
          <li>{t(locale, { pt: "Performance de frontend — paginação cursor-based, virtualização de listas e otimização de payload", en: "Frontend performance — cursor-based pagination, list virtualization and payload optimization", es: "Performance de frontend — paginación cursor-based, virtualización de listas y optimización de payload", jp: "フロントエンドパフォーマンス — カーソルベースのページネーション、リスト仮想化、ペイロード最適化" })}</li>
          <li>{t(locale, { pt: "Arquitetura SaaS e desenho de sistemas prontos para produção", en: "SaaS Architecture and production-ready system design", es: "Arquitectura SaaS y diseño de sistemas listos para producción", jp: "SaaSアーキテクチャと本番環境向けシステム設計" })}</li>
          <li>{t(locale, { pt: "REST APIs, integrações, autenticação e serviços de pagamento", en: "REST APIs, system integrations, authentication and payment services", es: "REST APIs, integraciones, autenticación y servicios de pago", jp: "REST API、連携、認証、決済サービス" })}</li>
          <li>{t(locale, { pt: "Agentes de IA e fluxos de automação integrados a produtos reais", en: "AI Agents and automation workflows integrated into real products", es: "Agentes de IA y flujos de automatización integrados a productos reales", jp: "実プロダクトに統合されたAIエージェントと自動化フロー" })}</li>
          <li>{t(locale, { pt: "Entrega em cloud com AWS, pipelines de CI/CD e serviços em contêineres", en: "Cloud delivery with AWS, CI/CD pipelines and containerized services", es: "Entrega en cloud con AWS, pipelines de CI/CD y servicios en contenedores", jp: "AWSへのクラウドデリバリー、CI/CDパイプライン、コンテナ化されたサービス" })}</li>
          <li>{t(locale, { pt: "Estratégia de testes, confiabilidade, performance e usabilidade", en: "Testing strategy, reliability, performance and usability", es: "Estrategia de testing, confiabilidad, rendimiento y usabilidad", jp: "テスト戦略、信頼性、パフォーマンス、ユーザビリティ" })}</li>
          <li>{t(locale, { pt: "Execução ágil com Scrum/Kanban e ciclos iterativos de produto", en: "Agile execution with Scrum/Kanban and iterative product cycles", es: "Ejecución ágil con Scrum/Kanban y ciclos iterativos de producto", jp: "Scrum/Kanbanによるアジャイル実行と反復的なプロダクトサイクル" })}</li>
        </ul>
      </section>

      {/* Projects */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">
          {t(locale, { pt: "Projetos em destaque", en: "Featured Projects", es: "Proyectos destacados", jp: "注目のプロジェクト" })}
        </h2>

        <ul className="mt-4 list-disc pl-5 space-y-2 text-sm">
          <li>
            <span className="font-medium">Vox Pet Digital</span>
            <span className="text-muted-foreground">
              {" — "}
              {t(locale, { pt: "plataforma SaaS para pet shops e clínicas veterinárias com foco em gestão, agendamentos e relacionamento com clientes.", en: "SaaS platform for pet shops and veterinary clinics focused on scheduling, customer management and digital services.", es: "plataforma SaaS para pet shops y clínicas veterinarias enfocada en gestión, agendamiento y relación con clientes.", jp: "ペットショップと動物病院向けのSaaSプラットフォーム。管理、予約、顧客関係構築に特化。" })}
            </span>
          </li>
          <li>
            <span className="font-medium">X-Drop</span>
            <span className="text-muted-foreground">
              {" — "}
              {t(locale, { pt: "solução voltada à automação de e-commerce e integração com marketplaces.", en: "solution for e-commerce automation and marketplace integrations focused on operational efficiency.", es: "solución enfocada en automatización de e-commerce e integración con marketplaces.", jp: "Eコマース自動化とマーケットプレイス連携を中心としたソリューション。" })}
            </span>
          </li>
        </ul>
      </section>

      {/* Contact */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">
          {t(locale, { pt: "Contato", en: "Contact", es: "Contacto", jp: "連絡先" })}
        </h2>

        <ul className="mt-4 space-y-2 text-sm">
          <li>
            Email:{" "}
            <a className="text-primary underline-offset-4 hover:underline" href="mailto:vinicius.aguiar1@icloud.com">
              vinicius.aguiar1@icloud.com
            </a>
          </li>
          <li>
            GitHub:{" "}
            <a className="text-primary underline-offset-4 hover:underline" href="https://github.com/ViniAguiar1" target="_blank" rel="noreferrer">
              @ViniAguiar1
            </a>
          </li>
          <li>
            LinkedIn:{" "}
            <a className="text-primary underline-offset-4 hover:underline" href="https://www.linkedin.com/in/viniciusaguiar-araujo/" target="_blank" rel="noreferrer">
              viniciusaguiar-araujo
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}
