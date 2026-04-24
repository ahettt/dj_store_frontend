import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

function Layout() {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <Header />

      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '20px' }}>
          <Outlet />
        </main>
      </div>

      <footer style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid #ddd', marginTop: '20px' }}>
        <p>© 2026 OverPro Store. Первый курс — полёт нормальный!</p>
      </footer>
    </div>
  );
}

export default Layout;