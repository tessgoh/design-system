import React, { useRef, useEffect } from 'react';

export interface UserMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export interface UserMenuSection {
  sectionTitle?: string;
  items: UserMenuItem[];
}

interface UserMenuProps {
  userName: string;
  userRole?: string;
  roleColor?: string;
  sections: UserMenuSection[];
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

function RoleBadge({ role, color }: { role: string; color?: string }) {
  return (
    <div 
      className="box-border content-stretch flex gap-[10px] h-[24px] items-center justify-center px-[10px] py-[2px] rounded-[20px] shrink-0"
      style={{
        backgroundColor: color || 'var(--muted-foreground)',
      }}
    >
      <p 
        className="relative shrink-0 text-nowrap text-right text-white whitespace-pre"
        style={{
          fontFamily: 'var(--font-family-primary)',
          fontWeight: 'var(--font-weight-regular)',
          fontSize: '12px',
          lineHeight: '18px',
        }}
      >
        {role}
      </p>
    </div>
  );
}

function NameWrap({ userName, userRole, roleColor }: { userName: string; userRole?: string; roleColor?: string }) {
  return (
    <div className="bg-muted h-[54px] relative shrink-0 w-full">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[54px] items-center px-[16px] py-[15px] relative w-full">
          <p 
            className="basis-0 grow leading-[20px] min-h-px min-w-px relative shrink-0 text-foreground"
            style={{
              fontFamily: 'var(--font-family-primary)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: '14px',
            }}
          >
            {userName}
          </p>
          {userRole && <RoleBadge role={userRole} color={roleColor} />}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center justify-center pb-[8px] pt-[16px] px-[16px] relative w-full">
          <p 
            className="basis-0 grow leading-[18px] min-h-px min-w-px relative shrink-0 text-muted-foreground"
            style={{
              fontFamily: 'var(--font-family-primary)',
              fontWeight: 'var(--font-weight-regular)',
              fontSize: '12px',
            }}
          >
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}

function MenuItem({ item, onClick }: { item: UserMenuItem; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={item.disabled}
      className={`
        h-[52px] relative shrink-0 w-full
        ${item.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-muted/50'}
        transition-colors
      `}
    >
      <div className="size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[52px] items-center p-[16px] relative w-full">
          {item.icon && (
            <div className="relative shrink-0 size-[20px] flex items-center justify-center">
              {item.icon}
            </div>
          )}
          <p 
            className="relative shrink-0 text-nowrap whitespace-pre"
            style={{
              fontFamily: 'var(--font-family-primary)',
              fontWeight: 'var(--font-weight-regular)',
              fontSize: '14px',
              lineHeight: '20px',
              color: '#333333',
            }}
          >
            {item.label}
          </p>
        </div>
      </div>
    </button>
  );
}

function MenuSection({ section, onItemClick }: { section: UserMenuSection; onItemClick: (item: UserMenuItem) => void }) {
  return (
    <div className="bg-background content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div 
        aria-hidden="true" 
        className="absolute border-[0px_0px_1px] border-solid inset-0 pointer-events-none"
        style={{ borderColor: '#eeeeee' }}
      />
      {section.sectionTitle && <SectionHeader title={section.sectionTitle} />}
      {section.items.map((item, index) => (
        <MenuItem 
          key={index} 
          item={item} 
          onClick={() => onItemClick(item)} 
        />
      ))}
    </div>
  );
}

export default function UserMenu({
  userName,
  userRole,
  roleColor,
  sections,
  isOpen,
  onClose,
  className = '',
}: UserMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleItemClick = (item: UserMenuItem) => {
    if (!item.disabled && item.onClick) {
      item.onClick();
      onClose();
    }
  };

  return (
    <div
      ref={menuRef}
      className={`
        absolute z-50 right-0 top-[calc(100%+8px)]
        rounded-[var(--radius)]
        min-w-[240px]
        overflow-hidden
        ${className}
      `}
    >
      <div className="relative rounded-[var(--radius)] size-full">
        <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
          <NameWrap userName={userName} userRole={userRole} roleColor={roleColor} />
          {sections.map((section, index) => (
            <MenuSection 
              key={index} 
              section={section} 
              onItemClick={handleItemClick}
            />
          ))}
        </div>
        <div 
          aria-hidden="true" 
          className="absolute border border-solid inset-0 pointer-events-none rounded-[var(--radius)]"
          style={{
            borderColor: 'var(--border)',
            boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.1)',
          }}
        />
      </div>
    </div>
  );
}
