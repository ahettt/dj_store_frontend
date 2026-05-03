import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    setLoading(true);

    // Динамически формируем ссылку. Если есть поиск — добавляем его.
    let url = 'https://api.overpro.fit/api/v1/products/';
    if (searchQuery) {
      url += `?search=${searchQuery}`;
    }

    axios.get(url)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка API:", err);
        setLoading(false);
      });

  // Перезапускаем запрос каждый раз, когда меняется параметр поиска
  }, [searchQuery]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>{searchQuery ? `Результаты поиска: "${searchQuery}"` : 'Все товары'}</h1>

      {loading ? (
        <p>Ищем товары...</p>
      ) : products.length === 0 ? (
        <p style={{ color: 'red', fontSize: '18px' }}>По вашему запросу ничего не найдено. Попробуйте изменить запрос.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {products.map((product) => (
            <div key={product.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', width: '250px' }}>
              {product.image && (
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'contain' }} />
              )}
              <h3 style={{ fontSize: '16px', marginTop: '10px' }}>{product.title || product.name}</h3>
              <p style={{ color: 'green', fontWeight: 'bold' }}>{product.price} ₴</p>
              <Link to={`/product/${product.id}`}>
                <button style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>Подробнее</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;