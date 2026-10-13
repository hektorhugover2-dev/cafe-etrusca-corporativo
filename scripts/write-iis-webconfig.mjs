// Generates deploy/iis/web.config (IIS URL Rewrite rules) from src/seo-redirects.ts:
//  - 301 map for old cafeetrusca.com URLs
//  - non-production hosts (desarrollo.cafeetrusca.com, ...): X-Robots-Tag noindex + disallow-all robots.txt
// Usage (from repo root): node scripts/write-iis-webconfig.mjs [path-to-built-browser-folder]
// If a built browser folder is given, every redirect target is checked for an index.html, and any
// redirect whose key IS a prerendered page (folder with index.html, exact case) is dropped with a warning.
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { importTs } from './_load-ts.mjs';

const { seoRedirectsFor, GONE_PATHS } = await importTs('src/seo-redirects.ts');
const { upcomingEvents } = await importTs('src/app/domains/education/presentation/page-indexing.ts');

// Upcoming events (live /api/Event, else public/data/events.json) get a prerendered
// /cursos-y-talleres/<slug>/ page in this build: never 301 them (the page wins).
const { loadEvents, isUpcomingEvent, eventSlug } = await importTs('src/events-snapshot.server.ts');
async function liveEventPaths() {
  const { events, source } = await loadEvents();
  const paths = new Set(events.filter((e) => isUpcomingEvent(e)).map(eventSlug).filter(Boolean).map((s) => '/cursos-y-talleres/' + s));
  console.log(`events from ${source}: ${paths.size} upcoming`);
  return paths;
}
const liveEvents = await liveEventPaths();
// Redirect targets depend on the upcoming events (D2: a course × sede page without dates is noindex, so
// past-event 301s go to its indexable primary instead).
const ALL_REDIRECTS = seoRedirectsFor(upcomingEvents((await loadEvents()).events));
const EVENT_REDIRECTS = ALL_REDIRECTS.filter((r) => !liveEvents.has(r.from));
console.log(`${liveEvents.size} live event page(s); ${ALL_REDIRECTS.length - EVENT_REDIRECTS.length} redirect(s) dropped for them`);
const { environment } = await importTs('src/environments/environment.ts');
const { EVENT_PREFIX_TARGET, PAST_EVENT_FORM_URL, resolveRedirectTarget } = await importTs('src/seo-redirects.ts');
const { pastEventCoursePath } = await importTs('src/app/domains/education/presentation/past-event-target.ts');
const { EVENT_SLUG_COURSES, courseBaseInEventSlug, venueInEventSlug } = await importTs('src/app/domains/education/presentation/legacy-city-matrix.ts');
const { COURSE_VENUE_LIST } = await importTs('src/app/shared/kernel/data/course-venues.data.ts');
const UPCOMING = upcomingEvents((await loadEvents()).events);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const prodHostPattern = '^(' + environment.indexableHosts.map(reEsc).join('|') + ')$';

const browserDir = process.argv[2];

/** Every folder of the build that has an index.html, as "/a/b" (exact case, decoded names). */
function pageFolders(root) {
  const out = new Set();
  const walk = (dir, rel) => {
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    if (entries.some((e) => e.isFile() && e.name === 'index.html')) out.add(rel || '/');
    for (const e of entries) {
      if (!e.isDirectory() || e.name === 'assets' || e.name === 'media') continue;
      walk(join(dir, e.name), `${rel}/${e.name}`);
    }
  };
  walk(root, '');
  return out;
}

let SEO_REDIRECTS = EVENT_REDIRECTS;
if (browserDir) {
  const pages = pageFolders(browserDir);
  const shadowing = EVENT_REDIRECTS.filter((r) => pages.has(r.from));
  for (const r of shadowing) console.warn('WARN redirect key is a live page, rule dropped:', r.from, '->', r.to);
  SEO_REDIRECTS = EVENT_REDIRECTS.filter((r) => !pages.has(r.from));
  console.log(`${shadowing.length} redirect(s) dropped because the key is a prerendered page`);
  let missing = 0;
  for (const r of SEO_REDIRECTS) {
    const path = r.to.split('#')[0];
    if (!pages.has(path.replace(/\/+$/, '') || '/')) {
      missing++;
      console.warn('WARN target not in build:', r.from, '->', r.to);
    }
  }
  console.log(missing ? `${missing} redirect target(s) missing in build` : 'all redirect targets exist in build');
}

