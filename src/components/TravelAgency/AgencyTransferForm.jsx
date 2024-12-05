import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../api/Route';
import React, { useState, useEffect } from 'react';

export default function AgencyTransferForm() {
  const [showForm, setShowForm] = useState(true);
  const [drivers, setDrivers] = useState([]);
  const [hotelCategories, setHotelCategories] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    hotel_name: '',
    vehicle: '',
    driver: '',
    name: '',
    from_location: '',
    to_location: '',
    flight: '',
    room_no: '',
    amount: '',
    note: '',
    voucher_no: '',
    number: '',
    email: '',
    status: 'pending'
  });

  const STATUS_CHOICES = [
    { value: 'pending', label: 'Pending' },
    { value: 'done', label: 'Done' },
    { value: 'posted', label: 'Posted' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const headers = {
          'Authorization': `Bearer ${token}`
        };

        const driversResponse = await axios.get(`${BASE_URL}api/drivers/`, { headers });
        setDrivers(driversResponse.data);

        const hotelResponse = await axios.get(`${BASE_URL}api/hotel-categories/`, { headers });
        setHotelCategories(hotelResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'driver' ? parseInt(value, 10) : value // Convert driver value to integer
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(`${BASE_URL}api/travel-agency-transfer/`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(response, "Booking created");
      alert("Booking created successfully");
      setFormData({
        date: '',
        time: '',
        hotel_name: '',
        vehicle: '',
        driver: '',
        name: '',
        from_location: '',
        to_location: '',
        flight: '',
        room_no: '',
        amount: '',
        note: '',
        voucher_no: '',
        number: '',
        email: '',
        status: 'pending'
      });
    } catch (error) {
      console.error('Error creating Booking', error);
      alert("Error in booking");
    }
  };

  return (
    <section className="w-full p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Transfer Bookings</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 text-sm rounded-md bg-blue-500 text-white"
          >
            {showForm ? 'Hide Form' : 'Show Form'}
          </button>
          <button className="p-2 rounded-full bg-gray-200">
            <Link to='/agency-home'><ArrowLeft size={20} /></Link>
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className={`w-full h-full flex-col gap-2 ${showForm ? 'flex' : 'hidden'}`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2">
          <div className="flex-col gap-1">
            <label htmlFor="date" className="text-xs">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border border-gray-400 w-full p-1.5 rounded-md text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex-col gap-1">
            <label htmlFor="time" className="text-xs">
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="border border-gray-400 w-full p-1.5 rounded-md text-sm focus:outline-none focus:border-blue-500" required
            />
          </div>
          <div className="flex-col gap-1">
            <label htmlFor="hotelName" className="text-xs">
              Hotel Name
            </label>
            <select
              id="hotel_name"
              name="hotel_name"
              value={formData.hotel_name}
              onChange={handleChange}
              className="border border-gray-400 w-full p-1.5 rounded-md text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Hotel</option>
              {hotelCategories.map((hotel) => (
                <React.Fragment key={hotel.id}>
                  {/* Main hotel option */}
                  <option value={hotel.hotel_name}>
                    {hotel.hotel_name}
                  </option>
                  {/* Subcategory options */}
                  {hotel.subcategories.map((sub) => (
                    <option key={sub.id} value={sub.name}>
                       {sub.name}
                    </option>
                  ))}
                </React.Fragment>
              ))}
            </select>
          </div>
          <div className="flex-col gap-1">
            <label htmlFor="vehicle" className="text-xs">
              Vehicle
            </label>
            <input
              type="text"
              id="vehicle"
              name="vehicle"
              value={formData.vehicle}
              onChange={handleChange}
              placeholder="Vehicle"
              className="border border-gray-400 w-full p-1.5 rounded-md text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex-col gap-1">
            <label htmlFor="driver" className="text-xs">
              Driver
            </label>
            <select
              id="driver"
              name="driver"
              value={formData.driver}
              onChange={handleChange}
              className="border border-gray-400 w-full p-1.5 rounded-md text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Driver</option>
              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.username}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-col gap-1">
            <label htmlFor="guestName" className="text-xs">
              Guest Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter guest name"
              className="border border-gray-400 w-full p-1.5 rounded-md text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex-col gap-1">
            <label htmlFor="from_location" className="text-xs">
              From
            </label>
            <input
              type="text"
              id="from_location"
              name="from_location"
              value={formData.from_location}
              onChange={handleChange}
              placeholder="From location"
              className="border border-gray-400 w-full p-1.5 rounded-md text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex-col gap-1">
            <label htmlFor="to_location" className="text-xs">
              To
            </label>
            <input
              type="text"
              id="to_location"
              name="to_location"
              value={formData.to_location}
              onChange={handleChange}
              placeholder="To location"
              className="border border-gray-400 w-full p-1.5 rounded-md text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex-col gap-1">
            <label htmlFor="flight_number" className="text-xs">
              Flight No.
            </label>
            <input
              type="text"
              id="flight"
              name="flight"
              value={formData.flight}
              onChange={handleChange}
              placeholder="Enter Flight Number"
              className="border border-gray-400 w-full p-1.5 rounded-md text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex-col gap-1">
            <label htmlFor="room_no" className="text-xs">
              Room No.
            </label>
            <input
              type="text"
              id="room_no"
              name="room_no"
              value={formData.room_no}
              onChange={handleChange}
              placeholder="Room Number"
              className="border border-gray-400 w-full p-1.5 rounded-md text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex-col gap-1">
            <label htmlFor="charges" className="text-xs">
              Charges
            </label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter Charges.."
              className="border border-gray-400 w-full p-1.5 rounded-md text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex-col gap-1">
            <label htmlFor="status" className="text-xs">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border border-gray-400 w-full p-1.5 rounded-md text-sm focus:outline-none focus:border-blue-500"
            >
              {STATUS_CHOICES.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-col gap-1">
            <label htmlFor="voucher" className="text-xs">
              Voucher
            </label>
            <input
              type="text"
              id="voucher_no"
              name="voucher_no"
              value={formData.voucher_no}
              onChange={handleChange}
              placeholder="Enter voucher"
              className="border border-gray-400 w-full p-1.5 rounded-md text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex-col gap-1">
            <label htmlFor="note" className="text-xs">
              Note
            </label>
            <input
              type="text"
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Enter note"
              className="border border-gray-400 w-full p-1.5 rounded-md text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="w-full mt-2 flex justify-end">
          <button
            type="submit"
            className="px-4 h-8 text-sm rounded-md bg-blue-500 text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}