import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import styles from './Product.module.css'

// Функция конвертации долларов в рубли
const USD_TO_RUB = 92.5
const toRub = (usdPrice) => {
  return Math.round(usdPrice * USD_TO_RUB)
}

function Product() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Товар не найден')
        return res.json()
      })
      .then(data => {
        setProduct(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      // Добавляем в корзину товар с ценой в рублях
      addToCart({ ...product, price: toRub(product.price) })
    }
  }

  if (loading) return <div className={styles.loading}>Загрузка...</div>
  if (error) return <div className={styles.error}>Ошибка: {error}</div>

  return (
    <div className={styles.product}>
      <Link to="/catalog" className={styles.backLink}>← Назад к каталогу</Link>
      {product && (
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <img src={product.image} alt={product.title} />
          </div>
          <div className={styles.info}>
            <h1>{product.title}</h1>
            <p className={styles.category}>Категория: {product.category}</p>
            <p className={styles.description}>{product.description}</p>
            {/* Цена в рублях */}
            <p className={styles.price}>₽{toRub(product.price)}</p>
            <button
              onClick={handleAddToCart}
              className={styles.buyButton}
            >
              🛒 Добавить в корзину
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Product