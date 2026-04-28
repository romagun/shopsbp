import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Заполните все поля')
      return
    }
    if (!email.includes('@')) {
      setError('Введите корректный email')
      return
    }
    // Имитация входа
    localStorage.setItem('user', JSON.stringify({ email, name: email.split('@')[0] }))
    alert('Добро пожаловать!')
    navigate('/')
  }

  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <h1>Вход в аккаунт</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.loginButton}>
            Войти
          </button>
        </form>
        <p className={styles.demo}>
          Демо-версия: введите любые данные для входа
        </p>
      </div>
    </div>
  )
}

export default Login