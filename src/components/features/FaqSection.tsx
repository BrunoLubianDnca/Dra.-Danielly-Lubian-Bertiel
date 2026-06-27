"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { q: "Quanto tempo dura a consulta?", a: "A consulta dura em média 1h30, podendo se estender um pouco mais se necessário." },
  { q: "O atendimento pode ser online?", a: "Sim! Oferecemos a possibilidade de consultas por telemedicina para pacientes de todas as partes, com o mesmo rigor e atenção do atendimento presencial." },
  { q: "Você prescreve medicamentos?", a: "Sim. A prescrição de medicamentos ou suplementação é feita de forma individualizada, caso haja indicação médica baseada em exames e na sua avaliação clínica." },
  { q: "Aceita convênio?", a: "As consultas são particulares para garantirmos um atendimento exclusivo e tempo adequado para você. Fornecemos recibo para solicitação de reembolso, dependendo do seu plano de saúde." },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-background">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">

        <div className="mb-20 text-center">
          <h2 className="font-serif text-3xl font-normal text-foreground">
            Dúvidas Frequentes
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex flex-col"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors duration-300
                  ${openIndex === i ? "bg-primary rounded-t-xl" : "bg-primary hover:bg-primary-hover rounded-xl"}
                `}
              >
                <span className="font-sans text-[16px] font-medium text-white tracking-wide">
                  {faq.q}
                </span>
                <span className="font-sans text-xl font-light text-white transition-transform duration-300">
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden bg-[#EAE1D8] rounded-b-xl"
                  >
                    <p className="font-sans text-[15px] text-foreground leading-relaxed px-6 py-5">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://api.whatsapp.com/send?phone=554791129634&text=Ol%C3%A1!%20Vim%20do%20Google%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20consulta%20da%20Dra"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp rounded-full px-8 py-3 text-[15px]"
          >
            Agende sua consulta
          </a>
        </div>

      </div>
    </section>
  );
}



