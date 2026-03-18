import { useState, useEffect, createContext, useContext } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Network, Database, Zap, Shield, ArrowRight, Menu, X, ChevronRight, Globe } from 'lucide-react';

type Language = 'en' | 'es';

const translations = {
  en: {
    nav: { services: 'Services', platform: 'Platform', cases: 'Use Cases', contact: 'Contact Us' },
    hero: { tag: 'Next-Gen Data Infrastructure', title1: 'Connecting data,', title2: 'elevating innovation.', desc: 'Nexova provides minimalist, high-performance network solutions designed for modern technology companies. Experience data flow without friction.', explore: 'Explore Platform', docs: 'Read Documentation' },
    services: { title: 'Core Capabilities', desc: 'We strip away complexity to provide tools that simply work. Focus on building, while we handle the invisible layer of your technology.', s1Title: 'Network Optimization', s1Desc: 'Intelligent routing algorithms that reduce latency and ensure zero downtime for critical infrastructure.', s2Title: 'Distributed Data', s2Desc: 'Seamlessly sync data across global nodes with our ultra-lightweight proprietary data layer.', s3Title: 'Zero-Trust Security', s3Desc: 'Enterprise-grade encryption and automated threat detection, built directly into the network.', learnMore: 'Learn more' },
    cta: { title: 'Ready to defy gravity?', desc: "Join the forward-thinking teams using Nexova to power their next-generation applications. Let's build something weightless together.", button: 'Start Your Journey' },
    footer: { privacy: 'Privacy', terms: 'Terms' }
  },
  es: {
    nav: { services: 'Servicios', platform: 'Plataforma', cases: 'Casos de Uso', contact: 'Contáctanos' },
    hero: { tag: 'Infraestructura de Datos de Próxima Generación', title1: 'Conectando datos,', title2: 'elevando la innovación.', desc: 'Nexova provee soluciones de red minimalistas y de alto rendimiento diseñadas para empresas tecnológicas modernas. Experimenta el flujo de datos sin fricción.', explore: 'Explorar Plataforma', docs: 'Leer Documentación' },
    services: { title: 'Capacidades Principales', desc: 'Eliminamos la complejidad para ofrecer herramientas que simplemente funcionan. Concéntrate en construir, mientras nosotros gestionamos la capa invisible de tu tecnología.', s1Title: 'Optimización de Red', s1Desc: 'Algoritmos de enrutamiento inteligente que reducen la latencia y aseguran cero tiempo de inactividad para infraestructura crítica.', s2Title: 'Datos Distribuidos', s2Desc: 'Sincroniza datos sin problemas a través de nodos globales con nuestra capa de datos propietaria ultraligera.', s3Title: 'Seguridad Zero-Trust', s3Desc: 'Encriptación de nivel empresarial y detección automatizada de amenazas, integradas directamente en la red.', learnMore: 'Saber más' },
    cta: { title: '¿Listo para desafiar la gravedad?', desc: 'Únete a los equipos visionarios que usan Nexova para potenciar sus aplicaciones de próxima generación. Construyamos algo ingrávido juntos.', button: 'Comienza tu Viaje' },
    footer: { privacy: 'Privacidad', terms: 'Términos' }
  }
};

const LanguageContext = createContext<{lang: Language; setLang: (l: Language) => void}>({lang: 'es', setLang: () => {}});

const Navbar = () => {
  const { lang, setLang } = useContext(LanguageContext);
  const t = translations[lang].nav;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* Nexova User Uploaded Logo */}
          <img 
            src="/logo.png" 
            alt="Nexova" 
            className="h-10 md:h-12 object-contain"
            onError={(e) => {
              // Fallback to text logo if image is missing
              (e.target as HTMLImageElement).style.display = 'none';
              document.getElementById('fallback-logo')?.classList.remove('hidden');
            }} 
          />
          <div id="fallback-logo" className="hidden flex items-center gap-2">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-[#112240] rounded-full"></div>
              <div className="w-3 h-3 bg-[#112240] rounded-full"></div>
            </div>
            <span className="text-xl font-bold text-[#112240] tracking-tight">Nexova</span>
          </div>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm font-medium text-gray-600 hover:text-[#112240] transition-colors">{t.services}</a>
          <a href="#about" className="text-sm font-medium text-gray-600 hover:text-[#112240] transition-colors">{t.platform}</a>
          <a href="#cases" className="text-sm font-medium text-gray-600 hover:text-[#112240] transition-colors">{t.cases}</a>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')} 
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#112240] transition-colors bg-white hover:bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-full"
          >
            <Globe size={16} />
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
          <button className="bg-[#112240] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#1A365D] hover:shadow-lg transition-all hover:-translate-y-0.5">
            {t.contact}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <button 
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')} 
            className="flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1.5 rounded-full"
          >
            <Globe size={14} />
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
          <button 
            className="text-[#112240]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg py-4 px-6 flex flex-col gap-4">
          <a href="#services" className="text-sm font-medium text-gray-800">{t.services}</a>
          <a href="#about" className="text-sm font-medium text-gray-800">{t.platform}</a>
          <a href="#cases" className="text-sm font-medium text-gray-800">{t.cases}</a>
          <button className="bg-[#112240] text-white px-6 py-2.5 rounded-full text-sm font-medium w-full mt-2">
            {t.contact}
          </button>
        </div>
      )}
    </nav>
  );
};

