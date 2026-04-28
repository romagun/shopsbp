import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import styles from './Cart.module.css'

const USD_TO_RUB = 92.5 
const toRub = (usd) => (usd * USD_TO_RUB).toFixed(0)

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = () => {
    setIsCheckingOut(true)
    setTimeout(() => {
      alert('Заказ оформлен! Спасибо за покупку!')
      clearCart()
      setIsCheckingOut(false)
    }, 1500)
  }

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Корзина пуста</h2>
        <p>Добавьте товары в корзину, чтобы продолжить</p>
        <Link to="/catalog" className={styles.shopLink}>
          Перейти в каталог
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.cart}>
      <h1>Ваша корзина</h1>
      <div className={styles.content}>
        <div className={styles.items}>
          {cartItems.map(item => (
            <div key={item.id} className={styles.item}>
              <img src={item.image} alt={item.title} />
              <div className={styles.itemInfo}>
                <h3>{item.title.slice(0, 50)}</h3>
                {/* Цена в рублях */}
                <p className={styles.itemPrice}>₽{toRub(item.price)}</p>
              </div>
              <div className={styles.quantityControls}>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              {/* Итоговая сумма в рублях */}
              <div className={styles.itemTotal}>
                ₽{toRub(item.price * item.quantity)}
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className={styles.removeButton}
              >
                ✖
              </button>
            </div>
          ))}
        </div>
        <div className={styles.summary}>
          <h2>Итого</h2>
          <div className={styles.totalPrice}>
            <span>Общая сумма:</span>
            {/* Общая сумма в рублях */}
            <span>₽{toRub(getTotalPrice())}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className={styles.checkoutButton}
          >
            {isCheckingOut ? 'Оформление...' : 'Оформить заказ'}
          </button>
          <button onClick={clearCart} className={styles.clearButton}>
            Очистить корзину
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart