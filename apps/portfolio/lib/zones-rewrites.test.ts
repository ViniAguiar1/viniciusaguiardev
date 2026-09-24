import { describe, it, expect } from "vitest"
import { usesRewrites } from "./zones-rewrites"

describe("usesRewrites", () => {
  it("reescreve a página, subcaminhos, /uses sem locale e os assets da zona", () => {
    expect(usesRewrites({ USES_ZONE_URL: "https://uses.example.com", NODE_ENV: "production" })).toEqual([
      { source: "/:locale(pt|en|es|jp|fr)/uses", destination: "https://uses.example.com/:locale/uses" },
      { source: "/:locale(pt|en|es|jp|fr)/uses/:path*", destination: "https://uses.example.com/:locale/uses/:path*" },
      { source: "/uses", destination: "https://uses.example.com/uses" },
      { source: "/uses-static/:path*", destination: "https://uses.example.com/uses-static/:path*" },
    ])
  })
  it("remove barra final da URL", () => {
    expect(usesRewrites({ USES_ZONE_URL: "https://u.com/", NODE_ENV: "production" })[0].destination).toBe(
      "https://u.com/:locale/uses",
    )
  })
  it("em dev usa localhost:3001 por padrão", () => {
    expect(usesRewrites({ NODE_ENV: "development" })[0].destination).toBe("http://localhost:3001/:locale/uses")
  })
  it("em produção sem USES_ZONE_URL falha alto", () => {
    expect(() => usesRewrites({ NODE_ENV: "production" })).toThrow(/USES_ZONE_URL/)
  })
})
