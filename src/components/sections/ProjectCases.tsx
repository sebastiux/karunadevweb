// src/components/sections/ProjectCases.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from './ProjectCases.module.css';

interface Project {
  id: string;
  title: string;
  url: string;
  category: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies?: string[];
}

const ProjectCases = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('all');
  
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
      title: 'NIO Learning',
      url: 'https://niolearning.com',
      category: 'AI Education Platform',
      description: 'One of the first AI-powered education platforms in Latin America',
      challenge: 'Traditional education platforms lacked personalization and couldn\'t adapt to individual learning styles, leaving students struggling to keep pace or feeling unchallenged.',
      solution: 'We developed and scaled NIO Learning from the ground up — an AI-powered education platform that personalizes learning paths, adapts content difficulty in real-time, and provides intelligent tutoring assistance to students across Latin America.',
      results: [
        'Pioneer AI education platform in LATAM',
        'Personalized learning paths for each student',
        'Real-time content adaptation',
        'Scalable architecture serving thousands of users'
      ],
      technologies: ['AI/ML', 'LLM Integration', 'React', 'Node.js', 'Cloud Infrastructure']
    },
    // Crickett
    {
      id: 'crickett',
      title: 'Crickett',
      url: 'https://crickett.com.mx',
      category: 'Chatbot Automation',
      description: 'AI automation tool for lead capture — plug and use, no flow design needed',
      challenge: 'Entrepreneurs and small businesses needed chatbot automation but were overwhelmed by complex flow builders, technical setup, and expensive solutions that required constant maintenance.',
      solution: 'We built Crickett — an AI chatbot automation tool that\'s ready to use out of the box. Just connect it to your website and WhatsApp, and start capturing leads instantly. No flow design, no technical knowledge required. Pure plug-and-play automation.',
      results: [
        'Zero-configuration chatbot deployment',
        'Website + WhatsApp integration',
        'Instant lead capture automation',
        'Built for entrepreneurs and SMBs'
      ],
      technologies: ['AI Chatbots', 'WhatsApp API', 'Web Embedding', 'Lead Automation']
    }
  ];

  const categories = ['all', 'AI Education Platform', 'Chatbot Automation'];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const openWhatsApp = (projectTitle?: string) => {
    const baseMessage = projectTitle
      ? `Hi Karuna! I'm interested in discussing an AI solution similar to "${projectTitle}"`
      : `Hi Karuna! I'd like to discuss AI/LLM solutions for my business`;
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
          <h2 className={styles.title}>What We've Built</h2>
          <div className={styles.disclaimer}>
            <p className={styles.disclaimerText}>
              <strong>We're business makers.</strong> We walk with our clients to build not just scalable software,
              but scalable business solutions. Here are some of the AI-powered products we've developed and launched.
            </p>
            <button 
              onClick={() => openWhatsApp()}
              className={styles.whatsappButton}
            >
              <WhatsAppIcon />
              <span>Let's Discuss Your Project</span>
            </button>
            <p className={styles.phoneNumber}>WhatsApp: +52 720 253 3388</p>
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
              {cat === 'all' ? 'All Projects' : cat}
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
            onWhatsApp={() => openWhatsApp(selectedProject.title)}
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
  onClick
}: {
  project: Project;
  index: number;
  onClick: () => void;
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
          {project.category}
        </span>
      </div>

      <h3 className={styles.projectTitle}>
        {project.title}
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
        {project.description}
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
          Visit Site ↗
        </button>
        <div className={styles.viewCase}>
          <span>View Details</span>
          <span className={styles.arrow}>→</span>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectModal = ({ 
  project, 
  onClose,
  onWhatsApp
}: { 
  project: Project; 
  onClose: () => void;
  onWhatsApp: () => void;
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
                {project.title}
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
            <h3 className={styles.sectionTitle}>The Challenge</h3>
            <p className={styles.sectionText}>
              {project.challenge}
            </p>
          </div>

          <div className={styles.contentSection}>
            <h3 className={styles.sectionTitle}>Our Solution</h3>
            <p className={styles.sectionText}>
              {project.solution}
            </p>
          </div>

          <div className={styles.contentSection}>
            <h3 className={styles.sectionTitle}>Results</h3>
            <ul className={styles.resultsList}>
              {project.results.map((result, i) => (
                <li key={i} className={styles.resultItem}>
                  <span className={styles.resultBullet}>•</span>
                  <span className={styles.resultText}>{result}</span>
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
              Ready to build something together?
            </p>
            <button 
              className={styles.modalWhatsappButton}
              onClick={onWhatsApp}
            >
              <WhatsAppIcon />
              <span>WhatsApp: +52 720 253 3388</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCases;