export interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  location?: string;
  message: string;
  timestamp: string;
  status: "New" | "Reviewed" | "Contacted";
  type?: "Quote" | "Career";
  roleApplied?: string;
  cvFileName?: string;
  cvFileData?: string;
  cvFileUrl?: string;
}

const STORAGE_KEY = "gw_quote_inquiries";

export function getInquiries(): Inquiry[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Failed to read inquiries from localStorage:", err);
    return [];
  }
}

export async function fetchBackendInquiries(): Promise<Inquiry[]> {
  try {
    const res = await fetch("/api/inquiries");
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.inquiries)) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data.inquiries));
        } catch (storageErr) {
          console.warn("LocalStorage quota reached when syncing from backend:", storageErr);
        }
        return data.inquiries;
      }
    }
  } catch (err) {
    console.warn("Backend API offline, using local storage fallback:", err);
  }
  return getInquiries();
}

export async function saveInquiry(inquiryData: Omit<Inquiry, "id" | "timestamp" | "status">): Promise<Inquiry> {
  const inquiries = getInquiries();
  const newInquiry: Inquiry = {
    ...inquiryData,
    id: `GW-QU-${Math.floor(1000 + Math.random() * 9000)}`,
    type: "Quote",
    timestamp: new Date().toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
    status: "New",
  };

  inquiries.unshift(newInquiry);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
  } catch (err) {
    console.warn("Could not save quote to localStorage:", err);
  }

  fetch("/api/quotes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inquiryData),
  })
    .then((res) => res.json())
    .then((result) => console.log("Backend quote dispatch result:", result))
    .catch((err) => console.warn("Backend quote dispatch notice:", err));

  return newInquiry;
}

export async function saveCareerApplication(data: {
  fullName: string;
  email: string;
  phone: string;
  roleApplied: string;
  coverStatement: string;
  cvFileName: string;
  cvFileData: string;
  cvFileObj?: File | null;
}): Promise<Inquiry> {
  const inquiries = getInquiries();

  const safeCvData = (data.cvFileData && data.cvFileData.length < 300000) ? data.cvFileData : "";

  const newApplication: Inquiry = {
    id: `GW-APP-${Math.floor(1000 + Math.random() * 9000)}`,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    service: `Career Application (${data.roleApplied})`,
    roleApplied: data.roleApplied,
    message: data.coverStatement,
    cvFileName: data.cvFileName,
    cvFileData: safeCvData,
    type: "Career",
    timestamp: new Date().toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
    status: "New",
  };

  inquiries.unshift(newApplication);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
  } catch (err) {
    console.warn("LocalStorage quota reached when saving career application:", err);
  }

  const formData = new FormData();
  formData.append("fullName", data.fullName);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("roleApplied", data.roleApplied);
  formData.append("coverStatement", data.coverStatement);

  if (data.cvFileObj) {
    formData.append("cvFile", data.cvFileObj, data.cvFileObj.name);
  }

  fetch("/api/careers", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => console.log("Backend career dispatch result:", result))
    .catch((err) => console.warn("Backend career dispatch notice:", err));

  return newApplication;
}

export function clearInquiries(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    fetch("/api/inquiries", { method: "DELETE" }).catch((err) =>
      console.warn("Backend clear notice:", err)
    );
  } catch (err) {
    console.error("Failed to clear inquiries:", err);
  }
}
