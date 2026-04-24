import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://api.overpro.fit/api/v1/products/')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Ошибка API:", err));
  }, []);

  return (
    <div>
      <h1>OverPro Store</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid black', padding: '10px' }}>
            <h3>{product.title || product.name}</h3>
            <p>{product.price} ₴</p>
            <Link to={`/product/${product.id}`}>
              <button>Подробнее</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;