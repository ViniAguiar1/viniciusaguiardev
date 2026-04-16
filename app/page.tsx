import { getAllPosts } from "@/lib/posts"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { getDictionary, getLocale } from "@/lib/i18n-server"
import { JsonLd } from "@/components/json-ld"
import { FadeIn } from "@/components/fade-in"

export default async function Home() {
  const locale = await getLocale()
  const articles = getAllPosts(locale)
  const dict = getDictionary(locale)

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Vinicius Aguiar",
          url: "https://viniciusaguiardev.com.br",
          description: dict.home.description,
          author: {
            "@type": "Person",
            name: "Vinicius Aguiar",
            jobTitle: "Software Engineer",
            url: "https://viniciusaguiardev.com.br",
            sameAs: [
              "https://github.com/ViniAguiar1",
              "https://www.linkedin.com/in/viniciusaguiar-araujo/",
            ],
          },
        }}
      />

      {/* HERO */}
      <FadeIn>
      <header className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start">

          {/* LEFT: texto */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              {dict.home.title}
            </h1>

            <p className="mt-2 text-lg text-muted-foreground max-w-xl">
              {dict.home.subtitle}
            </p>

            <p className="mt-2 text-sm text-muted-foreground max-w-xl">
              {dict.home.description}
            </p>
          </div>

          {/* RIGHT: botões empilhados */}
          <div className="inline-grid grid-cols-1 gap-2 md:justify-self-end">
            <Link
              href="/Curriculo-Vinicius-Aguiar.pdf"
              target="_blank"
              data-umami-event="cv-download"
              data-umami-event-source="hero"
              className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 transition text-center"
            >
              {dict.home.ctaResume}
            </Link>

            <Link
              href="/sobre"
              className="px-4 py-2 text-sm rounded-md border border-border hover:bg-muted transition text-center"
            >
              {dict.home.ctaAbout}
            </Link>
          </div>

        </div>
      </header>
      </FadeIn>

      {/* POSTS */}
      <main>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {articles.map((article, index) => (
            <FadeIn key={article.slug} delay={index * 100}>
            <article
              className={cn(
                "rounded-lg border border-border bg-card text-card-foreground shadow p-6 flex flex-col justify-between min-h-45 transition-transform hover:-translate-y-1 hover:shadow-lg relative cursor-pointer"
              )}
            >
              <Link
                href={`/posts/${article.slug}`}
                aria-label={`Ir para ${article.title}`}
                className="absolute inset-0"
              />

              <div>

                {article.tag ? (
                  <span
                    className={cn(
                      "absolute text-white left-6 top-6 uppercase text-xs font-semibold px-3 py-1 rounded shadow-sm",
                      article.tagColor || "bg-primary text-primary-foreground"
                    )}
                  >
                    {article.tag}
                  </span>
                ) : null}

                <div className="mt-8">

                  <span className="text-xs text-muted-foreground block mb-1">
                    {article.date}
                    {article.readTime ? ` · ${article.readTime}` : null}
                  </span>

                  <h3 className="text-lg md:text-xl font-semibold mb-1 leading-snug">
                    {article.title}
                  </h3>

                  {article.description ? (
                    <p className="text-sm text-muted-foreground">
                      {article.description}
                    </p>
                  ) : null}

                </div>

              </div>

            </article>
            </FadeIn>
          ))}

        </div>

      </main>

    </div>
  )
}
