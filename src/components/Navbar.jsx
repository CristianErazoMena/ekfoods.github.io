import React, { useState, useEffect, useRef } from 'react'
import '../styles/navbar.css'
import productImages from '../assets/images'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false) // mantiene montado para animación
  const searchInputRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (e, id) => {
    e.preventDefault()
    setOpen(false)
    // If the user clicked 'Nosotros', navigate to the dedicated page
    if (id === 'about') {
      if (location.pathname !== '/about') navigate('/about')
      return
    }

    // If clicking the brand/root, act like a refresh: navigate home, clear search/category and scroll to top
    if (id === 'root') {
      // Reset global search and category
      window.dispatchEvent(new CustomEvent('productSearch', { detail: '' }))
      window.dispatchEvent(new CustomEvent('productCategory', { detail: 'Todos' }))
      if (location.pathname !== '/') {
        // navigate home and ensure immediate top position
        sessionStorage.setItem('pendingScroll', 'root')
        navigate('/')
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    if (location.pathname !== '/') {
      // Save intent and navigate; target will be handled on mount of Products
      if (id && id !== 'root') sessionStorage.setItem('pendingScroll', id)
      navigate('/')
    } else {
      const el = id && id !== 'root' ? document.getElementById(id) : null
      if (el) el.scrollIntoView({ behavior: 'auto' })
    }
  }

  const openSearch = () => {
    setShowSearch(true)
    setSearchOpen(true)
    if (location.pathname !== '/') navigate('/')
    setTimeout(() => {
      searchInputRef.current?.focus()
    }, 50)
  }

  const closeSearch = () => {
    // Close the overlay and clear the visible input, but DO NOT dispatch
    // an empty search event so the currently applied filter remains active.
    setSearchOpen(false)
    setSearchValue('')
  }

  const handleSearchChange = (e) => {
    const val = e.target.value
    setSearchValue(val)
    // Ensure we're on the home/products page so the Products component is mounted
      const doDispatch = () => {
      window.dispatchEvent(new CustomEvent('productSearch', { detail: val }))
      // scroll to products so user sees results as they type
      const el = document.getElementById('products')
      if (el) {
        const header = document.querySelector('.site-header')
        const headerHeight = header ? header.offsetHeight : 0
        const rect = el.getBoundingClientRect()
        const absoluteTop = rect.top + window.pageYOffset
        const offset = Math.max(0, absoluteTop - headerHeight - 16)
        	window.scrollTo({ top: offset, behavior: 'auto' })
      }
    }

    if (location.pathname !== '/') {
      // persist the search and intent to view products so Home can handle immediately
      sessionStorage.setItem('pendingSearch', val)
      sessionStorage.setItem('pendingScroll', 'products')
      navigate('/')
    } else {
      doDispatch()
    }
  }

  useEffect(() => {
    const escHandler = (e) => {
      if (e.key === 'Escape' && searchOpen) closeSearch()
    }
    window.addEventListener('keydown', escHandler)
    return () => window.removeEventListener('keydown', escHandler)
  }, [searchOpen])

  useEffect(() => {
    const clickOutside = (e) => {
      if (!searchOpen) return
      const overlay = document.querySelector('.search-overlay')
      if (overlay && !overlay.contains(e.target) && !e.target.closest('.search-trigger')) {
        closeSearch()
      }
    }
    document.addEventListener('mousedown', clickOutside)
    return () => document.removeEventListener('mousedown', clickOutside)
  }, [searchOpen])

  useEffect(() => {
    if (!searchOpen && showSearch) {
      const timeout = setTimeout(() => setShowSearch(false), 280) // coincide con transición CSS
      return () => clearTimeout(timeout)
    }
  }, [searchOpen, showSearch])

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <div className="brand">
          <button 
            className="brand-logo-btn"
            onClick={(e) => handleLink(e, 'root')}
            aria-label="Ir al inicio"
          >
            <img
              src={productImages.logo}
              alt="EK FOODS"
              className="brand-logo"
            />
          </button>
        </div>
        <nav className={`nav ${open ? 'open' : ''}`}>
          <a href="#" onClick={(e) => handleLink(e, 'root')}>Inicio</a>
          <a href="#products" onClick={(e) => handleLink(e, 'products')}>Productos</a>
          <a href="#about" onClick={(e) => handleLink(e, 'about')}>Nosotros</a>
          <a href="#contact" onClick={(e) => handleLink(e, 'contact')}>Contacto</a>
          <button
            type="button"
            className="search-trigger"
            aria-label="Abrir búsqueda"
            onClick={openSearch}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </nav>
        {showSearch && (
          <div className={`search-overlay ${!searchOpen ? 'closing' : ''}`} role="dialog" aria-label="Buscar productos" onMouseLeave={closeSearch}>
            <div className="search-inner">
              <div className="search-box-expanded left-aligned">
                <span className="icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  aria-label="Campo de búsqueda de productos"
                />
              </div>
              <div className="quick-links left-aligned">
                <p className="quick-title">Categorías rápidas</p>
                <div className="quick-grid">
                  {['Leche en polvo','Harinas','Café','Abarrotes'].map(cat => (
                    <button
                      key={cat}
                      className="quick-item"
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent('productSearch', { detail: '' }))
                        closeSearch()
                        const el = document.getElementById('products')
                        if (el) el.scrollIntoView({ behavior: 'auto' })
                        window.dispatchEvent(new CustomEvent('productCategory', { detail: cat }))
                      }}
                    >{cat}</button>
                  ))}
                </div>
                {searchValue && <p className="search-hint">Buscando: "{searchValue}"</p>}
              </div>
            </div>
          </div>
        )}
        <button
          className={`burger ${open ? 'open' : ''}`}
          aria-label="Abrir menú"
          onClick={() => setOpen((s) => !s)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
