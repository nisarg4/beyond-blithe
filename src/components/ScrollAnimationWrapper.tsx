"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function ScrollAnimationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollRef = useScrollAnimation();
  return <div ref={scrollRef}>{children}</div>;
}
