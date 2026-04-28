import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'

function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <h1>Добро пожаловать в ShopSbp</h1>
        <p>Товары с Спб с доставкой по всей России!</p>
        <Link to="/catalog" className={styles.ctaButton}>
          Начать покупки →
        </Link>
      </section>
      
      <section className={styles.features}>
        <div className={styles.feature}>
          <span className={styles.featureIcon}></span>
          <h3>Бесплатная доставка</h3>
          <p>При заказе от 3000₽</p>
        </div>
        <div className={styles.feature}>
          <span className={styles.featureIcon}></span>
          <h3>Возврат товара</h3>
          <p>30 дней на возврат</p>
        </div>
        <div className={styles.feature}>
          <span className={styles.featureIcon}></span>
          <h3>Оплата онлайн</h3>
          <p>Безопасные платежи</p>
          <p>СБП,VISA,MASTERCARD,MIR</p>
        </div>
      </section>
    </div>
  )
}

export default Home