import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/categories.css'
import productImages from '../assets/images'

const categories = [
  {
    id: 0,
    name: 'Todos',
    icon: null,
    description: 'Ver todos los productos',
    color: '#6b7280'
  },
  {
    id: 1,
    name: 'Leche en Polvo',
    // use the uploaded preview image for leche
    icon: productImages.leche_preview || productImages.leche_purisima || productImages.leche_dairy || null,
    description: 'Leche de calidad internacional',
    color: '#667eea'
  },
  {
    id: 2,
    name: 'Harinas',
    // use the uploaded preview image for harina de maiz
    icon: productImages.harina_preview || productImages.harina_pan || productImages.harina_arepasan || null,
    description: 'P.A.N y Arepasan',
    color: '#f5576c'
  },
  {
    id: 3,
    name: 'Café',
    // use the uploaded preview image for granos de cafe
    icon: productImages.cafe_preview || productImages.cafe || productImages.cafe2 || null,
    description: 'Molido e instantáneo',
    color: '#8B4513'
  },
  {
    id: 4,
    name: 'Abarrotes',
    icon: productImages.aceite || productImages.arroz || productImages.azucar || null,
    description: 'Arroz, azúcar y más',
    color: '#4facfe'
  }
]

export default function Categories() {
  const navigate = useNavigate()
  const handleCategoryClick = (categoryName) => {
    const el = document.getElementById('products')
    if (window.location.pathname === '/') {
      if (el) el.scrollIntoView({ behavior: 'auto' })
      const evt = new CustomEvent('productCategory', { detail: categoryName })
      window.dispatchEvent(evt)
    } else {
      // Persist intent and navigate to home; Products will handle it on mount
      sessionStorage.setItem('pendingScroll', 'products')
      sessionStorage.setItem('pendingCategory', categoryName)
      navigate('/')
    }
  }

  return (
    <section className="categories-section">
      <div className="container">
        {productImages.vaca && (
          <img src={productImages.vaca} alt="Banner Vaca" className="category-banner" />
        )}
        <h2>Categorías Destacadas</h2>
        <p className="lead">Explora nuestros productos por categoría</p>
        <div className="categories-grid">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="category-card"
              onClick={() => handleCategoryClick(cat.name)}
              style={{ '--cat-color': cat.color }}
            >
              <div className="category-icon">
                {cat.icon ? (
                  typeof cat.icon === 'string' ? (
                    <img src={cat.icon} alt={cat.name} />
                  ) : (
                    cat.icon
                  )
                ) : null}
              </div>
              <h3>{cat.name}</h3>
              <p>{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
