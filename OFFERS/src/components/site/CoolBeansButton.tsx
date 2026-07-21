import React, { type ButtonHTMLAttributes, type ElementType } from "react";

interface CoolBeansButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "green" | "blue" | "white";
  className?: string;
  as?: ElementType;
  to?: string;
  href?: string;
}

export function CoolBeansButton({
  children,
  variant = "green",
  className = "",
  as: Component = "button",
  ...props
}: CoolBeansButtonProps) {
  return (
    <Component
      className={`btn-cool-beans btn-cool-beans-${variant} ${className}`}
      {...props}
    >
      <span className="relative z-10 font-bold uppercase tracking-wider flex items-center justify-center gap-2">
        {children}
      </span>
    </Component>
  );
}

export default CoolBeansButton;
