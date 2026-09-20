import Image from "next/image"
import { getDictionary, getLocale } from "@/lib/i18n-server"
import { localePath } from "@/lib/i18n"

import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar"
import { SidebarNavLink } from "@/components/sidebar-nav-link"

import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export async function AppSidebar() {
  const locale = await getLocale()
  const dict = getDictionary(locale)
  return (
    <Sidebar side="left" className="bg-surface flex flex-col items-center min-w-[320px]">
      <SidebarContent className="flex flex-col items-center w-full pt-10 pb-8 px-4">
        {/* Profile Picture */}
        <div className="flex justify-center mb-4">
          <span className="rounded-full overflow-hidden block bg-surface border border-line w-24 h-24">
            <Image
              src="/profile.jpg"
              alt="Vinicius Aguiar"
              width={96}
              height={96}
              className="object-cover w-full h-full"
              priority
            />
          </span>
        </div>

        {/* Name and Title */}
        <div className="text-center mb-1">
          <p className="text-3xl font-light text-fg leading-none mb-1">Vinicius Aguiar</p>
          <p className="text-lg font-normal text-mu -mt-1">Frontend Engineer</p>
        </div>

        {/* Company/Role */}
        <div className="text-sm text-mu mb-8 mt-2">
          Frontend Engineer at <span className="font-medium">Chattie</span>.
        </div>

        {/* Main Menu Links */}
        <nav className="flex flex-col items-center gap-2 w-full">
          <SidebarNavLink href={localePath(locale, "/")} className="text-lg font-normal mb-1 hover:underline text-mu">
            {dict.nav.home}
          </SidebarNavLink>
          <SidebarNavLink href={localePath(locale, "/sobre")} className="text-lg font-normal mb-1 hover:underline text-mu">
            {dict.nav.about}
          </SidebarNavLink>
          <SidebarNavLink href={localePath(locale, "/projetos")} className="text-lg font-normal mb-1 hover:underline text-mu">
            {dict.nav.projects}
          </SidebarNavLink>
          <SidebarNavLink href={localePath(locale, "/engenharia")} className="text-lg font-normal mb-1 hover:underline text-mu">
            {dict.nav.engineering}
          </SidebarNavLink>
          <SidebarNavLink href={localePath(locale, "/uses")} className="text-lg font-normal mb-1 hover:underline text-mu">
            {dict.nav.uses}
          </SidebarNavLink>
          <SidebarNavLink href="/Curriculo-Vinicius-Aguiar.pdf" className="text-lg font-normal hover:underline text-mu" download data-umami-event="cv-download" data-umami-event-source="sidebar">
            {dict.nav.curriculum}
          </SidebarNavLink>
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center items-center gap-6 mt-6 mb-12 w-full">
          <a href="https://github.com/ViniAguiar1" target="_blank" aria-label="GitHub" rel="noopener">
            <FaGithub className="w-7 h-7 text-mu hover:text-fg transition-colors" />
          </a>
          <a href="https://www.linkedin.com/in/viniciusaguiar-araujo/" target="_blank" aria-label="LinkedIn" rel="noopener">
            <FaLinkedin className="w-7 h-7 text-mu hover:text-fg transition-colors" />
          </a>
          <a href="https://wa.me/5511915369113?text=Olá!%20Vim%20pelo%20seu%20site." target="_blank" aria-label="WhatsApp" rel="noopener">
            <FaWhatsapp className="w-7 h-7 text-mu hover:text-fg transition-colors" />
          </a>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
