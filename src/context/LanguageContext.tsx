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
    'deck.heroLead': 'Designing, automating, and scaling technology systems with a premium, engineering-driven approach.',
    'deck.heroDesc': 'Karuna is a boutique technology consultancy focused on building production-ready architectures, not generic solutions. We work closely with our clients to design, validate, and implement systems that scale reliably across software, data, AI, and enterprise platforms.',
    'deck.specialtiesTitle': 'Our Core Specialties',

    // SaaS
    'deck.saas.title': 'SaaS Product Design & Administration',
    'deck.saas.lead': 'We design and operate SaaS platforms from architecture to production.',
    'deck.saas.item1': 'Product architecture and system design',
    'deck.saas.item2': 'Backend & frontend development',
    'deck.saas.item3': 'Cloud infrastructure and deployment pipelines',
    'deck.saas.item4': 'Observability, scaling, and operational governance',
    'deck.saas.item5': 'Admin tooling and internal dashboards',
    'deck.saas.closing': 'Our focus is not only building SaaS products, but ensuring they are operable, maintainable, and scalable over time.',

    // LLM
    'deck.llm.title': 'LLM Integrations',
    'deck.llm.lead': 'We integrate Large Language Models as system components, not standalone features.',
    'deck.llm.item1': 'LLM-driven workflows and decision engines',
    'deck.llm.item2': 'Retrieval-Augmented Generation (RAG)',
    'deck.llm.item3': 'Vector databases and data embedding strategies',
    'deck.llm.item4': 'Token optimization and cost control',
    'deck.llm.item5': 'Model evaluation and testing pipelines',
    'deck.llm.closing': 'LLMs are treated as part of the architecture, with clear boundaries, monitoring, and performance controls.',

    // Support Automation
    'deck.support.title': 'Support Automation Using LLMs',
    'deck.support.lead': 'We design AI-powered support systems that reduce operational load while improving response quality.',
    'deck.support.item1': 'Automated tier-1 and tier-2 support',
    'deck.support.item2': 'Knowledge base ingestion and contextual answering',
    'deck.support.item3': 'Ticket classification and routing',
    'deck.support.item4': 'Multi-channel integration (web, chat, enterprise tools)',
    'deck.support.item5': 'Human-in-the-loop escalation models',
    'deck.support.closing': 'These systems are designed to be auditable, explainable, and enterprise-ready.',

    // SAP
    'deck.sap.title': 'SAP Basis & GRC Documentation Automation',
    'deck.sap.lead': 'We specialize in automation around SAP governance and operations, with a strong focus on auditability.',
    'deck.sap.item1': 'SAP Basis operational documentation',
    'deck.sap.item2': 'GRC role assignment and validation flows',
    'deck.sap.item3': 'Segregation of Duties (SoD) support',
    'deck.sap.item4': 'Evidence generation for audits',
    'deck.sap.item5': 'Automation of repetitive governance processes',
    'deck.sap.closing': 'Our approach reduces manual effort while improving traceability and compliance.',

    // Education
    'deck.edu.title': 'Education Services Design & Implementation',
    'deck.edu.lead': 'We design and deploy technology-driven education platforms.',
    'deck.edu.item1': 'Curriculum design for technical and AI-focused programs',
    'deck.edu.item2': 'AI-assisted learning platforms',
    'deck.edu.item3': 'Content generation and assessment automation',
    'deck.edu.item4': 'Learning analytics and progress tracking',
    'deck.edu.item5': 'Scalable education architectures',
    'deck.edu.closing': 'We focus on learning systems, not just content delivery.',

    // Approach
    'deck.approach.title': 'Our Approach',
    'deck.approach.tagline': 'High involvement. Low volume. High impact.',
    'deck.approach.desc': 'Karuna operates under a premium consulting model. We intentionally limit the number of concurrent projects to ensure deep technical immersion and architectural rigor.',
    'deck.approach.roleTitle': 'Our role is to:',
    'deck.approach.role1': 'Lead system design and technical decisions',
    'deck.approach.role2': 'Validate architectures through PoCs',
    'deck.approach.role3': 'Orchestrate execution across specialized partners when required',
    'deck.approach.role4': 'Ensure production alignment with client standards',

    // Delivery
    'deck.delivery.title': 'Delivery Model',
    'deck.delivery.flow': 'Diagnosis \u2192 Architecture \u2192 Validation \u2192 Production',
    'deck.delivery.desc': "Early stages often run in agile cloud environments for speed and validation. Final deployments are aligned with each client's security, compliance, and infrastructure standards.",

    // CTA
    'deck.cta.title': "Let's Talk",
    'deck.cta.lead': "If you're exploring:",
    'deck.cta.item1': 'SaaS architecture',
    'deck.cta.item2': 'AI and LLM integration',
    'deck.cta.item3': 'Support automation',
    'deck.cta.item4': 'SAP governance automation',
    'deck.cta.item5': 'Education platforms',
    'deck.cta.closing': "We're happy to start with a technical conversation, not a sales pitch.",
    'deck.cta.whatsapp': 'WhatsApp: +52 720 253 3388',
    'deck.cta.linkedin': 'Reach out via LinkedIn',

    // AI Consultant (deck-specific)
    'deck.consultant.title': 'Talk to Our AI Consultant',
    'deck.consultant.subtitle': 'Not sure where to start? Describe your challenge and Karu will help you understand how we can help.',
    'deck.consultant.greeting': "Hi! I'm Karu, Karuna's AI consultant. Tell me about your business challenge or the system you're looking to build, and I'll help you understand how our team can help.",
    'deck.consultant.placeholder': 'Describe your challenge or what you need...',
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
    'deck.heroLead': 'Diseñando, automatizando y escalando sistemas tecnológicos con un enfoque premium orientado a ingeniería.',
    'deck.heroDesc': 'Karuna es una consultoría tecnológica boutique enfocada en construir arquitecturas listas para producción, no soluciones genéricas. Trabajamos de cerca con nuestros clientes para diseñar, validar e implementar sistemas que escalen de manera confiable en software, datos, IA y plataformas empresariales.',
    'deck.specialtiesTitle': 'Nuestras Especialidades',

    // SaaS
    'deck.saas.title': 'Diseño y Administración de Productos SaaS',
    'deck.saas.lead': 'Diseñamos y operamos plataformas SaaS desde la arquitectura hasta producción.',
    'deck.saas.item1': 'Arquitectura de producto y diseño de sistemas',
    'deck.saas.item2': 'Desarrollo backend y frontend',
    'deck.saas.item3': 'Infraestructura en la nube y pipelines de despliegue',
    'deck.saas.item4': 'Observabilidad, escalamiento y gobernanza operacional',
    'deck.saas.item5': 'Herramientas de administración y dashboards internos',
    'deck.saas.closing': 'Nuestro enfoque no es solo construir productos SaaS, sino asegurar que sean operables, mantenibles y escalables a lo largo del tiempo.',

    // LLM
    'deck.llm.title': 'Integraciones de LLM',
    'deck.llm.lead': 'Integramos Modelos de Lenguaje como componentes del sistema, no como funcionalidades aisladas.',
    'deck.llm.item1': 'Flujos de trabajo y motores de decisión impulsados por LLM',
    'deck.llm.item2': 'Generación Aumentada por Recuperación (RAG)',
    'deck.llm.item3': 'Bases de datos vectoriales y estrategias de embedding',
    'deck.llm.item4': 'Optimización de tokens y control de costos',
    'deck.llm.item5': 'Pipelines de evaluación y testing de modelos',
    'deck.llm.closing': 'Los LLMs se tratan como parte de la arquitectura, con límites claros, monitoreo y controles de rendimiento.',

    // Support Automation
    'deck.support.title': 'Automatización de Soporte con LLMs',
    'deck.support.lead': 'Diseñamos sistemas de soporte impulsados por IA que reducen la carga operativa mientras mejoran la calidad de respuesta.',
    'deck.support.item1': 'Soporte automatizado de nivel 1 y nivel 2',
    'deck.support.item2': 'Ingestión de base de conocimiento y respuestas contextuales',
    'deck.support.item3': 'Clasificación y enrutamiento de tickets',
    'deck.support.item4': 'Integración multicanal (web, chat, herramientas empresariales)',
    'deck.support.item5': 'Modelos de escalamiento con intervención humana',
    'deck.support.closing': 'Estos sistemas están diseñados para ser auditables, explicables y listos para empresas.',

    // SAP
    'deck.sap.title': 'Automatización de Documentación SAP Basis y GRC',
    'deck.sap.lead': 'Nos especializamos en automatización de gobernanza y operaciones SAP, con un fuerte enfoque en auditabilidad.',
    'deck.sap.item1': 'Documentación operacional de SAP Basis',
    'deck.sap.item2': 'Flujos de asignación y validación de roles GRC',
    'deck.sap.item3': 'Soporte de Segregación de Funciones (SoD)',
    'deck.sap.item4': 'Generación de evidencia para auditorías',
    'deck.sap.item5': 'Automatización de procesos repetitivos de gobernanza',
    'deck.sap.closing': 'Nuestro enfoque reduce el esfuerzo manual mientras mejora la trazabilidad y el cumplimiento.',

    // Education
    'deck.edu.title': 'Diseño e Implementación de Servicios Educativos',
    'deck.edu.lead': 'Diseñamos y desplegamos plataformas educativas impulsadas por tecnología.',
    'deck.edu.item1': 'Diseño curricular para programas técnicos y enfocados en IA',
    'deck.edu.item2': 'Plataformas de aprendizaje asistidas por IA',
    'deck.edu.item3': 'Generación de contenido y automatización de evaluaciones',
    'deck.edu.item4': 'Analíticas de aprendizaje y seguimiento de progreso',
    'deck.edu.item5': 'Arquitecturas educativas escalables',
    'deck.edu.closing': 'Nos enfocamos en sistemas de aprendizaje, no solo en entrega de contenido.',

    // Approach
    'deck.approach.title': 'Nuestro Enfoque',
    'deck.approach.tagline': 'Alta involucración. Bajo volumen. Alto impacto.',
    'deck.approach.desc': 'Karuna opera bajo un modelo de consultoría premium. Limitamos intencionalmente el número de proyectos concurrentes para asegurar una inmersión técnica profunda y rigor arquitectónico.',
    'deck.approach.roleTitle': 'Nuestro rol es:',
    'deck.approach.role1': 'Liderar el diseño de sistemas y decisiones técnicas',
    'deck.approach.role2': 'Validar arquitecturas a través de PoCs',
    'deck.approach.role3': 'Orquestar la ejecución con socios especializados cuando sea necesario',
    'deck.approach.role4': 'Asegurar la alineación de producción con los estándares del cliente',

    // Delivery
    'deck.delivery.title': 'Modelo de Entrega',
    'deck.delivery.flow': 'Diagnóstico \u2192 Arquitectura \u2192 Validación \u2192 Producción',
    'deck.delivery.desc': 'Las etapas iniciales suelen ejecutarse en entornos ágiles en la nube para velocidad y validación. Los despliegues finales se alinean con los estándares de seguridad, cumplimiento e infraestructura de cada cliente.',

    // CTA
    'deck.cta.title': 'Hablemos',
    'deck.cta.lead': 'Si estás explorando:',
    'deck.cta.item1': 'Arquitectura SaaS',
    'deck.cta.item2': 'Integración de IA y LLM',
    'deck.cta.item3': 'Automatización de soporte',
    'deck.cta.item4': 'Automatización de gobernanza SAP',
    'deck.cta.item5': 'Plataformas educativas',
    'deck.cta.closing': 'Nos encanta empezar con una conversación técnica, no con un discurso de ventas.',
    'deck.cta.whatsapp': 'WhatsApp: +52 720 253 3388',
    'deck.cta.linkedin': 'Contáctanos por LinkedIn',

    // AI Consultant (deck-specific)
    'deck.consultant.title': 'Habla con Nuestro Consultor IA',
    'deck.consultant.subtitle': '¿No sabes por dónde empezar? Describe tu desafío y Karu te ayudará a entender cómo podemos ayudarte.',
    'deck.consultant.greeting': '¡Hola! Soy Karu, el consultor IA de Karuna. Cuéntame sobre tu desafío de negocio o el sistema que quieres construir, y te ayudaré a entender cómo nuestro equipo puede ayudarte.',
    'deck.consultant.placeholder': 'Describe tu desafío o lo que necesitas...',
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
