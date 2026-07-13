"use client";

import { useState, useEffect } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/components/ui/GoogleAnalytics";

export function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(true);
  const { getWhatsAppUrl } = useWhatsApp();

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide the float on all devices when footer is visible
        setIsVisible(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.05,
      }
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={getWhatsAppUrl("geral")}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { location: "float_button" })}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-[#1ebe57] transition-all duration-300 flex items-center justify-center group"
          aria-label="Contato pelo WhatsApp"
        >
          <WhatsAppIcon className="w-8 h-8" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
