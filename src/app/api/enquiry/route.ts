import { NextRequest, NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validations/enquiry";
import { checkRateLimit } from "@/lib/rateLimit";
import { appendToGoogleSheet } from "@/lib/googleSheets";
import { sendEnquiryEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    // 1. Identify Client IP for Rate Limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || "127.0.0.1";

    // 2. Anti-Spam: Rate Limit check (5 requests per 10 mins per IP)
    const rateLimit = checkRateLimit(clientIp, { limit: 5, windowMs: 10 * 60 * 1000 });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many submissions from this connection. Please wait ${rateLimit.retryAfterSeconds} seconds before trying again.`,
        },
        {
          status: 429,
          headers: { "Retry-After": rateLimit.retryAfterSeconds.toString() },
        }
      );
    }

    // 3. Parse and inspect request body
    const body = await req.json();

    // 4. Anti-Spam: Honeypot check
    // If the hidden 'website_hp' field is filled, it was filled by a spam bot
    if (body.website_hp && body.website_hp.length > 0) {
      // Return 200 to fool the bot, but do not process
      return NextResponse.json({
        success: true,
        message: "Enquiry received.",
      });
    }

    // 5. Server-Side Schema Validation via Zod
    const validationResult = enquirySchema.safeParse(body);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });

      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please check the entered details.",
          errors: fieldErrors,
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // 6. Execute Integrations Concurrently (Google Sheets + Email notification)
    const [sheetResult, emailResult] = await Promise.allSettled([
      appendToGoogleSheet(validatedData, clientIp),
      sendEnquiryEmail(validatedData),
    ]);

    // Check if both integration attempts had failures and log warnings
    if (sheetResult.status === "rejected") {
      console.error("Critical Google Sheets integration error:", sheetResult.reason);
    }
    if (emailResult.status === "rejected") {
      console.error("Critical Email dispatch integration error:", emailResult.reason);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been received successfully! Soumen Sir's team will contact you shortly.",
        data: {
          studentName: validatedData.studentName,
          parentPhone: validatedData.parentPhone,
          studentClass: validatedData.studentClass,
          goal: validatedData.goal,
        },
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Unhandled error in /api/enquiry:", err);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your request. Please try again or reach out on WhatsApp.",
      },
      { status: 500 }
    );
  }
}
