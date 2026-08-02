import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import styles from './ContactForm.module.css'

const reduceMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('')
  const formRef = useRef(null)
  const successRef = useRef(null)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const validate = () => {
    if (form.name.trim().length < 2) return 'Name is too short'
    if (!EMAIL_RE.test(form.email)) return 'Please enter a valid email'
    if (form.message.trim().length < 10) return 'Message is too short'
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const error = validate()
    if (error) {
      setStatus('error')
      setErrorMsg(error)
      if (!reduceMotion()) {
        gsap.fromTo(
          formRef.current,
          { x: -8 },
          { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)', repeat: 3, yoyo: true }
        )
      }
      return
    }
    setStatus('sending')
    setErrorMsg('')
    setTimeout(() => setStatus('sent'), 1500)
  }

  useEffect(() => {
    if (status !== 'sent' || !successRef.current) return
    if (reduceMotion()) return
    gsap.fromTo(
      successRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.4)' }
    )
  }, [status])

  const reset = () => {
    setForm({ name: '', email: '', message: '' })
    setStatus('idle')
    setErrorMsg('')
  }

  if (status === 'sent') {
    return (
      <div className={styles.success} ref={successRef} role="status">
        <span className={styles.successIcon}>✓</span>
        <h3>Got it!</h3>
        <p>We'll get back to you within a couple of days.</p>
        <button className={styles.reset} onClick={reset}>
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="What should we call you?"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="How can we help?"
        />
      </div>

      {status === 'error' && <p className={styles.error}>{errorMsg}</p>}

      <button type="submit" className={styles.submit} disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
