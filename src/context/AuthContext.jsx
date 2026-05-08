import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Пытаемся достать токен из памяти браузера при загрузке сайта
  const [token, setToken] = useState(() => localStorage.getItem('access_token'));

  // Если токен есть, считаем пользователя авторизованным
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  // Функция для сохранения сессии при успешном входе
  const login = (newToken) => {
    localStorage.setItem('access_token', newToken);
    setToken(newToken);
    setIsLoggedIn(true);
  };

  // Функция для выхода из аккаунта
  const logout = () => {
    localStorage.removeItem('access_token');
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};