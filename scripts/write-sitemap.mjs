// Regenerates public/sitemap.xml (the file the STATIC host serves) from src/sitemap.ts.
// Usage (from repo root): node scripts/write-sitemap.mjs
import { writeFileSync } from 'node:fs';
import { importTs } from './_load-ts.mjs';

const { buildSitemapXml } = await importTs('src/sitemap.ts');

// Static sitemap: prerendered pages, including the upcoming /cursos-y-talleres/* event pages
// (prerendered from /api/Event at build time; run this script with the build so both match).
const xml = await buildSitemapXml({ includeEvents: true });
writeFileSync('public/sitemap.xml', xml, 'utf8');
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
console.log('wrote public/sitemap.xml:', locs.length, 'urls');
const recipes = locs.filter((u) => u.includes('/recetas/'));
console.log('recipe urls', recipes.length);
console.log('event urls', locs.filter((u) => u.includes('/cursos-y-talleres/')).length);
