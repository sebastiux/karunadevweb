import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { KarunaLogo } from '../assets';
import { useLanguage } from '../context/LanguageContext';
import styles from './ElectronicsDeck.module.css';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const ELEC_SYSTEM_PROMPT = `You are Karu, the AI consultant for Karuna Electronics — the control engineering, applied electronics, and intelligent infrastructure division of Karuna.

Karuna Electronics designs and implements advanced solutions for organizations seeking operational efficiency, technological resilience, and real-time traceability. Core services:

1. Industrial IoT Architectures — sensor networks, edge computing, cloud integration, industrial protocols (MQTT, Modbus TCP/IP, OPC-UA), predictive maintenance, multi-site remote monitoring
2. Automation & Control Systems — PLC programming (Siemens, Allen-Bradley, Schneider Electric), SCADA/HMI, electrical panel design/fabrication, VFDs, legacy machinery digitalization. Turnkey with FAT/SAT testing.
3. Computer Vision & Edge Analytics — automated quality control, label verification, in-line defect detection, PLC/MES integration, AI-powered image processing at the edge
4. Electronic Security Infrastructure — enterprise CCTV, Hikvision integration, biometric/RFID access control, perimeter protection, emergency protocols. Security as critical infrastructure.
5. Applied Electronics & Embedded Systems — custom PCB design, embedded firmware, edge modules, custom sensor interfaces, pilot batch production

Model: End-to-end execution — assessment, architecture design, prototyping, field implementation, commissioning, and operational handover.

Your job:
1. Listen to the user's challenge or need related to electronics, IoT, control, vision, or security
2. Briefly explain which Karuna Electronics service(s) are relevant and how we'd approach it (1-3 sentences)
3. After explaining, suggest they book a call via WhatsApp to discuss further

Keep responses concise (2-4 sentences max). Be friendly and direct — talk like an engineer, not a salesperson. Never oversell. Speak in English or Spanish matching the user's language.`;

