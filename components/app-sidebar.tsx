import Image from "next/image"
import Link from "next/link"
import { getDictionary, getLocale } from "@/lib/i18n-server"

import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar"

import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export async function AppSidebar() {
  const locale = await getLocale()
  const dict = getDictionary(locale)
  return (
    <Sidebar side="left" className="bg-[#f5f6fa] flex flex-col items-center min-w-[320px]">
      <SidebarContent className="flex flex-col items-center w-full pt-10 pb-8 px-4">
        {/* Profile Picture */}
        <div className="flex justify-center mb-4 dark:text-white">
          <span className="rounded-full overflow-hidden block bg-white border border-[#eee] w-24 h-24">
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
        <div className="text-center mb-1 dark:text-white">
          <h1 className="text-3xl dark:text-white font-light text-[#444] leading-none mb-1">Vinicius Aguiar</h1>
          <p className="text-lg font-normal text-gray-500 -mt-1">Web Developer</p>
        </div>

        {/* Company/Role */}
        <div className="text-sm text-gray-500 mb-8 mt-2 dark:text-white">
          Software Engineer at <span className="font-medium">Holy Solutions</span>.
        </div>

        {/* Main Menu Links */}
        <nav className="flex flex-col items-center gap-2 w-full">
          <Link
            href="/"
            className={`text-lg font-normal mb-1 hover:underline ${typeof window !== "undefined" ? window.location.pathname === "/" ? "text-blue-600" : "text-gray-700" : ""}`}
            style={{ transition: 'color 0.2s' }}
          >
            {dict.nav.home}
          </Link>
          <Link
            href="/sobre"
            className={`text-lg font-normal mb-1 hover:underline ${typeof window !== "undefined" ? window.location.pathname === "/sobre" ? "text-blue-600" : "text-gray-700" : ""}`}
            style={{ transition: 'color 0.2s' }}
          >
            {dict.nav.about}
          </Link>
          {/* Curriculum now downloads a PDF */}
          <a
            href="/Curriculo-Vinicius-Aguiar.pdf"
            className={`text-lg font-normal hover:underline ${typeof window !== "undefined" ? window.location.pathname === "/Vinicius_Aguiar_Front_end.pdf" ? "text-blue-600" : "text-gray-700" : ""}`}
            style={{ transition: 'color 0.2s' }}
            download
          >
            {dict.nav.curriculum}
          </a>
        </nav>

        {/* Social Icons - moved directly below the main menu */}
        <div className="flex justify-center items-center gap-6 mt-6 mb-12 w-full">
          <a href="https://github.com/ViniAguiar1" target="_blank" aria-label="GitHub" rel="noopener">
            <FaGithub className="w-7 h-7 text-gray-700 hover:text-black transition-colors" />
          </a>
          <a href="https://www.linkedin.com/in/viniciusaguiar-araujo/" target="_blank" aria-label="LinkedIn" rel="noopener">
            <FaLinkedin className="w-7 h-7 text-gray-700 hover:text-blue-700 transition-colors" />
          </a>
          {/* <a href="https://instagram.com/" target="_blank" aria-label="Instagram" rel="noopener">
            <FaInstagram className="w-7 h-7 text-gray-700 hover:text-pink-500 transition-colors" />
          </a> */}
          {/* <a href="https://facebook.com/" target="_blank" aria-label="Facebook" rel="noopener">
            <FaFacebook className="w-7 h-7 text-gray-700 hover:text-blue-600 transition-colors" />
          </a> */}
          <a href="https://wa.me/5511915369113?text=Olá!%20Vim%20pelo%20seu%20site." target="_blank" aria-label="WhatsApp" rel="noopener">
            <FaWhatsapp className="w-7 h-7 text-gray-700 hover:text-green-600 transition-colors" />
          </a>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
