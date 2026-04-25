import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Cart() {
  //Дістаємо товари та функцію видалення з контексту
  const { cartItems, removeFromCart } = useContext(CartContext);

  //Рахуємо загальну суму всіх товарів
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Ваш кошик порожній</h2>
        <Link to="/" style={{ color: 'blue', textDecoration: 'none', fontSize: '18px' }}>
          ← Повернутися до покупок
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Ваш кошик</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
        {cartItems.map((item) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ddd', paddingBottom: '15px' }}>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {item.image && (
                <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
              )}
              <div>
                <h4 style={{ margin: '0 0 10px 0' }}>{item.name}</h4>
                <p style={{ margin: 0, color: 'gray' }}>
                  {item.price} ₴  x  {item.quantity} шт.
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <h3 style={{ margin: '0 0 10px 0' }}>
                {parseFloat(item.price) * item.quantity} ₴
              </h3>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '14px' }}
              >
                Видалити
              </button>
            </div>

          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', textAlign: 'right' }}>
        <h2>Разом: <span style={{ color: 'green' }}>{totalPrice} ₴</span></h2>

        <Link to="/checkout">
          <button style={{
            padding: '15px 30px', backgroundColor: '#28a745', color: 'white',
            border: 'none', borderRadius: '5px', fontSize: '18px', cursor: 'pointer', marginTop: '10px'
          }}>
            Оформити замовлення
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;