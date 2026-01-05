import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { updateUserProfile } = useAuth();
  const toast = useToast();

  useEffect(() => {
    const handleCallback = async () => {
      const success = searchParams.get('success');
      const error = searchParams.get('error');
      const userStr = searchParams.get('user');
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');

      if (error) {
        toast.error('Google authentication failed. Please try again.');
        navigate('/login');
        return;
      }

      if (success === 'true' && userStr) {
        try {
          const user = JSON.parse(decodeURIComponent(userStr));
          
          localStorage.setItem('auth_user', JSON.stringify(user));
          
          if (accessToken) {
            localStorage.setItem('access_token', accessToken);
          }
          if (refreshToken) {
            localStorage.setItem('refresh_token', refreshToken);
          }

          await updateUserProfile();

          toast.success('Google login successful!');
          navigate('/dashboard');
        } catch (err) {
          console.error('Error processing callback:', err);
          toast.error('Authentication error. Please try again.');
          navigate('/login');
        }
      } else {
        toast.error('Authentication failed. Please try again.');
        navigate('/login');
      }
    };

    handleCallback();
  }, [searchParams, navigate, updateUserProfile, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
};

export default GoogleCallback;
