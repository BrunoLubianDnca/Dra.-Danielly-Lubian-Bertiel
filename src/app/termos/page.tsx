import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de Uso | Dra. Danielly Lubian Bertiel",
  description:
    "Leia os Termos de Uso do site da Dra. Danielly Lubian Bertiel antes de utilizar nossos serviços digitais.",
};

const sections = [
  {
    title: "Aceitação dos Termos",
    content: `Ao acessar e utilizar o site https://www.dradaniellylubian.com.br, você concorda com estes Termos de Uso. Caso não concorde com qualquer disposição, solicitamos que não utilize o site.

Estes termos se aplicam a todos os visitantes, usuários e qualquer pessoa que acesse ou utilize os serviços disponíveis neste site.`,
  },
  {
    title: "Sobre o Site e os Serviços",
    content: `Este site é de titularidade da Dra. Danielly Lubian Bertiel (CRM-SC 33815) e tem como objetivo apresentar informações sobre os serviços médicos oferecidos, facilitar o primeiro contato entre pacientes e a profissional, e oferecer conteúdo educativo sobre saúde, longevidade e bem-estar.

O preenchimento do formulário de Pré-Consulta disponível neste site não substitui uma consulta médica presencial, não configura vínculo médico-paciente definitivo e não representa diagnóstico ou prescrição de qualquer tipo.`,
  },
  {
    title: "Uso do Formulário de Pré-Consulta",
    content: `O formulário de Pré-Consulta foi desenvolvido exclusivamente para coletar informações preliminares que auxiliam a Dra. Danielly na preparação do atendimento. Ao preenchê-lo, você:

• Confirma que as informações fornecidas são verdadeiras e completas
• Autoriza o uso dessas informações para fins de atendimento médico
• Compreende que o envio do formulário não garante agendamento imediato
• Entende que um membro da equipe entrará em contato para confirmar a consulta`,
  },
  {
    title: "Conteúdo do Site",
    content: `Todo o conteúdo publicado neste site — incluindo textos, imagens, artigos de blog, logotipos e elementos visuais — é de propriedade intelectual da Dra. Danielly Lubian Bertiel ou está licenciado para uso exclusivo neste domínio.

É expressamente proibida a reprodução, distribuição, modificação ou uso comercial de qualquer conteúdo sem autorização prévia e escrita da titular.

Os artigos e textos informativos publicados no blog têm caráter exclusivamente educativo e não substituem orientação médica individualizada.`,
  },
  {
    title: "Limitação de Responsabilidade",
    content: `As informações disponibilizadas neste site têm caráter meramente informativo e educativo. A Dra. Danielly Lubian Bertiel não se responsabiliza por:

• Decisões tomadas com base exclusiva no conteúdo do site
• Resultados de saúde decorrentes de automedicação ou interpretação incorreta das informações
• Indisponibilidade temporária do site por manutenção ou problemas técnicos
• Danos causados por vírus ou elementos maliciosos introduzidos por terceiros`,
  },
  {
    title: "Links Externos",
    content: `Este site pode conter links para sites externos, como redes sociais e plataformas de agendamento. Esses links são fornecidos para conveniência e não implicam endosso ou responsabilidade sobre o conteúdo de terceiros. Recomendamos que você leia os termos e políticas de privacidade de cada site que visitar.`,
  },
  {
    title: "Privacidade e Proteção de Dados",
    content: `O tratamento dos seus dados pessoais é regido pela nossa Política de Privacidade, disponível em https://www.dradaniellylubian.com.br/privacidade, que integra estes Termos de Uso por referência.

Atuamos em conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018) e com as normas éticas do Conselho Federal de Medicina (CFM).`,
  },
  {
    title: "Alterações nos Termos",
    content: `Reservamo-nos o direito de alterar estes Termos de Uso a qualquer momento. As alterações entram em vigor a partir da publicação da versão atualizada nesta página. O uso contínuo do site após a publicação de alterações implica aceitação dos novos termos.`,
  },
  {
    title: "Legislação Aplicável",
    content: `Estes Termos de Uso são regidos pelas leis brasileiras, em especial o Código de Defesa do Consumidor (Lei nº 8.078/1990), a Lei Geral de Proteção de Dados (Lei nº 13.709/2018) e o Marco Civil da Internet (Lei nº 12.965/2014).

Fica eleito o foro da Comarca de Blumenau – SC para dirimir quaisquer controvérsias decorrentes destes termos.`,
  },
  {
    title: "Contato",
    content: `Em caso de dúvidas sobre estes Termos de Uso ou sobre qualquer aspecto do site, entre em contato:

• WhatsApp: (47) 9112-9634
• Endereço: Edifício Connect Office, Sala 501, Rua Pastor Stutzer, 220, Jardim Blumenau, Blumenau – SC`,
  },
];

export default function TermosPage() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16">
          <p className="text-label mb-3">Legal</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-foreground mb-6">
            Termos de Uso
          </h1>
          <div className="h-px bg-border/40 w-full" />
          <p className="font-sans text-sm text-muted mt-4">
            Última atualização: julho de 2025
          </p>
        </div>

        {/* Intro */}
        <p className="font-sans text-[15px] text-foreground/80 leading-relaxed mb-12 p-6 bg-primary/5 border border-primary/10 rounded-2xl">
          Mais do que uma consulta, um acompanhamento próximo e contínuo pensado para o seu tempo.
          Leia atentamente estes termos antes de utilizar nosso site ou preencher qualquer formulário.
        </p>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section, i) => (
            <div key={i} className="border-b border-border/20 pb-10 last:border-0">
              <h2 className="font-serif text-xl font-medium text-foreground mb-4">
                {section.title}
              </h2>
              <p className="font-sans text-[15px] text-foreground/75 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer links */}
        <div className="mt-16 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href="/"
            className="font-sans text-sm text-primary hover:text-primary-hover transition-colors"
          >
            ← Voltar ao início
          </Link>
          <Link
            href="/privacidade"
            className="font-sans text-sm text-muted hover:text-foreground transition-colors"
          >
            Ver Política de Privacidade →
          </Link>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border/20 text-center">
          <p className="font-sans text-xs text-muted/70 leading-relaxed">
            © {new Date().getFullYear()} Dra. Danielly Lubian Bertiel | CRM-SC 33815. Todos os direitos reservados.
          </p>
          <p className="font-sans text-xs text-muted/50 mt-1">
            Desenvolvido por{" "}
            <a
              href="https://www.instagram.com/dinamicasolucoesdigitais"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Dinâmica Soluções Digitais
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
