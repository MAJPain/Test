"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Asymmetric photo grid that opens a full-screen lightbox.
 * Lightbox supports arrow-key / on-screen navigation and scroll-to-zoom
 * (wheel up zooms in, down zooms out, click resets).
 */
export default function ImageGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  const close = useCallback(() => {
    setOpen(false);
    setZoom(1);
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      setZoom(1);
      setIndex((i) => (i + dir + images.length) % images.length);
    },
    [images.length]
  );

  const openAt = (i: number) => {
    setIndex(i);
    setZoom(1);
    setOpen(true);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go, close]);

  const onWheel = (e: React.WheelEvent) => {
    const next = Math.min(2.6, Math.max(1, zoom + (e.deltaY < 0 ? 0.18 : -0.18)));
    setZoom(next);
  };

  return (
    <>
      {/* Asymmetric grid: big lead image + stacked column */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:grid-rows-2 md:gap-4">
        <button
          onClick={() => openAt(0)}
          data-cursor="Zoom"
          className="group relative col-span-1 aspect-[4/3] overflow-hidden md:col-span-2 md:row-span-2 md:aspect-auto"
        >
          <Image
            src={images[0]}
            alt={`${title} — view 1`}
            fill
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover transition-transform [transition-duration:1200ms] ease-editorial group-hover:scale-105"
          />
          <ZoomBadge />
        </button>

        {images.slice(1, 3).map((src, i) => (
          <button
            key={src + i}
            onClick={() => openAt(i + 1)}
            data-cursor="Zoom"
            className="group relative aspect-[4/3] overflow-hidden"
          >
            <Image
              src={src}
              alt={`${title} — view ${i + 2}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform [transition-duration:1200ms] ease-editorial group-hover:scale-105"
            />
            <ZoomBadge />
          </button>
        ))}
      </div>

      {/* Thumbnail strip for the rest */}
      {images.length > 3 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => openAt(i)}
              data-cursor="Zoom"
              className={cn(
                "relative aspect-[4/3] w-40 shrink-0 overflow-hidden opacity-70 transition-opacity hover:opacity-100",
                i === index && open && "opacity-100"
              )}
            >
              <Image
                src={src}
                alt={`${title} — thumbnail ${i + 1}`}
                fill
                sizes="160px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/97"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onWheel={onWheel}
          >
            {/* Close */}
            <button
              onClick={close}
              data-cursor="Close"
              className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center border border-offwhite/20 text-offwhite transition-colors hover:border-brown hover:text-brown"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Counter */}
            <span className="absolute left-6 top-8 text-sm font-semibold tracking-[0.2em] text-offwhite/70">
              {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>

            {/* Prev / Next */}
            <button
              onClick={() => go(-1)}
              data-cursor="Prev"
              className="absolute left-4 z-10 flex h-14 w-14 items-center justify-center text-offwhite/70 transition-colors hover:text-brown md:left-10"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              onClick={() => go(1)}
              data-cursor="Next"
              className="absolute right-4 z-10 flex h-14 w-14 items-center justify-center text-offwhite/70 transition-colors hover:text-brown md:right-10"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Image stage */}
            <motion.div
              key={index}
              className="relative h-[76vh] w-[86vw] cursor-zoom-out"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setZoom(1)}
            >
              <motion.div
                className="relative h-full w-full"
                animate={{ scale: zoom }}
                transition={{ type: "spring", stiffness: 160, damping: 20 }}
              >
                <Image
                  src={images[index]}
                  alt={`${title} — view ${index + 1}`}
                  fill
                  sizes="86vw"
                  className="object-contain"
                  priority
                />
              </motion.div>
            </motion.div>

            <span className="absolute bottom-8 text-[0.65rem] uppercase tracking-eyebrow text-offwhite/40">
              Scroll to zoom · Arrow keys to browse
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ZoomBadge() {
  return (
    <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center bg-offwhite/0 text-offwhite opacity-0 transition-all duration-500 group-hover:bg-navy/70 group-hover:opacity-100">
      <ZoomIn className="h-4 w-4" />
    </span>
  );
}
