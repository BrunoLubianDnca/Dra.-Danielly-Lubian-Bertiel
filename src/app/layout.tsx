import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AiAssistantChat } from "@/components/features/assistant";
import { GoogleAnalytics } from "@/components/ui/GoogleAnalytics";
import { Toaster } from "sonner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://dradaniellylubian.com.br"
  ),
  title: {
    default: "Dra. Danielly Lubian Bertiel | Medicina da Longevidade e Emagrecimento em Santa Catarina",
    template: "%s | Dra. Danielly Lubian Bertiel",
  },
  description:
    "Médica especialista em saúde e longevidade, emagrecimento e performance metabólica. Medicina personalizada para você viver com mais energia e qualidade de vida. CRM/SC 33815.",
  keywords: [
    "médica longevidade",
    "emagrecimento Santa Catarina",
    "performance metabólica",
    "medicina personalizada",
    "saúde preventiva",
    "Danielly Lubian Bertiel",
    "CRM SC 33815",
    "medicina integrativa",
    "hormônios",
    "nutrologia",
  ],
  authors: [{ name: "Dra. Danielly Lubian Bertiel", url: "https://dradaniellylubian.com.br" }],
  creator: "Dra. Danielly Lubian Bertiel",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://dradaniellylubian.com.br",
    siteName: "Dra. Danielly Lubian Bertiel",
    title: "Dra. Danielly Lubian Bertiel | Medicina da Longevidade e Emagrecimento",
    description:
      "Médica especialista em saúde e longevidade, emagrecimento e performance metabólica. Agende sua consulta.",
    images: [
      {
        url: "/lg_DRA.png",
        width: 1080,
        height: 1350,
        alt: "Dra. Danielly Lubian Bertiel — Medicina da Longevidade",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dra. Danielly Lubian Bertiel | Medicina da Longevidade",
    description: "Médica especialista em emagrecimento, longevidade e performance metabólica.",
    images: ["/lg_DRA.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalBusiness",
      "@id": "https://dradaniellylubian.com.br/#organization",
      name: "Consultório Dra. Danielly Lubian Bertiel",
      url: "https://dradaniellylubian.com.br",
      logo: "https://dradaniellylubian.com.br/logo.png",
      image: "https://dradaniellylubian.com.br/connect-office.png",
      description:
        "Medicina personalizada para longevidade, emagrecimento e performance metabólica em Santa Catarina.",
      medicalSpecialty: [
        "Saúde e Longevidade",
        "Emagrecimento",
        "Performance Metabólica",
        "Medicina Preventiva",
      ],
      telephone: "+55-47-8839-7897",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rua Pastor Stutzer, 220, Sala 501",
        addressLocality: "Blumenau",
        addressRegion: "SC",
        postalCode: "89010-390",
        addressCountry: "BR"
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        opens: "08:00",
        closes: "18:00"
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "42"
      },
      sameAs: [
        "https://www.instagram.com/dradanilubian/",
        "https://maps.google.com/maps?cid=3607026727299068038"
      ],
    },
    {
      "@type": "Physician",
      "@id": "https://dradaniellylubian.com.br/#physician",
      name: "Dra. Danielly Lubian Bertiel",
      url: "https://dradaniellylubian.com.br",
      description:
        "Médica especialista em longevidade, emagrecimento e performance metabólica. CRM-SC 33815.",
      medicalSpecialty: "Medicina Preventiva e Longevidade",
      telephone: "+55-47-8839-7897",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rua Pastor Stutzer, 220, Sala 501",
        addressLocality: "Blumenau",
        addressRegion: "SC",
        postalCode: "89010-390",
        addressCountry: "BR"
      },
      identifier: {
        "@type": "PropertyValue",
        name: "CRM",
        value: "SC 33815",
      },
      sameAs: [
        "https://www.instagram.com/dradanilubian/",
        "https://maps.google.com/maps?cid=3607026727299068038"
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="antialiased bg-background text-foreground">
        <GoogleAnalytics />
        <Header />
        <main>{children}</main>
        <Footer />
        <AiAssistantChat />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
