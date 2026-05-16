"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Search } from "lucide-react"
import { DEFAULT_LOCALE, isLocale, localePath, type Locale } from "@/lib/i18n"

function localeFromPath(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0]
  return isLocale(first) ? first : DEFAULT_LOCALE
}

export function SearchButton() {
  const router = useRouter()
  const pathname = usePathname() ?? "/"
  const locale = localeFromPath(pathname)
  const searchPath = localePath(locale, "/busca")

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        router.push(searchPath)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [router, searchPath])

  return (
    <button
      type="button"
      onClick={() => router.push(searchPath)}
      className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-colors"
      title="Search (⌘K)"
    >
      <Search className="w-5 h-5" />
    </button>
  )
}
