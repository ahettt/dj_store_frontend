import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{ padding: '20px', background: '#f4f4f4', borderBottom: '1px solid #ddd' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '24px', fontWeight: 'bold', textDecoration: 'none', color: '#333' }}>
          OverPro Store
        </Link>
        <input type="text" placeholder="Поиск товаров..." style={{ padding: '8px', width: '300px' }} />
        <div style={{ display: 'flex', gap: '15px' }}>
          <span>Корзина (0)</span>
          <span>Профиль</span>
        </div>
      </div>
    </header>
  );
}

export default Header;