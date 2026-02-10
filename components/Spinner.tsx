import React from 'react';
import imgIcon from "figma:asset/d4358f9ba0b206cd3a4d247c329419f865618e7d.png";

interface SpinnerProps {
  size?: 'large' | 'medium' | 'small';
  variant?: 'primary' | 'secondary' | 'destructive' | 'default';
  className?: string;
}

export default function Spinner({
  size = 'medium',
  variant = 'primary',
  className = '',
}: SpinnerProps) {
  
  const getSizeValue = () => {
    switch (size) {
      case 'large':
        return 40;
      case 'medium':
        return 32;
      case 'small':
        return 24;
      default:
        return 32;
    }
  };

  const getVariantColor = () => {
    switch (variant) {
      case 'primary':
        return 'var(--primary)';
      case 'secondary':
        return 'var(--secondary)';
      case 'destructive':
        return 'var(--destructive)';
      case 'default':
        return '#111111';
      default:
        return 'var(--primary)';
    }
  };

  const getVariantStyle = () => {
    // CSS filter to change black image to desired color
    // Using mask approach for better color accuracy
    switch (variant) {
      case 'primary':
        return { WebkitMaskImage: `url(${imgIcon})`, maskImage: `url(${imgIcon})`, WebkitMaskSize: 'contain', maskSize: 'contain', backgroundColor: 'var(--primary)' };
      case 'secondary':
        return { WebkitMaskImage: `url(${imgIcon})`, maskImage: `url(${imgIcon})`, WebkitMaskSize: 'contain', maskSize: 'contain', backgroundColor: 'var(--secondary)' };
      case 'destructive':
        return { WebkitMaskImage: `url(${imgIcon})`, maskImage: `url(${imgIcon})`, WebkitMaskSize: 'contain', maskSize: 'contain', backgroundColor: 'var(--destructive)' };
      case 'default':
        return {};
      default:
        return { WebkitMaskImage: `url(${imgIcon})`, maskImage: `url(${imgIcon})`, WebkitMaskSize: 'contain', maskSize: 'contain', backgroundColor: 'var(--primary)' };
    }
  };

  const sizeValue = getSizeValue();
  const color = getVariantColor();

  return (
    <div
      className={`relative inline-block animate-spin ${className}`}
      style={{ width: sizeValue, height: sizeValue }}
      role="status"
      aria-label="Loading"
    >
      {/* Main arc */}
      <div className="absolute inset-[16.67%]">
        {variant === 'default' ? (
          <img alt="" className="block max-w-none size-full" height="16" src={imgIcon} width="16" />
        ) : (
          <div className="block size-full" style={getVariantStyle()} />
        )}
      </div>
      {/* Small dot */}
      <div className="absolute inset-[73.33%_44.67%_16.67%_45.33%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 3">
          <ellipse cx="1.2" cy="1.2" fill={color} rx="1.2" ry="1.2" />
        </svg>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}