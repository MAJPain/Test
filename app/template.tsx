"use client";

import { motion } from "framer-motion";

/**
 * app/template.tsx re-mounts on every navigation, so it's the natural home for
 * page-transition motion. A brief fade + rise gives routes a cohesive feel;
 * a navy panel wipes up over the outgoing page.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>

      {/* Transition curtain */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[70] origin-bottom bg-navy"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      />
    </>
  );
}
