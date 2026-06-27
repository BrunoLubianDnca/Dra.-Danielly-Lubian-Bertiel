export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/#metodo", label: "Método" },
  { href: "/blog", label: "Conteúdos" },
  { href: "/contato", label: "Contato" },
];

export const specialtyLinks: NavLink[] = [
  { href: "/emagrecimento", label: "Emagrecimento" },
  { href: "/performance-metabolica", label: "Performance Metabólica" },
  { href: "/longevidade", label: "Longevidade" },
  { href: "/saude-preventiva", label: "Saúde Preventiva" },
];

export const legalLinks: NavLink[] = [
  { href: "/privacidade", label: "Política de Privacidade" },
  { href: "/termos", label: "Termos de Uso" },
];
