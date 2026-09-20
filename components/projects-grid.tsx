"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import * as Dialog from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Project } from "@/data/projects"
import { localePath, t, type Locale } from "@/lib/i18n"

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

          return (
            <button
              key={project.slug}
              type="button"
              onClick={() => setSelected(project)}
              data-umami-event="project-click"
              data-umami-event-project={project.name}
              className={cn(
                "group border border-border bg-card text-card-foreground p-5",
                "flex items-center gap-5 transition-all text-left w-full",
                "hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
              )}
            >
              <div className="relative flex-shrink-0 w-12 h-12 border border-border bg-muted/30 flex items-center justify-center overflow-hidden">
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
                  <span className="border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-mu">
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
              "w-[calc(100%-2rem)] max-w-lg border border-border bg-card p-6 shadow-xl",
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
                  <div className="flex-shrink-0 w-14 h-14 border border-border bg-muted/30 flex items-center justify-center overflow-hidden">
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
                      <span className="border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-mu">
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

                {/* Links */}
                <div className="mt-5 flex flex-wrap gap-3">
                  {selected.detailPage && (
                    <Link
                      href={localePath(locale, selected.detailPage)}
                      data-umami-event="project-detail"
                      data-umami-event-project={selected.name}
                      className="inline-flex items-center gap-2 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
                    >
                      {t(locale, { pt: "Ver mais", en: "Learn more", es: "Ver más", jp: "詳しく見る", fr: "En savoir plus" })}
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  )}
                  {selected.url && (
                    <a
                      href={selected.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-umami-event="project-visit"
                      data-umami-event-project={selected.name}
                      className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition",
                        selected.detailPage
                          ? "border border-border hover:bg-muted"
                          : "bg-primary text-primary-foreground hover:opacity-90"
                      )}
                    >
                      {t(locale, { pt: "Acessar site", en: "Visit website", es: "Visitar sitio", jp: "サイトを開く", fr: "Visiter le site" })}
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
                </div>

                {/* Close */}
                <Dialog.Close className="absolute top-4 right-4 opacity-70 hover:opacity-100 transition-opacity">
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
