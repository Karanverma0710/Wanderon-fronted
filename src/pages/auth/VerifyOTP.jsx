import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import ErrorMessage from '../../components/common/ErrorMessage';
import { validateOTPForm } from '../../utils/validation';
import { ROUTES, OTP_EXPIRY_MINUTES } from '../../utils/constants';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOTP, resendOTP, loading } = useAuth();

  const [email, setEmail] = useState(location.state?.email || '');
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate(ROUTES.REGISTER);
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validation = validateOTPForm({ email, code });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const result = await verifyOTP(email, code);

    if (result.success) {
      navigate(ROUTES.DASHBOARD);
    } else {
      setServerError(result.message || 'OTP verification failed');
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setServerError('');
    const result = await resendOTP(email);

    if (result.success) {
      setResendTimer(60);
      setCanResend(false);
    } else {
      setServerError(result.message || 'Failed to resend OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a verification code to
          </p>
          <p className="text-center text-sm font-medium text-blue-600">{email}</p>
        </div>

        <div className="mt-8 bg-white py-8 px-6 shadow rounded-lg">
          {serverError && (
            <ErrorMessage message={serverError} onClose={() => setServerError('')} />
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              Enter the {OTP_EXPIRY_MINUTES}-minute verification code sent to your email.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Verification Code"
              type="text"
              name="code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (errors.code) {
                  setErrors((prev) => ({ ...prev, code: '' }));
                }
              }}
              placeholder="Enter 6-digit code"
              error={errors.code}
              required
              maxLength={6}
              autoComplete="one-time-code"
            />

            <Button type="submit" fullWidth loading={loading}>
              Verify Email
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{' '}
              {canResend ? (
                <button
                  onClick={handleResend}
                  className="font-medium text-blue-600 hover:text-blue-500"
                  disabled={loading}
                >
                  Resend Code
                </button>
              ) : (
                <span className="text-gray-400">
                  Resend in {resendTimer}s
                </span>
              )}
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link
              to={ROUTES.LOGIN}
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
