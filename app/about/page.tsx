import type { Metadata } from "next";
import Link from "next/link";

import RevealImage from "@/components/RevealImage";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedHeading from "@/components/AnimatedHeading";
import Marquee from "@/components/Marquee";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Maison Noire is a boutique brokerage built on restraint, editorial craft, and an obsession with the singular home.",
};

const VALUES = [
  {
    n: "01",
    title: "Fewer, better",
    body: "We turn down more listings than we take. Representation should be a mark of distinction, not a volume business.",
  },
  {
    n: "02",
    title: "Editorial craft",
    body: "Every home is photographed like architecture and written like a feature. We treat the listing as the first impression it is.",
  },
  {
    n: "03",
    title: "Quiet negotiation",
    body: "The best deals are made without theatre. Our advisors are calm, prepared, and relentless on your behalf.",
  },
  {
    n: "04",
    title: "Discretion, always",
    body: "A significant share of what we sell never touches the open market. Privacy is not a feature; it is the premise.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <header className="bg-navy px-6 pb-20 pt-40 text-offwhite md:px-16 md:pb-28 md:pt-52">
        <div className="mx-auto max-w-[1600px]">
          <span className="eyebrow text-brown">Est. 2004 · Los Angeles</span>
          <AnimatedHeading
            text="We sell the homes that are spoken of in the singular."
            as="h1"
            className="mt-8 max-w-5xl text-[clamp(2.4rem,6.5vw,6.5rem)] font-black uppercase leading-[0.92] tracking-tightest"
          />
        </div>
      </header>

      {/* Manifesto — split */}
      <section className="bg-offwhite py-24 md:py-36">
        <div className="mx-auto grid max-w-[1600px] items-start gap-16 px-6 md:grid-cols-[1fr_1fr] md:px-16">
          <ScrollReveal direction="right">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <RevealImage
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
                alt="A residence represented by Maison Noire"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                wrapperClassName="h-full w-full"
              />
            </div>
          </ScrollReveal>

          <div className="md:pt-16">
            <p className="text-[clamp(1.5rem,2.6vw,2.4rem)] font-bold leading-snug tracking-tight text-navy">
              Maison Noire began with a small rebellion: the conviction that the
              way extraordinary homes were being sold did not match the homes
              themselves.
            </p>
            <ScrollReveal delay={0.15}>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-navy/70">
                <p>
                  Our founder, Elise Marchetti, had spent a decade watching
                  landmark residences reduced to bullet points and bad
                  photography. She left to build the opposite — a firm that
                  treats a home the way a gallery treats a painting.
                </p>
                <p>
                  Two decades later, that principle still governs everything. We
                  are deliberately small. We work by referral and by reputation.
                  And we measure ourselves not by transactions closed, but by the
                  clients who never work with anyone else again.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-brown py-6 text-offwhite">
        <Marquee
          items={["Discretion", "Craft", "Restraint", "The Singular Home"]}
          separator="✦"
        />
      </div>

      {/* Values */}
      <section className="bg-cream py-24 md:py-36">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-brown" />
            <span className="eyebrow text-navy/60">What We Believe</span>
          </div>
          <div className="mt-16 grid gap-x-16 gap-y-14 md:grid-cols-2">
            {VALUES.map((v, i) => (
              <ScrollReveal key={v.n} delay={(i % 2) * 0.1}>
                <div className="border-t border-navy/15 pt-6">
                  <span className="text-sm font-semibold tracking-[0.2em] text-brown">
                    {v.n}
                  </span>
                  <h3 className="mt-4 text-3xl font-bold tracking-tight text-navy">
                    {v.title}
                  </h3>
                  <p className="mt-4 max-w-md text-lg leading-relaxed text-navy/70">
                    {v.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Big statement + CTA */}
      <section className="relative overflow-hidden bg-navy py-32 text-offwhite md:py-48">
        <div className="mx-auto max-w-[1400px] px-6 text-center md:px-16">
          <AnimatedHeading
            text="Let us find the one that is only yours."
            as="h2"
            className="mx-auto max-w-4xl text-[clamp(2rem,5vw,5rem)] font-black uppercase leading-[0.95] tracking-tightest"
          />
          <ScrollReveal delay={0.2} className="mt-12 flex justify-center">
            <Button asChild variant="accent" size="lg">
              <Link href="/contact" data-cursor="Begin">
                Begin a Conversation
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
