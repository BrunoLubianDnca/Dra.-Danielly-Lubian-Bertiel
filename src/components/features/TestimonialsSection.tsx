"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { 
    name: "Juliana", 
    age: "36 anos",
    text: "Com o acompanhamento da Dra. Danielly, consegui emagrecer com saúde e hoje tenho muito mais disposição!",
    img: "J"
  },
  { 
    name: "Marcos", 
    age: "45 anos",
    text: "Melhorei meus exames, minha energia e minha performance no trabalho e nos treinos.",
    img: "M"
  },
  { 
    name: "Fernanda", 
    age: "52 anos",
    text: "A menopausa foi muito mais leve com o tratamento certo e o cuidado que recebi.",
    img: "F"
  },
];

export function TestimonialsSection() {
  return (
    <section id="resultados" className="section-padding bg-background relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="text-center mb-16">
          <p className="text-label mb-2">Resultados que inspiram</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-foreground">
            Histórias reais, transformações verdadeiras.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="card-testimonial"
            >
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-border flex items-center justify-center font-serif text-foreground shrink-0 overflow-hidden">
                  {/* Substituir por <img src="..." /> depois */}
                  <span className="text-sm italic">Foto</span>
                </div>
                <div>
                  <p className="font-sans text-[16px] font-bold text-foreground">
                    {t.name}, <span className="font-normal">{t.age}</span>
                  </p>
                  <p className="font-sans text-[15px] text-foreground/80 italic leading-relaxed mt-2">
                    "{t.text}"
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1 mt-4 pl-16">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a href="#depoimentos" className="btn-outline-dark rounded-full">
            Ver mais depoimentos
          </a>
        </div>

      </div>
    </section>
  );
}

