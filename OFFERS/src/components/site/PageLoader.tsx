interface PageLoaderProps {
  fadingOut: boolean;
}

export function PageLoader({ fadingOut }: PageLoaderProps) {
  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#071F3D] transition-opacity duration-500 ${
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <img
        src="/LOGO2.png"
        alt="Guardian Works Group"
        className="w-64 max-w-[70vw] h-auto object-contain mb-8 animate-pulse"
      />
      <div className="w-10 h-10 border-4 border-[#3FA652]/25 border-t-[#3FA652] rounded-full animate-spin" />
      <p className="mt-6 text-xs uppercase tracking-[0.3em] text-slate-300 font-semibold">
        Guardian Works Group
      </p>
    </div>
  );
}
