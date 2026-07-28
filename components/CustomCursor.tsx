"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * A circular follower that trails the pointer, inverts and scales when it
 * moves over anything interactive, and shows an optional label (data-cursor).
 * Only renders on fine-pointer devices; native cursor is hidden via CSS.
 */
export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Springy trailing motion for the outer ring.
  const ringX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.4 });

  const [active, setActive] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      const target = (e.target as HTMLElement)?.closest(
        "a, button, [role='button'], [data-hover], input, textarea, select"
      ) as HTMLElement | null;

      if (target) {
        setActive(true);
        setLabel(target.getAttribute("data-cursor"));
      } else {
        setActive(false);
        setLabel(null);
      }
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [x, y, visible]);

  if (!enabled) return null;

  return (
    <>
      {/* Precise dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 rounded-full bg-brown mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0, scale: active ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
      {/* Trailing ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[200] flex items-center justify-center rounded-full border border-offwhite mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: visible ? 1 : 0,
          width: active ? 88 : 36,
          height: active ? 88 : 36,
          backgroundColor: active
            ? "rgba(250,250,247,1)"
            : "rgba(250,250,247,0)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        {label && (
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-navy mix-blend-normal">
            {label}
          </span>
        )}
      </motion.div>
    </>
  );
}
