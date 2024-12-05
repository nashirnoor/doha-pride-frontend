import React, { useState, useEffect } from 'react';
import { getTransferData } from '../../api/Route';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';


const HomeTransfer = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTransferData = async () => {
      try {
        const data = await getTransferData();
        setCards(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransferData();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.floor((cards.length - 1) / 3) * 3 : prevIndex - 3));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === Math.floor((cards.length - 1) / 3) * 3 ? 0 : prevIndex + 3));
  };

  return (
    <div className="bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl text-gray-900 sm:text-5xl font-serif">
            Meet, Assist and Transfer Services
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4 font-sans">
            Explore our range of arrival and departure transfer services.
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="mt-12 relative">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
              {cards.slice(currentIndex, currentIndex + 3).map((card) => (
                <Link to="/transfer">
                <div
                  key={card.id}
                  className="bg-white overflow-hidden shadow-lg rounded-lg transform transition-all duration-300 hover:scale-105"
                >
                  <img
                    className="h-80 w-full object-cover"
                    src={card.image}
                    alt={card.name}
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 font-serif">
                      {card.name}
                    </h3>
                    <div className="flex items-center justify-between mt-6">
                      <p className="text-xl font-bold text-maroon font-sans">
                        {card.cost} QAR
                      </p>
                      <button className="bg-maroon hover:bg-maroon-600 text-white font-bold py-2 px-4 rounded font-sans">
                        More
                      </button>
                    </div>
                  </div>
                </div>
                </Link>
              ))}
            </div>
            <button
              className="bg-maroon hover:bg-maroon-600 text-white font-bold py-2 px-4 rounded-l-lg absolute left-0 top-1/2 transform -translate-y-1/2 z-10 sm:block hidden"
              onClick={handlePrev}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              className="bg-maroon hover:bg-maroon-600 text-white font-bold py-2 px-4 rounded-r-lg absolute right-0 top-1/2 transform -translate-y-1/2 z-10 sm:block hidden"
              onClick={handleNext}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeTransfer;