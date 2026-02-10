import svgPaths from "../../imports/svg-xxinht7hqm";

interface StaixSymbolProps {
  className?: string;
}

export function StaixSymbol({ className = '' }: StaixSymbolProps) {
  return (
    <div className={`relative size-full ${className}`} data-name="staix-symbol">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_staix_symbol)">
          <g>
            <path d="M10.2 0H13.8V4.8H10.2V0Z" fill="var(--foreground)" />
            <path d="M24 10.2H19.2V13.8H24V10.2Z" fill="var(--foreground)" />
            <path d={svgPaths.p26f49000} fill="var(--foreground)" />
            <path d="M4.8 10.2H0V13.8H4.8V10.2Z" fill="var(--foreground)" />
            <path d={svgPaths.p31397c40} fill="var(--foreground)" />
            <path d={svgPaths.p2e0bf80} fill="var(--foreground)" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_staix_symbol">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
