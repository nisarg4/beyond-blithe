"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Inquiry = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  event_type: string;
  event_type_other: string | null;
  event_date: string | null;
  guest_count: number | null;
  hear_about_us: string;
  hear_about_us_other: string | null;
  message: string;
  status: string;
};

export default function AdminInquiries() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    checkAuth();
    fetchInquiries();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/admin/login");
    } else {
      setIsLoading(false);
    }
  };

  const fetchInquiries = async () => {
    const { data } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    setInquiries(data || []);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("inquiries").update({ status }).eq("id", id);
    fetchInquiries();
    if (selectedInquiry?.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusColors: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    contacted: "bg-yellow-100 text-yellow-700",
    booked: "bg-green-100 text-green-700",
    archived: "bg-stone-100 text-stone-700",
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
            <Link href="/admin/dashboard" className="text-stone-600 hover:text-stone-800">
              Gallery
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
        <h2 className="text-lg font-semibold text-stone-800 mb-4">
          Inquiries ({inquiries.length})
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inquiries List */}
          <div className="bg-white rounded-lg overflow-hidden">
            {inquiries.length > 0 ? (
              <div className="divide-y divide-stone-200">
                {inquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    onClick={() => setSelectedInquiry(inquiry)}
                    className={`p-4 cursor-pointer hover:bg-stone-50 ${
                      selectedInquiry?.id === inquiry.id ? "bg-stone-50" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-stone-800">{inquiry.name}</span>
                      <span className={`text-xs px-2 py-1 rounded ${statusColors[inquiry.status]}`}>
                        {inquiry.status}
                      </span>
                    </div>
                    <p className="text-sm text-stone-600">{inquiry.event_type}</p>
                    <p className="text-xs text-stone-400">{formatDate(inquiry.created_at)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-stone-500 text-center py-8">No inquiries yet.</p>
            )}
          </div>

          {/* Inquiry Detail */}
          <div className="bg-white rounded-lg p-6">
            {selectedInquiry ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-stone-800">
                    {selectedInquiry.name}
                  </h3>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => updateStatus(selectedInquiry.id, e.target.value)}
                    className={`text-sm px-3 py-1 rounded border-0 ${statusColors[selectedInquiry.status]}`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="booked">Booked</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-stone-500">Email:</span>{" "}
                    <a href={`mailto:${selectedInquiry.email}`} className="text-stone-800 underline">
                      {selectedInquiry.email}
                    </a>
                  </div>
                  {selectedInquiry.phone && (
                    <div>
                      <span className="text-stone-500">Phone:</span>{" "}
                      <a href={`tel:${selectedInquiry.phone}`} className="text-stone-800">
                        {selectedInquiry.phone}
                      </a>
                    </div>
                  )}
                  <div>
                    <span className="text-stone-500">Event Type:</span>{" "}
                    <span className="text-stone-800">
                      {selectedInquiry.event_type}
                      {selectedInquiry.event_type_other && ` - ${selectedInquiry.event_type_other}`}
                    </span>
                  </div>
                  {selectedInquiry.event_date && (
                    <div>
                      <span className="text-stone-500">Event Date:</span>{" "}
                      <span className="text-stone-800">{selectedInquiry.event_date}</span>
                    </div>
                  )}
                  {selectedInquiry.guest_count && (
                    <div>
                      <span className="text-stone-500">Guests:</span>{" "}
                      <span className="text-stone-800">{selectedInquiry.guest_count}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-stone-500">Found us via:</span>{" "}
                    <span className="text-stone-800">
                      {selectedInquiry.hear_about_us}
                      {selectedInquiry.hear_about_us_other && ` - ${selectedInquiry.hear_about_us_other}`}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500">Submitted:</span>{" "}
                    <span className="text-stone-800">{formatDate(selectedInquiry.created_at)}</span>
                  </div>
                  <div className="pt-3 border-t border-stone-200">
                    <span className="text-stone-500 block mb-1">Message:</span>
                    <p className="text-stone-800 whitespace-pre-wrap">{selectedInquiry.message}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-stone-500 text-center py-8">
                Select an inquiry to view details
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
