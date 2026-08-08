import { useEffect, useState } from 'react'
import data from './data.json'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Achievements from './components/Achievements'
import Header from './components/Header'
import './App.css'

export default function App() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'achievements', 'skills', 'projects', 'experience', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />
      
      <main>
        <section id="home" className="pt-20 pb-40">
          <div className="px-4 sm:px-6 lg:px-8 print:px-0">
            <div className="text-center py-20">
              <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-4">
                Senior Software Engineer
              </h1>
              <p className="text-2xl text-slate-600 mb-8">
                Platform Engineering • Security Integrations • Automation
              </p>
              <p className="text-lg text-slate-700 max-w-3xl mx-auto mb-8">
                I design and build secure platform systems, IAM workflows, DevOps automation modules, and enterprise identity integrations. Currently working at Securden, building SSPR platforms, secure credential automation pipelines, and cloud-based security integrations.
              </p>
              <p className="text-xl font-semibold text-sky-600">
                Secure • Integrate • Automate • Scale
              </p>
              <div className="flex justify-center gap-8 mt-12 text-lg">
                <button 
                  onClick={() => scrollToSection('experience')}
                  className="text-sky-600 hover:text-sky-700 font-semibold"
                >
                  Work Experience
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-sky-600 hover:text-sky-700 font-semibold"
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </section>

        <About data={data.about} />
        <Achievements data={data.about.highlights} />
        <Skills data={data.skills} />
        <Projects data={data.projects} />
        <Experience data={data.experience} />
        <Contact data={data.contact} />
      </main>

      <footer className="bg-slate-900 text-slate-300 py-8 text-center">
        <p>© 2026 Abishek VP. Built with Vue.js & precision engineering.</p>
      </footer>
    </div>
  )
}
