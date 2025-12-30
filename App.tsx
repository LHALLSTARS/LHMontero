
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VideoGrid from './components/VideoGrid';
import DiamondAssistant from './components/DiamondAssistant';
import BudgetPopup from './components/BudgetPopup';
import { ProductionVideo } from './types';

const VIDEOS: ProductionVideo[] = [
  { id: '1', title: 'Y nos matamos', artist: 'Belltran', youtubeId: 'dcWXyjXAbxE' },
  { id: '2', title: 'Mi Glock', artist: "Getto'K ft. La PrensaHD X Fa.big", youtubeId: 'A6OLlgzCdn8' },
  { id: '3', title: 'JIMMYFLOWXSIEMPRE', artist: 'Jimmy Flow', youtubeId: 'Ucbn2gdMf4w' },
  { id: '4', title: 'Live Show', artist: 'Fa Big', youtubeId: 'aqA27YCwO7Y', thumbnail: 'https://img.youtube.com/vi/aqA27YCwO7Y/hqdefault.jpg' },
  { id: '5', title: 'Dónde Estás?', artist: 'SHK ft. Drago200', youtubeId: '1S-HqMXfIqE' },
  { id: '6', title: 'Te Guste', artist: 'Sendo Siempre Fresh x Deibeat', youtubeId: 'r0SaXV8jFmo' },
];

const SERVICES = [
  {
    title: "Pre-Producción",
    desc: "Guionización y storyboarding técnico.",
    role: "El Guionista",
    style: "from-zinc-500/20 to-zinc-900/40",
    accent: "bg-zinc-400",
    border: "border-zinc-500/30",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  },
  {
    title: "Arte Visual",
    desc: "Curaduría estética y paletas de color.",
    role: "El Director de Arte",
    style: "from-fuchsia-500/20 to-purple-900/40",
    accent: "bg-fuchsia-400",
    border: "border-fuchsia-500/30",
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
  },
  {
    title: "VFX & Animación",
    desc: "Magia digital y CGI de alto nivel.",
    role: "El Mago Visual",
    style: "from-purple-600/20 to-indigo-950/40",
    accent: "bg-purple-400",
    border: "border-purple-500/30",
    icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z"
  },
  {
    title: "Styling & Makeup",
    desc: "Imagen y estética de personajes.",
    role: "El Estilista",
    style: "from-pink-500/20 to-rose-900/40",
    accent: "bg-pink-400",
    border: "border-pink-500/30",
    icon: "M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2m4 0v2m0 0a2 2 0 100 4 2 2 0 000-4m-2 10a2 2 0 114 0h-4z"
  },
  {
    title: "Locaciones",
    desc: "Scouting de espacios exclusivos.",
    role: "El Explorador",
    style: "from-orange-500/20 to-stone-900/40",
    accent: "bg-orange-400",
    border: "border-orange-500/30",
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
  },
  {
    title: "Casting & Modelos",
    desc: "Talento y perfiles para cada visión.",
    role: "El Talento",
    style: "from-rose-500/20 to-rose-950/40",
    accent: "bg-rose-400",
    border: "border-rose-500/30",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
  },
  {
    title: "Equipamiento",
    desc: "RED/ARRI y grip profesional.",
    role: "El Técnico",
    style: "from-cyan-500/20 to-blue-900/40",
    accent: "bg-cyan-400",
    border: "border-cyan-500/30",
    icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
  },
  {
    title: "Drones & FPV",
    desc: "Capturas aéreas envolventes.",
    role: "El Piloto",
    style: "from-sky-500/20 to-slate-900/40",
    accent: "bg-sky-400",
    border: "border-sky-500/30",
    icon: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
  },
  {
    title: "Ópticas & Lentes",
    desc: "Anamórficos y cristales de cine.",
    role: "El Director de Foto",
    style: "from-emerald-500/20 to-teal-900/40",
    accent: "bg-emerald-400",
    border: "border-emerald-500/30",
    icon: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z M12 9v2m0 4h.01"
  },
  {
    title: "Monetización",
    desc: "Estrategias y retorno de inversión.",
    role: "El Productor",
    style: "from-amber-500/20 to-yellow-900/40",
    accent: "bg-amber-400",
    border: "border-amber-500/30",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  },
  {
    title: "Derechos & Licencias",
    desc: "Gestión legal y propiedad intelectual.",
    role: "El Protector",
    style: "from-stone-600/20 to-gray-900/40",
    accent: "bg-stone-400",
    border: "border-stone-500/30",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
  },
  {
    title: "Contenido",
    desc: "Cobertura orgánica para redes.",
    role: "El Cronista",
    style: "from-lime-500/20 to-emerald-900/40",
    accent: "bg-lime-400",
    border: "border-lime-500/30",
    icon: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
  },
  {
    title: "Traslado & Logística",
    desc: "Gestión completa de transporte.",
    role: "El Road Manager",
    style: "from-indigo-500/20 to-indigo-950/40",
    accent: "bg-indigo-400",
    border: "border-indigo-500/30",
    icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
  },
  {
    title: "Diseño Sonoro & Mix",
    desc: "Paisajes sonoros inmersivos.",
    role: "El Diseñador de Sonido",
    style: "from-violet-500/20 to-violet-950/40",
    accent: "bg-violet-400",
    border: "border-violet-500/30",
    icon: "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
  },
  {
    title: "Edición",
    desc: "Edición rítmica y narrativa visual.",
    role: "El Editor",
    style: "from-red-500/20 to-red-950/40",
    accent: "bg-red-400",
    border: "border-red-500/30",
    icon: "M8 5v14l11-7z"
  },
];

