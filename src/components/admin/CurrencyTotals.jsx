// TourCurrencyStats.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { BASE_URL } from '../../api/Route';

const TourCurrencyStats = () => {
    const [data, setData] = useState({
      monthly_data: [],
      yearly_totals: {},
      available_years: [],
      booking_types: {
        tour: { monthly: [], yearly: {} },
        transfer: { monthly: [], yearly: {} }
      }
    });
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(true);
  
    const colors = {
      QAR: '#FF6B6B',
      Pound: '#4ECDC4',
      USD: '#45B7D1',
      EUR: '#96CEB4',
      QAR_tour: '#FF8B8B',
      Pound_tour: '#6EEAE4',
      USD_tour: '#65D7F1',
      EUR_tour: '#B6EED4',
      QAR_transfer: '#FF4B4B',
      Pound_transfer: '#2EADA4',
      USD_transfer: '#25A7B1',
      EUR_transfer: '#76AE94'
    };
  
    useEffect(() => {
      fetchData();
    }, [selectedYear]);
  
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}tour-currency-stats/?year=${selectedYear}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching booking currency stats:', error);
      } finally {
        setLoading(false);
      }
    };
  
    const formatCurrency = (value) => {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    };
  
    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-white p-4 shadow-lg rounded-lg border">
            <p className="font-semibold mb-2">{label}</p>
            {payload.map((entry, index) => {
              const name = entry.dataKey.includes('_') 
                ? `${entry.dataKey.split('_')[0]} (${entry.dataKey.split('_')[1]})`
                : entry.dataKey;
              return (
                <div key={index} className="flex justify-between gap-4">
                  <span style={{ color: entry.color }}>{name}:</span>
                  <span className="font-medium">{formatCurrency(entry.value)}</span>
                </div>
              );
            })}
          </div>
        );
      }
      return null;
    };
  
    if (loading) {
      return (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );
    }
  
    return (
      <div className="space-y-8">
        {/* Year Selection and Yearly Totals */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {data.available_years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <div className="text-lg font-semibold">Yearly Totals</div>
          </div>
  
          <div className="grid grid-cols-1 gap-6">
            {/* Combined Totals */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Combined Totals</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Object.entries(data.yearly_totals.total || {}).map(([currency, total]) => (
                  <div
                    key={currency}
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: `${colors[currency]}15` }}
                  >
                    <div className="text-sm text-gray-600">{currency}</div>
                    <div className="text-xl font-bold mt-1">{formatCurrency(total)}</div>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Tour Totals */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Tour Bookings</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Object.entries(data.yearly_totals.tour || {}).map(([currency, total]) => (
                  <div
                    key={currency}
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: `${colors[currency + '_tour']}15` }}
                  >
                    <div className="text-sm text-gray-600">{currency}</div>
                    <div className="text-xl font-bold mt-1">{formatCurrency(total)}</div>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Transfer Totals */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Transfer Bookings</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Object.entries(data.yearly_totals.transfer || {}).map(([currency, total]) => (
                  <div
                    key={currency}
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: `${colors[currency + '_transfer']}15` }}
                  >
                    <div className="text-sm text-gray-600">{currency}</div>
                    <div className="text-xl font-bold mt-1">{formatCurrency(total)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
  
        {/* Monthly Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Monthly Distribution {selectedYear}</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.monthly_data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {['QAR', 'Pound', 'USD', 'EUR'].map(currency => [
                  <Bar
                    key={`${currency}_tour`}
                    dataKey={`${currency}_tour`}
                    name={`${currency} (Tour)`}
                    fill={colors[`${currency}_tour`]}
                    stackId="a"
                  />,
                  <Bar
                    key={`${currency}_transfer`}
                    dataKey={`${currency}_transfer`}
                    name={`${currency} (Transfer)`}
                    fill={colors[`${currency}_transfer`]}
                    stackId="a"
                  />
                ]).flat()}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };
  
  export default TourCurrencyStats;