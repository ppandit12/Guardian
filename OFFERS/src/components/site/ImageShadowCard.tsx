import React, { type ReactNode } from "react";

interface ImageShadowCardProps {
  src: string;
  alt?: string;
  children?: ReactNode;
  className?: string;
  imgClassName?: string;
}

export function ImageShadowCard({
  src,
  alt = "Guardian Works Group",
  children,
  className = "",
  imgClassName = "",
}: ImageShadowCardProps) {
  return (
    <div className={`relative group transition-all duration-300 hover:scale-[1.01] ${className}`}>
      {/* Primary Image Container */}
      <div className="relative rounded-2xl overflow-hidden z-10 border border-white/15 shadow-2xl bg-white">
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imgClassName}`}
        />
      </div>

      {/* Dynamic Ambient Blurred Shadow Image Glow */}
      <div className="pointer-events-none absolute w-[92%] h-full left-1/2 -translate-x-1/2 -bottom-[15px] z-0 rounded-2xl overflow-hidden filter blur-[18px] opacity-75 group-hover:opacity-100 group-hover:-bottom-[20px] transition-all duration-500">
        <img src={src} alt="" className="w-full h-full object-cover mt-3 scale-110" />
      </div>

      {/* Optional Card Content Overlay */}
      {children && <div className="absolute inset-0 z-20">{children}</div>}
    </div>
  );
}

export default ImageShadowCard;
