"use client";

import { motion } from "framer-motion";
import { ArrowRight, Activity, Zap, Leaf, ShieldCheck } from "lucide-react";
import Link from "next/link";

const objectives = [
  { 
    title: "Emagrecimento saudável",       
    desc: "Estratégias personalizadas para melhorar o metabolismo e a composição corporal.",
    icon: Activity,
    href: "/pre-consulta?tipo=emagrecimento",
  },
  { 
    title: "Performance metabólica",         
    desc: "Mais energia, disposição e equilíbrio para sua rotina e seus objetivos.",
    icon: Zap,
    href: "/pre-consulta?tipo=geral",
  },
  { 
    title: "Longevidade e qualidade de vida",         
    desc: "Cuidados para prevenir, equilibrar e viver mais e melhor.",
    icon: Leaf,
    href: "/pre-consulta?tipo=geral",
  },
  { 
    title: "Saúde preventiva e integrativa",           
    desc: "Avaliação completa para antecipar problemas e promover saúde de forma inteligente.",
    icon: ShieldCheck,
    href: "/pre-consulta?tipo=geral",
  },
];

export function ObjectivesSection() {
  return (
    <section id="especialidades" className="section-padding bg-background relative z-10 -mt-8 rounded-t-[2.5rem]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center mb-16 flex items-center justify-center gap-4">
          <div className="h-[1px] w-12 bg-primary/30" />
          <h2 className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-foreground">
            Qual é o seu objetivo?
          </h2>
          <div className="h-[1px] w-12 bg-primary/30" />
        </div>

        <div 
          className="flex flex-row gap-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-none md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0"
          style={{ scrollbarWidth: "none" }}
        >
          {objectives.map((obj, i) => {
            const Icon = obj.icon;
            return (
              <motion.div
                key={obj.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-center"
              >
                <Link
                  href={obj.href}
                  className="card-objective group flex flex-col h-full"
                >
                  <div className="mb-6 text-primary">
                    <Icon className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-[17px] font-medium text-foreground mb-3">
                    {obj.title}
                  </h3>
                  <p className="font-sans text-[15px] text-muted leading-relaxed mb-6 min-h-[5rem]">
                    {obj.desc}
                  </p>
                  <div className="mt-auto flex items-center gap-2 font-sans text-[12px] font-medium text-primary group-hover:text-primary-hover transition-colors">
                    Saiba mais <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}

