import React from 'react';
import svgPaths from '../../imports/svg-2osqqbx35w';
import svgPathsSidebar from '../../imports/svg-yg3b89oprq';

interface IconProps {
  color?: string;
}

export function IcArrowNarrowLeft({ color = 'currentColor' }: IconProps) {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
      <g>
        <path clipRule="evenodd" d={svgPaths.p2739e70} fill={color} fillRule="evenodd" />
      </g>
    </svg>
  );
}

export function IcArrowNarrowRight({ color = 'currentColor' }: IconProps) {
  return (
    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
      <g>
        <path clipRule="evenodd" d={svgPaths.p2f7e0e80} fill={color} fillRule="evenodd" />
      </g>
    </svg>
  );
}

export function IcArrowNarrowLeftSidebar({ color = '#333333' }: IconProps) {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="ic-arrow-narrow-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="ic-arrow-narrow-left">
          <path clipRule="evenodd" d={svgPathsSidebar.p39aca300} fill={color} fillRule="evenodd" id="icon" />
        </g>
      </svg>
    </div>
  );
}