import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.whatsapp': 'WhatsApp Us',
    'nav.allProjects': 'All Projects',
    'nav.aiEducation': 'AI Education',
    'nav.chatbotAutomation': 'Chatbot Automation',

    // About section
    'about.title': 'We Build AI Solutions',
    'about.subtitle': 'Transforming businesses with intelligent automation',

    // Projects section
    'projects.title': "What We've Built",
    'projects.intro': "We're business makers.",
    'projects.introText': "We walk with our clients to build not just scalable software, but scalable business solutions. Here are some of the AI-powered products we've developed and launched.",
    'projects.discuss': "Let's Discuss Your Project",
    'projects.whatsapp': 'WhatsApp:',
    'projects.allProjects': 'All Projects',
    'projects.viewDetails': 'View Details',
    'projects.visitSite': 'Visit Site',
    'projects.challenge': 'The Challenge',
    'projects.solution': 'Our Solution',
    'projects.results': 'Results',
    'projects.cta': 'Ready to build something together?',
    'projects.ctaButton': "Let's Talk",

    // NIO Learning
    'nio.title': 'NIO Learning',
    'nio.category': 'AI Education Platform',
    'nio.description': 'One of the first AI-powered education platforms in Latin America',
    'nio.challenge': "Traditional education platforms lacked personalization and couldn't adapt to individual learning styles, leaving students struggling to keep pace or feeling unchallenged.",
    'nio.solution': 'We developed and scaled NIO Learning from the ground up — an AI-powered education platform that personalizes learning paths, adapts content difficulty in real-time, and provides intelligent tutoring assistance to students across Latin America.',
    'nio.result1': 'Pioneer AI education platform in LATAM',
    'nio.result2': 'Personalized learning paths for each student',
    'nio.result3': 'Real-time content adaptation',
    'nio.result4': 'Scalable architecture serving thousands of users',

    // Crickett
    'crickett.title': 'Crickett',
    'crickett.category': 'Chatbot Automation',
    'crickett.description': 'AI automation tool for lead capture — plug and use, no flow design needed',
    'crickett.challenge': 'Entrepreneurs and small businesses needed chatbot automation but were overwhelmed by complex flow builders, technical setup, and expensive solutions that required constant maintenance.',
    'crickett.solution': "We built Crickett — an AI chatbot automation tool that's ready to use out of the box. Just connect it to your website and WhatsApp, and start capturing leads instantly. No flow design, no technical knowledge required. Pure plug-and-play automation.",
    'crickett.result1': 'Zero-configuration chatbot deployment',
    'crickett.result2': 'Website + WhatsApp integration',
    'crickett.result3': 'Instant lead capture automation',
    'crickett.result4': 'Built for entrepreneurs and SMBs',

    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': "Let's build something great together",

    // Chatbot
    'chatbot.greeting': "Hi! I'm Karu, your AI consultant. I help businesses discover how AI can solve their challenges. What brings you here today?",
    'chatbot.placeholder': 'Type your message...',
    'chatbot.bookCall': 'Book a call with us via WhatsApp',
    'chatbot.online': 'Online',
    'chatbot.aiConsultant': 'AI Consultant',
  },
  es: {
    // Navbar
    'nav.about': 'Nosotros',
    'nav.services': 'Servicios',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',
    'nav.whatsapp': 'WhatsApp',
    'nav.allProjects': 'Todos los Proyectos',
    'nav.aiEducation': 'Educación IA',
    'nav.chatbotAutomation': 'Automatización Chatbot',

    // About section
    'about.title': 'Construimos Soluciones de IA',
    'about.subtitle': 'Transformando negocios con automatización inteligente',

    // Projects section
    'projects.title': 'Lo Que Hemos Construido',
    'projects.intro': 'Somos creadores de negocios.',
    'projects.introText': 'Caminamos junto a nuestros clientes para construir no solo software escalable, sino soluciones de negocio escalables. Aquí están algunos de los productos impulsados por IA que hemos desarrollado y lanzado.',
    'projects.discuss': 'Hablemos de Tu Proyecto',
    'projects.whatsapp': 'WhatsApp:',
    'projects.allProjects': 'Todos los Proyectos',
    'projects.viewDetails': 'Ver Detalles',
    'projects.visitSite': 'Visitar Sitio',
    'projects.challenge': 'El Desafío',
    'projects.solution': 'Nuestra Solución',
    'projects.results': 'Resultados',
    'projects.cta': '¿Listo para construir algo juntos?',
    'projects.ctaButton': 'Hablemos',

    // NIO Learning
    'nio.title': 'NIO Learning',
    'nio.category': 'Plataforma Educativa IA',
    'nio.description': 'Una de las primeras plataformas educativas impulsadas por IA en Latinoamérica',
    'nio.challenge': 'Las plataformas educativas tradicionales carecían de personalización y no podían adaptarse a los estilos de aprendizaje individuales, dejando a los estudiantes luchando por mantener el ritmo o sintiéndose sin desafíos.',
    'nio.solution': 'Desarrollamos y escalamos NIO Learning desde cero — una plataforma educativa impulsada por IA que personaliza rutas de aprendizaje, adapta la dificultad del contenido en tiempo real y proporciona asistencia de tutoría inteligente a estudiantes en toda Latinoamérica.',
    'nio.result1': 'Plataforma educativa IA pionera en LATAM',
    'nio.result2': 'Rutas de aprendizaje personalizadas para cada estudiante',
    'nio.result3': 'Adaptación de contenido en tiempo real',
    'nio.result4': 'Arquitectura escalable sirviendo a miles de usuarios',

    // Crickett
    'crickett.title': 'Crickett',
    'crickett.category': 'Automatización de Chatbot',
    'crickett.description': 'Herramienta de automatización IA para captura de leads — conecta y usa, sin diseño de flujos',
    'crickett.challenge': 'Los emprendedores y pequeñas empresas necesitaban automatización de chatbot pero estaban abrumados por constructores de flujos complejos, configuración técnica y soluciones costosas que requerían mantenimiento constante.',
    'crickett.solution': 'Construimos Crickett — una herramienta de automatización de chatbot IA lista para usar. Solo conéctala a tu sitio web y WhatsApp, y comienza a capturar leads instantáneamente. Sin diseño de flujos, sin conocimientos técnicos requeridos. Pura automatización plug-and-play.',
    'crickett.result1': 'Despliegue de chatbot sin configuración',
    'crickett.result2': 'Integración con sitio web + WhatsApp',
    'crickett.result3': 'Automatización instantánea de captura de leads',
    'crickett.result4': 'Construido para emprendedores y PyMEs',

    // Contact
    'contact.title': 'Contáctanos',
    'contact.subtitle': 'Construyamos algo grande juntos',

    // Chatbot
    'chatbot.greeting': '¡Hola! Soy Karu, tu consultor de IA. Ayudo a las empresas a descubrir cómo la IA puede resolver sus desafíos. ¿Qué te trae por aquí hoy?',
    'chatbot.placeholder': 'Escribe tu mensaje...',
    'chatbot.bookCall': 'Agenda una llamada por WhatsApp',
    'chatbot.online': 'En línea',
    'chatbot.aiConsultant': 'Consultor IA',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
