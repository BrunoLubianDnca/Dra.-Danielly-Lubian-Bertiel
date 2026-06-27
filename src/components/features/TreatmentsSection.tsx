"use client";

import { motion } from "framer-motion";

const treatments = [
  { title: "Emagrecimento Clínico",  desc: "Acompanhamento médico contínuo, focando na regulação metabólica e na readequação da composição corporal.",    href: "/emagrecimento" },
  { title: "Performance e Vitalidade",   desc: "Análise clínica e laboratorial para otimização da saúde energética, função cognitiva e disposição física.",           href: "/performance-metabolica" },
  { title: "Medicina da Longevidade",    desc: "Protocolos voltados à mitigação dos efeitos do envelhecimento celular e à promoção da qualidade de vida a longo prazo.",     href: "/longevidade" },
  { title: "Saúde Preventiva",           desc: "Avaliação clínica periódica e detalhada para identificação precoce e manejo de possíveis riscos metabólicos e cardiovasculares.",                 href: "/saude-preventiva" },
];

export function TreatmentsSection() {
  return (
    <section className="py-32 bg-card">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">

        <div className="mb-20 text-center">
          <h2 className="font-serif text-3xl font-normal text-foreground">
            Especialidades
          </h2>
        </div>

        <div className="divide-y divide-border/40 border-y border-border/40">
          {treatments.map((t, i) => (
            <motion.a
              key={t.title}
              href={t.href}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12 py-10 group"
            >
              <h3 className="font-serif text-lg font-normal text-foreground sm:w-1/3 group-hover:text-primary transition-colors duration-300">
                {t.title}
              </h3>
              <p className="font-sans text-[15px] text-muted-foreground leading-relaxed flex-1">
                {t.desc}
              </p>
              <span className="hidden sm:block font-sans text-xs text-muted-foreground/30 group-hover:text-primary transition-colors">
                Ver mais
              </span>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}

