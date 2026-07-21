import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { ScrollReveal } from "@/components/site/ScrollReveal";
import { ShineBorderCard } from "@/components/site/ShineBorderCard";
import {
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const SERVICES = [
  {
    badge: "Facilities",
    title: "Facilities Management",
    desc: "Guardian Works Group offers comprehensive Facilities Management solutions, ensuring your workplace remains safe, compliant, and fully operational. We manage the day-to-day services that allow your organisation to focus on its core business.",
    checkmarks: ["Building Maintenance", "Planned Maintenance", "Reactive Maintenance", "Health & Safety", "Waste Management", "Grounds Maintenance", "Contractor Management"],
    glowColor: "rgba(30, 110, 182, 0.12)",
    hash: "facilities-management",
    image: "/services/facilities-management.png"
  },
  {
    badge: "Loss Prevention",
    title: "Retail Security",
    desc: "Retail environments require experienced security professionals who understand customer service while effectively reducing theft and anti-social behaviour. We work closely with store management to minimise losses.",
    checkmarks: ["Loss Prevention", "Shoplifting Deterrence", "CCTV Monitoring", "Customer Assistance", "Incident Reporting"],
    glowColor: "rgba(46, 125, 50, 0.12)",
    hash: "retail-security",
    image: "/services/retail-security.png"
  },
  {
    badge: "Concierge",
    title: "Concierge Security",
    desc: "Our Concierge Security Officers combine exceptional customer service with professional security expertise. We become the professional face of your building while maintaining the highest levels of security.",
    checkmarks: ["Reception", "Visitor Management", "CCTV", "Access Control", "Building Patrols"],
    glowColor: "rgba(121, 199, 106, 0.12)",
    hash: "concierge-security",
    image: "/services/concierge-security.png"
  },
  {
    badge: "Crowd Control",
    title: "Event Security",
    desc: "Guardian Works Group delivers professional event security for both public and private events of every size. Our experienced teams ensure your guests, staff, and venue remain safe throughout the event.",
    checkmarks: ["Crowd Management", "Access Control", "VIP Protection", "Ticket Verification", "Emergency Response"],
    glowColor: "rgba(30, 110, 182, 0.12)",
    hash: "event-security",
    image: "/services/event-security.png"
  },
  {
    badge: "Compliance",
    title: "Fire Marshal Services",
    desc: "Our trained Fire Marshals help organisations maintain fire safety standards and provide reassurance during events, construction projects, and occupied buildings. Every Fire Marshal is trained to respond calmly.",
    checkmarks: ["Fire Prevention", "Evacuation", "Safety Patrols", "Fire Point Inspection", "Incident Reporting"],
    glowColor: "rgba(11, 59, 115, 0.15)",
    hash: "fire-marshal-services",
    image: "/services/fire-marshal-services.jpg"
  },
  {
    badge: "Workforce",
    title: "Temporary Recruitment",
    desc: "Guardian Works Group supplies reliable temporary staff to businesses experiencing seasonal demand, staff shortages, or project-based requirements. We carefully recruit and screen candidates to ensure they possess the skills.",
    checkmarks: ["Security Personnel", "Cleaning Operatives", "Warehouse Staff", "Customer Service", "Event Staff", "Hospitality", "General Labour"],
    glowColor: "rgba(77, 166, 232, 0.12)",
    hash: "temporary-recruitment",
    image: "/services/temporary-recruitment.png"
  },
  {
    badge: "Hygiene",
    title: "Commercial Cleaning",
    desc: "Our experienced cleaning teams provide reliable commercial cleaning services for businesses of all sizes. Using industry-approved products and modern equipment, we maintain the highest standards of cleanliness and hygiene.",
    checkmarks: ["Office Cleaning", "Retail Cleaning", "Deep Cleaning", "Washroom Hygiene", "Scheduled Cleaning", "End of Tenancy"],
    glowColor: "rgba(63, 166, 82, 0.12)",
    hash: "commercial-cleaning",
    image: "/services/commercial-cleaning.png"
  }
];

export default function Services() {
  useEffect(() => {
    document.title = "Our Services — Guardian Works Group";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Facilities management, commercial cleaning, temporary recruitment, fire marshal, concierge, retail and event security services from Guardian Works Group.");
    }
  }, []);

  return (
    <Layout>
      <PageHero
        eyebrow="What We Do"
        title="Our Services"
        subtitle="Comprehensive facilities management, security, cleaning, and workforce solutions designed to meet your operational needs."
        bgImage="/HOME.png"
      />

      <section className="py-24 bg-secondary text-left overflow-visible">
        <div className="container-x">
          <div className="space-y-16" id="cards">
            {SERVICES.map((s, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={s.title}
                  className="card scroll-mt-32 md:scroll-mt-36"
                  id={s.hash}
                  style={{ "--index": idx + 1 } as React.CSSProperties}
                >
                  <ScrollReveal
                    invisibleClass={isEven ? "opacity-0 translate-y-16 scale-[0.96] rotate-3" : "opacity-0 translate-y-16 scale-[0.96] -rotate-3"}
                    visibleClass="opacity-100"
                  >
                    <ShineBorderCard borderRadius={28}>
                      <div
                        className="card__content group bg-[#071F3D] hover:bg-[#0B3B73]/90 transition-all duration-500 rounded-[26px] p-8 md:p-10 shadow-2xl relative overflow-hidden"
                        style={{
                          backgroundImage: `radial-gradient(circle at ${
                            isEven ? "90% 90%" : "10% 90%"
                          }, ${s.glowColor} 0%, transparent 60%), linear-gradient(135deg, rgb(7, 31, 61) 0%, rgb(11, 59, 115) 100%)`,
                        }}
                      >
                        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                          {/* Left Column (Content) */}
                          <div className={`lg:col-span-7 text-left ${isEven ? "lg:order-3" : "lg:order-1"}`}>
                            <span className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/15 uppercase tracking-widest text-[#4DA6E8] inline-block mb-4 font-bold">
                              {s.badge}
                            </span>
                            <h3 className="text-3xl md:text-4xl text-white font-extrabold mb-4 font-display uppercase tracking-wider">
                              {s.title}
                            </h3>
                            <p className="text-slate-200 text-sm md:text-base leading-relaxed mb-6">
                              {s.desc}
                            </p>
                            <ul className="grid sm:grid-cols-2 gap-y-3.5 gap-x-6 text-sm text-slate-300 mb-8 max-w-lg font-semibold">
                              {s.checkmarks.map((chk) => (
                                <li key={chk} className="flex items-center gap-2.5">
                                  <CheckCircle2 className="w-4 h-4 text-[#3FA652] shrink-0" />
                                  <span>{chk}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="flex">
                              <Link to="/contact" className="btn-outline shrink-0 text-xs px-6 py-3 text-white border-white/20 hover:bg-[#3FA652] hover:text-white hover:border-[#3FA652] inline-flex items-center gap-2 rounded-full font-bold transition-all shadow-md">
                                Enquire now <ArrowRight className="w-4 h-4" />
                              </Link>
                            </div>
                          </div>

                          {/* Center Column (Index Separator) */}
                          <div className="hidden lg:flex flex-col items-center justify-center lg:col-span-1 relative self-stretch lg:order-2">
                            <div className="absolute top-0 bottom-0 w-px border-l border-dashed border-white/10" />
                            <div className="w-10 h-14 rounded-2xl bg-[#0B3B73] border border-white/10 text-white flex flex-col items-center justify-center font-display font-bold text-sm shadow-xl z-10">
                              <span>0{idx + 1}</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-[#3FA652] mt-1 animate-ping" />
                            </div>
                          </div>

                          {/* Right Column (Service Related Image) */}
                          <div className={`lg:col-span-4 flex justify-center items-center ${isEven ? "lg:order-1" : "lg:order-3"}`}>
                            <div className="relative w-full max-w-[340px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 shadow-2xl group/img">
                              <img
                                src={s.image}
                                alt={s.title}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#071F3D]/80 via-transparent to-transparent pointer-events-none" />
                              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center bg-[#071F3D]/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
                                <span className="text-[11px] font-display uppercase tracking-wider text-white font-bold">{s.title}</span>
                                <span className="w-2 h-2 rounded-full bg-[#3FA652] animate-pulse" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ShineBorderCard>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
