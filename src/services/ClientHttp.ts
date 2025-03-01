import axios from 'axios';

const http = axios.create({
  baseURL: 'https://app-service-production-e951.up.railway.app'
});

export default http;
