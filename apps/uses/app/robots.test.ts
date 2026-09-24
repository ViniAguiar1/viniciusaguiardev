import { describe, it, expect } from "vitest"
import robots from "./robots"

describe("robots da zona", () => {
  it("bloqueia tudo no domínio direto da zona", () => {
    expect(robots()).toEqual({ rules: [{ userAgent: "*", disallow: "/" }] })
  })
})
