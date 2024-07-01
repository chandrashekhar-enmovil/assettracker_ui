import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AppNavigator from './AppNavigator';
import LoginScreen from './components/AppContext/loginpage/LoginScreen';

const AppLocator = () => {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    console.log('Checking local storage:', { username, token });
    if (username && token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  const handleLogin = () => {
    console.log('Setting isLogged to true');
    setIsLogged(true);
  };
  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('username');  
    localStorage.removeItem('token');
    setIsLogged(false);
  };
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen onLogin={handleLogin} />} />
        <Route
          path="/app/*"
          element={isLogged ? <AppNavigator onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={isLogged ? "/app" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default AppLocator;
