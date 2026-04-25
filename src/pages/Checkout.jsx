import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import axios from 'axios';

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  // Состояние для полей формы
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    postal_code: '',
    city: ''
  });

  // Функция для обновления полей при вводе
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Обработка отправки формы
  const handleSubmit = (e) => {
    e.preventDefault(); // Останавливаем перезагрузку страницы

    if (cartItems.length === 0) {
      alert("Ваша корзина пуста!");
      return;
    }

    // Подготавливаем данные для бэкенда
    const orderData = {
      ...formData,
      items: cartItems.map(item => ({
        product_id: item.id,
        price: item.price,
        quantity: item.quantity
      }))
    };

    // Отправляем POST-запрос на эндпоинт
    axios.post('https://api.overpro.fit/orders/api/v1/create/', orderData)
      .then((res) => {
        console.log("Успех:", res.data);
        clearCart(); // Очищаем корзину
        setSuccess(true); // Показываем сообщение об успехе
      })
      .catch((err) => {
        console.error("Ошибка при оформлении заказа:", err);
        alert("Произошла ошибка при оформлении заказа. Попробуйте еще раз.");
      });
  };

  if (success) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1 style={{ color: 'green' }}>Спасибо за заказ! 🎉</h1>
        <p>Ваш заказ успешно оформлен. Мы скоро свяжемся с вами.</p>
        <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
          Вернуться на главную
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Оформление заказа</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>

        <input required type="text" name="first_name" placeholder="Имя" value={formData.first_name} onChange={handleChange} style={{ padding: '10px' }} />
        <input required type="text" name="last_name" placeholder="Фамилия" value={formData.last_name} onChange={handleChange} style={{ padding: '10px' }} />
        <input required type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={{ padding: '10px' }} />
        <input required type="text" name="city" placeholder="Город" value={formData.city} onChange={handleChange} style={{ padding: '10px' }} />
        <input required type="text" name="address" placeholder="Адрес доставки" value={formData.address} onChange={handleChange} style={{ padding: '10px' }} />
        <input required type="text" name="postal_code" placeholder="Почтовый индекс" value={formData.postal_code} onChange={handleChange} style={{ padding: '10px' }} />

        <button type="submit" style={{
          padding: '15px', backgroundColor: '#28a745', color: 'white',
          border: 'none', borderRadius: '5px', fontSize: '18px', cursor: 'pointer', marginTop: '10px'
        }}>
          Подтвердить заказ
        </button>
      </form>
    </div>
  );
}

export default Checkout;