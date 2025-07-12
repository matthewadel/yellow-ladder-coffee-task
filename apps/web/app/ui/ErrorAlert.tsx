import React from 'react';

interface ErrorAlertProps {
  error: string;
  variant?: 'warning' | 'error' | 'info';
  className?: string;
}

export const ErrorAlert = ({ 
  error, 
  variant = 'warning',
  className = '' 
}: ErrorAlertProps) => {
  const variants = {
    warning: {
      container: 'bg-yellow-50 border-yellow-400',
      icon: 'text-yellow-400',
      text: 'text-yellow-700',
      iconPath: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
    },
    error: {
      container: 'bg-red-50 border-red-400',
      icon: 'text-red-400',
      text: 'text-red-700',
      iconPath: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    info: {
      container: 'bg-blue-50 border-blue-400',
      icon: 'text-blue-400',
      text: 'text-blue-700',
      iconPath: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    }
  };

  const currentVariant = variants[variant];

  return (
    <div className={`p-4 border-l-4 rounded ${currentVariant.container} ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <svg 
            className={`h-5 w-5 ${currentVariant.icon}`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d={currentVariant.iconPath} 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm ${currentVariant.text}`}>
            {error}
          </p>
        </div>
        
      </div>
    </div>
  );
};
