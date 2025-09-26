import { motion } from 'framer-motion';

const InkDivider = () => {
  return (
    <div className="relative py-12">
      <motion.svg
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="w-full h-24"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,50 Q300,20 600,50 T1200,50"
          stroke="#1a1a1a"
          strokeWidth="0.5"
          fill="none"
          opacity="0.3"
        />
        <motion.circle
          initial={{ r: 0 }}
          whileInView={{ r: 3 }}
          transition={{ delay: 1, duration: 0.5 }}
          cx="600"
          cy="50"
          fill="#1a1a1a"
          opacity="0.4"
        />
      </motion.svg>
    </div>
  );
};

export default InkDivider;