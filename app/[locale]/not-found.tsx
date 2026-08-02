import Link from "next/link"
import { getLocale, t } from "@/lib/i18n-server"
import { localePath } from "@/lib/i18n"

export default async function NotFound() {
  const locale = await getLocale()

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-16 flex flex-col items-center text-center">
      {/* Illustration — astronaut floating */}
      <div className="relative w-64 h-64 mb-8">
        {/* Stars background */}
        <svg
          viewBox="0 0 256 256"
          fill="none"
          className="absolute inset-0 w-full h-full"
        >
          {/* Stars */}
          <circle cx="20" cy="30" r="1.5" className="fill-muted-foreground/30 animate-pulse" />
          <circle cx="230" cy="50" r="1" className="fill-muted-foreground/20 animate-pulse" style={{ animationDelay: "0.5s" }} />
          <circle cx="50" cy="200" r="1.5" className="fill-muted-foreground/25 animate-pulse" style={{ animationDelay: "1s" }} />
          <circle cx="200" cy="180" r="1" className="fill-muted-foreground/30 animate-pulse" style={{ animationDelay: "1.5s" }} />
          <circle cx="140" cy="20" r="1" className="fill-muted-foreground/20 animate-pulse" style={{ animationDelay: "0.3s" }} />
          <circle cx="40" cy="100" r="1.5" className="fill-muted-foreground/25 animate-pulse" style={{ animationDelay: "0.8s" }} />
          <circle cx="220" cy="120" r="1" className="fill-muted-foreground/30 animate-pulse" style={{ animationDelay: "1.2s" }} />
          <circle cx="100" cy="240" r="1.5" className="fill-muted-foreground/20 animate-pulse" style={{ animationDelay: "0.6s" }} />

          {/* Planet */}
          <circle cx="128" cy="200" r="40" className="fill-muted/40 stroke-border" strokeWidth="1" />
          <ellipse cx="128" cy="200" rx="55" ry="8" className="stroke-muted-foreground/20" strokeWidth="1.5" fill="none" />

          {/* Astronaut body */}
          <g className="animate-bounce" style={{ animationDuration: "3s" }}>
            {/* Helmet */}
            <circle cx="128" cy="90" r="24" className="fill-card stroke-border" strokeWidth="2" />
            {/* Visor */}
            <path d="M112 85 Q128 75 144 85 Q144 100 128 102 Q112 100 112 85Z" className="fill-primary/20 stroke-primary/40" strokeWidth="1" />
            {/* Body */}
            <rect x="108" y="112" width="40" height="40" rx="8" className="fill-card stroke-border" strokeWidth="2" />
            {/* Backpack */}
            <rect x="148" y="116" width="12" height="32" rx="4" className="fill-muted stroke-border" strokeWidth="1.5" />
            {/* Left arm */}
            <path d="M108 120 L88 140" className="stroke-border" strokeWidth="3" strokeLinecap="round" />
            {/* Right arm */}
            <path d="M148 125 L165 110" className="stroke-border" strokeWidth="3" strokeLinecap="round" />
            {/* Left leg */}
            <path d="M118 152 L110 175" className="stroke-border" strokeWidth="3" strokeLinecap="round" />
            {/* Right leg */}
            <path d="M138 152 L146 175" className="stroke-border" strokeWidth="3" strokeLinecap="round" />
            {/* Cable */}
            <path d="M128 112 Q100 60 70 80" className="stroke-muted-foreground/30" strokeWidth="1" strokeDasharray="3 3" fill="none" />
          </g>
        </svg>
      </div>

      {/* 404 text */}
      <p className="text-6xl font-bold tracking-tighter text-foreground/15 mb-1 select-none">
        404
      </p>

      <h1 className="text-2xl font-semibold mb-2">
        {t(locale, { pt: "Perdido no espaço", en: "Lost in space", es: "Perdido en el espacio", jp: "宇宙で迷子", fr: "Perdu dans l'espace" })}
      </h1>

      <p className="text-sm text-muted-foreground mb-8 max-w-sm">
        {t(locale, { pt: "A página que você procura não existe ou foi movida. Mas não se preocupe — tem bastante coisa interessante por aqui.", en: "The page you're looking for doesn't exist or has been moved. But don't worry — there's plenty of interesting stuff around here.", es: "La página que buscas no existe o fue movida. Pero no te preocupes — hay bastante contenido interesante por aquí.", jp: "お探しのページは存在しないか、移動されました。ご安心を — このサイトには他にも面白いコンテンツがあります。", fr: "La page que vous recherchez n'existe pas ou a été déplacée. Mais ne vous inquiétez pas — il y a plein de choses intéressantes par ici." })}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href={localePath(locale, "/")}
          className="px-5 py-2.5 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:opacity-90 transition"
        >
          {t(locale, { pt: "Voltar ao início", en: "Back to home", es: "Volver al inicio", jp: "ホームに戻る", fr: "Retour à l'accueil" })}
        </Link>
        <Link
          href={localePath(locale, "/projetos")}
          className="px-5 py-2.5 text-sm font-medium rounded-md border border-border hover:bg-muted transition"
        >
          {t(locale, { pt: "Ver projetos", en: "See projects", es: "Ver proyectos", jp: "プロジェクトを見る", fr: "Voir les projets" })}
        </Link>
        <Link
          href={localePath(locale, "/engenharia")}
          className="px-5 py-2.5 text-sm font-medium rounded-md border border-border hover:bg-muted transition"
        >
          {t(locale, { pt: "Engenharia", en: "Engineering", es: "Ingeniería", jp: "エンジニアリング", fr: "Ingénierie" })}
        </Link>
      </div>
    </div>
  )
}
