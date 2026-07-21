import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import multer from "multer";
import mysql from "mysql2/promise";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// IONOS MariaDB / MySQL Configuration
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = parseInt(process.env.DB_PORT || "3306", 10);
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "guardianworks_db";

const GMAIL_USER = process.env.GMAIL_USER || "";
const GMAIL_PASS = (process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, "");
const DESTINATION_EMAIL = process.env.DESTINATION_EMAIL || "adas1594@gmail.com";

if (!GMAIL_USER || !GMAIL_PASS) {
  console.warn("  WARNING: GMAIL_USER / GMAIL_APP_PASSWORD not set in .env — emails will fail to send.");
}

// Uploads Directory
const UPLOADS_DIR = path.join(__dirname, "uploads");
const DATA_FILE = path.join(__dirname, "db_inquiries.json");

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `CV-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/uploads", express.static(UPLOADS_DIR));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[API CALL] ${new Date().toLocaleTimeString()} -> ${req.method} ${req.url}`);
  next();
});

// ----------------------------------------------------
// IONOS MariaDB / MySQL Database Connection Pool
// ----------------------------------------------------
let dbPool = null;

async function initDatabase() {
  try {
    dbPool = mysql.createPool({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Test connection
    const connection = await dbPool.getConnection();
    console.log("----------------------------------------------------");
    console.log(`  IONOS MariaDB Connected Successfully! Host: ${DB_HOST}`);
    console.log("----------------------------------------------------");

    // Auto-create inquiries table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS inquiries (
        id VARCHAR(50) PRIMARY KEY,
        fullName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(255),
        service VARCHAR(255),
        location VARCHAR(255),
        message TEXT,
        timestamp VARCHAR(100),
        status VARCHAR(50) DEFAULT 'New',
        type VARCHAR(50) NOT NULL,
        roleApplied VARCHAR(255),
        cvFileName VARCHAR(255),
        cvFileUrl VARCHAR(550),
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;
    await connection.query(createTableQuery);
    console.log("  MariaDB Table 'inquiries' is Ready!");
    connection.release();
  } catch (err) {
    console.warn("  IONOS MariaDB connection note:", err.message);
    console.warn("  (Backend will use JSON backup until IONOS credentials are updated in .env)");
  }
}

initDatabase();

// ----------------------------------------------------
// Nodemailer Transporter Setup (Gmail SMTP)
// ----------------------------------------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

// Verify SMTP Connection
transporter.verify((error) => {
  if (error) {
    console.warn("  Nodemailer SMTP Connection Warning:", error.message);
  } else {
    console.log("  Gmail SMTP Transporter Ready! Target Email:", DESTINATION_EMAIL);
  }
});

// Helper for local JSON backup
function readLocalDb() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([]));
      return [];
    }
    const content = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(content || "[]");
  } catch (err) {
    return [];
  }
}

function writeLocalDb(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing JSON backup:", err);
  }
}

// ----------------------------------------------------
// API ENDPOINTS
// ----------------------------------------------------

// GET all inquiries
app.get("/api/inquiries", async (req, res) => {
  if (dbPool) {
    try {
      const [rows] = await dbPool.query("SELECT * FROM inquiries ORDER BY createdAt DESC");
      return res.json({ success: true, count: rows.length, inquiries: rows });
    } catch (err) {
      console.warn("MariaDB read error, using local JSON fallback:", err.message);
    }
  }

  const localData = readLocalDb();
  res.json({ success: true, count: localData.length, inquiries: localData });
});

