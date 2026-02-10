import React, { useState } from 'react';
import { StaixFullLogo } from './icons/StaixFullLogo';
import { StaixSymbol } from './icons/StaixSymbol';
import { AccountIcon } from './icons/AccountIcon';
import UserMenu, { type UserMenuSection } from './UserMenu';

export interface NavMenuItem {
  label: string;
  badge?: string;
  onClick?: () => void;
}

interface HeaderProps {
  /**
   * 로고 옆에 표시될 이름 (회사명 또는 workspace명)
   * 기본값: 'staix' (전체 로고 표시)
   * 다른 값: 심볼 + name 표시
   */
  name?: string;
  /**
   * 네비게이션 메뉴 아이템 목록
   */
  menuItems?: NavMenuItem[];
  /**
   * 사용자 버튼 클릭 시 호출되는 핸들러 (deprecated, use userMenu instead)
   */
  onUserClick?: () => void;
  /**
   * 사용자 이름
   */
  userName?: string;
  /**
   * 사용자 역할 (예: Owner, Admin, Panda)
   */
  userRole?: string;
  /**
   * 역할 배지 색상
   */
  roleColor?: string;
  /**
   * 사용자 메뉴 섹션 목록
   */
  userMenuSections?: UserMenuSection[];
  /**
   * 커스텀 className
   */
  className?: string;
}

export default function Header({ 
  name = 'staix',
  menuItems = [],
  onUserClick,
  userName = '',
  userRole,
  roleColor,
  userMenuSections = [],
  className = '' 
}: HeaderProps) {
  const isDefaultMode = name === 'staix';
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleUserClick = () => {
    if (userMenuSections.length > 0 && userName) {
      setIsUserMenuOpen(!isUserMenuOpen);
    } else if (onUserClick) {
      onUserClick();
    }
  };

  return (
    <header 
      className={`bg-background relative h-[60px] min-h-[60px] max-h-[60px] flex-shrink-0 w-full ${className}`}
      data-name="header"
    >
      {/* Bottom border */}
      <div 
        aria-hidden="true" 
        className="absolute border-border border-[0px_0px_1px] border-solid inset-0 pointer-events-none" 
      />
      
      {/* Logo and Name */}
      <div className="absolute h-[24px] left-[32px] top-1/2 translate-y-[-50%] flex items-center gap-2">
        {isDefaultMode ? (
          <div className="h-[24px] w-[94px]">
            <StaixFullLogo />
          </div>
        ) : (
          <>
            <div className="h-[24px] w-[24px]">
              <StaixSymbol />
            </div>
            <span className="text-foreground">{name}</span>
          </>
        )}
      </div>

      {/* Navigation Menu - Center */}
      {menuItems.length > 0 && (
        <nav className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] flex items-center gap-[10px]">
          {menuItems.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={item.onClick}
              className="flex items-center justify-center gap-[2px] px-[24px] py-[6px] rounded-[4px] hover:bg-muted/50 transition-colors"
              style={{
                minWidth: item.badge ? 'auto' : '88px',
                paddingLeft: item.badge ? '9px' : '24px',
                paddingRight: item.badge ? '9px' : '24px'
              }}
            >
              <span 
                className="text-foreground whitespace-nowrap"
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: '20px',
                  fontFamily: 'var(--font-family-primary)'
                }}
              >
                {item.label}
              </span>
              {item.badge && (
                <span 
                  className="text-muted-foreground"
                  style={{
                    fontSize: '9px',
                    lineHeight: '12px',
                    fontFamily: 'var(--font-family-primary)',
                    height: '12px',
                    width: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end'
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      )}

      {/* User Info Button */}
      <div className="absolute right-[32px] top-1/2 translate-y-[-50%]">
        <button
          type="button"
          onClick={handleUserClick}
          className="bg-muted hover:bg-muted-foreground active:bg-muted-foreground transition-colors overflow-clip rounded-[16px] size-[32px] flex items-center justify-center"
          aria-label="User profile"
          data-name="btn-user-info"
        >
          <AccountIcon />
        </button>
        
        {/* User Menu */}
        {userMenuSections.length > 0 && userName && (
          <UserMenu
            userName={userName}
            userRole={userRole}
            roleColor={roleColor}
            sections={userMenuSections}
            isOpen={isUserMenuOpen}
            onClose={() => setIsUserMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
}