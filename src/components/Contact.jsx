import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'

// EmailJS config — reuses the same account as Portfolio (service_upfitet)
// TODO: Create a new template 'template_momijilabs_contact' in EmailJS dashboard
//       Template variables: {{name}}, {{email}}, {{company}}, {{message}}
const EMAILJS_SERVICE_ID = 'service_upfitet'
const EMAILJS_TEMPLATE_ID = 'template_ku5fh4u' // TODO: create this template
const EMAILJS_PUBLIC_KEY = 'OptqGe4o466t2ZZKx' // TODO: replace with your EmailJS public key

const BUSINESS_EMAIL = 'hello@momijilabs.com' // TODO: set up Zoho Mail when domain is ready; for now this is a placeholder

export default function Contact() {
  const ref = useRef(null)
  const formRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          company: form.company || '(not provided)',
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY,
      )
      setStatus('success')
      setForm({ name: '', email: '', company: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-lg border border-zinc-800 bg-zinc-900 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-colors'

  return (
    <section
      id="contact"
      className="py-24 px-4"
      style={{ background: 'var(--color-bg-secondary)' }}
    >
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — copy */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="text-amber-500 text-sm font-medium uppercase tracking-widest mb-3 block">
              Contact
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
              Let's build something meaningful.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed mb-8">
              Whether you're interested in a partnership, a product feature request, or just want
              to say hello — we'd love to hear from you.
            </p>

            {/* Direct email fallback */}
            <a
              href={`mailto:${BUSINESS_EMAIL}`}
              className="inline-flex items-center gap-3 group"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-lg border border-zinc-700 group-hover:border-amber-500/40 transition-colors"
                style={{ background: 'var(--color-bg-card)' }}>
                <Mail size={16} className="text-amber-500" />
              </span>
              <span className="text-zinc-300 group-hover:text-white transition-colors text-sm font-medium">
                {BUSINESS_EMAIL}
              </span>
            </a>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="rounded-xl border border-zinc-800 p-6 sm:p-8"
            style={{ background: 'var(--color-bg-card)' }}
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center text-center py-8 gap-4">
                <CheckCircle size={40} className="text-emerald-400" />
                <h3 className="text-white font-semibold text-lg">Message sent!</h3>
                <p className="text-zinc-400 text-sm">
                  Thanks for reaching out. We'll get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-sm text-amber-500 hover:text-amber-400 transition-colors cursor-pointer bg-transparent border-none p-0"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs text-zinc-400 mb-1.5 font-medium">
                      Name <span className="text-amber-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs text-zinc-400 mb-1.5 font-medium">
                      Email <span className="text-amber-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-xs text-zinc-400 mb-1.5 font-medium">
                    Company / Organization <span className="text-zinc-600">(optional)</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Company or clinic name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs text-zinc-400 mb-1.5 font-medium">
                    Message <span className="text-amber-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what you have in mind..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={14} />
                    Something went wrong. Please try emailing us directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/50 text-zinc-950 font-semibold text-sm transition-colors cursor-pointer mt-1"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
