# Redesign da seção Experiência — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar a seção Experiência de `/sobre` em uma timeline vertical com hierarquia (atual em destaque), chips de stack e métrica visível, com dados extraídos para `data/experiences.ts`.

**Architecture:** Um novo módulo de dados tipado (`data/experiences.ts`) alimenta o componente client `ExperienceItem` (reescrito) renderizado dentro de um `<ol>` com trilho vertical em `app/[locale]/sobre/page.tsx`. Textos localizados usam o helper `t(locale, { pt, en, es, jp })` existente de `@/lib/i18n`.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS 4, Vitest.

**Spec:** `docs/superpowers/specs/2026-07-22-experiencia-sobre-redesign-design.md`

## Global Constraints

- **Sem commits por enquanto:** o usuário pediu para não commitar nada ainda. Os passos de commit abaixo ficam REGISTRADOS mas são PULADOS até o usuário liberar (a árvore já tem o reposicionamento não commitado).
- Node 24 obrigatório: prefixar comandos com `source ~/.nvm/nvm.sh && nvm use 24 >/dev/null &&`.
- 4 idiomas sempre (pt/en/es/jp) — nenhuma string de UI nova sem as 4 versões.
- Nenhum fato novo sobre as experiências: summaries/details migram verbatim; só mudam os campos explicitados neste plano.
- AEO deve permanecer 100/100 ao final.

---

### Task 1: Módulo de dados `data/experiences.ts` (TDD)

**Files:**
- Create: `data/experiences.ts`
- Test: `data/experiences.test.ts`

**Interfaces:**
- Produces: `export type Experience = { company: string; role: Localized; period: Localized; current?: boolean; stack: string[]; summary: Localized; highlight?: Localized; details: Localized[] }` com `export type Localized = { pt: string; en: string; es: string; jp: string }`, e `export const experiences: Experience[]` (6 entradas, ordem: Chattie, Holy Solutions, Vox Pet Digital, Stack Labs, MovePro, Easytogo). Task 2 consome exatamente esses nomes.

- [ ] **Step 1: Escrever o teste que falha** — criar `data/experiences.test.ts`:

```ts
import { describe, it, expect } from "vitest"
import { experiences } from "./experiences"

const LOCALES = ["pt", "en", "es", "jp"] as const

describe("experiences data", () => {
  it("has the 6 companies in timeline order", () => {
    expect(experiences.map((e) => e.company)).toEqual([
      "Chattie",
      "Holy Solutions",
      "Vox Pet Digital",
      "Stack Labs",
      "MovePro",
      "Easytogo",
    ])
  })

  it("marks exactly Chattie and Vox Pet Digital as current", () => {
    expect(experiences.filter((e) => e.current).map((e) => e.company)).toEqual([
      "Chattie",
      "Vox Pet Digital",
    ])
  })

  it("labels MovePro and Holy Solutions as contract work in every locale", () => {
    const contractWord = { pt: "Contrato", en: "Contract", es: "Contrato", jp: "業務委託" }
    for (const company of ["MovePro", "Holy Solutions"]) {
      const exp = experiences.find((e) => e.company === company)!
      for (const locale of LOCALES) {
        expect(exp.period[locale], `${company} ${locale}`).toContain(contractWord[locale])
      }
    }
  })

  it("fills every localized field in all four locales", () => {
    for (const exp of experiences) {
      const fields = [exp.role, exp.period, exp.summary, ...(exp.highlight ? [exp.highlight] : []), ...exp.details]
      for (const field of fields) {
        for (const locale of LOCALES) {
          expect(field[locale]?.trim().length, `${exp.company} ${locale}`).toBeGreaterThan(0)
        }
      }
    }
  })

  it("gives Chattie a highlight metric and every company a stack", () => {
    expect(experiences[0].highlight?.pt).toContain("19 KB")
    for (const exp of experiences) {
      expect(exp.stack.length, exp.company).toBeGreaterThan(0)
    }
  })
})
```

- [ ] **Step 2: Rodar e confirmar a falha**

Run: `source ~/.nvm/nvm.sh && nvm use 24 >/dev/null && pnpm test 2>&1 | tail -15`
Expected: FAIL — `Cannot find module './experiences'` (ou equivalente).

- [ ] **Step 3: Criar `data/experiences.ts`**

