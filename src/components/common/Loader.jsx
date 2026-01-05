const Loader = ({ size = 'medium', fullScreen = false, text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-8 h-8 border-2',
    medium: 'w-12 h-12 border-3',
    large: 'w-16 h-16 border-4',
  };

  const loaderClass = sizeClasses[size] || sizeClasses.medium;

  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div className={`${loaderClass} border-blue-500 border-t-transparent rounded-full animate-spin`}></div>
      {text && <p className="mt-4 text-gray-600 font-medium animate-pulse">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-95 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
          {spinner}
        </div>
      </div>
    );
  }

  return <div className="flex justify-center items-center p-8">{spinner}</div>;
};

export default Loader;
