const getResendClient = () => {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
};

interface LeadEmailProps {
  name: string;
  phone: string;
  email?: string;
  objective: string;
  message: string;
}

import { Resend } from "resend";

export async function sendLeadNotificationEmail(data: LeadEmailProps) {
  const to = process.env.NOTIFICATION_EMAIL ?? "contato@dradaniellylubian.com.br";
  const resend = getResendClient();

  if (!resend) {
    console.warn("⚠️  RESEND_API_KEY não configurada — e-mail de notificação ignorado.");
    return;
  }

  const { error } = await resend.emails.send({
    // Free tier: use onboarding@resend.dev until a custom domain is verified at resend.com/domains
    // After domain verification, change to: "Pré-Consulta <noreply@dradaniellylubian.com.br>"
    from: "onboarding@resend.dev",
    to,
    subject: `📋 Nova Pré-Consulta: ${data.name} (${data.objective})`,
    html: buildEmailHtml(data),
  });

  if (error) {
    console.error("Erro ao enviar e-mail de notificação:", error);
  }
}

function buildEmailHtml(data: LeadEmailProps): string {
  // Convert markdown-like text to basic HTML
  const formattedMessage = data.message
    .replace(/^# (.+)$/gm, "<h2 style='color:#8F4D30;margin-top:24px;margin-bottom:8px;font-family:Georgia,serif'>$1</h2>")
    .replace(/^## (.+)$/gm, "<h3 style='color:#6b3d24;margin-top:16px;margin-bottom:6px;font-family:Georgia,serif'>$1</h3>")
    .replace(/^\* \*\*(.+):\*\* (.+)$/gm, "<p style='margin:4px 0'><strong>$1:</strong> $2</p>")
    .replace(/\n/g, "<br>");

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#f8f4f0;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f4f0;padding:32px 0">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
          
          <!-- Header -->
          <tr>
            <td style="background:#8F4D30;padding:24px 32px">
              <p style="margin:0;color:#fff;font-family:Georgia,serif;font-size:18px;font-weight:600">
                Dra. Danielly Lubian Bertiel
              </p>
              <p style="margin:4px 0 0;color:rgba(255,255,255,0.75);font-size:12px">
                Nova Pré-Consulta Recebida
              </p>
            </td>
          </tr>

          <!-- Contact info -->
          <tr>
            <td style="padding:24px 32px 0">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf6f2;border-radius:8px;padding:16px">
                <tr>
                  <td>
                    <p style="margin:0 0 8px;font-size:13px;color:#666">DADOS DA PACIENTE</p>
                    <p style="margin:4px 0;font-size:15px"><strong>Nome:</strong> ${data.name}</p>
                    <p style="margin:4px 0;font-size:15px"><strong>Telefone:</strong> ${data.phone}</p>
                    ${data.email ? `<p style="margin:4px 0;font-size:15px"><strong>E-mail:</strong> ${data.email}</p>` : ""}
                    <p style="margin:4px 0;font-size:15px"><strong>Tipo:</strong> ${data.objective}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Form responses -->
          <tr>
            <td style="padding:24px 32px">
              <p style="margin:0 0 12px;font-size:13px;color:#666;border-bottom:1px solid #e8e0d8;padding-bottom:8px">RESPOSTAS DO QUESTIONÁRIO</p>
              <div style="font-size:14px;color:#333;line-height:1.6">
                ${formattedMessage}
              </div>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:0 32px 24px">
              <a href="https://wa.me/554788397897?text=Ol%C3%A1+${encodeURIComponent(data.name)}%2C+recebi+sua+pr%C3%A9-consulta!"
                style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:12px 24px;border-radius:24px;font-size:14px;font-weight:600">
                💬 Responder no WhatsApp
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8f4f0;padding:16px 32px;border-top:1px solid #e8e0d8">
              <p style="margin:0;font-size:11px;color:#999">
                Este e-mail foi gerado automaticamente pelo site dradaniellylubian.com.br
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
