import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService, register as registerService } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('artivo_user');
    return stored ? JSON.parse(stored) : null;
  });

  const loginUser = async (email, password) => {
    const { data } = await loginService({ email, password });
    localStorage.setItem('artivo_user', JSON.stringify(data));
    setUser(data);
    toast.success(`Welcome back, ${data.user.name.split(' ')[0]}! 🎨`);
    return data;
  };

  const registerUser = async (name, email, password) => {
    const { data } = await registerService({ name, email, password });
    localStorage.setItem('artivo_user', JSON.stringify(data));
    setUser(data);
    toast.success(`Welcome to Artivo, ${data.user.name.split(' ')[0]}! 🎨`);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('artivo_user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const isAdmin = user?.user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
