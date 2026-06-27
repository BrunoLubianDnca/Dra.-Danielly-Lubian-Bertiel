"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative bg-terra-dark min-h-[90vh] flex items-center pt-20 pb-12 overflow-hidden">

      {/* Background Gradient Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-terra-dark to-terra-dark/95 z-10" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-sand/5 blur-[120px] mix-blend-overlay z-10" />
      </div>

      {/* Large Watermark LOGODL.png in background */}
      <div className="absolute left-[-10%] top-[-8%] w-[450px] sm:w-[600px] lg:w-[800px] h-[450px] sm:h-[600px] lg:h-[800px] opacity-[0.04] pointer-events-none select-none z-0">
        <Image
          src="/LOGODL.png"
          alt="DL Logo Watermark"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain filter brightness-0 invert"
          priority
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Texto Esquerda */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-label-light mb-4 lg:mb-6 tracking-[0.2em] text-white text-[10px] sm:text-xs">
              SAÚDE • LONGEVIDADE • PERFORMANCE
            </p>

            <h1 className="font-serif text-[2.4rem] sm:text-5xl lg:text-[3.8rem] font-medium text-white leading-[1.15] mb-4 lg:mb-6">
              Sua saúde hoje<br />
              define a sua<br />
              <span className="italic text-terra-light font-normal">longevidade</span> amanhã.
            </h1>

            <p className="font-sans text-[14px] sm:text-[15px] text-white/90 leading-relaxed max-w-md mb-8 lg:mb-10">
              Acompanhamento médico personalizado para emagrecimento, performance metabólica e uma vida com mais energia e qualidade.
            </p>

            {/* Botões — ambos visíveis no mobile */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8 lg:mb-16">
              <a
                href="https://api.whatsapp.com/send?phone=554791129634&text=Ol%C3%A1!%20Vim%20do%20Google%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20consulta%20da%20Dra"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp justify-center sm:justify-start"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Agendar consulta
              </a>
              <a href="#metodo" className="btn-outline-light justify-center sm:justify-start">
                Método Florescer
              </a>
            </div>
          </motion.div>

          {/* Foto Direita */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col items-center lg:items-end h-full relative"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] aspect-[4/5] rounded-[32px] lg:rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(255,255,255,0.15)] border-2 border-white/20">
              <Image
                src="/ft01.jpeg"
                alt="Dra. Danielly Lubian"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 340px, (max-width: 1024px) 380px, 420px"
                priority
              />

              {/* Badge Flutuante — sobreposição apenas no desktop */}
              <div className="hidden sm:block absolute bottom-6 -left-6 bg-white border border-sand/30 p-4 rounded-xl shadow-[0_12px_32px_rgba(42,31,24,0.15)] text-center min-w-[200px]">
                <p className="font-serif text-base text-terra-dark italic">
                  Medicina que<br />transforma vidas.
                </p>
                <div className="w-8 h-[2px] bg-terra-light mt-2 mx-auto" />
              </div>
            </div>

            {/* Badge Mobile — abaixo da foto, não sobrepõe */}
            <div className="sm:hidden mt-4 bg-white/10 border border-white/20 backdrop-blur-sm px-6 py-3 rounded-xl text-center">
              <p className="font-serif text-sm text-white italic">
                Medicina que transforma vidas.
              </p>
              <div className="w-6 h-[1px] bg-terra-light mt-2 mx-auto" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
