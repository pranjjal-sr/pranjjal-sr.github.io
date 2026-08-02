import { useEffect, useRef, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Navbar.module.css'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!reduceMotion) {
      const tween = gsap.fromTo(
        nav,
        { y: -80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        }
      )
      return () => tween.kill()
    }
  }, [])

  useEffect(() => {
    const nav = navRef.current

    const updateScroll = () =>
      nav.classList.toggle(styles.scrolled, window.scrollY > 10)

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: updateScroll,
      onRefresh: updateScroll,
    })
    updateScroll()

    return () => trigger.kill()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav ref={navRef} className={styles.nav}>
      <Link to="/" className={styles.logo} onClick={closeMenu}>
        <img className={styles.logoImg} src="/logo.jpg" alt="LeafGains" />
        LeafGains
      </Link>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
        {navLinks.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? styles.active : undefined)}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>
    </nav>
  )
}
