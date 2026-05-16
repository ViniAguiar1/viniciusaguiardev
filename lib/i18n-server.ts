import { headers } from "next/headers"
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n"

export { LOCALES, DEFAULT_LOCALE, isLocale, localePath, stripLocale, localeToHtmlLang, t } from "@/lib/i18n"
export type { Locale } from "@/lib/i18n"

export async function getLocale(): Promise<Locale> {
  try {
    const h = await headers()
    const fromHeader = h.get("x-locale")
    if (isLocale(fromHeader)) return fromHeader
    return DEFAULT_LOCALE
  } catch {
    return DEFAULT_LOCALE
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
    ctaContact: string
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
    ctaContact: "Fale comigo",
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
    ctaContact: "Get in touch",
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
    ctaContact: "Contáctame",
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

const jp: Dictionary = {
  nav: {
    home: "ホーム",
    about: "プロフィール",
    projects: "プロジェクト",
    engineering: "エンジニアリング",
    uses: "ツール",
    search: "検索",
    curriculum: "履歴書",
  },

  home: {
    title: "Vinicius Aguiar",

    subtitle:
      "本番環境でSaaSプラットフォームを構築するソフトウェアエンジニア — 決済システムからWhatsApp上のAIエージェントまで。",

    description:
      "React、Next.js、TypeScript。実プロダクトで稼働する決済連携、マルチテナントアーキテクチャ、AI自動化。",

    ctaAbout: "プロフィール",
    ctaResume: "CVをダウンロード",
    ctaContact: "お問い合わせ",
  },

  about: {
    title: "プロフィール",
    subtitle: "経歴、スキル、興味について少しご紹介します。",
  },

  projects: {
    title: "プロジェクト",
    subtitle:
      "ソフトウェアエンジニアとして携わった企業とプロダクト — SaaS、マーケットプレイス、ERP、デジタルプラットフォーム。",
  },

  ui: {
    search: "検索",
  },
}

export function getDictionary(locale: Locale): Dictionary {
  if (locale === "en") return en
  if (locale === "es") return es
  if (locale === "jp") return jp
  return pt
}
