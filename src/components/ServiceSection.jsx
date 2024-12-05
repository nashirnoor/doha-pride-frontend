import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns, faCar, faMountainSun, faTent } from '@fortawesome/free-solid-svg-icons';

const ServiceSection = () => {
  const navigate = useNavigate();
  const services = [
    { name: 'City Tour', icon: faBuildingColumns, description: 'Explore urban wonders' },
    { name: 'Transfer', icon: faCar, description: 'Luxurious transportation' },
    { name: 'Desert Safari', icon: faMountainSun, description: 'Adventure in the dunes' },
    { name: 'Camping', icon: faTent, description: 'Upscale outdoor experiences' },
  ];

  const handleClick = (name) => {
    if (name === 'Transfer') {
      navigate('/transfer');
    } else {
      navigate('/services');
    }
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-24 px-6 sm:px-10">
      <div className="container mx-auto">
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-maroon to-red-600">
              Premium Experiences
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-maroon to-red-600 mx-auto mt-4 mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Indulge in luxury and adventure with our exclusive services
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
              onClick={() => handleClick(service.name)}
            >
              <div className="bg-gradient-to-br from-maroon to-red-600 p-6 flex justify-center items-center">
                <FontAwesomeIcon 
                  icon={service.icon} 
                  className="text-5xl text-white" 
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
              <div className="px-6 pb-4">
                <button className="w-full bg-maroon text-white py-2 rounded-md hover:bg-red-700 transition duration-300">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;