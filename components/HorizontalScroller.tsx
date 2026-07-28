"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import type { Property } from "@/data/types";
import { formatPrice, pad } from "@/lib/utils";
import RevealImage from "./RevealImage";

/**
 * Vertical scroll is translated into horizontal movement across a row of
 * full-height property panels. The section is pinned while the row travels.
 */
export default function HorizontalScroller({
  properties,
}: {
  properties: Property[];
}) {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // Travel distance leaves the first and last panels comfortably framed.
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-82%"]);

  return (
    <section
      ref={targetRef}
      className="relative bg-navy text-offwhite"
      style={{ height: `${properties.length * 90}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 pl-6 md:gap-10 md:pl-16">
          {/* Intro panel */}
          <div className="flex h-[72vh] w-[70vw] shrink-0 flex-col justify-between md:w-[38vw]">
            <span className="eyebrow text-brown">02 — Featured</span>
            <div>
              <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.95] tracking-tightest">
                The
                <br />
                Collection
              </h2>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-offwhite/60">
                A rotating selection of the residences we are most proud to
                represent this season. Scroll to move through them.
              </p>
            </div>
          </div>

          {properties.map((property, i) => (
            <Link
              key={property.id}
              href={`/properties/${property.slug}`}
              data-cursor="View"
              className="group relative flex h-[72vh] w-[80vw] shrink-0 overflow-hidden md:w-[42vw]"
            >
              <div className="h-full w-full transition-transform [transition-duration:1200ms] ease-editorial group-hover:scale-105">
                <RevealImage
                  src={property.images[0]}
                  alt={property.name}
                  fill
                  sizes="(max-width: 768px) 80vw, 42vw"
                  wrapperClassName="h-full w-full"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />

              <span className="absolute right-6 top-6 text-sm font-semibold tracking-[0.2em] text-offwhite">
                {pad(i + 1)}
              </span>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
                <div>
                  <p className="eyebrow text-brown">
                    {property.city}, {property.region}
                  </p>
                  <h3 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                    {property.name}
                  </h3>
                  <p className="mt-2 text-lg font-semibold text-offwhite/90">
                    {formatPrice(property.price)}
                  </p>
                </div>
                <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-offwhite/30 transition-colors duration-500 group-hover:border-brown group-hover:bg-brown">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
