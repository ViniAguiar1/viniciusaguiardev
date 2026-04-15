import { Locale } from "@/lib/i18n-server"

export type ProjectMetric = {
  label: { pt: string; en: string }
  value: string
}

export type ProjectChallenge = {
  problem: { pt: string; en: string }
  solution: { pt: string; en: string }
}

export type Project = {
  slug: string
  name: string
  tagline: { pt: string; en: string }
  description: { pt: string; en: string }
  context: { pt: string; en: string }
  role: { pt: string; en: string }
  status: "active" | "completed"
  featured: boolean
  technologies: string[]
  features: { pt: string[]; en: string[] }
  challenges: ProjectChallenge[]
  metrics: ProjectMetric[]
  links?: { label: string; url: string }[]
}

export function getLocalizedField<T extends Record<string, unknown>>(
  field: T,
  locale: Locale
): string {
  return (field[locale] ?? field["pt"]) as string
}

export const projects: Project[] = [
  {
    slug: "vox-pet-digital",
    name: "Vox Pet Digital",
    tagline: {
      pt: "SaaS completo para pet shops e clínicas veterinárias",
      en: "Full SaaS platform for pet shops and veterinary clinics",
    },
    description: {
      pt: "Plataforma SaaS multi-módulo para gestão de pet shops e clínicas veterinárias, com automações via WhatsApp e IA integrada para atendimento, recomendações e finalização de vendas.",
      en: "Multi-module SaaS platform for managing pet shops and veterinary clinics, with WhatsApp automations and integrated AI for customer service, recommendations, and sales completion.",
    },
    context: {
      pt: "O mercado pet no Brasil movimenta bilhões por ano, mas a maioria dos estabelecimentos ainda opera com processos manuais. A Vox Pet Digital foi criada para digitalizar e automatizar toda a operação — do agendamento ao financeiro.",
      en: "Brazil's pet market generates billions yearly, but most businesses still rely on manual processes. Vox Pet Digital was created to digitize and automate the entire operation — from scheduling to finance.",
    },
    role: {
      pt: "Software Engineer · Part-time",
      en: "Software Engineer · Part-time",
    },
    status: "active",
    featured: true,
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "WhatsApp API",
      "OpenAI",
      "Mercado Pago",
      "Stripe",
    ],
    features: {
      pt: [
        "Módulo de agenda com gestão de horários e profissionais",
        "Módulo financeiro com comissões e controle de vendas",
        "Automação de atendimento via WhatsApp com fluxos inteligentes",
        "IA para recomendação de produtos e finalização de vendas automatizada",
        "Integração com Mercado Pago e Stripe para pagamentos",
        "Registro automático de dados dos fluxos de IA no sistema",
      ],
      en: [
        "Scheduling module with professional and time-slot management",
        "Financial module with commissions and sales tracking",
        "WhatsApp automation with intelligent conversation flows",
        "AI-powered product recommendations and automated sales completion",
        "Payment integration with Mercado Pago and Stripe",
        "Automatic data registration from AI flows into the SaaS platform",
      ],
    },
    challenges: [
      {
        problem: {
          pt: "Integrar IA no fluxo de WhatsApp de forma confiável e que se conecte ao sistema de vendas",
          en: "Reliably integrating AI into WhatsApp flows while connecting to the sales system",
        },
        solution: {
          pt: "Arquitetura de eventos com Node.js processando mensagens do WhatsApp, chamando OpenAI para respostas contextuais e registrando dados automaticamente no PostgreSQL",
          en: "Event-driven architecture with Node.js processing WhatsApp messages, calling OpenAI for contextual responses, and automatically registering data in PostgreSQL",
        },
      },
      {
        problem: {
          pt: "Garantir consistência financeira entre múltiplos módulos (vendas, comissões, pagamentos)",
          en: "Ensuring financial consistency across multiple modules (sales, commissions, payments)",
        },
        solution: {
          pt: "Design de transações atômicas no PostgreSQL com validações em cada camada, garantindo que comissões e pagamentos estejam sempre sincronizados",
          en: "Atomic transaction design in PostgreSQL with validations at each layer, ensuring commissions and payments are always synchronized",
        },
      },
    ],
    metrics: [
      { label: { pt: "Módulos", en: "Modules" }, value: "6+" },
      { label: { pt: "Integrações", en: "Integrations" }, value: "4" },
      { label: { pt: "Automações IA", en: "AI Automations" }, value: "3+" },
      { label: { pt: "Status", en: "Status" }, value: "Production" },
    ],
  },
  {
    slug: "movepro",
    name: "MovePro",
    tagline: {
      pt: "Plataforma web + mobile para saúde e fitness usada por milhares",
      en: "Web + mobile health & fitness platform used by thousands",
    },
    description: {
      pt: "Plataforma completa (web + mobile) de saúde e fitness, com interfaces críticas usadas por milhares de usuários, integrações com serviços externos e monitoramento em produção.",
      en: "Full-stack health & fitness platform (web + mobile) with critical interfaces used by thousands of users, external service integrations, and production monitoring.",
    },
    context: {
      pt: "A MovePro precisava de uma plataforma robusta para conectar profissionais de saúde com usuários, com rastreamento nutricional, pagamentos e métricas — tudo em tempo real e com alta disponibilidade.",
      en: "MovePro needed a robust platform connecting health professionals with users, featuring nutritional tracking, payments, and metrics — all in real-time with high availability.",
    },
    role: {
      pt: "Software Engineer · Tempo integral",
      en: "Software Engineer · Full-time",
    },
    status: "completed",
    featured: true,
    technologies: [
      "React",
      "Next.js",
      "React Native",
      "Expo",
      "Stripe",
      "Firebase",
      "FatSecret API",
      "Google APIs",
      "Crashlytics",
    ],
    features: {
      pt: [
        "Interfaces web com React e Next.js focadas em performance",
        "App mobile com React Native e Expo",
        "Integração com Stripe para assinaturas e pagamentos",
        "Rastreamento nutricional via FatSecret API",
        "Autenticação e serviços com Firebase e Google",
        "Monitoramento com Crashlytics e métricas de produto",
      ],
      en: [
        "Web interfaces with React and Next.js focused on performance",
        "Mobile app with React Native and Expo",
        "Stripe integration for subscriptions and payments",
        "Nutritional tracking via FatSecret API",
        "Authentication and services with Firebase and Google",
        "Monitoring with Crashlytics and product metrics",
      ],
    },
    challenges: [
      {
        problem: {
          pt: "Reduzir o tempo de carregamento e latência com múltiplas APIs externas",
          en: "Reducing load time and latency with multiple external APIs",
        },
        solution: {
          pt: "Otimização de queries, caching estratégico e consumo paralelo de APIs, reduzindo significativamente o tempo de resposta",
          en: "Query optimization, strategic caching, and parallel API consumption, significantly reducing response times",
        },
      },
      {
        problem: {
          pt: "Manter UX consistente entre web e mobile com bases de código diferentes",
          en: "Maintaining consistent UX across web and mobile with different codebases",
        },
        solution: {
          pt: "Design system compartilhado com componentes e tokens de design alinhados entre React (web) e React Native (mobile)",
          en: "Shared design system with aligned components and design tokens between React (web) and React Native (mobile)",
        },
      },
    ],
    metrics: [
      { label: { pt: "Usuários", en: "Users" }, value: "1,000+" },
      { label: { pt: "Plataformas", en: "Platforms" }, value: "Web + Mobile" },
      { label: { pt: "Integrações", en: "Integrations" }, value: "5+" },
      { label: { pt: "Período", en: "Duration" }, value: "7 months" },
    ],
  },
  {
    slug: "x-drop",
    name: "X-Drop",
    tagline: {
      pt: "Automação e-commerce com integração a marketplaces",
      en: "E-commerce automation with marketplace integrations",
    },
    description: {
      pt: "Solução de automação para operações de e-commerce, conectando vendedores a múltiplos marketplaces com foco em eficiência operacional e redução de trabalho manual.",
      en: "Automation solution for e-commerce operations, connecting sellers to multiple marketplaces with focus on operational efficiency and reducing manual work.",
    },
    context: {
      pt: "Vendedores online que operam em múltiplos marketplaces enfrentam complexidade operacional enorme. O X-Drop automatiza processos como sincronização de estoque, precificação e gestão de pedidos.",
      en: "Online sellers operating across multiple marketplaces face enormous operational complexity. X-Drop automates processes like inventory sync, pricing, and order management.",
    },
    role: {
      pt: "Software Engineer",
      en: "Software Engineer",
    },
    status: "completed",
    featured: false,
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "REST APIs",
      "Marketplace APIs",
    ],
    features: {
      pt: [
        "Sincronização de estoque entre múltiplos marketplaces",
        "Gestão centralizada de pedidos e precificação",
        "Dashboard de métricas operacionais",
        "Integração com APIs de marketplaces brasileiros",
      ],
      en: [
        "Inventory synchronization across multiple marketplaces",
        "Centralized order and pricing management",
        "Operational metrics dashboard",
        "Integration with Brazilian marketplace APIs",
      ],
    },
    challenges: [
      {
        problem: {
          pt: "Lidar com APIs inconsistentes de diferentes marketplaces",
          en: "Handling inconsistent APIs from different marketplaces",
        },
        solution: {
          pt: "Camada de abstração unificada que normaliza dados de diferentes marketplaces em um modelo consistente",
          en: "Unified abstraction layer normalizing data from different marketplaces into a consistent model",
        },
      },
    ],
    metrics: [
      { label: { pt: "Marketplaces", en: "Marketplaces" }, value: "3+" },
      { label: { pt: "Automações", en: "Automations" }, value: "5+" },
      { label: { pt: "Status", en: "Status" }, value: "Completed" },
    ],
  },
  {
    slug: "holy-solutions",
    name: "Holy Solutions",
    tagline: {
      pt: "Aplicações web e mobile escaláveis com IA e pagamentos",
      en: "Scalable web & mobile apps with AI and payments",
    },
    description: {
      pt: "Desenvolvimento de aplicações web e mobile para clientes da Holy Solutions, com foco em interfaces escaláveis, integrações com IA e sistemas de pagamento.",
      en: "Development of web and mobile applications for Holy Solutions clients, focused on scalable interfaces, AI integrations, and payment systems.",
    },
    context: {
      pt: "A Holy Solutions atende clientes que precisam de soluções digitais robustas. Minha atuação envolve desde a arquitetura frontend até integrações com serviços externos e deploy em cloud.",
      en: "Holy Solutions serves clients needing robust digital solutions. My work spans from frontend architecture to external service integrations and cloud deployment.",
    },
    role: {
      pt: "Mid-level Software Engineer · Tempo integral",
      en: "Mid-level Software Engineer · Full-time",
    },
    status: "active",
    featured: false,
    technologies: [
      "React",
      "Next.js",
      "React Native",
      "TypeScript",
      "AWS",
      "Asaas",
      "Design System",
    ],
    features: {
      pt: [
        "Desenvolvimento end-to-end de features com APIs externas e IA",
        "Criação de componentes reutilizáveis e Design System",
        "Integração com sistemas de pagamento (Asaas)",
        "Deploy e operação em ambientes AWS",
      ],
      en: [
        "End-to-end feature development with external APIs and AI",
        "Reusable component creation and Design System standardization",
        "Payment system integration (Asaas)",
        "Deployment and operation in AWS environments",
      ],
    },
    challenges: [
      {
        problem: {
          pt: "Padronizar interfaces entre múltiplos projetos de clientes diferentes",
          en: "Standardizing interfaces across multiple client projects",
        },
        solution: {
          pt: "Design System interno com componentes reutilizáveis e tokens de design consistentes entre projetos",
          en: "Internal Design System with reusable components and consistent design tokens across projects",
        },
      },
    ],
    metrics: [
      { label: { pt: "Projetos", en: "Projects" }, value: "Multiple" },
      { label: { pt: "Stack", en: "Stack" }, value: "Web + Mobile" },
      { label: { pt: "Cloud", en: "Cloud" }, value: "AWS" },
    ],
  },
]

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}

export function getOtherProjects(): Project[] {
  return projects.filter((p) => !p.featured)
}
