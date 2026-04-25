import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

          {/* Logo */}
          {/* TODO: Replace with final Momiji Labs SVG logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center gap-2 group"
            aria-label="Momiji Labs — home"
          >
            <span
              className="flex items-center justify-center w-10 h-10 rounded-md text-amber-500 font-bold text-base tracking-tight border border-amber-500/30 group-hover:border-amber-500/70 transition-colors"
              style={{ background: 'rgba(245,158,11,0.1)' }}
            >
              ML
            </span>
            <span className={`font-semibold text-lg tracking-tight transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              Momiji <span className="text-amber-500">Labs</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-sm font-medium transition-colors duration-300 cursor-pointer bg-transparent border-none p-0 ${
                  scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-zinc-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://momijilabs-aichitect.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-1.5 rounded-md bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold transition-colors"
            >
              Try AIchitect
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden flex flex-col gap-1.5 p-2 rounded-md transition-colors ${
              scrolled ? 'hover:bg-gray-100' : 'hover:bg-white/10'
            }`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`block h-0.5 w-5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''} ${scrolled ? 'bg-gray-800' : 'bg-white'}`} />
            <span className={`block h-0.5 w-5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''} ${scrolled ? 'bg-gray-800' : 'bg-white'}`} />
            <span className={`block h-0.5 w-5 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''} ${scrolled ? 'bg-gray-800' : 'bg-white'}`} />
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
              scrolled ? 'bg-white/95 border-gray-200' : 'bg-zinc-950/95 border-zinc-800'
            }`}
          >
            <nav className="flex flex-col px-4 py-4 gap-4" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-left text-base transition-colors cursor-pointer bg-transparent border-none p-0 font-medium ${
                    scrolled ? 'text-gray-700 hover:text-gray-900' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <a
                href="https://momijilabs-aichitect.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-sm px-4 py-2 rounded-md bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold transition-colors w-fit"
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
