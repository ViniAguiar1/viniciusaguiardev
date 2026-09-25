import path from "node:path"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Os assets desta zona não podem colidir com os do portfólio no mesmo
  // domínio: o portfólio reescreve /uses-static/* para cá.
  assetPrefix: "/uses-static",
  turbopack: { root: path.join(__dirname, "../..") },
  transpilePackages: ["@repo/i18n", "@repo/ui", "@repo/shell"],
  async headers() {
    // Observabilidade: o DevTools mostra qual app respondeu.
    return [{ source: "/(.*)", headers: [{ key: "x-zone", value: "uses" }] }]
  },
}

export default nextConfig
