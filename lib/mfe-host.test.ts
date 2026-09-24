import { describe, it, expect } from "vitest"
import { resolveTheme, parsePing } from "./mfe-host"

describe("resolveTheme", () => {
  it("dark so quando o next-themes resolve dark", () => {
    expect(resolveTheme("dark")).toBe("dark")
    expect(resolveTheme("light")).toBe("light")
    expect(resolveTheme(undefined)).toBe("light")
    expect(resolveTheme("system")).toBe("light")
  })
})

describe("parsePing", () => {
  it("aceita detail bem formado", () => {
    expect(parsePing({ angularVersion: "22.2.0", at: "2026-09-24T14:03:21.000Z" })).toEqual({
      angularVersion: "22.2.0",
      at: "2026-09-24T14:03:21.000Z",
    })
  })
  it("recusa detail malformado sem lancar", () => {
    expect(parsePing(null)).toBeNull()
    expect(parsePing("x")).toBeNull()
    expect(parsePing({ angularVersion: 22 })).toBeNull()
    expect(parsePing({ angularVersion: "22", at: "nao e data" })).toBeNull()
  })
})
