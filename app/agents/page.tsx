import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

import { agents } from "@/data/agents";
import AgentsRoster from "@/components/AgentsRoster";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "The Advisors",
  description:
    "Meet the Maison Noire advisory team — a small, senior group representing the most singular residences on the market.",
};

export default function AgentsPage() {
  return (
    <>
      {/* Hero */}
      <header className="bg-navy px-6 pb-16 pt-40 text-offwhite md:px-16 md:pb-24 md:pt-52">
        <div className="mx-auto max-w-[1600px]">
          <span className="eyebrow text-brown">The People</span>
          <h1 className="mt-6 text-[clamp(2.8rem,9vw,9rem)] font-black uppercase leading-[0.9] tracking-tightest">
            The Advisors
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-offwhite/60">
            A deliberately small team of senior advisors. No juniors, no
            hand-offs — the person you meet is the person who represents you.
          </p>
        </div>
      </header>

      {/* Hover roster */}
      <section className="bg-offwhite py-20 md:py-28">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <AgentsRoster agents={agents} />
        </div>
      </section>

      {/* Contact grid */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="mb-14 flex items-center gap-4">
            <span className="h-px w-12 bg-brown" />
            <span className="eyebrow text-navy/60">Direct Lines</span>
          </div>
          <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
            {agents.map((agent, i) => (
              <ScrollReveal key={agent.id} delay={(i % 2) * 0.08}>
                <div className="border-t border-navy/15 pt-8">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-2xl font-bold tracking-tight text-navy">
                      {agent.name}
                    </h3>
                    <span className="text-sm uppercase tracking-[0.15em] text-brown">
                      {agent.title}
                    </span>
                  </div>
                  <p className="mt-4 max-w-md leading-relaxed text-navy/70">
                    {agent.bio}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {agent.specialties.map((s) => (
                      <span
                        key={s}
                        className="border border-navy/15 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.15em] text-navy/60"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-8">
                    <a
                      href={`tel:${agent.phone.replace(/[^+\d]/g, "")}`}
                      data-cursor="Call"
                      className="flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-brown"
                    >
                      <Phone className="h-4 w-4 text-brown" /> {agent.phone}
                    </a>
                    <a
                      href={`mailto:${agent.email}`}
                      data-cursor="Email"
                      className="flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-brown"
                    >
                      <Mail className="h-4 w-4 text-brown" /> {agent.email}
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <p className="mt-20 max-w-md text-navy/60">
            Prefer to start with the firm?{" "}
            <Link href="/contact" className="link-underline font-semibold text-brown">
              Send a private enquiry →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
