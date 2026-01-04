export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Auth System';
export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173';

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    LOGOUT_ALL: '/auth/logout-all',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  OTP: {
    SEND: '/otp/send',
    VERIFY: '/otp/verify',
    RESEND: '/otp/resend',
  },
  PASSWORD: {
    FORGOT: '/password/forgot',
    RESET: '/password/reset',
    CHANGE: '/password/change',
    VALIDATE: '/password/validate',
  },
  OAUTH: {
    GOOGLE: '/oauth/google',
    GOOGLE_CALLBACK: '/oauth/google/callback',
    UNLINK_GOOGLE: '/oauth/google/unlink',
  },
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  VERIFY_OTP: '/verify-otp',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  AUTH_CALLBACK: '/auth/callback',
  NOT_FOUND: '*',
};

export const AUTH_STORAGE_KEYS = {
  USER: 'auth_user',
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,30}$/;
export const OTP_REGEX = /^\d{6}$/;

export const VALIDATION_MESSAGES = {
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  USERNAME_REQUIRED: 'Username is required',
  USERNAME_INVALID: 'Username must be 3-30 characters and can only contain letters, numbers, and underscores',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_INVALID: 'Password must be at least 8 characters and contain uppercase, lowercase, number, and special character',
  PASSWORD_MISMATCH: 'Passwords do not match',
  OTP_REQUIRED: 'OTP is required',
  OTP_INVALID: 'OTP must be 6 digits',
  CURRENT_PASSWORD_REQUIRED: 'Current password is required',
  NEW_PASSWORD_REQUIRED: 'New password is required',
};

export const SUCCESS_MESSAGES = {
  REGISTRATION_SUCCESS: 'Registration successful! Please verify your email',
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logged out successfully',
  OTP_SENT: 'OTP sent to your email',
  OTP_VERIFIED: 'Email verified successfully',
  PASSWORD_RESET_EMAIL_SENT: 'Password reset link sent to your email',
  PASSWORD_RESET_SUCCESS: 'Password reset successful',
  PASSWORD_CHANGED: 'Password changed successfully',
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection',
  SERVER_ERROR: 'Server error. Please try again later',
  UNAUTHORIZED: 'Session expired. Please login again',
  INVALID_CREDENTIALS: 'Invalid email or password',
  GENERIC_ERROR: 'Something went wrong. Please try again',
};

export const OTP_EXPIRY_MINUTES = 5;
export const REQUEST_TIMEOUT = 30000;
