// src/components/ui/AIChatbot.tsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AIChatbot.module.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `You are Karu, a friendly and professional AI IT consultant for Karuna Dev, a company specializing in corporate LLM solutions and AI integrations. Your role is to:

1. Greet the user warmly and ask about their business challenges
2. Understand their needs through natural conversation (ask about their industry, team size, current pain points)
3. Identify which of our services could help them:
   - Enterprise Chatbots (customer service, HR, sales)
   - Document AI & RAG (legal docs, technical docs, compliance)
   - LLM Integrations (CRM, email, Slack)
   - AI Process Automation (invoices, resumes, reports)
   - Custom AI Solutions

Keep responses concise (2-3 sentences max). Be helpful but don't oversell. After understanding their needs (usually 3-4 exchanges), summarize what you've learned and offer to connect them with our team via WhatsApp.

When ready to hand off, say something like: "Based on our conversation, I can connect you with our team. Click the button below to send your requirements via WhatsApp."

Always be professional, warm, and solution-oriented. Speak in English or Spanish based on user's language.`;

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWhatsAppCTA, setShowWhatsAppCTA] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const whatsappNumber = '527202533388';

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting
      setMessages([{
        id: '1',
        role: 'assistant',
        content: "Hi! I'm Karu, your AI consultant. I help businesses discover how AI can solve their challenges. What brings you here today?"
      }]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const generateRequirementsSummary = () => {
    const userMessages = messages
      .filter(m => m.role === 'user')
      .map(m => m.content)
      .join(' | ');

    const lastAssistantMessage = messages
      .filter(m => m.role === 'assistant')
      .slice(-1)[0]?.content || '';

    return `Hi Karuna! I chatted with Karu (AI consultant) and here's what we discussed:\n\n${userMessages}\n\nKaru's summary: ${lastAssistantMessage}`;
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

      // Check if we should show WhatsApp CTA
      if (
        assistantContent.toLowerCase().includes('whatsapp') ||
        assistantContent.toLowerCase().includes('connect you') ||
        assistantContent.toLowerCase().includes('our team') ||
        messages.length >= 6
      ) {
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
                  <p className={styles.headerSubtitle}>AI Consultant</p>
                </div>
              </div>
              <div className={styles.statusIndicator}>
                <span className={styles.statusDot} />
                <span>Online</span>
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
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 0C4.5 0 0 4.5 0 10C0 11.8 0.5 13.5 1.4 15L0 20L5.2 18.6C6.6 19.4 8.2 19.9 10 19.9C15.5 19.9 20 15.4 20 9.9C20 7.3 19 4.8 17.1 2.9C15.2 1 12.7 0 10 0Z"/>
                  </svg>
                  <span>Send to WhatsApp</span>
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
                placeholder="Type your message..."
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
