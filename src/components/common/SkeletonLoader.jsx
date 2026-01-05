const SkeletonLoader = ({ type = 'text', count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'text':
        return (
          <div className="animate-pulse space-y-3">
            {[...Array(count)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        );

      case 'card':
        return (
          <div className="animate-pulse">
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="animate-pulse flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        );
    }
  };

  return <>{renderSkeleton()}</>;
};

export default SkeletonLoader;
