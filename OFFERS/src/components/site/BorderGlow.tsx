import React, { useRef, useState, type ReactNode } from "react";

interface BorderGlowProps {
  children: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number | string;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
}

export function BorderGlow({
  children,
  className = "",
  backgroundColor = "#0B3B73",
  borderRadius = 16,
  glowRadius = 40,
  glowIntensity = 1,
  colors = ["#1E6EB6", "#4DA6E8", "#3FA652"],
}: BorderGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
    setOpacity(glowIntensity);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const colorGradient = colors.length > 1 ? colors.join(", ") : `${colors[0]}, transparent`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group overflow-hidden transition-all duration-300 ${className}`}
      style={{
        borderRadius: typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius,
        backgroundColor: backgroundColor,
      }}
    >
      {/* Interactive Border Glow Layer */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity: opacity,
          borderRadius: typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius,
          padding: "1.5px",
          background: `radial-gradient(${glowRadius * 6}px circle at ${position.x}% ${position.y}%, ${colorGradient}, transparent 70%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Subtle Default Border */}
      <div
        className="pointer-events-none absolute inset-0 z-0 border transition-colors duration-300"
        style={{
          borderRadius: typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius,
          borderColor: opacity > 0 ? "rgba(77, 166, 232, 0.4)" : "rgba(255, 255, 255, 0.12)",
        }}
      />

      {/* Card Content */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}

export default BorderGlow;
