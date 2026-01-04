import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Loader from '../../components/common/Loader';
import { ROUTES } from '../../utils/constants';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { updateUserProfile } = useAuth();

  useEffect(() => {
    handleCallback();
  }, []);

  const handleCallback = async () => {
    const success = searchParams.get('success');
    const error = searchParams.get('error');

    if (error) {
      navigate(ROUTES.LOGIN, { 
        state: { error: 'Google authentication failed. Please try again.' } 
      });
      return;
    }

    if (success === 'true') {
      await updateUserProfile();
      
      setTimeout(() => {
        navigate(ROUTES.DASHBOARD);
      }, 500);
    } else {
      navigate(ROUTES.LOGIN);
    }
  };

  return <Loader fullScreen />;
};

export default GoogleCallback;
