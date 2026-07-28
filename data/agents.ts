import type { Agent } from "./types";

/** The Maison Noire advisory team. Headshots via Unsplash. */
export const agents: Agent[] = [
  {
    id: "agent-elise",
    name: "Elise Marchetti",
    title: "Founding Partner",
    bio: "Elise built Maison Noire on a single conviction: that a home is the most personal work of art a person will ever commission. Two decades and $2.4B in closings later, she still reads every listing description before it goes to print.",
    phone: "+1 (310) 555-0142",
    email: "elise@maisonnoire.com",
    portrait:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
    volume: "$2.4B",
    specialties: ["Trophy Estates", "Off-Market", "Coastal"],
  },
  {
    id: "agent-julian",
    name: "Julian Okafor",
    title: "Director, Architectural Sales",
    bio: "A former structural engineer, Julian speaks the language of cantilevers and clerestories fluently. He represents the modernist canon — the Neutras, the Lautners, and the ones that will be spoken of that way in fifty years.",
    phone: "+1 (310) 555-0188",
    email: "julian@maisonnoire.com",
    portrait:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
    volume: "$1.1B",
    specialties: ["Modernist", "New Development", "Architectural"],
  },
  {
    id: "agent-mara",
    name: "Mara Delacroix",
    title: "Senior Advisor",
    bio: "Mara's clients tend to become clients for life — and then hand her their children's search too. She is fluent in four languages and in the quieter grammar of what a family will not say out loud about the home they want.",
    phone: "+1 (310) 555-0173",
    email: "mara@maisonnoire.com",
    portrait:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
    volume: "$860M",
    specialties: ["Family Estates", "Relocation", "Equestrian"],
  },
  {
    id: "agent-theo",
    name: "Theo Adler",
    title: "Advisor, Metropolitan",
    bio: "Theo knows every penthouse floorplate above the fortieth story worth knowing. He negotiated three of the five highest-per-square-foot sales in the city last year, and he did it without ever raising his voice.",
    phone: "+1 (212) 555-0119",
    email: "theo@maisonnoire.com",
    portrait:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=900&q=80",
    volume: "$1.6B",
    specialties: ["Penthouses", "Pied-à-terre", "Investment"],
  },
];

export const getAgent = (id: string): Agent | undefined =>
  agents.find((a) => a.id === id);
