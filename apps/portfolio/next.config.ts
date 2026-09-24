import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pacotes do monorepo vivem fora do app: a raiz do Turbopack é a do repo.
  turbopack: { root: path.join(__dirname, "../..") },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Link",
            value: "<https://cloud.umami.is>; rel=preconnect",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
