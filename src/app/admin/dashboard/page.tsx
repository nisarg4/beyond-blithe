"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const eventTypes = [
  "Wedding",
  "Proposal",
  "Baby Shower",
  "Birthday",
  "Corporate Event",
  "Other",
];

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [uploadForm, setUploadForm] = useState({
    eventType: "",
    caption: "",
  });
  const [videoUploadForm, setVideoUploadForm] = useState({
    eventType: "",
    title: "",
    isFeatured: false,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedVideoFile, setSelectedVideoFile] = useState<File | null>(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    checkAuth();
    fetchImages();
    fetchVideos();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/admin/login");
    } else {
      setIsLoading(false);
    }
  };

  const fetchImages = async () => {
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false });
    setImages(data || []);
  };

  const fetchVideos = async () => {
    const { data } = await supabase
      .from("gallery_videos")
      .select("*")
      .order("created_at", { ascending: false });
    setVideos(data || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !uploadForm.eventType) return;

    setIsUploading(true);
    setMessage({ type: "", text: "" });

    try {
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("gallery")
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase.from("gallery_images").insert({
        image_url: urlData.publicUrl,
        event_type: uploadForm.eventType,
        caption: uploadForm.caption || null,
      });

      if (dbError) throw dbError;

      setMessage({ type: "success", text: "Image uploaded successfully!" });
      setSelectedFile(null);
      setUploadForm({ eventType: "", caption: "" });
      fetchImages();
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsUploading(false);
    }
  };

  const handleVideoUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVideoFile) return;

    setIsUploadingVideo(true);
    setMessage({ type: "", text: "" });

    try {
      const fileExt = selectedVideoFile.name.split(".").pop();
      const fileName = `videos/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, selectedVideoFile);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("gallery")
        .getPublicUrl(fileName);

      // If marking as featured, unset any existing featured video first
      if (videoUploadForm.isFeatured) {
        await supabase
          .from("gallery_videos")
          .update({ is_featured: false })
          .eq("is_featured", true);
      }

      const { error: dbError } = await supabase.from("gallery_videos").insert({
        video_url: urlData.publicUrl,
        title: videoUploadForm.title || null,
        event_type: videoUploadForm.eventType || null,
        is_featured: videoUploadForm.isFeatured,
      });

      if (dbError) throw dbError;

      setMessage({ type: "success", text: "Video uploaded successfully!" });
      setSelectedVideoFile(null);
      setVideoUploadForm({ eventType: "", title: "", isFeatured: false });
      fetchVideos();
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsUploadingVideo(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const fileName = imageUrl.split("/").pop();

      if (fileName) {
        await supabase.storage.from("gallery").remove([fileName]);
      }

      await supabase.from("gallery_images").delete().eq("id", id);

      fetchImages();
      setMessage({ type: "success", text: "Image deleted successfully!" });
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    }
  };

  const handleDeleteVideo = async (id: string, videoUrl: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return;

    try {
      // Extract path after the bucket name from the URL
      const url = new URL(videoUrl);
      const pathParts = url.pathname.split("/storage/v1/object/public/gallery/");
      const storagePath = pathParts[1];

      if (storagePath) {
        await supabase.storage.from("gallery").remove([storagePath]);
      }

      await supabase.from("gallery_videos").delete().eq("id", id);

      fetchVideos();
      setMessage({ type: "success", text: "Video deleted successfully!" });
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    }
  };

  const toggleFeatured = async (id: string, currentlyFeatured: boolean) => {
    try {
      if (!currentlyFeatured) {
        // Unset any existing featured video first
        await supabase
          .from("gallery_videos")
          .update({ is_featured: false })
          .eq("is_featured", true);
      }

      await supabase
        .from("gallery_videos")
        .update({ is_featured: !currentlyFeatured })
        .eq("id", id);

      fetchVideos();
      setMessage({
        type: "success",
        text: !currentlyFeatured
          ? "Video set as featured on homepage!"
          : "Video removed from homepage.",
      });
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-100 flex items-center justify-center">
        <p className="text-warm-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-100">
      {/* Header */}
      <header className="bg-white border-b border-warm-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold text-royal-900">Beyond Blithe Admin</h1>
          <div className="flex items-center gap-4">
            <Link href="/admin/inquiries" className="text-warm-600 hover:text-royal-700">
              Inquiries
            </Link>
            <button
              onClick={handleLogout}
              className="text-warm-600 hover:text-royal-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Message */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Image Upload Form */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-royal-900 mb-4">Upload New Image</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-1">
                  Image File *
                </label>
                <label className="flex items-center gap-2 px-3 py-2 border border-warm-300 rounded-lg cursor-pointer hover:border-royal-400 hover:bg-royal-50 transition-colors">
                  <span className="bg-royal-700 text-white text-sm px-3 py-1 rounded font-medium shrink-0">
                    Choose File
                  </span>
                  <span className="text-sm text-warm-500 truncate">
                    {selectedFile ? selectedFile.name : "No file selected"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="sr-only"
                    required
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-1">
                  Event Type *
                </label>
                <select
                  value={uploadForm.eventType}
                  onChange={(e) => setUploadForm({ ...uploadForm, eventType: e.target.value })}
                  className="w-full px-3 py-2 border border-warm-300 rounded-lg"
                  required
                >
                  <option value="">Select type</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-1">
                  Caption
                </label>
                <input
                  type="text"
                  value={uploadForm.caption}
                  onChange={(e) => setUploadForm({ ...uploadForm, caption: e.target.value })}
                  className="w-full px-3 py-2 border border-warm-300 rounded-lg"
                  placeholder="Optional caption"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isUploading || !selectedFile}
              className="bg-royal-700 text-white px-6 py-2 rounded-lg hover:bg-royal-600 disabled:bg-warm-400"
            >
              {isUploading ? "Uploading..." : "Upload Image"}
            </button>
          </form>
        </div>

        {/* Video Upload Form */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-royal-900 mb-4">Upload New Video</h2>
          <form onSubmit={handleVideoUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-1">
                  Video File *
                </label>
                <label className="flex items-center gap-2 px-3 py-2 border border-warm-300 rounded-lg cursor-pointer hover:border-royal-400 hover:bg-royal-50 transition-colors">
                  <span className="bg-royal-700 text-white text-sm px-3 py-1 rounded font-medium shrink-0">
                    Choose File
                  </span>
                  <span className="text-sm text-warm-500 truncate">
                    {selectedVideoFile ? selectedVideoFile.name : "No file selected"}
                  </span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setSelectedVideoFile(e.target.files?.[0] || null)}
                    className="sr-only"
                    required
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={videoUploadForm.title}
                  onChange={(e) => setVideoUploadForm({ ...videoUploadForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-warm-300 rounded-lg"
                  placeholder="Optional title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-700 mb-1">
                  Event Type
                </label>
                <select
                  value={videoUploadForm.eventType}
                  onChange={(e) => setVideoUploadForm({ ...videoUploadForm, eventType: e.target.value })}
                  className="w-full px-3 py-2 border border-warm-300 rounded-lg"
                >
                  <option value="">Select type</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={videoUploadForm.isFeatured}
                    onChange={(e) => setVideoUploadForm({ ...videoUploadForm, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded border-warm-300 text-royal-700 focus:ring-royal-500"
                  />
                  <span className="text-sm font-medium text-warm-700">Feature on homepage</span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              disabled={isUploadingVideo || !selectedVideoFile}
              className="bg-royal-700 text-white px-6 py-2 rounded-lg hover:bg-royal-600 disabled:bg-warm-400"
            >
              {isUploadingVideo ? "Uploading..." : "Upload Video"}
            </button>
          </form>
        </div>

        {/* Gallery Images Grid */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-royal-900 mb-4">
            Gallery Images ({images.length})
          </h2>
          {images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.image_url}
                    alt={image.caption || image.event_type}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center gap-2">
                    <span className="text-white text-sm">{image.event_type}</span>
                    <button
                      onClick={() => handleDelete(image.id, image.image_url)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-warm-500 text-center py-8">
              No images yet. Upload your first image above.
            </p>
          )}
        </div>

        {/* Gallery Videos Grid */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-lg font-semibold text-royal-900 mb-4">
            Gallery Videos ({videos.length})
          </h2>
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {videos.map((video) => (
                <div key={video.id} className="relative group">
                  <div className="aspect-video rounded-lg overflow-hidden bg-warm-200">
                    <video
                      src={video.video_url}
                      className="w-full h-full object-cover"
                      muted
                      preload="metadata"
                    />
                  </div>
                  {/* Info bar */}
                  <div className="mt-2 flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-royal-900 truncate">
                        {video.title || "Untitled"}
                      </p>
                      {video.event_type && (
                        <p className="text-xs text-warm-500">{video.event_type}</p>
                      )}
                    </div>
                    {video.is_featured && (
                      <span className="text-xs bg-gold-100 text-gold-700 px-2 py-0.5 rounded-full font-medium shrink-0 ml-2">
                        Featured
                      </span>
                    )}
                  </div>
                  {/* Hover overlay on video thumbnail */}
                  <div className="absolute top-0 left-0 right-0 aspect-video bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center gap-2">
                    <button
                      onClick={() => toggleFeatured(video.id, !!video.is_featured)}
                      className={`px-3 py-1 rounded text-sm ${
                        video.is_featured
                          ? "bg-gold-500 text-white hover:bg-gold-600"
                          : "bg-white text-royal-900 hover:bg-warm-100"
                      }`}
                    >
                      {video.is_featured ? "Unfeature" : "Feature on Homepage"}
                    </button>
                    <button
                      onClick={() => handleDeleteVideo(video.id, video.video_url)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-warm-500 text-center py-8">
              No videos yet. Upload your first video above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
