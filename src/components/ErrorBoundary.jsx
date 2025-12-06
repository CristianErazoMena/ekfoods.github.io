import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, info: null }
    console.log('ErrorBoundary constructor')
  }

  componentDidCatch(error, info) {
    // Save error to state so we can show it in the UI
    console.error('ErrorBoundary caught error:', error, info)
    this.setState({ error, info })
  }

  render() {
    console.log('ErrorBoundary render, error:', this.state.error ? 'YES' : 'NO')
    if (this.state.error) {
      return (
        <div style={{padding: 40, fontFamily: 'Arial, sans-serif', background: '#ffe6e6'}}>
          <h2 style={{color: '#cc0000'}}>⚠️ Error en la aplicación</h2>
          <pre style={{whiteSpace: 'pre-wrap', background: '#f8d7da', padding: 12, fontSize: 12, overflow: 'auto'}}>
            {String(this.state.error.message || this.state.error)}
          </pre>
          <details style={{whiteSpace: 'pre-wrap', marginTop: 20}}>
            <summary style={{cursor: 'pointer', fontWeight: 'bold'}}>Detalles técnicos</summary>
            <pre style={{background: '#f5f5f5', padding: 12, fontSize: 10}}>
              {this.state.info && this.state.info.componentStack}
            </pre>
          </details>
        </div>
      )
    }
    return this.props.children
  }
}
