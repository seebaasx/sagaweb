import React, { useState, useEffect, useRef } from 'react';
import * as Icons from 'lucide-react';

// Extraemos los iconos de forma segura
const { 
  Video, Palette, ArrowUpRight, TrendingUp, Layers, Eye, 
  Sparkles, Plus, X, Play, Maximize2, ChevronRight, 
  Menu, MousePointer2, MoveUpRight, Camera, Clapperboard 
} = Icons;

const App = () => {
  const cursorRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeMedia, setActiveMedia] = useState(null);
  const [scrollY, setScrollY] = useState(0);

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
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('scroll', handleScroll);
    };
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
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div ref={cursorRef} className="fixed w-4 h-4 bg-white rounded-full z-[9999] pointer-events-none mix-blend-difference hidden md:block will-change-transform" style={{ top: 0, left: 0 }}></div>

      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[150] flex items-center gap-2 p-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
        {['Inicio', 'Trabajo', 'Servicios', 'Contacto'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/10 transition-all">{item}</a>
        ))}
      </nav>

      <section id="inicio" className="relative h-screen flex flex-col justify-center px-6 md:px-20">
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h1 className="text-[14vw] md:text-[10vw] font-black leading-[0.8] tracking-tighter uppercase">
            SAGASOCIAL<br /><span className="italic opacity-50">STUDIO</span>.
          </h1>
          <p className="mt-8 text-white/50 max-w-sm text-lg font-light">Transformando marcas mediante estrategia y movimiento.</p>
        </div>
      </section>

      <section id="trabajo" className="py-32 px-6 md:px-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-24">
            <h2 className="text-6xl font-black uppercase italic">TRABAJOS.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {filteredProjects.map((project) => (
              <div key={project.id} onClick={() => { setSelectedProject(project); document.body.style.overflow = 'hidden'; }} className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-900">
                  <img src={project.img} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h3 className="mt-6 text-2xl font-black uppercase">{project.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contacto" className="py-40 px-6 md:px-20 border-t border-white/5">
        <h2 className="text-[10vw] font-black uppercase italic">READY?</h2>
        <div className="mt-12 flex gap-8">
           <a href="#" className="text-xs font-black uppercase tracking-widest text-white/30 hover:text-white">Instagram</a>
           <a href="#" className="text-xs font-black uppercase tracking-widest text-white/30 hover:text-white">Email</a>
        </div>
      </footer>

      {selectedProject && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-[#0e0e0e]/95 backdrop-blur-3xl">
          <button onClick={() => { setSelectedProject(null); document.body.style.overflow = 'auto'; }} className="absolute top-8 right-8 text-white"><X size={32} /></button>
          <div className="text-center">
            <h2 className="text-5xl font-black italic mb-4">{selectedProject.title}</h2>
            <p className="text-white/60">{selectedProject.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;