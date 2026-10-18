# MCG Capability Statement

A two-page, US Letter capability statement for Morris Consulting Group, LLC.

| File | Purpose |
|---|---|
| `MCG_Capability_Statement.pdf` | Print-ready PDF (2 pages, 8.5" x 11", 0.5" margins, fonts embedded as TrueType) |
| `index.html` | Editable source: all copy and the inline SVG graphics |
| `styles.css` | Print stylesheet: palette, type, layout |
| `render.mjs` | Renders the PDF with Playwright (Chromium) and fails if any page overflows |
| `assets/fonts/` | Source Serif 4 (headlines) and Source Sans 3 (body), SIL Open Font License |
| `assets/preview-1.png`, `preview-2.png` | Page previews |

## Rebuild the PDF

```bash
npm install playwright        # once; uses the system Chromium if one is installed
node render.mjs               # writes MCG_Capability_Statement.pdf
```

`render.mjs` prints a per-page report and exits non-zero if any page, column, quadrant, or footer line overflows. After editing copy, re-run it. If it reports overflow, trim text; don't shrink body type below 10pt.

## Placeholders still to fill

Every one of these shows up in gold or bracketed text on the printed page.

| Placeholder | Where | Notes |
|---|---|---|
| `[MCG LOGO]` | Page 1 header band | Replace the dashed `.logo-box` div with `<img src="assets/mcg-logo.svg" ...>`. A reversed (light-on-navy) version works best. |
| `[VOSB]` badge | Page 1 header band; Company Data "Certs" | Use the official mark only after certification is confirmed. If it doesn't apply, delete it. |
| `[SDVOSB]` badge | Page 1 header band; Company Data "Certs" | Same as above. |
| `[CAGE]` | Company Data | CAGE code from SAM.gov. |
| `[OTHERS]` | Company Data, NAICS | Add or remove codes. **541611, 541612, and 611430 are suggested. Confirm them against your SAM.gov registration.** |
| `[CATALYST ELEMENT: C / A / T / A / L / Y / S / T]` (8) | Page 2, Organizational Capacity Building legend | Name each element. The letters in the wheel don't change. |
| `[CLIENT / ENGAGEMENT]` (7 rows) | Page 2, Past Performance / Clients | **Get each client's permission before publishing.** Don't list Army units or prior employers (e.g., Delta Health Alliance) as MCG clients. You can delete rows (keep at least 6) or add rows (up to 9). |
| `[SECTOR]` (7 rows) | Page 2, Past Performance / Clients | Government / Nonprofit / Private, or a year range. |
| `[ADD 1–2 LINE BIO / CREDENTIALS — CONFIRM WHETHER "Dr." IS USED]` | Page 2, The Partners (Kenya Dugger) | If "Dr." is used, also update the name in the `<h3>`. About two lines fit without reflowing the page. |
| `[STREET ADDRESS]`, `[ZIP]` | Page 2 footer band | Mailing address. |

To list what's left at any time:

```bash
grep -on '\[[A-Z][^]]*\]' index.html
```

## Assets that could not be retrieved

- **morrisconsultinggroup.org was unreachable from the build environment** (blocked by network policy, and DNS failed). That means none of these were pulled from the site:
  - **Logo.** Shown as the `[MCG LOGO]` placeholder.
  - **Brand colors.** A fallback palette is used instead. To swap it, edit the variables at the top of `styles.css`:
    `--navy #1b2a41` (primary), `--navy-2 #2f4566`, `--gold #b08d57` (accent), `--gold-soft #d9c6a3`, `--stone #efebe4` (shaded boxes), `--ink #23272e` (body text).
    Three tier colors in the Strategic Planning graphic are hard-coded in `.tiers .step.s2/.s4` and in one inline `style="fill:#1b2a41"`.
  - **Typefaces.** Source Serif 4 and Source Sans 3 stand in. If MCG has brand fonts, put them in `assets/fonts/`, update the `@font-face` rules and the `--serif` / `--sans` variables, then re-run `render.mjs`. Line lengths will change.

## Editorial decisions to review

- **Hub center label.** The hub reads "Operating Effectiveness," which matches MCG's service-line name. The brief also said "Operational Effectiveness." To change it, edit the two `<tspan>`s in the `.hub` SVG and the matching sentence in "Services."
- **Icon strip.** It shows five of the ten service lines: Executive Advisory, Strategic Planning, Organizational Design, Executive Coaching, People & Culture Transformation. The hub shows all ten.
- **Strategic Planning sequence.** It uses Assess → Align → Plan → Execute → Sustain. If MCG has its own sequence, replace the step labels and descriptors in the `.tiers` SVG.
- **Small graphic labels.** Body copy is 10pt or larger throughout. The labels inside graphics (hub nodes, tier descriptors, badge captions) are about 6.5–7.5pt.
- **"Officer and senior NCO" callout.** This is the differentiator. The 44 years of combined service is implied (2 × 22) but never stated as a number.
- **No fabricated facts.** Every figure comes from the brief: 9,500 soldiers per year, $25M+, seven sites, 2014, 22 years, January 2017. Anything not supplied is a placeholder.
