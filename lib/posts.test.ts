import { describe, it, expect } from "vitest"
import { applyLocaleToData, normalizeBlocks, getAllPosts, getPostBySlug, type RawPostData } from "./posts"

describe("applyLocaleToData", () => {
  const base: RawPostData = {
    title: "Olá",
    description: "Descrição",
    content: "Conteúdo",
    date: "2026-01-01",
    readTime: "5 min",
    tag: "geral",
    title_en: "Hello",
    description_en: "Description",
    content_en: "Content",
    date_en: "2026-01-02",
    readTime_en: "5 min read",
    tag_en: "general",
    title_es: "Hola",
    blocks_es: [{ type: "paragraph", text: "Hola mundo" }],
  }

  it("returns base PT fields when locale is pt", () => {
    const result = applyLocaleToData(base, "pt")
    expect(result.title).toBe("Olá")
    expect(result.description).toBe("Descrição")
    expect(result.date).toBe("2026-01-01")
    expect(result.tag).toBe("geral")
  })

  it("applies _en suffix when locale is en", () => {
    const result = applyLocaleToData(base, "en")
    expect(result.title).toBe("Hello")
    expect(result.description).toBe("Description")
    expect(result.content).toBe("Content")
    expect(result.date).toBe("2026-01-02")
    expect(result.readTime).toBe("5 min read")
    expect(result.tag).toBe("general")
  })

  it("falls back to base when suffix field is missing", () => {
    const partial: RawPostData = { title: "Olá", title_en: "Hello", description: "Sem en" }
    const result = applyLocaleToData(partial, "en")
    expect(result.title).toBe("Hello")
    expect(result.description).toBe("Sem en")
  })

  it("swaps blocks array when blocks_es is present", () => {
    const result = applyLocaleToData(base, "es")
    expect(result.title).toBe("Hola")
    expect(result.blocks).toEqual([{ type: "paragraph", text: "Hola mundo" }])
  })

  it("ignores suffix fields with wrong type", () => {
    const malformed = { title: "Olá", title_en: 123 } as unknown as RawPostData
    const result = applyLocaleToData(malformed, "en")
    expect(result.title).toBe("Olá")
  })
})

describe("normalizeBlocks", () => {
  it("aceita bloco mfe com origem permitida e tag valida", () => {
    const result = normalizeBlocks({
      blocks: [{ type: "mfe", src: "https://mfe-angular-inspector.vercel.app/inspector.js", tag: "mfe-inspector" }],
    })
    expect(result).toEqual([
      { type: "mfe", src: "https://mfe-angular-inspector.vercel.app/inspector.js", tag: "mfe-inspector" },
    ])
  })

  it("descarta bloco mfe com origem fora da allowlist, sem https ou com tag invalida", () => {
    const result = normalizeBlocks({
      blocks: [
        { type: "mfe", src: "https://evil.example.com/x.js", tag: "mfe-inspector" },
        { type: "mfe", src: "http://mfe-angular-inspector.vercel.app/inspector.js", tag: "mfe-inspector" },
        { type: "mfe", src: "https://mfe-angular-inspector.vercel.app/inspector.js", tag: "inspector" },
        { type: "mfe", tag: "mfe-inspector" },
        { type: "paragraph", text: "sobra" },
      ],
    })
    expect(result).toEqual([{ type: "paragraph", text: "sobra" }])
  })

  it("normalizes paragraph blocks", () => {
    const result = normalizeBlocks({
      blocks: [{ type: "paragraph", text: "hello" }],
    })
    expect(result).toEqual([{ type: "paragraph", text: "hello" }])
  })

  it("normalizes code blocks with and without language", () => {
    const result = normalizeBlocks({
      blocks: [
        { type: "code", code: "console.log('a')", language: "ts" },
        { type: "code", code: "x" },
      ],
    })
    expect(result).toEqual([
      { type: "code", code: "console.log('a')", language: "ts" },
      { type: "code", code: "x", language: undefined },
    ])
  })

  it("normalizes image blocks with optional fields", () => {
    const result = normalizeBlocks({
      blocks: [
        { type: "image", src: "/a.png" },
        { type: "image", src: "/b.png", alt: "alt", width: 100, height: 50 },
      ],
    })
    expect(result).toEqual([
      { type: "image", src: "/a.png" },
      { type: "image", src: "/b.png", alt: "alt", width: 100, height: 50 },
    ])
  })

  it("normalizes heading blocks with level", () => {
    const result = normalizeBlocks({
      blocks: [{ type: "heading", text: "Title", level: 2 }],
    })
    expect(result).toEqual([{ type: "heading", text: "Title", level: 2 }])
  })

  it("normalizes list blocks and filters non-string items", () => {
    const result = normalizeBlocks({
      blocks: [
        { type: "list", ordered: true, items: ["one", 2, "three", null] },
      ],
    })
    expect(result).toEqual([{ type: "list", ordered: true, items: ["one", "three"] }])
  })

  it("skips unknown block types and malformed entries", () => {
    const result = normalizeBlocks({
      blocks: [
        { type: "unknown", text: "x" },
        null,
        "not an object",
        { type: "paragraph" },
        { type: "paragraph", text: "valid" },
      ] as unknown[],
    })
    expect(result).toEqual([{ type: "paragraph", text: "valid" }])
  })

  it("falls back to content split when blocks are absent or empty", () => {
    const result = normalizeBlocks({
      content: "first paragraph\n\nsecond paragraph",
    })
    expect(result).toEqual([
      { type: "paragraph", text: "first paragraph" },
      { type: "paragraph", text: "second paragraph" },
    ])
  })

  it("returns [] when no blocks and no content", () => {
    expect(normalizeBlocks({})).toEqual([])
  })
})

describe("getPostBySlug", () => {
  it("returns null for an unknown slug", () => {
    expect(getPostBySlug("__definitely-not-a-real-slug__", "pt")).toBeNull()
  })

  it("resolves a post directly by its filename slug", () => {
    const post = getPostBySlug("inbox-cursor-pagination-virtualization", "pt")
    expect(post).not.toBeNull()
  })
})

describe("getAllPosts", () => {
  it("never includes draft posts", () => {
    const posts = getAllPosts("pt")
    expect(posts.length).toBeGreaterThan(0)
    expect(posts.every((p) => !p.draft)).toBe(true)
  })

  it("sorts by publication date, newest first", () => {
    const datas = getAllPosts("pt").map((p) => p.publishedAt)
    expect([...datas].sort().reverse()).toEqual(datas)
  })

  it("keeps home-hidden posts available in the full listing", () => {
    const posts = getAllPosts("pt")
    const hidden = posts.filter((p) => !p.showOnHome).map((p) => p.slug).sort()
    expect(hidden).toEqual(["docker-for-frontend-devs", "starting-typescript"])
  })

  // Uma data ausente ou malformada não quebraria o build: ordenaria por
  // último em silêncio e iria para o schema.org como lixo, que é o bug que
  // este campo veio corrigir. Só um teste pega isso.
  it("gives every post a valid ISO 8601 publication date", () => {
    const invalidos = getAllPosts("pt")
      .filter((p) => !/^\d{4}-\d{2}-\d{2}$/.test(p.publishedAt) || Number.isNaN(Date.parse(p.publishedAt)))
      .map((p) => `${p.slug}: ${JSON.stringify(p.publishedAt)}`)
    expect(invalidos).toEqual([])
  })

  // O desempate por slug é o que mantém a listagem estável entre máquinas;
  // sem ele, cinco posts que dividem a mesma data ordenariam pelo readdir.
  it("breaks same-date ties by slug, not by filesystem order", () => {
    const posts = getAllPosts("pt")
    const empatados = posts.filter((p, i) => i > 0 && posts[i - 1].publishedAt === p.publishedAt)
    for (const p of empatados) {
      const anterior = posts[posts.indexOf(p) - 1]
      expect(anterior.slug.localeCompare(p.slug)).toBeLessThan(0)
    }
  })
})
