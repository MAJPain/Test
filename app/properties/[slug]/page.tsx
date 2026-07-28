import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Mail, Phone } from "lucide-react";

import { properties, getProperty } from "@/data/properties";
import { getAgent } from "@/data/agents";
import { formatPrice } from "@/lib/utils";

import RevealImage from "@/components/RevealImage";
import ImageGallery from "@/components/ImageGallery";
import FloorPlan from "@/components/FloorPlan";
import PropertyMap from "@/components/PropertyMap";
import PropertyCard from "@/components/PropertyCard";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";

// Pre-render every listing at build time.
export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) return { title: "Residence Not Found" };
  return {
    title: property.name,
    description: property.excerpt,
    openGraph: {
      title: property.name,
      description: property.excerpt,
      images: [property.images[0]],
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  const agent = getAgent(property.agentId);
  const related = properties
    .filter((p) => p.id !== property.id && p.region === property.region)
    .slice(0, 3);
  const fill = related.length < 3
    ? properties.filter((p) => p.id !== property.id).slice(0, 3)
    : related;

  const specs = [
    { label: "Bedrooms", value: property.beds },
    { label: "Bathrooms", value: property.baths },
    { label: "Interior", value: `${property.sqft.toLocaleString()} sq ft` },
    property.lotAcres
      ? { label: "Lot", value: `${property.lotAcres} acres` }
      : { label: "Built", value: property.year },
    { label: "Type", value: property.type },
    { label: "Status", value: property.status },
  ];

  return (
    <>
      {/* Cinematic hero */}
      <section className="relative h-[92svh] min-h-[600px] w-full overflow-hidden bg-navy">
        <RevealImage
          src={property.images[0]}
          alt={property.name}
          fill
          priority
          sizes="100vw"
          wrapperClassName="h-full w-full"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-navy/40" />

        <div className="absolute inset-x-0 bottom-0 px-6 pb-14 md:px-16">
          <div className="mx-auto max-w-[1600px]">
            <Link
              href="/properties"
              data-cursor="Back"
              className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-offwhite/70 transition-colors hover:text-brown"
            >
              <ArrowLeft className="h-4 w-4" /> All Residences
            </Link>
            <p className="eyebrow text-brown">
              {property.address} · {property.city}, {property.region}
            </p>
            <h1 className="mt-4 max-w-4xl text-[clamp(2.5rem,8vw,7rem)] font-black uppercase leading-[0.9] tracking-tightest text-offwhite">
              {property.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-offwhite/70">
              {property.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Specs bar */}
      <section className="border-b border-navy/10 bg-offwhite">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-y-8 px-6 py-12 md:grid-cols-3 md:px-16 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-1">
            <p className="eyebrow text-brown">Price</p>
            <p className="mt-2 text-3xl font-black tracking-tight text-navy">
              {formatPrice(property.price)}
            </p>
          </div>
          {specs.map((s) => (
            <div key={s.label}>
              <p className="eyebrow text-navy/50">{s.label}</p>
              <p className="mt-2 text-xl font-bold text-navy">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Description + editorial */}
      <section className="bg-offwhite py-24 md:py-32">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 md:grid-cols-[1fr_1.4fr] md:px-16">
          <div>
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold tracking-[0.2em] text-brown">
                01
              </span>
              <span className="h-px w-12 bg-brown" />
              <span className="eyebrow text-navy/60">The Residence</span>
            </div>
          </div>
          <ScrollReveal>
            <div className="space-y-6">
              {property.description.map((para, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-2xl font-bold leading-snug tracking-tight text-navy md:text-[2rem]"
                      : "text-lg leading-relaxed text-navy/70"
                  }
                >
                  {para}
                </p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-offwhite pb-24 md:pb-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="mb-10 flex items-center gap-4">
            <span className="text-xs font-semibold tracking-[0.2em] text-brown">
              02
            </span>
            <span className="h-px w-12 bg-brown" />
            <span className="eyebrow text-navy/60">Gallery</span>
          </div>
          <ImageGallery images={property.images} title={property.name} />
        </div>
      </section>

      {/* Features + Floor plan */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-6 md:grid-cols-2 md:px-16">
          <div>
            <div className="mb-8 flex items-center gap-4">
              <span className="text-xs font-semibold tracking-[0.2em] text-brown">
                03
              </span>
              <span className="h-px w-12 bg-brown" />
              <span className="eyebrow text-navy/60">Features</span>
            </div>
            <ul className="divide-y divide-navy/10 border-y border-navy/10">
              {property.features.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-4 py-4 text-lg text-navy"
                >
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-brown" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-8 flex items-center gap-4">
              <span className="eyebrow text-navy/60">Floor Plan</span>
              <span className="h-px flex-1 bg-navy/10" />
            </div>
            <div className="border border-navy/10 bg-offwhite p-4">
              <FloorPlan property={property} />
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-offwhite py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="mb-10 flex items-center gap-4">
            <span className="text-xs font-semibold tracking-[0.2em] text-brown">
              04
            </span>
            <span className="h-px w-12 bg-brown" />
            <span className="eyebrow text-navy/60">
              Location — {property.city}, {property.region}
            </span>
          </div>
          <PropertyMap properties={[property]} />
        </div>
      </section>

      {/* Agent contact */}
      {agent && (
        <section className="bg-navy py-24 text-offwhite md:py-32">
          <div className="mx-auto grid max-w-[1600px] items-center gap-14 px-6 md:grid-cols-[0.7fr_1fr] md:px-16">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden">
              <RevealImage
                src={agent.portrait}
                alt={agent.name}
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                wrapperClassName="h-full w-full"
              />
            </div>
            <div>
              <span className="eyebrow text-brown">Enquire</span>
              <h2 className="mt-6 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-tight tracking-tight">
                Arrange a private viewing with {agent.name.split(" ")[0]}.
              </h2>
              <p className="mt-6 max-w-md text-offwhite/60">{agent.bio}</p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href={`tel:${agent.phone.replace(/[^+\d]/g, "")}`}
                  className="flex items-center gap-3 text-lg font-semibold transition-colors hover:text-brown"
                  data-cursor="Call"
                >
                  <Phone className="h-5 w-5 text-brown" /> {agent.phone}
                </a>
                <span className="hidden h-6 w-px bg-offwhite/20 sm:block" />
                <a
                  href={`mailto:${agent.email}`}
                  className="flex items-center gap-3 text-lg font-semibold transition-colors hover:text-brown"
                  data-cursor="Email"
                >
                  <Mail className="h-5 w-5 text-brown" /> {agent.email}
                </a>
              </div>

              <Button asChild variant="accent" className="mt-10">
                <Link href="/contact" data-cursor="Enquire">
                  Make an Enquiry
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      <section className="bg-offwhite py-24 md:py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="mb-14 flex items-end justify-between">
            <h2 className="text-[clamp(1.8rem,4vw,3.5rem)] font-black uppercase tracking-tightest text-navy">
              More Residences
            </h2>
            <Button asChild variant="ghost">
              <Link href="/properties" data-cursor="All">
                View All →
              </Link>
            </Button>
          </div>
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-3">
            {fill.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
