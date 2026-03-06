import { cn } from "@/lib/utils";

interface OrionLogoProps {
  className?: string;
  size?: number;
}

export function OrionLogo({ size = 24, className }: OrionLogoProps) {
  const filterId = "glow-orion";

  return (
    <svg
      className={cn("flex-shrink-0", className)}
      fill="none"
      height={size}
      shapeRendering="geometricPrecision"
      viewBox="0 0 200 200"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter height="200%" id={filterId} width="200%" x="-50%" y="-50%">
          <feGaussianBlur result="coloredBlur" stdDeviation="5" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle
        className="stroke-black dark:stroke-white dark:[filter:url(#glow-orion)]"
        cx="100"
        cy="100"
        r="85"
        stroke="currentColor"
        strokeWidth="10"
      />
    </svg>
  );
}
