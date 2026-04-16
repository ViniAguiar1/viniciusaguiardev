"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface EngineeringTopicProps {
  title: string
  subtitle: string
  children: React.ReactNode
}

export function EngineeringTopic({ title, subtitle, children }: EngineeringTopicProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-lg border border-border bg-card transition-all">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-5 text-left cursor-pointer hover:bg-muted/30 transition-colors rounded-lg"
      >
        <ChevronRight
          className={cn(
            "w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200",
            open && "rotate-90"
          )}
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold leading-tight">{title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 pt-0 animate-in fade-in-0 slide-in-from-top-2 duration-200">
          <div className="border-t border-border pt-5">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
