// src/components/sections/ProjectCases.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from './ProjectCases.module.css';

interface Project {
  id: string;
  title: string;
  client: string;
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
    // SAAS Projects
    {
      id: 'saas-1',
      title: 'Restaurant Management System',
      client: 'Example: Local Restaurant Chain',
      category: 'SAAS Development',
      description: 'Cloud-based ordering and inventory system',
      challenge: 'Restaurant needed to manage orders, inventory, and staff schedules in one place.',
      solution: 'Built a simple web app for order management, basic inventory tracking, and staff scheduling.',
      results: [
        'Orders processed 50% faster',
        'Inventory waste reduced by 30%',
        'Staff scheduling simplified',
        'Accessible from any device'
      ],
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Heroku']
    },
    {
      id: 'saas-2',
      title: 'Appointment Booking Platform',
      client: 'Example: Beauty Salon',
      category: 'SAAS Development',
      description: 'Online booking system with SMS reminders',
      challenge: 'Salon was losing customers due to phone-only booking and missed appointments.',
      solution: 'Created online booking platform with automated SMS reminders and calendar integration.',
      results: [
        'No-shows reduced by 40%',
        'Bookings increased by 25%',
        'Staff saves 2 hours daily',
        'Customers love the convenience'
      ],
      technologies: ['Vue.js', 'Express', 'MongoDB', 'Twilio']
    },
    {
      id: 'saas-3',
      title: 'Music Practice Tracker',
      client: 'Example: Music School',
      category: 'SAAS Development',
      description: 'Student progress tracking app',
      challenge: 'Teachers needed a way to track student practice time and progress between lessons.',
      solution: 'Simple app where students log practice sessions and teachers can monitor progress.',
      results: [
        '100+ students actively using',
        'Practice time increased 30%',
        'Better student-teacher communication',
        'Parents can track progress'
      ],
      technologies: ['React', 'Firebase', 'Chart.js']
    },

    // Hardware & IoT Projects
    {
      id: 'hardware-1',
      title: 'Smart Home Temperature Monitor',
      client: 'Example: Property Manager',
      category: 'Hardware & IoT',
      description: 'WiFi temperature sensors for rental properties',
      challenge: 'Property manager needed to monitor temperature in multiple units to prevent pipe freezing.',
      solution: 'Deployed simple WiFi sensors that send alerts when temperature drops below threshold.',
      results: [
        '10 properties monitored',
        'Prevented 3 potential pipe bursts',
        'Mobile app alerts',
        'Installation in 1 hour per unit'
      ],
      technologies: ['ESP8266', 'MQTT', 'React Native']
    },
    {
      id: 'hardware-2',
      title: 'Basic MIDI Controller',
      client: 'Example: Independent Musician',
      category: 'Hardware & IoT',
      description: 'Custom MIDI controller for live performances',
      challenge: 'Musician needed affordable custom MIDI controller with specific button layout.',
      solution: 'Built Arduino-based MIDI controller with customizable mapping.',
      results: [
        'Cost 70% less than commercial options',
        'Exactly matched performer needs',
        'USB plug-and-play',
        'Durable for touring'
      ],
      technologies: ['Arduino', 'C++', 'MIDI Protocol']
    },
    {
      id: 'hardware-3',
      title: 'Door Access Control',
      client: 'Example: Small Office',
      category: 'Hardware & IoT',
      description: 'RFID door access system',
      challenge: 'Office needed to track who enters and restrict access to certain areas.',
      solution: 'RFID card system with basic logging and time-based access rules.',
      results: [
        'Secure access for 50 employees',
        'Entry logs for security',
        'Easy card management',
        'Cost-effective solution'
      ],
      technologies: ['RFID', 'Raspberry Pi', 'Python']
    },

    // Automation Projects
    {
      id: 'automation-1',
      title: 'Invoice Generation Automation',
      client: 'Example: Freelance Agency',
      category: 'Automation',
      description: 'Automated monthly invoice creation',
      challenge: 'Agency spent hours every month creating and sending invoices manually.',
      solution: 'Script that pulls timesheet data and automatically generates and emails invoices.',
      results: [
        'Invoice creation: 4 hours to 5 minutes',
        'No more calculation errors',
        'Automatic payment reminders',
        'Professional PDF format'
      ],
      technologies: ['Python', 'PDF Generation', 'Email API']
    },
    {
      id: 'automation-2',
      title: 'Social Media Scheduler',
      client: 'Example: Small Business',
      category: 'Automation',
      description: 'Automated social media posting',
      challenge: 'Business owner had no time to post consistently on social media.',
      solution: 'Simple scheduler that posts pre-written content across platforms.',
      results: [
        'Consistent daily posting',
        'Engagement increased 40%',
        'Saves 5 hours weekly',
        'Posts to 3 platforms'
      ],
      technologies: ['Node.js', 'Social APIs', 'Cron Jobs']
    },
    {
      id: 'automation-3',
      title: 'Email Response System',
      client: 'Example: Customer Support',
      category: 'Automation',
      description: 'Auto-categorize and respond to common emails',
      challenge: 'Support team received 100+ emails daily with many repetitive questions.',
      solution: 'System that categorizes emails and sends template responses for common questions.',
      results: [
        '60% emails handled automatically',
        'Response time under 1 minute',
        'Team focuses on complex issues',
        'Customer satisfaction improved'
      ],
      technologies: ['Python', 'Gmail API', 'NLP Basics']
    },

