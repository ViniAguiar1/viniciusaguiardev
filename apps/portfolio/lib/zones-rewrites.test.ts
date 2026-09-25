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

describe("vercel.json", () => {
  // Na Vercel, o rewrite da zona vive no vercel.json (camada de rede, repassa o
  // caminho intacto). O do next.config serve o dev local. Os dois não podem
  // divergir nas rotas que encaminham.
  it("encaminha as mesmas rotas que usesRewrites, para uma URL https", async () => {
    const { default: vercel } = await import("../vercel.json", { with: { type: "json" } })
    const fromVercel = (vercel.rewrites ?? []).map((r: { source: string; destination: string }) => r)
    const zone = new URL(fromVercel[0]?.destination ?? "http://x").origin
    expect(zone.startsWith("https://")).toBe(true)
    expect(fromVercel).toEqual(usesRewrites({ USES_ZONE_URL: zone, NODE_ENV: "production" }))
  })
})
