import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BASE_URL } from '../../api/Route';
import { toast } from 'react-toastify';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';



const ToursDetails = () => {
    const { id } = useParams();
    const [tour, setTour] = useState(null);
    const [tours, setTours] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [time, setTime] = useState("10:00");


    useEffect(() => {
        axios.get(`${BASE_URL}tours/${id}/`)
            .then(response => {
                setTour(response.data);
            })
            .catch(error => {
                console.error("Error details:", error.response);
            });
    }, [id]);

    useEffect(() => {
        axios.get(`${BASE_URL}tours/`)
            .then(response => {
                const shuffled = response.data.sort(() => 0.5 - Math.random());
                setTours(shuffled.slice(0, 3));
            })
            .catch(error => {
                console.error("There was an error fetching the tours!", error);
            });
    }, []);

    if (!tour) {
        return (
            <div className="w-full h-[75vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-600"></div>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name: `${document.getElementById('name').value} / ${document.getElementById('email').value} / ${document.getElementById('phone').value}`,
            email: document.getElementById('email').value,
            number: document.getElementById('phone').value,
            date: selectedDate.format('YYYY-MM-DD'),
            time: document.getElementById('time').value,
            status: 'pending',
            tour_activity: id
        };

        try {
            const response = await axios.post(`${BASE_URL}api/bookings-tour/`, formData);
            if (response.status === 201) {
                toast.success("Booking has been completed successfully!", {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('phone').value = '';
                document.getElementById('time').value = '';
            }
        } catch (error) {
            console.error("Error sending message:", error.response ? error.response.data : error);
            toast.error("Failed to submit form", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <motion.h1
                className="text-4xl font-bold text-center mb-8"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {tour.title}
            </motion.h1>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* Left Section */}
                <motion.div
                    className="md:col-span-2 w-full"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <div className="w-full">
                        <motion.img
                            src={tour?.image}
                            alt="Tour"
                            className="w-full h-96 object-cover rounded-lg"
                        />
                    </div>

                    <motion.h2 className="text-2xl font-semibold mt-8 mb-4">Description</motion.h2>
                    <motion.div>
                        <p className="text-lg text-gray-700 mb-4">
                            {tour.description}
                        </p>
                    </motion.div>

                    <div className="pt-6 mt-6">
                        <motion.h2
                            className="text-2xl font-bold mb-4 text-gray-900"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Media Gallery
                        </motion.h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {tour.media_gallery.map((image, index) => (
                                <div key={index} className="group relative overflow-hidden">
                                    <img
                                        src={image.image}
                                        alt={image.alt_text}
                                        className="w-full h-40 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Right Section */}
                <div className="md:col-span-1 w-full">
                    <motion.div
                        className="bg-gray-100 rounded-lg shadow-lg p-8"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-2xl font-semibold mb-6">Book Your Tour</h2>
                        <form onSubmit={handleSubmit}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <div className="bg-white rounded-lg p-4 shadow-md mb-4">
                                    <h3 className="text-maroon text-sm font-semibold mb-2">
                                        Select Date
                                    </h3>
                                    <DateCalendar
                                        value={selectedDate}
                                        onChange={(newValue) => setSelectedDate(newValue)}
                                        disablePast
                                        sx={{
                                            '& .MuiPickersDay-root': {
                                                '&.Mui-selected': {
                                                    backgroundColor: '#000',
                                                    '&:hover': {
                                                        backgroundColor: '#333',
                                                    }
                                                }
                                            },
                                            '& .MuiPickersDay-today': {
                                                border: '1px solid #000',
                                            }
                                        }}
                                    />
                                </div>

                                <div className="bg-white rounded-lg p-4 shadow-md mb-4">
                                    <h3 className="text-gray-700 text-sm font-semibold mb-2">
                                        Select Time
                                    </h3>
                                    <input
  type="time"
  id="time"
  value={time}
  onChange={(e) => setTime(e.target.value)}
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black focus:outline-none transition duration-200 bg-white text-gray-900"
/>


                                </div>

                                <div className="bg-white rounded-lg p-4 shadow-md">
                                    <h3 className="text-gray-700 text-sm font-semibold mb-4">
                                        Contact Information
                                    </h3>
                                    <div className="space-y-4">
                                        <TextField
                                            id="name"
                                            label="Your Name"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: '#f8f9fa',
                                                    '& fieldset': {
                                                        borderColor: '#e9ecef',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#000',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#000',
                                                    },
                                                }
                                            }}
                                        />

                                        <TextField
                                            id="email"
                                            label="Your Email"
                                            variant="outlined"
                                            type="email"
                                            fullWidth
                                            required
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: '#f8f9fa',
                                                    '& fieldset': {
                                                        borderColor: '#e9ecef',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#000',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#000',
                                                    },
                                                }
                                            }}
                                        />

                                        <TextField
                                            id="phone"
                                            label="Your Phone Number"
                                            variant="outlined"
                                            type="tel"
                                            fullWidth
                                            required
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: '#f8f9fa',
                                                    '& fieldset': {
                                                        borderColor: '#e9ecef',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#000',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#000',
                                                    },
                                                }
                                            }}
                                        />

                                        <button
                                            type="submit"
                                            className="w-full bg-maroon text-white py-3 rounded-lg hover:bg-cyan-800 transition duration-300 mt-6 font-medium"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </LocalizationProvider>
                        </form>
                    </motion.div>

                    {/* Need Assistance Section */}
                    <motion.div
                        className="bg-black rounded-lg shadow-lg p-6 border border-gray-700 mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-white">Need Assistance?</h2>
                        <p className="text-lg text-gray-100 mb-4">
                            We're here to help you with your booking and any other inquiries you may have.
                        </p>
                        <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg">
                            <div className="w-14 h-14 flex items-center justify-center bg-gray-900 rounded-full shadow-lg">
                                <svg
                                    className="w-10 h-10 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M22.54 15.46a11.988 11.988 0 00-3.46-4.04l-1.29 1.29a6.982 6.982 0 01-1.36-.2c-1.18-.45-2.38-.54-3.46-.2a6.981 6.981 0 01-2.6 0c-1.24-.51-2.4-1.27-3.36-2.2l-1.29 1.29a11.985 11.985 0 004.04 3.46 11.993 11.993 0 004.44 1.8c1.54.42 3.16.42 4.7 0a11.98 11.98 0 004.48-1.8z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="text-lg text-gray-300">Get in Touch</p>
                                <p className="text-2xl font-semibold text-white">97430205356</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* You Might Also Like Section */}
                    <motion.div
                        className="border-t border-gray-300 pt-6 mt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-gray-900">You Might Also Like</h2>
                        <div className="space-y-6">
                            {tours.map((tour) => (
                                <div key={tour.id} className="flex items-center space-x-4">
                                    <img
                                        src={tour?.image}
                                        alt={tour.title}
                                        className="w-32 h-20 object-cover rounded-lg"
                                    />
                                    <Link to={`/tours-details/${tour.id}`}>
                                        <p className="text-lg text-gray-900">{tour.title}</p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default ToursDetails;