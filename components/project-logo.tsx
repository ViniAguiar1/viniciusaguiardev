import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * Ficha de logo de projeto. Sem asset, cai num monograma com as iniciais em
 * vez de deixar buraco: a ficha continua ocupando o mesmo espaço e lê como
 * decisão, não como imagem que falhou ao carregar.
 *
 * A ficha e o texto usam tokens invariantes nos dois temas, porque marca de
 * terceiro não pertence à paleta do site — um wordmark preto some sobre o
 * canvas escuro, e um logo claro some sobre o canvas branco.
 */
export function ProjectLogo({
  src,
  name,
  size = 44,
  className,
}: {
  src?: string
  name: string
  size?: number
  className?: string
}) {
  const monograma = iniciais(name)
  // A escala do monograma acompanha a ficha: 44px → 13px, 56px → 16px.
  const corpo = Math.round(size * 0.3)

  return (
    <div
      className={cn(
        "relative flex-shrink-0 border border-line bg-plate flex items-center justify-center overflow-hidden",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt=""
          width={size}
          height={size}
          className="object-contain w-full h-full p-1.5"
        />
      ) : (
        <span
          aria-hidden
          className="font-mono font-medium uppercase tracking-[0.08em] text-plate-fg"
          style={{ fontSize: corpo }}
        >
          {monograma}
        </span>
      )}
    </div>
  )
}

/**
 * "Hora Útil 360" → "HU".
 *
 * Ignora tokens que não começam com letra, senão um nome terminado em número
 * renderiza "H3". E remove diacríticos: "HÚ" é o resultado literal, mas
 * monograma com acento lê como erro de codificação, não como inicial.
 */
function iniciais(nome: string): string {
  const palavras = nome
    .split(/[\s-]+/)
    .filter((p) => /^\p{L}/u.test(p))
    .slice(0, 2)
  if (palavras.length === 0) return "?"
  return palavras
    .map((p) => p[0])
    .join("")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toUpperCase()
}
