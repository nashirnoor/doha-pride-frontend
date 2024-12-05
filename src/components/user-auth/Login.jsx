// src/components/Login.js
import React, { useState } from 'react';
import axiosInstance from '../../utils/axios';
import { Link,useNavigate } from 'react-router-dom';
import { User, Lock, Plane, MapPin } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('auth/login/', JSON.stringify(formData),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const { refresh, access } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('userId',response.data.user.id)
      localStorage.setItem('userEmail',response.data.user.email)

     
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
          <div className="mb-10">
            <img src="navbarlogo.svg" alt="TravelEase Logo" className="h-12 w-auto mb-6" />
            <h2 className="text-4xl font-mono text-gray-800 mb-2">Welcome back</h2>
            <p className="text-gray-600">Sign in to continue your journey</p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 text-red-600 p-4 rounded-lg text-center">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                <User className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" aria-hidden="true" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 sm:text-sm"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Lock className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" aria-hidden="true" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-cyan-400 focus:ring-cyan-400 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-cyan-500 hover:text-cyan-400">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 transition-colors duration-200"
              >
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-cyan-500 hover:text-cyan-400">
              Sign up for free
            </Link>
          </p>
        </div>
        <div className="lg:w-1/2 relative overflow-hidden">
  {/* Dark overlay - adjusted opacity and gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-gray-900/90 opacity-75 z-10"></div>
  
  {/* Background image */}
  <img
    src="/images/login-image.jpeg"
    alt="Travel destination"
    className="absolute inset-0 w-full h-full object-cover"
  />
  
  {/* Content - added z-20 to ensure it appears above the overlay */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12 z-20">
    <Plane className="h-20 w-20 mb-6 animate-pulse" />
    <h3 className="text-3xl font-bold mb-4 text-center text-cyan-500">Explore Qatar With Us</h3>
    <p className="text-xl text-center max-w-md">
      Sign in to unlock exclusive travel deals and start planning your next adventure.
    </p>
    <div className="mt-8 flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2">
      <MapPin className="h-5 w-5" />
      <span className="text-sm font-medium">Over 1000+ destinations</span>
    </div>
  </div>
</div>
      </div>
    </div>
);
};

export default Login;