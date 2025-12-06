import React from 'react'
import '../styles/about.css'
import menaImg from '../assets/mena.png'

export default function AboutUs() {
  return (
    <section className="about container">
      <div className="about-grid">
        <div className="about-content">
          <h2>NUESTRA MISIÓN</h2>
          <p>
            Comercializar y distribuir productos alimenticios que estén a las
            necesidades del cliente; asimismo brindar un producto de calidad a
            precio competitivo que contribuya de manera positiva a la sociedad.
          </p>

          <h2>Nuestra Visión</h2>
          <p>
            Consolidarnos como una empresa competitiva, con reconocimiento en el
            mercado nacional e internacional por la calidad de nuestros
            productos y servicios, mediante la innovación en procesos y el
            crecimiento sostenido.
          </p>

          <h2>Nuestros Valores</h2>
          <p>
            Promovemos el trabajo en equipo, la responsabilidad, la honestidad y
            la excelencia operativa; valores que permiten posicionar una cultura
            empresarial orientada al cliente en cada área de trabajo.
          </p>
        </div>

        <div className="about-media">
          <img src={menaImg} alt="Equipo EK FOODS" />
        </div>
      </div>
    </section>
  )
}
