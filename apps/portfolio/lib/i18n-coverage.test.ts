import fs from "node:fs"
import path from "node:path"
import ts from "typescript"
import { describe, it, expect } from "vitest"
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n"
import { getDictionary } from "@/lib/i18n-server"

// process.cwd() é a raiz do repo sob Vitest — mesmo padrão que lib/posts.ts já usa
const ROOT = process.cwd()

const SCAN_DIRS = ["app", "components"]
const SCAN_FILES = ["data/projects.ts", "data/experiences.ts"]
const SKIPPED_DIR = path.join("components", "ui") // código gerado do Shadcn

const POST_STRING_FIELDS = ["title", "description", "date", "readTime", "tag"] as const

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

function keyOf(prop: ts.ObjectLiteralElementLike): string | null {
  if (!ts.isPropertyAssignment(prop) && !ts.isShorthandPropertyAssignment(prop)) return null
  const { name } = prop
  if (ts.isIdentifier(name) || ts.isStringLiteral(name)) return name.text
  return null
}

function findGaps(relPath: string): string[] {
  const source = fs.readFileSync(path.join(ROOT, relPath), "utf-8")
  // ScriptKind por extensão: TSX num .ts faz o parser confundir generics com JSX
  const kind = relPath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  const sf = ts.createSourceFile(relPath, source, ts.ScriptTarget.Latest, true, kind)
  const gaps: string[] = []

  function visit(node: ts.Node) {
    if (ts.isObjectLiteralExpression(node)) {
      const keys = new Set(node.properties.map(keyOf).filter((k): k is string => k !== null))
      if (keys.has(DEFAULT_LOCALE)) {
        const missing = LOCALES.filter((l) => !keys.has(l))
        if (missing.length > 0) {
          const { line } = sf.getLineAndCharacterOfPosition(node.getStart(sf))
          gaps.push(`${relPath}:${line + 1} → falta ${missing.join(", ")}`)
        }
      }
    }
    ts.forEachChild(node, visit)
  }

  visit(sf)
  return gaps
}

describe("cobertura de i18n", () => {
  it("traduz todo object literal com chave pt para todos os locales", () => {
    const files = [...SCAN_DIRS.flatMap(collectFiles), ...SCAN_FILES]
    const gaps = files.flatMap(findGaps)
    // console.error em vez de mensagem de assert: o Vitest trunca diffs grandes,
    // e essa lista e o checklist de traducao -- precisa sair inteira
    if (gaps.length > 0) {
      console.error(`\n${gaps.length} objeto(s) incompleto(s):\n${gaps.join("\n")}\n`)
    }
    expect(gaps.length, "objeto(s) incompleto(s) — lista acima").toBe(0)
  })

  it("retorna um Dictionary distinto para cada locale", () => {
    const base = getDictionary(DEFAULT_LOCALE)
    for (const locale of LOCALES) {
      if (locale === DEFAULT_LOCALE) continue
      expect(
        getDictionary(locale),
        `getDictionary("${locale}") caiu no dicionário padrão`,
      ).not.toBe(base)
    }
  })

  it("traduz todo post para todos os locales", () => {
    const dir = path.join(ROOT, "data", "posts")
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json") && !f.startsWith("."))
    const gaps: string[] = []

    for (const file of files) {
      const raw = JSON.parse(fs.readFileSync(path.join(dir, file), "utf-8")) as Record<string, unknown>
      for (const locale of LOCALES) {
        if (locale === DEFAULT_LOCALE) continue
        for (const field of POST_STRING_FIELDS) {
          const value = raw[`${field}_${locale}`]
          if (typeof value !== "string" || value.trim() === "") {
            gaps.push(`${file} → ${field}_${locale}`)
          }
        }
        const blocks = raw[`blocks_${locale}`]
        if (!Array.isArray(blocks) || blocks.length === 0) {
          gaps.push(`${file} → blocks_${locale}`)
        }
      }
    }

    if (gaps.length > 0) {
      console.error(`\n${gaps.length} campo(s) faltando:\n${gaps.join("\n")}\n`)
    }
    expect(gaps.length, "campo(s) de post faltando — lista acima").toBe(0)
  })
})
