# Café Etrusca — handoff sitio web (Huguito)

Documento para que **otro bot / asistente** continúe el trabajo de UI/UX y front del sitio corporativo sin perder contexto.

**Usuario:** Héctor Hugo Rivera González — hablar en **español**, tono directo y cercano (sin “Certainly”, sin help-desk).  
**Proyecto:** `C:\laragon\cafe-etrusca-corporativo-main` (Laragon, Windows)  
**Máquina:** `ETR-HRIVERA` · machineId típico en Grok Bot: `c757827d-382d-47ed-9d47-4b731fa3186b`  
**Sitio prod:** https://cafeetrusca.com  
**Dev:** `ng serve` → http://localhost:4200  

**Stack:** Angular 19 (SSR), Bootstrap, Leaflet, SCSS, assets en `public/`.

---

## Quién era Huguito

| Campo | Valor |
|---|---|
| Nombre | **Huguito** |
| Rol | Asistente Grok Bot de **UI/UX + dirección visual + front** del rediseño |
| Norte | Guía Maestra de Estilo de **Lizbeth** (Café Etrusca, sep 2026) |

### ADN visual (no negociable)
- Sensación: **museo elegante** + creativo/colorido + comercial claro.
- Tipografía: **Poppins** (jerarquía fuerte; no todo bold).
- Estructura: navy `#070C3B`, `#192966`, blanco `#FFFFFF`, casi-negro títulos.
- Acentos: amarillo / lima / turquesa / rosa-coral / arena — **1 dominante + 1 complemento por sección** (nunca arcoíris).
- Mucho aire, títulos grandes editoriales, ondas/blobs, producto recortado, cards limpias (≈3 col desktop), CTAs verbales claros.
- **No:** catálogo PDF, ecommerce genérico, plantilla gris, cards idénticas en todas las secciones.

---

## Archivos / rutas clave

| Área | Ruta |
|---|---|
| Home | `src/app/composition/home/presentation/home-page/` |
| Recetas listado | `src/app/domains/catalog/presentation/pages/recipes-page/recipes-page.component.*` |
| Receta detalle | `.../recipe-detail-page.component.*` |
| Data recetas | `.../recipes-page/recetas.data.ts` |
| Café theme / nav | `src/app/.../cafe-nav/`, estilos café en theme SCSS del dominio |
| Máquinas | páginas maquinarias + `maquinas-page.component.scss` |
| Nosotros | `about-page.component.*` |
| Assets recetas | `public/assets/images/recetas/` (`calabaza/`, `verano/`, `temporada/`, `origen-*.webp`) |
| Separador H2 | `public/assets/images/separador.png` (estilo Compromiso ≈ 549×30) |

### Imágenes / Imagine
Todo el pipeline Grok Imagine → rembg → webp → instalar está en:

**[`recetas.md`](./recetas.md)** ← **léelo siempre** antes de tocar fotos.

Huguito no es el dueño del pipeline de fotos; coordina UI del recetario. El compañero de imágenes (p. ej. **el chido**) suele llevar Imagine.

---

## Convenciones técnicas (obligatorias)

