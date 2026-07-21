import { useEffect } from "react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Quote, Star } from "lucide-react";

const REVIEWS = [
  { name: "Sarah Whitfield", role: "Facilities Manager, Central London office", quote: "Guardian Works Group took over our facilities coordination and the difference in professionalism is night and day. Their team knows our building, our team and our visitors by name." },
  { name: "James O'Connor", role: "Event Director, Live at the Park", quote: "Twelve events, zero incidents. Their event security and crowd management planning was thorough and the on-the-night team was calm, visible and impossible to fault." },
  { name: "Priya Shah", role: "Site Manager, Riverside Office Development", quote: "Reliable is the word. Our scheduled commercial cleaning is on time every visit and the site maintenance coordination is handled without fail." },
  { name: "Michael Grant", role: "Retail Operations, Central London", quote: "Switching to Guardian Works Group cut our facilities and cleaning spend by 18% and we get better coverage. Their operational support is genuinely 24/7." },
  { name: "Alicia Bennett", role: "Head of HR, Financial Services", quote: "The temporary recruitment and vetting standard for their staff is exactly what we need in our sector. Every placement has been professional, presentable and well briefed." },
  { name: "David Kim", role: "Venue Owner, Shoreditch", quote: "Concierge security who actually understand hospitality and visitor management. Firm when they need to be, welcoming when they don't. Our regulars love them." },
];

export default function Testimonials() {
  useEffect(() => {
    document.title = "Client Testimonials — Guardian Works Group";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "What clients say about working with Guardian Works Group Limited facilities management and security services across the UK.");
    }
  }, []);

  return (
    <Layout>
      <PageHero eyebrow="Client Voices" title="Testimonials" subtitle="Feedback from the clients we've worked with — offices, events, retailers, construction sites and venues across the UK." />

      <section className="py-24">
        <div className="container-x grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="bg-card border border-border p-8 flex flex-col hover:border-primary transition-colors rounded-sm">
              <Quote className="w-10 h-10 text-primary/20 mb-4" />
              <blockquote className="text-foreground leading-relaxed mb-6 flex-1">"{r.quote}"</blockquote>
              <div className="flex text-[#3FA652] mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <figcaption>
                <div className="font-display text-lg font-bold text-foreground">{r.name}</div>
                <div className="text-sm text-muted-foreground">{r.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </Layout>
  );
}
