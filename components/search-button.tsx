"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

export function SearchButton() {
  const router = useRouter()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        router.push("/busca")
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [router])

  return (
    <button
      type="button"
      onClick={() => router.push("/busca")}
      className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-muted transition-colors"
      title="Search (⌘K)"
    >
      <Search className="w-5 h-5" />
    </button>
  )
}
