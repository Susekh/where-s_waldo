import React from 'react';

const Button: React.FC<{
  onClick?: () => void;
  type?: string;
  danger?: boolean;
  className?: string;
  children: React.ReactNode;
}> = ({ onClick, type, danger, className, children }) => {
  const baseClasses =
    "inline-flex items-center justify-center font-Jersey10 font-semibold rounded transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg";
  const typeClasses =
    type === "primary" && danger
      ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white hover:shadow-red-500/25 hover:shadow-xl"
      : "bg-gray-600 hover:bg-gray-700 text-white";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${typeClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
