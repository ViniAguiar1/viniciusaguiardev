"use client"

import Link from "next/link"
import { useSidebar } from "@/components/ui/sidebar"

interface SidebarNavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
  className?: string
  download?: boolean
}

export function SidebarNavLink({ href, children, className, download, ...rest }: SidebarNavLinkProps) {
  const { setOpenMobile, isMobile } = useSidebar()

  const handleClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  if (download) {
    return (
      <a href={href} className={className} style={{ transition: "color 0.2s" }} download onClick={handleClick} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className} style={{ transition: "color 0.2s" }} onClick={handleClick} {...rest}>
      {children}
    </Link>
  )
}
