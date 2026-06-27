"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const posts = [
  { 
    title: "Como acelerar seu metabolismo de forma saudável", 
    date: "12 DEZ 2024", 
    category: "METABOLISMO",
    slug: "acelerar-metabolismo",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop"
  },
  { 
    title: "5 hábitos que aumentam sua qualidade de vida", 
    date: "05 DEZ 2024", 
    category: "LONGEVIDADE",
    slug: "habitos-qualidade-vida",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
  },
  { 
    title: "Emagrecimento inteligente: mais que perder peso", 
    date: "26 NOV 2024", 
    category: "EMAGRECIMENTO",
    slug: "emagrecimento-inteligente",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop"
  },
  { 
    title: "Exames essenciais para prevenir doenças", 
    date: "20 NOV 2024", 
    category: "SAÚDE PREVENTIVA",
    slug: "exames-preventivos",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop"
  },
];

export function BlogPreviewSection() {
  return (
    <section className="section-padding bg-background pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <p className="text-label text-foreground">Conteúdos para sua melhor versão</p>
          <a href="/blog" className="flex items-center gap-2 font-sans text-[11px] font-semibold tracking-widest uppercase text-foreground hover:text-primary transition-colors">
            Ver todos os artigos <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, i) => (
            <motion.a
              key={post.slug}
              href={`/blog/${post.slug}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group block bg-surface rounded-xl overflow-hidden border border-border hover:shadow-md transition-shadow"
            >
              {/* Imagem de Destaque */}
              <div className="w-full h-40 bg-secondary relative overflow-hidden">
                <Image 
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block bg-primary/10 text-primary font-sans text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-sm">
                    {post.category}
                  </span>
                  <span className="font-sans text-[10px] font-medium text-muted">
                    {post.date}
                  </span>
                </div>
                <h3 className="font-sans text-[15px] font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}

