import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/authcontext/AuthContext';
import AppNavigator from './components/mainroute/AppNavigator';
import PrivateRoute from './components/authcontext/PrivateRoute';
import LoginScreen from './components/loginpage/LoginScreen';
import { AppProvider } from './components/AppContext/AppContext';
import EmployeePage from './components/employeepage/EmployeePage';
const HomeRedirect = () => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <Navigate to={user.role === 'admin' ? "/app/admin" : "/employee"} />;
};
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/app/*" element={<PrivateRoute element={AppNavigator} allowedRoles={['admin']} />} />
          <Route path="/employee/*" element={<PrivateRoute element={() => (
              <AppProvider>
                <EmployeePage />
              </AppProvider>
          )} allowedRoles={['user']}/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
};
export default App;