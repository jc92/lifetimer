// components/ui/progress.jsx
import React from 'react';

export const Progress = ({ value = 0, className = '', ...props }) => (
  <div className={`bg-gray-200 rounded-full overflow-hidden ${className}`} {...props}>
    <div
      className="bg-blue-600 h-full transition-all duration-500 ease-in-out"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);