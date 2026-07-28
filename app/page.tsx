import { properties, featuredProperties } from "@/data/properties";
import { getAgent } from "@/data/agents";
import { testimonials } from "@/data/testimonials";

import Hero from "@/components/home/Hero";
import AboutStrip from "@/components/home/AboutStrip";
import CuratedListings from "@/components/home/CuratedListings";
import AgentHighlight from "@/components/home/AgentHighlight";
import Testimonials from "@/components/home/Testimonials";
import HorizontalScroller from "@/components/HorizontalScroller";
import Marquee from "@/components/Marquee";

export default function HomePage() {
  const featured = featuredProperties();
  const hero = featured[0] ?? properties[0];
  const curated = properties.slice(0, 6);
  const spotlight = getAgent("agent-elise")!;

  return (
    <>
      <Hero property={hero} />

      {/* Divider marquee */}
      <div className="border-y border-navy/10 bg-offwhite py-6 text-navy">
        <Marquee
          items={[
            "New Listing",
            "Just Sold",
            "Off-Market",
            "By Appointment",
            "Private Collection",
          ]}
        />
      </div>

      <AboutStrip />

      <HorizontalScroller properties={featured} />

      {/* Sold strip on navy */}
      <div className="bg-brown py-6 text-offwhite">
        <Marquee
          items={["Sold — Malibu", "Sold — Aspen", "Sold — Montecito", "Sold — SoHo"]}
          reverse
          separator="—"
        />
      </div>

      <CuratedListings properties={curated} />

      <AgentHighlight agent={spotlight} />

      <Testimonials items={testimonials} />
    </>
  );
}
