"use client";

import { useState, useRef, useEffect } from "react";
import { motion as motionFramer } from "framer-motion";
import { ClipboardList, Target, TrendingUp, Star, Check, Leaf, CalendarCheck, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useWhatsApp } from "@/hooks/useWhatsApp";

const steps = [
  {
    n: "01",
    title: "Avaliação Individualizada",
    desc: "Entendimento profundo do seu histórico, objetivos, hábitos e estilo de vida.",
    icon: ClipboardList
  },
  {
    n: "02",
    title: "Estratégia Personalizada",
    desc: "Plano exclusivo baseado em ciência, exames e na sua realidade.",
    icon: Target
  },
  {
    n: "03",
    title: "Acompanhamento Contínuo",
    desc: "Monitoramento, ajustes e suporte constantes para garantir sua evolução.",
    icon: TrendingUp
  },
  {
    n: "04",
    title: "Resultados Sustentáveis",
    desc: "Mais saúde, energia e qualidade de vida no longo prazo.",
    icon: Star
  },
];

const stepTransforms = [
  {
    scale: 0.8,
    rotate: 90,
    flapDuration: 2.5,
    glow: "drop-shadow(0 0 8px rgba(255,255,255,0.4))",
  },
  {
    scale: 1.0,
    rotate: 45,
    flapDuration: 1.6,
    glow: "drop-shadow(0 0 12px rgba(255,255,255,0.7))",
  },
  {
    scale: 1.2,
    rotate: 15,
    flapDuration: 0.9,
    glow: "drop-shadow(0 0 16px rgba(255,255,255,0.9))",
  },
  {
    scale: 1.4,
    rotate: 0,
    flapDuration: 0.45,
    glow: "drop-shadow(0 0 25px rgba(255,255,255,1))",
  }
];

