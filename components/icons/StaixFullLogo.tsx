import svgPaths from "../../imports/svg-sihh4pr32l";

interface StaixFullLogoProps {
  className?: string;
}

export function StaixFullLogo({ className = '' }: StaixFullLogoProps) {
  return (
    <div className={`relative size-full ${className}`} data-name="staix-full-logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 94 24">
        <g id="logo">
          <g id="vector">
            <path d="M10.2 0H13.8V4.8H10.2V0Z" fill="var(--foreground)" />
            <path d="M24 10.2H19.2V13.8H24V10.2Z" fill="var(--foreground)" />
            <path d={svgPaths.p26f49000} fill="var(--foreground)" />
            <path d="M4.8 10.2H0V13.8H4.8V10.2Z" fill="var(--foreground)" />
            <path d={svgPaths.p31397c40} fill="var(--foreground)" />
            <path d={svgPaths.p237fcfd0} fill="var(--foreground)" />
            <path d={svgPaths.p31c1e700} fill="var(--foreground)" />
            <path clipRule="evenodd" d={svgPaths.p1c996600} fill="var(--foreground)" fillRule="evenodd" />
            <path d={svgPaths.p50bef00} fill="var(--foreground)" />
            <path d={svgPaths.p189dfc00} fill="var(--foreground)" />
            <path d={svgPaths.p1c25d500} fill="var(--foreground)" />
            <path d={svgPaths.pbf3d900} fill="var(--foreground)" />
            <path d={svgPaths.p16f42d80} fill="var(--foreground)" />
          </g>
        </g>
      </svg>
    </div>
  );
}
