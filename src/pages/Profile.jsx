import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { token, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Если пользователь не авторизован, выкидываем его на главную
    if (!token) {
      navigate('/');
      return;
    }

    // Запрашиваем историю заказов с  JWT-токеном
    axios.get('https://api.overpro.fit/orders/api/v1/user-orders/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      setOrders(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Ошибка при загрузке заказов:", err);
      setLoading(false);
    });
  }, [token, navigate]);

  if (loading) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Загрузка профиля...</h2>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>Мой кабинет</h2>
        <button
          onClick={logout}
          style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Выйти из аккаунта
        </button>
      </div>

      <h3>История заказов</h3>

      {orders.length === 0 ? (
        <p style={{ color: '#666' }}>У вас пока нет оформленных заказов. Самое время это исправить!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map((order) => {
            // Считаем общую сумму заказа
            const orderTotal = order.items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);

            return (
              <div key={order.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#f9f9f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '15px' }}>
                  <strong>Заказ #{order.id} от {new Date(order.created).toLocaleDateString()}</strong>
                  <span style={{ color: order.paid ? 'green' : 'orange', fontWeight: 'bold' }}>
                    {order.paid ? 'Оплачен' : 'Ожидает оплаты'}
                  </span>
                </div>

                <p style={{ fontSize: '14px', color: '#555', marginBottom: '15px' }}>
                  Доставка: г. {order.city}, {order.address}
                </p>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {order.items.map((item) => (
                    <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '15px' }}>
                      <span>{item.product_name} <span style={{ color: '#888' }}>(x{item.quantity})</span></span>
                      <strong>{parseFloat(item.price)} ₴</strong>
                    </li>
                  ))}
                </ul>

                <div style={{ textAlign: 'right', marginTop: '15px', paddingTop: '10px', borderTop: '1px dotted #ccc', fontSize: '18px' }}>
                  <strong>Итого: {orderTotal} ₴</strong>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Profile;