import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-zen text-ink mb-6">About Karuna</h2>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-0.5 bg-ink opacity-30 mb-8 mx-auto"
          />
          
          <p className="text-zen-gray text-lg leading-relaxed mb-6">
            At Karuna, we blend cutting-edge technology with timeless craftsmanship. 
            Our team of experts specializes in creating elegant solutions that transform 
            your business challenges into opportunities for growth.
          </p>
          
          <p className="text-zen-gray text-lg leading-relaxed">
            With a focus on simplicity, efficiency, and excellence, we deliver 
            technology solutions that not only meet your needs but exceed your expectations.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;