import { describe, it, expect, vi, afterEach } from "vitest"
import { isAllowedMfeSrc, isValidCustomElementTag, loadRemoteModule, MFE_TIMEOUT_MS } from "./mfe"

describe("isAllowedMfeSrc", () => {
  it("aceita https na origem permitida", () => {
    expect(isAllowedMfeSrc("https://mfe-angular-inspector.aguiarlabs.com.br/inspector.js")).toBe(true)
  })
  it("recusa outra origem", () => {
    expect(isAllowedMfeSrc("https://evil.example.com/inspector.js")).toBe(false)
  })
  it("recusa subdomínio que só começa igual", () => {
    expect(isAllowedMfeSrc("https://mfe-angular-inspector.aguiarlabs.com.br.evil.com/x.js")).toBe(false)
  })
  it("recusa http", () => {
    expect(isAllowedMfeSrc("http://mfe-angular-inspector.aguiarlabs.com.br/inspector.js")).toBe(false)
  })
  it("recusa lixo", () => {
    expect(isAllowedMfeSrc("not a url")).toBe(false)
    expect(isAllowedMfeSrc("")).toBe(false)
  })
})

describe("isValidCustomElementTag", () => {
  it("aceita nome com hífen", () => {
    expect(isValidCustomElementTag("mfe-inspector")).toBe(true)
  })
  it("recusa sem hífen, maiúscula ou começo inválido", () => {
    expect(isValidCustomElementTag("inspector")).toBe(false)
    expect(isValidCustomElementTag("Mfe-Inspector")).toBe(false)
    expect(isValidCustomElementTag("1-inspector")).toBe(false)
    expect(isValidCustomElementTag("mfe-<script>")).toBe(false)
  })
})

describe("loadRemoteModule", () => {
  afterEach(() => vi.useRealTimers())

  it("resolve quando o load resolve", async () => {
    await expect(loadRemoteModule(() => Promise.resolve())).resolves.toBeUndefined()
  })

  it("rejeita quando o load rejeita", async () => {
    await expect(loadRemoteModule(() => Promise.reject(new Error("404")))).rejects.toThrow("404")
  })

  it("rejeita por timeout quando o load nunca termina", async () => {
    vi.useFakeTimers()
    const pending = loadRemoteModule(() => new Promise(() => {}))
    const assertion = expect(pending).rejects.toThrow(/timeout/)
    await vi.advanceTimersByTimeAsync(MFE_TIMEOUT_MS)
    await assertion
  })
})
