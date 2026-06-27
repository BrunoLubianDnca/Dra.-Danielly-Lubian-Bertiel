"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function CtaSection() {
  return (
    <section className="bg-primary-hover py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* Esquerda: Título */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/3"
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-white leading-tight">
              Pronta para transformar sua saúde e sua vida?
            </h2>
          </motion.div>

          {/* Centro: Texto */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:w-1/3"
          >
            <p className="font-sans text-[16px] text-white/90 leading-relaxed max-w-sm">
              Agende sua consulta e dê o primeiro passo para uma nova versão de você.
            </p>
          </motion.div>

          {/* Direita: Botão */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:w-1/3 flex justify-start lg:justify-end"
          >
            <a
              href="https://api.whatsapp.com/send?phone=554791129634&text=Ol%C3%A1!%20Vim%20do%20Google%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20consulta%20da%20Dra"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light"
            >
              <MessageCircle className="w-4 h-4" />
              Agendar consulta pelo WhatsApp
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

