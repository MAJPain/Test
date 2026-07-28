"use client";

import Link from "next/link";

import type { Agent } from "@/data/types";
import RevealImage from "@/components/RevealImage";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedHeading from "@/components/AnimatedHeading";
import { Button } from "@/components/ui/button";

/**
 * Section 04 — a single advisor spotlight, flipped split-screen (content left,
 * portrait right) to counterbalance the About strip above.
 */
export default function AgentHighlight({ agent }: { agent: Agent }) {
  return (
    <section className="bg-cream py-24 md:py-36">
      <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-6 md:grid-cols-[1.1fr_0.9fr] md:gap-20 md:px-16">
        {/* Copy */}
        <div className="order-2 md:order-1">
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold tracking-[0.2em] text-brown">
              04
            </span>
            <span className="h-px w-12 bg-brown" />
            <span className="eyebrow text-navy/60">The Advisor</span>
          </div>

          <AnimatedHeading
            text={`“I read every listing before it goes to print.”`}
            as="h2"
            className="mt-8 text-[clamp(1.8rem,3.6vw,3.2rem)] font-bold leading-[1.08] tracking-tight text-navy"
          />

          <ScrollReveal delay={0.15}>
            <p className="mt-8 max-w-md text-base leading-relaxed text-navy/70">
              {agent.bio}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <div className="mt-10 flex items-center gap-8">
              <div>
                <p className="text-2xl font-black text-navy">{agent.volume}</p>
                <p className="text-[0.7rem] uppercase tracking-[0.15em] text-navy/50">
                  Career Volume
                </p>
              </div>
              <div className="h-10 w-px bg-navy/15" />
              <div>
                <p className="text-lg font-bold text-navy">{agent.name}</p>
                <p className="text-[0.7rem] uppercase tracking-[0.15em] text-navy/50">
                  {agent.title}
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.35} className="mt-12">
            <Button asChild variant="solid">
              <Link href="/agents" data-cursor="Meet">
                Meet the Team
              </Link>
            </Button>
          </ScrollReveal>
        </div>

        {/* Portrait */}
        <ScrollReveal direction="left" className="order-1 md:order-2">
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <RevealImage
              src={agent.portrait}
              alt={agent.name}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              wrapperClassName="h-full w-full"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
