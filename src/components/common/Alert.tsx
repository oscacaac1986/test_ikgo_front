import React from 'react';

interface AlertProps {
  message: string;
  type?: 'error' | 'success';
}

export const Alert: React.FC<AlertProps> = ({ message, type = 'error' }) => {
  const bgColor = type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700';
  return (
    <div className={`p-4 mb-4 rounded-md ${bgColor}`}>
      {message}
    </div>
  );
};