import { describe, it, expect } from "vitest"
import { LOCALES } from "@repo/i18n"
import { zoneFor, linkMode, USES_LOCALE_PARAM } from "./zones"

describe("zoneFor", () => {
  it("uses em todos os locales, com ou sem barra final e subcaminhos", () => {
    for (const l of LOCALES) {
      expect(zoneFor(`/${l}/uses`)).toBe("uses")
      expect(zoneFor(`/${l}/uses/`)).toBe("uses")
      expect(zoneFor(`/${l}/uses/algo`)).toBe("uses")
    }
  })
  it("não confunde prefixo nem locale inválido", () => {
    expect(zoneFor("/pt/usesx")).toBe("portfolio")
    expect(zoneFor("/de/uses")).toBe("portfolio")
    expect(zoneFor("/pt/posts/uses")).toBe("portfolio")
    expect(zoneFor("/pt")).toBe("portfolio")
    expect(zoneFor("/")).toBe("portfolio")
  })
  it("/uses sem locale é da zona uses (o proxy dela redireciona para /pt/uses)", () => {
    expect(zoneFor("/uses")).toBe("uses")
  })
})

describe("linkMode", () => {
  it("mesma zona → client; outra zona → document", () => {
    expect(linkMode("uses", "/en/uses")).toBe("client")
    expect(linkMode("uses", "/pt/busca")).toBe("document")
    expect(linkMode("uses", "/pt")).toBe("document")
    expect(linkMode("portfolio", "/pt/uses")).toBe("document")
    expect(linkMode("portfolio", "/pt/projetos")).toBe("client")
  })
  it("query e hash não mudam a zona", () => {
    expect(linkMode("portfolio", "/pt/uses?x=1#y")).toBe("document")
  })
  it("externos passam direto", () => {
    expect(linkMode("uses", "https://github.com")).toBe("external")
    expect(linkMode("uses", "mailto:a@b.c")).toBe("external")
  })
})

describe("USES_LOCALE_PARAM", () => {
  it("é o parâmetro path-to-regexp com os locales do site", () => {
    expect(USES_LOCALE_PARAM).toBe(`:locale(${LOCALES.join("|")})`)
  })
})
