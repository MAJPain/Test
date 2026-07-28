"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
} as const;

/**
 * Splits a heading into words and staggers each one up into view on scroll.
 * Renders as any heading tag via the `as` prop; words wrap naturally.
 */
export default function AnimatedHeading({
  text,
  as = "h2",
  className,
  delay = 0,
  wordClassName,
}: {
  text: string;
  as?: keyof typeof TAGS;
  className?: string;
  delay?: number;
  wordClassName?: string;
}) {
  const words = text.split(" ");
  const Tag = TAGS[as];

  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12% 0px" }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-top"
          aria-hidden
        >
          <motion.span
            className={cn("inline-block", wordClassName)}
            variants={{
              hidden: { y: "110%" },
              visible: { y: 0 },
            }}
            // Explicit per-word delay — robust against wrapper elements that
            // would otherwise interrupt staggerChildren propagation.
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.08,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
