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
      className="p-6 rounded-xl border bg-white hover:shadow-md transition-shadow duration-300"
      style={{ borderColor: 'var(--color-border-light)' }}
    >
      <div className="w-2 h-2 rounded-full bg-amber-600 mb-4" />
      <h3 className="font-semibold text-base mb-2" style={{ color: 'var(--color-text-dark)' }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-dark-secondary)' }}>
        {description}
      </p>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      className="py-28 px-4"
      style={{ background: 'var(--color-bg-light)' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Mission statement */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-4xl mb-8"
        >
          <span className="text-amber-600 text-xs font-semibold uppercase tracking-widest mb-5 block">
            About
          </span>
          <h2
            className="text-4xl sm:text-5xl font-semibold leading-tight mb-6"
            style={{ color: 'var(--color-text-dark)' }}
          >
            We build apps people{' '}
            <span className="text-amber-600">actually use.</span>
          </h2>
          <p
            className="text-lg leading-relaxed max-w-2xl"
            style={{ color: 'var(--color-text-dark-secondary)' }}
          >
            Momiji Labs is an independent software studio based in Vaughan, Ontario. We build
            AI-powered mobile and web applications focused on real problems — parenting, housing,
            health, and everyday productivity. Every product is built to be simple enough to
            actually use, and powerful enough to make a difference.
          </p>
        </motion.div>

        {/* Divider */}
        <div className="w-12 h-1 bg-amber-600 rounded-full mb-14" />

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
