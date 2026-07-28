import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Poppins — the sole typeface. Regular for body, Bold + Black for display.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Maison Noire — Curated Luxury Residences",
    template: "%s · Maison Noire",
  },
  description:
    "Maison Noire represents the most singular residences on the market — trophy estates, architectural landmarks, and penthouses for the few who know exactly what they are looking for.",
  keywords: [
    "luxury real estate",
    "trophy estates",
    "architectural homes",
    "penthouses",
    "Maison Noire",
  ],
  openGraph: {
    title: "Maison Noire — Curated Luxury Residences",
    description:
      "A curated collection of the world's most singular residences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <LoadingScreen />
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
