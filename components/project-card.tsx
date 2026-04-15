"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { Project, ProjectChallenge } from "@/data/projects"
import type { Locale } from "@/lib/i18n-server"

interface ProjectCardProps {
  project: Project
  locale: Locale
}

function loc<T extends Record<string, unknown>>(field: T, locale: Locale): string {
  return (field[locale] ?? field["pt"]) as string
}

function locArr(field: { pt: string[]; en: string[] }, locale: Locale): string[] {
  return field[locale] ?? field["pt"]
}

export function ProjectCard({ project, locale }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card text-card-foreground p-6 md:p-8 transition-all",
        "hover:shadow-lg"
      )}
    >
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl md:text-2xl font-semibold leading-tight">
              {project.name}
            </h3>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
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

          <p className="text-sm text-muted-foreground mb-1">
            {loc(project.role, locale)}
          </p>

          <p className="text-base leading-relaxed mt-3">
            {loc(project.tagline, locale)}
          </p>
        </div>
      </div>

      {/* Metrics row */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {project.metrics.map((metric) => (
          <div
            key={loc(metric.label, locale)}
            className="rounded-md border border-border bg-muted/30 px-4 py-3 text-center"
          >
            <div className="text-lg font-semibold">{metric.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {loc(metric.label, locale)}
            </div>
          </div>
        ))}
      </div>

      {/* Tech stack */}
      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-xs"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Expandable details */}
      {expanded && (
        <div className="mt-6 space-y-6 animate-in fade-in-0 slide-in-from-top-2 duration-200">
          {/* Context */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              {locale === "en" ? "Context" : "Contexto"}
            </h4>
            <p className="text-sm leading-relaxed">
              {loc(project.context, locale)}
            </p>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              {locale === "en" ? "Overview" : "Visão geral"}
            </h4>
            <p className="text-sm leading-relaxed">
              {loc(project.description, locale)}
            </p>
          </div>

          {/* Key features */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              {locale === "en" ? "Key Features" : "Principais entregas"}
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {locArr(project.features, locale).map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Technical challenges */}
          {project.challenges.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                {locale === "en" ? "Technical Challenges" : "Desafios técnicos"}
              </h4>
              <div className="space-y-4">
                {project.challenges.map((challenge: ProjectChallenge, i: number) => (
                  <div key={i} className="rounded-md border border-border bg-muted/20 p-4">
                    <div className="text-sm">
                      <span className="font-medium">
                        {locale === "en" ? "Problem: " : "Problema: "}
                      </span>
                      {loc(challenge.problem, locale)}
                    </div>
                    <div className="text-sm mt-2">
                      <span className="font-medium">
                        {locale === "en" ? "Solution: " : "Solução: "}
                      </span>
                      {loc(challenge.solution, locale)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-5 text-sm text-primary hover:underline"
      >
        {expanded
          ? locale === "en" ? "Show less" : "Ver menos"
          : locale === "en" ? "View case study" : "Ver case completo"}
      </button>
    </div>
  )
}
