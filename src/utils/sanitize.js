import DOMPurify from 'dompurify';

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return input;
  }
  
  return DOMPurify.sanitize(input.trim(), {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
};

export const sanitizeHTML = (html) => {
  if (typeof html !== 'string') {
    return html;
  }
  
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target'],
  });
};

export const sanitizeFormData = (formData) => {
  const sanitized = {};
  
  for (const key in formData) {
    if (formData.hasOwnProperty(key)) {
      sanitized[key] = sanitizeInput(formData[key]);
    }
  }
  
  return sanitized;
};

export const sanitizeEmail = (email) => {
  if (typeof email !== 'string') {
    return email;
  }
  
  return sanitizeInput(email).toLowerCase();
};

export const sanitizeUsername = (username) => {
  if (typeof username !== 'string') {
    return username;
  }
  
  return sanitizeInput(username).replace(/[^a-zA-Z0-9_]/g, '');
};

export const sanitizeURL = (url) => {
  if (typeof url !== 'string') {
    return url;
  }
  
  try {
    const parsedURL = new URL(url);
    return parsedURL.href;
  } catch (error) {
    return '';
  }
};

export const stripHTML = (html) => {
  if (typeof html !== 'string') {
    return html;
  }
  
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
};
