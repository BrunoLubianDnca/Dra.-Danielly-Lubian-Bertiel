import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade | Dra. Danielly Lubian Bertiel",
  description:
    "Saiba como a Dra. Danielly Lubian Bertiel coleta, utiliza e protege seus dados pessoais em conformidade com a LGPD.",
};

const sections = [
  {
    title: "Quem somos",
    content: `O endereço do nosso site é: https://www.dradaniellylubian.com.br. Este site é de titularidade da Dra. Danielly Lubian Bertiel (CRM-SC 33815), especialista em Medicina da Longevidade, Emagrecimento e Performance Metabólica, com consultório localizado no Edifício Connect Office, Sala 501, Rua Pastor Stutzer, 220, Jardim Blumenau, Blumenau – SC.`,
  },
  {
    title: "Quais dados coletamos",
    content: `Ao preencher o formulário de Pré-Consulta disponível em nosso site, coletamos os seguintes dados pessoais e de saúde fornecidos voluntariamente por você:

• Nome completo e data de nascimento
• Telefone e endereço de e-mail
• Informações sobre hábitos de vida, histórico de saúde, uso de medicamentos e sintomas relatados
• Dados de comportamento alimentar e rotina (exclusivamente para o formulário de emagrecimento)

Também podemos coletar automaticamente dados técnicos como endereço de IP e informações do navegador para fins de segurança e análise de tráfego via Google Analytics.`,
  },
  {
    title: "Como usamos seus dados",
    content: `Os dados coletados são utilizados exclusivamente para:

• Personalizar e preparar o atendimento médico antes da sua consulta
• Entrar em contato com você para confirmar ou agendar consultas
• Melhorar a qualidade do atendimento oferecido
• Cumprir obrigações legais e regulatórias do exercício da Medicina

Não utilizamos seus dados para fins comerciais, publicidade direcionada ou qualquer propósito não descrito nesta política.`,
  },
  {
    title: "Dados de saúde e sigilo médico",
    content: `Os dados de saúde informados no formulário de Pré-Consulta são tratados com absoluto sigilo médico, em conformidade com o Código de Ética Médica do CFM, a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018) e a Resolução CFM nº 1.638/2002.

Essas informações são acessadas exclusivamente pela Dra. Danielly Lubian Bertiel e, quando necessário, por profissionais de saúde diretamente envolvidos no seu atendimento.`,
  },
  {
    title: "Com quem compartilhamos seus dados",
    content: `Seus dados pessoais não são vendidos, alugados ou compartilhados com terceiros para fins comerciais. Podemos compartilhá-los apenas nas seguintes situações:

• Com serviços técnicos essenciais ao funcionamento do site (como armazenamento em nuvem e envio de e-mails), que operam sob termos de confidencialidade
• Quando exigido por lei ou ordem judicial
• Com sua autorização expressa`,
  },
  {
    title: "Cookies e rastreamento",
    content: `Utilizamos cookies técnicos para garantir o funcionamento adequado do site e cookies analíticos (Google Analytics) para entender como os visitantes interagem com nossas páginas — sempre de forma agregada e anônima.

Você pode desativar o uso de cookies nas configurações do seu navegador. Isso pode afetar algumas funcionalidades do site, mas não impedirá seu acesso ao conteúdo.`,
  },
  {
    title: "Por quanto tempo mantemos seus dados",
    content: `Os dados do formulário de Pré-Consulta são mantidos pelo prazo mínimo exigido pela legislação médica vigente (20 anos, conforme CFM) ou enquanto houver vínculo ativo de acompanhamento médico.

Dados analíticos coletados via Google Analytics são mantidos por até 14 meses, conforme configuração padrão do serviço.`,
  },
  {
    title: "Seus direitos (LGPD)",
    content: `Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:

• Confirmar a existência de tratamento de seus dados
• Acessar os dados que mantemos sobre você
• Corrigir dados incompletos, inexatos ou desatualizados
• Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários
• Revogar o consentimento a qualquer momento
• Solicitar informações sobre o compartilhamento de seus dados

Para exercer qualquer um desses direitos, entre em contato conosco pelo WhatsApp (47) 9112-9634 ou pelo e-mail do consultório.`,
  },
  {
    title: "Segurança dos dados",
    content: `Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso não autorizado, perda, alteração ou divulgação indevida. Nosso site utiliza protocolo HTTPS com certificado SSL, e os dados armazenados ficam em servidores seguros com acesso restrito.`,
  },
  {
    title: "Alterações nesta política",
    content: `Esta Política de Privacidade pode ser atualizada periodicamente. Sempre que houver mudanças relevantes, publicaremos a versão atualizada nesta página com a data de revisão. Recomendamos que você a revise periodicamente.`,
  },
];

export default function PrivacidadePage() {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16">
          <p className="text-label mb-3">Legal</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-foreground mb-6">
            Política de Privacidade
          </h1>
          <div className="h-px bg-border/40 w-full" />
          <p className="font-sans text-sm text-muted mt-4">
            Última atualização: julho de 2025
          </p>
        </div>

        {/* Intro */}
        <p className="font-sans text-[15px] text-foreground/80 leading-relaxed mb-12 p-6 bg-primary/5 border border-primary/10 rounded-2xl">
          Mais do que uma consulta, um acompanhamento próximo e contínuo pensado para o seu tempo.
          Esta política explica de forma transparente como coletamos, usamos e protegemos seus dados
          pessoais em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018)</strong>.
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
            href="/termos"
            className="font-sans text-sm text-muted hover:text-foreground transition-colors"
          >
            Ver Termos de Uso →
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
