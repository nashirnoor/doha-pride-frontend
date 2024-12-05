import { TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../api/Route';
import axiosInstance from '../../utils/axios';

const ToursDetails = () => {
    const { id } = useParams();
    const [tour, setTour] = useState(null);
    const [tours, setTours] = useState([]);


    useEffect(() => {
        axios.get(`${BASE_URL}tours/${id}/`)
            .then(response => {
                console.log("API Response:", response.data);
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
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            number: document.getElementById('phone').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            status: 'pending',
            tour_activity: id
        };

        try {

            const response = await axiosInstance.post(`${BASE_URL}api/bookings-tour/`, formData);
            if (response.status === 201) {
                alert('Booking submitted successfully!');
            }
        } catch (error) {
            console.log(BASE_URL,"this is base")
            console.error('There was an error!', error);
            alert('Failed to submit booking. Please try again.');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            {/* Title */}
            <motion.h1 className="text-4xl font-bold text-center mb-8" initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >{tour.title}</motion.h1>

            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}>
                {/* Right Section (Image and Description) */}
                <motion.div className="md:col-span-2 w-full" initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}>
                    {/* Image */}
                    <div className="w-full">
                        <motion.img
                            src={tour.media_gallery.length > 0 ? tour.media_gallery[0].image : '/default.jpg'}
                            alt="Tour"
                            className="w-full h-96 object-cover rounded-lg"
                        />
                    </div>

                    {/* Description Title */}
                    <motion.h2 className="text-2xl font-semibold mt-8 mb-4">Description</motion.h2>

                    {/* Content */}
                    <motion.div>
                        <p className="text-lg text-gray-700 mb-4">
                            {tour.description}
                        </p>
                        {/* <p className="text-lg text-gray-700">
                            Our team is dedicated to providing exceptional service and ensuring that every aspect of your tour is well-planned and enjoyable. From the moment you book to the time you return home, we are here to assist you every step of the way. Join us for a journey you'll never forget!
                        </p> */}
                    </motion.div>

                    {/* Media Gallery Section */}
                    <div className="pt-6 mt-6" >
                        <motion.h2 className="text-2xl font-bold mb-4 text-gray-900" initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}  >Media Gallery</motion.h2>
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

                <div className="md:col-span-1 w-full flex flex-col space-y-8">
                    {/* Booking Tour */}
                    <motion.div className="bg-gray-100 rounded-lg shadow-lg p-8" style={{ height: 'fit-content', minHeight: '450px' }}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-2xl font-semibold mb-6">Booking Tour</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <TextField
                                    id="name"
                                    label="Your Name"
                                    variant="outlined"
                                    fullWidth
                                    className="mb-4"
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            color: 'black',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'black',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'black',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'black',
                                            },
                                        },
                                        '& .MuiInputBase-input': {
                                            color: 'black',
                                        },
                                    }}
                                />
                            </div>
                            <div className="mb-6">
                                <TextField
                                    id="email"
                                    label="Your Email"
                                    variant="outlined"
                                    type="email"
                                    fullWidth
                                    className="mb-4"
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            color: 'black',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'black',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'black',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'black',
                                            },
                                        },
                                        '& .MuiInputBase-input': {
                                            color: 'black',
                                        },
                                    }}
                                />
                            </div>
                            <div className="mb-6">
                                <TextField
                                    id="phone"
                                    label="Your Phone Number"
                                    variant="outlined"
                                    type="tel"
                                    fullWidth
                                    className="mb-4"
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            color: 'black',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'black',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'black',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'black',
                                            },
                                        },
                                        '& .MuiInputBase-input': {
                                            color: 'black',
                                        },
                                    }}
                                />
                            </div>
                            <div className="mb-6">
                                <TextField
                                    id="date"
                                    label="Select Date"
                                    variant="outlined"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    className="mb-4"
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            color: 'black',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'black',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'black',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'black',
                                            },
                                        },
                                        '& .MuiInputBase-input': {
                                            color: 'black',
                                        },
                                    }}
                                />
                            </div>
                            <div className="mb-6">
                                <TextField
                                    id="time"
                                    label="Select Time"
                                    variant="filled"
                                    type="time"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    className="mb-4"
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            color: 'black',
                                        },
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: 'white',
                                            '&:before': {
                                                borderBottom: `1px solid black`,
                                            },
                                            '&:hover:not(.Mui-disabled):before': {
                                                borderBottom: `2px solid black`,
                                            },
                                            '&.Mui-focused:after': {
                                                borderBottom: `2px solid maroon`,
                                            },
                                        },
                                        '& .MuiInputBase-input': {
                                            color: 'black',
                                        },
                                    }}
                                />
                            </div>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="w-full h-12 bg-gradient-to-r from-maroon to-black text-white font-semibold py-3 rounded-lg shadow-md hover:from-maroon-dark hover:to-black-dark"
                            >
                                Book Now
                            </Button>
                        </form>
                    </motion.div>

                    {/* Contact Section */}
                    <motion.div className="bg-black rounded-lg shadow-lg p-6 border border-gray-700" initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 2 }}
                        transition={{ duration: 0.5 }}  >
                        <h2 className="text-2xl font-bold mb-4 text-white">Need Assistance?</h2>
                        <p className="text-lg text-gray-100 mb-4">
                            We're here to help you with your booking and any other inquiries you may have. Contact us for more information or support.
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
                                <p className="text-2xl font-semibold text-white">024 565 989</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div className="border-t border-gray-300 pt-6 mt-6" initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9 }}  >
                        <h2 className="text-2xl font-bold mb-4 text-gray-900">You Might Also Like</h2>
                        <div className="space-y-6">
                            {tours.map((tour) => (
                                <div key={tour.id} className="flex items-center space-x-4">
                                    <img
                                        src={tour.media_gallery.length > 0 ? tour.media_gallery[0].image : '/default.jpg'}
                                        alt={tour.title}
                                        className="w-32 h-20 object-cover rounded-lg"
                                    />
                                    <Link to={`/tours-details/${tour.id}`}>
                                    <p className="text-lg  text-gray-900">{tour.title}</p>
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
