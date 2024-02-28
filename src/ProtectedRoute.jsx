import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const token =  localStorage.getItem('token');
    console.log('Token:', token);
    setIsAuthenticated(token);
  }, []); 

  return isAuthenticated ? <Outlet  /> : <Navigate to="/" />;
};

export default ProtectedRoute;

