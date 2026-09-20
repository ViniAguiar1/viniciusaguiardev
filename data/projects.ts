import type { Locale } from "@/lib/i18n"

export type ProjectCategory =
  | "AI SaaS"
  | "SaaS"
  | "E-commerce"
  | "Health"
  | "Open Source"
  | "Revenue Ops"

/** Translated string with PT as the required fallback. */
export type LocalizedString = Partial<Record<Locale, string>> & { pt: string }

export type Project = {
  slug: string
  name: string
  logo: string
  tagline: LocalizedString
  description: LocalizedString
  category: ProjectCategory
  url?: string
  detailPage?: string

  // Os quatro campos abaixo são opcionais de propósito: nem todo projeto do
  // portfólio registra papel, período, métrica ou stack, e o card foi desenhado
  // para encolher quando faltam em vez de exibir espaço vazio. Preenchê-los é
  // trabalho editorial do Vinicius — nada aqui é inferido.

  /** Papel dele no projeto, não o que o produto faz. */
  role?: LocalizedString
  /** Período. Invariante entre locales: só anos, sem a palavra "atual". */
  period?: string
  /** O número que prova o resultado: uma transformação que ele executou
   *  (6,7 MB → 19 KB) ou o resultado de negócio do produto que construiu
   *  (GMV, volume transacionado). Sempre um fato publicado, nunca estimado. */
  highlight?: LocalizedString
  /** Nome de tecnologia não se traduz, então é array invariante e fica fora do
   *  guard de cobertura de locale. */
  stack?: string[]
}

