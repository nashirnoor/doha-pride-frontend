import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BASE_URL } from '../../api/Route';

const BlogCard = ({ title, category, description, image, date, read_time }) => (
  <Link to='/blog'>
  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col">
    <div className="relative">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="absolute top-4 right-4 bg-maroon text-white px-3 py-1 rounded-full text-xs">
        {category}
      </div>
    </div>
    <div className="p-6 flex-grow flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-black mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="flex items-center"><Calendar size={14} className="mr-1" /> {date}</span>
        <span className="flex items-center"><Clock size={14} className="mr-1" /> {read_time}</span>
      </div>
    </div>
  </div>
  </Link>
);

const BlogSection = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/blogs/`);
        const data = response.data;
        setBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-2 text-black">Wanderlust Chronicles</h2>
        <p className="text-center text-[#1c667e] mb-12">Discover Extraordinary Travel Experiences</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to='/blog'>
            <button className="bg-maroon text-white px-8 py-3 rounded-full hover:bg-maroon-700 transition duration-300 flex items-center mx-auto">
              View All Blogs <ArrowRight size={20} className="ml-2" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;