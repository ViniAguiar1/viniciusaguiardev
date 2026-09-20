# Identidade visual alinhada com o aguiarlabs — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Trazer a linguagem visual do aguiarlabs para o portfólio — mesma paleta de 7 tokens, dark-first, cantos retos, croma zero — mantendo o shell de sidebars e os componentes Radix.

**Architecture:** Os 7 tokens do aguiarlabs entram em `@theme` como fonte da verdade e os ~25 tokens do shadcn viram aliases que apontam para eles, então `components/ui/` continua funcionando sem reescrita. O tema passa de classe `.dark` para atributo `[data-theme]`, com escuro no `:root`. Dois guards em Vitest tornam a purga de cor e os cantos retos permanentes em vez de um mutirão que a próxima linha desfaz.

**Tech Stack:** Next.js 16 (App Router, Turbopack), Tailwind CSS v4 (`@theme`), shadcn/ui sobre Radix, next-themes, Vitest, pnpm sob Node 24.

**Spec:** `docs/superpowers/specs/2026-09-20-identidade-visual-aguiarlabs-design.md`

## Global Constraints

- **Node 24 local:** rodar `nvm use 24` antes de qualquer `pnpm`. O pnpm só existe sob o Node 24.
- **Os 7 tokens são os valores exatos do aguiarlabs.** Escuro: canvas `#050505`, surface `#0A0A0A`, card `#111111`, line `#1C1C1C`, field `#666666`, fg `#F2F2F2`, mu `#808080`. Claro: canvas `#FFFFFF`, surface `#F7F7F7`, card `#F0F0F0`, line `#E5E5E5`, field `#8A8A8A`, fg `#0A0A0A`, mu `#6B6B6B`. Não arredondar, não "melhorar".
- **Escada de fundos:** canvas < surface < card < line. Um hover fica **um degrau acima** do fundo onde o elemento se apoia. `--accent` → `line` (menus sobre popover); `--sidebar-accent` → `card` (itens sobre sidebar).
- **`--ring` aponta para `fg`, nunca para `line`.** `#1C1C1C` mede 1.20:1 contra o canvas e reprova no WCAG 1.4.11.
- **Croma zero.** Nenhuma família de cor do Tailwind, nenhum `white`/`black` chapado, nenhum hex arbitrário. Exceção única: `black`/`white` **com opacidade** (scrim de modal).
- **Cantos retos em caixas; `rounded-full` permanece** em pontos, avatares e foto de perfil.
- **Toda string de UI nova usa `t(locale, { pt, en, es, jp, fr })`** com os cinco locales. `lib/i18n-coverage.test.ts` falha em objeto incompleto.
- **Não tocar em `components/ui/` além de remover `rounded-*`.** São componentes gerados do shadcn sobre Radix.
- **Escala display do hero:** `clamp(2.25rem, 5.2vw, 4.5rem)`, peso 500, `leading-[0.94]`, `tracking-[-0.035em]`.
- **Commits em português**, seguindo o padrão do repo (`feat(escopo):`, `fix(escopo):`).
- CI roda lint → typecheck → **test** → build → AEO. AEO precisa ficar **≥ 90/100**.

---

### Task 1: Fundação de tokens em `globals.css`

**Files:**
- Modify: `app/globals.css:1-120` (blocos `@theme inline`, `:root`, `.dark`, `@layer base`)
- Modify: `app/globals.css:143` (o `hsl(oklch())` inválido)

**Interfaces:**
- Consumes: nada.
- Produces: as utilities `bg-canvas`, `bg-surface`, `bg-card`, `border-line`, `border-field`, `text-fg`, `text-mu` — usadas por todas as tasks seguintes. Os aliases shadcn (`--background`, `--primary`, …) mantêm `components/ui/` funcionando.

- [ ] **Step 1: Substituir o topo do arquivo até o fim do bloco `.dark`**

Trocar tudo de `@import "tailwindcss";` até o fechamento do bloco `.dark { … }` por:

