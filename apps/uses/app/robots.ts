import type { MetadataRoute } from "next"

// Este domínio é o deploy da zona /uses. Quem indexa a página chega pelo
// domínio principal, cujo robots é do portfólio; aqui seria conteúdo duplicado.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", disallow: "/" }] }
}
