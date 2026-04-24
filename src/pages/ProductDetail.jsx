import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams(); // Дістаємо ID з URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://api.overpro.fit/api/v1/products/${id}/`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка API при загрузке товара:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2>Загрузка информации о товаре...</h2>;
  if (!product) return <h2>Товар не найден</h2>;

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'blue', marginBottom: '20px', display: 'inline-block' }}>
        ← Назад к каталогу
      </Link>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', marginTop: '20px' }}>
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', maxWidth: '400px', objectFit: 'contain', border: '1px solid #ddd', padding: '10px' }}
          />
        )}

        <div style={{ maxWidth: '600px' }}>
          <h1>{product.name}</h1>
          <h2 style={{ color: 'green' }}>{product.price} ₴</h2>

          <div style={{ marginTop: '20px', whiteSpace: 'pre-line' }}>
            <strong>Описание:</strong>
            <p>{product.description || "Описание отсутствует."}</p>
          </div>

          <button style={{
            marginTop: '30px', padding: '15px 30px', backgroundColor: '#007bff',
            color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer'
          }}>
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;