```css
@import "tailwindcss";
@import "tw-animate-css";

/* O portfólio compartilha a paleta do aguiarlabs (~/Development/aguiarlabs).
   Os 7 tokens abaixo são a fonte da verdade; os tokens do shadcn apontam
   para eles, de modo que components/ui/ funciona sem reescrita. */

@custom-variant dark (&:is([data-theme="dark"] *));

@theme {
  --color-canvas: #050505;
  --color-surface: #0A0A0A;
  --color-card: #111111;
  --color-line: #1C1C1C;
  /* Borda de controles de formulário. --color-line mede 1.20:1 contra o
     canvas, e um input vazio cuja única fronteira é esse filete reprova no
     WCAG 1.4.11 (3:1 para a borda de um controle). Este mede 3.55:1. */
  --color-field: #666666;
  --color-fg: #F2F2F2;
  /* WCAG AA sobre --color-canvas: 5.16:1. */
  --color-mu: #808080;
}

@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  /* ATENÇÃO: --color-card NÃO é mapeado aqui, e a omissão é deliberada.
     `card` é o único nome que existe nos dois sistemas (paleta do aguiarlabs
     e shadcn). Mapeá-lo aqui criaria a referência circular
     --color-card → var(--card) → var(--color-card), porque :root declara
     --card: var(--color-card). O @theme acima já define --color-card, e
     :root/[data-theme="light"] o trocam por tema, então bg-card resolve
     certo para a paleta e para os componentes do shadcn. */
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  /* Cantos retos. As quatro escalas seguem declaradas porque rounded-md e
     rounded-lg ainda aparecem em components/ui/ até a Task 4; a Task 4 as
     remove junto com os últimos usos. */
  --radius-sm: 0;
  --radius-md: 0;
  --radius-lg: 0;
  --radius-xl: 0;
}

:root,
[data-theme="dark"] {
  color-scheme: dark;

  --color-canvas: #050505;
  --color-surface: #0A0A0A;
  --color-card: #111111;
  --color-line: #1C1C1C;
  --color-field: #666666;
  --color-fg: #F2F2F2;
  --color-mu: #808080;

  /* Compat shadcn. Como todos derivam dos 7 acima, o tema claro só precisa
     redeclarar os 7 — estes seguem sozinhos. */
  --radius: 0;
  --background: var(--color-canvas);
  --foreground: var(--color-fg);
  --card: var(--color-card);
  --card-foreground: var(--color-fg);
  --popover: var(--color-card);
  --popover-foreground: var(--color-fg);
  --primary: var(--color-fg);
  --primary-foreground: var(--color-canvas);
  --secondary: var(--color-card);
  --secondary-foreground: var(--color-fg);
  --muted: var(--color-surface);
  --muted-foreground: var(--color-mu);
  /* Um degrau acima de --popover (card), senão o hover do menu some. */
  --accent: var(--color-line);
  --accent-foreground: var(--color-fg);
  /* Nunca renderizado: 0 usos fora de components/ui/. Existe para as
     variantes destructive do shadcn compilarem. */
  --destructive: #7A2E2E;
  --border: var(--color-line);
  --input: var(--color-field);
  /* fg, não line: um anel em #1C1C1C mede 1.20:1 e reprova no WCAG 1.4.11. */
  --ring: var(--color-fg);
  --sidebar: var(--color-surface);
  --sidebar-foreground: var(--color-fg);
  --sidebar-primary: var(--color-fg);
  --sidebar-primary-foreground: var(--color-canvas);
  /* Um degrau acima de --sidebar (surface). */
  --sidebar-accent: var(--color-card);
  --sidebar-accent-foreground: var(--color-fg);
  --sidebar-border: var(--color-line);
  --sidebar-ring: var(--color-fg);
}

[data-theme="light"] {
  color-scheme: light;

  --color-canvas: #FFFFFF;
  --color-surface: #F7F7F7;
  --color-card: #F0F0F0;
  --color-line: #E5E5E5;
  /* 3.45:1 contra o canvas claro. */
  --color-field: #8A8A8A;
  --color-fg: #0A0A0A;
  /* 5.33:1 no canvas, 4.64:1 no card. */
  --color-mu: #6B6B6B;
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-canvas text-fg;
  }
}

/* Foco visível do aguiarlabs, no lugar do outline-ring/50 do shadcn. */
*:focus-visible {
  outline: 1px solid var(--color-fg);
  outline-offset: 3px;
}
```

Os tokens `--chart-1` … `--chart-5` **não** aparecem em lugar nenhum acima: são deletados nos dois temas (10 declarações, 0 usos no projeto).

- [ ] **Step 2: Corrigir a hairline inválida da sidebar direita**

Em `app/globals.css`, no bloco `[data-side="right"][data-slot="sidebar-inner"]`, trocar:

```css
  border-left: 1px solid hsl(var(--sidebar-border));
```

por:

```css
  /* Era hsl(var(--sidebar-border)) com um valor oklch dentro — declaração
     inválida, descartada pelo navegador, e a hairline nunca renderizou. */
  border-left: 1px solid var(--color-line);
```

- [ ] **Step 3: Portar as animações do aguiarlabs**

Acrescentar ao final de `app/globals.css`:

```css
@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.rise-in {
  animation: rise-in 0.9s cubic-bezier(0.2, 0.7, 0.15, 1) both;
}

.rise-in-delay-1 { animation-delay: 0.08s; }
.rise-in-delay-2 { animation-delay: 0.18s; }
.rise-in-delay-3 { animation-delay: 0.32s; }
.rise-in-delay-4 { animation-delay: 0.46s; }

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 4: Verificar que compila**

```bash
nvm use 24 && pnpm build
```

Esperado: build passa. O site ainda renderiza **claro por padrão** — o `next-themes` segue escrevendo a classe `.dark`, que não existe mais como variante. Isso é esperado e a Task 2 resolve.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css
git commit -m "feat(design): adota os 7 tokens do aguiarlabs como fonte da verdade

Os tokens do shadcn viram aliases que apontam para canvas/surface/card/
line/field/fg/mu, entao components/ui/ segue funcionando sem reescrita.
--accent e --sidebar-accent ficam um degrau acima do fundo em que se
apoiam, senao o hover some; --ring aponta para fg porque um anel em
#1C1C1C mede 1.20:1 e reprova no WCAG 1.4.11.

Corrige tambem hsl(var(--sidebar-border)) com valor oklch dentro:
declaracao invalida que impedia a hairline da sidebar direita de
renderizar. Deleta --chart-1..5 (10 declaracoes, 0 usos)."
```

