import { NextResponse, type NextRequest } from "next/server"

const LOCALES = ["pt", "en", "es"] as const
type Locale = (typeof LOCALES)[number]
const DEFAULT_LOCALE: Locale = "pt"

function isLocale(value: string | undefined): value is Locale {
  return LOCALES.includes(value as Locale)
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const segments = pathname.split("/").filter(Boolean)
  const first = segments[0]

  if (isLocale(first)) {
    const headers = new Headers(request.headers)
    headers.set("x-locale", first)
    headers.set("x-pathname", pathname)
    return NextResponse.next({ request: { headers } })
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`
  return NextResponse.redirect(url, 308)
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
}
