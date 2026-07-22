export interface ChatStep {
  id: string;
  type: "welcome" | "text" | "phone" | "select";
  question: string;
  placeholder?: string;
  options?: string[];
}

export interface ChatConfig {
  assistantName: string;
  assistantRole: string;
  welcomeMessage: string;
  whatsappNumber: string;
  steps: ChatStep[];
}

export const defaultChatConfig: ChatConfig = {
  assistantName: "Atendimento Dra. Danielly",
  assistantRole: "Recepção",
  whatsappNumber: "554788397897",
  welcomeMessage: "Olá! Seja bem-vindo(a). 👋\n\nÉ um prazer receber você.\n\nAntes de prosseguirmos, preciso de algumas informações para direcionar seu atendimento da melhor forma.\n\nComo posso chamar você?",
  steps: [
    {
      id: "nome",
      type: "text",
      question: "",
      placeholder: "Seu nome...",
    },
    {
      id: "telefone",
      type: "phone",
      question: "Prazer em conhecê-lo(a), {{nome}}.\n\nAgora, informe o seu WhatsApp com DDD para que nossa equipe possa dar continuidade ao seu atendimento.",
      placeholder: "(00) 00000-0000",
    },
    {
      id: "motivo",
      type: "select",
      question: "Obrigada.\n\nPara finalizar, selecione o motivo do seu contato hoje:",
      options: [
        "Consulta de Emagrecimento & Performance",
        "Medicina da Longevidade",
        "Agendamento e Valores",
        "Outras dúvidas",
      ],
    },
  ],
};
