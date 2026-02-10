import React from 'react';

interface StatusProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  size?: 'large' | 'small';
  children: React.ReactNode;
  className?: string;
}

export default function Status({
  variant = 'default',
  size = 'large',
  children,
  className = '',
}: StatusProps) {
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'border-primary';
      case 'warning':
        return 'border-accent';
      case 'error':
        return 'border-destructive';
      case 'info':
        return 'border-secondary';
      case 'default':
      default:
        return 'border-muted-foreground';
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'success':
        return 'text-primary';
      case 'warning':
        return 'text-accent';
      case 'error':
        return 'text-destructive';
      case 'info':
        return 'text-secondary';
      case 'default':
      default:
        return 'text-muted-foreground';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'large':
        return 'h-[34px] px-[20px] py-[2px] rounded-[17px] text-[14px]';
      case 'small':
        return 'h-[28px] px-[14px] py-[2px] rounded-[14px] text-[12px]';
      default:
        return 'h-[34px] px-[20px] py-[2px] rounded-[17px] text-[14px]';
    }
  };

  return (
    <div
      className={`
        relative
        bg-white
        inline-flex items-center justify-center
        ${getSizeStyles()}
        ${className}
      `}
    >
      <div 
        aria-hidden="true" 
        className={`
          absolute 
          inset-0 
          pointer-events-none 
          border-[1.2px] 
          border-solid
          ${size === 'large' ? 'rounded-[17px]' : 'rounded-[14px]'}
          ${getVariantStyles()}
        `} 
      />
      <p className={`leading-[20px] whitespace-nowrap relative shrink-0 ${getTextColor()}`}>
        {children}
      </p>
    </div>
  );
}