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
  const [images, setImages] = useState<any[]>([]);
  const [uploadForm, setUploadForm] = useState({
    eventType: "",
    caption: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    checkAuth();
    fetchImages();
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
      // Upload to storage
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("gallery")
        .getPublicUrl(fileName);

      // Save to database
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

  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      // Extract filename from URL
      const fileName = imageUrl.split("/").pop();

      // Delete from storage
      if (fileName) {
        await supabase.storage.from("gallery").remove([fileName]);
      }

      // Delete from database
      await supabase.from("gallery_images").delete().eq("id", id);

      fetchImages();
      setMessage({ type: "success", text: "Image deleted successfully!" });
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <p className="text-stone-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold text-stone-800">Beyond Blithe Admin</h1>
          <div className="flex items-center gap-4">
            <Link href="/admin/inquiries" className="text-stone-600 hover:text-stone-800">
              Inquiries
            </Link>
            <button
              onClick={handleLogout}
              className="text-stone-600 hover:text-stone-800"
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

        {/* Upload Form */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-stone-800 mb-4">Upload New Image</h2>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Image File *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Event Type *
                </label>
                <select
                  value={uploadForm.eventType}
                  onChange={(e) => setUploadForm({ ...uploadForm, eventType: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                  required
                >
                  <option value="">Select type</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                  Caption
                </label>
                <input
                  type="text"
                  value={uploadForm.caption}
                  onChange={(e) => setUploadForm({ ...uploadForm, caption: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg"
                  placeholder="Optional caption"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isUploading || !selectedFile}
              className="bg-stone-800 text-white px-6 py-2 rounded-lg hover:bg-stone-700 disabled:bg-stone-400"
            >
              {isUploading ? "Uploading..." : "Upload Image"}
            </button>
          </form>
        </div>

        {/* Gallery Grid */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-lg font-semibold text-stone-800 mb-4">
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
            <p className="text-stone-500 text-center py-8">
              No images yet. Upload your first image above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
