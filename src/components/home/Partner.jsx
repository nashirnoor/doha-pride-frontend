import React from 'react';
import { motion } from 'framer-motion';

const Partner = () => {
  const logos = [
    'images/partners/partner1.jpg',
    'images/partners/partner2.png',
    'images/partners/partner3.jpg',
    'images/partners/partner4.png',
  ];
  const doubledLogos = [...logos, ...logos];

  return (
    <section className="py-16 px-8 overflow-hidden bg-slate-50 mt-14">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              type: "spring",
              stiffness: 80
            }}
            className="text-5xl font-serif text-maroon mb-4"
          >
            Our Partners
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              type: "spring",
              stiffness: 70
            }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            We collaborate with top-tier travel organizations and local experts to bring you extraordinary experiences that go beyond traditional tourism.
          </motion.p>
        </div>

        <div className="overflow-hidden whitespace-nowrap relative py-5 group">
          <div className="inline-block animate-scroll sm:animate-scroll-fast hover:pause">
            {doubledLogos.map((logo, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="inline-block mx-[60px]  transition-all duration-300 ease-in-out"
              >
                <img
                  src={logo}
                  alt={`Partner Logo ${(index % logos.length) + 1}`}
                  className="w-64 h-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partner;