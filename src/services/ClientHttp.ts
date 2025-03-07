import axios from 'axios';

const http = axios.create({
  baseURL: 'https://app-service-production-e951.up.railway.app'
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
