import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/ui/Navbar'
import About from './components/sections/About'
import InkDivider from './components/ui/EnsoPhilosophy'
import ProjectCases from './components/sections/ProjectCases'
import Contact from './components/sections/Contact'
import AIChatbot from './components/ui/AIChatbot'
import PresentationDeck from './pages/PresentationDeck'

function HomePage() {
  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <InkDivider />
      <About />
      <ProjectCases />
      <Contact />
      <AIChatbot />
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/presentationdeck" element={<PresentationDeck />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