// POST Quote Request
app.post("/api/quotes", async (req, res) => {
  const { fullName, email, phone, company, service, location, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).json({ success: false, message: "Required fields missing" });
  }

  const newInquiryData = {
    id: `GW-QU-${Math.floor(1000 + Math.random() * 9000)}`,
    fullName,
    email,
    phone: phone || "N/A",
    company: company || "N/A",
    service: service || "Facilities Management",
    location: location || "N/A",
    message,
    timestamp: new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }),
    status: "New",
    type: "Quote",
    roleApplied: null,
    cvFileName: null,
    cvFileUrl: null,
  };

  // 1. Save to MariaDB Database
  if (dbPool) {
    try {
      const insertSql = `
        INSERT INTO inquiries (id, fullName, email, phone, company, service, location, message, timestamp, status, type)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      await dbPool.query(insertSql, [
        newInquiryData.id,
        newInquiryData.fullName,
        newInquiryData.email,
        newInquiryData.phone,
        newInquiryData.company,
        newInquiryData.service,
        newInquiryData.location,
        newInquiryData.message,
        newInquiryData.timestamp,
        newInquiryData.status,
        newInquiryData.type,
      ]);
      console.log(`[MARIADB SUCCESS] Saved Quote Request: ${newInquiryData.id} (${fullName})`);
    } catch (dbErr) {
      console.error("MariaDB Insert Error:", dbErr.message);
    }
  }

  // Backup to JSON
  const localList = readLocalDb();
  localList.unshift(newInquiryData);
  writeLocalDb(localList);

  // 2. Send Direct Email via Gmail SMTP (Nodemailer)
  const mailOptions = {
    from: `"Guardian Works Quote System" <${GMAIL_USER}>`,
    to: DESTINATION_EMAIL,
    replyTo: email,
    subject: `New Quote Request - ${newInquiryData.service} (${fullName})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #1E6EB6; border-radius: 8px; background-color: #f9fbfd;">
        <h2 style="color: #071F3D; border-bottom: 2px solid #3FA652; padding-bottom: 8px;">New Quote Request Received</h2>
        <p style="font-size: 14px; color: #555;"><strong>Reference ID:</strong> ${newInquiryData.id}</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr><td style="padding: 8px; font-weight: bold; width: 35%;">Customer Name:</td><td style="padding: 8px;">${fullName}</td></tr>
          <tr style="background-color: #f0f4f8;"><td style="padding: 8px; font-weight: bold;">Email Address:</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Phone Number:</td><td style="padding: 8px;">${newInquiryData.phone}</td></tr>
          <tr style="background-color: #f0f4f8;"><td style="padding: 8px; font-weight: bold;">Company Name:</td><td style="padding: 8px;">${newInquiryData.company}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Service Required:</td><td style="padding: 8px; color: #3FA652; font-weight: bold;">${newInquiryData.service}</td></tr>
          <tr style="background-color: #f0f4f8;"><td style="padding: 8px; font-weight: bold;">Site Location:</td><td style="padding: 8px;">${newInquiryData.location}</td></tr>
        </table>

        <div style="margin-top: 20px; padding: 15px; background-color: #ffffff; border-left: 4px solid #1E6EB6; border-radius: 4px;">
          <h3 style="margin-top: 0; color: #071F3D; font-size: 14px;">Requirements / Message:</h3>
          <p style="font-size: 14px; color: #333; white-space: pre-wrap;">${message}</p>
        </div>

        <p style="margin-top: 25px; font-size: 12px; color: #888; text-align: center;">
          Sent automatically from Guardian Works Group Website & IONOS MariaDB Backend
        </p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (mailErr, info) => {
    if (mailErr) {
      console.error("[NODEMAILER ERROR] Email sending error:", mailErr.message);
    } else {
      console.log(`[NODEMAILER SUCCESS] Quote Request Email sent to ${DESTINATION_EMAIL}: ${info.response}`);
    }
  });

  res.json({ success: true, message: "Quote request saved to database and emailed to admin", inquiry: newInquiryData });
});

