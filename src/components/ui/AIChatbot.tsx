// src/components/ui/AIChatbot.tsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import styles from './AIChatbot.module.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `You are Karu, a friendly AI assistant for Karuna Dev, a company that builds AI solutions for businesses.

Your job is simple:
1. Greet the user warmly
2. Ask what they need help with
3. Once they explain their problem or need, briefly acknowledge it and encourage them to book a call via WhatsApp

Keep responses SHORT (1-2 sentences). Don't ask too many follow-up questions. Once you understand their basic need, suggest booking a call.

Example flow:
- User: "I want to automate my business"
- You: "Great! Automation can really help streamline your operations. Click below to book a call and we'll discuss the best solution for you."

Be friendly and conversational, not salesy. Speak in English or Spanish based on user's language.`;

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWhatsAppCTA, setShowWhatsAppCTA] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t, language } = useLanguage();

  const whatsappNumber = '527202533388';

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting based on language
      setMessages([{
        id: '1',
        role: 'assistant',
        content: t('chatbot.greeting')
      }]);
    }
  }, [isOpen, messages.length, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const generateRequirementsSummary = () => {
    // Get what the user said they need
    const userMessages = messages
      .filter(m => m.role === 'user')
      .map(m => m.content)
      .filter(msg => msg.toLowerCase() !== 'hello' && msg.toLowerCase() !== 'hi' && msg.toLowerCase() !== 'hola' && msg.length > 3);

    const needs = userMessages.join('. ');

    if (language === 'es') {
      return `¡Hola! Hablé con Karu en su sitio web.

Estoy buscando ayuda con: ${needs || 'soluciones de IA para mi negocio'}

¿Podemos agendar una llamada para discutirlo?`;
    }

    return `Hi! I chatted with Karu on your website.

I'm looking for help with: ${needs || 'AI solutions for my business'}

Can we schedule a call to discuss?`;
  };

  const openWhatsApp = () => {
    const summary = generateRequirementsSummary();
    const encodedMessage = encodeURIComponent(summary);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
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
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage.content }
          ],
          max_tokens: 200,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const assistantContent = data.choices[0]?.message?.content || "I apologize, I'm having trouble responding. Please try again.";

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: assistantContent
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Show WhatsApp CTA after user explains their need (2+ messages means they've said something beyond hello)
      if (messages.length >= 2) {
        setShowWhatsAppCTA(true);
      }
    } catch (error) {
      console.error('Chat error:', error);
      // Fallback response when API fails
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'd love to learn more about your needs. Feel free to reach out directly via WhatsApp and our team will help you find the perfect AI solution."
      };
      setMessages(prev => [...prev, fallbackMessage]);
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

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        className={styles.chatToggle}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close chat' : 'Open AI consultant'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.chatWindow}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerInfo}>
                <div className={styles.avatar}>
                  <span>K</span>
                </div>
                <div>
                  <h3 className={styles.headerTitle}>Karu</h3>
                  <p className={styles.headerSubtitle}>{t('chatbot.aiConsultant')}</p>
                </div>
              </div>
              <div className={styles.statusIndicator}>
                <span className={styles.statusDot} />
                <span>{t('chatbot.online')}</span>
              </div>
            </div>

            {/* Messages */}
            <div className={styles.messages}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`${styles.message} ${styles[message.role]}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {message.content}
                </motion.div>
              ))}

              {isLoading && (
                <div className={`${styles.message} ${styles.assistant}`}>
                  <div className={styles.typing}>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}

              {showWhatsAppCTA && (
                <motion.button
                  className={styles.whatsappCTA}
                  onClick={openWhatsApp}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>{t('chatbot.bookCall')}</span>
                </motion.button>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={styles.inputArea}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('chatbot.placeholder')}
                className={styles.input}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className={styles.sendButton}
                aria-label="Send message"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
