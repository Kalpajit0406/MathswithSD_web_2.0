import nodemailer from "nodemailer";
import { EnquiryData } from "./validations/enquiry";

export async function sendEnquiryEmail(data: EnquiryData): Promise<{ success: boolean; error?: string }> {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = process.env.SMTP_SECURE !== "false";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const notifyTo = process.env.NOTIFICATION_EMAIL_TO || user;

  if (!host || !user || !pass || !notifyTo) {
    console.warn("⚠️ SMTP credentials not fully configured in .env.local (SMTP_HOST, SMTP_USER, SMTP_PASS, NOTIFICATION_EMAIL_TO). Email logged to console.");
    console.log("Mock Email Notification Payload:", {
      to: notifyTo || "soumensir@mathswithsd.com",
      subject: `🎓 New Admission Enquiry: ${data.studentName} (Class ${data.studentClass})`,
      student: data,
    });
    return { success: true };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  const now = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  const rawPhone = data.parentPhone.replace(/\D/g, "");
  const waPhone = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone;
  const whatsappUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
    `Hello ${data.studentName}, this is Soumen Sir from MathsWithSD. We received your admission enquiry for Class ${data.studentClass} (${data.goal}).`
  )}`;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f8fafc; margin: 0; padding: 24px; }
    .card { max-width: 580px; margin: 0 auto; background-color: #020617; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); border-bottom: 2px solid #f59e0b; padding: 24px 28px; }
    .badge { display: inline-block; background-color: rgba(245, 158, 11, 0.2); color: #fbbf24; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
    .title { margin: 10px 0 0 0; font-size: 22px; font-weight: 800; color: #ffffff; }
    .content { padding: 28px; }
    .row { display: flex; justify-content: space-between; border-bottom: 1px solid #1e293b; padding: 12px 0; }
    .label { color: #94a3b8; font-size: 13px; text-transform: uppercase; font-weight: 600; width: 35%; }
    .value { color: #f8fafc; font-size: 15px; font-weight: 600; width: 65%; text-align: right; }
    .highlight-phone { color: #38bdf8; font-family: monospace; font-size: 16px; }
    .msg-box { background-color: #0f172a; border-radius: 10px; padding: 14px; margin-top: 18px; border-left: 3px solid #38bdf8; }
    .msg-text { color: #cbd5e1; font-size: 14px; line-height: 1.5; margin-top: 4px; font-style: italic; }
    .actions { padding: 20px 28px 28px; display: flex; gap: 12px; }
    .btn { display: inline-block; text-decoration: none; padding: 12px 20px; border-radius: 9999px; font-size: 13px; font-weight: 700; text-align: center; }
    .btn-wa { background-color: #25d366; color: #ffffff; }
    .btn-call { background-color: #f59e0b; color: #020617; }
    .footer { padding: 16px 28px; background-color: #090d16; border-top: 1px solid #1e293b; text-align: center; font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="badge">New Admission Enquiry</span>
      <h1 class="title">MathsWithSD — Soumen Sir</h1>
    </div>
    <div class="content">
      <div class="row">
        <span class="label">Student Name</span>
        <span class="value" style="color:#ffffff;">${data.studentName}</span>
      </div>
      <div class="row">
        <span class="label">Parent / Contact</span>
        <span class="value highlight-phone">+91 ${data.parentPhone}</span>
      </div>
      <div class="row">
        <span class="label">Email</span>
        <span class="value">${data.email || '<span style="color:#64748b">Not provided</span>'}</span>
      </div>
      <div class="row">
        <span class="label">Class</span>
        <span class="value" style="color:#f59e0b;">Class ${data.studentClass}</span>
      </div>
      <div class="row">
        <span class="label">Target Goal</span>
        <span class="value" style="color:#38bdf8;">${data.goal}</span>
      </div>
      <div class="row">
        <span class="label">Received At</span>
        <span class="value" style="font-size:12px; color:#94a3b8;">${now}</span>
      </div>

      ${
        data.message
          ? `
      <div class="msg-box">
        <div style="font-size:11px; font-weight:bold; color:#94a3b8; text-transform:uppercase;">Student/Parent Query:</div>
        <div class="msg-text">"${data.message}"</div>
      </div>
      `
          : ""
      }
    </div>

    <div class="actions">
      <a href="tel:+91${data.parentPhone}" class="btn btn-call" style="margin-right: 10px;">📞 Call Parent (+91 ${data.parentPhone})</a>
      <a href="${whatsappUrl}" class="btn btn-wa">💬 Open WhatsApp</a>
    </div>

    <div class="footer">
      MathsWithSD Personal Coaching • Salt Lake / Kolkata, West Bengal
    </div>
  </div>
</body>
</html>
  `;

  try {
    await transporter.sendMail({
      from: `"MathsWithSD Admissions" <${user}>`,
      to: notifyTo,
      replyTo: data.email || user,
      subject: `🎓 New Admission Enquiry: ${data.studentName} (Class ${data.studentClass} - ${data.goal})`,
      text: `New Admission Enquiry for MathsWithSD:\n\nStudent: ${data.studentName}\nPhone: +91 ${data.parentPhone}\nEmail: ${data.email || "N/A"}\nClass: Class ${data.studentClass}\nGoal: ${data.goal}\nMessage: ${data.message || "None"}\nTime: ${now}`,
      html: htmlContent,
    });

    return { success: true };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Failed to send email";
    console.error("Nodemailer error sending enquiry email:", errorMessage);
    return { success: false, error: errorMessage };
  }
}