---

### Task 2: Tema dark-first via `[data-theme]`

**Files:**
- Modify: `app/[locale]/layout.tsx:121-126` (props do `ThemeProvider`)
- Modify: `components/theme-toggle.tsx` (remove "System", traduz os rótulos)

**Interfaces:**
- Consumes: as utilities e os tokens da Task 1.
- Produces: `document.documentElement` passa a carregar `data-theme="dark"|"light"`. Os 34 usos de `dark:` seguem válidos pela `@custom-variant` da Task 1.

- [ ] **Step 1: Trocar o atributo e desligar o system**

Em `app/[locale]/layout.tsx`, substituir as props do `ThemeProvider`:

```tsx
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
```

- [ ] **Step 2: Reescrever `components/theme-toggle.tsx`**

A opção "System" fica morta com `enableSystem={false}`. Os rótulos estão hardcoded em inglês num site de cinco locales; o locale sai do pathname, mesmo padrão de `components/language-toggle.tsx:17-20`.

```tsx
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DEFAULT_LOCALE, isLocale, t, type Locale } from "@/lib/i18n"

function localeFromPath(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0]
  return isLocale(first) ? first : DEFAULT_LOCALE
}

export function ModeToggle() {
  const { setTheme } = useTheme()
  const pathname = usePathname() ?? "/"
  const locale = localeFromPath(pathname)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild suppressHydrationWarning>
        <Button variant="outline" size="icon" suppressHydrationWarning>
          <Sun className="h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <span className="sr-only">
            {t(locale, { pt: "Alternar tema", en: "Toggle theme", es: "Cambiar tema", jp: "テーマを切り替える", fr: "Changer de thème" })}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          {t(locale, { pt: "Claro", en: "Light", es: "Claro", jp: "ライト", fr: "Clair" })}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          {t(locale, { pt: "Escuro", en: "Dark", es: "Oscuro", jp: "ダーク", fr: "Sombre" })}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

Nota sobre os ícones: com escuro como padrão, o estado base do `Sun` passa a ser oculto e o do `Moon` visível — por isso as classes trocaram de lado em relação ao original.

- [ ] **Step 3: Rodar os checks**

```bash
nvm use 24 && pnpm typecheck && pnpm test && pnpm build
```

Esperado: tudo passa. `lib/i18n-coverage.test.ts` valida os três objetos `t()` novos.

- [ ] **Step 4: Verificar no navegador**

```bash
pnpm dev
```

Abrir `http://localhost:3000/pt`. Esperado: **carrega escuro**, `<html data-theme="dark">` no inspetor, o toggle alterna para claro e o menu mostra só duas opções, traduzidas.

- [ ] **Step 5: Commit**

```bash
git add app/\[locale\]/layout.tsx components/theme-toggle.tsx
git commit -m "feat(design): tema dark-first via data-theme, como no aguiarlabs

next-themes passa a escrever data-theme no lugar da classe .dark, com
escuro no padrao e enableSystem desligado. O toggle perde a opcao
System, que ficaria morta, e ganha rotulos nos cinco locales."
```

---

### Task 3: Guard de paleta e purga de cor

**Files:**
- Create: `lib/design-system.test.ts`
- Modify: `components/projects-grid.tsx:12-28` (deleta `categoryColors`), `:104` (scrim fica)
- Modify: `components/experience-item.tsx:21,42`
- Modify: `components/app-sidebar.tsx:20-21,34-35,40,69,75`
- Modify: `components/search-content.tsx:116`
- Modify: `app/[locale]/page.tsx:73-74,169`
- Modify: `app/[locale]/posts/[slug]/page.tsx:83`
- Modify: `app/[locale]/sobre/page.tsx:97`
- Modify: `app/[locale]/engenharia/page.tsx:185`
- Modify: `app/[locale]/projetos/x-drop/page.tsx`, `ikropp/page.tsx`, `vox-pet-digital/page.tsx`
- Modify: `lib/posts.ts:46,94` (remove `tagColor`)
- Modify: `data/posts/*.json` (12 arquivos — remove a chave `tagColor`)

**Interfaces:**
- Consumes: `border-line`, `text-mu`, `text-fg`, `bg-fg`, `text-canvas` da Task 1.
- Produces: o chip mono canônico, reusado pela Task 5 —
  `border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-mu`

- [ ] **Step 1: Escrever o guard que falha**

Criar `lib/design-system.test.ts`:

