# Francês como quinto idioma (fr-FR)

**Data:** 2026-08-02
**Status:** Aprovado — aguardando plano de implementação

## Contexto

O portfólio suporta hoje **quatro** idiomas: `pt`, `en`, `es`, `jp` (`lib/i18n.ts:1`). O japonês entrou em maio/2026 pela série de commits `37a3831`…`3310107`. `README.md` e `CLAUDE.md` ainda descrevem o site como trilíngue — estão desatualizados.

A adição do japonês deixou duas lições registradas no histórico:

1. **Dois bugs de roteamento**, ambos causados por listas de locale hardcoded: `stripLocale()` com regex `(pt|en|es)` (`0c415ab`) e `SearchButton` navegando para `/busca` sem prefixo (`0875bd5`). Os dois já foram corrigidos de forma genérica — a regex agora deriva de `LOCALES` (`lib/i18n.ts:17`) e o botão deriva o locale do pathname. **Não se repetem para o francês.**

2. **Quatro commits de conteúdo esquecido**: páginas de detalhe dos projetos (`89d919f`), FAQ/experiências/labels (`c30f139`), página Ferramentas (`3310107`), além de posts/OG/llms.txt (`6c8bf72`). Nenhum foi detectado por `lint`, `typecheck` ou `build`.

A causa raiz do item 2 é o design do helper de tradução: `t()` e `LocalizedString` usam `Partial<Record<Locale, string>> & { pt: string }` (`lib/i18n.ts:42`). Adicionar um locale a `LOCALES` **não gera nenhum erro de compilação** — todo texto não traduzido cai silenciosamente em português. Um `/fr` pela metade passa em todos os checks e sobe em produção.

## Objetivo

Adicionar `fr` (fr-FR) com **paridade total** com os outros quatro idiomas — UI, páginas, projetos, experiências e os 11 posts — e introduzir um guard automatizado que torne impossível shipar um locale incompleto.

O guard é escrito **por locale, não para o francês**: passa a proteger `jp` e `es` retroativamente, e o sexto idioma o herda de graça.

## Fora do escopo

- **Cadeia de fallback.** `t()` continua caindo em `pt`. Com o guard em vigor, o fallback nunca dispara para conteúdo do site; mudar a semântica afetaria os cinco locales sem benefício.
- **`scripts/aeo-check.ts`.** O sinal 156 checa `blocks_en` e segue válido. Score mínimo 90/100 permanece.
- **Mapped type em `RawPostData`.** Gerar os campos `_${locale}` por template literal type eliminaria ~7 linhas manuais por idioma, mas exigiria estreitar `DEFAULT_LOCALE` de `Locale` para `"pt"`. Ganho pequeno, risco desnecessário nesta entrega. A lista explícita fica.
- Detecção automática por `Accept-Language`.
- Versão francesa do PDF do currículo (`public/Curriculo-Vinicius-Aguiar.pdf`).

## 1. Estrutura

Adicionar `"fr"` a `LOCALES` é uma linha. O trabalho estrutural real é fechar os lugares que repetem a lista de locales à mão — cada um é um ponto onde o quinto idioma pode ser esquecido em silêncio.

| Arquivo | Hoje | Depois |
|---|---|---|
| `lib/i18n.ts:1` | `LOCALES = ["pt","en","es","jp"]` | `+ "fr"` |
| `lib/i18n.ts:28` | `localeToHtmlLang` — cadeia de `if` com fallback mudo para `pt-BR` | `Record<Locale, string>` exaustivo |
| `proxy.ts:3-5` | `LOCALES` e `DEFAULT_LOCALE` duplicados à mão | `import { LOCALES, DEFAULT_LOCALE, isLocale } from "@/lib/i18n"` |
| `app/[locale]/layout.tsx:53,67` | ternário `en?…:es?…:jp?…` repetido 2× | `localeToOgLocale()` novo em `lib/i18n.ts` |
| `lib/posts.ts:229` | ternário `"_en":"_es":"_jp":null` | `locale === DEFAULT_LOCALE ? null : \`_${locale}\`` |
| `lib/posts.ts:200-223` | `RawPostData` | + 6 campos `_fr` |
| `components/language-toggle.tsx:13-14` | `flags` / `labels` | + `fr: "🇫🇷"` / `fr: "Français"` |
| `lib/i18n-server.ts:213` | `getDictionary` | + `const fr: Dictionary` e branch |
| `data/experiences.ts:1` | `Localized = { pt, en, es, jp }` | + `fr: string` |

### Import no proxy

