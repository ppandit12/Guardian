import { useEffect, useRef, useState } from "react";

export function AnimatedCounter({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const element = ref.current;
    if (!element) return;

    // Parse the number and the suffix
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNumber = parseInt(match[1], 10);
    const suffix = match[2];

    const startCounter = () => {
      const startTime = performance.now();
      const duration = 2200; // 2.2 seconds duration

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out cubic: progress = 1 - (1 - progress)^3
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentNumber = Math.round(easeProgress * targetNumber);

        setDisplayValue(`${currentNumber}${suffix}`);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          startCounter();
          obs.disconnect(); // Synchronous disconnect using callback instance
        }
      },
      { threshold: 0.4 } // 40% section visibility
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [value]);

  return <span ref={ref}>{displayValue}</span>;
}
