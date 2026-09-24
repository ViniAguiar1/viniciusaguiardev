"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { createContext, useCallback, useContext, type AnchorHTMLAttributes, type ReactNode } from "react"
import { linkMode, type Zone } from "./zones"

export const ZoneContext = createContext<Zone>("portfolio")

export function ZoneProvider({ zone, children }: { zone: Zone; children: ReactNode }) {
  return <ZoneContext.Provider value={zone}>{children}</ZoneContext.Provider>
}

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: ReactNode }

// Link que sabe atravessar zonas: dentro da mesma zona é o next/link de
// sempre; para outra zona vira <a> comum, porque a rota não existe neste app
// e uma navegação client-side cairia num 404.
export function ZoneLink({ href, children, ...rest }: Props) {
  const zone = useContext(ZoneContext)
  if (linkMode(zone, href) === "client") {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  )
}

export function useZoneNavigate() {
  const zone = useContext(ZoneContext)
  const router = useRouter()
  // Estável entre renders: quem registra listeners (⌘K da busca) depende dela.
  return useCallback(
    (href: string) => {
      if (linkMode(zone, href) === "client") router.push(href)
      else window.location.assign(href)
    },
    [zone, router],
  )
}
