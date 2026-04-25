import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut', delay },
})

export default function Hero() {
  const scrollToProducts = () => {
    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 overflow-hidden"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      {/* Ambient glow — using brand amber #D97706 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 90% 60% at 50% 45%, rgba(217,119,6,0.09) 0%, transparent 65%)',
        }}
      />

      {/* Subtle grid overlay — 48px per brand spec */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-7">

        {/* Eyebrow tag */}
        <motion.div {...fadeUp(0)}>
          <span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border border-amber-600/25 text-amber-600 tracking-wide uppercase"
            style={{ background: 'rgba(217,119,6,0.07)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
            Independent Software Studio · Made in Canada
          </span>
        </motion.div>

        {/* Headline — Space Grotesk 600, per brand Typography artboard */}
        <motion.h1
          {...fadeUp(0.1)}
          className="text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.07]"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
        >
          Building thoughtful,{' '}
          <span
            className="text-amber-600"
            style={{ textShadow: '0 0 40px rgba(217,119,6,0.3)' }}
          >
            AI-powered
          </span>
          {' '}apps for everyday life.
        </motion.h1>

        {/* Subheadline — Geist body font */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-lg sm:text-xl text-zinc-400 max-w-2xl leading-relaxed"
        >
          Simple tools. Meaningful impact. We build software that solves real problems —
          for parents, landlords, commuters, and you.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex flex-col sm:flex-row gap-3 mt-1"
        >
          <button
            onClick={scrollToProducts}
            className="px-7 py-3.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-zinc-950 font-semibold transition-colors text-sm cursor-pointer tracking-wide"
          >
            Explore Our Products
          </button>
          <button
            onClick={scrollToContact}
            className="px-7 py-3.5 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold transition-colors text-sm cursor-pointer bg-transparent"
          >
            Get In Touch
          </button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-zinc-500 text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.svg
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          width="24" height="24" viewBox="0 0 24 24" fill="none"
          className="text-zinc-400"
        >
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </motion.div>
    </section>
  )
}
