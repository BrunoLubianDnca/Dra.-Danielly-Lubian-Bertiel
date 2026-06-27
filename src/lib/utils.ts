import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

export const WHATSAPP_URL = "https://wa.me/message/IO5B272PC6FOL1";

export function buildWhatsAppUrl(name?: string, objective?: string): string {
  const message = name && objective
    ? `Olá! Sou ${name} e gostaria de agendar uma consulta. Meu objetivo é: ${objective}`
    : "Olá! Gostaria de agendar uma consulta com a Dra. Danielly Lubian Bertiel.";
  return `https://wa.me/554899999999?text=${encodeURIComponent(message)}`;
}
