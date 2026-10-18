// Render index.html to MCG_Capability_Statement.pdf with Playwright (Chromium).
// Usage: node render.mjs   (requires the `playwright` package)
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const dir = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch();
const page = await browser.newPage();
await page.emulateMedia({ media: 'print' });
await page.goto(pathToFileURL(path.join(dir, 'index.html')).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

// Overflow check: any .page whose content is taller than its box fails the build.
const report = await page.evaluate(() => [...document.querySelectorAll('.page')].map((p, i) => {
  const box = p.getBoundingClientRect();
  let maxBottom = 0;
  p.querySelectorAll('*').forEach(el => { const r = el.getBoundingClientRect(); if (r.height) maxBottom = Math.max(maxBottom, r.bottom); });
  // Also catch clipped/overlapping regions: columns, single-line footers, any box narrower than its content.
  const clipped = [...p.querySelectorAll('.col, .quad, .contact-line, .footer-band > div, .company-data, .partners')]
    .filter(el => el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1)
    .map(el => `${el.className || el.tagName}: ${el.scrollWidth}x${el.scrollHeight} in ${el.clientWidth}x${el.clientHeight}`);
  return { page: i + 1, height: box.height, contentBottom: Math.round(maxBottom - box.top), overflow: p.scrollHeight > p.clientHeight || clipped.length > 0, clipped };
}));
console.dir(report, { depth: 4 });

await page.pdf({ path: path.join(dir, 'MCG_Capability_Statement.pdf'), format: 'Letter', preferCSSPageSize: true, printBackground: true });
await browser.close();
const strict = process.argv[2] !== '--loose';
if (strict && report.some(r => r.overflow || r.contentBottom > r.height + 0.5)) { console.error('OVERFLOW'); process.exit(1); }
