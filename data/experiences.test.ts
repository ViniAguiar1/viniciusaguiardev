import { describe, it, expect } from "vitest"
import { experiences } from "./experiences"
import { LOCALES } from "@/lib/i18n"

describe("experiences data", () => {
  it("has the 5 companies in timeline order", () => {
    expect(experiences.map((e) => e.company)).toEqual([
      "Chattie",
      "Holy Solutions",
      "Stack Labs",
      "MovePro",
      "Easytogo",
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

  it("labels MovePro and Holy Solutions as contract work in every locale", () => {
    const contractWord = { pt: "Contrato", en: "Contract", es: "Contrato", jp: "業務委託", fr: "Contrat" }
    for (const company of ["MovePro", "Holy Solutions"]) {
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
