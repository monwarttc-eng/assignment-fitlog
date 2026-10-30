"use client";
import { useState } from "react";
import { Dumbbell } from "lucide-react";

// Plain <img> with graceful fallback for missing/broken images.
export default function Img({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-panel text-neutral-600 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Dumbbell className="h-10 w-10" />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
