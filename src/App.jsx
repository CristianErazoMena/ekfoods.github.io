import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import Products from './components/Products'
import ProductDetail from './components/ProductDetail'
import AboutUs from './components/AboutUs'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { HashRouter, Routes, Route, useLocation, useParams, useNavigationType } from 'react-router-dom'
import products from './data/products'

console.log('App.jsx loaded, products:', products ? products.length : 0)

function ScrollToTop() {
  const { pathname } = useLocation()
  const navType = useNavigationType()

  useEffect(() => {
    // Only scroll to top on programmatic navigation (not on refresh or back/forward)
    if (navType === 'POP') return
    if (navType === 'PUSH') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [pathname, navType])
  
  return null
}

export default function App() {
  console.log('App rendering')
  return (
    <HashRouter>
      <div className="app-root">
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Categories />
                  <section id="products">
                    <Products />
                  </section>
                    {/* About moved to its own route /about */}
                  <section id="contact">
                    <Contact />
                  </section>
                </>
              }
            />
              <Route
                path="/about"
                element={<AboutUs />}
              />
            <Route
              path="/product/:id"
              element={<RouteWrapper />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}

function RouteWrapper() {
  // Use React Router hooks so this wrapper re-renders when the route param changes
  const params = useParams()
  const id = params && params.id ? parseInt(params.id, 10) : null
  const product = products.find((p) => p.id === id)
  return <ProductDetail product={product} />
}
