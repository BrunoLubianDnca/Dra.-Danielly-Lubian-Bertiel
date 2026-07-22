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
  const [countdown, setCountdown] = useState(3);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getTimeString = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Capitaliza a primeira letra de cada palavra (ex: "bruno lubian" → "Bruno Lubian")
  const toTitleCase = (str: string) =>
    str
      .toLowerCase()
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

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
      const phone = finalAnswers["telefone"] || finalAnswers["phone"] || "";
      const motivo = finalAnswers["motivo"] || finalAnswers["duvida"] || finalAnswers["interesse"] || "";

      // Monta URL do WhatsApp
      const fullMessage = `Olá! Meu nome é ${nome}, gostaria de informações sobre ${motivo}.`;
      const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;
      setWhatsappUrl(url);

      // Envia lead para a API (silencioso)
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nome, phone, reason: motivo }),
      }).catch(() => {});

      setMessages((prev) => [
        ...prev,
        {
          id: `asst-finish-${Date.now()}`,
          sender: "assistant",
          text: `Perfeito${nome ? `, ${nome}` : ""}.\n\nRecebemos suas informações. ✅\n\nVocê será redirecionado(a) para o WhatsApp automaticamente em instantes!`,
          timestamp: getTimeString(),
        },
      ]);

      // Countdown 3 → 2 → 1 → abre WhatsApp
      let count = 3;
      setCountdown(3);
      const cdInterval = setInterval(() => {
        count -= 1;
        setCountdown(count);
        if (count <= 0) {
          clearInterval(cdInterval);
          window.open(url, "_blank", "noopener,noreferrer");
        }
      }, 1000);
    }, 1000);
  };

  const handleSendResponse = (textValue: string) => {
    const trimmed = textValue.trim();
    if (!trimmed || currentStepIndex < 0 || currentStepIndex >= config.steps.length) return;

    const currentStep = config.steps[currentStepIndex];

    // Capitaliza o nome automaticamente para manter padrão profissional
    const processedValue =
      currentStep.id === "nome" || currentStep.id === "name"
        ? toTitleCase(trimmed)
        : trimmed;

    const updatedAnswers = {
      ...answers,
      [currentStep.id]: processedValue,
    };
    setAnswers(updatedAnswers);

    setMessages((prev) => [
      ...prev,
      {
        id: `user-ans-${currentStep.id}-${Date.now()}`,
        sender: "user",
        text: processedValue,
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

  const handleConnectWhatsApp = () => {
    if (whatsappUrl) {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
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
            className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 sm:w-[390px] sm:h-[560px] sm:max-h-[88vh] bg-[#FDFBF7] sm:rounded-3xl shadow-2xl sm:border sm:border-[#E8D5C4] flex flex-col overflow-hidden font-sans"
          >
            {/* CABEÇALHO DA RECEPÇÃO */}
            <div className="px-4 sm:px-5 py-4 sm:py-3.5 bg-[#A15734] text-white flex items-center justify-between border-b border-[#8A482A] shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-[#8A482A] border border-white/30 flex items-center justify-center p-1 relative">
                    <Image
                      src="/LOGODL.png"
                      alt="Logo DL"
                      width={24}
                      height={24}
                      className="object-contain filter brightness-0 invert"
                    />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#A15734] rounded-full" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-sm tracking-wide text-white">
                    {config.assistantName}
                  </h3>
                  <p className="text-[11px] text-white/75 font-sans tracking-wider mt-0.5">
                    {config.assistantRole} • <span className="text-emerald-300">Online</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* HISTÓRICO DE MENSAGENS */}
            <div className="flex-1 p-4 sm:p-4 overflow-y-auto space-y-3.5 bg-[#FDFBF7] overscroll-contain">
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
            <div className="p-3 sm:p-4 bg-[#FDFBF7] border-t border-[#E8D5C4]/70 shrink-0 pb-safe">
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
                    className="flex-1 px-4 py-3 text-sm bg-[#FAF7F2] text-[#2A1F18] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A15734] border border-[#E8D5C4] transition-all placeholder:text-[#2A1F18]/40"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="p-3 bg-[#A15734] text-white rounded-xl hover:bg-[#8A482A] active:bg-[#6e3820] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* SELEÇÃO DE OPÇÕES */}
              {currentStep && currentStep.type === "select" && !isTyping && !isAnalyzing && !isFinished && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-2"
                >
                  {currentStep.options?.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSendResponse(opt)}
                      className="w-full text-left px-4 py-3 text-sm bg-[#FAF7F2] hover:bg-[#A15734] active:bg-[#8A482A] hover:text-white text-[#2A1F18] rounded-xl font-normal border border-[#E8D5C4] transition-all duration-200"
                    >
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* BOTÃO FINAL DO WHATSAPP COM COUNTDOWN */}
              {isFinished && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col gap-2"
                >
                  {/* Barra de countdown */}
                  {countdown > 0 && (
                    <div className="flex items-center justify-center gap-2 text-[10px] text-[#A15734]/70 font-medium">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#A15734] text-white text-[10px] font-bold">{countdown}</span>
                      <span>Abrindo WhatsApp automaticamente...</span>
                    </div>
                  )}
                  <motion.button
                    animate={countdown > 0 ? { opacity: 0.6 } : { opacity: 1 }}
                    onClick={handleConnectWhatsApp}
                    className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>{countdown > 0 ? `Abrir WhatsApp agora` : `Abrir WhatsApp`}</span>
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
