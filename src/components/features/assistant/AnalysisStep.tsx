"use client";

import { motion } from "framer-motion";

interface AnalysisStepProps {
  progress: number;
  title?: string;
  subtitle?: string;
}

export function AnalysisStep({
  progress,
  title = "Encaminhando mensagem...",
  subtitle = "Conectando com a recepção...",
}: AnalysisStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8D5C4] text-center space-y-3 my-2 shadow-xs"
    >
      <div className="space-y-1">
        <h4 className="text-xs font-medium text-[#2A1F18] flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#A15734] animate-pulse" />
          {title}
        </h4>
        <p className="text-[11px] text-[#2A1F18]/60 font-sans">{subtitle}</p>
      </div>

      <div className="w-full bg-[#E8D5C4]/50 h-1.5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#A15734] rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}
