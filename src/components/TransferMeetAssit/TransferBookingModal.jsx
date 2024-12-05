

import React, { useState, useEffect, useRef } from 'react';
import { Modal, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ArrowRight, Check, ArrowLeft } from 'lucide-react';
import axiosInstance from '../../utils/axios';

const TransferBookingModal = ({ open, onClose, selectedTransfer }) => {
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
            alert('Sorry, Please try again.');
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

export default TransferBookingModal;
