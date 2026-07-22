"use client";

import { useEffect, useState } from "react";

const PHONE_NUMBER = "554788397897";

export function useWhatsApp() {
  const [origin, setOrigin] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Tenta ler da URL
    const params = new URLSearchParams(window.location.search);
    const src = params.get("origem") || params.get("utm_source") || params.get("src") || params.get("ref");

    if (src) {
      const sanitized = src.toLowerCase().trim();
      sessionStorage.setItem("dl_whatsapp_src", sanitized);
      setOrigin(sanitized);
    } else {
      // 2. Se não estiver na URL, tenta recuperar da sessão
      const saved = sessionStorage.getItem("dl_whatsapp_src");
      if (saved) {
        setOrigin(saved);
      }
    }
  }, []);

  const getWhatsAppUrl = (sectionContext?: "metodo" | "geral") => {
    let message = "";

    // Mapeamento de origens amigáveis para o texto final
    const sourceNames: Record<string, string> = {
      instagram: "Instagram",
      insta: "Instagram",
      facebook: "Facebook",
      fb: "Facebook",
      linktree: "Linktree",
      linkedin: "LinkedIn",
      tiktok: "TikTok",
      google: "Google",
    };

    const friendlySource = origin ? (sourceNames[origin] || origin.charAt(0).toUpperCase() + origin.slice(1)) : null;

    if (sectionContext === "metodo") {
      if (friendlySource) {
        message = `Olá! Vim do seu ${friendlySource} e gostaria de saber mais sobre o Método Florescer.`;
      } else {
        message = "Olá! Vim do site e gostaria de saber mais sobre o Método Florescer.";
      }
    } else {
      // Padrão Geral (Consulta)
      if (friendlySource) {
        message = `Olá! Vim do seu ${friendlySource} e gostaria de saber mais sobre a consulta da Dra.`;
      } else {
        message = "Olá! Vim do Google e gostaria de saber mais sobre a consulta da Dra.";
      }
    }

    return `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodeURIComponent(message)}`;
  };

  return { getWhatsAppUrl, origin };
}
