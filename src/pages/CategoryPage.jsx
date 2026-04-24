import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function CategoryPage() {
  // 1. Достаем slug категории прямо из URL (например, 'laptops' из /category/laptops)
  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Добавим состояние загрузки

  useEffect(() => {
    setLoading(true);

    // 2. Делаем запрос к API, добавляя параметр ?category=slug
    axios.get(`https://api.overpro.fit/api/v1/products/?category=${slug}`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка API при загрузке категории:", err);
        setLoading(false);
      });

  // 3. Указываем [slug] в зависимостях.
  // Это значит: "перезапускай запрос каждый раз, когда меняется категория в URL"
  }, [slug]);

  return (
    <div>
      <h1>Товары категории: {slug}</h1>

      {loading ? (
        <p>Загрузка товаров...</p>
      ) : products.length === 0 ? (
        <p>В этой категории пока нет товаров.</p>
      ) : (
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
      )}
    </div>
  );
}

export default CategoryPage;