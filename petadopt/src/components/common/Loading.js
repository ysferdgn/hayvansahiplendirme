import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loading = ({ size = 'medium', variant = 'primary', fullScreen = false }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  const variantClasses = {
    primary: 'border-[#4CAF50]',
    white: 'border-white',
    gray: 'border-gray-400'
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50'
    : 'flex items-center justify-center';

  return (
    <div className={containerClasses}>
      <div className={`animate-spin rounded-full border-t-2 border-b-2 ${sizeClasses[size]} ${variantClasses[variant]}`}>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading; 