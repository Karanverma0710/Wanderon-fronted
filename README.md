Authentication Frontend

A modern React application with complete authentication features including registration, login, email verification, and Google OAuth.

Features

User registration with email verification

Login with email/password or Google

Password reset via email

Protected routes requiring authentication

Persistent login sessions across page reloads

Automatic token refresh

Responsive design with Tailwind CSS

Toast notifications for user feedback

Quick Start

Install dependencies:
npm install
npm run dev

App runs on http://localhost:5173

Environment Setup

Create a .env file:

VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Auth System
VITE_FRONTEND_URL=http://localhost:5173

Tech Stack
React 18, React Router v6, Axios, Tailwind CSS, React Toastify, DOMPurify, Vite

Available Pages
/ - Home page
/login - User login
/register - New user registration
/verify-otp - Email verification with OTP code
/forgot-password - Request password reset
/reset-password/:token - Reset password with email token
/dashboard - User dashboard (protected)
/profile - User profile page (protected)
/auth/callback - Google OAuth callback handler

How Authentication Works

User registers and receives OTP via email

User verifies email with 6-digit code

User logs in and receives access token (30 minutes) and refresh token (7 days)

Tokens stored in both cookies and localStorage for reliability

Access token automatically refreshes when it expires

User stays logged in even after closing browser or reloading page

Validation Rules
Password: Minimum 8 characters, must include uppercase, lowercase, number, and special character
Username: 3-30 characters, letters, numbers, and underscores only
Email: Must be valid email format
OTP: Exactly 6 digits

Build for Production

Create production build:
npm run build

Update .env for production:
VITE_API_URL=https://your-backend.koyeb.app/api
VITE_FRONTEND_URL=https://your-frontend.vercel.app

Output files will be in the dist folder.

Deployment

Deploy to Vercel:

Connect your GitHub repository

Add environment variables in Vercel dashboard

Deploy automatically on every push

Deploy to Netlify:

Build locally with npm run build

Drag and drop dist folder to Netlify

Add environment variables in Netlify settings

For routing to work, create public/_redirects file with: /* /index.html 200

Available Scripts
npm run dev - Start development server
npm run build - Build for production
npm run preview - Preview production build locally
npm run lint - Check code quality

Security Features

All user inputs sanitized with DOMPurify to prevent XSS attacks

Passwords never stored in localStorage

Secure cookie handling for tokens

Authorization headers sent with every API request

CSRF protection via HTTP-only cookies

Customization

Change theme colors: Edit tailwind.config.js
Update validation rules: Modify src/utils/validation.js
Change API endpoints: Update src/utils/constants.js
Customize components: Edit files in src/components

Project Structure
src/components - Reusable UI components
src/context - React context for authentication state
src/hooks - Custom React hooks
src/pages - Page components for each route
src/services - API service layer
src/utils - Helper functions and constants

Common Issues

Cannot connect to backend:

Check VITE_API_URL is correct in .env file

Verify backend server is running

Look for CORS errors in browser console

Login doesn't persist after reload:

Clear browser cache and cookies

Check localStorage is enabled in browser

Verify backend is setting cookies correctly

Google OAuth fails:

Verify callback URL in Google Console matches exactly

Check GOOGLE_CLIENT_ID in backend .env

Ensure backend OAuth routes are working

Styles not loading:

Delete node_modules folder and run npm install again

Clear Vite cache with rm -rf node_modules/.vite

Run npm run build again

Browser Support
Works on latest versions of Chrome, Firefox, Safari, and Edge
