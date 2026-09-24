import { describe, it, expect } from "vitest"
import { experiences } from "./experiences"
import { LOCALES } from "@repo/i18n"

describe("experiences data", () => {
  // A timeline espelha o LinkedIn: mesmas empresas, mesma ordem. Easytogo
  // aparece duas vezes de proposito — sao dois cargos na mesma empresa, e a
  // progressao de Web/Mobile Developer para Software Engineer e sinal, nao
  // ruido. Stack Labs e MovePro sairam: a primeira nao esta no LinkedIn, e a
  // segunda e cliente da Aguiar Labs, nao empregadora.
  it("has the 6 entries in timeline order, mirroring LinkedIn", () => {
    expect(experiences.map((e) => e.company)).toEqual([
      "Chattie",
      "Holy Solutions",
      "Aguiar Labs",
      "Easytogo",
      "Easytogo",
      "Stealth Startup",
    ])
  })

  // O Vox Pet saiu daqui de proposito: e um SaaS proprio do Vinicius, nao um
  // emprego. Ele vive em data/projects.ts com o papel CTO & Co-Founder, onde
  // funciona como prova de ownership — enquanto um cargo de C-level marcado
  // como atual na timeline de empregos leria como risco de saida para um
  // recrutador de vaga IC, que e o alvo declarado do portfolio.
  it("marks exactly Chattie as current", () => {
    expect(experiences.filter((e) => e.current).map((e) => e.company)).toEqual([
      "Chattie",
    ])
  })

  it("labels Aguiar Labs as contract work in every locale", () => {
    const contractWord = { pt: "Contrato", en: "Contract", es: "Contrato", jp: "業務委託", fr: "Contrat" }
    for (const company of ["Aguiar Labs"]) {
      const exp = experiences.find((e) => e.company === company)!
      for (const locale of LOCALES) {
        expect(exp.period[locale], `${company} ${locale}`).toContain(contractWord[locale])
      }
    }
  })

  it("fills every localized field in every locale", () => {
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
