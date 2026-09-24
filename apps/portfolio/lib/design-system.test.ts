import fs from "node:fs"
import path from "node:path"
import { describe, it, expect } from "vitest"

// process.cwd() é a raiz do app (apps/portfolio) sob Vitest — mesmo padrão de lib/i18n-coverage.test.ts
const ROOT = process.cwd()

// A moldura e o design system vivem em packages/ desde o monorepo: a varredura
// precisa ir até lá, senão uma cor fora da paleta na sidebar passaria.
const UI_COMPONENTS = path.join("..", "..", "packages", "ui", "src", "components")
const SCAN_DIRS = [
  "app",
  "components",
  "lib",
  path.join("..", "..", "packages", "ui", "src"),
  path.join("..", "..", "packages", "shell", "src"),
]
// Código gerado do Shadcn fica de fora; section-eyebrow mora na mesma pasta e é nosso.
const isGenerated = (rel: string) => rel.startsWith(UI_COMPONENTS + path.sep) && !rel.endsWith("section-eyebrow.tsx")

const FAMILIES =
  "red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|gray|slate|zinc|neutral|stone"
const UTILITIES =
  "bg|text|border|ring|from|to|via|fill|stroke|shadow|outline|decoration|divide|accent|caret|placeholder"

// Além dos prefixos de UTILITIES, bordas direcionais (border-t-, border-r-,
// border-b-, border-l-, border-x-, border-y-, border-s-, border-e-) e
// ring-offset- também carregam cor e escapavam do regex original.
const FAMILY_CLASS = new RegExp(
  `\\b(?:(?:${UTILITIES})-|border-[trblxyse]-|ring-offset-)(?:${FAMILIES})-\\d{2,3}\\b`,
  "g"
)
// white/black chapados. Com opacidade (bg-black/50) são permitidos: scrim de modal,
// que o próprio aguiarlabs usa em app/admin.
const FLAT_BW = new RegExp(`\\b(?:${UTILITIES})-(?:white|black)\\b(?!/)`, "g")
// Valores arbitrários de cor: text-[#444], border-[#eee], bg-[#f5f6fa], e
// também funções de cor: bg-[rgb(0,0,0)], text-[hsl(0,0%,0%)], border-[oklch(...)]
const ARBITRARY_COLOR = /\[(?:#[0-9a-fA-F]{3,8}|(?:rgb|rgba|hsl|hsla|oklch|lab)\()/g

function collectFiles(dir: string): string[] {
  const out: string[] = []
  for (const entry of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...collectFiles(rel))
      continue
    }
    if (!/\.tsx?$/.test(entry.name)) continue
    if (entry.name.includes(".test.")) continue
    if (isGenerated(rel)) continue
    out.push(rel)
  }
  return out
}

describe("paleta", () => {
  it("nenhuma cor fora dos 7 tokens em app/ e components/", () => {
    const offenders: string[] = []
    for (const dir of SCAN_DIRS) {
      for (const rel of collectFiles(dir)) {
        const src = fs.readFileSync(path.join(ROOT, rel), "utf-8")
        const hits = [
          ...(src.match(FAMILY_CLASS) ?? []),
          ...(src.match(FLAT_BW) ?? []),
          ...(src.match(ARBITRARY_COLOR) ?? []),
        ]
        if (hits.length) {
          offenders.push(`${rel}: ${[...new Set(hits)].sort().join(", ")}`)
        }
      }
    }
    expect(offenders).toEqual([])
  })

  // tagColor é cor no nível dos dados: nenhuma varredura de .tsx a enxerga.
  it("nenhum post declara tagColor", () => {
    const dir = path.join(ROOT, "data", "posts")
    const offenders = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".json"))
      .filter((f) => "tagColor" in JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")))
    expect(offenders).toEqual([])
  })
})

// rounded-full é permitido: pontos, avatares e a foto de perfil são
// formas redondas por natureza. O aguiarlabs mantém rounded-full no
// ponto de 6px do StatusStrip.
const BOXY_ROUNDED = /\brounded(?!-full)(?!-none)(?:-(?:sm|md|lg|xl|2xl|3xl))?\b/g

describe("cantos", () => {
  it("nenhuma caixa arredondada em app/ e components/", () => {
    const offenders: string[] = []
    for (const dir of SCAN_DIRS) {
      for (const rel of collectFiles(dir)) {
        const src = fs.readFileSync(path.join(ROOT, rel), "utf-8")
        const hits = src.match(BOXY_ROUNDED)
        if (hits) offenders.push(`${rel}: ${[...new Set(hits)].sort().join(", ")}`)
      }
    }
    expect(offenders).toEqual([])
  })
})

describe("varredura", () => {
  it("inclui o que é nosso em packages/ui e exclui o gerado pelo shadcn", () => {
    const files = collectFiles(path.join("..", "..", "packages", "ui", "src"))
    expect(files.some((f) => f.endsWith("section-eyebrow.tsx"))).toBe(true)
    expect(files.some((f) => f.endsWith("utils.ts"))).toBe(true)
    expect(files.some((f) => f.endsWith("sidebar.tsx"))).toBe(false)
  })
})
