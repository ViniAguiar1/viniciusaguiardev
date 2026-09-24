// Tudo que decide se o site executa código de outra origem mora aqui,
// sem React, para ser testável em Node.

export const MFE_ORIGINS: readonly string[] = ["https://mfe-angular-inspector.vercel.app"]

export const MFE_TIMEOUT_MS = 8000

const CUSTOM_ELEMENT_TAG = /^[a-z][a-z0-9]*-[a-z0-9-]*$/

export function isAllowedMfeSrc(src: string): boolean {
  let url: URL
  try {
    url = new URL(src)
  } catch {
    return false
  }
  return url.protocol === "https:" && MFE_ORIGINS.includes(url.origin)
}

export function isValidCustomElementTag(tag: string): boolean {
  return CUSTOM_ELEMENT_TAG.test(tag)
}

export function loadRemoteModule(load: () => Promise<unknown>, timeoutMs = MFE_TIMEOUT_MS): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`micro frontend: timeout after ${timeoutMs}ms`)), timeoutMs)
    load().then(
      () => {
        clearTimeout(timer)
        resolve()
      },
      (err: unknown) => {
        clearTimeout(timer)
        reject(err)
      },
    )
  })
}
