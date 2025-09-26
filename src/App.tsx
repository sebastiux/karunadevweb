import Navbar from './components/ui/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import InkDivider from './components/ui/InkDivider'
import Services from './components/sections/Services'
import ServiceSections from './components/sections/ServiceSections'
import Contact from './components/sections/Contact'

interface Service {
  title: string;
  description: string;
  icon: string;
}

function App() {
  const services: Service[] = [
    {
      title: "Automation Solutions",
      description: "Custom workflow automation solutions for any company architecture.",
      icon: "⚙️"
    },
    {
      title: "Data Optimization",
      description: "Database management consultancy and business logic digitalization.",
      icon: "📊"
    },
    {
      title: "Web Development",
      description: "Custom web page development with high-end technology.",
      icon: "🌐"
    },
    {
      title: "SAAS Development",
      description: "High performance applications from scratch.",
      icon: "☁️"
    },
    {
      title: "Hardware and IOT",
      description: "PCB design and IOT applications for domotics and security.",
      icon: "🔌"
    }
  ]

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <Hero />
      <InkDivider />
      <About />
      <InkDivider />
      <section id="services">
        <Services services={services} />
      </section>
      <InkDivider />
      <ServiceSections />
      <InkDivider />
      <Contact />
    </div>
  )
}

export default App