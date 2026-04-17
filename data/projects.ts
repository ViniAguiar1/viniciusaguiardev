export type ProjectCategory =
  | "SaaS"
  | "E-commerce"
  | "Health"

export type Project = {
  slug: string
  name: string
  logo: string
  tagline: { pt: string; en: string; es?: string }
  description: { pt: string; en: string; es?: string }
  category: ProjectCategory
  url?: string
  detailPage?: string
}

export const projects: Project[] = [
  {
    slug: "fastseller",
    name: "FastSeller",
    logo: "/logos/fastseller.svg",
    tagline: {
      pt: "Plataforma de automação para vendedores em marketplaces",
      en: "Automation platform for marketplace sellers",
      es: "Plataforma de automatización para vendedores en marketplaces",
    },
    description: {
      pt: "Plataforma que centraliza a operação de vendedores em múltiplos marketplaces, automatizando gestão de pedidos, estoque e precificação para escalar vendas online.",
      en: "Platform that centralizes seller operations across multiple marketplaces, automating order management, inventory, and pricing to scale online sales.",
      es: "Plataforma que centraliza la operación de vendedores en múltiples marketplaces, automatizando gestión de pedidos, inventario y precios para escalar ventas online.",
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
    },
    description: {
      pt: "Sistema que integra catálogo, pedidos, expedição e pagamentos em um único painel, permitindo que vendedores gerenciem operações e finanças com governança por perfis de acesso e relatórios em tempo real.",
      en: "Unified system connecting product catalogs, orders, shipping, and payments to help sellers scale their dropshipping business with role-based access controls and real-time financial reporting.",
      es: "Sistema unificado que conecta catálogos, pedidos, envíos y pagos para ayudar a vendedores a escalar su negocio de dropshipping con controles de acceso por roles y reportes financieros en tiempo real.",
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
    },
    description: {
      pt: "Plataforma completa que oferece automação e ferramentas de gestão para clínicas veterinárias e petshops, combinando sistema de gerenciamento com assessoria especializada para aumentar faturamento e fidelizar clientes.",
      en: "Integrated platform combining automated management tools and professional consulting services for veterinary clinics and pet shops, helping owners optimize operations, increase revenue, and build stronger customer relationships.",
      es: "Plataforma integrada que combina herramientas de gestión automatizadas y servicios de consultoría para clínicas veterinarias y pet shops, ayudando a optimizar operaciones, aumentar ingresos y fidelizar clientes.",
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
      es: "Plataforma digital de salud y bienestar",
    },
    description: {
      pt: "Plataforma digital focada em saúde e bem-estar, conectando profissionais e usuários com ferramentas de acompanhamento, conteúdo e serviços personalizados.",
      en: "Digital platform focused on health and wellness, connecting professionals and users with tracking tools, content, and personalized services.",
      es: "Plataforma digital enfocada en salud y bienestar, conectando profesionales y usuarios con herramientas de seguimiento, contenido y servicios personalizados.",
    },
    category: "Health",
    url: "https://ikropp.com/",
  },
  {
    slug: "movepro",
    name: "MovePro",
    logo: "/images/movepro-logo.png",
    tagline: {
      pt: "Plataforma para nutricionistas e personal trainers",
      en: "Platform for nutritionists and personal trainers",
      es: "Plataforma para nutricionistas y entrenadores personales",
    },
    description: {
      pt: "Software para nutricionistas e personal trainers prescreverem planos alimentares e treinos personalizados, monitorarem o progresso de clientes e gerenciarem consultas em um único aplicativo web e mobile.",
      en: "Software for nutritionists and personal trainers to prescribe customized meal plans and workouts, monitor client progress, and manage appointments in a single web and mobile application.",
      es: "Software para nutricionistas y entrenadores personales para prescribir planes alimentarios y entrenamientos personalizados, monitorear el progreso de clientes y gestionar consultas en una sola aplicación web y móvil.",
    },
    category: "SaaS",
    url: "https://movepro-ruddy.vercel.app/",
  },
]
