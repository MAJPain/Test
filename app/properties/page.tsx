"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import PropertyMap from "@/components/PropertyMap";
import FilterBar, {
  type Filters,
  PRICE_MIN,
  PRICE_MAX,
} from "@/components/FilterBar";

const INITIAL: Filters = {
  type: "All",
  beds: 0,
  baths: 0,
  price: [PRICE_MIN, PRICE_MAX],
};

export default function PropertiesPage() {
  const [filters, setFilters] = useState<Filters>(INITIAL);
  const [view, setView] = useState<"grid" | "map">("grid");

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (filters.type !== "All" && p.type !== filters.type) return false;
      if (p.beds < filters.beds) return false;
      if (p.baths < filters.baths) return false;
      if (p.price < filters.price[0] || p.price > filters.price[1]) return false;
      return true;
    });
  }, [filters]);

  return (
    <>
      {/* Page header */}
      <header className="bg-navy px-6 pb-16 pt-40 text-offwhite md:px-16 md:pb-24 md:pt-48">
        <div className="mx-auto max-w-[1600px]">
          <span className="eyebrow text-brown">The Collection</span>
          <h1 className="mt-6 text-[clamp(2.8rem,9vw,9rem)] font-black uppercase leading-[0.9] tracking-tightest">
            Residences
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-offwhite/60">
            Every home we represent, in one place. Filter by type, size, and
            price — or switch to the map to explore by location.
          </p>
        </div>
      </header>

      <FilterBar
        filters={filters}
        setFilters={setFilters}
        resultCount={filtered.length}
        view={view}
        setView={setView}
      />

      <section className="bg-offwhite pb-32 pt-12">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <AnimatePresence mode="wait">
            {view === "grid" ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {filtered.length === 0 ? (
                  <EmptyState onReset={() => setFilters(INITIAL)} />
                ) : (
                  <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((p, i) => (
                      <motion.div
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: (i % 3) * 0.06 }}
                        className={
                          i % 3 === 1
                            ? "lg:mt-16"
                            : i % 3 === 2
                              ? "lg:mt-8"
                              : ""
                        }
                      >
                        <PropertyCard property={p} index={i} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="map"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <PropertyMap properties={filtered} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <p className="text-3xl font-bold tracking-tight text-navy">
        No residences match your filters.
      </p>
      <p className="mt-3 max-w-sm text-navy/60">
        Try widening the price range or clearing the property type.
      </p>
      <button
        onClick={onReset}
        data-cursor="Reset"
        className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-brown link-underline"
      >
        Reset Filters
      </button>
    </div>
  );
}
