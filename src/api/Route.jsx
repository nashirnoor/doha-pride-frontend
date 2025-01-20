import axios from 'axios';

export const BASE_URL = 'http://127.0.0.1:8000/';
// export const BASE_URL = 'https://doha-pride-backend-2.onrender.com/';

export const SOCKET_BASE_URL = 'wss://doha-pride-backend-2.onrender.com'



export const getTransferData = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}transfer-meet-assist/`);
    return response.data; 
  } catch (error) {
    throw new Error('Error fetching transfer data'); 
  }
};


export const getContactDetails = async () => {
  const response = await axios.get(`${BASE_URL}contact/`);
  return response.data;
};
