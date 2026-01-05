import axios from 'axios';
import { API_BASE_URL, REQUEST_TIMEOUT, HTTP_STATUS } from '../utils/constants';
import AuthService from './auth.service';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
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

    if (
      error.response?.status === HTTP_STATUS.UNAUTHORIZED &&
      error.response?.data?.code === 'TOKEN_EXPIRED' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        
        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          { refreshToken },
          { 
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        if (response.data.success) {
          if (response.data.data?.user) {
            localStorage.setItem('auth_user', JSON.stringify(response.data.data.user));
          }
          if (response.data.data?.accessToken) {
            localStorage.setItem('access_token', response.data.data.accessToken);
          }
          if (response.data.data?.refreshToken) {
            localStorage.setItem('refresh_token', response.data.data.refreshToken);
          }

          originalRequest.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Token refresh failed');
        
        localStorage.removeItem('auth_user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        
        const currentPath = window.location.pathname;
        const publicPaths = ['/login', '/register', '/verify-otp', '/forgot-password', '/reset-password', '/'];
        
        if (!publicPaths.some(path => currentPath.includes(path))) {
          window.location.href = '/login?session=expired';
        }
        
        return Promise.reject(refreshError);
      }
    }

    if (
      error.response?.status === HTTP_STATUS.UNAUTHORIZED &&
      !originalRequest._retry
    ) {
      localStorage.removeItem('auth_user');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      
      const currentPath = window.location.pathname;
      const publicPaths = ['/login', '/register', '/verify-otp', '/forgot-password', '/reset-password', '/'];
      
      if (!publicPaths.some(path => currentPath.includes(path))) {
        window.location.href = '/login?session=expired';
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
