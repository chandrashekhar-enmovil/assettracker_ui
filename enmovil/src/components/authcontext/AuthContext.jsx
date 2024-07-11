  // import React, { createContext, useContext, useState, useEffect } from 'react';

  // const AuthContext = createContext();

  // const AuthProvider = ({ children }) => {
  //   const [user, setUser] = useState(null);
  //   const [loading, setLoading] = useState(true);
  //   useEffect(() => {
  //     const storedUser = localStorage.getItem('username');
  //     if (storedUser) {
  //       setUser(JSON.parse(storedUser));
  //     }
  //     setLoading(false);
  //   }, []);
  //   const login = (email, token) => {
  //     const user = { email, token, role: email.includes('admin') ? 'admin' : 'user' };
  //     setUser(user);
  //     localStorage.setItem('username', JSON.stringify(user));
  //   };
  //   const logout = () => {
  //     setUser(null);
  //     localStorage.removeItem('username');
  //   };
  //   const isAuthenticated = !!user;
  //   return (
  //     <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
  //       {children}
  //     </AuthContext.Provider>
  //   );
  // };
  // const useAuth = () => useContext(AuthContext);
  // export { AuthProvider, useAuth };
  import React, { createContext, useContext, useState, useEffect } from 'react';

// Polyfill for localStorage (if needed)
(function() {
  if (!window.localStorage) {
    window.localStorage = {
      getItem: function(sKey) {
        if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
        return unescape(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + escape(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
      },
      key: function(nKeyId) {
        return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:.(?!;))*$/).map(unescape)[nKeyId]);
      },
      setItem: function(sKey, sValue) {
        if(!sKey) { return; }
        document.cookie = escape(sKey) + "=" + escape(sValue) + "; path=/";
        this.length = document.cookie.match(/=/g).length;
      },
      length: 0,
      removeItem: function(sKey) {
        if (!sKey || !this.hasOwnProperty(sKey)) { return; }
        document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        this.length--;
      },
      hasOwnProperty: function(sKey) {
        return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
      }
    };
    window.localStorage.length = (document.cookie.match(/=/g) || window.localStorage).length;
  }
})();

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('username');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to load user from localStorage', error);
    }
    setLoading(false);
  }, []);

  const login = (email, token) => {
    const user = { email, token, role: email.includes('admin') ? 'admin' : 'user' };
    setUser(user);
    try {
      localStorage.setItem('username', JSON.stringify(user));
    } catch (error) {
      console.error('Failed to save user to localStorage', error);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('username');
    } catch (error) {
      console.error('Failed to remove user from localStorage', error);
    }
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
