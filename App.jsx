import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Footer from './components/Footer.jsx'
import About from './sections/About.jsx'
import Research from './sections/Research.jsx'
import { FeaturedAward, default as Awards } from './sections/Awards.jsx'
import Presentations from './sections/Presentations.jsx'
import Events from './sections/Events.jsx'
import Education from './sections/Education.jsx'
import Interests from './sections/Interests.jsx'
import Contact from './sections/Contact.jsx'
import './App.css'
import Achievements from './sections/Achievements.jsx'

const navigationItems = [
  { id: 'about', label: 'About' },
  { id: 'research', label: 'Research' },
  { id: 'presentations', label: 'Presentations' },
  { id: 'events', label: 'Events' },
  { id: 'awards', label: 'Awards' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

function App() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element))

    const sectionObserver = new IntersectionObserver((entries) => {
      const visibleSection = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0]
      if (visibleSection) setActiveSection(visibleSection.target.id)
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.15, 0.35] })
    navigationItems.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) sectionObserver.observe(section)
    })

    return () => {
      revealObserver.disconnect()
      sectionObserver.disconnect()
    }
  }, [])

  return (
    <>
      <Navbar items={navigationItems} activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Research />
        <FeaturedAward />
        <Presentations />
        <Events />
        <Awards />
        <Achievements />
        <Education />
        <Interests />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
