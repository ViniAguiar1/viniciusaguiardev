import type { Locale } from "@/lib/i18n"

export type ProjectCategory =
  | "SaaS"
  | "E-commerce"
  | "Health"
  | "Open Source"

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
}

export const projects: Project[] = [
  {
    slug: "termai",
    name: "termAI",
    logo: "/images/termai.svg",
    tagline: {
      pt: "Emulador de terminal com IA integrada — Rust + Go",
      en: "GPU-accelerated terminal with built-in AI — Rust + Go",
      es: "Emulador de terminal con IA integrada — Rust + Go",
      jp: "AI統合のターミナルエミュレーター — Rust + Go",
    },
    description: {
      pt: "Projeto open source de emulador de terminal com renderização via GPU (wgpu) e engine de IA que detecta erros automaticamente e sugere correções via Claude ou OpenAI, com fallback offline por pattern matching. Rust pra core do emulador (PTY, vt100/xterm, split panes, scrollback) e Go pro daemon de IA. Distribuído como .app/.dmg assinado e notarizado para macOS.",
      en: "Open-source terminal emulator with GPU rendering (wgpu) and an AI engine that automatically detects errors and suggests fixes via Claude or OpenAI, with offline pattern-matching fallback. Rust for the emulator core (PTY, vt100/xterm, split panes, scrollback) and Go for the AI daemon. Shipped as a signed and notarized .app/.dmg for macOS.",
      es: "Proyecto open source de emulador de terminal con renderizado por GPU (wgpu) y motor de IA que detecta errores automáticamente y sugiere correcciones vía Claude u OpenAI, con fallback offline por pattern matching. Rust para el core del emulador (PTY, vt100/xterm, split panes, scrollback) y Go para el daemon de IA. Distribuido como .app/.dmg firmado y notarizado para macOS.",
      jp: "GPUレンダリング（wgpu）とAIエンジンを備えたオープンソースのターミナルエミュレーター。ClaudeまたはOpenAIによってエラーを自動検出し修正を提案、APIキーなしでもパターンマッチングによるオフラインフォールバックで動作。Rustでエミュレーターのコア（PTY、vt100/xterm、分割ペイン、スクロールバック）を、GoでAIデーモンを実装。macOS向けに署名済み・公証済みの.app/.dmgとして配布。",
    },
    category: "Open Source",
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
    },
    description: {
      pt: "Plataforma que centraliza a operação de vendedores em múltiplos marketplaces, automatizando gestão de pedidos, estoque e precificação para escalar vendas online.",
      en: "Platform that centralizes seller operations across multiple marketplaces, automating order management, inventory, and pricing to scale online sales.",
      es: "Plataforma que centraliza la operación de vendedores en múltiples marketplaces, automatizando gestión de pedidos, inventario y precios para escalar ventas online.",
      jp: "複数のマーケットプレイスにわたる販売者の業務を一元化するプラットフォーム。注文管理、在庫、価格設定を自動化してオンライン販売をスケール。",
    },
    category: "E-commerce",
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
    },
    description: {
      pt: "Sistema que integra catálogo, pedidos, expedição e pagamentos em um único painel, permitindo que vendedores gerenciem operações e finanças com governança por perfis de acesso e relatórios em tempo real.",
      en: "Unified system connecting product catalogs, orders, shipping, and payments to help sellers scale their dropshipping business with role-based access controls and real-time financial reporting.",
      es: "Sistema unificado que conecta catálogos, pedidos, envíos y pagos para ayudar a vendedores a escalar su negocio de dropshipping con controles de acceso por roles y reportes financieros en tiempo real.",
      jp: "カタログ、注文、配送、決済を単一のダッシュボードに統合するシステム。権限プロファイルによるガバナンスとリアルタイム財務レポートで、販売者が業務と財務を管理できます。",
    },
    category: "SaaS",
    url: "https://xdrop.com.br/",
    detailPage: "/projetos/x-drop",
  },
  {
    slug: "vox-pet-digital",
    name: "Vox Pet Digital",
    logo: "/images/vox-pet-digital.png",
    tagline: {
      pt: "Gestão e marketing 360° para petshops e clínicas veterinárias",
      en: "Complete 360° management and marketing for pet businesses",
      es: "Gestión y marketing 360° para pet shops y clínicas veterinarias",
      jp: "ペットショップ・動物病院向けの360°管理＆マーケティング",
    },
    description: {
      pt: "Plataforma completa que oferece automação e ferramentas de gestão para clínicas veterinárias e petshops, combinando sistema de gerenciamento com assessoria especializada para aumentar faturamento e fidelizar clientes.",
      en: "Integrated platform combining automated management tools and professional consulting services for veterinary clinics and pet shops, helping owners optimize operations, increase revenue, and build stronger customer relationships.",
      es: "Plataforma integrada que combina herramientas de gestión automatizadas y servicios de consultoría para clínicas veterinarias y pet shops, ayudando a optimizar operaciones, aumentar ingresos y fidelizar clientes.",
      jp: "動物病院・ペットショップ向けの自動化と管理ツールを提供する統合プラットフォーム。管理システムと専門コンサルティングを組み合わせ、売上拡大と顧客ロイヤルティ向上を支援。",
    },
    category: "SaaS",
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
    },
    description: {
      pt: "Plataforma SaaS para o setor de estética e saúde com 50.000+ usuários. Centraliza agenda, clientes, anamneses, profissionais, serviços e fluxos operacionais. Atuei como Software Engineer full stack, evoluindo módulos críticos em produção, modernizando sistema legado (PHP 5.3 → React/Next.js) e implementando Design System.",
      en: "SaaS platform for the aesthetics and health sector with 50,000+ users. Centralizes scheduling, clients, anamnesis, professionals, services and operational workflows. I worked as a full stack Software Engineer, evolving critical production modules, modernizing legacy system (PHP 5.3 → React/Next.js) and implementing Design System.",
      es: "Plataforma SaaS para el sector de estética y salud con 50.000+ usuarios. Centraliza agenda, clientes, anamnesis, profesionales, servicios y flujos operacionales. Actué como Software Engineer full stack, evolucionando módulos críticos en producción, modernizando sistema legado (PHP 5.3 → React/Next.js) e implementando Design System.",
      jp: "5万人以上のユーザーを抱えるエステ・ヘルスケア向けSaaSプラットフォーム。予約、顧客、問診、スタッフ、サービス、業務フローを一元化。フルスタックソフトウェアエンジニアとして本番環境の重要モジュールの改善、レガシーシステムのモダナイゼーション（PHP 5.3 → React/Next.js）、デザインシステムの実装を担当。",
    },
    category: "Health",
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
    },
    description: {
      pt: "Software para nutricionistas e personal trainers prescreverem planos alimentares e treinos personalizados, monitorarem o progresso de clientes e gerenciarem consultas em um único aplicativo web e mobile.",
      en: "Software for nutritionists and personal trainers to prescribe customized meal plans and workouts, monitor client progress, and manage appointments in a single web and mobile application.",
      es: "Software para nutricionistas y entrenadores personales para prescribir planes alimentarios y entrenamientos personalizados, monitorear el progreso de clientes y gestionar consultas en una sola aplicación web y móvil.",
      jp: "栄養士とパーソナルトレーナーが、カスタマイズされた食事プランとトレーニングメニューを処方し、クライアントの進捗を追跡、予約を管理するための単一のWeb・モバイルアプリケーション。",
    },
    category: "SaaS",
    url: "https://movepro-ruddy.vercel.app/",
  },
]
