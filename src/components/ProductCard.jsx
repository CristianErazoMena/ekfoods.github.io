import React from 'react'
import '../styles/products.css'

export default function ProductCard({ product, onOpen }) {
  const waDisplay = '+51 999 933 689'
  const waNumber = waDisplay.replace(/\D/g, '')
  const text = encodeURIComponent(`Hola, me interesa el producto: ${product.name}`)
  const waUrl = `https://wa.me/${waNumber}?text=${text}`

  return (
    <article 
      id={`product-card-${product.id}`}
      className="product-card" 
      onClick={() => {
        try { sessionStorage.setItem('lastProductPosition', JSON.stringify({ id: product.id, y: window.scrollY || 0 })) } catch (err) {}
        if (onOpen) onOpen(product)
      }}
      role="button" 
      tabIndex={0} 
      onKeyDown={(e) => e.key === 'Enter' && (() => { try { sessionStorage.setItem('lastProductPosition', JSON.stringify({ id: product.id, y: window.scrollY || 0 })) } catch (err) {} ; if (onOpen) onOpen(product) })()
      }
    >
      <div className="product-media">
        <img
          src={product.image}
          alt={product.name}
          draggable="false"
          className={
            product.id === 1
              ? 'scale-purisima'
              : product.id === 2
              ? 'scale-dairy'
              : product.id === 3
              ? 'scale-zelanda'
              : product.id === 13
              ? 'scale-pan-amarilla'
              : product.id === 12
              ? 'scale-pan'
              : product.id === 14
              ? 'scale-pan-cachapa'
              : product.id === 9
              ? 'scale-colun'
              : ''
          }
        />
      </div>
      <div className="product-body">
        <span className="category-badge">{product.category}</span>
        <h3 className={`product-name ${product.accent || ''}`}>{product.name}</h3>
        <p className="desc">{product.description}</p>
        <a 
          className="btn-whatsapp" 
          href={waUrl} 
          target="_blank" 
          rel="noreferrer" 
          onClick={(e) => e.stopPropagation()}
        >
          💬 Consultar
        </a>
      </div>
    </article>
  )
}
