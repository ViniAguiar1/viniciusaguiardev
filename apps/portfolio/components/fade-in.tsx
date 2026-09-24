"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { cn } from "@/lib/utils"

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

const emptySubscribe = () => () => {}
const getTrue = () => true
const getFalse = () => false

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const hydrated = useSyncExternalStore(emptySubscribe, getTrue, getFalse)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        hydrated ? "transition-all duration-500 ease-out" : "",
        hydrated && !visible ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0",
        className
      )}
      style={hydrated ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
