import React, { useRef, useState, useEffect, type ReactNode, type CSSProperties } from "react";

interface AnimatedContentProps {
  children: ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

export function AnimatedContent({
  children,
  distance = 100,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "cubic-bezier(0.25, 1, 0.5, 1)",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  className = "",
  style = {},
}: AnimatedContentProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const offset = reverse ? -distance : distance;
  const transformX = direction === "horizontal" ? (inView ? 0 : offset) : 0;
  const transformY = direction === "vertical" ? (inView ? 0 : offset) : 0;
  const currentScale = inView ? 1 : scale;
  const opacity = inView ? 1 : animateOpacity ? initialOpacity : 1;

  // Convert ease name if GSAP style ease string is passed
  const transitionEase = ease === "power3.out" ? "cubic-bezier(0.215, 0.61, 0.355, 1)" : ease;

  return (
    <div
      ref={ref}
      className={`transition-all transform-gpu ${className}`}
      style={{
        ...style,
        opacity: opacity,
        transform: `translate3d(${transformX}px, ${transformY}px, 0) scale(${currentScale})`,
        transitionDuration: `${duration}s`,
        transitionTimingFunction: transitionEase,
        transitionDelay: `${delay}s`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}

export default AnimatedContent;