// Chains / loops / noindex targets: fail the script (a chain costs a hop, a loop is an outage).
{
  const keys = new Map(SEO_REDIRECTS.map((r) => [r.from, r.to]));
  const norm = (t) => { const p = t.split('#')[0].replace(/\/+$/, ''); return p || '/'; };
  const chains = SEO_REDIRECTS.filter((r) => keys.has(norm(r.to)));
  const selfs = SEO_REDIRECTS.filter((r) => norm(r.to) === r.from);
  const gone = new Set(GONE_PATHS);
  const toGone = SEO_REDIRECTS.filter((r) => gone.has(norm(r.to)));
  for (const r of chains) console.error('ERROR chain:', r.from, '->', r.to, '->', keys.get(norm(r.to)));
  for (const r of selfs) console.error('ERROR self redirect:', r.from);
  for (const r of toGone) console.error('ERROR redirect to a 410 URL:', r.from, '->', r.to);
  if (chains.length || selfs.length || toGone.length) process.exit(1);
  console.log('redirect map: no chains, no loops, no self-redirects');
}

// IIS treats rewriteMap keys as unique case-INsensitively ("Cannot add duplicate collection entry"),
// but lookups must stay case-sensitive (ignoreCase="false": /Contacto -> /contacto/ must not match
// /contacto itself). Keys that only differ by case go to a second (third...) map + rule.
const buckets = [];
{
  const seen = new Map();
  for (const r of SEO_REDIRECTS) {
    const lc = r.from.toLowerCase();
    const i = seen.get(lc) ?? 0;
    seen.set(lc, i + 1);
    (buckets[i] ||= []).push(r);
  }
}
// Past/unknown event slugs NOT in the map (no archive/review data, e.g. a date that passed and was never
// archived): IIS cannot run past-event-target.ts, so its slug parsing is compiled into rules. One pair
// of rules per course keyword (EVENT_SLUG_COURSES order = same priority as the JS; emprende first):
//   A) course + sede in the slug → PastEventCourse map "<group>|<sede key>" → course × sede page;
//   B) course only (or sede without page) → the national page of the course.
// Every value comes from pastEventCoursePath() on a sample slug and is resolved like the map targets
// (noindex city page → primary, no chains), so IIS, server.ts and the browser agree.
const venueKeys = COURSE_VENUE_LIST.flatMap((v) => [v.slug, ...(v.slug.endsWith('-cdmx') ? [v.slug.replace(/-cdmx$/, '')] : [])]).sort(
  (a, b) => b.length - a.length
);
const resolveEvt = (p) => (p ? resolveRedirectTarget(p, SEO_REDIRECTS, UPCOMING) : null);
const sampleFor = (re) => re.source.split('|')[0].replace(/.\?/g, '');
const EVENT_GROUPS = [
  { id: 'emprende', cond: '^emprendiendo', sample: 'emprendiendo' },
  ...EVENT_SLUG_COURSES.map(([re, base], i) => {
    const sample = sampleFor(re);
    if (courseBaseInEventSlug(sample) !== base) throw new Error(`sample "${sample}" does not select ${base}`);
    const earlier = EVENT_SLUG_COURSES.slice(0, i).map(([r]) => r.source);
    const cond = `^(?!emprendiendo)${earlier.length ? `(?!.*(?:${earlier.join('|')}))` : ''}(?=.*(?:${re.source}))`;
    return { id: 'c' + i, cond, sample, base };
  })
];
const eventMap = [];
for (const g of EVENT_GROUPS) {
  g.national = resolveEvt(pastEventCoursePath(g.sample));
  for (const k of venueKeys) {
    const synth = `${g.sample}-${k}`;
    if (g.base && courseBaseInEventSlug(synth) !== g.base) throw new Error(`venue key ${k} changes the course of ${g.sample}`);
    if (!venueInEventSlug(synth)) throw new Error(`venue key ${k} not detected`);
    const to = resolveEvt(pastEventCoursePath(synth));
    if (to && to !== g.national) eventMap.push({ key: `${g.id}|${k}`, to });
  }
}
const pastEventMapXml = eventMap.map((e) => `          <add key="${esc(e.key)}" value="${esc(e.to)}" />`).join('\n');
const notPrerendered = `<add input="{APPL_PHYSICAL_PATH}cursos-y-talleres\\{R:1}\\index.html" matchType="IsFile" negate="true" />`;
const venuePattern = `-(${venueKeys.map(reEsc).join('|')})-`;
const eventRulesXml = EVENT_GROUPS.map((g) => {
  const a = `        <rule name="Past event ${g.id} sede" stopProcessing="true">
          <match url="^cursos-y-talleres/([^/]+)/?$" />
          <conditions logicalGrouping="MatchAll">
            ${notPrerendered}
            <add input="{R:1}" pattern="${esc(g.cond)}" />
            <add input="-{R:1}-" pattern="${esc(venuePattern)}" />
            <add input="{PastEventCourse:${g.id}|{C:1}}" pattern="(.+)" />
          </conditions>
          <action type="Redirect" url="{C:1}" redirectType="Permanent" appendQueryString="true" />
        </rule>`;
  const b = g.national
    ? `
        <rule name="Past event ${g.id}" stopProcessing="true">
          <match url="^cursos-y-talleres/([^/]+)/?$" />
          <conditions logicalGrouping="MatchAll">
            ${notPrerendered}
            <add input="{R:1}" pattern="${esc(g.cond)}" />
          </conditions>
          <action type="Redirect" url="${esc(g.national)}" redirectType="Permanent" appendQueryString="true" />
        </rule>`
    : '';
  return a + b;
}).join('\n');
console.log(`past/unknown event rules: ${EVENT_GROUPS.length} course groups, ${eventMap.length} course × sede entries`);
if (browserDir) {
  const pages = pageFolders(browserDir);
  const targets = [...eventMap.map((e) => e.to), ...EVENT_GROUPS.map((g) => g.national).filter(Boolean), PAST_EVENT_FORM_URL, EVENT_PREFIX_TARGET];
  const missingEvt = [...new Set(targets)].filter((t) => !pages.has(t.split('#')[0].replace(/\/+$/, '') || '/'));
  for (const t of missingEvt) console.warn('WARN past-event target not in build:', t);
  if (!missingEvt.length) console.log('all past-event rule targets exist in build');
}

