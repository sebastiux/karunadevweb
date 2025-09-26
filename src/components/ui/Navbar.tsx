import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KarunaLogo } from '../../assets';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
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
    setShowServicesMenu(false);
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
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/72 backdrop-blur-xl' 
            : 'bg-white/60 backdrop-blur-xl'
        }`}
        style={{
          borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.08)' : 'none'
        }}
      >
        <div className="max-w-[980px] mx-auto">
          <div className="flex items-center justify-between px-4 h-11">
            {/* Logo - Left Side */}
            <div className="flex items-center">
              <button
                onClick={() => scrollToSection('hero')}
                className="flex items-center -ml-2 p-2"
              >
                <img 
                  src={KarunaLogo} 
                  alt="Karuna" 
                  className="h-5 w-auto"
                  style={{ maxHeight: '20px', objectFit: 'contain' }}
                />
              </button>
            </div>

            {/* Center Navigation - Desktop */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-7">
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-xs font-normal text-gray-800/80 hover:text-gray-900 transition-colors"
                  style={{ fontSize: '12px', letterSpacing: '-0.01em' }}
                >
                  About
                </button>

                <div 
                  className="relative"
                  onMouseEnter={() => setShowServicesMenu(true)}
                  onMouseLeave={() => setShowServicesMenu(false)}
                >
                  <button
                    onClick={() => scrollToSection('services')}
                    className="text-xs font-normal text-gray-800/80 hover:text-gray-900 transition-colors"
                    style={{ fontSize: '12px', letterSpacing: '-0.01em' }}
                  >
                    Services
                  </button>
                  
                  {/* Services Dropdown */}
                  <AnimatePresence>
                    {showServicesMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 pt-3"
                      >
                        <div className="bg-white rounded-xl shadow-xl py-3 min-w-[200px]"
                             style={{ 
                               boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                               border: '1px solid rgba(0,0,0,0.04)'
                             }}>
                          {services.map((service) => (
                            <button
                              key={service.id}
                              onClick={() => scrollToSection(service.id)}
                              className="block w-full text-left px-5 py-2 text-xs text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
                              style={{ fontSize: '12px' }}
                            >
                              {service.name}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => scrollToSection('work')}
                  className="text-xs font-normal text-gray-800/80 hover:text-gray-900 transition-colors"
                  style={{ fontSize: '12px', letterSpacing: '-0.01em' }}
                >
                  Work
                </button>

                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-xs font-normal text-gray-800/80 hover:text-gray-900 transition-colors"
                  style={{ fontSize: '12px', letterSpacing: '-0.01em' }}
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Right Side - Get Started Button */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={() => scrollToSection('contact')}
                className="text-xs bg-black text-white px-4 py-1.5 rounded-full hover:bg-gray-800 transition-colors"
                style={{ fontSize: '12px', letterSpacing: '-0.01em' }}
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 -mr-2"
              >
                <div className="space-y-1.5">
                  <motion.div
                    animate={{
                      rotate: isMobileMenuOpen ? 45 : 0,
                      y: isMobileMenuOpen ? 6 : 0
                    }}
                    className="w-5 h-0.5 bg-gray-800"
                  />
                  <motion.div
                    animate={{
                      opacity: isMobileMenuOpen ? 0 : 1
                    }}
                    className="w-5 h-0.5 bg-gray-800"
                  />
                  <motion.div
                    animate={{
                      rotate: isMobileMenuOpen ? -45 : 0,
                      y: isMobileMenuOpen ? -6 : 0
                    }}
                    className="w-5 h-0.5 bg-gray-800"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="lg:hidden fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 shadow-2xl"
            >
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="px-8 pb-8">
                <div className="space-y-4">
                  <button
                    onClick={() => scrollToSection('about')}
                    className="block text-2xl font-light text-gray-900"
                  >
                    About
                  </button>
                  
                  <div>
                    <button
                      onClick={() => scrollToSection('services')}
                      className="block text-2xl font-light text-gray-900 mb-3"
                    >
                      Services
                    </button>
                    <div className="pl-4 space-y-2">
                      {services.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => scrollToSection(service.id)}
                          className="block text-base text-gray-600"
                        >
                          {service.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => scrollToSection('work')}
                    className="block text-2xl font-light text-gray-900"
                  >
                    Work
                  </button>
                  
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="block text-2xl font-light text-gray-900"
                  >
                    Contact
                  </button>
                  
                  <div className="pt-8">
                    <button
                      onClick={() => scrollToSection('contact')}
                      className="w-full bg-black text-white py-3 rounded-full text-sm"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;