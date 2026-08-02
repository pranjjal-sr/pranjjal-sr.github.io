import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './TickerStrip.module.css'

const tickerItems = [
  { label: 'SENSEX', value: '73,842', change: '+0.62%', up: true },
  { label: 'NIFTY 50', value: '22,419', change: '+0.81%', up: true },
  { label: 'GOLD', value: '₹71,240/10g', change: '+0.3%', up: true },
  { label: 'USD/INR', value: '83.42', change: '-0.1%', up: false },
  { label: 'HDFC BANK', value: '₹1,842', change: '+1.2%', up: true },
  { label: 'RELIANCE', value: '₹2,961', change: '-0.4%', up: false },
  { label: 'BITCOIN', value: '$67,400', change: '+2.1%', up: true },
]

export default function TickerStrip() {
  const trackRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const tween = gsap.to(trackRef.current, {
      x: '-50%',
      duration: 25,
      ease: 'none',
      repeat: -1,
    })

    return () => tween.kill()
  }, [])

  const doubled = [...tickerItems, ...tickerItems]

  return (
    <div className={styles.ticker}>
      <div className={styles.track} ref={trackRef}>
        {doubled.map((item, i) => (
          <div
            key={i}
            className={styles.item}
            aria-hidden={i >= tickerItems.length}
          >
            <span className={styles.label}>{item.label}</span>
            <span className={styles.value}>{item.value}</span>
            <span className={`${styles.change} ${item.up ? styles.up : styles.down}`}>
              {item.change}
            </span>
            <span className={styles.divider}>·</span>
          </div>
        ))}
      </div>
    </div>
  )
}