Estrutura do arquivo (campos novos escritos por extenso abaixo; `summary` e `details` copiados **verbatim** dos arrays `experiencesPt` / `experiencesEn` / `experiencesEs` / `experiencesJp` em `app/[locale]/sobre/page.tsx` — mesma empresa, mesmo índice em cada array; as 4 versões de cada string viram um objeto `Localized`):

```ts
export type Localized = { pt: string; en: string; es: string; jp: string }

export type Experience = {
  company: string
  role: Localized
  period: Localized
  current?: boolean
  stack: string[]
  summary: Localized
  highlight?: Localized
  details: Localized[]
}

export const experiences: Experience[] = [
  {
    company: "Chattie",
    role: { pt: "Frontend Engineer", en: "Frontend Engineer", es: "Frontend Engineer", jp: "フロントエンドエンジニア" },
    period: {
      pt: "Jul 2026 — atual · Tempo integral · Remoto",
      en: "Jul 2026 — present · Full-time · Remote",
      es: "Jul 2026 — presente · Tiempo completo · Remoto",
      jp: "2026年7月 — 現在 · フルタイム · リモート",
    },
    current: true,
    stack: ["React", "Next.js", "TypeScript", "Anthropic Claude", "Vercel AI SDK"],
    highlight: {
      pt: "Inbox: payload ~6,7 MB → ~19 KB (~400x)",
      en: "Inbox: payload ~6.7 MB → ~19 KB (~400x)",
      es: "Inbox: payload ~6,7 MB → ~19 KB (~400x)",
      jp: "インボックス：ペイロード 約6.7MB → 約19KB（約1/400）",
    },
    summary: { /* verbatim: entrada Chattie dos 4 arrays */ },
    details: [ /* verbatim: 5 bullets da entrada Chattie dos 4 arrays */ ],
  },
  {
    company: "Holy Solutions",
    role: { pt: "Mid-level Software Engineer", en: "Mid-level Software Engineer", es: "Mid-level Software Engineer", jp: "ミドルレベル ソフトウェアエンジニア" },
    period: {
      pt: "Nov 2025 — Jul 2026 · Contrato · Minas Gerais, Brasil · Remoto",
      en: "Nov 2025 — Jul 2026 · Contract · Minas Gerais, Brazil · Remote",
      es: "Nov 2025 — Jul 2026 · Contrato · Minas Gerais, Brasil · Remoto",
      jp: "2025年11月 — 2026年7月 · 業務委託 · ブラジル・ミナスジェライス州 · リモート",
    },
    stack: ["React", "Next.js", "React Native", "AWS", "Asaas"],
    summary: { /* verbatim */ },
    details: [ /* verbatim: 6 bullets */ ],
  },
  {
    company: "Vox Pet Digital",
    role: { pt: "Software Engineer", en: "Software Engineer", es: "Software Engineer", jp: "ソフトウェアエンジニア" },
    period: {
      pt: "Ago 2025 — atual · Meio período · Remoto",
      en: "Aug 2025 — present · Part-time · Remote",
      es: "Ago 2025 — presente · Medio tiempo · Remoto",
      jp: "2025年8月 — 現在 · パートタイム · リモート",
    },
    current: true,
    stack: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "OpenAI"],
    summary: { /* verbatim */ },
    details: [ /* verbatim, EXCETO o bullet "Stack: React, Next.js, Node.js, TypeScript e PostgreSQL" (e equivalentes en/es/jp), que é REMOVIDO por ficar redundante com os chips — restam 6 bullets */ ],
  },
  {
    company: "Stack Labs",
    role: { pt: "Software Engineer", en: "Software Engineer", es: "Software Engineer", jp: "ソフトウェアエンジニア" },
    period: {
      pt: "Abr 2025 — Jan 2026 · Tempo integral · São Paulo, Brasil · Remoto",
      en: "Apr 2025 — Jan 2026 · Full-time · São Paulo, Brazil · Remote",
      es: "Abr 2025 — Ene 2026 · Tiempo completo · São Paulo, Brasil · Remoto",
      jp: "2025年4月 — 2026年1月 · フルタイム · ブラジル・サンパウロ · リモート",
    },
    stack: ["React", "Next.js", "React Native"],
    summary: { /* verbatim */ },
    details: [ /* verbatim: 5 bullets */ ],
  },
  {
    company: "MovePro",
    role: { pt: "Software Engineer", en: "Software Engineer", es: "Software Engineer", jp: "ソフトウェアエンジニア" },
    period: {
      pt: "Mai 2025 — Nov 2025 · Contrato · São Paulo, Brasil · Remoto",
      en: "May 2025 — Nov 2025 · Contract · São Paulo, Brazil · Remote",
      es: "May 2025 — Nov 2025 · Contrato · São Paulo, Brasil · Remoto",
      jp: "2025年5月 — 2025年11月 · 業務委託 · ブラジル・サンパウロ · リモート",
    },
    stack: ["React", "Next.js", "React Native", "Expo", "Stripe", "Firebase"],
    summary: { /* verbatim */ },
    details: [ /* verbatim: 7 bullets */ ],
  },
  {
    company: "Easytogo",
    role: { pt: "Web Developer / Mobile Developer", en: "Web Developer / Mobile Developer", es: "Web Developer / Mobile Developer", jp: "Web開発者 / モバイル開発者" },
    period: {
      pt: "Mai 2024 — Jun 2025 · Híbrido",
      en: "May 2024 — Jun 2025 · Hybrid",
      es: "May 2024 — Jun 2025 · Híbrido",
      jp: "2024年5月 — 2025年6月 · ハイブリッド",
    },
    stack: ["React", "Next.js", "React Native", "Flutter"],
    summary: { /* verbatim */ },
    details: [ /* verbatim: 4 bullets */ ],
  },
]
```

