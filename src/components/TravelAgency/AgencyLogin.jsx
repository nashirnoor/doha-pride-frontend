import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";

export default function AgencyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axiosInstance.post('auth/login/', {
        email,
        password
      });
      console.log(response,"ress")
      const { user, access, refresh } = response.data;
      if (user.user_type !== 'travel_agency') {
        setError("Access denied. Admin or staff privileges required.");
        return;
      }
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('user_type',JSON.stringify(user.user_type))
      console.log(localStorage.getItem('user_type'),"lllll")
      navigate('/agency-home');
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-200 to-red-200">
      <div className="max-w-md w-full mx-4">
        {/* Card Container */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Logo Section */}
          <div className="p-6 bg-white text-center">
            <div className="mb-4">
              <img
                src="navbarlogo.svg" 
                alt="Travel Admin Logo"
                className="mx-auto h-20 w-auto"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Travel Agency
            </h2>
            <p className="text-gray-600 mt-2">
              Welcome back! Please log in to continue
            </p>
          </div>

          {/* Login Form */}
          <div className="p-6 pt-0">
          {error && (
            <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="mb-4">
                <label 
                  htmlFor="email" 
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label 
                  htmlFor="password" 
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
              type="submit"
              className="w-full bg-cyan-600 text-white py-2 px-4 rounded-lg hover:bg-maroon focus:ring-4 focus:ring-blue-300 transition duration-200"
            >
              Sign In
            </button>
            </form>

            {/* Footer Text */}
            <div className="mt-6 text-center text-sm text-gray-600">
              © 2024 Doha Pride Agency Portal. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}