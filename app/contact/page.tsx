import type { Metadata } from "next";

import { properties } from "@/data/properties";
import ContactForm from "@/components/ContactForm";
import PropertyMap from "@/components/PropertyMap";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Begin a private conversation with Maison Noire. Buying, selling, or simply exploring — we reply within a business day.",
};

const OFFICES = [
  { city: "Los Angeles", line: "9200 Sunset Boulevard, West Hollywood" },
  { city: "New York", line: "40 Mercer Street, SoHo" },
  { city: "Aspen", line: "520 East Durant Avenue" },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <header className="bg-navy px-6 pb-16 pt-40 text-offwhite md:px-16 md:pb-24 md:pt-52">
        <div className="mx-auto max-w-[1600px]">
          <span className="eyebrow text-brown">Enquiries</span>
          <h1 className="mt-6 text-[clamp(2.8rem,10vw,10rem)] font-black uppercase leading-[0.85] tracking-tightest">
            Let&apos;s
            <br />
            Talk
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-offwhite/60">
            Whether you are ready to buy, considering a sale, or simply curious
            about the market, we would be glad to hear from you.
          </p>
        </div>
      </header>

      {/* Form + details */}
      <section className="bg-offwhite py-24 md:py-32">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 md:grid-cols-[1.4fr_0.8fr] md:gap-24 md:px-16">
          <ContactForm />

          {/* Offices */}
          <aside className="space-y-12">
            <div>
              <p className="eyebrow mb-6 text-navy/50">Offices</p>
              <ul className="space-y-6">
                {OFFICES.map((o) => (
                  <li key={o.city} className="border-t border-navy/15 pt-4">
                    <p className="text-lg font-bold text-navy">{o.city}</p>
                    <p className="mt-1 text-sm text-navy/60">{o.line}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-4 text-navy/50">General</p>
              <a
                href="mailto:hello@maisonnoire.com"
                data-cursor="Email"
                className="link-underline text-lg font-semibold text-navy"
              >
                hello@maisonnoire.com
              </a>
              <p className="mt-2 text-sm text-navy/60">+1 (310) 555-0100</p>
            </div>

            <div>
              <p className="eyebrow mb-4 text-navy/50">Hours</p>
              <p className="text-sm leading-relaxed text-navy/60">
                Monday – Friday, 9 – 6<br />
                Weekends by appointment
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Interactive map */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-px w-12 bg-brown" />
            <span className="eyebrow text-navy/60">Where We Represent</span>
          </div>
          <PropertyMap properties={properties} />
        </div>
      </section>
    </>
  );
}
