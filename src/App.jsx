import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Используем https, чтобы не было ошибок безопасности
    axios.get('https://api.overpro.fit/api/v1/products/')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Ошибка API:", err);
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>OverPro Store</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
            {product.image && <img src={product.image} alt="" style={{ width: '100%' }} />}
            <h3>{product.title || product.name}</h3>
            <p>{product.price} ₴</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;