Verificado como seguro: `lib/i18n.ts` não tem nenhum import próprio (apenas constantes e funções puras) e o alias `@/*` resolve da raiz (`tsconfig.json`). Nada no módulo depende de APIs de Node.

### Mapas exaustivos

Duas cadeias de ternário que hoje falham em silêncio viram `Record<Locale, string>`, que o `tsc` obriga a cobrir todos os locales:

```ts
const HTML_LANGS: Record<Locale, string> = {
  pt: "pt-BR", en: "en-US", es: "es-ES", jp: "ja-JP", fr: "fr-FR",
}
export function localeToHtmlLang(locale: Locale): string {
  return HTML_LANGS[locale]
}

const OG_LOCALES: Record<Locale, string> = {
  pt: "pt_BR", en: "en_US", es: "es_ES", jp: "ja_JP", fr: "fr_FR",
}
export function localeToOgLocale(locale: Locale): string {
  return OG_LOCALES[locale]
}
```

`localeToHtmlLang` entrou aqui porque hoje retorna `"pt-BR"` para qualquer locale desconhecido — com `fr` adicionado e essa função intocada, o `<html lang>` e todos os `hreflang` do francês sairiam anunciando português.

### Já automático

`app/sitemap.ts`, `buildAlternates()` e `generateStaticParams()` derivam de `LOCALES`. Não precisam de edição — depois desta seção, `LOCALES` é a única fonte de verdade.

## 2. Guard de cobertura

Arquivo novo: `lib/i18n-coverage.test.ts` (Vitest já é o runner do projeto — `data/experiences.test.ts`, `lib/posts.test.ts`).

### Teste 1 — objetos de tradução

Uma única regra:

> Todo *object literal* que tem uma propriedade de chave `pt` precisa ter uma propriedade para cada locale de `LOCALES`.

A chave é reconhecida tanto na forma identificador (`pt:`) quanto string literal (`"pt":`). Object literals sem chave `pt` são ignorados — a regra não tenta adivinhar o que é ou não tradução.

Cobre sem caso especial as quatro formas que o projeto usa:

- chamadas `t(locale, { pt, en, es, jp })` — 169 ocorrências em `app/` e `components/`
- `LocalizedString` em `data/projects.ts`
- `Localized` em `data/experiences.ts`
- objetos inline de `app/[locale]/uses/page.tsx:28`

**Implementação via AST** (`ts.createSourceFile`), não regex. O `typescript` já é dependência do projeto, e as strings traduzidas contêm chaves e aspas que quebrariam um matcher textual.

- Escopo varrido: `app/**/*.{ts,tsx}`, `components/**/*.tsx`, `data/projects.ts`, `data/experiences.ts`
- Excluído: `components/ui/**` (código gerado do Shadcn), arquivos `*.test.ts`
- Falha reportando `arquivo:linha` + locales faltando, um por linha

### Teste 2 — dicionário

`getDictionary()` (`lib/i18n-server.ts:213`) usa `const` separados por idioma, não um object literal com chave `pt` — o Teste 1 não o alcança, e um `fr` ausente retornaria o dicionário `pt` calado.

Asserção: para todo `l` em `LOCALES` com `l !== DEFAULT_LOCALE`, `getDictionary(l) !== getDictionary(DEFAULT_LOCALE)`.

### Teste 3 — posts

Régua confirmada no estado atual: **6 campos por locale, em 11/11 posts**, para os três idiomas não-default. O francês bate a mesma régua.

Para cada `data/posts/*.json` e cada locale não-default, exigir presentes e não vazios:

`title_${l}`, `description_${l}`, `date_${l}`, `readTime_${l}`, `tag_${l}`, `blocks_${l}`

Falha listando arquivo + campos faltando.

## 3. Conteúdo

Tradução a partir do PT (fonte canônica), consultando o EN para consistência de terminologia técnica.

| Alvo | Volume |
|---|---|
| `t(locale, {...})` em `app/` e `components/` | 169 chamadas / ~262 chaves |
| `data/experiences.ts` | 53 campos |
| `data/projects.ts` | 7 projetos × 2 campos |
| `lib/i18n-server.ts` | 1 `Dictionary` completo |
| `data/posts/*.json` | 11 posts × 6 campos (~130 KB de prosa) |
| `public/llms.txt` | "quatro idiomas (PT-BR / EN / ES / JA)" → cinco, + FR |
| `README.md` | diz "Quadrilingual" e "cookie-based" (o roteamento é por path desde `009e0f5`) |
| `CLAUDE.md` | diz "trilingual support (PT-BR / EN / ES)" |
| `data/experiences.test.ts` | monta um `Localized`; quebra no `tsc` quando o tipo ganha `fr` |

