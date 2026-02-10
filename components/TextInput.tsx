import React from 'react';

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /**
   * 라벨 텍스트
   */
  label?: string;
  /**
   * 도움말 텍스트
   */
  helpText?: string;
  /**
   * 에러 메시지
   */
  error?: string;
  /**
   * 에러 상태
   */
  isError?: boolean;
  /**
   * 왼쪽 아이콘
   */
  leftIcon?: React.ReactNode;
  /**
   * 오른쪽 아이콘
   */
  rightIcon?: React.ReactNode;
  /**
   * 값 변경 핸들러
   */
  onChange?: (value: string) => void;
  /**
   * 커스텀 className
   */
  className?: string;
}

export default function TextInput({
  label,
  helpText,
  error,
  isError = false,
  leftIcon,
  rightIcon,
  onChange,
  className = '',
  disabled = false,
  placeholder,
  value,
  type = 'text',
  ...props
}: TextInputProps) {
  const hasError = isError || !!error;
  const [isFocused, setIsFocused] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const getBorderColor = () => {
    if (disabled) return 'lightgrey';
    if (hasError) return '#db3947';
    if (isFocused) return 'var(--primary)';
    if (isHovered) return '#999999';
    return 'lightgrey';
  };

  return (
    <div className={`flex flex-col gap-[4px] ${className}`}>
      {/* Label */}
      {label && (
        <label
          className="text-foreground"
          style={{
            fontFamily: 'var(--font-family-primary)',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
          }}
        >
          {label}
        </label>
      )}

      {/* Input Field Container */}
      <div 
        className="relative w-full h-[40px] rounded-[6px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          aria-hidden="true" 
          className="absolute inset-0 pointer-events-none rounded-[6px] border border-solid transition-colors"
          style={{
            borderColor: getBorderColor(),
          }}
        />
        <div className={`flex items-center h-full ${
          disabled
            ? 'bg-[#eeeeee]'
            : hasError
            ? 'bg-white'
            : 'bg-input-background'
        } rounded-[6px]`}>
          <div className="flex gap-[4px] items-center h-[40px] px-[14px] py-[10px] w-full">
            {leftIcon && (
              <div className="shrink-0">
                {leftIcon}
              </div>
            )}
            <input
              type={type}
              value={value}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              disabled={disabled}
              className={`
                flex-1 bg-transparent border-none outline-none
                placeholder:text-[#9e9e9e]
                ${disabled ? 'text-[#9e9e9e] cursor-not-allowed' : 'text-foreground'}
              `}
              style={{
                fontFamily: 'var(--font-family-primary)',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
              }}
              {...props}
            />
            {rightIcon && (
              <div className="shrink-0">
                {rightIcon}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Help Text or Error Message */}
      {error && (
        <p
          style={{
            fontFamily: 'var(--font-family-primary)',
            fontWeight: 400,
            fontSize: '13px',
            lineHeight: '19px',
            color: '#db3947',
          }}
        >
          {error}
        </p>
      )}
      {helpText && (
        <p
          style={{
            fontFamily: 'var(--font-family-primary)',
            fontWeight: 400,
            fontSize: '13px',
            lineHeight: '19px',
            color: disabled ? '#9e9e9e' : '#6e6e6e',
          }}
        >
          {helpText}
        </p>
      )}
    </div>
  );
}