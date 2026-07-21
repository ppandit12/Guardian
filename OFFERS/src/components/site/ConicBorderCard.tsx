import React, { type ReactNode } from "react";

interface ConicBorderCardProps {
  children: ReactNode;
  className?: string;
  borderRadius?: number;
}

export function ConicBorderCard({
  children,
  className = "",
  borderRadius = 16,
}: ConicBorderCardProps) {
  return (
    <div
      className={`relative group p-[2px] overflow-hidden transition-all duration-300 hover:scale-[1.03] ${className}`}
      style={{ borderRadius: `${borderRadius}px` }}
    >
      {/* 360° Spinning Conic Gradient Beam */}
      <div
        className="pointer-events-none absolute -inset-[150%] animate-conic-spin z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `conic-gradient(from 0deg, transparent 0%, #1E6EB6 40%, #4DA6E8 65%, #79C76A 85%, #4DA6E8 95%, transparent 100%)`,
        }}
      />

      {/* Inner Solid Content Card - Seamless 0-gap background */}
      <div
        className="relative z-10 w-full h-full bg-[#0B3B73]"
        style={{ borderRadius: `${Math.max(0, borderRadius - 2)}px` }}
      >
        {children}
      </div>
    </div>
  );
}

export default ConicBorderCard;
