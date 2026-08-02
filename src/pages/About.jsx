import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { images } from '../data/images'
import styles from './About.module.css'

const timelineItems = [
  {
    year: '2021',
    title: 'The newsletter days',
    desc: 'Three people, one shared Google Doc, and a weekly email explaining market basics in plain words. Nobody had a finance degree. We still do not.',
  },
  {
    year: '2023',
    title: 'It started sticking',
    desc: 'Readers kept replying asking "how do I actually start?", so we began building guided, beginner-first investment tools.',
  },
  {
    year: '2025',
    title: 'The little platform',
    desc: 'SIP planning, market insights, and portfolio tracking — all in one calm, uncluttered place. Still run by a small team.',
  },
]

const values = [
  {
    title: 'Transparency',
    desc: 'No jargon, no hidden fees, no hype. If we recommend something, we explain the "why" in plain language.',
  },
  {
    title: 'Steady growth',
    desc: 'We grow the same way we want your money to: slowly, boringly, and sustainably.',
  },
  {
    title: 'Simplicity',
    desc: 'Investing already feels complicated enough. We strip away the noise until only the useful part remains.',
  },
]

export default function About() {
  const heroTitleRef = useRef(null)
  const storyRef = useRef(null)
  const lineRef = useRef(null)
  const itemRefs = useRef([])
  const valuesRef = useRef(null)
  const valueRefs = useRef([])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroTitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      )

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: storyRef.current, start: 'top 60%' },
        }
      )
      gsap.fromTo(
        itemRefs.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: storyRef.current, start: 'top 60%' },
        }
      )

      gsap.fromTo(
        valueRefs.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: valuesRef.current, start: 'top 75%' },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <main>
      <Navbar />

      <section className={styles.hero}>
        <h1 ref={heroTitleRef}>
          We make investing feel <em>less scary.</em>
        </h1>
      </section>

      <section className={styles.story} ref={storyRef}>
        <div className={styles.storyLayout}>
          <div className={styles.imageWrap}>
            {images.about ? (
              <img
                src={images.about}
                alt="LeafGains story"
                loading="lazy"
                className={styles.storyImg}
              />
            ) : (
              <div className={styles.storyFallback} />
            )}
          </div>

          <div className={styles.timelineWrap}>
            <div className={styles.timelineLine} ref={lineRef} />
            {timelineItems.map((item, i) => (
              <div
                key={item.year}
                className={styles.timelineItem}
                ref={(el) => {
                  itemRefs.current[i] = el
                }}
              >
                <span className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <span className={styles.timelineYear}>{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.values} ref={valuesRef}>
        <h2 className={styles.valuesHeading}>The way we work</h2>
        <div className={styles.valueGrid}>
          {values.map((value, i) => (
            <article
              key={value.title}
              className={styles.valueCard}
              ref={(el) => {
                valueRefs.current[i] = el
              }}
            >
              <h3>{value.title}</h3>
              <p>{value.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
