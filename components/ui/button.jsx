import React from 'react';

export const Button = ({ className = '', children, disabled, ...props }) => (
  <button
    className={`
      px-4
      py-2
      font-medium
      text-white
      bg-blue-600
      rounded-md
      hover:bg-blue-700
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      focus:ring-offset-2
      disabled:opacity-50
      disabled:cursor-not-allowed
      transition
      duration-200
      ${className}
    `}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);