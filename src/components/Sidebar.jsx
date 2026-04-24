import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Sidebar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('https://api.overpro.fit/api/v1/categories/')
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Ошибка загрузки категорий:", err);
      });
  }, []);

  return (
    <aside style={{ width: '250px', padding: '20px', borderRight: '1px solid #ddd', minHeight: '80vh' }}>
      <h3>Категории</h3>

      {categories.length === 0 && <p style={{ color: 'gray', fontSize: '14px' }}>Загрузка...</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {categories.map((cat) => (
          <li key={cat.id} style={{ marginBottom: '10px' }}>
            <Link to={`/category/${cat.slug}`} style={{ textDecoration: 'none', color: 'blue' }}>
              {cat.name || cat.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;