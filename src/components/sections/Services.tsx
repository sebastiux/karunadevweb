import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';

// Define interface locally
interface Service {
  title: string;
  description: string;
  icon: string;
}

interface ServicesProps {
  services: Service[];
}

const Services = ({ services }: ServicesProps) => {
  return (
    <section className="py-20 px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-zen text-ink mb-4">Our Services</h2>
        <p className="text-zen-gray text-lg">Excellence through simplicity</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Services;