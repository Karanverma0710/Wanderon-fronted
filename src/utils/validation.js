import {
  EMAIL_REGEX,
  USERNAME_REGEX,
  PASSWORD_REGEX,
  OTP_REGEX,
  VALIDATION_MESSAGES,
} from './constants';

export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return { isValid: false, error: VALIDATION_MESSAGES.EMAIL_REQUIRED };
  }
  
  if (!EMAIL_REGEX.test(email.trim())) {
    return { isValid: false, error: VALIDATION_MESSAGES.EMAIL_INVALID };
  }
  
  return { isValid: true, error: null };
};

export const validateUsername = (username) => {
  if (!username || username.trim() === '') {
    return { isValid: false, error: VALIDATION_MESSAGES.USERNAME_REQUIRED };
  }
  
  if (!USERNAME_REGEX.test(username.trim())) {
    return { isValid: false, error: VALIDATION_MESSAGES.USERNAME_INVALID };
  }
  
  return { isValid: true, error: null };
};

export const validatePassword = (password) => {
  if (!password || password === '') {
    return { isValid: false, error: VALIDATION_MESSAGES.PASSWORD_REQUIRED };
  }
  
  if (!PASSWORD_REGEX.test(password)) {
    return { isValid: false, error: VALIDATION_MESSAGES.PASSWORD_INVALID };
  }
  
  return { isValid: true, error: null };
};

export const validateOTP = (otp) => {
  if (!otp || otp.trim() === '') {
    return { isValid: false, error: VALIDATION_MESSAGES.OTP_REQUIRED };
  }
  
  if (!OTP_REGEX.test(otp.trim())) {
    return { isValid: false, error: VALIDATION_MESSAGES.OTP_INVALID };
  }
  
  return { isValid: true, error: null };
};

export const validatePasswordMatch = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return { isValid: false, error: VALIDATION_MESSAGES.PASSWORD_MISMATCH };
  }
  
  return { isValid: true, error: null };
};

export const validateRegisterForm = (formData) => {
  const errors = {};
  
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }
  
  const usernameValidation = validateUsername(formData.username);
  if (!usernameValidation.isValid) {
    errors.username = usernameValidation.error;
  }
  
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error;
  }
  
  if (formData.confirmPassword) {
    const passwordMatchValidation = validatePasswordMatch(
      formData.password,
      formData.confirmPassword
    );
    if (!passwordMatchValidation.isValid) {
      errors.confirmPassword = passwordMatchValidation.error;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateLoginForm = (formData) => {
  const errors = {};
  
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }
  
  if (!formData.password || formData.password === '') {
    errors.password = VALIDATION_MESSAGES.PASSWORD_REQUIRED;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateOTPForm = (formData) => {
  const errors = {};
  
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }
  
  const otpValidation = validateOTP(formData.code);
  if (!otpValidation.isValid) {
    errors.code = otpValidation.error;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateForgotPasswordForm = (formData) => {
  const errors = {};
  
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateResetPasswordForm = (formData) => {
  const errors = {};
  
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error;
  }
  
  const passwordMatchValidation = validatePasswordMatch(
    formData.password,
    formData.confirmPassword
  );
  if (!passwordMatchValidation.isValid) {
    errors.confirmPassword = passwordMatchValidation.error;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateChangePasswordForm = (formData) => {
  const errors = {};
  
  if (!formData.currentPassword || formData.currentPassword === '') {
    errors.currentPassword = VALIDATION_MESSAGES.CURRENT_PASSWORD_REQUIRED;
  }
  
  const passwordValidation = validatePassword(formData.newPassword);
  if (!passwordValidation.isValid) {
    errors.newPassword = passwordValidation.error;
  }
  
  const passwordMatchValidation = validatePasswordMatch(
    formData.newPassword,
    formData.confirmPassword
  );
  if (!passwordMatchValidation.isValid) {
    errors.confirmPassword = passwordMatchValidation.error;
  }
  
  if (formData.currentPassword === formData.newPassword) {
    errors.newPassword = 'New password must be different from current password';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
