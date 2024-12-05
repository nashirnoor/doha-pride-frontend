// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { User, Lock, Plane, MapPin, Mail, UserPlus } from 'lucide-react';

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
      localStorage.setItem('userId',response.data.user.id)
      localStorage.setItem('userEmail',response.data.user.email)
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <img src="navbarlogo.svg" alt="TravelEase Logo" className="h-14  w-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-1">Create an account</h2>
            <p className="text-sm text-gray-600">Join us and start your journey</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded-md text-center text-sm">
                {error}
              </div>
            )}
            <div>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-sm"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <User className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" aria-hidden="true" />
              </div>
            </div>
            <div>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Mail className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" aria-hidden="true" />
              </div>
            </div>
            <div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Lock className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" aria-hidden="true" />
              </div>
            </div>
            <div>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 text-sm"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <Lock className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" aria-hidden="true" />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 transition-colors duration-200"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-xs text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-cyan-500 hover:text-cyan-400">
              Sign in
            </Link>
          </p>
        </div>
        <div className="lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-400 opacity-90"></div>
          <img
            src="/images/login-image.jpeg"
            alt="Travel destination"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
            <UserPlus className="h-16 w-16 mb-4 animate-pulse" />
            <h3 className="text-2xl font-bold mb-2 text-center">Join Our Community</h3>
            <p className="text-sm text-center max-w-md mb-4">
              Sign up to access exclusive travel deals and start planning your dream vacations.
            </p>
            <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-3 py-1">
              <MapPin className="h-4 w-4" />
              <span className="text-xs font-medium">Discover 1000+ destinations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default Signup;