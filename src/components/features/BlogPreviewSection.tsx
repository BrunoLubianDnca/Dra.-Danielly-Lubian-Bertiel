import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getSortedPostsData } from "@/lib/posts";

export function BlogPreviewSection() {
  const allPosts = getSortedPostsData();
  const posts = allPosts.slice(0, 4);

  if (posts.length === 0) return null;

  return (
    <section className="section-padding bg-background pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <h2 className="text-label text-foreground">Conteúdos para sua melhor versão</h2>
          <Link
            href="/blog"
            className="flex items-center gap-2 font-sans text-[11px] font-semibold tracking-widest uppercase text-foreground hover:text-primary transition-colors"
          >
            Ver todos os artigos <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-surface rounded-xl overflow-hidden border border-border hover:shadow-md transition-shadow"
            >
              {/* Imagem de Destaque */}
              <div className="w-full h-44 bg-secondary relative overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-sans text-[10px] font-medium text-muted">
                    {new Date(post.date).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="font-sans text-[10px] text-primary font-semibold">
                    {post.readTime}
                  </span>
                </div>
                <h3 className="font-sans text-[15px] font-bold text-foreground leading-snug group-hover:text-primary transition-colors mb-2">
                  {post.title}
                </h3>
                <p className="font-sans text-[12px] text-muted leading-relaxed line-clamp-2">
                  {post.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
