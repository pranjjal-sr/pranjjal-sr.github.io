import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <span className={styles.logo}>
            <img className={styles.logoImg} src="/logo.jpg" alt="LeafGains" />
            LeafGains
          </span>
          <p>A small team helping money make sense.</p>
        </div>

        <nav className={styles.links} aria-label="Footer">
          {footerLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.socials}>
          <a
            href="https://instagram.com/leaf_gains_finance"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a href="mailto:contact@leafgains.com">Email</a>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} LeafGains Finance. All rights reserved.</p>
      </div>
    </footer>
  )
}
