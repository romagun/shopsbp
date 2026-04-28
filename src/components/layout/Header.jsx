import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import styles from './Header.module.css'

function Header() {
  const { getTotalItems } = useCart()

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          🛍️ ShopSbp
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>Главная</Link>
          <Link to="/catalog" className={styles.navLink}>Каталог</Link>
          <Link to="/cart" className={styles.cartLink}>
            🛒 Корзина
            {getTotalItems() > 0 && (
              <span className={styles.cartCount}>{getTotalItems()}</span>
            )}
          </Link>
          <Link to="/login" className={styles.navLink}>Вход</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header