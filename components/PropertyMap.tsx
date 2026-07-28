"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import type { Property } from "@/data/types";
import { formatPrice } from "@/lib/utils";

/**
 * A stylised, self-contained "map" — no external tile provider required.
 * Coordinates are normalised onto a decorative grid; each pin previews its
 * residence on hover and links through on click. It reads as a map without the
 * weight (or API keys) of a full mapping library.
 */
export default function PropertyMap({ properties }: { properties: Property[] }) {
  const [hovered, setHovered] = useState<string | null>(null);

  // Normalise coordinates into 6%–94% of the panel so nothing hugs the edge.
  const lats = properties.map((p) => p.coordinates.lat);
  const lngs = properties.map((p) => p.coordinates.lng);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const pos = (p: Property) => {
    const x =
      maxLng === minLng
        ? 50
        : 6 + ((p.coordinates.lng - minLng) / (maxLng - minLng)) * 88;
    const y =
      maxLat === minLat
        ? 50
        : 6 + ((maxLat - p.coordinates.lat) / (maxLat - minLat)) * 88;
    return { left: `${x}%`, top: `${y}%` };
  };

  return (
    <div className="relative h-[70vh] min-h-[520px] w-full overflow-hidden bg-navy">
      {/* Decorative grid + contours */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(#FAFAF7 1px, transparent 1px), linear-gradient(90deg, #FAFAF7 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 40%, #8B6B47 0, transparent 40%), radial-gradient(circle at 75% 65%, #1A3A5C 0, transparent 45%)",
        }}
      />

      <span className="absolute left-6 top-6 z-10 text-[0.65rem] uppercase tracking-eyebrow text-offwhite/40">
        Portfolio Map · {properties.length} Residences
      </span>

      {/* Pins */}
      {properties.map((p) => (
        <div
          key={p.id}
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
          style={pos(p)}
          onMouseEnter={() => setHovered(p.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <Link
            href={`/properties/${p.slug}`}
            data-cursor="View"
            className="group relative block"
          >
            {/* Pulse */}
            <span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-brown/30" />
            <span className="relative flex h-4 w-4 rotate-45 items-center justify-center border border-offwhite bg-brown transition-transform duration-300 group-hover:scale-125" />

            {/* Preview card */}
            <AnimatePresence>
              {hovered === p.id && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="absolute bottom-6 left-1/2 z-30 w-56 -translate-x-1/2 bg-offwhite p-3 shadow-2xl"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      fill
                      sizes="224px"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-2 text-sm font-bold text-navy">{p.name}</p>
                  <p className="text-xs text-navy/60">
                    {p.city} · {formatPrice(p.price)}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        </div>
      ))}
    </div>
  );
}
