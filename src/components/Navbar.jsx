import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MomijiLogo from './MomijiLogo'
import { theme } from '../theme'

// When the hero is light, the navbar uses dark colours even before scrolling
const heroIsDark = theme.heroIsDark

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo — "momiji. LABS" wordmark */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center"
            aria-label="Momiji Labs — home"
          >
            <MomijiLogo
              size={38}
              color={scrolled || !heroIsDark ? '#09090B' : '#FAFAFA'}
              accent={theme.accent}
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-sm font-medium transition-colors duration-300 cursor-pointer bg-transparent border-none p-0 ${
                  scrolled || !heroIsDark ? 'text-gray-600 hover:text-gray-900' : 'text-zinc-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://momijilabs-aichitect.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="accent-bg text-sm px-4 py-1.5 rounded-md font-semibold"
              style={{ color: theme.btnText }}
            >
              Try AIchitect
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden flex flex-col gap-1.5 p-2 rounded-md transition-colors ${
              scrolled || !heroIsDark ? 'hover:bg-gray-100' : 'hover:bg-white/10'
            }`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`block h-0.5 w-5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''} ${scrolled || !heroIsDark ? 'bg-gray-800' : 'bg-white'}`} />
            <span className={`block h-0.5 w-5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''} ${scrolled || !heroIsDark ? 'bg-gray-800' : 'bg-white'}`} />
            <span className={`block h-0.5 w-5 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''} ${scrolled || !heroIsDark ? 'bg-gray-800' : 'bg-white'}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden backdrop-blur-md border-b overflow-hidden ${
              scrolled || !heroIsDark ? 'bg-white/95 border-gray-200' : 'bg-zinc-950/95 border-zinc-800'
            }`}
          >
            <nav className="flex flex-col px-4 py-4 gap-4" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-left text-base transition-colors cursor-pointer bg-transparent border-none p-0 font-medium ${
                    scrolled || !heroIsDark ? 'text-gray-700 hover:text-gray-900' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <a
                href="https://momijilabs-aichitect.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-sm px-4 py-2 rounded-md accent-bg font-semibold w-fit"
                style={{ color: theme.btnText }}
              >
                Try AIchitect
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
