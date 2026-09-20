import fs from "node:fs"
import path from "node:path"
import { describe, it, expect } from "vitest"

// process.cwd() é a raiz do repo sob Vitest — mesmo padrão de lib/i18n-coverage.test.ts
const ROOT = process.cwd()

const SCAN_DIRS = ["app", "components"]
const SKIPPED_DIR = path.join("components", "ui") // código gerado do Shadcn

const FAMILIES =
  "red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|gray|slate|zinc|neutral|stone"
const UTILITIES =
  "bg|text|border|ring|from|to|via|fill|stroke|shadow|outline|decoration|divide|accent|caret|placeholder"

const FAMILY_CLASS = new RegExp(`\\b(?:${UTILITIES})-(?:${FAMILIES})-\\d{2,3}\\b`, "g")
// white/black chapados. Com opacidade (bg-black/50) são permitidos: scrim de modal,
// que o próprio aguiarlabs usa em app/admin.
const FLAT_BW = new RegExp(`\\b(?:${UTILITIES})-(?:white|black)\\b(?!/)`, "g")
// Valores arbitrários de cor: text-[#444], border-[#eee], bg-[#f5f6fa]
const ARBITRARY_HEX = /\[#[0-9a-fA-F]{3,8}\]/g

function collectFiles(dir: string): string[] {
  const out: string[] = []
  for (const entry of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (rel === SKIPPED_DIR) continue
      out.push(...collectFiles(rel))
      continue
    }
    if (!/\.tsx?$/.test(entry.name)) continue
    if (entry.name.includes(".test.")) continue
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
          ...(src.match(ARBITRARY_HEX) ?? []),
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
