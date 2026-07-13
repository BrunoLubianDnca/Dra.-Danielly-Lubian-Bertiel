"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const clinicImages = [
  {
    src: "/images/clinica/foto-clinica-6.jpeg",
    position: "center center",
  },
  {
    src: "/images/clinica/foto-clinica-1.jpeg",
    position: "center center",
  },
  {
    src: "/images/clinica/foto-clinica-5.jpeg",
    position: "center center",
  },
  {
    src: "/images/clinica/foto-clinica-4.jpeg",
    position: "center center",
  },
  {
    src: "/images/clinica/foto-clinica-3.jpeg",
    position: "center center",
  },
  {
    src: "/images/clinica/foto-clinica-2.jpeg",
    position: "center center",
  },
  {
    src: "/connect-office.png",
    position: "center center",
  },
];

export function ClinicaSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((idx: number) => {
    setActive(idx);
    const container = thumbsRef.current;
    if (!container) return;
    const thumb = container.children[idx] as HTMLElement;
    if (thumb) {
      const containerWidth = container.clientWidth;
      const thumbLeft = thumb.offsetLeft;
      const thumbWidth = thumb.clientWidth;
      const targetScroll = thumbLeft - (containerWidth / 2) + (thumbWidth / 2);
      
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });
    }
  }, []);

  const next = useCallback(() => goTo((active + 1) % clinicImages.length), [active, goTo]);
  const prev = useCallback(() => goTo((active - 1 + clinicImages.length) % clinicImages.length), [active, goTo]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [paused, next]);

  const current = clinicImages[active];

  return (
    <section className="section-padding bg-background border-b border-border/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Layout de Duas Colunas Padrão do Projeto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Lado Esquerdo: Imagem com Moldura Decorativa Padrão do Site (5 Colunas) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative order-2 lg:order-1 mt-6 lg:mt-0"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Contêiner da Imagem Principal (Mais alta para acompanhar o texto) */}
            <div className="relative z-10 w-full aspect-[3/4] lg:h-[580px] lg:aspect-[3/4] mx-auto rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-border/20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`main-${active}`}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.src}
                    alt="Espaço da Clínica"
                    fill
                    className="object-cover"
                    style={{ objectPosition: current.position }}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Contador superior/inferior sem texto nas fotos */}
              <div className="absolute bottom-5 right-5 z-20 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-white text-[11px] font-bold">
                {active + 1} / {clinicImages.length}
              </div>

              {/* Setas de Controle */}
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/35 hover:bg-black/60 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white/80 hover:text-white transition-all lg:opacity-0 lg:group-hover:opacity-100"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/35 hover:bg-black/60 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white/80 hover:text-white transition-all lg:opacity-0 lg:group-hover:opacity-100"
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Moldura Decorativa Mais Espessa e Deslocada (Mais intencional) */}
            <div className="absolute top-5 -right-5 bottom-5 -left-5 border-[3px] border-primary/40 rounded-3xl z-0 hidden sm:block" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sand/30 rounded-full blur-3xl z-0" />
          </motion.div>

          {/* Lado Direito: Informações e Miniaturas (7 Colunas) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7 lg:pl-8 flex flex-col gap-6 order-1 lg:order-2"
          >
            <div>
              <p className="text-label mb-4">O Espaço</p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground mb-6 leading-tight">
                Conheça o Consultório
              </h2>
              <p className="font-sans text-[15px] leading-relaxed text-foreground/80">
                Um ambiente planejado para oferecer conforto, privacidade e tranquilidade, onde cada consulta acontece com tempo, atenção e cuidado individualizado.
              </p>
            </div>

            {/* Grade de Miniaturas para Navegação (Cantos maiores, zoom 3%, sombra e transição fluida) */}
            <div className="w-full mt-4">
              <div
                ref={thumbsRef}
                className="flex flex-row gap-4 overflow-x-auto pb-1 snap-x snap-mandatory scrollbar-none"
                style={{ scrollbarWidth: "none" }}
              >
                {clinicImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      goTo(idx);
                      setPaused(true);
                      setTimeout(() => setPaused(false), 8000);
                    }}
                    className={`
                      relative shrink-0 snap-center overflow-hidden transition-all duration-300 rounded-2xl border-2
                      w-[110px] h-[80px] lg:w-[120px] lg:h-[90px]
                      shadow-sm hover:shadow-md hover:scale-[1.03]
                      ${active === idx
                        ? "border-primary shadow-lg ring-2 ring-primary/20 scale-[1.03]"
                        : "border-transparent opacity-50 hover:opacity-85 hover:border-border"
                      }
                    `}
                    aria-label={`Ver foto ${idx + 1}`}
                  >
                    <Image
                      src={img.src}
                      alt={`Miniatura ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="120px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
