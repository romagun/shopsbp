import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import styles from './Product.module.css'

const USD_TO_RUB = 92.5
const toRub = (usdPrice) => Math.round(usdPrice * USD_TO_RUB)

// Те же локальные данные
const mockProducts = {
  1: {
    id: 1,
    title: "Ноутбук Apple MacBook Air 13",
    price: 1299,
    category: "electronics",
    description: "Мощный ноутбук с процессором M2, 8GB RAM, 256GB SSD. Отличная производительность и время автономной работы.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"
  },
  2: {
    id: 2,
    title: "Смартфон Samsung Galaxy S23",
    price: 999,
    category: "electronics",
    description: "Флагманский смартфон с отличной камерой, 128GB памяти и AMOLED экраном 120Hz.",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
    thumbnail: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400"
  },
  3: {
    id: 3,
    title: "Наушники Sony WH-1000XM5",
    price: 399,
    category: "electronics",
    description: "Беспроводные наушники с шумоподавлением, время работы до 30 часов.",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400",
    thumbnail: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400"
  },
  4: {
    id: 4,
    title: "Футболка хлопковая мужская",
    price: 29,
    category: "men clothing",
    description: "Качественная хлопковая футболка, дышащая и удобная.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"
  },
  5: {
    id: 5,
    title: "Джинсы классические",
    price: 89,
    category: "men clothing",
    description: "Классические джинсы из качественного денима, идеально сидят.",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400",
    thumbnail: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400"
  },
  6: {
    id: 6,
    title: "Платье женское летнее",
    price: 59,
    category: "women clothing",
    description: "Легкое летнее платье из натуральных тканей.",
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400",
    thumbnail: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400"
  },
  7: {
    id: 7,
    title: "Кроссовки Nike Air Max",
    price: 129,
    category: "sports",
    description: "Удобные кроссовки с амортизацией Air Max.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
  },
  8: {
    id: 8,
    title: "Рюкзак городской",
    price: 49,
    category: "accessories",
    description: "Стильный и вместительный рюкзак для города.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    thumbnail: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400"
  }
}

function Product() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    // Получаем товар из локальных данных
    setTimeout(() => {
      const productData = mockProducts[id]
      if (productData) {
        setProduct(productData)
      }
      setLoading(false)
    }, 300)
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, price: toRub(product.price) })
    }
  }

  if (loading) return <div className={styles.loading}>Загрузка...</div>
  if (!product) return <div className={styles.error}>Товар не найден</div>

  return (
    <div className={styles.product}>
      <Link to="/catalog" className={styles.backLink}>← Назад к каталогу</Link>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img src={product.image} alt={product.title} />
        </div>
        <div className={styles.info}>
          <h1>{product.title}</h1>
          <p className={styles.category}>Категория: {product.category}</p>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>₽{toRub(product.price)}</p>
          <button
            onClick={handleAddToCart}
            className={styles.buyButton}
          >
            🛒 Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product