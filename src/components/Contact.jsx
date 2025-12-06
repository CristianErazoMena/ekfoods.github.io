import React, { useState } from 'react'
import '../styles/contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')




  return (
    <section className="contact container">
      <h2>Contacto</h2>
      <p className="lead">Escríbenos y nos pondremos en contacto contigo.</p>
      <div className="contact-info-block">
        <p>
          <span className="ci-icon" aria-hidden>
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" fill="currentColor"/>
            </svg>
          </span>
          <span className="ci-text">Av. Aviación 415 - La Victoria, Centro Comercial 3 de Febrero, Stand #1260</span>
        </p>
        <p className="ci-ref">Referente: Frente a la estación Gamarra</p>
        <p>
          <span className="ci-icon" aria-hidden>
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.2 2.2z" fill="currentColor"/>
            </svg>
          </span>
          <span className="ci-text">+51 999 933 689</span>
        </p>
        <p>
          <span className="ci-icon" aria-hidden>
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
            </svg>
          </span>
          <span className="ci-text">ekfoods1.0@gmail.com</span>
        </p>
      </div>

      <div className="contact-map">
        <iframe
          title="Mapa - EK Foods"
          src="https://www.google.com/maps?q=Av%20Aviacion%20415%20La%20Victoria%20Centro%20Comercial%203%20de%20Feb%20Stand%201260&output=embed"
          width="600"
          height="320"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
}
