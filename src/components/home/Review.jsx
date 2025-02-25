import React, { useState } from 'react';
import { FaStar, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import storeReviews from '../../storeReviews.json'
import { motion } from 'framer-motion';
const Review = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const reviews = storeReviews.reviews;

  const handleNextReview = () => {
    setCurrentReviewIndex((prev) =>
      (prev + 1) % reviews.length
    );
  };

  const handlePrevReview = () => {
    setCurrentReviewIndex((prev) =>
      (prev - 1 + reviews.length) % reviews.length
    );
  };

  const nextReviewIndex = (currentReviewIndex + 1) % reviews.length;

  return (
    <div className="flex flex-col md:flex-row container mx-auto px-4 py-16 relative mt-16">
      {/* Left Section */}
      <div className="w-full md:w-1/2 md:pr-12 mb-8 md:mb-0 md:mt-20">
        <motion.p 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 80
          }}
        className="text-lg uppercase tracking-wide text-maroon mb-4 font-serif">
          TESTIMONIALS
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 80
          }}
        className="text-3xl md:text-5xl font-serif text-gray-800 mb-8">
          What People Say About Us
        </motion.h2>

        <div className="flex space-x-2 mb-8">
          {reviews.map((_, index) => (
            <span
              key={index}
              className={`h-2 w-2 rounded-full ${index === currentReviewIndex
                ? 'bg-maroon'
                : 'bg-gray-300'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 relative flex justify-center md:block h-full">
        {/* Navigation Arrows - Desktop View */}
        <div className="hidden md:flex absolute right-[-40px] top-1/2 transform -translate-y-1/2 flex-col space-y-4 z-20">
          <button
            onClick={handlePrevReview}
            className="bg-white shadow-md p-3 rounded-full border border-gray-200 hover:bg-gray-100"
          >
            <FaChevronUp />
          </button>
          <button
            onClick={handleNextReview}
            className="bg-white shadow-md p-3 rounded-full border border-gray-200 hover:bg-gray-100"
          >
            <FaChevronDown />
          </button>
        </div>

        {/* Navigation Buttons - Mobile View */}
        <div className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 flex space-x-4 md:hidden z-20">
          <button
            onClick={handlePrevReview}
            className="bg-white shadow-md p-3 rounded-full border border-gray-200 hover:bg-gray-100"
          >
            <FaChevronUp />
          </button>
          <button
            onClick={handleNextReview}
            className="bg-white shadow-md p-3 rounded-full border border-gray-200 hover:bg-gray-100"
          >
            <FaChevronDown />
          </button>
        </div>

        {/* Main Review Card */}
        <div className="relative bg-white shadow-2xl rounded-xl p-8 w-full max-w-[500px] z-30 h-auto md:h-[270px]">
          {/* User Image */}
          <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              src={reviews[currentReviewIndex].avatar}
              alt={reviews[currentReviewIndex].author_name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Review Content */}
          <div className="mt-8">
            <p className="text-gray-600 italic mb-6 line-clamp-5">
              "{reviews[currentReviewIndex].text}"
            </p>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">
                  {reviews[currentReviewIndex].author_name}
                </h3>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${i < reviews[currentReviewIndex].rating
                        ? 'text-yellow-500'
                        : 'text-gray-300'
                        } mr-1`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partially Visible Next Review - Desktop Only */}
        <div className="hidden md:block absolute bottom-[-80px] left-[-40px] w-full z-10">
          <div className="bg-gray-100 rounded-b-xl p-4 w-full max-w-[500px] ml-auto opacity-70 h-[270px]">
            {/* User Image */}
            <div className="flex items-center mb-1 mt-14"> {/* Added mt-4 to push content down */}
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg mr-4">
                <img
                  src={reviews[nextReviewIndex].avatar}
                  alt={reviews[nextReviewIndex].author_name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Review Text */}
            <p className="text-gray-600 italic text-sm line-clamp-3 mb-1 pl-2"> {/* Added pl-2 for left padding */}
              "{reviews[nextReviewIndex].text}"
            </p>
            <h3 className="font-semibold text-sm mt-2 pl-2"> {/* Added mt-2 and pl-2 */}
              {reviews[nextReviewIndex].author_name}
            </h3>
            <div className="flex pl-2"> {/* Added pl-2 for left padding */}
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`${i < reviews[nextReviewIndex].rating
                    ? 'text-yellow-500'
                    : 'text-gray-300'
                    } mr-1 text-sm`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;