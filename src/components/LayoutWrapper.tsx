"use client";

import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import Footer from "./Footer";
import type { SiteSettings } from "@/sanity/types";

export default function LayoutWrapper({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: SiteSettings | null;
}) {
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigation />
      <main className="pt-16">{children}</main>
      <Footer settings={settings} />
    </>
  );
}
