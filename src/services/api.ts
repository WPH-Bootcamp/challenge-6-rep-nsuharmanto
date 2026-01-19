import axios from 'axios';
import { APIConfig } from '../config/apiConfig';

export const api = axios.create({
  baseURL: APIConfig.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menambahkan api_key ke setiap request
api.interceptors.request.use((config) => {
  if (!config.params) config.params = {};
  config.params['api_key'] = APIConfig.apiKey;
  return config;
});