import { cookies } from "next/headers"

export type Locale = "pt" | "en" | "es"

export async function getLocale(): Promise<Locale> {
  try {
    const store = await cookies()
    const lang = store.get("lang")?.value
    if (lang === "en") return "en"
    if (lang === "es") return "es"
    return "pt"
  } catch {
    return "pt"
  }
}

export type Dictionary = {
  nav: {
    home: string
    about: string
    projects: string
    engineering: string
    uses: string
    search: string
    curriculum: string
  }
  home: {
    title: string
    subtitle: string
    description: string
    ctaAbout: string
    ctaResume: string
  }
  about: {
    title: string
    subtitle: string
  }
  projects: {
    title: string
    subtitle: string
  }
  ui: {
    search: string
  }
}

const pt: Dictionary = {
  nav: {
    home: "Home",
    about: "Sobre",
    projects: "Projetos",
    engineering: "Engenharia",
    uses: "Ferramentas",
    search: "Busca",
    curriculum: "Curriculum",
  },

  home: {
    title: "Vinicius Aguiar",

    subtitle:
      "Software Engineer que constrói plataformas SaaS em produção — do sistema de pagamentos ao agente de IA no WhatsApp.",

    description:
      "React, Next.js e TypeScript. Integrações de pagamento, arquitetura multi-tenant e automações com IA operando em produtos reais.",

    ctaAbout: "Sobre mim",
    ctaResume: "Download CV",
  },

  about: {
    title: "Sobre mim",
    subtitle: "Um pouco da minha trajetória, habilidades e interesses.",
  },

  projects: {
    title: "Projetos",
    subtitle:
      "Empresas e produtos onde atuei como Software Engineer — SaaS, marketplaces, ERPs e plataformas digitais.",
  },

  ui: {
    search: "Buscar",
  },
}

const en: Dictionary = {
  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    engineering: "Engineering",
    uses: "Uses",
    search: "Search",
    curriculum: "Resume",
  },

  home: {
    title: "Vinicius Aguiar",

    subtitle:
      "Software Engineer building production SaaS platforms — from payment systems to AI-powered WhatsApp agents.",

    description:
      "React, Next.js and TypeScript. Payment integrations, multi-tenant architecture and AI automation running in real products.",

    ctaAbout: "About me",
    ctaResume: "Download Resume",
  },

  about: {
    title: "About me",
    subtitle: "A bit about my journey, skills and interests.",
  },

  projects: {
    title: "Projects",
    subtitle:
      "Companies and products where I worked as a Software Engineer — SaaS, marketplaces, ERPs and digital platforms.",
  },

  ui: {
    search: "Search",
  },
}

const es: Dictionary = {
  nav: {
    home: "Inicio",
    about: "Acerca",
    projects: "Proyectos",
    engineering: "Ingeniería",
    uses: "Herramientas",
    search: "Búsqueda",
    curriculum: "Currículum",
  },

  home: {
    title: "Vinicius Aguiar",

    subtitle:
      "Software Engineer que construye plataformas SaaS en producción — desde sistemas de pago hasta agentes de IA en WhatsApp.",

    description:
      "React, Next.js y TypeScript. Integraciones de pago, arquitectura multi-tenant y automatizaciones con IA operando en productos reales.",

    ctaAbout: "Sobre mí",
    ctaResume: "Descargar CV",
  },

  about: {
    title: "Sobre mí",
    subtitle: "Un poco de mi trayectoria, habilidades e intereses.",
  },

  projects: {
    title: "Proyectos",
    subtitle:
      "Empresas y productos donde trabajé como Software Engineer — SaaS, marketplaces, ERPs y plataformas digitales.",
  },

  ui: {
    search: "Buscar",
  },
}

export function getDictionary(locale: Locale): Dictionary {
  if (locale === "en") return en
  if (locale === "es") return es
  return pt
}

/** Helper for inline trilingual strings */
export function t(locale: Locale, pt: string, en: string, es: string): string {
  if (locale === "en") return en
  if (locale === "es") return es
  return pt
}
