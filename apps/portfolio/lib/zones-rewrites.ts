import { USES_LOCALE_PARAM } from "@repo/shell/zones"

type Env = { USES_ZONE_URL?: string; NODE_ENV?: string }

// /uses é servida por outro app (apps/uses), atrás deste domínio. Sem a URL em
// produção o rewrite apontaria para "undefined/..." e só quebraria em runtime —
// então o build falha.
export function usesRewrites(env: Env) {
  const raw = env.USES_ZONE_URL ?? (env.NODE_ENV === "production" ? undefined : "http://localhost:3001")
  if (!raw) throw new Error("USES_ZONE_URL é obrigatória no build de produção (URL do deploy da zona /uses)")
  const zone = raw.replace(/\/$/, "")
  return [
    { source: `/${USES_LOCALE_PARAM}/uses`, destination: `${zone}/:locale/uses` },
    { source: `/${USES_LOCALE_PARAM}/uses/:path*`, destination: `${zone}/:locale/uses/:path*` },
    { source: "/uses", destination: `${zone}/uses` },
    { source: "/uses-static/:path*", destination: `${zone}/uses-static/:path*` },
  ]
}
