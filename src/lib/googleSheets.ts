import { JWT } from "google-auth-library";
import { EnquiryData } from "./validations/enquiry";

export async function appendToGoogleSheet(data: EnquiryData, clientIp?: string): Promise<{ success: boolean; error?: string }> {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const tabName = process.env.GOOGLE_SHEET_TAB_NAME || "Enquiries";
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  const now = new Date();
  const formattedDate = now.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const rowValues = [
    formattedDate,
    data.studentName,
    data.parentPhone,
    data.email || "N/A",
    `Class ${data.studentClass}`,
    data.goal,
    data.message || "None",
    clientIp || "Direct",
  ];

  // Strategy 1: Google Apps Script Webhook (if configured)
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: formattedDate,
          studentName: data.studentName,
          parentPhone: data.parentPhone,
          email: data.email || "",
          studentClass: data.studentClass,
          goal: data.goal,
          message: data.message || "",
          ip: clientIp,
          row: rowValues,
        }),
      });

      if (!res.ok) {
        console.error("Google Sheets webhook error:", await res.text());
        return { success: false, error: `Webhook error status ${res.status}` };
      }
      return { success: true };
    } catch (err: unknown) {
      console.error("Failed to post to Google Sheets webhook:", err);
      // Fall through to service account if available
    }
  }

  // Strategy 2: Google Sheets API v4 using Service Account
  if (serviceAccountEmail && privateKey && sheetId) {
    try {
      // Clean up newline formatting in private key if stored in env as \n
      if (privateKey.includes("\\n")) {
        privateKey = privateKey.replace(/\\n/g, "\n");
      }

      const client = new JWT({
        email: serviceAccountEmail,
        key: privateKey,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      const tokenResponse = await client.getAccessToken();
      const accessToken = tokenResponse.token;

      if (!accessToken) {
        throw new Error("Could not obtain Google OAuth2 access token");
      }

      const encodedTab = encodeURIComponent(tabName);
      const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodedTab}!A:H:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

      const appendRes = await fetch(appendUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          range: `${tabName}!A:H`,
          majorDimension: "ROWS",
          values: [rowValues],
        }),
      });

      if (!appendRes.ok) {
        const errText = await appendRes.text();
        console.error("Google Sheets API error response:", errText);
        return { success: false, error: errText };
      }

      return { success: true };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("Google Sheets Service Account error:", errorMessage);
      return { success: false, error: errorMessage };
    }
  }

  // If no credentials configured yet, log development notice
  console.warn("⚠️ Google Sheets credentials not configured in .env.local (GOOGLE_SHEET_ID / GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SHEETS_WEBHOOK_URL). Submission logged to console only.");
  console.log("Mock Sheet Row:", rowValues);
  return { success: true };
}
