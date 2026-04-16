"use client"

import Link from "next/link"
import { useSidebar } from "@/components/ui/sidebar"

interface SidebarNavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  download?: boolean
}

export function SidebarNavLink({ href, children, className, download }: SidebarNavLinkProps) {
  const { setOpenMobile, isMobile } = useSidebar()

  const handleClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  if (download) {
    return (
      <a href={href} className={className} style={{ transition: "color 0.2s" }} download onClick={handleClick}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className} style={{ transition: "color 0.2s" }} onClick={handleClick}>
      {children}
    </Link>
  )
}
