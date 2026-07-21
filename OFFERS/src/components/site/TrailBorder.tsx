import React, { type ReactNode } from "react";

interface TrailBorderProps {
  children: ReactNode;
  className?: string;
  accentColor?: string;
  speed?: string;
  borderRadius?: number;
  borderWidth?: number;
  trailSize?: number;
}

export function TrailBorder({
  children,
  className = "",
  accentColor = "#4DA6E8",
  speed = "6s",
  borderRadius = 16,
  borderWidth = 1.5,
  trailSize = 35,
}: TrailBorderProps) {
  return (
    <div
      className={`relative group overflow-hidden transition-all duration-300 ${className}`}
      style={{
        borderRadius: `${borderRadius}px`,
        backgroundColor: "#0B3B73",
      }}
    >
      {/* Outer Border Track & Animated Light Trail */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          borderRadius: `${borderRadius}px`,
          padding: `${borderWidth}px`,
        }}
      >
        <div
          className="trail pointer-events-none absolute opacity-60 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            width: `${trailSize * 2}px`,
            height: `${trailSize * 1.2}px`,
            background: `radial-gradient(100% 100% at right, ${accentColor}, transparent 60%)`,
            offsetPath: "rect(0% 100% 100% 0% round 16px)",
            offsetAnchor: "100% 50%",
            animation: `journey ${speed} infinite linear`,
          }}
        />
      </div>

      {/* Seamless Card Content Wrapper */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}

export default TrailBorder;
