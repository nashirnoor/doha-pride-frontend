import axios from 'axios';


const baseURL = 'http://127.0.0.1:8000/api/';
// const baseURL = 'https://doha-pride-backend-2.onrender.com/api/';


const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false  
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (window.location.pathname === '/login') {
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        
        const tokenRefreshInstance = axios.create({
          baseURL: baseURL,
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const response = await tokenRefreshInstance.post('token/refresh/', {
          refresh: refreshToken
        });
        
        const { access } = response.data;
        localStorage.setItem('access_token', access);
        
        originalRequest.headers['Authorization'] = `Bearer ${access}`;
        
        return axios(originalRequest);
      } catch (error) {
        console.error('Refresh token error:', error.response?.data);
        localStorage.clear();
        if (window.location.pathname !== '/admin' && window.location.pathname !== '/agency-login') {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;