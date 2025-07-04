// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';
import { loginUser } from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    await loginUser(credentials); // sets cookie
     setUser({ email: credentials.email });
  };

  const logout = () => {
    document.cookie = 'access_token=; Max-Age=0'; // clear cookie manually if needed
    setUser(null);
  };


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
