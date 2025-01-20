import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../api/Route';

const LoadingSpinner = () => (
    <div className="w-full h-[75vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-600"></div>
    </div>
  );
  
  const ContactEnquiry = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
      fetchEnquiries();
    }, []);
  
    const fetchEnquiries = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(`${BASE_URL}/contact-messages/`);
        setEnquiries(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching enquiries:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
  
    const handleStatusChange = async (id, newStatus) => {
      setLoading(true); // Show loading during status update
      try {
        await axios.patch(`${BASE_URL}/contact-messages/${id}/`, {
          status: newStatus
        });
        fetchEnquiries(); // Refresh the list
      } catch (error) {
        console.error('Error updating status:', error);
      } finally {
        setLoading(false); // Stop loading after update
      }
    };
  
    if (loading) {
      return <LoadingSpinner />;
    }
  
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Back
          </button>
          <h1 className="text-2xl font-bold">Enquiry List</h1>
        </div>
  
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enquiries.map((enquiry) => (
                <tr key={enquiry.id} className={`${enquiry.status === 'pending' ? 'bg-red-100' : 'bg-white'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">{enquiry.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{enquiry.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{enquiry.phone}</td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs truncate">{enquiry.message}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(enquiry.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={enquiry.status}
                      onChange={(e) => handleStatusChange(enquiry.id, e.target.value)}
                      className={`rounded-md border border-gray-300 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        enquiry.status === 'pending' ? 'text-grey-600' : 'text-gray-600'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="noted">Noted</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  

export default ContactEnquiry;