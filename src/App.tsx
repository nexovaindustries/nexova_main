import { useState, useEffect, createContext, useContext } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Network, Database, Zap, Shield, ArrowRight, Menu, X, ChevronRight, Globe, Mail, Phone, MapPin, Send } from 'lucide-react';

type Language = 'en' | 'es';

const translations = {
  en: {
    nav: { services: 'Services', platform: 'Platform', cases: 'Use Cases', contact: 'Contact Us' },
    hero: { tag: 'Next-Gen Data Infrastructure', title1: 'Connecting data,', title2: 'elevating innovation.', desc: 'Nexova provides minimalist, high-performance network solutions designed for modern technology companies. Experience data flow without friction.', explore: 'Explore Platform', docs: 'Read Documentation' },
    services: { title: 'Core Capabilities', desc: 'We strip away complexity to provide tools that simply work. Focus on building, while we handle the invisible layer of your technology.', s1Title: 'Network Optimization', s1Desc: 'Intelligent routing algorithms that reduce latency and ensure zero downtime for critical infrastructure.', s2Title: 'Distributed Data', s2Desc: 'Seamlessly sync data across global nodes with our ultra-lightweight proprietary data layer.', s3Title: 'Zero-Trust Security', s3Desc: 'Enterprise-grade encryption and automated threat detection, built directly into the network.', learnMore: 'Learn more' },
    contact: { title: 'Get in Touch', desc: 'Have a project in mind? Let\'s talk about how we can help you scale.', name: 'Full Name', email: 'Email Address', message: 'Message', send: 'Send Message', success: 'Message sent successfully!' },
    cta: { title: 'Ready to defy gravity?', desc: "Join the forward-thinking teams using Nexova to power their next-generation applications. Let's build something weightless together.", button: 'Start Your Journey' },
    footer: { privacy: 'Privacy', terms: 'Terms' }
  },
  es: {
    nav: { services: 'Servicios', platform: 'Plataforma', cases: 'Casos de Uso', contact: 'Contáctanos' },
    hero: { tag: 'Infraestructura de Datos de Próxima Generación', title1: 'Conectando datos,', title2: 'elevando la innovación.', desc: 'Nexova provee soluciones de red minimalistas y de alto rendimiento diseñadas para empresas tecnológicas modernas. Experimenta el flujo de datos sin fricción.', explore: 'Explorar Plataforma', docs: 'Leer Documentación' },
    services: { title: 'Capacidades Principales', desc: 'Eliminamos la complejidad para ofrecer herramientas que simplemente funcionan. Concéntrate en construir, mientras nosotros gestionamos la capa invisible de tu tecnología.', s1Title: 'Optimización de Red', s1Desc: 'Algoritmos de enrutamiento inteligente que reducen la latencia y aseguran cero tiempo de inactividad para infraestructura crítica.', s2Title: 'Datos Distribuidos', s2Desc: 'Sincroniza datos sin problemas a través de nodos globales con nuestra capa de datos propietaria ultraligera.', s3Title: 'Seguridad Zero-Trust', s3Desc: 'Encriptación de nivel empresarial y detección automatizada de amenazas, integradas directamente en la red.', learnMore: 'Saber más' },
    contact: { title: 'Contáctanos', desc: '¿Tienes un proyecto en mente? Hablemos sobre cómo podemos ayudarte a escalar.', name: 'Nombre Completo', email: 'Correo Electrónico', message: 'Mensaje', send: 'Enviar Mensaje', success: '¡Mensaje enviado con éxito!' },
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
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 border-2 border-[#112240] rounded-xl rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
            <div className="w-4 h-4 bg-[#112240] rounded-sm"></div>
          </div>
          <span className="text-2xl font-bold text-[#112240] tracking-tighter font-tech">NEXOVA</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {['services', 'about', 'cases'].map((item) => (
            <a key={item} href={`#${item}`} className="text-xs uppercase tracking-widest font-bold text-gray-500 hover:text-[#112240] transition-colors relative group">
              {t[item as keyof typeof t] || item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#112240] transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')} 
            className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#112240] transition-colors"
          >
            <Globe size={16} />
            {lang.toUpperCase()}
          </button>
          <a href="#contact" className="bg-[#112240] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#1A365D] hover:shadow-2xl transition-all hover:-translate-y-1">
            {t.contact}
          </a>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button 
            className="text-[#112240]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-2xl"
          >
            <div className="p-8 flex flex-col gap-6">
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-gray-800">{t.services}</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-gray-800">{t.platform}</a>
              <a href="#cases" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-gray-800">{t.cases}</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="bg-[#112240] text-white py-4 rounded-xl text-center font-bold">{t.contact}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(17,34,64,0.03)_0%,transparent_50%)]"></div>
    <motion.div 
      animate={{ 
        rotate: [0, 360],
        scale: [1, 1.1, 1]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] border border-[#112240]/5 rounded-full"
    ></motion.div>
  </div>
);

const Hero = () => {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].hero;

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-grid-lines">
      <BackgroundEffect />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#112240]/5 border border-[#112240]/10 text-[10px] uppercase tracking-[0.2em] font-bold text-[#112240] mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
              {t.tag}
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-[#112240] tracking-tighter leading-[0.9] mb-8 font-tech">
              {t.title1} <br/>
              <span className="text-blue-600/30">{t.title2}</span>
            </h1>
            
            <p className="text-xl text-gray-500 leading-relaxed mb-12 max-w-xl font-light">
              {t.desc}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="bg-[#112240] text-white px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#1A365D] hover:shadow-[0_20px_40px_-10px_rgba(17,34,64,0.4)] transition-all hover:-translate-y-1">
                {t.explore} <ArrowRight size={20} />
              </button>
              <button className="bg-white/50 backdrop-blur-md text-[#112240] border border-gray-200 px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest flex items-center justify-center hover:bg-white transition-all">
                {t.docs}
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="w-full aspect-square relative flex items-center justify-center">
              <div className="absolute inset-0 border border-dashed border-[#112240]/20 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-16 border border-[#112240]/10 rounded-full"></div>
              <div className="relative z-10 glass-card p-12 rounded-[40px] rotate-3 hover:rotate-0 transition-transform duration-700">
                <Network size={120} className="text-[#112240] opacity-80" strokeWidth={0.5} />
              </div>
              <div className="absolute top-0 right-10 glass-card p-6 rounded-3xl animate-float">
                <Database size={32} className="text-blue-600" />
              </div>
              <div className="absolute bottom-10 left-0 glass-card p-6 rounded-3xl animate-float-slow">
                <Shield size={32} className="text-blue-600" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].services;
  
  const servicesList = [
    { icon: <Network className="w-8 h-8" />, title: t.s1Title, desc: t.s1Desc },
    { icon: <Database className="w-8 h-8" />, title: t.s2Title, desc: t.s2Desc },
    { icon: <Shield className="w-8 h-8" />, title: t.s3Title, desc: t.s3Desc }
  ];

  return (
    <section id="services" className="py-40 bg-[#0a192f] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-end mb-24">
          <div className="lg:w-2/3">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 font-tech">{t.title}</h2>
            <p className="text-blue-200/60 text-xl font-light leading-relaxed max-w-2xl">{t.desc}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {servicesList.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white/5 border border-white/10 p-12 rounded-[32px] backdrop-blur-sm group hover:bg-white/10 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-10 group-hover:bg-blue-600 transition-colors duration-500">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-6 font-tech">{service.title}</h3>
              <p className="text-blue-100/40 text-base leading-relaxed mb-8">{service.desc}</p>
              <a href="#" className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-400 group-hover:text-white transition-colors">
                {t.learnMore} <ChevronRight size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].contact;

  return (
    <section id="contact" className="py-40 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold text-[#112240] mb-8 font-tech leading-tight">{t.title}</h2>
            <p className="text-gray-500 text-xl font-light mb-12">{t.desc}</p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-[#112240] group-hover:bg-[#112240] group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email</p>
                  <p className="text-lg font-medium text-[#112240]">nexova.industries@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-[#112240] group-hover:bg-[#112240] group-hover:text-white transition-all">
                  <Globe size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Web</p>
                  <p className="text-lg font-medium text-[#112240]">nexovacorp.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-10 md:p-14 rounded-[40px] border-gray-100">
            <form action="https://formspree.io/f/nexova.industries@gmail.com" method="POST" className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">{t.name}</label>
                <input type="text" name="name" required className="w-full bg-gray-50 border-none rounded-2xl px-6 py-5 focus:ring-2 focus:ring-[#112240] transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">{t.email}</label>
                <input type="email" name="_replyto" required className="w-full bg-gray-50 border-none rounded-2xl px-6 py-5 focus:ring-2 focus:ring-[#112240] transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">{t.message}</label>
                <textarea name="message" required rows={4} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-5 focus:ring-2 focus:ring-[#112240] transition-all"></textarea>
              </div>
              <button type="submit" className="w-full bg-[#112240] text-white py-6 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#1A365D] hover:shadow-2xl transition-all flex items-center justify-center gap-3">
                {t.send} <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { lang } = useContext(LanguageContext);
  const t = translations[lang].footer;

  return (
    <footer className="bg-gray-50 py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-2 border-[#112240] rounded-lg rotate-45 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#112240] rounded-full"></div>
            </div>
            <span className="text-xl font-bold text-[#112240] tracking-tighter font-tech uppercase">Nexova</span>
          </div>
          
          <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
            <a href="#" className="hover:text-[#112240] transition-colors">{t.privacy}</a>
            <a href="#" className="hover:text-[#112240] transition-colors">{t.terms}</a>
            <a href="#" className="hover:text-[#112240] transition-colors">LinkedIn</a>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
            &copy; {new Date().getFullYear()} Nexova Corp
          </p>
        </div>
      </div>
    </footer>
  );
};

function App() {
  const [lang, setLang] = useState<Language>('es');

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      <div className="scroll-smooth">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
