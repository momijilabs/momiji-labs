import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Mail, Send, CheckCircle, AlertCircle, MapPin, Clock, Handshake } from 'lucide-react'
import { theme } from '../theme'

// EmailJS config (client-side keys — secured via domain allowlisting in EmailJS dashboard)
const EMAILJS_SERVICE_ID = 'service_upfitet'
const EMAILJS_TEMPLATE_ID = 'template_ku5fh4u'
const EMAILJS_PUBLIC_KEY = 'OptqGe4o466t2ZZKx'

const BUSINESS_EMAIL = 'hello@momijilabs.com'

export default function Contact() {
  const ref = useRef(null)
  const formRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [formError, setFormError] = useState('')
  const [emailHovered, setEmailHovered] = useState(false)
  const [locationHovered, setLocationHovered] = useState(false)
  const [responseHovered, setResponseHovered] = useState(false)
  const [openToHovered, setOpenToHovered] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (formError) setFormError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setFormError('Please fill in all required fields.')
      return
    }
    setFormError('')
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
    'w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none input-accent'
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
            <span className="accent-text text-sm font-semibold uppercase tracking-widest mb-5 block">
              Contact
            </span>
            <h2
              className="text-4xl sm:text-5xl font-semibold leading-tight mb-6"
              style={{ color: 'var(--color-text-dark)' }}
            >
              Let's build something meaningful.
            </h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--color-text-dark-secondary)' }}>
              Whether you're interested in a partnership, a product feature request, or just want
              to say hello — we'd love to hear from you.
            </p>

            {/* Info rows */}
            <div className="flex flex-col gap-4">

              {/* Email */}
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="inline-flex items-center gap-3"
                onMouseEnter={() => setEmailHovered(true)}
                onMouseLeave={() => setEmailHovered(false)}
              >
                <span
                  className="flex items-center justify-center w-11 h-11 rounded-xl border transition-colors flex-shrink-0"
                  style={{
                    borderColor: emailHovered ? 'var(--color-accent)' : 'var(--color-border-light-strong)',
                    background: emailHovered ? 'var(--accent-soft-bg)' : 'var(--color-bg-light-alt)',
                  }}
                >
                  <Mail size={17} className="accent-text" />
                </span>
                <span
                  className="text-sm font-semibold transition-colors"
                  style={{
                    color: emailHovered ? 'var(--color-accent)' : 'var(--color-text-dark)',
                    textDecoration: 'underline',
                    textDecorationColor: 'var(--color-accent)',
                    textUnderlineOffset: '3px',
                    textDecorationThickness: emailHovered ? '2px' : '1px',
                  }}
                >
                  {BUSINESS_EMAIL}
                </span>
              </a>

              {/* Location */}
              <div
                className="inline-flex items-center gap-3 cursor-default"
                onMouseEnter={() => setLocationHovered(true)}
                onMouseLeave={() => setLocationHovered(false)}
              >
                <span
                  className="flex items-center justify-center w-11 h-11 rounded-xl border transition-colors flex-shrink-0"
                  style={{
                    borderColor: locationHovered ? 'var(--color-accent)' : 'var(--color-border-light-strong)',
                    background: locationHovered ? 'var(--accent-soft-bg)' : 'var(--color-bg-light-alt)',
                  }}
                >
                  <MapPin size={17} className="accent-text" />
                </span>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-text-dark)' }}>
                  Vaughan, ON, Canada
                </span>
              </div>

              {/* Response time */}
              <div
                className="inline-flex items-center gap-3 cursor-default"
                onMouseEnter={() => setResponseHovered(true)}
                onMouseLeave={() => setResponseHovered(false)}
              >
                <span
                  className="flex items-center justify-center w-11 h-11 rounded-xl border transition-colors flex-shrink-0"
                  style={{
                    borderColor: responseHovered ? 'var(--color-accent)' : 'var(--color-border-light-strong)',
                    background: responseHovered ? 'var(--accent-soft-bg)' : 'var(--color-bg-light-alt)',
                  }}
                >
                  <Clock size={17} className="accent-text" />
                </span>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-text-dark)' }}>
                  We reply within 1–2 business days
                </span>
              </div>

              {/* Open to */}
              <div
                className="inline-flex items-start gap-3 cursor-default"
                onMouseEnter={() => setOpenToHovered(true)}
                onMouseLeave={() => setOpenToHovered(false)}
              >
                <span
                  className="flex items-center justify-center w-11 h-11 rounded-xl border transition-colors flex-shrink-0"
                  style={{
                    borderColor: openToHovered ? 'var(--color-accent)' : 'var(--color-border-light-strong)',
                    background: openToHovered ? 'var(--accent-soft-bg)' : 'var(--color-bg-light-alt)',
                  }}
                >
                  <Handshake size={17} className="accent-text" />
                </span>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide block mb-0.5" style={{ color: 'var(--color-text-dark-muted)' }}>
                    Open to
                  </span>
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-text-dark)' }}>
                    Partnerships, product feedback, investment inquiries & press.
                  </span>
                </div>
              </div>

            </div>
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
                  className="mt-2 text-sm font-semibold accent-text transition-colors cursor-pointer bg-transparent border-none p-0"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: 'var(--color-text-dark-secondary)' }}>
                      Name <span className="accent-text">*</span>
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
                      Email <span className="accent-text">*</span>
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
                    Message <span className="accent-text">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={7}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what you have in mind..."
                    className={`${inputClass} resize-none`}
                    style={inputStyle}
                  />
                </div>

                {formError && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle size={14} />
                    {formError}
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle size={14} />
                    Something went wrong. Please try emailing us directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-lg accent-bg font-bold text-sm cursor-pointer mt-1"
                  style={{ color: theme.btnText }}
                >
                  {status === 'sending' ? (
                    <>
                      <span className={`w-4 h-4 border-2 ${theme.btnSpinner} rounded-full animate-spin`} />
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
