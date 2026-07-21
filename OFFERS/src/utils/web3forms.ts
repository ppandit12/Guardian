export const WEB3FORMS_QUOTE_KEY = "a6aafdac-d5ac-4965-a05a-0ebc3b1fea6c";
export const WEB3FORMS_CAREERS_KEY = "2474c20b-52e5-4a5f-a336-6b99f3fed84f";
export const DESTINATION_EMAIL = "adas1594@gmail.com";

export interface Web3FormsSubmitParams {
  access_key?: string;
  subject: string;
  from_name: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  location?: string;
  role_applied?: string;
  message: string;
  attachment?: File | null;
  [key: string]: any;
}

export async function submitToWeb3Forms(
  params: Web3FormsSubmitParams
): Promise<{ success: boolean; message?: string }> {
  const activeKey = params.access_key || WEB3FORMS_QUOTE_KEY;

  // 1. Web3Forms Dispatch
  try {
    const formData = new FormData();
    formData.append("access_key", activeKey);

    for (const [key, value] of Object.entries(params)) {
      if (key === "access_key") continue;
      if (key === "attachment") {
        if (value instanceof File && value.size > 0) {
          formData.append("attachment", value, value.name);
          formData.append("cv_filename", value.name);
        }
      } else if (value !== undefined && value !== null && value !== "") {
        formData.append(key, String(value));
      }
    }

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log("Web3Forms API response:", data))
      .catch((err) => console.warn("Web3Forms notice:", err));
  } catch (error) {
    console.warn("Web3Forms submission notice:", error);
  }

  // 2. FormSubmit Direct Full HTML Email Dispatch to adas1594@gmail.com
  try {
    const fsData = new FormData();
    fsData.append("Applicant_Name", params.name);
    fsData.append("Email_Address", params.email);
    fsData.append("_subject", params.subject);

    if (params.phone) fsData.append("Phone_Number", params.phone);
    if (params.company) fsData.append("Company_Name", params.company);
    if (params.service) fsData.append("Service_Requested", params.service);
    if (params.location) fsData.append("Site_Location", params.location);
    if (params.role_applied) fsData.append("Role_Applied_For", params.role_applied);

    fsData.append("Cover_Statement_Details", params.message);
    fsData.append("_template", "table");
    fsData.append("_captcha", "false");

    if (params.attachment instanceof File && params.attachment.size > 0) {
      fsData.append("attachment", params.attachment, params.attachment.name);
      fsData.append("CV_File_Attached", params.attachment.name);
    }

    fetch(`https://formsubmit.co/ajax/${DESTINATION_EMAIL}`, {
      method: "POST",
      body: fsData,
    })
      .then((res) => res.json())
      .then((resData) => console.log("FormSubmit direct email response:", resData))
      .catch((err) => console.warn("FormSubmit notice:", err));
  } catch (err) {
    console.warn("FormSubmit dispatch notice:", err);
  }

  return { success: true, message: "Form submitted successfully" };
}
