import React from 'react';

export type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'gray';
export type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: boolean;
  className?: string;
  onClick?: () => void; // 1. Added this to the interface
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = false,
  className = '',
  onClick, // 2. Destructured here
}) => {
  const variantClasses = {
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-100 text-secondary-800',
    accent: 'bg-accent-100 text-accent-800',
    success: 'bg-success-50 text-success-700',
    warning: 'bg-warning-50 text-warning-700',
    error: 'bg-error-50 text-error-700',
    gray: 'bg-gray-100 text-gray-800',
  };
  
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5', // Made sm slightly smaller for tight grids
    md: 'text-xs px-2.5 py-0.5',
    lg: 'text-sm px-3 py-1',
  };
  
  const roundedClass = rounded ? 'rounded-full' : 'rounded';
  
  // 3. Add cursor-pointer and hover effect ONLY if onClick exists
  const clickableClasses = onClick ? 'cursor-pointer hover:opacity-80 active:scale-95 transition-all' : '';
  
  return (
    <span
      onClick={onClick} // 4. Applied the click handler
      className={`inline-flex items-center font-medium ${roundedClass} ${variantClasses[variant]} ${sizeClasses[size]} ${clickableClasses} ${className}`}
    >
      {children}
    </span>
  );
};