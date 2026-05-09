import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import AuthModal from './AuthModal';

function Header() {
    const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { isLoggedIn, logout } = useContext(AuthContext);

  // Состояние для управления окном
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSearch = (e) => { /* ... твой текущий код поиска ... */ };

  return (
    <header style={{ /* твои стили */ }}>
      {/* ... логотип и поиск ... */}

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link to="/cart" style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>
          Корзина ({totalItems})
        </Link>

        {isLoggedIn ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>

            {/* Ссылка вокруг аватарки */}
            <Link to="/profile" title="Перейти в личный кабинет">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="User Avatar"
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #ccc', cursor: 'pointer', display: 'block' }}
              />
            </Link>

            {/* Кнопка выхода */}
            <button
              onClick={logout}
              style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Выйти
            </button>

          </div>
        ) : (
          <button
            onClick={() => setIsModalOpen(true)}
            style={{ padding: '8px 15px', cursor: 'pointer', backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '5px' }}
          >
            Войти / Регистрация
          </button>
        )}
      </div>

      {/* Вызываем наш компонент модального окна в самом низу */}
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </header>
  );
}

export default Header;