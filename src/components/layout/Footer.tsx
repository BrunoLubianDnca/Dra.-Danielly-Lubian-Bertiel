import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { siteConfig } from "@/config/site";
import { navLinks, specialtyLinks, legalLinks } from "@/config/navigation";

export function Footer() {
  return (
    <footer className="bg-terra-dark pt-16 pb-8 border-t border-terra">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Coluna 1: Logo */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-4 group mb-4">
              <Image
                src="/LOGODL.png"
                alt="Logo Dra. Danielly Lubian Bertiel"
                width={40}
                height={40}
                className="object-contain filter brightness-0 invert shrink-0"
              />
              <div className="border-l border-cream-text/30 pl-4">
                <span className="block font-serif text-[11px] font-semibold tracking-[0.15em] uppercase text-white">
                  DRA. DANIELLY LUBIAN BERTIEL
                </span>
                <span className="block font-sans text-[10px] text-white">
                  CRM/SC 33815
                </span>
              </div>
            </Link>
            <p className="font-sans text-sm text-white/70">
              Medicina que transforma vidas.
            </p>
          </div>

          {/* Coluna 2: Navegação */}
          <div>
            <p className="font-sans text-sm font-bold text-white mb-4">Navegação</p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Especialidades */}
          <div>
            <p className="font-sans text-sm font-bold text-white mb-4">Especialidades</p>
            <ul className="space-y-2">
              {specialtyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4: Contato */}
          <div>
            <p className="font-sans text-sm font-bold text-white mb-4">Contato</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-sans text-sm text-white/70 hover:text-white transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" /> (47) 9112-9634
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2 font-sans text-sm text-white/70">
                  <MapPin className="w-4 h-4 mt-0.5 text-white/70" /> Centro, Blumenau - SC
                </span>
              </li>
              <li>
                <a
                  href="https://instagram.com/dradanilubian"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-sans text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" /> @dradanilubian
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Base */}
        <div className="pt-6 border-t border-cream/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-white/60">
            © {new Date().getFullYear()} Dra. Danielly Lubian Bertiel | CRM/SC 33815 | Todos os direitos reservados
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-xs text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

// Inline Icon para Instagram caso não esteja na versão do lucide
function Instagram(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
    </svg>
  );
}

