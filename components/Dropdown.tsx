import React, { useState, useRef, useEffect } from 'react';

export interface DropdownItem {
  label: string;
  value: string;
  disabled?: boolean;
}

interface DropdownProps {
  items: DropdownItem[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
}

// ChevronDown Icon Component
function IcChevronDown({ color = '#333333' }: { color?: string }) {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <path 
          clipRule="evenodd" 
          d="M4.55806 7.05806C4.80214 6.81398 5.19786 6.81398 5.44194 7.05806L10 11.6161L14.5581 7.05806C14.8021 6.81398 15.1979 6.81398 15.4419 7.05806C15.686 7.30214 15.686 7.69786 15.4419 7.94194L10.4419 12.9419C10.1979 13.186 9.80214 13.186 9.55806 12.9419L4.55806 7.94194C4.31398 7.69786 4.31398 7.30214 4.55806 7.05806Z" 
          fill={color} 
          fillRule="evenodd" 
        />
      </svg>
    </div>
  );
}

export default function Dropdown({
  items,
  placeholder = 'Placeholder',
  value,
  onChange,
  disabled = false,
  className = '',
  label,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedItem = items.find(item => item.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleItemClick = (item: DropdownItem) => {
    if (!item.disabled) {
      onChange?.(item.value);
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className={`content-stretch flex flex-col gap-[4px] items-start relative w-full ${className}`}>
      {/* Label */}
      {label && (
        <div className="flex flex-col justify-center leading-[0] min-w-full relative shrink-0 text-[#111111] text-[14px] w-[min-content]">
          <p className="leading-[20px]">{label}</p>
        </div>
      )}

      {/* Trigger Button */}
      <div className="relative w-full">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            h-[40px] rounded-[6px] shrink-0 w-full relative
            ${disabled ? 'bg-[#eeeeee]' : 'bg-white'}
          `}
        >
          <div 
            aria-hidden="true" 
            className="absolute border border-[lightgrey] border-solid inset-0 pointer-events-none rounded-[6px]" 
          />
          <div className="flex flex-row items-center size-full">
            <div className="box-border content-stretch flex gap-[4px] h-[40px] items-center px-[14px] py-[10px] relative w-full">
              <div className={`
                basis-0 flex flex-col grow h-full justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[14px]
                ${selectedItem ? 'text-[#111111]' : 'text-[#9e9e9e]'}
              `}>
                <p className="leading-[20px] overflow-ellipsis overflow-hidden text-left">
                  {selectedItem ? selectedItem.label : placeholder}
                </p>
              </div>
              <IcChevronDown color={disabled ? '#9E9E9E' : '#333333'} />
            </div>
          </div>
        </button>

        {/* Dropdown Menu */}
        {isOpen && !disabled && (
          <div
            className={`
              absolute z-50 w-full mt-[4px]
              bg-white
              border border-[lightgrey]
              rounded-[6px]
              shadow-lg
              overflow-auto
            `}
            style={{
              maxHeight: items.length > 5 ? '200px' : 'none'
            }}
          >
            {items.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
                className={`
                  w-full
                  text-left
                  h-[40px]
                  px-[14px] py-[10px]
                  text-[14px]
                  leading-[20px]
                  transition-colors
                  ${item.disabled
                    ? 'text-[#9e9e9e] cursor-not-allowed bg-[#eeeeee]'
                    : 'text-[#111111] hover:bg-[#f5f5f5] cursor-pointer'
                  }
                  ${item.value === value ? 'bg-[#f5f5f5]' : ''}
                `}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}