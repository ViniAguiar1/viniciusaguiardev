# Redesign da seção Experiência (página Sobre)

**Data:** 2026-07-22
**Status:** Aguardando revisão

## Contexto

A seção Experiência de `app/[locale]/sobre/page.tsx` lista 6 empresas como itens visualmente idênticos, com os bullets escondidos atrás de "Ler mais". Problemas identificados:

1. A experiência atual (Chattie) tem o mesmo peso visual da mais antiga; a métrica do inbox (~6,7 MB → ~19 KB) fica invisível sem clique.
2. Três posições rotuladas "Tempo integral" se sobrepõem (Stack Labs, MovePro, Holy Solutions), o que fragiliza a credibilidade. Decisão do usuário: eram trabalhos independentes; **MovePro e Holy passam a "Contrato"**, Stack Labs permanece "Tempo integral".
3. Os dados (~360 linhas, 4 arrays × 6 empresas) vivem inline no arquivo da página.

## Objetivo

Timeline vertical com hierarquia clara (atual em destaque), chips de stack, prova principal visível sem clique, e dados extraídos para `data/experiences.ts`. Nenhum fato novo é inventado — só reorganização e os ajustes de rótulo decididos pelo usuário.

## Fora do escopo

- Logos de empresas (não há assets para Chattie, Holy, Stack Labs, Easytogo).
- Mudanças em outras seções da página Sobre.
- Commits/PR (usuário pediu para não commitar por enquanto).

## 1. Modelo de dados — `data/experiences.ts` (novo)

```ts
import type { Locale } from "@/lib/i18n"

// Mesmo shape que t(locale, {...}) aceita — os campos são passados direto ao helper
type Localized = { pt: string; en: string; es: string; jp: string }

export type Experience = {
  company: string        // ex.: "Chattie" — não localizado
  role: Localized        // ex.: "Frontend Engineer" (jp traduzido)
  period: Localized      // "datas · regime · local", já formatado por idioma
  current?: boolean      // true → badge "Atual" + ponto em destaque na timeline
  stack: string[]        // chips; termos técnicos, iguais nos 4 idiomas
  summary: Localized     // sempre visível
  highlight?: Localized  // linha de métrica em destaque (só Chattie)
  details: Localized[]   // bullets, colapsados atrás de "Ler mais"
}

export const experiences: Experience[] = [ /* 6 entradas, ordem atual */ ]
```

### Conteúdo por empresa (migração)

Summaries e details migram **como estão hoje** (acabaram de ser atualizados no reposicionamento); o título atual "Role · Empresa" é separado em `role` + `company`. Mudanças pontuais:

| Empresa | `current` | Regime (novo) | Stack chips |
|---|---|---|---|
| Chattie | `true` | Tempo integral (inalterado) | React, Next.js, TypeScript, Anthropic Claude, Vercel AI SDK |
| Holy Solutions | — | **Contrato** (era Tempo integral) | React, Next.js, React Native, AWS, Asaas |
| Vox Pet Digital | `true` | Meio período (inalterado) | React, Next.js, Node.js, TypeScript, PostgreSQL, OpenAI |
| Stack Labs | — | Tempo integral (inalterado) | React, Next.js, React Native |
| MovePro | — | **Contrato** (era Tempo integral) | React, Next.js, React Native, Expo, Stripe, Firebase |
| Easytogo | — | Híbrido (inalterado) | React, Next.js, React Native, Flutter |

Os chips derivam dos bullets/summaries existentes — nada novo. Bullets do tipo "Stack: React, Next.js…" são removidos dos `details` onde ficarem redundantes com os chips (caso Vox Pet).

### Strings de regime ×4 idiomas

