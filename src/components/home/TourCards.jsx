import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios'
import { BASE_URL } from '../../api/Route';
import { Link } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';


export default function TourCards() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSliding, setIsSliding] = useState(false);
  const [loading, setLoading] = useState(true);

  // Spring animation setup
  const [{ x }, api] = useSpring(() => ({
    x: 0,
    config: { tension: 300, friction: 30 }
  }));

  // Fetch tours data
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(`${BASE_URL}tours/`);
        const transformedCards = response.data.map(tour => ({
          id: tour.id,
          title: tour.title,
          image: tour.image || '/fallback-image.jpg',
          description: tour.description,
          price: tour.price,
          passengers_count: tour.passengers_count
        }));
        setCards(transformedCards);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tours:', error);
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  // Navigation functions
  const nextSlide = () => {
    if (isSliding) return;
    setIsSliding(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    setTimeout(() => setIsSliding(false), 500);
  };

  const prevSlide = () => {
    if (isSliding) return;
    setIsSliding(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
    setTimeout(() => setIsSliding(false), 500);
  };

  // Gesture binding for swipe functionality
  const bindDrag = useDrag(({ active, movement: [mx], direction: [xDir], cancel }) => {
    if (active && Math.abs(mx) > 150) {
      if (xDir > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
      cancel();
    }
    api.start({ x: active ? mx : 0, immediate: active });
  });

  // Window resize handler
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate visible cards based on screen width
  const getVisibleCards = useMemo(() => {
    if (!cards.length) return [];

    const isMobile = windowWidth < 640;
    const isTablet = windowWidth >= 640 && windowWidth < 1024;

    if (isMobile) return [cards[currentIndex]];
    if (isTablet) return [
      cards[currentIndex],
      cards[(currentIndex + 1) % cards.length]
    ];
    return [
      cards[currentIndex],
      cards[(currentIndex + 1) % cards.length],
      cards[(currentIndex + 2) % cards.length]
    ];
  }, [cards, currentIndex, windowWidth]);

  // Loading state
  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  // Empty state
  if (!cards.length) {
    return <div className="text-center py-20">No tours available</div>;
  }

  // Main render
  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-8 max-w-[1440px]">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif text-gray-800 mb-4">
            Discover Your Next Adventure
          </h2>
        </div>

        <div className="relative flex justify-center items-center mb-8">
          {/* Left Navigation Arrow */}
          <div className="absolute left-0 md:left-[5%] lg:left-[5%] top-1/2 transform -translate-y-1/2 z-10">
            <button
              onClick={prevSlide}
              className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:shadow-xl"
            >
              <svg className="w-5 h-5 md:w-7 md:h-7 text-maroon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          {/* Cards Container */}
          <animated.div
            {...bindDrag()}
            style={{ x, touchAction: 'none' }}
            className="flex justify-center items-center gap-12"
          >
            {getVisibleCards.map((card) => (
              <animated.div
                key={card.id}
                className={`w-[400px] h-[550px] bg-white rounded-3xl shadow-xl overflow-hidden group relative transform transition-transform duration-500 ${isSliding ? 'scale-95' : 'scale-100'
                  }`}
              >
                {/* Card Image */}
                <div className="w-full h-full overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Default Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                  <div className="absolute bottom-8 left-0 w-full text-center">
                    <h3 className="text-3xl font-bold text-white mb-2 transform transition-all duration-500 group-hover:-translate-y-[200px] group-hover:hidden">
                      {card.title}
                    </h3>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-bold text-white mb-6">{card.title}</h3>
                    <p className="text-xl text-white mb-8 text-center">
                      Explore this wonder with us; click below to know more
                    </p>
                    <p className="text-white mb-4">Starting QAR {card.price}</p>
                    <Link to='/tours-activities'>
                      <button className="px-8 py-3 bg-white text-gray-800 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                        Explore
                      </button>
                    </Link>
                  </div>
                </div>
              </animated.div>
            ))}
          </animated.div>

          {/* Right Navigation Arrow */}
          <div className="absolute right-0 md:right-[5%] lg:right-[5%] top-1/2 transform -translate-y-1/2 z-10">
            <button
              onClick={nextSlide}
              className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:shadow-xl"
            >
              <svg className="w-5 h-5 md:w-7 md:h-7 text-maroon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-12">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`h-3 w-3 rounded-full mx-2 cursor-pointer transition-all duration-300 ${index === currentIndex ? 'bg-maroon scale-125' : 'bg-gray-300'
                }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}