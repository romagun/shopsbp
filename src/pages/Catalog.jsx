import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import styles from './Catalog.module.css'

const USD_TO_RUB = 92.5
const toRub = (usdPrice) => Math.round(usdPrice * USD_TO_RUB)

// Локальные данные (мок-данные)
const mockProducts = [
  {
    id: 1,
    title: "Ноутбук Apple MacBook Air 13",
    price: 1299,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300",
    thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300"
  },
  {
    id: 2,
    title: "Смартфон Samsung Galaxy S23",
    price: 999,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300",
    thumbnail: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300"
  },
  {
    id: 3,
    title: "Наушники Sony WH-1000XM5",
    price: 399,
    category: "electronics",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300",
    thumbnail: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=300"
  },
  {
    id: 4,
    title: "Футболка хлопковая мужская",
    price: 29,
    category: "men clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300",
    thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300"
  },
  {
    id: 5,
    title: "Джинсы классические",
    price: 89,
    category: "men clothing",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300",
    thumbnail: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300"
  },
  {
    id: 6,
    title: "Платье женское летнее",
    price: 59,
    category: "women clothing",
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=300",
    thumbnail: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=300"
  },
  {
    id: 7,
    title: "Кроссовки Nike Air Max",
    price: 129,
    category: "sports",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
    thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300"
  },
  {
    id: 8,
    title: "Рюкзак городской",
    price: 49,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300",
    thumbnail: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300"
  }
]

function Catalog() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState([])
  const { addToCart } = useCart()

  useEffect(() => {
    // Используем локальные данные вместо API
    setTimeout(() => {
      setProducts(mockProducts)
      setFilteredProducts(mockProducts)
      setLoading(false)
      const cats = ['all', ...new Set(mockProducts.map(p => p.category))]
      setCategories(cats)
    }, 500) // Имитация загрузки
  }, [])

  useEffect(() => {
    let filtered = products
    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category)
    }
    if (search) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
    }
    setFilteredProducts(filtered)
  }, [category, search, products])

  if (loading) return <div className={styles.loading}>Загрузка товаров...</div>

  return (
    <div className={styles.catalog}>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="🔍 Поиск товаров..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.categorySelect}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'Все категории' : cat}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.grid}>
        {filteredProducts.map(product => (
          <div key={product.id} className={styles.card}>
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title.slice(0, 40)}...</h3>
              <p className={styles.category}>{product.category}</p>
              <p className={styles.price}>₽{toRub(product.price)}</p>
            </Link>
            <button
              onClick={() => addToCart({ ...product, price: toRub(product.price) })}
              className={styles.addButton}
            >
              Добавить в корзину
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Catalog