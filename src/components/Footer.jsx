import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../styles/footer.css'

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  const scrollToId = (id) => {
    // small timeout to allow navigation to complete when needed
    const el = document.getElementById(id)
    if (!el) return
    // account for fixed header height so the section isn't hidden
    const header = document.querySelector('.site-header')
    const headerHeight = header ? header.offsetHeight : 0
    const rect = el.getBoundingClientRect()
    const absoluteTop = rect.top + window.pageYOffset
    const offset = Math.max(0, absoluteTop - headerHeight - 16) // 16px gap
    window.scrollTo({ top: offset, behavior: 'auto' })
  }

  const handleProductCategory = (category) => (e) => {
    e.preventDefault()
    const doAction = () => {
      // If we're already on home, scroll and dispatch immediately
      scrollToId('products')
      window.dispatchEvent(new CustomEvent('productCategory', { detail: { category } }))
    }

    if (location.pathname === '/') {
      doAction()
    } else {
      // Persist intent and navigate; Products will read it on mount
      sessionStorage.setItem('pendingScroll', 'products')
      sessionStorage.setItem('pendingCategory', category)
      navigate('/')
    }
  }

  const handleAbout = (e) => {
    e.preventDefault()
    if (location.pathname === '/about') {
      // Si ya estamos en la página de Nosotros, hacer scroll hacia arriba
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    } else {
      navigate('/about')
    }
  }

  const handleContact = (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      scrollToId('contact')
    } else {
      sessionStorage.setItem('pendingScroll', 'contact')
      navigate('/')
    }
  }

  const handlePlaceholder = (e) => {
    e.preventDefault()
    alert('Página en construcción')
  }

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>EK FOODS</h4>
            <p className="footer-desc">
              Distribuidora de alimentos de calidad para tu negocio y hogar. 
              Más de 10 años llevando productos de primera a todo el país.
            </p>
            {/* Social icons removed per user request */}
          </div>

          <div className="footer-col">
            <h4>Productos</h4>
            <ul className="footer-links">
              <li><a href="#products" onClick={handleProductCategory('Leche en Polvo')}>Leche en Polvo</a></li>
              <li><a href="#products" onClick={handleProductCategory('Harinas')}>Harinas</a></li>
              <li><a href="#products" onClick={handleProductCategory('Café')}>Café</a></li>
              <li><a href="#products" onClick={handleProductCategory('Abarrotes')}>Abarrotes</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Información</h4>
            <ul className="footer-links">
              <li><a href="/about" onClick={handleAbout}>Sobre Nosotros</a></li>
              <li><a href="#contact" onClick={handleContact}>Contacto</a></li>
            </ul>
          </div>

          {/* Newsletter removed per request */}
        </div>

        <div className="footer-bottom">
          <div className="footer-info">
            <p>📍 Av. Aviación 415 - La Victoria, Centro Comercial 3 de Febrero, Stand #1260 — Referente: Frente a la estación Gamarra</p>
            <p>📞 +51 999 933 689</p>
            <p>✉️ ekfoods1.0@gmail.com</p>
          </div>
          <div className="copyright">
            © 2025 EK FOODS — Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  )
}
