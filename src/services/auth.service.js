import api, { handleApiError } from './api';
import { API_ENDPOINTS } from '../utils/constants';
import { sanitizeFormData, sanitizeEmail } from '../utils/sanitize';

class AuthService {
  async register(userData) {
    try {
      const sanitizedData = sanitizeFormData({
        email: userData.email,
        username: userData.username,
        password: userData.password,
      });

      const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, sanitizedData);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  async login(credentials) {
    try {
      const sanitizedData = {
        email: sanitizeEmail(credentials.email),
        password: credentials.password,
      };

      const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, sanitizedData);
      
      if (response.data.success && response.data.data?.user) {
        localStorage.setItem('auth_user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  async logout() {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT);
      
      localStorage.removeItem('auth_user');
      
      return response.data;
    } catch (error) {
      localStorage.removeItem('auth_user');
      return handleApiError(error);
    }
  }

  async logoutAll() {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT_ALL);
      
      localStorage.removeItem('auth_user');
      
      return response.data;
    } catch (error) {
      localStorage.removeItem('auth_user');
      return handleApiError(error);
    }
  }

  async getCurrentUser() {
    try {
      const response = await api.get(API_ENDPOINTS.AUTH.ME);
      
      if (response.data.success && response.data.data?.user) {
        localStorage.setItem('auth_user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error) {
      localStorage.removeItem('auth_user');
      return handleApiError(error);
    }
  }


  async sendOTP(email, type = 'verification') {
    try {
      const sanitizedData = {
        email: sanitizeEmail(email),
        type,
      };

      const response = await api.post(API_ENDPOINTS.OTP.SEND, sanitizedData);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  async verifyOTP(email, code) {
    try {
      const sanitizedData = sanitizeFormData({
        email,
        code,
      });

      const response = await api.post(API_ENDPOINTS.OTP.VERIFY, sanitizedData);
      
      if (response.data.success && response.data.data?.user) {
        localStorage.setItem('auth_user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  async resendOTP(email) {
    try {
      const sanitizedData = {
        email: sanitizeEmail(email),
      };

      const response = await api.post(API_ENDPOINTS.OTP.RESEND, sanitizedData);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  async forgotPassword(email) {
    try {
      const sanitizedData = {
        email: sanitizeEmail(email),
      };

      const response = await api.post(API_ENDPOINTS.PASSWORD.FORGOT, sanitizedData);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  async resetPassword(token, password, confirmPassword) {
    try {
      const response = await api.post(`${API_ENDPOINTS.PASSWORD.RESET}/${token}`, {
        password,
        confirmPassword,
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  async validateResetToken(token) {
    try {
      const response = await api.get(`${API_ENDPOINTS.PASSWORD.VALIDATE}/${token}`);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  async changePassword(currentPassword, newPassword, confirmPassword) {
    try {
      const response = await api.put(API_ENDPOINTS.PASSWORD.CHANGE, {
        currentPassword,
        newPassword,
        confirmPassword,
      });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  googleLogin() {
    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const oauthUrl = backendUrl.replace('/api', '') + '/api/oauth/google';
    window.location.href = oauthUrl;
  }

  async unlinkGoogle() {
    try {
      const response = await api.delete(API_ENDPOINTS.OAUTH.UNLINK_GOOGLE);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }

  getStoredUser() {
    const userStr = localStorage.getItem('auth_user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch (error) {
      localStorage.removeItem('auth_user');
      return null;
    }
  }

  isAuthenticated() {
    const user = this.getStoredUser();
    return !!user;
  }

  clearAuth() {
    localStorage.removeItem('auth_user');
  }
}

export default new AuthService();
