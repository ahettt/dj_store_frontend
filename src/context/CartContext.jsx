import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext'; // Импортируем токен

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useContext(AuthContext); // Достаем пропуск пользователя
  const [cartItems, setCartItems] = useState([]);

  // 1. Загрузка корзины при входе на сайт или смене аккаунта
  useEffect(() => {
    if (token) {
      // Если есть токен -> грузим с сервера
      axios.get('https://api.overpro.fit/cart/api/v1/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        // Переделываем формат сервера в формат, понятный нашему React
        const serverItems = res.data.items.map(item => ({
          ...item.product,
          quantity: item.quantity
        }));
        setCartItems(serverItems);
      })
      .catch((err) => console.error("Ошибка загрузки корзины с сервера", err));
    } else {
      // Если токена нет -> грузим из памяти браузера
      const savedCart = localStorage.getItem('cart');
      if (savedCart) setCartItems(JSON.parse(savedCart));
    }
  }, [token]);

  // 2. Сохранение в LocalStorage
  useEffect(() => {
    if (!token) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, token]);

  // 3. Добавление товара
  const addToCart = (product) => {
    if (token) {
      // Отправляем на сервер
      axios.post('https://api.overpro.fit/cart/api/v1/',
        { product_id: product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        const serverItems = res.data.items.map(item => ({ ...item.product, quantity: item.quantity }));
        setCartItems(serverItems); // Обновляем состояние после ответа сервера
      });
    } else {
      // Локальное добавление
      setCartItems((prevItems) => {
        const existingItem = prevItems.find(item => item.id === product.id);
        if (existingItem) {
          return prevItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
        }
        return [...prevItems, { ...product, quantity: 1 }];
      });
    }
  };

  // 4. Удаление товара
  const removeFromCart = (productId) => {
    if (token) {
      // Удаляем на сервере
      axios.delete('https://api.overpro.fit/cart/api/v1/', {
        headers: { Authorization: `Bearer ${token}` },
        data: { product_id: productId } // axios требует передавать тело DELETE запроса через data
      })
      .then((res) => {
        const serverItems = res.data.items.map(item => ({ ...item.product, quantity: item.quantity }));
        setCartItems(serverItems);
      });
    } else {
      // Локальное удаление
      setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
    }
  };

  // 5. Полная очистка
  const clearCart = () => {
    if (token) {
      // Отправляем пустой DELETE запрос
      axios.delete('https://api.overpro.fit/cart/api/v1/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => setCartItems([]));
    } else {
      setCartItems([]);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};