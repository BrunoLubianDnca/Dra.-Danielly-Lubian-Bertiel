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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Lado Esquerdo: Informações da Clínica (Restaurado Padrão Original) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col text-white"
          >
            <h2 className="font-serif text-4xl sm:text-5xl font-medium mb-12">
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

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp rounded-full w-full sm:w-max"
            >
              <WhatsAppIcon className="w-6 h-6" />
              Informações e agendamentos
            </a>
          </motion.div>

          {/* Lado Direito: Foto do Prédio + Google Maps Lado a Lado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-auto lg:h-[450px]"
          >
            {/* Foto do Edifício */}
            <div className="relative h-[300px] sm:h-full rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl select-none group">
              <Image 
                src="/connect-office.png" 
                alt="Edifício Connect Office" 
                fill 
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 300px"
              />
              {/* Selo do Edifício */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl text-center border border-white/10">
                <p className="font-sans text-[10px] font-bold tracking-widest uppercase text-white flex items-center justify-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-terra-light" /> Edifício Connect Office
                </p>
              </div>
            </div>

            {/* Mapa do Google */}
            <div className="h-[300px] sm:h-full bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
              <iframe 
                src="https://maps.google.com/maps?q=Dra+Danielly+Lubian+Bertiel,+Blumenau+-+SC&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
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
