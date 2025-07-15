import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser } from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To wait before redirect

  // 🔁 On refresh, get user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('breevo_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
    setLoading(false); // ✅ Done checking
  }, []);

  // 🟢 Login function
  const login = async (credentials) => {
    await loginUser(credentials); // You handle this API to verify
    const userData = { email: credentials.email };
    setUser(userData);
    localStorage.setItem('breevo_user', JSON.stringify(userData)); // Store login
  };

  // 🔴 Logout function
  const logout = () => {
    localStorage.removeItem('breevo_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
