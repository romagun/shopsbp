import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import './styles/global.css'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  )
}

export default App