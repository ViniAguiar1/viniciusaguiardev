import type { MetadataRoute } from "next"
import fs from "fs"
import path from "path"

const siteUrl = "https://viniciusaguiardev.com.br"

export default function sitemap(): MetadataRoute.Sitemap {
  const postsDir = path.join(process.cwd(), "data", "posts")
  const postSlugs = fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".json") && !f.startsWith("."))
    .map((f) => f.replace(/\.json$/, ""))

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/projetos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/engenharia`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/projetos/x-drop`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]

  const postPages: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${siteUrl}/posts/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...postPages]
}
