"use client";

import { motion } from "framer-motion";

// Inline Icon para Instagram caso não esteja na versão do lucide
function Instagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
    </svg>
  );
}

export function InstagramSection() {
  return (
    <section className="py-24 bg-background border-t border-border/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Instagram className="w-8 h-8 text-terra" />
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-foreground">
                Conheça meu Instagram!
              </h2>
            </div>
            <p className="font-sans text-[15px] text-muted-foreground max-w-lg">
              Acompanhe dicas diárias sobre saúde, longevidade, performance metabólica e estilo de vida.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <a
              href="https://www.instagram.com/dradanilubian/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-terra text-terra rounded-full font-sans text-[16px] font-bold hover:bg-terra hover:text-white transition-colors"
            >
              @dradanilubian
            </a>
          </motion.div>
        </div>

        {/* Grid de Posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full flex justify-center bg-white rounded-3xl overflow-hidden shadow-lg border border-border/50"
          >
            <iframe
              src="https://www.instagram.com/reel/DZYkeFPzOrQ/embed"
              className="w-full"
              height="580"
              frameBorder="0"
              scrolling="no"

            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full flex justify-center bg-white rounded-3xl overflow-hidden shadow-lg border border-border/50"
          >
            <iframe
              src="https://www.instagram.com/p/DRmeibEDbX8/embed"
              className="w-full"
              height="580"
              frameBorder="0"
              scrolling="no"

            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full flex justify-center bg-white rounded-3xl overflow-hidden shadow-lg border border-border/50"
          >
            <iframe
              src="https://www.instagram.com/reel/DaDe9e_zaSk/embed"
              className="w-full"
              height="580"
              frameBorder="0"
              scrolling="no"

            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}

