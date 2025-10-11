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
    curriculum: string
  }
  home: {
    title: string
    description: string
  }
  about: {
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
    curriculum: "Curriculum",
  },
  home: {
    title: "Olá, seja bem-vindo!",
    description:
      "Neste espaço, compartilho artigos, estudos e insights sobre programação e tecnologia — abrangendo desde o front-end até temas avançados e relevantes da área, sempre com o objetivo de agregar valor e promover conhecimento.",
  },
  about: {
    title: "Sobre mim",
    subtitle: "Um pouco da minha trajetória, habilidades e interesses.",
  },
  ui: {
    search: "Buscar",
  },
}

const en: Dictionary = {
  nav: {
    home: "Home",
    about: "About",
    curriculum: "Resume",
  },
  home: {
    title: "Hello, welcome!",
    description:
      "In this space, I share articles, studies and insights about programming and technology — covering everything from front-end to advanced and relevant topics in the field, always with the goal of adding value and promoting knowledge.",
  },
  about: {
    title: "About me",
    subtitle: "A bit about my journey, skills and interests.",
  },
  ui: {
    search: "Search",
  },
}

export function getDictionary(locale: Locale): Dictionary {
  return locale === "en" ? en : pt
}
