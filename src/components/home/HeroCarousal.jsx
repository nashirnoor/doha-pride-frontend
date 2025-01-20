import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../api/Route';

const LoadingSpinner = () => (
  <div className="w-full h-[75vh] flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-600"></div>
  </div>
);

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/banners-home/`);
        setSlides(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load banners');
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [slides]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="w-full h-[75vh] flex items-center justify-center">{error}</div>;
  }

  if (slides.length === 0) {
    return <div className="w-full h-[75vh] flex items-center justify-center">No banners</div>;
  }

  return (
    <div className="relative w-full h-[75vh] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          className="absolute w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ 
            opacity: 1,
            scale: 1.1,
            transition: {
              opacity: { duration: 0.5 },
              scale: { duration: 6, ease: "linear" }
            }
          }}
          exit={{ opacity: 0 }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-lg">
            <h1 
            className="text-4xl md:text-5xl lg:text-7xl font-helvetica text-white mb-4 transition-all duration-300">
              {slides[currentSlide].title}
            </h1>
            <p className="text-base md:text-xl text-white mb-6">
              {slides[currentSlide].description}
            </p>
            <Link to='/tours-activities'>
              <button className="bg-cyan-600 hover:bg-black text-white font-bold py-2 px-4 rounded transition duration-300">
                Find More
              </button>
            </Link>
          </div>
        </div>
      </div>
     
      {/* Thumbnail navigation */}
      <div className="absolute bottom-8 right-8 flex flex-col space-y-2">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-16 md:w-20 h-10 md:h-12 overflow-hidden rounded transition-all duration-300 ${
              index === currentSlide ? 'ring-2 ring-white' : 'opacity-70 hover:opacity-100'
            }`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
