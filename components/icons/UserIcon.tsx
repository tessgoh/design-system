import React from 'react';
import svgPaths from '../../imports/svg-koteal57uq';

interface UserIconProps {
  className?: string;
}

export function UserIcon({ className = '' }: UserIconProps) {
  return (
    <svg 
      className={className} 
      fill="none" 
      preserveAspectRatio="none" 
      viewBox="0 0 20 20"
      aria-label="User profile"
    >
      <path d={svgPaths.p38a06f80} fill="white" />
    </svg>
  );
}
