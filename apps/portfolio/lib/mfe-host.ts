export type MfePing = { angularVersion: string; at: string }

// next-themes só sabe o tema no cliente: no primeiro render vem undefined.
export function resolveTheme(resolved: string | undefined): "light" | "dark" {
  return resolved === "dark" ? "dark" : "light"
}

// O detail vem de código de outra origem: tratar como entrada não confiável.
export function parsePing(detail: unknown): MfePing | null {
  if (!detail || typeof detail !== "object") return null
  const { angularVersion, at } = detail as Record<string, unknown>
  if (typeof angularVersion !== "string" || typeof at !== "string") return null
  if (Number.isNaN(Date.parse(at))) return null
  return { angularVersion, at }
}
