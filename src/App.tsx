import Navbar from './components/ui/Navbar'
import About from './components/sections/About'
import InkDivider from './components/ui/EnsoPhilosophy'
import ProjectCases from './components/sections/ProjectCases'
import Contact from './components/sections/Contact'

function App() {
  

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <InkDivider />
      <About />
      <ProjectCases />
      <Contact />
    </div>
  )
}

export default App