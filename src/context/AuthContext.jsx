import { createContext, useState, useEffect } from 'react';
import AuthService from '../services/auth.service';
import useToast from '../hooks/useToast';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../utils/constants';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const toast = useToast();

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setLoading(true);
      
      // Try to get current user from backend (cookies will be sent automatically)
      const response = await AuthService.getCurrentUser();
      
      if (response.success && response.data?.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        // Store in localStorage as backup reference
        localStorage.setItem('auth_user', JSON.stringify(response.data.user));
      } else {
        // Clear everything if not authenticated
        AuthService.clearAuth();
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      AuthService.clearAuth();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await AuthService.register(userData);
      
      if (response.success) {
        toast.success(response.message || SUCCESS_MESSAGES.REGISTRATION_SUCCESS);
        return { success: true, data: response.data };
      } else {
        toast.error(response.message || ERROR_MESSAGES.GENERIC_ERROR);
        return { success: false, message: response.message, errors: response.errors };
      }
    } catch (error) {
      toast.error(ERROR_MESSAGES.GENERIC_ERROR);
      return { success: false, message: ERROR_MESSAGES.GENERIC_ERROR };
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await AuthService.login(credentials);
      
      if (response.success && response.data?.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        localStorage.setItem('auth_user', JSON.stringify(response.data.user));
        toast.success(response.message || SUCCESS_MESSAGES.LOGIN_SUCCESS);
        return { success: true, data: response.data };
      } else {
        toast.error(response.message || ERROR_MESSAGES.INVALID_CREDENTIALS);
        return { success: false, message: response.message, errors: response.errors };
      }
    } catch (error) {
      toast.error(ERROR_MESSAGES.GENERIC_ERROR);
      return { success: false, message: ERROR_MESSAGES.GENERIC_ERROR };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await AuthService.logout();
      
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('auth_user');
      toast.success(SUCCESS_MESSAGES.LOGOUT_SUCCESS);
      
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      // Clear local state even if API call fails
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('auth_user');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const logoutAll = async () => {
    try {
      setLoading(true);
      await AuthService.logoutAll();
      
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('auth_user');
      toast.success('Logged out from all devices');
      
      return { success: true };
    } catch (error) {
      console.error('Logout all error:', error);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('auth_user');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (email, code) => {
    try {
      setLoading(true);
      const response = await AuthService.verifyOTP(email, code);
      
      if (response.success) {
        if (response.data?.user) {
          setUser(response.data.user);
          setIsAuthenticated(true);
          localStorage.setItem('auth_user', JSON.stringify(response.data.user));
        }
        toast.success(response.message || SUCCESS_MESSAGES.OTP_VERIFIED);
        return { success: true, data: response.data };
      } else {
        toast.error(response.message || 'OTP verification failed');
        return { success: false, message: response.message };
      }
    } catch (error) {
      toast.error(ERROR_MESSAGES.GENERIC_ERROR);
      return { success: false, message: ERROR_MESSAGES.GENERIC_ERROR };
    } finally {
      setLoading(false);
    }
  };

  const sendOTP = async (email, type = 'verification') => {
    try {
      setLoading(true);
      const response = await AuthService.sendOTP(email, type);
      
      if (response.success) {
        toast.success(response.message || SUCCESS_MESSAGES.OTP_SENT);
        return { success: true, data: response.data };
      } else {
        toast.error(response.message || 'Failed to send OTP');
        return { success: false, message: response.message };
      }
    } catch (error) {
      toast.error(ERROR_MESSAGES.GENERIC_ERROR);
      return { success: false, message: ERROR_MESSAGES.GENERIC_ERROR };
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async (email) => {
    try {
      setLoading(true);
      const response = await AuthService.resendOTP(email);
      
      if (response.success) {
        toast.success(response.message || 'OTP resent successfully');
        return { success: true, data: response.data };
      } else {
        toast.error(response.message || 'Failed to resend OTP');
        return { success: false, message: response.message };
      }
    } catch (error) {
      toast.error(ERROR_MESSAGES.GENERIC_ERROR);
      return { success: false, message: ERROR_MESSAGES.GENERIC_ERROR };
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      const response = await AuthService.forgotPassword(email);
      
      if (response.success) {
        toast.success(response.message || SUCCESS_MESSAGES.PASSWORD_RESET_EMAIL_SENT);
        return { success: true };
      } else {
        toast.error(response.message || 'Failed to send reset link');
        return { success: false, message: response.message };
      }
    } catch (error) {
      toast.error(ERROR_MESSAGES.GENERIC_ERROR);
      return { success: false, message: ERROR_MESSAGES.GENERIC_ERROR };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token, password, confirmPassword) => {
    try {
      setLoading(true);
      const response = await AuthService.resetPassword(token, password, confirmPassword);
      
      if (response.success) {
        toast.success(response.message || SUCCESS_MESSAGES.PASSWORD_RESET_SUCCESS);
        return { success: true };
      } else {
        toast.error(response.message || 'Password reset failed');
        return { success: false, message: response.message };
      }
    } catch (error) {
      toast.error(ERROR_MESSAGES.GENERIC_ERROR);
      return { success: false, message: ERROR_MESSAGES.GENERIC_ERROR };
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (currentPassword, newPassword, confirmPassword) => {
    try {
      setLoading(true);
      const response = await AuthService.changePassword(
        currentPassword,
        newPassword,
        confirmPassword
      );
      
      if (response.success) {
        toast.success(response.message || SUCCESS_MESSAGES.PASSWORD_CHANGED);
        return { success: true };
      } else {
        toast.error(response.message || 'Password change failed');
        return { success: false, message: response.message };
      }
    } catch (error) {
      toast.error(ERROR_MESSAGES.GENERIC_ERROR);
      return { success: false, message: ERROR_MESSAGES.GENERIC_ERROR };
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async () => {
    try {
      const response = await AuthService.getCurrentUser();
      
      if (response.success && response.data?.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        localStorage.setItem('auth_user', JSON.stringify(response.data.user));
        return { success: true, data: response.data.user };
      } else {
        toast.error('Failed to update profile');
        return { success: false };
      }
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error(ERROR_MESSAGES.GENERIC_ERROR);
      return { success: false };
    }
  };

  const googleLogin = () => {
    AuthService.googleLogin();
  };

  const unlinkGoogle = async () => {
    try {
      setLoading(true);
      const response = await AuthService.unlinkGoogle();
      
      if (response.success) {
        await updateUserProfile();
        toast.success('Google account unlinked successfully');
        return { success: true };
      } else {
        toast.error(response.message || 'Failed to unlink Google account');
        return { success: false };
      }
    } catch (error) {
      toast.error(ERROR_MESSAGES.GENERIC_ERROR);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    register,
    login,
    logout,
    logoutAll,
    verifyOTP,
    sendOTP,
    resendOTP,
    forgotPassword,
    resetPassword,
    changePassword,
    updateUserProfile,
    googleLogin,
    unlinkGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
