import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from "react";

export function ScrollReveal({
  children,
  className = "",
  style,
  visibleClass = "opacity-100 translate-y-0 scale-100 rotate-0",
  invisibleClass = "opacity-0 translate-y-16 scale-[0.98]"
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  visibleClass?: string;
  invisibleClass?: string;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={style}
      className={`transition-all duration-1000 transform-gpu ${
        visible ? visibleClass : invisibleClass
      } ${className}`}
    >
      {children}
    </div>
  );
}
