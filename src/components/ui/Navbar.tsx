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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const services = [
    { name: 'Automation Solutions', id: 'automation' },
    { name: 'Data Optimization', id: 'data' },
    { name: 'Web Development', id: 'web' },
    { name: 'SAAS Development', id: 'saas' },
    { name: 'Hardware & IOT', id: 'hardware' },
  ];

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
                {services.map((service) => (
                  <button
                    key={service.id}
                    className={styles.dropdownItem}
                    onClick={() => scrollToSection(service.id)}
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
              Work
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
            onClick={() => scrollToSection('contact')}
          >
            Get Started
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
              {services.map((service) => (
                <button
                  key={service.id}
                  className={styles.mobileServiceLink}
                  onClick={() => scrollToSection(service.id)}
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
            Work
          </button>

          <button 
            className={styles.mobileNavLink}
            onClick={() => scrollToSection('contact')}
          >
            Contact
          </button>

          <button 
            className={styles.mobileCTA}
            onClick={() => scrollToSection('contact')}
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;