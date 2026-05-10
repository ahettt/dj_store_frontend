import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function ProductReviews({ productId }) {
  const { token } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  // Загружаем отзывы при открытии компонента
  useEffect(() => {
    if (!productId) return; // Защита: ждем, пока передадут ID товара

    axios.get(`https://api.overpro.fit/api/v1/products/${productId}/reviews/`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Ошибка загрузки отзывов:", err));
  }, [productId]);

  // Отправка нового отзыва
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    axios.post(`https://api.overpro.fit/api/v1/products/${productId}/reviews/`,
      { rating, comment },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res) => {
      // Добавляем новый отзыв в самое начало списка
      setReviews([res.data, ...reviews]);
      setComment(''); // Очищаем поле текста
      setRating(5);   // Сбрасываем оценку на 5
    })
    .catch((err) => {
      if (err.response && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Произошла ошибка при отправке отзыва.');
      }
    });
  };

  const renderStars = (currentRating) => {
    return '★'.repeat(currentRating) + '☆'.repeat(5 - currentRating);
  };

  return (
    <div style={{ marginTop: '50px', borderTop: '2px solid #eee', paddingTop: '30px' }}>
      <h3>Отзывы покупателей ({reviews.length})</h3>

      {token ? (
        <form onSubmit={handleSubmit} style={{ marginBottom: '40px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef' }}>
          <h4 style={{ marginTop: 0, marginBottom: '15px' }}>Оставить отзыв</h4>

          {error && <p style={{ color: '#dc3545', fontWeight: 'bold' }}>{error}</p>}

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Оценка:</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', width: '200px', cursor: 'pointer' }}
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
              <option value={4}>⭐⭐⭐⭐ (4/5)</option>
              <option value={3}>⭐⭐⭐ (3/5)</option>
              <option value={2}>⭐⭐ (2/5)</option>
              <option value={1}>⭐ (1/5)</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Комментарий:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Что вам понравилось или не понравилось в этом товаре?"
              style={{ width: '100%', minHeight: '100px', padding: '12px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '15px', resize: 'vertical' }}
              required
            />
          </div>

          <button type="submit" style={{ padding: '12px 25px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
            Отправить отзыв
          </button>
        </form>
      ) : (
        <div style={{ padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px', color: '#856404', marginBottom: '40px', border: '1px solid #ffeeba' }}>
          <strong>Хотите оставить отзыв?</strong> Пожалуйста, войдите в свой аккаунт или зарегистрируйтесь.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {reviews.length === 0 ? (
          <p style={{ color: '#6c757d', fontStyle: 'italic' }}>На этот товар пока нет отзывов. Станьте первым!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <strong style={{ fontSize: '16px' }}>👤 {review.user_name}</strong>
                <span style={{ color: '#ffc107', fontSize: '20px', letterSpacing: '2px' }}>
                  {renderStars(review.rating)}
                </span>
              </div>
              <p style={{ margin: '0 0 10px 0', color: '#333', lineHeight: '1.5' }}>{review.comment}</p>
              <small style={{ color: '#999' }}>
                {new Date(review.created_at).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' })}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductReviews;