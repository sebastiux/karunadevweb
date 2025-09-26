import { motion } from 'framer-motion';

// Define the interface directly in this file to avoid import issues
interface Service {
  title: string;
  description: string;
  icon: string;
}

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-paper p-8 rounded-lg zen-shadow hover:shadow-lg transition-shadow duration-300 border border-ink/5"
    >
      <div className="text-4xl mb-4 opacity-80">{service.icon}</div>
      
      <h3 className="text-2xl font-zen text-ink mb-4 border-b border-ink/10 pb-2">
        {service.title}
      </h3>
      
      <p className="text-zen-gray leading-relaxed text-sm">
        {service.description}
      </p>
      
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '40px' }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="h-0.5 bg-ink opacity-20 mt-6"
      />
    </motion.div>
  );
};

export default ServiceCard;