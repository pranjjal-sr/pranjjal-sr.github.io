import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import ContactForm from '../components/ContactForm/ContactForm'
import styles from './Contact.module.css'

export default function Contact() {
  const infoRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        infoRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: infoRef.current, start: 'top 80%' },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <main>
      <Navbar />

      <section className={styles.header}>
        <h1>Say hello</h1>
        <p>Questions, feedback, or just want to talk money — we actually reply.</p>
      </section>

      <section className={styles.page}>
        <div className={styles.layout}>
          <ContactForm />

          <aside className={styles.info} ref={infoRef}>
            <h2>Other ways to reach us</h2>
            <p>
              Email is usually fastest. DM works too — we check it more than we
              should.
            </p>
            <div className={styles.infoLinks}>
              <a href="mailto:contact@leafgains.com">contact@leafgains.com</a>
              <a
                href="https://instagram.com/leaf_gains_finance"
                target="_blank"
                rel="noreferrer"
              >
                @leaf_gains_finance
              </a>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  )
}
