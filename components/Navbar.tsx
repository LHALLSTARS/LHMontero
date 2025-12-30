
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['gallery', 'assistant'];
      let current = 'inicio';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: id === 'inicio' ? 0 : offsetPosition,
        behavior: 'smooth'
      });
    } else if (id === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${isScrolled ? 'py-4 bg-black/80 backdrop-blur-2xl border-b border-white/5' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo Lado Izquierdo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => scrollToSection('inicio')}
        >
          <div className="w-10 h-10 glass-panel rounded-lg flex items-center justify-center transition-all group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-cinzel text-lg font-black tracking-widest text-white">MONTERO</span>
            <span className="text-[10px] tracking-[0.4em] text-zinc-500 uppercase font-bold">Cinematography</span>
          </div>
        </div>
        
        {/* Navegación Central */}
        <nav className="hidden md:flex items-center px-8 py-2.5 glass-panel rounded-full gap-8">
          {[
            { id: 'inicio', label: 'Inicio' },
            { id: 'gallery', label: 'Producciones' },
            { id: 'assistant', label: 'IA Creative' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-all hover:text-cyan-400 ${activeSection === item.id ? 'text-cyan-300' : 'text-zinc-500'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Botón Acción Lado Derecho */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => scrollToSection('assistant')}
            className="hidden lg:block text-[11px] font-bold tracking-[0.2em] text-zinc-500 hover:text-white transition-colors"
          >
            SOPORTE
          </button>
          <button 
            onClick={() => scrollToSection('assistant')}
            className="px-6 py-2.5 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 transition-all rounded-full text-[10px] font-black tracking-[0.2em] text-cyan-300 uppercase cinematic-glow"
          >
            CONTACTO
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
