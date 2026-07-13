"use client";

import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import Image from "next/image";

export function LocationSection() {
  const whatsappNumber = "554791129634";
  const whatsappMessage = "Olá! Vim do Google e gostaria de saber mais sobre a consulta da Dra";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section id="onde" className="bg-terra-dark py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Grid de 12 colunas padrão do projeto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">

          {/* Lado Esquerdo: Informações da Clínica (5 colunas) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between text-white"
          >
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium mb-12">
                Onde me encontrar?
              </h2>

              <div className="flex flex-col gap-8 mb-12">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 mt-1 text-terra-light shrink-0" />
                  <div>
                    <h3 className="font-sans text-lg font-bold mb-2">Endereço:</h3>
                    <p className="font-sans text-[15px] text-white leading-relaxed max-w-md">
                      <strong>Edifício Connect Office</strong><br />
                      R. Pastor Stutzer, 220 • sala 501 (5º andar)<br />
                      Jardim Blumenau • Blumenau - SC<br />
                      CEP: 89010-390
                    </p>
                    <p className="font-sans text-xs text-white/70 mt-2 italic leading-relaxed">
                      A clínica fica localizada no bairro Jardim Blumenau, bem pertinho do centro e da Alameda.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 mt-1 text-terra-light shrink-0" />
                  <div>
                    <h3 className="font-sans text-lg font-bold mb-2">Horário de atendimento:</h3>
                    <p className="font-sans text-[15px] text-white">
                      Segunda a sexta de 08h00 às 18h00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-fit bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-sm px-8 py-4 rounded-full flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-950/20"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Informações e agendamentos
            </a>
          </motion.div>

          {/* Lado Direito: Visual (7 colunas - Fachada e Mapa lado a lado) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch"
          >
            {/* Foto de Fachada do Edifício */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 min-h-[240px] sm:min-h-auto">
              <Image
                src="/connect-office.png"
                alt="Fachada do Edifício Connect Office"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 30vw"
                priority
              />
              <div className="absolute bottom-3 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded text-xs font-bold text-white select-none">
                Fachada Connect Office
              </div>
            </div>

            {/* Mapa de Localização */}
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 min-h-[240px] sm:min-h-auto">
              <iframe
                src="https://maps.google.com/maps?q=Dra+Danielly+Lubian+Bertiel,+Blumenau+-+SC&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
