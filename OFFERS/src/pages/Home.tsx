import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Clock,
  Award,
  CheckCircle2,
  ArrowRight,
  Building2,
  Settings,
  DollarSign,
  Shield,
  Zap,
  Heart,
  Globe,
  Store,
  Home as HomeIcon,
  HardHat,
  Activity,
  Utensils,
  Truck,
  Briefcase,
  Calendar,
  Users,
  ShoppingBag,
} from "lucide-react";
import { Layout } from "@/components/site/Layout";
import HeroAnimation from "@/components/site/HeroAnimation";
import { AnimatedCounter } from "@/components/site/AnimatedCounter";
import { BorderGlow } from "@/components/site/BorderGlow";
import { AnimatedContent } from "@/components/site/AnimatedContent";
import { TrailBorder } from "@/components/site/TrailBorder";
import { ConicBorderCard } from "@/components/site/ConicBorderCard";
import { ImageShadowCard } from "@/components/site/ImageShadowCard";
import { CoolBeansButton } from "@/components/site/CoolBeansButton";
import heroImg from "@/assets/hero-security.jpg";
import controlRoom from "@/assets/control-room.jpg";

const WHY_CHOOSE_US = [
  { icon: Users, title: "Fully Trained Staff", desc: "Fully trained and vetted personnel adhering to standard safety guidelines." },
  { icon: Settings, title: "Tailored Solutions", desc: "We customize every facilities and security package to suit your specific operational needs." },
  { icon: DollarSign, title: "Competitive Pricing", desc: "Cost-effective service solutions designed to deliver value with minimal disruption." },
  { icon: Award, title: "Professional Service", desc: "We pride ourselves on delivering dependable, high-quality services backed by experienced professionals." },
  { icon: Clock, title: "24/7 Support", desc: "Round-the-clock operational assistance whenever your business requires support." },
  { icon: Shield, title: "Health & Safety Focus", desc: "Strict adherence to compliance, risk assessments, and health & safety standards." },
  { icon: Zap, title: "Rapid Response", desc: "Quick deployment and response capability when urgent staffing or security cover is needed." },
  { icon: Heart, title: "Customer First", desc: "Our focus is customer satisfaction and maintaining clear, open communication channels." },
  { icon: Globe, title: "Nationwide Coverage", desc: "Reliable support and coverage across the country where your operations need it." },
];

const INDUSTRIES = [
  { icon: Building2, title: "Commercial Offices" },
  { icon: Store, title: "Retail Parks" },
  { icon: ShoppingBag, title: "Shopping Centres" },
  { icon: HomeIcon, title: "Residential Developments" },
  { icon: HardHat, title: "Construction Sites" },
  { icon: Activity, title: "Healthcare Facilities" },
  { icon: Utensils, title: "Hospitality & Leisure" },
  { icon: Truck, title: "Warehouses & Distribution" },
  { icon: Briefcase, title: "Corporate Businesses" },
  { icon: Calendar, title: "Event Organisers" },
];

import { useQuoteModal } from "@/context/QuoteModalContext";

