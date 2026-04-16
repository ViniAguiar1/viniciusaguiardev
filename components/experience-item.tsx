"use client"

import { useState } from "react"

interface ExperienceItemProps {
    period: string
    title: string
    summary: string
    details: string[]
    locale?: string
}

export function ExperienceItem({
    period,
    title,
    summary,
    details,
    locale = "pt",
}: ExperienceItemProps) {

    const [open, setOpen] = useState(false)

    return (
        <div className="space-y-3">
            <div className="text-xs text-muted-foreground">
                {period}
            </div>

            <h3 className="text-lg font-medium">
                {title}
            </h3>

            <p className="text-sm text-muted-foreground">
                {summary}
            </p>

            {open && (
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    {details.map((item, index) => (
                        <li key={index}>
                            {item}
                        </li>
                    ))}
                </ul>
            )}

            <button
                onClick={() => setOpen(!open)}
                className="text-sm text-primary hover:underline"
            >
                {open
                    ? locale === "en" ? "Read less" : locale === "es" ? "Leer menos" : "Ler menos"
                    : locale === "en" ? "Read more" : locale === "es" ? "Leer más" : "Ler mais"}
            </button>
        </div>
    )
}