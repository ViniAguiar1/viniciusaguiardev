import Link from "next/link"
import { getLocale, t } from "@/lib/i18n-server"

export async function Footer() {
  const locale = await getLocale()

  return (
    <footer className="w-full border-t border-border mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Left — contact */}
          <div className="space-y-1">
            <p className="text-sm font-medium">
              {t(locale, "Vamos conversar?", "Let's talk?", "Hablemos?")}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <a
                href="mailto:vinicius.aguiar1@icloud.com"
                className="hover:text-foreground transition"
              >
                vinicius.aguiar1@icloud.com
              </a>
              <span className="hidden sm:inline text-border">|</span>
              <a
                href="https://api.whatsapp.com/send?phone=5511915369113&text=Ol%C3%A1%2C%20vim%20pelo%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar."
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition"
              >
                WhatsApp
              </a>
              <span className="hidden sm:inline text-border">|</span>
              <a
                href="https://www.linkedin.com/in/viniciusaguiar-araujo/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition"
              >
                LinkedIn
              </a>
              <span className="hidden sm:inline text-border">|</span>
              <a
                href="https://github.com/ViniAguiar1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Right — nav */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/projetos" className="hover:text-foreground transition">
              {t(locale, "Projetos", "Projects", "Proyectos")}
            </Link>
            <Link href="/engenharia" className="hover:text-foreground transition">
              {t(locale, "Engenharia", "Engineering", "Ingeniería")}
            </Link>
            <Link href="/sobre" className="hover:text-foreground transition">
              {t(locale, "Sobre", "About", "Acerca")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
