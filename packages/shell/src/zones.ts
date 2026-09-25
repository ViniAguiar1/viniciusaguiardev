import { LOCALES } from "@repo/i18n"

// A que app (zona) pertence cada caminho do domínio. Navegar dentro da mesma
// zona pode ser client-side; atravessar zonas exige carregar o documento,
// porque a rota não existe no app atual.
export type Zone = "portfolio" | "uses"

const LOCALE_GROUP = `(?:${LOCALES.join("|")})`
const USES = new RegExp(`^(?:/${LOCALE_GROUP})?/uses(?:/.*)?$`)

// Parâmetro de locale no formato path-to-regexp, para os rewrites do portfólio.
export const USES_LOCALE_PARAM = `:locale(${LOCALES.join("|")})`

export function zoneFor(pathname: string): Zone {
  return USES.test(pathname) ? "uses" : "portfolio"
}

export type LinkMode = "client" | "document" | "external"

export function linkMode(current: Zone, href: string): LinkMode {
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//")) return "external"
  const pathname = href.split(/[?#]/)[0] || "/"
  return zoneFor(pathname) === current ? "client" : "document"
}

// Zonas servidas por rewrite não pré-carregam. Pelo proxy, o prefetch por
// segmento do Next 16 chega à zona num formato que ela não serve (404 em
// produção, invisível em dev). Navegar continua funcionando: o clique busca o
// payload completo, que atravessa o rewrite sem problema.
export function shouldPrefetch(current: Zone): boolean {
  return current === "portfolio"
}
