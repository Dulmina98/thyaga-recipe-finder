import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'outline' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-full transition-colors';
  
  const variants = {
    primary: 'font-semibold text-white',
    secondary: 'border border-white bg-transparent text-white hover:bg-white/10 font-semibold',
    dark: 'bg-white text-black hover:bg-gray-100 font-medium',
    outline: 'border border-ghost-ash bg-peach-cream text-[#1A1A1A] hover:border-[#E8500B] hover:text-[#E8500B] font-medium',
    ghost: 'border border-white bg-transparent text-white hover:bg-white hover:text-black font-semibold',
    icon: 'bg-black text-white hover:bg-[#1A1A1A]',
  };

  const sizes = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-6 py-2 text-sm',
    lg: 'px-8 py-3.5 text-sm',
    icon: 'p-2.5',
  };

  // Primary needs inline style for exact brand color + hover
  const primaryStyle = variant === 'primary' ? { backgroundColor: '#E8500B' } : {};

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      className={classes}
      style={variant === 'primary' ? primaryStyle : {}}
      onMouseEnter={variant === 'primary' ? (e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F2743B'; } : undefined}
      onMouseLeave={variant === 'primary' ? (e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E8500B'; } : undefined}
      {...props}
    >
      {children}
    </button>
  );
};
