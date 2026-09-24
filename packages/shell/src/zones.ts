// A que app (zona) pertence cada caminho do domínio. Navegar dentro da mesma
// zona pode ser client-side; atravessar zonas exige carregar o documento,
// porque a rota não existe no app atual.
export type Zone = "portfolio"

export function zoneFor(_pathname: string): Zone {
  return "portfolio"
}

export type LinkMode = "client" | "document" | "external"

export function linkMode(current: Zone, href: string): LinkMode {
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//")) return "external"
  const pathname = href.split(/[?#]/)[0] || "/"
  return zoneFor(pathname) === current ? "client" : "document"
}