    // Data Projects
    {
      id: 'data-1',
      title: 'Sales Dashboard',
      client: 'Example: E-commerce Store',
      category: 'Data Optimization',
      description: 'Simple analytics dashboard',
      challenge: 'Store owner couldn\'t easily see which products were selling best.',
      solution: 'Dashboard showing sales trends, top products, and basic customer insights.',
      results: [
        'Daily sales visible at a glance',
        'Identified best-selling products',
        'Better inventory decisions',
        'Mobile-friendly dashboard'
      ],
      technologies: ['Google Sheets API', 'Chart.js', 'React']
    },
    {
      id: 'data-2',
      title: 'Customer Feedback Analysis',
      client: 'Example: Service Company',
      category: 'Data Optimization',
      description: 'Organize and analyze customer reviews',
      challenge: 'Company had hundreds of reviews scattered across platforms with no overview.',
      solution: 'Tool that collects reviews and identifies common themes and sentiment.',
      results: [
        'All reviews in one place',
        'Identified top 5 improvement areas',
        'Response rate improved',
        'Monthly trend reports'
      ],
      technologies: ['Python', 'Basic NLP', 'PostgreSQL']
    },

    // Web Development Projects
    {
      id: 'web-1',
      title: 'Portfolio Website',
      client: 'Example: Creative Professional',
      category: 'Web Development',
      description: 'Clean, responsive portfolio site',
      challenge: 'Designer needed professional online presence to showcase work.',
      solution: 'Built fast, SEO-optimized portfolio with contact form and project galleries.',
      results: [
        'Loads in under 2 seconds',
        'Mobile-responsive design',
        '3x more client inquiries',
        'Easy to update content'
      ],
      technologies: ['Next.js', 'Tailwind CSS', 'Vercel']
    },
    {
      id: 'web-2',
      title: 'Local Business Website',
      client: 'Example: Dental Clinic',
      category: 'Web Development',
      description: 'Informational website with appointment request',
      challenge: 'Clinic had no online presence and was losing patients to competitors.',
      solution: 'Professional website with services, team info, and appointment request form.',
      results: [
        'First page on Google locally',
        '20+ appointment requests weekly',
        'Professional appearance',
        'Patients find info easily'
      ],
      technologies: ['WordPress', 'Custom Theme', 'SEO']
    }
  ];

  const categories = ['all', 'SAAS Development', 'Hardware & IoT', 'Automation', 'Data Optimization', 'Web Development'];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const openWhatsApp = (projectTitle?: string) => {
    const baseMessage = projectTitle 
      ? `Hi Karuna! I'm interested in discussing a project similar to "${projectTitle}"`
      : `Hi Karuna! I'd like to discuss a project for my business`;
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
          <h2 className={styles.title}>What We Can Build For You</h2>
          <div className={styles.disclaimer}>
            <p className={styles.disclaimerText}>
              <strong>These are example projects</strong> showing the type of solutions we create. 
              Every project is custom-built to match your specific needs and budget. 
              No project is too small — we love helping businesses grow.
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
              {cat === 'all' ? 'All Examples' : cat}
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
      <div className={styles.exampleTag}>Example</div>
      
      <div className={styles.cardHeader}>
        <span className={styles.category}>
          {project.category}
        </span>
      </div>

      <h3 className={styles.projectTitle}>
        {project.title}
      </h3>
      
      <p className={styles.client}>
        {project.client}
      </p>
      
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

      <div className={styles.viewCase}>
        <span>View Details</span>
        <span className={styles.arrow}>→</span>
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
              <div className={styles.modalBadge}>
                Example Project
              </div>
              <h2 className={styles.modalTitle}>
                {project.title}
              </h2>
              <p className={styles.modalClient}>
                {project.client}
              </p>
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
              Ready to build something for your business?
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