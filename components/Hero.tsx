
import React from 'react';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background cinemático con más profundidad */}
      <div className="absolute inset-0 z-0 scale-105">
        <img 
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop&grayscale=true" 
          alt="Cinematic Vision" 
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(34,211,238,0.08)_0%,_transparent_60%)]"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
        {/* Layer de texto de fondo estilizado */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-full select-none pointer-events-none overflow-hidden opacity-50">
          <h2 className="text-[12vw] font-black tracking-tighter text-outline font-cinzel opacity-20 whitespace-nowrap leading-none">
            EL DIAMANTE • EL DIAMANTE • EL DIAMANTE
          </h2>
        </div>

        {/* Contenido Principal */}
        <div className="relative flex flex-col items-center">
          <div className="mb-8 opacity-0 animate-fade-up">
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-cyan-400"></div>
          </div>

          <h1 className="flex flex-col gap-2 mb-8 opacity-0 animate-fade-up delay-100">
             <span className="text-xs md:text-sm font-bold tracking-[0.6em] text-cyan-400 uppercase mb-2">Cinematografía de Alto Impacto</span>
             <span className="text-6xl md:text-[100px] font-black font-cinzel leading-none tracking-tight">
               MONTERO <span className="diamond-gradient">FILMS</span>
             </span>
          </h1>

          <div className="flex items-center gap-4 text-zinc-500 mb-12 opacity-0 animate-fade-up delay-200">
            <span className="w-8 h-px bg-zinc-800"></span>
            <p className="text-sm md:text-base tracking-[0.3em] font-light uppercase whitespace-nowrap">
              Excelencia Visual <span className="text-cyan-500 mx-2">•</span> Narrativa <span className="text-cyan-500 mx-2">•</span> Impacto
            </p>
            <span className="w-8 h-px bg-zinc-800"></span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 animate-fade-up delay-300">
            <button 
              onClick={onCtaClick}
              className="group relative px-10 py-5 bg-white text-black font-bold tracking-widest uppercase transition-all overflow-hidden cinematic-glow active:scale-95"
            >
              <span className="relative z-10 transition-colors group-hover:text-black">Explorar Portfolio</span>
              <div className="absolute inset-0 bg-cyan-400 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
            </button>
            
            <button className="px-10 py-5 border border-zinc-800 hover:border-cyan-400 hover:text-cyan-400 transition-all font-bold tracking-widest uppercase bg-black/40 backdrop-blur-md active:scale-95">
              Solicitar Presupuesto
            </button>
          </div>
        </div>
      </div>

      {/* Indicador de scroll minimalista */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-up delay-300">
        <button onClick={onCtaClick} className="flex flex-col items-center gap-4 group">
          <div className="w-6 h-10 border-2 border-zinc-800 rounded-full p-1 relative overflow-hidden">
             <div className="w-1 h-2 bg-cyan-400 rounded-full absolute top-2 left-1/2 -translate-x-1/2 animate-bounce"></div>
          </div>
          <span className="text-[10px] tracking-[0.5em] text-zinc-600 uppercase group-hover:text-zinc-400 transition-colors">Scroll</span>
        </button>
      </div>
    </div>
  );
};

export default Hero;
