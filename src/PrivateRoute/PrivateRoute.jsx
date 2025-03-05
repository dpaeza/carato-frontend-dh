import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/authContext';

const PrivateRoute = ({ requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Mientras se verifica la autenticación, muestra un loader o pantalla de carga
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
