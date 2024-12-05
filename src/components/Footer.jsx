import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { IoLocationOutline, IoMailOutline, IoPhonePortraitOutline } from 'react-icons/io5';

const Footer = () => {
  return (
    <footer className="bg-maroon text-white py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex flex-col items-center md:items-start">
            <img src='footer.svg' alt="Logo" className="h-24 w-auto mb-6" />
            <p className="text-center md:text-left mb-6 text-lg font-serif">
              Travel beyond your imagination, with our Travel Agency!
            </p>
            <div className="flex space-x-6">
              {[FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, index) => (
                <a key={index} href="#" className="text-white hover:text-[#1c667e] transition duration-300">
                  <Icon className="h-7 w-7" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">Useful Links</h3>
            <ul className="space-y-4 text-center md:text-left">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Tours & Activities', path: '/tours-activities' },
                { name: 'Contact', path: '/contact' },
                { name: 'Blog', path: '/transfer' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="hover:text-gray-300 transition duration-300 text-lg">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">What We Provide</h3>
            <ul className="space-y-4 text-center md:text-left">
              {['Full Day Desert Safari', 'Transit Tours', 'North Qatar', 'West Coast Tour'].map((item) => (
                <li key={item}>
                  <Link to="/tours-activities" className="hover:text-gray-300 transition duration-300 text-lg">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-semibold mb-6 text-center md:text-left w-full">Contact Us</h3>
            <div className="space-y-5 w-full max-w-xs pl-16 md:pl-0">
              {[
                { Icon: IoLocationOutline, text: 'Doha, Qatar' },
                { Icon: IoMailOutline, text: 'info@dohapride.qa' },
                { Icon: IoPhonePortraitOutline, text: '+97430205356' }
              ].map(({ Icon, text }, index) => (
                <div key={index} className="flex items-center">
                  <div className="p-2 bg-[#1c667e] rounded-full mr-4 shadow-md">
                    <Icon className="text-white text-2xl" />
                  </div>
                  <span className="text-lg">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white border-opacity-20 text-center">
          <p className="text-sm font-light">© {new Date().getFullYear()} Doha Pride Tourism. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;