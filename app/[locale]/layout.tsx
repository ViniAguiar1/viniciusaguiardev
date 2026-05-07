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

  const title = t(locale, { pt: "Vinicius Aguiar — Software Engineer | SaaS, Pagamentos, IA em Produção", en: "Vinicius Aguiar — Software Engineer | SaaS, Payments, AI in Production", es: "Vinicius Aguiar — Software Engineer | SaaS, Pagos, IA en Producción" })

  const description = t(locale, { pt: "Software Engineer que constrói plataformas SaaS em produção — integrações de pagamento, arquitetura multi-tenant e automações com IA. React, Next.js, TypeScript.", en: "Software Engineer building production SaaS platforms — payment integrations, multi-tenant architecture and AI automation. React, Next.js, TypeScript.", es: "Software Engineer que construye plataformas SaaS en producción — integraciones de pago, arquitectura multi-tenant y automatizaciones con IA. React, Next.js, TypeScript." })

  const ogLocale = locale === "en" ? "en_US" : locale === "es" ? "es_ES" : "pt_BR"

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
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) =>
        l === "en" ? "en_US" : l === "es" ? "es_ES" : "pt_BR",
      ),
      siteName: "Vinicius Aguiar",
      title,
      description,
      url: `${SITE_URL}/${locale}`,
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
      title,
      description: t(locale, { pt: "Software Engineer — plataformas SaaS, pagamentos e IA em produção.", en: "Software Engineer — SaaS platforms, payments and AI in production.", es: "Software Engineer — plataformas SaaS, pagos e IA en producción." }),
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
