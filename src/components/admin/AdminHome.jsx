import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import RecentTransferActions from "./RecentTransferActions";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCar, FaPlane, FaUserTie, FaClock } from 'react-icons/fa';
import { BASE_URL } from '../../api/Route';
import RecentTourActions from './RecentTourActions';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';
import { logout } from '../../utils/auth';
import CurrencyTotals from './CurrencyTotals';

export default function AdminHome() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    stats: {
      transfer_bookings: 0,
      tour_bookings: 0,
      drivers: 0,
      pending_transfers: 0,
      pending_tours: 0,
    },
    transfer_monthly: [],
    tour_monthly: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}dashboard-stats/`);
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);


  const handleLogout = () => {
    logout();
  };

  const mainStats = [
    {
      title: "Transfer Booking",
      path: "/transfer-admin",
      count: dashboardData.stats.transfer_bookings,
      icon: <FaCar size={24} />,
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      textColor: "text-blue-100",
      description: "Total transfers",
    },
    {
      title: "Tour Booking",
      path: "/admin-tour",
      count: dashboardData.stats.tour_bookings,
      icon: <FaPlane size={24} />,
      bgColor: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      textColor: "text-green-100",
      description: "Total tours",
    },
    {
      title: "Drivers",
      path: "/driver-list",
      count: dashboardData.stats.drivers,
      icon: <FaUserTie size={24} />,
      bgColor: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      textColor: "text-purple-100",
      description: "Active drivers",
    }
  ];

  const pendingStats = [
    {
      title: "Pending Transfers",
      path: "/transfer-admin",
      count: dashboardData.stats.pending_transfers,
      icon: <FaClock size={24} />,
      bgColor: "bg-cyan-500",
      hoverColor: "hover:bg-yellow-600",
      textColor: "text-yellow-100",
    },
    {
      title: "Enquiries",
      path: "/contact-enquiry",
      count: dashboardData.stats.pending_contact,
      icon: <FaClock size={24} />,
      bgColor: "bg-cyan-500",
      hoverColor: "hover:bg-cyan-500",
      textColor: "text-orange-100",
    },
    {
      title: "Pending Tours",
      path: "/admin-tour",
      count: dashboardData.stats.pending_tours,
      icon: <FaClock size={24} />,
      bgColor: "bg-cyan-500",
      hoverColor: "hover:bg-cyan-500",
      textColor: "text-orange-100",
    },
   
  ];

  return (
    <div className="p-6 relative">
       <div className="absolute top-2 right-2">
        <button
          onClick={handleLogout}
          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md 
                     transition-colors duration-200 flex items-center gap-1.5 text-sm
                     shadow-sm border border-gray-200"
        >
          <FaSignOutAlt size={14} />
          <span>Logout</span>
        </button>
      </div>

      <div className="pt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {mainStats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} ${stat.hoverColor} rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer`}
              onClick={() => navigate(stat.path)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className={`${stat.textColor} text-sm font-medium uppercase`}>
                      {stat.title}
                    </p>
                    <p className="text-white text-3xl font-bold mt-1">
                      {stat.count}
                    </p>
                  </div>
                  <div className={`${stat.textColor} opacity-80`}>
                    {stat.icon}
                  </div>
                </div>
                <p className={`${stat.textColor} text-sm mt-2`}>
                  {stat.description}
                </p>
                <p className={`${stat.textColor} text-sm mt-4 leading-relaxed`}>
                  {stat.textView}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-6 mb-8">
          {pendingStats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} ${stat.hoverColor} rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer max-w-sm`}
              onClick={() => navigate(stat.path)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`${stat.textColor} text-sm font-medium uppercase`}>
                      {stat.title}
                    </p>
                    <p className="text-white text-3xl font-bold mt-1">
                      {stat.count}
                    </p>
                  </div>
                  <div className={`${stat.textColor} opacity-80`}>
                    {stat.icon}
                  </div>
                </div>
                <p className={`${stat.textColor} text-sm mt-4`}>
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-8">
  <h2 className="text-xl font-bold mb-4">Currency Totals</h2>
  <CurrencyTotals />
</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Completed Transfer Bookings</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardData.transfer_monthly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="bookings" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Completed Tour Bookings</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardData.tour_monthly}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="bookings" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>



        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-8'>
  {JSON.parse(localStorage.getItem('user_type')) === 'admin' && (
    <>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recent Tour Actions</h2>
          <button
            onClick={() => navigate('/all-recent-tour')}
            className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 
                     transition-colors duration-200 text-sm flex items-center gap-1.5"
          >
            <span>View All</span>
            <FaArrowRight size={12} />
          </button>
        </div>
        <RecentTourActions />
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recent Transfer Actions</h2>
          <button
            onClick={() => navigate('/all-recent-transfer')}
            className="px-3 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 
                     transition-colors duration-200 text-sm flex items-center gap-1.5"
          >
            <span>View All</span>
            <FaArrowRight size={12} />
          </button>
        </div>
        <RecentTransferActions />
      </div>
    </>
  )}
</div>
      </div>
    </div>
  );
}