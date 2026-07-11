"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, ChevronRight } from "lucide-react";
import PreConsultaGeral from "@/components/features/PreConsultaGeral";
import PreConsultaEmagrecimento from "@/components/features/PreConsultaEmagrecimento";
import Image from "next/image";

type FormType = null | "geral" | "emagrecimento";

export default function PreConsultaClient() {
  const searchParams = useSearchParams();

  // Derive initial form type from the ?tipo= query param
  const initialForm = useMemo((): FormType => {
    const tipo = searchParams.get("tipo");
    if (tipo === "emagrecimento") return "emagrecimento";
    if (tipo === "geral") return "geral";
    return null;
  }, [searchParams]);

  const [activeForm, setActiveForm] = useState<FormType>(initialForm);

  // Sync when URL changes (e.g. browser back/forward)
  if (activeForm !== initialForm && initialForm !== null) {
    setActiveForm(initialForm);
  }

  return (
    <div className="pt-32 pb-24 min-h-[90vh] bg-background px-6 relative overflow-hidden">
      
      {/* Decorative large watermark DL Logo in background */}
      <div className="absolute right-[-10%] bottom-[-5%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] opacity-[0.03] pointer-events-none select-none z-0">
        <Image
          src="/LOGODL.png"
          alt="DL Logo Watermark"
          fill
          className="object-contain"
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {activeForm === null ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center"
            >
              <p className="text-label mb-3">QUESTIONÁRIO DE AVALIAÇÃO</p>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground mb-6">
                Pré-Consulta
              </h1>
              <p className="font-sans text-[15px] sm:text-base text-foreground/80 leading-relaxed max-w-2xl mb-12">
                Para oferecer um atendimento mais personalizado, pedimos que responda algumas perguntas antes da sua consulta.
                Leva apenas alguns minutos e todas as informações são tratadas com total sigilo médico.
              </p>

              {/* Grid de Seleção */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mt-2">
                
                {/* CARD 1: Consulta Geral */}
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-white border border-border/40 hover:border-primary/30 p-8 rounded-3xl shadow-card hover:shadow-card-hover text-left flex flex-col justify-between transition-all group"
                >
                  <div>
                    <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                      Consulta Geral
                    </h3>
                    <p className="font-sans text-sm text-muted leading-relaxed mb-6">
                      Direcionado para avaliação clínica geral, check-up preventivo, modulação de estilo de vida e acompanhamento médico integrativo.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-xs text-muted/80 font-medium mb-6">
                      <Clock className="w-4 h-4 text-primary/75" />
                      <span>⏱ 3 minutos</span>
                    </div>
                    <button
                      onClick={() => setActiveForm("geral")}
                      className="btn-primary w-full flex items-center justify-center gap-2 rounded-full group-hover:bg-primary-hover transition-colors"
                    >
                      Iniciar
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>

                {/* CARD 2: Emagrecimento */}
                <motion.div
                  whileHover={{ y: -6 }}
                  className="bg-white border border-border/40 hover:border-primary/30 p-8 rounded-3xl shadow-card hover:shadow-card-hover text-left flex flex-col justify-between transition-all group"
                >
                  <div>
                    <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                      Emagrecimento
                    </h3>
                    <p className="font-sans text-sm text-muted leading-relaxed mb-6">
                      Avaliação detalhada de metas de peso, histórico de tratamentos anteriores, padrão de comportamento alimentar e rotina para conduta metabólica individualizada.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 text-xs text-muted/80 font-medium mb-6">
                      <Clock className="w-4 h-4 text-primary/75" />
                      <span>⏱ 5 minutos</span>
                    </div>
                    <button
                      onClick={() => setActiveForm("emagrecimento")}
                      className="btn-primary w-full flex items-center justify-center gap-2 rounded-full group-hover:bg-primary-hover transition-colors"
                    >
                      Iniciar
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form-container"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              {/* Back to selection button */}
              <button
                onClick={() => setActiveForm(null)}
                className="flex items-center gap-2 font-sans text-sm font-bold text-muted hover:text-foreground mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Alterar tipo de pré-consulta
              </button>

              {activeForm === "geral" ? (
                <PreConsultaGeral />
              ) : (
                <PreConsultaEmagrecimento />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
