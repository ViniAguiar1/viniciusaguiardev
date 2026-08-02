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
      "Frontend Engineer que constrói interfaces rápidas e escaláveis para SaaS em produção — React, Next.js e performance engineering.",

    description:
      "TypeScript de ponta a ponta. Capacidade full-stack como diferencial: pagamentos, arquitetura multi-tenant e IA operando em produtos reais.",

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
      "Empresas e produtos onde atuei — SaaS, marketplaces, ERPs e plataformas digitais.",
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
      "Frontend Engineer building fast, scalable interfaces for production SaaS — React, Next.js and performance engineering.",

    description:
      "TypeScript end to end. Full-stack range as a differentiator: payments, multi-tenant architecture and AI running in real products.",

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
      "Companies and products I've worked on — SaaS, marketplaces, ERPs and digital platforms.",
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
      "Frontend Engineer que construye interfaces rápidas y escalables para SaaS en producción — React, Next.js y performance engineering.",

    description:
      "TypeScript de punta a punta. Capacidad full-stack como diferencial: pagos, arquitectura multi-tenant e IA operando en productos reales.",

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
      "Empresas y productos donde trabajé — SaaS, marketplaces, ERPs y plataformas digitales.",
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
      "本番SaaSのための高速でスケーラブルなインターフェースを構築するフロントエンドエンジニア — React、Next.js、パフォーマンスエンジニアリング。",

    description:
      "TypeScriptをエンドツーエンドで。フルスタック対応力が強み — 実プロダクトで稼働する決済、マルチテナントアーキテクチャ、AI。",

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
      "携わった企業とプロダクト — SaaS、マーケットプレイス、ERP、デジタルプラットフォーム。",
  },

  ui: {
    search: "検索",
  },
}

const fr: Dictionary = {
  nav: {
    home: "Accueil",
    about: "À propos",
    projects: "Projets",
    engineering: "Ingénierie",
    uses: "Outils",
    search: "Recherche",
    curriculum: "CV",
  },

  home: {
    title: "Vinicius Aguiar",

    subtitle:
      "Frontend Engineer qui construit des interfaces rapides et scalables pour des SaaS en production — React, Next.js et performance engineering.",

    description:
      "TypeScript de bout en bout. Une polyvalence full-stack comme atout : paiements, architecture multi-tenant et IA en production.",

    ctaAbout: "À propos",
    ctaResume: "Télécharger le CV",
    ctaContact: "Me contacter",
  },

  about: {
    title: "À propos",
    subtitle: "Un aperçu de mon parcours, de mes compétences et de mes centres d'intérêt.",
  },

  projects: {
    title: "Projets",
    subtitle:
      "Entreprises et produits sur lesquels j'ai travaillé — SaaS, marketplaces, ERP et plateformes digitales.",
  },

  ui: {
    search: "Rechercher",
  },
}

export function getDictionary(locale: Locale): Dictionary {
  if (locale === "en") return en
  if (locale === "es") return es
  if (locale === "jp") return jp
  if (locale === "fr") return fr
  return pt
}
