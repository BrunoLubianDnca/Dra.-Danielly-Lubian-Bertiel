import { NextResponse } from "next/server";
import { sendLeadNotificationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, reason } = body;

    console.log("📥 [NOVO LEAD CAPTURADO PELO ASSISTENTE]:", {
      name,
      phone,
      reason,
      createdAt: new Date().toISOString(),
    });

    // Envia a notificação imediata por e-mail via Resend para a recepção
    await sendLeadNotificationEmail({
      name: name || "Paciente",
      phone: phone || "Não informado",
      objective: reason || "Atendimento Geral",
      message: `* **Interesse:** ${reason || "Não informado"}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao processar e salvar lead:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
