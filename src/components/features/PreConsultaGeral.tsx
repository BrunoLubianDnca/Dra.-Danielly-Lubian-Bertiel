"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { submitPreConsulta } from "@/app/pre-consulta/actions";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

const WHATSAPP_NUMBER = "554791129634";

interface GeralData {
  name: string;
  birthdate: string;
  phone: string;
  email: string;
  motivo: string;
  tempoSintomas: string;
  sono: string;
  horasSono: string;
  energia: string;
  humor: string;
  organismo: string[];
  atividadeFisica: string;
  agua: string;
  sol: string;
  historico: string[];
  historicoNotas: string;
  saudeNota: number;
  confirmacao: boolean;
}

const initialData: GeralData = {
  name: "",
  birthdate: "",
  phone: "",
  email: "",
  motivo: "",
  tempoSintomas: "",
  sono: "",
  horasSono: "8",
  energia: "",
  humor: "",
  organismo: [],
  atividadeFisica: "",
  agua: "",
  sol: "",
  historico: [],
  historicoNotas: "",
  saudeNota: 5,
  confirmacao: false,
};

const organismoOptions = [
  "Intestino regular",
  "Constipação",
  "Refluxo",
  "Azia",
  "Má digestão",
  "Queda de cabelo",
  "Unhas fracas",
  "Sensibilidade ao frio",
];

const historicoOptions = [
  "Diabetes",
  "Hipertensão",
  "Tireoide",
  "Cardiopatias",
  "Câncer",
  "Cirurgias",
  "Uso contínuo de medicamentos",
  "Nenhum dos anteriores",
];

