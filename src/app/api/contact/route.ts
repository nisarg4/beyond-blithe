import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { turnstileToken, ...formData } = body;

    // Verify Turnstile CAPTCHA
    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY!,
          response: turnstileToken,
        }),
      }
    );

    const turnstileResult = await turnstileResponse.json();

    if (!turnstileResult.success) {
      return NextResponse.json(
        { error: "CAPTCHA verification failed. Please try again." },
        { status: 400 }
      );
    }

    // Save to database
    const { error } = await supabase.from("inquiries").insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      event_type: formData.eventType,
      event_type_other: formData.eventType === "Other" ? formData.eventTypeOther : null,
      event_date: formData.eventDate || null,
      guest_count: formData.guestCount ? parseInt(formData.guestCount) : null,
      hear_about_us: formData.hearAboutUs,
      hear_about_us_other: formData.hearAboutUs === "Other" ? formData.hearAboutUsOther : null,
      message: formData.message,
    });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to submit inquiry. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
