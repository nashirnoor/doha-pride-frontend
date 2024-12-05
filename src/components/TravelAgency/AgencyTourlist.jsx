import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../api/Route';



export default function AgencyTourList( {refreshTrigger }) {
    const [editingCell, setEditingCell] = useState(null);
    const [showNotes, setShowNotes] = useState(false);
    const [transfers, setTransfers] = useState([]);

    const [drivers, setDrivers] = useState([]);
    const [driverSuggestions, setDriverSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [tours, setTours] = useState([]);
    const [toursSuggestions, setToursSuggestions] = useState([]);
    const [showTourSuggestions, setShowTourSuggestions] = useState(false);

    const [showStatusSuggestions, setShowStatusSuggestions] = useState(false);

    const [hotels, setHotels] = useState([]);
    const [hotelSuggestions, setHotelSuggestions] = useState([]);
    const [showHotelSuggestions, setShowHotelSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchBy, setSearchBy] = useState('id'); 
    const tableRef = useRef(null);
    const inputRef = useRef(null);
    const [dateRange, setDateRange] = useState({
        fromDate: '',
        toDate: ''
    });

    const STATUS_CHOICES = [
        'done',
        'pending',
        'posted',
        'ongoing',
        'cancelled'
    ];

    const filteredTransfers = transfers.filter(transfer => {
        // First check the existing search conditions
        const matchesSearch = !searchQuery || (
            (searchBy === 'id' && transfer.unique_code?.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (searchBy === 'status' && transfer.status?.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (searchBy === 'hotel' && transfer.hotel_name?.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        // Then check date range if dates are set
        const matchesDateRange = (!dateRange.fromDate || !dateRange.toDate) ? true :
            (transfer.date >= dateRange.fromDate && transfer.date <= dateRange.toDate);

        return matchesSearch && matchesDateRange;
    });

    const clearFilters = () => {
        setSearchQuery('');
        setDateRange({ fromDate: '', toDate: '' });
        setSearchBy('id');
    };

    useEffect(() => {
        const initializeData = async () => {
            setIsLoading(true);
            try {
                await fetchDrivers();
                await fetchToursBooking();
                await fetchToursList(); 
                await fetchHotels();
            } catch (error) {
                console.error('Error initializing data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        initializeData();
    }, [refreshTrigger]);

    useEffect(() => {
        if (editingCell && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingCell]);

    const fetchDrivers = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`${BASE_URL}api/drivers/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setDrivers(response.data);
        } catch (error) {
            console.error('Error fetching drivers:', error);
        }
    };
    const fetchToursList = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`${BASE_URL}api/travel-agency-tours/`, {  
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setTours(response.data);
        } catch (error) {
            console.error('Error fetching tours:', error);
        }
    };
    const fetchToursBooking = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`${BASE_URL}api/travel-agency-tours/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const TourResponse = await axios.get(`${BASE_URL}tours/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const driversResponse = await axios.get(`${BASE_URL}api/drivers/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const currentDrivers = driversResponse.data;
            const currentTours = TourResponse.data;
            console.log("Current tours",currentTours)

            const transformedData = response.data.map(transfer => {
                const tourData = currentTours.find(t => t.id === transfer.tour_activity);
                const driverUser = currentDrivers.find(d => d.id === transfer.driver);
                return {
                    ...transfer,
                    driver_id: transfer.driver,
                    driver_name: driverUser?.username || '',
                    tour_activity: tourData?.title || '',  
                    tour_id: transfer.tour_activity,  
                };
            });
            console.log(transformedData)
            setTransfers(transformedData);
        } catch (error) {
            console.error('Error fetching transfers:', error);
        } finally{
            setIsLoading(false)
        }
    };

    const fetchHotels = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`${BASE_URL}api/hotel-categories/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
             const processedHotels = response.data.reduce((acc, hotel) => {
                acc.push({
                    id: hotel.id,
                    name: hotel.hotel_name,
                    isMainHotel: true
                });                
                hotel.subcategories.forEach(sub => {
                    acc.push({
                        id: sub.id,
                        name: sub.name,
                        parentHotelId: hotel.id,
                        parentHotelName: hotel.hotel_name
                    });
                });
                
                return acc;
            }, []);
            
            setHotels(processedHotels);
        } catch (error) {
            console.error('Error fetching hotels:', error);
        }
    };

    const columns = [
        { key: 'unique_code', header: 'ID' },
        { key: 'name', header: 'Guest' },
        { key: 'tour_activity', header: 'Tourname'},
        { key: 'date', header: 'Date Schedule' },
        { key: 'time', header: 'Time' },
        { key: 'hotel_name', header: 'Hotel' },
        { key: 'room_no', header: 'Room' },
        { key: 'voucher_no', header: 'Voucher' },
        { key: 'flight', header: 'Flight' },
        { key: 'vehicle', header: 'Vehicle' },
        { key: 'driver', header: 'Driver' },
        { key: 'amount', header: 'Charges' },
        { key: 'status', header: 'Remarks' },
        { key: 'note', header: 'Notes' },
    ];

    const visibleColumns = showNotes ? columns : columns.filter(col => col.key !== 'note');

    const handleCellClick = (transfer, columnKey) => {
        if (columnKey !== 'unique_code') {
            setEditingCell({ id: transfer.id, columnKey });
            if (columnKey === 'status') {
                setShowStatusSuggestions(true);
            } else if (columnKey === 'hotel_name'){
                setShowHotelSuggestions(true)
            }
        }
    };

    const handleCellChange = (e, transferId, columnKey) => {
        const value = e.target.value;
        const updatedTransfers = [...transfers];
        const transferIndex = updatedTransfers.findIndex(t => t.id === transferId);

        if (transferIndex === -1) return;

        const transfer = updatedTransfers[transferIndex];

        if (columnKey === 'driver') {
            transfer.driver_name = value;
            transfer.driver = transfer.driver_id;

            const filtered = drivers.filter(driver =>
                driver.username.toLowerCase().includes(value.toLowerCase())
            );
            setDriverSuggestions(filtered);
            setShowSuggestions(true);
        }else if (columnKey === 'tour_activity') {
            transfer.tour_activity = value;  // This updates the displayed title
            const filtered = tours.filter(tour =>
                tour.title.toLowerCase().includes(value.toLowerCase())
            );
            setToursSuggestions(filtered);
            setShowTourSuggestions(true);
        } else if (columnKey === 'status') {
            transfer[columnKey] = value;
            const filteredStatus = STATUS_CHOICES.filter(status =>
                status.toLowerCase().includes(value.toLowerCase())
            );
            setShowStatusSuggestions(filteredStatus.length > 0);
        }
        else if (columnKey === 'hotel_name') {
            transfer[columnKey] = value;
            const filtered = hotels.filter(hotel =>
                hotel.name.toLowerCase().includes(value.toLowerCase())
            );
            setHotelSuggestions(filtered);
            setShowHotelSuggestions(true);
         } else {
            transfer[columnKey] = value;
        }

        setTransfers(updatedTransfers);
    };
    const handleSelectDriver = async (driver, transferId) => {
        const updatedTransfers = [...transfers];
        const transferIndex = updatedTransfers.findIndex(t => t.id === transferId);
        if (transferIndex === -1) return;
        const transfer = updatedTransfers[transferIndex];
        transfer.driver_id = driver.id;
        transfer.driver = driver.id;
        transfer.driver_name = driver.username;
        setTransfers(updatedTransfers);
        setShowSuggestions(false);
        setEditingCell(null);
        await updateTransfer(transfer);
    };

    const handleSelectTour = async (tour, transferId) => {
        const updatedTransfers = [...transfers];
        const transferIndex = updatedTransfers.findIndex(t => t.id === transferId);
        if (transferIndex === -1) return;

        const transfer = updatedTransfers[transferIndex];
        transfer.tour_id = tour.id;
        transfer.tour_activity = tour.title;
        // transfer.tour_name = tour.username;
        setTransfers(updatedTransfers);
        setShowTourSuggestions(false);
        setEditingCell(null);
        await updateTransfer(updatedTransfers[transferIndex]);
    };


    const handleSelectHotel = async (hotel, transferId) => {
        const updatedTransfers = [...transfers];
        const transferIndex = updatedTransfers.findIndex(t => t.id === transferId);
        if (transferIndex === -1) return;
    
        const transfer = updatedTransfers[transferIndex];
        
        transfer.hotel_name = hotel.isMainHotel ? 
            hotel.name : 
            `${hotel.name} (${hotel.parentHotelName})`;
        
        transfer.hotel = hotel.id;
        
        setTransfers(updatedTransfers);
        setShowHotelSuggestions(false);
        setEditingCell(null);
    
        try {
            await updateTransfer(transfer);
        } catch (error) {
            console.error('Error updating hotel:', error);
        }
    };


    const handleSelectStatus = (status, transferId) => {
        const updatedTransfers = [...transfers];
        const transferIndex = updatedTransfers.findIndex(t => t.id === transferId);
        if (transferIndex === -1) return;
        updatedTransfers[transferIndex].status = status;
        setTransfers(updatedTransfers);
        setShowStatusSuggestions(false);
        setEditingCell(null);
        updateTransfer(updatedTransfers[transferIndex]);
    };


    const handleKeyDown = async (e, transferId, columnKey) => {
        if (e.key === 'Enter') {
            const transfer = transfers.find(t => t.id === transferId);
            if (!transfer) return;

            if (columnKey === 'status') {
                const currentValue = transfer.status?.toLowerCase();
                if (STATUS_CHOICES.includes(currentValue)) {
                    setEditingCell(null);
                    setShowStatusSuggestions(false);
                    await updateTransfer(transfer);
                }
            } else if (columnKey === 'hotel_name') {
                setEditingCell(null);
                setShowHotelSuggestions(false);
                await updateTransfer(transfer);
            } else {
                setEditingCell(null);
                setShowStatusSuggestions(false);
                await updateTransfer(transfer);
            }
        } else if (e.key === 'Escape') {
            setEditingCell(null);
            setShowStatusSuggestions(false);
            setShowSuggestions(false);
            setShowHotelSuggestions(false);
        }
    };

    const updateTransfer = async (transfer) => {
        try {
            const token = localStorage.getItem('access_token');
            const updateData = {
                ...transfer,
                driver: transfer.driver || transfer.driver_id, // Use either driver or driver_id
                tour_activity: transfer.tour_id,
                status: transfer.status?.toLowerCase()
            };

        delete updateData.driver_id;
        delete updateData.driver_name;
        delete updateData.tour_id;

            const response = await axios.patch(
                `${BASE_URL}api/bookings-tour/${transfer.id}/`,
                updateData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Transfer updated successfully', response.data);
            await fetchToursBooking();
        } catch (error) {
            console.error('Error updating transfer:', error);
        }
    };

    const toggleNotes = () => {
        setShowNotes(!showNotes);
    };

    const renderCell = (transfer, column) => {
        if (column.key === 'unique_code') {
            return transfer[column.key];
        }

        if (editingCell?.id === transfer.id && editingCell?.columnKey === column.key) {
            if (column.key === 'driver') {
                return (
                    <div className="relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={transfer.driver_name || ''}
                            onChange={(e) => handleCellChange(e, transfer.id, column.key)}
                            onKeyDown={(e) => handleKeyDown(e, transfer.id, column.key)}
                            className="w-full p-1 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onBlur={() => {
                                setTimeout(() => {
                                    if (!showSuggestions) {
                                        setEditingCell(null);
                                    }
                                }, 200);
                            }}
                        />
                        {showSuggestions && driverSuggestions.length > 0 && (
                            <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                                {driverSuggestions.map((driver) => (
                                    <div
                                        key={driver.id}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            handleSelectDriver(driver, transfer.id);
                                        }}
                                    >
                                        {driver.username}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            }
            if (column.key === 'tour_activity') {
                return (
                    <div className="relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={transfer[column.key] || ''}
                            onChange={(e) => handleCellChange(e, transfer.id, column.key)}
                            onKeyDown={(e) => handleKeyDown(e, transfer.id, column.key)}
                            className="w-full p-1 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onBlur={() => {
                                setTimeout(() => {
                                    if (!showTourSuggestions) {
                                        setEditingCell(null);
                                    }
                                }, 200);
                            }}
                        />
                        {showTourSuggestions && toursSuggestions.length > 0 && (
                            <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                                {toursSuggestions.map((tour) => (
                                    <div
                                        key={tour.id}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            handleSelectTour(tour, transfer.id);
                                        }}
                                    >
                                        {tour.title}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            }

            if (column.key === 'date' || column.key === 'time') {
                return (
                    <input
                        ref={inputRef}
                        type={column.key === 'date' ? 'date' : 'time'}
                        value={transfer[column.key] || ''}
                        onChange={(e) => handleCellChange(e, transfer.id, column.key)}
                        onKeyDown={(e) => handleKeyDown(e, transfer.id, column.key)}
                        onBlur={() => setEditingCell(null)}
                        className="w-full p-1 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                );
            }

            if (column.key === 'hotel_name') {
                return (
                    <div className="relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={transfer[column.key] || ''}
                            onChange={(e) => handleCellChange(e, transfer.id, column.key)}
                            onKeyDown={(e) => handleKeyDown(e, transfer.id, column.key)}
                            className="w-full p-1 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onFocus={() => {
                                setShowHotelSuggestions(true);
                                const filtered = hotels.filter(hotel =>
                                    hotel.name.toLowerCase().includes((transfer[column.key] || '').toLowerCase())
                                );
                                setHotelSuggestions(filtered);
                            }}
                            onBlur={() => {
                                // Use setTimeout to allow click events on suggestions to fire
                                setTimeout(() => {
                                    if (!showHotelSuggestions) {
                                        setEditingCell(null);
                                    }
                                }, 200);
                            }}
                        />
                        {showHotelSuggestions && (
    <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
        {hotelSuggestions.map((hotel) => (
            <div
                key={hotel.id}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                    hotel.isMainHotel ? 'font-semibold' : 'pl-8'
                }`}
                onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelectHotel(hotel, transfer.id);
                }}
            >
                {hotel.isMainHotel ? (
                    hotel.name
                ) : (
                    <span>
                        {hotel.name} <span className="text-gray-500">({hotel.parentHotelName})</span>
                    </span>
                )}
            </div>
        ))}
    </div>
)}
                    </div>
                );
            }

            if (column.key === 'status') {
                return (
                    <div className="relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={transfer[column.key] || ''}
                            onChange={(e) => handleCellChange(e, transfer.id, column.key)}
                            onKeyDown={(e) => handleKeyDown(e, transfer.id, column.key)}
                            className="w-full p-1 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onBlur={() => {
                                if (!showStatusSuggestions) {
                                    const currentValue = transfer[column.key]?.toLowerCase();
                                    if (!STATUS_CHOICES.includes(currentValue)) {
                                        const updatedTransfers = [...transfers];
                                        const index = updatedTransfers.findIndex(t => t.id === transfer.id);
                                        if (index !== -1) {
                                            updatedTransfers[index].status = '';
                                            setTransfers(updatedTransfers);
                                        }
                                    }
                                    setEditingCell(null);
                                }
                            }}
                        />
                        {showStatusSuggestions && (
                            <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                                {STATUS_CHOICES.filter(status =>
                                    status.toLowerCase().includes((transfer[column.key] || '').toLowerCase())
                                ).map((status) => (
                                    <div
                                        key={status}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            handleSelectStatus(status, transfer.id);
                                        }}
                                    >
                                        {status}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            }

            return (
                <input
                ref={inputRef}
                type="text"
                value={transfer[column.key] || ''}
                onChange={(e) => handleCellChange(e, transfer.id, column.key)}
                onKeyDown={(e) => handleKeyDown(e, transfer.id, column.key)}
                onBlur={() => setEditingCell(null)}
                className="w-full p-1 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            );
        }

        if (column.key === 'driver') {
            return transfer.driver_name || '';
        }

        return transfer[column.key];
    };


    return (
        <div className="p-4 overflow-x-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex items-center space-x-4 flex-1">
                        <div className="flex items-center space-x-2">
                            <select
                                value={searchBy}
                                onChange={(e) => setSearchBy(e.target.value)}
                                className="px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="id">Search by ID</option>
                                <option value="hotel">Search by Hotel</option>
                                <option value="status">Search by Status</option>
                            </select>
                            <input
                                type="text"
                                placeholder={`Search by ${searchBy === 'id' ? 'ID' : searchBy === 'hotel' ? 'hotel name' : 'status'}...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-3 py-1.5 border border-gray-300 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {/* Add date range inputs */}
                            <div className="flex items-center space-x-2">
                                <input
                                    type="date"
                                    value={dateRange.fromDate}
                                    onChange={(e) => setDateRange(prev => ({ ...prev, fromDate: e.target.value }))}
                                    className="px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <span className="text-gray-500">to</span>
                                <input
                                    type="date"
                                    value={dateRange.toDate}
                                    onChange={(e) => setDateRange(prev => ({ ...prev, toDate: e.target.value }))}
                                    className="px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Add clear filters button */}
                            <button
                                onClick={clearFilters}
                                className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition duration-200"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={toggleNotes}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                        >
                            {showNotes ? 'Hide Notes' : 'Show Notes'}
                        </button>
                    </div>
                </div>
                {isLoading ? (
    <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
) : (
                <div className="overflow-x-auto">
                <table ref={tableRef} className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            {visibleColumns.map((column) => (
                                <th
                                    key={column.key}
                                    className="px-3 py-2 text-xs font-semibold text-gray-700 border border-gray-200"
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransfers.map((transfer) => (
                            <tr key={transfer.id} className="hover:bg-gray-50">
                                {visibleColumns.map((column) => (
                                    <td
                                        key={column.key}
                                        className={`px-3 py-2 text-sm border border-gray-200 ${
                                            column.key === 'unique_code' ? 'cursor-default' : 'cursor-pointer'
                                        }`}
                                        onClick={() => handleCellClick(transfer, column.key)}
                                    >
                                        {renderCell(transfer, column)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
)}

                {!isLoading && filteredTransfers.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No transfer records found
                    </div>
                )}
            </div>
        </div>
    );
}