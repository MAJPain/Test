import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center bg-navy px-6 text-center text-offwhite">
      <span className="eyebrow text-brown">Error 404</span>
      <h1 className="mt-8 text-[clamp(4rem,20vw,16rem)] font-black uppercase leading-none tracking-tightest">
        Lost
      </h1>
      <p className="mt-6 max-w-sm text-offwhite/60">
        The residence you were looking for has moved, sold, or never existed.
        Let us guide you back.
      </p>
      <Button asChild variant="accent" className="mt-10">
        <Link href="/" data-cursor="Home">
          Return Home
        </Link>
      </Button>
    </section>
  );
}
