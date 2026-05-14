import { Resend } from "resend";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await request.json().catch(() => null);

  if (!body) {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, phone, message } = body as Record<string, string>;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return Response.json(
      { error: "name, email, and message are required" },
      { status: 400 },
    );
  }

  const to = process.env.CONTACT_EMAIL;
  if (!to) {
    return Response.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const { error } = await resend.emails.send({
    from: "Sabina Krajewska Website <contact@simple-bookkeeping.co.uk>",
    to: [to],
    replyTo: email,
    subject: `New enquiry from ${name}`,
    html: `
      <h2 style="font-family:sans-serif;color:#131b2e">New Contact Form Submission</h2>
      <table style="font-family:sans-serif;border-collapse:collapse;width:100%;max-width:600px">
        <tr><td style="padding:8px 0;color:#45464d;width:120px"><strong>Name</strong></td><td style="padding:8px 0">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:8px 0;color:#45464d"><strong>Email</strong></td><td style="padding:8px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:8px 0;color:#45464d"><strong>Phone</strong></td><td style="padding:8px 0">${escapeHtml(phone || "Not provided")}</td></tr>
        <tr><td style="padding:8px 0;color:#45464d;vertical-align:top"><strong>Message</strong></td><td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(message)}</td></tr>
      </table>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }

  return Response.json({ success: true });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
