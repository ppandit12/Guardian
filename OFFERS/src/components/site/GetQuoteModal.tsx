import { useState, useEffect } from "react";
import { X, Send, CheckCircle2, ShieldCheck, Phone, Mail, FileText } from "lucide-react";
import { GuardianWorksLogo } from "./GuardianWorksLogo";
import { saveInquiry, type Inquiry } from "@/utils/inquiryStore";
import { submitToWeb3Forms } from "@/utils/web3forms";

interface GetQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export function GetQuoteModal({ isOpen, onClose, defaultService = "Facilities Management" }: GetQuoteModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    service: defaultService,
    location: "",
    message: "",
  });

  const [submittedInquiry, setSubmittedInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (defaultService) {
      setFormData((prev) => ({ ...prev, service: defaultService }));
    }
  }, [defaultService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Save inquiry to backend data store
    const saved = await saveInquiry({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      service: formData.service,
      location: formData.location,
      message: formData.message,
    });

    const fullQuoteMessage = `
========================================
NEW QUOTE REQUEST
========================================
Customer Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company || "N/A"}
Service Required: ${formData.service}
Site Location: ${formData.location || "N/A"}
----------------------------------------
REQUIREMENTS / MESSAGE:
${formData.message}
========================================
`;

    // Send direct email via Web3Forms
    await submitToWeb3Forms({
      subject: `New Quote Request - ${formData.service} (${formData.fullName})`,
      from_name: "Guardian Works Quote Request",
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company || "N/A",
      service: formData.service,
      location: formData.location || "N/A",
      message: fullQuoteMessage,
    });

    setLoading(false);
    setSubmittedInquiry(saved);
  };

  const handleReset = () => {
    setSubmittedInquiry(null);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      service: defaultService,
      location: "",
      message: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Glassmorphic Backdrop */}
      <div
        className="fixed inset-0 bg-[#071F3D]/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#071F3D] border border-[#1E6EB6]/40 rounded-xl shadow-2xl overflow-hidden z-10 text-white my-8 animate-in zoom-in-95 duration-300">
        {/* Header Bar */}
        <div className="bg-[#0B3B73] px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="bg-[#B0C4DE] p-1.5 px-3 rounded-lg inline-flex items-center shadow-md">
            <GuardianWorksLogo variant="full-light" height={32} />
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {submittedInquiry ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#3FA652]/20 text-[#3FA652] flex items-center justify-center mx-auto border border-[#3FA652]/40">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-wide text-white">Quote Request Received</h3>

              <div className="inline-block bg-[#1E6EB6]/20 border border-[#1E6EB6]/50 px-4 py-1.5 rounded-full text-xs font-mono text-[#4DA6E8]">
                Reference ID: <strong>{submittedInquiry.id}</strong>
              </div>

              <p className="text-white/80 text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-[#3FA652] font-semibold">{submittedInquiry.fullName}</span>. Your quote request for{" "}
                <span className="text-[#4DA6E8] font-semibold">{submittedInquiry.service}</span> has been stored in our backend database. Our team will review your requirements and get in touch shortly.
              </p>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex items-center gap-2 text-white/90">
                  <Phone className="w-4 h-4 text-[#3FA652]" /> <span>Urgent Helpline: <strong>020 8191 1817</strong></span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <Mail className="w-4 h-4 text-[#4DA6E8]" /> <span>Email Support: <strong>info@guardianworksgroup.co.uk</strong></span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="bg-[#3FA652] hover:bg-[#2E7D32] text-white px-8 py-3 font-display uppercase tracking-widest text-xs font-bold rounded-sm transition-colors cursor-pointer mt-4"
              >
                Close Window
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="text-xs uppercase tracking-widest text-[#3FA652] font-bold mb-1 font-display">Instant Submission</div>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-white font-display">Request a Free Quote</h2>
                <p className="text-white/70 text-xs sm:text-sm mt-1">
                  Fill out the details below. Your quote inquiry will be saved directly into our system database.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-white/80 font-bold mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. John Smith"
                      className="w-full bg-white/5 border border-white/20 focus:border-[#3FA652] focus:bg-white/10 px-4 py-2.5 rounded-sm text-sm text-white focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-white/80 font-bold mb-1">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@company.co.uk"
                      className="w-full bg-white/5 border border-white/20 focus:border-[#3FA652] focus:bg-white/10 px-4 py-2.5 rounded-sm text-sm text-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-white/80 font-bold mb-1">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 07123 456789"
                      className="w-full bg-white/5 border border-white/20 focus:border-[#3FA652] focus:bg-white/10 px-4 py-2.5 rounded-sm text-sm text-white focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-white/80 font-bold mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Acme Corp Ltd"
                      className="w-full bg-white/5 border border-white/20 focus:border-[#3FA652] focus:bg-white/10 px-4 py-2.5 rounded-sm text-sm text-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-white/80 font-bold mb-1">
                      Service Required *
                    </label>
                    <select
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#071F3D] border border-white/20 focus:border-[#3FA652] px-4 py-2.5 rounded-sm text-sm text-white focus:outline-none transition-all cursor-pointer"
                    >
                      <option className="bg-[#071F3D] text-white" value="Facilities Management">Facilities Management</option>
                      <option className="bg-[#071F3D] text-white" value="Commercial Cleaning">Commercial Cleaning</option>
                      <option className="bg-[#071F3D] text-white" value="Temporary Recruitment">Temporary Recruitment</option>
                      <option className="bg-[#071F3D] text-white" value="Fire Marshal Services">Fire Marshal Services</option>
                      <option className="bg-[#071F3D] text-white" value="Concierge Security">Concierge Security</option>
                      <option className="bg-[#071F3D] text-white" value="Retail & Event Security">Retail & Event Security</option>
                      <option className="bg-[#071F3D] text-white" value="Other / General Support">Other / General Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-widest text-white/80 font-bold mb-1">
                      Site Location / Postcode
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Central London, EC1A 1BB"
                      className="w-full bg-white/5 border border-white/20 focus:border-[#3FA652] focus:bg-white/10 px-4 py-2.5 rounded-sm text-sm text-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-white/80 font-bold mb-1">
                    Requirements / Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your site, shift timings, staffing needs or specific requirements..."
                    className="w-full bg-white/5 border border-white/20 focus:border-[#3FA652] focus:bg-white/10 px-4 py-2.5 rounded-sm text-sm text-white focus:outline-none transition-all resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <ShieldCheck className="w-4 h-4 text-[#3FA652]" />
                    <span>Your data is protected & GDPR compliant</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#3FA652] hover:bg-[#2E7D32] text-white px-8 py-3.5 font-display uppercase tracking-widest text-xs font-bold rounded-sm shadow-lg transition-all cursor-pointer disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Submit Quote Request"} <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
