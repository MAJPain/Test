"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { cn, pad } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/agents", label: "Agents" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the overlay whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[90] transition-colors duration-500 ease-editorial",
          scrolled || open ? "bg-navy/95 backdrop-blur-md" : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-16">
          {/* Wordmark */}
          <Link
            href="/"
            className="text-xl font-black uppercase tracking-tight text-offwhite"
            data-cursor="Home"
          >
            Maison<span className="text-brown">.</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-10 md:flex">
            {LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "link-underline text-xs font-semibold uppercase tracking-[0.15em] transition-colors",
                    active ? "text-brown" : "text-offwhite/80 hover:text-offwhite"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen((o) => !o)}
            data-cursor={open ? "Close" : "Menu"}
            aria-label="Toggle menu"
            className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden"
          >
            <span
              className={cn(
                "h-px w-6 bg-offwhite transition-transform duration-300",
                open && "translate-y-[3.5px] rotate-45"
              )}
            />
            <span
              className={cn(
                "h-px w-6 bg-offwhite transition-transform duration-300",
                open && "-translate-y-[3.5px] -rotate-45"
              )}
            />
          </button>
        </nav>
      </header>

      {/* Fullscreen overlay (mobile + a tap target on all sizes via the button) */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col justify-center bg-navy px-6 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex flex-col gap-2">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.6 }}
                >
                  <Link
                    href={link.href}
                    className="group flex items-baseline gap-4"
                  >
                    <span className="text-[0.65rem] font-semibold tracking-[0.2em] text-brown">
                      {pad(i + 1)}
                    </span>
                    <span className="text-5xl font-black uppercase tracking-tight text-offwhite transition-colors group-hover:text-brown">
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="absolute inset-x-6 bottom-10 flex justify-between text-[0.65rem] uppercase tracking-eyebrow text-offwhite/40">
              <span>Maison Noire</span>
              <span>Est. 2004</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
