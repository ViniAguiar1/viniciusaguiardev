export type ProjectCategory =
  | "SaaS"
  | "Marketplace"
  | "ERP"
  | "Platform"
  | "E-commerce"
  | "Agency"
  | "App"
  | "EdTech"
  | "Travel"
  | "Health"
  | "Logistics"
  | "HealthTech"

export type Project = {
  slug: string
  name: string
  logo: string
  tagline: { pt: string; en: string }
  description: { pt: string; en: string }
  category: ProjectCategory
  url?: string
}

export const projects: Project[] = [
  {
    slug: "fastseller",
    name: "FastSeller",
    logo: "/logos/fastseller.svg",
    tagline: {
      pt: "Plataforma de automação para vendedores em marketplaces",
      en: "Automation platform for marketplace sellers",
    },
    description: {
      pt: "Plataforma que centraliza a operação de vendedores em múltiplos marketplaces, automatizando gestão de pedidos, estoque e precificação para escalar vendas online.",
      en: "Platform that centralizes seller operations across multiple marketplaces, automating order management, inventory, and pricing to scale online sales.",
    },
    category: "E-commerce",
  },
  {
    slug: "x-drop",
    name: "X-Drop",
    logo: "/images/x-droplogo.png",
    tagline: {
      pt: "Automação de e-commerce e integração com marketplaces",
      en: "E-commerce automation and marketplace integrations",
    },
    description: {
      pt: "Solução de automação para operações de e-commerce, conectando vendedores a múltiplos marketplaces com foco em eficiência operacional e redução de trabalho manual.",
      en: "Automation solution for e-commerce operations, connecting sellers to multiple marketplaces with focus on operational efficiency and reducing manual work.",
    },
    category: "E-commerce",
    url: "https://xdrop.com.br/",
  },
  {
    slug: "vox-pet-digital",
    name: "Vox Pet Digital",
    logo: "/images/vox-pet-digital.png",
    tagline: {
      pt: "SaaS para pet shops e clínicas veterinárias",
      en: "SaaS for pet shops and veterinary clinics",
    },
    description: {
      pt: "Plataforma SaaS multi-módulo para gestão de pet shops e clínicas veterinárias, com automações via WhatsApp, IA integrada para atendimento e integrações com Mercado Pago e Stripe.",
      en: "Multi-module SaaS platform for managing pet shops and veterinary clinics, with WhatsApp automations, integrated AI for customer service, and Mercado Pago/Stripe integrations.",
    },
    category: "SaaS",
    url: "https://voxpetdigital.com.br/",
  },
  {
    slug: "ikropp",
    name: "iKropp",
    logo: "/logos/ikropp.svg",
    tagline: {
      pt: "Plataforma digital de saúde e bem-estar",
      en: "Digital health and wellness platform",
    },
    description: {
      pt: "Plataforma digital focada em saúde e bem-estar, conectando profissionais e usuários com ferramentas de acompanhamento, conteúdo e serviços personalizados.",
      en: "Digital platform focused on health and wellness, connecting professionals and users with tracking tools, content, and personalized services.",
    },
    category: "Health",
    url: "https://ikropp.com/",
  },
  {
    slug: "easytogo",
    name: "EasyToGo",
    logo: "/logos/easytogo.svg",
    tagline: {
      pt: "Soluções web e mobile para logística e mobilidade",
      en: "Web and mobile solutions for logistics and mobility",
    },
    description: {
      pt: "Desenvolvimento de interfaces web e mobile com React, Next.js, React Native e Flutter em ambiente ágil, integrando APIs conectadas a fluxos reais de operação logística.",
      en: "Web and mobile interface development with React, Next.js, React Native, and Flutter in an agile environment, integrating APIs connected to real logistics operation flows.",
    },
    category: "Logistics",
    url: "https://www.easytogo.com.br/",
  },
  {
    slug: "joviplanet",
    name: "JoviPlanet",
    logo: "/logos/joviplanet.svg",
    tagline: {
      pt: "Plataforma educacional interativa para crianças",
      en: "Interactive educational platform for kids",
    },
    description: {
      pt: "Plataforma educacional voltada ao público infantil, com experiências interativas e gamificadas para engajar crianças no aprendizado digital.",
      en: "Educational platform for children, featuring interactive and gamified experiences to engage kids in digital learning.",
    },
    category: "EdTech",
    url: "https://joviplanet.com/",
  },
  {
    slug: "direcao-sobre-rodas",
    name: "Direção Sobre Rodas",
    logo: "/logos/direcao-sobre-rodas.svg",
    tagline: {
      pt: "Sistema de gestão para autoescolas",
      en: "Management system for driving schools",
    },
    description: {
      pt: "Sistema completo de gestão para autoescolas, incluindo controle de alunos, agendamento de aulas, financeiro e acompanhamento de processos do Detran.",
      en: "Complete management system for driving schools, including student management, class scheduling, finances, and DMV process tracking.",
    },
    category: "Platform",
    url: "https://direcaosobrerodas.com.br/",
  },
  {
    slug: "rainha-das-sete",
    name: "Rainha das Sete",
    logo: "/logos/rainha-das-sete.svg",
    tagline: {
      pt: "Presença digital e e-commerce para marca de moda",
      en: "Digital presence and e-commerce for fashion brand",
    },
    description: {
      pt: "Desenvolvimento da presença digital e loja virtual para marca de moda, com foco em experiência de compra, catálogo de produtos e integração com meios de pagamento.",
      en: "Digital presence and online store development for a fashion brand, focused on shopping experience, product catalog, and payment integration.",
    },
    category: "E-commerce",
    url: "https://rainhadassete.com.br/",
  },
  {
    slug: "erpwise",
    name: "ErpWise",
    logo: "/logos/erpwise.svg",
    tagline: {
      pt: "Sistema ERP para gestão empresarial",
      en: "ERP system for business management",
    },
    description: {
      pt: "Sistema ERP voltado à gestão empresarial, centralizando processos de vendas, estoque, financeiro e relatórios em uma interface unificada.",
      en: "ERP system for business management, centralizing sales, inventory, finance, and reporting processes in a unified interface.",
    },
    category: "ERP",
    url: "https://www.erpwise.com.br/",
  },
  {
    slug: "vpny",
    name: "Vou Para New York",
    logo: "/logos/vpny.svg",
    tagline: {
      pt: "Plataforma de planejamento de viagens para Nova York",
      en: "Travel planning platform for New York trips",
    },
    description: {
      pt: "Plataforma de conteúdo e planejamento de viagens focada em Nova York, com roteiros, dicas e ferramentas para organizar a experiência do viajante.",
      en: "Travel content and planning platform focused on New York, with itineraries, tips, and tools to organize the traveler's experience.",
    },
    category: "Travel",
    url: "https://www.vouparanewyork.com/",
  },
  {
    slug: "movepro",
    name: "MovePro",
    logo: "/logos/movepro.svg",
    tagline: {
      pt: "Plataforma web + mobile de saúde e fitness",
      en: "Web + mobile health and fitness platform",
    },
    description: {
      pt: "Plataforma completa de saúde e fitness (web + mobile) com milhares de usuários, integrações com Stripe, FatSecret e Firebase, e monitoramento em produção com Crashlytics.",
      en: "Full-stack health & fitness platform (web + mobile) with thousands of users, Stripe/FatSecret/Firebase integrations, and production monitoring with Crashlytics.",
    },
    category: "Health",
    url: "https://movepro-ruddy.vercel.app/",
  },
  {
    slug: "hashfy",
    name: "Hashfy",
    logo: "/logos/hashfy.svg",
    tagline: {
      pt: "Ferramenta de marketing e análise para redes sociais",
      en: "Social media marketing and analytics tool",
    },
    description: {
      pt: "Ferramenta SaaS de marketing digital focada em análise de hashtags, métricas de engajamento e insights para otimizar a presença em redes sociais.",
      en: "Digital marketing SaaS tool focused on hashtag analysis, engagement metrics, and insights to optimize social media presence.",
    },
    category: "SaaS",
  },
  {
    slug: "klaus-drift-brasil",
    name: "Klaus Drift Brasil",
    logo: "/logos/klaus-drift-brasil.svg",
    tagline: {
      pt: "E-commerce automotivo especializado em drift e performance",
      en: "Automotive e-commerce specialized in drift and performance",
    },
    description: {
      pt: "Loja virtual focada no segmento automotivo de drift e performance, com catálogo de produtos, checkout e integração com meios de pagamento.",
      en: "Online store focused on the automotive drift and performance segment, with product catalog, checkout, and payment integration.",
    },
    category: "E-commerce",
    url: "https://klaus-driftbrasil.com.br/",
  },
  {
    slug: "bionexo",
    name: "Bionexo",
    logo: "/logos/bionexo.svg",
    tagline: {
      pt: "Marketplace B2B para a cadeia de suprimentos da saúde",
      en: "B2B marketplace for the healthcare supply chain",
    },
    description: {
      pt: "Maior marketplace B2B de saúde da América Latina, conectando hospitais, clínicas e fornecedores em uma plataforma de compras, cotações e gestão de suprimentos.",
      en: "Latin America's largest B2B healthcare marketplace, connecting hospitals, clinics, and suppliers on a platform for purchasing, quotes, and supply management.",
    },
    category: "HealthTech",
    url: "https://bionexo.com/",
  },
  {
    slug: "stacklabs",
    name: "StackLabs",
    logo: "/logos/stacklabs.svg",
    tagline: {
      pt: "Consultoria de desenvolvimento de software sob demanda",
      en: "On-demand software development consultancy",
    },
    description: {
      pt: "Consultoria de tecnologia focada em desenvolvimento de aplicações web e mobile para diferentes clientes, entregando interfaces escaláveis e performáticas com React, Next.js e React Native.",
      en: "Technology consultancy focused on web and mobile application development for multiple clients, delivering scalable and performant interfaces with React, Next.js, and React Native.",
    },
    category: "Agency",
  },
]
