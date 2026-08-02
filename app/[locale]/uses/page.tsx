import { getLocale, t } from "@/lib/i18n-server"
import { buildAlternates, type Locale } from "@/lib/i18n"
import Link from "next/link"
import { EditorConfigSheet } from "@/components/editor-config-sheet"

export async function generateMetadata() {
  const locale = await getLocale()
  return {
    title: t(locale, { pt: "Ferramentas", en: "Uses", es: "Herramientas", jp: "ツール", fr: "Outils" }),
    description: t(locale, { pt: "Ferramentas, apps e setup que uso no dia a dia como Frontend Engineer.", en: "Tools, apps and setup I use daily as a Frontend Engineer.", es: "Herramientas, apps y setup que uso día a día como Frontend Engineer.", jp: "フロントエンドエンジニアとして日常的に使用するツール、アプリ、セットアップ。", fr: "Outils, apps et setup que j'utilise au quotidien en tant que Frontend Engineer." }),
    alternates: buildAlternates("/uses", locale),
  }
}

type UsesItem = {
  name: string
  url?: string
  desc: Partial<Record<Locale, string>> & { pt: string }
}

type UsesCategory = {
  title: Partial<Record<Locale, string>> & { pt: string }
  items: UsesItem[]
}

const categories: UsesCategory[] = [
  {
    title: { pt: "Editor e Coding", en: "Editor & Coding", es: "Editor y Coding", jp: "エディタとコーディング", fr: "Éditeur et Coding" },
    items: [
      {
        name: "VS Code",
        url: "https://code.visualstudio.com/",
        desc: {
          pt: "Editor principal. Extensões: ESLint, Tailwind IntelliSense, Prettier, GitLens.",
          en: "Main editor. Extensions: ESLint, Tailwind IntelliSense, Prettier, GitLens.",
          es: "Editor principal. Extensiones: ESLint, Tailwind IntelliSense, Prettier, GitLens.",
          jp: "メインエディタ。拡張機能：ESLint、Tailwind IntelliSense、Prettier、GitLens。",
          fr: "Éditeur principal. Extensions : ESLint, Tailwind IntelliSense, Prettier, GitLens.",
        },
      },
      {
        name: "Cursor",
        url: "https://cursor.sh/",
        desc: {
          pt: "Editor com IA integrada. Uso como segundo editor para tarefas que exigem contexto de codebase.",
          en: "AI-powered editor. I use it as a secondary editor for tasks that require codebase context.",
          es: "Editor con IA integrada. Lo uso como segundo editor para tareas que requieren contexto de codebase.",
          jp: "AI統合エディタ。コードベースの文脈が必要なタスク用のセカンドエディタとして使用。",
          fr: "Éditeur avec IA intégrée. Je l'utilise comme second éditeur pour les tâches qui nécessitent le contexte de la codebase.",
        },
      },
      {
        name: "GitHub Theme",
        url: "https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme",
        desc: {
          pt: "Tema principal na IDE. Clean, bom contraste e familiar.",
          en: "Main IDE theme. Clean, good contrast and familiar.",
          es: "Tema principal en la IDE. Clean, buen contraste y familiar.",
          jp: "IDEのメインテーマ。クリーンで、コントラストが良く、馴染みやすい。",
          fr: "Thème principal de l'IDE. Clean, bon contraste et familier.",
        },
      },
      {
        name: "Claude Code",
        url: "https://claude.ai/code",
        desc: {
          pt: "Assistente de IA para engenharia — implementação, review e exploração de codebase.",
          en: "AI assistant for engineering — implementation, review and codebase exploration.",
          es: "Asistente de IA para ingeniería — implementación, review y exploración de codebase.",
          jp: "エンジニアリング向けのAIアシスタント — 実装、レビュー、コードベースの探索。",
          fr: "Assistant IA pour l'ingénierie — implémentation, review et exploration de codebase.",
        },
      },
      {
        name: "OpenAI Codex",
        url: "https://openai.com/index/codex/",
        desc: {
          pt: "Agente de código da OpenAI. Uso para tarefas assíncronas e geração de código.",
          en: "OpenAI's coding agent. I use it for async tasks and code generation.",
          es: "Agente de código de OpenAI. Lo uso para tareas asíncronas y generación de código.",
          jp: "OpenAIのコーディングエージェント。非同期タスクとコード生成に使用。",
          fr: "Agent de code d'OpenAI. Je l'utilise pour des tâches asynchrones et de la génération de code.",
        },
      },
      {
        name: "JetBrains Mono",
        url: "https://www.jetbrains.com/lp/mono/",
        desc: {
          pt: "Fonte monospace no editor e terminal. Ligatures que facilitam leitura de código.",
          en: "Monospace font in editor and terminal. Ligatures that make code easier to read.",
          es: "Fuente monospace en editor y terminal. Ligatures que facilitan la lectura de código.",
          jp: "エディタとターミナルの等幅フォント。コードを読みやすくするリガチャ付き。",
          fr: "Police monospace dans l'éditeur et le terminal. Ligatures qui facilitent la lecture du code.",
        },
      },
    ],
  },
  {
    title: { pt: "Terminal", en: "Terminal", es: "Terminal", jp: "ターミナル", fr: "Terminal" },
    items: [
      {
        name: "Warp",
        url: "https://www.warp.dev/",
        desc: {
          pt: "Terminal principal. Rápido, com autocomplete inteligente e blocos de comando.",
          en: "Main terminal. Fast, with smart autocomplete and command blocks.",
          es: "Terminal principal. Rápido, con autocomplete inteligente y bloques de comando.",
          jp: "メインターミナル。高速で、スマートな自動補完とコマンドブロックを備える。",
          fr: "Terminal principal. Rapide, avec autocomplete intelligent et blocs de commande.",
        },
      },
      {
        name: "iTerm2",
        url: "https://iterm2.com/",
        desc: {
          pt: "Terminal secundário. Split panes e perfis por projeto.",
          en: "Secondary terminal. Split panes and per-project profiles.",
          es: "Terminal secundario. Split panes y perfiles por proyecto.",
          jp: "セカンドターミナル。分割ペインとプロジェクトごとのプロファイル。",
          fr: "Terminal secondaire. Split panes et profils par projet.",
        },
      },
      {
        name: "Fish Shell",
        url: "https://fishshell.com/",
        desc: {
          pt: "Shell com autosugestões e syntax highlighting out of the box. Sem configuração.",
          en: "Shell with autosuggestions and syntax highlighting out of the box. Zero config.",
          es: "Shell con autosugerencias y syntax highlighting listo para usar. Sin configuración.",
          jp: "自動補完とシンタックスハイライトを標準装備したシェル。設定不要。",
          fr: "Shell avec autosuggestions et syntax highlighting prêt à l'emploi. Sans configuration.",
        },
      },
      {
        name: "Zsh + Oh My Zsh",
        url: "https://ohmyz.sh/",
        desc: {
          pt: "Shell alternativo com plugins e aliases para git e navegação.",
          en: "Alternative shell with plugins and aliases for git and navigation.",
          es: "Shell alternativo con plugins y aliases para git y navegación.",
          jp: "git とナビゲーション用のプラグインとエイリアスを備えた代替シェル。",
          fr: "Shell alternatif avec plugins et aliases pour git et navigation.",
        },
      },
      {
        name: "nvm",
        url: "https://github.com/nvm-sh/nvm",
        desc: {
          pt: "Gerenciador de versões do Node.js. Troco entre Node 20 e 24 dependendo do projeto.",
          en: "Node.js version manager. I switch between Node 20 and 24 depending on the project.",
          es: "Gestor de versiones de Node.js. Cambio entre Node 20 y 24 dependiendo del proyecto.",
          jp: "Node.js のバージョン管理ツール。プロジェクトに応じて Node 20 と 24 を切り替え。",
          fr: "Gestionnaire de versions de Node.js. Je bascule entre Node 20 et 24 selon le projet.",
        },
      },
    ],
  },
  {
    title: { pt: "Stack de desenvolvimento", en: "Development Stack", es: "Stack de desarrollo", jp: "開発スタック", fr: "Stack de développement" },
    items: [
      {
        name: "Next.js",
        url: "https://nextjs.org/",
        desc: {
          pt: "Framework principal para web. App Router, Server Components, Turbopack.",
          en: "Main web framework. App Router, Server Components, Turbopack.",
          es: "Framework principal para web. App Router, Server Components, Turbopack.",
          jp: "Web のメインフレームワーク。App Router、Server Components、Turbopack。",
          fr: "Framework principal pour le web. App Router, Server Components, Turbopack.",
        },
      },
      {
        name: "React / React Native",
        url: "https://react.dev/",
        desc: {
          pt: "Base de todos os projetos web e mobile. Hooks, Context, Server Components.",
          en: "Foundation of all web and mobile projects. Hooks, Context, Server Components.",
          es: "Base de todos los proyectos web y móviles. Hooks, Context, Server Components.",
          jp: "すべての Web・モバイルプロジェクトの基盤。Hooks、Context、Server Components。",
          fr: "Base de tous les projets web et mobile. Hooks, Context, Server Components.",
        },
      },
      {
        name: "TypeScript",
        url: "https://www.typescriptlang.org/",
        desc: {
          pt: "Uso em 100% dos projetos. Tipagem forte que evita bugs em produção.",
          en: "Used in 100% of projects. Strong typing that prevents production bugs.",
          es: "Uso en 100% de los proyectos. Tipado fuerte que evita bugs en producción.",
          jp: "全プロジェクトで使用。本番のバグを防ぐ強い型付け。",
          fr: "Utilisé dans 100% des projets. Typage fort qui évite les bugs en production.",
        },
      },
      {
        name: "Tailwind CSS",
        url: "https://tailwindcss.com/",
        desc: {
          pt: "Utility-first CSS. Produtividade alta e consistência visual sem CSS custom.",
          en: "Utility-first CSS. High productivity and visual consistency without custom CSS.",
          es: "Utility-first CSS. Alta productividad y consistencia visual sin CSS custom.",
          jp: "ユーティリティファースト CSS。カスタム CSS なしで高い生産性と視覚的一貫性。",
          fr: "Utility-first CSS. Productivité élevée et cohérence visuelle sans CSS custom.",
        },
      },
      {
        name: "Shadcn UI",
        url: "https://ui.shadcn.com/",
        desc: {
          pt: "Componentes Radix UI com controle total do código. Base do design system.",
          en: "Radix UI components with full code ownership. Design system foundation.",
          es: "Componentes Radix UI con control total del código. Base del design system.",
          jp: "コードを完全に所有できる Radix UI コンポーネント。デザインシステムの基盤。",
          fr: "Composants Radix UI avec contrôle total du code. Base du design system.",
        },
      },
      {
        name: "Node.js",
        url: "https://nodejs.org/",
        desc: {
          pt: "Runtime para backend e APIs. Express, Fastify ou API routes do Next.js.",
          en: "Backend and API runtime. Express, Fastify or Next.js API routes.",
          es: "Runtime para backend y APIs. Express, Fastify o API routes de Next.js.",
          jp: "バックエンドと API のランタイム。Express、Fastify、または Next.js の API ルート。",
          fr: "Runtime pour backend et APIs. Express, Fastify ou API routes de Next.js.",
        },
      },
      {
        name: "PostgreSQL",
        url: "https://www.postgresql.org/",
        desc: {
          pt: "Banco principal. Multi-tenant com RLS, pgVector para IA, transações atômicas.",
          en: "Main database. Multi-tenant with RLS, pgVector for AI, atomic transactions.",
          es: "Base de datos principal. Multi-tenant con RLS, pgVector para IA, transacciones atómicas.",
          jp: "メインデータベース。RLS によるマルチテナント、AI 用の pgVector、アトミックトランザクション。",
          fr: "Base de données principale. Multi-tenant avec RLS, pgVector pour l'IA, transactions atomiques.",
        },
      },
      {
        name: "MongoDB",
        url: "https://www.mongodb.com/",
        desc: {
          pt: "Banco NoSQL para projetos com dados flexíveis e alta velocidade de leitura.",
          en: "NoSQL database for projects with flexible data and high read speed.",
          es: "Base de datos NoSQL para proyectos con datos flexibles y alta velocidad de lectura.",
          jp: "柔軟なデータと高速な読み取りが必要なプロジェクト向けの NoSQL データベース。",
          fr: "Base de données NoSQL pour les projets avec des données flexibles et une vitesse de lecture élevée.",
        },
      },
      {
        name: "Firebase",
        url: "https://firebase.google.com/",
        desc: {
          pt: "Auth, Firestore, Cloud Functions e push notifications em projetos mobile.",
          en: "Auth, Firestore, Cloud Functions and push notifications in mobile projects.",
          es: "Auth, Firestore, Cloud Functions y push notifications en proyectos mobile.",
          jp: "モバイルプロジェクトでの認証、Firestore、Cloud Functions、プッシュ通知。",
          fr: "Auth, Firestore, Cloud Functions et push notifications dans les projets mobile.",
        },
      },
    ],
  },
  {
    title: { pt: "Apps", en: "Apps", es: "Apps", jp: "アプリ", fr: "Apps" },
    items: [
      {
        name: "Google Chrome",
        url: "https://www.google.com/chrome/",
        desc: {
          pt: "Browser principal. DevTools, perfis separados e extensões para dev.",
          en: "Main browser. DevTools, separate profiles and dev extensions.",
          es: "Navegador principal. DevTools, perfiles separados y extensiones para dev.",
          jp: "メインブラウザ。DevTools、分離したプロファイル、開発用拡張機能。",
          fr: "Navigateur principal. DevTools, profils séparés et extensions pour dev.",
        },
      },
      {
        name: "ChatGPT",
        url: "https://chat.openai.com/",
        desc: {
          pt: "Uso para pesquisa, brainstorm e geração de conteúdo fora do código.",
          en: "Used for research, brainstorming and content generation outside of code.",
          es: "Lo uso para investigación, brainstorm y generación de contenido fuera del código.",
          jp: "コード以外のリサーチ、ブレインストーミング、コンテンツ生成に使用。",
          fr: "Je l'utilise pour la recherche, le brainstorm et la génération de contenu en dehors du code.",
        },
      },
      {
        name: "Figma",
        url: "https://www.figma.com/",
        desc: {
          pt: "Design e prototipação. Consulto designs antes de implementar.",
          en: "Design and prototyping. I review designs before implementing.",
          es: "Diseño y prototipado. Consulto diseños antes de implementar.",
          jp: "デザインとプロトタイピング。実装前にデザインを確認。",
          fr: "Design et prototypage. Je consulte les designs avant d'implémenter.",
        },
      },
      {
        name: "Notion",
        url: "https://www.notion.so/",
        desc: {
          pt: "Base de conhecimento pessoal, notas de projetos e documentação.",
          en: "Personal knowledge base, project notes and documentation.",
          es: "Base de conocimiento personal, notas de proyectos y documentación.",
          jp: "個人のナレッジベース、プロジェクトメモ、ドキュメント。",
          fr: "Base de connaissances personnelle, notes de projets et documentation.",
        },
      },
      {
        name: "Postman",
        url: "https://www.postman.com/",
        desc: {
          pt: "Teste de APIs REST. Collections organizadas por projeto.",
          en: "REST API testing. Collections organized by project.",
          es: "Testing de APIs REST. Collections organizadas por proyecto.",
          jp: "REST API のテスト。プロジェクトごとに整理したコレクション。",
          fr: "Test d'APIs REST. Collections organisées par projet.",
        },
      },
      {
        name: "Slack / Discord",
        desc: {
          pt: "Comunicação com times e comunidades de dev.",
          en: "Communication with teams and dev communities.",
          es: "Comunicación con equipos y comunidades de dev.",
          jp: "チームや開発コミュニティとのコミュニケーション。",
          fr: "Communication avec les équipes et communautés de dev.",
        },
      },
    ],
  },
  {
    title: { pt: "Serviços e infra", en: "Services & Infra", es: "Servicios e infra", jp: "サービスとインフラ", fr: "Services et infra" },
    items: [
      {
        name: "Vercel",
        url: "https://vercel.com/",
        desc: {
          pt: "Deploy de projetos Next.js. Preview automático em PRs, zero config.",
          en: "Next.js project deploys. Automatic preview on PRs, zero config.",
          es: "Deploy de proyectos Next.js. Preview automático en PRs, zero config.",
          jp: "Next.js プロジェクトのデプロイ。PR で自動プレビュー、設定不要。",
          fr: "Deploy de projets Next.js. Preview automatique sur les PRs, zero config.",
        },
      },
      {
        name: "Render",
        url: "https://render.com/",
        desc: {
          pt: "Deploy de APIs, workers e serviços backend. Alternativa simples ao AWS para projetos menores.",
          en: "API, worker and backend service deploys. Simple AWS alternative for smaller projects.",
          es: "Deploy de APIs, workers y servicios backend. Alternativa simple a AWS para proyectos menores.",
          jp: "API、ワーカー、バックエンドサービスのデプロイ。小規模プロジェクト向けのシンプルな AWS 代替。",
          fr: "Deploy d'APIs, workers et services backend. Alternative simple à AWS pour les petits projets.",
        },
      },
      {
        name: "GitHub",
        url: "https://github.com/",
        desc: {
          pt: "Repositórios, PRs, Actions (CI/CD), code review. Centro de tudo.",
          en: "Repositories, PRs, Actions (CI/CD), code review. Center of everything.",
          es: "Repositorios, PRs, Actions (CI/CD), code review. Centro de todo.",
          jp: "リポジトリ、PR、Actions（CI/CD）、コードレビュー。すべての中心。",
          fr: "Dépôts, PRs, Actions (CI/CD), code review. Centre de tout.",
        },
      },
      {
        name: "AWS",
        url: "https://aws.amazon.com/",
        desc: {
          pt: "EC2, S3, CloudFront para projetos que precisam de infra própria.",
          en: "EC2, S3, CloudFront for projects that need custom infrastructure.",
          es: "EC2, S3, CloudFront para proyectos que necesitan infraestructura propia.",
          jp: "独自インフラが必要なプロジェクト向けの EC2、S3、CloudFront。",
          fr: "EC2, S3, CloudFront pour les projets qui ont besoin d'une infra propre.",
        },
      },
      {
        name: "Cloudflare",
        url: "https://www.cloudflare.com/",
        desc: {
          pt: "DNS, CDN e proteção. Uso para domínios e performance de entrega.",
          en: "DNS, CDN and protection. Used for domains and delivery performance.",
          es: "DNS, CDN y protección. Uso para dominios y rendimiento de entrega.",
          jp: "DNS、CDN、保護。ドメインと配信パフォーマンスに使用。",
          fr: "DNS, CDN et protection. Je l'utilise pour les domaines et la performance de livraison.",
        },
      },
      {
        name: "Hostinger",
        url: "https://www.hostinger.com.br/",
        desc: {
          pt: "Hospedagem e domínios para projetos de clientes e sites institucionais.",
          en: "Hosting and domains for client projects and institutional sites.",
          es: "Hosting y dominios para proyectos de clientes y sitios institucionales.",
          jp: "クライアントプロジェクトや企業サイト向けのホスティングとドメイン。",
          fr: "Hébergement et domaines pour les projets clients et sites institutionnels.",
        },
      },
      {
        name: "Docker",
        url: "https://www.docker.com/",
        desc: {
          pt: "Containerização para ambientes de dev consistentes e deploy em produção.",
          en: "Containerization for consistent dev environments and production deploys.",
          es: "Containerización para ambientes de dev consistentes y deploy en producción.",
          jp: "一貫した開発環境と本番デプロイのためのコンテナ化。",
          fr: "Conteneurisation pour des environnements de dev cohérents et déploiement en production.",
        },
      },
      {
        name: "Resend",
        url: "https://resend.com/",
        desc: {
          pt: "API de email transacional. Simples, moderna e com boa DX.",
          en: "Transactional email API. Simple, modern and great DX.",
          es: "API de email transaccional. Simple, moderna y con buena DX.",
          jp: "トランザクションメール API。シンプルでモダン、優れた DX。",
          fr: "API d'e-mail transactionnel. Simple, moderne et avec une bonne DX.",
        },
      },
      {
        name: "Stripe / Mercado Pago / Asaas",
        desc: {
          pt: "Provedores de pagamento. PIX, cartão, assinaturas recorrentes.",
          en: "Payment providers. PIX, card, recurring subscriptions.",
          es: "Proveedores de pago. PIX, tarjeta, suscripciones recurrentes.",
          jp: "決済プロバイダー。PIX、カード、定期サブスクリプション。",
          fr: "Fournisseurs de paiement. PIX, carte, abonnements récurrents.",
        },
      },
    ],
  },
  {
    title: { pt: "Hardware", en: "Hardware", es: "Hardware", jp: "ハードウェア", fr: "Hardware" },
    items: [
      {
        name: "MacBook Air M2",
        url: "https://www.apple.com/macbook-air/",
        desc: {
          pt: "Máquina principal. Apple Silicon M2, 16GB RAM, 256GB SSD. Silencioso e leve.",
          en: "Main machine. Apple Silicon M2, 16GB RAM, 256GB SSD. Silent and lightweight.",
          es: "Máquina principal. Apple Silicon M2, 16GB RAM, 256GB SSD. Silencioso y liviano.",
          jp: "メインマシン。Apple Silicon M2、16GB RAM、256GB SSD。静かで軽量。",
          fr: "Machine principale. Apple Silicon M2, 16GB RAM, 256GB SSD. Silencieux et léger.",
        },
      },
    ],
  },
]

