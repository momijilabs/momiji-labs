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
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden"
      style={{ background: 'var(--color-bg-primary)' }}
    >
      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 40%, rgba(245,158,11,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">

        {/* Eyebrow tag */}
        <motion.div {...fadeUp(0)}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-amber-500/30 text-amber-400"
            style={{ background: 'rgba(245,158,11,0.07)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Independent Software Studio
          </span>
        </motion.div>

        {/* Headline */}
        {/* TODO: Replace with final Momiji Labs SVG logo above headline when branding is ready */}
        <motion.h1
          {...fadeUp(0.1)}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
        >
          Building thoughtful,{' '}
          <span className="text-amber-500">AI-powered apps</span>{' '}
          for everyday life.
        </motion.h1>

        {/* Tagline */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-lg sm:text-xl text-zinc-400 max-w-xl leading-relaxed"
        >
          Simple tools. Meaningful impact.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex flex-col sm:flex-row gap-3 mt-2"
        >
          <button
            onClick={scrollToProducts}
            className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold transition-colors text-sm cursor-pointer"
          >
            Explore Our Products
          </button>
          <button
            onClick={scrollToContact}
            className="px-6 py-3 rounded-lg border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-medium transition-colors text-sm cursor-pointer bg-transparent"
          >
            Get In Touch
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        aria-hidden="true"
      >
        <span className="text-xs text-zinc-600">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          className="w-px h-6 bg-gradient-to-b from-zinc-600 to-transparent"
        />
      </motion.div>
    </section>
  )
}
