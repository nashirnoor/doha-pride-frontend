import React from 'react';
import { Trophy, Users, Compass, Sparkles, Target, Eye, Heart, Phone, ArrowRight } from 'lucide-react';
import { Building2, Car, Tent } from 'lucide-react';
import { FaCity, FaBuildingCircleCheck } from "react-icons/fa6"; // For City Tour
import { GiCampingTent, GiSandCastle, GiPalmTree } from "react-icons/gi"; // For Desert Safari
import { FaCarSide, FaShuttleVan, FaCar } from "react-icons/fa"; // For Transfer
import { Link } from 'react-router-dom';

const AboutSection = () => {
    const activities = [
        {
            icon: <FaCity className="w-8 h-8 text-white" />, // or any city icon
            title: "City Tour",
            description: "Explore the vibrant city of Doha with our guided tours"
        },
        {
            icon: <FaCarSide className="w-8 h-8 text-white" />, // or any transfer icon
            title: "Transfer",
            description: "Comfortable and reliable transfer services across Qatar"
        },
        {
            icon: <GiCampingTent className="w-8 h-8 text-white" />, // or any desert/safari icon
            title: "Desert Safari",
            description: "Experience the thrill of desert adventures and camping"
        }
    ];
    const stats = [
        {
            value: "10+",
            label: "Years Experience"
        },
        {
            value: "50+",
            label: "Tour Packages"
        },
        {
            value: "800+",
            label: "Happy Customers"
        }
    ];

    const values = [
        {
            imagePath: "https://dohapride.qa/wp-content/uploads/2023/07/mis-ic.png", // Replace with your image path
            title: "Our Mission",
            content: "Our mission is to provide our customers with exceptional travel experiences that showcase the beauty and culture of Qatar"
        },
        {
            imagePath: "https://dohapride.qa/wp-content/uploads/2023/07/vision.png", // Replace with your image path
            title: "Our Vision",
            content: "Our team of experienced tour guides and professional drivers is committed to ensuring that every customer enjoys a safe, comfortable, and unforgettable journey"
        },
        {
            imagePath: "https://dohapride.qa/wp-content/uploads/2023/07/values.png", // Replace with your image path
            title: "Our Values",
            content: "We offer a wide range of services, including guided tours, airport transfers, and chauffeured limousine services"
        }
    ];

    return (
        <div className="w-full">
            {/* Hero Section with Side Image */}
            <div className="relative bg-white">
                <div className="relative py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            {/* Left Content */}
                            <div>
                                <p className="font-['Righteous'] text-maroon text-xl font-medium mb-3 tracking-wide">
                                    Explore the World
                                </p>
                                <h1 className="font-['Space_Grotesk'] text-5xl font-bold text-[#145c74] mb-8 leading-tight">
                                    We make your travel more enjoyable
                                </h1>
                                <div className="mb-8">
                                    <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                                        Doha Pride Tourism is one of the prominent tour service providers in Qatar. Our mission is to provide our customers with exceptional travel experiences that showcase the beauty and culture of Qatar. Our team of experienced tour guides and professional drivers is committed to ensuring that every customer enjoys a safe, comfortable, and unforgettable journey.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                                        We offer a wide range of services, including guided tours, airport transfers, and chauffeured limousine services. Our tours are designed to give you an in-depth look at the many fascinating sights and sounds of Qatar.
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <Link to='/contact'>
                                        <button className="bg-maroon text-white px-8 py-4 rounded-full hover:bg-opacity-90 transition-all font-medium text-lg shadow-lg hover:shadow-xl">
                                            Contact Us
                                        </button>
                                    </Link>
                                    <Link to='/contact'>
                                        <button className="bg-[#145c74] text-white px-8 py-4 rounded-full hover:bg-opacity-90 transition-all font-medium text-lg shadow-lg hover:shadow-xl">
                                            Book Now
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* Right Image with Zoom Effect */}
                            <div className="relative group">
                                <div className="overflow-hidden rounded-2xl shadow-2xl">
                                    <img
                                        src="https://images.pexels.com/photos/3789026/pexels-photo-3789026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                        alt="Qatar tourism"
                                        className="w-full h-[600px] object-cover transform transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <div className="absolute -bottom-8 right-[-1rem] md:right-[-1rem] bg-maroon text-white p-6 rounded-xl shadow-xl">
    <h3 className="text-2xl font-normal mb-2">10+ Years</h3>
    <p>Of Excellence</p>
</div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modern Stats Section with Layered Design */}
            <div className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="group relative"
                            >
                                {/* Background Layers */}
                                <div className="absolute inset-0 bg-[#145c74]/10 rounded-2xl transform rotate-3 transition-transform duration-300 group-hover:rotate-6"></div>
                                <div className="absolute inset-0 bg-[#145c74]/20 rounded-2xl transform -rotate-2 transition-transform duration-300 group-hover:-rotate-4"></div>

                                {/* Main Content Card */}
                                <div className="relative bg-white p-8 rounded-2xl border border-gray-100 shadow-sm transform transition-all duration-300 group-hover:-translate-y-1">
                                    {/* Animated Border Gradient */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#145c74] via-[#2980b9] to-[#145c74] opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ padding: '1px' }}>
                                        <div className="h-full w-full bg-white rounded-2xl"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-6xl font-bold text-[#145c74]">
                                                {stat.value}
                                            </h3>
                                            <div className="w-12 h-12 rounded-full bg-[#145c74]/10 flex items-center justify-center">
                                                <div className="w-6 h-6 bg-[#145c74] rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 text-lg font-medium tracking-wide">
                                            {stat.label}
                                        </p>

                                        {/* Animated Line */}
                                        <div className="h-0.5 w-0 group-hover:w-full bg-[#145c74] mt-4 transition-all duration-500"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* BG_STICK */}
            <div className="relative min-h-[600px] flex items-center overflow-hidden">
                {/* Background Image with Parallax Effect - keeping your original background */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'url("https://dohapride.qa/wp-content/uploads/2023/07/bg-abt2.jpg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                        zIndex: -1
                    }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />

                {/* Content */}
                <div className="relative container mx-auto px-4 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left Side - Title */}
                        <div className="space-y-8">
                            <div className="inline-block px-6 py-2 bg-white backdrop-blur-sm rounded-full mb-4">
                                <span className="text-maroon font-semibold">Discover Qatar With Us</span>
                            </div>
                            <h2 className="text-6xl font-['Space_Grotesk'] font-bold text-white leading-tight">
                                We Provide
                                <span className="block mt-2 text-[#145c74]">
                                    Top Activities
                                </span>
                                For You
                            </h2>
                            <p className="text-gray-200 text-lg max-w-xl leading-relaxed">
                                Welcome to Doha Pride. We provide different kinds of activities for you in Qatar. Also, we provide City Tours, Transfer, Meet & assist Services, Desert Safari, and Camping at affordable Prices.
                            </p>
                        </div>

                        {/* Right Side - Activity Cards */}
                        <div className="space-y-8">
                            {activities.map((activity, index) => (
                                <div
                                    key={index}
                                    className="group relative"
                                >
                                    {/* Blur Background */}
                                    <div className="absolute inset-0 bg-white/5 backdrop-blur-lg rounded-2xl transform transition-all duration-500 group-hover:scale-105" />

                                    {/* Card Content */}
                                    <div className="relative p-6 border border-white/10 rounded-2xl hover:border-[#145c74]/50 transition-all duration-300">
                                        <div className="flex items-center gap-6">
                                            {/* Icon Container */}
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-[#145c74]/20 rounded-xl blur-lg transform group-hover:scale-110 transition-transform duration-300" />
                                                <div className="relative w-16 h-16 bg-maroon rounded-xl flex items-center justify-center transform group-hover:-translate-y-1 transition-all duration-300">
                                                    {/* Using custom icons with gradient */}
                                                    <span className="text-white text-2xl">
                                                        {activity.icon}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Text Content */}
                                            <div className="flex-1">
                                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#145c74] transition-colors duration-300">
                                                    {activity.title}
                                                </h3>
                                                <p className="text-gray-300 leading-relaxed">
                                                    {activity.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Decorative Line */}
                                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#145c74] to-transparent group-hover:w-full transition-all duration-500" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Values Section */}
            <div className="bg-[#145c74] py-24 relative overflow-hidden">
                {/* Decorative Circles */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute right-0 top-0 w-48 md:w-96 h-48 md:h-96 border-[20px] md:border-[40px] border-white rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute left-0 bottom-0 w-36 md:w-72 h-36 md:h-72 border-[15px] md:border-[30px] border-white rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
                    </div>
                </div>

                <div className="container mx-auto px-4 relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="group relative bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/10"
                            >
                                {/* Card Content */}
                                <div className="p-8">
                                    <div className="flex justify-center mb-8 transform group-hover:scale-110 transition-transform duration-300">
                                        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center p-4">
                                            <img
                                                src={value.imagePath}
                                                alt={value.title}
                                                className="w-12 h-12 object-contain"
                                            />
                                        </div>
                                    </div>
                                    <h3 className="text-white text-2xl font-bold mb-4 text-center">{value.title}</h3>
                                    <p className="text-white/90 leading-relaxed text-center">{value.content}</p>
                                </div>

                                {/* Hover Effect Border */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-3xl transition-all duration-300"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="relative">

                <div className="relative py-16 md:py-20">
                    <div className="container mx-auto px-4 text-center">
                        {/* Decorative Element */}
                        <div className="w-16 h-1 bg-maroon mx-auto mb-6 rounded-full"></div>

                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 font-[Poppins] leading-tight">
                            Looking to Explore Qatar?
                        </h2>

                        <p className="text-lg md:text-xl mb-8 text-gray-600 max-w-2xl mx-auto font-[Inter] leading-relaxed">
                            Discover the best of Qatar with Doha Pride. Unforgettable experiences await you.
                        </p>

                        <div className="flex justify-center gap-4 md:gap-6">
                            <a href="tel:+97430205356" className="group bg-[#145c74] hover:bg-[#145c74]/90 text-white px-6 md:px-10 py-3 md:py-4 rounded-full transition-all flex items-center gap-2 text-base md:text-lg font-medium shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300">
                                <Phone className="w-5 h-5 md:w-6 md:h-6 group-hover:animate-pulse" />
                                <span className="font-[Poppins]">Call Now</span>
                            </a>

                            <Link to='/tours-activities'>
                                <button className="bg-transparent border-2 border-maroon text-maroon px-6 md:px-10 py-3 md:py-4 rounded-full transition-all flex items-center gap-2 text-base md:text-lg font-medium hover:bg-maroon hover:text-white duration-300 group">
                                    <span className="font-[Poppins]">Learn More</span>
                                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;