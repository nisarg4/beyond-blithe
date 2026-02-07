import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Beyond Blithe</h3>
            <p className="text-sm leading-relaxed">
              Creating memorable moments for families in Toronto.
              We treat every event like it&apos;s our own.
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
              <li>Toronto, Canada</li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Get in Touch
                </Link>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/beyondblithe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @beyondblithe
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Beyond Blithe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
