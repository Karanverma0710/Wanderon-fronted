const PageLoader = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          {/* Outer rotating circle */}
          <div className="w-24 h-24 border-4 border-blue-200 rounded-full animate-spin"></div>
          
          {/* Inner rotating circle */}
          <div className="absolute top-0 left-0 w-24 h-24 border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-blue-600 rounded-full animate-pulse"></div>
        </div>

        <h2 className="mt-8 text-xl font-semibold text-gray-800 animate-pulse">
          {message}
        </h2>
        
        <div className="mt-4 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
