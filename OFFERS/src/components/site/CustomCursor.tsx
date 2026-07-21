import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animFrameId: number;

    // LERP (Linear Interpolation) function for smooth trailing animation
    const lerp = (start: number, end: number, amount: number) => {
      return (1 - amount) * start + amount * end;
    };

    const moveCursor = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      // Instantaneous dot position
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      dot.style.opacity = "1";
      ring.style.opacity = "1";

      // Detect hover targets dynamically (a, button, interactive elements)
      const target = e.target as HTMLElement | null;
      if (target) {
        const isHovered = target.closest("a, button, [role='button'], input, select, textarea");
        if (isHovered) {
          dot.classList.add("cursor-active");
          ring.classList.add("cursor-active");
        } else {
          dot.classList.remove("cursor-active");
          ring.classList.remove("cursor-active");
        }
      }
    };

    // Smooth LERP animation loop for trailing ring
    const loop = () => {
      currentX = lerp(currentX, targetX, 0.18);
      currentY = lerp(currentY, targetY, 0.18);

      ring.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      animFrameId = requestAnimationFrame(loop);
    };

    const handleMouseDown = () => {
      dot.classList.add("cursor-clicked");
      ring.classList.add("cursor-clicked");
    };

    const handleMouseUp = () => {
      dot.classList.remove("cursor-clicked");
      ring.classList.remove("cursor-clicked");
    };

    const handleMouseLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    loop();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot pointer-events-none fixed top-0 left-0 transition-opacity duration-300 z-[99999]" />
      <div ref={ringRef} className="cursor-ring pointer-events-none fixed top-0 left-0 transition-opacity duration-300 z-[99998]" />
    </>
  );
}

export default CustomCursor;
