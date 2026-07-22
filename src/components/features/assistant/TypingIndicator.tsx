"use client";

import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-xs bg-[#FAF7F2] text-[#2A1F18]/60 border border-[#E8D5C4]/60 w-fit text-xs"
    >
      <span className="text-[12px] text-[#2A1F18]/70">digitando...</span>
      <div className="flex items-center gap-1 ml-1">
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-[#A15734]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: 0 }}
        />
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-[#A15734]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: 0.2 }}
        />
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-[#A15734]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </motion.div>
  );
}
