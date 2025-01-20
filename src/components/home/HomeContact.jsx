import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomeContact = () => {
  return (
    <div className="relative h-[500px] flex items-center overflow-hidden mt-5">
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/images/background-image.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: -1
        }}
      />

      {/* Gradient Overlay with Diagonal Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent" />

      {/* Call to Action Section */}
      <div className="relative w-full z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <div className="text-center">
              {/* Decorative Element with Animated Pseudo-Element */}
              <div className="relative inline-block mb-6">
                <div className="w-16 h-1 bg-maroon mx-auto rounded-full absolute -bottom-2 left-1/2 transform -translate-x-1/2"></div>
                <motion.h2 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    type: "spring",
                    stiffness: 80
                  }}
                className="text-4xl md:text-5xl font-extrabold mb-4 text-white font-[Poppins] leading-tight relative z-10">
                  Explore Qatar's Wonders
                </motion.h2>
              </div>
             
              <motion.p 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  type: "spring",
                  stiffness: 80
                }}
              className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto font-[Inter] leading-relaxed">
                Embark on an extraordinary journey with Doha Pride. Discover hidden gems and unforgettable experiences across Qatar.
              </motion.p>
             
              <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
                <a
                  href="tel:+97430205356"
                  className="group bg-[#145c74] hover:bg-[#145c74]/90 text-white px-8 py-4 rounded-full transition-all flex items-center justify-center gap-3 text-lg font-medium shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300 w-full md:w-auto"
                >
                  <Phone className="w-6 h-6 group-hover:animate-pulse" />
                  <span className="font-[Poppins]">Quick Contact</span>
                </a>
               
                <Link to='/tours-activities' className="w-full md:w-auto">
                  <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full transition-all flex items-center justify-center gap-3 text-lg font-medium hover:bg-white hover:text-black duration-300 w-full md:w-auto group">
                    <span className="font-[Poppins]">Discover Tours</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContact;