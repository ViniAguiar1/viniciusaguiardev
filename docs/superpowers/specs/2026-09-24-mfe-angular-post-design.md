# Post-experimento: um micro frontend Angular dentro do blog Next.js

**Data:** 2026-09-24
**Status:** Aprovado em conversa — aguardando revisão do spec escrito

## Contexto

O portfólio é um app Next.js 16 (React 19) único, sem monorepo. Posts são JSON de blocos (`data/posts/*.json`) validados por `normalizeBlocks()` (`lib/posts.ts`) e renderizados no servidor por um `switch (block.type)` em `app/[locale]/posts/[slug]/page.tsx`. Cinco idiomas, SEO/AEO com score mínimo 90.

A ideia é escrever um post sobre micro frontends em que **o próprio post é a demonstração**: um app Angular, com repositório e deploy próprios, carregado em tempo de execução dentro da página do Next.js.

## Objetivo

1. Um micro frontend Angular real — repo, build e deploy independentes do portfólio.
2. Um bloco novo de post que compõe esse micro frontend na página, em runtime.
3. Um post, em primeira pessoa e enquadrado como **experimento** (o autor não usou micro frontends em produção), escrito depois do build com números medidos, não estimados.

## Decisões tomadas na conversa

| Decisão | Escolha | Motivo |
|---|---|---|
| O que é "o post ser um micro frontend" | O texto é Next.js; um bloco interativo do post é o micro frontend | Mantém SSR, SEO/AEO, sidebars e os 5 idiomas; a opção de a rota inteira ser Angular (multi-zones) exigiria SSR no Angular e reescrever o i18n |
| Modelo de composição | Web Component (Angular Elements), carregado em runtime | É o padrão de mercado para composição **entre frameworks**; Module Federation brilha entre apps do mesmo framework; divisão por rota recarrega a página |
| Enquadramento | Experimento | Regra editorial: primeira pessoa só com experiência real |
| O que o bloco mostra | Painel que se autoinspeciona | Cada propriedade do contrato vira uma seção do post; uma "mini-feature" não mostraria a fronteira |
| Onde mora o código | `mfe-angular-inspector/` na raiz do portfólio, no `.gitignore`, com git próprio apontando para `github.com/ViniAguiar1/mfe-angular-inspector` | Conveniência local, independência real no GitHub e na Vercel |
| Visibilidade do repo do MFE | Público | O post linka o código para o leitor conferir |
| Branch | Tudo do portfólio numa branch só: `feat/blog-mfe-angular` | Pedido do autor |

## Fora do escopo

- Module Federation / Native Federation e multi-zones — citados no post, não implementados.
- Subdomínio próprio para o MFE. Usa `mfe-angular-inspector.aguiarlabs.com.br`; troca depois se quiser.
- Content Security Policy. O site não tem CSP hoje; **se passar a ter**, o domínio do MFE precisa entrar em `script-src`.
- SSR do Angular. O custom element só existe no cliente.

## 1. Estrutura

### Micro frontend (`mfe-angular-inspector/`, repo próprio)

- Angular estável atual (`@angular/core` 22.2.0 em 2026-09-24), componentes standalone, **zoneless**.
- `@angular/elements`: `createCustomElement` registra `<mfe-inspector>` — com guarda `customElements.get("mfe-inspector")` antes **e depois** do `await createApplication()`. Navegar e voltar não reavalia o módulo (uma avaliação por URL); a guarda protege o caso do mesmo arquivo vindo de duas URLs, em que as duas avaliações passariam pelo primeiro check.
- Build gera **um único ES module**, `inspector.js`, com commit (SHA curto) e horário do build injetados em tempo de build.
- Deploy: projeto próprio na Vercel, `https://mfe-angular-inspector.aguiarlabs.com.br/inspector.js`.
- Headers do deploy:
  - `Access-Control-Allow-Origin: *` — `import()` de outra origem é uma requisição CORS; o arquivo é público.
  - `Timing-Allow-Origin: *` — sem ele, a Resource Timing API zera `transferSize` para recursos de outra origem e o painel não consegue medir o próprio peso.
  - `Cache-Control` curto em `inspector.js` (ex.: `max-age=60, stale-while-revalidate=300`) — um deploy novo do MFE aparece no post **sem redeploy do portfólio**. É a independência que o post defende.

### Portfólio (hospedeiro)

- `.gitignore`: `mfe-angular-inspector/`.
- Exclusões da pasta — mesmo fora do git, as ferramentas varrem o disco e quebrariam localmente:
  - `tsconfig.json` → `exclude`
  - `eslint.config.mjs` → `ignores`
  - `vitest.config.ts` → `exclude`
- Tipo de bloco novo em `lib/posts.ts`:

  ```ts
  type MfeBlock = { type: "mfe"; src: string; tag: string }
  ```

  `normalizeBlocks()` aceita o bloco só se:
  - `src` é string cuja **origem** está na allowlist `MFE_ORIGINS = ["https://mfe-angular-inspector.aguiarlabs.com.br"]`;
  - `tag` casa `/^[a-z][a-z0-9]*-[a-z0-9-]*$/` (nome válido de custom element).

  Caso contrário, o bloco é descartado, como os outros blocos malformados.
