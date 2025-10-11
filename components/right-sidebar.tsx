import { Home, Search } from "lucide-react"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { getLocale, getDictionary } from "@/lib/i18n-server"

export async function RightSidebar() {
  const locale = await getLocale()
  const dict = getDictionary(locale)
  return (
    <Sidebar
      side="right"
      // collapsible="none"
      className="h-screen w-18 min-w-0 max-w-xs"
    >
      <SidebarContent className="h-screen flex flex-col p-2">

        <div className="flex flex-col items-center gap-3 mb-4">
          <SidebarMenu className="flex flex-col items-center gap-3">
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="sm" className="w-8 h-8 p-0 hover:bg-transparent">
                <Link href="/" title={dict.nav.home} className="flex items-center justify-center">
                  <Home className="w-5 h-5" />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              {/* <SidebarMenuButton asChild size="sm" className="w-8 h-8 p-0 hover:bg-transparent">
                <a href="/search" title={dict.ui.search} className="flex items-center justify-center">
                  <Search className="w-5 h-5" />
                </a>
              </SidebarMenuButton> */}
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
