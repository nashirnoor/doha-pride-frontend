import { logout } from '../utils/auth'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Chat from '../components/Chat';
import { LogOut, Calendar, MapPin, Clock, User, MessageCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { BASE_URL } from '../api/Route';



const Profile = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeChatDriver, setActiveChatDriver] = useState(null);

  const handleChatClick = (driverId, driverName) => {
    setActiveChatDriver({ id: driverId, name: driverName });
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.get(
          `${BASE_URL}api/bookings-transfer/user_bookings/?email=${userEmail}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(response.data)
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleLogout = () => {
    logout();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-16 h-16 border-4 border-maroon border-t-transparent rounded-full animate-spin"></div>
    </div>
  }
  if (error) return <div>{error}</div>;

  const upcomingBookings = bookings.filter(booking => booking.status !== 'done');
  const completedBookings = bookings.filter(booking => booking.status === 'done');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
              <p className="text-gray-500 mt-1">Manage your upcoming rides</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2.5 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Upcoming Rides Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="text-blue-600" size={24} />
            <h2 className="text-2xl font-semibold text-gray-800">Upcoming Rides</h2>
          </div>

          {upcomingBookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-500 text-lg">No upcoming bookings found</p>
              <Link to='/transfer'>
                <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
                  Book a new ride
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="relative bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  {/* Status Badge and Service Name */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800 pr-2">
                      {booking.transfer_service_name}
                    </h3>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${booking.status === 'done' ? 'bg-green-100 text-green-700' :
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                      }`}>
                      {booking.status}
                    </span>
                  </div>
                  {/* Journey Details */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="text-green-600 mt-1" size={18} />
                        <div>
                          <p className="text-sm text-gray-500">From</p>
                          <p className="text-gray-700">{booking.from_location}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="text-red-600 mt-1" size={18} />
                        <div>
                          <p className="text-sm text-gray-500">To</p>
                          <p className="text-gray-700">{booking.to_location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="text-blue-600 mt-1" size={18} />
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="text-gray-700">{formatDate(booking.date)}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="text-blue-600 mt-1" size={18} />
                        <div>
                          <p className="text-sm text-gray-500">Time</p>
                          <p className="text-gray-700">{formatTime(booking.time)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Driver Section */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="text-gray-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Driver</p>
                        <p className="text-gray-700 font-medium">
                          {booking?.driver_name || "Not assigned yet"}
                        </p>
                      </div>
                    </div>

                    {booking.driver && (
                      <button
                        onClick={() => handleChatClick(booking.driver, booking.driver_name)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50"
                      >
                        <MessageCircle size={20} />
                        <span className="hidden sm:inline">Chat with driver</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>


        {completedBookings.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="text-green-600" size={24} />
              <h2 className="text-2xl font-semibold text-gray-800">Completed Rides</h2>
            </div>

            {completedBookings.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-500 text-lg">No completed rides yet</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {completedBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="relative bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Service Name */}
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {booking.transfer_service_name}
                    </h3>

                    {/* Journey Details */}
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="text-green-600 mt-1" size={18} />
                          <div>
                            <p className="text-sm text-gray-500">From</p>
                            <p className="text-gray-700">{booking.from_location}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="text-red-600 mt-1" size={18} />
                          <div>
                            <p className="text-sm text-gray-500">To</p>
                            <p className="text-gray-700">{booking.to_location}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Calendar className="text-blue-600 mt-1" size={18} />
                          <div>
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="text-gray-700">{formatDate(booking.date)}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Clock className="text-blue-600 mt-1" size={18} />
                          <div>
                            <p className="text-sm text-gray-500">Time</p>
                            <p className="text-gray-700">{formatTime(booking.time)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Driver Section */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <User className="text-gray-600" size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Driver</p>
                          <p className="text-gray-700 font-medium">
                            {booking?.driver_name || "Not assigned yet"}
                          </p>
                        </div>
                      </div>

                      {booking.driver && (
                        <button
                          onClick={() => handleChatClick(booking.driver, booking.driver_name)}
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50"
                        >
                          <MessageCircle size={20} />
                          <span className="hidden sm:inline">Chat with driver</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {/* Chat Modal */}
        {activeChatDriver && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
              <Chat
                driverId={activeChatDriver.id}
                driverName={activeChatDriver.name}
                onClose={() => setActiveChatDriver(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;




