import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section 
      id="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen flex flex-col items-center justify-center px-8 relative overflow-hidden pt-16" // Added pt-16 for navbar space
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white" />
      
      {/* Zen ink effect - more subtle */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 opacity-[0.02]">
        <div className="bg-black rounded-full w-full h-full blur-3xl"></div>
      </div>
      
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-center z-10 relative"
      >
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-gray-900 mb-6 tracking-tight">
          Karuna
        </h1>
        
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-12">
          Transforming ideas into elegant digital solutions with the precision of a master craftsman
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToServices}
          className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-200 font-medium text-sm"
        >
          Explore Services
        </motion.button>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 cursor-pointer"
        onClick={scrollToServices}
      >
        <div className="animate-bounce">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.button>
    </motion.section>
  );
};

export default Hero;