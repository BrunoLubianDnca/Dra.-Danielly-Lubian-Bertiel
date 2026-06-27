"use client";

import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";

const GOOGLE_REVIEW_URL = "https://g.page/r/CYay7_yVLQ8yECE/review";

export function GoogleReviewsSection() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">

      {/* Subtle top separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-primary/30 rounded-full" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center"
        >

          {/* Google Logo + Stars */}
          <div className="flex flex-col items-center gap-4 mb-8">
            {/* Google "G" SVG */}
            <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center border border-border/30">
              <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>

            {/* 5 Stars */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4, type: "spring" }}
                >
                  <Star className="w-7 h-7 fill-[#FBBC05] text-[#FBBC05]" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Label */}
          <p className="text-label mb-4">AVALIAÇÕES GOOGLE</p>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-foreground mb-4 leading-tight">
            Sua opinião transforma<br className="hidden sm:block" /> outras vidas.
          </h2>

          {/* Subtext */}
          <p className="font-sans text-[15px] text-muted leading-relaxed max-w-md mb-10">
            Se você já foi atendida pela Dra. Danielly, compartilhe sua experiência no Google e ajude outras mulheres a encontrarem o cuidado que merecem.
          </p>

          {/* CTA Button */}
          <motion.a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-white border border-border/50 shadow-md hover:shadow-lg text-foreground font-sans font-semibold text-[14px] px-8 py-4 rounded-full transition-all duration-300 group"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Deixar avaliação no Google
            <ExternalLink className="w-4 h-4 text-muted group-hover:text-primary transition-colors duration-200" />
          </motion.a>

          {/* Fine print */}
          <p className="font-sans text-[12px] text-muted/60 mt-5">
            Avaliações reais de pacientes no Google Maps
          </p>

        </motion.div>
      </div>
    </section>
  );
}
