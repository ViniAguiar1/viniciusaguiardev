import type { ReactNode } from "react"
import { SidebarProvider } from "@repo/ui/components/sidebar"
import { AppSidebar } from "./app-sidebar"
import { RightSidebar } from "./right-sidebar"
import { MobileHeader } from "./mobile-header"
import { Footer } from "./footer"
import { ThemeProvider } from "./theme-provider"
import { ZoneProvider } from "./zone-link"
import type { Zone } from "./zones"

// Moldura de dentro do <body>, igual em toda zona. <html>, fontes, Umami e o
// JSON-LD Organization ficam no layout de cada app (o check de AEO lê o
// layout.tsx do app).
export function SiteShell({ zone, children }: { zone: Zone; children: ReactNode }) {
  return (
    <ZoneProvider zone={zone}>
      <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
            <MobileHeader />
            {children}
            <Footer />
          </main>
          <RightSidebar />
        </SidebarProvider>
      </ThemeProvider>
    </ZoneProvider>
  )
}
