"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

// Inline Icon para Instagram caso não esteja na versão do lucide
function Instagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
    </svg>
  );
}

export function InstagramSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const cardWidth = el.scrollWidth / 3; // 3 posts
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(Math.min(idx, 2));
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-24 bg-background border-t border-border/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Instagram className="w-8 h-8 text-terra" />
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-foreground">
                Conheça meu Instagram!
              </h2>
            </div>
            <p className="font-sans text-[15px] text-muted-foreground max-w-lg">
              Acompanhe dicas diárias sobre saúde, longevidade, performance metabólica e estilo de vida.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <a
              href="https://www.instagram.com/dradanilubian/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-terra text-terra rounded-full font-sans text-[16px] font-bold hover:bg-terra hover:text-white transition-colors"
            >
              @dradanilubian
            </a>
          </motion.div>
        </div>

        {/* Grid/Carrossel de Posts com Snap Scroll no Mobile */}
        <div 
          ref={scrollRef}
          className="flex flex-row gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-none md:grid md:grid-cols-3 md:overflow-visible md:pb-0"
          style={{ scrollbarWidth: "none" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-[85vw] max-w-[290px] md:w-full shrink-0 snap-center flex justify-center bg-white rounded-3xl overflow-hidden shadow-lg border border-border/50"
          >
            <iframe
              src="https://www.instagram.com/reel/DZYkeFPzOrQ/embed"
              className="w-full"
              height="580"
              frameBorder="0"
              scrolling="no"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-[85vw] max-w-[290px] md:w-full shrink-0 snap-center flex justify-center bg-white rounded-3xl overflow-hidden shadow-lg border border-border/50"
          >
            <iframe
              src="https://www.instagram.com/p/DRmeibEDbX8/embed"
              className="w-full"
              height="580"
              frameBorder="0"
              scrolling="no"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-[85vw] max-w-[290px] md:w-full shrink-0 snap-center flex justify-center bg-white rounded-3xl overflow-hidden shadow-lg border border-border/50"
          >
            <iframe
              src="https://www.instagram.com/reel/DaDe9e_zaSk/embed"
              className="w-full"
              height="580"
              frameBorder="0"
              scrolling="no"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Indicadores de Scroll Dinâmicos para Mobile */}
        <div className="flex items-center justify-center gap-1.5 mt-2 md:hidden">
          {[...Array(3)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                const cardWidth = el.scrollWidth / 3;
                el.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-5 bg-primary" : "w-1.5 bg-foreground/20"
              }`}
              aria-label={`Ir para post ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

