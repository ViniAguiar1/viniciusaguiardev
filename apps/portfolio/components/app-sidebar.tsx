import Image from "next/image"
import { getDictionary, getLocale, t } from "@/lib/i18n-server"
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

  const links = [
    { href: localePath(locale, "/"), label: dict.nav.home },
    { href: localePath(locale, "/sobre"), label: dict.nav.about },
    { href: localePath(locale, "/projetos"), label: dict.nav.projects },
    { href: localePath(locale, "/engenharia"), label: dict.nav.engineering },
    { href: localePath(locale, "/uses"), label: dict.nav.uses },
  ]

  return (
    <Sidebar side="left" className="bg-surface flex flex-col min-w-[320px]">
      {/* Alinhado à esquerda e dividido por filetes: até aqui a sidebar era o
          único elemento centralizado e sem estrutura de um site inteiro
          construído sobre hairlines. */}
      <SidebarContent className="flex flex-col w-full pt-10 pb-8 px-6">

        {/* Mesma foto de autor do aguiarlabs, em grayscale com a cor voltando
            no hover — o mesmo tratamento dos logos de projeto. Aqui não é só
            coerência: o original tem fundo laranja saturado, que seria o único
            ponto de cor de um site inteiro em croma zero. */}
        <span className="group rounded-full overflow-hidden block bg-surface border border-line w-22 h-22">
          <Image
            src="/vinicius.webp"
            alt="Vinicius Aguiar"
            width={88}
            height={88}
            className="object-cover w-full h-full grayscale transition duration-300 group-hover:grayscale-0"
            priority
          />
        </span>

        {/* Identidade: nome, cargo e empresa como um bloco só. A empresa estava
            a 22px de distância, sem rótulo e sem filete — tipograficamente não
            pertencia a nada, e era por isso que lia como linha solta. */}
        <p className="mt-5 text-[26px] font-light leading-[1.1] tracking-[-0.02em] text-fg">
          Vinicius Aguiar
        </p>
        <p className="mt-1 text-sm text-mu">Senior Product Engineer</p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-mu">
          Aguiar Labs
        </p>

        <div className="my-6 h-px bg-line" />

        <p className="mb-3.5 font-mono text-[10px] uppercase tracking-[0.18em] text-mu">
          {t(locale, { pt: "Navegação", en: "Navigation", es: "Navegación", jp: "ナビゲーション", fr: "Navigation" })}
        </p>

        <nav className="flex flex-col gap-2.5">
          {links.map((link) => (
            <SidebarNavLink key={link.href} href={link.href} className="text-[15px]">
              {link.label}
            </SidebarNavLink>
          ))}
          {/* Currículo comentado a pedido do Vinicius (2026-09-20). O PDF
              segue em public/ e a chave dict.nav.curriculum segue traduzida
              nos 5 locales — basta descomentar para voltar. */}
          {/* <SidebarNavLink href="/Curriculo-Vinicius-Aguiar.pdf" className="text-[15px]" download data-umami-event="cv-download" data-umami-event-source="sidebar">
            {dict.nav.curriculum}
          </SidebarNavLink> */}
        </nav>

        {/* mt-auto: a trilha tem altura de tela inteira e o conteúdo ocupava
            só a metade de cima. Ancorar o social no rodapé usa esse vazio em
            vez de deixá-lo no meio. */}
        <div className="mt-auto pt-8">
          <div className="mb-5 h-px bg-line" />
          <div className="flex items-center gap-5">
            <a href="https://github.com/ViniAguiar1" target="_blank" aria-label="GitHub" rel="noopener">
              <FaGithub className="w-5 h-5 text-mu hover:text-fg transition-colors" />
            </a>
            <a href="https://www.linkedin.com/in/viniciusaguiar-araujo/" target="_blank" aria-label="LinkedIn" rel="noopener">
              <FaLinkedin className="w-5 h-5 text-mu hover:text-fg transition-colors" />
            </a>
            <a href="https://wa.me/5511915369113?text=Olá!%20Vim%20pelo%20seu%20site." target="_blank" aria-label="WhatsApp" rel="noopener">
              <FaWhatsapp className="w-5 h-5 text-mu hover:text-fg transition-colors" />
            </a>
          </div>
        </div>

      </SidebarContent>
    </Sidebar>
  )
}
