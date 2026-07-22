"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ChatBubbleProps {
  sender: "assistant" | "user";
  text: string;
  timestamp?: string;
  assistantName?: string;
}

export function ChatBubble({ sender, text, timestamp }: ChatBubbleProps) {
  const isAssistant = sender === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={`flex flex-col ${isAssistant ? "items-start" : "items-end"} gap-1 w-full`}
    >
      <div className="flex items-end gap-2.5 max-w-[88%]">
        {isAssistant && (
          <div className="w-7 h-7 rounded-full bg-[#A15734] border border-[#E8D5C4]/40 flex items-center justify-center shrink-0 shadow-xs overflow-hidden relative p-1">
            <Image
              src="/LOGODL.png"
              alt="Logo Dra. Danielly"
              width={20}
              height={20}
              className="object-contain filter brightness-0 invert"
            />
          </div>
        )}

        <div
          className={`px-4 py-3 rounded-2xl whitespace-pre-wrap text-[13.5px] leading-relaxed ${
            isAssistant
              ? "bg-[#FAF7F2] text-[#2A1F18] rounded-bl-xs border border-[#E8D5C4]/60 shadow-xs"
              : "bg-[#A15734] text-white rounded-br-xs font-normal shadow-xs"
          }`}
        >
          {text}
        </div>
      </div>

      {timestamp && (
        <span className="text-[10px] text-[#2A1F18]/40 px-2 font-sans">
          {timestamp}
        </span>
      )}
    </motion.div>
  );
}
