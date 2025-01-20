import React from 'react';
import { Navigate, Route } from 'react-router-dom';

export const AdminProtectedRoute = ({ children, requiredUserTypes }) => {
    // Get user type from localStorage
    const userTypeString = localStorage.getItem('user_type');
    const userType = userTypeString ? JSON.parse(userTypeString) : null;
  
    // Check if user is logged in and has required user type
    const isAuthorized = userType && requiredUserTypes.includes(userType);
  
    if (!isAuthorized) {
      // Redirect to login if not authorized
      return <Navigate to="/admin" replace />;
    }
  
    return children;
  };
  
  // Login Protection Component
  export const LoginProtection = ({ children }) => {
    // Check if user is already logged in
    const userTypeString = localStorage.getItem('user_type');
    const userType = userTypeString ? JSON.parse(userTypeString) : null;
  
    if (userType) {
      // Redirect to admin home if already logged in
      return <Navigate to="/admin-home" replace />;
    }
  
    return children;
  };