```ts
import fs from "node:fs"
import path from "node:path"
import { describe, it, expect } from "vitest"

// process.cwd() é a raiz do repo sob Vitest — mesmo padrão de lib/i18n-coverage.test.ts
const ROOT = process.cwd()

const SCAN_DIRS = ["app", "components"]
const SKIPPED_DIR = path.join("components", "ui") // código gerado do Shadcn

const FAMILIES =
  "red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|gray|slate|zinc|neutral|stone"
const UTILITIES =
  "bg|text|border|ring|from|to|via|fill|stroke|shadow|outline|decoration|divide|accent|caret|placeholder"

const FAMILY_CLASS = new RegExp(`\\b(?:${UTILITIES})-(?:${FAMILIES})-\\d{2,3}\\b`, "g")
// white/black chapados. Com opacidade (bg-black/50) são permitidos: scrim de modal,
// que o próprio aguiarlabs usa em app/admin.
const FLAT_BW = new RegExp(`\\b(?:${UTILITIES})-(?:white|black)\\b(?!/)`, "g")
// Valores arbitrários de cor: text-[#444], border-[#eee], bg-[#f5f6fa]
const ARBITRARY_HEX = /\[#[0-9a-fA-F]{3,8}\]/g

function collectFiles(dir: string): string[] {
  const out: string[] = []
  for (const entry of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (rel === SKIPPED_DIR) continue
      out.push(...collectFiles(rel))
      continue
    }
    if (!/\.tsx?$/.test(entry.name)) continue
    if (entry.name.includes(".test.")) continue
    out.push(rel)
  }
  return out
}

describe("paleta", () => {
  it("nenhuma cor fora dos 7 tokens em app/ e components/", () => {
    const offenders: string[] = []
    for (const dir of SCAN_DIRS) {
      for (const rel of collectFiles(dir)) {
        const src = fs.readFileSync(path.join(ROOT, rel), "utf-8")
        const hits = [
          ...(src.match(FAMILY_CLASS) ?? []),
          ...(src.match(FLAT_BW) ?? []),
          ...(src.match(ARBITRARY_HEX) ?? []),
        ]
        if (hits.length) {
          offenders.push(`${rel}: ${[...new Set(hits)].sort().join(", ")}`)
        }
      }
    }
    expect(offenders).toEqual([])
  })

  // tagColor é cor no nível dos dados: nenhuma varredura de .tsx a enxerga.
  it("nenhum post declara tagColor", () => {
    const dir = path.join(ROOT, "data", "posts")
    const offenders = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".json"))
      .filter((f) => "tagColor" in JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")))
    expect(offenders).toEqual([])
  })
})
```

- [ ] **Step 2: Rodar e confirmar que falha**

```bash
nvm use 24 && pnpm test lib/design-system.test.ts
```

Esperado: **FAIL** nos dois testes. O primeiro lista ~9 arquivos com as famílias de cor; o segundo lista os 12 JSONs.

- [ ] **Step 3: Deletar o mapa `categoryColors`**

Em `components/projects-grid.tsx`, apagar as linhas 12-28 (`const categoryColors: Record<string, string> = { … }`) e trocar o uso da categoria pelo chip mono canônico:

```tsx
<span className="border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-mu">
  {project.category}
</span>
```

O `bg-black/50` do `Dialog.Overlay` na linha 104 **fica como está** — scrim de modal é a exceção sancionada.

- [ ] **Step 4: Converter os estados semânticos**

`components/experience-item.tsx:21` — o badge "Atual" vira chip mono em destaque:

```tsx
          <span className="border border-field px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-fg">
```

`components/experience-item.tsx:42` — o highlight:

```tsx
        <p className="text-xs font-mono text-fg">{t(locale, highlight)}</p>
```

`app/[locale]/engenharia/page.tsx:185` — "escolhido" vira invertido, que é o gesto mais forte da paleta:

```tsx
                    <span className={`text-[10px] font-mono uppercase tracking-[0.16em] px-2 py-0.5 ${s.chosen ? "bg-fg text-canvas" : "border border-line text-mu"}`}>{s.status}</span>
```

`app/[locale]/sobre/page.tsx:97` — o ponto da timeline:

```tsx
                  experience.current ? "bg-fg" : "bg-line"
```

(o `ring-4 ring-emerald-500/20` some junto; o ponto mantém `rounded-full`, que é forma redonda legítima)

- [ ] **Step 5: Converter o bloco de perfil da sidebar**

`components/app-sidebar.tsx` — é o arquivo com mais cor solta (3 hex arbitrários, `text-gray-*`, `bg-white`, `dark:text-white`, `hover:text-black`, `hover:text-green-600`). Trocar:

| Linha | De | Para |
|---|---|---|
| 20 | `className="flex justify-center mb-4 dark:text-white"` | `className="flex justify-center mb-4"` |
| 21 | `bg-white border border-[#eee]` | `bg-surface border border-line` |
| 34 | `className="text-center mb-1 dark:text-white"` | `className="text-center mb-1"` |
| 35 | `text-3xl dark:text-white font-light text-[#444]` | `text-3xl font-light text-fg` |
| 40 | `text-sm text-gray-500 mb-8 mt-2 dark:text-white` | `text-sm text-mu mb-8 mt-2` |
| 69 | `text-gray-700 hover:text-black` | `text-mu hover:text-fg` |
| 75 | `text-gray-700 hover:text-green-600` | `text-mu hover:text-fg` |

Aplicar o mesmo par `text-mu hover:text-fg` a **todos** os ícones sociais do bloco, não só aos dois listados. Procurar `bg-[#f5f6fa]` no mesmo arquivo e trocar por `bg-surface`.

- [ ] **Step 6: Remover o `tagColor` do código**

`lib/posts.ts:46` — apagar a linha `tagColor?: string`.
`lib/posts.ts:94` — apagar a linha `tagColor: data.tagColor ?? "",`.

Nos três pontos que o renderizavam, o badge vira chip mono:

`components/search-content.tsx:116`:

```tsx
                      <span className="border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-mu">
```

