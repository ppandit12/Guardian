import { useEffect } from "react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { GraduationCap, ExternalLink, ShieldCheck, BookOpen, FileText } from "lucide-react";
import teamImg from "@/assets/about-team.jpg";

const LINKS = [
  {
    title: "Security Industry Authority (SIA)",
    desc: "The official UK government regulator of the private security industry. Find licencing rules, standards, and approved contractor directories.",
    url: "https://www.gov.uk/government/organisations/security-industry-authority",
  },
  {
    title: "ProtectUK Police Portal",
    desc: "National security platform providing counter-terrorism advice, training resources, and threat intelligence to security professionals.",
    url: "https://www.protectuk.police.uk/",
  },
  {
    title: "HSQE Courses Portal",
    desc: "Curated learning platform offering health and safety, compliance, risk assessment, and fire marshalling training courses.",
    url: "https://hsqe.co.uk/courses/",
  },
];

export default function EmployerResources() {
  useEffect(() => {
    document.title = "Employer Resources — Guardian Works Group";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Explore Guardian Works Group's employer resources, including staff training programs, SIA guidelines, and professional facilities management and security courses.");
    }
  }, []);

  return (
    <Layout>
      <PageHero
        eyebrow="Employee Hub"
        title="Employer Resources"
        subtitle="Access official guidelines, police safety portals, compliance regulations, and curated training programs to support your professional growth."
      />

      {/* Main Intro Block */}
      <section className="py-24">
        <div className="container-x grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src="/Aboutus.jpg" alt="Guardian Works Group team in training" width={1200} height={900} loading="lazy" className="w-full rounded-sm shadow-xl" />
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-primary text-primary-foreground p-6 max-w-xs shadow-xl rounded-sm">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8" />
                <div className="font-display uppercase text-sm tracking-wider font-bold">100% Vetted Personnel</div>
              </div>
            </div>
          </div>
          <div>
            <div className="eyebrow mb-4">Our Commitment</div>
            <h2 className="text-4xl md:text-5xl mb-6">Equipping our team for excellence</h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              At Guardian Works Group Limited, we understand the importance of providing our employees with the necessary training and resources to excel in their roles. Our commitment to excellence extends to offering comprehensive training programs and courses to ensure our team members are equipped with the skills they need.
            </p>
            <div className="flex gap-4 p-5 bg-secondary border border-border rounded-sm">
              <div className="w-12 h-12 rounded-sm bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-display uppercase font-bold text-foreground">SIA Approved Standards</h4>
                <p className="text-sm text-muted-foreground mt-1">We enforce standard-aligned British Security training protocols across our entire guard roster.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid: Training Programs and Course Links */}
      <section className="py-24 bg-secondary">
        <div className="container-x grid md:grid-cols-2 gap-8">
          {/* Card 1: Training Programs */}
          <div className="bg-card p-10 border border-border flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-sm bg-primary text-primary-foreground flex items-center justify-center mb-6 shadow-md">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="text-3xl mb-4">Training Programs</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our training programs cover a range of topics such as customer service, emergency response, conflict resolution, and more. We believe in investing in our employees' development to enhance their performance and ensure they deliver exceptional service to our clients.
              </p>
            </div>
          </div>

          {/* Card 2: Course Info */}
          <div className="bg-card p-10 border border-border flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-sm bg-primary text-primary-foreground flex items-center justify-center mb-6 shadow-md">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-3xl mb-4">Professional Growth</h3>
              <p className="text-muted-foreground leading-relaxed">
                Explore our curated list of course links designed to enhance your skills and knowledge in the security industry. Whether you are interested in fire marshalling, event security, or mobile security patrol, we have resources available to support your professional growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Useful Links List */}
      <section className="py-24">
        <div className="container-x max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="eyebrow justify-center mb-4">Compliance Resources</div>
            <h2 className="text-4xl md:text-5xl">Useful Portal Directory</h2>
          </div>

          <div className="space-y-6">
            {LINKS.map((link, idx) => (
              <div key={idx} className="p-8 border border-border hover:border-primary transition-colors bg-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="max-w-xl">
                  <h4 className="text-xl font-display uppercase font-bold text-foreground">{link.title}</h4>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{link.desc}</p>
                </div>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline shrink-0 text-xs px-5 py-2.5 inline-flex items-center gap-2 hover:bg-primary text-primary hover:text-white"
                >
                  Visit Portal <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
