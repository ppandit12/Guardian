import React, { type ButtonHTMLAttributes } from "react";

interface GalaxyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "green" | "blue";
}

export function GalaxyButton({
  children = "Get a quote",
  variant = "green",
  className = "",
  onClick,
  ...props
}: GalaxyButtonProps) {
  const bgClass =
    variant === "green"
      ? "bg-gradient-to-r from-[#3FA652] via-[#2E7D32] to-[#3FA652] hover:from-[#79C76A] hover:to-[#3FA652]"
      : "bg-gradient-to-r from-[#0B3B73] via-[#1E6EB6] to-[#0B3B73] hover:from-[#1E6EB6] hover:to-[#4DA6E8]";

  return (
    <div className={`galaxy-button relative inline-block group ${className}`}>
      <button
        onClick={onClick}
        className={`relative flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-white font-display text-xs font-extrabold uppercase tracking-widest transition-all duration-300 shadow-[0_4px_20px_rgba(63,166,82,0.4)] hover:shadow-[0_8px_30px_rgba(63,166,82,0.6)] hover:scale-105 active:scale-95 cursor-pointer overflow-hidden ${bgClass}`}
        {...props}
      >
        {/* Animated Spark Border */}
        <span className="spark absolute inset-0 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Backdrop Glow */}
        <span className="backdrop absolute inset-[1px] bg-[#071F3D]/20 backdrop-blur-sm rounded-full pointer-events-none" />

        {/* Static Stars */}
        <span className="galaxy__container pointer-events-none absolute inset-0 overflow-hidden">
          <span className="star star--static absolute top-2 left-4 w-1 h-1 bg-white rounded-full opacity-80 animate-ping" />
          <span className="star star--static absolute bottom-2 right-6 w-1.5 h-1.5 bg-[#79C76A] rounded-full opacity-90" />
          <span className="star star--static absolute top-3 right-10 w-1 h-1 bg-white rounded-full opacity-60" />
          <span className="star star--static absolute bottom-3 left-8 w-1 h-1 bg-[#4DA6E8] rounded-full opacity-70" />
        </span>

        {/* Orbiting Galaxy Stars Ring */}
        <span className="galaxy pointer-events-none absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-90 transition-opacity duration-300">
          <span className="galaxy__ring w-20 h-20 border border-white/20 rounded-full animate-spin duration-10000 relative">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="star absolute w-1 h-1 bg-white rounded-full"
                style={{
                  top: `${50 + 40 * Math.sin((i * 30 * Math.PI) / 180)}%`,
                  left: `${50 + 40 * Math.cos((i * 30 * Math.PI) / 180)}%`,
                  boxShadow: "0 0 6px rgba(255, 255, 255, 0.8)",
                }}
              />
            ))}
          </span>
        </span>

        {/* Button Text */}
        <span className="text relative z-10 font-bold text-white tracking-wider flex items-center gap-1.5">
          {children}
        </span>
      </button>
      <div className="bodydrop absolute inset-0 -z-10 rounded-full blur-md bg-[#3FA652]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}

export default GalaxyButton;
