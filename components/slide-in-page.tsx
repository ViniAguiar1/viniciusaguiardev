"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface SlideInPageProps {
  children: React.ReactNode
  className?: string
}

export function SlideInPage({ children, className }: SlideInPageProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Small delay to ensure the initial state renders before animating
    const frame = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div
      className={cn(
        "transition-all duration-500 ease-out",
        mounted
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-12",
        className
      )}
    >
      {children}
    </div>
  )
}