const ElectronicsDeck = () => {
  const { t, language, setLanguage } = useLanguage();

  // Set Spanish as default language for this deck
  useEffect(() => {
    setLanguage('es');
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWhatsAppCTA, setShowWhatsAppCTA] = useState(false);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const hasInteracted = useRef(false);

  const whatsappNumber = '527202533388';

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        role: 'assistant',
        content: t('elec.consultant.greeting')
      }]);
    }
  }, []);

  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'assistant' && messages[0].id === '1') {
      setMessages([{
        id: '1',
        role: 'assistant',
        content: t('elec.consultant.greeting')
      }]);
    }
  }, [language, t]);

  useEffect(() => {
    if (!hasInteracted.current) return;
    const container = chatMessagesRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isLoading]);

  const generateWhatsAppMessage = () => {
    const userMessages = messages
      .filter(m => m.role === 'user')
      .map(m => m.content)
      .filter(msg => msg.length > 3);
    const needs = userMessages.join('. ');

    if (language === 'es') {
      return `Hola! Hable con Karu en el presentation deck de Karuna Electronics.\n\nEstoy buscando ayuda con: ${needs || 'soluciones de electronica y control'}\n\nPodemos agendar una llamada?`;
    }
    return `Hi! I chatted with Karu on the Karuna Electronics presentation deck.\n\nI'm looking for help with: ${needs || 'electronics and control solutions'}\n\nCan we schedule a call?`;
  };

  const openWhatsApp = () => {
    const msg = encodeURIComponent(generateWhatsAppMessage());
    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
  };

  const sendMessage = async () => {
    if (!chatInput.trim() || isLoading) return;
    hasInteracted.current = true;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput.trim()
    };

    setMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROK_API_KEY || ''}`
        },
        body: JSON.stringify({
          model: 'grok-3-mini-fast',
          messages: [
            { role: 'system', content: ELEC_SYSTEM_PROMPT },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMsg.content }
          ],
          max_tokens: 300,
          temperature: 0.7
        })
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      const content = data.choices[0]?.message?.content || (language === 'es'
        ? 'Disculpa, tuve un problema. Por favor intenta de nuevo.'
        : 'Sorry, I had trouble responding. Please try again.');

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content
      }]);

      if (messages.length >= 2) {
        setShowWhatsAppCTA(true);
      }
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: language === 'es'
          ? 'Me encantaria saber mas sobre tus necesidades. Contactanos directamente por WhatsApp y nuestro equipo te ayudara.'
          : "I'd love to learn more about your needs. Reach out directly via WhatsApp and our team will help you."
      }]);
      setShowWhatsAppCTA(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleLanguage = () => setLanguage(language === 'en' ? 'es' : 'en');

  const services = [
    { key: 'iot', items: 6 },
    { key: 'control', items: 5 },
    { key: 'vision', items: 5 },
    { key: 'security', items: 5 },
    { key: 'embedded', items: 5 },
  ];

  const stagger = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5, ease: 'easeOut' as const }
  };

  return (
    <div className={styles.page}>
      {/* Minimal Nav */}
      <nav className={styles.deckNav}>
        <a href="/">
          <img src={KarunaLogo} alt="Karuna" className={styles.navLogo} />
        </a>
        <div className={styles.navActions}>
          <a href="/" className={styles.backLink}>
            {language === 'en' ? 'Back to site' : 'Volver al sitio'}
          </a>
          <button className={styles.langButton} onClick={toggleLanguage}>
            {language === 'en' ? 'ES' : 'EN'}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <motion.section
        className={styles.hero}
        initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' as const }}
        >
          <h1 className={styles.heroTitle}>{t('elec.title')}</h1>
          <p className={styles.heroSubtitle}>{t('elec.subtitle')}</p>
          <p className={styles.heroLead}>{t('elec.heroLead')}</p>
          <p className={styles.heroDesc}>{t('elec.heroDesc')}</p>
        </motion.section>

        <div className={styles.divider} />

        {/* Specialties Header */}
        <motion.div className={styles.specialtiesHeader} {...stagger}>
          <h2 className={styles.specialtiesTitle}>{t('elec.specialtiesTitle')}</h2>
        </motion.div>

        {/* Service Cards */}
        {services.map((svc, index) => (
          <motion.section
            key={svc.key}
            className={styles.serviceCard}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: 'easeOut' as const, delay: index * 0.05 }}
          >
            <h3 className={styles.serviceTitle}>{t(`elec.${svc.key}.title`)}</h3>
            <p className={styles.serviceLead}>{t(`elec.${svc.key}.lead`)}</p>
            <ul className={styles.serviceList}>
              {Array.from({ length: svc.items }, (_, i) => (
                <li key={i}>{t(`elec.${svc.key}.item${i + 1}`)}</li>
              ))}
            </ul>
            <p className={styles.serviceClosing}>{t(`elec.${svc.key}.closing`)}</p>
          </motion.section>
        ))}

        {/* Approach */}
        <motion.section className={styles.approachSection} {...stagger}>
          <h2 className={styles.specialtiesTitle}>{t('elec.approach.title')}</h2>
          <p className={styles.approachTagline}>{t('elec.approach.tagline')}</p>
          <p className={styles.approachDesc}>{t('elec.approach.desc')}</p>
          <p className={styles.roleTitle}>{t('elec.approach.roleTitle')}</p>
          <ul className={styles.roleList}>
            <li>{t('elec.approach.role1')}</li>
            <li>{t('elec.approach.role2')}</li>
            <li>{t('elec.approach.role3')}</li>
            <li>{t('elec.approach.role4')}</li>
          </ul>
        </motion.section>

        {/* Delivery Model */}
        <motion.section className={styles.deliverySection} {...stagger}>
          <h2 className={styles.specialtiesTitle}>{t('elec.delivery.title')}</h2>
          <div className={styles.deliverySteps}>
            {t('elec.delivery.flow').split(' \u2192 ').map((step, i, arr) => (
              <div key={i} className={styles.deliveryStep}>
                <span className={styles.stepNumber}>{i + 1}</span>
                <span className={styles.stepLabel}>{step}</span>
                {i < arr.length - 1 && <span className={styles.stepArrow}>{'\u2192'}</span>}
              </div>
            ))}
          </div>
          <p className={styles.deliveryDesc}>{t('elec.delivery.desc')}</p>
        </motion.section>

        {/* Let's Talk CTA */}
        <motion.section className={styles.ctaSection} {...stagger}>
          <h2 className={styles.ctaTitle}>{t('elec.cta.title')}</h2>
          <p className={styles.ctaLead}>{t('elec.cta.lead')}</p>
          <ul className={styles.ctaList}>
            <li>{t('elec.cta.item1')}</li>
            <li>{t('elec.cta.item2')}</li>
            <li>{t('elec.cta.item3')}</li>
            <li>{t('elec.cta.item4')}</li>
            <li>{t('elec.cta.item5')}</li>
          </ul>
          <p className={styles.ctaClosing}>{t('elec.cta.closing')}</p>
          <div className={styles.ctaActions}>
            <button className={styles.whatsappButton} onClick={openWhatsApp}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t('elec.cta.whatsapp')}
            </button>
            <a
              href="https://www.linkedin.com/company/karunadev"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkedinButton}
            >
              {t('elec.cta.linkedin')}
            </a>
          </div>
        </motion.section>

      {/* AI Consultant Section */}
      <motion.section className={styles.consultantSection} {...stagger}>
        <div className={styles.consultantHeader}>
          <h2 className={styles.consultantTitle}>{t('elec.consultant.title')}</h2>
          <p className={styles.consultantSubtitle}>{t('elec.consultant.subtitle')}</p>
        </div>

        <div className={styles.chatContainer}>
          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderInfo}>
              <div className={styles.chatAvatar}>K</div>
              <div>
                <p className={styles.chatName}>Karu</p>
                <p className={styles.chatRole}>{t('chatbot.aiConsultant')}</p>
              </div>
            </div>
            <div className={styles.chatStatus}>
              <span className={styles.statusDot} />
              <span>{t('chatbot.online')}</span>
            </div>
          </div>

          <div ref={chatMessagesRef} className={styles.chatMessages}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.chatBubble} ${msg.role === 'user' ? styles.bubbleUser : styles.bubbleAssistant}`}
              >
                {msg.content}
              </div>
            ))}

            {isLoading && (
              <div className={`${styles.chatBubble} ${styles.bubbleAssistant}`}>
                <div className={styles.typingIndicator}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            {showWhatsAppCTA && (
              <button className={styles.chatWhatsappCTA} onClick={openWhatsApp}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>{t('elec.consultant.bookCall')}</span>
              </button>
            )}
          </div>

          <div className={styles.chatInputArea}>
            <input
              ref={chatInputRef}
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('elec.consultant.placeholder')}
              className={styles.chatInput}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!chatInput.trim() || isLoading}
              className={styles.chatSendButton}
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      </motion.section>

      <footer className={styles.footer}>
        Karuna Electronics &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default ElectronicsDeck;
