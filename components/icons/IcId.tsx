import svgPaths from "../../imports/svg-yg3b89oprq";

interface IcIdProps {
  className?: string;
  color?: string;
}

export function IcId({ className = '', color = '#111111' }: IcIdProps) {
  return (
    <div className={`relative shrink-0 size-[24px] ${className}`} data-name="ic-id">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="ic-id">
          <path d={svgPaths.p2cf58280} fill={color} id="icon" />
        </g>
      </svg>
    </div>
  );
}
