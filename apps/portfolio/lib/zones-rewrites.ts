import { ZONE_LOCALE_PARAM } from "@repo/shell/zones"

type Rewrite = { source: string; destination: string }

// Cada zona é outro app atrás deste domínio: /uses é apps/uses, /roadmap é o
// repositório github.com/ViniAguiar1/roadmap. Sem a URL em produção o rewrite
// apontaria para "undefined/..." e só quebraria em runtime — então o build falha.
function zoneRewrites(route: string, envVar: string, url: string | undefined, nodeEnv: string | undefined, devUrl: string): Rewrite[] {
  const raw = url ?? (nodeEnv === "production" ? undefined : devUrl)
  if (!raw) throw new Error(`${envVar} é obrigatória no build de produção (URL do deploy da zona /${route})`)
  const zone = raw.replace(/\/$/, "")
  return [
    { source: `/${ZONE_LOCALE_PARAM}/${route}`, destination: `${zone}/:locale/${route}` },
    { source: `/${ZONE_LOCALE_PARAM}/${route}/:path*`, destination: `${zone}/:locale/${route}/:path*` },
    { source: `/${route}`, destination: `${zone}/${route}` },
    { source: `/${route}-static/:path*`, destination: `${zone}/${route}-static/:path*` },
  ]
}

export function usesRewrites(env: { USES_ZONE_URL?: string; NODE_ENV?: string }) {
  return zoneRewrites("uses", "USES_ZONE_URL", env.USES_ZONE_URL, env.NODE_ENV, "http://localhost:3001")
}

export function roadmapRewrites(env: { ROADMAP_ZONE_URL?: string; NODE_ENV?: string }) {
  return zoneRewrites("roadmap", "ROADMAP_ZONE_URL", env.ROADMAP_ZONE_URL, env.NODE_ENV, "http://localhost:3002")
}
