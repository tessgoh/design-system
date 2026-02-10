import svgPaths from '../../imports/svg-b7rvlntbmq';

interface ChevronLeftIconProps {
  color?: string;
}

export function IcChevronLeft({ color = '#9E9E9E' }: ChevronLeftIconProps) {
  return (
    <div className="absolute left-1/2 size-[16px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="ic-chevron-left">
      <div className="absolute inset-0 overflow-clip" data-name="icon">
        <div className="absolute h-[10px] left-[calc(50%-1px)] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[6px]" data-name="Icon">
          <div className="absolute inset-[-5%_-8.33%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 11">
              <path d={svgPaths.p21a54600} stroke={color} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export function IcChevronRight({ color = '#9E9E9E' }: ChevronLeftIconProps) {
  return (
    <div className="absolute left-1/2 size-[16px] top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="ic-chevron-right">
      <div className="absolute inset-0 overflow-clip" data-name="icon">
        <div className="absolute h-[10px] left-[calc(50%+1px)] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[6px]" data-name="Icon">
          <div className="absolute inset-[-5%_-8.33%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 11">
              <path d={svgPaths.p21a54600} stroke={color} strokeLinecap="round" strokeLinejoin="round" transform="scale(-1, 1) translate(-7, 0)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}