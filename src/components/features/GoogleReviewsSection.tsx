"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import reviewsData from "../../data/reviews.json";

const GOOGLE_REVIEW_URL = "https://g.page/r/CYay7_yVLQ8yECE/review";

export function GoogleReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const nextReview = () => {
    setIsExpanded(false);
    setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
  };

  const prevReview = () => {
    setIsExpanded(false);
    setCurrentIndex((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
  };

  // Autoplay de 8 segundos (pausa temporariamente se o depoimento estiver expandido)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isExpanded) {
        nextReview();
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [isExpanded]);

  const currentReview = reviewsData[currentIndex];
  const shouldTruncate = currentReview.text.length > 180;
  const displayedText = (shouldTruncate && !isExpanded)
    ? `${currentReview.text.slice(0, 180)}...`
    : currentReview.text;

  return (
    <section id="depoimentos" className="section-padding bg-background border-t border-border/10 py-24 relative overflow-hidden">
      
      {/* Detalhe de fundo sutil */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-sand/15 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Lado Esquerdo: Call to Action (Google Reviews Card) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Bloco Google de Alta Credibilidade */}
            <div className="flex flex-col items-center lg:items-start mb-6">
              {/* Logo do Google Maior */}
              <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center border border-border/30 mb-4 select-none">
                <svg viewBox="0 0 24 24" className="w-9 h-9" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              
              {/* Google + Estrelas + 5.0 */}
              <div className="flex items-center gap-3">
                <span className="font-sans font-bold text-lg text-foreground tracking-tight">Google</span>
                <div className="h-4 w-[1px] bg-border/80" />
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" />
                  ))}
                </div>
                <span className="font-sans font-bold text-sm text-foreground bg-sand/40 px-2.5 py-0.5 rounded-md border border-border/10">5.0</span>
              </div>
            </div>

            <p className="text-label mb-3">AVALIAÇÕES GOOGLE</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-foreground mb-4 leading-tight">
              Sua opinião transforma outras vidas.
            </h2>
            <p className="font-sans text-[14px] text-muted leading-relaxed mb-8 max-w-sm">
              Se você já foi atendida pela Dra. Danielly, compartilhe sua experiência no Google e ajude outras mulheres a encontrarem o cuidado que merecem.
            </p>

            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-border/40 shadow-sm hover:shadow-md text-foreground font-sans font-bold text-xs px-6 py-3.5 rounded-full inline-flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Deixar avaliação no Google
              <ExternalLink className="w-3.5 h-3.5 text-muted group-hover:text-primary transition-colors" />
            </a>

            <p className="font-sans text-[10px] text-muted/60 mt-4">
              Avaliações reais de pacientes no Google Maps
            </p>
          </div>

          {/* Lado Direito: Carrossel Minimalista */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Título Interno */}
            <div className="mb-8 text-center lg:text-left">
              <p className="text-label mb-2">Depoimentos</p>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-foreground">
                O que dizem as nossas pacientes.
              </h3>
            </div>

            {/* Slider de Cartão Único */}
            <div className="relative flex flex-col items-center gap-4 mb-6">
              
              {/* Setas e Card em Row no Desktop, Column no Mobile */}
              <div className="w-full flex items-center gap-3 sm:gap-4">
              
              {/* Seta Esquerda */}
              <button
                onClick={prevReview}
                className="w-10 h-10 rounded-full border border-border/60 hover:border-foreground/30 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shrink-0"
                aria-label="Avaliação anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Card Único Animado */}
              <div className="flex-1 max-w-xl min-h-[260px] sm:min-h-[220px] flex flex-col justify-between card-testimonial relative overflow-hidden bg-white border border-border/20 p-6 rounded-2xl shadow-sm">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="flex flex-col justify-between h-full"
                  >
                    <div className="flex gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center font-sans text-base font-bold text-primary shrink-0 select-none">
                        {currentReview.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-[14px] sm:text-[16px] font-bold text-foreground truncate">
                          {currentReview.name}
                        </p>
                        <p className="font-sans text-[10px] text-muted-foreground/80 mt-0.5 uppercase tracking-wider">
                          Google Maps • {currentReview.date}
                        </p>
                        <p className="font-sans text-[13px] sm:text-[15px] text-foreground/80 italic leading-relaxed mt-2.5 break-words">
                          &ldquo;{displayedText}&rdquo;
                          {shouldTruncate && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(!isExpanded);
                              }}
                              className="inline-block text-primary font-bold text-[12px] ml-1.5 hover:underline not-italic cursor-pointer"
                            >
                              {isExpanded ? " Ler menos" : " Ler mais"}
                            </button>
                          )}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 mt-4 pl-16">
                      {[...Array(currentReview.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Seta Direita */}
              <button
                onClick={nextReview}
                className="w-10 h-10 rounded-full border border-border/60 hover:border-foreground/30 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors shrink-0"
                aria-label="Próxima avaliação"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              </div>

            </div>

            {/* Pontos de Controle */}
            <div className="flex justify-center gap-1.5">
              {reviewsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    currentIndex === idx ? "bg-primary w-3.5" : "bg-border hover:bg-muted-foreground/30"
                  }`}
                  aria-label={`Ir para avaliação ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
