"use server";

import { prisma } from "@/lib/prisma";
import { sendLeadNotificationEmail } from "@/lib/email";

export interface PreConsultaSubmission {
  name: string;
  phone: string;
  email?: string;
  objective: "Geral" | "Emagrecimento";
  message: string; // Markdown formatted questionnaire responses
}

export async function submitPreConsulta(data: PreConsultaSubmission) {
  try {
    if (!data.name || !data.phone) {
      return { success: false, error: "Nome e Telefone são campos obrigatórios." };
    }

    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        objective: `Pré-Consulta: ${data.objective}`,
        message: data.message,
        source: "pre-consulta",
      },
    });

    // Fire notification email without blocking the response
    sendLeadNotificationEmail({
      name: data.name,
      phone: data.phone,
      email: data.email,
      objective: data.objective,
      message: data.message,
    }).catch((err) => console.error("Falha no e-mail de notificação:", err));

    return { success: true, leadId: lead.id };
  } catch (error) {
    console.warn("⚠️ Banco de dados offline ou não configurado. Simulando salvamento local com sucesso.");
    console.error("Erro detalhado do banco:", error);

    console.log("\n==================================================");
    console.log("📝 RESPOSTAS DO FORMULÁRIO DE PRÉ-CONSULTA RECEBIDAS:");
    console.log(data.message);
    console.log("==================================================\n");

    // Still try to send the notification email even when DB is offline
    sendLeadNotificationEmail({
      name: data.name,
      phone: data.phone,
      email: data.email,
      objective: data.objective,
      message: data.message,
    }).catch((err) => console.error("Falha no e-mail de notificação:", err));

    return {
      success: true,
      simulated: true,
      info: "As respostas foram impressas no terminal do desenvolvedor (simulação offline).",
    };
  }
}
