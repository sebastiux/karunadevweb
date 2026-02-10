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
    'about.title': 'About Karuna',
    'about.subtitle': 'Transforming businesses with intelligent automation',
    'about.lead': 'Karuna is a technology consultancy firm with an extreme focus on finding the best business solutions for systems administration. We believe that technology should serve humanity, not the other way around.',
    'about.philosophy': 'Our philosophy is simple yet profound: we exist to serve others by implementing top-tier technology solutions that improve well-being and operational efficiency. Every line of code, every system design, and every consultation is guided by this principle.',
    'about.whatWeOffer': 'What We Offer',
    'about.offer1': 'End-to-end automation solutions that transform manual processes into efficient, scalable systems across any architecture.',
    'about.offer2': 'Data optimization and business intelligence solutions that turn raw information into actionable insights and strategic advantages.',
    'about.offer3': 'Custom software development from web applications to enterprise SAAS solutions, built with precision and user-centric design.',
    'about.offer4': 'Hardware and IoT integration for modern infrastructure, bringing physical and digital systems into perfect harmony.',
    'about.closing': "We don't just implement solutions; we become partners in your journey toward operational excellence and technological advancement.",

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

    // Presentation Deck
    'deck.title': 'Karuna',
    'deck.subtitle': 'Technology Consulting & System Architecture',
    'deck.heroLead': 'We design, automate, and scale technology systems — the kind that actually work in production.',
    'deck.heroDesc': 'Karuna is a technology consultancy that builds production-ready architectures, not slide decks. We work side by side with our clients to design, validate, and ship systems that scale reliably across software, data, AI, and enterprise platforms.',
    'deck.specialtiesTitle': 'What We Do Best',

    // SaaS
    'deck.saas.title': 'SaaS Product Design & Administration',
    'deck.saas.lead': 'From first commit to production traffic — we design and operate SaaS platforms end to end.',
    'deck.saas.item1': 'Product architecture and system design',
    'deck.saas.item2': 'Backend & frontend development',
    'deck.saas.item3': 'Cloud infrastructure and deployment pipelines',
    'deck.saas.item4': 'Observability, scaling, and operational governance',
    'deck.saas.item5': 'Admin tooling and internal dashboards',
    'deck.saas.closing': 'We don\'t just build it and hand it over. We make sure it runs, scales, and stays healthy.',

    // LLM
    'deck.llm.title': 'LLM Integrations',
    'deck.llm.lead': 'We plug Large Language Models into your architecture as real system components — not science experiments.',
    'deck.llm.item1': 'LLM-driven workflows and decision engines',
    'deck.llm.item2': 'Retrieval-Augmented Generation (RAG)',
    'deck.llm.item3': 'Vector databases and data embedding strategies',
    'deck.llm.item4': 'Token optimization and cost control',
    'deck.llm.item5': 'Model evaluation and testing pipelines',
    'deck.llm.closing': 'No hallucination hand-waving. Clear boundaries, monitoring, and performance controls baked in.',

    // Support Automation
    'deck.support.title': 'Support Automation Using LLMs',
    'deck.support.lead': 'Your support team is drowning in tickets? We build AI systems that handle the repetitive stuff — so humans focus on what matters.',
    'deck.support.item1': 'Automated tier-1 and tier-2 support',
    'deck.support.item2': 'Knowledge base ingestion and contextual answering',
    'deck.support.item3': 'Ticket classification and routing',
    'deck.support.item4': 'Multi-channel integration (web, chat, enterprise tools)',
    'deck.support.item5': 'Human-in-the-loop escalation models',
    'deck.support.closing': 'Auditable. Explainable. Enterprise-ready. Not a black box.',

    // SAP
    'deck.sap.title': 'SAP Basis & GRC Documentation Automation',
    'deck.sap.lead': 'SAP governance is complex. We automate the painful parts — documentation, role validation, audit evidence — without cutting corners.',
    'deck.sap.item1': 'SAP Basis operational documentation',
    'deck.sap.item2': 'GRC role assignment and validation flows',
    'deck.sap.item3': 'Segregation of Duties (SoD) support',
    'deck.sap.item4': 'Evidence generation for audits',
    'deck.sap.item5': 'Automation of repetitive governance processes',
    'deck.sap.closing': 'Less manual work, better traceability, happier auditors.',

    // Education
    'deck.edu.title': 'Education Services Design & Implementation',
    'deck.edu.lead': 'Learning platforms that actually teach — powered by AI, designed for real outcomes.',
    'deck.edu.item1': 'Curriculum design for technical and AI-focused programs',
    'deck.edu.item2': 'AI-assisted learning platforms',
    'deck.edu.item3': 'Content generation and assessment automation',
    'deck.edu.item4': 'Learning analytics and progress tracking',
    'deck.edu.item5': 'Scalable education architectures',
    'deck.edu.closing': 'We build learning systems, not just slide carousels.',

    // Approach
    'deck.approach.title': 'How We Work',
    'deck.approach.tagline': 'Few projects. Deep focus. Real results.',
    'deck.approach.desc': 'We don\'t juggle 50 clients at once. We take on a small number of projects and go deep — architecture reviews, hands-on engineering, production-grade delivery.',
    'deck.approach.roleTitle': 'What that looks like:',
    'deck.approach.role1': 'Lead system design and technical decisions',
    'deck.approach.role2': 'Validate architectures through PoCs',
    'deck.approach.role3': 'Orchestrate execution across specialized partners when required',
    'deck.approach.role4': 'Ensure production alignment with client standards',

    // Delivery
    'deck.delivery.title': 'How We Deliver',
    'deck.delivery.flow': 'Diagnosis \u2192 Architecture \u2192 Validation \u2192 Production',
    'deck.delivery.desc': "We move fast early on — cloud sandboxes, rapid prototyping, quick validation. When it's time to ship, we align with your security, compliance, and infrastructure standards. No surprises.",

    // CTA
    'deck.cta.title': "Ready to Talk?",
    'deck.cta.lead': "If any of these sound like your world:",
    'deck.cta.item1': 'SaaS architecture',
    'deck.cta.item2': 'AI and LLM integration',
    'deck.cta.item3': 'Support automation',
    'deck.cta.item4': 'SAP governance automation',
    'deck.cta.item5': 'Education platforms',
    'deck.cta.closing': "No sales pitch. Just a real technical conversation.",
    'deck.cta.whatsapp': 'WhatsApp: +52 720 253 3388',
    'deck.cta.linkedin': 'Reach out via LinkedIn',

    // AI Consultant (deck-specific)
    'deck.consultant.title': 'Still figuring things out?',
    'deck.consultant.subtitle': 'Tell Karu what you\'re working on — our AI will point you in the right direction.',
    'deck.consultant.greeting': "Hey! I'm Karu. Tell me what you're trying to build or what problem you're dealing with, and I'll tell you how Karuna can help. No fluff, I promise.",
    'deck.consultant.placeholder': "What are you working on?",
    'deck.consultant.bookCall': 'Continue on WhatsApp',
    'deck.consultant.thinking': 'Thinking...',
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
    'about.title': 'Acerca de Karuna',
    'about.subtitle': 'Transformando negocios con automatización inteligente',
    'about.lead': 'Karuna es una firma de consultoría tecnológica con un enfoque extremo en encontrar las mejores soluciones de negocio para administración de sistemas. Creemos que la tecnología debe servir a la humanidad, no al revés.',
    'about.philosophy': 'Nuestra filosofía es simple pero profunda: existimos para servir a otros implementando soluciones tecnológicas de primer nivel que mejoran el bienestar y la eficiencia operacional. Cada línea de código, cada diseño de sistema y cada consultoría está guiada por este principio.',
    'about.whatWeOffer': 'Lo Que Ofrecemos',
    'about.offer1': 'Soluciones de automatización de extremo a extremo que transforman procesos manuales en sistemas eficientes y escalables en cualquier arquitectura.',
    'about.offer2': 'Optimización de datos y soluciones de inteligencia de negocios que convierten información cruda en insights accionables y ventajas estratégicas.',
    'about.offer3': 'Desarrollo de software personalizado desde aplicaciones web hasta soluciones SAAS empresariales, construidas con precisión y diseño centrado en el usuario.',
    'about.offer4': 'Integración de hardware e IoT para infraestructura moderna, llevando sistemas físicos y digitales a una armonía perfecta.',
    'about.closing': 'No solo implementamos soluciones; nos convertimos en socios en tu viaje hacia la excelencia operacional y el avance tecnológico.',

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

    // Presentation Deck
    'deck.title': 'Karuna',
    'deck.subtitle': 'Consultoría Tecnológica & Arquitectura de Sistemas',
    'deck.heroLead': 'Diseñamos, automatizamos y escalamos sistemas tecnológicos — de los que realmente funcionan en producción.',
    'deck.heroDesc': 'Karuna es una consultoría tecnológica que construye arquitecturas listas para producción, no presentaciones bonitas. Trabajamos codo a codo con nuestros clientes para diseñar, validar y lanzar sistemas que escalen de verdad en software, datos, IA y plataformas empresariales.',
    'deck.specialtiesTitle': 'Lo Que Mejor Hacemos',

    // SaaS
    'deck.saas.title': 'Diseño y Administración de Productos SaaS',
    'deck.saas.lead': 'Del primer commit al tráfico en producción — diseñamos y operamos plataformas SaaS de principio a fin.',
    'deck.saas.item1': 'Arquitectura de producto y diseño de sistemas',
    'deck.saas.item2': 'Desarrollo backend y frontend',
    'deck.saas.item3': 'Infraestructura en la nube y pipelines de despliegue',
    'deck.saas.item4': 'Observabilidad, escalamiento y gobernanza operacional',
    'deck.saas.item5': 'Herramientas de administración y dashboards internos',
    'deck.saas.closing': 'No solo lo construimos y lo entregamos. Nos aseguramos de que corra, escale y se mantenga sano.',

    // LLM
    'deck.llm.title': 'Integraciones de LLM',
    'deck.llm.lead': 'Conectamos Modelos de Lenguaje a tu arquitectura como componentes reales del sistema — no como experimentos de laboratorio.',
    'deck.llm.item1': 'Flujos de trabajo y motores de decisión impulsados por LLM',
    'deck.llm.item2': 'Generación Aumentada por Recuperación (RAG)',
    'deck.llm.item3': 'Bases de datos vectoriales y estrategias de embedding',
    'deck.llm.item4': 'Optimización de tokens y control de costos',
    'deck.llm.item5': 'Pipelines de evaluación y testing de modelos',
    'deck.llm.closing': 'Nada de alucinaciones sin control. Límites claros, monitoreo y controles de rendimiento integrados.',

    // Support Automation
    'deck.support.title': 'Automatización de Soporte con LLMs',
    'deck.support.lead': '¿Tu equipo de soporte se ahoga en tickets? Construimos sistemas de IA que manejan lo repetitivo — para que los humanos se enfoquen en lo importante.',
    'deck.support.item1': 'Soporte automatizado de nivel 1 y nivel 2',
    'deck.support.item2': 'Ingestión de base de conocimiento y respuestas contextuales',
    'deck.support.item3': 'Clasificación y enrutamiento de tickets',
    'deck.support.item4': 'Integración multicanal (web, chat, herramientas empresariales)',
    'deck.support.item5': 'Modelos de escalamiento con intervención humana',
    'deck.support.closing': 'Auditable. Explicable. Listo para empresas. No es una caja negra.',

    // SAP
    'deck.sap.title': 'Automatización de Documentación SAP Basis y GRC',
    'deck.sap.lead': 'La gobernanza SAP es compleja. Automatizamos las partes dolorosas — documentación, validación de roles, evidencia de auditoría — sin atajos.',
    'deck.sap.item1': 'Documentación operacional de SAP Basis',
    'deck.sap.item2': 'Flujos de asignación y validación de roles GRC',
    'deck.sap.item3': 'Soporte de Segregación de Funciones (SoD)',
    'deck.sap.item4': 'Generación de evidencia para auditorías',
    'deck.sap.item5': 'Automatización de procesos repetitivos de gobernanza',
    'deck.sap.closing': 'Menos trabajo manual, mejor trazabilidad, auditores más contentos.',

    // Education
    'deck.edu.title': 'Diseño e Implementación de Servicios Educativos',
    'deck.edu.lead': 'Plataformas de aprendizaje que realmente enseñan — impulsadas por IA, diseñadas para resultados reales.',
    'deck.edu.item1': 'Diseño curricular para programas técnicos y enfocados en IA',
    'deck.edu.item2': 'Plataformas de aprendizaje asistidas por IA',
    'deck.edu.item3': 'Generación de contenido y automatización de evaluaciones',
    'deck.edu.item4': 'Analíticas de aprendizaje y seguimiento de progreso',
    'deck.edu.item5': 'Arquitecturas educativas escalables',
    'deck.edu.closing': 'Construimos sistemas de aprendizaje, no carruseles de diapositivas.',

    // Approach
    'deck.approach.title': 'Cómo Trabajamos',
    'deck.approach.tagline': 'Pocos proyectos. Enfoque profundo. Resultados reales.',
    'deck.approach.desc': 'No hacemos malabares con 50 clientes a la vez. Tomamos pocos proyectos y vamos a fondo — revisión de arquitectura, ingeniería práctica, entrega a nivel producción.',
    'deck.approach.roleTitle': 'Cómo se ve eso:',
    'deck.approach.role1': 'Liderar el diseño de sistemas y decisiones técnicas',
    'deck.approach.role2': 'Validar arquitecturas a través de PoCs',
    'deck.approach.role3': 'Orquestar la ejecución con socios especializados cuando sea necesario',
    'deck.approach.role4': 'Asegurar la alineación de producción con los estándares del cliente',

    // Delivery
    'deck.delivery.title': 'Cómo Entregamos',
    'deck.delivery.flow': 'Diagnóstico \u2192 Arquitectura \u2192 Validación \u2192 Producción',
    'deck.delivery.desc': 'Nos movemos rápido al inicio — sandboxes en la nube, prototipos rápidos, validación ágil. Cuando toca lanzar, nos alineamos con tus estándares de seguridad, cumplimiento e infraestructura. Sin sorpresas.',

    // CTA
    'deck.cta.title': '¿Listo para hablar?',
    'deck.cta.lead': 'Si algo de esto suena a tu mundo:',
    'deck.cta.item1': 'Arquitectura SaaS',
    'deck.cta.item2': 'Integración de IA y LLM',
    'deck.cta.item3': 'Automatización de soporte',
    'deck.cta.item4': 'Automatización de gobernanza SAP',
    'deck.cta.item5': 'Plataformas educativas',
    'deck.cta.closing': 'Sin discurso de ventas. Solo una conversación técnica real.',
    'deck.cta.whatsapp': 'WhatsApp: +52 720 253 3388',
    'deck.cta.linkedin': 'Contáctanos por LinkedIn',

    // AI Consultant (deck-specific)
    'deck.consultant.title': '¿Todavía definiendo el camino?',
    'deck.consultant.subtitle': 'Cuéntale a Karu en qué estás trabajando — nuestra IA te orientará.',
    'deck.consultant.greeting': '¡Qué onda! Soy Karu. Cuéntame qué estás intentando construir o qué problema tienes, y te digo cómo Karuna puede ayudarte. Sin rodeos, prometido.',
    'deck.consultant.placeholder': '¿En qué estás trabajando?',
    'deck.consultant.bookCall': 'Continuar por WhatsApp',
    'deck.consultant.thinking': 'Pensando...',
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
