import React, { type ReactNode } from "react";

interface ShineBorderCardProps {
  children: ReactNode;
  className?: string;
  borderRadius?: number;
  id?: string;
}

export function ShineBorderCard({
  children,
  className = "",
  borderRadius = 24,
  id,
}: ShineBorderCardProps) {
  return (
    <div
      id={id}
      className={`shine-border-card relative group p-[2px] overflow-hidden transition-all duration-300 hover:scale-[1.005] ${className}`}
      style={{ borderRadius: `${borderRadius}px` }}
    >
      {/* Animated Shimmer Light Sweep Layer */}
      <div className="shine-border-layer pointer-events-none absolute -inset-[100%] z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Solid Inner Content Card - Seamless 0-gap background */}
      <div
        className="relative z-10 w-full h-full bg-[#0B3B73]"
        style={{ borderRadius: `${Math.max(0, borderRadius - 2)}px` }}
      >
        {children}
      </div>
    </div>
  );
}

export default ShineBorderCard;
