import { Shield } from "lucide-react";

// Binary stream particle coordinates and configurations
const BINARY_STREAMS = [
  { left: "15%", delay: "0.2s", char: "1", duration: "3.2s" },
  { left: "28%", delay: "1.1s", char: "0", duration: "2.8s" },
  { left: "42%", delay: "0.5s", char: "1", duration: "3.5s" },
  { left: "55%", delay: "1.8s", char: "0", duration: "3.0s" },
  { left: "68%", delay: "0.8s", char: "1", duration: "3.4s" },
  { left: "82%", delay: "2.3s", char: "1", duration: "2.7s" },
  { left: "90%", delay: "1.4s", char: "0", duration: "3.1s" },
];

export default function HeroAnimation() {
  return (
    <div
      className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[350px] lg:h-[350px] flex items-center justify-center select-none"
      style={{ perspective: "1000px" }}
    >
      {/* Perspective Container */}
      <div
        className="relative w-full h-full transform-gpu transition-all duration-700"
        style={{
          transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Floating Binary Streams */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
        >
          {BINARY_STREAMS.map((s, idx) => (
            <div
              key={idx}
              className="absolute bottom-1/3 h-48 w-0.5 bg-gradient-to-t from-[#4DA6E8]/20 via-[#4DA6E8]/10 to-transparent"
              style={{ left: s.left }}
            >
              {/* Floating digit */}
              <div
                className="absolute text-[10px] font-mono text-[#4DA6E8] font-bold animate-float-up drop-shadow-[0_0_4px_rgba(77,166,232,0.8)]"
                style={{
                  animationDelay: s.delay,
                  animationDuration: s.duration,
                  left: "-4px",
                }}
              >
                {s.char}
              </div>
            </div>
          ))}
        </div>

        {/* 1. Shield Platform / Base */}
        <div
          className="absolute inset-0 bg-[#071F3D]/95 rounded-[40px] border-2 border-[#1E6EB6]/40 flex items-center justify-center overflow-hidden animate-loop-base-glow"
          style={{
            transform: "translateZ(-15px)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Glowing Hexagonal Grid Overlay */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-screen animate-loop-hex-grid"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cpath d='M13.9 9.5L0 1.5v16l13.9 8 13.9-8v-16zM0 34.5l13.9 8 13.9-8v-16L13.9 25.5 0 17.5z' fill='none' stroke='%234DA6E8' stroke-width='0.7' stroke-opacity='0.6'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Glowing bottom badge */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-8 text-[#4DA6E8]/80 animate-pulse">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-full h-full drop-shadow-[0_0_8px_rgba(77,166,232,0.8)]"
            >
              <polygon points="12,2 22,22 2,22" />
            </svg>
          </div>

          {/* Small platform logo text */}
          <div className="absolute top-6 right-8 text-[9px] tracking-[0.2em] font-display font-bold text-[#4DA6E8]/70 uppercase">
            Guardian Works
          </div>
        </div>

        {/* 2. Central Tablet Device */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#071F3D] border border-[#1E6EB6]/50 rounded-2xl p-2.5 shadow-2xl flex items-center justify-center w-[130px] h-[180px] sm:w-[150px] sm:h-[210px] md:w-[160px] md:h-[220px]"
          style={{
            transform: "translateZ(30px) rotateX(-15deg)",
            transformStyle: "preserve-3d",
            boxShadow: "0 25px 50px -12px rgba(7, 31, 61, 0.9)",
          }}
        >
          {/* Glass Screen */}
          <div
            className="w-full h-full border border-white/10 shadow-inner overflow-hidden relative rounded-xl animate-loop-tablet-screen flex flex-col items-center justify-between py-6 px-4"
          >
            {/* Screen Header */}
            <div className="w-full flex items-center justify-between text-slate-400">
              <div className="w-2 h-2 rounded-full bg-[#3FA652] animate-ping" />
              <div className="text-[7px] font-mono tracking-wider font-bold">24/7 OPERATIONAL</div>
              <div className="w-2 h-2 rounded-full bg-[#3FA652]" />
            </div>

            {/* Screen Body - Cyber Sonar Pulse */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#4DA6E8]/30 animate-ping" />
              <div className="absolute w-14 h-14 rounded-full border border-[#4DA6E8]/40 animate-pulse" />
              <div className="absolute w-8 h-8 rounded-full bg-[#0B3B73]/40 border border-[#1E6EB6] flex items-center justify-center text-[#4DA6E8]">
                <Shield className="w-4 h-4" />
              </div>
            </div>

            {/* Screen Footer */}
            <div className="w-full flex flex-col gap-1 items-center">
              <div className="text-[9px] font-display tracking-[0.2em] text-[#071F3D] font-bold">
                GUARDIAN WORKS
              </div>
              <div className="text-[6px] font-mono text-slate-500 tracking-wider">
                STATUS // ACTIVE_SHIELD
              </div>
            </div>

            {/* Glossy Reflection Highlight diagonal overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none skew-x-12 translate-x-10"
              style={{ mixBlendMode: "overlay" }}
            />
          </div>
        </div>

        {/* 3. Left Widget (Dashboard Card) */}
        <div
          className="absolute left-3 top-6 bg-gradient-to-br from-[#0B3B73] to-[#1E6EB6] border border-[#4DA6E8]/30 rounded-xl p-2 sm:p-3 flex items-center gap-2 sm:gap-3 w-24 sm:w-28 md:w-32 shadow-[0_10px_25px_rgba(11,59,115,0.4)] animate-loop-left-widget"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Animated Donut chart */}
          <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="3.5"
              />
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                stroke="#4DA6E8"
                strokeWidth="3.5"
                className="animate-loop-donut-fill"
                strokeDasharray="100"
                strokeDashoffset="35"
              />
            </svg>
            <div className="absolute text-[7px] text-white font-mono font-bold">98%</div>
          </div>

          {/* Details lines */}
          <div className="flex flex-col gap-1.5 w-full">
            <div className="h-1.5 w-2/3 bg-white/20 rounded-full" />
            <div className="h-1.5 w-full bg-white/10 rounded-full" />
            <div className="h-1 w-1/2 bg-[#4DA6E8]/40 rounded-full" />
          </div>
        </div>

        {/* 4. Right Widget (Security Card) */}
        <div
          className="absolute right-3 bottom-10 bg-gradient-to-br from-[#3FA652] to-[#2E7D32] border border-[#79C76A]/40 rounded-xl p-2 sm:p-3 flex items-center gap-2 sm:gap-3 w-24 sm:w-28 md:w-32 shadow-[0_10px_25px_rgba(63,166,82,0.35)] animate-loop-right-widget"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Glowing Shield badge icon */}
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0 shadow-inner">
            <Shield className="w-4 h-4 fill-white/20" />
          </div>

          {/* Security details lines */}
          <div className="flex flex-col gap-1.5 w-full">
            <div className="h-1.5 w-1/2 bg-white/40 rounded-full" />
            <div className="h-1.5 w-4/5 bg-white/20 rounded-full" />
            <div className="h-1 w-2/3 bg-white/15 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
