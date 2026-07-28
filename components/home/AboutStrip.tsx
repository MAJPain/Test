"use client";

import Link from "next/link";

import RevealImage from "@/components/RevealImage";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedHeading from "@/components/AnimatedHeading";
import { Button } from "@/components/ui/button";

/**
 * Split-screen brand strip: image left, editorial statement right.
 * Section 01 in the home-page sequence.
 */
export default function AboutStrip() {
  return (
    <section className="bg-offwhite py-24 md:py-36">
      <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-6 md:grid-cols-2 md:gap-20 md:px-16">
        {/* Image */}
        <ScrollReveal direction="right">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <RevealImage
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80"
              alt="A Maison Noire interior"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              wrapperClassName="h-full w-full"
            />
          </div>
        </ScrollReveal>

        {/* Copy */}
        <div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold tracking-[0.2em] text-brown">
              01
            </span>
            <span className="h-px w-12 bg-brown" />
            <span className="eyebrow text-navy/60">The Studio</span>
          </div>

          <AnimatedHeading
            text="A brokerage that reads like a magazine."
            as="h2"
            className="mt-8 text-[clamp(2rem,4.5vw,4rem)] font-bold leading-[1.02] tracking-tight text-navy"
          />

          <ScrollReveal delay={0.15}>
            <div className="mt-8 max-w-md space-y-5 text-base leading-relaxed text-navy/70">
              <p>
                Maison Noire was founded on the belief that extraordinary homes
                deserve extraordinary representation — copy written with care,
                photography treated as art, and advisors who negotiate like the
                stakes are personal, because they are.
              </p>
              <p>
                We take on fewer listings than any firm our size. Every one of
                them is a residence we would be proud to live in ourselves.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <div className="mt-10 flex flex-wrap items-center gap-10">
              <Stat value="$8.5B" label="Lifetime Sales" />
              <Stat value="20 yrs" label="Representing the Rare" />
              <Stat value="46" label="Record Sales" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.35} className="mt-12">
            <Button asChild variant="outline">
              <Link href="/about" data-cursor="Read">
                Our Story
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-3xl font-black tracking-tight text-navy">{value}</p>
      <p className="mt-1 text-[0.7rem] uppercase tracking-[0.15em] text-navy/50">
        {label}
      </p>
    </div>
  );
}
