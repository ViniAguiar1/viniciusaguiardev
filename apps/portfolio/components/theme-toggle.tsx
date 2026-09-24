"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"

import { Button } from "@repo/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu"
import { DEFAULT_LOCALE, isLocale, t, type Locale } from "@repo/i18n"

function localeFromPath(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0]
  return isLocale(first) ? first : DEFAULT_LOCALE
}

export function ModeToggle() {
  const { setTheme } = useTheme()
  const pathname = usePathname() ?? "/"
  const locale = localeFromPath(pathname)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild suppressHydrationWarning>
        <Button variant="outline" size="icon" suppressHydrationWarning>
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">
            {t(locale, { pt: "Alternar tema", en: "Toggle theme", es: "Cambiar tema", jp: "テーマを切り替える", fr: "Changer de thème" })}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          {t(locale, { pt: "Claro", en: "Light", es: "Claro", jp: "ライト", fr: "Clair" })}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          {t(locale, { pt: "Escuro", en: "Dark", es: "Oscuro", jp: "ダーク", fr: "Sombre" })}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
