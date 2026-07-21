import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Award, Briefcase, CheckCircle2, FileText, Send, Upload, Users, ArrowRight } from "lucide-react";
import { ConicBorderCard } from "@/components/site/ConicBorderCard";
import { saveCareerApplication } from "@/utils/inquiryStore";
import { submitToWeb3Forms, WEB3FORMS_CAREERS_KEY } from "@/utils/web3forms";

const BENEFITS = [
  "Competitive rates of pay with guaranteed hours",
  "Comprehensive training and certifications support",
  "Full uniform and high-spec equipment provided",
  "24/7 support from our operational control centre",
  "Paid holiday allowance and workplace pension schemes",
  "Clear progression pathways and career development",
];

export default function Careers() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileData, setFileData] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    roleApplied: "Security Personnel",
    coverStatement: "",
  });

  useEffect(() => {
    document.title = "Careers — Guardian Works Group Limited | Join Our Team";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Explore job vacancies and career opportunities at Guardian Works Group Limited. Join our team of professional facilities management, security, and cleaning operatives.");
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCvFile(file);
      setFileName(file.name);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFileData(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Instant save & non-blocking backend MongoDB Atlas & Nodemailer Gmail SMTP dispatch (with CV file attachment)
      await saveCareerApplication({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        roleApplied: formData.roleApplied,
        coverStatement: formData.coverStatement,
        cvFileName: fileName,
        cvFileData: fileData,
        cvFileObj: cvFile,
      });
    } catch (err) {
      console.warn("Save application notice:", err);
    }

    // 2. Web3Forms backup dispatch in background
    const fullMessage = `
========================================
NEW CAREER APPLICATION
========================================
Applicant Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Role Applied For: ${formData.roleApplied}
----------------------------------------
ATTACHED CV FILE:
File Name: ${fileName || "No CV attached"}

----------------------------------------
COVER STATEMENT / EXPERIENCE SUMMARY:
${formData.coverStatement}
========================================
`;

    submitToWeb3Forms({
      access_key: WEB3FORMS_CAREERS_KEY,
      subject: `New Career Application - ${formData.roleApplied} (${formData.fullName})`,
      from_name: "Guardian Works Careers",
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      role_applied: formData.roleApplied,
      cv_file_name: fileName || "None",
      message: fullMessage,
      attachment: cvFile,
    }).catch((err) => console.warn("Web3Forms notice:", err));

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <Layout>
      <PageHero
        eyebrow="Join Our Team"
        title="Careers"
        subtitle="Start your professional journey with Guardian Works Group. We hire skilled, dependable professionals and support their career growth."
        bgImage="/Careers.jpg"
      />

      {/* Why Work With Us */}
      <section className="py-24 bg-background">
        <div className="container-x grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="eyebrow mb-4">Opportunities</div>
            <h2 className="text-4xl md:text-5xl mb-6 font-bold uppercase text-foreground">Why Work With Us?</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6 font-semibold">
              At Guardian Works Group Limited, we believe our people are our greatest asset. Whether providing security, maintaining buildings, or cleaning corporate spaces, our team represents our brand.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We provide a supportive workspace, prioritize health and safety compliance, and offer consistent training to ensure all team members possess the skills and confidence required to excel.
            </p>
          </div>

          <ConicBorderCard borderRadius={20}>
            <div className="p-8 md:p-10">
              <h3 className="text-2xl font-bold uppercase text-white mb-6 flex items-center gap-3 font-display tracking-wider">
                <Award className="w-6 h-6 text-[#4DA6E8]" /> Employee Benefits
              </h3>
              <ul className="space-y-4">
                {BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#3FA652] shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-200 font-semibold">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ConicBorderCard>
        </div>
      </section>

      {/* Recruitment Form */}
      <section className="py-24 bg-background scroll-mt-20" id="apply">
        <div className="container-x max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="eyebrow justify-center mb-4">Online Application</div>
            <h2 className="text-4xl font-bold uppercase text-foreground mb-4">Submit Your Recruitment Form</h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Complete the recruitment application below and upload your CV. Our operations recruitment officer will review your submission and respond within 48 hours.
            </p>
          </div>

          <form
            className="bg-card border border-border p-8 md:p-12 space-y-6 rounded-sm shadow-sm"
            onSubmit={handleSubmit}
          >
            {submitted ? (
              <div className="text-center py-8 space-y-6 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-20 h-20 rounded-full bg-[#3FA652]/20 text-[#3FA652] flex items-center justify-center mx-auto border-2 border-[#3FA652]/40 shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-widest text-[#3FA652] font-extrabold font-display">Submission Confirmed</div>
                  <h3 className="text-3xl font-black uppercase text-foreground font-display">Thank You, {formData.fullName || "Applicant"}!</h3>
                  <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed font-semibold">
                    We have received your recruitment application and CV document. A confirmation notification has been dispatched to our recruitment operations team at <strong className="text-foreground">adas1594@gmail.com</strong>.
                  </p>
                </div>

                <div className="bg-secondary/60 border border-border rounded-lg p-6 max-w-lg mx-auto text-left space-y-3.5 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border/80 pb-2 text-xs">
                    <span className="text-muted-foreground uppercase font-bold tracking-wider">Status:</span>
                    <span className="bg-[#3FA652]/20 text-[#3FA652] font-bold px-3 py-0.5 rounded-full text-[11px] border border-[#3FA652]/40">✓ Received & Emailed</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground uppercase font-bold tracking-wider">Role Applied For:</span>
                    <span className="font-bold text-foreground">{formData.roleApplied}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground uppercase font-bold tracking-wider">Applicant Email:</span>
                    <span className="font-semibold text-primary">{formData.email}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground uppercase font-bold tracking-wider">Contact Phone:</span>
                    <span className="font-semibold text-foreground">{formData.phone}</span>
                  </div>
                  {fileName && (
                    <div className="flex items-center justify-between text-xs pt-2 border-t border-border/80">
                      <span className="text-muted-foreground uppercase font-bold tracking-wider">Attached CV File:</span>
                      <span className="text-[#3FA652] font-bold flex items-center gap-1.5 break-all">
                        <FileText className="w-4 h-4 shrink-0" /> {fileName}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFileName("");
                      setFileData("");
                      setCvFile(null);
                      setFormData({
                        fullName: "",
                        email: "",
                        phone: "",
                        roleApplied: "Security Personnel",
                        coverStatement: "",
                      });
                    }}
                    className="btn-primary cursor-pointer px-8 py-3.5"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-6">
                  <label className="block">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Full Name</span>
                    <input
                      required
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="mt-2 w-full border border-border px-4 py-3 focus:border-primary focus:outline-none bg-background rounded-sm text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Email Address</span>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@example.com"
                      className="mt-2 w-full border border-border px-4 py-3 focus:border-primary focus:outline-none bg-background rounded-sm text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Phone Number</span>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+44 7000 000000"
                      className="mt-2 w-full border border-border px-4 py-3 focus:border-primary focus:outline-none bg-background rounded-sm text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Role Applied For</span>
                    <select
                      required
                      value={formData.roleApplied}
                      onChange={(e) => setFormData({ ...formData, roleApplied: e.target.value })}
                      className="mt-2 w-full border border-border px-4 py-3 focus:border-primary focus:outline-none bg-[#071F3D] text-white rounded-sm text-sm"
                    >
                      <option className="bg-[#071F3D] text-white">Security Personnel</option>
                      <option className="bg-[#071F3D] text-white">Cleaning Operatives</option>
                      <option className="bg-[#071F3D] text-white">Facilities & FM Staff</option>
                      <option className="bg-[#071F3D] text-white">Trained Fire Marshal</option>
                      <option className="bg-[#071F3D] text-white">Concierge / Customer Service</option>
                      <option className="bg-[#071F3D] text-white">Warehouse Operatives</option>
                      <option className="bg-[#071F3D] text-white">Event Staff Support</option>
                      <option className="bg-[#071F3D] text-white">General Labour / Other</option>
                    </select>
                  </label>
                </div>

                <div className="block">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Cover Statement / Experience Summary</span>
                  <textarea
                    required
                    rows={5}
                    value={formData.coverStatement}
                    onChange={(e) => setFormData({ ...formData, coverStatement: e.target.value })}
                    className="mt-2 w-full border border-border px-4 py-3 focus:border-primary focus:outline-none bg-background rounded-sm text-sm"
                    placeholder="Briefly summarize your relevant work experience and qualifications..."
                  />
                </div>

                <div className="block">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold block mb-2">Upload CV (PDF, DOCX)</span>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <label className="flex items-center justify-center gap-2 bg-secondary border border-dashed border-border px-6 py-4 rounded-sm cursor-pointer hover:border-primary transition-colors text-sm font-semibold hover:text-primary text-muted-foreground shrink-0 select-none">
                      <Upload className="w-4 h-4" />
                      Choose CV File
                      <input
                        required
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    {fileName ? (
                      <span className="text-xs text-primary font-bold flex items-center gap-1.5 break-all">
                        <FileText className="w-3.5 h-3.5 shrink-0" />
                        {fileName}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground italic">No file selected</span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full sm:w-auto mt-6 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Submitting Application..." : "Submit Application"} <Send className="w-4 h-4" />
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </Layout>
  );
}
