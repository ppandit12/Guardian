import { Link } from "react-router-dom";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  bgImage?: string;
}

export function PageHero({ eyebrow, title, subtitle, bgImage }: PageHeroProps) {
  return (
    <section className="relative bg-ink text-white overflow-hidden min-h-[380px]">
      {/* Background Image with Rich Dark Blue Gradient Overlay */}
      {bgImage && (
        <>
          <img
            src={bgImage}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover object-center z-0 scale-105 transform filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071F3D]/95 via-[#0B3B73]/85 to-[#071F3D]/90 z-0" />
        </>
      )}

      {/* Radial Glow & Accent Geometry */}
      <div
        className="absolute inset-0 opacity-30 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #0B3B73 0%, transparent 60%), radial-gradient(circle at 80% 80%, #1E6EB6 0%, transparent 60%)",
        }}
      />
      <div className="absolute top-0 left-0 w-[40%] aspect-square bg-primary/80 clip-triangle z-0" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />

      <div className="relative z-10 container-x max-w-4xl pt-36 pb-24 md:pt-44 md:pb-32">
        {eyebrow && <div className="eyebrow mb-6 text-[#79C76A] font-extrabold tracking-widest">{eyebrow}</div>}
        <h1 className="text-5xl md:text-7xl max-w-4xl uppercase font-black font-display text-white">{title}</h1>
        {subtitle && <p className="mt-6 text-white/90 max-w-2xl text-lg leading-relaxed font-medium">{subtitle}</p>}
        <nav className="mt-8 flex items-center gap-2 text-sm text-white/70 font-display uppercase tracking-widest font-semibold">
          <Link to="/" className="hover:text-[#3FA652] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white font-bold">{title}</span>
        </nav>
      </div>
    </section>
  );
}

export default PageHero;
