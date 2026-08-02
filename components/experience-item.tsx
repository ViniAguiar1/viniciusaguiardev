"use client"

import { useState } from "react"
import { t, type Locale } from "@/lib/i18n"
import type { Experience } from "@/data/experiences"

interface ExperienceItemProps {
  experience: Experience
  locale: Locale
}

export function ExperienceItem({ experience, locale }: ExperienceItemProps) {
  const [open, setOpen] = useState(false)
  const { company, role, period, current, stack, summary, highlight, details } = experience

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span>{t(locale, period)}</span>
        {current ? (
          <span className="rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] font-medium px-2 py-0.5">
            {t(locale, { pt: "Atual", en: "Current", es: "Actual", jp: "現職", fr: "Actuel" })}
          </span>
        ) : null}
      </div>

      <h3 className="text-lg font-medium">
        {t(locale, role)} · {company}
      </h3>

      <div className="flex flex-wrap gap-1.5">
        {stack.map((tech) => (
          <span key={tech} className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-xs">
            {tech}
          </span>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">{t(locale, summary)}</p>

      {highlight ? (
        <p className="text-xs font-mono text-emerald-700 dark:text-emerald-400">{t(locale, highlight)}</p>
      ) : null}

      {open && (
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {details.map((item, index) => (
            <li key={index}>{t(locale, item)}</li>
          ))}
        </ul>
      )}

      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="text-sm text-primary hover:underline"
      >
        {open
          ? t(locale, { pt: "Ler menos", en: "Read less", es: "Leer menos", jp: "閉じる", fr: "Lire moins" })
          : t(locale, { pt: "Ler mais", en: "Read more", es: "Leer más", jp: "もっと見る", fr: "Lire plus" })}
      </button>
    </div>
  )
}