const goneXml = GONE_PATHS.map((p) => `          <add key="${esc(p)}" value="1" />`).join('\n');
const mapName = (i) => (i === 0 ? 'SeoRedirects' : `SeoRedirects${i + 1}`);
const mapsXml = buckets
  .map(
    (list, i) => `        <!-- ${list.length} permanent redirects. Case-sensitive keys, no trailing slash. -->
        <rewriteMap name="${mapName(i)}" defaultValue="" ignoreCase="false">
${list.map((r) => `          <add key="${esc(r.from)}" value="${esc(r.to)}" />`).join('\n')}
        </rewriteMap>`
  )
  .join('\n');
const mapRulesXml = buckets
  .map(
    (_, i) => `        <!-- Old URLs -> new URLs (301)${i ? ' — case variants' : ''} -->
        <rule name="SEO 301 map${i ? ' ' + (i + 1) : ''}" stopProcessing="true">
          <match url="^(.*?)/?$" />
          <conditions>
            <add input="{${mapName(i)}:/{R:1}}" pattern="(.+)" />
          </conditions>
          <action type="Redirect" url="{C:1}" redirectType="Permanent" appendQueryString="true" />
        </rule>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!--
  GENERATED by scripts/write-iis-webconfig.mjs from src/seo-redirects.ts. Do not edit by hand.
  REQUIRES the IIS "URL Rewrite 2.x" module. Without it IIS answers HTTP 500.19 for EVERY request,
  so verify the module on the server before copying this file next to index.html.
  See deploy/iis/README.md.
-->
<configuration>
  <system.webServer>
    <rewrite>
      <rewriteMaps>
        <!-- ${SEO_REDIRECTS.length} permanent redirects in ${buckets.length} map(s). -->
${mapsXml}
        <!-- Past/unknown event slugs parsed in IIS: "<course group>|<sede key in the slug>" → course × sede page -->
        <rewriteMap name="PastEventCourse" defaultValue="" ignoreCase="true">
${pastEventMapXml}
        </rewriteMap>
        <!-- D6: ${GONE_PATHS.length} aditivos/gomas blog posts → HTTP 410 Gone -->
        <rewriteMap name="Gone410" defaultValue="" ignoreCase="false">
${goneXml}
        </rewriteMap>
      </rewriteMaps>
      <rules>
        <!-- Non-production hosts (desarrollo.cafeetrusca.com, IPs...): disallow-all robots.txt -->
        <rule name="NonProd robots.txt" stopProcessing="true">
          <match url="^robots\\.txt$" />
          <conditions>
            <add input="{HTTP_HOST}" pattern="${esc(prodHostPattern)}" negate="true" />
          </conditions>
          <action type="Rewrite" url="/robots-noindex.txt" />
        </rule>
        <!-- www.cafeetrusca.com -> cafeetrusca.com (only fires on the www host) -->
        <rule name="www to apex" stopProcessing="true">
          <match url="(.*)" />
          <conditions>
            <add input="{HTTP_HOST}" pattern="^www\\.cafeetrusca\\.com$" />
          </conditions>
          <action type="Redirect" url="${esc(environment.siteOrigin)}/{R:1}" redirectType="Permanent" />
        </rule>
        <!-- Gone: old aditivos/gomas posts answer 410 (no redirect to an unrelated page) -->
        <rule name="Gone 410" stopProcessing="true">
          <match url="^(.*?)/?$" />
          <conditions>
            <add input="{Gone410:/{R:1}}" pattern="1" />
          </conditions>
          <action type="CustomResponse" statusCode="410" statusReason="Gone" statusDescription="Gone" />
        </rule>
${mapRulesXml}
        <!-- /index.html and /<page>/index.html -> the canonical folder URL (one version per page).
             Internal rewrites/ExecuteURL to /index.csr.html are not affected. -->
        <rule name="index.html to folder" stopProcessing="true">
          <match url="^(.*/)?index\\.html$" />
          <action type="Redirect" url="/{R:1}" redirectType="Permanent" appendQueryString="true" />
        </rule>
        <!-- Past or unknown course dates /cursos-y-talleres/<slug>/ (301). /api/Event only lists upcoming
             dates and only those are prerendered, so a slug WITHOUT a prerendered folder is a date that
             already happened (or never existed). Known past dates (review + event archive) are already in
             the SEO 301 map above (course page by categoryId + sede). The rest: course page parsed from the
             slug; no course → "solicitar información" form on the cursos page. Dates created after the
             build also land here until the next build prerenders them (links inside the site still open them). -->
${eventRulesXml}
        <rule name="Past or unknown event form" stopProcessing="true">
          <match url="^cursos-y-talleres/([^/]+)/?$" />
          <conditions>
            ${notPrerendered}
          </conditions>
          <action type="Redirect" url="${esc(PAST_EVENT_FORM_URL)}" redirectType="Permanent" appendQueryString="false" />
        </rule>
        <!-- /cursos-y-talleres/ itself has no page: the cursos section -->
        <rule name="Event prefix to cursos" stopProcessing="true">
          <match url="^cursos-y-talleres/?$" />
          <action type="Redirect" url="${esc(EVENT_PREFIX_TARGET)}" redirectType="Permanent" appendQueryString="true" />
        </rule>
      </rules>
      <outboundRules>
        <!-- Non-production hosts: X-Robots-Tag noindex on every response -->
        <rule name="NonProd X-Robots-Tag">
          <match serverVariable="RESPONSE_X_Robots_Tag" pattern=".*" />
          <conditions>
            <add input="{HTTP_HOST}" pattern="${esc(prodHostPattern)}" negate="true" />
          </conditions>
          <action type="Rewrite" value="noindex, nofollow" />
        </rule>
      </outboundRules>
    </rewrite>
  </system.webServer>
</configuration>
`;

mkdirSync('deploy/iis', { recursive: true });
writeFileSync('deploy/iis/web.config', xml.replace(/\n/g, '\r\n'), 'utf8');
console.log('wrote deploy/iis/web.config with', SEO_REDIRECTS.length, 'redirects in', buckets.length, 'map(s)');
