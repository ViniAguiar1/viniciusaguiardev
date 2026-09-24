import nextConfig from "eslint-config-next"

// Config comum dos apps e pacotes. react-hooks/purity fica desligado no
// código gerado pelo shadcn (components/ui no app, src/components no @repo/ui).
export function createConfig(extraIgnores = []) {
  return [
    ...nextConfig,
    { ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts", ...extraIgnores] },
    { files: ["components/ui/**", "src/components/**"], rules: { "react-hooks/purity": "off" } },
  ]
}
