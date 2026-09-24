import type { Locale } from "@repo/i18n"

export type Localized = Record<Locale, string>

export type Experience = {
  company: string
  role: Localized
  period: Localized
  current?: boolean
  stack: string[]
  summary: Localized
  highlight?: Localized
  details: Localized[]
}

export const experiences: Experience[] = [
  {
    company: "Chattie",
    role: { pt: "Product Engineer", en: "Product Engineer", es: "Product Engineer", jp: "プロダクトエンジニア", fr: "Product Engineer" },
    period: {
      pt: "Jul 2026 — atual · Tempo integral · Remoto",
      en: "Jul 2026 — present · Full-time · Remote",
      es: "Jul 2026 — presente · Tiempo completo · Remoto",
      jp: "2026年7月 — 現在 · フルタイム · リモート",
      fr: "Juil. 2026 — aujourd'hui · Temps plein · À distance",
    },
    current: true,
    stack: ["React", "Next.js", "TypeScript", "Anthropic Claude", "Vercel AI SDK"],
    highlight: {
      pt: "Inbox: payload ~6,7 MB → ~19 KB (~400x)",
      en: "Inbox: payload ~6.7 MB → ~19 KB (~400x)",
      es: "Inbox: payload ~6,7 MB → ~19 KB (~400x)",
      jp: "インボックス：ペイロード 約6.7MB → 約19KB（約1/400）",
      fr: "Inbox : payload ~6,7 MB → ~19 KB (~400x)",
    },
    summary: {
      pt: "Atuo diretamente na evolução da frente de frontend de uma plataforma de outreach com IA usada por 165+ empresas, com foco em performance, escalabilidade e experiência do usuário.",
      en: "Working directly on the evolution of the frontend of an AI outreach platform used by 165+ companies, focused on performance, scalability and user experience.",
      es: "Actúo directamente en la evolución del frontend de una plataforma de outreach con IA usada por 165+ empresas, con foco en performance, escalabilidad y experiencia de usuario.",
      jp: "165社以上が利用するAIアウトリーチプラットフォームのフロントエンドの進化に直接携わる。パフォーマンス、スケーラビリティ、ユーザー体験に注力。",
      fr: "Je travaille directement à l'évolution du frontend d'une plateforme d'outreach avec IA utilisée par 165+ entreprises, avec un focus sur la performance, la scalabilité et l'expérience utilisateur.",
    },
    details: [
      {
        pt: "Responsável por iniciativas de performance e escalabilidade no frontend da plataforma",
        en: "Responsible for performance and scalability initiatives across the platform's frontend",
        es: "Responsable de iniciativas de performance y escalabilidad en el frontend de la plataforma",
        jp: "プラットフォームのフロントエンドにおけるパフォーマンスとスケーラビリティ施策を担当",
        fr: "Responsable d'initiatives de performance et de scalabilité sur le frontend de la plateforme",
      },
      {
        pt: "Reconstrução do inbox principal (~20.000 registros por workspace) com paginação cursor-based e virtualização de lista — payload inicial de ~6,7 MB para ~19 KB (~400x), eliminando travamentos de interface e carregamentos de vários segundos",
        en: "Rebuilt the platform's main inbox (~20,000 records per workspace) with cursor-based pagination and list virtualization — initial payload from ~6.7 MB to ~19 KB (~400x), eliminating UI freezes and multi-second loads",
        es: "Reconstrucción del inbox principal (~20.000 registros por workspace) con paginación cursor-based y virtualización de lista — payload inicial de ~6,7 MB a ~19 KB (~400x), eliminando bloqueos de interfaz y cargas de varios segundos",
        jp: "メインインボックス（ワークスペースあたり約20,000件）をカーソルベースのページネーションとリスト仮想化で再構築 — 初期ペイロードを約6.7MBから約19KBへ（約1/400）削減し、UIのフリーズと数秒かかる読み込みを解消",
        fr: "Reconstruction de l'inbox principale (~20 000 enregistrements par workspace) avec pagination cursor-based et virtualisation de liste — payload initial de ~6,7 MB à ~19 KB (~400x), éliminant les blocages de l'interface et les chargements de plusieurs secondes",
      },
      {
        pt: "Contribuição em decisões de arquitetura voltadas a escalabilidade e manutenibilidade, entregando features de ponta a ponta (design → produção)",
        en: "Contributing to architecture decisions focused on scalability and maintainability, shipping features end to end (design → production)",
        es: "Contribución en decisiones de arquitectura orientadas a escalabilidad y mantenibilidad, entregando features de punta a punta (diseño → producción)",
        jp: "スケーラビリティと保守性を重視したアーキテクチャの意思決定に貢献し、機能をエンドツーエンド（デザイン → 本番）で提供",
        fr: "Contribution aux décisions d'architecture axées sur la scalabilité et la maintenabilité, en livrant des fonctionnalités de bout en bout (design → production)",
      },
      {
        pt: "Atuação adicional em backend, sistemas de IA (Anthropic Claude, Vercel AI SDK) e confiabilidade, além do escopo principal de frontend",
        en: "Additional work on backend, AI systems (Anthropic Claude, Vercel AI SDK) and reliability, beyond the core frontend scope",
        es: "Trabajo adicional en backend, sistemas de IA (Anthropic Claude, Vercel AI SDK) y confiabilidad, más allá del alcance principal de frontend",
        jp: "主担当のフロントエンドに加え、バックエンド、AIシステム（Anthropic Claude、Vercel AI SDK）、信頼性にも従事",
        fr: "Travail complémentaire sur le backend, les systèmes d'IA (Anthropic Claude, Vercel AI SDK) et la fiabilité, au-delà du périmètre frontend principal",
      },
      {
        pt: "90%+ de cobertura de testes automatizados (unitários e de integração) nas features entregues",
        en: "Maintaining 90%+ automated test coverage (unit and integration) on shipped features",
        es: "90%+ de cobertura de tests automatizados (unitarios y de integración) en las features entregadas",
        jp: "提供する機能で90%以上の自動テストカバレッジ（ユニット・統合）を維持",
        fr: "90%+ de couverture de tests automatisés (unitaires et d'intégration) sur les fonctionnalités livrées",
      },
    ],
  },
  {
    company: "Holy Solutions",
    role: { pt: "Full Stack Developer", en: "Full Stack Developer", es: "Full Stack Developer", jp: "フルスタック開発者", fr: "Full Stack Developer" },
    period: {
      pt: "Nov 2025 — Jul 2026 · Contrato · Minas Gerais, Brasil · Remoto",
      en: "Nov 2025 — Jul 2026 · Contract · Minas Gerais, Brazil · Remote",
      es: "Nov 2025 — Jul 2026 · Contrato · Minas Gerais, Brasil · Remoto",
      jp: "2025年11月 — 2026年7月 · 業務委託 · ブラジル・ミナスジェライス州 · リモート",
      fr: "Nov. 2025 — Juil. 2026 · Contrat · Minas Gerais, Brésil · À distance",
    },
    stack: ["React", "Next.js", "React Native", "AWS", "Asaas"],
    summary: {
      pt: "Desenvolvimento de aplicações web e mobile utilizando React, Next.js e React Native, com foco em interfaces escaláveis e experiências centradas no usuário.",
      en: "Development of web and mobile applications using React, Next.js and React Native, focused on building scalable interfaces and user-centric experiences.",
      es: "Desarrollo de aplicaciones web y móviles con React, Next.js y React Native, enfocado en interfaces escalables y experiencias centradas en el usuario.",
      jp: "React、Next.js、React Native によるWeb・モバイルアプリケーション開発。スケーラブルなインターフェースとユーザー中心の体験に注力。",
      fr: "Développement d'applications web et mobiles en React, Next.js et React Native, avec un focus sur des interfaces scalables et des expériences centrées sur l'utilisateur.",
    },
    details: [
      {
        pt: "Desenvolvimento end-to-end de features com APIs externas, pagamentos e serviços com IA",
        en: "End-to-end feature development with external APIs, payment systems and AI-powered services",
        es: "Desarrollo end-to-end de features con APIs externas, pagos y servicios con IA",
        jp: "外部API、決済、AIサービスを用いた機能のエンドツーエンド開発",
        fr: "Développement de bout en bout de fonctionnalités avec des API externes, des paiements et des services avec IA",
      },
      {
        pt: "Desenvolvimento de interfaces web e mobile com React, Next.js e React Native",
        en: "Development of web and mobile interfaces with React, Next.js and React Native",
        es: "Desarrollo de interfaces web y móviles con React, Next.js y React Native",
        jp: "React、Next.js、React Native によるWeb・モバイルインターフェースの開発",
        fr: "Développement d'interfaces web et mobiles en React, Next.js et React Native",
      },
      {
        pt: "Integração com APIs externas e sistemas de pagamento (Asaas)",
        en: "Integration with external APIs and payment systems (Asaas)",
        es: "Integración con APIs externas y sistemas de pago (Asaas)",
        jp: "外部APIおよび決済システム（Asaas）との連携",
        fr: "Intégration avec des API externes et des systèmes de paiement (Asaas)",
      },
      {
        pt: "Criação de componentes reutilizáveis e padronização de Design System",
        en: "Creation of reusable components and Design System standardization",
        es: "Creación de componentes reutilizables y estandarización de Design System",
        jp: "再利用可能なコンポーネントの作成とデザインシステムの標準化",
        fr: "Création de composants réutilisables et standardisation du Design System",
      },
      {
        pt: "Participação em decisões técnicas de arquitetura frontend e integrações de sistemas",
        en: "Participation in technical decisions for frontend architecture and system integrations",
        es: "Participación en decisiones técnicas de arquitectura frontend e integraciones de sistemas",
        jp: "フロントエンドアーキテクチャおよびシステム連携の技術的意思決定への参加",
        fr: "Participation aux décisions techniques d'architecture frontend et d'intégrations de systèmes",
      },
      {
        pt: "Deploy e operação de aplicações em ambientes AWS",
        en: "Deployment and operation of applications in AWS cloud environments",
        es: "Deploy y operación de aplicaciones en ambientes AWS",
        jp: "AWS環境でのアプリケーションのデプロイと運用",
        fr: "Deploy et exploitation d'applications dans des environnements AWS",
      },
    ],
  },
  {
    company: "Aguiar Labs",
    role: { pt: "Senior Software Engineer", en: "Senior Software Engineer", es: "Senior Software Engineer", jp: "シニアソフトウェアエンジニア", fr: "Senior Software Engineer" },
    period: {
      pt: "Abr 2025 — Jul 2026 · Contrato · São Paulo, Brasil · Remoto",
      en: "Apr 2025 — Jul 2026 · Contract · São Paulo, Brazil · Remote",
      es: "Abr 2025 — Jul 2026 · Contrato · São Paulo, Brasil · Remoto",
      jp: "2025年4月 — 2026年7月 · 業務委託 · サンパウロ、ブラジル · リモート",
      fr: "Avr. 2025 — Juil. 2026 · Contrat · São Paulo, Brésil · À distance",
    },
    stack: ["React", "Next.js", "React Native", "Expo", "NestJS", "PostgreSQL", "Prisma"],
    highlight: {
      pt: "Hora Útil: Firestore → PostgreSQL sem parar a operação",
      en: "Hora Útil: Firestore → PostgreSQL with zero downtime",
      es: "Hora Útil: Firestore → PostgreSQL sin parar la operación",
      jp: "Hora Útil：稼働を止めずに Firestore → PostgreSQL",
      fr: "Hora Útil : Firestore → PostgreSQL sans interruption",
    },
    summary: {
      pt: "Engenharia sob contrato para plataformas de marketplace, gestão de frota e operações transacionais em produção, com entrega ponta a ponta: arquitetura, implementação, deploy e suporte.",
      en: "Contract engineering for marketplace, fleet management and transaction-based platforms in production, owning delivery end-to-end: architecture, implementation, deployment and support.",
      es: "Ingeniería bajo contrato para plataformas de marketplace, gestión de flota y operaciones transaccionales en producción, con entrega de punta a punta: arquitectura, implementación, deploy y soporte.",
      jp: "本番稼働中のマーケットプレイス、車両管理、取引基盤向けの受託エンジニアリング。アーキテクチャから実装、デプロイ、運用サポートまで一貫して担当。",
      fr: "Ingénierie sous contrat pour des plateformes de marketplace, de gestion de flotte et transactionnelles en production, avec une livraison de bout en bout : architecture, implémentation, déploiement et support.",
    },
    details: [
      {
        pt: "Hora Útil — ERP de frotas reconstruído sem interromper a operação: core migrado de Firestore para PostgreSQL módulo a módulo, seis produtos consolidados em um deploy multi-tenant, e módulo de RH conforme CLT com auditoria append-only por trigger",
        en: "Hora Útil — fleet ERP rebuilt without interrupting operations: core migrated from Firestore to PostgreSQL module by module, six products consolidated into one multi-tenant deployment, and a labour-law-compliant HR module with append-only auditing enforced by triggers",
        es: "Hora Útil — ERP de flotas reconstruido sin interrumpir la operación: core migrado de Firestore a PostgreSQL módulo a módulo, seis productos consolidados en un deploy multi-tenant, y módulo de RR.HH. conforme a la ley con auditoría append-only por triggers",
        jp: "Hora Útil — 稼働を止めずに再構築した車両ERP。コアを Firestore から PostgreSQL へモジュール単位で移行し、6つのプロダクトを単一のマルチテナント環境へ統合、トリガーによる追記専用監査を備えた労働法準拠の人事モジュールを実装",
        fr: "Hora Útil — ERP de flotte reconstruit sans interrompre l'exploitation : core migré de Firestore vers PostgreSQL module par module, six produits consolidés en un déploiement multi-tenant, et module RH conforme au droit du travail avec audit append-only par triggers",
      },
      {
        pt: "X-Drop — plataforma multi-tenant de automação de marketplace construída do zero, com integrações, pagamentos e fluxos de pedido em alto volume",
        en: "X-Drop — multi-tenant marketplace automation platform built end-to-end from scratch, with integrations, payments and high-volume order workflows",
        es: "X-Drop — plataforma multi-tenant de automatización de marketplace construida desde cero, con integraciones, pagos y flujos de pedido de alto volumen",
        jp: "X-Drop — ゼロから構築したマルチテナントのマーケットプレイス自動化基盤。連携、決済、大量の注文フローに対応",
        fr: "X-Drop — plateforme multi-tenant d'automatisation de marketplace construite de zéro, avec intégrations, paiements et flux de commandes à fort volume",
      },
      {
        pt: "MovePro — plataforma web e mobile usada por milhares de usuários, com Stripe, FatSecret, Google e Firebase, e monitoramento por Crashlytics, logs e métricas",
        en: "MovePro — web and mobile platform used by thousands of users, with Stripe, FatSecret, Google and Firebase, monitored through Crashlytics, logs and metrics",
        es: "MovePro — plataforma web y móvil usada por miles de usuarios, con Stripe, FatSecret, Google y Firebase, y monitoreo por Crashlytics, logs y métricas",
        jp: "MovePro — 数千人が利用するWeb・モバイル基盤。Stripe、FatSecret、Google、Firebase と連携し、Crashlytics、ログ、メトリクスで監視",
        fr: "MovePro — plateforme web et mobile utilisée par des milliers d'utilisateurs, avec Stripe, FatSecret, Google et Firebase, monitorée via Crashlytics, logs et métriques",
      },
      {
        pt: "Processamento assíncrono e integrações de terceiros sobre APIs e webhooks, com idempotência, retries e tolerância a falha em produção",
        en: "Asynchronous processing and third-party integrations over APIs and webhooks, with idempotency, retries and fault tolerance in production",
        es: "Procesamiento asíncrono e integraciones de terceros sobre APIs y webhooks, con idempotencia, retries y tolerancia a fallos en producción",
        jp: "APIとWebhook上での非同期処理とサードパーティ連携。冪等性、リトライ、本番環境での障害耐性を備える",
        fr: "Traitement asynchrone et intégrations tierces via API et webhooks, avec idempotence, retries et tolérance aux pannes en production",
      },
    ],
  },
  {
    company: "Easytogo",
    role: { pt: "Software Engineer", en: "Software Engineer", es: "Software Engineer", jp: "ソフトウェアエンジニア", fr: "Software Engineer" },
    period: {
      pt: "Abr 2025 — Jun 2025 · Tempo integral · Híbrido",
      en: "Apr 2025 — Jun 2025 · Full-time · Hybrid",
      es: "Abr 2025 — Jun 2025 · Tiempo completo · Híbrido",
      jp: "2025年4月 — 2025年6月 · フルタイム · ハイブリッド",
      fr: "Avr. 2025 — Juin 2025 · Temps plein · Hybride",
    },
    stack: ["React", "Next.js", "React Native", "Flutter"],
    summary: {
      pt: "Desenvolvimento web e mobile para aplicações de delivery, hubs logísticos, dropshipping, CRM, fidelidade e catálogo de produtos.",
      en: "Web and mobile development for delivery, logistics hubs, dropshipping, CRM, loyalty and product catalog applications.",
      es: "Desarrollo web y móvil para aplicaciones de delivery, hubs logísticos, dropshipping, CRM, fidelidad y catálogo de productos.",
      jp: "デリバリー、物流ハブ、ドロップシッピング、CRM、ロイヤルティ、商品カタログ向けのWeb・モバイル開発。",
      fr: "Développement web et mobile pour des applications de livraison, hubs logistiques, dropshipping, CRM, fidélité et catalogue produits.",
    },
    details: [
      {
        pt: "Integração com APIs de Mercado Livre, Shopee, Google Analytics e Meta",
        en: "Integrations with Mercado Livre, Shopee, Google Analytics and Meta APIs",
        es: "Integración con APIs de Mercado Libre, Shopee, Google Analytics y Meta",
        jp: "Mercado Livre、Shopee、Google Analytics、Meta の API との連携",
        fr: "Intégrations avec les API de Mercado Livre, Shopee, Google Analytics et Meta",
      },
      {
        pt: "Publicação e manutenção de aplicações na Google Play, com ciclo de release e conformidade da loja",
        en: "Published and maintained applications on Google Play, owning the release cycle and store compliance",
        es: "Publicación y mantenimiento de aplicaciones en Google Play, con ciclo de release y conformidad de la tienda",
        jp: "Google Play でのアプリ公開と保守。リリースサイクルとストア要件への準拠を担当",
        fr: "Publication et maintenance d'applications sur Google Play, avec cycle de release et conformité du store",
      },
      {
        pt: "Entrega de features para projetos internacionais, adaptando soluções a mercados diferentes",
        en: "Delivered features for international projects, adapting solutions to different markets",
        es: "Entrega de features para proyectos internacionales, adaptando soluciones a mercados diferentes",
        jp: "国際プロジェクト向けの機能を提供し、異なる市場に合わせて対応",
        fr: "Livraison de fonctionnalités pour des projets internationaux, en adaptant les solutions à différents marchés",
      },
    ],
  },
  {
    company: "Easytogo",
    role: { pt: "Web Developer / Mobile Developer", en: "Web Developer / Mobile Developer", es: "Web Developer / Mobile Developer", jp: "Web開発者 / モバイル開発者", fr: "Web Developer / Mobile Developer" },
    period: {
      pt: "Mai 2024 — Abr 2025 · Híbrido",
      en: "May 2024 — Apr 2025 · Hybrid",
      es: "May 2024 — Abr 2025 · Híbrido",
      jp: "2024年5月 — 2025年4月 · ハイブリッド",
      fr: "Mai 2024 — Avr. 2025 · Hybride",
    },
    stack: ["React", "Next.js", "React Native", "Flutter"],
    summary: {
      pt: "Desenvolvimento de interfaces web e mobile com React, Next.js, React Native e Flutter em ambiente ágil e orientado a produto.",
      en: "Development of responsive web and mobile interfaces using React, Next.js, React Native and Flutter in an agile and product-oriented environment.",
      es: "Desarrollo de interfaces web y móviles con React, Next.js, React Native y Flutter en ambiente ágil y orientado a producto.",
      jp: "アジャイルかつプロダクト志向の環境で、React、Next.js、React Native、Flutter によるWeb・モバイルインターフェースの開発。",
      fr: "Développement d'interfaces web et mobiles en React, Next.js, React Native et Flutter dans un environnement agile et orienté produit.",
    },
    details: [
      {
        pt: "Desenvolvimento com React e Next.js",
        en: "Development with React and Next.js",
        es: "Desarrollo con React y Next.js",
        jp: "React と Next.js による開発",
        fr: "Développement en React et Next.js",
      },
      {
        pt: "Aplicações mobile com React Native e Flutter",
        en: "Mobile applications with React Native and Flutter",
        es: "Aplicaciones móviles con React Native y Flutter",
        jp: "React Native と Flutter によるモバイルアプリケーション",
        fr: "Applications mobiles en React Native et Flutter",
      },
      {
        pt: "Integração com APIs conectadas a fluxos reais de usuário",
        en: "API integrations connected to real-world user workflows",
        es: "Integración con APIs conectadas a flujos reales de usuario",
        jp: "実際のユーザーフローに接続されたAPIとの連携",
        fr: "Intégration avec des API connectées à des flux utilisateur réels",
      },
      {
        pt: "Trabalho em ambiente ágil com Scrum",
        en: "Agile teamwork using Scrum",
        es: "Trabajo en ambiente ágil con Scrum",
        jp: "Scrum によるアジャイル環境での業務",
        fr: "Travail dans un environnement agile avec Scrum",
      },
    ],
  },
  {
    company: "Stealth Startup",
    role: { pt: "Founding Engineer", en: "Founding Engineer", es: "Founding Engineer", jp: "ファウンディングエンジニア", fr: "Founding Engineer" },
    period: {
      pt: "Fev 2022 — Mai 2024 · Autônomo",
      en: "Feb 2022 — May 2024 · Self-employed",
      es: "Feb 2022 — May 2024 · Autónomo",
      jp: "2022年2月 — 2024年5月 · 自営",
      fr: "Févr. 2022 — Mai 2024 · Indépendant",
    },
    stack: ["React", "React Native", "Node.js"],
    summary: {
      pt: "Prototipagem de um aplicativo de delivery, web e mobile, da arquitetura à implementação, em paralelo à graduação em Análise e Desenvolvimento de Sistemas.",
      en: "Prototyped a delivery application, web and mobile, from architecture through implementation, while studying Systems Analysis and Development.",
      es: "Prototipado de una aplicación de delivery, web y móvil, de la arquitectura a la implementación, en paralelo a la carrera de Análisis y Desarrollo de Sistemas.",
      jp: "システム分析・開発を学びながら、配送アプリケーションのWeb・モバイル版をアーキテクチャから実装まで試作。",
      fr: "Prototypage d'une application de livraison, web et mobile, de l'architecture à l'implémentation, en parallèle des études en Analyse et Développement de Systèmes.",
    },
    details: [
      {
        pt: "Aplicativo de delivery web e mobile, da arquitetura à implementação",
        en: "Delivery application, web and mobile, from architecture through implementation",
        es: "Aplicación de delivery web y móvil, de la arquitectura a la implementación",
        jp: "配送アプリケーションのWeb・モバイル版を、アーキテクチャから実装まで",
        fr: "Application de livraison web et mobile, de l'architecture à l'implémentation",
      },
      {
        pt: "Projetos freelance de web e mobile para pequenos negócios",
        en: "Freelance web and mobile projects for small businesses",
        es: "Proyectos freelance de web y móvil para pequeños negocios",
        jp: "小規模事業者向けのWeb・モバイルのフリーランス案件",
        fr: "Projets freelance web et mobile pour de petites entreprises",
      },
    ],
  },
]
