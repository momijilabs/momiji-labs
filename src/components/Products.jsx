import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

// Only show active products — Coming Soon cards are intentionally excluded
// to avoid hinting at upcoming products to competitors.
const PRODUCTS = [
  {
    name: 'AIchitect',
    emoji: '🏗️',
    category: 'Developer Tools',
    tagline: 'AI-powered system design advisor for developers and interview prep.',
    status: 'live',
    url: 'https://momijilabs-aichitect.vercel.app/',
    description:
      'Take a product description and scale requirements, then get a structured system design — architecture, technology choices, database recommendations, and scaling strategies in seconds.',
    tech: ['React', 'FastAPI', 'Claude API'],
  },
  {
    name: 'MomijiCare',
    emoji: '🍼',
    category: 'Parenting',
    tagline: 'All-in-one AI assistant for parents of infants and young children.',
    status: 'in-development',
    url: null,
    description:
      'Routine logging, doctor visit tracking, appointment reminders, AI-suggested shopping lists by developmental stage, and multi-caregiver shared accounts — all in one place.',
    tech: ['React PWA', 'FastAPI', 'Claude API'],
  },
]

const STATUS_CONFIG = {
  live: {
    label: 'Live',
    className: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    dot: 'bg-emerald-500',
    pulse: true,
  },
  'in-development': {
    label: 'In Development',
    className: 'bg-amber-50 text-amber-700 border border-amber-200',
    dot: 'bg-amber-600',
    pulse: true,
  },
}

function ProductCard({ product, index }) {
  const status = STATUS_CONFIG[product.status]

  return (
    // whileInView is used here (instead of useInView + animate) to avoid
    // a Framer Motion timing bug where opacity animates before y-transform.
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
      className="group relative flex flex-col rounded-2xl border bg-white hover:shadow-lg transition-shadow duration-300 overflow-hidden"
      style={{ borderColor: 'var(--color-border-light)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
    >
      {/* Top amber accent bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className="flex flex-col flex-1 p-7">

        {/* Icon + category row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="text-2xl leading-none">{product.emoji}</span>
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--color-text-dark-muted)' }}
            >
              {product.category}
            </span>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 ${status.className}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot} ${status.pulse ? 'animate-pulse' : ''}`} />
            {status.label}
          </span>
        </div>

        {/* Product name */}
        <h3 className="font-bold text-xl mb-2 leading-tight" style={{ color: 'var(--color-text-dark)' }}>
          {product.name}
        </h3>

        {/* Tagline */}
        <p className="text-sm font-medium mb-3 leading-snug" style={{ color: 'var(--color-text-dark-secondary)' }}>
          {product.tagline}
        </p>

        {/* Description */}
        <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: 'var(--color-text-dark-muted)' }}>
          {product.description}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {product.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md text-xs font-medium border"
              style={{
                background: 'var(--color-bg-light-alt)',
                color: 'var(--color-text-dark-secondary)',
                borderColor: 'var(--color-border-light)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t mb-5" style={{ borderColor: 'var(--color-border-light)' }} />

        {/* CTA */}
        {product.url ? (
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-600 transition-colors group/link"
          >
            Launch App
            <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
        ) : (
          <span className="text-sm font-medium" style={{ color: 'var(--color-text-dark-muted)' }}>
            Launching soon
          </span>
        )}
      </div>
    </motion.article>
  )
}

export default function Products() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="products"
      className="py-28 px-4"
      style={{ background: 'var(--color-bg-light-alt)' }}
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
          <span className="text-amber-600 text-sm font-semibold uppercase tracking-widest mb-5 block">
            Products
          </span>
          <h2
            className="text-4xl sm:text-5xl font-semibold leading-tight mb-5"
            style={{ color: 'var(--color-text-dark)' }}
          >
            Tools for the moments that matter.
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-dark-secondary)' }}>
            Each Momiji Labs product tackles a specific, underserved problem. We build for depth
            over breadth — one well-crafted tool at a time.
          </p>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </div>

        {/* More coming teaser */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="rounded-2xl border border-dashed flex flex-col sm:flex-row items-center justify-between gap-4 px-8 py-6"
          style={{ borderColor: 'var(--color-border-light-strong)', background: 'var(--color-bg-light)' }}
        >
          <div>
            <p className="font-semibold text-base mb-1" style={{ color: 'var(--color-text-dark)' }}>
              More products in development
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-dark-muted)' }}>
              We're building more tools across health, housing, and everyday life. Stay tuned.
            </p>
          </div>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="whitespace-nowrap text-sm font-semibold text-amber-600 hover:text-amber-600 transition-colors cursor-pointer flex-shrink-0"
          >
            Get notified →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
