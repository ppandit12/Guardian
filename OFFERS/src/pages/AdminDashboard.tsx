import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/site/Layout";
import { GuardianWorksLogo } from "@/components/site/GuardianWorksLogo";
import { getInquiries, clearInquiries, type Inquiry } from "@/utils/inquiryStore";
import {
  Lock,
  User,
  LogOut,
  Database,
  Search,
  Trash2,
  CheckCircle2,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  Tag,
  RefreshCw,
  ShieldAlert,
  Briefcase,
  FileText,
  Download,
  Filter,
} from "lucide-react";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"All" | "Quote" | "Career">("All");
  const [filterService, setFilterService] = useState("All");

  useEffect(() => {
    document.title = "Admin Portal — Guardian Works Group";
    const authSession = sessionStorage.getItem("gw_admin_auth");
    if (authSession === "true") {
      setIsAuthenticated(true);
      loadInquiries();
    }
  }, []);

  const loadInquiries = () => {
    setInquiries(getInquiries());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().toLowerCase() === "admin" && password === "guardian2026") {
      sessionStorage.setItem("gw_admin_auth", "true");
      setIsAuthenticated(true);
      setLoginError("");
      loadInquiries();
    } else {
      setLoginError("Invalid username or password. (Default: admin / guardian2026)");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("gw_admin_auth");
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
  };

  const handleDeleteInquiry = (id: string) => {
    if (window.confirm(`Are you sure you want to delete submission ${id}?`)) {
      const updated = inquiries.filter((inq) => inq.id !== id);
      setInquiries(updated);
      try {
        localStorage.setItem("gw_quote_inquiries", JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleToggleStatus = (id: string) => {
    const updated = inquiries.map((inq) => {
      if (inq.id === id) {
        const nextStatus: Inquiry["status"] = inq.status === "New" ? "Contacted" : "New";
        return { ...inq, status: nextStatus };
      }
      return inq;
    });
    setInquiries(updated);
    try {
      localStorage.setItem("gw_quote_inquiries", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear ALL submissions from the database?")) {
      clearInquiries();
      loadInquiries();
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.company && inq.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (inq.roleApplied && inq.roleApplied.toLowerCase().includes(searchTerm.toLowerCase()));

    const isCareer = inq.type === "Career" || inq.id.startsWith("GW-APP");
    const matchesType =
      filterType === "All" ||
      (filterType === "Career" && isCareer) ||
      (filterType === "Quote" && !isCareer);

    const matchesService = filterService === "All" || inq.service === filterService;

    return matchesSearch && matchesType && matchesService;
  });

  const quoteCount = inquiries.filter((i) => i.type !== "Career" && !i.id.startsWith("GW-APP")).length;
  const careerCount = inquiries.filter((i) => i.type === "Career" || i.id.startsWith("GW-APP")).length;

  return (
    <Layout>
      {!isAuthenticated ? (
        /* Login Screen */
        <section className="py-28 bg-[#071F3D] min-h-[80vh] flex items-center justify-center p-4 text-white">
          <div className="w-full max-w-md bg-[#0B3B73]/60 border border-[#1E6EB6]/40 p-8 sm:p-10 rounded-2xl shadow-2xl backdrop-blur-xl">
            <div className="text-center mb-8">
              <div className="bg-[#B0C4DE] p-2 px-4 rounded-lg inline-flex items-center shadow-md mb-4 border border-white/20">
                <GuardianWorksLogo variant="full-light" height={38} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-wider font-display text-white mt-2">Admin Portal Login</h2>
              <p className="text-xs text-white/70 mt-1">Authorized operations personnel access only</p>
            </div>

            {loginError && (
              <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-md text-red-200 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/80 font-bold mb-2">Username</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3.5 text-white/50" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username (admin)"
                    className="w-full bg-white/5 border border-white/20 focus:border-[#3FA652] focus:bg-white/10 pl-10 pr-4 py-2.5 rounded-md text-sm text-white focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/80 font-bold mb-2">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-white/50" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password (guardian2026)"
                    className="w-full bg-white/5 border border-white/20 focus:border-[#3FA652] focus:bg-white/10 pl-10 pr-4 py-2.5 rounded-md text-sm text-white focus:outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#3FA652] hover:bg-[#2E7D32] text-white py-3.5 font-display uppercase tracking-widest text-xs font-bold rounded-md shadow-lg transition-colors cursor-pointer mt-2"
              >
                Sign In To Portal
              </button>
            </form>

            <div className="mt-6 text-center text-[11px] text-white/50 border-t border-white/10 pt-4">
              Demo Credentials: <strong>admin</strong> / <strong>guardian2026</strong>
            </div>
          </div>
        </section>
      ) : (
        /* Authenticated Admin Dashboard */
        <section className="py-12 bg-background min-h-[85vh]">
          <div className="container-x">
            {/* Top Bar */}
            <div className="bg-[#071F3D] text-white p-6 sm:p-8 rounded-xl border border-[#1E6EB6]/40 shadow-xl mb-8 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-[#B0C4DE] p-2 px-3 rounded-lg inline-flex items-center shadow-md">
                  <GuardianWorksLogo variant="full-light" height={36} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold uppercase tracking-wider font-display text-white">
                    Operations Portal
                  </h1>
                  <p className="text-xs text-white/70">
                    Total Submissions: <strong>{inquiries.length}</strong> (Quotes: {quoteCount} | Applications: {careerCount})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={loadInquiries}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-[#3FA652]" /> Refresh Data
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-md text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer border border-red-500/30"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>

            {/* Type Toggle Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <button
                onClick={() => setFilterType("All")}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  filterType === "All"
                    ? "bg-[#1E6EB6] text-white shadow-md"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                All Submissions ({inquiries.length})
              </button>
              <button
                onClick={() => setFilterType("Quote")}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  filterType === "Quote"
                    ? "bg-[#1E6EB6] text-white shadow-md"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                Quote Inquiries ({quoteCount})
              </button>
              <button
                onClick={() => setFilterType("Career")}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  filterType === "Career"
                    ? "bg-[#3FA652] text-white shadow-md"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                Career Applications ({careerCount})
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-card border border-border p-4 sm:p-6 rounded-lg mb-8 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4 flex-1">
                {/* Search */}
                <div className="relative min-w-[240px] flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name, email, company, role, or ID..."
                    className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-md text-xs focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Service Dropdown */}
                <div className="min-w-[180px]">
                  <select
                    value={filterService}
                    onChange={(e) => setFilterService(e.target.value)}
                    className="w-full py-2 px-3 bg-background border border-border rounded-md text-xs focus:outline-none focus:border-primary cursor-pointer font-semibold"
                  >
                    <option value="All">All Categories ({inquiries.length})</option>
                    <option value="Facilities Management">Facilities Management</option>
                    <option value="Commercial Cleaning">Commercial Cleaning</option>
                    <option value="Temporary Recruitment">Temporary Recruitment</option>
                    <option value="Fire Marshal Services">Fire Marshal Services</option>
                    <option value="Concierge Security">Concierge Security</option>
                    <option value="Retail & Event Security">Retail & Event Security</option>
                  </select>
                </div>
              </div>

              {inquiries.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All Submissions
                </button>
              )}
            </div>

            {/* Inquiries Cards Grid */}
            {filteredInquiries.length === 0 ? (
              <div className="bg-card border border-border p-16 text-center rounded-xl space-y-3 shadow-sm">
                <Database className="w-12 h-12 text-muted-foreground/40 mx-auto" />
                <h3 className="text-xl font-bold uppercase text-foreground">No Submissions Found</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  {inquiries.length === 0
                    ? "No submissions have been received yet. Submissions from the website quote form and recruitment applications will automatically display here."
                    : "No submissions match your current search or category filter criteria."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredInquiries.map((inq) => {
                  const isCareer = inq.type === "Career" || inq.id.startsWith("GW-APP");

                  return (
                    <div
                      key={inq.id}
                      className={`bg-card border ${
                        inq.status === "Contacted"
                          ? "border-emerald-500/40 bg-emerald-500/5"
                          : "border-border hover:border-primary"
                      } p-6 rounded-xl shadow-sm transition-all space-y-4`}
                    >
                      {/* Header line */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span
                            className={`font-mono text-xs px-3 py-1 rounded-md font-bold border ${
                              isCareer
                                ? "text-purple-400 bg-purple-500/10 border-purple-500/30"
                                : "text-primary bg-primary/10 border-primary/20"
                            }`}
                          >
                            {inq.id}
                          </span>
                          <span
                            className={`text-[10px] px-2.5 py-0.5 rounded-full uppercase font-extrabold tracking-wider ${
                              isCareer
                                ? "bg-purple-600 text-white"
                                : "bg-[#1E6EB6] text-white"
                            }`}
                          >
                            {isCareer ? "Career Application" : "Quote Inquiry"}
                          </span>
                          <h3 className="text-lg font-bold text-foreground uppercase ml-1">{inq.fullName}</h3>
                          {inq.company && (
                            <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-md font-medium flex items-center gap-1">
                              <Building className="w-3.5 h-3.5 text-primary" /> {inq.company}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-primary" /> {inq.timestamp}
                          </span>
                          <button
                            onClick={() => handleToggleStatus(inq.id)}
                            className={`text-xs px-3 py-1 rounded-md font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
                              inq.status === "Contacted"
                                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                : "bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40 hover:bg-amber-500/30"
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {inq.status === "Contacted" ? "Contacted" : "Mark Contacted"}
                          </button>
                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1.5 text-muted-foreground hover:text-red-600 transition-colors cursor-pointer rounded-md hover:bg-red-50 dark:hover:bg-red-950/40"
                            title="Delete submission"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Metadata details */}
                      <div className="grid md:grid-cols-3 gap-4 text-xs">
                        <div className="flex items-center gap-2 text-foreground font-semibold">
                          <Mail className="w-4 h-4 text-primary shrink-0" />
                          <a href={`mailto:${inq.email}`} className="hover:underline text-primary">
                            {inq.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-foreground font-semibold">
                          <Phone className="w-4 h-4 text-primary shrink-0" />
                          <a href={`tel:${inq.phone}`} className="hover:underline text-foreground">
                            {inq.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-foreground font-semibold">
                          <Tag className="w-4 h-4 text-primary shrink-0" />
                          <span>
                            Category: <strong className="text-primary">{inq.service}</strong>
                          </span>
                        </div>
                      </div>

                      {isCareer && inq.roleApplied && (
                        <div className="text-xs text-foreground flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 p-2.5 rounded-md font-semibold">
                          <Briefcase className="w-4 h-4 text-purple-400 shrink-0" />
                          <span>
                            Role Applied For: <strong className="text-purple-300 uppercase font-bold">{inq.roleApplied}</strong>
                          </span>
                        </div>
                      )}

                      {inq.location && (
                        <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-red-500" /> Location / Postcode: <strong>{inq.location}</strong>
                        </div>
                      )}

                      {/* Requirement or Cover statement text */}
                      <div className="bg-secondary/60 p-4 rounded-lg border border-border text-xs text-foreground leading-relaxed font-sans">
                        <span className="text-muted-foreground text-[10px] uppercase tracking-wider block mb-1 font-bold">
                          {isCareer ? "Cover Statement / Candidate Experience Summary:" : "Client Requirements / Message:"}
                        </span>
                        {inq.message}
                      </div>

                      {/* Attached CV Section */}
                      {isCareer && inq.cvFileData && (
                        <div className="bg-[#1E6EB6]/10 border border-[#1E6EB6]/30 p-4 rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2 text-foreground font-semibold">
                            <FileText className="w-4 h-4 text-[#4DA6E8]" />
                            <span>
                              Attached CV: <strong className="text-primary">{inq.cvFileName || "Candidate_CV.pdf"}</strong>
                            </span>
                          </div>
                          <a
                            href={inq.cvFileData}
                            download={inq.cvFileName || `CV_${inq.fullName.replace(/\s+/g, "_")}.pdf`}
                            className="px-4 py-2 bg-[#3FA652] hover:bg-[#2E7D32] text-white rounded-md font-bold text-xs flex items-center gap-2 transition-colors shadow-md cursor-pointer"
                          >
                            <Download className="w-4 h-4" /> Download Attached CV
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}
    </Layout>
  );
}
