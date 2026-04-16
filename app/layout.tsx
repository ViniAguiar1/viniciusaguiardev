import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { RightSidebar } from "@/components/right-sidebar";
import { MobileHeader } from "@/components/mobile-header";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://viniciusaguiardev.com.br"

export const metadata: Metadata = {
  title: {
    default: "Vinicius Aguiar — Software Engineer | React, Next.js, TypeScript",
    template: "%s | Vinicius Aguiar",
  },
  description:
    "Software Engineer especializado em React, Next.js e TypeScript. Construindo plataformas SaaS, integrações e sistemas em produção.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: "en_US",
    siteName: "Vinicius Aguiar",
    title: "Vinicius Aguiar — Software Engineer | React, Next.js, TypeScript",
    description:
      "Software Engineer especializado em React, Next.js e TypeScript. Construindo plataformas SaaS, integrações e sistemas em produção.",
    url: siteUrl,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vinicius Aguiar — Software Engineer | React, Next.js, TypeScript",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinicius Aguiar — Software Engineer | React, Next.js, TypeScript",
    description:
      "Software Engineer especializado em React, Next.js e TypeScript.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 flex flex-col">
              <MobileHeader />
              {children}
            </main>
            <RightSidebar />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