const App: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<ProductionVideo | null>(null);
  const [isBudgetPopupOpen, setIsBudgetPopupOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black">
      <Navbar />

      <main id="inicio">
        <Hero onCtaClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })} />

        <section id="gallery" className="py-32 px-6 sm:px-12 lg:px-24 max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold tracking-[0.5em] text-cyan-400 uppercase mb-4 block">Portafolio Seleccionado</span>
              <h2 className="text-5xl md:text-7xl font-cinzel font-black leading-none mb-6">
                PRODUCCIONES <span className="diamond-gradient">RECIENTES</span>
              </h2>
              <p className="text-zinc-500 text-lg leading-relaxed max-w-lg">
                Proyectos capturados con una visión técnica impecable y una narrativa emocional profunda. Elevamos el estándar del contenido digital.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="h-24 w-px bg-gradient-to-t from-cyan-500 to-transparent hidden md:block"></div>
              <div className="text-right">
                <p className="text-6xl font-cinzel font-black opacity-10 leading-none">2025</p>
                <p className="text-[10px] tracking-widest text-zinc-600 uppercase mt-2">Current Collection</p>
              </div>
            </div>
          </div>

          <VideoGrid videos={VIDEOS} onSelectVideo={setActiveVideo} />
        </section>

        <section id="assistant" className="relative py-32 bg-zinc-950 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>

          <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-24">
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-16 items-start">

              <div className="xl:col-span-3">
                <span className="text-xs font-bold tracking-[0.5em] text-cyan-500 uppercase mb-6 block">Concepto Diamante</span>
                <h2 className="text-5xl md:text-6xl font-cinzel font-black mb-8 leading-tight">
                  SOLUCIONES <span className="diamond-gradient">HUMANAS</span>
                </h2>
                <p className="text-zinc-400 mb-12 text-lg leading-relaxed max-w-3xl">
                  Entendemos que el cine es un puente entre las personas y su visión. Cada color representa una faceta de la actividad humana aplicada a la gran pantalla.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SERVICES.map((s, idx) => (
                    <div
                      key={idx}
                      className={`group relative p-6 rounded-2xl border ${s.border} bg-gradient-to-br ${s.style} backdrop-blur-sm overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/50`}
                    >
                      <div className={`absolute top-0 left-0 w-full h-1 ${s.accent} opacity-40 group-hover:opacity-100 transition-opacity`}></div>

                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-2 rounded-lg ${s.accent} bg-opacity-20 text-white`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                            </svg>
                          </div>
                          <span className="text-[8px] font-black tracking-[0.3em] uppercase opacity-40 group-hover:opacity-100 transition-opacity text-white">
                            PRO-FILM LEVEL
                          </span>
                        </div>

                        <p className={`text-[10px] font-bold tracking-widest uppercase mb-1 transition-colors duration-300 ${s.accent.replace('bg-', 'text-')}`}>
                          {s.role}
                        </p>
                        <h4 className="text-lg font-cinzel font-bold text-white mb-2 tracking-tight group-hover:diamond-gradient">
                          {s.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
                          {s.desc}
                        </p>

                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 opacity-30 group-hover:opacity-70 transition-opacity">
                          <div className="w-2 h-2 rounded-sm bg-white/20"></div>
                          <div className="w-2 h-2 rounded-sm bg-white/20"></div>
                          <div className="flex-1 h-px bg-white/10"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="xl:col-span-2 relative">
                <div className="sticky top-32">
                  <div className="absolute -inset-10 bg-cyan-500/5 blur-[120px] rounded-full"></div>
                  <div className="mb-6">
                    <h3 className="text-xl font-cinzel font-bold mb-2">CONSULTORÍA CREATIVA</h3>
                    <p className="text-sm text-zinc-500">Usa nuestra IA para conectar el factor humano con los detalles técnicos de tu próxima producción.</p>
                  </div>
                  <DiamondAssistant />

                  {/* Budget CTA */}
                  <div className="mt-6 p-6 glass-panel rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-950/20 to-transparent">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/30 to-cyan-900/30 border border-cyan-500/50 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-cyan-400">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-cinzel font-bold text-white mb-1">¿Listo para crear?</h4>
                        <p className="text-xs text-zinc-500 mb-4">Solicita un presupuesto personalizado para tu proyecto</p>
                        <button
                          onClick={() => setIsBudgetPopupOpen(true)}
                          className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black font-bold tracking-wider uppercase rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] text-sm"
                        >
                          Solicitar Presupuesto
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {activeVideo && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/98 p-4 md:p-12 animate-in fade-in duration-500"
          onClick={() => setActiveVideo(null)}
        >
          <div className="relative w-full max-w-6xl aspect-video glass-panel rounded-sm overflow-hidden shadow-[0_0_100px_rgba(34,211,238,0.1)]" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-all z-20 group"
              onClick={() => setActiveVideo(null)}
            >
              <div className="p-2 glass-panel rounded-full group-hover:bg-white/10 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </div>
            </button>

            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1&origin=${window.location.origin}`}
              title={activeVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>

            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none">
              <p className="text-cyan-400 text-xs font-bold tracking-[0.4em] uppercase mb-1">{activeVideo.artist}</p>
              <h3 className="text-2xl font-cinzel font-bold text-white">{activeVideo.title}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Floating Budget Button */}
      <button
        onClick={() => setIsBudgetPopupOpen(true)}
        className="fixed bottom-8 right-8 z-[100] w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black shadow-[0_0_40px_rgba(34,211,238,0.4)] hover:shadow-[0_0_60px_rgba(34,211,238,0.6)] transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        aria-label="Solicitar Presupuesto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="group-hover:scale-110 transition-transform">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
          !
        </span>
      </button>

      {/* Budget Popup Modal */}
      <BudgetPopup isOpen={isBudgetPopupOpen} onClose={() => setIsBudgetPopupOpen(false)} />

      <footer className="py-20 border-t border-zinc-900 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          {/* Newsletter Section */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="glass-panel rounded-2xl p-8 md:p-12 border border-white/10">
              <div className="text-center mb-8">
                <span className="text-xs font-bold tracking-[0.5em] text-cyan-400 uppercase mb-4 block">Newsletter</span>
                <h3 className="text-3xl md:text-4xl font-cinzel font-black mb-4">
                  MANTENTE <span className="diamond-gradient">CONECTADO</span>
                </h3>
                <p className="text-zinc-500 text-sm">
                  Recibe actualizaciones exclusivas sobre nuestros proyectos y contenido detrás de cámaras.
                </p>
              </div>

              <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 px-6 py-4 bg-black/50 border border-white/10 rounded-lg text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-black font-bold tracking-wider uppercase rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                >
                  Suscribirse
                </button>
              </form>

              <p className="text-zinc-700 text-[10px] text-center mt-4 tracking-wide">
                No spam. Solo contenido de calidad cinematográfica.
              </p>
            </div>
          </div>

          {/* Footer Content */}
          <div className="text-center">
            <div className="mb-8 inline-block">
              <h2 className="text-2xl font-cinzel font-black tracking-[0.3em] diamond-gradient">MONTERO FILMS</h2>
              <div className="w-12 h-px bg-cyan-500 mx-auto mt-2"></div>
            </div>
            <p className="text-zinc-600 text-xs tracking-[0.2em] font-medium uppercase mb-8">Elevando el estándar de la producción audiovisual</p>
            <div className="flex justify-center gap-8 mb-12">
              {['Instagram', 'Youtube', 'Vimeo'].map(social => (
                <a key={social} href="#" className="text-zinc-500 hover:text-cyan-400 text-[10px] font-bold tracking-widest uppercase transition-colors">{social}</a>
              ))}
            </div>
            <p className="text-zinc-800 text-[10px] uppercase tracking-widest">© 2025 Montero Films - El Diamante. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