export default function Home() {
  const { openQuoteModal } = useQuoteModal();

  useEffect(() => {
    document.title = "Guardian Works Group Limited | Security, Facilities Management & Commercial Cleaning";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Guardian Works Group Limited provides professional facilities management, commercial cleaning, security services, temporary recruitment, fire marshal support, concierge security, retail security, and event security across the UK.");
    }
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-ink text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Guardian Works Group facilities and security support"
            width={1600}
            height={1008}
            className="w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        </div>
        <div
          className="absolute top-0 left-0 w-[35%] aspect-square bg-primary"
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
        />
        <div className="relative container-x pt-28 pb-16 md:pt-36 md:pb-20 lg:pt-40 lg:pb-24 z-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 xl:col-span-6 text-left">
              <AnimatedContent
                distance={40}
                direction="vertical"
                reverse={false}
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity
                scale={1}
                threshold={0.1}
                delay={0}
              >
                <div className="eyebrow mb-4 text-[#79C76A] font-extrabold tracking-widest">Guardian Works Group Limited</div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl leading-[1.1] mb-6 uppercase font-black font-display">
                  Protecting People. Supporting Businesses. Delivering <span className="bg-gradient-to-r from-[#1E6EB6] via-[#3B82F6] to-[#4DA6E8] bg-clip-text text-transparent">Excellence</span>.
                </h1>
                <p className="text-white/85 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
                  At Guardian Works Group Limited, we provide professional facilities management, security, cleaning, and workforce solutions to businesses across a wide range of industries. Our commitment to quality, reliability, and customer satisfaction ensures that every client receives a tailored service designed to meet their operational needs.
                </p>
                <div className="flex flex-wrap gap-4">
                  <CoolBeansButton variant="green" onClick={() => openQuoteModal()}>
                    Request a Free Quote <ArrowRight className="w-4 h-4" />
                  </CoolBeansButton>
                  <CoolBeansButton variant="blue" as={Link} to="/services">
                    Explore Services
                  </CoolBeansButton>
                </div>
              </AnimatedContent>
            </div>

            {/* Right Isometric 3D Animation Column */}
            <div className="lg:col-span-5 xl:col-span-6 flex justify-center items-center h-[300px] sm:h-[360px] lg:h-[400px] relative">
              <HeroAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* Counters Bar (Stats Section) */}
      <section className="py-20 bg-ink border-t border-b border-white/10 text-white">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { n: "500+", l: "Projects Completed" },
            { n: "150+", l: "Professional Staff" },
            { n: "98%", l: "Client Satisfaction" },
            { n: "24/7", l: "Support Available" },
          ].map((s) => (
            <div key={s.l} className="text-center group">
              <div className="font-display text-5xl md:text-6xl font-bold text-[#1E6EB6] transition-transform duration-300 group-hover:scale-105">
                <AnimatedCounter value={s.n} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-white/60 font-semibold">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Welcome / About */}
      <section className="py-24 relative overflow-hidden bg-background">
        {/* Floating animated shapes */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-primary/5 rounded-full filter blur-xl animate-pulse duration-[4000ms] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary-glow/5 rounded-full filter blur-xl animate-pulse duration-[6000ms] pointer-events-none" />

        <div className="container-x grid lg:grid-cols-2 gap-16 items-center">

          <div className="relative">
            <ImageShadowCard src="/HOME.png" alt="Guardian Works Group facilities and security support" />
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-[#0B3B73] text-white p-8 max-w-xs shadow-2xl rounded-2xl border border-white/20 z-30">
              <div className="font-display text-5xl font-extrabold text-[#4DA6E8]">100%</div>
              <div className="text-xs uppercase tracking-widest mt-2 font-bold text-slate-100">Reliable Operational Delivery</div>
            </div>
          </div>
          <div>
            <div className="eyebrow mb-4">About Guardian Works</div>
            <h2 className="text-4xl md:text-5xl mb-6 font-bold uppercase text-foreground">Creating safe, secure, and well-maintained environments</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Guardian Works Group offers comprehensive Facilities Management, commercial cleaning, security personnel, and temporary staffing solutions designed to meet your business requirements. We manage the day-to-day services that allow your organisation to focus on its core business.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We pride ourselves on delivering dependable, high-quality services backed by experienced professionals. Our commitment to quality, reliability, and customer satisfaction ensures that every client receives a tailored service designed to meet their operational needs with minimal disruption.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-sm bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg mb-1 font-bold text-foreground">Fully Vetted Staff</h4>
                  <p className="text-sm text-muted-foreground">Every candidate is screened & vetted.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-sm bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg mb-1 font-bold text-foreground">24/7 Response</h4>
                  <p className="text-sm text-muted-foreground">Round-the-clock operational support.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-secondary" id="why-choose-us">
        <div className="container-x">
          <div className="max-w-2xl mb-14">
            <div className="eyebrow mb-4">Why Guardian Works</div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase text-foreground">Why Choose Guardian Works Group?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((f) => (
              <BorderGlow
                key={f.title}
                backgroundColor="#0B3B73"
                borderRadius={16}
                glowRadius={40}
                glowIntensity={1}
                colors={["#1E6EB6", "#4DA6E8", "#3FA652"]}
              >
                <div className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-white/10 text-[#4DA6E8] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#1E6EB6] group-hover:text-white transition-all duration-300">
                      <f.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl mb-3 font-bold uppercase text-white font-display tracking-wider">{f.title}</h3>
                    <p className="text-slate-200 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </BorderGlow>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-24 bg-background" id="industries">
        <div className="container-x">
          <div className="max-w-2xl mb-14">
            <div className="eyebrow mb-4">Sectors</div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase text-foreground">Industries We Serve</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {INDUSTRIES.map((ind) => (
              <ConicBorderCard key={ind.title} borderRadius={16} className="h-full">
                <div className="p-6 text-center group flex flex-col items-center justify-center min-h-[160px] h-full">
                  <div className="w-10 h-10 rounded-full bg-white/10 text-[#4DA6E8] flex items-center justify-center mb-4 group-hover:bg-[#1E6EB6] group-hover:text-white transition-colors duration-300">
                    <ind.icon className="w-5 h-5" />
                  </div>
                  <div className="font-display text-sm font-bold uppercase tracking-wider text-white leading-tight">{ind.title}</div>
                </div>
              </ConicBorderCard>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-28 bg-ink text-white overflow-hidden text-center">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, white 0%, transparent 60%)" }} />
        <div className="relative container-x max-w-4xl">
          <div className="eyebrow justify-center mb-6 !text-[#3FA652] font-bold">Our Mission</div>
          <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight uppercase">
            To provide reliable, professional, and cost-effective solutions that enable our clients to operate safely, efficiently, and with complete confidence.
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#1E6EB6] to-[#3FA652] mx-auto rounded-full" />
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 0%, transparent 40%)" }} />
        <div className="relative container-x flex flex-wrap items-center justify-between gap-8">
          <div>
            <div className="text-sm uppercase tracking-widest opacity-80 mb-3 font-semibold">Get In Touch</div>
            <h2 className="text-4xl md:text-5xl max-w-2xl font-bold uppercase">Need Professional Business Support?</h2>
            <p className="mt-4 opacity-90 max-w-xl text-sm leading-relaxed">
              Contact us today to discuss your requirements and discover how we can support your business with dependable, professional services tailored to your needs.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <CoolBeansButton variant="green" onClick={() => openQuoteModal()}>
              Get a Quote <ArrowRight className="w-4 h-4" />
            </CoolBeansButton>
            <CoolBeansButton variant="white" as={Link} to="/contact">
              Contact Us
            </CoolBeansButton>
          </div>
        </div>
      </section>
    </Layout>
  );
}