`app/[locale]/page.tsx:169`:

```tsx
                      "absolute left-6 top-6 border border-line bg-canvas/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-mu backdrop-blur-sm",
```

`app/[locale]/posts/[slug]/page.tsx:83`:

```tsx
            "border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-mu mb-4 inline-block",
```

Remover das três chamadas o argumento `post.tagColor || "bg-primary"` que o `cn()` recebia.

- [ ] **Step 7: Remover a chave dos 12 JSONs**

```bash
cd /Users/viniciusaguiar/viniciusaguiardev
for f in data/posts/*.json; do
  node -e '
    const fs=require("fs"); const p=process.argv[1];
    const j=JSON.parse(fs.readFileSync(p,"utf8"));
    delete j.tagColor;
    fs.writeFileSync(p, JSON.stringify(j,null,2)+"\n");
  ' "$f"
done
git diff --stat data/posts/
```

Esperado: 12 arquivos alterados, uma linha removida em cada.

- [ ] **Step 8: Varrer o resto**

```bash
nvm use 24 && pnpm test lib/design-system.test.ts
```

O teste lista o que sobrou. O levantamento prévio diz exatamente o que é:

| Arquivo | Classes restantes |
|---|---|
| `app/[locale]/projetos/x-drop/page.tsx` | `bg-emerald-50`, `bg-emerald-400`, `bg-emerald-500`, `bg-emerald-950`, `text-emerald-400`, `text-emerald-700` |
| `app/[locale]/projetos/vox-pet-digital/page.tsx` | as mesmas seis do x-drop |
| `app/[locale]/projetos/ikropp/page.tsx` | `bg-blue-50`, `bg-blue-950`, `text-blue-400`, `text-blue-700` |
| `app/[locale]/page.tsx:73-74` | `bg-emerald-700`, `text-white` (CTA de WhatsApp) |

Nas três páginas de projeto o padrão é o mesmo: um bloco de destaque com fundo claro/escuro por tema (`bg-*-50` / `bg-*-950`) e texto correspondente (`text-*-700` / `text-*-400`), mais um ponto ou barra de acento (`bg-*-400` / `bg-*-500`). A conversão:

- fundo do bloco → `bg-surface border border-line`
- texto do bloco → `text-fg`, e o secundário → `text-mu`
- ponto/barra de acento → `bg-fg`

Converter cada um:

- `app/[locale]/page.tsx:73-74` — o CTA verde de WhatsApp vira o botão secundário padrão:

```tsx
              className="px-4 py-2 text-sm border border-line bg-surface text-fg hover:border-field hover:bg-card transition text-center"
```

- Nas páginas de projeto, trocar cada par `bg-<família>-100 text-<família>-800 dark:bg-<família>-900/30 dark:text-<família>-400` pelo chip mono canônico, e qualquer `text-white` sobre fundo colorido por `text-fg`.

Repetir o comando de teste até passar.

- [ ] **Step 9: Verificar que passa e que nada quebrou**

```bash
nvm use 24 && pnpm test && pnpm typecheck && pnpm build
```

Esperado: tudo passa, incluindo os dois testes do guard novo.

- [ ] **Step 10: Commit**

```bash
git add lib/design-system.test.ts lib/posts.ts data/posts components app
git commit -m "feat(design): croma zero, com guard que o mantem

Remove os 132 pontos de cor fora dos 7 tokens: o mapa categoryColors
de 15 matizes, as familias neutras do Tailwind, white/black chapados,
tres hex arbitrarios no bloco de perfil da sidebar, e o campo tagColor
que vivia nos 12 JSONs de post.

Estado semantico passa a ser contraste de valor: Atual vira chip mono
em text-fg, escolhido vira invertido (bg-fg/text-canvas), o ponto da
timeline vira bg-fg contra bg-line.

lib/design-system.test.ts roda no CI e varre tambem os JSONs, que
nenhuma varredura de .tsx enxergaria."
```

---

### Task 4: Guard de cantos e varredura de `rounded`

**Files:**
- Modify: `lib/design-system.test.ts` (acrescenta o segundo guard)
- Modify: os 20 arquivos com `rounded-*` fora de `components/ui/`
- Modify: os 8 arquivos de `components/ui/`
- Modify: `app/globals.css` (remove as 4 escalas de radius)

**Interfaces:**
- Consumes: os tokens da Task 1.
- Produces: nada novo — é varredura.

- [ ] **Step 1: Acrescentar o guard de cantos**

Adicionar ao final de `lib/design-system.test.ts`:

```ts
// rounded-full é permitido: pontos, avatares e a foto de perfil são
// formas redondas por natureza. O aguiarlabs mantém rounded-full no
// ponto de 6px do StatusStrip.
const BOXY_ROUNDED = /\brounded(?!-full)(?:-(?:sm|md|lg|xl|2xl|3xl))?\b/g

describe("cantos", () => {
  it("nenhuma caixa arredondada em app/ e components/", () => {
    const offenders: string[] = []
    for (const dir of SCAN_DIRS) {
      for (const rel of collectFiles(dir)) {
        const src = fs.readFileSync(path.join(ROOT, rel), "utf-8")
        const hits = src.match(BOXY_ROUNDED)
        if (hits) offenders.push(`${rel}: ${[...new Set(hits)].sort().join(", ")}`)
      }
    }
    expect(offenders).toEqual([])
  })
})
```