Nota sobre períodos: os valores acima já são os finais — MovePro e Holy têm o regime trocado para Contrato/Contract/業務委託; os demais são cópia exata dos atuais. Os `title` atuais ("Frontend Engineer · Chattie") são divididos em `role` + `company` conforme acima; o campo `title` deixa de existir.

- [ ] **Step 4: Rodar os testes e confirmar que passam**

Run: `source ~/.nvm/nvm.sh && nvm use 24 >/dev/null && pnpm test 2>&1 | tail -10`
Expected: PASS — 22 testes (17 existentes + 5 novos).

- [ ] **Step 5: Commit** *(PULADO — ver Global Constraints)*

```bash
git add data/experiences.ts data/experiences.test.ts
git commit -m "feat(sobre): extrai dados de experiência para data/experiences.ts"
```

---

### Task 2: Componente `ExperienceItem` + timeline na página Sobre

**Files:**
- Modify: `components/experience-item.tsx` (reescrita completa)
- Modify: `app/[locale]/sobre/page.tsx` (remover arrays ~linhas 15–315; substituir a seção Experiência)

**Interfaces:**
- Consumes: `experiences`, `type Experience` de `@/data/experiences` (Task 1); `t`, `type Locale` de `@/lib/i18n`.
- Produces: `ExperienceItem` com props `{ experience: Experience; locale: Locale }`.

Não há infra de teste de componente (Vitest sem jsdom) — o ciclo de verificação desta task é `typecheck` + `build` + conferência visual na Task 3.

- [ ] **Step 1: Reescrever `components/experience-item.tsx`** (conteúdo completo):

```tsx
"use client"

import { useState } from "react"
import { t, type Locale } from "@/lib/i18n"
import type { Experience } from "@/data/experiences"

interface ExperienceItemProps {
  experience: Experience
  locale: Locale
}

export function ExperienceItem({ experience, locale }: ExperienceItemProps) {
  const [open, setOpen] = useState(false)
  const { company, role, period, current, stack, summary, highlight, details } = experience

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span>{t(locale, period)}</span>
        {current ? (
          <span className="rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] font-medium px-2 py-0.5">
            {t(locale, { pt: "Atual", en: "Current", es: "Actual", jp: "現職" })}
          </span>
        ) : null}
      </div>

      <h3 className="text-lg font-medium">
        {t(locale, role)} · {company}
      </h3>

      <div className="flex flex-wrap gap-1.5">
        {stack.map((tech) => (
          <span key={tech} className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-xs">
            {tech}
          </span>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">{t(locale, summary)}</p>

      {highlight ? (
        <p className="text-xs font-mono text-emerald-700 dark:text-emerald-400">{t(locale, highlight)}</p>
      ) : null}

      {open && (
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {details.map((item, index) => (
            <li key={index}>{t(locale, item)}</li>
          ))}
        </ul>
      )}

      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="text-sm text-primary hover:underline"
      >
        {open
          ? t(locale, { pt: "Ler menos", en: "Read less", es: "Leer menos", jp: "閉じる" })
          : t(locale, { pt: "Ler mais", en: "Read more", es: "Leer más", jp: "もっと見る" })}
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Atualizar `app/[locale]/sobre/page.tsx`**

1. Adicionar import: `import { experiences } from "@/data/experiences"`.
2. Deletar integralmente os quatro arrays `experiencesPt`, `experiencesEn`, `experiencesEs`, `experiencesJp`.
3. Na função `SobrePage`, deletar a linha `const experiences = locale === "en" ? experiencesEn : ...`.
4. Substituir a seção Experiência por:

```tsx
      {/* Experience */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">
          {t(locale, { pt: "Experiência", en: "Experience", es: "Experiencia", jp: "実務経験" })}
        </h2>

        <ol className="mt-6 relative border-l border-border pl-6 space-y-10">
          {experiences.map((experience) => (
            <li key={experience.company} className="relative">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -left-[29px] top-1 h-2.5 w-2.5 rounded-full",
                  experience.current ? "bg-emerald-500 ring-4 ring-emerald-500/20" : "bg-border"
                )}
              />
              <ExperienceItem experience={experience} locale={locale} />
            </li>
          ))}
        </ol>
      </section>
