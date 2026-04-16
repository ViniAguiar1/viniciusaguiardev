import { getLocale, t } from "@/lib/i18n-server"
import Link from "next/link"

export async function generateMetadata() {
  const locale = await getLocale()
  return {
    title: "Uses",
    description: t(
      locale,
      "Ferramentas, apps e setup que uso no dia a dia como engenheiro de software.",
      "Tools, apps and setup I use daily as a Software Engineer.",
      "Herramientas, apps y setup que uso día a día como ingeniero de software."
    ),
  }
}

type UsesItem = {
  name: string
  url?: string
  desc: { pt: string; en: string; es: string }
}

type UsesCategory = {
  title: { pt: string; en: string; es: string }
  items: UsesItem[]
}

const categories: UsesCategory[] = [
  {
    title: { pt: "Editor e Coding", en: "Editor & Coding", es: "Editor y Coding" },
    items: [
      {
        name: "VS Code",
        url: "https://code.visualstudio.com/",
        desc: {
          pt: "Editor principal. Extensões essenciais: ESLint, Tailwind IntelliSense, Prettier, GitLens.",
          en: "Main editor. Essential extensions: ESLint, Tailwind IntelliSense, Prettier, GitLens.",
          es: "Editor principal. Extensiones esenciales: ESLint, Tailwind IntelliSense, Prettier, GitLens.",
        },
      },
      {
        name: "Claude Code",
        url: "https://claude.ai/code",
        desc: {
          pt: "Assistente de IA para engenharia — uso para implementação, review e exploração de codebase.",
          en: "AI assistant for engineering — I use it for implementation, review and codebase exploration.",
          es: "Asistente de IA para ingeniería — lo uso para implementación, review y exploración de codebase.",
        },
      },
      {
        name: "GitHub Copilot",
        url: "https://github.com/features/copilot",
        desc: {
          pt: "Autocomplete com IA integrado ao VS Code para acelerar escrita de código.",
          en: "AI-powered autocomplete integrated into VS Code to speed up code writing.",
          es: "Autocomplete con IA integrado en VS Code para acelerar la escritura de código.",
        },
      },
      {
        name: "Geist (fonte)",
        url: "https://vercel.com/font",
        desc: {
          pt: "Fonte sans-serif da Vercel. Uso tanto no editor quanto neste site.",
          en: "Sans-serif font by Vercel. I use it both in the editor and on this site.",
          es: "Fuente sans-serif de Vercel. La uso tanto en el editor como en este sitio.",
        },
      },
    ],
  },
  {
    title: { pt: "Terminal", en: "Terminal", es: "Terminal" },
    items: [
      {
        name: "iTerm2",
        url: "https://iterm2.com/",
        desc: {
          pt: "Terminal principal no macOS. Split panes, perfis por projeto e integração com zsh.",
          en: "Main terminal on macOS. Split panes, per-project profiles and zsh integration.",
          es: "Terminal principal en macOS. Split panes, perfiles por proyecto e integración con zsh.",
        },
      },
      {
        name: "Zsh + Oh My Zsh",
        url: "https://ohmyz.sh/",
        desc: {
          pt: "Shell com plugins e aliases que aceleram o workflow de git e navegação.",
          en: "Shell with plugins and aliases that speed up git workflow and navigation.",
          es: "Shell con plugins y aliases que aceleran el workflow de git y navegación.",
        },
      },
      {
        name: "nvm",
        url: "https://github.com/nvm-sh/nvm",
        desc: {
          pt: "Gerenciador de versões do Node.js. Troco entre Node 20 e 24 dependendo do projeto.",
          en: "Node.js version manager. I switch between Node 20 and 24 depending on the project.",
          es: "Gestor de versiones de Node.js. Cambio entre Node 20 y 24 dependiendo del proyecto.",
        },
      },
    ],
  },
  {
    title: { pt: "Stack de desenvolvimento", en: "Development Stack", es: "Stack de desarrollo" },
    items: [
      {
        name: "Next.js",
        url: "https://nextjs.org/",
        desc: {
          pt: "Framework principal para web. App Router, Server Components, Turbopack.",
          en: "Main web framework. App Router, Server Components, Turbopack.",
          es: "Framework principal para web. App Router, Server Components, Turbopack.",
        },
      },
      {
        name: "React / React Native",
        url: "https://react.dev/",
        desc: {
          pt: "Base de todos os projetos web e mobile. Hooks, Context, Server Components.",
          en: "Foundation of all web and mobile projects. Hooks, Context, Server Components.",
          es: "Base de todos los proyectos web y móviles. Hooks, Context, Server Components.",
        },
      },
      {
        name: "TypeScript",
        url: "https://www.typescriptlang.org/",
        desc: {
          pt: "Uso em 100% dos projetos. Tipagem forte evita bugs em produção.",
          en: "Used in 100% of projects. Strong typing prevents production bugs.",
          es: "Uso en 100% de los proyectos. Tipado fuerte evita bugs en producción.",
        },
      },
      {
        name: "Tailwind CSS",
        url: "https://tailwindcss.com/",
        desc: {
          pt: "Utility-first CSS. Produtividade alta e consistência visual sem escrever CSS custom.",
          en: "Utility-first CSS. High productivity and visual consistency without custom CSS.",
          es: "Utility-first CSS. Alta productividad y consistencia visual sin escribir CSS custom.",
        },
      },
      {
        name: "Shadcn UI",
        url: "https://ui.shadcn.com/",
        desc: {
          pt: "Componentes baseados em Radix UI com controle total do código. Base do design system.",
          en: "Radix UI-based components with full code ownership. Design system foundation.",
          es: "Componentes basados en Radix UI con control total del código. Base del design system.",
        },
      },
      {
        name: "Node.js",
        url: "https://nodejs.org/",
        desc: {
          pt: "Runtime para backend e APIs. Uso com Express, Fastify ou API routes do Next.js.",
          en: "Backend and API runtime. Used with Express, Fastify or Next.js API routes.",
          es: "Runtime para backend y APIs. Uso con Express, Fastify o API routes de Next.js.",
        },
      },
      {
        name: "PostgreSQL",
        url: "https://www.postgresql.org/",
        desc: {
          pt: "Banco principal. Multi-tenant com RLS, pgVector para IA, transações atômicas.",
          en: "Main database. Multi-tenant with RLS, pgVector for AI, atomic transactions.",
          es: "Base de datos principal. Multi-tenant con RLS, pgVector para IA, transacciones atómicas.",
        },
      },
    ],
  },
  {
    title: { pt: "Apps", en: "Apps", es: "Apps" },
    items: [
      {
        name: "Arc Browser",
        url: "https://arc.net/",
        desc: {
          pt: "Browser principal. Spaces para separar contextos (trabalho, pessoal, projetos).",
          en: "Main browser. Spaces to separate contexts (work, personal, projects).",
          es: "Navegador principal. Spaces para separar contextos (trabajo, personal, proyectos).",
        },
      },
      {
        name: "Figma",
        url: "https://www.figma.com/",
        desc: {
          pt: "Design e prototipação. Uso para consultar designs antes de implementar.",
          en: "Design and prototyping. I use it to review designs before implementing.",
          es: "Diseño y prototipado. Lo uso para consultar diseños antes de implementar.",
        },
      },
      {
        name: "Notion",
        url: "https://www.notion.so/",
        desc: {
          pt: "Base de conhecimento pessoal, notas de projetos e documentação.",
          en: "Personal knowledge base, project notes and documentation.",
          es: "Base de conocimiento personal, notas de proyectos y documentación.",
        },
      },
      {
        name: "Slack / Discord",
        desc: {
          pt: "Comunicação com times e comunidades de dev.",
          en: "Communication with teams and dev communities.",
          es: "Comunicación con equipos y comunidades de dev.",
        },
      },
      {
        name: "Postman",
        url: "https://www.postman.com/",
        desc: {
          pt: "Teste de APIs REST. Collections organizadas por projeto.",
          en: "REST API testing. Collections organized by project.",
          es: "Testing de APIs REST. Collections organizadas por proyecto.",
        },
      },
    ],
  },
  {
    title: { pt: "Serviços e infra", en: "Services & Infra", es: "Servicios e infra" },
    items: [
      {
        name: "Vercel",
        url: "https://vercel.com/",
        desc: {
          pt: "Deploy de todos os projetos Next.js. Preview automático em PRs, zero config.",
          en: "Deploy for all Next.js projects. Automatic preview on PRs, zero config.",
          es: "Deploy de todos los proyectos Next.js. Preview automático en PRs, zero config.",
        },
      },
      {
        name: "GitHub",
        url: "https://github.com/",
        desc: {
          pt: "Repositórios, PRs, Actions (CI/CD), code review. Centro de tudo.",
          en: "Repositories, PRs, Actions (CI/CD), code review. Center of everything.",
          es: "Repositorios, PRs, Actions (CI/CD), code review. Centro de todo.",
        },
      },
      {
        name: "AWS",
        url: "https://aws.amazon.com/",
        desc: {
          pt: "EC2, S3, CloudFront para projetos que precisam de infra própria.",
          en: "EC2, S3, CloudFront for projects that need custom infrastructure.",
          es: "EC2, S3, CloudFront para proyectos que necesitan infraestructura propia.",
        },
      },
      {
        name: "Docker",
        url: "https://www.docker.com/",
        desc: {
          pt: "Containerização para ambientes de dev consistentes e deploy em produção.",
          en: "Containerization for consistent dev environments and production deploys.",
          es: "Containerización para ambientes de dev consistentes y deploy en producción.",
        },
      },
      {
        name: "Stripe / Mercado Pago / Asaas",
        desc: {
          pt: "Provedores de pagamento que integro nos projetos. PIX, cartão, assinaturas.",
          en: "Payment providers I integrate in projects. PIX, card, subscriptions.",
          es: "Proveedores de pago que integro en los proyectos. PIX, tarjeta, suscripciones.",
        },
      },
    ],
  },
  {
    title: { pt: "Hardware", en: "Hardware", es: "Hardware" },
    items: [
      {
        name: "MacBook Pro",
        desc: {
          pt: "Máquina principal de desenvolvimento. Apple Silicon, 16GB RAM.",
          en: "Main development machine. Apple Silicon, 16GB RAM.",
          es: "Máquina principal de desarrollo. Apple Silicon, 16GB RAM.",
        },
      },
      {
        name: "Monitor externo",
        desc: {
          pt: "Segundo monitor para code review, documentação e terminal lado a lado.",
          en: "Secondary monitor for code review, docs and terminal side by side.",
          es: "Segundo monitor para code review, documentación y terminal lado a lado.",
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
          {t(locale, "Ferramentas. Apps. Setup.", "Tools. Apps. Setup.", "Herramientas. Apps. Setup.")}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          {t(
            locale,
            "Esta não é uma página estática — é um documento vivo com tudo que uso atualmente como engenheiro de software.",
            "This is not a static page — it's a living document with everything I currently use as a Software Engineer.",
            "Esta no es una página estática — es un documento vivo con todo lo que uso actualmente como ingeniero de software."
          )}
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
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
