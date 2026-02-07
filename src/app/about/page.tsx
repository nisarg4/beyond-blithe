export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-stone-800 mb-6">
            About Beyond Blithe
          </h1>
          <p className="text-xl text-stone-600">
            More than event planners. We&apos;re your partners in celebration.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-stone-800 mb-6">Our Story</h2>
          <div className="prose prose-stone prose-lg">
            <p>
              Beyond Blithe was born from a simple belief: every celebration deserves
              the care and attention of a family gathering.
            </p>
            <p>
              Based in Toronto, we&apos;ve had the privilege of being part of countless
              special moments - from intimate proposals to grand wedding celebrations,
              from joyful baby showers to milestone birthdays.
            </p>
            <p>
              What sets us apart? We don&apos;t just plan events. We become invested in
              your story. When you work with us, you&apos;re not hiring a vendor -
              you&apos;re gaining a dedicated partner who treats your celebration
              like their own.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-stone-800 mb-12 text-center">
            What We Believe In
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-lg font-medium text-stone-800 mb-2">Personal Touch</h3>
              <p className="text-stone-600">
                Every family is unique. Every event should reflect that.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-stone-800 mb-2">Attention to Detail</h3>
              <p className="text-stone-600">
                The little things make the big moments unforgettable.
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium text-stone-800 mb-2">Stress-Free Experience</h3>
              <p className="text-stone-600">
                You enjoy the moment. We handle everything else.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
