import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Header() {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Состояние для хранения того, что вводит пользователь
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Функция, которая срабатывает при нажатии "Найти"
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Перенаправляем на главную с параметром поиска
      navigate(`/?search=${searchTerm}`);
    } else {
      // Если поле пустое, просто возвращаем на главную
      navigate('/');
    }
  };

  return (
    <header style={{ padding: '20px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
        <h2>OverPro Store</h2>
      </Link>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Искать..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
          Найти
        </button>
      </form>

      <Link to="/cart" style={{ textDecoration: 'none', color: 'black', fontSize: '18px' }}>
        Корзина ({totalItems})
      </Link>
    </header>
  );
}

export default Header;