"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import type { Property } from "@/data/types";
import { formatPrice, pad } from "@/lib/utils";
import RevealImage from "./RevealImage";

/**
 * Editorial listing card. On hover the whole card lifts, the image zooms,
 * and a "View Property" affordance plus price meta slide up from the base.
 */
export default function PropertyCard({
  property,
  index,
  sizes = "(max-width: 768px) 100vw, 45vw",
}: {
  property: Property;
  index?: number;
  sizes?: string;
}) {
  return (
    <Link
      href={`/properties/${property.slug}`}
      data-cursor="View"
      className="group block"
    >
      <motion.article
        whileHover={{ y: -10 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <div className="h-full w-full transition-transform [transition-duration:1200ms] ease-editorial group-hover:scale-[1.06]">
            <RevealImage
              src={property.images[0]}
              alt={property.name}
              fill
              sizes={sizes}
              wrapperClassName="h-full w-full"
            />
          </div>

          {/* Status tag */}
          <span className="absolute left-4 top-4 bg-offwhite/90 px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-navy backdrop-blur">
            {property.status}
          </span>

          {/* Index */}
          {typeof index === "number" && (
            <span className="absolute right-4 top-4 text-[0.65rem] font-semibold tracking-[0.2em] text-offwhite mix-blend-difference">
              {pad(index + 1)}
            </span>
          )}

          {/* Hover affordance */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-navy/95 px-5 py-4 backdrop-blur transition-transform duration-500 ease-editorial group-hover:translate-y-0">
            <span className="flex items-center justify-between text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-offwhite">
              View Property
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>

        {/* Meta */}
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow text-brown">
              {property.city}, {property.region}
            </p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-navy">
              {property.name}
            </h3>
          </div>
          <p className="whitespace-nowrap pt-1 text-lg font-bold text-navy">
            {formatPrice(property.price)}
          </p>
        </div>

        <div className="mt-3 flex gap-5 border-t border-navy/10 pt-3 text-xs uppercase tracking-[0.15em] text-navy/60">
          <span>{property.beds} Beds</span>
          <span>{property.baths} Baths</span>
          <span>{property.sqft.toLocaleString()} Sq Ft</span>
        </div>
      </motion.article>
    </Link>
  );
}
