import { describe, it, expect } from "vitest"
import { zoneFor, linkMode } from "./zones"

describe("zonas — etapa 1", () => {
  it("todo caminho é do portfolio", () => {
    for (const p of ["/pt", "/en/projetos", "/pt/uses", "/pt/posts/x"]) expect(zoneFor(p)).toBe("portfolio")
  })
  it("mesma zona navega no cliente", () => {
    expect(linkMode("portfolio", "/pt/sobre")).toBe("client")
  })
  it("externos e mailto passam direto", () => {
    expect(linkMode("portfolio", "https://github.com/x")).toBe("external")
    expect(linkMode("portfolio", "mailto:a@b.c")).toBe("external")
  })
})
