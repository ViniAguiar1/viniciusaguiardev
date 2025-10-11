import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

let globalKey = 0

function nextKey() {
  globalKey += 1
  return globalKey
}

function isExternal(url: string) {
  try {
    return /^https?:\/\//i.test(url)
  } catch {
    return false
  }
}

function renderInlineCode(content: string): ReactNode {
  return (
    <code
      key={nextKey()}
      className={cn(
        "rounded border border-border bg-muted/60 px-1 py-0.5 text-[0.9em]"
      )}
    >
      {content}
    </code>
  )
}

function parseText(text: string): ReactNode[] {
  // Links: [label](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  // Bold: **text**
  const boldRegex = /\*\*([^*]+)\*\*/g
  // Italic: *text* or _text_
  const italicRegex = /(\*|_)([^*_]+)\1/g

  let nodes: ReactNode[] = [text]

  // Apply links first
  nodes = nodes.flatMap((node) => {
    if (typeof node !== "string") return [node]
    const parts: ReactNode[] = []
    let lastIndex = 0
    let m: RegExpExecArray | null
    linkRegex.lastIndex = 0
    while ((m = linkRegex.exec(node))) {
      if (m.index > lastIndex) parts.push(node.slice(lastIndex, m.index))
      const label = m[1]
      const href = m[2]
      const external = isExternal(href)
      parts.push(
        <a
          key={nextKey()}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className="text-primary underline-offset-4 hover:underline"
        >
          {label}
        </a>
      )
      lastIndex = linkRegex.lastIndex
    }
    if (lastIndex < node.length) parts.push(node.slice(lastIndex))
    return parts
  })

  // Then bold
  nodes = nodes.flatMap((node) => {
    if (typeof node !== "string") return [node]
    const parts: ReactNode[] = []
    let lastIndex = 0
    let m: RegExpExecArray | null
    boldRegex.lastIndex = 0
    while ((m = boldRegex.exec(node))) {
      if (m.index > lastIndex) parts.push(node.slice(lastIndex, m.index))
      parts.push(
        <strong key={nextKey()} className="font-semibold">
          {m[1]}
        </strong>
      )
      lastIndex = boldRegex.lastIndex
    }
    if (lastIndex < node.length) parts.push(node.slice(lastIndex))
    return parts
  })

  // Then italic
  nodes = nodes.flatMap((node) => {
    if (typeof node !== "string") return [node]
    const parts: ReactNode[] = []
    let lastIndex = 0
    let m: RegExpExecArray | null
    italicRegex.lastIndex = 0
    while ((m = italicRegex.exec(node))) {
      if (m.index > lastIndex) parts.push(node.slice(lastIndex, m.index))
      parts.push(
        <em key={nextKey()} className="italic">
          {m[2]}
        </em>
      )
      lastIndex = italicRegex.lastIndex
    }
    if (lastIndex < node.length) parts.push(node.slice(lastIndex))
    return parts
  })

  return nodes
}

export function renderInline(source: string): ReactNode[] {
  if (!source) return []
  const result: ReactNode[] = []

  // Split by inline code `...`
  let i = 0
  let buffer = ""
  let inCode = false
  while (i < source.length) {
    const ch = source[i]
    if (ch === "`") {
      if (inCode) {
        // close code
        result.push(renderInlineCode(buffer))
        buffer = ""
        inCode = false
      } else {
        // flush text before entering code
        if (buffer) {
          result.push(...parseText(buffer))
          buffer = ""
        }
        inCode = true
      }
      i += 1
      continue
    }
    buffer += ch
    i += 1
  }

  if (buffer) {
    if (inCode) {
      // unclosed backtick, treat as text with backtick
      result.push("`" + buffer)
    } else {
      result.push(...parseText(buffer))
    }
  }

  return result
}

