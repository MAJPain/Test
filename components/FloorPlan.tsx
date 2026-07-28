import type { Property } from "@/data/types";

/**
 * A schematic, hand-drawn-feeling floor plan rendered as inline SVG.
 * It's generative (not a real survey) but reads as an architectural drawing,
 * labelled with the residence's own bed/bath counts.
 */
export default function FloorPlan({ property }: { property: Property }) {
  const stroke = "#0A2540";
  return (
    <svg
      viewBox="0 0 800 520"
      className="h-auto w-full"
      role="img"
      aria-label={`Schematic floor plan for ${property.name}`}
    >
      <rect x="0" y="0" width="800" height="520" fill="#FAFAF7" />

      {/* Outer wall */}
      <rect
        x="40"
        y="40"
        width="720"
        height="440"
        fill="none"
        stroke={stroke}
        strokeWidth="3"
      />

      {/* Interior partitions */}
      <line x1="320" y1="40" x2="320" y2="300" stroke={stroke} strokeWidth="1.5" />
      <line x1="320" y1="300" x2="760" y2="300" stroke={stroke} strokeWidth="1.5" />
      <line x1="40" y1="300" x2="320" y2="300" stroke={stroke} strokeWidth="1.5" />
      <line x1="540" y1="40" x2="540" y2="300" stroke={stroke} strokeWidth="1.5" />
      <line x1="180" y1="300" x2="180" y2="480" stroke={stroke} strokeWidth="1.5" />
      <line x1="460" y1="300" x2="460" y2="480" stroke={stroke} strokeWidth="1.5" />

      {/* Door gaps (white notches over walls) */}
      <line x1="320" y1="150" x2="320" y2="190" stroke="#FAFAF7" strokeWidth="4" />
      <line x1="240" y1="300" x2="280" y2="300" stroke="#FAFAF7" strokeWidth="4" />
      <line x1="540" y1="150" x2="540" y2="190" stroke="#FAFAF7" strokeWidth="4" />

      {/* Fixtures — pool / terrace hint */}
      <rect
        x="600"
        y="340"
        width="120"
        height="100"
        fill="none"
        stroke="#8B6B47"
        strokeWidth="1.5"
        strokeDasharray="5 5"
      />

      {/* Labels */}
      {[
        { x: 180, y: 175, t: "Great Room" },
        { x: 430, y: 175, t: "Kitchen" },
        { x: 650, y: 175, t: "Primary Suite" },
        { x: 110, y: 395, t: `Bed` },
        { x: 320, y: 395, t: "Study" },
        { x: 540, y: 395, t: "Terrace" },
      ].map((l) => (
        <text
          key={l.t}
          x={l.x}
          y={l.y}
          textAnchor="middle"
          fontFamily="var(--font-poppins), sans-serif"
          fontSize="15"
          letterSpacing="2"
          fill={stroke}
          style={{ textTransform: "uppercase" }}
        >
          {l.t}
        </text>
      ))}

      {/* Compass */}
      <g transform="translate(720, 470)">
        <circle r="14" fill="none" stroke="#8B6B47" strokeWidth="1.5" />
        <text
          x="0"
          y="-18"
          textAnchor="middle"
          fontFamily="var(--font-poppins), sans-serif"
          fontSize="11"
          fill="#8B6B47"
        >
          N
        </text>
      </g>
    </svg>
  );
}
