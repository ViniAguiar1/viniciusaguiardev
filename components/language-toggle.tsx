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

function getCookieLang(): "pt" | "en" {
  const m = document.cookie.match(/(?:^|; )lang=([^;]+)/)
  const val = m ? decodeURIComponent(m[1]) : "pt"
  return val === "en" ? "en" : "pt"
}

function subscribe(cb: () => void) {
  window.addEventListener("languagechange", cb)
  return () => window.removeEventListener("languagechange", cb)
}

function getSnapshot(): "pt" | "en" {
  return getCookieLang()
}

function getServerSnapshot(): "pt" | "en" {
  return "pt"
}

export function LanguageToggle() {
  const router = useRouter()
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const label = useMemo(() => (lang === "en" ? "EN" : "PT"), [lang])

  function setLanguage(next: "pt" | "en") {
    try {
      document.cookie = `lang=${next}; path=/; max-age=${60 * 60 * 24 * 365 * 2}`
    } catch {}
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex items-center gap-1 rounded-md border bg-background px-2 py-1 text-xs text-foreground shadow-sm">
        <Languages className="h-4 w-4" /> {label}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("pt")}>Português (PT-BR)</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("en")}>English (EN)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

