"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * next/image wrapper that fades + scales the photo in once it has loaded,
 * giving every image on the site the same quiet cinematic entrance.
 */
export default function RevealImage({
  className,
  wrapperClassName,
  alt,
  ...props
}: ImageProps & { wrapperClassName?: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-cream", wrapperClassName)}>
      <motion.div
        className="h-full w-full"
        initial={false}
        animate={{
          scale: loaded ? 1 : 1.12,
          opacity: loaded ? 1 : 0,
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          alt={alt}
          className={cn("h-full w-full object-cover", className)}
          onLoad={() => setLoaded(true)}
          {...props}
        />
      </motion.div>
    </div>
  );
}
