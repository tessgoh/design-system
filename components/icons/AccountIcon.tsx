import svgPaths from "../../imports/svg-37alwjw7fq";

interface AccountIconProps {
  className?: string;
}

export function AccountIcon({ className = '' }: AccountIconProps) {
  return (
    <div className={`relative size-[20px] ${className}`} data-name="ic-account-panda-filled">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="ic-account-panda-filled">
          <path d={svgPaths.p38a06f80} fill="white" id="icon" />
        </g>
      </svg>
    </div>
  );
}