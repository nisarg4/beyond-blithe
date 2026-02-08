import { getContactPage } from "@/sanity/queries";
import ContactForm from "./ContactForm";

export default async function Contact() {
  const content = await getContactPage();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-royal-100 via-warm-50 to-gold-50/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1
            className="text-4xl md:text-5xl font-semibold text-royal-900 mb-6 animate-fade-in-up"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {content?.heroTitle ?? "Let's Create Together"}
          </h1>
          <p className="text-xl text-warm-600 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {content?.heroSubtitle ?? "Tell us about your vision. We'll make it happen."}
          </p>
        </div>
      </section>

      <ContactForm content={content} />
    </div>
  );
}
