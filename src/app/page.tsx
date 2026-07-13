import { HeroSection } from "@/components/features/HeroSection";
import { ObjectivesSection } from "@/components/features/ObjectivesSection";
import { AboutSection } from "@/components/features/AboutSection";
import { MetodoSection } from "@/components/features/MetodoSection";
import { BlogPreviewSection } from "@/components/features/BlogPreviewSection";
import { FaqSection } from "@/components/features/FaqSection";
import { InstagramSection } from "@/components/features/InstagramSection";
import { ClinicaSection } from "@/components/features/ClinicaSection";
import { LocationSection } from "@/components/features/LocationSection";
import { GoogleReviewsSection } from "@/components/features/GoogleReviewsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dra. Danielly Lubian Bertiel | Medicina da Longevidade e Emagrecimento",
  description:
    "Sua saúde hoje define a sua longevidade amanhã. Acompanhamento médico personalizado para emagrecimento, performance metabólica e uma vida com mais energia. CRM/SC 33815.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <MetodoSection />
      <ObjectivesSection />
      <ClinicaSection />
      <LocationSection />
      <InstagramSection />
      <FaqSection />
      <GoogleReviewsSection />
      <BlogPreviewSection />
    </>
  );
}
