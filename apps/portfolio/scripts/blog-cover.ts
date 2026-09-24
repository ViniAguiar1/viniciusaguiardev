// Gera candidatas de capa com a OpenAI e promove a escolhida.
//
//   pnpm blog:cover <slug>                  → 3 candidatas em .covers/<slug>/
//   pnpm blog:cover <slug> --style halftone → idem, com outro estilo registrado
//   pnpm blog:cover <slug> --pick 2         → public/blog/<slug>/{cover.webp,og.jpg}
//
// Nunca roda no build: a capa escolhida é commitada como qualquer asset, e
// lib/posts.ts deriva `cover` da existência de cover.webp no disco.
//
// O assunto vem de "coverSubject" em data/posts/<slug>.json — uma frase que
// descreve o que a imagem deve mostrar, em inglês, sem texto e sem cor.
import { existsSync } from "node:fs"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"
import {
  ACTIVE_COVER_STYLE,
  buildCoverPrompt,
  isCoverStyleId,
  type CoverStyleId,
} from "../lib/blog/cover-styles"

const MODEL = "gpt-image-2"
const SIZE = "1536x1024"
const VARIANTS = 3
const ROOT = process.cwd()

function fail(message: string): never {
  console.error(`✖ ${message}`)
  process.exit(1)
}

function parseArgs(argv: string[]) {
  const [slug, ...rest] = argv
  if (!slug || slug.startsWith("--")) {
    fail("uso: pnpm blog:cover <slug> [--style <id>] [--pick <1-3>]")
  }
  // O slug vira segmento de path (.covers/, public/blog/): só kebab-case.
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    fail(`slug inválido "${slug}": use kebab-case (a-z, 0-9, hífens simples)`)
  }
  const flag = (name: string) => {
    const i = rest.indexOf(`--${name}`)
    return i === -1 ? undefined : rest[i + 1]
  }
  const style = flag("style") ?? ACTIVE_COVER_STYLE
  if (!isCoverStyleId(style)) fail(`estilo desconhecido "${style}"`)
  const pickRaw = flag("pick")
  const pick = pickRaw === undefined ? undefined : Number(pickRaw)
  if (pick !== undefined && !(Number.isInteger(pick) && pick >= 1 && pick <= VARIANTS)) {
    fail(`--pick precisa ser um número de 1 a ${VARIANTS}`)
  }
  return { slug, style: style as CoverStyleId, pick }
}

async function readSubject(slug: string): Promise<string> {
  const file = path.join(ROOT, "data", "posts", `${slug}.json`)
  if (!existsSync(file)) fail(`data/posts/${slug}.json não encontrado`)
  const data = JSON.parse(await readFile(file, "utf8")) as Record<string, unknown>
  const subject = typeof data.coverSubject === "string" ? data.coverSubject.trim() : ""
  if (!subject) fail(`data/posts/${slug}.json: "coverSubject" está vazio ou ausente`)
  return subject
}

async function generate(prompt: string): Promise<Buffer> {
  const key = process.env.OPENAI_API_KEY
  if (!key) fail("OPENAI_API_KEY ausente — rode via pnpm blog:cover, que carrega o .env")
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: MODEL, prompt, n: 1, size: SIZE }),
  })
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`)
  }
  const json = (await res.json()) as { data?: Array<{ b64_json?: string }> }
  const b64 = json.data?.[0]?.b64_json
  if (!b64) throw new Error("resposta da API sem b64_json")
  return Buffer.from(b64, "base64")
}

async function promote(slug: string, pick: number) {
  const src = path.join(ROOT, ".covers", slug, `${pick}.png`)
  if (!existsSync(src)) fail(`${src} não existe — gere as candidatas antes de escolher`)
  const outDir = path.join(ROOT, "public", "blog", slug)
  await mkdir(outDir, { recursive: true })

  // Card da home: 16:9. A fonte é 3:2, então o corte tira topo e base.
  await sharp(src)
    .resize(1200, 675, { fit: "cover", position: "centre" })
    .webp({ quality: 82 })
    .toFile(path.join(outDir, "cover.webp"))

  // Card social: 1200x630 é o que OpenGraph e Twitter esperam.
  await sharp(src)
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(outDir, "og.jpg"))

  console.log(`✓ public/blog/${slug}/cover.webp + og.jpg`)
}

async function main() {
  const { slug, style, pick } = parseArgs(process.argv.slice(2))

  if (pick !== undefined) {
    await promote(slug, pick)
    return
  }

  const subject = await readSubject(slug)
  const prompt = buildCoverPrompt(subject, style)
  const dir = path.join(ROOT, ".covers", slug)
  await mkdir(dir, { recursive: true })

  console.log(`→ ${slug} · estilo ${style} · ${VARIANTS} candidatas`)
  let failures = 0
  for (let i = 1; i <= VARIANTS; i++) {
    try {
      const png = await generate(prompt)
      await writeFile(path.join(dir, `${i}.png`), png)
      console.log(`  ${i}.png  ${(png.length / 1024).toFixed(0)} KB`)
    } catch (err) {
      failures++
      console.error(`  ✖ ${i}: ${err instanceof Error ? err.message : String(err)}`)
    }
  }
  if (failures === VARIANTS) fail("todas as candidatas falharam")
  console.log(`\nescolha uma:  pnpm blog:cover ${slug} --pick <1-${VARIANTS}>`)
}

main().catch((err) => fail(err instanceof Error ? err.message : String(err)))
