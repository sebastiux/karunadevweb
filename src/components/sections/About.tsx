// src/components/sections/About.tsx
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import styles from './About.module.css';

const About = () => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);

  return (
    <section id="about" className={styles.aboutSection} ref={containerRef}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <h2 className={styles.title}>{t('about.title')}</h2>
          
          <motion.div
            className={styles.divider}
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </motion.div>

        <motion.div 
          className={styles.mainContent}
          style={{ opacity }}
        >
          <motion.p
            className={styles.leadText}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {t('about.lead')}
          </motion.p>

          <motion.p
            className={styles.philosophyText}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {t('about.philosophy')}
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.offerSection}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className={styles.offerTitle}>{t('about.whatWeOffer')}</h3>

          <div className={styles.offerGrid}>
            <motion.div
              className={styles.offerItem}
              whileHover={{ x: 10 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <span className={styles.offerNumber}>01</span>
              <p className={styles.offerText}>
                {t('about.offer1')}
              </p>
            </motion.div>

            <motion.div
              className={styles.offerItem}
              whileHover={{ x: 10 }}
            >
              <span className={styles.offerNumber}>02</span>
              <p className={styles.offerText}>
                {t('about.offer2')}
              </p>
            </motion.div>

            <motion.div
              className={styles.offerItem}
              whileHover={{ x: 10 }}
            >
              <span className={styles.offerNumber}>03</span>
              <p className={styles.offerText}>
                {t('about.offer3')}
              </p>
            </motion.div>

            <motion.div
              className={styles.offerItem}
              whileHover={{ x: 10 }}
            >
              <span className={styles.offerNumber}>04</span>
              <p className={styles.offerText}>
                {t('about.offer4')}
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className={styles.closingStatement}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          viewport={{ once: true }}
        >
          <p className={styles.closingText}>
            {t('about.closing')}
          </p>
        </motion.div>

        {/* Subtle animated line */}
        <motion.div 
          className={styles.animatedLine}
          animate={{ 
            scaleX: isHovered ? 1 : 0.8,
            opacity: isHovered ? 1 : 0.3 
          }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </section>
  );
};

export default About;