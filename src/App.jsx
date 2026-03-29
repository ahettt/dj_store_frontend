import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('https://api.overpro.fit/api/v1/products/')
      .then(response => {
        setProducts(response.data)
      })
      .catch(error => {
        console.error("Ошибка при получении товаров:", error)
      })
  }, [])

  return (
      <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', padding: '40px' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: '#2c3e50', fontSize: '2.5rem' }}>OverPro Store</h1>
          <p style={{ color: '#7f8c8d' }}>Лучшие товары по лучшим ценам</p>
        </header>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {products.map(product => (
            <div key={product.id} style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
              transition: 'transform 0.3s ease'
            }}>
              <img
                src={product.image || 'https://via.placeholder.com/300'}
                alt={product.title}
                style={{ width: '100%', height: '220px', objectFit: 'cover' }}
              />
              <div style={{ padding: '20px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#34495e' }}>{product.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#e74c3c' }}>{product.price} ₴</span>
                  <button style={{
                    padding: '10px 15px',
                    backgroundColor: '#3498db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}>
                    В корзину
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )

export default App