1. **UTF-8 + acentos:** no escribir español con `Set-Content` PowerShell a secas. Preferir **Node `fs.writeFileSync(..., 'utf8')`** o scripts `.js` en Downloads.
2. **CRLF** en el repo Windows; al hacer replace, usar regex con `\r?\n`.
3. **CopyFromBox / CopyToBox** a rutas Laragon a menudo fallan (“outside local-exec root”). Flujo: box → `C:\Users\Hector Rivera\Downloads\` → `Copy-Item` al proyecto.
4. No inventar menús de Grok Bot; no narrar internals al usuario.
5. Edits en el proyecto **local** Laragon (no clonar a la box salvo que Héctor lo pida).

---

## Qué ya quedó (UI — sep 2026)

### Nosotros (`/nosotros`)
- Sin video en hero; título centrado tamaño tipo Insumos/Jarabes.
- `app-scroll-wave` blanca abajo; sin onda SVG que tapara el H1.

### Café (Premium / Especialidad / Verde)
- `app-cafe-nav` bajo heroes; spacing tipo Insumos (sin margin negativo agresivo).
- Heroes homologados (padding/min-height/H1 como Jarabes).
- Premium: bolsa **delante** de la taza (z-index); CTA imagen local americano amarillo.

### Máquinas
- Hero/nav alineados a Jarabes.
- Sin franja blanca rara antes de waves inferiores en secciones líder.

### Separador / H2
- Raya tipo **NUESTRO COMPROMISO** (`separator.png` ~549×30) en home, compromiso, recetas (`.rc-sep`), productos, etc. — no la raya chica de Insumos.

### Recetario
- Colección **Otoño · Calabaza** antes de Fiestas Patrias en `/recetas`.
- Orígenes visuales: `.origin-calabaza` / septiembre / verano (pattern + color en media).
- Home: primeras calabaza en `homeRecipes`; fondos `origin-calabaza` en wrappers.
- Leyenda en cards: **`Sugerencia de preparación`** (clase `.recipe-legend`, uppercase gris) en:
  - Home (cards recetas)
  - `/recetas` (featured + grids)
  - Detalle (“Más recetas” / `.co-recipe-card`)
- Calabaza: 9 webp locales sin fondo en `public/assets/images/recetas/calabaza/` y `image`/`banner` locales en data.

### CSS / front cuidables
- Iconos mega-menú: activo en negro sobre círculo de color; stroke medio homogéneo.
- No reintroducir `margin-top: -5.5rem` en navs tipo Insumos/Café salvo que Héctor lo pida.

---

## Pendientes / handoff vivo

### Fotos (ver detalle actualizado en `recetas.md`)
Al momento de escribir este handoff (2026-09-19), el estado en `recetas.md` apuntaba a:
- **Redo:** `orange-cream-cold-brew` (anti-CGI, sin sombra inferior).
- **Pendientes Imagine:** `soda-tropical-espumosa`, `sparkling-cherry`.
- Verano ya con rutas locales en data hacia `public/assets/images/recetas/verano/`.

**Revalidar siempre `recetas.md`** — ese archivo es la fuente de verdad de fotos.

### UI posible siguiente
- Revisar visual de cards con la nueva leyenda (espaciado móvil).
- Cualquier homologación que Héctor pida (heroes, waves, CTAs) siguiendo Lizbeth.
- Si llegan más assets: instalar webp + cablear `recetas.data.ts` (`image` + `banner`).

---

## Cómo tocar recetas (UI)

1. Listado: `recipes-page.component.html` + `.scss` (`.rc-card`, `.rc-card-media`, `.recipe-legend`).
2. Detalle related: `recipe-detail-page.component.html` + `.scss` (`.co-recipe-card .recipe-legend`).
3. Home: bloque RECETAS en `home-page.component.html` + `.scss`.
4. Data: `recetas.data.ts` — campos `slug`, `title`/`titleAccent`, `origin`, `collection`, `image`, `banner`, `summary`, etc.
5. Patrones de origen: assets `origen-calabaza.webp`, `origen-septiembre-2026.webp`, `origen-verano-2026.webp`.

---

## Checklist rápido antes de dar por cerrado un cambio UI

- [ ] ¿Se entiende en &lt;5 s?
- [ ] ¿Jerarquía H1/H2/H3 y aire?
- [ ] ¿Se siente Café Etrusca (no plantilla)?
- [ ] ¿CTA claro?
- [ ] ¿Desktop + móvil reinterpretados?
- [ ] ¿Acentos UTF-8 correctos en el archivo?
- [ ] ¿Assets webp con transparencia donde aplica?

---

## Mensaje corto para el bot que retoma

> Eres el relevo de **Huguito** en Café Etrusca. Sigue la Guía Lizbeth. Proyecto en Laragon (`cafe-etrusca-corporativo-main`). Para fotos lee y actualiza **`recetas.md`**. Para UI de recetas: home + `recipes-page` + `recipe-detail-page` + `recetas.data.ts`. Leyenda ya puesta: “Sugerencia de preparación”. No reintroducir nav con `-5.5rem`. Transfiere archivos vía Downloads. Habla español con Héctor.

---

## Créditos (sugerido)

> UI/UX e implementación de interfaz del sitio corporativo Café Etrusca, alineada a la dirección visual de Lizbeth, con apoyo de **Huguito** (Grok Bot).  
> Pipeline de imágenes de recetas: ver `recetas.md`.

---

*Última actualización handoff: 2026-09-19 · Huguito*