export default function PreConsultaGeral() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<GeralData>(initialData);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const totalSteps = 5;

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.phone)) {
      toast.error("Por favor, preencha Nome e Telefone.");
      return;
    }
    if (step === 2 && !formData.motivo) {
      toast.error("Por favor, relate o principal motivo da sua consulta.");
      return;
    }

    if (step < totalSteps) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCheckboxToggle = (field: "organismo" | "historico", value: string) => {
    setFormData((prev) => {
      const current = prev[field];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  const handleSubmit = () => {
    if (!formData.confirmacao) {
      toast.error("Você precisa confirmar que as informações fornecidas são verdadeiras.");
      return;
    }

    const lines = [
      `📋 *PRÉ-CONSULTA MÉDICA — Saúde Geral*`,
      ``,
      `👤 *DADOS PESSOAIS*`,
      `Nome: ${formData.name}`,
      `Nasc.: ${formData.birthdate || "Não informado"}`,
      `Tel: ${formData.phone}`,
      `E-mail: ${formData.email || "Não informado"}`,
      ``,
      `🎯 *MOTIVO DA CONSULTA*`,
      `${formData.motivo}`,
      `Tempo de sintomas: ${formData.tempoSintomas || "Não respondido"}`,
      ``,
      `🧬 *ORGANISMO*`,
      `Sintomas: ${formData.organismo.length > 0 ? formData.organismo.join(", ") : "Nenhum"}`,
      ``,
      `🏃 *ESTILO DE VIDA*`,
      `Sono: ${formData.sono || "Não respondido"} (${formData.horasSono}h)`,
      `Energia: ${formData.energia || "Não respondido"}`,
      `Humor: ${formData.humor || "Não respondido"}`,
      `Atividade física: ${formData.atividadeFisica || "Não respondido"}`,
      `Água: ${formData.agua || "Não respondido"}`,
      `Sol: ${formData.sol || "Não respondido"}`,
      ``,
      `🏥 *HISTÓRICO DE SAÚDE*`,
      `Histórico: ${formData.historico.length > 0 ? formData.historico.join(", ") : "Nenhum"}`,
      `Obs.: ${formData.historicoNotas || "Sem observações"}`,
      `Autoavaliação: ${formData.saudeNota}/10`,
      ``,
      `✅ Declaro que todas as informações são verdadeiras.`,
    ];

    const msg = lines.join("\n");
    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setCompleted(true);

    // Salva no banco em segundo plano (silencioso — não bloqueia e não exibe erro)
    submitPreConsulta({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      objective: "Geral",
      message: msg,
    }).catch(() => {/* ignorado — banco é backup, WhatsApp é primário */});
  };

  if (completed) {
    return (
      <div className="max-w-5xl mx-auto rounded-[32px] bg-white border border-border/40 shadow-premium p-8 sm:p-16 text-center">
        <div className="w-16 h-16 bg-[#FAF6F2] text-primary rounded-full flex items-center justify-center mx-auto mb-8 border border-border/30">
          <Check className="w-8 h-8" strokeWidth={2.5} />
        </div>
        <h2 className="font-serif text-3xl font-medium text-foreground mb-4">
          Obrigado!
        </h2>
        <p className="font-sans text-sm text-foreground/80 leading-relaxed max-w-md mx-auto mb-8">
          Essas informações foram salvas com segurança e ajudarão a Dra. Danielly a compreender melhor seu histórico clínico antes mesmo da sua consulta começar.
        </p>
        <Link href="/" className="btn-primary px-8">
          Voltar para o Início
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-[620px] w-full bg-white rounded-[32px] border border-border/40 shadow-premium overflow-hidden">
      
      {/* Sidebar Esquerda (Creme) */}
      <div className="lg:w-1/3 bg-[#FAF6F2] p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border/20">
        <div>
          {/* Logo DL */}
          <div className="relative w-32 h-10 mb-4">
            <Image 
              src="/LOGODL.png" 
              alt="Logo Dra. Danielly Lubian" 
              fill 
              className="object-contain object-left" 
              sizes="(max-width: 768px) 112px, 112px"
              priority
            />
          </div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-primary/20 shadow-sm shrink-0">
              <Image 
                src="/perfil02_v2.jpeg" 
                alt="Dra. Danielly Lubian Bertiel" 
                fill 
                className="object-cover object-top" 
                sizes="48px"
              />
            </div>
            <div>
              <span className="block font-serif text-sm font-bold text-primary leading-tight">
                Dra. Danielly Lubian Bertiel
              </span>
              <span className="block font-sans text-[10px] tracking-wider text-muted uppercase">
                Médica • CRM-SC 33815
              </span>
            </div>
          </div>
          
          <div className="h-[1px] bg-border/20 w-full mb-6" />
          
          <span className="block font-serif text-xs font-bold text-primary uppercase tracking-wider mb-2">
            Pré-Consulta Geral
          </span>
          <p className="font-sans text-xs text-muted leading-relaxed mb-8">
            Formulário clínico para coleta de informações básicas antes do seu atendimento. Todas as respostas são confidenciais.
          </p>
        </div>

        <div>
          {/* Progresso */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="font-sans text-[10px] font-bold text-muted uppercase tracking-wider">
                Progresso
              </span>
              <span className="font-sans text-xs text-primary font-bold">
                {step}/{totalSteps}
              </span>
            </div>
            <div className="w-full h-1 bg-border/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Lista de Etapas */}
          <div className="flex flex-col gap-3.5">
            {[
              { id: 1, label: "Identificação" },
              { id: 2, label: "Motivo da consulta" },
              { id: 3, label: "Sintomas e organismo" },
              { id: 4, label: "Estilo de vida e rotina" },
              { id: 5, label: "Histórico de saúde" }
            ].map((s) => {
              const isActive = step === s.id;
              const isCompleted = step > s.id;
              return (
                <div key={s.id} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isActive 
                      ? "bg-primary text-white scale-110 shadow-sm"
                      : isCompleted
                        ? "bg-primary/20 text-primary"
                        : "border border-border text-muted bg-white"
                  }`}>
                    {isCompleted ? "✓" : s.id}
                  </div>
                  <span className={`font-sans text-xs lg:text-[13px] transition-colors ${
                    isActive ? "text-foreground font-semibold" : "text-muted"
                  }`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Conteúdo Principal Direito (Branco) */}
      <div className="lg:w-2/3 p-8 sm:p-12 flex flex-col justify-between bg-white">
        <div>
          {/* Badge superior */}
          <div className="mb-6">
            <span className="inline-block bg-[#FAF6F2] border border-border/30 text-primary font-sans text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">
              Formulário Médico
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="min-h-[360px]"
            >
              {/* STEP 1: Identificação */}
              {step === 1 && (
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-foreground font-medium mb-2">
                    Identificação do Paciente
                  </h2>
                  <p className="font-sans text-xs text-muted leading-relaxed mb-6">
                    Preencha suas informações básicas para iniciarmos o prontuário da sua pré-consulta.
                  </p>
                  <div className="h-[1px] bg-border/10 w-full mb-6" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase">Nome completo *</label>
                      <input
                        type="text"
                        placeholder="Nome completo"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="border border-border focus:ring-1 focus:ring-primary/45 rounded-xl px-4 py-2.5 bg-[#FAF6F2]/10 outline-none transition-all font-sans text-sm text-foreground"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase">Data de nascimento</label>
                      <input
                        type="date"
                        value={formData.birthdate}
                        onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                        className="border border-border focus:ring-1 focus:ring-primary/45 rounded-xl px-4 py-2.5 bg-[#FAF6F2]/10 outline-none transition-all font-sans text-sm text-foreground"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase">Telefone (WhatsApp) *</label>
                      <input
                        type="tel"
                        placeholder="(00) 90000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="border border-border focus:ring-1 focus:ring-primary/45 rounded-xl px-4 py-2.5 bg-[#FAF6F2]/10 outline-none transition-all font-sans text-sm text-foreground"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase">E-mail</label>
                      <input
                        type="email"
                        placeholder="seuemail@exemplo.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="border border-border focus:ring-1 focus:ring-primary/45 rounded-xl px-4 py-2.5 bg-[#FAF6F2]/10 outline-none transition-all font-sans text-sm text-foreground"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Motivo da consulta */}
              {step === 2 && (
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-foreground font-medium mb-2">
                    Motivo da consulta
                  </h2>
                  <p className="font-sans text-xs text-muted leading-relaxed mb-6">
                    Conte-nos sobre o que motivou seu agendamento e o tempo de duração.
                  </p>
                  <div className="h-[1px] bg-border/10 w-full mb-6" />

                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase">O que motivou seu agendamento? *</label>
                      <textarea
                        rows={4}
                        placeholder="Relate sintomas, dores ou o principal objetivo desta consulta..."
                        value={formData.motivo}
                        onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                        className="border border-border focus:ring-1 focus:ring-primary/45 rounded-xl px-4 py-2.5 bg-[#FAF6F2]/10 outline-none transition-all font-sans text-sm text-foreground resize-none"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase">Há quanto tempo isso acontece?</label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Menos de 1 mês", "Entre 1 e 6 meses", "Mais de 6 meses", "Não sei informar"].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setFormData({ ...formData, tempoSintomas: option })}
                            className={`font-sans text-xs px-4 py-2.5 rounded-xl border text-center transition-all ${
                              formData.tempoSintomas === option
                                ? "border-primary bg-primary/5 text-primary font-medium"
                                : "border-border hover:bg-neutral-50 text-foreground"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Sintomas e organismo */}
              {step === 3 && (
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-foreground font-medium mb-2">
                    Sintomas e organismo
                  </h2>
                  <p className="font-sans text-xs text-muted leading-relaxed mb-6">
                    Selecione todos os sintomas físicos ou digestivos que você apresenta com frequência.
                  </p>
                  <div className="h-[1px] bg-border/10 w-full mb-6" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {organismoOptions.map((option) => {
                      const isSelected = formData.organismo.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleCheckboxToggle("organismo", option)}
                          className={`font-sans text-xs px-4 py-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                            isSelected
                              ? "border-primary bg-primary/5 text-primary font-medium"
                              : "border-border hover:bg-neutral-50 text-foreground"
                          }`}
                        >
                          <span>{option}</span>
                          <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-colors ${
                            isSelected ? "bg-primary border-primary text-white" : "border-border bg-white"
                          }`}>
                            {isSelected && <Check className="w-3 h-3" strokeWidth={3} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: Estilo de vida e rotina */}
              {step === 4 && (
                <div>
                  <h2 className="font-serif text-2xl text-foreground font-medium mb-2">
                    Estilo de vida e rotina
                  </h2>
                  <p className="font-sans text-xs text-muted mb-6">
                    Detalhes sobre o seu sono, atividade física e hábitos diários.
                  </p>
                  <div className="h-[1px] bg-border/10 w-full mb-6" />

                  <div className="flex flex-col gap-5 overflow-y-auto max-h-[380px] pr-2">
                    {/* Sono */}
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase">Qualidade do Sono</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Durmo bem", "Dificuldade para dormir", "Acordo no meio da noite"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData({ ...formData, sono: opt })}
                            className={`font-sans text-[10px] py-2 rounded-xl border text-center transition-all ${
                              formData.sono === opt
                                ? "border-primary bg-primary/5 text-primary font-medium"
                                : "border-border hover:bg-neutral-50 text-foreground"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Horas de Sono */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase">Horas de sono por noite</label>
                      <input
                        type="number"
                        min={1}
                        max={24}
                        value={formData.horasSono}
                        onChange={(e) => setFormData({ ...formData, horasSono: e.target.value })}
                        className="border border-border focus:ring-1 focus:ring-primary/45 rounded-xl px-4 py-2.5 bg-[#FAF6F2]/10 outline-none transition-all font-sans text-sm text-foreground max-w-[100px]"
                      />
                    </div>

                    {/* Energia */}
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase">Como é sua disposição/energia diária?</label>
                      <div className="grid grid-cols-4 gap-2">
                        {["Excelente", "Boa", "Regular", "Baixa / Fadiga"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData({ ...formData, energia: opt })}
                            className={`font-sans text-xs py-2 rounded-xl border text-center transition-all ${
                              formData.energia === opt
                                ? "border-primary bg-primary/5 text-primary font-medium"
                                : "border-border hover:bg-neutral-50 text-foreground"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Humor */}
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase">Humor nas últimas semanas</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Estável", "Ansioso / Estressado", "Instável / Oscilante"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData({ ...formData, humor: opt })}
                            className={`font-sans text-[10px] py-2.5 rounded-xl border text-center transition-all ${
                              formData.humor === opt
                                ? "border-primary bg-primary/5 text-primary font-medium"
                                : "border-border hover:bg-neutral-50 text-foreground"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Atividade Física */}
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase">Prática de atividade física</label>
                      <div className="grid grid-cols-4 gap-2">
                        {["Não pratico", "Até 2 vezes por semana", "3 a 5 vezes por semana", "Diariamente"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData({ ...formData, atividadeFisica: opt })}
                            className={`font-sans text-[10px] py-2 rounded-xl border text-center transition-all ${
                              formData.atividadeFisica === opt
                                ? "border-primary bg-primary/5 text-primary font-medium"
                                : "border-border hover:bg-neutral-50 text-foreground"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Água */}
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase">Consumo diário de água</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Menos de 1,5 litros", "1,5 a 2 litros", "Mais de 2 litros"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData({ ...formData, agua: opt })}
                            className={`font-sans text-xs py-2 rounded-xl border text-center transition-all ${
                              formData.agua === opt
                                ? "border-primary bg-primary/5 text-primary font-medium"
                                : "border-border hover:bg-neutral-50 text-foreground"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sol */}
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase">Exposição solar regular</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Nunca", "Algumas vezes", "Frequentemente"].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData({ ...formData, sol: opt })}
                            className={`font-sans text-xs py-2 rounded-xl border text-center transition-all ${
                              formData.sol === opt
                                ? "border-primary bg-primary/5 text-primary font-medium"
                                : "border-border hover:bg-neutral-50 text-foreground"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* STEP 5: Histórico de saúde */}
              {step === 5 && (
                <div>
                  <h2 className="font-serif text-2xl text-foreground font-medium mb-2">
                    Histórico de saúde
                  </h2>
                  <p className="font-sans text-xs text-muted mb-6">
                    Última etapa! Informe diagnósticos prévios e finalize o envio.
                  </p>
                  <div className="h-[1px] bg-border/10 w-full mb-6" />

                  <div className="flex flex-col gap-5 pb-4">
                    {/* Checklist Histórico */}
                    <div>
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase block mb-3">Histórico pessoal:</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {historicoOptions.map((option) => {
                          const isSelected = formData.historico.includes(option);
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleCheckboxToggle("historico", option)}
                              className={`font-sans text-xs px-4 py-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                                isSelected
                                  ? "border-primary bg-primary/5 text-primary font-medium"
                                  : "border-border hover:bg-neutral-50 text-foreground"
                              }`}
                            >
                              <span>{option}</span>
                              <div className={`w-4.5 h-4.5 rounded border flex items-center justify-center transition-colors ${
                                isSelected ? "bg-primary border-primary text-white" : "border-border bg-white"
                              }`}>
                                {isSelected && <Check className="w-3 h-3" strokeWidth={3} />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Notas do Histórico */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase">Uso de medicamentos ou observações relevantes:</label>
                      <textarea
                        rows={2}
                        placeholder="Relate medicamentos de uso contínuo, alergias ou cirurgias anteriores..."
                        value={formData.historicoNotas}
                        onChange={(e) => setFormData({ ...formData, historicoNotas: e.target.value })}
                        className="border border-border focus:ring-1 focus:ring-primary/45 rounded-xl px-4 py-2.5 bg-[#FAF6F2]/10 outline-none transition-all font-sans text-sm text-foreground resize-none"
                      />
                    </div>

                    {/* Autoavaliação */}
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase">Como você avalia sua saúde hoje? ({formData.saudeNota}/10)</label>
                      <input
                        type="range"
                        min={0}
                        max={10}
                        step={1}
                        value={formData.saudeNota}
                        onChange={(e) => setFormData({ ...formData, saudeNota: parseInt(e.target.value) })}
                        className="w-full accent-primary h-2 bg-border/50 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Confirmação */}
                    <div className="bg-[#FAF6F2] p-4 rounded-xl border border-border/20 mt-2">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={formData.confirmacao}
                          onChange={(e) => setFormData({ ...formData, confirmacao: e.target.checked })}
                          className="mt-0.5 accent-primary w-4 h-4 rounded border-border focus:ring-primary/20"
                        />
                        <span className="font-sans text-xs text-foreground/80 leading-tight">
                          Declaro que todas as informações prestadas são verdadeiras.
                        </span>
                      </label>
                    </div>

                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Botoes de Ação */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-border/20">
            <button
              type="button"
              onClick={handleBack}
              className={`flex items-center gap-2 font-sans text-xs font-bold text-muted hover:text-foreground transition-colors ${
                step === 1 ? "invisible" : ""
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar
            </button>

            {step < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-primary flex items-center gap-2 font-sans text-xs py-2 px-6 rounded-full"
              >
                Continuar
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={loading}
                onClick={handleSubmit}
                className="btn-primary flex items-center gap-2 font-sans text-xs py-2 px-6 rounded-full disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Enviar Pré-Consulta"}
                <Check className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
