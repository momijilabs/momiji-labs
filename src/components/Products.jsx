import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const PRODUCTS = [
  {
    name: 'AIchitect',
    tagline: 'AI-powered system design advisor for developers and interview prep.',
    status: 'live',
    url: 'https://momijilabs-aichitect.vercel.app/',
    description:
      'Take a product description and scale requirements, then get a structured system design — architecture, technology choices, database recommendations, and scaling strategies in seconds.',
    tech: ['React', 'FastAPI', 'Claude API'],
  },
  {
    name: 'MomijiCare',
    tagline: 'All-in-one AI assistant for parents of infants and young children.',
    status: 'in-development',
    url: null,
    description:
      'Routine logging, doctor visit tracking, appointment reminders, AI-suggested shopping lists by developmental stage, and multi-caregiver shared accounts — all in one place.',
    tech: ['React PWA', 'FastAPI', 'Claude API'],
  },
  {
    name: 'MomijiNest',
    tagline: 'Smart property management platform for small landlords.',
    status: 'coming-soon',
    url: null,
    description:
      'Lease management, automated rent receipt generation, maintenance requests, and an Ontario RTA legal information hub — purpose-built for Canadian small landlords.',
    tech: ['React PWA', 'FastAPI', 'PostgreSQL'],
  },
  {
    name: 'MomijiBrief',
    tagline: 'Voice-first AI news assistant for your daily commute.',
    status: 'coming-soon',
    url: null,
    description:
      'Headline, summary, deep dive — entirely hands-free. Navigate the news by voice while commuting, getting ready, or driving. AI personalises coverage as you listen.',
    tech: ['React PWA', 'FastAPI', 'ElevenLabs'],
  },
]

const STATUS_CONFIG = {
  live: {
    label: 'Live',
    className: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
    dot: 'bg-emerald-500',
    pulse: true,
  },
  'in-development': {
    label: 'In Development',
    className: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
    dot: 'bg-amber-500',
    pulse: true,
  },
  'coming-soon': {
    label: 'Coming Soon',
    className: 'bg-zinc-700/40 text-zinc-400 border border-zinc-700',
    dot: 'bg-zinc-500',
    pulse: false,
  },
}

function ProductCard({ product, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const status = STATUS_CONFIG[product.status]

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="group relative flex flex-col rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300 overflow-hidden"
      style={{ background: 'var(--color-bg-card)' }}
    >
      {/* Hover gradient top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/40 transition-all duration-500" />

      <div className="flex flex-col flex-1 p-6">

        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="text-white font-bold text-lg leading-tight">{product.name}</h3>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${status.className}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot} ${status.pulse ? 'animate-pulse' : ''}`} />
            {status.label}
          </span>
        </div>

        {/* Tagline */}
        <p className="text-zinc-300 text-sm font-medium mb-3 leading-snug">{product.tagline}</p>

        {/* Description */}
        <p className="text-zinc-500 text-sm leading-relaxed flex-1 mb-5">{product.description}</p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {product.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded text-xs text-zinc-500 border border-zinc-800"
              style={{ background: 'rgba(39,39,42,0.6)' }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        {product.url ? (
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-500 hover:text-amber-400 transition-colors group/link"
          >
            Launch App
            <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
        ) : (
          <span className="text-sm text-zinc-600 cursor-default">
            {product.status === 'in-development' ? 'Launching soon' : 'In the pipeline'}
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
      className="py-24 px-4"
      style={{ background: 'var(--color-bg-primary)' }}
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
            Products
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
            Tools for the moments that matter.
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            Each Momiji Labs product tackles a specific, underserved problem. We build for depth
            over breadth — one well-crafted tool at a time.
          </p>
        </motion.div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
