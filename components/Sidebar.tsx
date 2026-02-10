import React from 'react';
import { IcArrowNarrowLeftSidebar } from './icons/ArrowIcons';
import { IcId } from './icons/IcId';
import { IcChevronLeft, IcChevronRight } from './icons/ChevronIcon';

export interface SidebarMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export interface SidebarMenuGroup {
  title?: string;
  items: SidebarMenuItem[];
}

interface SidebarProps {
  /**
   * "목록으로" 버튼 클릭 핸들러
   */
  onBackClick?: () => void;
  /**
   * "목록으로" 버튼 텍스트 (기본값: "목록으로")
   */
  backText?: string;
  /**
   * "목록으로" 버튼 표시 여부 (기본값: true)
   */
  showBackButton?: boolean;
  /**
   * 메뉴 그룹 목록
   */
  menuGroups: SidebarMenuGroup[];
  /**
   * 현재 활성화된 메뉴 아이템 ID
   */
  activeItemId?: string;
  /**
   * Collapse 버튼 클릭 핸들러
   */
  onCollapse?: () => void;
  /**
   * Sidebar open/close 상태 (기본값: true)
   */
  isOpen?: boolean;
  /**
   * 커스텀 className
   */
  className?: string;
}

export default function Sidebar({
  onBackClick,
  backText = '목록으로',
  showBackButton = true,
  menuGroups,
  activeItemId,
  onCollapse,
  isOpen = true,
  className = '',
}: SidebarProps) {
  return (
    <div className="group/sidebar relative content-stretch flex items-start" data-name="sidebar-wrapper">
      <aside
        className={`bg-sidebar content-stretch flex flex-col h-full items-start relative shrink-0 ${
          isOpen ? 'w-[220px]' : 'w-[84px]'
        } ${className}`}
        data-name="sidebar"
      >
        {/* Right border */}
        <div
          aria-hidden="true"
          className="absolute border-sidebar-border border-[0px_1px_0px_0px] border-solid inset-0 pointer-events-none"
        />

        {/* Collapse Button - shown on hover */}
        {onCollapse && (
          <div className="absolute flex flex-col gap-[8px] items-start justify-center right-[-12px] top-[10px] opacity-0 group-hover/sidebar:opacity-100 z-10" data-name="collapse-btn-wrapper">
            <button
              type="button"
              onClick={onCollapse}
              className="bg-sidebar relative rounded-full shrink-0 size-[24px] hover:bg-sidebar-accent"
              data-name="nav-btn"
            >
              <div className="overflow-clip relative rounded-[inherit] size-[24px]">
                {isOpen ? <IcChevronLeft color="var(--muted-foreground)" /> : <IcChevronRight color="var(--muted-foreground)" />}
              </div>
              <div aria-hidden="true" className="absolute border border-sidebar-border border-solid inset-0 pointer-events-none rounded-full" />
            </button>
          </div>
        )}

        {/* Back to List Button */}
        {showBackButton && (
          <button
            type="button"
            onClick={onBackClick}
            className={`group bg-sidebar box-border flex items-center py-[16px] relative shrink-0 w-full ${
              isOpen 
                ? 'gap-[12px] px-[32px]' 
                : 'justify-center px-[32px]'
            }`}
            data-name="nav-back-to-list-btn"
          >
            {/* Bottom border */}
            <div
              aria-hidden="true"
              className="absolute border-sidebar-border border-[0px_1px_1px_0px] border-solid inset-0 pointer-events-none"
            />
            
            <div className="flex flex-col gap-[8px] items-start justify-center shrink-0 text-sidebar-foreground group-hover:text-sidebar-selected-foreground">
              <IcArrowNarrowLeftSidebar color="currentColor" />
            </div>
            
            {isOpen && (
              <p
                className="shrink-0 text-sidebar-foreground group-hover:text-sidebar-selected-foreground text-nowrap whitespace-pre"
                style={{
                  fontFamily: 'var(--font-family-primary)',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '20px',
                }}
              >
                {backText}
              </p>
            )}
          </button>
        )}

        {/* Menu Groups */}
        {menuGroups.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className={`box-border flex flex-col gap-[10px] items-start py-[30px] relative shrink-0 w-full ${
              isOpen ? 'px-[20px]' : 'px-[12px]'
            }`}
            data-name="menu-wrap"
          >
            {/* Bottom border (except for last group) */}
            {groupIndex < menuGroups.length - 1 && (
              <div
                aria-hidden="true"
                className="absolute border-sidebar-border border-[0px_0px_1px] border-solid inset-0 pointer-events-none"
              />
            )}

            {/* Group Title */}
            {group.title && (
              <div className="h-[20px] relative shrink-0 w-full" data-name="title">
                {isOpen ? (
                  <p
                    className="text-muted-foreground text-left"
                    style={{
                      fontFamily: 'var(--font-family-primary)',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '20px',
                    }}
                  >
                    {group.title}
                  </p>
                ) : (
                  <p
                    className="text-muted-foreground text-center"
                    style={{
                      fontFamily: 'var(--font-family-primary)',
                      fontWeight: 400,
                      fontSize: '12px',
                      lineHeight: '18px',
                    }}
                  >
                    {group.title}
                  </p>
                )}
              </div>
            )}

            {/* Menu Items */}
            {group.items.map((item) => {
              const isActive = activeItemId === item.id;
              const isDisabled = item.disabled;

              // Determine styles based on state
              let bgClass = 'bg-sidebar';
              let itemColorClass = 'text-sidebar-foreground';
              
              if (isDisabled) {
                // Disabled state
                bgClass = 'bg-sidebar';
                itemColorClass = 'text-muted-foreground';
              } else if (isActive) {
                // Selected state
                bgClass = 'bg-sidebar-selected';
                itemColorClass = 'text-sidebar-selected-foreground';
              } else {
                // Default state with hover
                bgClass = 'bg-sidebar hover:bg-sidebar-selected';
                itemColorClass = 'text-sidebar-foreground group-hover:text-sidebar-primary';
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={isDisabled ? undefined : item.onClick}
                  disabled={isDisabled}
                  className={`group box-border content-stretch flex items-center px-[12px] py-[9px] relative rounded-[6px] shrink-0 ${bgClass} ${
                    isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
                  } ${
                    isOpen ? 'gap-[12px] w-[180px]' : 'justify-center w-[60px]'
                  }`}
                  data-name="nav-item"
                >
                  {/* Icon */}
                  <div className={`content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 ${itemColorClass}`}>
                    {item.icon ? (
                      <div className={isOpen ? 'size-[24px]' : 'size-[20px]'}>
                        {item.icon}
                      </div>
                    ) : (
                      <IcId className={itemColorClass} color="currentColor" />
                    )}
                  </div>

                  {/* Label - only show when open */}
                  {isOpen && (
                    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                      <p
                        className={`relative shrink-0 text-nowrap whitespace-pre ${itemColorClass}`}
                        style={{
                          fontFamily: 'var(--font-family-primary)',
                          fontWeight: 500,
                          fontSize: '14px',
                          lineHeight: '20px',
                        }}
                      >
                        {item.label}
                      </p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </aside>
    </div>
  );
}