import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/unauthorized" />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role;

    if (userRole !== allowedRole) {
      return <Navigate to="/unauthorized" />;
    }

    return children; 

  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/unauthorized" />;
  }
}

export default ProtectedRoute;
