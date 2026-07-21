import React, { useState } from "react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Phone, Mail, MapPin, Clock, Send, Linkedin, Twitter, Facebook, Instagram, CheckCircle2 } from "lucide-react";
import { saveInquiry } from "@/utils/inquiryStore";
import { submitToWeb3Forms } from "@/utils/web3forms";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "Facilities Management",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await saveInquiry({
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      service: formData.service,
      message: formData.message,
    });

    await submitToWeb3Forms({
      subject: `New Contact Enquiry - ${formData.service} (${formData.name})`,
      from_name: "Guardian Works Contact Form",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company || "N/A",
      service: formData.service,
      message: formData.message,
    });

    setLoading(false);
    setSent(true);
  };

  return (
    <Layout>
      <PageHero eyebrow="Get In Touch" title="Contact Us" subtitle="Tell us about your site or event and we'll be back to you within 24 hours with a tailored proposal." />

      <section className="py-24">
        <div className="container-x grid lg:grid-cols-5 gap-12">
          {/* Form Column (Left Side) */}
          <form
            className="lg:col-span-3 bg-card border border-border p-8 md:p-10 space-y-5 rounded-sm shadow-sm"
            onSubmit={handleSubmit}
          >
            {sent ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#3FA652] mx-auto" />
                <h3 className="text-2xl font-bold uppercase text-foreground">Enquiry Received</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  Thank you! Your enquiry has been submitted. Our operations manager will contact you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="btn-primary mt-4 cursor-pointer"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-5">
                  <label className="block">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Name *</span>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-2 w-full border border-border px-4 py-3 focus:border-primary focus:outline-none bg-background rounded-sm text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Email *</span>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2 w-full border border-border px-4 py-3 focus:border-primary focus:outline-none bg-background rounded-sm text-sm"
                    />
                  </label>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <label className="block">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Phone *</span>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-2 w-full border border-border px-4 py-3 focus:border-primary focus:outline-none bg-background rounded-sm text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Company</span>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="mt-2 w-full border border-border px-4 py-3 focus:border-primary focus:outline-none bg-background rounded-sm text-sm"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Service required</span>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="mt-2 w-full border border-border px-4 py-3 focus:border-primary focus:outline-none bg-[#071F3D] text-white rounded-sm text-sm"
                  >
                    <option className="bg-[#071F3D] text-white">Facilities Management</option>
                    <option className="bg-[#071F3D] text-white">Commercial Cleaning</option>
                    <option className="bg-[#071F3D] text-white">Temporary Recruitment</option>
                    <option className="bg-[#071F3D] text-white">Fire Marshal Services</option>
                    <option className="bg-[#071F3D] text-white">Concierge Security</option>
                    <option className="bg-[#071F3D] text-white">Retail Security</option>
                    <option className="bg-[#071F3D] text-white">Event Security</option>
                    <option className="bg-[#071F3D] text-white">Other</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Tell us about your requirements *</span>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-2 w-full border border-border px-4 py-3 focus:border-primary focus:outline-none bg-background rounded-sm text-sm"
                  />
                </label>
                <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto cursor-pointer disabled:opacity-50">
                  {loading ? "Sending enquiry..." : "Send enquiry"} <Send className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Social Media Links Below Send Enquiry */}
            <div className="pt-6 border-t border-border mt-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-semibold">Follow Us</div>
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-sm bg-secondary text-foreground hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </form>

          {/* Details & Location Column (Right Side) */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="text-3xl font-bold uppercase text-foreground">Speak to our team</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Our team is available round-the-clock. Call us for urgent support, or use the form for a tailored service proposal.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Phone, label: "Operational Support", value: "020 8191 1817", href: "tel:02081911817" },
                { icon: Mail, label: "Email", value: "info@guardianworksgroup.co.uk", href: "mailto:info@guardianworksgroup.co.uk" },
                { icon: MapPin, label: "Head Office", value: "London, United Kingdom" },
                { icon: Clock, label: "Office Hours", value: "Monday - Sunday: 24 Hours / 365 Days" },
              ].map((c) => (
                <div key={c.label} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-sm bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                    <c.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1 font-semibold">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="text-lg font-display font-bold text-foreground hover:text-primary transition-colors">{c.value}</a>
                    ) : (
                      <div className="text-lg font-display font-bold text-foreground">{c.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Google Maps Placeholder / Location Bar */}
            <div className="pt-4">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-semibold">Our Location</div>
              <div className="w-full h-64 bg-secondary border border-border flex flex-col items-center justify-center relative overflow-hidden group rounded-sm shadow-inner">
                <MapPin className="w-8 h-8 text-primary group-hover:scale-110 transition-transform mb-2 duration-300" />
                <span className="font-display uppercase text-xs tracking-wider text-foreground font-bold">Google Maps Placeholder</span>
                <span className="text-[10px] text-muted-foreground mt-1">London, United Kingdom</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
