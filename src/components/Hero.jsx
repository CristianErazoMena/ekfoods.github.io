import React, { useState, useEffect } from 'react'
import '../styles/hero.css'

const banners = [
  {
    id: 1,
    title: 'Leche en Polvo de Calidad',
    subtitle: 'Importada desde Nueva Zelanda y USA',
    description: 'Para uso comercial y doméstico',
    cta: 'Ver Productos',
    bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 2,
    title: 'Harinas de Maíz',
    subtitle: 'P.A.N y Arepasan',
    description: 'Las mejores marcas para tus arepas',
    cta: 'Consultar',
    bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 3,
    title: 'Café Premium',
    subtitle: 'Molido e Instantáneo',
    description: 'El mejor café para tu negocio',
    cta: 'Descubrir',
    bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  }
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleCTAClick = (e) => {
    e.preventDefault()
    const el = document.getElementById('products')
    if (window.location.pathname === '/') {
      if (el) el.scrollIntoView({ behavior: 'auto' })
    } else {
      sessionStorage.setItem('pendingScroll', 'products')
      navigate('/')
    }
  }

  const goToSlide = (index) => {
    setCurrent(index)
  }

  return (
    <section className="hero" id="root">
      <div className="hero-slider">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`hero-slide ${index === current ? 'active' : ''}`}
            style={{ background: banner.bg }}
          >
            <div className="hero-overlay">
              <div className="hero-content container">
                <h1>{banner.title}</h1>
                <p className="subtitle">{banner.subtitle}</p>
                <p className="description">{banner.description}</p>
                <button className="btn-primary" onClick={handleCTAClick}>
                  {banner.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="hero-dots">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === current ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
