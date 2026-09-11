import { writeFileSync } from 'node:fs';
import { buildSitemapXml } from '../src/sitemap.ts';

const xml = await buildSitemapXml();
writeFileSync('public/sitemap.xml', xml, 'utf8');
console.log('wrote public/sitemap.xml', xml.length, 'chars');
const recipes = [...xml.matchAll(/\/recetas\/[^<]+/g)].map((m) => m[0]);
console.log('recipe urls', recipes.length);
console.log(recipes.join('\n'));