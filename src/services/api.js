import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL, REQUEST_TIMEOUT, HTTP_STATUS, AUTH_STORAGE_KEYS } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
        
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          { refreshToken },
          { withCredentials: true }
        );

        if (response.data.success) {
          const newAccessToken = response.data.data.accessToken;
          Cookies.set(AUTH_STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);
          
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        Cookies.remove(AUTH_STORAGE_KEYS.ACCESS_TOKEN);
        Cookies.remove(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(AUTH_STORAGE_KEYS.USER);
        
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const handleApiError = (error) => {
  if (error.response) {
    return {
      success: false,
      message: error.response.data?.message || 'Server error occurred',
      errors: error.response.data?.errors || null,
      statusCode: error.response.status,
    };
  }
  
  if (error.request) {
    return {
      success: false,
      message: 'Network error. Please check your connection',
      errors: null,
      statusCode: null,
    };
  }
  
  return {
    success: false,
    message: error.message || 'An unexpected error occurred',
    errors: null,
    statusCode: null,
  };
};

export default api;
