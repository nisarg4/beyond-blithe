"use client";

export function FloatingSparkles() {
  const sparkles = [
    { top: "10%", left: "15%", size: 4, delay: "0s", duration: "3s", color: "bg-gold-400/40" },
    { top: "20%", left: "80%", size: 3, delay: "0.5s", duration: "3.5s", color: "bg-royal-300/30" },
    { top: "60%", left: "10%", size: 3, delay: "1s", duration: "4s", color: "bg-gold-300/30" },
    { top: "70%", left: "85%", size: 5, delay: "1.5s", duration: "3s", color: "bg-royal-400/40" },
    { top: "40%", left: "90%", size: 3, delay: "2s", duration: "3.5s", color: "bg-gold-400/30" },
    { top: "80%", left: "20%", size: 4, delay: "0.8s", duration: "4s", color: "bg-royal-300/20" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparkles.map((s, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${s.color} animate-float`}
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        />
      ))}
    </div>
  );
}

export function GradientOrb({
  className = "",
  color = "royal",
}: {
  className?: string;
  color?: "royal" | "gold";
}) {
  const gradient =
    color === "royal"
      ? "from-royal-600/20 to-royal-400/5"
      : "from-gold-400/20 to-gold-300/5";

  return (
    <div
      className={`absolute rounded-full bg-gradient-to-br ${gradient} blur-3xl pointer-events-none ${className}`}
    />
  );
}

export function DecorativeDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-royal-300" />
      <div className="w-2 h-2 rotate-45 bg-gold-500" />
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-royal-300" />
    </div>
  );
}
