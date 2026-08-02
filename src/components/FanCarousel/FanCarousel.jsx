import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MarketCard from '../MarketCard/MarketCard'
import { marketCards } from '../../data/cards'
import styles from './FanCarousel.module.css'

gsap.registerPlugin(ScrollTrigger)

const getFanParams = () => {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1200
  if (width <= 640) return { xSpread: 100, rotation: 5, cutoff: 1, yDrop: 10 }
  if (width <= 1024) return { xSpread: 140, rotation: 6, cutoff: 2, yDrop: 11 }
  return { xSpread: 180, rotation: 8, cutoff: 2, yDrop: 12 }
}

const getCardStyles = (index, targetIndex, params) => {
  const offset = index - targetIndex
  return {
    x: offset * params.xSpread,
    rotation: offset * params.rotation,
    scale: offset === 0 ? 1.08 : 1 - Math.abs(offset) * 0.08,
    opacity: Math.abs(offset) > params.cutoff ? 0 : 1 - Math.abs(offset) * 0.15,
    y: Math.abs(offset) * params.yDrop,
  }
}

export default function FanCarousel({ cards = marketCards }) {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const cardRefs = useRef([])
  const activeIndexRef = useRef(0)
  const activeRef = useRef(false)
  const dragMovedRef = useRef(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [fanParams, setFanParams] = useState(getFanParams)

  const totalCards = cards.length
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  useEffect(() => {
    const onResize = () => setFanParams(getFanParams())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const animateFan = useCallback(
    (targetIndex) => {
      cardRefs.current.forEach((card, index) => {
        if (!card) return
        const target = getCardStyles(index, targetIndex, fanParams)
        if (reduceMotion) {
          gsap.set(card, target)
        } else {
          gsap.to(card, {
            ...target,
            duration: 0.55,
            ease: 'power3.out',
          })
        }
      })
    },
    [reduceMotion, fanParams]
  )

  const animateCardsIn = useCallback(() => {
    activeRef.current = true
    if (reduceMotion) {
      animateFan(activeIndexRef.current)
      return
    }
    gsap.fromTo(
      cardRefs.current.filter(Boolean),
      { y: 200, opacity: 0, scale: 0.7, rotation: 0 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.5)',
        onComplete: () => animateFan(activeIndexRef.current),
      }
    )
  }, [animateFan, reduceMotion])

  const animateCardsOut = useCallback(() => {
    activeRef.current = false
    gsap.to(cardRefs.current.filter(Boolean), {
      x: 0,
      y: 200,
      rotation: 0,
      opacity: 0,
      scale: 0.7,
      duration: 0.5,
      ease: 'power2.in',
    })
  }, [])

  const callbacksRef = useRef({ in: animateCardsIn, out: animateCardsOut })
  useEffect(() => {
    callbacksRef.current = { in: animateCardsIn, out: animateCardsOut }
  }, [animateCardsIn, animateCardsOut])

  useEffect(() => {
    if (reduceMotion) {
      callbacksRef.current.in()
      return
    }

    gsap.set(cardRefs.current.filter(Boolean), { y: 200, opacity: 0, scale: 0.7 })

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=600',
      pin: true,
      onEnter: () => callbacksRef.current.in(),
      onLeaveBack: () => callbacksRef.current.out(),
      onRefresh: (self) => {
        if (self.isActive) callbacksRef.current.in()
      },
    })

    return () => trigger.kill()
  }, [reduceMotion])

  useEffect(() => {
    if (!activeRef.current) return
    animateFan(activeIndex)
  }, [activeIndex, animateFan])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let startX = 0
    let startY = 0
    let dragging = false

    const onPointerDown = (e) => {
      startX = e.clientX
      startY = e.clientY
      dragging = false
      dragMovedRef.current = false
    }

    const onPointerMove = (e) => {
      if (startX === 0 && startY === 0) return
      const dx = e.clientX - startX
      if (!dragging && Math.abs(dx) > 8) {
        dragging = true
      }
      if (dragging && activeRef.current) {
        gsap.set(track, { x: dx })
      }
    }

    const onPointerUp = (e) => {
      if (startX === 0 && startY === 0) return
      const dx = e.clientX - startX
      const dy = e.clientY - startY
      if (dragging) {
        dragMovedRef.current = true
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) && activeRef.current) {
          if (dx < 0) {
            setActiveIndex((prev) => Math.min(prev + 1, totalCards - 1))
          } else {
            setActiveIndex((prev) => Math.max(prev - 1, 0))
          }
        }
        gsap.to(track, { x: 0, duration: 0.5, ease: 'power3.out' })
      }
      dragging = false
      startX = 0
      startY = 0
    }

    const onPointerCancel = () => {
      if (dragging) {
        gsap.to(track, { x: 0, duration: 0.4, ease: 'power2.out' })
      }
      dragging = false
      startX = 0
      startY = 0
    }

    track.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerCancel)

    return () => {
      track.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerCancel)
    }
  }, [totalCards])

  useEffect(() => {
    const handleKey = (e) => {
      if (!activeRef.current) return
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setActiveIndex((prev) => Math.min(prev + 1, totalCards - 1))
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setActiveIndex((prev) => Math.max(prev - 1, 0))
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [totalCards])

  const handleCardClick = useCallback((index) => {
    if (dragMovedRef.current) {
      dragMovedRef.current = false
      return
    }
    if (!activeRef.current) return
    setActiveIndex(index)
  }, [])

  return (
    <section ref={sectionRef} className={styles.section} id="picks">
      <h2 className={styles.sectionTitle}>What we are watching today</h2>
      <p className={styles.sectionSubtitle}>Drag, click, or use arrow keys — go on</p>

      <div className={styles.stage}>
        <div className={styles.track} ref={trackRef}>
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              className={styles.cardWrap}
              style={{ zIndex: totalCards - Math.abs(index - activeIndex) }}
            >
              <MarketCard
                card={card}
                isActive={index === activeIndex}
                onClick={() => handleCardClick(index)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dots}>
        {cards.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
            onClick={() => handleCardClick(i)}
            aria-label={`Go to card ${i + 1}`}
            aria-current={i === activeIndex}
          />
        ))}
      </div>
    </section>
  )
}
