import Link from "next/link";
import { FloatingSparkles, GradientOrb } from "@/components/DecorativeElements";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { getHomePage, getServicesForHome } from "@/sanity/queries";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  const [content, services, featuredVideoResult] = await Promise.all([
    getHomePage(),
    getServicesForHome(),
    supabase
      .from("gallery_videos")
      .select("*")
      .eq("is_featured", true)
      .limit(1)
      .single(),
  ]);

  const featuredVideo = featuredVideoResult.data;

  const fallbackServices = [
    { _id: "1", title: "Weddings", icon: "💍", shortDescription: "From intimate ceremonies to grand celebrations, we make your special day unforgettable." },
    { _id: "2", title: "Proposals", icon: "💐", shortDescription: "Create the perfect moment to pop the question with our thoughtful planning." },
    { _id: "3", title: "Baby Showers", icon: "🍼", shortDescription: "Celebrate new beginnings with warmth and joy." },
    { _id: "4", title: "Birthdays", icon: "🎂", shortDescription: "Milestone moments deserve milestone celebrations." },
    { _id: "5", title: "Corporate Events", icon: "🏢", shortDescription: "Professional events with a personal touch." },
    { _id: "6", title: "Hosting & Entertainment", icon: "🎤", shortDescription: "We bring energy and life to every gathering." },
  ];

  const displayServices = services.length > 0 ? services : fallbackServices;

  return (
    <ScrollAnimationWrapper>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-royal-950 via-royal-800 to-royal-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(124,58,237,0.3)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,rgba(212,168,67,0.1)_0%,transparent_60%)]" />
        <FloatingSparkles />
        <GradientOrb className="w-96 h-96 -top-20 -left-20" color="royal" />
        <GradientOrb className="w-80 h-80 -bottom-20 -right-20" color="gold" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="text-white">{content?.heroHeading ?? "Your Moments,"}</span>
            <br />
            <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
              {content?.heroHeadingAccent ?? "Our Family"}
            </span>
          </h1>
          <p className="text-xl text-royal-200 mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {content?.heroSubheading ?? "We don't just plan events. We become part of your celebration, treating every detail with the care we'd give our own family."}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-gold-500/25 transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            {content?.heroCta ?? "Let's Create Together"}
          </Link>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
            <div className="w-6 h-10 rounded-full border-2 border-royal-300/50 flex items-start justify-center pt-2">
              <div className="w-1 h-2 bg-royal-300/50 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-3xl font-semibold text-royal-900 mb-4 text-center scroll-animate"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {content?.sectionTitle ?? "What We Do"}
          </h2>
          <div className="flex items-center justify-center mb-12 scroll-animate">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-royal-300" />
            <div className="w-2 h-2 rotate-45 bg-gold-500 mx-3" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-royal-300" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayServices.map((service, i) => (
              <div
                key={service._id}
                className={`scroll-animate stagger-${i + 1} p-6 bg-white border border-royal-100 rounded-xl hover:shadow-lg hover:shadow-royal-100/50 hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-royal-500 to-royal-700 flex items-center justify-center text-xl mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-medium text-royal-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-warm-600">{service.shortDescription}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Video Section */}
      {featuredVideo && (
        <section className="py-24 bg-gradient-to-br from-royal-50 via-warm-50 to-gold-50/20">
          <div className="max-w-4xl mx-auto px-6">
            <h2
              className="text-3xl font-semibold text-royal-900 mb-4 text-center scroll-animate"
              style={{ fontFamily: "var(--font-display)" }}
            >
              See Us in Action
            </h2>
            <div className="flex items-center justify-center mb-10 scroll-animate">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-royal-300" />
              <div className="w-2 h-2 rotate-45 bg-gold-500 mx-3" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-royal-300" />
            </div>
            <div className="scroll-animate aspect-video rounded-xl overflow-hidden shadow-xl">
              <video
                src={featuredVideo.video_url}
                poster={featuredVideo.thumbnail_url || undefined}
                controls
                className="w-full h-full object-cover"
              />
            </div>
            {featuredVideo.title && (
              <p className="mt-4 text-center text-warm-600 text-lg scroll-animate">
                {featuredVideo.title}
              </p>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-royal-950 via-royal-900 to-royal-950 text-white relative overflow-hidden">
        <GradientOrb className="w-64 h-64 -top-10 -right-10 opacity-50" color="gold" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2
            className="text-3xl font-semibold mb-6 scroll-animate"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {content?.ctaHeading ?? "Ready to Create Something"}{" "}
            <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
              {content?.ctaHeadingAccent ?? "Beautiful"}
            </span>
            ?
          </h2>
          <p className="text-royal-300 text-lg mb-8 scroll-animate">
            {content?.ctaSubheading ?? "Tell us about your vision. We'll make it happen."}
          </p>
          <Link
            href="/contact"
            className="scroll-animate inline-block bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-gold-500/25 transition-all duration-300"
          >
            {content?.ctaButtonText ?? "Get in Touch"}
          </Link>
        </div>
      </section>
    </ScrollAnimationWrapper>
  );
}
