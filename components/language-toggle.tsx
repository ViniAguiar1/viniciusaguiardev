"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Languages } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function getInitialLang(): "pt" | "en" {
  if (typeof document === "undefined") return "pt"
  const m = document.cookie.match(/(?:^|; )lang=([^;]+)/)
  const val = m ? decodeURIComponent(m[1]) : "pt"
  return val === "en" ? "en" : "pt"
}

export function LanguageToggle() {
  const router = useRouter()
  const [lang, setLang] = useState<"pt" | "en">("pt")

  useEffect(() => {
    setLang(getInitialLang())
  }, [])

  const label = useMemo(() => (lang === "en" ? "EN" : "PT"), [lang])

  function setLanguage(next: "pt" | "en") {
    try {
      document.cookie = `lang=${next}; path=/; max-age=${60 * 60 * 24 * 365 * 2}`
    } catch {}
    setLang(next)
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

