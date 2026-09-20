import type { ReactNode } from "react"

// O eyebrow do aguiarlabs: filete de 32px + rótulo mono numerado.
// Abre cada seção e é o gesto que identifica a marca à distância.
export function SectionEyebrow({
  index,
  children,
}: {
  index: string
  children: ReactNode
}) {
  return (
    <div className="mb-6 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-mu">
      <span aria-hidden className="h-px w-8 bg-line" />
      <span>{index}</span>
      <span aria-hidden>/</span>
      <span>{children}</span>
    </div>
  )
}
