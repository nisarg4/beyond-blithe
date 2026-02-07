import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-stone-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-semibold text-stone-800 mb-6">
            Your Moments,<br />Our Family
          </h1>
          <p className="text-xl text-stone-600 mb-8 max-w-2xl mx-auto">
            We don&apos;t just plan events. We become part of your celebration,
            treating every detail with the care we&apos;d give our own family.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-stone-800 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-stone-700 transition-colors"
          >
            Let&apos;s Create Together
          </Link>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-stone-800 mb-12 text-center">
            What We Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Weddings",
                description: "From intimate ceremonies to grand celebrations, we make your special day unforgettable.",
              },
              {
                title: "Proposals",
                description: "Create the perfect moment to pop the question with our thoughtful planning.",
              },
              {
                title: "Baby Showers",
                description: "Celebrate new beginnings with warmth and joy.",
              },
              {
                title: "Birthdays",
                description: "Milestone moments deserve milestone celebrations.",
              },
              {
                title: "Corporate Events",
                description: "Professional events with a personal touch.",
              },
              {
                title: "Hosting & Entertainment",
                description: "We bring energy and life to every gathering.",
              },
            ].map((service) => (
              <div key={service.title} className="p-6 bg-stone-50 rounded-lg">
                <h3 className="text-xl font-medium text-stone-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-stone-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-stone-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Ready to Create Something Beautiful?
          </h2>
          <p className="text-stone-300 text-lg mb-8">
            Tell us about your vision. We&apos;ll make it happen.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-stone-800 px-8 py-4 rounded-full text-lg font-medium hover:bg-stone-100 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
