import React from 'react'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; 2026 ShopSbp. Все права защищены.</p>
        <p>📞 +7 (952) 123-45-67 | ✉️ shop@sbp.com</p>
      </div>
    </footer>
  )
}

export default Footer