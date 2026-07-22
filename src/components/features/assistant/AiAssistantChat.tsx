"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { X, Send, PhoneCall } from "lucide-react";
import { ChatConfig, defaultChatConfig } from "./types";
import { ChatBubble } from "./ChatBubble";
import { TypingIndicator } from "./TypingIndicator";
import { AnalysisStep } from "./AnalysisStep";

interface MessageItem {
  id: string;
  sender: "assistant" | "user";
  text: string;
  timestamp: string;
}

interface AiAssistantChatProps {
  customConfig?: Partial<ChatConfig>;
}

export function AiAssistantChat({ customConfig }: AiAssistantChatProps) {
  const config: ChatConfig = {
    ...defaultChatConfig,
    ...customConfig,
    steps: customConfig?.steps || defaultChatConfig.steps,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getTimeString = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isAnalyzing]);

  useEffect(() => {
    if (!isTyping && isOpen && currentStepIndex >= 0 && currentStepIndex < config.steps.length) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isTyping, isOpen, currentStepIndex, config.steps.length]);

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            id: "msg-welcome",
            sender: "assistant",
            text: config.welcomeMessage,
            timestamp: getTimeString(),
          },
        ]);
      }, 500);
    }
  };

  const advanceToStep = (stepIdx: number, currentAnswers = answers) => {
    setCurrentStepIndex(stepIdx);
    setIsTyping(true);

    const delay = Math.floor(Math.random() * (900 - 500 + 1)) + 500;

    setTimeout(() => {
      setIsTyping(false);

      if (stepIdx < config.steps.length) {
        const step = config.steps[stepIdx];
        if (step.question) {
          let formattedQuestion = step.question;
          Object.keys(currentAnswers).forEach((key) => {
            formattedQuestion = formattedQuestion.replace(
              new RegExp(`{{${key}}}`, "g"),
              currentAnswers[key]
            );
          });

          setMessages((prev) => [
            ...prev,
            {
              id: `asst-step-${stepIdx}-${Date.now()}`,
              sender: "assistant",
              text: formattedQuestion,
              timestamp: getTimeString(),
            },
          ]);
        }
      } else {
        runAnalysisPhase(currentAnswers);
      }
    }, delay);
  };

  const runAnalysisPhase = (finalAnswers: Record<string, string>) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 33;
      });
    }, 350);

    setTimeout(() => {
      setIsAnalyzing(false);
      setIsFinished(true);

      const nome = finalAnswers["nome"] || finalAnswers["name"] || "";

      setMessages((prev) => [
        ...prev,
        {
          id: `asst-finish-${Date.now()}`,
          sender: "assistant",
          text: `Perfeito${nome ? `, ${nome}` : ""}.\n\nRecebemos suas informações.\n\nClique no botão abaixo para continuar seu atendimento com nossa equipe pelo WhatsApp.`,
          timestamp: getTimeString(),
        },
      ]);
    }, 1000);
  };

  const handleSendResponse = (textValue: string) => {
    const trimmed = textValue.trim();
    if (!trimmed || currentStepIndex < 0 || currentStepIndex >= config.steps.length) return;

    const currentStep = config.steps[currentStepIndex];

    const updatedAnswers = {
      ...answers,
      [currentStep.id]: trimmed,
    };
    setAnswers(updatedAnswers);

    setMessages((prev) => [
      ...prev,
      {
        id: `user-ans-${currentStep.id}-${Date.now()}`,
        sender: "user",
        text: trimmed,
        timestamp: getTimeString(),
      },
    ]);

    setInputValue("");
    advanceToStep(currentStepIndex + 1, updatedAnswers);
  };

  const formatPhoneMask = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits ? `(${digits}` : "";
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const step = config.steps[currentStepIndex];
    if (step && step.type === "phone") {
      setInputValue(formatPhoneMask(e.target.value));
    } else {
      setInputValue(e.target.value);
    }
  };

  const handleConnectWhatsApp = async () => {
    const nome = answers["nome"] || answers["name"] || "";
    const phone = answers["telefone"] || answers["phone"] || "";
    const motivo = answers["motivo"] || answers["duvida"] || answers["interesse"] || "";

    // 1. Envia os dados para a API salvar no Banco de Dados / Webhook
    try {
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nome, phone, reason: motivo }),
      }).catch(() => {});
    } catch (e) {
      // Falha silenciosa para não travar a experiência do usuário
    }

    // 2. Abre o WhatsApp com a mensagem formatada
    const fullMessage = `Olá! Meu nome é ${nome}, gostaria de informações sobre ${motivo}.`;
    const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const currentStep = currentStepIndex >= 0 && currentStepIndex < config.steps.length ? config.steps[currentStepIndex] : null;

  return (
    <>
      {/* BOTÃO FLUTUANTE VIBRANTE DE WHATSAPP */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 15 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2.5 sm:gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 sm:px-5 py-3 sm:py-3.5 rounded-full shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 border border-white/20 group max-w-[calc(100vw-2rem)]"
            aria-label="Falar no WhatsApp"
          >
            <div className="relative flex items-center justify-center shrink-0">
              <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-white drop-shadow-xs" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full" />
            </div>
            <span className="font-sans font-semibold text-[11px] sm:text-xs tracking-wide uppercase drop-shadow-xs truncate">
              Falar com o Consultório
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* CHAT COM SENSAÇÃO DE ATENDIMENTO HUMANO / RECEPÇÃO */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-2 right-2 left-2 sm:left-auto sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-1rem)] sm:w-[380px] h-[520px] max-h-[82vh] bg-[#FDFBF7] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E8D5C4] flex flex-col overflow-hidden font-sans"
          >
            {/* CABEÇALHO DA RECEPÇÃO */}
            <div className="px-5 py-3.5 bg-[#A15734] text-white flex items-center justify-between border-b border-[#8A482A]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-[#8A482A] border border-white/30 flex items-center justify-center p-1 relative">
                    <Image
                      src="/LOGODL.png"
                      alt="Logo DL"
                      width={22}
                      height={22}
                      className="object-contain filter brightness-0 invert"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 border border-[#A15734] rounded-full" />
                </div>
                <div>
                  <h3 className="font-serif font-medium text-xs tracking-wide text-white">
                    {config.assistantName}
                  </h3>
                  <p className="text-[10px] text-white/70 font-sans tracking-wider mt-0.5">
                    {config.assistantRole} • Online
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* HISTÓRICO DE MENSAGENS */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FDFBF7]">
              {messages.map((msg) => (
                <ChatBubble
                  key={msg.id}
                  sender={msg.sender}
                  text={msg.text}
                  timestamp={msg.timestamp}
                  assistantName={config.assistantName}
                />
              ))}

              {isTyping && <TypingIndicator />}
              {isAnalyzing && <AnalysisStep progress={analysisProgress} />}

              <div ref={messagesEndRef} />
            </div>

            {/* ENTRADA DE RESPOSTAS */}
            <div className="p-4 bg-[#FDFBF7] border-t border-[#E8D5C4]/70">
              {/* CAMPO DE TEXTO OU TELEFONE */}
              {currentStep && (currentStep.type === "text" || currentStep.type === "phone") && !isTyping && !isAnalyzing && !isFinished && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendResponse(inputValue);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type={currentStep.type === "phone" ? "tel" : "text"}
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder={currentStep.placeholder || "Digite sua resposta..."}
                    className="flex-1 px-4 py-2.5 text-xs bg-[#FAF7F2] text-[#2A1F18] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#A15734] border border-[#E8D5C4] transition-all placeholder:text-[#2A1F18]/40"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="p-2.5 bg-[#A15734] text-white rounded-xl hover:bg-[#8A482A] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

              {/* SELEÇÃO DE OPÇÕES */}
              {currentStep && currentStep.type === "select" && !isTyping && !isAnalyzing && !isFinished && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-1.5"
                >
                  {currentStep.options?.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSendResponse(opt)}
                      className="w-full text-left px-3.5 py-2 text-xs bg-[#FAF7F2] hover:bg-[#A15734] hover:text-white text-[#2A1F18] rounded-xl font-normal border border-[#E8D5C4] transition-all duration-200"
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* BOTÃO FINAL DO WHATSAPP */}
              {isFinished && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={handleConnectWhatsApp}
                  className="w-full py-3 px-4 bg-[#A15734] hover:bg-[#8A482A] text-white font-medium text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Continuar atendimento</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
