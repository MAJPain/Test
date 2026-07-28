"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

import type { Property } from "@/data/types";
import { formatPrice } from "@/lib/utils";
import RevealImage from "@/components/RevealImage";
import MagneticButton from "@/components/MagneticButton";

/**
 * Viewport-filling hero. The featured property's photograph sits behind an
 * oversized wordmark; both drift at different speeds as you scroll (parallax).
 */
export default function Hero({ property }: { property: Property }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-navy"
    >
      {/* Parallax image */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        <RevealImage
          src={property.images[0]}
          alt={property.name}
          fill
          priority
          sizes="100vw"
          wrapperClassName="h-full w-full"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/20 to-navy/90" />
      </motion.div>

      {/* Eyebrow */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute inset-x-0 top-28 z-10 flex justify-center md:top-32"
      >
        <span className="eyebrow text-offwhite/70">
          Curated Residences · Est. 2004
        </span>
      </motion.div>

      {/* Oversized title */}
      <motion.div
        style={{ y: titleY }}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-[clamp(3rem,13vw,12rem)] font-black uppercase leading-[0.85] tracking-tightest text-offwhite"
        >
          Live
          <br />
          Rare
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="mt-8 max-w-md text-sm leading-relaxed text-offwhite/70 md:text-base"
        >
          We represent the residences that are spoken of in the singular — the
          only one of their kind, for the few who recognise it.
        </motion.p>
      </motion.div>

      {/* Featured property tag (bottom-left) */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-10 left-6 z-10 hidden max-w-xs md:left-16 md:block"
      >
        <p className="eyebrow text-brown">Featured</p>
        <Link
          href={`/properties/${property.slug}`}
          data-cursor="View"
          className="mt-3 block"
        >
          <h2 className="text-2xl font-bold tracking-tight text-offwhite">
            {property.name}
          </h2>
          <p className="mt-1 text-sm text-offwhite/60">
            {property.city}, {property.region} · {formatPrice(property.price)}
          </p>
        </Link>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-10 right-6 z-10 md:right-16"
      >
        <MagneticButton>
          <div className="flex flex-col items-center gap-3 text-offwhite/70">
            <span className="text-[0.6rem] uppercase tracking-eyebrow [writing-mode:vertical-rl]">
              Scroll
            </span>
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <ArrowDown className="h-4 w-4" />
            </motion.span>
          </div>
        </MagneticButton>
      </motion.div>
    </section>
  );
}
