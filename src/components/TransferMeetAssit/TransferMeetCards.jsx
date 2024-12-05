import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getTransferData } from '../../api/Route';
import TransferBookingModal from './TransferBookingModal'
import { useNavigate } from 'react-router-dom';




const TransferMeetCards = () => {
    const [transferData, setTransferData] = useState([]);
    const [selectedTransfer, setSelectedTransfer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchTransferData = async () => {
            try {
                const data = await getTransferData();
                setTransferData(data);

                const queryParams = new URLSearchParams(location.search);
                const transferName = queryParams.get('name');

                if (transferName) {
                    const transfer = data.find(item => item.name === decodeURIComponent(transferName));
                    setSelectedTransfer(transfer);
                } else if (data.length > 0) {
                    setSelectedTransfer(data[0]);
                }
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchTransferData();
    }, [location.search]);

    const handleTransferSelect = (transfer) => {
        setSelectedTransfer(transfer);
    };

    const handleOpenModal = () => {
        const accessToken = localStorage.getItem('access_token');
        
        if (!accessToken) {
            navigate('/login');
            return;
        }
        
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    if (loading) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-cyan-50 to-white">
                {/* Main animation container */}
                <div className="relative w-40 h-40 mb-4">
                    {/* Pearl building silhouette */}
                    <svg 
                        className="absolute w-24 h-24 left-1/2 transform -translate-x-1/2 text-cyan-600 opacity-20"
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                    >
                        <path d="M12 2L2 22h20L12 2zm0 3.5L19.5 20h-15L12 5.5z"/>
                    </svg>
    
                    {/* Loading spinner */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 border-4 border-purple-200 border-t-cyan-600 rounded-full animate-spin"></div>
                    </div>
    
                    {/* Decorative elements */}
                    <div className="absolute bottom-0 w-full flex justify-center space-x-1">
                        <div className="w-1 h-8 bg-cyan-500 animate-[bounce_1s_infinite_100ms]"></div>
                        <div className="w-1 h-12 bg-cyan-500 animate-[bounce_1s_infinite_200ms]"></div>
                        <div className="w-1 h-16 bg-maroon animate-[bounce_1s_infinite_300ms]"></div>
                        <div className="w-1 h-12 bg-cyan-500 animate-[bounce_1s_infinite_400ms]"></div>
                        <div className="w-1 h-8 bg-cyan-500 animate-[bounce_1s_infinite_500ms]"></div>
                    </div>
                </div>
    
                {/* Text content */}
                <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold bg-black bg-clip-text text-transparent">
                        Qatar Awaits
                    </h3>
                    <p className="text-sm text-cyan-600">
                        Preparing your luxurious experience...
                    </p>
                    <div className="flex justify-center space-x-2 text-maroon">
                        <span className="animate-pulse">•</span>
                        <span className="animate-pulse delay-100">•</span>
                        <span className="animate-pulse delay-200">•</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-2xl text-maroon">Error: {error}</div>;
    }

    return (
        <div className="flex flex-col lg:flex-row pb-16 px-4 lg:px-40 pt-24 gap-6 bg-gray-100 min-h-screen">
            {/* Left Section */}
            <div className="w-full lg:w-1/4 bg-white p-4 rounded-lg shadow-lg animate-fade-in-up">
                <ul className="space-y-4">
                    {transferData.map((transfer) => (
                        <li
                            key={transfer.id}
                            className={`w-full p-3 shadow rounded-lg cursor-pointer transition ease-in-out duration-300 ${selectedTransfer && selectedTransfer.id === transfer.id
                                ? 'bg-maroon text-white font-semibold'
                                : 'bg-gray-200 text-black font-semibold hover:bg-maroon hover:text-white'
                                }`}
                            onClick={() => handleTransferSelect(transfer)}
                        >
                            {transfer.name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right Section */}
            {selectedTransfer && (
                <div className="w-full lg:w-3/4 bg-white p-6 rounded-lg shadow-lg animate-fade-in-up">
                    <div className="relative">
                        <div className="absolute top-4 left-4 bg-maroon text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg z-10">
                            QAR {selectedTransfer.cost} Per Trip
                        </div>
                        <img
                            src={selectedTransfer.image}
                            alt="Transport"
                            className="w-full h-80 object-cover rounded-lg mb-4 transition-transform transform hover:scale-105 duration-300"
                        />
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-black">{selectedTransfer.name}</h2>
                    <p className="text-lg text-gray-700 mb-6">{selectedTransfer.description_one}</p>
                    <h3 className="text-2xl font-semibold mb-4 text-black">What to Expect</h3>
                    <ul className="space-y-2 text-gray-700 text-lg mb-6">
                        {selectedTransfer.points.map((point, index) => (
                            <li
                                key={index}
                                className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-maroon before:rounded-full"
                            >
                                {point.text}
                            </li>
                        ))}
                    </ul>
                    <p className="text-lg text-gray-700 mb-6">{selectedTransfer.description_two}</p>
                    <button className="bg-maroon text-white px-8 py-4 rounded-full hover:bg-opacity-90 transition ease-in-out duration-300 text-lg font-semibold shadow-lg"
                        onClick={handleOpenModal}
                    >
                        Book Now
                    </button>
                </div>
            )}
            <TransferBookingModal
                open={isModalOpen}
                onClose={handleCloseModal}
                selectedTransfer={selectedTransfer}
            />
        </div>
    );
};

export default TransferMeetCards;