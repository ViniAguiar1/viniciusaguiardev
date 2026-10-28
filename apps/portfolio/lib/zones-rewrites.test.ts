import { describe, it, expect } from "vitest"
import { roadmapRewrites, usesRewrites } from "./zones-rewrites"

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

describe("roadmapRewrites", () => {
  it("reescreve a página, /roadmap sem locale e os assets da zona", () => {
    expect(roadmapRewrites({ ROADMAP_ZONE_URL: "https://roadmap.example.com/", NODE_ENV: "production" })).toEqual([
      { source: "/:locale(pt|en|es|jp|fr)/roadmap", destination: "https://roadmap.example.com/:locale/roadmap" },
      { source: "/:locale(pt|en|es|jp|fr)/roadmap/:path*", destination: "https://roadmap.example.com/:locale/roadmap/:path*" },
      { source: "/roadmap", destination: "https://roadmap.example.com/roadmap" },
      { source: "/roadmap-static/:path*", destination: "https://roadmap.example.com/roadmap-static/:path*" },
    ])
  })
  it("em dev usa localhost:3002 por padrão", () => {
    expect(roadmapRewrites({ NODE_ENV: "development" })[0].destination).toBe("http://localhost:3002/:locale/roadmap")
  })
  it("em produção sem ROADMAP_ZONE_URL falha alto", () => {
    expect(() => roadmapRewrites({ NODE_ENV: "production" })).toThrow(/ROADMAP_ZONE_URL/)
  })
})
