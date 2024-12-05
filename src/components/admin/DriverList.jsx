import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaCircle, FaComments } from "react-icons/fa";
import AdminDriverChat from "./AdminDriverChat";
import { BASE_URL } from "../../api/Route";
export default function DriverList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
      const fetchDrivers = async () => {
        try {
          const response = await axios.get(`${BASE_URL}api/drivers/`); 
          setDrivers(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching drivers:", error);
          setError("Failed to load drivers");
          setLoading(false);
        }
      };
  
      fetchDrivers();
    }, []);
    const filteredDrivers = drivers.filter(driver =>
      driver.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleChat = (driverId) => {
      console.log(`Opening chat with driver ${driverId}`);
    };
  
    return (
      
      <div className="p-6">
        {/* Header and Search Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Driver List</h1>
          
          {/* Search Bar */}
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search drivers by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {loading && <div>Loading drivers...</div>}
        {error && <div className="text-red-500">{error}</div>}
  
        {!loading && !error && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th> */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Chat
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDrivers.map((driver) => (
                    <tr key={driver.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {driver.username}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {driver.email}
                        </div>
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap"> */}
                        {/* <div className="text-sm text-gray-500">
                          {driver.phone}873927974
                        </div> */}
                      {/* </td> */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {/* <FaCircle 
                            className={`mr-2 h-2 w-2 ${
                              driver.status === 'active' 
                                ? 'text-green-500' 
                                : 'text-gray-400'
                            }`} 
                          />
                          <span className={`text-sm ${
                            driver.status === 'active'
                              ? 'text-green-800'
                              : 'text-gray-600'
                          }`}>
                          </span> */}
                          <FaCircle className="mr-2 h-2 w-2 text-green-500"/>
                          <span className='text-sm text-green-800'>Active</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleChat(driver.id)}
                          className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                        >
                          <FaComments size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
  
            {filteredDrivers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No drivers found matching your search.
              </div>
            )}
          </div>
        )}
      </div>
    );
  }