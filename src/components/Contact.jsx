import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'

// EmailJS config (client-side keys — secured via domain allowlisting in EmailJS dashboard)
const EMAILJS_SERVICE_ID = 'service_upfitet'
const EMAILJS_TEMPLATE_ID = 'template_ku5fh4u'
const EMAILJS_PUBLIC_KEY = 'OptqGe4o466t2ZZKx'

const BUSINESS_EMAIL = 'hello@momijilabs.com' // TODO: set up Zoho Mail when domain is ready

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
    'w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400'
  const inputStyle = {
    background: 'var(--color-bg-light)',
    borderColor: 'var(--color-border-light-strong)',
    color: 'var(--color-text-dark)',
  }

  return (
    <section
      id="contact"
      className="py-28 px-4"
      style={{ background: 'var(--color-bg-light)' }}
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
            <span className="text-amber-500 text-sm font-semibold uppercase tracking-widest mb-5 block">
              Contact
            </span>
            <h2
              className="text-4xl sm:text-5xl font-bold leading-tight mb-6"
              style={{ color: 'var(--color-text-dark)' }}
            >
              Let's build something meaningful.
            </h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--color-text-dark-secondary)' }}>
              Whether you're interested in a partnership, a product feature request, or just want
              to say hello — we'd love to hear from you.
            </p>

            {/* Direct email */}
            <a
              href={`mailto:${BUSINESS_EMAIL}`}
              className="inline-flex items-center gap-3 group"
            >
              <span
                className="flex items-center justify-center w-11 h-11 rounded-xl border transition-colors group-hover:border-amber-400 group-hover:bg-amber-50"
                style={{ borderColor: 'var(--color-border-light-strong)', background: 'var(--color-bg-light-alt)' }}
              >
                <Mail size={17} className="text-amber-500" />
              </span>
              <span
                className="text-sm font-semibold transition-colors group-hover:text-amber-600"
                style={{ color: 'var(--color-text-dark)' }}
              >
                {BUSINESS_EMAIL}
              </span>
            </a>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="rounded-2xl border p-7 sm:p-9"
            style={{
              background: 'var(--color-bg-light)',
              borderColor: 'var(--color-border-light)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
            }}
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center text-center py-8 gap-4">
                <CheckCircle size={44} className="text-emerald-500" />
                <h3 className="font-bold text-lg" style={{ color: 'var(--color-text-dark)' }}>
                  Message sent!
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-text-dark-secondary)' }}>
                  Thanks for reaching out. We'll get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-sm font-semibold text-amber-600 hover:text-amber-500 transition-colors cursor-pointer bg-transparent border-none p-0"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--color-text-dark-secondary)' }}>
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
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--color-text-dark-secondary)' }}>
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
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--color-text-dark-secondary)' }}>
                    Company / Organization{' '}
                    <span className="normal-case font-normal tracking-normal" style={{ color: 'var(--color-text-dark-muted)' }}>(optional)</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Company or clinic name"
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--color-text-dark-secondary)' }}>
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
                    style={inputStyle}
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle size={14} />
                    Something went wrong. Please try emailing us directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:bg-amber-300 text-zinc-950 font-bold text-sm transition-colors cursor-pointer mt-1"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-zinc-900/20 border-t-zinc-900 rounded-full animate-spin" />
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
