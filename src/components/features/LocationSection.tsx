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
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-stretch">

          {/* Lado Esquerdo: Informações da Clínica */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col text-white"
          >
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium mb-12">
              Onde me encontrar?
            </h2>

            <div className="flex flex-col gap-8 mb-12">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 mt-1 text-terra-light shrink-0" />
                <div className="w-full">
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

                  {/* Foto de Referência da Fachada do Prédio */}
                  <div className="relative mt-4 w-full max-w-[320px] h-36 rounded-2xl overflow-hidden border border-white/10 shadow-md">
                    <Image
                      src="/connect-office.png"
                      alt="Fachada Edifício Connect Office"
                      fill
                      className="object-cover"
                      sizes="320px"
                    />
                    <div className="absolute bottom-2 left-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-bold text-white select-none">
                      Edifício Connect Office
                    </div>
                  </div>
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

          {/* Lado Direito: Google Maps Full */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 min-h-[280px] lg:min-h-[340px]"
          >
            <iframe
              src="https://maps.google.com/maps?q=Dra+Danielly+Lubian+Bertiel,+Blumenau+-+SC&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block", minHeight: "300px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
