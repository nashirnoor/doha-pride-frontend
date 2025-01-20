import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../api/Route';
import axiosInstance from "../../utils/axios";


const CURRENCY_CHOICES = [
    'QAR',
    'Pound',
    'USD',
    'EUR'
];

const PAYMENT_TYPE_CHOICES = [
    'CASH TRIP',
    'CARD PAYMENT',
    'CREDIT'
];

export default function TransferTable({ refreshTrigger }) {
    const [editingCell, setEditingCell] = useState(null);
    const [transfers, setTransfers] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [driverSuggestions, setDriverSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showStatusSuggestions, setShowStatusSuggestions] = useState(false);
    const [hotels, setHotels] = useState([]);
    const [hotelSuggestions, setHotelSuggestions] = useState([]);
    const [showHotelSuggestions, setShowHotelSuggestions] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchBy, setSearchBy] = useState('id');
    const [showCurrencySuggestions, setShowCurrencySuggestions] = useState(false);
    const [showPaymentTypeSuggestions, setShowPaymentTypeSuggestions] = useState(false);
    const tableRef = useRef(null);
    const inputRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    // Add these with your other useState declarations
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
            (searchBy === 'hotel' && transfer.hotel_name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (searchBy === 'name' && transfer.name?.toLowerCase().includes(searchQuery.toLowerCase()))

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
            await fetchDrivers();
            await fetchTransfers();
            fetchHotels();
        };
        initializeData();
    }, [searchQuery, searchBy, dateRange.fromDate, dateRange.toDate, currentPage, refreshTrigger]);

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

    const fetchTransfers = async () => {
        setIsLoading(true)
        try {
            const params = new URLSearchParams();
        if (searchQuery) {
            params.append('search', searchQuery);
            params.append('search_by', searchBy);
        }
        if (dateRange.fromDate && dateRange.toDate) {
            params.append('from_date', dateRange.fromDate);
            params.append('to_date', dateRange.toDate);
        }
        
        // Add pagination parameters
        params.append('page', currentPage); // Add state for currentPage
        params.append('page_size', 35);
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`${BASE_URL}api/bookings-transfer/?${params.toString()}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // Get fresh drivers data
            const driversResponse = await axios.get(`${BASE_URL}api/drivers/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const currentDrivers = driversResponse.data;

            const transformedData = response.data.results.map(transfer => {
                const driverUser = currentDrivers.find(d => d.id === transfer.driver);
                return {
                    ...transfer,
                    driver_id: transfer.driver,
                    driver_name: driverUser?.username || ''
                };
            });
            setTransfers(transformedData);
            setTotalPages(Math.ceil(response.data.count / 35));
        } catch (error) {
            console.error('Error fetching transfers:', error);
        } finally {
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

            // Create a flattened array of hotel names including both main hotels and subcategories
            const processedHotels = response.data.reduce((acc, hotel) => {
                // Add main hotel
                acc.push({
                    id: hotel.id,
                    name: hotel.hotel_name,
                    isMainHotel: true
                });

                // Add subcategories
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
        { key: 'date', header: 'Date Schedule' },
        { key: 'time', header: 'Time' },
        { key: 'hotel_name', header: 'Hotel' },
        { key: 'name', header: 'Guest' },
        { key: 'room_no', header: 'Room' },
        { key: 'voucher_no', header: 'Voucher' },
        { key: 'from_location', header: 'From' },
        { key: 'to_location', header: 'To' },
        { key: 'flight', header: 'Flight' },
        { key: 'vehicle', header: 'Vehicle' },
        { key: 'driver', header: 'Driver' },
        { key: 'currency', header: 'Currency' },
        { key: 'amount', header: 'Charges' },
        { key: 'payment_type', header: 'Payment Type' },
        { key: 'status', header: 'Remarks' },
        { key: 'note', header: 'Notes' },
    ];

    const visibleColumns = columns;
    const handleCellClick = (transfer, columnKey) => {
        if (columnKey !== 'unique_code') {
            setEditingCell({ id: transfer.id, columnKey });
            if (columnKey === 'status') {
                setShowStatusSuggestions(true);
            } else if (columnKey === 'hotel_name') {
                setShowHotelSuggestions(true);
            } else if (columnKey === 'currency') {
                setShowCurrencySuggestions(true);
            } else if (columnKey === 'payment_type'){
                setShowPaymentTypeSuggestions(true)
            } else if (columnKey === 'driver') {  
                const filtered = drivers.filter(driver =>
                    driver.username.toLowerCase().includes((transfer.driver_name || '').toLowerCase())
                );
                setDriverSuggestions(filtered);
                setShowSuggestions(true);
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
        } else if (columnKey === 'status') {
            transfer[columnKey] = value;
            const filteredStatus = STATUS_CHOICES.filter(status =>
                status.toLowerCase().includes(value.toLowerCase())
            );
            setShowStatusSuggestions(filteredStatus.length > 0);
        } else if (columnKey === 'hotel_name') {
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

    const handleSelectCurrency = (currency, transferId) => {
        const updatedTransfers = [...transfers];
        const transferIndex = updatedTransfers.findIndex(t => t.id === transferId);
        if (transferIndex === -1) return;
        updatedTransfers[transferIndex].currency = currency;
        setTransfers(updatedTransfers);
        setShowCurrencySuggestions(false);
        setEditingCell(null);
        updateTransfer(updatedTransfers[transferIndex]);
    };

    const handleSelectPaymentType = (paymentType, transferId) => {
        const updatedTransfers = [...transfers];
        const transferIndex = updatedTransfers.findIndex(t => t.id === transferId);
        if (transferIndex === -1) return;
        updatedTransfers[transferIndex].payment_type = paymentType;
        setTransfers(updatedTransfers);
        setShowPaymentTypeSuggestions(false);
        setEditingCell(null);
        updateTransfer(updatedTransfers[transferIndex]);
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


    const handleSelectHotel = async (hotel, transferId) => {
        const updatedTransfers = [...transfers];
        const transferIndex = updatedTransfers.findIndex(t => t.id === transferId);
        if (transferIndex === -1) return;

        const transfer = updatedTransfers[transferIndex];

        // Set the hotel name based on whether it's a main hotel or subcategory
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
            }else if (columnKey === 'currency') {
                const currentValue = transfer.currency;
                if (CURRENCY_CHOICES.includes(currentValue)) {
                    setEditingCell(null);
                    setShowCurrencySuggestions(false);
                    await updateTransfer(transfer);
                }
            }  else if (columnKey === 'payment_type') {
                const currentValue = transfer.payment_type;
                if (PAYMENT_TYPE_CHOICES.includes(currentValue)) {
                    setEditingCell(null);
                    setShowPaymentTypeSuggestions(false);
                    await updateTransfer(transfer);
                }
            }else if (columnKey === 'hotel_name') {
                setEditingCell(null);
                setShowHotelSuggestions(false);
                await updateTransfer(transfer);
            }else if (columnKey === 'driver') {  
                setEditingCell(null);
                setShowSuggestions(false);
                await updateTransfer(transfer);
            }else {
                setEditingCell(null);
                setShowStatusSuggestions(false);
                await updateTransfer(transfer);
            }
        } else if (e.key === 'Escape') {
            setEditingCell(null);
            setShowStatusSuggestions(false);
            setShowSuggestions(false);
            setShowHotelSuggestions(false);
            setShowCurrencySuggestions(false)
            setShowPaymentTypeSuggestions(false);
        }
    };

    const updateTransfer = async (transfer) => {
        try {
            const token = localStorage.getItem('access_token');
            const updateData = {
                ...transfer,
                driver: transfer.driver || transfer.driver_id, // Use either driver or driver_id
                status: transfer.status?.toLowerCase()
            };

            // Remove fields that shouldn't be sent to the API
            delete updateData.driver_id;
            delete updateData.driver_name;

            const response = await axios.patch(
                `${BASE_URL}api/bookings-transfer/${transfer.id}/`,
                updateData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Transfer updated successfully', response.data);
            await fetchTransfers();
        } catch (error) {
            console.error('Error updating transfer:', error);
        }
    };

    const renderCell = (transfer, column) => {
        if (column.key === 'unique_code') {
            return transfer[column.key];
        }

        if (editingCell?.id === transfer.id && editingCell?.columnKey === column.key) {
            if (column.key === 'currency') {
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
                                    if (!showCurrencySuggestions) {
                                        const currentValue = transfer[column.key];
                                        if (!CURRENCY_CHOICES.includes(currentValue)) {
                                            const updatedTransfers = [...transfers];
                                            const index = updatedTransfers.findIndex(t => t.id === transfer.id);
                                            if (index !== -1) {
                                                updatedTransfers[index].currency = '';
                                                setTransfers(updatedTransfers);
                                            }
                                        }
                                        setEditingCell(null);
                                    }
                                }, 200);
                            }}
                        />
                        {showCurrencySuggestions && (
                            <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                                {CURRENCY_CHOICES.filter(currency =>
                                    currency.toLowerCase().includes((transfer[column.key] || '').toLowerCase())
                                ).map((currency) => (
                                    <div
                                        key={currency}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            handleSelectCurrency(currency, transfer.id);
                                        }}
                                    >
                                        {currency}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            }
            if (column.key === 'payment_type') {
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
                                    if (!showPaymentTypeSuggestions) {
                                        const currentValue = transfer[column.key];
                                        if (!PAYMENT_TYPE_CHOICES.includes(currentValue)) {
                                            const updatedTransfers = [...transfers];
                                            const index = updatedTransfers.findIndex(t => t.id === transfer.id);
                                            if (index !== -1) {
                                                updatedTransfers[index].payment_type = '';
                                                setTransfers(updatedTransfers);
                                            }
                                        }
                                        setEditingCell(null);
                                    }
                                }, 200);
                            }}
                        />
                        {showPaymentTypeSuggestions && (
                            <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                                {PAYMENT_TYPE_CHOICES.filter(paymentType =>
                                    paymentType.toLowerCase().includes((transfer[column.key] || '').toLowerCase())
                                ).map((paymentType) => (
                                    <div
                                        key={paymentType}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            handleSelectPaymentType(paymentType, transfer.id);
                                        }}
                                    >
                                        {paymentType}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            }
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
                            onFocus={() => {
                                const filtered = drivers.filter(driver =>
                                    driver.username.toLowerCase().includes((transfer.driver_name || '').toLowerCase())
                                );
                                setDriverSuggestions(filtered);
                                setShowSuggestions(true);
                            }}
                            onBlur={() => {
                                setTimeout(() => {
                                    if (!showSuggestions) {
                                        setEditingCell(null);
                                    }
                                }, 200);
                            }}
                        />
                        {showSuggestions && (
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
                                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${hotel.isMainHotel ? 'font-semibold' : 'pl-8'
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
                                <option value="name">Search by Name</option>

                            </select>
                            <input
                                type="text"
                                placeholder={`Search by ${searchBy === 'id' ? 'ID' : searchBy === 'name' ? 'name' : searchBy === 'hotel' ? 'hotel name' : 'status'}...`}
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

                            <button
                                onClick={clearFilters}
                                className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition duration-200"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
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
                                                className={`px-3 py-2 text-sm border border-gray-200 ${column.key === 'unique_code' ? 'cursor-default' : 'cursor-pointer'
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
                    )}
                    <div className="flex justify-center items-center mt-4 space-x-2">
    <button
        onClick={() => {
            setCurrentPage(prev => Math.max(prev - 1, 1));
        }}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded disabled:opacity-50"
    >
        Previous
    </button>
    <span>Page {currentPage} of {totalPages}</span>
    <button
        onClick={() => {
            setCurrentPage(prev => Math.min(prev + 1, totalPages));
        }}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded disabled:opacity-50"
    >
        Next
    </button>
</div>
                </div>


                {!isLoading && filteredTransfers.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No transfer records found
                    </div>
                )}
            </div>
        </div>
    );
}