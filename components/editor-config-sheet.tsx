"use client"

import { useState, useCallback } from "react"
import { Copy, Check } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"

const editorConfig = `{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.fontFamily": "JetBrains Mono",
  "editor.fontLigatures": true,
  "editor.fontSize": 14,
  "editor.lineHeight": 1.6,
  "workbench.colorTheme": "GitHub Dark Default",
  "workbench.iconTheme": "material-icon-theme",
  "explorer.compactFolders": false,
  "claudeCode.preferredLocation": "panel"
}`

interface EditorConfigSheetProps {
  label: string
  description: string
}

export function EditorConfigSheet({ label, description }: EditorConfigSheetProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(editorConfig)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm text-primary hover:underline cursor-pointer inline-flex items-center gap-1"
      >
        {label} →
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:w-1/2 sm:max-w-none overflow-y-auto p-8">
          <SheetHeader className="mb-6 p-0">
            <SheetTitle className="text-lg">settings.json</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>

          <div className="relative">
            <button
              type="button"
              onClick={onCopy}
              className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-md border border-border bg-background/80 px-2.5 py-1.5 text-xs font-medium shadow-sm backdrop-blur-sm hover:bg-muted transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy"}
            </button>
            <pre className="rounded-lg border border-border bg-muted/50 p-4 pt-12 overflow-x-auto text-sm">
              <code className="whitespace-pre text-foreground/90">{editorConfig}</code>
            </pre>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
