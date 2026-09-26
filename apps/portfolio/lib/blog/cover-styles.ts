// Estilos de capa para scripts/blog-cover.ts.
//
// Este arquivo é irmão de lib/blog/cover-styles.ts no aguiarlabs e deve ser
// mantido em sincronia com ele: mexer no estilo de um lado recalibra a marca
// dos dois sites, que é o ponto.
//
// prompt = <estilo> + <assunto do post, de coverSubject no JSON> + <restrições> + <paleta do estilo>
//
// Guia de uso e assuntos que funcionaram: docs/blog-covers/README.md

const GRAYSCALE = "Strictly monochrome grayscale, no color at all."

export const COVER_STYLES = {
  render3d: {
    label: "Render 3D escuro",
    prompt:
      "Moody dark studio 3D render. Matte black and graphite geometric objects in a minimal composition. Soft rim lighting, shallow depth of field, premium minimal product-photography feel, near-black background, lots of negative space.",
    palette: GRAYSCALE,
  },
  halftone: {
    label: "Halftone / risografia",
    prompt:
      "Risograph-inspired abstract editorial illustration. Coarse halftone dot texture, bold simple geometric shapes, near-black background printed with off-white and mid-gray ink only, visible print grain and slight misregistration.",
    palette: GRAYSCALE,
  },
  // Cena narrativa com personagem, no lugar de objeto abstrato. O creme quente
  // nos realces é parte do estilo: em cinza puro a gravura perde o ar de papel.
  engraving: {
    label: "Gravura pontilhada",
    prompt:
      "Dark editorial illustration in the style of a fine stippled ink engraving. Dense black shadows, highlights rendered in warm off-white stipple and fine linework, heavy film grain and paper texture, strong single light source, cinematic wide composition, quiet contemplative mood.",
    palette: "Monochrome, near-black and warm off-white only, no other color.",
  },
} as const

export type CoverStyleId = keyof typeof COVER_STYLES

export const ACTIVE_COVER_STYLE: CoverStyleId = "render3d"

// Uma capa serve os cinco locales, então a imagem nunca carrega texto.
// É também por isso que ela diverge do resend.com, onde o título vive dentro
// da imagem: com cinco idiomas isso seriam cinco imagens por post.
export const COVER_CONSTRAINTS =
  "Absolutely no text, no letters, no numbers, no logos, no watermarks, no readable screens."

export function isCoverStyleId(value: string): value is CoverStyleId {
  return Object.hasOwn(COVER_STYLES, value)
}

export function buildCoverPrompt(
  subject: string,
  style: CoverStyleId = ACTIVE_COVER_STYLE,
): string {
  const { prompt, palette } = COVER_STYLES[style]
  return `${prompt} ${subject.trim()} ${COVER_CONSTRAINTS} ${palette}`
}
