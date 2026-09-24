"use client"

import { createElement, useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { t, localeToHtmlLang, type Locale } from "@repo/i18n"
import { loadRemoteModule } from "@/lib/mfe"
import { parsePing, resolveTheme, type MfePing } from "@/lib/mfe-host"

type Status = "idle" | "loading" | "ready" | "error"

type Props = { src: string; tag: string; locale: Locale }

export function MicroFrontend({ src, tag, locale }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const elementRef = useRef<HTMLElement>(null)
  const [status, setStatus] = useState<Status>("idle")
  const [ping, setPing] = useState<MfePing | null>(null)
  const { resolvedTheme } = useTheme()
  const theme = resolveTheme(resolvedTheme)

  // Só busca o módulo remoto quando o bloco se aproxima do viewport:
  // quem não rola até aqui não paga o bundle do Angular.
  useEffect(() => {
    const node = wrapperRef.current
    if (!node || status !== "idle") return
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        observer.disconnect()
        setStatus("loading")
        loadRemoteModule(async () => {
          await import(/* webpackIgnore: true */ /* turbopackIgnore: true */ src)
          await customElements.whenDefined(tag)
        }).then(
          () => setStatus("ready"),
          () => setStatus("error"),
        )
      },
      { rootMargin: "200px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [src, tag, status])

  useEffect(() => {
    const el = elementRef.current
    if (status !== "ready" || !el) return
    const onPing = (event: Event) => {
      const parsed = parsePing((event as CustomEvent).detail)
      if (parsed) setPing(parsed)
    }
    el.addEventListener("mfe:ping", onPing)
    return () => el.removeEventListener("mfe:ping", onPing)
  }, [status])

  return (
    <div ref={wrapperRef} className="not-prose">
      <div className="min-h-[320px] border border-line">
        {status === "ready" ? (
          createElement(tag, { ref: elementRef, locale, theme })
        ) : (
          <p className="p-6 text-sm text-mu">
            {status === "error"
              ? t(locale, {
                  pt: "O micro frontend não carregou — o resto do post segue funcionando.",
                  en: "The micro frontend didn't load — the rest of the post still works.",
                  es: "El micro frontend no cargó — el resto del post sigue funcionando.",
                  jp: "マイクロフロントエンドを読み込めませんでした。記事の他の部分は通常どおり動作します。",
                  fr: "Le micro frontend ne s'est pas chargé — le reste de l'article fonctionne toujours.",
                })
              : t(locale, {
                  pt: "Carregando o micro frontend Angular…",
                  en: "Loading the Angular micro frontend…",
                  es: "Cargando el micro frontend Angular…",
                  jp: "Angularのマイクロフロントエンドを読み込み中…",
                  fr: "Chargement du micro frontend Angular…",
                })}
          </p>
        )}
      </div>
      <p aria-live="polite" className="mt-2 font-mono text-xs text-mu">
        {ping
          ? t(locale, {
              pt: "Evento recebido do micro frontend: Angular {version} às {time}",
              en: "Event received from the micro frontend: Angular {version} at {time}",
              es: "Evento recibido del micro frontend: Angular {version} a las {time}",
              jp: "マイクロフロントエンドからイベントを受信：Angular {version}（{time}）",
              fr: "Événement reçu du micro frontend : Angular {version} à {time}",
            })
              .replace("{version}", ping.angularVersion)
              .replace("{time}", new Date(ping.at).toLocaleTimeString(localeToHtmlLang(locale)))
          : t(locale, {
              pt: "Nenhum evento do micro frontend ainda.",
              en: "No events from the micro frontend yet.",
              es: "Todavía no hay eventos del micro frontend.",
              jp: "マイクロフロントエンドからのイベントはまだありません。",
              fr: "Aucun événement du micro frontend pour l'instant.",
            })}
      </p>
    </div>
  )
}
