"use client"

import { useState } from "react"
import Image from "next/image"
import * as Dialog from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Project } from "@/data/projects"
import type { Locale } from "@/lib/i18n-server"

const categoryColors: Record<string, string> = {
  SaaS: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  Marketplace: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  ERP: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  Platform: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
  "E-commerce": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  Agency: "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400",
  App: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400",
  EdTech: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400",
  Travel: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  Health: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  Logistics: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400",
  HealthTech: "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400",
  Automotive: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
}

interface ProjectsGridProps {
  projects: Project[]
  locale: Locale
}

export function ProjectsGrid({ projects, locale }: ProjectsGridProps) {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {projects.map((project) => {
          const tagline = project.tagline[locale] ?? project.tagline.pt
          const colorClass = categoryColors[project.category] ?? "bg-muted text-muted-foreground"

          return (
            <button
              key={project.slug}
              type="button"
              onClick={() => setSelected(project)}
              className={cn(
                "group rounded-lg border border-border bg-card text-card-foreground p-5",
                "flex items-center gap-5 transition-all text-left w-full",
                "hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
              )}
            >
              <div className="relative flex-shrink-0 w-12 h-12 rounded-lg border border-border bg-muted/30 flex items-center justify-center overflow-hidden">
                <Image
                  src={project.logo}
                  alt={project.name}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-sm font-semibold leading-tight truncate">
                    {project.name}
                  </h3>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium flex-shrink-0",
                      colorClass
                    )}
                  >
                    {project.category}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-1">
                  {tagline}
                </p>
              </div>

              <svg
                className="w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          )
        })}
      </div>

      {/* Floating modal */}
      <Dialog.Root open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
          <Dialog.Content
            className={cn(
              "fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-[calc(100%-2rem)] max-w-lg rounded-xl border border-border bg-card p-6 shadow-xl",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
              "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
              "data-[state=open]:slide-in-from-top-4 data-[state=closed]:slide-out-to-top-4",
              "duration-200"
            )}
          >
            {selected && (
              <>
                {/* Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-lg border border-border bg-muted/30 flex items-center justify-center overflow-hidden">
                    <Image
                      src={selected.logo}
                      alt={selected.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5">
                      <Dialog.Title className="text-lg font-semibold">
                        {selected.name}
                      </Dialog.Title>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                          categoryColors[selected.category] ?? "bg-muted text-muted-foreground"
                        )}
                      >
                        {selected.category}
                      </span>
                    </div>
                    <Dialog.Description className="text-sm text-muted-foreground mt-0.5">
                      {selected.tagline[locale] ?? selected.tagline.pt}
                    </Dialog.Description>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-foreground/80">
                  {selected.description[locale] ?? selected.description.pt}
                </p>

                {/* Link */}
                {selected.url && (
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
                  >
                    {locale === "en" ? "Visit website" : "Acessar site"}
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5-6H18m0 0v4.5m0-4.5L10.5 13.5"
                      />
                    </svg>
                  </a>
                )}

                {/* Close */}
                <Dialog.Close className="absolute top-4 right-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity">
                  <XIcon className="w-4 h-4" />
                  <span className="sr-only">Close</span>
                </Dialog.Close>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
