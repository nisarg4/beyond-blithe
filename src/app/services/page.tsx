import Link from "next/link";

const services = [
  {
    title: "Weddings",
    description:
      "Your love story deserves a celebration as unique as you are. From venue selection to the last dance, we handle every detail so you can focus on what matters - each other.",
    features: ["Venue coordination", "Vendor management", "Day-of coordination", "Decor & styling"],
  },
  {
    title: "Proposals",
    description:
      "Ready to ask the big question? We'll help you create a moment that's perfectly you - intimate, grand, or anything in between.",
    features: ["Location scouting", "Setup & styling", "Photography coordination", "Surprise logistics"],
  },
  {
    title: "Baby Showers",
    description:
      "Celebrate the arrival of your little one surrounded by love. We create warm, joyful gatherings that honor this special time.",
    features: ["Theme design", "Games & activities", "Catering coordination", "Decor & setup"],
  },
  {
    title: "Birthdays",
    description:
      "From first birthdays to milestone celebrations, we create parties that reflect the guest of honor and bring everyone together.",
    features: ["Theme planning", "Entertainment booking", "Cake & catering", "Venue decoration"],
  },
  {
    title: "Corporate Events",
    description:
      "Professional events with a personal touch. We bring the same care and attention to your business gatherings.",
    features: ["Conference planning", "Team celebrations", "Client appreciation events", "Holiday parties"],
  },
  {
    title: "Hosting & Entertainment",
    description:
      "Need someone to bring energy to your event? We provide hosting and entertainment services that keep your guests engaged.",
    features: ["Event hosting", "Activity coordination", "Guest management", "Entertainment booking"],
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-stone-800 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-stone-600">
            Every celebration, handled with care.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`flex flex-col md:flex-row gap-8 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-1">
                  <div className="bg-stone-200 aspect-video rounded-lg" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-stone-800 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-stone-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-stone-600">
                        <span className="w-1.5 h-1.5 bg-stone-400 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-stone-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Have Something Else in Mind?
          </h2>
          <p className="text-stone-300 text-lg mb-8">
            We love unique celebrations. Tell us your vision.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-stone-800 px-8 py-4 rounded-full text-lg font-medium hover:bg-stone-100 transition-colors"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </section>
    </div>
  );
}
