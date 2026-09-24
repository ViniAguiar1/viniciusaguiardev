"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/components/ui/sidebar"

interface SidebarNavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
  className?: string
  download?: boolean
}

/**
 * A home é `/pt`, então prefixo puro marcaria ela como ativa em toda rota do
 * locale. Por isso ela exige igualdade e as outras aceitam o prefixo — que é o
 * que mantém `/pt/projetos/x-drop` acendendo "Projetos".
 */
function estaAtiva(pathname: string, href: string): boolean {
  const atual = pathname.replace(/\/$/, "") || "/"
  const alvo = href.replace(/\/$/, "") || "/"
  const segmentos = alvo.split("/").filter(Boolean)
  const ehHome = segmentos.length <= 1
  return ehHome ? atual === alvo : atual === alvo || atual.startsWith(`${alvo}/`)
}

export function SidebarNavLink({ href, children, className, download, ...rest }: SidebarNavLinkProps) {
  const { setOpenMobile, isMobile } = useSidebar()
  const pathname = usePathname() ?? "/"

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

  const ativa = estaAtiva(pathname, href)

  return (
    <Link
      href={href}
      // Estado ativo por contraste de valor e um filete à esquerda, que é o
      // idioma do resto do site. O filete transparente no estado inativo
      // reserva o espaço, senão o item saltaria 1px ao virar ativo.
      className={cn(
        "border-l pl-3 -ml-3 transition-colors",
        ativa ? "border-fg text-fg" : "border-transparent text-mu hover:text-fg",
        className,
      )}
      aria-current={ativa ? "page" : undefined}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Link>
  )
}
