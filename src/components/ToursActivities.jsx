import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from '../api/Route';


const ToursActivities = () => {
  const [tours, setTours] = useState([]);
  const [activeActivity, setActiveActivity] = useState(0);
  const [activities, setActivities] = useState([]);


  useEffect(() => {
    axios.get(`${BASE_URL}tours/`)
      .then(response => {
        setTours(response.data);
        console.log(response.data, "adfa")
      })
      .catch(error => {
        console.error("There was an error fetching the tours!", error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}top-activities/`)
      .then(response => {
        setActivities(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the activities!", error);
      });
  }, []);

  // if (activities.length === 0) {
  //   return <p>Loading...</p>;
  // }


  return (
    <>
      <div className="max-w-full px-4 md:px-8 lg:px-16 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 font-[Poppins]">
          Tours and <span className="text-maroon">Activities</span>
        </h2>
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform w-full max-w-[400px] mx-auto"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <img
                    src={tour.media_gallery.length > 0 ? tour.media_gallery[0]?.image : '/default.jpg'}
                    alt={tour?.title}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* New Tag */}
                  <div className="absolute top-4 -left-2 bg-maroon text-white px-4 py-2 text-sm font-semibold transform skew-x-[-10deg]">
                    New
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                {/* Content Section */}
                <div className="p-6 space-y-4">
                  <div>
                    <div className="mb-2">
                      <h3 className="text-xl font-bold text-maroon line-clamp-2">
                        {tour.title}
                      </h3>
                      <div className="mt-1 flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Art Culture</span>
                        <div className="flex items-center space-x-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-gray-600">Half Day</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {tour?.description?.length > 100
                        ? `${tour?.description?.substring(0, 100)}...`
                        : tour.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <Link
                      to={`/tours-details/${tour.id}`}
                      className="block w-full"
                    >
                      <button className="w-full py-3 border border-maroon text-maroon bg-white hover:bg-maroon hover:text-white rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 font-[Poppins] font-semibold">
                        <span>View Details</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>



        <h3 className="text-3xl font-bold text-center text-black mb-4">Our Top Activities</h3>
        <p className="text-xl text-center text-gray-500 mb-8">Explore Your Life, Travel Where You Want!</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
          {activities.map((activity, index) => (
            <button
              key={activity.id}
              className={`px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${activeActivity === index
                ? "bg-maroon text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              onClick={() => setActiveActivity(index)}
            >
              {activity?.name}
            </button>
          ))}
        </div>

      </div>

      <div className="flex flex-col md:flex-row items-center justify-center bg-white rounded-lg shadow-lg overflow-hidden px-4">
        <div className="w-full md:w-1/2">
          <img
            src={activities[activeActivity]?.image}
            alt={activities[activeActivity]?.name}
            className="w-full h-96 object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 p-8">
          <h4 className="text-3xl font-semibold mb-4">{activities[activeActivity]?.name}</h4>
          <p className="text-gray-600">{activities[activeActivity]?.description}</p>
        </div>
      </div>
    </>
  );
};

export default ToursActivities;
