"use client"

import { useMemo } from "react"
import { usePathname } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu"
import { LOCALES, DEFAULT_LOCALE, isLocale, stripLocale, localePath, type Locale } from "@repo/i18n"
import { useZoneNavigate } from "./zone-link"

const flags: Record<Locale, string> = { pt: "🇧🇷", en: "🇺🇸", es: "🇪🇸", jp: "🇯🇵", fr: "🇫🇷" }
const labels: Record<Locale, string> = { pt: "Português", en: "English", es: "Español", jp: "日本語", fr: "Français" }

function localeFromPath(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0]
  return isLocale(first) ? first : DEFAULT_LOCALE
}

export function LanguageToggle() {
  const navigate = useZoneNavigate()
  const pathname = usePathname() ?? "/"
  const lang = localeFromPath(pathname)
  const flag = useMemo(() => flags[lang], [lang])

  function setLanguage(next: Locale) {
    if (next === lang) return
    const rest = stripLocale(pathname)
    navigate(localePath(next, rest))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        suppressHydrationWarning
        className="inline-flex items-center gap-1 border bg-canvas px-2 py-1 text-xs text-fg shadow-sm"
      >
        <span className="text-base leading-none">{flag}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LOCALES.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => setLanguage(l)}
            data-umami-event="language-switch"
            data-umami-event-lang={l}
          >
            {flags[l]} {labels[l]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