export const projects: Project[] = [
  {
    slug: "keep",
    name: "Keep",
    logo: "/images/keep-logo.jpeg",
    tagline: {
      pt: "Detecção de churn cruzando Stripe com o uso real do produto",
      en: "Churn detection crossing Stripe with real product usage",
      es: "Detección de churn cruzando Stripe con el uso real del producto",
      jp: "Stripeと実際のプロダクト利用を突き合わせるチャーン検知",
      fr: "Détection de churn croisant Stripe et l'usage réel du produit",
    },
    description: {
      pt: "Produto da Aguiar Labs que cruza os dados de pagamento do Stripe com o uso real do produto para mostrar quem está prestes a cancelar enquanto ainda dá tempo de ligar. Prioriza os alertas pela receita em risco, não pela severidade da queda de uso, e entrega no Slack em vez de exigir que alguém abra um dashboard. Acompanha três sinais de churn: contas silenciosas, queda de uso e contas que nunca usaram o produto. Integra Stripe, PostHog, Slack, HubSpot e Intercom, com acesso somente leitura via OAuth.",
      en: "An Aguiar Labs product that crosses Stripe payment data with real product usage to show who is about to churn while there is still time to call. It ranks alerts by revenue at stake rather than by how sharply usage dropped, and delivers them in Slack instead of expecting anyone to open a dashboard. It tracks three churn signals: silent accounts, usage drops and accounts that never used the product. Integrates Stripe, PostHog, Slack, HubSpot and Intercom, with read-only OAuth access.",
      es: "Producto de Aguiar Labs que cruza los datos de pago de Stripe con el uso real del producto para mostrar quién está a punto de cancelar mientras todavía da tiempo de llamar. Prioriza las alertas por los ingresos en riesgo, no por la severidad de la caída de uso, y las entrega en Slack en vez de exigir que alguien abra un dashboard. Sigue tres señales de churn: cuentas silenciosas, caída de uso y cuentas que nunca usaron el producto. Integra Stripe, PostHog, Slack, HubSpot e Intercom, con acceso de solo lectura vía OAuth.",
      jp: "Aguiar Labsのプロダクト。Stripeの決済データと実際のプロダクト利用状況を突き合わせ、まだ電話が間に合ううちに解約しそうな顧客を可視化する。アラートは利用減少の大きさではなく失うリスクのある収益で優先順位づけし、ダッシュボードを開かせる代わりにSlackへ届ける。解約の兆候を3つ追跡：無音のアカウント、利用の低下、一度も使われていないアカウント。Stripe、PostHog、Slack、HubSpot、Intercomと連携し、OAuthによる読み取り専用アクセスで動作する。",
      fr: "Produit d'Aguiar Labs qui croise les données de paiement Stripe avec l'usage réel du produit pour montrer qui est sur le point de résilier pendant qu'il est encore temps d'appeler. Il priorise les alertes selon le revenu en jeu plutôt que selon la brutalité de la baisse d'usage, et les livre dans Slack au lieu d'exiger que quelqu'un ouvre un dashboard. Il suit trois signaux de churn : comptes silencieux, baisse d'usage et comptes jamais utilisés. Intègre Stripe, PostHog, Slack, HubSpot et Intercom, avec un accès en lecture seule via OAuth.",
    },
    category: "Revenue Ops",
    role: {
      pt: "Projeto próprio",
      en: "Own product",
      es: "Proyecto propio",
      jp: "自社プロダクト",
      fr: "Produit interne",
    },
    stack: ["Stripe", "PostHog", "Slack", "HubSpot", "Intercom"],
    url: "https://usekeep.dev",
  },
  {
    slug: "chattie",
    name: "Chattie",
    logo: "/images/chattie-logo.png",
    tagline: {
      pt: "Outreach e customer engagement com IA — 165+ empresas",
      en: "AI-powered outreach and customer engagement — 165+ companies",
      es: "Outreach y customer engagement con IA — 165+ empresas",
      jp: "AIによるアウトリーチ＆カスタマーエンゲージメント — 165社以上",
      fr: "Outreach et customer engagement avec IA — 165+ entreprises",
    },
    description: {
      pt: "Plataforma de outreach e customer engagement com IA usada por 165+ empresas. Atuo como Product Engineer (Frontend) na evolução da frente de frontend, com foco em performance e escalabilidade — incluindo a reconstrução do inbox principal com paginação cursor-based e virtualização, reduzindo o payload de ~6,7 MB para ~19 KB por requisição e eliminando travamentos com milhares de conversas. Stack: React, Next.js, TypeScript, Supabase, TanStack Query, TanStack Virtual, Anthropic Claude e Vercel AI SDK.",
      en: "AI-powered outreach and customer engagement platform used by 165+ companies. I work as a Product Engineer (Frontend) on the evolution of the frontend, focused on performance and scalability — including rebuilding the main inbox with cursor-based pagination and virtualization, cutting the payload from ~6.7 MB to ~19 KB per request and eliminating freezes with thousands of conversations. Stack: React, Next.js, TypeScript, Supabase, TanStack Query, TanStack Virtual, Anthropic Claude and Vercel AI SDK.",
      es: "Plataforma de outreach y customer engagement con IA usada por 165+ empresas. Actúo como Product Engineer (Frontend) en la evolución del frontend, con foco en performance y escalabilidad — incluyendo la reconstrucción del inbox principal con paginación cursor-based y virtualización, reduciendo el payload de ~6,7 MB a ~19 KB por request y eliminando bloqueos con miles de conversaciones. Stack: React, Next.js, TypeScript, Supabase, TanStack Query, TanStack Virtual, Anthropic Claude y Vercel AI SDK.",
      jp: "165社以上が利用するAIアウトリーチ＆カスタマーエンゲージメントプラットフォーム。プロダクトエンジニア（フロントエンド）としてフロントエンドの進化に携わり、パフォーマンスとスケーラビリティに注力 — カーソルベースのページネーションと仮想化によるメインインボックスの再構築を含み、リクエストあたりのペイロードを約6.7MBから約19KBへ削減、数千件の会話でのフリーズを解消。スタック：React、Next.js、TypeScript、Supabase、TanStack Query、TanStack Virtual、Anthropic Claude、Vercel AI SDK。",
      fr: "Plateforme d'outreach et de customer engagement avec IA utilisée par 165+ entreprises. Je travaille comme Product Engineer (Frontend) sur l'évolution du frontend, avec un focus sur la performance et la scalabilité — y compris la reconstruction de l'inbox principale avec une pagination cursor-based et une virtualisation, réduisant le payload de ~6,7 MB à ~19 KB par requête et éliminant les blocages avec des milliers de conversations. Stack : React, Next.js, TypeScript, Supabase, TanStack Query, TanStack Virtual, Anthropic Claude et Vercel AI SDK.",
    },
    category: "AI SaaS",
    role: {
      pt: "Product Engineer (Frontend)",
      en: "Product Engineer (Frontend)",
      es: "Product Engineer (Frontend)",
      jp: "プロダクトエンジニア（フロントエンド）",
      fr: "Product Engineer (Frontend)",
    },
    period: "2026 —",
    highlight: {
      pt: "6,7 MB → 19 KB por requisição",
      en: "6.7 MB → 19 KB per request",
      es: "6,7 MB → 19 KB por request",
      jp: "1リクエストあたり 6.7 MB → 19 KB",
      fr: "6,7 MB → 19 KB par requête",
    },
    stack: ["React", "Next.js", "TypeScript", "Supabase", "TanStack Query", "TanStack Virtual", "Vercel AI SDK"],
    url: "https://trychattie.com",
    detailPage: "/posts/inbox-cursor-pagination-virtualization",
  },
  {
    slug: "termai",
    name: "termAI",
    logo: "/images/termai.svg",
    tagline: {
      pt: "Emulador de terminal com IA integrada — Rust + Go",
      en: "GPU-accelerated terminal with built-in AI — Rust + Go",
      es: "Emulador de terminal con IA integrada — Rust + Go",
      jp: "AI統合のターミナルエミュレーター — Rust + Go",
      fr: "Émulateur de terminal avec IA intégrée — Rust + Go",
    },
    description: {
      pt: "Projeto open source de emulador de terminal com renderização via GPU (wgpu) e engine de IA que detecta erros automaticamente e sugere correções via Claude ou OpenAI, com fallback offline por pattern matching. Rust pra core do emulador (PTY, vt100/xterm, split panes, scrollback) e Go pro daemon de IA. Distribuído como .app/.dmg assinado e notarizado para macOS.",
      en: "Open-source terminal emulator with GPU rendering (wgpu) and an AI engine that automatically detects errors and suggests fixes via Claude or OpenAI, with offline pattern-matching fallback. Rust for the emulator core (PTY, vt100/xterm, split panes, scrollback) and Go for the AI daemon. Shipped as a signed and notarized .app/.dmg for macOS.",
      es: "Proyecto open source de emulador de terminal con renderizado por GPU (wgpu) y motor de IA que detecta errores automáticamente y sugiere correcciones vía Claude u OpenAI, con fallback offline por pattern matching. Rust para el core del emulador (PTY, vt100/xterm, split panes, scrollback) y Go para el daemon de IA. Distribuido como .app/.dmg firmado y notarizado para macOS.",
      jp: "GPUレンダリング（wgpu）とAIエンジンを備えたオープンソースのターミナルエミュレーター。ClaudeまたはOpenAIによってエラーを自動検出し修正を提案、APIキーなしでもパターンマッチングによるオフラインフォールバックで動作。Rustでエミュレーターのコア（PTY、vt100/xterm、分割ペイン、スクロールバック）を、GoでAIデーモンを実装。macOS向けに署名済み・公証済みの.app/.dmgとして配布。",
      fr: "Projet open source d'émulateur de terminal avec rendu via GPU (wgpu) et moteur d'IA qui détecte automatiquement les erreurs et suggère des corrections via Claude ou OpenAI, avec un fallback offline par pattern matching. Rust pour le core de l'émulateur (PTY, vt100/xterm, split panes, scrollback) et Go pour le daemon d'IA. Distribué sous forme de .app/.dmg signé et notarisé pour macOS.",
    },
    category: "Open Source",
    stack: ["Rust", "Go", "wgpu", "Claude", "OpenAI"],
    url: "https://github.com/ViniAguiar1/termai",
  },
  {
    slug: "fastseller",
    name: "FastSeller",
    logo: "/images/fastseller-logo.png",
    tagline: {
      pt: "Plataforma de automação para vendedores em marketplaces",
      en: "Automation platform for marketplace sellers",
      es: "Plataforma de automatización para vendedores en marketplaces",
      jp: "マーケットプレイス販売者向けの自動化プラットフォーム",
      fr: "Plateforme d'automatisation pour vendeurs sur marketplaces",
    },
    description: {
      pt: "Plataforma que centraliza a operação de vendedores em múltiplos marketplaces, automatizando gestão de pedidos, estoque e precificação para escalar vendas online.",
      en: "Platform that centralizes seller operations across multiple marketplaces, automating order management, inventory, and pricing to scale online sales.",
      es: "Plataforma que centraliza la operación de vendedores en múltiples marketplaces, automatizando gestión de pedidos, inventario y precios para escalar ventas online.",
      jp: "複数のマーケットプレイスにわたる販売者の業務を一元化するプラットフォーム。注文管理、在庫、価格設定を自動化してオンライン販売をスケール。",
      fr: "Plateforme qui centralise les opérations des vendeurs sur plusieurs marketplaces, en automatisant la gestion des commandes, des stocks et de la tarification pour faire passer les ventes en ligne à l'échelle.",
    },
    category: "E-commerce",
    role: {
      pt: "Senior Software Engineer",
      en: "Senior Software Engineer",
      es: "Senior Software Engineer",
      jp: "シニアソフトウェアエンジニア",
      fr: "Senior Software Engineer",
    },
  },
  {
    slug: "x-drop",
    name: "X-Drop",
    logo: "/images/x-droplogo.png",
    tagline: {
      pt: "Plataforma de gestão para operações de dropshipping",
      en: "Management platform for dropshipping operations",
      es: "Plataforma de gestión para operaciones de dropshipping",
      jp: "ドロップシッピング運用向けの管理プラットフォーム",
      fr: "Plateforme de gestion pour les opérations de dropshipping",
    },
    description: {
      pt: "Sistema que integra catálogo, pedidos, expedição e pagamentos em um único painel, permitindo que vendedores gerenciem operações e finanças com governança por perfis de acesso e relatórios em tempo real.",
      en: "Unified system connecting product catalogs, orders, shipping, and payments to help sellers scale their dropshipping business with role-based access controls and real-time financial reporting.",
      es: "Sistema unificado que conecta catálogos, pedidos, envíos y pagos para ayudar a vendedores a escalar su negocio de dropshipping con controles de acceso por roles y reportes financieros en tiempo real.",
      jp: "カタログ、注文、配送、決済を単一のダッシュボードに統合するシステム。権限プロファイルによるガバナンスとリアルタイム財務レポートで、販売者が業務と財務を管理できます。",
      fr: "Système qui intègre catalogue, commandes, expédition et paiements dans un seul tableau de bord, permettant aux vendeurs de gérer leurs opérations et leurs finances avec une gouvernance par profils d'accès et des rapports en temps réel.",
    },
    category: "SaaS",
    role: {
      pt: "Senior Software Engineer",
      en: "Senior Software Engineer",
      es: "Senior Software Engineer",
      jp: "シニアソフトウェアエンジニア",
      fr: "Senior Software Engineer",
    },
    highlight: {
      pt: "+R$ 600 mil em GMV nos 6 primeiros meses",
      en: "R$600k+ in GMV in the first 6 months",
      es: "+R$ 600 mil en GMV en los primeros 6 meses",
      jp: "ローンチ後6か月でGMV 60万レアル超",
      fr: "+600 000 R$ de GMV sur les 6 premiers mois",
    },
    url: "https://xdrop.com.br/",
    detailPage: "/projetos/x-drop",
  },
  {
    slug: "vox-pet-digital",
    name: "Vox Pet Digital",
    logo: "/images/vox-pet-digital.webp",
    tagline: {
      pt: "Gestão e marketing 360° para petshops e clínicas veterinárias",
      en: "Complete 360° management and marketing for pet businesses",
      es: "Gestión y marketing 360° para pet shops y clínicas veterinarias",
      jp: "ペットショップ・動物病院向けの360°管理＆マーケティング",
      fr: "Gestion et marketing 360° pour animaleries et cliniques vétérinaires",
    },
    description: {
      pt: "Plataforma completa que oferece automação e ferramentas de gestão para clínicas veterinárias e petshops, combinando sistema de gerenciamento com assessoria especializada para aumentar faturamento e fidelizar clientes.",
      en: "Integrated platform combining automated management tools and professional consulting services for veterinary clinics and pet shops, helping owners optimize operations, increase revenue, and build stronger customer relationships.",
      es: "Plataforma integrada que combina herramientas de gestión automatizadas y servicios de consultoría para clínicas veterinarias y pet shops, ayudando a optimizar operaciones, aumentar ingresos y fidelizar clientes.",
      jp: "動物病院・ペットショップ向けの自動化と管理ツールを提供する統合プラットフォーム。管理システムと専門コンサルティングを組み合わせ、売上拡大と顧客ロイヤルティ向上を支援。",
      fr: "Plateforme complète qui offre automatisation et outils de gestion pour cliniques vétérinaires et animaleries, combinant système de gestion et conseil spécialisé pour augmenter le chiffre d'affaires et fidéliser les clients.",
    },
    category: "SaaS",
    role: {
      pt: "CTO & Co-Founder",
      en: "CTO & Co-Founder",
      es: "CTO & Co-Founder",
      jp: "CTO 兼 共同創業者",
      fr: "CTO & Co-Fondateur",
    },
    highlight: {
      pt: "R$ 2 milhões+ transacionados",
      en: "R$2M+ transacted",
      es: "R$ 2 millones+ transaccionados",
      jp: "取引総額200万レアル超",
      fr: "Plus de 2 M R$ transactionnés",
    },
    url: "https://voxpetdigital.com.br/",
    detailPage: "/projetos/vox-pet-digital",
  },
  {
    slug: "ikropp",
    name: "iKropp",
    logo: "/images/ikropp.png",
    tagline: {
      pt: "SaaS de gestão para clínicas de estética — 50k+ usuários",
      en: "Management SaaS for aesthetics clinics — 50k+ users",
      es: "SaaS de gestión para clínicas de estética — 50k+ usuarios",
      jp: "エステクリニック向け管理SaaS — 5万人以上のユーザー",
      fr: "SaaS de gestion pour cliniques d'esthétique — 50k+ utilisateurs",
    },
    description: {
      pt: "Plataforma SaaS para o setor de estética e saúde com 50.000+ usuários. Centraliza agenda, clientes, anamneses, profissionais, serviços e fluxos operacionais. Atuei como Software Engineer full stack, evoluindo módulos críticos em produção, modernizando sistema legado (PHP 5.3 → React/Next.js) e implementando Design System.",
      en: "SaaS platform for the aesthetics and health sector with 50,000+ users. Centralizes scheduling, clients, anamnesis, professionals, services and operational workflows. I worked as a full stack Software Engineer, evolving critical production modules, modernizing legacy system (PHP 5.3 → React/Next.js) and implementing Design System.",
      es: "Plataforma SaaS para el sector de estética y salud con 50.000+ usuarios. Centraliza agenda, clientes, anamnesis, profesionales, servicios y flujos operacionales. Actué como Software Engineer full stack, evolucionando módulos críticos en producción, modernizando sistema legado (PHP 5.3 → React/Next.js) e implementando Design System.",
      jp: "5万人以上のユーザーを抱えるエステ・ヘルスケア向けSaaSプラットフォーム。予約、顧客、問診、スタッフ、サービス、業務フローを一元化。フルスタックソフトウェアエンジニアとして本番環境の重要モジュールの改善、レガシーシステムのモダナイゼーション（PHP 5.3 → React/Next.js）、デザインシステムの実装を担当。",
      fr: "Plateforme SaaS pour le secteur de l'esthétique et de la santé avec 50 000+ utilisateurs. Centralise planning, clients, anamnèses, professionnels, services et flux opérationnels. J'ai travaillé comme Software Engineer full stack, en faisant évoluer des modules critiques en production, en modernisant le système legacy (PHP 5.3 → React/Next.js) et en implémentant un Design System.",
    },
    category: "Health",
    role: {
      pt: "Software Engineer full stack",
      en: "Full stack Software Engineer",
      es: "Software Engineer full stack",
      jp: "ソフトウェアエンジニア（フルスタック）",
      fr: "Software Engineer full stack",
    },
    highlight: {
      pt: "Legado PHP 5.3 → React/Next.js",
      en: "PHP 5.3 legacy → React/Next.js",
      es: "Legado PHP 5.3 → React/Next.js",
      jp: "レガシー PHP 5.3 → React/Next.js",
      fr: "Legacy PHP 5.3 → React/Next.js",
    },
    stack: ["React", "Next.js", "PHP", "Design System"],
    url: "https://ikropp.com/",
    detailPage: "/projetos/ikropp",
  },
  {
    slug: "movepro",
    name: "MovePro",
    logo: "/images/movepro-logo.png",
    tagline: {
      pt: "Plataforma para nutricionistas e personal trainers",
      en: "Platform for nutritionists and personal trainers",
      es: "Plataforma para nutricionistas y entrenadores personales",
      jp: "栄養士・パーソナルトレーナー向けプラットフォーム",
      fr: "Plateforme pour nutritionnistes et coachs sportifs",
    },
    description: {
      pt: "Software para nutricionistas e personal trainers prescreverem planos alimentares e treinos personalizados, monitorarem o progresso de clientes e gerenciarem consultas em um único aplicativo web e mobile.",
      en: "Software for nutritionists and personal trainers to prescribe customized meal plans and workouts, monitor client progress, and manage appointments in a single web and mobile application.",
      es: "Software para nutricionistas y entrenadores personales para prescribir planes alimentarios y entrenamientos personalizados, monitorear el progreso de clientes y gestionar consultas en una sola aplicación web y móvil.",
      jp: "栄養士とパーソナルトレーナーが、カスタマイズされた食事プランとトレーニングメニューを処方し、クライアントの進捗を追跡、予約を管理するための単一のWeb・モバイルアプリケーション。",
      fr: "Logiciel permettant aux nutritionnistes et aux coachs sportifs de prescrire des plans alimentaires et des entraînements personnalisés, de suivre la progression de leurs clients et de gérer les consultations dans une seule application web et mobile.",
    },
    category: "SaaS",
    role: {
      pt: "Projeto próprio",
      en: "Own project",
      es: "Proyecto propio",
      jp: "個人プロジェクト",
      fr: "Projet personnel",
    },
    url: "https://movepro-ruddy.vercel.app/",
  },
]
