import Link from "next/link";
import type { SiteSettings } from "@/sanity/types";

export default function Footer({
  settings,
}: {
  settings: SiteSettings | null;
}) {
  return (
    <footer className="bg-royal-950 text-royal-200 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-royal-900/20 to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3
              className="text-xl font-semibold mb-4 bg-gradient-to-r from-gold-400 to-gold-300 bg-clip-text text-transparent"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {settings?.companyName ?? "Beyond Blithe"}
            </h3>
            <p className="text-sm leading-relaxed text-royal-300">
              {settings?.footerTagline ?? "Creating memorable moments for families in Toronto. We treat every event like it's our own."}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>Weddings</li>
              <li>Proposals</li>
              <li>Baby Showers</li>
              <li>Birthdays</li>
              <li>Corporate Events</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>{settings?.location ?? "Toronto, Canada"}</li>
              <li>
                <Link href="/contact" className="hover:text-gold-300 transition-colors">
                  Get in Touch
                </Link>
              </li>
              <li>
                <a
                  href={settings?.instagramUrl ?? "https://www.instagram.com/beyondblithe/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold-300 transition-colors"
                >
                  {settings?.instagramHandle ?? "@beyondblithe"}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-royal-800/50 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {settings?.companyName ?? "Beyond Blithe"}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
