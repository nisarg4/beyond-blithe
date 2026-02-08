import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { GradientOrb } from "@/components/DecorativeElements";
import { getGalleryPage, getSiteSettings } from "@/sanity/queries";

type GalleryImage = {
  id: string;
  image_url: string;
  event_type: string;
  caption: string | null;
};

type GalleryVideo = {
  id: string;
  video_url: string;
  thumbnail_url: string | null;
  title: string | null;
  event_type: string | null;
};

async function getGalleryImages() {
  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching images:", error);
    return [];
  }
  return data as GalleryImage[];
}

async function getGalleryVideos() {
  const { data, error } = await supabase
    .from("gallery_videos")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
  return data as GalleryVideo[];
}

export const revalidate = 60;

export default async function Gallery() {
  const [images, videos, content, settings] = await Promise.all([
    getGalleryImages(),
    getGalleryVideos(),
    getGalleryPage(),
    getSiteSettings(),
  ]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-royal-100 via-warm-50 to-gold-50/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1
            className="text-4xl md:text-5xl font-semibold text-royal-900 mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {content?.heroTitle ?? "Our Work"}
          </h1>
          <p className="text-xl text-warm-600">
            {content?.heroSubtitle ?? "Moments we've had the honor of creating."}
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <div key={image.id} className="group cursor-pointer">
                  <div className="aspect-square rounded-xl overflow-hidden relative border-2 border-transparent hover:border-gold-400 transition-colors duration-300">
                    <img
                      src={image.image_url}
                      alt={image.caption || image.event_type}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-royal-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="p-4 text-white">
                        <span className="text-sm font-medium">{image.event_type}</span>
                        {image.caption && (
                          <p className="text-sm text-white/80">{image.caption}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-warm-500 mb-4">
                {content?.emptyStateText ?? "Gallery coming soon. We're adding our best work."}
              </p>
              <p className="text-warm-600 mb-4">
                In the meantime, find us on social media:
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
          )}
        </div>
      </section>

      {/* Video Section */}
      {videos.length > 0 && (
        <section className="py-24 bg-gradient-to-br from-royal-50 via-warm-50 to-gold-50/20">
          <div className="max-w-4xl mx-auto px-6">
            <h2
              className="text-2xl font-semibold text-royal-900 mb-8 text-center"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Event Highlights
            </h2>
            <div className="space-y-8">
              {videos.map((video) => (
                <div key={video.id} className="aspect-video rounded-xl overflow-hidden">
                  <video
                    src={video.video_url}
                    poster={video.thumbnail_url || undefined}
                    controls
                    className="w-full h-full object-cover"
                  />
                  {video.title && (
                    <p className="mt-2 text-center text-warm-600">{video.title}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-royal-950 via-royal-900 to-royal-950 text-white relative overflow-hidden">
        <GradientOrb className="w-64 h-64 -top-10 -right-10 opacity-50" color="gold" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2
            className="text-3xl font-semibold mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {content?.ctaHeading ?? "Want Your Event Featured Here?"}
          </h2>
          <p className="text-royal-300 text-lg mb-8">
            {content?.ctaSubtitle ?? "Let's create something beautiful together."}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-gold-500/25 transition-all duration-300"
          >
            {content?.ctaButtonText ?? "Get in Touch"}
          </Link>
        </div>
      </section>
    </div>
  );
}
