/** Shared domain types for the Maison Noire catalogue. */

export type PropertyStatus = "For Sale" | "New Listing" | "Sold" | "Pending";

export type PropertyType =
  | "Estate"
  | "Penthouse"
  | "Villa"
  | "Residence"
  | "Retreat"
  | "Loft";

export interface Property {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  address: string;
  city: string;
  region: string;
  price: number;
  status: PropertyStatus;
  type: PropertyType;
  beds: number;
  baths: number;
  sqft: number;
  lotAcres?: number;
  year: number;
  /** Short editorial teaser used on cards. */
  excerpt: string;
  /** Long-form description for the detail page. */
  description: string[];
  features: string[];
  /** First image is the hero / cover. */
  images: string[];
  /** Rough map coordinates for the location block. */
  coordinates: { lat: number; lng: number };
  agentId: string;
  featured?: boolean;
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  bio: string;
  phone: string;
  email: string;
  portrait: string;
  /** Career sales volume, formatted for display. */
  volume: string;
  specialties: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
}
