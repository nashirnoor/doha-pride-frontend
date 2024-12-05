import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { getContactDetails } from '../../api/Route';
import axios from 'axios';
import { BASE_URL } from '../../api/Route';

const ContactComponent = () => {
  const [contact, setContact] = useState({
    email: 'Loading...',
    phone_number: 'Loading...',
    location: 'Loading...'
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}contact-messages/`, formData);
      alert("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    }
  };

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const data = await getContactDetails();
        console.log(data, "asdf")
        const limitedContact = {
          email: Array.isArray(data.email) ? data.email[0] : data.email,
          phone_number: Array.isArray(data.phone_number) ? data.phone_number[0] : data.phone_number,
          location: Array.isArray(data.location) ? data.location[0] : data.location
        };
        setContact(limitedContact);
      } catch (error) {
        console.error('Error fetching contact details:', error);
      }
    };
    fetchContactDetails();
  }, []);
  return (
    <div className="bg-lightblue py-16 text-black">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-12 text-black">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white text-black rounded-lg shadow-xl p-8 transform hover:scale-105 transition duration-300">
            <h2 className="text-3xl font-semibold mb-8">Get in Touch</h2>

            <div className="space-y-6">
              <div className="flex items-center">
                <FaEnvelope className="text-2xl mr-4 text-maroon" />
                <span className="text-lg">{contact.email}</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-2xl mr-4 text-maroon" />
                <span className="text-lg">{contact.phone_number}</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-2xl mr-4 text-maroon" />
                <span className="text-lg">{contact.location}</span>
              </div>
            </div>

            {/* Map */}
            <div className="mt-10 h-72 bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3606.0304864679692!2d51.478412!3d25.336758!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45dc85fcc9357f%3A0xa057a2a1862c2b93!2sStreet%20871%2C%20Doha%2C%20Qatar!5e0!3m2!1sen!2sin!4v1730570317449!5m2!1sen!2sin"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                title="Google Map"
                className="border-0"
              ></iframe>

            </div>

          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-300">
            <h2 className="text-3xl font-semibold mb-8 text-maroon">Send Us a Message</h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="block mb-2 font-medium text-black">Name</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-maroon"
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-2 font-medium text-black">Email</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-maroon"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block mb-2 font-medium text-black">Phone</label>
        <input
          type="text"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-maroon"
          placeholder="Enter number with country code"
        />
      </div>
      <div>
        <label htmlFor="message" className="block mb-2 font-medium text-black">Message</label>
        <textarea
          id="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-maroon"
          placeholder="Enter your message"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-maroon text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition duration-300 text-lg font-semibold"
      >
        Send Message
      </button>
    </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;
