import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import styles from './Catalog.module.css'

const USD_TO_RUB = 92.5
const toRub = (usdPrice) => {
  return Math.round(usdPrice * USD_TO_RUB)
}

function Catalog() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState([])
  const { addToCart } = useCart()

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => {
        if (!res.ok) throw new Error('Ошибка загрузки')
        return res.json()
      })
      .then(data => {
        setProducts(data)
        setFilteredProducts(data)
        setLoading(false)
        const cats = ['all', ...new Set(data.map(p => p.category))]
        setCategories(cats)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
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
  if (error) return <div className={styles.error}>Ошибка: {error}</div>

  return (
    <div className={styles.catalog}>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Поиск товаров..."
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
              {}
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