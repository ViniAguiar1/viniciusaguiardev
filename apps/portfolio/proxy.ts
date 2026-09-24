import { NextResponse, type NextRequest } from "next/server"
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n"

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
