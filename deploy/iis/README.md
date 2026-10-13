# Reglas de hosting (IIS) — SEO fases 1 y 2

El sitio de desarrollo (`desarrollo.cafeetrusca.com`) se sirve como **archivos estáticos**
(`dist/cafe-etrusca-corporativo/browser`) desde **IIS detrás de Cloudflare**; no corre `server.ts`.
Por eso las reglas de `src/server.ts` (noindex por host, robots.txt y 301) **no aplican ahí**.
Este `web.config` es el equivalente a nivel hosting.

## Qué hace `web.config`

1. Host distinto de `cafeetrusca.com` / `www.cafeetrusca.com` (p. ej. `desarrollo.`):
   - cabecera `X-Robots-Tag: noindex, nofollow` en todas las respuestas;
   - `/robots.txt` se sirve desde `/robots-noindex.txt` (`Disallow: /`).
   Producción sigue indexable: el HTML y `public/robots.txt` no cambian.
2. `www.cafeetrusca.com` → `https://cafeetrusca.com/` (301).
3. Mapa de 301 de URLs viejas → nuevas, generado desde `src/seo-redirects.ts`
   (fase 1 + revisión de fase 2 en `src/seo-redirects.reviewed.ts` + duplicados de catálogo
   `/productos/insumos|maquinas|accesorios/*`).
   - Las claves distinguen mayúsculas (`ignoreCase="false"`). IIS no admite dos claves que solo
     difieran en mayúsculas dentro del mismo mapa, así que esas variantes (p. ej. `/Sucursales` y
     `/sucursales`) van en un segundo mapa `SeoRedirects2` con su propia regla.

4. Fechas de cursos `/cursos-y-talleres/<slug>/` (slug = campo `url` de cada evento de
   `https://cafeetrusca.com/api/Event`):
   - En el build se **prerenderizan** todas las fechas que devuelve la API en ese momento (la API solo
     lista fechas próximas). Si la API no responde en el build, se usa `public/data/events.json`.
   - **Fecha pasada o slug desconocido** (no hay carpeta prerenderizada) → **301**, en este orden:
     1. **Mapa SEO 301** (por evento): los ~300 eventos viejos de la revisión SEO (tarea 7: página del curso
        en la sucursal) y cada fecha que algún build ya vio y que ya pasó (`event-archive.data.ts`,
        actualizado en `prebuild` por `scripts/update-event-archive.mjs`) → página del curso por
        `categoryId` + sucursal (`past-event-target.ts`); si el curso no tiene página, al formulario.
     2. **Reglas `Past event <grupo> sede` / `Past event <grupo>`** (slug sin datos): el curso se deduce
        del slug (mismas palabras clave que `legacy-city-matrix.ts`) → página curso × sucursal (mapa
        `PastEventCourse`) o la página nacional del curso.
     3. **Regla `Past or unknown event form`**: sin curso → `/cursos-para-baristas-y-talleres-para-cafeterias/#solicitar-informacion`
        (la página de cursos abre el mismo formulario "solicitar información" de los cursos, **sin fecha**:
        ni se muestra ni se envía `fecha`). Es un fragmento: Google solo ve la página real de cursos.
     - Condición común: no existe `{APPL_PHYSICAL_PATH}cursos-y-talleres\<slug>\index.html`.
       `/cursos-y-talleres/` sola → página de cursos (regla `Event prefix to cursos`).
     - Los destinos se resuelven igual que el mapa (página de sucursal en noindex → principal; sin cadenas).
   - Una fecha que ya pasó pero sigue prerenderizada (el build se hizo antes de la fecha) se sirve con 200
     hasta el siguiente build; en el navegador el resolver de la ruta la manda a cursos con `replaceUrl`.
     Por eso conviene **reconstruir y publicar seguido** (idealmente a diario): en cada build la fecha pasada
     deja de prerenderizarse, sale del sitemap y empieza a dar 301.
   - Fechas **creadas después del build**: al entrar directo a su URL también dan 301 a cursos hasta el
     siguiente build (los enlaces "Ver detalle de la fecha" dentro del sitio sí las abren, porque navegan
     en el navegador y cargan el evento desde la API).
   - `npm run build` corre `prebuild` (`scripts/update-event-archive.mjs` + `scripts/write-sitemap.mjs`: sitemap solo con fechas próximas) y
     `postbuild` (`scripts/write-iis-webconfig.mjs`: este web.config), así sitemap, prerender y 301 coinciden.
   - En Node (`server.ts`) aplican las mismas reglas (mapa + slug → curso, si no formulario), solo si no hay
     `browser/cursos-y-talleres/<slug>/index.html`. En el navegador, el resolver de la ruta hace lo mismo.
   - `event-archive.data.ts` se regenera en cada build y **hay que versionarlo/conservarlo** (es la memoria
     de las fechas que la API ya olvidó). No borrar entradas.

5. `/index.html` y `/<página>/index.html` → `/` y `/<página>/` (301): una sola versión por página.
6. Al generar con la carpeta del build, el script **quita** (y avisa) cualquier 301 cuya clave sea una
   página prerenderizada (carpeta con `index.html`, mismas mayúsculas), para que ninguna regla tape
   una página viva; y revisa que cada destino exista.
7. Tarea 6: `/Sucursales` y `/Blog/Detail/sucursal-etrusca-merida` → nueva página `/sucursales/`
   (Mérida con `#merida`; con query string IIS la añade después del `#`, inofensivo).

