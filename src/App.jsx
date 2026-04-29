import { 
  Instagram, 
  Linkedin, 
  Video, 
  Palette, 
  ArrowUpRight, 
  TrendingUp, 
  Layers, 
  Eye, 
  Sparkles, 
  Plus, 
  X, 
  Play, 
  Maximize2, 
  ChevronRight,
  Menu,
  MousePointer2,
  MoveUpRight,
  Camera,
  Clapperboard
} from 'lucide-react';

const App = () => {
  const cursorRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeMedia, setActiveMedia] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    
    // Gestión del cursor con Refs para máxima fluidez (sin lag de estado)
    const moveCursor = (e) => {
      if (cursorRef.current) {
        const { clientX: x, clientY: y } = e;
        // Usamos requestAnimationFrame para sincronizar con los frames del monitor
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
      size: "large", 
      img: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1200&q=80", 
      tag: "Storytelling",
      description: "Exploración visual del ritmo urbano mediante edición cinética y diseño sonoro.",
      items: [
        { type: 'video', url: "https://www.w3schools.com/html/mov_bbb.mp4", thumb: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80", title: "Corte Principal" },
        { type: 'video', url: "https://www.w3schools.com/html/movie.mp4", thumb: "https://images.unsplash.com/photo-1492691523567-30730029d031?w=800&q=80", title: "Detrás de Cámaras" }
      ]
    },
    { 
      id: 2, 
      title: "DIGITAL PULSE", 
      category: "Social Media", 
      size: "medium", 
      img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80", 
      tag: "Estrategia",
      description: "Campaña viral para marca de tecnología basada en engagement interactivo.",
      items: [
        { type: 'image', url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80", title: "Métricas de Impacto" },
        { type: 'image', url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80", title: "Estructura de Contenidos" }
      ]
    },
    { 
      id: 3, 
      title: "NEO BRANDING", 
      category: "Diseño", 
      size: "small", 
      img: "https://images.unsplash.com/photo-1634942537034-2531766767d7?w=800&q=80", 
      tag: "Identidad",
      description: "Nueva identidad visual para startup disruptiva del sector creativo.",
      items: [
        { type: 'image', url: "https://images.unsplash.com/photo-1634942537034-2531766767d7?w=1200&q=80", title: "Logo Concept" },
        { type: 'image', url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200&q=80", title: "Brand Assets" }
      ]
    },
    { 
      id: 4, 
      title: "KINETIC TYPE", 
      category: "Diseño", 
      size: "medium", 
      img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80", 
      tag: "Motion",
      description: "Experimentación con tipografía en movimiento para campañas publicitarias.",
      items: [
        { type: 'video', url: "https://www.w3schools.com/html/mov_bbb.mp4", thumb: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80", title: "Animación de Texto" }
      ]
    }
  ];

  const filteredProjects = activeFilter === 'Todos' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const openProject = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProject = () => {
    setSelectedProject(null);
    setActiveMedia(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className={`min-h-screen bg-[#0e0e0e] text-[#f0f0f0] font-sans selection:bg-white selection:text-black overflow-x-hidden ${selectedProject ? '' : 'cursor-none'}`}>
      
      {/* Capa de grano digital */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Cursor Personalizado Optimizado */}
      <div 
        ref={cursorRef}
        className="fixed w-4 h-4 bg-white rounded-full z-[9999] pointer-events-none mix-blend-difference hidden md:block will-change-transform"
        style={{ top: 0, left: 0 }}
      ></div>

      {/* Navegación Flotante */}
      <nav className={`fixed top-8 left-1/2 -translate-x-1/2 z-[150] transition-all duration-700 flex items-center gap-2 p-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full`}>
        {['Inicio', 'Trabajo', 'Servicios', 'Contacto'].map((item) => (
          <a 
            key={item}
            href={`#${item.toLowerCase()}`} 
            className="px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/10 transition-all"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* HERO SECTION */}
      <section id="inicio" className="relative h-screen flex flex-col justify-center px-6 md:px-20 overflow-hidden">
        <div className="max-w-7xl w-full mx-auto relative">
          <div className={`transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <span className="inline-block text-xs font-black uppercase tracking-[0.4em] text-white/30 mb-8 border-l-2 border-white/20 pl-4">
              Social Media · Video · Design
            </span>
            <h1 className="text-[14vw] md:text-[10vw] font-black leading-[0.8] tracking-tighter uppercase">
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

        {/* Elemento decorativo */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block opacity-5 pointer-events-none">
           <div className="text-[25vw] font-black tracking-tighter select-none rotate-90 translate-x-1/2">CREATIVE</div>
        </div>
      </section>

      {/* SECCIÓN TRABAJO */}
      <section id="trabajo" className="py-32 px-6 md:px-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none italic">TRABAJOS.</h2>
            <div className="flex gap-4">
              {['Todos', 'Video', 'Diseño', 'Social Media'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`text-[10px] font-bold uppercase tracking-widest transition-all ${activeFilter === filter ? 'text-white underline underline-offset-8' : 'text-white/30 hover:text-white'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
            {filteredProjects.map((project, idx) => (
              <div 
                key={project.id}
                onClick={() => openProject(project)}
                className={`group relative cursor-pointer ${idx % 2 !== 0 ? 'md:mt-32' : ''}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-900 shadow-2xl">
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 group-hover:rotate-1 opacity-80 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl font-black text-[10px] uppercase tracking-tighter">Explorar</div>
                  </div>
                </div>
                <div className="mt-8">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2 block">{project.category} / {project.tag}</span>
                  <h3 className="text-3xl font-black uppercase tracking-tighter group-hover:text-white/70 transition-colors">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN SERVICIOS */}
      <section id="servicios" className="py-40 px-6 md:px-20 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="space-y-8">
                <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter italic">EXPERTISE.</h2>
                <p className="text-black/60 text-xl font-medium leading-relaxed max-w-md italic">
                  Abordando proyectos complejos con una mentalidad de diseño holística. 
                  Del concepto a la ejecución final.
                </p>
             </div>
             <div className="space-y-4">
                <ServiceItem number="01" title="Social Media Management" desc="Estrategia de contenido, gestión de comunidades y crecimiento basado en datos." />
                <ServiceItem number="02" title="Edición de Vídeo & Motion" desc="Narrativas de alto impacto para formatos cortos y largos con post-producción avanzada." />
                <ServiceItem number="03" title="Diseño & Identidad" desc="Sistemas visuales coherentes que comunican el propósito de tu marca." />
             </div>
          </div>
        </div>
      </section>

      {/* MODAL DE PROYECTO (DASHBOARD) */}
      {selectedProject && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0e0e0e]/95 backdrop-blur-3xl animate-in fade-in duration-500" onClick={closeProject}></div>
          <div className="relative bg-[#151515] w-full max-w-7xl h-full max-h-[90vh] rounded-3xl shadow-2xl border border-white/5 overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 duration-500">
            
            <div className="p-8 md:p-12 flex justify-between items-center bg-white/5 border-b border-white/5">
              <div>
                <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] block mb-2">{selectedProject.category}</span>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">{selectedProject.title}</h2>
              </div>
              <button onClick={closeProject} className="w-16 h-16 bg-white/5 hover:bg-white hover:text-black rounded-full flex items-center justify-center transition-all">
                <X size={28} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
               <div className="max-w-3xl mb-24">
                  <h4 className="text-xs font-black uppercase text-white/20 tracking-widest mb-6">Overview</h4>
                  <p className="text-2xl md:text-3xl font-light text-white/70 leading-snug italic">{selectedProject.description}</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {selectedProject.items.map((item, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setActiveMedia(item)}
                      className="group relative aspect-video bg-white/5 rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all"
                    >
                      <img src={item.thumb || item.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100 transition-all duration-700" alt={item.title} />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform">
                            {item.type === 'video' ? <Play size={20} className="fill-black" /> : <Maximize2 size={20} />}
                         </div>
                      </div>
                      <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">{item.title}</span>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      )}

      {/* REPRODUCTOR LIGHTBOX */}
      {activeMedia && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 md:p-20 bg-black/98 backdrop-blur-2xl animate-in fade-in duration-300" onClick={() => setActiveMedia(null)}>
           <div className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500" onClick={e => e.stopPropagation()}>
              <button onClick={() => setActiveMedia(null)} className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/10 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition-all">
                <X size={24} />
              </button>
              {activeMedia.type === 'video' ? (
                <video src={activeMedia.url} controls autoPlay className="w-full h-full bg-black object-contain" />
              ) : (
                <img src={activeMedia.url} className="w-full h-full object-contain" alt={activeMedia.title} />
              )}
           </div>
        </div>
      )}

      {/* FOOTER */}
      <footer id="contacto" className="py-40 px-6 md:px-20 bg-[#0e0e0e]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-20">
          <div>
            <h2 className="text-[12vw] md:text-[8vw] font-black leading-none tracking-tighter uppercase italic">READY?</h2>
            <div className="mt-12 flex gap-12">
               <a href="#" className="text-xs font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors">Instagram</a>
               <a href="#" className="text-xs font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors">LinkedIn</a>
               <a href="#" className="text-xs font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors">Email</a>
            </div>
          </div>
          <div className="text-right">
             <div className="text-xs font-black uppercase tracking-[0.5em] text-white/20 mb-8">© 2024 CREATIVE SYNC</div>
             <p className="text-white/40 text-sm max-w-xs ml-auto italic font-light tracking-wide">Transformando visiones en impacto digital.</p>
          </div>
        </div>
      </footer>

      <style>{`
        .outline-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.4);
          color: transparent;
        }
        .outline-text:hover {
          color: white;
          -webkit-text-stroke: 1px transparent;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
        html { scroll-behavior: smooth; }
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 1s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        body { cursor: default; }
      `}</style>
    </div>
  );
};

const ServiceItem = ({ number, title, desc }) => (
  <div className="group border-b border-black/10 py-10 flex flex-col md:flex-row gap-8 md:items-center hover:px-6 transition-all duration-500 cursor-default">
    <span className="text-xs font-black text-black/20 group-hover:text-black transition-colors">{number}</span>
    <h3 className="text-3xl font-black uppercase tracking-tighter md:w-1/2">{title}</h3>
    <p className="text-black/40 text-sm font-medium italic md:w-1/2 group-hover:text-black transition-colors">{desc}</p>
  </div>
);

export default App;