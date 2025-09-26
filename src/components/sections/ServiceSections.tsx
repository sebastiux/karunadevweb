import { motion } from 'framer-motion';

interface Service {
  title: string;
  description: string;
  icon: string;
  id: string;
}

const ServiceSections = () => {
  const services: Service[] = [
    {
      id: 'automation',
      title: "Automation Solutions",
      description: "Custom workflow automation solutions offered to any company architecture, from Windows Power Automate workflow automation, to SAP scripting, ServiceNow workflow development, custom scripting for any type of architecture and n8n custom workflows development.",
      icon: "⚙️"
    },
    {
      id: 'data',
      title: "Data Optimization",
      description: "Relational database management consultancy, relational database design and implementation. Business logic digitalization, generation of automated dashboards and development of critical KPIs.",
      icon: "📊"
    },
    {
      id: 'web',
      title: "Web Development",
      description: "Custom web page development and design, using high-end technology and client approval focus.",
      icon: "🌐"
    },
    {
      id: 'saas',
      title: "SAAS Development",
      description: "We develop high performance applications from scratch. Let's convert your idea into reality - if you can think it, we can make it.",
      icon: "☁️"
    },
    {
      id: 'hardware',
      title: "Hardware and IOT",
      description: "PCB design and manufacture, design of IOT applications for domotics and security systems.",
      icon: "🔌"
    }
  ];

  return (
    <>
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`min-h-screen flex items-center justify-center px-8 py-20 ${
            index % 2 === 0 ? 'bg-paper' : 'bg-white'
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center gap-12`}
            >
              {/* Icon Section */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-8xl md:text-9xl opacity-80"
              >
                {service.icon}
              </motion.div>

              {/* Content Section */}
              <div className="flex-1 text-center md:text-left">
                <motion.h2
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-4xl md:text-5xl font-zen text-ink mb-6"
                >
                  {service.title}
                </motion.h2>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '80px' }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="h-0.5 bg-ink opacity-30 mb-6 mx-auto md:mx-0"
                />

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-zen-gray text-lg leading-relaxed"
                >
                  {service.description}
                </motion.p>
              </div>
            </motion.div>
          </div>
        </section>
      ))}
    </>
  );
};

export default ServiceSections;