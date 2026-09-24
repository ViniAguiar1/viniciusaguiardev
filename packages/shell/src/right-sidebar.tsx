import { Home } from "lucide-react"
import { ZoneLink } from "./zone-link"

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/sidebar"
import { ModeToggle } from "./theme-toggle"
import { LanguageToggle } from "./language-toggle"
import { SearchButton } from "./search-button"
import { getLocale, getDictionary } from "@repo/i18n/server"
import { localePath } from "@repo/i18n"

export async function RightSidebar() {
  const locale = await getLocale()
  const dict = getDictionary(locale)
  return (
    <Sidebar
      side="right"
      collapsible="none"
      className="sticky top-0 h-screen w-18 min-w-0 max-w-xs hidden lg:flex border-l border-line"
    >
      <SidebarContent className="h-full flex flex-col p-2">

        <div className="flex flex-col items-center gap-3 mb-4">
          <SidebarMenu className="flex flex-col items-center gap-3">
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="sm" className="w-8 h-8 p-0 text-mu hover:text-fg">
                <ZoneLink href={localePath(locale, "/")} title={dict.nav.home} className="flex items-center justify-center">
                  <Home className="w-5 h-5" />
                </ZoneLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SearchButton />
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

        <div className="flex flex-col items-center mt-auto gap-2">
          <LanguageToggle />
          <ModeToggle />
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
