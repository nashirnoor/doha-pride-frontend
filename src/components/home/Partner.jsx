import React from 'react';

const Partner = () => {
    const logos = [
      'images/partners/partner1.jpg',  
      'images/partners/partner2.png',
      'images/partners/partner3.jpg',
      'images/partners/partner4.png',
    ];
    const doubledLogos = [...logos, ...logos];
  
    return (
      <section className="bg-white py-16 px-8 overflow-hidden">
        <div className="max-w-full mx-auto">
          <h2 className="text-5xl font-serif text-center text-[#1c667e] mb-12">
            Our Partners
          </h2>
          <div className="overflow-hidden whitespace-nowrap relative py-5 group">
            {/* Apply different animation speeds for mobile and larger screens */}
            <div className="inline-block animate-scroll sm:animate-scroll-fast hover:pause">
              {doubledLogos.map((logo, index) => (
                <div key={index} className="inline-block mx-[60px]">
                  <img
                    src={logo}
                    alt={`Partner Logo ${(index % logos.length) + 1}`}
                    className="w-64 h-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Partner;
  