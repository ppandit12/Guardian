import React, { type ElementType, type ComponentPropsWithoutRef, type ReactNode } from "react";

type StarBorderProps<T extends ElementType = "button"> = {
  as?: T;
  className?: string;
  color?: string;
  speed?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

export function StarBorder<T extends ElementType = "button">({
  as,
  className = "",
  color = "#4DA6E8",
  speed = "5s",
  children,
  ...props
}: StarBorderProps<T>) {
  const Component = as || "button";
  const glowColor = color === "magenta" ? "#4DA6E8" : color;

  return (
    <Component
      className={`relative inline-block p-[1px] overflow-hidden rounded-2xl group transition-transform duration-300 ${className}`}
      {...props}
    >
      {/* Star Light Beams Animation Layer 1 */}
      <div
        className="pointer-events-none absolute w-[300%] h-[50%] opacity-80 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          animationDuration: speed,
        }}
      />
      {/* Star Light Beams Animation Layer 2 */}
      <div
        className="pointer-events-none absolute w-[300%] h-[50%] opacity-80 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          animationDuration: speed,
        }}
      />
      {/* Inner Content Wrapper */}
      <div className="relative z-10 bg-[#0B3B73] border border-white/10 rounded-[15px] h-full w-full">
        {children}
      </div>
    </Component>
  );
}

export default StarBorder;
