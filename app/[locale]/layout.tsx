import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { RightSidebar } from "@/components/right-sidebar"
import { MobileHeader } from "@/components/mobile-header"
import { ThemeProvider } from "@/components/theme-provider"
import { JsonLd } from "@/components/json-ld"
import { Footer } from "@/components/footer"
import {
  LOCALES,
  isLocale,
  localeToHtmlLang,
  localeToOgLocale,
  buildAlternates,
  SITE_URL,
  t,
  type Locale,
} from "@/lib/i18n"
import "../globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) return {}
  const locale: Locale = rawLocale

  const title = t(locale, { pt: "Vinicius Aguiar — Frontend Engineer | React, Next.js & Performance Engineering", en: "Vinicius Aguiar — Frontend Engineer | React, Next.js & Performance Engineering", es: "Vinicius Aguiar — Frontend Engineer | React, Next.js & Performance Engineering", jp: "Vinicius Aguiar — フロントエンドエンジニア | React・Next.js・パフォーマンスエンジニアリング", fr: "Vinicius Aguiar — Frontend Engineer | React, Next.js & Performance Engineering" })

  const description = t(locale, { pt: "Frontend Engineer — React, Next.js, TypeScript e performance engineering em SaaS de produção. Capacidade full-stack como diferencial: pagamentos, multi-tenant e IA.", en: "Frontend Engineer — React, Next.js, TypeScript and performance engineering on production SaaS. Full-stack range as a differentiator: payments, multi-tenant and AI.", es: "Frontend Engineer — React, Next.js, TypeScript y performance engineering en SaaS de producción. Capacidad full-stack como diferencial: pagos, multi-tenant e IA.", jp: "フロントエンドエンジニア — React、Next.js、TypeScript、本番SaaSのパフォーマンスエンジニアリング。決済、マルチテナント、AIまで扱えるフルスタック力が強み。", fr: "Frontend Engineer — React, Next.js, TypeScript et performance engineering sur des SaaS en production. Une polyvalence full-stack comme atout : paiements, multi-tenant et IA." })

  const ogLocale = localeToOgLocale(locale)

  return {
    title: {
      default: title,
      template: "%s | Vinicius Aguiar",
    },
    description,
    metadataBase: new URL(SITE_URL),
    alternates: buildAlternates("/", locale),
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: LOCALES.filter((l) => l !== locale).map(localeToOgLocale),
      siteName: "Vinicius Aguiar",
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Vinicius Aguiar — Frontend Engineer | React, Next.js & Performance Engineering",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t(locale, { pt: "Frontend Engineer — React, Next.js e performance engineering em SaaS de produção.", en: "Frontend Engineer — React, Next.js and performance engineering on production SaaS.", es: "Frontend Engineer — React, Next.js y performance engineering en SaaS de producción.", jp: "フロントエンドエンジニア — React、Next.js、本番SaaSのパフォーマンスエンジニアリング。", fr: "Frontend Engineer — React, Next.js et performance engineering sur des SaaS en production." }),
      images: ["/og-image.png"],
    },
  }
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale: Locale = rawLocale

  return (
    <html
      lang={localeToHtmlLang(locale)}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="793f27db-931a-4f7b-b7bb-402caabc6f1c"
          strategy="afterInteractive"
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Vinicius Aguiar",
            url: SITE_URL,
            logo: `${SITE_URL}/og-image.png`,
            sameAs: [
              "https://github.com/ViniAguiar1",
              "https://www.linkedin.com/in/viniciusaguiar-araujo/",
            ],
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
      </body>
    </html>
  )
}
