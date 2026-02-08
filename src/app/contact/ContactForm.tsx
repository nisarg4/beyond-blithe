"use client";

import { useState, useCallback } from "react";
import Turnstile from "@/components/Turnstile";
import type { ContactPageContent, SiteSettings } from "@/sanity/types";

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
  settings,
}: {
  content: ContactPageContent | null;
  settings: SiteSettings | null;
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
                  {errorMessage || "Something went wrong. Please try again or reach out to us on social media."}
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
          <p className="text-warm-600 mb-5">
            {content?.alternativeContactText ?? "You can also find us on social media"}
          </p>
          <div className="flex items-center justify-center gap-5">
            <a
              href={settings?.instagramUrl ?? "https://www.instagram.com/beyondblithe/"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-royal-700 hover:text-gold-500 transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a
              href={settings?.facebookUrl ?? "https://www.facebook.com/beyondblithe"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-royal-700 hover:text-gold-500 transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href={settings?.linkedinUrl ?? "https://www.linkedin.com/company/beyondblithe"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-royal-700 hover:text-gold-500 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
