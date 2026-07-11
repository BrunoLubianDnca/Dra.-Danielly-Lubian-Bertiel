import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostData } from "@/lib/posts";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostData(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Blog Dra. Danielly Lubian Bertiel`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    notFound();
  }

  // Converter quebras de linha e markdown simples para renderizar o texto de demonstração
  const formattedHtml = post.content
    .replace(/^## (.+)$/gm, "<h2 class='font-serif text-2xl text-foreground font-bold mt-8 mb-4'>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1 class='font-serif text-3xl text-foreground font-bold mt-10 mb-4'>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "</p><p class='mb-4 font-sans text-sm sm:text-base text-foreground/80 leading-relaxed'>");

  return (
    <article className="pt-32 pb-24 bg-background px-6">
      <div className="max-w-3xl mx-auto">
        {/* Botão de Voltar */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-sans text-xs font-bold text-muted hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para o blog
        </Link>

        {/* Título e Info */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 font-sans text-xs text-muted-foreground/80 mb-8 border-y border-border/20 py-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {new Date(post.date).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </span>
        </div>

        {/* Imagem de Destaque */}
        <div className="relative aspect-video w-full rounded-[24px] overflow-hidden mb-10 shadow-sm border border-border/20 bg-muted">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Corpo do Artigo */}
        <div className="prose prose-stone max-w-none">
          <p className="mb-4 font-sans text-sm sm:text-base text-foreground/80 leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: formattedHtml }} />
          </p>
        </div>
      </div>
    </article>
  );
}
