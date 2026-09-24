"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import * as Dialog from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"
import { cn, MONO_CHIP } from "@/lib/utils"
import { ProjectLogo } from "@/components/project-logo"
import type { Project } from "@/data/projects"
import { localePath, t, type Locale } from "@repo/i18n"

interface ProjectsGridProps {
  projects: Project[]
  locale: Locale
}

export function ProjectsGrid({ projects, locale }: ProjectsGridProps) {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <>
      {/* Colunas CSS em vez de grid: numa grade, a altura da linha é a do card
          mais alto, então um projeto sem papel/métrica/stack deixa um buraco
          visível ao lado de um que tem tudo. Com columns os cards empacotam e
          o vazio some, sem precisar esticar card curto nem reservar espaço.
          Contrapartida: a leitura passa a ser coluna a coluna, não linha a
          linha. */}
      <div className="columns-1 md:columns-2 gap-3">
        {projects.map((project) => {
          const tagline = project.tagline[locale] ?? project.tagline.pt
          const role = project.role ? (project.role[locale] ?? project.role.pt) : null
          const highlight = project.highlight
            ? (project.highlight[locale] ?? project.highlight.pt)
            : null
          const stack = project.stack ?? []
          const STACK_VISIVEL = 4

          return (
            <button
              key={project.slug}
              // Ancora para a busca: projeto sem detailPage e linkado como
              // /projetos#<slug>. scroll-mt tira o card de debaixo do topo.
              id={project.slug}
              type="button"
              onClick={() => setSelected(project)}
              data-umami-event="project-click"
              data-umami-event-project={project.name}
              className="group mb-3 scroll-mt-20 break-inside-avoid border border-line bg-card p-5 flex flex-col text-left w-full transition-colors hover:border-field cursor-pointer"
            >
              <div className="flex items-start gap-4">
                {/* Ficha clara e logo em cor cheia. A versão anterior era
                    grayscale sobre bg-surface: unificava as sete marcas, mas
                    tornava ilegível qualquer arte escura — a do Chattie é
                    preto sólido e sumia por completo, colorida ou não. */}
                <ProjectLogo src={project.logo} name={project.name} size={44} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-[15px] font-semibold leading-tight text-fg">
                      {project.name}
                    </h3>
                    <span className={cn(MONO_CHIP, "flex-shrink-0 whitespace-nowrap")}>
                      {project.category}
                    </span>
                  </div>
                  {/* Sem line-clamp: o tagline cabe em duas linhas e cortá-lo
                      no meio era a informação mais barata da página sendo
                      truncada sem necessidade. */}
                  <p className="text-[12.5px] text-mu mt-2 leading-relaxed">
                    {tagline}
                  </p>
                </div>
              </div>

              {role || project.period ? (
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-mu">
                  {[role, project.period].filter(Boolean).join("  ·  ")}
                </p>
              ) : null}

              {highlight ? (
                <p className="mt-4 border-t border-line pt-4 text-[13px] font-medium text-fg">
                  {highlight}
                </p>
              ) : null}

              {stack.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {stack.slice(0, STACK_VISIVEL).map((tech) => (
                    <span
                      key={tech}
                      className="border border-line px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-mu"
                    >
                      {tech}
                    </span>
                  ))}
                  {stack.length > STACK_VISIVEL ? (
                    <span className="border border-line px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-mu">
                      +{stack.length - STACK_VISIVEL}
                    </span>
                  ) : null}
                </div>
              ) : null}
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
              "w-[calc(100%-2rem)] max-w-lg border border-line bg-card p-6 shadow-xl",
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
                  {/* Mesma ficha clara da grade: sem ela a arte preta do
                      Chattie some dentro do modal, que é o lugar onde o
                      visitante foi justamente para olhar o projeto. */}
                  <ProjectLogo src={selected.logo} name={selected.name} size={56} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5">
                      <Dialog.Title className="text-lg font-semibold">
                        {selected.name}
                      </Dialog.Title>
                      <span className={cn(MONO_CHIP, "flex-shrink-0 whitespace-nowrap")}>
                        {selected.category}
                      </span>
                    </div>
                    <Dialog.Description className="text-sm text-mu mt-0.5">
                      {selected.tagline[locale] ?? selected.tagline.pt}
                    </Dialog.Description>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-fg/80">
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
                          ? "border border-line hover:bg-muted"
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
