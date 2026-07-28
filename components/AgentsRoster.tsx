"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

import type { Agent } from "@/data/types";
import { pad } from "@/lib/utils";

/**
 * Awards-style hover roster. On fine pointers, hovering a name floats that
 * advisor's portrait alongside the cursor. The list itself is the interface.
 */
export default function AgentsRoster({ agents }: { agents: Agent[] }) {
  const [active, setActive] = useState<number | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18 });
  const sy = useSpring(y, { stiffness: 180, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  return (
    <div className="relative" onMouseMove={onMove}>
      {/* Floating portrait (desktop only) */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-30 hidden h-72 w-56 overflow-hidden md:block"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-115%" }}
      >
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key={agents[active].id}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full w-full"
            >
              <Image
                src={agents[active].portrait}
                alt={agents[active].name}
                fill
                sizes="224px"
                className="object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* The list */}
      <ul className="border-t border-navy/15">
        {agents.map((agent, i) => (
          <li
            key={agent.id}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className="group border-b border-navy/15"
          >
            <div className="grid grid-cols-1 items-center gap-4 py-8 transition-colors md:grid-cols-[auto_1fr_auto_auto] md:gap-10 md:py-10">
              <span className="text-sm font-semibold tracking-[0.2em] text-brown">
                {pad(i + 1)}
              </span>

              <h3 className="text-[clamp(2rem,5vw,4.5rem)] font-black uppercase leading-none tracking-tightest text-navy transition-colors group-hover:text-brown">
                {agent.name}
              </h3>

              <p className="text-sm uppercase tracking-[0.15em] text-navy/50">
                {agent.title}
              </p>

              <p className="text-lg font-bold text-navy md:text-right">
                {agent.volume}
              </p>
            </div>

            {/* Mobile portrait */}
            <div className="relative mb-8 aspect-[16/10] w-full overflow-hidden md:hidden">
              <Image
                src={agent.portrait}
                alt={agent.name}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
