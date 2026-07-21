import { useEffect } from "react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { BadgeCheck, ShieldCheck, FileCheck, Building2, UserCheck } from "lucide-react";

const ITEMS = [
  { icon: ShieldCheck, title: "Vetted Contractor", desc: "Recognised for meeting standard operational quality and safety benchmarks." },
  { icon: BadgeCheck, title: "BS7858:2019 Vetting", desc: "Every officer and staff screened to the British Standard for personnel vetting — no exceptions." },
  { icon: FileCheck, title: "ISO 9001", desc: "Certified quality management systems ensuring consistent service delivery." },
  { icon: UserCheck, title: "SIA Licensed & Trained Officers", desc: "All security personnel are fully SIA licensed, professionally trained, and vetted to industry standards." },
  { icon: Building2, title: "Safe Contractor", desc: "Approved contractor status for health, safety and compliance on client sites." },
];

export default function Accreditations() {
  useEffect(() => {
    document.title = "Accreditations — Guardian Works Group";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Guardian Works Group Limited holds BS7858:2019 vetting, ISO certifications, and operates to the highest standard of facilities management compliance.");
    }
  }, []);

  return (
    <Layout>
      <PageHero eyebrow="Standards" title="Accreditations" subtitle="Independent verification that our systems, people and processes meet the industry's highest benchmarks." />

      <section className="py-24">
        <div className="container-x grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((i) => (
            <div key={i.title} className="p-8 border border-border bg-card hover:border-primary transition-colors rounded-sm">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                <i.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl mb-2 font-bold uppercase text-foreground">{i.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{i.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container-x text-center max-w-3xl mx-auto">
          <div className="eyebrow justify-center mb-4">Compliance & Insurance</div>
          <h2 className="text-3xl md:text-4xl mb-4 font-bold uppercase text-foreground">Fully insured, fully compliant</h2>
          <p className="text-muted-foreground leading-relaxed text-sm">
            Guardian Works Group Limited carries £10m public liability and £10m employer's liability insurance. All contracts are GDPR-compliant with data protection controls audited annually.
          </p>
        </div>
      </section>
    </Layout>
  );
}