const FloatingNodes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full border border-gray-200/50 flex items-center justify-center animate-float-slow opacity-60">
        <div className="w-2 h-2 rounded-full bg-blue-400/30"></div>
      </div>
      
      <div className="absolute top-[30%] right-[15%] w-64 h-64 rounded-full border border-gray-200/40 flex items-center justify-center animate-float opacity-40">
        <div className="w-3 h-3 rounded-full bg-[#112240]/10"></div>
        <div className="absolute top-1/2 right-full w-24 h-[1px] bg-gradient-to-l from-gray-200 to-transparent"></div>
      </div>
      
      <div className="absolute bottom-[20%] left-[25%] w-48 h-48 rounded-full border border-gray-100 flex items-center justify-center animate-float-fast opacity-50">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-300"></div>
      </div>

      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <path d="M 10 200 Q 300 50 600 300 T 1200 100" fill="none" stroke="#112240" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
      </svg>
    </div>
  );
};

const Hero = () => {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].hero;
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-grid-lines">
      <FloatingNodes />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <motion.div 
          style={{ y, opacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs font-medium text-gray-600 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            {t.tag}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-semibold text-[#112240] tracking-tight leading-[1.1] mb-6">
            {t.title1} <br/>
            <span className="text-gray-400 font-light">{t.title2}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl font-light">
            {t.desc}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#112240] text-white px-8 py-4 rounded-full text-base font-medium flex items-center justify-center gap-2 hover:bg-[#1A365D] hover:shadow-[0_10px_20px_-10px_rgba(17,34,64,0.5)] transition-all hover:-translate-y-1">
              {t.explore} <ArrowRight size={18} />
            </button>
            <button className="bg-white text-[#112240] border border-gray-200 px-8 py-4 rounded-full text-base font-medium flex items-center justify-center hover:bg-gray-50 transition-colors">
              {t.docs}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].services;
  
  const servicesList = [
    {
      icon: <Network className="w-6 h-6 text-[#1A365D]" strokeWidth={1.5} />,
      title: t.s1Title,
      description: t.s1Desc
    },
    {
      icon: <Database className="w-6 h-6 text-[#1A365D]" strokeWidth={1.5} />,
      title: t.s2Title,
      description: t.s2Desc
    },
    {
      icon: <Shield className="w-6 h-6 text-[#1A365D]" strokeWidth={1.5} />,
      title: t.s3Title,
      description: t.s3Desc
    }
  ];

  return (
    <section id="services" className="py-32 bg-[#F8F9FA] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 md:text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-[#112240] mb-6">{t.title}</h2>
          <p className="text-gray-500 text-lg font-light">
            {t.desc}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-10 rounded-2xl border border-gray-100 hover-antigravity group"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-medium text-[#112240] mb-3">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <a href="#" className="inline-flex items-center text-sm font-medium text-[#112240] group-hover:text-blue-600 transition-colors">
                {t.learnMore} <ChevronRight size={16} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].cta;

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#112240]"></div>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Zap className="w-12 h-12 text-white mx-auto mb-8 opacity-80" strokeWidth={1} />
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
            {t.title}
          </h2>
          <p className="text-blue-200 text-lg font-light max-w-2xl mx-auto mb-10">
            {t.desc}
          </p>
          <button className="bg-white text-[#112240] px-10 py-5 rounded-full text-lg font-medium hover:bg-gray-50 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all hover:-translate-y-1">
            {t.button}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].footer;

  return (
    <footer className="bg-white py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          {/* Logo in footer */}
          <img src="/logo.png" alt="Nexova" className="h-6 object-contain" onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }} />
          <span className="text-lg font-semibold text-gray-800 tracking-tight">Nexova</span>
        </div>
        
        <div className="flex gap-8 text-sm text-gray-500">
          <a href="#" className="hover:text-[#112240] transition-colors">{t.privacy}</a>
          <a href="#" className="hover:text-[#112240] transition-colors">{t.terms}</a>
          <a href="#" className="hover:text-[#112240] transition-colors">Twitter</a>
          <a href="#" className="hover:text-[#112240] transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

function App() {
  const [lang, setLang] = useState<Language>('es');

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <div className="font-inter scroll-smooth">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <CTA />
        </main>
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