Nota: este guard varre `components/ui/` **também**? Não — `collectFiles` pula `SKIPPED_DIR`. Os 24 `rounded-*` de lá são limpos no Step 4 por consistência de código, mas não são vigiados, porque um `npx shadcn add` futuro os reintroduziria e falharia o CI sem motivo real (com `--radius: 0` eles já resolvem para 0).

- [ ] **Step 2: Rodar e confirmar que falha**

```bash
nvm use 24 && pnpm test lib/design-system.test.ts
```

Esperado: **FAIL** listando os 20 arquivos com as 97 ocorrências.

- [ ] **Step 3: Varrer os 20 arquivos, um a um**

Arquivos: `components/mobile-header.tsx`, `experience-item.tsx`, `engineering-topic.tsx`, `app-sidebar.tsx`, `search-button.tsx`, `search-content.tsx`, `projects-grid.tsx`, `image-gallery.tsx`, `language-toggle.tsx`, `editor-config-sheet.tsx`, `code-block.tsx`, e as páginas `app/[locale]/not-found.tsx`, `page.tsx`, `posts/[slug]/page.tsx`, `sobre/page.tsx`, `projetos/page.tsx`, `projetos/x-drop/page.tsx`, `projetos/ikropp/page.tsx`, `projetos/vox-pet-digital/page.tsx`, `engenharia/page.tsx`.

**Regra, aplicada caso a caso e não com find-and-replace:**
- `rounded`, `rounded-sm|md|lg|xl|2xl|3xl` em caixas (cards, botões, inputs, badges, imagens) → **remover a classe**
- `rounded-full` em foto de perfil, avatares, pontos e indicadores → **manter**

Se um `rounded-full` estiver numa caixa retangular (um badge tipo pílula, por exemplo), ele vira canto reto: trocar por nada. O `rounded-full` da foto de perfil em `app-sidebar.tsx:21` **fica**.

- [ ] **Step 4: Limpar `components/ui/`**

Remover os `rounded-*` dos 8 arquivos de `components/ui/`. Com `--radius: 0` eles já não têm efeito; a limpeza é para o código não mentir sobre o que faz.

- [ ] **Step 5: Remover as escalas de radius**

Em `app/globals.css`, apagar do bloco `@theme inline` as quatro linhas `--radius-sm/md/lg/xl` e o comentário acima delas, e apagar `--radius: 0;` do bloco `:root`. Nenhum `rounded-*` resta para consumi-las.

- [ ] **Step 6: Verificar**

```bash
nvm use 24 && pnpm test && pnpm typecheck && pnpm build
```

Esperado: tudo passa.

- [ ] **Step 7: Commit**

```bash
git add lib/design-system.test.ts app components
git commit -m "feat(design): cantos retos, com guard que os mantem

Remove as 121 ocorrencias de rounded em caixas e as quatro escalas de
radius. rounded-full continua permitido e em uso na foto de perfil e
nos indicadores, que sao formas redondas por natureza.

O guard nao vigia components/ui/: com --radius 0 as classes de la ja
resolvem para 0, e vigia-las quebraria o CI no proximo shadcn add."
```

---

### Task 5: Assinatura editorial na home

**Files:**
- Create: `components/section-eyebrow.tsx`
- Modify: `app/[locale]/page.tsx` (hero + eyebrows das seções)

**Interfaces:**
- Consumes: o chip mono da Task 3, as classes `rise-in*` da Task 1.
- Produces: `<SectionEyebrow index="02">{label}</SectionEyebrow>` — server component, sem `"use client"`.

- [ ] **Step 1: Criar o componente de eyebrow**

Criar `components/section-eyebrow.tsx`:

```tsx
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
```

- [ ] **Step 2: Reescrever o hero**

Em `app/[locale]/page.tsx`, substituir o `<header className="mb-10">` inteiro por:

```tsx
      <header className="mb-16">
        <SectionEyebrow index="01">
          {t(locale, { pt: "Portfólio", en: "Portfolio", es: "Portafolio", jp: "ポートフォリオ", fr: "Portfolio" })}
        </SectionEyebrow>

        <h1 className="rise-in rise-in-delay-1 font-medium leading-[0.94] tracking-[-0.035em] text-fg [font-size:clamp(2.25rem,5.2vw,4.5rem)]">
          {dict.home.title}
        </h1>

        <p className="rise-in rise-in-delay-2 mt-8 max-w-2xl text-lg leading-relaxed text-mu">
          {dict.home.subtitle}
        </p>

        <p className="rise-in rise-in-delay-2 mt-3 max-w-2xl text-sm text-mu">
          {dict.home.description}
        </p>

        <div className="rise-in rise-in-delay-3 mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/Curriculo-Vinicius-Aguiar.pdf"
            target="_blank"
            data-umami-event="cv-download"
            data-umami-event-source="hero"
            className="group inline-flex items-center gap-3 bg-fg px-5 py-3.5 text-[13px] font-medium text-canvas transition-colors duration-200 hover:bg-fg/85"
          >
            {dict.home.ctaResume}
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>

          <Link
            href="https://api.whatsapp.com/send?phone=5511915369113&text=Ol%C3%A1%2C%20vim%20pelo%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar."
            target="_blank"
            data-umami-event="contact-click"
            data-umami-event-source="hero"
            className="inline-flex items-center border border-line bg-surface px-5 py-3.5 text-[13px] font-medium text-fg transition-colors duration-200 hover:border-field hover:bg-card"
          >
            {dict.home.ctaContact}
          </Link>

          <Link
            href={localePath(locale, "/sobre")}
            className="inline-flex items-center border border-line bg-surface px-5 py-3.5 text-[13px] font-medium text-fg transition-colors duration-200 hover:border-field hover:bg-card"
          >
            {dict.home.ctaAbout}
          </Link>
        </div>
      </header>
```

