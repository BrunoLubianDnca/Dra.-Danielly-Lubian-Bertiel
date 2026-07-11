export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/#metodo", label: "Método" },
  { href: "/#especialidades", label: "Especialidades" },
  { href: "/pre-consulta", label: "Pré-Consulta" },
  { href: "/blog", label: "Conteúdos" },
];

export const specialtyLinks: NavLink[] = [
  { href: "/pre-consulta?tipo=emagrecimento", label: "Emagrecimento" },
  { href: "/pre-consulta?tipo=geral", label: "Performance Metabólica" },
  { href: "/pre-consulta?tipo=geral", label: "Longevidade" },
  { href: "/pre-consulta?tipo=geral", label: "Saúde Preventiva" },
];

export const legalLinks: NavLink[] = [
  { href: "/privacidade", label: "Política de Privacidade" },
  { href: "/termos", label: "Termos de Uso" },
];
