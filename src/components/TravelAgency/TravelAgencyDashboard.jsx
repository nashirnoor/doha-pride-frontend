import { useNavigate } from 'react-router-dom';
import { FaCar, FaPlane, FaUserTie } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState,useEffect } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../../utils/auth';
import { agencyLogout } from '../../utils/auth';
import { BASE_URL } from '../../api/Route';


export default function TravelAgencyDashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    stats: {
      transfer_bookings: 0,
      pending_transfers: 0,
      tour_bookings: 0,
      pending_tours: 0,
      drivers: 0
    },
    transfer_data: [],
    tour_data: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        console.log('Token:', token); // Debug token

        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await fetch(`${BASE_URL}agency-dashboard-stats/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          console.error('Response status:', response.status);
          const errorData = await response.json().catch(() => ({}));
          console.error('Error data:', errorData);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Dashboard data:', data);
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    agencyLogout();
  };

  const stats = [
    {
      title: "Transfer Bookings",
      path: "/agency-transfer",
      count: dashboardData.stats.transfer_bookings,
      pending: dashboardData.stats.pending_transfers,
      icon: <FaCar size={24} />,
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      textColor: "text-blue-100",
      description: `${dashboardData.stats.pending_transfers} pending transfers`
    },
    {
      title: "Tour Bookings",
      path: "/agency-tour",
      count: dashboardData.stats.tour_bookings,
      pending: dashboardData.stats.pending_tours,
      icon: <FaPlane size={24} />,
      bgColor: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      textColor: "text-green-100",
      description: `${dashboardData.stats.pending_tours} pending tours`
    },
    {
      title: "Drivers",
      path: "/driver-list",
      count: dashboardData.stats.drivers,
      icon: <FaUserTie size={24} />,
      bgColor: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      textColor: "text-purple-100",
      description: "Active drivers"
    }
  ];

  return (
    <>
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
      
      <div className='pt-6'>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} ${stat.hoverColor} rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer`}
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Transfer Bookings Overview</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboardData.transfer_data}>
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
          <h2 className="text-xl font-bold mb-4">Tour Bookings Overview</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboardData.tour_data}>
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
    </div>
    </>
  );
}