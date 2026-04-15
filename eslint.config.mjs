import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    files: ["components/ui/**"],
    rules: {
      "react-hooks/purity": "off",
    },
  },
];

export default eslintConfig;
