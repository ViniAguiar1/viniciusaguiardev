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
  | "Automotive"

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
      pt: "Plataforma de gestão para operações de dropshipping",
      en: "Management platform for dropshipping operations",
    },
    description: {
      pt: "Sistema que integra catálogo, pedidos, expedição e pagamentos em um único painel, permitindo que vendedores gerenciem operações e finanças com governança por perfis de acesso e relatórios em tempo real.",
      en: "Unified system connecting product catalogs, orders, shipping, and payments to help sellers scale their dropshipping business with role-based access controls and real-time financial reporting.",
    },
    category: "SaaS",
    url: "https://xdrop.com.br/",
  },
  {
    slug: "vox-pet-digital",
    name: "Vox Pet Digital",
    logo: "/images/vox-pet-digital.png",
    tagline: {
      pt: "Gestão e marketing 360° para petshops e clínicas veterinárias",
      en: "Complete 360° management and marketing for pet businesses",
    },
    description: {
      pt: "Plataforma completa que oferece automação e ferramentas de gestão para clínicas veterinárias e petshops, combinando sistema de gerenciamento com assessoria especializada para aumentar faturamento e fidelizar clientes.",
      en: "Integrated platform combining automated management tools and professional consulting services for veterinary clinics and pet shops, helping owners optimize operations, increase revenue, and build stronger customer relationships.",
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
    logo: "/images/easytogo-logo.png",
    tagline: {
      pt: "Software house especializada em desenvolvimento web e mobile",
      en: "Software house specialized in web and mobile development",
    },
    description: {
      pt: "Agência de software (software house) focada no desenvolvimento de aplicações web e mobile com React, Next.js, React Native e Flutter, atendendo clientes de diversos segmentos em ambiente ágil.",
      en: "Software agency (software house) focused on web and mobile application development with React, Next.js, React Native, and Flutter, serving clients across multiple industries in an agile environment.",
    },
    category: "Agency",
    url: "https://www.easytogo.com.br/",
  },
  {
    slug: "joviplanet",
    name: "JoviPlanet",
    logo: "/images/jovi-planet-logo.png",
    tagline: {
      pt: "Plataforma de viagens e locação de experiências",
      en: "Travel and experience rental platform",
    },
    description: {
      pt: "Plataforma de viagens focada em locação de experiências, conectando viajantes a hospedagens, passeios e atividades em destinos turísticos.",
      en: "Travel platform focused on experience rentals, connecting travelers to accommodations, tours, and activities at tourist destinations.",
    },
    category: "Travel",
    url: "https://joviplanet.com/",
  },
  {
    slug: "direcao-sobre-rodas",
    name: "Direção Sobre Rodas",
    logo: "/images/direcao-sobre-rodas.png",
    tagline: {
      pt: "Marketplace de oficinas mecânicas e peças automotivas",
      en: "Marketplace for auto repair shops and automotive parts",
    },
    description: {
      pt: "Plataforma que conecta consumidores com oficinas mecânicas confiáveis e oferece um marketplace para compra de peças automotivas, facilitando a busca por reparos e aquisição de componentes em um único lugar.",
      en: "Platform connecting consumers with reliable auto repair shops while providing a marketplace for purchasing vehicle components, streamlining the process of locating mechanics and sourcing quality parts in one place.",
    },
    category: "Marketplace",
    url: "https://direcaosobrerodas.com.br/",
  },
  {
    slug: "rainha-das-sete",
    name: "Rainha das Sete",
    logo: "/images/rainha-das-sete-logo.webp",
    tagline: {
      pt: "Fabricante de componentes elétricos automotivos",
      en: "Automotive electrical components manufacturer",
    },
    description: {
      pt: "Fabricante e distribuidora de componentes elétricos para a indústria automotiva, incluindo bicos injetores, chicotes elétricos, fusíveis, conectores e sensores para veículos leves, pesados, ônibus e máquinas agrícolas.",
      en: "Manufacturer and distributor of electrical components for the automotive industry, including injector nozzles, wiring harnesses, fuses, connectors, and sensors for light vehicles, trucks, buses, and agricultural equipment.",
    },
    category: "Automotive",
    url: "https://rainhadassete.com.br/",
  },
  {
    slug: "erpwise",
    name: "ErpWise",
    logo: "/logos/erpwise.svg",
    tagline: {
      pt: "Sistema de gestão para indústrias e distribuidoras",
      en: "Management system for industrial and distribution businesses",
    },
    description: {
      pt: "Solução de ERP desenvolvida para empresas de manufatura e distribuição no atacado, otimizando processos operacionais para melhorar a eficiência e a gestão empresarial.",
      en: "ERP solution tailored for manufacturing and wholesale distribution companies, streamlining operational processes to improve efficiency and business management.",
    },
    category: "ERP",
    url: "https://www.erpwise.com.br/",
  },
  {
    slug: "vpny",
    name: "Vou Para New York",
    logo: "/images/vpny-logo.png",
    tagline: {
      pt: "Portal de conteúdo e planejamento de viagens para Nova York",
      en: "Travel content and planning portal for New York",
    },
    description: {
      pt: "Portal de conteúdo e planejamento de viagens focado em Nova York, com roteiros, dicas, guias e ferramentas para organizar a experiência do viajante.",
      en: "Travel content and planning portal focused on New York, with itineraries, tips, guides, and tools to organize the traveler's experience.",
    },
    category: "Travel",
    url: "https://www.vouparanewyork.com/",
  },
  {
    slug: "movepro",
    name: "MovePro",
    logo: "/images/movepro-logo.png",
    tagline: {
      pt: "Plataforma para nutricionistas e personal trainers",
      en: "Platform for nutritionists and personal trainers",
    },
    description: {
      pt: "Software para nutricionistas e personal trainers prescreverem planos alimentares e treinos personalizados, monitorarem o progresso de clientes e gerenciarem consultas em um único aplicativo web e mobile.",
      en: "Software for nutritionists and personal trainers to prescribe customized meal plans and workouts, monitor client progress, and manage appointments in a single web and mobile application.",
    },
    category: "SaaS",
    url: "https://movepro-ruddy.vercel.app/",
  },
  {
    slug: "simq",
    name: "SimQ",
    logo: "/images/simq-logo.jpeg",
    tagline: {
      pt: "Plataforma de simulados e questões para concursos",
      en: "Mock exam and question platform for competitive exams",
    },
    description: {
      pt: "Plataforma educacional focada em simulados, questões comentadas e trilhas de estudo para concursos públicos e vestibulares, com métricas de desempenho e acompanhamento de evolução.",
      en: "Educational platform focused on mock exams, commented questions, and study tracks for public and college entrance exams, with performance metrics and progress tracking.",
    },
    category: "EdTech",
    url: "https://simq.com.br/",
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
    logo: "/images/bionexo-logo.png",
    tagline: {
      pt: "Melhores conexões para uma saúde melhor",
      en: "Better connections for better health",
    },
    description: {
      pt: "Plataforma digital que conecta hospitais, clínicas e fornecedores de saúde para otimizar compras, vendas e gestão de insumos médicos, com a maior base de dados de transações do setor privado de saúde na América Latina.",
      en: "Digital platform connecting hospitals, clinics, and healthcare suppliers to optimize procurement, sales, and medical supply management, powered by the largest transaction database in Latin America's private healthcare sector.",
    },
    category: "HealthTech",
    url: "https://bionexo.com/",
  },
  {
    slug: "stacklabs",
    name: "StackLabs",
    logo: "/images/stack-labs-logo.jpeg",
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
