import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="pt-32 pb-20 min-h-[85vh] flex flex-col items-center justify-center bg-background px-6">
      <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
        
        {/* Imagem de Destaque */}
        <div className="relative w-full max-w-[300px] sm:max-w-[380px] rounded-3xl overflow-hidden shadow-2xl border-4 border-terra/20 mb-10">
          <Image 
            src="/lg_DRA.png" 
            alt="Dra. Danielly Lubian - Terapia Injetável" 
            width={400}
            height={500}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl text-foreground mb-4">
          Página indisponível
        </h1>
        <div className="inline-block bg-terra/10 text-terra font-medium px-4 py-2 rounded-full mb-6">
          Em construção / 404
        </div>
        <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-lg">
          Esta página ainda está sendo preparada ou o link que você acessou não existe mais. 
          Navegue pelo menu ou volte para a página inicial.
        </p>
        <Link href="/" className="btn-primary inline-flex items-center gap-2">
          Voltar para o Início
        </Link>
      </div>
    </div>
  );
}
