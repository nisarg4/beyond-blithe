"use client";

import { useState, useCallback } from "react";
import Turnstile from "@/components/Turnstile";
import type { ContactPageContent } from "@/sanity/types";

const eventTypes = [
  "Wedding",
  "Proposal",
  "Baby Shower",
  "Birthday",
  "Corporate Event",
  "Other",
];

const hearAboutUs = [
  "Instagram",
  "Google Search",
  "Friend/Family Referral",
  "Attended one of our events",
  "Other",
];

export default function ContactForm({
  content,
}: {
  content: ContactPageContent | null;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventTypeOther: "",
    eventDate: "",
    guestCount: "",
    hearAboutUs: "",
    hearAboutUsOther: "",
    message: "",
  });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleTurnstileVerify = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!turnstileToken) {
      setErrorMessage("Please complete the CAPTCHA verification.");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        eventTypeOther: "",
        eventDate: "",
        guestCount: "",
        hearAboutUs: "",
        hearAboutUsOther: "",
        message: "",
      });
      setTurnstileToken(null);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      setErrorMessage(error.message);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClasses = "w-full px-4 py-3 border border-warm-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-transparent transition-shadow";

  return (
    <>
      {/* Form */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-6">
          {submitStatus === "success" ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-royal-500 to-gold-500 flex items-center justify-center text-white text-2xl">
                ✓
              </div>
              <h2
                className="text-2xl font-semibold text-royal-900 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {content?.successHeading ?? "Thank You!"}
              </h2>
              <p className="text-warm-600 mb-8">
                {content?.successMessage ?? "We've received your inquiry and will be in touch within 24-48 hours."}
              </p>
              <button
                onClick={() => setSubmitStatus("idle")}
                className="text-royal-700 underline hover:text-royal-800"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitStatus === "error" && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                  {errorMessage || "Something went wrong. Please try again or contact us on Instagram."}
                </div>
              )}

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-warm-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-warm-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-warm-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              {/* Event Type */}
              <div>
                <label htmlFor="eventType" className="block text-sm font-medium text-warm-700 mb-2">
                  Type of Event *
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  required
                  value={formData.eventType}
                  onChange={handleChange}
                  className={inputClasses}
                >
                  <option value="">Select an event type</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Event Type Other */}
              {formData.eventType === "Other" && (
                <div>
                  <label htmlFor="eventTypeOther" className="block text-sm font-medium text-warm-700 mb-2">
                    Please describe your event type *
                  </label>
                  <input
                    type="text"
                    id="eventTypeOther"
                    name="eventTypeOther"
                    required
                    value={formData.eventTypeOther}
                    onChange={handleChange}
                    placeholder="e.g., Anniversary party, Engagement ceremony..."
                    className={inputClasses}
                  />
                </div>
              )}

              {/* Event Date */}
              <div>
                <label htmlFor="eventDate" className="block text-sm font-medium text-warm-700 mb-2">
                  Tentative Event Date
                </label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              {/* Guest Count */}
              <div>
                <label htmlFor="guestCount" className="block text-sm font-medium text-warm-700 mb-2">
                  Estimated Guest Count
                </label>
                <input
                  type="number"
                  id="guestCount"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>

              {/* How did you hear about us */}
              <div>
                <label htmlFor="hearAboutUs" className="block text-sm font-medium text-warm-700 mb-2">
                  How did you hear about us? *
                </label>
                <select
                  id="hearAboutUs"
                  name="hearAboutUs"
                  required
                  value={formData.hearAboutUs}
                  onChange={handleChange}
                  className={inputClasses}
                >
                  <option value="">Select an option</option>
                  {hearAboutUs.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hear About Us Other */}
              {formData.hearAboutUs === "Other" && (
                <div>
                  <label htmlFor="hearAboutUsOther" className="block text-sm font-medium text-warm-700 mb-2">
                    Please tell us how you found us *
                  </label>
                  <input
                    type="text"
                    id="hearAboutUsOther"
                    name="hearAboutUsOther"
                    required
                    value={formData.hearAboutUsOther}
                    onChange={handleChange}
                    placeholder="e.g., Facebook, saw your work at a friend's event..."
                    className={inputClasses}
                  />
                </div>
              )}

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-warm-700 mb-2">
                  Tell us about your vision *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="What are you dreaming of? Share as much or as little as you'd like..."
                  className={inputClasses}
                />
              </div>

              {/* Turnstile CAPTCHA */}
              <div className="py-2">
                <Turnstile onVerify={handleTurnstileVerify} />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || !turnstileToken}
                className="w-full bg-gradient-to-r from-royal-700 to-royal-600 text-white py-4 rounded-lg font-medium hover:shadow-lg hover:shadow-royal-500/25 transition-all duration-300 disabled:from-warm-400 disabled:to-warm-400 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {isSubmitting ? "Sending..." : "Send Inquiry"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Alternative Contact */}
      <section className="py-16 bg-gradient-to-br from-royal-50 via-warm-50 to-gold-50/20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-warm-600 mb-4">
            {content?.alternativeContactText ?? "Prefer to reach out directly?"}
          </p>
          <a
            href="https://www.instagram.com/beyondblithe/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-royal-700 font-medium hover:text-royal-800 hover:underline"
          >
            Message us on Instagram @beyondblithe
          </a>
        </div>
      </section>
    </>
  );
}
