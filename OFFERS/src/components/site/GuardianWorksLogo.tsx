interface GuardianWorksLogoProps {
  className?: string;
  variant?: "full-dark" | "full-light" | "icon-only";
  height?: number | string;
}

export function GuardianWorksLogo({
  className = "",
  variant = "full-dark",
  height = 40,
}: GuardianWorksLogoProps) {
  const isDarkBg = variant === "full-dark";
  const isIconOnly = variant === "icon-only";

  const numHeight = typeof height === "number" ? height : parseInt(String(height), 10) || 40;

  if (isIconOnly) {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <img
          src="/LOGO2.png"
          alt="Guardian Works Group Ltd"
          style={{ height: `${numHeight}px` }}
          className="w-auto object-contain drop-shadow-sm"
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/LOGO2.png"
        alt="Guardian Works Group Ltd"
        style={{ height: `${numHeight}px` }}
        className="w-auto object-contain shrink-0 drop-shadow-sm"
      />
    </div>
  );
}