O `<FadeIn>` que envolvia o header sai — o hero passa a usar `rise-in`. Os `data-umami-event` são preservados: são telemetria em produção.

Adicionar o import no topo do arquivo:

```tsx
import { SectionEyebrow } from "@/components/section-eyebrow"
```

- [ ] **Step 3: Numerar as outras duas seções**

A home tem exatamente **três** seções (`app/[locale]/page.tsx`, 208 linhas): `HERO` (linha 37, já feito no Step 2 como `01`), `ENGINEERING PREVIEW` (linha 91) e `POSTS` (linha 146). Não há outras.

**Seção `02` — engenharia.** Trocar o bloco de `app/[locale]/page.tsx:93-101` por:

```tsx
          <SectionEyebrow index="02">
            {t(locale, { pt: "Engenharia", en: "Engineering", es: "Ingeniería", jp: "エンジニアリング", fr: "Ingénierie" })}
          </SectionEyebrow>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-medium tracking-[-0.02em] text-fg">
              {t(locale, { pt: "Como eu penso sobre sistemas", en: "How I think about systems", es: "Cómo pienso sobre sistemas", jp: "システムをどう設計するか", fr: "Comment je pense les systèmes" })}
            </h2>
```

**Seção `03` — posts.** Mesmo tratamento no bloco que começa em `app/[locale]/page.tsx:146`, com o eyebrow:

```tsx
          <SectionEyebrow index="03">
            {t(locale, { pt: "Escrita", en: "Writing", es: "Escritura", jp: "執筆", fr: "Écrits" })}
          </SectionEyebrow>
```

e o `<h2>` da seção recebendo as mesmas classes do `02` (`text-2xl font-medium tracking-[-0.02em] text-fg`).

**Nas duas seções**, trocar a separação por margem (`mb-10`) pela estrutura do aguiarlabs: `border-t border-line pt-12 mb-16` no `<section>`.

- [ ] **Step 4: Verificar**

```bash
nvm use 24 && pnpm test && pnpm typecheck && pnpm build
```

Esperado: passa. `lib/i18n-coverage.test.ts` valida cada rótulo novo nos cinco locales — se algum estiver só em português, falha aqui.

- [ ] **Step 5: Conferir no navegador**

```bash
pnpm dev
```

Abrir `http://localhost:3000/pt` e `http://localhost:3000/jp`. Esperado: eyebrow numerado abrindo cada seção, headline grande com entrada escalonada, CTA invertido com a seta deslizando no hover, e nada de texto em português na rota `/jp`.

- [ ] **Step 6: Commit**

```bash
git add components/section-eyebrow.tsx app/\[locale\]/page.tsx
git commit -m "feat(design): assinatura editorial na home

Eyebrow mono numerado com filete abrindo cada secao, headline display
em clamp(2.25rem,5.2vw,4.5rem) com leading 0.94, CTA primario invertido
com seta que desliza, e rise-in escalonado no hero.

A escala e recalibrada para a coluna de 1024px: o clamp do aguiarlabs
pressupoe grid full-bleed de 1400px e empurraria os CTAs para fora da
primeira dobra."
```

---

### Task 6: Blog e blocos de post

**Files:**
- Modify: `app/[locale]/posts/[slug]/page.tsx:91-155`
- Modify: `components/code-block.tsx`
- Modify: `app/globals.css` (seção dos tokens do Prism)

**Interfaces:**
- Consumes: os tokens da Task 1, o chip mono da Task 3.
- Produces: nada.

- [ ] **Step 1: Ajustar a tipografia dos blocos**

Em `app/[locale]/posts/[slug]/page.tsx`, aplicar os valores do aguiarlabs a cada tipo de bloco:

```tsx
      <h1 className="text-[clamp(1.875rem,3.6vw,3rem)] font-medium leading-[1.05] tracking-[-0.025em] mb-3 break-words text-fg">

      <p className="text-xs font-mono uppercase tracking-[0.16em] text-mu mb-10">

      <article className="space-y-6 text-[17px] leading-[1.75] min-w-0 text-fg">
```

No `case "paragraph"`, trocar `text-foreground/90` por `text-fg`.

No `case "image"`, a imagem perde o canto e mantém o filete:

```tsx
                      className="border border-line w-full h-auto"
```

e a legenda vira `text-xs text-mu`.

- [ ] **Step 2: Ajustar a moldura do bloco de código**

Em `components/code-block.tsx`, o `<pre>` recebe a moldura do aguiarlabs. As **cores dos tokens do Prism não mudam** — o aguiarlabs mantém cor real dentro do bloco (Shiki com temas duais) e o equivalente aqui é deixar o Prism em paz:

