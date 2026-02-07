import { supabase } from "@/lib/supabase";
import Link from "next/link";

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

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Gallery() {
  const images = await getGalleryImages();
  const videos = await getGalleryVideos();

  const eventTypes = ["All", ...new Set(images.map((img) => img.event_type))];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-stone-800 mb-6">
            Our Work
          </h1>
          <p className="text-xl text-stone-600">
            Moments we&apos;ve had the honor of creating.
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
                  <div className="aspect-square rounded-lg overflow-hidden relative">
                    <img
                      src={image.image_url}
                      alt={image.caption || image.event_type}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                      <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
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
              <p className="text-stone-500 mb-4">
                Gallery coming soon. We&apos;re adding our best work.
              </p>
              <p className="text-stone-600">
                In the meantime, check out our{" "}
                <a
                  href="https://www.instagram.com/beyondblithe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-800 underline"
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
        <section className="py-24 bg-stone-100">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-semibold text-stone-800 mb-8 text-center">
              Event Highlights
            </h2>
            <div className="space-y-8">
              {videos.map((video) => (
                <div key={video.id} className="aspect-video rounded-lg overflow-hidden">
                  <video
                    src={video.video_url}
                    poster={video.thumbnail_url || undefined}
                    controls
                    className="w-full h-full object-cover"
                  />
                  {video.title && (
                    <p className="mt-2 text-center text-stone-600">{video.title}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-stone-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Want Your Event Featured Here?
          </h2>
          <p className="text-stone-300 text-lg mb-8">
            Let&apos;s create something beautiful together.
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
