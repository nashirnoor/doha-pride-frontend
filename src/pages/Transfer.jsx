import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getTransferData } from '../api/Route';
import { Modal, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { ArrowRight, Check, ArrowLeft } from 'lucide-react';
import axiosInstance from "../utils/axios"

const Transfer = () => {
    const [transferData, setTransferData] = useState([]);
    const [selectedTransfer, setSelectedTransfer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
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
            <BookingModal
                open={isModalOpen}
                onClose={handleCloseModal}
                selectedTransfer={selectedTransfer}
            />
        </div>
    );
};

export default Transfer;

const BookingModal = ({ open, onClose, selectedTransfer }) => {
    const [step, setStep] = useState(1);
    const totalSteps = 3;
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            name,
            email: localStorage.getItem('userEmail'),
            number: phone,
            date,
            time,
            from_location: fromLocation,
            to_location: toLocation,
            status: 'pending',
            transfer_name: selectedTransfer ? selectedTransfer.id : null
        };

        try {
            const response = await axiosInstance.post(`/bookings-transfer/`, formData);
            if (response.status === 201) {
                alert('Booking submitted successfully!');
            }
        } catch (error) {
            console.error('There was an error!', error);
            alert('Failed to submit booking. Please try again.');
        }
        onClose();
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const renderStepIndicator = () => (
        <div className="flex items-center justify-center mb-6 w-full">
            {[1, 2, 3].map((idx) => (
                <div key={idx} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= idx ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                        {step > idx ? <Check className="w-4 h-4" /> : idx}
                    </div>
                    {idx < 3 && (
                        <div className={`h-1 w-12 mx-2 ${step > idx ? 'bg-blue-600' : 'bg-gray-200'
                            }`} />
                    )}
                </div>
            ))}
        </div>
    );

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
                        <div className="space-y-4">
                            <TextField
                                id="name"
                                label="Your Name"
                                variant="outlined"
                                fullWidth
                                required
                                className="bg-white"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                id="phone"
                                label="Your Phone Number with Country code"
                                variant="outlined"
                                type="tel"
                                fullWidth
                                required
                                className="bg-white"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Trip Details</h3>
                        <div className="space-y-4">
                            <TextField
                                id="from"
                                label="From Location"
                                variant="outlined"
                                fullWidth
                                required
                                className="bg-white"
                                placeholder="Enter pickup location"
                                value={fromLocation}
                                onChange={(e) => setFromLocation(e.target.value)}
                            />
                            <TextField
                                id="to"
                                label="To Location"
                                variant="outlined"
                                fullWidth
                                required
                                className="bg-white"
                                placeholder="Enter destination"
                                value={toLocation}
                                onChange={(e) => setToLocation(e.target.value)}
                            />
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Schedule Your Trip</h3>
                        <div className="space-y-4">
                            <TextField
                                id="date"
                                label="Select Date"
                                variant="outlined"
                                type="date"
                                fullWidth
                                required
                                InputLabelProps={{ shrink: true }}
                                className="bg-white"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <TextField
                                id="time"
                                label="Select Time"
                                variant="outlined"
                                type="time"
                                fullWidth
                                required
                                InputLabelProps={{ shrink: true }}
                                className="bg-white"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="booking-modal"
            aria-describedby="booking-form"
        >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-xl w-full max-w-md md:max-w-lg overflow-hidden">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                                Book {selectedTransfer?.name}
                            </h2>
                            <IconButton
                                onClick={onClose}
                                className="hover:bg-gray-200 rounded-full p-1"
                            >
                                <CloseIcon className="h-5 w-5" />
                            </IconButton>
                        </div>

                        {renderStepIndicator()}

                        <form onSubmit={(e) => step === 3 ? handleSubmit(e) : e.preventDefault()} className="space-y-6">
                            <div className="min-h-[300px] md:min-h-[250px]">
                                {renderStepContent()}
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                {step > 1 && (
                                    <Button
                                        type="button"
                                        onClick={prevStep}
                                        variant="outlined"
                                        className="flex items-center gap-2"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Back
                                    </Button>
                                )}
                                {step < totalSteps ? (
                                    <Button
                                        type="button"
                                        onClick={nextStep}
                                        className="ml-auto flex items-center gap-2 bg-blue-600 hover:bg-maroon hover:text-white px-6 py-2 rounded-lg"
                                    >
                                        Next
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        className="ml-auto bg-black hover:moroon text-white px-8 py-2 rounded-lg flex items-center gap-2"
                                    >
                                        Book Now
                                        <Check className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    );
};