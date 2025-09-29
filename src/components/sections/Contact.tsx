// src/components/sections/Contact.tsx
import { motion } from 'framer-motion';
import styles from './Contact.module.css';

const Contact = () => {
  const openWhatsApp = () => {
    const whatsappNumber = '527202533388';
    const message = encodeURIComponent('Hi Karuna! I would like to start a project with you');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={styles.content}
        >
          <h2 className={styles.title}>Let's Create Together</h2>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className={styles.divider}
          />
          
          <p className={styles.description}>
            Ready to transform your ideas into reality?
          </p>
          
          <motion.button
            onClick={openWhatsApp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.whatsappButton}
          >
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 0C4.5 0 0 4.5 0 10C0 11.8 0.5 13.5 1.4 15L0 20L5.2 18.6C6.6 19.4 8.2 19.9 10 19.9C15.5 19.9 20 15.4 20 9.9C20 7.3 19 4.8 17.1 2.9C15.2 1 12.7 0 10 0ZM10 18.2C8.4 18.2 6.8 17.7 5.5 16.9L5.2 16.7L2.2 17.5L3 14.6L2.8 14.3C1.9 13 1.4 11.5 1.4 10C1.4 5.4 5.4 1.4 10 1.4C12.2 1.4 14.3 2.3 15.9 3.8C17.4 5.4 18.3 7.4 18.3 9.9C18.6 14.6 14.6 18.2 10 18.2Z"/>
              <path d="M14.6 12C14.4 11.9 13.3 11.4 13.1 11.3C12.9 11.2 12.8 11.2 12.6 11.4C12.5 11.6 12 12.1 11.9 12.2C11.8 12.4 11.6 12.4 11.5 12.3C11.3 12.2 10.6 12 9.8 11.3C9.2 10.8 8.7 10.1 8.6 9.9C8.5 9.7 8.6 9.6 8.7 9.5C8.8 9.4 8.9 9.3 9 9.2C9.1 9.1 9.1 9 9.2 8.9C9.2 8.8 9.2 8.6 9.2 8.5C9.1 8.4 8.7 7.4 8.5 7C8.3 6.6 8.2 6.6 8 6.6C7.9 6.6 7.7 6.6 7.6 6.6C7.4 6.6 7.2 6.7 7 6.9C6.8 7.1 6.3 7.6 6.3 8.6C6.3 9.7 7 10.7 7.1 10.9C7.2 11 8.7 13.1 10.2 13.9C10.7 14.1 11.1 14.2 11.4 14.3C11.9 14.5 12.3 14.4 12.6 14.4C13 14.3 13.7 13.9 13.8 13.5C14 13 14 12.6 13.9 12.6C13.9 12.4 13.8 12.2 14.6 12Z"/>
            </svg>
            <span>Chat on WhatsApp</span>
          </motion.button>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className={styles.phoneNumber}
          >
            +52 720 253 3388
          </motion.p>
        </motion.div>
        
        {/* Optional: Subtle ink brush effect */}
        <div className={styles.inkBrush} />
      </div>
    </section>
  );
};

export default Contact;