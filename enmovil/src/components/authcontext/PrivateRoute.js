import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
const PrivateRoute = ({element:Component,allowedRoles}) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)){
    return <Navigate to={user.role === 'admin' ? "/app/admin" : "/employee"} />;
  }
  return <Component/>;
};
export default PrivateRoute;