```

(O `-left-[29px]` centraliza o ponto de 10px sobre o trilho considerando o `pl-6`; validar visualmente na Task 3 e ajustar ±2px se necessário.)

- [ ] **Step 3: Typecheck + testes + lint**

Run: `source ~/.nvm/nvm.sh && nvm use 24 >/dev/null && pnpm typecheck && pnpm test 2>&1 | tail -5 && pnpm lint 2>&1 | tail -3`
Expected: typecheck sem erros; 22 testes PASS; lint limpo.

- [ ] **Step 4: Commit** *(PULADO — ver Global Constraints)*

```bash
git add components/experience-item.tsx "app/[locale]/sobre/page.tsx"
git commit -m "feat(sobre): timeline vertical na seção Experiência"
```

---

### Task 3: llms.txt + verificação completa

**Files:**
- Modify: `public/llms.txt` (linhas de MovePro e Holy Solutions na seção "Experiência profissional")

**Interfaces:**
- Consumes: página Sobre renderizando a timeline (Task 2).

- [ ] **Step 1: Atualizar `public/llms.txt`** — duas substituições exatas:

De: `- **Holy Solutions** (Nov 2025 — Jul 2026): Mid-level Software Engineer.`
Para: `- **Holy Solutions** (Nov 2025 — Jul 2026, contrato): Mid-level Software Engineer.`

De: `- **MovePro** (Mai 2025 — Nov 2025): Software Engineer.`
Para: `- **MovePro** (Mai 2025 — Nov 2025, contrato): Software Engineer.`

(Manter o restante de cada linha intacto.)

- [ ] **Step 2: Suíte completa**

Run: `source ~/.nvm/nvm.sh && nvm use 24 >/dev/null && pnpm lint && pnpm typecheck && pnpm test 2>&1 | tail -5 && pnpm build 2>&1 | tail -8 && pnpm aeo 2>&1 | tail -3`
Expected: tudo verde; build gera as rotas; `AEO Score: 100/100 — PASS`.

- [ ] **Step 3: Verificação visual/funcional nos 4 idiomas**

Subir o dev server em background e verificar marcadores no HTML:

```bash
source ~/.nvm/nvm.sh && nvm use 24 >/dev/null && pnpm dev &   # aguardar "Ready"
curl -s http://localhost:3000/sobre | grep -o "Atual\|Contrato\|19 KB" | sort | uniq -c
curl -s http://localhost:3000/en/sobre | grep -o "Current\|Contract" | sort | uniq -c
curl -s http://localhost:3000/es/sobre | grep -o "Actual\|Contrato" | sort | uniq -c
curl -s http://localhost:3000/jp/sobre | grep -o "現職\|業務委託" | sort | uniq -c
```

Expected: cada grep retorna ocorrências ≥ 1 ("Atual"/"Current"/"Actual"/"現職" ×2 — Chattie e Vox Pet; "Contrato"/"Contract"/"業務委託" ×2 — Holy e MovePro; "19 KB" ≥ 1). Encerrar o dev server ao final. Checar visualmente o alinhamento do ponto no trilho (ajustar o `-left-[29px]` se desalinhado).

- [ ] **Step 4: Conferir critérios de aceite da spec** — os 7 itens da seção "Critérios de aceite" em `docs/superpowers/specs/2026-07-22-experiencia-sobre-redesign-design.md`.

- [ ] **Step 5: Commit** *(PULADO — ver Global Constraints)*

```bash
git add public/llms.txt
git commit -m "docs(llms): regime de contrato em MovePro e Holy Solutions"
```
