import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function AuthModal({ isOpen, onClose }) {
  const { login } = useContext(AuthContext);

  // Переключатель между Входом и Регистрацией
  const [isLoginView, setIsLoginView] = useState(true);

  // Состояния для полей формы
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Если окно закрыто, вообще ничего не рендерим
  if (!isOpen) return null;

  // Очистка полей при переключении
  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError('');
    setUsername('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLoginView) {
      // Логика ВХОДА
      axios.post('https://api.overpro.fit/api/token/', { username, password })
        .then((res) => {
          login(res.data.access);
          onClose(); // Закрываем окно при успехе
        })
        .catch(() => setError('Неверный логин или пароль'));
    } else {
      // Логика РЕГИСТРАЦИИ
      axios.post('https://api.overpro.fit/accounts/api/register/', { username, password })
        .then(() => axios.post('https://api.overpro.fit/api/token/', { username, password }))
        .then((res) => {
          login(res.data.access);
          onClose(); // Закрываем окно при успехе
        })
        .catch(() => setError('Ошибка регистрации. Возможно, логин занят.'));
    }
  };

  return (
    // Затемненный фон
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>

      // Само белое окно
      <div style={{
        backgroundColor: 'white', padding: '30px', borderRadius: '10px',
        width: '100%', maxWidth: '400px', position: 'relative'
      }}>

        {/* Кнопка закрытия (крестик) */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '10px', right: '15px',
          background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer'
        }}>
          ✖
        </button>

        <h2 style={{ marginTop: 0 }}>{isLoginView ? 'Вход' : 'Регистрация'}</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          <input
            required type="text" placeholder="Логин"
            value={username} onChange={(e) => setUsername(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <input
            required type="password" placeholder="Пароль"
            value={password} onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{
            padding: '12px', backgroundColor: isLoginView ? '#007bff' : '#28a745',
            color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'
          }}>
            {isLoginView ? 'Войти' : 'Создать аккаунт'}
          </button>
        </form>

        {/* Переключатель режима */}
        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
          {isLoginView ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
          <span onClick={toggleView} style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}>
            {isLoginView ? 'Зарегистрироваться' : 'Войти'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthModal;