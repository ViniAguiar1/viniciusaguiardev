import { cookies } from "next/headers"

export type Locale = "pt" | "en"

export async function getLocale(): Promise<Locale> {
  try {
    const store = await cookies()
    const lang = store.get("lang")?.value
    return lang === "en" ? "en" : "pt"
  } catch {
    return "pt"
  }
}

export type Dictionary = {
  nav: {
    home: string
    about: string
    projects: string
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
    curriculum: "Curriculum",
  },

  home: {
    title: "Vinicius Aguiar",

    subtitle:
      "Frontend Engineer especializado em React, Next.js e React Native.",

    description:
      "Construindo plataformas SaaS escaláveis e aplicações web modernas, com foco em experiência do usuário, arquitetura limpa e performance.",

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
    curriculum: "Resume",
  },

  home: {
    title: "Vinicius Aguiar",

    subtitle:
      "Frontend Engineer specializing in React, Next.js and React Native.",

    description:
      "Building scalable SaaS platforms and modern web applications with a focus on user experience, clean architecture and performance.",

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

export function getDictionary(locale: Locale): Dictionary {
  return locale === "en" ? en : pt
}