- Componente client `components/micro-frontend.tsx`, renderizado pelo `case "mfe"` da página do post.

## 2. Contrato entre hospedeiro e micro frontend

É toda a superfície que um lado conhece do outro.

**Entradas — atributos HTML**

| Atributo | Valores | Origem no hospedeiro |
|---|---|---|
| `locale` | `pt` \| `en` \| `es` \| `jp` \| `fr` | locale da página |
| `theme` | `light` \| `dark` | `resolvedTheme` do `next-themes` |

O MFE observa mudanças nos dois e re-renderiza. Idioma desconhecido cai em `pt`.

**Saída — evento DOM**

- Botão no painel dispara `new CustomEvent("mfe:ping", { detail: { angularVersion, at }, bubbles: true, composed: true })`.
- O hospedeiro escuta no elemento e mostra, **fora** do custom element, uma linha localizada do tipo "evento recebido do micro frontend: Angular 22.2.0 às 14:03:21".

**O que o painel exibe (tudo lido em runtime)**

| Campo | Fonte |
|---|---|
| Framework | `VERSION.full` de `@angular/core` |
| Origem | `new URL(import.meta.url).origin` |
| Build | SHA e horário injetados no build |
| Custo | `performance.getEntriesByName(import.meta.url)` → `transferSize`, `duration` |

Textos do painel nos 5 idiomas, num dicionário interno do MFE.

**Isolamento**

- `ViewEncapsulation.ShadowDom`. O CSS do painel não vaza; o Tailwind do site não entra.
- Cores de cada tema definidas **dentro** do MFE, selecionadas pelo atributo `theme` — nada herdado do CSS global.

## 3. Carregamento, falha e performance

- **Servidor:** o bloco sai como placeholder com **altura reservada** (evita CLS). O texto do post continua 100% SSR.
- **Lazy:** o `import(src)` só dispara quando o bloco se aproxima do viewport (IntersectionObserver, `rootMargin` ~200px).
- **Timeout:** se o import falhar ou passar de **8 s**, o bloco mostra aviso localizado: "o micro frontend não carregou — o resto do post segue funcionando". A falha do remoto não derruba o hospedeiro.
- **Re-montagem:** navegar entre posts e voltar não re-registra o elemento (guarda do item 1) e não re-importa (o browser cacheia o módulo).
- Textos do placeholder, aviso e linha do evento via `t()` com os 5 locales — cobertos por `lib/i18n-coverage.test.ts`.

## 4. O post

Slug provisório `micro-frontend-angular-inside-nextjs`, 5 idiomas, tag "Frontend". Estrutura:

1. **Abertura / hipótese** — "quis testar micro frontends entre frameworks; este post é o teste".
2. **O painel** (bloco `mfe`) — cedo, para a prova vir antes da explicação.
3. **Três modelos de mercado** — divisão por rota, Module Federation, Web Components; por que entre frameworks é Web Component.
4. **O contrato** — atributos, evento, Shadow DOM, cada um apontando para o que o leitor acabou de ver.
5. **O que custou** — tamanho do `inspector.js` e tempo de carregamento **medidos** no deploy real. Se o Angular pesar demais para um painel pequeno, o post diz.
6. **Quando não vale a pena** — um time só, uma página só; para este site é exagero, e o objetivo era entender o custo.
7. **Link para o repo público.**

O texto é escrito **depois** do build e das medições.

Capa via `pnpm blog:cover` (estilo `render3d`), com `coverSubject` definido na escrita.

## 5. Testes e verificação

**MFE (no repo dele)**
- Componente re-renderiza ao mudar `locale` e `theme`.
- Idioma desconhecido cai em `pt`.
- Clique no botão dispara `mfe:ping` com `angularVersion` no `detail`.

**Portfólio**
- `normalizeBlocks()`: bloco `mfe` válido é aceito; `src` fora da allowlist, `src` não-https e `tag` inválida são descartados.
- `lib/i18n-coverage.test.ts` segue verde com os textos novos e o post novo.
- `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm aeo` (≥ 90).

**Verificação real** — build de produção do portfólio servido localmente, apontando para o deploy real do MFE:
1. O painel carrega de `mfe-angular-inspector.aguiarlabs.com.br` (Network: request cross-origin, 200).
2. Trocar o tema na sidebar repinta o painel.
3. Trocar o idioma troca os textos do painel.
4. Clicar no botão faz a linha do evento aparecer no hospedeiro.
5. Com `src` apontando para uma URL quebrada, o aviso aparece e o resto do post funciona.
6. Um deploy novo do MFE (mudança visível) aparece no post sem rebuild do portfólio.

## Ações externas (pedem confirmação na hora)

- Push para `github.com/ViniAguiar1/mfe-angular-inspector` e troca da visibilidade para público.
- Criação do projeto na Vercel para o MFE.
- PR do portfólio.
