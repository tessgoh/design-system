import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'destructive' | 'outline';
  size?: 'large' | 'medium' | 'small';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  iconOnly?: boolean;
  'aria-label'?: string;
}

export default function Button({ 
  variant = 'default', 
  size = 'large',
  leftIcon,
  rightIcon,
  children,
  iconOnly = false,
  className = '',
  disabled = false,
  ...props 
}: ButtonProps) {
  
  const getVariantStyles = () => {
    if (disabled) {
      return iconOnly 
        ? 'text-muted-foreground cursor-not-allowed'
        : 'bg-muted text-muted-foreground cursor-not-allowed';
    }
    
    // Icon only buttons have transparent background with hover states
    if (iconOnly) {
      switch (variant) {
        case 'primary':
          return 'text-primary hover:bg-primary/10 active:bg-primary/20';
        case 'secondary':
          return 'text-secondary hover:bg-secondary/10 active:bg-secondary/20';
        case 'destructive':
          return 'text-destructive hover:bg-destructive/10 active:bg-destructive/20';
        case 'outline':
        case 'default':
        default:
          return 'text-foreground hover:bg-muted/50 active:bg-muted';
      }
    }
    
    // Regular buttons with solid backgrounds
    switch (variant) {
      case 'primary':
        return 'bg-primary text-primary-foreground hover:opacity-90 active:opacity-80';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground hover:opacity-90 active:opacity-80';
      case 'destructive':
        return 'bg-destructive text-destructive-foreground hover:opacity-90 active:opacity-80';
      case 'outline':
        return 'bg-background border border-foreground text-foreground hover:bg-muted/50 active:bg-muted';
      case 'default':
      default:
        return 'bg-foreground text-background hover:opacity-90 active:opacity-80';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'large':
        return 'px-[24px] text-[14px] h-[50px]';
      case 'medium':
        return 'px-[20px] text-[14px] h-[40px]';
      case 'small':
        return 'px-[16px] text-[14px] h-[30px]';
      default:
        return 'px-[24px] text-[14px] h-[50px]';
    }
  };

  const getIconOnlySize = () => {
    switch (size) {
      case 'large':
        return 'w-[50px] h-[50px]';
      case 'medium':
        return 'w-[40px] h-[40px]';
      case 'small':
        return 'w-[30px] h-[30px]';
      default:
        return 'w-[50px] h-[50px]';
    }
  };

  const getIconColor = () => {
    if (disabled) {
      return 'var(--muted-foreground)';
    }
    
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'destructive':
        return 'white';
      case 'outline':
      case 'default':
      default:
        return variant === 'outline' ? 'var(--foreground)' : 'white';
    }
  };

  return (
    <button
      className={`
        relative rounded-[var(--radius)] 
        ${getVariantStyles()}
        transition-all duration-200
        ${iconOnly ? getIconOnlySize() : ''}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {iconOnly ? (
        <div className="flex items-center justify-center size-full">
          <div className="relative shrink-0 size-[24px]">
            {leftIcon || rightIcon || children}
          </div>
        </div>
      ) : (
        <div className={`flex gap-[4px] items-center justify-center min-w-[100px] ${getSizeStyles()}`}>
          {leftIcon && <div className="relative shrink-0 size-[24px]">{leftIcon}</div>}
          <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-center text-nowrap">
            <p className="leading-[20px] whitespace-pre">{children}</p>
          </div>
          {rightIcon && <div className="relative shrink-0 size-[24px]">{rightIcon}</div>}
        </div>
      )}
    </button>
  );
}