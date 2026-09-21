# Alinhamento da identidade visual com o aguiarlabs

**Data:** 2026-09-20
**Status:** Aprovado — aguardando plano de implementação

## Contexto

O portfólio e o `aguiarlabs` (`~/Development/aguiarlabs`) são hoje dois sistemas visuais opostos, apesar de serem a mesma pessoa e a mesma marca.

**O aguiarlabs** tem uma linguagem editorial deliberada, documentada no próprio CSS:

- **7 tokens em hex chato**, croma zero. Verificado: `grep` por classes cromáticas (`bg-*-500`, `text-*-700`, …) no `app/` inteiro retorna **zero resultados**. Não há exceção.
- **Dark-first** via `[data-theme]`, com o tema claro como opt-in.
- **Cantos retos em tudo**, exceto formas intrinsecamente redondas — o ponto de 6px do `StatusStrip` mantém `rounded-full`.
- **Hairline `--color-line` como estrutura**: seções fecham com `border-b`, linhas de lista abrem com `border-t`.
- Contrastes WCAG calculados à mão e justificados em comentário. `--color-field` (#666666) existe **só** porque `--color-line` mede 1.20:1 contra o canvas e reprova no critério 1.4.11 como borda de controle; #666666 mede 3.55:1.
- Assinatura tipográfica: eyebrow `font-mono text-[11px] uppercase tracking-[0.18em] text-mu` com filete de 32px, seções numeradas, e display `clamp(2.5rem, 8.2vw, 7.75rem)` com `leading-[0.94] tracking-[-0.035em]` peso 500.
- Estado nunca é matiz: é `text-fg` contra `text-mu`, ou inversão `bg-fg`/`text-canvas`.

**O portfólio** usa o tema padrão do shadcn/ui praticamente intocado: ~25 tokens oklch neutros, `--radius: 0.625rem`, variante `.dark`, `defaultTheme="system"`, e **85 usos de cor cromática** espalhados por 9 arquivos.

**O que já está alinhado:** os dois usam Geist Sans + Geist Mono via `next/font/google`. A família tipográfica não muda.

### Bug pré-existente que o trabalho corrige

`app/globals.css:143` declara:

```css
border-left: 1px solid hsl(var(--sidebar-border));
```

Mas `--sidebar-border` é `oklch(0.922 0 0)`. `hsl(oklch(…))` é inválido e o navegador descarta a declaração inteira.

> **Correção pós-execução: este diagnóstico estava certo e incompleto, e a conclusão que ele sustentava era falsa.**
>
> A declaração é de fato inválida. Mas **não é por isso** que a hairline não aparece: `components/right-sidebar.tsx` passa `collapsible="none"`, e nesse caminho `components/ui/sidebar.tsx` faz um *early return* que renderiza um `<div data-slot="sidebar">` sem `data-side` e sem nenhum descendente `data-slot="sidebar-inner"`. O seletor `[data-side="right"][data-slot="sidebar-inner"]` **nunca casou** — e o mesmo vale para as outras nove regras `[data-side="right"]` do arquivo, que também eram letra morta. A largura de 4.5rem vinha de `w-18` no componente, não do CSS.
>
> Portanto corrigir o valor da declaração não produzia o resultado que esta seção prometia. A correção real é `border-l border-line` no `className` do `components/right-sidebar.tsx`, e as dez regras mortas foram deletadas.
>
> **Causa raiz, comum às três afirmações falsas desta spec** (esta, a contagem de `--chart-*` e a contagem de "85 usos cromáticos"): todas foram derivadas de ler um arquivo isolado em vez de seguir o caminho de renderização até o DOM. Um `grep` diz o que está escrito; não diz o que é aplicado.

## Objetivo

Trazer a linguagem visual do aguiarlabs para o portfólio de forma que os dois repositórios compartilhem o mesmo vocabulário de tokens — a ponto de um componente poder ser copiado de um para o outro e funcionar — **mantendo a arquitetura de navegação do portfólio** (shell de três zonas: sidebar esquerda, conteúdo, sidebar direita).

## Decisões tomadas no brainstorming

| # | Decisão | Escolha |
|---|---|---|
| 1 | Profundidade do alinhamento | Linguagem visual completa, shell de sidebars preservado |
| 2 | Tema padrão | Dark-first puro, igual ao aguiarlabs — `enableSystem` desligado |
| 3 | Rollout | PR única com tudo |
| 4 | Reconciliação de tokens | Os 7 tokens do aguiarlabs como fonte da verdade + camada de compat para o shadcn |
| 5 | `--destructive` | Mantido definido e dessaturado, nunca renderizado |
| 6 | Escala do display | `clamp(2.25rem, 5.2vw, 4.5rem)` — recalibrada para a coluna de 1024px |
| 7 | Verde do WhatsApp | Removido — croma zero absoluto, sem exceção |

## Fora do escopo

- **Grid de 12 colunas full-bleed.** O shell de sidebars fica; a coluna de conteúdo segue `max-w-5xl` (home) e `max-w-3xl` (posts).
- **Remover o shadcn/ui.** `sidebar.tsx`, `sheet.tsx`, `dropdown-menu.tsx` e `tooltip.tsx` embrulham Radix pela acessibilidade. Reescrevê-los à mão para igualar o aguiarlabs (que não usa shadcn) é semanas de trabalho com risco alto de regressão de a11y, para ganhar elegância de CSS.
- **Trocar Prism por Shiki.** O aguiarlabs usa Shiki com temas duais; aqui o Prism já funciona e o alinhamento acontece na **moldura** do bloco, não nos tokens da linguagem.
- **`pulse-ring`.** É do indicador de disponibilidade do aguiarlabs; não há equivalente no portfólio.
- **Substituir `FadeIn` nas seções internas.** Só o hero ganha `rise-in`.
- **Reescrever conteúdo.** Nenhum **texto** de post, projeto ou experiência muda. A única alteração em arquivo de dados é a remoção da chave `tagColor` dos 12 posts (ver 4.4), que é metadado de apresentação.
- **Novo PDF de currículo** com a identidade nova.

## 1. Fundação de tokens

`app/globals.css` passa a declarar os 7 tokens do aguiarlabs com os **mesmos valores hex**, incluindo os comentários que justificam cada contraste. Os tokens shadcn viram aliases.

### Os 7 tokens

| Token | Escuro (`:root`) | Claro (`[data-theme="light"]`) |
|---|---|---|
| `--color-canvas` | `#050505` | `#FFFFFF` |
| `--color-surface` | `#0A0A0A` | `#F7F7F7` |
| `--color-card` | `#111111` | `#F0F0F0` |
| `--color-line` | `#1C1C1C` | `#E5E5E5` |
| `--color-field` | `#666666` | `#8A8A8A` |
| `--color-mu` | `#808080` | `#6B6B6B` |
| `--color-fg` | `#F2F2F2` | `#0A0A0A` |

Declarados em `@theme` (para gerar as utilities `bg-canvas`, `text-mu`, `border-line` — os mesmos nomes de classe do aguiarlabs) **e** em `:root`/`[data-theme="light"]` (para a troca em runtime), espelhando exatamente a estrutura de `aguiarlabs/app/globals.css`.

### Camada de compat

| Token shadcn | Aponta para |
|---|---|
| `--background` | `var(--color-canvas)` |
| `--foreground` | `var(--color-fg)` |
| `--card`, `--popover` | `var(--color-card)` |
| `--card-foreground`, `--popover-foreground` | `var(--color-fg)` |
| `--muted` | `var(--color-surface)` |
| `--muted-foreground` | `var(--color-mu)` |
| `--secondary` | `var(--color-card)` |
| `--accent` | `var(--color-line)` |
| `--secondary-foreground`, `--accent-foreground` | `var(--color-fg)` |
| `--border` | `var(--color-line)` |
| `--ring`, `--sidebar-ring` | `var(--color-fg)` |
| `--input` | `var(--color-field)` |
| `--primary` | `var(--color-fg)` |
| `--primary-foreground` | `var(--color-canvas)` |
| `--sidebar` | `var(--color-surface)` |
| `--sidebar-accent` | `var(--color-card)` |
| `--sidebar-foreground`, `--sidebar-primary` | `var(--color-fg)` |
| `--sidebar-border` | `var(--color-line)` |
| `--destructive` | vermelho dessaturado, nunca renderizado (0 usos fora de `components/ui/`) |

### Duas armadilhas neste mapeamento

O mapeamento ingênuo (`--accent` e `--sidebar-accent` apontando para `surface`, como `--muted`) **quebra os estados de hover**. Os fundos formam uma escada — canvas `#050505` < surface `#0A0A0A` < card `#111111` < line `#1C1C1C` — e um item precisa de hover um degrau acima do fundo em que ele se apoia:

- itens de menu/dropdown se apoiam em `--popover` (= card), então `--accent` precisa ser `line`;
- itens da sidebar se apoiam em `--sidebar` (= surface), então `--sidebar-accent` precisa ser `card`.

Com ambos em `surface`, o hover da sidebar ficaria invisível. A escada se inverte corretamente no tema claro (`#FFFFFF` < `#F7F7F7` < `#F0F0F0` < `#E5E5E5`), então o mesmo mapeamento serve aos dois.

`--ring` **não** pode apontar para `line`: o anel de foco em `#1C1C1C` mede 1.20:1 contra o canvas e reprova no critério WCAG 1.4.11. Ele aponta para `fg`, e o portfólio adota a regra global do aguiarlabs:

```css
*:focus-visible {
  outline: 1px solid var(--color-fg);
  outline-offset: 3px;
}
```

substituindo o `@apply outline-ring/50` que hoje está no `@layer base`.

### O que é deletado

- **`--chart-1` … `--chart-5` são renomeados, não deletados.** A versão original desta spec afirmava "10 declarações, 0 usos em todo o projeto". **Isso era falso.** O levantamento que produziu esse número excluiu o próprio `globals.css`, que é exatamente onde os cinco são consumidos: o bloco de tokens do Prism referencia todos (`var(--chart-3)`, `var(--chart-5)`, `var(--chart-4)`, `var(--chart-2)`, `var(--chart-3)` de novo, `var(--chart-1)`). Deletá-los apaga a cor de sintaxe de todo bloco de código do site — o oposto do que a seção 6 desta spec exige.

  Eles voltam como **`--syntax-1` … `--syntax-5`**, com os valores oklch originais de cada tema, porque nunca foram cores de gráfico — o nome do shadcn era mentira. São a exceção deliberada ao croma zero, consistente com a seção 6: o grayscale vale para a moldura do bloco, não para os tokens da linguagem. Não recebem mapeamento em `@theme inline`: são consumidos só como `var()` cru dentro do `globals.css` e não precisam de utilities do Tailwind.
- `--radius: 0.625rem` vira `--radius: 0`; as escalas derivadas `--radius-sm/md/lg/xl` saem do bloco `@theme inline`.

## 2. Mecanismo de tema

| | Hoje | Depois |
|---|---|---|
| Atributo | `class` (`.dark`) | `data-theme` |
| Padrão | `system` | `dark` |
| `enableSystem` | ligado | desligado |
| `@custom-variant dark` | `&:is(.dark *)` | `&:is([data-theme="dark"] *)` |

A troca de `@custom-variant` é o que mantém os **34 usos de `dark:`** (11 arquivos) válidos sem editá-los um a um.

`components/theme-toggle.tsx` perde a opção **"System"**, que fica morta com `enableSystem={false}`. Como o arquivo já está sendo editado e os rótulos `Light`/`Dark`/`System` estão hardcoded em inglês num site de cinco locales, os dois restantes passam a usar `t(locale, { pt, en, es, jp, fr })`.

## 3. Tipografia e assinatura editorial

- **Display do hero:** `clamp(2.25rem, 5.2vw, 4.5rem)`, `font-medium` (500), `leading-[0.94]`, `tracking-[-0.035em]`. A escala do aguiarlabs (`8.2vw`/`7.75rem`) pressupõe um grid full-bleed de 1400px; na coluna de 1024px do portfólio ela empurra os CTAs para fora da primeira dobra — e o botão de currículo é o ponto da página.
- **Eyebrow mono numerado** abrindo cada seção: filete de 32px (`h-px w-8 bg-line`) + `font-mono text-[11px] uppercase tracking-[0.18em] text-mu`.
- **Numeração editorial** das seções da home: `01`, `02`, `03`…
- **CTA primário invertido:** `bg-fg text-canvas`, quadrado, com `→` que desliza 4px no hover (`group-hover:translate-x-1`).
- **`rise-in` escalonado** no hero, com os delays de 0.08s / 0.18s / 0.32s / 0.46s portados do aguiarlabs, junto com o bloco `@media (prefers-reduced-motion: reduce)`.

### Strings novas exigem 5 locales

Os eyebrows e a numeração introduzem texto de UI novo. Toda string nova usa `t(locale, { pt, en, es, jp, fr })` conforme `CLAUDE.md`. `lib/i18n-coverage.test.ts` falha em objeto de tradução incompleto — um eyebrow só em português quebra o check.

## 4. Purga de cor

> **Emenda de 2026-09-20, após a aprovação.** A contagem original de "85 usos cromáticos" estava incompleta. O levantamento completo encontrou **132 pontos**, incluindo um sistema de cor no nível dos **dados** que não aparece em nenhuma varredura de `.tsx`. As subseções 4.4 e 4.5 são novas; o destino de todas segue a decisão 7 (croma zero absoluto), já aprovada.

| Fonte | Qtd |
|---|---|
| Classes cromáticas (`emerald`, `blue`, `violet`, …) | 85 |
| Famílias neutras do Tailwind (`gray`, `slate`, `zinc`) | 19 |
| `text-white` / `bg-black` / `bg-white` / `text-black` | 13 |
| Hex arbitrários (`text-[#444]`, `border-[#eee]`, `bg-[#f5f6fa]`) | 3 |
| `tagColor` nos 12 posts (dados) | 12 |

As classes se dividem em cinco grupos, com destinos diferentes.

### 4.1 Decorativo — deletado

`components/projects-grid.tsx:12` define `categoryColors`: 15 categorias, 15 matizes (`bg-violet-100 text-violet-800 dark:…` e companhia). São cores sem sistema — ninguém aprende que violeta significa "AI SaaS". **O mapa inteiro sai.** As categorias viram chips mono idênticos aos do aguiarlabs:

```
border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-mu
```

### 4.2 Estado semântico — vira contraste de valor

| Onde | Hoje | Depois |
|---|---|---|
| `components/experience-item.tsx:21` | badge "Atual" em `bg-emerald-100`/`text-emerald-800` | chip mono em `text-fg` com borda `--color-field`, contra `text-mu` dos demais |
| `components/experience-item.tsx:42` | `highlight` em `text-emerald-700` | `text-fg` |
| `app/[locale]/engenharia/page.tsx:185` | badge "escolhido" em `bg-green-100` | **invertido** — `bg-fg text-canvas` |
| `app/[locale]/sobre/page.tsx:97` | ponto da timeline `bg-emerald-500 ring-emerald-500/20` | `bg-fg` contra `bg-line`, como o `StatusStrip` |

Inversão é o gesto mais forte da paleta de 7 tokens — marca "escolhido" com mais clareza do que verde marcava.

### 4.3 Reconhecimento de marca — removido

`app/[locale]/page.tsx:73` (`bg-emerald-700`, CTA de WhatsApp) e `components/app-sidebar.tsx:75` (`hover:text-green-600`) são os dois últimos usos de cor. Viram, respectivamente, o botão secundário padrão e `text-mu → hover:text-fg`.

Decisão consciente: o reconhecimento do canal vem da forma do ícone, não do matiz, e a primeira exceção documentada num design system é como todos começam a vazar. Reintroduzir um token depois é trivial; remover é mais difícil.

### 4.4 `tagColor` — sistema de cor no nível dos dados

`lib/posts.ts:46` declara `tagColor?: string`, preenchido em `lib/posts.ts:94`, e **os 12 posts de `data/posts/` o definem** com valores como `bg-blue-700`, `bg-emerald-700`, `bg-cyan-700` e `bg-purple-700`. Ele é renderizado com `text-white` em três lugares:

- `components/search-content.tsx:116`
- `app/[locale]/page.tsx:169`
- `app/[locale]/posts/[slug]/page.tsx:83`

Mesmo destino do `categoryColors`: o badge vira chip mono (`border border-line`, `font-mono text-[10px] uppercase tracking-[0.16em] text-mu`), o campo sai de `RawPostData` e de `Post` em `lib/posts.ts`, e a chave sai dos 12 JSONs.

Isto **altera arquivos de dados**, o que a seção "Fora do escopo" excluía. A exclusão original se referia a **texto** de post — título, descrição, blocos. Nenhum texto muda; `tagColor` é metadado de apresentação e é a única chave removida.

### 4.5 Neutros, hex arbitrários e a exceção do scrim

As famílias neutras do Tailwind (`text-gray-700`, `bg-zinc-100`, `bg-slate-900`, …) e os três hex arbitrários de `components/app-sidebar.tsx` (`text-[#444]`, `border-[#eee]`, `bg-[#f5f6fa]`) passam por fora dos 7 tokens tanto quanto as cromáticas, e vão junto. O bloco de perfil da sidebar é o mais afetado: hoje ele fixa cor de texto, fundo e borda à mão em vez de usar os tokens.

**Uma exceção sancionada:** `bg-black/50` no `Dialog.Overlay` de `components/projects-grid.tsx:104`. Scrim de modal não é cor de marca — o próprio aguiarlabs usa `bg-black/60` e `backdrop:bg-black/70` no admin. O guard da seção 7 permite `black` e `white` **quando acompanhados de opacidade** (`/50`, `/70`), e proíbe o uso chapado.

## 5. Cantos e filetes

**Regra:** caixas ficam retas; formas intrinsecamente redondas não. O próprio aguiarlabs mantém `rounded-full` no ponto de 6px do `StatusStrip`.

Por isso as **121 ocorrências de `rounded`** (97 fora de `components/ui/`, 24 dentro) são revisadas **uma a uma, não com find-and-replace**: `rounded-full` em foto de perfil, avatares e indicadores permanece.

Arquivos afetados (20): `mobile-header`, `experience-item`, `engineering-topic`, `app-sidebar`, `search-button`, `search-content`, `projects-grid`, `image-gallery`, `language-toggle`, `editor-config-sheet`, `code-block`, e as páginas `not-found`, `page`, `posts/[slug]`, `sobre`, `projetos`, `projetos/x-drop`, `projetos/ikropp`, `projetos/vox-pet-digital`, `engenharia`.

Os 8 componentes de `components/ui/` perdem seus `rounded-*` internos; como `--radius` vira `0`, as classes `rounded-md`/`rounded-lg` que restarem resolvem para 0 de qualquer forma — a limpeza é por clareza do código, não por efeito visual.

Correção junto: o `hsl(var(--sidebar-border))` inválido de `globals.css:143` vira `var(--color-line)`.

## 6. Blog

Os posts não usam MDX nem uma classe `prose` — `app/[locale]/posts/[slug]/page.tsx` renderiza bloco a bloco (`heading`, `paragraph`, `code`, `image`, `list`) com classes Tailwind inline, numa coluna `max-w-3xl`. Não há `.prose-al` para portar; o alinhamento é aplicar os mesmos valores do aguiarlabs a cada tipo de bloco:

- corpo em 17px / `line-height: 1.75`
- `code` inline: `bg-card`, `border border-line`, `0.88em`
- bloco de código: `border border-line`, 13.5px / 1.65, **sem alterar as cores dos tokens do Prism**
- `<hr>` vira `border-top: 1px solid var(--color-line)` com margem `3em 0`
- cabeçalho de tabela em mono 11px uppercase `tracking-[0.18em]` `text-mu`
- imagem perde `rounded-md`, mantém `border border-line`

## 7. Verificação

O CI (`.github/workflows/ci.yml`) roda **lint → typecheck → test → build → AEO**. O passo de teste existe e é onde os guards desta entrega passam a morar — o `CLAUDE.md` descreve o pipeline sem ele e está desatualizado nesse ponto.

Dois guards novos em `lib/design-system.test.ts`, no mesmo padrão de varredura de `lib/i18n-coverage.test.ts` (scan de `app/` e `components/`, pulando `components/ui/`):

1. **Paleta** — falha se aparecer qualquer classe de cor fora dos 7 tokens: famílias cromáticas, famílias neutras do Tailwind, `white`/`black` chapados e hex arbitrários em colchetes. Permite `black`/`white` com opacidade (o scrim de 4.5). Varre também `data/posts/*.json` atrás de `tagColor`, que é onde a varredura de `.tsx` é cega.
2. **Cantos** — falha se aparecer `rounded-sm|md|lg|xl|2xl|3xl`. Permite `rounded-full`, que é a forma correta para pontos, avatares e a foto de perfil.

Sem esses guards a purga é um mutirão que a próxima linha de código desfaz em silêncio.

- `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` — pipeline de CI atual.
- `pnpm aeo` — score deve continuar **≥ 90/100**. A entrega é visual e não toca schema, `robots.ts`, `sitemap.ts` nem `llms.txt`, então nenhum dos 17 sinais deveria se mover; o check confirma.
- `lib/i18n-coverage.test.ts` — falha se algum eyebrow ou rótulo novo não cobrir os 5 locales.
- **Contraste:** os valores vêm prontos do aguiarlabs com AA verificado, mas as combinações novas do portfólio precisam ser conferidas — em especial `text-mu` sobre `--color-card` no tema claro (4.64:1) e os chips mono com borda `--color-field`.
- **Estados de hover e foco**, que é onde o mapeamento de compat pode falhar em silêncio: item da sidebar, item de dropdown, botão secundário e link de navegação, nos dois temas. Um hover que some não quebra nenhum check automatizado.
- **Revisão visual no preview da Vercel**, nos dois temas, nas cinco rotas principais (home, sobre, projetos, engenharia, post) e abaixo de 1024px, onde o shell vira drawer.

## 8. Risco conhecido

A troca de `attribute="class"` para `attribute="data-theme"` muda a chave que o `next-themes` persiste e o atributo que o script de bloqueio aplica antes da hidratação. Visitante que já tenha tema salvo no `localStorage` pode ver um flash na primeira visita após o deploy. É de uma visita só e não justifica código de migração.

---

## Apêndice: correções pós-execução

Esta spec foi escrita antes da implementação e errou em seis pontos. Todos foram descobertos pela execução ou pela revisão de branch completa, e todos já estão corrigidos no código. Ficam registrados aqui porque uma spec que mente é pior que uma spec ausente.

1. **A hairline da sidebar direita** — diagnóstico incompleto que sustentava uma conclusão falsa. Ver a nota na seção *Bug pré-existente*.

2. **`--chart-1..5` não tinham "0 usos"** — o bloco de tokens do Prism no próprio `globals.css` consome os cinco. Ver a nota na seção 1.

3. **"85 usos cromáticos" eram 132 pontos** — faltavam as famílias neutras do Tailwind, `white`/`black` chapados, três hex arbitrários e o campo `tagColor` no nível dos dados. Ver a emenda na seção 4.

4. **A seção 8 erra o mecanismo do risco.** Trocar `attribute="class"` por `attribute="data-theme"` **não** muda a chave persistida — `storageKey` é uma prop separada, com default `"theme"`, independente de `attribute`. O que de fato muda é o atributo escrito no `<html>` e o tratamento de um valor `"system"` já persistido sob `enableSystem={false}`. A conclusão (um flash numa visita) continua válida; a causa declarada não era essa.

5. **A seção 2 superestima os `dark:`.** Ela justifica a troca do `@custom-variant` dizendo que mantém "34 usos de `dark:` em 11 arquivos" válidos. Depois da purga de cor da seção 4, restam **2** usos fora de `components/ui/` (ambos no `theme-toggle.tsx`) mais 10 dentro. A troca continua necessária — para 12 usos, não 34. A maioria daqueles 34 era metade cromática de pares `dark:`, deletada pela própria seção 4.

6. **A seção 6 manda tratar `<hr>` e cabeçalho de tabela, que não existem.** O renderizador de posts trata exatamente cinco tipos de bloco (`heading`, `paragraph`, `code`, `image`, `list`) e o `lib/inline-md.tsx` só parseia link, negrito, itálico e código inline. Não há `<hr>` nem tabela em lugar nenhum do pipeline. A implementação corretamente pulou os dois; a spec é que não deveria tê-los pedido.

### Tensão não resolvida entre objetivo e mecanismo

O **Objetivo** promete que os dois repositórios compartilhem vocabulário "a ponto de um componente poder ser copiado de um para o outro e funcionar". A decisão 4 aprovou uma camada de compat que mantém ~25 nomes de token do shadcn vivos, e a seção 4 mandou purgar apenas classes **cromáticas** — não `text-muted-foreground` → `text-mu`.

O resultado satisfaz o mecanismo e falha o objetivo: restam **~293 usos do vocabulário shadcn** em 21 arquivos fora de `components/ui/`. Todos resolvem para os pixels certos pela camada de compat, mas `text-muted-foreground` não existe no aguiarlabs — colar um componente lá não gera regra nenhuma.

Isto não é erro de implementação: fizeram o que a seção 4 mandou. É uma decisão em aberto. Se a propriedade de copiar-e-colar importa, ela precisa de escopo próprio e de uma regra de guard que proíba os nomes-alias fora de `components/ui/`. Se não importa, o Objetivo deveria parar de prometê-la.
