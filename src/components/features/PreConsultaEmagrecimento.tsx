"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { submitPreConsulta } from "@/app/pre-consulta/actions";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

const WHATSAPP_NUMBER = "554791129634";

interface EmagrecimentoData {
  name: string;
  birthdate: string;
  cpf: string;
  areaAtuacao: string;
  altura: string;
  peso: string;
  phone: string;
  email: string;
  objetivo: string;
  metaKg: number;
  historicoTentativas: string[];
  comportamento: { [key: string]: number }; // 1 to 5 values
  saudeProblemas: string[];
  dificuldade: string;
  confirmacao: boolean;
}

const initialData: EmagrecimentoData = {
  name: "",
  birthdate: "",
  cpf: "",
  areaAtuacao: "",
  altura: "",
  peso: "",
  phone: "",
  email: "",
  objetivo: "",
  metaKg: 10,
  historicoTentativas: [],
  comportamento: {
    ansiedade: 3,
    belisco: 3,
    dificuldadeParar: 3,
    comerRapido: 3,
    puloRefeicoes: 3,
    horasSemComer: 3,
    mesmoSemFome: 3,
    tristeEstressado: 3,
  },
  saudeProblemas: [],
  dificuldade: "",
  confirmacao: false,
};

const objetivoOptions = [
  "Emagrecimento",
  "Redução de gordura localizada",
  "Melhora da saúde e longevidade",
  "Melhora da composição corporal",
  "Outro objetivo",
];

const tentativaOptions = [
  "Dietas por conta própria",
  "Prática de atividade física",
  "Acompanhamento nutricional anterior",
  "Uso de medicamentos para emagrecer",
  "Cirurgia bariátrica ou procedimentos estéticos",
];

const saudeOptions = [
  "Diabetes",
  "Hipertensão",
  "Alterações hormonais",
  "Tireoide",
  "Lipedema",
  "Síndrome do Ovário Policístico (SOP)",
  "Anemia",
  "Refluxo",
  "Constipação",
  "Queda de cabelo",
  "Nenhum dos anteriores",
];

const comportamentoStatements = [
  { key: "ansiedade", label: "Como por ansiedade." },
  { key: "belisco", label: "Belisco entre as refeições." },
  { key: "dificuldadeParar", label: "Tenho dificuldade para interromper a refeição / parar de comer." },
  { key: "comerRapido", label: "Como de forma rápida / mastigo pouco." },
  { key: "puloRefeicoes", label: "Costumo pular refeições." },
  { key: "horasSemComer", label: "Fico longos períodos sem comer." },
  { key: "mesmoSemFome", label: "Como mesmo sem sentir fome física." },
  { key: "tristeEstressado", label: "Como para aliviar tristeza, estresse ou frustração." },
];

const frequenciaOptions = [
  { label: "Nunca", value: 1 },
  { label: "Raramente", value: 2 },
  { label: "Às vezes", value: 3 },
  { label: "Frequentemente", value: 4 },
  { label: "Sempre", value: 5 },
];

