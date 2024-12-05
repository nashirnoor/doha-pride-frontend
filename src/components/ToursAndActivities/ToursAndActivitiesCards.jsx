import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../api/Route";


const ToursAndActivitiesCards = () => {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${BASE_URL}tours/`)
            .then(response => {
                setTours(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the tours!", error);
            })
            .finally(()=> {
                setLoading(false)
            })
    }, []);

    if (loading) {
        return (
            <div className="w-full h-[75vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-600"></div>
            </div>
        );
    }

    return (
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
                                    src={tour?.image}
                                    alt={tour?.title}
                                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                {/* New Tag */}

                                {tour?.tag && (
                                    <div className="absolute top-4 -left-2 bg-maroon text-white px-4 py-2 text-sm font-semibold transform skew-x-[-10deg]">
                                        {tour.tag}
                                    </div>
                                )}

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
                                            {tour?.category && (
                                                <span className="text-gray-500 text-sm">{tour?.category}</span>
                                            )}
                                            {tour?.category && (
                                                <div className="flex items-center space-x-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-sm text-gray-600">Half Day</span>
                                                </div>
                                            )}
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
        </div>
    )
}

export default ToursAndActivitiesCards
