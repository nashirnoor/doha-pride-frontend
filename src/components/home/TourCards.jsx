import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../api/Route';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const LoadingSpinner = () => (
  <div className="w-full h-[75vh] flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-600"></div>
  </div>
);

const TourCardCarousel = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(`${BASE_URL}tours/`);
        const transformedTours = response.data.map(tour => ({
          id: tour.id,
          title: tour.title,
          image: tour.image || '/fallback-image.jpg',
          description: tour.description,
          price: tour.price,
          duration: tour.duration || '3 Days',
          location: tour.location
        }));
        setTours(transformedTours);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tours:', error);
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!tours.length) {
    return <div className="text-center py-20">No tours available</div>;
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
    <div className="container mx-auto px-8 max-w-[1440px]">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 80
          }}
         className="text-5xl font-serif text-transparent bg-clip-text bg-black mb-4">
          Discover Extraordinary Journeys
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 80
          }} 
        className="text-xl text-maroon max-w-2xl mx-auto">
          Embark on adventures that will transform your perspective and create lifelong memories
        </motion.p>
      </div>
  
      <Slider {...settings} className="custom-slick-slider">
        {tours.map((tour) => (
          <div key={tour.id} className="p-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6,
                type: "spring",
                stiffness: 80
              }}
              className="group relative bg-white rounded-3xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl shadow-md"
            >
              <div className="relative h-96 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/70 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <img 
                  src={tour.image} 
                  alt={tour.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Price Tag */}
                <div className="absolute top-4 right-4 z-20 bg-white/90 px-4 py-2 rounded-full text-xl font-bold text-maroon">
                  QAR {tour.price}
                </div>
  
                {/* Hover Description Overlay */}
                <div className="absolute inset-0 z-20 bg-transparent flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-center max-w-md bg-black/50 p-6 rounded-xl">
                    <p className="text-lg font-medium line-clamp-4">
                      {tour.description}
                    </p>
                  </div>
                </div>
              </div>
  
              <div className="p-6 relative z-30">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-2">
                      {tour.title}
                    </h3>
                    {tour.location && (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm">{tour.location}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 text-gray-900">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">{tour.duration}</span>
                  </div>
                </div>
  
                <Link to={`/tours-details/${tour.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-maroon text-white py-3 rounded-lg transition-all mt-4"
                  >
                    Explore Tour Details
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        ))}
      </Slider>
  
      {tours.length > 9 && (
        <div className="text-center mt-12">
          <Link to="/tours">
            <button className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg">
              View All Adventures
            </button>
          </Link>
        </div>
      )}
    </div>
  </div>
  );
};

export default TourCardCarousel;