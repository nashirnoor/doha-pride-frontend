import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../api/Route';
import React, { useState, useEffect } from 'react';


const CURRENCY_CHOICES = [
  { value: 'QAR', label: 'QAR' },
  { value: 'Pound', label: 'Pound' },
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EURO' }
];

const PAYMENT_TYPE_CHOICES = [
  { value: 'CREDIT', label: 'CREDIT' },
  { value: 'CARD', label: 'CARD' },
  { value: 'CASH_TRIP', label: 'CASH TRIP' }
];

export default function TourForm({ onSubmitSuccess }) {
  const [showForm, setShowForm] = useState(true);
  const [drivers, setDrivers] = useState([]);
  const [tourActivities, setTourActivities] = useState([]);
  const [hotelCategories, setHotelCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    hotel_name: '',
    vehicle: '',
    driver: '',
    name: '',
    flight: '',
    room_no: '',
    amount: '',
    note: '',
    voucher_no: '',
    number: '',
    email: '',
    currency: 'QAR',
    payment_type: '',
    status: 'pending',
    tour_activity: ''
  });

  const STATUS_CHOICES = [
    { value: 'pending', label: 'Pending' },
    { value: 'done', label: 'Done' },
    { value: 'posted', label: 'Posted' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const token = localStorage.getItem('access_token');
        const headers = {
          'Authorization': `Bearer ${token}`
        };
  
        const driversResponse = await axios.get(`${BASE_URL}api/drivers/`, { headers });
        setDrivers(driversResponse.data);
  
        const hotelResponse = await axios.get(`${BASE_URL}api/hotel-categories/`, { headers });
        setHotelCategories(hotelResponse.data);
  
        const tourResponse = await axios.get(`${BASE_URL}tours/`, { headers });
        setTourActivities(tourResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally{
        setIsLoading(false)
      }
    };
  
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'driver' ? parseInt(value, 10) : value 
    }));
  };
  if (isLoading) {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
        </div>
    );
  }

  const handleSubmit = async (e) => {
    setIsSubmitting(true)
    e.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(`${BASE_URL}api/bookings-tour/`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(response, "Booking created");
      // alert("Booking created successfully");
      onSubmitSuccess(); // Call this after successful submission
      setFormData({
        date: '',
        time: '',
        hotel_name: '',
        vehicle: '',
        driver: '',
        name: '',
        flight: '',
        room_no: '',
        amount: '',
        note: '',
        voucher_no: '',
        number: '',
        email: '',
        currency: 'QAR',
        payment_type: '',
        status: 'pending',
        tour_activity: ''
      });
    } catch (error) {
      console.error('Error creating Booking', error);
      alert("Please try again");
    } finally{
      setIsSubmitting(false)
    }
  };

  return (
    <section className="w-full p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-sans">Tour Bookings</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowForm(!showForm)}
            class="text-blue-700 hover:text-white border   focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            {showForm ? 'Hide form' : 'Show form'}
          </button>
          <Link to='/admin-home'><button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Back</button></Link>

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
              className="border border-gray-400 w-full p-1.5 rounded-md text-sm focus:outline-none focus:border-blue-500" required
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
            <label htmlFor="tour_activity" className="text-xs">
              Tour Activity
            </label>
            <select
              id="tour_activity"
              name="tour_activity"
              value={formData.tour_activity}
              onChange={handleChange}
              className="border border-gray-400 w-full p-1.5 rounded-md text-sm focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Tour Activity</option>
              {tourActivities.map((tour) => (
                <option key={tour.id} value={tour.id}>
                  {tour.title}
                </option>
              ))}
            </select>
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
  <div className="relative flex">
    <select
      id="currency"
      name="currency"
      value={formData.currency}
      onChange={handleChange}
      className="border border-gray-400 bg-gray-50 px-2 py-1.5 rounded-l-md text-sm focus:outline-none focus:border-blue-500"
    >
      {CURRENCY_CHOICES.map((currency) => (
        <option key={currency.value} value={currency.value}>
          {currency.label}
        </option>
      ))}
    </select>
    <input
      type="text"
      id="amount"
      name="amount"
      value={formData.amount}
      onChange={handleChange}
      placeholder="Enter Charges..."
      className="border border-gray-400 w-full pl-4 p-1.5 rounded-r-md text-sm focus:outline-none focus:border-blue-500"
    />
  </div>
</div>

          <div className="flex-col gap-1">
            <label htmlFor="payment_type" className="text-xs">
              Payment Type
            </label>
            <select
              id="payment_type"
              name="payment_type"
              value={formData.payment_type}
              onChange={handleChange}
              className="border border-gray-400 w-full p-1.5 rounded-md text-sm focus:outline-none focus:border-blue-500"
            >
              {PAYMENT_TYPE_CHOICES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
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
  disabled={isSubmitting}
  className="px-4 h-8 text-sm rounded-md bg-blue-500 text-white disabled:bg-blue-300 flex items-center justify-center min-w-[80px]"
>
  {isSubmitting ? (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      <span>Saving...</span>
    </div>
  ) : (
    'Submit'
  )}
</button>
        </div>
      </form>
    </section>
  );
}