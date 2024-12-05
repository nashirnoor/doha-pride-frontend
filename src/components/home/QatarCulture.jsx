import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const QatarCulture = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const componentRef = useRef(null);
    const sectionRefs = useRef([]);
    const imageContainerRef = useRef(null);
  
    const sections = [
      {
        title: "Experience the Cultural Beauty of Qatar",
        image: "/images/qatarculture.jpg",
        description: "In Qatar, the blend of traditional Arabian culture and modern luxury comes alive in every corner. From ancient Bedouin traditions to the cosmopolitan charm of Doha, Qatar offers a vibrant cultural landscape that captures the spirit of the past and the future.",
        buttonText: "Discover More"
      },
      {
        title: "Desert Safari: An Unforgettable Adventure",
        image: "/images/one.jpg",
        description: "Embark on a thrilling desert safari and experience the raw beauty of Qatar's golden dunes. Feel the rush of adrenaline as you navigate the rolling sand hills in a 4x4, or enjoy a more serene experience atop a majestic camel.",
        buttonText: "Book Your Safari"
      },
      {
        title: "Experience the Cultural Beauty of Qatar",
        image: "/images/five.jpg",
        description: "In Qatar, the blend of traditional Arabian culture and modern luxury comes alive in every corner. From ancient Bedouin traditions to the cosmopolitan charm of Doha, Qatar offers a vibrant cultural landscape that captures the spirit of the past and the future.",
        buttonText: "Discover More"
      },
    ];
  
    useEffect(() => {
        const handleScroll = () => {
            if (componentRef.current && imageContainerRef.current) {
              const { top, bottom } = componentRef.current.getBoundingClientRect();
              const imageContainerHeight = imageContainerRef.current.offsetHeight;
              const windowHeight = window.innerHeight;
      
              if (top <= 0 && bottom >= imageContainerHeight) {
                imageContainerRef.current.style.position = 'fixed';
                imageContainerRef.current.style.top = '0';
              } else if (bottom < imageContainerHeight) {
                imageContainerRef.current.style.position = 'absolute';
                imageContainerRef.current.style.bottom = '0';
                imageContainerRef.current.style.top = 'auto';
              } else {
                imageContainerRef.current.style.position = 'absolute';
                imageContainerRef.current.style.top = '0';
                imageContainerRef.current.style.bottom = 'auto';
              }
      
              let maxVisibleSection = 0;
              let maxVisibleHeight = 0;
      
              sectionRefs.current.forEach((section, index) => {
                if (section) {
                  const rect = section.getBoundingClientRect();
                  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
                  if (visibleHeight > maxVisibleHeight) {
                    maxVisibleHeight = visibleHeight;
                    maxVisibleSection = index;
                  }
                }
              });
      
              setActiveIndex(maxVisibleSection);
            }
          };
  
      window.addEventListener('scroll', handleScroll);
      handleScroll();
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    return (
      <section
        ref={componentRef}
        className="qatar-culture-section relative bg-[#efeeeb] text-[#33241f]"
        style={{ minHeight: '220vh' }} // Increased height for more scrollable content
      >
        <div className="relative flex">
          {/* Scrollable content (left side) */}
          <div className="w-1/2 pl-12 pr-8"> {/* Added left padding */}
            {sections.map((section, index) => (
              <div
                key={index}
                ref={(el) => (sectionRefs.current[index] = el)}
                className="min-h-screen flex items-center"
              >
                <div className="w-full bg-white bg-opacity-80 p-10 rounded-2xl shadow-2xl transform hover:scale-105 transition duration-300">
                  <h2 className="text-4xl lg:text-5xl font-serif text-[#800000] mb-6 lg:mb-8 leading-tight border-b-2 border-[#800000] pb-4">
                    {section.title}
                  </h2>
                  <p className="text-lg lg:text-xl leading-relaxed mb-8 lg:mb-10 text-[#33241f]">
                    {section.description}
                  </p>
                  <Link to='/transist'>
                  <button className="mt-4 px-10 py-4 bg-[#1c667e] text-white text-lg rounded-full shadow-lg hover:bg-[#800000] transition duration-300 transform hover:translate-y-1">
                    {section.buttonText}
                  </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
  
          {/* Image container (right side) */}
          <div className="w-1/2 relative">
          <div 
            ref={imageContainerRef}
            className="w-full flex items-center justify-center"
            style={{ 
              height: '80vh',
              position: 'sticky',
              top: '50vh', 
            }}
          >
            {sections.map((section, index) => (
              <div
                key={index}
                className={`absolute inset-14 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  index === activeIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-full object-cover rounded-lg shadow-xl"
                  style={{ maxWidth: '600px', maxHeight: '800px' }} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QatarCulture;