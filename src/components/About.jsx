import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const VALUES = [
  {
    title: 'Real Problems',
    description: 'Every product we build is grounded in a genuine pain point — parenting, housing, health, and everyday productivity.',
  },
  {
    title: 'Simple by Design',
    description: 'We believe the best tools disappear into the workflow. If it takes explaining, it needs more work.',
  },
  {
    title: 'AI with Purpose',
    description: 'We use AI where it genuinely improves the experience — not as a feature, but as the engine under the hood.',
  },
]

function ValueCard({ title, description, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors"
      style={{ background: 'var(--color-bg-card)' }}
    >
      <div className="w-2 h-2 rounded-full bg-amber-500 mb-4" />
      <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      className="py-24 px-4"
      style={{ background: 'var(--color-bg-secondary)' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl mb-14"
        >
          <span className="text-amber-500 text-sm font-medium uppercase tracking-widest mb-3 block">
            About
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
            We build apps people actually use.
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            Momiji Labs is an independent software studio based in Vaughan, Ontario. We build
            AI-powered mobile and web applications focused on real problems — parenting, housing,
            health, and everyday productivity. Every product is built to be simple enough to
            actually use, and powerful enough to make a difference.
          </p>
        </motion.div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {VALUES.map((v, i) => (
            <ValueCard key={v.title} {...v} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
