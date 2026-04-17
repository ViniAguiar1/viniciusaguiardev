"use client"

import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"

interface EngineeringTopicProps {
  id?: string
  title: string
  subtitle: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function EngineeringTopic({ id, title, subtitle, children, defaultOpen = false }: EngineeringTopicProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (defaultOpen) setOpen(true)
  }, [defaultOpen])

  return (
    <>
      <button
        type="button"
        id={id}
        onClick={() => setOpen(true)}
        className="w-full rounded-lg border border-border bg-card flex items-center gap-4 p-5 text-left cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all"
      >
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold leading-tight">{title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:w-1/2 sm:max-w-none overflow-y-auto p-8">
          <SheetHeader className="mb-6 p-0">
            <SheetTitle className="text-lg">{title}</SheetTitle>
            <SheetDescription>{subtitle}</SheetDescription>
          </SheetHeader>
          <div className="space-y-5 pb-8">
            {children}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
