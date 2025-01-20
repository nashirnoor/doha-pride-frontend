// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { Globe } from 'lucide-react'
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axiosInstance.post('auth/register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        user_type: 'customer',
      });

      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('userId', response.data.user.id)
      localStorage.setItem('userEmail', response.data.user.email)
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-cyan-100 flex items-center justify-center p-4">
      <div className="container mx-auto grid md:grid-cols-2 bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl">
        {/* Image Section */}
        <div className="relative hidden md:block">
          <Link to='/'>
            <img
              src="/images/login-image.jpeg"
              alt="Travel destination"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </Link>
          <div className="absolute inset-0 bg-gray-700 opacity-70"></div>
          <div className="relative z-10 text-white p-10 flex flex-col justify-center h-full">
            <h2 className="text-4xl font-bold mb-4">Welcome Traveler!</h2>
            <p className="text-xl mb-6">
              Your passport to incredible journeys starts here. Create an account and unlock a world of adventures.
            </p>
            <div className="flex items-center space-x-3 bg-white bg-opacity-20 rounded-full px-4 py-2 self-start">
              <Globe className="h-5 w-5" />
              <span className="font-medium">Explore Endless Possibilities</span>
            </div>
          </div>
        </div>

        {/* Signup Form Section */}
        <div className="p-10 flex flex-col justify-center">
          <div className="mb-8 text-center">
            <Link to='/'>

              <img
                src="navbarlogo.svg"
                alt="TravelEase Logo"
                className="mx-auto h-16 w-auto mb-4"
              />
            </Link>

            <h1 className="text-3xl font-bold text-gray-800">Create Your Account</h1>
            <p className="text-gray-600 mt-2">Start your travel story with TravelEase</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  placeholder="Choose a unique username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

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
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  placeholder="Repeat your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 text-white py-3 rounded-md hover:bg-cyan-600 transition-colors duration-300 mt-4"
            >
              Create Account
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-cyan-500 font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Signup;