import React, { useEffect, useRef } from 'react';
import Button from './Button';

export interface ModalProps {
  /**
   * 모달 열림 상태
   */
  isOpen: boolean;
  /**
   * 모달 닫기 핸들러
   */
  onClose: () => void;
  /**
   * 모달 제목
   */
  title?: string;
  /**
   * 모달 본문 내용
   */
  children: React.ReactNode;
  /**
   * 푸터 영역 (커스텀 버튼)
   */
  footer?: React.ReactNode;
  /**
   * 확인 버튼 텍스트
   */
  confirmText?: string;
  /**
   * 취소 버튼 텍스트 (제공하지 않으면 취소 버튼이 표시되지 않음)
   */
  cancelText?: string;
  /**
   * 확인 버튼 클릭 핸들러
   */
  onConfirm?: () => void;
  /**
   * 확인 버튼 variant
   */
  confirmVariant?: 'default' | 'primary' | 'destructive' | 'secondary';
  /**
   * 모달 크기
   */
  size?: 'small' | 'large';
  /**
   * 백드롭 클릭 시 닫기 여부
   */
  closeOnBackdropClick?: boolean;
  /**
   * 닫기 버튼 표시 여부
   */
  showCloseButton?: boolean;
}

function IcClose({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative shrink-0 size-[28px] cursor-pointer bg-transparent border-none p-0 hover:opacity-70 transition-opacity"
      aria-label="닫기"
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <path 
          d="M5.12989 5.31275L5.21462 5.21462C5.52526 4.90397 6.01137 4.87573 6.35391 5.12989L6.45205 5.21462L14 12.7622L21.5479 5.21462C21.8897 4.87291 22.4437 4.87291 22.7854 5.21462C23.1271 5.55632 23.1271 6.11034 22.7854 6.45205L15.2378 14L22.7854 21.5479C23.096 21.8586 23.1243 22.3447 22.8701 22.6872L22.7854 22.7854C22.4747 23.096 21.9886 23.1243 21.6461 22.8701L21.5479 22.7854L14 15.2378L6.45205 22.7854C6.11034 23.1271 5.55632 23.1271 5.21462 22.7854C4.87291 22.4437 4.87291 21.8897 5.21462 21.5479L12.7622 14L5.21462 6.45205C4.90397 6.14141 4.87573 5.6553 5.12989 5.31275L5.21462 5.21462L5.12989 5.31275Z" 
          fill="#9E9E9E" 
        />
      </svg>
    </button>
  );
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  confirmText = '확인',
  cancelText,
  onConfirm,
  confirmVariant = 'default',
  size = 'small',
  closeOnBackdropClick = true,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // size에 따라 닫기 버튼 표시 여부 결정 (large에서만 표시)
  const shouldShowCloseButton = size === 'large';

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // 모달이 열릴 때 body 스크롤 방지
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // 포커스 트랩
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTab = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement?.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement?.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleTab);
      firstElement?.focus();

      return () => {
        document.removeEventListener('keydown', handleTab);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getModalWidth = () => {
    switch (size) {
      case 'small':
        return 'w-[450px]';
      case 'large':
      default:
        return 'w-[600px]';
    }
  };

  const getModalPadding = () => {
    switch (size) {
      case 'small':
        return {
          header: 'pt-[40px] pb-[16px] px-[24px]',
          content: 'px-[24px] py-0',
          footer: 'px-[24px] pt-[40px] pb-[30px]',
        };
      case 'large':
      default:
        return {
          header: 'pt-[24px] pb-[24px] px-[30px]',
          content: 'px-[30px] py-0',
          footer: 'px-[30px] pt-[30px] pb-[30px]',
        };
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnBackdropClick) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const padding = getModalPadding();
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className={`relative bg-white rounded-[8px] shadow-[0px_10px_10px_0px_rgba(17,17,17,0.3)] ${getModalWidth()} max-h-[90vh] flex flex-col overflow-hidden`}
      >
        {/* Header with Close Button */}
        {(title || shouldShowCloseButton) && (
          <div className={`flex items-center justify-between shrink-0 ${padding.header}`}>
            {title && (
              <h2
                id="modal-title"
                className={size === 'small' ? 'text-center flex-1' : ''}
                style={{
                  fontFamily: 'var(--font-family-primary)',
                  fontWeight: 600,
                  fontSize: '20px',
                  lineHeight: '30px',
                }}
              >
                {title}
              </h2>
            )}
            {shouldShowCloseButton && (
              <IcClose onClick={onClose} />
            )}
          </div>
        )}

        {/* Content */}
        <div className={`overflow-y-auto flex-1 ${padding.content}`}>
          <div
            className={size === 'small' ? 'text-center' : 'text-left'}
            style={{
              fontFamily: 'var(--font-family-primary)',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#333333',
            }}
          >
            {children}
          </div>
        </div>

        {/* Footer - 항상 표시 */}
        <div className={`flex items-center justify-center gap-[10px] shrink-0 ${padding.footer}`}>
          {footer ? (
            footer
          ) : (
            <>
              {cancelText && (
                <Button variant="outline" size="medium" onClick={onClose}>
                  {cancelText}
                </Button>
              )}
              <Button variant={confirmVariant} size="medium" onClick={handleConfirm}>
                {confirmText}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}