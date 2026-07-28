"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import MagneticButton from "./MagneticButton";

const COLS = [
  {
    heading: "Explore",
    links: [
      { label: "All Properties", href: "/properties" },
      { label: "New Listings", href: "/properties" },
      { label: "Sold Archive", href: "/properties" },
      { label: "The Journal", href: "/about" },
    ],
  },
  {
    heading: "Studio",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "The Advisors", href: "/agents" },
      { label: "Contact", href: "/contact" },
      { label: "Private Enquiries", href: "/contact" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "Pinterest", href: "#" },
      { label: "Journal Archive", href: "#" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Front-end only — a real integration would post to a CRM here.
    if (!email) return;
    setSent(true);
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden bg-navy text-offwhite">
      {/* Newsletter */}
      <div className="mx-auto max-w-[1600px] px-6 pb-16 pt-24 md:px-16">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow text-brown">Newsletter</p>
            <h2 className="mt-6 max-w-xl text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-tight">
              Receive our private list before it reaches the market.
            </h2>

            <form
              onSubmit={onSubmit}
              className="mt-10 flex max-w-lg items-center gap-4 border-b border-offwhite/25 pb-4"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-transparent text-lg text-offwhite placeholder:text-offwhite/40 focus:outline-none"
              />
              <button
                type="submit"
                data-cursor="Join"
                className="flex items-center gap-2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-brown transition-colors hover:text-offwhite"
              >
                {sent ? "Welcome" : "Subscribe"}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </form>
            {sent && (
              <p className="mt-4 text-sm text-offwhite/50">
                You&apos;re on the list. We&apos;ll be in touch.
              </p>
            )}
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-3 gap-8">
            {COLS.map((col) => (
              <div key={col.heading}>
                <p className="eyebrow mb-6 text-offwhite/40">{col.heading}</p>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="link-underline text-sm text-offwhite/80 transition-colors hover:text-brown"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Giant brand mark */}
      <div className="border-t border-offwhite/10 px-6 md:px-16">
        <MagneticButton strength={0.15} className="w-full">
          <h2 className="w-full py-10 text-center text-[clamp(3.5rem,18vw,16rem)] font-black uppercase leading-none tracking-tightest">
            Maison<span className="text-brown">.</span>
          </h2>
        </MagneticButton>
      </div>

      {/* Legal row */}
      <div className="border-t border-offwhite/10 px-6 md:px-16">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 py-6 text-[0.7rem] uppercase tracking-[0.15em] text-offwhite/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Maison Noire. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-brown">
              Privacy
            </Link>
            <Link href="#" className="hover:text-brown">
              Terms
            </Link>
            <span>Equal Housing Opportunity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
