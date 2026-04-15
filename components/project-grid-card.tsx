"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { Project } from "@/data/projects"
import type { Locale } from "@/lib/i18n-server"

interface ProjectGridCardProps {
  project: Project
  locale: Locale
}

function loc<T extends Record<string, unknown>>(field: T, locale: Locale): string {
  return (field[locale] ?? field["pt"]) as string
}

function locArr(field: { pt: string[]; en: string[] }, locale: Locale): string[] {
  return field[locale] ?? field["pt"]
}

export function ProjectGridCard({ project, locale }: ProjectGridCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card text-card-foreground p-6 flex flex-col transition-all",
        "hover:shadow-md hover:-translate-y-0.5"
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-lg font-semibold leading-tight">{project.name}</h3>
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
            project.status === "active"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : "bg-muted text-muted-foreground"
          )}
        >
          {project.status === "active"
            ? locale === "en" ? "Active" : "Ativo"
            : locale === "en" ? "Completed" : "Concluído"}
        </span>
      </div>

      <p className="text-xs text-muted-foreground mb-3">
        {loc(project.role, locale)}
      </p>

      <p className="text-sm leading-relaxed flex-1">
        {loc(project.tagline, locale)}
      </p>

      {/* Compact metrics */}
      <div className="mt-4 flex flex-wrap gap-3">
        {project.metrics.slice(0, 3).map((metric) => (
          <div key={loc(metric.label, locale)} className="text-center">
            <div className="text-sm font-semibold">{metric.value}</div>
            <div className="text-[10px] text-muted-foreground">
              {loc(metric.label, locale)}
            </div>
          </div>
        ))}
      </div>

      {/* Tech tags */}
      <div className="mt-4 flex flex-wrap gap-1">
        {project.technologies.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-border bg-muted/40 px-1.5 py-0.5 text-[10px]"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 5 && (
          <span className="text-[10px] text-muted-foreground self-center">
            +{project.technologies.length - 5}
          </span>
        )}
      </div>

      {/* Expandable details */}
      {expanded && (
        <div className="mt-4 space-y-3 animate-in fade-in-0 slide-in-from-top-2 duration-200">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {loc(project.description, locale)}
          </p>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
              {locale === "en" ? "Key Features" : "Entregas"}
            </h4>
            <ul className="list-disc pl-4 space-y-0.5 text-xs">
              {locArr(project.features, locale).map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 text-sm text-primary hover:underline text-left"
      >
        {expanded
          ? locale === "en" ? "Show less" : "Ver menos"
          : locale === "en" ? "View details" : "Ver detalhes"}
      </button>
    </div>
  )
}
