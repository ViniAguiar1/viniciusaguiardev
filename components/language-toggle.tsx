"use client"

import { useMemo, useSyncExternalStore } from "react"
import { useRouter } from "next/navigation"
import { Languages } from "lucide-react"
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

const labels: Record<Lang, string> = { pt: "PT", en: "EN", es: "ES" }

export function LanguageToggle() {
  const router = useRouter()
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const label = useMemo(() => labels[lang], [lang])

  function setLanguage(next: Lang) {
    try {
      document.cookie = `lang=${next}; path=/; max-age=${60 * 60 * 24 * 365 * 2}`
    } catch {}
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger suppressHydrationWarning className="inline-flex items-center gap-1 rounded-md border bg-background px-2 py-1 text-xs text-foreground shadow-sm">
        <Languages className="h-4 w-4" /> {label}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("pt")} data-umami-event="language-switch" data-umami-event-lang="pt">Português (PT-BR)</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("en")} data-umami-event="language-switch" data-umami-event-lang="en">English (EN)</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("es")} data-umami-event="language-switch" data-umami-event-lang="es">Español (ES)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
