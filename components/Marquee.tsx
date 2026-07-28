"use client";

import { cn } from "@/lib/utils";

/**
 * Infinite horizontal text strip. Duplicates its items so the CSS keyframe
 * translate of -50% loops seamlessly. Used as a divider between sections.
 */
export default function Marquee({
  items,
  reverse = false,
  className,
  separator = "✦",
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
  separator?: string;
}) {
  const row = [...items, ...items];

  return (
    <div
      className={cn(
        "flex w-full select-none overflow-hidden whitespace-nowrap",
        className
      )}
      aria-hidden
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-10 pr-10",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="text-[clamp(1.4rem,4vw,3rem)] font-black uppercase tracking-tightest">
              {item}
            </span>
            <span className="text-brown">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
