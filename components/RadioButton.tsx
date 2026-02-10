import React from 'react';

export interface RadioButtonProps {
  /**
   * 선택 상태
   */
  checked?: boolean;
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
   * 상태 변경 핸들러 - 선택된 라디오 버튼의 value를 전달
   */
  onChange?: (value: string) => void;
  /**
   * 커스텀 className
   */
  className?: string;
  /**
   * name 속성 (라디오 버튼 그룹핑용)
   */
  name?: string;
  /**
   * value 속성
   */
  value?: string;
}

export default function RadioButton({
  checked = false,
  disabled = false,
  label,
  description,
  onChange,
  className = '',
  name,
  value,
}: RadioButtonProps) {
  const handleClick = () => {
    if (!disabled && onChange && !checked) {
      onChange(value || '');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!disabled && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault();
      if (onChange && !checked) {
        onChange(value || '');
      }
    }
  };

  return (
    <div
      className={`flex gap-[6px] items-start ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="radio"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {/* Radio Button Circle */}
      <div
        className={`relative rounded-full shrink-0 size-[20px] transition-colors ${
          disabled ? 'bg-[#eeeeee]' : 'bg-white'
        }`}
      >
        {/* Inner Dot */}
        {checked && (
          <div className="overflow-clip relative rounded-full size-[20px]">
            <div 
              className={`absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] rounded-full size-[10px] ${
                disabled ? 'bg-[#9e9e9e]' : 'bg-[#333333]'
              }`}
            />
          </div>
        )}
        
        {/* Border */}
        <div 
          aria-hidden="true" 
          className={`absolute inset-0 pointer-events-none rounded-full border border-solid transition-colors ${
            disabled
              ? checked ? 'border-[#9e9e9e]' : 'border-[lightgrey]'
              : checked
              ? 'border-[#333333]'
              : 'border-[lightgrey] hover:border-[#999999]'
          }`}
        />
      </div>

      {/* Text Content */}
      {(label || description) && (
        <div className="flex flex-col gap-[4px]">
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