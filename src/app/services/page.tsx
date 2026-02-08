import Link from "next/link";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { GradientOrb } from "@/components/DecorativeElements";
import { getServicesPage, getServices } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import type { Service } from "@/sanity/types";

const fallbackServices: Service[] = [
  {
    _id: "1", title: "Weddings", icon: "💍", shortDescription: "",
    longDescription: "Your love story deserves a celebration as unique as you are. From venue selection to the last dance, we handle every detail so you can focus on what matters - each other.",
    features: ["Venue coordination", "Vendor management", "Day-of coordination", "Decor & styling"],
    displayOrder: 1,
  },
  {
    _id: "2", title: "Proposals", icon: "💐", shortDescription: "",
    longDescription: "Ready to ask the big question? We'll help you create a moment that's perfectly you - intimate, grand, or anything in between.",
    features: ["Location scouting", "Setup & styling", "Photography coordination", "Surprise logistics"],
    displayOrder: 2,
  },
  {
    _id: "3", title: "Baby Showers", icon: "🍼", shortDescription: "",
    longDescription: "Celebrate the arrival of your little one surrounded by love. We create warm, joyful gatherings that honor this special time.",
    features: ["Theme design", "Games & activities", "Catering coordination", "Decor & setup"],
    displayOrder: 3,
  },
  {
    _id: "4", title: "Birthdays", icon: "🎂", shortDescription: "",
    longDescription: "From first birthdays to milestone celebrations, we create parties that reflect the guest of honor and bring everyone together.",
    features: ["Theme planning", "Entertainment booking", "Cake & catering", "Venue decoration"],
    displayOrder: 4,
  },
  {
    _id: "5", title: "Corporate Events", icon: "🏢", shortDescription: "",
    longDescription: "Professional events with a personal touch. We bring the same care and attention to your business gatherings.",
    features: ["Conference planning", "Team celebrations", "Client appreciation events", "Holiday parties"],
    displayOrder: 5,
  },
  {
    _id: "6", title: "Hosting & Entertainment", icon: "🎤", shortDescription: "",
    longDescription: "Need someone to bring energy to your event? We provide hosting and entertainment services that keep your guests engaged.",
    features: ["Event hosting", "Activity coordination", "Guest management", "Entertainment booking"],
    displayOrder: 6,
  },
];

const fallbackImages: Record<string, string> = {
  Weddings: "/services/weddings.jpg",
  Proposals: "/services/proposals.jpg",
  "Baby Showers": "/services/baby-showers.jpg",
  Birthdays: "/services/birthdays.jpg",
  "Corporate Events": "/services/corporate.jpg",
  "Hosting & Entertainment": "/services/entertainment.jpg",
};

export default async function Services() {
  const [content, services] = await Promise.all([
    getServicesPage(),
    getServices(),
  ]);

  const displayServices = services.length > 0 ? services : fallbackServices;

  function getImageSrc(service: Service): string {
    if (service.image) {
      return urlFor(service.image).width(800).height(450).url();
    }
    return fallbackImages[service.title] || "/services/weddings.jpg";
  }

  return (
    <ScrollAnimationWrapper>
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="py-24 bg-gradient-to-br from-royal-100 via-warm-50 to-gold-50/30">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1
              className="text-4xl md:text-5xl font-semibold text-royal-900 mb-6 animate-fade-in-up"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {content?.heroTitle ?? "Our Services"}
            </h1>
            <p className="text-xl text-warm-600 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              {content?.heroSubtitle ?? "Every celebration, handled with care."}
            </p>
          </div>
        </section>

        {/* Services List */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="space-y-16">
              {displayServices.map((service, index) => (
                <div
                  key={service._id}
                  className={`scroll-animate flex flex-col md:flex-row gap-8 ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-1">
                    <div className="aspect-video rounded-xl overflow-hidden">
                      <img
                        src={getImageSrc(service)}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2
                      className="text-2xl font-semibold text-royal-900 mb-4"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {service.title}
                    </h2>
                    <p className="text-warm-600 mb-4">{service.longDescription}</p>
                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-warm-600">
                            <span className="w-1.5 h-1.5 bg-royal-400 rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-royal-950 via-royal-900 to-royal-950 text-white relative overflow-hidden">
          <GradientOrb className="w-64 h-64 -top-10 -right-10 opacity-50" color="gold" />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2
              className="text-3xl font-semibold mb-6 scroll-animate"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {content?.ctaHeading ?? "Have Something Else in Mind?"}
            </h2>
            <p className="text-royal-300 text-lg mb-8 scroll-animate">
              {content?.ctaSubtitle ?? "We love unique celebrations. Tell us your vision."}
            </p>
            <Link
              href="/contact"
              className="scroll-animate inline-block bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-gold-500/25 transition-all duration-300"
            >
              {content?.ctaButtonText ?? "Let's Talk"}
            </Link>
          </div>
        </section>
      </div>
    </ScrollAnimationWrapper>
  );
}