```tsx
      className={cn(
        "border border-line bg-card font-mono text-[13.5px] leading-[1.65] overflow-x-auto p-[1.1em_1.25em]",
        className
      )}
```

- [ ] **Step 3: Ajustar o `code` inline no `globals.css`**

Na seção dos tokens do Prism em `app/globals.css`, acrescentar:

```css
:not(pre) > code {
  font-family: var(--font-geist-mono), ui-monospace, monospace;
  font-size: 0.88em;
  background: var(--color-card);
  border: 1px solid var(--color-line);
  padding: 0.1em 0.35em;
}
```

- [ ] **Step 4: Verificar**

```bash
nvm use 24 && pnpm test && pnpm typecheck && pnpm build && pnpm dev
```

Abrir um post que tenha bloco de código nos dois temas. Esperado: moldura reta com filete, código colorido normalmente, `code` inline com fundo e borda.

- [ ] **Step 5: Commit**

```bash
git add app/\[locale\]/posts components/code-block.tsx app/globals.css
git commit -m "feat(design): corpo do post na tipografia do aguiarlabs

Corpo em 17px/1.75, moldura do bloco de codigo com filete e canto reto,
code inline com fundo card e borda line. As cores dos tokens do Prism
ficam: o aguiarlabs tambem mantem cor real dentro do bloco, o grayscale
vale para a moldura."
```

---

### Task 7: Verificação final e PR

**Files:** nenhum — é verificação.

- [ ] **Step 1: Pipeline completo**

```bash
nvm use 24 && pnpm lint && pnpm typecheck && pnpm test && pnpm build && pnpm aeo
```

Esperado: tudo passa; AEO **≥ 90/100**. Se o AEO caiu, a causa mais provável é um `<h1>`/`<h2>` que sumiu numa reestruturação de seção — o script checa estrutura de conteúdo.

- [ ] **Step 2: Revisão visual manual**

`pnpm dev`, e conferir **nos dois temas**:

| Rota | O que olhar |
|---|---|
| `/pt` | hero, eyebrows numerados, CTAs |
| `/pt/sobre` | timeline, ponto de "atual", badges de experiência |
| `/pt/projetos` | grid, chips de categoria, modal e seu scrim |
| `/pt/engenharia` | badge "escolhido" invertido, Sheet lateral |
| `/pt/posts/<slug>` | corpo, bloco de código, imagem |

E **os estados que nenhum check automatizado pega**:
- hover de item da sidebar esquerda (deve aparecer, `card` sobre `surface`)
- hover de item do dropdown de idioma e de tema (deve aparecer, `line` sobre `card`)
- foco por teclado (Tab) em botão, link e input — outline de 1px em `fg` com offset de 3px
- a hairline da sidebar direita, que **não renderizava antes** desta entrega
- abaixo de 1024px, onde a sidebar vira drawer

- [ ] **Step 3: Abrir a PR**

```bash
git push -u origin feat/identidade-visual-aguiarlabs
gh pr create --title "feat(design): identidade visual alinhada com o aguiarlabs" --body "$(cat <<'BODY'
Alinha o portfólio à identidade do aguiarlabs: mesma paleta de 7 tokens,
dark-first, cantos retos e croma zero, mantendo o shell de sidebars e os
componentes Radix.

## O que muda

- **Tokens:** os 7 do aguiarlabs viram fonte da verdade; os do shadcn viram
  aliases, então `components/ui/` não foi reescrito
- **Tema:** dark-first via `[data-theme]`, `enableSystem` desligado
- **Cor:** 132 pontos removidos, incluindo o campo `tagColor` dos 12 posts.
  Estado semântico passa a ser contraste de valor
- **Cantos:** 121 ocorrências de `rounded` em caixas; `rounded-full` fica
- **Tipografia:** eyebrow mono numerado e display em
  `clamp(2.25rem, 5.2vw, 4.5rem)`, recalibrado para a coluna de 1024px

## Correções que entraram junto

- `hsl(var(--sidebar-border))` com valor oklch dentro — declaração inválida
  que impedia a hairline da sidebar direita de renderizar
- `--ring` apontava para um valor de 1.20:1 de contraste, reprovando no
  WCAG 1.4.11; agora aponta para `fg`
- O toggle de tema tinha uma opção "System" que ficaria morta, e rótulos em
  inglês num site de cinco locales

## Guards

`lib/design-system.test.ts` roda no CI e mantém as duas regras permanentes.
O guard de paleta varre também `data/posts/*.json`, onde vivia o `tagColor`
que nenhuma varredura de `.tsx` enxergaria.

## Risco conhecido

A troca de `attribute="class"` para `attribute="data-theme"` muda a chave que
o next-themes persiste. Quem já tem tema salvo pode ver um flash na primeira
visita após o deploy. É de uma visita só.

Spec: `docs/superpowers/specs/2026-09-20-identidade-visual-aguiarlabs-design.md`

🤖 Generated with [Claude Code](https://claude.com/claude-code)
BODY
)"
```

- [ ] **Step 4: Conferir o preview da Vercel**

Esperar o deploy de preview da PR e repetir o Step 2 na URL de preview, que é onde o `next/font` e o build de produção se comportam de verdade.
