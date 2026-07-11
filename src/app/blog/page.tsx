import Image from "next/image";
import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { Calendar, Clock, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Blog & Conteúdos | Dra. Danielly Lubian Bertiel",
  description: "Dicas de saúde, metabolismo, emagrecimento saudável e longevidade ativa por Dra. Danielly Lubian Bertiel.",
};

export default function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-label mb-2">CONTEÚDOS E ARTIGOS</p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground mb-4">
            Blog da Dra. Dani
          </h1>
          <p className="font-sans text-sm sm:text-base text-muted leading-relaxed">
            Informações científicas simplificadas para guiar sua jornada em direção à saúde, longevidade e emagrecimento definitivo.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-border/40 p-8 shadow-sm max-w-md mx-auto">
            <p className="font-sans text-sm text-muted">Nenhum post publicado ainda. Volte em breve!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white border border-border/30 hover:border-primary/20 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group h-full"
              >
                {/* Imagem do Post */}
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Conteúdo do Card */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Meta dados */}
                    <div className="flex items-center gap-4 font-sans text-[11px] text-muted-foreground/80 mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.date).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="font-sans text-xs text-muted-foreground/90 leading-relaxed mb-6">
                      {post.summary}
                    </p>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-sans text-xs font-bold text-primary group-hover:text-primary-hover inline-flex items-center gap-1 transition-colors mt-auto"
                  >
                    Ler artigo completo
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
