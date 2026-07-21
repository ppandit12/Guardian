import { useState, useEffect } from "react";
import { X, Trash2, Mail, Phone, MapPin, Building, Calendar, Tag, Database, RefreshCw, FileText, Download, Briefcase } from "lucide-react";
import { getInquiries, fetchBackendInquiries, clearInquiries, type Inquiry } from "@/utils/inquiryStore";

interface InquiriesViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InquiriesViewerModal({ isOpen, onClose }: InquiriesViewerModalProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  const loadData = async () => {
    const data = await fetchBackendInquiries();
    setInquiries(data);
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all submitted quote inquiries?")) {
      clearInquiries();
      loadData();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[#071F3D]/80 backdrop-blur-md" onClick={onClose} />

      {/* Card */}
      <div className="relative w-full max-w-4xl bg-[#071F3D] border border-[#1E6EB6]/40 rounded-xl shadow-2xl overflow-hidden z-10 text-white my-8 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#0B3B73] px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-[#3FA652]" />
            <div>
              <h3 className="font-bold uppercase tracking-wider text-white text-base">Database Submissions</h3>
              <p className="text-[11px] text-white/70">Stored entries in system database ({inquiries.length})</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              className="p-2 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            {inquiries.length > 0 && (
              <button
                onClick={handleClear}
                className="p-2 rounded-md bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" /> Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {inquiries.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Database className="w-12 h-12 text-white/30 mx-auto" />
              <p className="text-white/70 text-sm font-semibold">No submissions found in the database yet.</p>
              <p className="text-white/50 text-xs">When users submit quote requests or job applications, their entries will appear here.</p>
            </div>
          ) : (
            inquiries.map((inq) => {
              const isCareer = inq.type === "Career" || inq.id.startsWith("GW-APP");

              return (
                <div
                  key={inq.id}
                  className="bg-white/5 border border-white/10 rounded-lg p-5 hover:border-[#1E6EB6]/60 transition-all space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono text-xs text-[#4DA6E8] bg-[#1E6EB6]/30 border border-[#1E6EB6]/50 px-2.5 py-0.5 rounded-md font-bold">
                        {inq.id}
                      </span>
                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded-full uppercase font-extrabold tracking-wider ${
                          isCareer ? "bg-purple-600 text-white" : "bg-[#1E6EB6] text-white"
                        }`}
                      >
                        {isCareer ? "Career Application" : "Quote Inquiry"}
                      </span>
                      <h4 className="font-bold text-white text-base">{inq.fullName}</h4>
                      {inq.company && (
                        <span className="text-xs text-white/70 flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-sm">
                          <Building className="w-3 h-3 text-[#3FA652]" /> {inq.company}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-white/60 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#3FA652]" /> {inq.timestamp}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-3 text-xs">
                    <div className="flex items-center gap-2 text-white/90">
                      <Mail className="w-3.5 h-3.5 text-[#4DA6E8]" /> <span>{inq.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/90">
                      <Phone className="w-3.5 h-3.5 text-[#3FA652]" /> <span>{inq.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/90">
                      <Tag className="w-3.5 h-3.5 text-[#4DA6E8]" /> <span className="font-semibold text-[#3FA652]">{inq.service}</span>
                    </div>
                  </div>

                  {isCareer && inq.roleApplied && (
                    <div className="text-xs text-white/90 flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 p-2 rounded font-semibold">
                      <Briefcase className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>Role Applied: <strong className="text-purple-300">{inq.roleApplied}</strong></span>
                    </div>
                  )}

                  {inq.location && (
                    <div className="text-xs text-white/80 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-400" /> Location: <strong>{inq.location}</strong>
                    </div>
                  )}

                  <div className="bg-black/30 p-3 rounded border border-white/5 text-xs text-white/90 leading-relaxed font-sans">
                    <span className="text-white/50 text-[10px] uppercase tracking-wider block mb-1">
                      {isCareer ? "Cover Statement / Candidate Experience:" : "Requirements / Message:"}
                    </span>
                    {inq.message}
                  </div>

                  {isCareer && inq.cvFileData && (
                    <div className="bg-[#1E6EB6]/20 border border-[#1E6EB6]/40 p-3 rounded flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2 text-white">
                        <FileText className="w-4 h-4 text-[#4DA6E8]" />
                        <span>Attached CV: <strong>{inq.cvFileName || "CV.pdf"}</strong></span>
                      </div>
                      <a
                        href={inq.cvFileData}
                        download={inq.cvFileName || `CV_${inq.fullName.replace(/\s+/g, "_")}.pdf`}
                        className="px-3 py-1.5 bg-[#3FA652] hover:bg-[#2E7D32] text-white rounded font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" /> Download CV
                      </a>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
