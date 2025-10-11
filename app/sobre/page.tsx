import { cn } from "@/lib/utils"
import { getDictionary, getLocale } from "@/lib/i18n-server"

export const metadata = {
  title: "Sobre | About | Blog",
  description: "Sobre mim / About me",
}

export default async function SobrePage() {
  const locale = await getLocale()
  const dict = getDictionary(locale)
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{dict.about.title}</h1>
        <p className="text-muted-foreground mt-2">{dict.about.subtitle}</p>
      </header>

      <section className={cn("rounded-lg border border-border bg-card text-card-foreground p-6 md:p-8")}> 
        <div className="flex flex-col gap-6 md:gap-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">Vinicius Aguiar</h2>
            {locale === "en" ? (
              <>
                <p className="mt-4 leading-relaxed">
                  I am a Full Stack Developer with 2 years of experience, working with JavaScript (React, React Native), Node.js, TypeScript, Go, and Java. I love building scalable, high‑performance solutions for web and mobile, always following best practices and Agile methodologies.
                </p>
                <p className="mt-3 leading-relaxed text-sm text-muted-foreground">
                  Experience with Scrum and Kanban in cross‑functional teams, focused on continuous improvement and learning.
                </p>
              </>
            ) : (
              <>
                <p className="mt-4 leading-relaxed">
                  Sou desenvolvedor Full Stack com 2 anos de experiência, atuando com JavaScript (React, React Native), Node.js, TypeScript, Go e Java. Tenho paixão por construir soluções escaláveis e de alta performance para web e mobile, sempre seguindo boas práticas e metodologias ágeis.
                </p>
                <p className="mt-3 leading-relaxed text-sm text-muted-foreground">
                  Experiência com Scrum e Kanban em times multidisciplinares, com foco em melhoria contínua e aprendizado.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-xl font-semibold mb-3">{locale === "en" ? "Skills" : "Habilidades"}</h3>
          {locale === "en" ? (
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>React, Next.js, TypeScript</li>
              <li>React Native, Flutter, Swift (iOS)</li>
              <li>CSS, Tailwind, Design System</li>
              <li>API integration, best practices and testing</li>
            </ul>
          ) : (
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>React, Next.js, TypeScript</li>
              <li>React Native, Flutter, Swift (iOS)</li>
              <li>CSS, Tailwind, Design System</li>
              <li>Integração com APIs, boas práticas e testes</li>
            </ul>
          )}
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-xl font-semibold mb-3">{locale === "en" ? "Interests" : "Interesses"}</h3>
          {locale === "en" ? (
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>User Experience and accessibility</li>
              <li>Web performance and observability</li>
              <li>AI applied to digital products</li>
            </ul>
          ) : (
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Experiência do Usuário e acessibilidade</li>
              <li>Performance web e observabilidade</li>
              <li>IA aplicada a produtos digitais</li>
            </ul>
          )}
        </div>
      </section>

      {/* Experiência / Experience */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">{locale === "en" ? "Experience" : "Experiência"}</h2>
        <div className="mt-4 space-y-8">
          {locale === "en" ? (
            <>
              <div>
                <div className="text-xs text-muted-foreground">May 2025 — present · 6 months · São Paulo, Brazil · Remote</div>
                <h3 className="text-lg font-medium">Mid-level Software Engineer · MovePro</h3>
                <p className="mt-2 text-sm">Building web and mobile apps for health and fitness, connecting professionals and students in a unified ecosystem.</p>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
                  <li>Front-end: React.js and Next.js (App Router, Tailwind, ShadCN)</li>
                  <li>Back-end: Node.js with Firebase (Auth, Firestore, Storage, Functions)</li>
                  <li>Mobile: React Native (Expo + EAS, MovePro Performance), Flutter and Swift (iOS)</li>
                  <li>Infra: Deploys via Render (web) and Expo EAS (mobile)</li>
                </ul>
                <h4 className="mt-3 font-medium">Key contributions</h4>
                <ul className="mt-1 list-disc pl-5 space-y-1 text-sm">
                  <li>Design System implementation ensuring consistent UI/UX</li>
                  <li>API integrations (Stripe, FatSecret, Google, Resend)</li>
                  <li>Query optimization and caching for food searches</li>
                  <li>Continuous deployments and monitoring with Firebase Crashlytics and logs</li>
                  <li>Participation across the entire product lifecycle</li>
                  <li>Focus on performance, scalability and user experience</li>
                </ul>
              </div>

              <div>
                <div className="text-xs text-muted-foreground">Apr 2025 — present · 7 months · São Paulo, Brazil · Remote</div>
                <h3 className="text-lg font-medium">Mid-level Software Engineer · Stack Labs</h3>
                <p className="mt-2 text-sm">Working with Node.js, Flutter and a modern stack across different projects.</p>
              </div>

              <div>
                <div className="text-xs text-muted-foreground">May 2024 — Jun 2025 · Hybrid</div>
                <h3 className="text-lg font-medium">Easytogo · Full-time</h3>
                <p className="mt-2 text-sm">Web development focused on agile delivery and collaboration with business areas.</p>
              </div>

              <div>
                <div className="text-xs text-muted-foreground">—</div>
                <h3 className="text-lg font-medium">Personal projects and freelance</h3>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
                  <li>Applied AI exploration (RAG, embeddings, LangChain) through hands-on studies.</li>
                  <li>Institutional websites and dashboards with UX focus.</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div>
                <div className="text-xs text-muted-foreground">mai de 2025 — o momento · 6 meses · São Paulo, Brasil · Remota</div>
                <h3 className="text-lg font-medium">Mid-level Software Engineer · MovePro</h3>
                <p className="mt-2 text-sm">Atuo no desenvolvimento de aplicações web e mobile para o setor de saúde e fitness, criando soluções que conectam profissionais e alunos em um único ecossistema.</p>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
                  <li>Front-end: React.js e Next.js (App Router, Tailwind, ShadCN)</li>
                  <li>Back-end: Node.js com Firebase (Auth, Firestore, Storage, Functions)</li>
                  <li>Mobile: React Native (Expo + EAS, MovePro Performance), Flutter e Swift (iOS)</li>
                  <li>Infra: Deploys via Render (web) e Expo EAS (mobile)</li>
                </ul>
                <h4 className="mt-3 font-medium">Principais contribuições</h4>
                <ul className="mt-1 list-disc pl-5 space-y-1 text-sm">
                  <li>Implementação de Design System garantindo consistência de UI/UX</li>
                  <li>Integrações com APIs (Stripe, FatSecret, Google, Resend)</li>
                  <li>Otimização de queries e cache para pesquisas de alimentos</li>
                  <li>Deploys contínuos e monitoramento com Firebase Crashlytics e logs</li>
                  <li>Atuação ao longo de todo o ciclo de vida do produto</li>
                  <li>Foco em performance, escalabilidade e experiência do usuário</li>
                </ul>
              </div>

              <div>
                <div className="text-xs text-muted-foreground">abr de 2025 — o momento · 7 meses · São Paulo, Brasil · Remota</div>
                <h3 className="text-lg font-medium">Mid-level Software Engineer · Stack Labs</h3>
                <p className="mt-2 text-sm">Atuação com Node.js, Flutter e stack moderna em projetos diversos.</p>
              </div>

              <div>
                <div className="text-xs text-muted-foreground">mai de 2024 — jun de 2025 · Híbrida</div>
                <h3 className="text-lg font-medium">Easytogo · Tempo integral</h3>
                <p className="mt-2 text-sm">Atuação em desenvolvimento web com foco em entrega ágil e colaboração com áreas de negócio.</p>
              </div>

              <div>
                <div className="text-xs text-muted-foreground">—</div>
                <h3 className="text-lg font-medium">Projetos pessoais e freelas</h3>
                <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
                  <li>Exploração de IA aplicada (RAG, embeddings, LangChain) em estudos práticos.</li>
                  <li>Sites institucionais e dashboards com foco em UX.</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Competências-chave / Key skills */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">{locale === "en" ? "Key Skills and Competencies" : "Competências‑chave"}</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-medium">{locale === "en" ? "Languages and Frameworks" : "Linguagens e Frameworks"}</h3>
            {locale === "en" ? (
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>JavaScript (React, React Native), TypeScript, Go, Java</li>
                <li>Next.js, Express</li>
              </ul>
            ) : (
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>JavaScript (React, React Native), TypeScript, Go, Java</li>
                <li>Next.js, Express</li>
              </ul>
            )}
          </div>
          <div>
            <h3 className="font-medium">{locale === "en" ? "Tools and Technologies" : "Ferramentas e Tecnologias"}</h3>
            {locale === "en" ? (
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Git, Docker, SASS, Webpack</li>
              </ul>
            ) : (
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Git, Docker, SASS, Webpack</li>
              </ul>
            )}
          </div>
          <div>
            <h3 className="font-medium">{locale === "en" ? "Agile Methodologies" : "Metodologias Ágeis"}</h3>
            {locale === "en" ? (
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Scrum, Kanban, Agile Software Development</li>
              </ul>
            ) : (
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Scrum, Kanban, Agile Software Development</li>
              </ul>
            )}
          </div>
          <div>
            <h3 className="font-medium">{locale === "en" ? "Best Practices" : "Boas Práticas"}</h3>
            {locale === "en" ? (
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Automated testing (Unit, Integration, E2E)</li>
                <li>CI/CD, Software Architecture, UX</li>
              </ul>
            ) : (
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Testes automatizados (Unit, Integration, E2E)</li>
                <li>CI/CD, Arquitetura de Software, UX</li>
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* O que ofereço / What I offer */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">{locale === "en" ? "What I offer" : "O que ofereço"}</h2>
        {locale === "en" ? (
          <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
            <li>Development of high‑quality, high‑performance web and mobile applications.</li>
            <li>Scalable solutions focused on efficiency and resource optimization.</li>
            <li>Active collaboration in agile teams to deliver innovative solutions.</li>
            <li>Commitment to continuous improvement applying best practices daily.</li>
          </ul>
        ) : (
          <ul className="mt-2 list-disc pl-5 space-y-1 text-sm">
            <li>Desenvolvimento de aplicações web e mobile de alta qualidade e performance.</li>
            <li>Soluções escaláveis com foco em eficiência e otimização de recursos.</li>
            <li>Colaboração ativa em times ágeis para entregar soluções inovadoras.</li>
            <li>Compromisso com melhoria contínua aplicando boas práticas no dia a dia.</li>
          </ul>
        )}
      </section>

      {/* Objetivo / Career goal */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">{locale === "en" ? "Career Goal" : "Objetivo de carreira"}</h2>
        {locale === "en" ? (
          <p className="mt-2 text-sm leading-relaxed">
            I’m looking for a dynamic and challenging environment where I can apply my technical skills and expand my knowledge on innovative, high‑impact projects. I want to grow professionally, take on responsibilities and contribute to the success of the team and the company.
          </p>
        ) : (
          <p className="mt-2 text-sm leading-relaxed">
            Busco um ambiente dinâmico e desafiador onde eu possa aplicar minhas habilidades técnicas e expandir conhecimentos em projetos inovadores e de alto impacto. Quero crescer profissionalmente, assumir responsabilidades e contribuir para o sucesso do time e da empresa.
          </p>
        )}
      </section>

      {/* Formação / Education */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">{locale === "en" ? "Education" : "Formação acadêmica"}</h2>
        {locale === "en" ? (
          <div className="mt-4 space-y-4 text-sm">
            <div>
              <div className="text-xs text-muted-foreground">Jul 2025 — Aug 2026</div>
              <h3 className="font-medium">Full Cycle — MBA, Software Engineering with AI</h3>
              <p className="mt-1 text-muted-foreground">Skills: Artificial Intelligence (AI), Generative AI, Prompt Engineering, Software Development</p>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Feb 2025 — Dec 2025</div>
              <h3 className="font-medium">Full Cycle 4.0 — Software Engineering</h3>
              <p className="mt-1 text-muted-foreground">Skills: Go, Docker, Swarm</p>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Feb 2024 — Jul 2024</div>
              <h3 className="font-medium">Rocketseat</h3>
              <p className="mt-1 text-muted-foreground">Go, React Hooks, Next.js, SASS, React.js, React Native</p>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Mar 2023 — Oct 2023</div>
              <h3 className="font-medium">OneBitCode — Full Stack JavaScript Developer</h3>
              <p className="mt-1 text-muted-foreground">JavaScript, React.js, HTML5/CSS3, Git, OOP, UX, Responsive Design</p>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">May 2023 — Aug 2023</div>
              <h3 className="font-medium">Escola DNC — Technology Immersion</h3>
              <p className="mt-1 text-muted-foreground">CSS, JavaScript, Bootstrap, React.js, Scrum</p>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Feb 2021 — Jul 2023</div>
              <h3 className="font-medium">UNINOVE — Associate Degree (CST), Information Systems</h3>
              <p className="mt-1 text-muted-foreground">TypeScript, DevOps, Project Management, Agile methodologies</p>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-4 text-sm">
            <div>
              <div className="text-xs text-muted-foreground">jul de 2025 — ago de 2026</div>
              <h3 className="font-medium">Full Cycle — MBA, Engenharia de Software com IA</h3>
              <p className="mt-1 text-muted-foreground">Competências: Inteligência Artificial (IA), IA Generativa, Prompt Engineering, Desenvolvimento de Software</p>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">fev de 2025 — dez de 2025</div>
              <h3 className="font-medium">Full Cycle 4.0 — Engenharia de Software</h3>
              <p className="mt-1 text-muted-foreground">Competências: Go, Docker, Swarm</p>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">fev de 2024 — jul de 2024</div>
              <h3 className="font-medium">Rocketseat</h3>
              <p className="mt-1 text-muted-foreground">Go, React Hooks, Next.js, SASS, React.js, React Native</p>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">mar de 2023 — out de 2023</div>
              <h3 className="font-medium">OneBitCode — Programador Full Stack JavaScript</h3>
              <p className="mt-1 text-muted-foreground">JavaScript, React.js, HTML5/CSS3, Git, POO, UX, Responsividade</p>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">mai de 2023 — ago de 2023</div>
              <h3 className="font-medium">Escola DNC — Imersão em Tecnologia</h3>
              <p className="mt-1 text-muted-foreground">CSS, JavaScript, Bootstrap, React.js, Scrum</p>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">fev de 2021 — jul de 2023</div>
              <h3 className="font-medium">UNINOVE — Análise e Desenvolvimento de Sistemas (CST)</h3>
              <p className="mt-1 text-muted-foreground">TypeScript, DevOps, Gestão de Projetos, Metodologias Ágeis</p>
            </div>
          </div>
        )}
      </section>

      {/* Tech Stack */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">Tech Stack</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "React",
            "Next.js",
            "TypeScript",
            "Tailwind",
            "Node.js",
            "React Native",
            "Swift (iOS)",
            "Flutter",
            "Firebase",
            "Go",
            "Java",
            "Testing",
            "Acessibilidade",
            "Design System",
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-muted/40 px-2 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Projetos / Projects */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">{locale === "en" ? "Featured Projects" : "Projetos em destaque"}</h2>
        {locale === "en" ? (
          <ul className="mt-4 list-disc pl-5 space-y-2 text-sm">
            <li>
              <span className="font-medium">MovePro</span>
              <span className="text-muted-foreground"> — health and fitness platform with web and mobile apps, payment integration, and an ecosystem for professionals and students.</span>
            </li>
            <li>
              <span className="font-medium">FastSeller</span>
              <span className="text-muted-foreground"> — solution for e‑commerce and online payments, focused on conversion and reliability.</span>
            </li>
          </ul>
        ) : (
          <ul className="mt-4 list-disc pl-5 space-y-2 text-sm">
            <li>
              <span className="font-medium">MovePro</span>
              <span className="text-muted-foreground"> — plataforma de saúde e fitness com apps web e mobile, integração com pagamentos e ecossistema para profissionais e alunos.</span>
            </li>
            <li>
              <span className="font-medium">FastSeller</span>
              <span className="text-muted-foreground"> — solução voltada a e‑commerce e pagamentos online, com foco em conversão e confiabilidade.</span>
            </li>
          </ul>
        )}
      </section>

      {/* Contato / Contact */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-2xl font-semibold">{locale === "en" ? "Contact" : "Contato"}</h2>
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            Email: <a className="text-primary underline-offset-4 hover:underline" href="mailto:vinicius.aguiar1@icloud.com">vinicius.aguiar1@icloud.com</a>
          </li>
          <li>
            GitHub: <a className="text-primary underline-offset-4 hover:underline" href="https://github.com/ViniAguiar1" target="_blank" rel="noreferrer">@ViniAguiar1</a>
          </li>
          <li>
            LinkedIn: <a className="text-primary underline-offset-4 hover:underline" href="https://www.linkedin.com/in/viniciusaguiar-araujo/" target="_blank" rel="noreferrer">viniciusaguiar-araujo</a>
          </li>
        </ul>
      </section>
    </div>
  )
}