// POST Career Application (handles both multipart/form-data with file and JSON)
app.post(
  "/api/careers",
  (req, res, next) => {
    const contentType = req.headers["content-type"] || "";
    if (contentType.includes("multipart/form-data")) {
      upload.single("cvFile")(req, res, (err) => {
        if (err) console.error("Multer file upload error:", err);
        next();
      });
    } else {
      next();
    }
  },
  async (req, res) => {
    const { fullName, email, phone, roleApplied, coverStatement } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    let cvFileName = "";
    let cvFileUrl = "";

    if (req.file) {
      cvFileName = req.file.originalname;
      cvFileUrl = `/uploads/${req.file.filename}`;
    }

    const newApplicationData = {
      id: `GW-APP-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName,
      email,
      phone: phone || "N/A",
      service: `Career Application (${roleApplied || "General"})`,
      roleApplied: roleApplied || "Security Personnel",
      message: coverStatement || "",
      cvFileName,
      cvFileUrl,
      timestamp: new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }),
      status: "New",
      type: "Career",
    };

    // 1. Save to MariaDB Database
    if (dbPool) {
      try {
        const insertSql = `
          INSERT INTO inquiries (id, fullName, email, phone, service, roleApplied, message, cvFileName, cvFileUrl, timestamp, status, type)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await dbPool.query(insertSql, [
          newApplicationData.id,
          newApplicationData.fullName,
          newApplicationData.email,
          newApplicationData.phone,
          newApplicationData.service,
          newApplicationData.roleApplied,
          newApplicationData.message,
          newApplicationData.cvFileName,
          newApplicationData.cvFileUrl,
          newApplicationData.timestamp,
          newApplicationData.status,
          newApplicationData.type,
        ]);
        console.log(`[MARIADB SUCCESS] Saved Career Application: ${newApplicationData.id} (${fullName})`);
      } catch (dbErr) {
        console.error("MariaDB Insert Error:", dbErr.message);
      }
    }

    // Backup to JSON
    const localList = readLocalDb();
    localList.unshift(newApplicationData);
    writeLocalDb(localList);

    // 2. Prepare Email with CV File Attachment
    const emailAttachments = [];
    if (req.file) {
      emailAttachments.push({
        filename: req.file.originalname,
        path: req.file.path,
      });
    }

    const mailOptions = {
      from: `"Guardian Works Recruitment" <${GMAIL_USER}>`,
      to: DESTINATION_EMAIL,
      replyTo: email,
      subject: `New Career Application - ${newApplicationData.roleApplied} (${fullName})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #7E22CE; border-radius: 8px; background-color: #fcfaff;">
          <h2 style="color: #4C1D95; border-bottom: 2px solid #7E22CE; padding-bottom: 8px;">New Job Application Received</h2>
          <p style="font-size: 14px; color: #555;"><strong>Reference ID:</strong> ${newApplicationData.id}</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr><td style="padding: 8px; font-weight: bold; width: 35%;">Applicant Name:</td><td style="padding: 8px;">${fullName}</td></tr>
            <tr style="background-color: #f3e8ff;"><td style="padding: 8px; font-weight: bold;">Email Address:</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Phone Number:</td><td style="padding: 8px;">${newApplicationData.phone}</td></tr>
            <tr style="background-color: #f3e8ff;"><td style="padding: 8px; font-weight: bold;">Role Applied For:</td><td style="padding: 8px; color: #6D28D9; font-weight: bold;">${newApplicationData.roleApplied}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Attached CV File:</td><td style="padding: 8px; color: #059669; font-weight: bold;">${cvFileName || "No CV file uploaded"}</td></tr>
          </table>

          <div style="margin-top: 20px; padding: 15px; background-color: #ffffff; border-left: 4px solid #7E22CE; border-radius: 4px;">
            <h3 style="margin-top: 0; color: #4C1D95; font-size: 14px;">Cover Statement / Experience Summary:</h3>
            <p style="font-size: 14px; color: #333; white-space: pre-wrap;">${coverStatement || "None provided"}</p>
          </div>

          <p style="margin-top: 25px; font-size: 12px; color: #888; text-align: center;">
            Sent automatically from Guardian Works Recruitment & IONOS MariaDB Backend
          </p>
        </div>
      `,
      attachments: emailAttachments,
    };

    transporter.sendMail(mailOptions, (mailErr, info) => {
      if (mailErr) {
        console.error("[NODEMAILER ERROR] Career application email error:", mailErr.message);
      } else {
        console.log(`[NODEMAILER SUCCESS] Career Application Email & CV attached sent to ${DESTINATION_EMAIL}: ${info.response}`);
      }
    });

    res.json({
      success: true,
      message: "Career application saved to database and emailed to recruitment team with CV attached",
      application: newApplicationData,
    });
  }
);

// DELETE all inquiries
app.delete("/api/inquiries", async (req, res) => {
  if (dbPool) {
    try {
      await dbPool.query("TRUNCATE TABLE inquiries");
    } catch (err) {
      console.error("MariaDB Delete Error:", err.message);
    }
  }
  writeLocalDb([]);
  res.json({ success: true, message: "Database cleared" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`====================================================`);
  console.log(`  Guardian Works Backend Storage Server Active`);
  console.log(`  Database Engine: IONOS MariaDB / MySQL`);
  console.log(`  Nodemailer: ${GMAIL_USER} -> ${DESTINATION_EMAIL}`);
  console.log(`  Listening on 0.0.0.0:${PORT} (IPv4 & IPv6 reachable)`);
  console.log(`====================================================`);
});
