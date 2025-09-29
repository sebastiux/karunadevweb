// src/components/ui/Navbar.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KarunaLogo } from '../../assets';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { name: 'All Projects', id: 'work', filter: 'all' },
    { name: 'Automation Solutions', id: 'work', filter: 'Automation' },
    { name: 'Data Optimization', id: 'work', filter: 'Data Optimization' },
    { name: 'Web Development', id: 'work', filter: 'Web Development' },
    { name: 'SAAS Development', id: 'work', filter: 'SAAS Development' },
    { name: 'Hardware & IOT', id: 'work', filter: 'Hardware & IoT' },
  ];

  const openWhatsApp = () => {
    const whatsappNumber = '527202533388';
    const message = encodeURIComponent('Hi Karuna! I would like to discuss a project');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
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
              About
            </button>

            <div className={styles.servicesDropdown}>
              <button 
                className={`${styles.navLink} ${styles.servicesButton}`}
                onClick={() => scrollToSection('services')}
              >
                Services
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
              Projects
            </button>

            <button 
              className={styles.navLink}
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </button>
          </div>

          {/* CTA Button */}
          <button 
            className={styles.ctaButton}
            onClick={openWhatsApp}
          >
            WhatsApp Us
          </button>

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
            About
          </button>

          <div>
            <button 
              className={styles.mobileNavLink}
              onClick={() => scrollToSection('services')}
            >
              Services
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
            Projects
          </button>

          <button 
            className={styles.mobileNavLink}
            onClick={() => scrollToSection('contact')}
          >
            Contact
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