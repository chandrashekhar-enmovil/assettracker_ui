import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/authcontext/AuthContext';
import AppNavigator from './components/mainroute/AppNavigator';
import PrivateRoute from './components/authcontext/PrivateRoute';
import LoginScreen from './components/loginpage/LoginScreen';
import Maincomponent from './components/joiningForms/componentsWrapper/Maincomponent';
import { AppProvider } from './components/AppContext/AppContext';
import EmployeePage from './components/employeepage/EmployeePage';

const HomeRedirect = () => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <Navigate to={user.role === 'admin' ? "/app/admin" : "/maincomponent"} />;
};
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeRedirect/>} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/app/*" element={<PrivateRoute element={AppNavigator} />} />
          <Route path="/maincomponent/*" element={<PrivateRoute element={() => (
            <AppProvider>
              <EmployeePage />
            </AppProvider>
          )} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
