// src/components/ui/Navbar.tsx
import { useState, useEffect } from 'react';
import { KarunaLogo } from '../../assets';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string, filter?: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });

      // If there's a filter, dispatch a custom event after scrolling
      if (filter) {
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('filterProjects', { detail: filter }));
        }, 800); // Delay to ensure scroll completes
      }
    }
    setIsMobileMenuOpen(false);
  };

  const serviceFilters = [
    { name: t('nav.allProjects'), id: 'work', filter: 'all' },
    { name: t('nav.aiEducation'), id: 'work', filter: 'AI Education Platform' },
    { name: t('nav.chatbotAutomation'), id: 'work', filter: 'Chatbot Automation' },
  ];

  const openWhatsApp = () => {
    const whatsappNumber = '527202533388';
    const message = encodeURIComponent(language === 'en' ? 'Hi Karuna! I would like to discuss a project' : '¡Hola Karuna! Me gustaría hablar sobre un proyecto');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <>
      <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContainer}>
          {/* Logo */}
          <div className={styles.logoWrapper}>
            <img 
              src={KarunaLogo} 
              alt="Karuna" 
              className={styles.logo}
              onClick={() => scrollToSection('hero')}
            />
          </div>

          {/* Desktop Navigation */}
          <div className={styles.navLinks}>
            <button
              className={styles.navLink}
              onClick={() => scrollToSection('about')}
            >
              {t('nav.about')}
            </button>

            <div className={styles.servicesDropdown}>
              <button
                className={`${styles.navLink} ${styles.servicesButton}`}
                onClick={() => scrollToSection('services')}
              >
                {t('nav.services')}
              </button>
              <div className={styles.dropdownMenu}>
                {serviceFilters.map((service) => (
                  <button
                    key={service.filter}
                    className={styles.dropdownItem}
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollToSection(service.id, service.filter);
                    }}
                  >
                    {service.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              className={styles.navLink}
              onClick={() => scrollToSection('work')}
            >
              {t('nav.projects')}
            </button>

            <button
              className={styles.navLink}
              onClick={() => scrollToSection('contact')}
            >
              {t('nav.contact')}
            </button>
          </div>

          {/* Right side actions */}
          <div className={styles.rightActions}>
            {/* Language Switcher */}
            <button
              className={styles.langSwitch}
              onClick={toggleLanguage}
              aria-label="Switch language"
            >
              {language === 'en' ? 'ES' : 'EN'}
            </button>

            {/* CTA Button */}
            <button
              className={styles.ctaButton}
              onClick={openWhatsApp}
            >
              {t('nav.whatsapp')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className={styles.hamburger}>
              <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.active : ''}`} />
              <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.active : ''}`} />
              <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.active : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.active : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.active : ''}`}>
        <div className={styles.mobileMenuContent}>
          <button
            className={styles.mobileNavLink}
            onClick={() => scrollToSection('about')}
          >
            {t('nav.about')}
          </button>

          <div>
            <button
              className={styles.mobileNavLink}
              onClick={() => scrollToSection('services')}
            >
              {t('nav.services')}
            </button>
            <div className={styles.mobileServices}>
              {serviceFilters.map((service) => (
                <button
                  key={service.filter}
                  className={styles.mobileServiceLink}
                  onClick={() => scrollToSection(service.id, service.filter)}
                >
                  {service.name}
                </button>
              ))}
            </div>
          </div>

          <button
            className={styles.mobileNavLink}
            onClick={() => scrollToSection('work')}
          >
            {t('nav.projects')}
          </button>

          <button
            className={styles.mobileNavLink}
            onClick={() => scrollToSection('contact')}
          >
            {t('nav.contact')}
          </button>

          <button
            className={styles.mobileLangSwitch}
            onClick={toggleLanguage}
          >
            {language === 'en' ? '🌐 Español' : '🌐 English'}
          </button>

          <button
            className={styles.mobileCTA}
            onClick={openWhatsApp}
          >
            WhatsApp: +52 720 253 3388
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;