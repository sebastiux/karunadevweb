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
    // Enterprise Chatbots
    {
      id: 'chatbot-1',
      title: 'Customer Service AI Assistant',
      client: 'Example: Financial Services Firm',
      category: 'Enterprise Chatbots',
      description: 'Intelligent chatbot for 24/7 customer support',
      challenge: 'Company received 5,000+ daily support inquiries with 40% being repetitive questions, overwhelming the support team.',
      solution: 'Deployed a GPT-powered conversational AI integrated with their CRM and knowledge base, featuring seamless human handoff for complex issues.',
      results: [
        '70% of inquiries resolved automatically',
        'Average response time: under 10 seconds',
        'Customer satisfaction increased by 35%',
        'Support team handles 3x more complex cases'
      ],
      technologies: ['OpenAI GPT-4', 'LangChain', 'Python', 'Salesforce API']
    },
    {
      id: 'chatbot-2',
      title: 'Internal HR Virtual Assistant',
      client: 'Example: Enterprise Corporation',
      category: 'Enterprise Chatbots',
      description: 'AI assistant for employee HR queries',
      challenge: 'HR team spent 60% of time answering repetitive policy questions from 2,000+ employees.',
      solution: 'Built an internal Slack-integrated chatbot trained on company policies, benefits documentation, and HR procedures.',
      results: [
        'HR inquiry tickets reduced by 65%',
        'Instant answers to policy questions',
        'Multilingual support (EN/ES/PT)',
        'Seamless integration with HRIS system'
      ],
      technologies: ['Claude API', 'Slack API', 'RAG', 'Pinecone']
    },
    {
      id: 'chatbot-3',
      title: 'Sales Qualification Bot',
      client: 'Example: B2B SaaS Company',
      category: 'Enterprise Chatbots',
      description: 'AI-powered lead qualification and scheduling',
      challenge: 'Sales team wasted hours qualifying leads that weren\'t a good fit, reducing time for high-value prospects.',
      solution: 'Conversational AI that qualifies leads through natural dialogue, schedules demos, and syncs with CRM automatically.',
      results: [
        'Lead qualification time reduced by 80%',
        'Sales team focuses on qualified leads only',
        '45% increase in demo bookings',
        'CRM automatically enriched with lead data'
      ],
      technologies: ['GPT-4', 'HubSpot API', 'Calendly', 'Node.js']
    },

    // Document AI & RAG
    {
      id: 'rag-1',
      title: 'Legal Document Analysis Platform',
      client: 'Example: Law Firm',
      category: 'Document AI & RAG',
      description: 'AI-powered contract review and analysis',
      challenge: 'Lawyers spent 8+ hours reviewing each contract manually, looking for specific clauses and potential risks.',
      solution: 'RAG-based system that indexes contracts, identifies key clauses, flags risks, and answers questions about document content.',
      results: [
        'Contract review time reduced by 75%',
        'Risk identification accuracy: 94%',
        'Search across 10,000+ documents instantly',
        'Billable hours increased by 40%'
      ],
      technologies: ['Claude API', 'LlamaIndex', 'PostgreSQL', 'Vector DB']
    },
    {
      id: 'rag-2',
      title: 'Technical Documentation Assistant',
      client: 'Example: Software Company',
      category: 'Document AI & RAG',
      description: 'AI assistant for developer documentation',
      challenge: 'Developers wasted hours searching through 500+ pages of technical docs and couldn\'t find accurate answers quickly.',
      solution: 'Built a RAG system that indexes all documentation and provides accurate, cited answers with code examples.',
      results: [
        'Documentation queries resolved 90% faster',
        'Developer onboarding time cut in half',
        'Always up-to-date with latest docs',
        'Reduced support tickets by 55%'
      ],
      technologies: ['OpenAI Embeddings', 'Pinecone', 'Next.js', 'MDX']
    },
    {
      id: 'rag-3',
      title: 'Compliance Knowledge Base',
      client: 'Example: Healthcare Organization',
      category: 'Document AI & RAG',
      description: 'HIPAA compliance question answering system',
      challenge: 'Staff struggled to navigate complex HIPAA regulations, leading to compliance risks and delayed decisions.',
      solution: 'RAG system trained on regulatory documents that provides instant, accurate compliance guidance with source citations.',
      results: [
        'Compliance queries answered in seconds',
        'Zero compliance violations since deployment',
        'Training time reduced by 60%',
        'Audit preparation streamlined'
      ],
      technologies: ['Claude API', 'ChromaDB', 'FastAPI', 'React']
    },

    // LLM Integrations
    {
      id: 'integration-1',
      title: 'CRM Intelligence Layer',
      client: 'Example: Sales Organization',
      category: 'LLM Integrations',
      description: 'AI-enhanced CRM with smart insights',
      challenge: 'Sales reps spent more time updating CRM than selling, and valuable insights were buried in unstructured notes.',
      solution: 'LLM integration that auto-generates call summaries, extracts action items, and provides deal insights directly in Salesforce.',
      results: [
        'CRM data entry reduced by 70%',
        'Call notes generated automatically',
        'Deal risk predictions 85% accurate',
        'Pipeline visibility improved significantly'
      ],
      technologies: ['GPT-4', 'Salesforce API', 'Whisper', 'Python']
    },
    {
      id: 'integration-2',
      title: 'Email Intelligence System',
      client: 'Example: Consulting Firm',
      category: 'LLM Integrations',
      description: 'AI-powered email drafting and analysis',
      challenge: 'Consultants spent 2+ hours daily on email communication, drafting responses and summarizing long threads.',
      solution: 'Gmail/Outlook plugin that summarizes threads, drafts contextual responses, and identifies action items automatically.',
      results: [
        'Email handling time reduced by 60%',
        'Consistent professional tone across team',
        'No important emails missed',
        'Action items tracked automatically'
      ],
      technologies: ['Claude API', 'Google Workspace API', 'Chrome Extension', 'TypeScript']
    },
    {
      id: 'integration-3',
      title: 'Slack AI Copilot',
      client: 'Example: Tech Startup',
      category: 'LLM Integrations',
      description: 'AI assistant integrated into team Slack',
      challenge: 'Important decisions and context were lost in thousands of Slack messages, making knowledge sharing difficult.',
      solution: 'Slack bot that answers questions about past conversations, summarizes channels, and helps draft messages.',
      results: [
        'Find any past decision in seconds',
        'New hires onboard 50% faster',
        'Meeting prep time reduced',
        'Team knowledge preserved automatically'
      ],
      technologies: ['OpenAI API', 'Slack Bolt', 'Supabase', 'Node.js']
    },

    // AI Process Automation
    {
      id: 'automation-1',
      title: 'Invoice Processing Pipeline',
      client: 'Example: Accounts Payable Dept',
      category: 'AI Process Automation',
      description: 'Automated invoice data extraction and processing',
      challenge: 'Finance team manually processed 500+ invoices monthly, with frequent data entry errors and delays.',
      solution: 'AI pipeline that extracts data from any invoice format, validates against POs, and pushes to accounting system.',
      results: [
        'Invoice processing: 10 min to 30 seconds',
        'Data accuracy improved to 99.5%',
        'Processing capacity increased 10x',
        'Early payment discounts captured'
      ],
      technologies: ['GPT-4 Vision', 'Claude API', 'QuickBooks API', 'Python']
    },
    {
      id: 'automation-2',
      title: 'Resume Screening System',
      client: 'Example: Recruiting Agency',
      category: 'AI Process Automation',
      description: 'AI-powered candidate screening and ranking',
      challenge: 'Recruiters reviewed 200+ resumes per role manually, missing qualified candidates and wasting hours on poor fits.',
      solution: 'LLM system that screens resumes against job requirements, ranks candidates, and generates interview questions.',
      results: [
        'Resume screening time reduced by 85%',
        'Quality of hire improved by 30%',
        'Bias reduced through structured analysis',
        'Candidates matched to roles faster'
      ],
      technologies: ['Claude API', 'Python', 'PostgreSQL', 'React']
    },
    {
      id: 'automation-3',
      title: 'Report Generation Engine',
      client: 'Example: Analytics Team',
      category: 'AI Process Automation',
      description: 'Automated business report writing',
      challenge: 'Analysts spent 10+ hours weekly writing repetitive reports from the same data sources.',
      solution: 'System that pulls data from multiple sources, generates narrative insights, and produces formatted reports automatically.',
      results: [
        'Report generation: 4 hours to 5 minutes',
        'Consistent quality and formatting',
        'Analysts focus on strategic insights',
        'Reports delivered on schedule always'
      ],
      technologies: ['GPT-4', 'Python', 'Tableau API', 'Jinja2']
    },

    // Custom AI Solutions
    {
      id: 'custom-1',
      title: 'Product Recommendation Engine',
      client: 'Example: E-commerce Platform',
      category: 'Custom AI Solutions',
      description: 'LLM-powered personalized recommendations',
      challenge: 'Generic recommendations weren\'t converting; customers wanted personalized suggestions based on their unique needs.',
      solution: 'Conversational recommendation system that understands customer preferences through natural dialogue and suggests products.',
      results: [
        'Conversion rate increased by 40%',
        'Average order value up 25%',
        'Customer engagement doubled',
        'Return rate decreased by 15%'
      ],
      technologies: ['Claude API', 'Recommendation Systems', 'React', 'Redis']
    },
    {
      id: 'custom-2',
      title: 'Code Review Assistant',
      client: 'Example: Development Team',
      category: 'Custom AI Solutions',
      description: 'AI-powered code review and suggestions',
      challenge: 'Code reviews were bottlenecking development; senior developers spent 30% of time reviewing junior code.',
      solution: 'GitHub integration that provides instant code review, suggests improvements, and catches bugs before human review.',
      results: [
        'Code review cycle reduced by 60%',
        'Bug detection improved by 45%',
        'Junior developer skills improved faster',
        'Senior devs focus on architecture'
      ],
      technologies: ['GPT-4', 'GitHub API', 'AST Parsing', 'Python']
    },
    {
      id: 'custom-3',
      title: 'Meeting Intelligence Platform',
      client: 'Example: Remote-First Company',
      category: 'Custom AI Solutions',
      description: 'AI meeting transcription and insights',
      challenge: 'Important meeting decisions were lost, action items forgotten, and team members missing meetings lacked context.',
      solution: 'Platform that transcribes meetings, generates summaries, extracts action items, and makes meetings searchable.',
      results: [
        'Meeting notes generated automatically',
        'Action item completion up 70%',
        'Search any past meeting instantly',
        'Async team members stay informed'
      ],
      technologies: ['Whisper', 'Claude API', 'Supabase', 'Next.js']
    }
  ];

  const categories = ['all', 'Enterprise Chatbots', 'Document AI & RAG', 'LLM Integrations', 'AI Process Automation', 'Custom AI Solutions'];
  
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
          <h2 className={styles.title}>Corporate LLM Solutions</h2>
          <div className={styles.disclaimer}>
            <p className={styles.disclaimerText}>
              <strong>These are example projects</strong> showcasing our expertise in LLM applications and AI integrations.
              From intelligent chatbots to document processing systems, we build custom AI solutions
              that transform how enterprises operate.
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
              Ready to transform your business with AI?
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