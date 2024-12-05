// src/utils/auth.js
import axiosInstance from './axios';

export const logout = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    await axiosInstance.post('auth/logout/', {
      refresh: refreshToken,
    });
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    window.location.href = '/login';
  }
};

export const isAuthenticated = () => {
    const token = localStorage.getItem('access_token');
    return !!token;
  };