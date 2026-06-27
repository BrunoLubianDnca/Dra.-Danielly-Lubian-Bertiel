"use client";

import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function LocationSection() {
  const whatsappNumber = "554791129634";
  const whatsappMessage = "Olá! Vim do Google e gostaria de saber mais sobre a consulta da Dra";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="bg-terra-dark py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Informações da Clínica */}
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
                    <strong>Centro clínico Augusta Pradi</strong><br />
                    Rua Floriano Peixoto, 350 - Centro<br />
                    Blumenau - SC, 89012-400<br />
                    Sala 804
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

          {/* Mapa do Google */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full h-[400px] sm:h-[500px] bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10"
          >
            <iframe 
              src="https://maps.google.com/maps?q=Rua+Floriano+Peixoto,+350+-+Centro,+Blumenau+-+SC&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
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

