"use client"

import { Menu } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"

export function MobileHeader() {
  const { setOpenMobile } = useSidebar()

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background px-4 py-3 md:hidden">
      <button
        type="button"
        onClick={() => setOpenMobile(true)}
        className="flex items-center justify-center rounded-md p-1.5 hover:bg-muted transition"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      <span className="text-sm font-semibold">Vinicius Aguiar</span>

      <div className="flex items-center gap-1.5">
        <LanguageToggle />
        <ModeToggle />
      </div>
    </header>
  )
}
