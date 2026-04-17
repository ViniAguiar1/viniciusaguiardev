"use client"

import { useMemo, useSyncExternalStore } from "react"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Lang = "pt" | "en" | "es"

function getCookieLang(): Lang {
  const m = document.cookie.match(/(?:^|; )lang=([^;]+)/)
  const val = m ? decodeURIComponent(m[1]) : "pt"
  if (val === "en") return "en"
  if (val === "es") return "es"
  return "pt"
}

function subscribe(cb: () => void) {
  window.addEventListener("languagechange", cb)
  return () => window.removeEventListener("languagechange", cb)
}

function getSnapshot(): Lang {
  return getCookieLang()
}

function getServerSnapshot(): Lang {
  return "pt"
}

const flags: Record<Lang, string> = { pt: "🇧🇷", en: "🇺🇸", es: "🇪🇸" }

export function LanguageToggle() {
  const router = useRouter()
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const flag = useMemo(() => flags[lang], [lang])

  function setLanguage(next: Lang) {
    try {
      document.cookie = `lang=${next}; path=/; max-age=${60 * 60 * 24 * 365 * 2}`
    } catch {}
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger suppressHydrationWarning className="inline-flex items-center gap-1 rounded-md border bg-background px-2 py-1 text-xs text-foreground shadow-sm">
        <span className="text-base leading-none">{flag}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("pt")} data-umami-event="language-switch" data-umami-event-lang="pt">🇧🇷 Português</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("en")} data-umami-event="language-switch" data-umami-event-lang="en">🇺🇸 English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("es")} data-umami-event="language-switch" data-umami-event-lang="es">🇪🇸 Español</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
