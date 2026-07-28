"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { Testimonial } from "@/data/types";
import { pad } from "@/lib/utils";

/**
 * Section 05 — a quiet, oversized quote rotator on a navy field.
 * Clicking a name switches the active testimonial with a soft cross-fade.
 */
export default function Testimonials({ items }: { items: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <section className="bg-navy py-24 text-offwhite md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-16">
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold tracking-[0.2em] text-brown">
            05
          </span>
          <span className="h-px w-12 bg-brown" />
          <span className="eyebrow text-offwhite/50">In Their Words</span>
        </div>

        <div className="mt-14 grid gap-16 lg:grid-cols-[1fr_auto] lg:gap-24">
          {/* Quote */}
          <div className="min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-[clamp(1.6rem,3.4vw,3rem)] font-bold leading-[1.15] tracking-tight">
                  <span className="text-brown">“</span>
                  {current.quote}
                  <span className="text-brown">”</span>
                </p>
                <footer className="mt-10">
                  <p className="text-lg font-bold">{current.author}</p>
                  <p className="mt-1 text-sm text-offwhite/50">
                    {current.role} — {current.location}
                  </p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Selector */}
          <div className="flex flex-row gap-8 lg:flex-col lg:gap-6">
            {items.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActive(i)}
                className="group flex items-center gap-3 text-left"
              >
                <span
                  className={`text-[0.7rem] font-semibold tracking-[0.2em] transition-colors ${
                    i === active ? "text-brown" : "text-offwhite/30"
                  }`}
                >
                  {pad(i + 1)}
                </span>
                <span
                  className={`text-sm font-semibold uppercase tracking-[0.1em] transition-colors ${
                    i === active
                      ? "text-offwhite"
                      : "text-offwhite/30 group-hover:text-offwhite/60"
                  }`}
                >
                  {t.author.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
