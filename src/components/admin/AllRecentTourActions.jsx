import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../api/Route';
import { Link } from 'react-router-dom';

const AllRecentTourActions = () => {
    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageLoading, setPageLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [bookingIdSearch, setBookingIdSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 15;

    useEffect(() => {
        const fetchActions = async () => {
            try {
                setPageLoading(true);
                const token = localStorage.getItem('access_token');
                const response = await axios.get(
                    `${BASE_URL}api/tour-audit/?page=${currentPage}&search=${searchTerm}&booking_id=${bookingIdSearch}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                setActions(response.data.results);
                setTotalPages(Math.ceil(response.data.count / itemsPerPage));
                setLoading(false);
                setPageLoading(false)
            } catch (err) {
                setError('Failed to load recent actions');
                setLoading(false);
                setPageLoading(false)
            }
        };

        const timeoutId = setTimeout(fetchActions, 500);
        return () => clearTimeout(timeoutId);
    }, [currentPage, searchTerm, bookingIdSearch]);

    // Add this formatAction function
    const formatAction = (action) => {
        switch (action.action) {
            case 'create':
                return 'created new booking';
            case 'update':
                return `updated ${action.field_name.replace(/_/g, ' ')}`;
            case 'delete':
                return 'deleted booking';
            default:
                return action.action;
        }
    };

    const formatTimestamp = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleBookingIdSearch = (e) => {
        setBookingIdSearch(e.target.value);
        setCurrentPage(1);
    };
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const extractBookingId = (bookingName) => {
        const match = bookingName.match(/\((\d+)\)$/);
        console.log(match, "bookingiddd")
        return match ? match[1] : '';
    };

    const Pagination = () => (
        <div className="flex justify-center space-x-2 mt-4">
            <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1 || pageLoading}
                className="px-4 py-2 rounded bg-blue-500 text-white disabled:bg-gray-300"
            >
                Previous
            </button>
            <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages || pageLoading}
                className="px-4 py-2 rounded bg-blue-500 text-white disabled:bg-gray-300"
            >
                Next
            </button>
        </div>
    );

    return (
        <>
            <div className='flex ml-2 mt-1'>
                <Link to='/admin-home'>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition ease-in-out duration-150"
                    >
                        Back
                    </button>
                </Link>
            </div>
            <div className="bg-white p-4 m-8 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Recent Tour Booking Actions</h2>

                {/* Search Inputs */}
                <div className="flex space-x-4 mb-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search by user name..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search by booking ID..."
                            value={bookingIdSearch}
                            onChange={handleBookingIdSearch}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-4">
                        <p className="text-gray-500">Loading...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-4">
                        <p className="text-red-500">{error}</p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4 relative">
                            {/* Overlay loading effect */}
                            {pageLoading && (
                                <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
                                    <div className="flex items-center space-x-2">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                                        <span className="text-blue-500">Loading...</span>
                                    </div>
                                </div>
                            )}

                            {actions.map((action) => (
                                <div
                                    key={action.id}
                                    className="border-l-4 border-blue-500 pl-4 py-2 hover:bg-gray-50"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-medium text-gray-800">
                                                {action.staff_name} {formatAction(action)}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Booking: {action.booking_name}
                                                <span className="text-xs text-gray-400 ml-2">
                                                    (ID: {extractBookingId(action.booking_name)})
                                                </span>
                                            </p>
                                            {action.action === 'update' && (
                                                <p className="text-sm text-gray-500">
                                                    Changed from: {action.old_value} → {action.new_value}
                                                </p>
                                            )}
                                        </div>
                                        <span className="text-sm text-gray-400">
                                            {formatTimestamp(action.timestamp)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Pagination />
                    </>
                )}
            </div>
        </>
    );
};

export default AllRecentTourActions;