export default function PreConsultaEmagrecimento() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<EmagrecimentoData>(initialData);
  const [statementIndex, setStatementIndex] = useState(0); // Sub-stepper inside Comportamento 1 & 2
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const totalSteps = 5;

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.phone || !formData.birthdate || !formData.cpf)) {
      toast.error("Por favor, preencha Nome, Data de Nascimento, CPF e Telefone.");
      return;
    }
    if (step === 2 && (!formData.objetivo || formData.historicoTentativas.length === 0)) {
      toast.error("Por favor, preencha o seu objetivo e selecione suas tentativas anteriores.");
      return;
    }

    if (step < totalSteps) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (step === 3 && statementIndex > 0) {
      setStatementIndex((prev) => prev - 1);
    } else if (step === 4 && statementIndex > 4) {
      setStatementIndex((prev) => prev - 1);
    } else if (step > 1) {
      setStep((prev) => prev - 1);
      if (step === 4) {
        setStatementIndex(3); // Reset to last index of Step 3
      } else if (step === 5) {
        setStatementIndex(7); // Reset to last index of Step 4
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleFrequenciaSelect = (value: number) => {
    const currentStatement = comportamentoStatements[statementIndex];
    setFormData((prev) => ({
      ...prev,
      comportamento: {
        ...prev.comportamento,
        [currentStatement.key]: value,
      },
    }));

    if (step === 3) {
      if (statementIndex < 3) {
        setTimeout(() => {
          setStatementIndex((prev) => prev + 1);
        }, 220);
      } else {
        setTimeout(() => {
          setStep(4);
          setStatementIndex(4);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 220);
      }
    } else if (step === 4) {
      if (statementIndex < 7) {
        setTimeout(() => {
          setStatementIndex((prev) => prev + 1);
        }, 220);
      } else {
        setTimeout(() => {
          setStep(5);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 220);
      }
    }
  };

  const handleTentativaToggle = (option: string) => {
    setFormData((prev) => {
      const current = prev.historicoTentativas;
      const updated = current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option];
      return { ...prev, historicoTentativas: updated };
    });
  };

  const handleSaudeToggle = (option: string) => {
    setFormData((prev) => {
      const current = prev.saudeProblemas;
      const updated = current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option];
      return { ...prev, saudeProblemas: updated };
    });
  };

  // Algorithm to calculate predominant eating behavior profile
  const getEatingProfile = () => {
    const { comportamento } = formData;
    const scoreEmocional = (comportamento.ansiedade + comportamento.tristeEstressado) / 2;
    const scoreBelisco = comportamento.belisco;
    const scoreCompulsivo = (comportamento.dificuldadeParar + comportamento.comerRapido + comportamento.mesmoSemFome) / 3;
    const scoreRestritivo = (comportamento.puloRefeicoes + comportamento.horasSemComer) / 2;

    const scores = [
      { name: "Comportamento alimentar emocional / ansioso", score: scoreEmocional, desc: "Você tende a usar a alimentação como uma válvula de escape para lidar com sentimentos de ansiedade, estresse ou tristeza. Identificar esses gatilhos emocionais é o primeiro passo para desenvolver uma relação mais saudável com a comida." },
      { name: "Comportamento beliscador (ingestão fracionada)", score: scoreBelisco, desc: "Você costuma consumir pequenas porções de alimentos repetidamente ao longo do dia, muitas vezes de forma inconsciente. Esse hábito de beliscar impede que os níveis de insulina abaixem, dificultando o emagrecimento." },
      { name: "Comportamento hiperfágico / velocidade de ingestão", score: scoreCompulsivo, desc: "Você tende a comer com velocidade e tem dificuldade para perceber os sinais de saciedade do corpo, muitas vezes comendo até se sentir cheia. Mastigar mais devagar e praticar o comer consciente trará ótimos resultados." },
      { name: "Comportamento restritivo / padrão irregular", score: scoreRestritivo, desc: "Você costuma pular refeições ou ficar longos períodos sem comer, o que pode levar a episódios de fome excessiva posterior e desaceleração metabólica. Regularizar os horários das refeições ajudará a estabilizar seu metabolismo." }
    ];

    scores.sort((a, b) => b.score - a.score);
    return scores[0];
  };

  const handleSubmit = () => {
    if (!formData.confirmacao) {
      toast.error("Por favor, confirme que as declarações são verdadeiras.");
      return;
    }

    const profile = getEatingProfile();

    const comportamentoLinhas = comportamentoStatements.map((st) => {
      const val = formData.comportamento[st.key];
      const labelVal = frequenciaOptions.find((o) => o.value === val)?.label || "Não respondido";
      return `${st.label}: ${labelVal}`;
    });

    const lines = [
      `🍃 *PRÉ-CONSULTA DE EMAGRECIMENTO*`,
      ``,
      `👤 *IDENTIFICAÇÃO*`,
      `Nome: ${formData.name}`,
      `Nasc.: ${formData.birthdate}`,
      `CPF: ${formData.cpf}`,
      `Tel: ${formData.phone}`,
      `E-mail: ${formData.email || "Não informado"}`,
      `Área de atuação: ${formData.areaAtuacao || "Não informada"}`,
      `Altura: ${formData.altura || "Não informada"}`,
      `Peso atual: ${formData.peso || "Não informado"}`,
      ``,
      `🎯 *OBJETIVO E SAÚDE*`,
      `Objetivo: ${formData.objetivo}`,
      `Meta: ${formData.metaKg >= 20 ? "Mais de 20 kg" : `${formData.metaKg} kg`}`,
      `Tentativas anteriores: ${formData.historicoTentativas.join(", ")}`,
      `Condições de saúde: ${formData.saudeProblemas.length > 0 ? formData.saudeProblemas.join(", ") : "Nenhuma"}`,
      ``,
      `🍽️ *COMPORTAMENTO ALIMENTAR*`,
      ...comportamentoLinhas,
      ``,
      `📊 *PERFIL PREDOMINANTE*`,
      `${profile.name}`,
      ``,
      `📝 *REFLEXÃO*`,
      `O que dificulta o emagrecimento: ${formData.dificuldade || "Não respondido"}`,
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
      objective: "Emagrecimento",
      message: msg,
    }).catch(() => {/* ignorado — banco é backup, WhatsApp é primário */});
  };

  const profile = getEatingProfile();

  if (completed) {
    return (
      <div className="max-w-5xl mx-auto rounded-[32px] bg-white border border-border/40 shadow-premium p-8 sm:p-16 text-center">
        <div className="w-16 h-16 bg-[#FAF6F2] text-primary rounded-full flex items-center justify-center mx-auto mb-8 border border-border/30">
          <Check className="w-8 h-8" strokeWidth={2.5} />
        </div>
        <h2 className="font-serif text-3xl font-medium text-foreground mb-4">
          Pré-consulta Concluída!
        </h2>
        <div className="max-w-xl mx-auto bg-[#FAF6F2] border border-border/30 p-6 rounded-2xl mb-8 text-left">
          <p className="font-sans text-xs font-bold text-primary uppercase tracking-wider mb-2">Perfil Alimentar Estimado</p>
          <h4 className="font-serif text-lg font-bold text-foreground mb-2">{profile.name}</h4>
          <p className="font-sans text-xs leading-relaxed text-foreground/80">{profile.desc}</p>
        </div>
        <p className="font-sans text-sm text-foreground/80 leading-relaxed max-w-md mx-auto mb-8">
          Suas respostas foram enviadas e serão analisadas pela equipe médica antes da sua consulta. Isso garantirá um atendimento altamente personalizado.
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
          
          {/* Foto e CRM da Dra */}
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
            Pré-Consulta de Emagrecimento
          </span>
          <p className="font-sans text-xs text-muted leading-relaxed mb-8">
            Formulário inicial para coleta de informações. Ao final, o sistema calcula automaticamente o perfil predominante do comportamento alimentar.
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
              { id: 2, label: "Objetivo e saúde" },
              { id: 3, label: "Comportamento alimentar I" },
              { id: 4, label: "Comportamento alimentar II" },
              { id: 5, label: "Resultado final" }
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
              key={step + "-" + statementIndex}
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
                    Pré-consulta de emagrecimento
                  </h2>
                  <p className="font-sans text-xs text-muted leading-relaxed mb-6">
                    Responda com calma. Quanto mais detalhado, melhor será o entendimento inicial do seu caso. Ao final, você verá um resultado com base na sua pontuação de comportamento alimentar.
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
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase">Data de nascimento *</label>
                      <input
                        type="date"
                        value={formData.birthdate}
                        onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                        className="border border-border focus:ring-1 focus:ring-primary/45 rounded-xl px-4 py-2.5 bg-[#FAF6F2]/10 outline-none transition-all font-sans text-sm text-foreground"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase">CPF *</label>
                      <input
                        type="text"
                        placeholder="000.000.000-00"
                        value={formData.cpf}
                        onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                        className="border border-border focus:ring-1 focus:ring-primary/45 rounded-xl px-4 py-2.5 bg-[#FAF6F2]/10 outline-none transition-all font-sans text-sm text-foreground"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase">Área de atuação</label>
                      <input
                        type="text"
                        placeholder="Opcional"
                        value={formData.areaAtuacao}
                        onChange={(e) => setFormData({ ...formData, areaAtuacao: e.target.value })}
                        className="border border-border focus:ring-1 focus:ring-primary/45 rounded-xl px-4 py-2.5 bg-[#FAF6F2]/10 outline-none transition-all font-sans text-sm text-foreground"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase">Altura aproximada</label>
                      <input
                        type="text"
                        placeholder="Ex: 1,65 m"
                        value={formData.altura}
                        onChange={(e) => setFormData({ ...formData, altura: e.target.value })}
                        className="border border-border focus:ring-1 focus:ring-primary/45 rounded-xl px-4 py-2.5 bg-[#FAF6F2]/10 outline-none transition-all font-sans text-sm text-foreground"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase">Peso atual</label>
                      <input
                        type="text"
                        placeholder="Ex: 72 kg"
                        value={formData.peso}
                        onChange={(e) => setFormData({ ...formData, peso: e.target.value })}
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

              {/* STEP 2: Objetivo e saúde */}
              {step === 2 && (
                <div>
                  <h2 className="font-serif text-2xl text-foreground font-medium mb-2">
                    Objetivo e saúde
                  </h2>
                  <p className="font-sans text-xs text-muted mb-6">
                    Selecione suas metas de perda de peso e histórico de saúde geral.
                  </p>
                  <div className="h-[1px] bg-border/10 w-full mb-6" />

                  <div className="flex flex-col gap-6">
                    {/* O que busca */}
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase">O que você busca nesse momento?</label>
                      <div className="flex flex-wrap gap-2">
                        {objetivoOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData({ ...formData, objetivo: opt })}
                            className={`font-sans text-xs px-4 py-2.5 rounded-xl border text-center transition-all ${
                              formData.objetivo === opt
                                ? "border-primary bg-primary/5 text-primary font-medium"
                                : "border-border hover:bg-neutral-50 text-foreground"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Meta Kg */}
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase">Quantos kg deseja perder? ({formData.metaKg >= 20 ? "20+" : formData.metaKg} kg)</label>
                      <input
                        type="range"
                        min={0}
                        max={20}
                        step={1}
                        value={formData.metaKg}
                        onChange={(e) => setFormData({ ...formData, metaKg: parseInt(e.target.value) })}
                        className="w-full accent-primary h-2 bg-border/50 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] font-sans text-muted">
                        <span>0 kg</span>
                        <span>10 kg</span>
                        <span>20+ kg</span>
                      </div>
                    </div>

                    {/* Tentativas */}
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase">Já tentou emagrecer anteriormente? (Selecione todas aplicáveis)</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {tentativaOptions.map((opt) => {
                          const isSelected = formData.historicoTentativas.includes(opt);
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleTentativaToggle(opt)}
                              className={`font-sans text-xs px-4 py-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                                isSelected
                                  ? "border-primary bg-primary/5 text-primary font-medium"
                                  : "border-border hover:bg-neutral-50 text-foreground"
                              }`}
                            >
                              <span>{opt}</span>
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

                    {/* Saúde */}
                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase">Histórico de saúde e sintomas:</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {saudeOptions.map((opt) => {
                          const isSelected = formData.saudeProblemas.includes(opt);
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleSaudeToggle(opt)}
                              className={`font-sans text-[11px] px-3 py-2 rounded-xl border text-center transition-all ${
                                isSelected
                                  ? "border-primary bg-primary/5 text-primary font-medium"
                                  : "border-border hover:bg-neutral-50 text-foreground"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* STEP 3: Comportamento alimentar I */}
              {step === 3 && (
                <div>
                  <h2 className="font-serif text-2xl text-foreground font-medium mb-2">
                    Comportamento alimentar I
                  </h2>
                  <p className="font-sans text-xs text-muted mb-8">
                    Avaliação rápida de comportamento. Selecione a frequência para a afirmação abaixo:
                  </p>
                  <div className="h-[1px] bg-border/10 w-full mb-8" />

                  <div className="bg-[#FAF6F2] p-8 rounded-2xl border border-border/30 text-center mb-8">
                    <span className="inline-block bg-primary/10 text-primary font-sans text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
                      Afirmação {statementIndex + 1} de 4
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-foreground font-medium mb-0 min-h-[50px] flex items-center justify-center">
                      &ldquo;{comportamentoStatements[statementIndex].label}&rdquo;
                    </h3>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 max-w-2xl mx-auto">
                    {frequenciaOptions.map((opt) => {
                      const currentKey = comportamentoStatements[statementIndex].key;
                      const isSelected = formData.comportamento[currentKey] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleFrequenciaSelect(opt.value)}
                          className={`font-sans text-xs py-3.5 px-3 rounded-xl border text-center flex-1 transition-all ${
                            isSelected
                              ? "border-primary bg-primary/5 text-primary font-bold shadow-sm"
                              : "border-border hover:bg-neutral-50 text-foreground"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: Comportamento alimentar II */}
              {step === 4 && (
                <div>
                  <h2 className="font-serif text-2xl text-foreground font-medium mb-2">
                    Comportamento alimentar II
                  </h2>
                  <p className="font-sans text-xs text-muted mb-8">
                    Quase lá! Responda à afirmação a seguir para finalizarmos o perfil:
                  </p>
                  <div className="h-[1px] bg-border/10 w-full mb-8" />

                  <div className="bg-[#FAF6F2] p-8 rounded-2xl border border-border/30 text-center mb-8">
                    <span className="inline-block bg-primary/10 text-primary font-sans text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
                      Afirmação {statementIndex + 1} de 8
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-foreground font-medium mb-0 min-h-[50px] flex items-center justify-center">
                      &ldquo;{comportamentoStatements[statementIndex].label}&rdquo;
                    </h3>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5 max-w-2xl mx-auto">
                    {frequenciaOptions.map((opt) => {
                      const currentKey = comportamentoStatements[statementIndex].key;
                      const isSelected = formData.comportamento[currentKey] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleFrequenciaSelect(opt.value)}
                          className={`font-sans text-xs py-3.5 px-3 rounded-xl border text-center flex-1 transition-all ${
                            isSelected
                              ? "border-primary bg-primary/5 text-primary font-bold shadow-sm"
                              : "border-border hover:bg-neutral-50 text-foreground"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 5: Resultado final */}
              {step === 5 && (
                <div>
                  <h2 className="font-serif text-2xl text-foreground font-medium mb-2">
                    Resultado e Envio
                  </h2>
                  <p className="font-sans text-xs text-muted mb-6">
                    Abaixo está a prévia do seu comportamento alimentar principal. Preencha a última resposta para enviar.
                  </p>
                  <div className="h-[1px] bg-border/10 w-full mb-6" />

                  <div className="flex flex-col gap-6">
                    {/* Perfil Alimentar Box */}
                    <div className="bg-[#FAF6F2] border border-border/30 p-5 rounded-2xl">
                      <span className="inline-block bg-primary/10 text-primary font-sans text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-2">
                        Perfil Estimado
                      </span>
                      <h4 className="font-serif text-lg font-bold text-foreground mb-1">{profile.name}</h4>
                      <p className="font-sans text-xs leading-relaxed text-foreground/80">{profile.desc}</p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[10px] font-bold text-foreground/80 uppercase">O que você acredita ser o maior obstáculo para o seu emagrecimento atualmente? *</label>
                      <textarea
                        rows={3}
                        placeholder="Ex: Ansiedade, falta de rotina, preferência por doces, compulsão noturna..."
                        value={formData.dificuldade}
                        onChange={(e) => setFormData({ ...formData, dificuldade: e.target.value })}
                        className="border border-border focus:ring-1 focus:ring-primary/45 rounded-xl px-4 py-2.5 bg-[#FAF6F2]/10 outline-none transition-all font-sans text-sm text-foreground resize-none"
                      />
                    </div>

                    <div className="bg-[#FAF6F2]/50 p-4 rounded-xl border border-border/20 mt-2">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={formData.confirmacao}
                          onChange={(e) => setFormData({ ...formData, confirmacao: e.target.checked })}
                          className="mt-0.5 accent-primary w-4 h-4 rounded border-border focus:ring-primary/20"
                        />
                        <span className="font-sans text-xs text-foreground/80 leading-tight">
                          Declaro que todas as informações prestadas são verdadeiras e completas.
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

            {step === 3 || step === 4 ? (
              // Step 3 & 4 have auto-advance, show informative note
              <span className="font-sans text-[10px] text-muted/50 italic">
                Selecione uma opção de frequência para avançar
              </span>
            ) : step < totalSteps ? (
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
