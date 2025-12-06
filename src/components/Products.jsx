import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import '../styles/products.css'
import { useNavigate } from 'react-router-dom'
import { products } from '../data/products'

export default function Products({ onOpen }) {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')

  // Escuchar evento global de búsqueda y categoría desde otros componentes
  useEffect(() => {
    const handlerSearch = (e) => setSearchTerm(e.detail || '')
    // Normalize event.detail: it may be a string or an object like { category }
    const handlerCategory = (e) => {
      const d = e && e.detail
      if (!d) return setSelectedCategory('Todos')
      if (typeof d === 'string') return setSelectedCategory(d)
      if (typeof d === 'object' && d.category) return setSelectedCategory(d.category)
      // fallback to string conversion
      setSelectedCategory(String(d))
    }
    window.addEventListener('productSearch', handlerSearch)
    window.addEventListener('productCategory', handlerCategory)
    return () => {
      window.removeEventListener('productSearch', handlerSearch)
      window.removeEventListener('productCategory', handlerCategory)
    }
  }, [])

  // Si venimos de un detalle de producto, restaurar la posición previa (sin animación)
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('lastProductPosition')
      if (!raw) return
      const data = JSON.parse(raw)
      // Primero, intentar centrar el producto por id si existe en DOM
      const el = document.getElementById(`product-card-${data.id}`)
      const header = document.querySelector('.site-header')
      const headerHeight = header ? header.offsetHeight : 120

      if (el) {
        // If the card is short enough, place it just below the header with a small margin.
        // Otherwise, center it in the viewport so the product is visible.
        const elRect = el.getBoundingClientRect()
        const elHeight = elRect.height
        const viewportHeight = window.innerHeight
        const available = viewportHeight - headerHeight - 40 // 40px buffer

        if (elHeight <= available) {
          const target = window.scrollY + elRect.top - headerHeight - 20
          window.scrollTo({ top: Math.max(0, Math.floor(target)), left: 0, behavior: 'auto' })
        } else {
          // center the element vertically, then compensate for header
          const centerTarget = window.scrollY + elRect.top - (viewportHeight / 2) + (elHeight / 2)
          const compensated = centerTarget - (headerHeight / 2)
          window.scrollTo({ top: Math.max(0, Math.floor(compensated)), left: 0, behavior: 'auto' })
        }
      } else if (typeof data.y === 'number') {
        // fallback to previous Y position
        const fallback = Math.max(0, data.y - headerHeight - 20)
        window.scrollTo({ top: fallback, left: 0, behavior: 'auto' })
      }
      sessionStorage.removeItem('lastProductPosition')
    } catch (err) {
      // ignore
    }
  }, [])

  // Si venimos navegando desde otra ruta con intención (pendingScroll/pendingCategory), aplicarlas inmediatamente
  useEffect(() => {
    try {
      const pending = sessionStorage.getItem('pendingScroll')
      const pendingCat = sessionStorage.getItem('pendingCategory')
      if (!pending && !pendingCat) return

      const header = document.querySelector('.site-header')
      const headerHeight = header ? header.offsetHeight : 120

      if (pendingCat) {
        // Emitir evento para que el componente filtre
        const parsed = pendingCat
        window.dispatchEvent(new CustomEvent('productCategory', { detail: parsed }))
        sessionStorage.removeItem('pendingCategory')
      }

      const pendingSearch = sessionStorage.getItem('pendingSearch')
      if (pendingSearch) {
        window.dispatchEvent(new CustomEvent('productSearch', { detail: pendingSearch }))
        sessionStorage.removeItem('pendingSearch')
      }

      if (pending) {
        const id = pending
        if (id === 'root') {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        } else if (id === 'products') {
          const el = document.getElementById('products')
          if (el) {
            const rect = el.getBoundingClientRect()
            const absoluteTop = rect.top + window.pageYOffset
            const offset = Math.max(0, absoluteTop - headerHeight - 16)
            window.scrollTo({ top: offset, left: 0, behavior: 'auto' })
          }
        } else {
          const el = document.getElementById(id)
          if (el) {
            // place element below header
            const rect = el.getBoundingClientRect()
            const target = window.scrollY + rect.top - headerHeight - 20
            window.scrollTo({ top: Math.max(0, Math.floor(target)), left: 0, behavior: 'auto' })
          }
        }
        sessionStorage.removeItem('pendingScroll')
      }
    } catch (err) {
      // ignore
    }
  }, [])

  const filteredProducts = products.filter((p) => {
    // Normalize strings to make search accent-insensitive (e.g. 'harina' matches 'harína')
    const normalize = (s) => String(s || '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
    const term = normalize((searchTerm || '').trim())
    const nameNorm = normalize(p.name)
    const descNorm = normalize(p.description)
    const matchesSearch = !term || nameNorm.includes(term) || descNorm.includes(term)
    // Excluir productos que no tengan imagen asignada
    const hasImage = !!p.image

    // Normalize selectedCategory here (it may still be non-string)
    const catRaw = (typeof selectedCategory === 'string')
      ? selectedCategory
      : (selectedCategory && selectedCategory.category) || String(selectedCategory || 'Todos')
    const catStr = String(catRaw || 'Todos').trim()

    // Si no hay categoría seleccionada o es 'Todos', sólo aplicar búsqueda
    if (!catStr || catStr.toLowerCase() === 'todos') {
      return matchesSearch && hasImage
    }

    const catLower = normalize(catStr)

    // Mostrar productos cuya categoría coincida (case-insensitive y sin acentos)
    if (p.category && normalize(p.category).includes(catLower)) {
      return matchesSearch && hasImage
    }

    // Fallback: si el término de la categoría aparece en el nombre del producto
    if (p.name && nameNorm.includes(catLower)) {
      return matchesSearch && hasImage
    }

    return false
  })

  const handleOpen = (p) => {
    // Guardar posición actual y el id del producto para restaurar después
    try {
      // preserve last position and current search so when the user goes
      // back the filtered list remains as they left it
      sessionStorage.setItem('lastProductPosition', JSON.stringify({ id: p.id, y: window.scrollY }))
      try { sessionStorage.setItem('pendingSearch', searchTerm || '') } catch (err) {}
    } catch (err) {}
    navigate(`/product/${p.id}`)
    if (onOpen) onOpen(p)
  }

  return (
    <section className="products-section container">
      <h2>Nuestros Productos</h2>
      <p className="lead">Descubre nuestra amplia variedad de productos de calidad</p>

      {/* Barra de búsqueda */}
      <div className="products-controls">
        {/* Eliminadas las opciones de filtro por categoría por diseño del cliente */}
      </div>

      {/* Grid de productos */}
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={handleOpen} />
          ))
        ) : (
          <div className="no-products">
            <p>No se encontraron productos</p>
          </div>
        )}
      </div>

      {/* products-count eliminado a solicitud del cliente */}
    </section>
  )
}
