import React from 'react';

export interface TooltipProps {
  /**
   * 툴팁에 표시할 텍스트
   */
  content: string;
  /**
   * 툴팁이 대상 요소의 어느 방향에 위치하는지
   * - top: 대상 요소 위쪽에 툴팁 표시 (화살표 아래 방향)
   * - bottom: 대상 요소 아래쪽에 툴팁 표시 (화살표 위 방향)
   * - left: 대상 요소 왼쪽에 툴팁 표시 (화살표 오른쪽 방향)
   * - right: 대상 요소 오른쪽에 툴팁 표시 (화살표 왼쪽 방향)
   */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * 화살표 정렬 위치
   * - start: 시작 부분 정렬 (왼쪽/위쪽)
   * - center: 중앙 정렬
   * - end: 끝 부분 정렬 (오른쪽/아래쪽)
   */
  arrowAlign?: 'start' | 'center' | 'end';
  /**
   * 커스텀 className
   */
  className?: string;
}

function Content({ content }: { content: string }) {
  return (
    <div 
      className="bg-[#333333] box-border flex gap-[10px] items-center px-[16px] py-[8px] rounded-[6px] shrink-0 shadow-[0px_2px_6px_0px_rgba(17,17,17,0.3)]"
      data-name="Content"
    >
      <p
        className="text-white text-nowrap whitespace-pre"
        style={{
          fontFamily: 'var(--font-family-primary)',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '20px',
        }}
      >
        {content}
      </p>
    </div>
  );
}

// Bottom placement (화살표가 아래, 대상 요소가 아래에 있을 때)
function CaretTipBottom() {
  return (
    <div className="h-[6px] shrink-0 w-[32px]" data-name="Caret tip">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 6">
        <path 
          clipRule="evenodd" 
          d="M16 6L10 0L22 0L16 6Z" 
          fill="#333333" 
          fillRule="evenodd" 
        />
      </svg>
    </div>
  );
}

// Top placement (화살표가 위, 대상 요소가 위에 있을 때)
function CaretTipTop() {
  return (
    <div className="h-[6px] shrink-0 w-[32px]" data-name="Caret tip">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 6">
        <path 
          clipRule="evenodd" 
          d="M16 0L22 6H10L16 0Z" 
          fill="#333333" 
          fillRule="evenodd" 
        />
      </svg>
    </div>
  );
}

// Left placement (화살표가 왼쪽, 대상 요소가 왼쪽에 있을 때)
function CaretTipLeft() {
  return (
    <div className="h-full shrink-0 w-[6px] flex items-center" data-name="Caret tip">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 12">
        <path 
          clipRule="evenodd" 
          d="M0 6L6 0V12L0 6Z" 
          fill="#333333" 
          fillRule="evenodd" 
        />
      </svg>
    </div>
  );
}

// Right placement (화살표가 오른쪽, 대상 요소가 오른쪽에 있을 때)
function CaretTipRight() {
  return (
    <div className="h-full shrink-0 w-[6px] flex items-center" data-name="Caret tip">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 12">
        <path 
          clipRule="evenodd" 
          d="M6 6L0 12V0L6 6Z" 
          fill="#333333" 
          fillRule="evenodd" 
        />
      </svg>
    </div>
  );
}

export default function Tooltip({
  content,
  placement = 'bottom',
  arrowAlign = 'center',
  className = '',
}: TooltipProps) {
  const getAlignmentClass = () => {
    if (placement === 'top' || placement === 'bottom') {
      // 세로 배치일 때는 가로 정렬
      switch (arrowAlign) {
        case 'start':
          return 'items-start';
        case 'end':
          return 'items-end';
        case 'center':
        default:
          return 'items-center';
      }
    } else {
      // 가로 배치일 때는 세로 정렬
      switch (arrowAlign) {
        case 'start':
          return 'justify-start';
        case 'end':
          return 'justify-end';
        case 'center':
        default:
          return 'justify-center';
      }
    }
  };

  const renderContent = () => {
    switch (placement) {
      case 'top':
        return (
          <div className={`box-border flex flex-col ${getAlignmentClass()} ${className}`} data-name="tooltip">
            <CaretTipTop />
            <Content content={content} />
          </div>
        );
      case 'bottom':
        return (
          <div className={`box-border flex flex-col ${getAlignmentClass()} ${className}`} data-name="tooltip">
            <Content content={content} />
            <CaretTipBottom />
          </div>
        );
      case 'left':
        return (
          <div className={`box-border flex flex-row items-center ${getAlignmentClass()} ${className}`} data-name="tooltip">
            <CaretTipLeft />
            <Content content={content} />
          </div>
        );
      case 'right':
        return (
          <div className={`box-border flex flex-row items-center ${getAlignmentClass()} ${className}`} data-name="tooltip">
            <Content content={content} />
            <CaretTipRight />
          </div>
        );
      default:
        return null;
    }
  };

  return renderContent();
}
