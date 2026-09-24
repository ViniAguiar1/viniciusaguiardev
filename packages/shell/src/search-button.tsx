"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { Search } from "lucide-react"
import { DEFAULT_LOCALE, isLocale, localePath, type Locale } from "@repo/i18n"
import { useZoneNavigate } from "./zone-link"

function localeFromPath(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0]
  return isLocale(first) ? first : DEFAULT_LOCALE
}

export function SearchButton() {
  const navigate = useZoneNavigate()
  const pathname = usePathname() ?? "/"
  const locale = localeFromPath(pathname)
  const searchPath = localePath(locale, "/busca")

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        navigate(searchPath)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [navigate, searchPath])

  return (
    <button
      type="button"
      onClick={() => navigate(searchPath)}
      className="flex items-center justify-center w-8 h-8 text-mu hover:text-fg transition-colors"
      title="Search (⌘K)"
    >
      <Search className="w-5 h-5" />
    </button>
  )
}
