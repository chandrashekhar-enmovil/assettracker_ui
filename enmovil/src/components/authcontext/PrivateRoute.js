// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element: Element }) => {
  const { isAuthenticated, loading } = useAuth();

  // if (loading) {
  //   return <div>Loading...</div>; // Show a loading indicator while checking auth state
  // }

  return isAuthenticated ? <Element /> : <Navigate to="/login" />;
};

export default PrivateRoute;
