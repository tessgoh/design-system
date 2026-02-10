import React from 'react';
import checkSvgPaths from '../imports/svg-9lh6f2723r';
import minusSvgPaths from '../imports/svg-s6k3sls3kh';
import checkDisabledSvgPaths from '../imports/svg-kkh0x6avvw';
import minusDisabledSvgPaths from '../imports/svg-8eaz28oluh';

function IcCheckSelected() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg className="block size-[20px]" fill="none" viewBox="0 0 24 24">
        <path 
          clipRule="evenodd" 
          d={checkSvgPaths.p13931700} 
          fill="#111111" 
          fillRule="evenodd" 
        />
      </svg>
    </div>
  );
}

function IcCheckSelectedDisabled() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg className="block size-[20px]" fill="none" viewBox="0 0 20 20">
        <path 
          clipRule="evenodd" 
          d={checkDisabledSvgPaths.p32a76656} 
          fill="#9E9E9E" 
          fillRule="evenodd" 
        />
      </svg>
    </div>
  );
}

function IcMinus() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg className="block size-[20px]" fill="none" viewBox="0 0 24 24">
        <path 
          clipRule="evenodd" 
          d={minusSvgPaths.p7eb5700} 
          fill="#333333" 
          fillRule="evenodd" 
        />
      </svg>
    </div>
  );
}

function IcMinusDisabled() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg className="block size-[20px]" fill="none" viewBox="0 0 20 20">
        <path 
          clipRule="evenodd" 
          d={minusDisabledSvgPaths.p35095a80} 
          fill="#9E9E9E" 
          fillRule="evenodd" 
        />
      </svg>
    </div>
  );
}

export interface CheckboxProps {
  /**
   * 체크 상태
   */
  checked?: boolean;
  /**
   * indeterminate 상태 (부분 선택)
   */
  indeterminate?: boolean;
  /**
   * 비활성화 상태
   */
  disabled?: boolean;
  /**
   * 라벨 텍스트
   */
  label?: string;
  /**
   * 부가 설명 텍스트
   */
  description?: string;
  /**
   * 상태 변경 핸들러
   */
  onChange?: (checked: boolean) => void;
  /**
   * 커스텀 className
   */
  className?: string;
}

export default function Checkbox({
  checked = false,
  indeterminate = false,
  disabled = false,
  label,
  description,
  onChange,
  className = '',
}: CheckboxProps) {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!disabled && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault();
      if (onChange) {
        onChange(!checked);
      }
    }
  };

  return (
    <div
      className={`flex gap-[6px] items-start ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {/* Checkbox Box */}
      <div
        className={`relative rounded-[4px] shrink-0 size-[20px] transition-colors overflow-clip ${
          disabled ? 'bg-[#eeeeee]' : 'bg-white'
        }`}
      >
        {/* Icon Container */}
        {checked && !indeterminate && (
          disabled ? <IcCheckSelectedDisabled /> : <IcCheckSelected />
        )}
        
        {/* Indeterminate Icon (Minus) */}
        {indeterminate && (
          disabled ? <IcMinusDisabled /> : <IcMinus />
        )}
        
        {/* Border */}
        <div 
          aria-hidden="true" 
          className={`absolute inset-0 pointer-events-none rounded-[4px] border border-solid transition-colors ${
            disabled
              ? (checked || indeterminate) ? 'border-[#9e9e9e]' : 'border-[lightgrey]'
              : checked || indeterminate
              ? 'border-[#333333]'
              : 'border-[lightgrey] hover:border-[#999999]'
          }`}
        />
      </div>

      {/* Text Content */}
      {(label || description) && (
        <div className={`flex flex-col gap-[4px]`}>
          {label && (
            <p
              className="text-foreground"
              style={{
                fontFamily: 'var(--font-family-primary)',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
              }}
            >
              {label}
            </p>
          )}
          {description && (
            <p
              className="text-foreground"
              style={{
                fontFamily: 'var(--font-family-primary)',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '18px',
              }}
            >
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}