import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { GuardianWorksLogo } from "./GuardianWorksLogo";
import { submitToWeb3Forms } from "@/utils/web3forms";

export function SiteFooter() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubmitting(true);
    await submitToWeb3Forms({
      subject: `New Newsletter Subscription (${newsletterEmail})`,
      from_name: "Guardian Works Newsletter",
      name: "Newsletter Subscriber",
      email: newsletterEmail,
      message: `User subscribed to newsletter with email: ${newsletterEmail}`,
    });
    setSubmitting(false);
    setSubscribed(true);
    setNewsletterEmail("");
  };
  return (
    <footer className="bg-ink text-white/80 mt-12">
      <div className="container-x py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="bg-[#B0C4DE] p-2.5 px-4 rounded-lg inline-flex items-center mb-5 shadow-md border border-white/30">
            <GuardianWorksLogo variant="full-light" height={42} />
          </div>
          <p className="text-sm leading-relaxed">
            At Guardian Works Group Limited, we provide professional facilities management, security, cleaning, and workforce solutions.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#4DA6E8] transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#4DA6E8] transition-colors" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#4DA6E8] transition-colors" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#4DA6E8] transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white text-base mb-5 tracking-widest font-display uppercase font-bold">Company</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/about" className="hover:text-[#4DA6E8] transition-colors">About Us</Link></li>
            <li><Link to="/services" className="hover:text-[#4DA6E8] transition-colors">Services</Link></li>
            <li><Link to="/careers" className="hover:text-[#4DA6E8] transition-colors">Careers</Link></li>
            <li><Link to="/testimonials" className="hover:text-[#4DA6E8] transition-colors">Testimonials</Link></li>
            <li><Link to="/accreditations" className="hover:text-[#4DA6E8] transition-colors">Accreditations</Link></li>
            <li><Link to="/contact" className="hover:text-[#4DA6E8] transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-base mb-5 tracking-widest font-display uppercase font-bold">Services</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/services#facilities-management" className="hover:text-[#4DA6E8] transition-colors">Facilities Management</Link></li>
            <li><Link to="/services#retail-security" className="hover:text-[#4DA6E8] transition-colors">Retail Security</Link></li>
            <li><Link to="/services#concierge-security" className="hover:text-[#4DA6E8] transition-colors">Concierge Security</Link></li>
            <li><Link to="/services#event-security" className="hover:text-[#4DA6E8] transition-colors">Event Security</Link></li>
            <li><Link to="/services#fire-marshal-services" className="hover:text-[#4DA6E8] transition-colors">Fire Marshal Services</Link></li>
            <li><Link to="/services#temporary-recruitment" className="hover:text-[#4DA6E8] transition-colors">Temporary Recruitment</Link></li>
            <li><Link to="/services#commercial-cleaning" className="hover:text-[#4DA6E8] transition-colors">Commercial Cleaning</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-base mb-5 tracking-widest font-display uppercase font-bold">Newsletter</h4>
          <p className="text-sm mb-4 leading-relaxed">Subscribe to our newsletter for standard industry updates and news.</p>
          {subscribed ? (
            <p className="text-xs text-[#3FA652] font-semibold mb-6 bg-[#3FA652]/10 border border-[#3FA652]/30 p-2.5 rounded-sm">
              ✓ Thank you for subscribing!
            </p>
          ) : (
            <form className="flex gap-2 mb-6" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Email address"
                className="border border-white/20 bg-white/5 px-3 py-2 text-xs focus:outline-none focus:border-[#4DA6E8] text-white w-full rounded-sm"
                required
              />
              <button
                type="submit"
                disabled={submitting}
                className="bg-[#3FA652] hover:bg-[#2E7D32] text-white px-3.5 py-2 text-xs font-display uppercase tracking-widest font-bold transition-colors rounded-sm cursor-pointer shadow-md disabled:opacity-50"
              >
                {submitting ? "..." : "Join"}
              </button>
            </form>
          )}
          <h4 className="text-white text-sm mb-3 tracking-widest font-display uppercase font-bold">Contact Info</h4>
          <ul className="space-y-2.5 text-sm">
            <li className="flex gap-2"><Phone className="w-4 h-4 text-[#4DA6E8] shrink-0 mt-0.5" /> 020 8191 1817</li>
            <li className="flex gap-2"><Mail className="w-4 h-4 text-[#4DA6E8] shrink-0 mt-0.5" /> info@guardianworksgroup.co.uk</li>
            <li className="flex gap-2"><MapPin className="w-4 h-4 text-[#4DA6E8] shrink-0 mt-0.5" /> London, United Kingdom</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-6 text-xs flex flex-wrap justify-between items-center gap-4 opacity-70">
          <p>© {new Date().getFullYear()} Guardian Works Group Limited. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p>BS7858:2019 Standards Checked · Professional Vetted Staff</p>
            <span>·</span>
            <Link to="/admin" className="hover:text-white transition-colors text-white/50">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
