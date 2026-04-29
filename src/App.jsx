import React, { useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';

// Destructuración segura para evitar errores de compilación en Vercel
const { 
  X, Play, Maximize2, MoveUpRight 
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
    <div className={`min-h-screen bg-[#0e0e0e] text-[#f0f0f0] font-sans selection:bg-white selection:text-black overflow-x-hidden ${selectedProject ? '' : 'cursor-none'}`}>
      
      {/* Capa de grano digital */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Cursor Personalizado */}
      <div ref={cursorRef} className="fixed w-4 h-4 bg-white rounded-full z-[9999] pointer-events-none mix-blend-difference hidden md:block will-change-transform" style={{ top: 0, left: 0 }}></div>

      {/* Navegación Flotante */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[150] flex items-center gap-2 p-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
        {['Inicio', 'Trabajo', 'Servicios', 'Contacto'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/10 transition-all">{item}</a>
        ))}
      </nav>

      {/* HERO SECTION - REPRODUCCIÓN EXACTA DE TU IMAGEN */}
      <section id="inicio" className="relative h-screen flex flex-col justify-center px-6 md:px-20 overflow-hidden">
        <div className="max-w-7xl w-full mx-auto relative">
          <div className={`transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <span className="inline-block text-xs font-black uppercase tracking-[0.4em] text-white/30 mb-8 border-l-2 border-white/20 pl-4">
              Social Media · Video · Design
            </span>
            <h1 className="text-[14vw] md:text-[11vw] font-black leading-[0.8] tracking-tighter uppercase hero-title">
              VISUAL <br />
              <span className="italic outline-text">STORY</span>TELLER.
            </h1>
            <div className="mt-12 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-20">
              <p className="text-white/50 max-w-sm text-lg font-light leading-relaxed">
                Transformando la visión de marcas contemporáneas en realidades digitales mediante estrategia y movimiento.
              </p>
              <a href="#trabajo" className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest border border-white/20 px-8 py-5 rounded-full hover:bg-white hover:text-black transition-all">
                Explorar Trabajos <MoveUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Elemento decorativo vertical */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block opacity-5 pointer-events-none">
            <div className="text-[25vw] font-black tracking-tighter select-none rotate-90 translate-x-1/2">CREATIVE</div>
        </div>
      </section>

      {/* SECCIÓN TRABAJO */}
      <section id="trabajo" className="py-32 px-6 md:px-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic mb-20">TRABAJOS.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {filteredProjects.map((project, idx) => (
              <div key={project.id} onClick={() => { setSelectedProject(project); document.body.style.overflow = 'hidden'; }} className={`group relative cursor-pointer ${idx % 2 !== 0 ? 'md:mt-32' : ''}`}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-900 shadow-2xl">
                  <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 font-black text-[10px] uppercase">Explorar</div>
                  </div>
                </div>
                <div className="mt-8">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2 block">{project.category}</span>
                  <h3 className="text-3xl font-black uppercase tracking-tighter">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contacto" className="py-40 px-6 md:px-20 bg-[#0e0e0e] border-t border-white/5">
        <h2 className="text-[12vw] md:text-[8vw] font-black leading-none tracking-tighter uppercase italic">READY?</h2>
        <div className="mt-12 flex gap-12">
           <a href="#" className="text-xs font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors">Instagram</a>
           <a href="#" className="text-xs font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors">Email</a>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');
        
        .hero-title {
          font-family: 'Archivo Black', sans-serif;
          letter-spacing: -0.04em;
        }

        .outline-text {
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.4);
          color: transparent;
        }
        
        .outline-text:hover {
          color: white;
          -webkit-text-stroke: 1.5px transparent;
        }

        html { scroll-behavior: smooth; }
        body { background-color: #0e0e0e; }
      `}</style>
    </div>
  );
};

export default App;