export default async function UsesPage() {
  const locale = await getLocale()

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {t(locale, { pt: "Ferramentas. Apps. Setup.", en: "Tools. Apps. Setup.", es: "Herramientas. Apps. Setup.", jp: "ツール。アプリ。セットアップ。", fr: "Outils. Apps. Setup." })}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          {t(locale, { pt: "Esta não é uma página estática — é um documento vivo com tudo que uso atualmente como Frontend Engineer.", en: "This is not a static page — it's a living document with everything I currently use as a Frontend Engineer.", es: "Esta no es una página estática — es un documento vivo con todo lo que uso actualmente como Frontend Engineer.", jp: "これは静的なページではなく、フロントエンドエンジニアとして現在使用しているもの全てをまとめた生きたドキュメントです。", fr: "Ceci n'est pas une page statique — c'est un document vivant avec tout ce que j'utilise actuellement en tant que Frontend Engineer." })}
        </p>
      </header>

      <div className="space-y-10">
        {categories.map((cat) => (
          <section key={cat.title.en}>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-lg font-semibold">
                {cat.title[locale] ?? cat.title.pt}
              </h2>
              <div className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-4">
              {cat.items.map((item) => (
                <div key={item.name} className="flex items-start gap-3">
                  <span className="text-muted-foreground mt-0.5 select-none">-</span>
                  <div>
                    {item.url ? (
                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:underline"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <span className="text-sm font-medium">{item.name}</span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      {" — "}
                      {item.desc[locale] ?? item.desc.pt}
                    </span>
                  </div>
                </div>
              ))}
              {cat.title.en === "Editor & Coding" && (
                <div className="flex items-start gap-3">
                  <span className="text-muted-foreground mt-0.5 select-none">-</span>
                  <EditorConfigSheet
                    label={t(locale, { pt: "Ver meu settings.json", en: "View my settings.json", es: "Ver mi settings.json", jp: "settings.jsonを見る", fr: "Voir mon settings.json" })}
                    description={t(locale, { pt: "Configurações do VS Code que uso no dia a dia.", en: "VS Code settings I use daily.", es: "Configuraciones de VS Code que uso día a día.", jp: "日常的に使用しているVS Codeの設定。", fr: "Configurations de VS Code que j'utilise au quotidien." })}
                  />
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
