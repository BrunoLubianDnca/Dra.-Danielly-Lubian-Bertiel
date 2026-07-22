"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { navLinks, legalLinks } from "@/config/navigation";

// Specialty links rendered statically to avoid duplicate-key issues
const specialties = [
  { label: "Emagrecimento", href: "/pre-consulta?tipo=emagrecimento" },
  { label: "Performance Metabólica", href: "/pre-consulta?tipo=geral" },
  { label: "Longevidade", href: "/pre-consulta?tipo=geral" },
  { label: "Saúde Preventiva", href: "/pre-consulta?tipo=geral" },
];

export function Footer() {
  const { getWhatsAppUrl } = useWhatsApp();
  return (
    <footer className="bg-terra-dark pt-16 pb-8 border-t border-terra">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Columns grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Col 1 — Brand + CTA */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-4 group">
              <Image
                src="/LOGODL.png"
                alt="Logo Dra. Danielly Lubian Bertiel"
                width={56}
                height={56}
                className="object-contain filter brightness-0 invert shrink-0"
              />
              <div className="border-l border-white/20 pl-4">
                <span className="block font-serif text-[11px] font-semibold tracking-[0.15em] uppercase text-white leading-snug">
                  DRA. DANIELLY LUBIAN BERTIEL
                </span>
                <span className="block font-sans text-[10px] text-white/80 mt-1 uppercase tracking-wider">
                  EMAGRECIMENTO E PERFORMANCE METABÓLICA
                </span>
                <span className="block font-sans text-[10px] text-white/60 mt-0.5">
                  MÉDICA | CRM-SC 33815
                </span>
              </div>
            </Link>

            <p className="font-sans text-sm text-white/80 leading-relaxed">
              Medicina que transforma vidas.
            </p>

            {/* CTA */}
            <Link
              href="/pre-consulta"
              className="inline-flex items-center gap-2 self-start border border-white/30 text-white font-sans text-sm px-4 py-2.5 rounded-full hover:bg-white/10 transition-all duration-200"
            >
              Fazer Pré-Consulta
              <span aria-hidden>→</span>
            </Link>
          </div>

          {/* Col 2 — Navegação */}
          <div>
            <p className="font-sans text-sm font-bold text-white mb-4">Navegação</p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Especialidades */}
          <div>
            <p className="font-sans text-sm font-bold text-white mb-4">Especialidades</p>
            <ul className="space-y-2.5">
              {specialties.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-sans text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contato */}
          <div>
            <p className="font-sans text-sm font-bold text-white mb-4">Contato</p>
            <ul className="space-y-3.5">
              <li>
                <a
                  href={getWhatsAppUrl("geral")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 font-sans text-sm text-white/80 hover:text-white transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 shrink-0" />
                  (47) 98839-7897
                </a>
              </li>
              <li>
                <a
                  href="https://maps.app.goo.gl/ikdSCTPcGiYpgJQy9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 font-sans text-sm text-white/80 hover:text-white transition-colors"
                >
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">
                    Ed. Connect Office, Sala 501<br />
                    Rua Pastor Stutzer, 220<br />
                    Jardim Blumenau, Blumenau&nbsp;-&nbsp;SC
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/dradanilubian"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 font-sans text-sm text-white/80 hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4 shrink-0" />
                  @dradanilubian
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col items-center gap-2.5">
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="font-sans text-xs text-white/75">
              © {new Date().getFullYear()} Dra. Danielly Lubian Bertiel | CRM-SC 33815 | Todos os direitos reservados
            </p>
            <div className="flex items-center gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-xs text-white/75 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <p className="font-sans text-xs text-white/70">
            Desenvolvido por{" "}
            <a
              href="https://www.instagram.com/dinamicasolucoesdigitais"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/90 transition-colors underline underline-offset-2"
            >
              Dinâmica Soluções Digitais
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}

// Instagram icon inline
function Instagram(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
