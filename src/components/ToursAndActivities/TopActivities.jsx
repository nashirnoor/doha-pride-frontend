import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { BASE_URL } from '../../api/Route';

const TopActivities = () => {

    const [activeActivity, setActiveActivity] = useState(0);
    const [activities, setActivities] = useState([]);
    useEffect(() => {
        axios.get(`${BASE_URL}top-activities/`)
          .then(response => {
            setActivities(response.data);
          })
          .catch(error => {
            console.error("There was an error fetching the activities!", error);
          });
      }, []);
    return (
        <div className="px-8 sm:px-12 lg:px-24 py-8">
        <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
                Discover Our Top Activities
            </h3>
            <p className="text-lg text-center text-gray-500 mb-8">
                Unforgettable Experiences Await Your Adventure
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
                {activities.map((activity, index) => (
                    <button
                        key={activity.id}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                            activeActivity === index
                                ? "bg-maroon text-white ring-2 ring-maroon"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                        onClick={() => setActiveActivity(index)}
                    >
                        {activity?.name}
                    </button>
                ))}
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Image Section */}
                    <div className="relative w-full h-[500px] group">
                        <img
                            src={activities[activeActivity]?.image}
                            alt={activities[activeActivity]?.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-500"></div>
                    </div>
                    {/* Content Section */}
                    <div className="p-8 flex flex-col justify-center">
                        <div className="mb-6">
                            <h4 className="text-3xl font-bold text-gray-800 mb-4">
                                {activities[activeActivity]?.name}
                            </h4>
                            <div className="h-1 w-20 bg-maroon mb-4"></div>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                {activities[activeActivity]?.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default TopActivities
