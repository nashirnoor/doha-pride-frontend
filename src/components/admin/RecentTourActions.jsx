import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../api/Route';

const RecentTourActions = () => {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const token = localStorage.getItem('access_token')
        const response = await axios.get(`${BASE_URL}api/tour-audit-dashboard/`,{
          headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setActions(response.data);
        setLoading(false);
      } catch (err) {
        setError('Refresh to see latest actions');
        setLoading(false);
      }
    };

    fetchActions();
    const interval = setInterval(fetchActions, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatAction = (action) => {
    if (action.action === 'create') {
      return 'created new booking';
    }
    return `updated ${action.field_name.replace('_', ' ')}`;
  };

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-center text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 m-10 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Recent Tour Booking Actions</h2>
      <div className="space-y-4">
        {actions.map((action) => (
          <div
            key={action.id}
            className="border-l-4 border-maroon pl-4 py-2 hover:bg-gray-50"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-800">
                  {action.staff_name} {formatAction(action)}
                </p>
                <p className="text-sm text-gray-600">
                  Booking: {action.booking_name}
                </p>
                {action.action === 'update' && (
                  <p className="text-sm text-gray-500">
                    Changed from: {action.old_value} → {action.new_value}
                  </p>
                )}
              </div>
              <span className="text-sm text-gray-400">
                {formatTimestamp(action.timestamp)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTourActions;