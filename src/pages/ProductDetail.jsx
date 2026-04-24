import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams(); // Достаем ID из адресной строки
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Делаем запрос к API за конкретным товаром
    axios.get(`https://api.overpro.fit/api/v1/products/${id}/`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Ошибка API:", err));
  }, [id]);

  if (!product) return <div>Загрузка...</div>;

  return (
    <div>
      <Link to="/">🔙 Назад к списку</Link>

      <h2>{product.title || product.name}</h2>
      {product.image && <img src={product.image} alt="" style={{ width: '200px' }} />}
      <p>Цена: {product.price} ₴</p>

      {/* Если в твоем API есть поле описания, выводим его. Если нет — просто текст */}
      <p>{product.description || "Описания пока нет."}</p>

      <button>Добавить в корзину</button>
    </div>
  );
}

export default ProductDetail;