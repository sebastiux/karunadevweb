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
    'deck.heroLead': 'We design, automate, and scale technology systems with precision and architectural rigor.',
    'deck.heroDesc': 'Karuna is a technology consultancy focused on building production-ready architectures. We work closely with our clients to design, validate, and implement systems that scale reliably across software, data, AI, and enterprise platforms.',
    'deck.specialtiesTitle': 'What We Do Best',

    // SaaS
    'deck.saas.title': 'SaaS Product Design & Administration',
    'deck.saas.lead': 'We design and operate SaaS platforms from architecture through production, end to end.',
    'deck.saas.item1': 'Product architecture and system design',
    'deck.saas.item2': 'Backend & frontend development',
    'deck.saas.item3': 'Cloud infrastructure and deployment pipelines',
    'deck.saas.item4': 'Observability, scaling, and operational governance',
    'deck.saas.item5': 'Admin tooling and internal dashboards',
    'deck.saas.closing': 'Our focus extends beyond building SaaS products — we ensure they are operable, maintainable, and scalable over time.',

    // LLM
    'deck.llm.title': 'LLM Integrations',
    'deck.llm.lead': 'We integrate Large Language Models as production-grade system components with clear boundaries and governance.',
    'deck.llm.item1': 'LLM-driven workflows and decision engines',
    'deck.llm.item2': 'Retrieval-Augmented Generation (RAG)',
    'deck.llm.item3': 'Vector databases and data embedding strategies',
    'deck.llm.item4': 'Token optimization and cost control',
    'deck.llm.item5': 'Model evaluation and testing pipelines',
    'deck.llm.closing': 'Every LLM integration includes clear boundaries, monitoring, and performance controls as part of the architecture.',

    // Support Automation
    'deck.support.title': 'Support Automation Using LLMs',
    'deck.support.lead': 'We design AI-powered support systems that reduce operational load while improving response quality and consistency.',
    'deck.support.item1': 'Automated tier-1 and tier-2 support',
    'deck.support.item2': 'Knowledge base ingestion and contextual answering',
    'deck.support.item3': 'Ticket classification and routing',
    'deck.support.item4': 'Multi-channel integration (web, chat, enterprise tools)',
    'deck.support.item5': 'Human-in-the-loop escalation models',
    'deck.support.closing': 'These systems are designed to be auditable, explainable, and enterprise-ready.',

    // SAP
    'deck.sap.title': 'SAP Basis & GRC Documentation Automation',
    'deck.sap.lead': 'We specialize in automation around SAP governance and operations, with a strong focus on auditability and compliance.',
    'deck.sap.item1': 'SAP Basis operational documentation',
    'deck.sap.item2': 'GRC role assignment and validation flows',
    'deck.sap.item3': 'Segregation of Duties (SoD) support',
    'deck.sap.item4': 'Evidence generation for audits',
    'deck.sap.item5': 'Automation of repetitive governance processes',
    'deck.sap.closing': 'Our approach reduces manual effort while improving traceability and regulatory compliance.',

    // Education
    'deck.edu.title': 'Education Services Design & Implementation',
    'deck.edu.lead': 'We design and deploy technology-driven education platforms with measurable learning outcomes.',
    'deck.edu.item1': 'Curriculum design for technical and AI-focused programs',
    'deck.edu.item2': 'AI-assisted learning platforms',
    'deck.edu.item3': 'Content generation and assessment automation',
    'deck.edu.item4': 'Learning analytics and progress tracking',
    'deck.edu.item5': 'Scalable education architectures',
    'deck.edu.closing': 'We focus on learning systems and outcomes, not just content delivery.',

    // Approach
    'deck.approach.title': 'How We Work',
    'deck.approach.tagline': 'High involvement. Low volume. High impact.',
    'deck.approach.desc': 'Karuna intentionally limits the number of concurrent projects to ensure deep technical immersion and architectural rigor in every engagement.',
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

    // Electronics Deck
    'elec.title': 'Karuna Electronics',
    'elec.subtitle': 'Electronics, Control & Security Systems',
    'elec.heroLead': 'We design, install, and commission electronic control systems, IoT infrastructure, and intelligent security solutions.',
    'elec.heroDesc': 'Karuna Electronics is the hardware and control division of Karuna. We deliver end-to-end projects — from circuit design and prototyping through installation and commissioning — in IoT, industrial control, computer vision, and physical security.',
    'elec.specialtiesTitle': 'Our Capabilities',

    // IoT
    'elec.iot.title': 'IoT Solutions & Connected Systems',
    'elec.iot.lead': 'We design and deploy IoT architectures that connect physical assets to the cloud with reliability and real-time visibility.',
    'elec.iot.item1': 'Sensor network design and deployment (temperature, humidity, pressure, vibration, etc.)',
    'elec.iot.item2': 'Connectivity protocols — MQTT, LoRa, Zigbee, Wi-Fi, cellular (4G/5G)',
    'elec.iot.item3': 'Edge gateways and local data processing',
    'elec.iot.item4': 'Cloud telemetry dashboards and real-time alerting',
    'elec.iot.item5': 'Predictive maintenance and remote asset monitoring',
    'elec.iot.closing': 'Every IoT deployment is designed for reliability, security, and seamless integration with your existing infrastructure.',

    // Control Systems
    'elec.control.title': 'Control Systems Design & Installation',
    'elec.control.lead': 'We engineer and install industrial control systems — from single-machine automation to full-plant process control.',
    'elec.control.item1': 'PLC programming and panel design (Siemens, Allen-Bradley, Schneider)',
    'elec.control.item2': 'SCADA system integration and HMI panel configuration',
    'elec.control.item3': 'Motor drives, VFDs, and motion control',
    'elec.control.item4': 'Process instrumentation and field device integration',
    'elec.control.item5': 'Electrical control panel fabrication and installation',
    'elec.control.closing': 'We deliver turnkey control systems — designed, built, installed, and commissioned on-site.',

    // Image Processing & Computer Vision
    'elec.vision.title': 'Image Processing & Computer Vision',
    'elec.vision.lead': 'We install and configure camera-based systems for real-time visual inspection, analytics, and intelligent detection.',
    'elec.vision.item1': 'Industrial camera systems and lens selection',
    'elec.vision.item2': 'Real-time defect detection and quality inspection',
    'elec.vision.item3': 'OCR, barcode, and label verification systems',
    'elec.vision.item4': 'AI-powered video analytics at the edge',
    'elec.vision.item5': 'Integration with PLCs and production line control',
    'elec.vision.closing': 'Our vision systems are designed for production environments — reliable, fast, and integrated with your existing automation.',

    // Security & Surveillance
    'elec.security.title': 'Security & Surveillance Systems',
    'elec.security.lead': 'We design and install comprehensive security systems — from CCTV infrastructure to access control and perimeter protection.',
    'elec.security.item1': 'CCTV system design, camera selection, and installation',
    'elec.security.item2': 'Access control systems (biometric, RFID, PIN)',
    'elec.security.item3': 'Intrusion detection and perimeter security',
    'elec.security.item4': 'Centralized monitoring and video management (VMS)',
    'elec.security.item5': 'Integration with alarm systems and emergency protocols',
    'elec.security.closing': 'Security is not just cameras — we design layered systems that protect your people, assets, and operations.',

    // Embedded Systems
    'elec.embedded.title': 'Embedded Systems & Custom Electronics',
    'elec.embedded.lead': 'We design custom electronic boards and embedded firmware for specialized applications that off-the-shelf products can\'t solve.',
    'elec.embedded.item1': 'Custom PCB design and prototyping',
    'elec.embedded.item2': 'Firmware development (STM32, ESP32, Arduino, Raspberry Pi)',
    'elec.embedded.item3': 'Edge computing modules for real-time processing',
    'elec.embedded.item4': 'Custom sensor interface boards',
    'elec.embedded.item5': 'Small-batch manufacturing coordination',
    'elec.embedded.closing': 'From concept to prototype to production — we build the hardware your project needs.',

    // Approach
    'elec.approach.title': 'How We Work',
    'elec.approach.tagline': 'Design it right. Build it once. Install it to last.',
    'elec.approach.desc': 'Karuna Electronics handles every phase — from initial assessment and engineering design through physical installation and commissioning. We don\'t hand off specs and walk away.',
    'elec.approach.roleTitle': 'What that looks like:',
    'elec.approach.role1': 'On-site assessment and requirements engineering',
    'elec.approach.role2': 'Detailed system design with component selection',
    'elec.approach.role3': 'Prototyping and validation before full deployment',
    'elec.approach.role4': 'Physical installation, wiring, commissioning, and handover',

    // Delivery
    'elec.delivery.title': 'How We Deliver',
    'elec.delivery.flow': 'Assessment \u2192 Design \u2192 Prototyping \u2192 Installation \u2192 Commissioning',
    'elec.delivery.desc': 'We start with a site visit and technical assessment. From there, we engineer the solution, validate with prototypes when needed, install on-site, and commission until everything runs as specified.',

    // CTA
    'elec.cta.title': 'Ready to Talk?',
    'elec.cta.lead': 'If any of these sound like your world:',
    'elec.cta.item1': 'IoT & connected systems',
    'elec.cta.item2': 'Industrial control & automation',
    'elec.cta.item3': 'Computer vision & inspection',
    'elec.cta.item4': 'Security & surveillance',
    'elec.cta.item5': 'Custom electronics & embedded',
    'elec.cta.closing': 'No sales pitch. Just an engineering conversation about your project.',
    'elec.cta.whatsapp': 'WhatsApp: +52 720 253 3388',
    'elec.cta.linkedin': 'Reach out via LinkedIn',

    // AI Consultant
    'elec.consultant.title': 'Have a project in mind?',
    'elec.consultant.subtitle': 'Tell Karu about your electronics or control challenge — our AI will point you in the right direction.',
    'elec.consultant.greeting': "Hey! I'm Karu. Tell me about your electronics, IoT, control, or security project — I'll explain how Karuna Electronics can help. No fluff, just engineering.",
    'elec.consultant.placeholder': 'Describe your project...',
    'elec.consultant.bookCall': 'Continue on WhatsApp',
    'elec.consultant.thinking': 'Thinking...',
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
    'deck.heroLead': 'Diseñamos, automatizamos y escalamos sistemas tecnológicos con precisión y rigor arquitectónico.',
    'deck.heroDesc': 'Karuna es una consultoría tecnológica enfocada en construir arquitecturas listas para producción. Trabajamos de cerca con nuestros clientes para diseñar, validar e implementar sistemas que escalen de manera confiable en software, datos, IA y plataformas empresariales.',
    'deck.specialtiesTitle': 'Lo Que Mejor Hacemos',

    // SaaS
    'deck.saas.title': 'Diseño y Administración de Productos SaaS',
    'deck.saas.lead': 'Diseñamos y operamos plataformas SaaS desde la arquitectura hasta producción, de principio a fin.',
    'deck.saas.item1': 'Arquitectura de producto y diseño de sistemas',
    'deck.saas.item2': 'Desarrollo backend y frontend',
    'deck.saas.item3': 'Infraestructura en la nube y pipelines de despliegue',
    'deck.saas.item4': 'Observabilidad, escalamiento y gobernanza operacional',
    'deck.saas.item5': 'Herramientas de administración y dashboards internos',
    'deck.saas.closing': 'Nuestro enfoque va más allá de construir productos SaaS — nos aseguramos de que sean operables, mantenibles y escalables a lo largo del tiempo.',

    // LLM
    'deck.llm.title': 'Integraciones de LLM',
    'deck.llm.lead': 'Integramos Modelos de Lenguaje como componentes de producción dentro de tu arquitectura, con límites claros y gobernanza definida.',
    'deck.llm.item1': 'Flujos de trabajo y motores de decisión impulsados por LLM',
    'deck.llm.item2': 'Generación Aumentada por Recuperación (RAG)',
    'deck.llm.item3': 'Bases de datos vectoriales y estrategias de embedding',
    'deck.llm.item4': 'Optimización de tokens y control de costos',
    'deck.llm.item5': 'Pipelines de evaluación y testing de modelos',
    'deck.llm.closing': 'Cada integración de LLM incluye límites claros, monitoreo y controles de rendimiento como parte de la arquitectura.',

    // Support Automation
    'deck.support.title': 'Automatización de Soporte con LLMs',
    'deck.support.lead': 'Diseñamos sistemas de soporte impulsados por IA que reducen la carga operativa mientras mejoran la calidad y consistencia de las respuestas.',
    'deck.support.item1': 'Soporte automatizado de nivel 1 y nivel 2',
    'deck.support.item2': 'Ingestión de base de conocimiento y respuestas contextuales',
    'deck.support.item3': 'Clasificación y enrutamiento de tickets',
    'deck.support.item4': 'Integración multicanal (web, chat, herramientas empresariales)',
    'deck.support.item5': 'Modelos de escalamiento con intervención humana',
    'deck.support.closing': 'Estos sistemas están diseñados para ser auditables, explicables y listos para entornos empresariales.',

    // SAP
    'deck.sap.title': 'Automatización de Documentación SAP Basis y GRC',
    'deck.sap.lead': 'Nos especializamos en automatización de gobernanza y operaciones SAP, con un fuerte enfoque en auditabilidad y cumplimiento normativo.',
    'deck.sap.item1': 'Documentación operacional de SAP Basis',
    'deck.sap.item2': 'Flujos de asignación y validación de roles GRC',
    'deck.sap.item3': 'Soporte de Segregación de Funciones (SoD)',
    'deck.sap.item4': 'Generación de evidencia para auditorías',
    'deck.sap.item5': 'Automatización de procesos repetitivos de gobernanza',
    'deck.sap.closing': 'Nuestro enfoque reduce el esfuerzo manual mientras mejora la trazabilidad y el cumplimiento regulatorio.',

    // Education
    'deck.edu.title': 'Diseño e Implementación de Servicios Educativos',
    'deck.edu.lead': 'Diseñamos e implementamos plataformas educativas impulsadas por tecnología con resultados de aprendizaje medibles.',
    'deck.edu.item1': 'Diseño curricular para programas técnicos y enfocados en IA',
    'deck.edu.item2': 'Plataformas de aprendizaje asistidas por IA',
    'deck.edu.item3': 'Generación de contenido y automatización de evaluaciones',
    'deck.edu.item4': 'Analíticas de aprendizaje y seguimiento de progreso',
    'deck.edu.item5': 'Arquitecturas educativas escalables',
    'deck.edu.closing': 'Nos enfocamos en sistemas de aprendizaje y resultados, no solo en la entrega de contenido.',

    // Approach
    'deck.approach.title': 'Cómo Trabajamos',
    'deck.approach.tagline': 'Alta involucración. Bajo volumen. Alto impacto.',
    'deck.approach.desc': 'Karuna limita intencionalmente el número de proyectos concurrentes para asegurar una inmersión técnica profunda y rigor arquitectónico en cada compromiso.',
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
    'deck.consultant.greeting': '¡Hola! Soy Karu. Cuéntame qué estás buscando construir o qué desafío enfrentas, y te explico cómo Karuna puede ayudarte.',
    'deck.consultant.placeholder': '¿En qué estás trabajando?',
    'deck.consultant.bookCall': 'Continuar por WhatsApp',
    'deck.consultant.thinking': 'Pensando...',

    // Electronics Deck
    'elec.title': 'Karuna Electronics',
    'elec.subtitle': 'Electrónica, Control & Sistemas de Seguridad',
    'elec.heroLead': 'Diseñamos, instalamos y comisionamos sistemas de control electrónico, infraestructura IoT y soluciones inteligentes de seguridad.',
    'elec.heroDesc': 'Karuna Electronics es la división de hardware y control de Karuna. Ejecutamos proyectos de principio a fin — desde el diseño de circuitos y prototipado hasta la instalación y puesta en marcha — en IoT, control industrial, visión artificial y seguridad física.',
    'elec.specialtiesTitle': 'Nuestras Capacidades',

    // IoT
    'elec.iot.title': 'Soluciones IoT & Sistemas Conectados',
    'elec.iot.lead': 'Diseñamos y desplegamos arquitecturas IoT que conectan activos físicos a la nube con confiabilidad y visibilidad en tiempo real.',
    'elec.iot.item1': 'Diseño y despliegue de redes de sensores (temperatura, humedad, presión, vibración, etc.)',
    'elec.iot.item2': 'Protocolos de conectividad — MQTT, LoRa, Zigbee, Wi-Fi, celular (4G/5G)',
    'elec.iot.item3': 'Gateways de borde y procesamiento local de datos',
    'elec.iot.item4': 'Dashboards de telemetría en la nube y alertas en tiempo real',
    'elec.iot.item5': 'Mantenimiento predictivo y monitoreo remoto de activos',
    'elec.iot.closing': 'Cada despliegue IoT está diseñado para confiabilidad, seguridad e integración sin fisuras con tu infraestructura existente.',

    // Control Systems
    'elec.control.title': 'Diseño e Instalación de Sistemas de Control',
    'elec.control.lead': 'Diseñamos e instalamos sistemas de control industrial — desde automatización de una sola máquina hasta control de procesos de planta completa.',
    'elec.control.item1': 'Programación de PLCs y diseño de tableros (Siemens, Allen-Bradley, Schneider)',
    'elec.control.item2': 'Integración de sistemas SCADA y configuración de paneles HMI',
    'elec.control.item3': 'Variadores de frecuencia, VFDs y control de movimiento',
    'elec.control.item4': 'Instrumentación de procesos e integración de dispositivos de campo',
    'elec.control.item5': 'Fabricación e instalación de tableros de control eléctrico',
    'elec.control.closing': 'Entregamos sistemas de control llave en mano — diseñados, construidos, instalados y comisionados en sitio.',

    // Image Processing & Computer Vision
    'elec.vision.title': 'Procesamiento de Imágenes & Visión Artificial',
    'elec.vision.lead': 'Instalamos y configuramos sistemas basados en cámaras para inspección visual en tiempo real, analítica y detección inteligente.',
    'elec.vision.item1': 'Sistemas de cámaras industriales y selección de ópticas',
    'elec.vision.item2': 'Detección de defectos en tiempo real e inspección de calidad',
    'elec.vision.item3': 'Sistemas de OCR, código de barras y verificación de etiquetas',
    'elec.vision.item4': 'Analítica de video con IA en el borde (edge)',
    'elec.vision.item5': 'Integración con PLCs y control de líneas de producción',
    'elec.vision.closing': 'Nuestros sistemas de visión están diseñados para entornos de producción — confiables, rápidos e integrados con tu automatización existente.',

    // Security & Surveillance
    'elec.security.title': 'Sistemas de Seguridad & Vigilancia',
    'elec.security.lead': 'Diseñamos e instalamos sistemas de seguridad integrales — desde infraestructura CCTV hasta control de acceso y protección perimetral.',
    'elec.security.item1': 'Diseño de sistemas CCTV, selección de cámaras e instalación',
    'elec.security.item2': 'Sistemas de control de acceso (biométrico, RFID, PIN)',
    'elec.security.item3': 'Detección de intrusión y seguridad perimetral',
    'elec.security.item4': 'Monitoreo centralizado y gestión de video (VMS)',
    'elec.security.item5': 'Integración con sistemas de alarma y protocolos de emergencia',
    'elec.security.closing': 'La seguridad no son solo cámaras — diseñamos sistemas por capas que protegen a tu gente, activos y operaciones.',

    // Embedded Systems
    'elec.embedded.title': 'Sistemas Embebidos & Electrónica a Medida',
    'elec.embedded.lead': 'Diseñamos tarjetas electrónicas y firmware embebido para aplicaciones especializadas que los productos comerciales no resuelven.',
    'elec.embedded.item1': 'Diseño y prototipado de PCBs a medida',
    'elec.embedded.item2': 'Desarrollo de firmware (STM32, ESP32, Arduino, Raspberry Pi)',
    'elec.embedded.item3': 'Módulos de cómputo en el borde para procesamiento en tiempo real',
    'elec.embedded.item4': 'Tarjetas de interfaz de sensores personalizadas',
    'elec.embedded.item5': 'Coordinación de manufactura en lotes pequeños',
    'elec.embedded.closing': 'Del concepto al prototipo a producción — construimos el hardware que tu proyecto necesita.',

    // Approach
    'elec.approach.title': 'Cómo Trabajamos',
    'elec.approach.tagline': 'Diseñar bien. Construir una vez. Instalar para que dure.',
    'elec.approach.desc': 'Karuna Electronics maneja cada fase — desde la evaluación inicial y el diseño de ingeniería hasta la instalación física y puesta en marcha. No entregamos especificaciones y nos vamos.',
    'elec.approach.roleTitle': 'Cómo se ve eso:',
    'elec.approach.role1': 'Evaluación en sitio e ingeniería de requerimientos',
    'elec.approach.role2': 'Diseño detallado del sistema con selección de componentes',
    'elec.approach.role3': 'Prototipado y validación antes del despliegue completo',
    'elec.approach.role4': 'Instalación física, cableado, comisionamiento y entrega',

    // Delivery
    'elec.delivery.title': 'Cómo Entregamos',
    'elec.delivery.flow': 'Evaluación \u2192 Diseño \u2192 Prototipado \u2192 Instalación \u2192 Comisionamiento',
    'elec.delivery.desc': 'Comenzamos con una visita al sitio y evaluación técnica. A partir de ahí, diseñamos la solución, validamos con prototipos cuando es necesario, instalamos en sitio y comisionamos hasta que todo funcione según lo especificado.',

    // CTA
    'elec.cta.title': '¿Listo para hablar?',
    'elec.cta.lead': 'Si algo de esto suena a tu mundo:',
    'elec.cta.item1': 'IoT y sistemas conectados',
    'elec.cta.item2': 'Control industrial y automatización',
    'elec.cta.item3': 'Visión artificial e inspección',
    'elec.cta.item4': 'Seguridad y vigilancia',
    'elec.cta.item5': 'Electrónica a medida y embebidos',
    'elec.cta.closing': 'Sin discurso de ventas. Solo una conversación de ingeniería sobre tu proyecto.',
    'elec.cta.whatsapp': 'WhatsApp: +52 720 253 3388',
    'elec.cta.linkedin': 'Contáctanos por LinkedIn',

    // AI Consultant
    'elec.consultant.title': '¿Tienes un proyecto en mente?',
    'elec.consultant.subtitle': 'Cuéntale a Karu sobre tu reto de electrónica o control — nuestra IA te orientará.',
    'elec.consultant.greeting': '¡Hola! Soy Karu. Cuéntame sobre tu proyecto de electrónica, IoT, control o seguridad — te explico cómo Karuna Electronics puede ayudarte. Sin rodeos, pura ingeniería.',
    'elec.consultant.placeholder': 'Describe tu proyecto...',
    'elec.consultant.bookCall': 'Continuar por WhatsApp',
    'elec.consultant.thinking': 'Pensando...',
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
