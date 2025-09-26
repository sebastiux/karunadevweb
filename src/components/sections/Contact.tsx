import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-8 bg-ink text-paper">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-zen mb-6">Let's Create Together</h2>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-0.5 bg-paper opacity-30 mb-8 mx-auto"
          />
          
          <p className="text-paper/80 text-lg mb-8">
            Ready to transform your ideas into reality?
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-paper text-ink rounded-full hover:bg-paper/90 transition-colors duration-300 font-zen"
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;