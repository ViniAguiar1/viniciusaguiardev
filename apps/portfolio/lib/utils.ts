import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// O chip mono canônico da identidade. Variações (borda em --color-field para
// destaque, inversão para estado escolhido) compõem por cima via cn().
export const MONO_CHIP =
  "border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-mu"
