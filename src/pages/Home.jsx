import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import Navbar from '../components/Navbar/Navbar'
import TickerStrip from '../components/TickerStrip/TickerStrip'
import FanCarousel from '../components/FanCarousel/FanCarousel'
import Footer from '../components/Footer/Footer'
import { images } from '../data/images'
import styles from './Home.module.css'

const features = [
  {
    img: images.featureSip,
    title: 'SIP Calculator',
    desc: 'Type in what you can save monthly and see roughly where it lands. No spreadsheets needed.',
  },
  {
    img: images.featureMarket,
    title: 'Market Insights',
    desc: 'A short daily read on what actually moved — we skip the noise.',
  },
  {
    img: images.featurePortfolio,
    title: 'Portfolio Tracker',
    desc: 'Your funds and stocks in one plain-English dashboard. Checking in is actually pleasant.',
  },
]

const testimonials = [
  {
    quote:
      'I started my first SIP last year because LeafGains made it feel obvious. I still do not understand everything, but at least now I know what to ask.',
    name: 'Ananya S.',
    role: 'First-time investor, Pune',
  },
  {
    quote:
      'Honestly I just needed someone to tell me plain numbers. The tracker does that — no glowy charts I cannot read.',
    name: 'Rohan M.',
    role: 'Working professional, Bengaluru',
  },
]

const stats = [
  { value: 12400, suffix: '+', label: 'Readers & investors' },
  { prefix: '₹', value: 78, suffix: ' Cr+', label: 'Tracked in portfolios' },
  { value: 17, suffix: '', label: 'Curated funds on the list' },
]

export default function Home() {
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const actionsRef = useRef(null)
  const featuresRef = useRef(null)
  const testimonialsRef = useRef(null)
  const statsRef = useRef(null)
  const featureCardRefs = useRef([])
  const testimonialRefs = useRef([])
  const statRefs = useRef([])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const tl = gsap.timeline()
    tl.fromTo(
      eyebrowRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    )
      .fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.2'
      )
      .fromTo(
        textRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.3'
      )
      .fromTo(
        actionsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        '-=0.2'
      )

    const ctx = gsap.context(() => {
      gsap.fromTo(
        featureCardRefs.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: { trigger: featuresRef.current, start: 'top 75%' },
        }
      )

      gsap.fromTo(
        testimonialRefs.current.filter((_, i) => i % 2 === 0),
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          scrollTrigger: { trigger: testimonialsRef.current, start: 'top 80%' },
        }
      )
      gsap.fromTo(
        testimonialRefs.current.filter((_, i) => i % 2 === 1),
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          scrollTrigger: { trigger: testimonialsRef.current, start: 'top 80%' },
        }
      )

      statRefs.current.forEach((el) => {
        if (!el) return
        const target = parseFloat(el.dataset.value)
        const decimals = Number(el.dataset.decimals || 0)
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
          onUpdate: () => {
            el.textContent =
              decimals > 0
                ? obj.val.toFixed(decimals)
                : Math.round(obj.val).toLocaleString('en-IN')
          },
        })
      })
    })

    return () => {
      tl.kill()
      ctx.revert()
    }
  }, [])

  return (
    <main>
      <Navbar />

      <section
        className={styles.hero}
        style={images.heroBg ? { backgroundImage: `url(${images.heroBg})` } : undefined}
      >
        <div className={styles.overlay} />

        <div className={styles.heroContent}>
          <span ref={eyebrowRef} className={styles.eyebrow}>
            A small team, big plans
          </span>
          <h1 ref={titleRef} className={styles.title}>
            Make your money work
            <br />
            <em>a little harder.</em>
          </h1>
          <p ref={textRef} className={styles.subtitle}>
            We help first-time investors get started with SIPs, funds, and
            portfolios — in plain language, minus the hype.
          </p>
          <div ref={actionsRef} className={styles.actions}>
            <Link to="/contact" className={styles.btnNeon}>
              Start Investing ↗
            </Link>
            <button
              type="button"
              className={styles.btnGhost}
              onClick={() => {
                const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
                featuresRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      <TickerStrip />
      <FanCarousel />

      <section className={styles.features} ref={featuresRef}>
        <h2 className={styles.sectionHeading}>The tools we actually use</h2>
        <p className={styles.sectionSub}>Nothing fancy — just stuff that works</p>
        <div className={styles.featureGrid}>
          {features.map((feature, i) => (
            <article
              key={feature.title}
              className={styles.featureCard}
              ref={(el) => {
                featureCardRefs.current[i] = el
              }}
            >
              {feature.img ? (
                <img src={feature.img} alt={feature.title} loading="lazy" />
              ) : (
                <div className={styles.featureFallback} />
              )}
              <div className={styles.featureBody}>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.testimonials} ref={testimonialsRef}>
        <h2 className={styles.sectionHeading}>Word on the street</h2>
        <div className={styles.testimonialGrid}>
          {testimonials.map((testimonial, i) => (
            <blockquote
              key={testimonial.name}
              className={styles.testimonial}
              ref={(el) => {
                testimonialRefs.current[i] = el
              }}
            >
              <p>“{testimonial.quote}”</p>
              <footer>
                <cite>{testimonial.name}</cite> · {testimonial.role}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className={styles.stats} ref={statsRef}>
        <div className={styles.statGrid}>
          {stats.map((stat, i) => (
            <div key={stat.label} className={styles.stat}>
              <span className={styles.statValue}>
                {stat.prefix}
                <span
                  ref={(el) => {
                    statRefs.current[i] = el
                  }}
                  data-value={stat.value}
                  data-decimals={stat.decimals || 0}
                >
                  {stat.value.toLocaleString('en-IN')}
                </span>
                {stat.suffix}
              </span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
