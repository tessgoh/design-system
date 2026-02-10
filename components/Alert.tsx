import React from 'react';

export interface AlertProps {
  /**
   * 알럿 타입
   */
  variant?: 'success' | 'information' | 'warning';
  /**
   * 알럿 사이즈
   * - title: 타이틀과 설명이 포함된 사이즈
   * - slim: 메시지만 전달하는 슬림 사이즈 (최대 1줄)
   */
  size?: 'title' | 'slim';
  /**
   * 타이틀 (size="title"일 때 사용)
   */
  title?: string;
  /**
   * 메시지 또는 설명 텍스트
   * - size="title": 최대 2줄 권장
   * - size="slim": 최대 1줄
   */
  message: string;
  /**
   * 닫기 버튼 클릭 핸들러
   */
  onClose?: () => void;
  /**
   * 커스텀 className
   */
  className?: string;
}

function IcCheckCircleFilled() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <path 
          d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM15.2197 8.96967L10.75 13.4393L8.78033 11.4697C8.48744 11.1768 8.01256 11.1768 7.71967 11.4697C7.42678 11.7626 7.42678 12.2374 7.71967 12.5303L10.2197 15.0303C10.5126 15.3232 10.9874 15.3232 11.2803 15.0303L16.2803 10.0303C16.5732 9.73744 16.5732 9.26256 16.2803 8.96967C15.9874 8.67678 15.5126 8.67678 15.2197 8.96967Z" 
          fill="white" 
        />
      </svg>
    </div>
  );
}

function IcInfoFilled() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <path 
          d="M11.9996 1.99902C17.5233 1.99902 22.0011 6.47687 22.0011 12.0006C22.0011 17.5243 17.5233 22.0021 11.9996 22.0021C6.47589 22.0021 1.99805 17.5243 1.99805 12.0006C1.99805 6.47687 6.47589 1.99902 11.9996 1.99902ZM11.9958 10.2496C11.483 10.2499 11.0605 10.6363 11.0031 11.1336L10.9964 11.2503L11 16.7519L11.0068 16.8685C11.0649 17.3658 11.4879 17.7515 12.0007 17.7512C12.5135 17.7509 12.936 17.3645 12.9934 16.8672L13 16.7505L12.9964 11.249L12.9896 11.1323C12.9316 10.635 12.5086 10.2493 11.9958 10.2496ZM12 6.50006C11.3089 6.50006 10.7485 7.06038 10.7485 7.75158C10.7485 8.44277 11.3089 9.0031 12 9.0031C12.6912 9.0031 13.2516 8.44277 13.2516 7.75158C13.2516 7.06038 12.6912 6.50006 12 6.50006Z" 
          fill="white" 
        />
      </svg>
    </div>
  );
}

function IcClose({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative shrink-0 size-[20px] cursor-pointer bg-transparent border-none p-0 hover:opacity-80 transition-opacity"
      aria-label="닫기"
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path 
          clipRule="evenodd" 
          d="M4.55806 4.55806C4.80214 4.31398 5.19786 4.31398 5.44194 4.55806L10 9.11612L14.5581 4.55806C14.8021 4.31398 15.1979 4.31398 15.4419 4.55806C15.686 4.80214 15.686 5.19786 15.4419 5.44194L10.8839 10L15.4419 14.5581C15.686 14.8021 15.686 15.1979 15.4419 15.4419C15.1979 15.686 14.8021 15.686 14.5581 15.4419L10 10.8839L5.44194 15.4419C5.19786 15.686 4.80214 15.686 4.55806 15.4419C4.31398 15.1979 4.31398 14.8021 4.55806 14.5581L9.11612 10L4.55806 5.44194C4.31398 5.19786 4.31398 4.80214 4.55806 4.55806Z" 
          fill="white" 
          fillRule="evenodd" 
        />
      </svg>
    </button>
  );
}

export default function Alert({
  variant = 'information',
  size = 'title',
  title,
  message,
  onClose,
  className = '',
}: AlertProps) {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'success':
        return 'bg-[#00ab7f]';
      case 'warning':
        return 'bg-[#db3947]';
      case 'information':
      default:
        return 'bg-[#333333]';
    }
  };

  const renderIcon = () => {
    switch (variant) {
      case 'success':
        return <IcCheckCircleFilled />;
      case 'warning':
      case 'information':
      default:
        return <IcInfoFilled />;
    }
  };

  // Slim 사이즈 (메시지만 한 줄로 표시)
  if (size === 'slim') {
    return (
      <div 
        className={`${getBackgroundColor()} relative rounded-[6px] shadow-[0px_5px_5px_0px_rgba(17,17,17,0.2)] ${className}`}
        data-name="Alert"
      >
        <div className="flex flex-row items-center">
          <div className="box-border flex gap-[8px] items-center p-[16px] w-full">
            {/* Content */}
            <div className="basis-0 grow min-h-px min-w-px">
              <div className="flex flex-row items-center">
                <div className="box-border flex gap-[8px] items-center pr-[8px] w-full">
                  <div className="flex flex-col gap-[8px] items-start justify-center shrink-0">
                    {renderIcon()}
                  </div>
                  <p 
                    className="basis-0 grow min-h-px min-w-px text-white"
                    style={{
                      fontFamily: 'var(--font-family-primary)',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '20px',
                    }}
                  >
                    {message}
                  </p>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <IcClose onClick={onClose} />
          </div>
        </div>
      </div>
    );
  }

  // Title 사이즈 (타이틀 + 설명)
  return (
    <div 
      className={`${getBackgroundColor()} relative rounded-[6px] shadow-[0px_5px_5px_0px_rgba(17,17,17,0.2)] ${className}`}
      data-name="Alert"
    >
      <div className="flex flex-row items-center">
        <div className="box-border flex gap-[8px] items-center p-[16px] w-full">
          {/* Content */}
          <div className="basis-0 flex flex-col gap-[8px] grow min-h-px min-w-px">
            {/* Title with Icon */}
            {title && (
              <div className="w-full">
                <div className="flex flex-row items-center">
                  <div className="box-border flex gap-[8px] items-center pr-[8px] w-full">
                    <div className="flex flex-col gap-[8px] items-start justify-center shrink-0">
                      {renderIcon()}
                    </div>
                    <p 
                      className="basis-0 grow min-h-px min-w-px text-white"
                      style={{
                        fontFamily: 'var(--font-family-primary)',
                        fontWeight: 600,
                        fontSize: '18px',
                        lineHeight: '28px',
                      }}
                    >
                      {title}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="w-full">
              <div className="flex flex-row justify-center">
                <div className="box-border flex gap-[10px] items-start justify-center pl-[32px] w-full">
                  <p 
                    className="basis-0 grow min-h-px min-w-px text-white whitespace-pre-wrap"
                    style={{
                      fontFamily: 'var(--font-family-primary)',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '20px',
                    }}
                  >
                    {message}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <IcClose onClick={onClose} />
        </div>
      </div>
    </div>
  );
}