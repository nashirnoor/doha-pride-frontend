// src/components/Login.js
import React, { useState } from 'react';
import axiosInstance from '../../utils/axios';
import { Link,useNavigate } from 'react-router-dom';
import { User, Lock, Plane, MapPin, Globe } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-cyan-100 flex items-center justify-center p-4">
    <div className="container mx-auto grid md:grid-cols-2 bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl">
      {/* Login Form Section */}
      <div className="p-10 flex flex-col justify-center">
        <div className="mb-8 text-center">
          <Link to='/'>
          <img
            src="navbarlogo.svg"
            alt="TravelEase Logo"
            className="mx-auto h-16 w-auto mb-4"
          />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to continue your journey</p>
        </div>
  
        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-center">
              {error}
            </div>
          )}
  
          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
  
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
  
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-cyan-500 focus:ring-cyan-400 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              {/* <div className="text-sm">
                <a href="#" className="text-cyan-500 hover:underline">
                  Forgot password?
                </a>
              </div> */}
            </div>
          </div>
  
          <button
            type="submit"
            className="w-full bg-cyan-500 text-white py-3 rounded-md hover:bg-cyan-600 transition-colors duration-300 mt-4"
          >
            Sign In
          </button>
        </form>
  
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-cyan-500 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
  
      {/* Image Section */}
      <div className="relative hidden md:block">
        <img
          src="/images/login-image.jpeg"
          alt="Travel destination"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-700 opacity-70"></div>
        <div className="relative z-10 text-white p-10 flex flex-col justify-center h-full">
          <h2 className="text-4xl font-bold mb-4">Welcome Traveler!</h2>
          <p className="text-xl mb-6">
            Your passport to incredible journeys continues here. Sign in and resume your adventure.
          </p>
          <div className="flex items-center space-x-3 bg-white bg-opacity-20 rounded-full px-4 py-2 self-start">
            <Globe className="h-5 w-5" />
            <span className="font-medium">Continue Your Journey</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default Login;