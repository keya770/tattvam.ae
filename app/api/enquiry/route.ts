import { NextResponse } from "next/server";

/**
 * Receives partnership / institutional / contact enquiries.
 * TODO: forward to your CRM, email service, or ticketing system.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const email = typeof body.email === "string" ? body.email : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "A valid email is required" }, { status: 422 });
  }
  console.info("[enquiry]", body.kind, email);
  return NextResponse.json({ ok: true });
}
