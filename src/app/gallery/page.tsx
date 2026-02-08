import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { GradientOrb } from "@/components/DecorativeElements";
import { getGalleryPage } from "@/sanity/queries";

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
  const [images, videos, content] = await Promise.all([
    getGalleryImages(),
    getGalleryVideos(),
    getGalleryPage(),
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
              <p className="text-warm-600">
                In the meantime, check out our{" "}
                <a
                  href="https://www.instagram.com/beyondblithe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-royal-700 underline"
                >
                  Instagram @beyondblithe
                </a>
              </p>
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