## Requisitos / riesgos

- Fechas pasadas/desconocidas: probar `curl -I https://desarrollo.cafeetrusca.com/cursos-y-talleres/no-existe/`
  (esperado: `301` con `Location: /cursos-para-baristas-y-talleres-para-cafeterias/#solicitar-informacion`),
  una fecha pasada con curso, p. ej. `/cursos-y-talleres/curso-basico-barista-tijuana-julio-2026/`
  (esperado: `301` a `/taller-basico-para-baristas-en-tijuana/`) y una fecha próxima
  (esperado: `200`). Si la próxima diera 301, el sitio no está en la raíz de la aplicación IIS
  (`APPL_PHYSICAL_PATH`): avisar para ajustar la condición.


- Requiere el módulo **IIS URL Rewrite 2.x**. Si no está instalado, IIS responde **500.19 en todo
  el sitio**. Verificar en el servidor antes de publicar.
- **No** está en `public/` a propósito: así no se copia solo a producción en cada build.
- Si el servidor ya tiene un `web.config` en la raíz, hay que fusionar la sección `<rewrite>`.
- Algunas URLs viejas llevan `&`, espacios o acentos (p. ej. `/taller-de-bubble-tea-&-iced-coffee`,
  `/Blog/Detail/De la tierra a la mesa - ...`). URL Rewrite compara la ruta ya decodificada, así que
  deberían funcionar, pero conviene probar 2 o 3 con `curl -I` después de publicar. Si IIS responde
  400/404 antes de la regla, revisar *Request Filtering* (caracteres/doble escape) en el sitio.

## Regenerar

```
npm run build        (ya corre los dos scripts: prebuild + postbuild)
node scripts/write-sitemap.mjs
node scripts/write-iis-webconfig.mjs dist/cafe-etrusca-corporativo/browser
```
Correr ambos junto con cada build: las fechas de `/api/Event` cambian (sitemap, prerender y 301 deben coincidir).
(el argumento opcional revisa que cada destino exista en el build)

## Desarrollo (desarrollo.cafeetrusca.com): bloqueo recomendado, sin cambios de código (D1)

Decisión aprobada en la revisión SEO (25 sep 2026): el host de desarrollo se bloquea **solo en Cloudflare**,
sin tocar el código del sitio.

1. **Cloudflare Access** delante de `desarrollo.cafeetrusca.com` (contraseña o correo). Es la protección real:
   Google y cualquier bot reciben la pantalla de login, no el sitio.
2. **Transform Rule** (Rules → Transform Rules → *Modify Response Header*), solo para ese host:
   `http.host eq "desarrollo.cafeetrusca.com"` → *Set static* `X-Robots-Tag` = `noindex, nofollow`.
   Nunca debe aplicarse al host de producción (`cafeetrusca.com`).
3. **No** usar `Disallow: /` en el robots.txt de desarrollo *junto* con el noindex: si el bot no puede
   leer la página, no ve el `noindex` y la URL puede quedar indexada igual (solo con la URL). Con Access
   + `X-Robots-Tag` no hace falta.
4. El `robots.txt` del repositorio queda como el de **producción** (bloquea `Google-Extended`, `GoogleOther`,
   `GoogleOther-Image` y `GoogleOther-Video`; permite el rastreo normal). No se modifica por host.

(El `web.config` generado ya incluye una regla de respaldo para hosts que no son de producción:
`X-Robots-Tag: noindex, nofollow` y `robots.txt` con `Disallow: /`; con Cloudflare Access delante no se usa.
Si se prefiere la regla única de Cloudflare, se puede dejar; no hay conflicto.)

## Reglas SEO del sitio (tarea 7, aprobadas)

- **Una URL principal por intención** (`src/app/domains/education/presentation/primary-urls.ts`): la página vieja
  con clics es la principal; los sinónimos dan **301** (`PRIMARY_REDIRECTS`) o mantienen la página con
  `rel=canonical` a la principal (`CANONICAL_OVERRIDES`, p. ej. sedes CDMX de barista → `/curso-de-barista-cdmx/`).
  Enlaces internos, breadcrumbs y sitemap solo apuntan a principales. Sin cadenas ni bucles:
  `write-iis-webconfig.mjs` **falla** si encuentra una cadena, un bucle, un 301 a una URL 410 o una página viva con 301.
- **Páginas curso × sede sin fechas** (`page-indexing.ts`): `<meta name="robots" content="noindex,follow">`
  y fuera del sitemap; vuelven solas (index + sitemap) en cuanto `/api/Event` trae una fecha próxima.
  Excepción: las 11 páginas con clics en GSC siguen indexables. Las URL de eventos pasados hacen 301 a la
  página indexable (o a la principal nacional del curso si la de la sede está en noindex).
  `write-sitemap.mjs` y `write-iis-webconfig.mjs` deben correr juntos tras cada build.
- **Blog:** `/Blog` y `/blog` → 301 `/recetas/`; "11 cosas que te hacen perder dinero" → 301 emprende;
  los 10 posts de aditivos/gomas → **410 Gone** (regla `Gone 410` en el web.config; en Node, `server.ts`).
  Requiere que IIS tenga habilitado *CustomResponse* en URL Rewrite (incluido en URL Rewrite 2.x).
- Experiencias con fechas de ejemplo (catación, crear mezcla, sensorial, oasis) fuera del hub y del sitemap
  hasta tener fechas reales (`hasUpcomingCourseDates`).
