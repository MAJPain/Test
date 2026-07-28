"use client";

import { Map, LayoutGrid } from "lucide-react";

import type { PropertyType } from "@/data/types";
import { formatPrice, cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

export interface Filters {
  type: PropertyType | "All";
  beds: number;
  baths: number;
  price: [number, number];
}

export const PRICE_MIN = 800_000;
export const PRICE_MAX = 15_000_000;

const TYPES: (PropertyType | "All")[] = [
  "All",
  "Estate",
  "Penthouse",
  "Villa",
  "Residence",
  "Retreat",
  "Loft",
];

/**
 * Sticky filter rail for the listings page. Fully controlled — parent owns the
 * filter state so results and the map stay in sync.
 */
export default function FilterBar({
  filters,
  setFilters,
  resultCount,
  view,
  setView,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
  resultCount: number;
  view: "grid" | "map";
  setView: (v: "grid" | "map") => void;
}) {
  return (
    <div className="sticky top-0 z-40 border-b border-navy/10 bg-offwhite/85 backdrop-blur-md">
      <div className="mx-auto max-w-[1600px] px-6 py-5 md:px-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Types */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setFilters({ ...filters, type: t })}
                className={cn(
                  "link-underline text-xs font-semibold uppercase tracking-[0.15em] transition-colors",
                  filters.type === t ? "text-brown" : "text-navy/50 hover:text-navy"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Beds / Baths / View toggle */}
          <div className="flex items-center gap-8">
            <Stepper
              label="Beds"
              value={filters.beds}
              onChange={(v) => setFilters({ ...filters, beds: v })}
            />
            <Stepper
              label="Baths"
              value={filters.baths}
              onChange={(v) => setFilters({ ...filters, baths: v })}
            />

            <div className="flex border border-navy/15">
              <ViewButton
                active={view === "grid"}
                onClick={() => setView("grid")}
                label="Grid"
              >
                <LayoutGrid className="h-4 w-4" />
              </ViewButton>
              <ViewButton
                active={view === "map"}
                onClick={() => setView("map")}
                label="Map"
              >
                <Map className="h-4 w-4" />
              </ViewButton>
            </div>
          </div>
        </div>

        {/* Price slider row */}
        <div className="mt-6 flex flex-col gap-3 border-t border-navy/10 pt-5 sm:flex-row sm:items-center sm:gap-8">
          <span className="eyebrow shrink-0 text-navy/60">Price Range</span>
          <div className="flex flex-1 items-center gap-5">
            <span className="w-24 shrink-0 text-sm font-semibold text-navy">
              {formatPrice(filters.price[0])}
            </span>
            <Slider
              value={filters.price}
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={100_000}
              onValueChange={(v) =>
                setFilters({ ...filters, price: [v[0], v[1]] as [number, number] })
              }
              className="flex-1"
            />
            <span className="w-24 shrink-0 text-right text-sm font-semibold text-navy">
              {formatPrice(filters.price[1])}
            </span>
          </div>
          <span className="shrink-0 text-xs uppercase tracking-[0.15em] text-brown">
            {resultCount} {resultCount === 1 ? "Residence" : "Residences"}
          </span>
        </div>
      </div>
    </div>
  );
}

function Stepper({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="eyebrow text-navy/60">{label}</span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(0, value - 1))}
          className="flex h-7 w-7 items-center justify-center border border-navy/15 text-navy transition-colors hover:border-brown hover:text-brown"
          aria-label={`Decrease ${label}`}
        >
          –
        </button>
        <span className="w-8 text-center text-sm font-semibold text-navy">
          {value === 0 ? "Any" : `${value}+`}
        </span>
        <button
          onClick={() => onChange(Math.min(8, value + 1))}
          className="flex h-7 w-7 items-center justify-center border border-navy/15 text-navy transition-colors hover:border-brown hover:text-brown"
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

function ViewButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={`${label} view`}
      className={cn(
        "flex h-9 w-10 items-center justify-center transition-colors",
        active ? "bg-navy text-offwhite" : "text-navy/50 hover:text-navy"
      )}
    >
      {children}
    </button>
  );
}
