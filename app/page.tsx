import { getAllPosts } from "@/lib/posts"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { getDictionary, getLocale } from "@/lib/i18n-server"

export default async function Home() {
  const locale = await getLocale()
  const articles = getAllPosts(locale)
  const dict = getDictionary(locale)

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h2 className="text-4xl font-extrabold mb-2 tracking-tight">{dict.home.title}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {dict.home.description}
        </p>
      </header>
      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <article
              key={article.slug}
              className={cn(
                "rounded-lg border border-border bg-card text-card-foreground shadow p-6 flex flex-col justify-between min-h-[180px] transition-transform hover:-translate-y-1 hover:shadow-lg relative cursor-pointer"
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
                <div className="pl-0 md:pl-0 mt-8">
                  <span className="text-xs text-muted-foreground block mb-1">
                    {article.date}
                    {article.readTime ? ` · ${article.readTime}` : null}
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold mb-1 leading-snug">
                    {article.title}
                  </h3>
                  {article.description ? (
                    <p className="text-base md:text-sm text-muted-foreground">
                      {article.description}
                    </p>
                  ) : null}
                </div>
              </div>
              {/* <a href="#" className="mt-4 text-blue-400 hover:underline text-sm w-max">
                Ler artigo
              </a> */}
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
