import { NextResponse, type NextRequest } from "next/server"
import { DEFAULT_LOCALE, isLocale } from "@repo/i18n"

// Mesmo contrato do proxy do portfólio (x-locale / x-pathname para
// getLocale()). Esta zona só tem /:locale/uses: qualquer caminho sem locale
// cai em /pt/uses.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const first = pathname.split("/").filter(Boolean)[0]

  if (isLocale(first)) {
    const headers = new Headers(request.headers)
    headers.set("x-locale", first)
    headers.set("x-pathname", pathname)
    return NextResponse.next({ request: { headers } })
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${DEFAULT_LOCALE}/uses`
  return NextResponse.redirect(url, 308)
}

export const config = {
  matcher: ["/((?!_next|uses-static|api|.*\\..*).*)"],
}
