"use client"

import { useCallback, useMemo, useState } from "react"
import { Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import Prism from "prismjs"
import "prismjs/components/prism-markup" // html
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-json"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-markdown"
import "prismjs/components/prism-css"

type Props = {
  code: string
  language?: string
  className?: string
}

function normalizeLang(lang?: string): string {
  const l = (lang || "").toLowerCase()
  if (!l) return "markup"
  if (["ts", "typescript"].includes(l)) return "typescript"
  if (["tsx"].includes(l)) return "tsx"
  if (["js", "javascript"].includes(l)) return "javascript"
  if (["jsx"].includes(l)) return "jsx"
  if (["json"].includes(l)) return "json"
  if (["bash", "sh", "shell"].includes(l)) return "bash"
  if (["md", "markdown"].includes(l)) return "markdown"
  if (["html", "xml", "svg"].includes(l)) return "markup"
  if (["css"].includes(l)) return "css"
  return l
}

export function CodeBlock({ code, language, className }: Props) {
  const [copied, setCopied] = useState(false)

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }, [code])

  const lang = useMemo(() => normalizeLang(language), [language])
  const html = useMemo(() => {
    try {
      const languages = (Prism as unknown as { languages: Record<string, unknown> }).languages
      const grammar = languages[lang] ?? languages["markup"]
      const highlight = (Prism as unknown as { highlight: (c: string, g: unknown, l: string) => string }).highlight
      return highlight(code, grammar, lang)
    } catch {
      return code
    }
  }, [code, lang])

  return (
    <div className={cn("group relative", className)}>
      <button
        type="button"
        onClick={onCopy}
        className={cn(
          "absolute right-2 top-2 z-10 inline-flex items-center gap-1 rounded-md border border-border bg-background/80 px-2 py-1 text-xs text-foreground/80 shadow-sm backdrop-blur-sm transition-opacity",
          "opacity-0 group-hover:opacity-100 focus:opacity-100"
        )}
        aria-label="Copiar código"
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        {copied ? "Copiado" : "Copiar"}
      </button>
      <pre className="rounded-lg border border-border bg-muted/50 p-4 overflow-x-auto text-sm">
        <code
          className={cn("whitespace-pre", lang ? `language-${lang}` : undefined)}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </pre>
    </div>
  )
}
