// src/components/sections/ProjectCases.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './ProjectCases.module.css';

interface Project {
  id: string;
  titleKey: string;
  url: string;
  categoryKey: string;
  descriptionKey: string;
  challengeKey: string;
  solutionKey: string;
  resultKeys: string[];
  technologies?: string[];
}

const ProjectCases = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const { t, language } = useLanguage();

  const whatsappNumber = '527202533388';
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  // Listen for filter events from navbar
  useEffect(() => {
    const handleFilterEvent = (event: Event) => {
      const customEvent = event as CustomEvent;
      setFilter(customEvent.detail);
    };

    window.addEventListener('filterProjects', handleFilterEvent);

    return () => {
      window.removeEventListener('filterProjects', handleFilterEvent);
    };
  }, []);

  const projects: Project[] = [
    // NIO Learning
    {
      id: 'nio-learning',
      titleKey: 'nio.title',
      url: 'https://niolearning.com',
      categoryKey: 'nio.category',
      descriptionKey: 'nio.description',
      challengeKey: 'nio.challenge',
      solutionKey: 'nio.solution',
      resultKeys: ['nio.result1', 'nio.result2', 'nio.result3', 'nio.result4'],
      technologies: ['AI/ML', 'LLM Integration', 'React', 'Node.js', 'Cloud Infrastructure']
    },
    // Crickett
    {
      id: 'crickett',
      titleKey: 'crickett.title',
      url: 'https://crickett.com.mx',
      categoryKey: 'crickett.category',
      descriptionKey: 'crickett.description',
      challengeKey: 'crickett.challenge',
      solutionKey: 'crickett.solution',
      resultKeys: ['crickett.result1', 'crickett.result2', 'crickett.result3', 'crickett.result4'],
      technologies: ['AI Chatbots', 'WhatsApp API', 'Web Embedding', 'Lead Automation']
    }
  ];

  const categories = ['all', 'AI Education Platform', 'Chatbot Automation'];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => t(p.categoryKey) === filter || p.categoryKey.includes(filter.toLowerCase().replace(' ', '')));

  const openWhatsApp = (projectTitle?: string) => {
    const baseMessage = language === 'en'
      ? (projectTitle
        ? `Hi Karuna! I'm interested in discussing an AI solution similar to "${projectTitle}"`
        : `Hi Karuna! I'd like to discuss AI/LLM solutions for my business`)
      : (projectTitle
        ? `¡Hola Karuna! Me interesa hablar sobre una solución de IA similar a "${projectTitle}"`
        : `¡Hola Karuna! Me gustaría hablar sobre soluciones de IA/LLM para mi negocio`);
    const encodedMessage = encodeURIComponent(baseMessage);
    window.open(`${whatsappLink}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="work" className={styles.section}>
      <div className={styles.container}>
        {/* Header with Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <h2 className={styles.title}>{t('projects.title')}</h2>
          <div className={styles.disclaimer}>
            <p className={styles.disclaimerText}>
              <strong>{t('projects.intro')}</strong> {t('projects.introText')}
            </p>
            <button
              onClick={() => openWhatsApp()}
              className={styles.whatsappButton}
            >
              <WhatsAppIcon />
              <span>{t('projects.discuss')}</span>
            </button>
            <p className={styles.phoneNumber}>{t('projects.whatsapp')} +52 720 253 3388</p>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <div className={styles.filterTabs}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`${styles.filterTab} ${filter === cat ? styles.activeTab : ''}`}
            >
              {cat === 'all' ? t('projects.allProjects') : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={styles.projectsGrid}>
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
                t={t}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onWhatsApp={() => openWhatsApp(t(selectedProject.titleKey))}
            t={t}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 0C4.5 0 0 4.5 0 10C0 11.8 0.5 13.5 1.4 15L0 20L5.2 18.6C6.6 19.4 8.2 19.9 10 19.9C15.5 19.9 20 15.4 20 9.9C20 7.3 19 4.8 17.1 2.9C15.2 1 12.7 0 10 0ZM10 18.2C8.4 18.2 6.8 17.7 5.5 16.9L5.2 16.7L2.2 17.5L3 14.6L2.8 14.3C1.9 13 1.4 11.5 1.4 10C1.4 5.4 5.4 1.4 10 1.4C12.2 1.4 14.3 2.3 15.9 3.8C17.4 5.4 18.3 7.4 18.3 9.9C18.6 14.6 14.6 18.2 10 18.2Z"/>
    <path d="M14.6 12C14.4 11.9 13.3 11.4 13.1 11.3C12.9 11.2 12.8 11.2 12.6 11.4C12.5 11.6 12 12.1 11.9 12.2C11.8 12.4 11.6 12.4 11.5 12.3C11.3 12.2 10.6 12 9.8 11.3C9.2 10.8 8.7 10.1 8.6 9.9C8.5 9.7 8.6 9.6 8.7 9.5C8.8 9.4 8.9 9.3 9 9.2C9.1 9.1 9.1 9 9.2 8.9C9.2 8.8 9.2 8.6 9.2 8.5C9.1 8.4 8.7 7.4 8.5 7C8.3 6.6 8.2 6.6 8 6.6C7.9 6.6 7.7 6.6 7.6 6.6C7.4 6.6 7.2 6.7 7 6.9C6.8 7.1 6.3 7.6 6.3 8.6C6.3 9.7 7 10.7 7.1 10.9C7.2 11 8.7 13.1 10.2 13.9C10.7 14.1 11.1 14.2 11.4 14.3C11.9 14.5 12.3 14.4 12.6 14.4C13 14.3 13.7 13.9 13.8 13.5C14 13 14 12.6 13.9 12.6C13.9 12.4 13.8 12.2 14.6 12Z"/>
  </svg>
);

const ProjectCard = ({
  project,
  index,
  onClick,
  t
}: {
  project: Project;
  index: number;
  onClick: () => void;
  t: (key: string) => string;
}) => {
  const handleVisitSite = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(project.url, '_blank');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={styles.projectCard}
    >
      <div className={styles.cardHeader}>
        <span className={styles.category}>
          {t(project.categoryKey)}
        </span>
      </div>

      <h3 className={styles.projectTitle}>
        {t(project.titleKey)}
      </h3>

      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className={styles.projectLink}
      >
        {project.url.replace('https://', '')} ↗
      </a>

      <p className={styles.projectDescription}>
        {t(project.descriptionKey)}
      </p>

      {project.technologies && (
        <div className={styles.techStack}>
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span key={i} className={styles.techTag}>
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className={styles.cardActions}>
        <button onClick={handleVisitSite} className={styles.visitButton}>
          {t('projects.visitSite')} ↗
        </button>
        <div className={styles.viewCase}>
          <span>{t('projects.viewDetails')}</span>
          <span className={styles.arrow}>→</span>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({
  project,
  onClose,
  onWhatsApp,
  t
}: {
  project: Project;
  onClose: () => void;
  onWhatsApp: () => void;
  t: (key: string) => string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.modalOverlay}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className={styles.modalContent}
      >
        <div className={styles.modalInner}>
          {/* Header */}
          <div className={styles.modalHeader}>
            <div>
              <h2 className={styles.modalTitle}>
                {t(project.titleKey)}
              </h2>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.modalLink}
              >
                {project.url.replace('https://', '')} ↗
              </a>
            </div>
            <button
              onClick={onClose}
              className={styles.closeButton}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1"/>
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className={styles.contentSection}>
            <h3 className={styles.sectionTitle}>{t('projects.challenge')}</h3>
            <p className={styles.sectionText}>
              {t(project.challengeKey)}
            </p>
          </div>

          <div className={styles.contentSection}>
            <h3 className={styles.sectionTitle}>{t('projects.solution')}</h3>
            <p className={styles.sectionText}>
              {t(project.solutionKey)}
            </p>
          </div>

          <div className={styles.contentSection}>
            <h3 className={styles.sectionTitle}>{t('projects.results')}</h3>
            <ul className={styles.resultsList}>
              {project.resultKeys.map((resultKey, i) => (
                <li key={i} className={styles.resultItem}>
                  <span className={styles.resultBullet}>•</span>
                  <span className={styles.resultText}>{t(resultKey)}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.technologies && (
            <div className={styles.contentSection}>
              <h3 className={styles.sectionTitle}>Technologies Used</h3>
              <div className={styles.modalTechStack}>
                {project.technologies.map((tech, i) => (
                  <span key={i} className={styles.modalTechTag}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className={styles.ctaSection}>
            <p className={styles.ctaPrompt}>
              {t('projects.cta')}
            </p>
            <button
              className={styles.modalWhatsappButton}
              onClick={onWhatsApp}
            >
              <WhatsAppIcon />
              <span>{t('projects.ctaButton')}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCases;