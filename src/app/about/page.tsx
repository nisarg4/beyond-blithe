import { PortableText } from "@portabletext/react";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import { DecorativeDivider } from "@/components/DecorativeElements";
import { getAboutPage } from "@/sanity/queries";

export default async function About() {
  const content = await getAboutPage();

  const fallbackValues = [
    { title: "Personal Touch", description: "Every family is unique. Every event should reflect that." },
    { title: "Attention to Detail", description: "The little things make the big moments unforgettable." },
    { title: "Stress-Free Experience", description: "You enjoy the moment. We handle everything else." },
  ];

  const values = content?.values?.length ? content.values : fallbackValues;

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
              {content?.heroTitle ?? "About Beyond Blithe"}
            </h1>
            <p className="text-xl text-warm-600 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              {content?.heroSubtitle ?? "More than event planners. We're your partners in celebration."}
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-6">
            <h2
              className="text-2xl font-semibold text-royal-900 mb-2 scroll-animate"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {content?.storyTitle ?? "Our Story"}
            </h2>
            <div className="scroll-animate mb-6">
              <DecorativeDivider />
            </div>
            <div className="prose prose-lg scroll-animate">
              {content?.storyContent ? (
                <PortableText
                  value={content.storyContent}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="text-warm-700">{children}</p>
                      ),
                    },
                  }}
                />
              ) : (
                <>
                  <p className="text-warm-700">
                    Beyond Blithe was born from a simple belief: every celebration deserves
                    the care and attention of a family gathering.
                  </p>
                  <p className="text-warm-700">
                    Based in Toronto, we&apos;ve had the privilege of being part of countless
                    special moments - from intimate proposals to grand wedding celebrations,
                    from joyful baby showers to milestone birthdays.
                  </p>
                  <p className="text-warm-700">
                    What sets us apart? We don&apos;t just plan events. We become invested in
                    your story. When you work with us, you&apos;re not hiring a vendor -
                    you&apos;re gaining a dedicated partner who treats your celebration
                    like their own.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-gradient-to-br from-royal-50 via-warm-50 to-gold-50/20">
          <div className="max-w-4xl mx-auto px-6">
            <h2
              className="text-2xl font-semibold text-royal-900 mb-12 text-center scroll-animate"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {content?.valuesTitle ?? "What We Believe In"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, i) => (
                <div
                  key={value.title}
                  className={`scroll-animate stagger-${i + 1} text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-royal-100 hover:border-gold-300 transition-colors duration-300`}
                >
                  <h3 className="text-lg font-medium text-royal-900 mb-2">{value.title}</h3>
                  <p className="text-warm-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </ScrollAnimationWrapper>
  );
}
