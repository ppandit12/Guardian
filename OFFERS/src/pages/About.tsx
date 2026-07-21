import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { CheckCircle2, Target, Eye, Heart, ArrowRight } from "lucide-react";
import { StarBorder } from "@/components/site/StarBorder";
import { ConicBorderCard } from "@/components/site/ConicBorderCard";
import { ImageShadowCard } from "@/components/site/ImageShadowCard";
import teamImg from "@/assets/about-team.jpg";

export default function About() {
  useEffect(() => {
    document.title = "About Us — Guardian Works Group";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Learn about Guardian Works Group Limited, providing facilities management, security, cleaning, and workforce solutions across the UK.");
    }
  }, []);

  return (
    <Layout>
      <PageHero eyebrow="Who We Are" title="About Us" subtitle="At Guardian Works Group Limited, we provide professional facilities management, security, cleaning, and workforce solutions." bgImage="/Aboutus.jpg" />

      <section className="py-24">
        <div className="container-x grid lg:grid-cols-2 gap-16 items-center">
          <ImageShadowCard src="/Aboutus.jpg" alt="Guardian Works Group team" />
          <div>
            <div className="eyebrow mb-4">Our Story</div>
            <h2 className="text-4xl md:text-5xl mb-6">Protecting People. Supporting Businesses. Delivering Excellence.</h2>
            <p className="text-muted-foreground text-lg mb-4 leading-relaxed font-semibold">
              At Guardian Works Group Limited, our commitment to quality, reliability, and customer satisfaction ensures that every client receives a tailored service designed to meet their operational needs. We pride ourselves on delivering dependable, high-quality services backed by experienced professionals.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Whether you require highly trained security personnel, dependable cleaning services, or temporary staffing solutions, Guardian Works Group is your trusted partner for creating safe, secure, and well-maintained environments.
            </p>
            <ul className="space-y-3 font-semibold">
              {[
                "Fully trained and vetted personnel",
                "24/7 operational support & rapid response",
                "Health & Safety compliance support",
                "Tailored solutions with minimal disruption",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <span className="text-muted-foreground">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary">
        <div className="container-x grid md:grid-cols-3 gap-6">
          {[
            { icon: Target, title: "Our Mission", desc: "To provide reliable, professional, and cost-effective facilities management, security, cleaning, and staffing solutions that enable our clients to operate safely, efficiently, and with complete confidence." },
            { icon: Eye, title: "Our Vision", desc: "To build long-lasting partnerships through trust, professionalism, and exceptional service delivery." },
            { icon: Heart, title: "Our Values", desc: "Quality. Reliability. Customer Satisfaction. We ensure that every client receives a tailored service designed to meet their operational needs." },
          ].map((v) => (
            <ConicBorderCard
              key={v.title}
              borderRadius={20}
              className="h-full"
            >
              <div className="p-10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-xl bg-white/10 text-[#4DA6E8] flex items-center justify-center mb-6">
                    <v.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl mb-3 font-bold uppercase text-white font-display tracking-wider">{v.title}</h3>
                  <p className="text-slate-200 leading-relaxed text-sm">{v.desc}</p>
                </div>
              </div>
            </ConicBorderCard>
          ))}
        </div>
      </section>

      <section className="py-20 bg-ink text-white">
        <div className="container-x flex flex-wrap items-center justify-between gap-8">
          <h2 className="text-3xl md:text-4xl max-w-2xl font-bold uppercase">Ready to work with a trusted partner you can rely on?</h2>
          <Link to="/contact" className="btn-primary">Get in touch <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>
    </Layout>
  );
}