- Contrato: pt/es "Contrato" · en "Contract" · jp "業務委託"
- Períodos afetados (formato completo):
  - MovePro: "Mai 2025 — Nov 2025 · Contrato · São Paulo, Brasil · Remoto" (en: "May 2025 — Nov 2025 · Contract · São Paulo, Brazil · Remote"; es: "May 2025 — Nov 2025 · Contrato · São Paulo, Brasil · Remoto"; jp: "2025年5月 — 2025年11月 · 業務委託 · ブラジル・サンパウロ · リモート")
  - Holy: "Nov 2025 — Jul 2026 · Contrato · Minas Gerais, Brasil · Remoto" (en/es/jp análogos, jp: "2025年11月 — 2026年7月 · 業務委託 · ブラジル・ミナスジェライス州 · リモート")

### Highlight da Chattie

- pt: "Inbox: payload ~6,7 MB → ~19 KB (~400x)"
- en: "Inbox: payload ~6.7 MB → ~19 KB (~400x)"
- es: "Inbox: payload ~6,7 MB → ~19 KB (~400x)"
- jp: "インボックス：ペイロード 約6.7MB → 約19KB（約1/400）"

## 2. Componente — `components/experience-item.tsx` (reescrito)

Continua `"use client"` (estado do toggle). Novas props: `{ experience: Experience; locale: Locale }`. Renderiza o conteúdo de um item da timeline:

1. Linha de período (`text-xs text-muted-foreground`) + badge "Atual" quando `current` (pill pequena: `rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] font-medium px-2 py-0.5` — mesmo padrão do badge "Escolhido" da página de engenharia).
2. Título `text-lg font-medium`: `{role} · {company}`.
3. Chips de stack no padrão do site: `rounded-md border border-border bg-muted/40 px-2 py-0.5 text-xs`.
4. Summary (`text-sm text-muted-foreground`).
5. Se `highlight`: linha `text-xs font-mono text-emerald-700 dark:text-emerald-400`.
6. Botão "Ler mais"/"Ler menos" (mantém rótulos ×4 idiomas atuais) com `aria-expanded`; bullets em `<ul>` como hoje.

Textos localizados resolvidos com o helper `t(locale, campo)` existente — os campos `Localized` têm exatamente o shape que `t()` aceita.

Rótulo "Atual" ×4: pt "Atual" · en "Current" · es "Actual" · jp "現職".

## 3. Timeline — `app/[locale]/sobre/page.tsx`

A seção Experiência troca o `div.space-y-8` por uma lista semântica:

```tsx
<ol className="mt-4 relative border-l border-border pl-6 space-y-10">
  {experiences.map((exp) => (
    <li key={exp.company} className="relative">
      {/* ponto no trilho */}
      <span className={cn(
        "absolute -left-[31px] top-1 h-2.5 w-2.5 rounded-full",
        exp.current
          ? "bg-emerald-500 ring-4 ring-emerald-500/20"
          : "bg-border"
      )} />
      <ExperienceItem experience={exp} locale={locale} />
    </li>
  ))}
</ol>
```

(Offset exato do ponto ajustado na implementação para alinhar com o trilho.) Os 4 arrays `experiencesPt/En/Es/Jp` e a lógica de seleção por locale são removidos da página.

## 4. llms.txt

Nas linhas de experiência, MovePro e Holy ganham o sufixo de regime: "… (contrato)". Demais linhas inalteradas.

## 5. Verificação

- `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm aeo` (deve permanecer 100/100 — a seção não participa dos sinais do AEO).
- Conferência visual nos 4 locales (`/sobre`, `/en/sobre`, `/es/sobre`, `/jp/sobre` conforme roteamento vigente).

## Critérios de aceite

1. `/sobre` renderiza a timeline nos 4 idiomas, na ordem atual das empresas.
2. Chattie: primeira, ponto esmeralda com anel, badge "Atual", chips e a linha de highlight da métrica visíveis sem clique.
3. Vox Pet também exibe badge "Atual" (ponto em destaque).
4. MovePro e Holy exibem "Contrato" (e traduções) no período.
5. "Ler mais" continua colapsando/expandindo bullets, com `aria-expanded` correto.
6. `sobre/page.tsx` não contém mais os arrays de dados de experiência.
7. Todos os checks verdes; AEO 100/100.
