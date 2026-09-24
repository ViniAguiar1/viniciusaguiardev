import type { ElementType, ReactNode } from "react"

// O eyebrow do aguiarlabs: filete de 32px + rótulo mono numerado.
// Abre cada seção e é o gesto que identifica a marca à distância.
//
// `as` existe para as páginas em que o eyebrow é o único título da seção e
// precisa contar como heading — sem ele, os h3 internos ficam pendurados
// direto no h1. O `font-normal` neutraliza o peso padrão de heading para que
// h2 e div rendam idênticos.
export function SectionEyebrow({
  index,
  as: Tag = "div",
  children,
}: {
  index: string
  as?: ElementType
  children: ReactNode
}) {
  return (
    <Tag className="mb-6 flex items-center gap-4 font-mono text-[11px] font-normal uppercase tracking-[0.18em] text-mu">
      <span aria-hidden className="h-px w-8 bg-line" />
      <span>{index}</span>
      <span aria-hidden>/</span>
      <span>{children}</span>
    </Tag>
  )
}
