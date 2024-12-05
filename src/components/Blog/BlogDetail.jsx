import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Globe, User } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../../api/Route';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/blogs/${id}/`);
        setBlog(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog details:', error);
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-maroon"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl text-gray-600">Sorry... Blog post not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Hero Image Section */}
      <div className="relative w-full h-[60vh]">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <span className="bg-maroon text-white px-4 py-1 rounded-full text-sm">
              {blog.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white">
              <div className="flex items-center space-x-2">
                <Calendar size={18} />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe size={18} />
                <span>{blog.read_time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User size={18} />
                <span>{blog.author || 'Anonymous'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Description */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {blog.description}
            </p>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {/* If your content is in HTML format, you can use dangerouslySetInnerHTML */}
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              
              {/* If your content is plain text, you can display it directly */}
              {/* <p className="text-gray-800 leading-relaxed">{blog.content}</p> */}
            </div>

            {/* Tags Section */}
            {blog.tags && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;