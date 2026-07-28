"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * First-visit intro. The brand mark sits centred on a navy field, a hairline
 * rule draws across it, then the whole panel lifts away to reveal the site.
 * Shown once per browser session (sessionStorage guard).
 */
export default function LoadingScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("mn-intro-seen")) return;
    setShow(true);
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => {
      sessionStorage.setItem("mn-intro-seen", "1");
      setShow(false);
      document.body.style.overflow = "";
    }, 2400);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-navy"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[clamp(2.5rem,8vw,6rem)] font-black uppercase leading-none tracking-tightest text-offwhite">
              Maison
              <span className="text-brown">.</span>
            </span>
          </motion.div>

          <motion.div
            className="mt-6 h-px bg-brown"
            initial={{ width: 0 }}
            animate={{ width: "min(60vw, 420px)" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />

          <motion.span
            className="mt-6 text-[0.65rem] uppercase tracking-eyebrow text-offwhite/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Curated Residences
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
