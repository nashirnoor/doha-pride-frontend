import React, { useState, useEffect } from 'react';
import { Calendar, Globe } from 'lucide-react';
import { BASE_URL } from '../../api/Route';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BlogCards = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/blogs/`);
        const data = response.data
        setBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading){
    return <div className="flex justify-center items-center h-screen bg-white">
   <div className="w-16 h-16 border-4 border-maroon border-t-transparent rounded-full animate-spin"></div>
 </div>
   }


  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-black mb-12 tracking-tight">
          Explore Qatar's Travel Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 transform"
            >
              <div className="relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-56 object-cover rounded-t-xl"
                />
                <div className="absolute top-4 right-4 bg-maroon text-white px-3 py-1 rounded-full text-xs">
                  {blog.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-blue-900 mb-3">{blog.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {blog.description.length > 100 ? `${blog.description.slice(0, 100)}...` : blog.description}
                </p>
                <div className="flex items-center justify-between text-gray-500 text-xs">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-blue-500" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe size={16} className="text-blue-500" />
                    <span>{blog.read_time}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/blog/${blog.id}`)}
                  className="mt-4 w-full bg-maroon text-white py-2 rounded-lg hover:bg-cyan-500 transition-colors"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCards;