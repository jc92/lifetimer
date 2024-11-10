// components/ui/card.jsx
import React from 'react';

export const Card = ({ className = '', children, ...props }) => (
  <div 
    className={`bg-white rounded-xl shadow-lg ${className}`} 
    {...props}
  >
    {children}
  </div>
);

export const CardContent = ({ className = '', children, ...props }) => (
  <div 
    className={`p-6 ${className}`} 
    {...props}
  >
    {children}
  </div>
);
