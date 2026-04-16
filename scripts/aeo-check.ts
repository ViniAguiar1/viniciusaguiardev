/**
 * AEO (Answer Engine Optimization) local validator.
 * Checks the built output for AI discoverability signals.
 * Exit code 1 if score < threshold (default 90).
 *
 * Usage: npx tsx scripts/aeo-check.ts
 */

import fs from "fs"
import path from "path"

const PUBLIC = path.join(process.cwd(), "public")
const APP = path.join(process.cwd(), "app")
const THRESHOLD = 90

type Check = { label: string; passed: boolean; points: number }
type Category = { name: string; checks: Check[] }

const categories: Category[] = []

// ── AI Access ──
const aiAccess: Check[] = [
  {
    label: "robots.txt exists (app/robots.ts)",
    passed: fs.existsSync(path.join(APP, "robots.ts")),
    points: 4,
  },
  {
    label: "llms.txt exists (public/llms.txt)",
    passed: fs.existsSync(path.join(PUBLIC, "llms.txt")),
    points: 4,
  },
  {
    label: "sitemap.xml exists (app/sitemap.ts)",
    passed: fs.existsSync(path.join(APP, "sitemap.ts")),
    points: 4,
  },
  {
    label: "robots.txt allows all crawlers",
    passed: (() => {
      const file = path.join(APP, "robots.ts")
      if (!fs.existsSync(file)) return false
      const content = fs.readFileSync(file, "utf-8")
      return content.includes('userAgent: "*"') && content.includes('allow: "/"')
    })(),
    points: 4,
  },
]
categories.push({ name: "AI Access", checks: aiAccess })

// ── Schema Presence ──
function findInFiles(dir: string, pattern: RegExp, ext = ".tsx"): boolean {
  if (!fs.existsSync(dir)) return false
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (findInFiles(full, pattern, ext)) return true
    } else if (entry.name.endsWith(ext)) {
      if (pattern.test(fs.readFileSync(full, "utf-8"))) return true
    }
  }
  return false
}

const layoutContent = fs.existsSync(path.join(APP, "layout.tsx"))
  ? fs.readFileSync(path.join(APP, "layout.tsx"), "utf-8")
  : ""

const schemaChecks: Check[] = [
  {
    label: "JSON-LD component exists",
    passed: fs.existsSync(path.join(process.cwd(), "components", "json-ld.tsx")),
    points: 4,
  },
  {
    label: "Organization schema in layout",
    passed: layoutContent.includes('"@type": "Organization"') || layoutContent.includes("Organization"),
    points: 4,
  },
  {
    label: "Organization logo configured",
    passed: layoutContent.includes("logo"),
    points: 4,
  },
  {
    label: "FAQPage schema exists",
    passed: findInFiles(APP, /FAQPage/),
    points: 4,
  },
  {
    label: "Article schema in posts",
    passed: (() => {
      const postsPage = path.join(APP, "posts", "[slug]", "page.tsx")
      if (!fs.existsSync(postsPage)) return false
      return fs.readFileSync(postsPage, "utf-8").includes("Article")
    })(),
    points: 4,
  },
]
categories.push({ name: "Schema Presence", checks: schemaChecks })

// ── Meta Quality ──
const metaChecks: Check[] = [
  {
    label: "Title configured in layout metadata",
    passed: layoutContent.includes("title") && layoutContent.includes("template"),
    points: 4,
  },
  {
    label: "Description configured in layout metadata",
    passed: layoutContent.includes("description"),
    points: 4,
  },
  {
    label: "Open Graph tags configured",
    passed: layoutContent.includes("openGraph"),
    points: 4,
  },
  {
    label: "OG image configured",
    passed: layoutContent.includes("og-image"),
    points: 4,
  },
  {
    label: "Canonical URL configured",
    passed: layoutContent.includes("canonical") || layoutContent.includes("alternates"),
    points: 4,
  },
]
categories.push({ name: "Meta Quality", checks: metaChecks })

// ── Content Structure ──
const postsDir = path.join(process.cwd(), "data", "posts")
const postFiles = fs.existsSync(postsDir)
  ? fs.readdirSync(postsDir).filter((f) => f.endsWith(".json") && !f.startsWith("."))
  : []

const contentChecks: Check[] = [
  {
    label: "Multiple pages exist (4+ routes)",
    passed:
      fs.existsSync(path.join(APP, "page.tsx")) &&
      fs.existsSync(path.join(APP, "sobre", "page.tsx")) &&
      fs.existsSync(path.join(APP, "projetos", "page.tsx")) &&
      fs.existsSync(path.join(APP, "engenharia", "page.tsx")),
    points: 4,
  },
  {
    label: "Blog posts exist (3+)",
    passed: postFiles.length >= 3,
    points: 4,
  },
  {
    label: "Posts have bilingual content (blocks_en)",
    passed: postFiles.some((f) => {
      const content = fs.readFileSync(path.join(postsDir, f), "utf-8")
      return content.includes("blocks_en")
    }),
    points: 4,
  },
  {
    label: "llms.txt has substantial content (500+ chars)",
    passed: (() => {
      const file = path.join(PUBLIC, "llms.txt")
      return fs.existsSync(file) && fs.readFileSync(file, "utf-8").length >= 500
    })(),
    points: 4,
  },
]
categories.push({ name: "Content Structure", checks: contentChecks })

// ── Citability ──
const engPage = path.join(APP, "engenharia", "page.tsx")
const engContent = fs.existsSync(engPage) ? fs.readFileSync(engPage, "utf-8") : ""

const citabilityChecks: Check[] = [
  {
    label: "FAQ section exists",
    passed: engContent.includes("FAQ") || engContent.includes("faq"),
    points: 5,
  },
  {
    label: "sameAs social profiles configured",
    passed: layoutContent.includes("sameAs"),
    points: 5,
  },
]
categories.push({ name: "Citability", checks: citabilityChecks })

// ── Report ──
let totalScore = 0
let totalMax = 0

console.log("\n  AEO Readiness Check\n")

for (const cat of categories) {
  const catScore = cat.checks.reduce((s, c) => s + (c.passed ? c.points : 0), 0)
  const catMax = cat.checks.reduce((s, c) => s + c.points, 0)
  totalScore += catScore
  totalMax += catMax

  console.log(`  ${cat.name} (${catScore}/${catMax})`)
  for (const check of cat.checks) {
    const icon = check.passed ? "\x1b[32m✓\x1b[0m" : "\x1b[31m✗\x1b[0m"
    console.log(`    ${icon} ${check.label}`)
  }
  console.log()
}

const pct = Math.round((totalScore / totalMax) * 100)
console.log(`  Score: ${totalScore}/${totalMax} (${pct}/100)\n`)

if (pct < THRESHOLD) {
  console.log(`  \x1b[31m✗ FAIL: Score ${pct} is below threshold ${THRESHOLD}\x1b[0m\n`)
  process.exit(1)
} else {
  console.log(`  \x1b[32m✓ PASS: Score ${pct} meets threshold ${THRESHOLD}\x1b[0m\n`)
}
