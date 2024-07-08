import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  const login = (email, token) => {
    const user = { email, token, role: email.includes('admin') ? 'admin' : 'user' };
    setUser(user);
    localStorage.setItem('username', JSON.stringify(user));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('username');
  };
  const isAuthenticated = !!user;
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth };