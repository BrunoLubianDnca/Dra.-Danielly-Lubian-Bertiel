import { Suspense } from "react";
import type { Metadata } from "next";
import PreConsultaClient from "./PreConsultaClient";

export const metadata: Metadata = {
  title: "Pré-Consulta | Dra. Danielly Lubian Bertiel",
  description:
    "Para oferecer um atendimento mais personalizado, responda ao nosso formulário de pré-consulta. Leva apenas alguns minutos.",
};

export default function PreConsultaPage() {
  return (
    <Suspense fallback={<div className="min-h-[90vh] bg-background" />}>
      <PreConsultaClient />
    </Suspense>
  );
}
