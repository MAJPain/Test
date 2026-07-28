"use client";

import Link from "next/link";

import type { Property } from "@/data/types";
import PropertyCard from "@/components/PropertyCard";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedHeading from "@/components/AnimatedHeading";
import { Button } from "@/components/ui/button";

/**
 * Section 03 — an intentionally asymmetric listings grid.
 * The first card is offset lower and the layout breaks the tidy 3-up rhythm.
 */
export default function CuratedListings({
  properties,
}: {
  properties: Property[];
}) {
  return (
    <section className="bg-offwhite py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-16">
        {/* Header */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold tracking-[0.2em] text-brown">
                03
              </span>
              <span className="h-px w-12 bg-brown" />
              <span className="eyebrow text-navy/60">Curated</span>
            </div>
            <AnimatedHeading
              text="Newly on the market."
              as="h2"
              className="mt-6 text-[clamp(2.2rem,6vw,5rem)] font-black uppercase leading-[0.95] tracking-tightest text-navy"
            />
          </div>

          <ScrollReveal>
            <Button asChild variant="ghost">
              <Link href="/properties" data-cursor="All">
                View All →
              </Link>
            </Button>
          </ScrollReveal>
        </div>

        {/* Asymmetric grid */}
        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property, i) => (
            <ScrollReveal
              key={property.id}
              delay={(i % 3) * 0.08}
              className={
                // Push the middle column down and the last one further for rhythm.
                i % 3 === 1
                  ? "lg:mt-24"
                  : i % 3 === 2
                    ? "lg:mt-12"
                    : ""
              }
            >
              <PropertyCard property={property} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
