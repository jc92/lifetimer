
// components/ui/input.jsx
import React from 'react';

export const Input = ({ className = '', ...props }) => (
  <input
    className={`
      w-full
      px-4
      py-2
      border
      rounded-md
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      transition
      duration-200
      ${className}
    `}
    {...props}
  />
);