Distribuição das chaves inline, para dimensionar: `engenharia/page.tsx` (73), `uses/page.tsx` (48), `sobre/page.tsx` (25), `busca/page.tsx` (9), `page.tsx` (8), `projetos/page.tsx` (5), `not-found.tsx` (5), `footer.tsx` (4), `layout.tsx` (3), as três páginas de projeto (3 cada), `experience-item.tsx` (3).

### Convenções de tradução

1. **Termos técnicos permanecem em inglês** — React, Next.js, cursor-based, multi-tenant, Row Level Security, dead letter queue. É a convenção que as versões ES e JP já seguem.
2. **Números e métricas preservados exatamente.** Separador decimal vírgula (`6,7`), padrão francês e coincidente com o PT. Unidades ficam `MB`/`KB`, não `Mo`/`Ko` — mantém paridade com os outros quatro idiomas e com o que aparece em código, logs e screenshots.
3. **Tradução é tradução.** Nenhuma afirmação, métrica, empresa ou data nova entra pela versão francesa. Blocos `code` dentro dos posts não são traduzidos — apenas texto ao redor.
4. **Variante fr-FR.** Vocabulário padrão europeu (`e-mail`, não `courriel`).

### Metadados dos posts

Os três campos curtos seguem o padrão já estabelecido pelos outros locales:

| Campo | `pt` | `en` | `fr` |
|---|---|---|---|
| `date` | `16 de abril de 2026` | `Apr 16, 2026` | `16 avril 2026` |
| `readTime` | `12 min de leitura` | `12 min read` | `12 min de lecture` |
| `tag` | `TypeScript` | `TypeScript` | `TypeScript` (inalterado — termo técnico) |

Data em francês: sem preposição, mês em minúscula, sem vírgula. `tag_fr` existe como campo mesmo repetindo o valor — o Teste 3 exige presença, e é o que os outros três locales já fazem.

## 4. Sequência

Branch `feat/i18n-french` (criada a partir da `main` atualizada, que já contém o PR #49). Commits fatiados, **um PR único**:

| # | Commit | Estado do guard |
|---|---|---|
| 1 | estrutural (seção 1) + os três testes | 🔴 vermelho — lista o que falta |
| 2 | strings `t()` das páginas | 🔴 |
| 3 | componentes (`footer`, `experience-item`) | 🔴 |
| 4 | `data/projects.ts` + `data/experiences.ts` + `Dictionary` | 🔴 |
| 5-7 | posts JSON (~4 posts por commit) | 🔴 |
| 8 | `llms.txt` + `README.md` + `CLAUDE.md` | 🟢 verde |

O teste vermelho a partir do commit 1 é **intencional e é o mecanismo de controle**: ele imprime `arquivo:linha` do que ainda falta e serve de medidor de progresso. Como o PR só abre no commit 8, o CI roda uma vez e a Vercel nunca gera preview de um francês pela metade.

## 5. Verificação

Portão antes de abrir o PR, nesta ordem:

```
nvm use 24
pnpm lint && pnpm typecheck && pnpm test && pnpm build && pnpm aeo
```

`pnpm aeo` deve permanecer ≥ 90/100.

Conferência manual em `/fr`, `/fr/sobre`, `/fr/projetos`, `/fr/engenharia`, `/fr/uses`, `/fr/busca` e um post — procurando texto em português que tenha escapado por um caminho que o guard não cobre.

## Critérios de aceite

1. `/fr` e todas as rotas sob ele respondem 200, sem redirect para `/pt`.
2. `<html lang="fr-FR">` e `og:locale=fr_FR` nas páginas francesas.
3. O toggle de idioma lista 🇫🇷 Français e a troca preserva a rota atual (`/jp/sobre` → `/fr/sobre`, sem prefixo duplicado).
4. `sitemap.xml` inclui as 19 rotas × 5 locales, com `hreflang` para `fr-FR` em todas as entradas.
5. `pnpm test` verde — nenhum object literal com `pt` sem `fr`, nenhum post sem os 6 campos `_fr`, `getDictionary("fr")` distinto do dicionário PT.
6. `proxy.ts` não contém mais lista de locales própria; `LOCALES` é a única fonte de verdade.
7. Nenhum texto em português nas páginas francesas na conferência manual.
8. `README.md` e `CLAUDE.md` descrevem os cinco idiomas e o roteamento por path.
9. Todos os checks verdes; AEO ≥ 90/100.
