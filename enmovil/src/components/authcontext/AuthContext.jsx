// import React, { createContext, useState, useContext, useEffect } from 'react';
// const AuthContext = createContext();
// const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const username = localStorage.getItem('username');
//     if (username) {
//       setIsAuthenticated(true);
//     }
//   }, []);
//   const login = (username, token) => {
//     localStorage.setItem('username', username);
//     localStorage.setItem('token', token);
//     setIsAuthenticated(true);
//   };
//   const logout = () => {
//       localStorage.removeItem('username');
//       localStorage.removeItem('token');
//       setIsAuthenticated(false);
//   };
//   return (
//     <AuthContext.Provider value={{ isAuthenticated,setIsAuthenticated, login, logout,loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// const useAuth = () => useContext(AuthContext);
// export { AuthProvider, useAuth };
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = (email, token) => {
    const user = { email, token, role: email.includes('admin') ? 'admin' : 'user' };
    setUser(user);
    localStorage.setItem('username', user);
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