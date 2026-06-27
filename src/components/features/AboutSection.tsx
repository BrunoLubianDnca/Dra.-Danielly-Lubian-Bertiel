"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, HeartHandshake, Award } from "lucide-react";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="sobre" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Foto (Esquerda) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 relative"
          >
             <div className="aspect-[4/5] relative z-10 rounded-2xl overflow-hidden shadow-2xl">
               <Image 
                 src="/perfil02_v2.jpeg" 
                 alt="Dra. Danielly Lubian Bertiel no consultório" 
                 fill
                 className="object-cover object-top"
                 sizes="(max-width: 1024px) 100vw, 33vw"
               />
             </div>
             {/* Decorative Frame */}
             <div className="absolute top-4 -right-4 bottom-4 -left-4 border border-terra/30 rounded-2xl z-0 hidden sm:block" />
             <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sand/30 rounded-full blur-3xl z-0" />
          </motion.div>

          {/* Texto (Centro) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-5 lg:pl-8 lg:pr-4"
          >
            <p className="text-label mb-4">Sobre mim</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground mb-6 leading-tight">
              Medicina que cuida e transforma.
            </h2>
            
            <div className="font-sans text-[15px] leading-relaxed text-foreground/80 mb-8 space-y-4">
              <p>
                Sou a <strong>Dra. Danielly Lubian Bertiel</strong>, médica dedicada ao emagrecimento, performance metabólica, saúde preventiva e longevidade. Acredito que cada pessoa é única e, por isso, merece um plano de cuidado individualizado, com estratégia, acompanhamento contínuo e foco em resultados sustentáveis.
              </p>
              <p>
                Cristã, esposa de Willian e mãe de José e Francisco, carrego para a medicina os valores que norteiam minha vida: acolhimento, compromisso e propósito.
              </p>
              <p>
                Sua transformação começa com o primeiro passo. Agende sua consulta e descubra um cuidado feito para você.
              </p>
            </div>

            <a 
              href="https://api.whatsapp.com/send?phone=554791129634&text=Ol%C3%A1!%20Vim%20do%20Google%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20consulta%20da%20Dra" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-whatsapp inline-flex"
            >
              Agendar Consulta
            </a>
          </motion.div>

          {/* Features (Direita) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3 space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="text-primary flex-shrink-0">
                <GraduationCap className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <p className="font-sans text-[15px] text-foreground/90 font-medium leading-snug">
                Formação médica<br/>e especializações
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-primary flex-shrink-0">
                <BookOpen className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <p className="font-sans text-[15px] text-foreground/90 font-medium leading-snug">
                Atualização constante<br/>em ciência
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-primary flex-shrink-0">
                <HeartHandshake className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <p className="font-sans text-[15px] text-foreground/90 font-medium leading-snug">
                Atendimento humano<br/>e acolhedor
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-primary flex-shrink-0">
                <Award className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <p className="font-sans text-[15px] text-foreground/90 font-medium leading-snug">
                Resultados reais e<br/>sustentáveis
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}


