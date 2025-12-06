import React from 'react'
import '../styles/product-detail.css'
import { useNavigate } from 'react-router-dom'
import products from '../data/products'
import ProductCard from './ProductCard'

export default function ProductDetail({ product: propProduct, onBack }) {
  const navigate = useNavigate()
  const product = propProduct || null

  const handleBack = (e) => {
    if (e && e.preventDefault) e.preventDefault()
    try {
      if (typeof window !== 'undefined' && window.history && window.history.length > 1) {
        window.history.back()
        return
      }
    } catch (err) {
      // ignore and fallback to router navigate
    }
    // fallback: navigate to home if there's no previous entry
    navigate('/')
  }

  if (!product) {
    return (
      <div className="product-detail">
        <div className="detail-container container">
          <p>Producto no encontrado.</p>
          <button className="back-btn" onClick={() => { sessionStorage.removeItem('lastProductPosition'); navigate('/') }}>← Volver</button>
        </div>
      </div>
    )
  }

  const waDisplay = '+51 999 933 689'
  const waNumber = waDisplay.replace(/\D/g, '')
  const text = encodeURIComponent(`Hola, me interesa el producto: ${product.name}`)
  const waUrl = `https://wa.me/${waNumber}?text=${text}`

  // Productos relacionados (misma categoría)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  // Información del producto
  const productInfo = [
    { label: 'Categoría', value: product.category },
    { label: 'Disponibilidad', value: 'En stock' },
    { label: 'Tipo', value: 'Producto comercial' }
  ]

  return (
    <div className="product-detail">
      <div className="detail-container container">
        <button className="back-btn" onClick={handleBack} aria-label="Volver">
          ← Volver
        </button>
        
        <div className="detail-grid">
          <div className={`detail-media ${product.id === 1 ? 'media-purisima' : product.id === 2 ? 'media-dairy' : product.id === 3 ? 'media-zelanda' : product.id === 9 ? 'media-colun' : product.id === 11 ? 'media-gelco' : product.id === 13 ? 'media-pan' : product.id === 14 ? 'media-pan' : product.id === 15 ? 'media-coffee' : product.id === 16 ? 'media-coffee' : product.id === 17 ? 'media-coffee' : product.id === 20 ? 'media-coffee' : product.id === 25 ? 'media-anis' : ''}`}>
            <div className="detail-media-inner">
              {product.id === 3 ? (
                <img
                  src={product.image}
                  alt={product.name}
                  draggable="false"
                  className={`detail-image zelanda-img`}
                  style={{ transform: 'translateY(-6%) scale(1.45)', objectPosition: 'center center' }}
                />
              ) : product.id === 18 ? (
                <img
                  src={product.image}
                  alt={product.name}
                  draggable="false"
                  className={`detail-image pan-img arepasan-img`}
                  style={{ transform: 'translateY(-14%) scale(0.9)', objectPosition: 'center center' }}
                />
              ) : product.id === 11 ? (
                <img
                  src={product.image}
                  alt={product.name}
                  draggable="false"
                  className={`detail-image gelco-img`}
                  style={{ transform: 'translateY(-4%) scale(0.95)', objectPosition: 'center center' }}
                />
              ) : product.id === 13 ? (
                <img
                  src={product.image}
                  alt={product.name}
                  draggable="false"
                  className={`detail-image pan-img`}
                  style={{ transform: 'translateY(0%) scale(1.25)', objectPosition: 'center center' }}
                />
              ) : product.id === 14 ? (
                <img
                  src={product.image}
                  alt={product.name}
                  draggable="false"
                  className={`detail-image pan-img cachapa-img`}
                  style={{ transform: 'translateY(0%) scale(1.25)', objectPosition: 'center center' }}
                />
              ) : product.id === 15 ? (
                <img
                  src={product.image}
                  alt={product.name}
                  draggable="false"
                  className={`detail-image coffee-img`}
                  style={{ transform: 'translateY(-6%) scale(0.9)', objectPosition: 'center center' }}
                />
              ) : product.id === 16 ? (
                <img
                  src={product.image}
                  alt={product.name}
                  draggable="false"
                  className={`detail-image coffee-img`}
                  style={{ transform: 'translateY(-6%) scale(0.9)', objectPosition: 'center center' }}
                />
              ) : product.id === 17 ? (
                <img
                  src={product.image}
                  alt={product.name}
                  draggable="false"
                  className={`detail-image coffee-img sello-rojo-img`}
                  style={{ transform: 'translateY(-6%) scale(0.9)', objectPosition: 'center center' }}
                />
              ) : product.id === 20 ? (
                <img
                  src={product.image}
                  alt={product.name}
                  draggable="false"
                  className={`detail-image coffee-img castellani-img`}
                  style={{ transform: 'translateY(-6%) scale(0.9)', objectPosition: 'center center' }}
                />
              ) : product.id === 25 ? (
                <img
                  src={product.image}
                  alt={product.name}
                  draggable="false"
                  className={`detail-image anis-img`}
                  style={{ transform: 'translateY(-6%) scale(0.9)', objectPosition: 'center center' }}
                />
              ) : (
                <img
                  src={product.image}
                  alt={product.name}
                  draggable="false"
                  className={`detail-image ${product.id === 1 ? 'purisima-img' : product.id === 2 ? 'dairy-img' : ''}`}
                />
              )}
            </div>
          </div>
          
          <div className="detail-body">
            <span className="category-badge">{product.category}</span>
            <h1>{product.name}</h1>
            <p className="desc">{product.description}</p>
            
            <div className="product-info">
              <h3>Información del Producto</h3>
              <dl className="info-list">
                {productInfo.map((info, index) => (
                  <div key={index} className="info-item">
                    <dt>{info.label}</dt>
                    <dd>{info.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Características y cualidades eliminadas por solicitud del usuario */}

            <div className="detail-actions">
              <a className="btn-whatsapp-large" href={waUrl} target="_blank" rel="noreferrer">
                💬 Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>Productos Relacionados</h2>
            <div className="related-grid">
              {relatedProducts.map((p) => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  onOpen={(product) => navigate(`/product/${product.id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
