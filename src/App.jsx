import React, { useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';

// 1. IMPORTACIÓN DE ICONOS SEGURA PARA VERCEL
const { 
  Instagram, Video, Palette, ArrowUpRight, TrendingUp, 
  Layers, Eye, Sparkles, Plus, X, Play, Maximize2, 
  ChevronRight, Menu, MousePointer2, MoveUpRight, 
  Camera, Clapperboard 
} = Icons;

const App = () => {
  const cursorRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeMedia, setActiveMedia] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
    const moveCursor = (e) => {
      if (cursorRef.current) {
        const { clientX: x, clientY: y } = e;
        requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.transform = `translate3d(${x - 8}px, ${y - 8}px, 0)`;
          }
        });
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const projects = [
    { 
      id: 1, 
      title: "URBAN MOTION", 
      category: "Video", 
      img: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1200&q=80", 
      tag: "Storytelling",
      description: "Exploración visual del ritmo urbano mediante edición cinética.",
      items: [{ type: 'video', url: "https://www.w3schools.com/html/mov_bbb.mp4", title: "Corte Principal" }]
    },
    { 
      id: 2, 
      title: "DIGITAL PULSE", 
      category: "Social Media", 
      img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80", 
      tag: "Estrategia",
      description: "Campaña viral para marca de tecnología.",
      items: [{ type: 'image', url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80", title: "Métricas" }]
    }
  ];

  const filteredProjects = activeFilter === 'Todos' ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <div className={`app-container ${selectedProject ? '' : 'cursor-none'}`}>
      
      {/* 2. ESTILOS UNIFICADOS (CSS-IN-JS) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@300;400;900&display=swap');

        :root { background: #0e0e0e; color: #f0f0f0; }
        body { margin: 0; background: #0e0e0e; font-family: 'Inter', sans-serif; overflow-x: hidden; }
        
        .app-container { min-height: 100vh; background: #0e0e0e; }
        
        /* El truco del Outline de tu diseño */
        .outline-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.4);
          color: transparent;
          transition: all 0.5s ease;
        }
        .outline-text:hover { color: white; -webkit-text-stroke: 1px transparent; }

        /* Tipografía Masiva como en tu captura */
        .hero-title {
          font-family: 'Archivo Black', sans-serif;
          font-size: clamp(3rem, 12vw, 10rem);
          line-height: 0.8;
          letter-spacing: -0.05em;
          text-transform: uppercase;
        }

        /* Capa de grano */
        .noise {
          position: fixed; inset: 0; z-index: 100; pointer-events: none; opacity: 0.03;
          background-image: url('https://grainy-gradients.vercel.app/noise.svg');
          mix-blend-mode: overlay;
        }

        /* Scrollbar personalizada */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
      `}} />

      <div className="noise"></div>

      {/* Cursor */}
      <div ref={cursorRef} className="fixed w-4 h-4 bg-white rounded-full z-[9999] pointer-events-none mix-blend-difference hidden md:block will-change-transform" style={{ top: 0, left: 0 }}></div>

      {/* Nav */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[150] flex items-center gap-2 p-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
        {['Inicio', 'Trabajo', 'Servicios', 'Contacto'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-all">{item}</a>
        ))}
      </nav>

      {/* Hero */}
      <section id="inicio" className="relative h-screen flex flex-col justify-center px-6 md:px-20">
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <span className="text-xs font-black uppercase tracking-[0.4em] text-white/30 mb-8 block">Social Media · Video · Design</span>
          <h1 className="hero-title">
            VISUAL <br />
            <span className="outline-text italic">STORY</span>TELLER.
          </h1>
          <div className="mt-12 flex flex-col md:flex-row gap-8 items-start">
            <p className="text-white/50 max-w-sm text-lg font-light leading-relaxed">Transformando la visión de marcas contemporáneas en realidades digitales.</p>
            <a href="#trabajo" className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest border border-white/20 px-8 py-5 rounded-full hover:bg-white hover:text-black transition-all">
              Explorar <MoveUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Trabajos */}
      <section id="trabajo" className="py-32 px-6 md:px-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl font-black uppercase italic mb-20 tracking-tighter">TRABAJOS.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {filteredProjects.map((project) => (
              <div key={project.id} onClick={() => setSelectedProject(project)} className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-900 shadow-2xl">
                  <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" />
                </div>
                <h3 className="mt-8 text-3xl font-black uppercase tracking-tighter">{project.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="py-40 px-6 md:px-20 border-t border-white/5">
        <h2 className="text-[12vw] font-black uppercase italic leading-none">READY?</h2>
        <div className="mt-12 flex gap-12">
           <a href="#" className="text-xs font-black uppercase tracking-widest text-white/30 hover:text-white">Instagram</a>
           <a href="#" className="text-xs font-black uppercase tracking-widest text-white/30 hover:text-white">Email</a>
        </div>
      </footer>

      {/* Modal Simplificado */}
      {selectedProject && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-4">
          <button onClick={() => setSelectedProject(null)} className="absolute top-8 right-8 text-white"><X size={40} /></button>
          <div className="text-center max-w-2xl">
            <h2 className="text-5xl font-black italic mb-6">{selectedProject.title}</h2>
            <p className="text-xl text-white/60">{selectedProject.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;