export function MetodoSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Track active card on mobile scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const cardWidth = el.scrollWidth / steps.length;
      const idx = Math.round(el.scrollLeft / cardWidth);
      setHoveredIndex(Math.min(idx, steps.length - 1));
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const { getWhatsAppUrl } = useWhatsApp();
  const whatsappUrl = getWhatsAppUrl("metodo");

  return (
    <section id="metodo" className="relative section-padding overflow-hidden bg-terra-dark">

      {/* Background Gradient Layer — igual ao Hero */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-terra-dark to-terra-dark/95 z-10" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-sand/5 blur-[120px] mix-blend-overlay z-10" />
      </div>

      {/* Large Watermark LOGODL.png — lado esquerdo, centralizado verticalmente */}
      <div className="absolute left-[-8%] top-1/2 -translate-y-1/2 w-[420px] sm:w-[560px] lg:w-[700px] h-[420px] sm:h-[560px] lg:h-[700px] opacity-[0.06] pointer-events-none select-none z-0">
        <Image
          src="/LOGODL.png"
          alt="DL Logo Watermark"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain filter brightness-0 invert"
          priority
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        <div className="flex flex-col gap-12">

          {/* Header Texto */}
          <div className="text-center lg:text-left flex flex-col lg:flex-row justify-between items-center lg:items-end gap-6 mb-8">
            <div>
              <p className="text-label-light mb-4">MÉTODO FLORESCER</p>
              <h2 className="font-serif text-4xl sm:text-5xl font-medium text-white mb-4">
                Método FLORESCER
              </h2>
              <p className="font-sans text-[16px] text-white/90 leading-relaxed max-w-md">
                Uma abordagem completa e personalizada para transformar sua saúde de dentro para fora e garantir resultados duradouros.
              </p>
            </div>

            {/* Exclusivity Badge & Button Group */}
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto justify-end">
              {/* Exclusivity Badge */}
              <div className="border border-white/20 bg-white/10 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 max-w-xs text-left w-full sm:w-auto shadow-sm">
                <div className="relative w-8 h-8 shrink-0">
                  <Image
                    src="/LOGODL.png"
                    alt="DL Logo"
                    fill
                    sizes="32px"
                    className="object-contain filter brightness-0 invert"
                  />
                </div>
                <div>
                  <p className="font-sans text-[9px] font-bold tracking-[0.15em] text-[#F5E6D3] uppercase leading-none mb-1">MÉTODO EXCLUSIVO</p>
                  <p className="font-serif text-[11px] text-white leading-tight">Desenvolvido pela Dra. Danielly Lubian Bertiel</p>
                </div>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-light shrink-0 flex items-center justify-center gap-2 w-full sm:w-auto hover:bg-white hover:text-primary transition-all duration-300"
              >
                <CalendarCheck className="w-4 h-4" />
                Conhecer o Método Florescer
              </a>
            </div>
          </div>

          {/* Passos com Linhas de Conexão e Cards */}
          <div
            ref={scrollRef}
            className="relative flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6 sm:pb-0 z-10 pt-16 -mx-6 px-6 sm:mx-0 sm:px-0"
          >

            {/* Linhas de conexão com setas (Desktop) - Maior contraste */}
            <div className="hidden lg:flex items-center absolute top-[104px] left-[16%] w-[18%] -z-10">
              <div className="flex-1 h-[1px] border-t border-dashed border-white/50" />
              <span className="text-white/50 text-[9px] -ml-1 select-none">▶</span>
            </div>
            <div className="hidden lg:flex items-center absolute top-[104px] left-[41%] w-[18%] -z-10">
              <div className="flex-1 h-[1px] border-t border-dashed border-white/50" />
              <span className="text-white/50 text-[9px] -ml-1 select-none">▶</span>
            </div>
            <div className="hidden lg:flex items-center absolute top-[104px] left-[66%] w-[18%] -z-10">
              <div className="flex-1 h-[1px] border-t border-dashed border-white/50" />
              <span className="text-white/50 text-[9px] -ml-1 select-none">▶</span>
            </div>

            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = hoveredIndex === i;

              return (
                <motionFramer.div
                  key={step.title}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onClick={() => setHoveredIndex(i)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="flex-shrink-0 w-[85vw] sm:w-auto snap-center flex flex-col items-center cursor-pointer relative group"
                >

                  {/* Círculo da Etapa */}
                  <div className="relative mb-6">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center relative transition-all duration-300 ${isActive
                      ? "bg-white text-primary scale-110 border-[4px] border-[#F5E6D3] shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                      : "bg-white text-terra-dark border-[4px] border-terra-dark/30 opacity-90 group-hover:opacity-100 shadow-sm"
                      }`}>
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>

                    {/* Badge do Número da Etapa */}
                    <div className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border transition-all duration-300 shadow-sm ${isActive
                      ? "border-[#F5E6D3] text-primary scale-105"
                      : "border-terra-dark/20 text-terra-dark/80"
                      }`}>
                      {step.n}
                    </div>

                    {/* Borboleta Ativa pairando no canto superior direito do círculo */}
                    {isActive && (
                      <motionFramer.div
                        layoutId="activeLogoButterfly"
                        className="absolute -top-4 -right-4 z-20 pointer-events-none"
                        transition={{ type: "spring", stiffness: 90, damping: 13 }}
                      >
                        {/* Wing Flapping Motion */}
                        <motionFramer.div
                          className="relative w-8 h-8"
                          style={{
                            filter: `${stepTransforms[i].glow} brightness(0) invert(1)`,
                          }}
                          animate={{
                            scale: stepTransforms[i].scale,
                            rotate: stepTransforms[i].rotate,
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          <motionFramer.div
                            className="w-full h-full relative"
                            animate={{
                              rotateY: [0, 75, 0],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: stepTransforms[i].flapDuration,
                              ease: "easeInOut",
                            }}
                          >
                            <Image
                              src="/LOGODL.png"
                              alt="DL Logo Butterfly"
                              fill
                              sizes="32px"
                              className="object-contain"
                              priority
                            />
                          </motionFramer.div>
                        </motionFramer.div>
                      </motionFramer.div>
                    )}
                  </div>

                  {/* Card com Conteúdo */}
                  <div className={`w-full p-6 rounded-2xl border text-center transition-all duration-300 flex-1 flex flex-col justify-between min-h-[230px] ${isActive
                    ? "bg-white/15 border-white/30 shadow-[0_15px_30px_rgba(0,0,0,0.15)] backdrop-blur-md"
                    : "bg-white/[0.04] border-white/5 opacity-80 group-hover:opacity-100"
                    }`}>
                    <div>
                      <h3 className={`font-serif text-[16px] font-medium mb-1 leading-tight transition-colors duration-300 ${isActive ? "text-[#F5E6D3] font-semibold" : "text-white/80"}`}>
                        {step.title}
                      </h3>
                      <div className="w-6 h-[1px] bg-white/20 my-3 mx-auto" />
                      <p className={`font-sans text-[12px] leading-relaxed transition-colors duration-300 ${isActive ? "text-white" : "text-white/70"}`}>
                        {step.desc}
                      </p>
                    </div>

                    {/* Ícone de Checkmark dourado/branco na base do card */}
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center mx-auto mt-4 transition-all duration-300 ${isActive
                      ? "border-white bg-white text-primary scale-110 shadow-md animate-pulse"
                      : "border-white/20 text-white/40 bg-white/[0.02]"
                      }`}>
                      <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </div>
                  </div>

                </motionFramer.div>
              );
            })}
          </div>

          {/* Dots de paginação — apenas mobile */}
          <div className="flex sm:hidden items-center justify-center gap-2 mt-2 mb-2">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setHoveredIndex(i);
                  if (scrollRef.current) {
                    const cardWidth = scrollRef.current.scrollWidth / steps.length;
                    scrollRef.current.scrollTo({ left: cardWidth * i, behavior: "smooth" });
                  }
                }}
                className={`transition-all duration-300 rounded-full ${
                  hoveredIndex === i
                    ? "w-5 h-2 bg-white"
                    : "w-2 h-2 bg-white/30"
                }`}
                aria-label={`Etapa ${i + 1}`}
              />
            ))}
          </div>

          {/* Hint de swipe — apenas mobile, some após interação */}
          {hoveredIndex === 0 && (
            <motionFramer.div
              className="flex sm:hidden items-center justify-center gap-1 text-white/50 text-[11px] font-sans mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 3, times: [0, 0.2, 0.8, 1], delay: 1 }}
            >
              <span>deslize para ver mais</span>
              <motionFramer.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </motionFramer.div>
            </motionFramer.div>
          )}

          {/* Badge Centralizado na Base */}
          <div className="flex justify-center mt-6">
            <div className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-6 py-2.5 rounded-full backdrop-blur-sm shadow-sm">
              <Leaf className="w-4 h-4 text-terra-light" />
              <span className="font-sans text-[12px] text-white/90 font-medium">
                Medicina integrativa, ciência e cuidado que transformam vidas.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
