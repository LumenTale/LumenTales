import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none transition-colors';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2',
    accent: 'bg-accent-500 text-white hover:bg-accent-600 focus:ring-2 focus:ring-accent-500 focus:ring-offset-2',
    outline: 'bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
    ghost: 'bg-transparent text-primary-500 hover:bg-primary-50 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
  };
  
  // Width class
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Disabled class
  const disabledClass = props.disabled ? 'opacity-60 cursor-not-allowed' : '';
  
  // Combine all classes
  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${disabledClass} ${className}`;
  
  // Loading spinner
  const LoadingSpinner = () => (
    <svg className="w-4 h-4 mr-2 -ml-1 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
  
  // Button content
  const ButtonContent = () => (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </>
  );
  
  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        <ButtonContent />
      </Link>
    );
  }
  
  // Otherwise, render as button
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={buttonClasses}
      {...props}
    >
      <ButtonContent />
    </motion.button>
  );
};

export default Button; 