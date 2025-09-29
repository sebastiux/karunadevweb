// src/components/sections/ServicesGrid.tsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import { AutomationIcon, DataIcon, WebIcon, SaasIcon, HardwareIcon } from '../icons/ServiceIcons';
import styles from './ServicesGrid.module.css';

interface Service {
  id: string;
  title: string;
  subtitle: string;
  Icon: React.FC;
}

const ServicesGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const services: Service[] = [
    {
      id: 'automation',
      title: 'Automation',
      subtitle: 'Intelligent workflow solutions',
      Icon: AutomationIcon
    },
    {
      id: 'data',
      title: 'Data',
      subtitle: 'Analytics and optimization',
      Icon: DataIcon
    },
    {
      id: 'web',
      title: 'Web',
      subtitle: 'Digital experiences',
      Icon: WebIcon
    },
    {
      id: 'saas',
      title: 'SAAS',
      subtitle: 'Cloud applications',
      Icon: SaasIcon
    },
    {
      id: 'hardware',
      title: 'Hardware',
      subtitle: 'IoT solutions',
      Icon: HardwareIcon
    }
  ];

  return (
    <section id="services" className={styles.servicesSection}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <h2 className={styles.title}>Services</h2>
          <p className={styles.subtitle}>
            We craft digital solutions that transform businesses through elegant technology and thoughtful design.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => document.getElementById(service.id)?.scrollIntoView({ behavior: 'smooth' })}
              className={styles.serviceCard}
            >
              <div className={styles.divider}>
                <motion.div
                  className={styles.progressBar}
                  animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              <div className={styles.content}>
                <div className={styles.iconWrapper}>
                  <service.Icon />
                </div>
                
                <div className={styles.textContent}>
                  <h3 className={styles.serviceTitle}>
                    {service.title}
                  </h3>
                  <p className={styles.serviceSubtitle}>
                    {service.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;