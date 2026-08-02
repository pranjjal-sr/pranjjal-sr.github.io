import styles from './MarketCard.module.css'

export default function MarketCard({ card, isActive, onClick }) {
  return (
    <article
      className={`${styles.card} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={card.title}
      aria-pressed={isActive}
    >
      <div className={styles.topRow}>
        <span className={styles.tag}>
          <span className={styles.tagDot} style={{ background: card.tagColor }} />
          {card.tag}
        </span>
        <span className={`${styles.trend} ${styles[card.trend]}`}>
          {card.trend === 'up' ? '↑' : '→'}
        </span>
      </div>

      <h3 className={styles.title}>{card.title}</h3>
      <p className={styles.subtitle}>{card.subtitle}</p>

      <div className={styles.value}>{card.value}</div>
    </article>
  )
}
