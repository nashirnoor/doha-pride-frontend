import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// Protected Route Component
export const ProtectedRoute = ({ children, requiredUserType }) => {
  const userType = JSON.parse(localStorage.getItem('user_type'));
  const isLoggedIn = localStorage.getItem('user_type') !== null;

  if (!isLoggedIn) {
    // Redirect to login if not logged in
    return <Navigate to="/agency-login" replace />;
  }

  if (requiredUserType && userType !== requiredUserType) {
    // Redirect if user type doesn't match
    return <Navigate to="/agency-login" replace />;
  }

  return children;
};

export const RedirectIfLoggedIn = ({ children }) => {
  const isLoggedIn = localStorage.getItem('user_type') !== null;

  if (isLoggedIn) {
    // Redirect to home page if already logged in
    return <Navigate to="/agency-home" replace />;
  }

  return children;
};