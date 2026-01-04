import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';

const Dashboard = () => {
  const { user, loading, logoutAll } = useAuth();

  const handleLogoutAll = async () => {
    if (window.confirm('Are you sure you want to logout from all devices?')) {
      await logoutAll();
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back, {user?.username}!</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Account Status</h3>
              {user?.isVerified ? (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Verified
                </span>
              ) : (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                  Unverified
                </span>
              )}
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                Your account is {user?.isActive ? 'active' : 'inactive'}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Info</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 uppercase">Email</p>
                <p className="text-sm font-medium text-gray-900">{user?.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Username</p>
                <p className="text-sm font-medium text-gray-900">{user?.username}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Role</p>
                <p className="text-sm font-medium text-gray-900 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Login Method</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 uppercase">Provider</p>
                <p className="text-sm font-medium text-gray-900 capitalize">
                  {user?.provider || 'Local'}
                </p>
              </div>
              {user?.provider === 'google' && (
                <div>
                  <p className="text-xs text-gray-500 uppercase">Google Account</p>
                  <p className="text-sm font-medium text-green-600">Connected</p>
                </div>
              )}
              {user?.lastLogin && (
                <div>
                  <p className="text-xs text-gray-500 uppercase">Last Login</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(user.lastLogin).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" onClick={handleLogoutAll}>
              Logout from All Devices
            </Button>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Security Tips</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
            <li>Never share your password with anyone</li>
            <li>Use a strong, unique password for your account</li>
            <li>Enable two-factor authentication when available</li>
            <li>Regularly update your password</li>
            <li>Log out from shared or public devices</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
