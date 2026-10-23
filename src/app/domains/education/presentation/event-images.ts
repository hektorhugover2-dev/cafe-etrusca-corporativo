import { ASSETS_BASE_URL } from '../../../shared/kernel/config/assets-url';
/**
 * Event / course-category images of /api/Event that only existed on the old cafeetrusca.com
 * server (/RecursosMKT/..., /img/...). Downloaded on 25 sep 2026 into public/assets/images/eventos/
 * so the new static host serves them. Keys: decoded, lower-case old path.
 * New images added in the admin after that date are not here: the event then falls back to its
 * category image, and finally to the course banner. Add them (download + one line) when a new
 * campaign image appears, or ask for the admin to upload images under /assets.
 */
const LOCAL_EVENT_IMAGES: Readonly<Record<string, string>> = {
  "/img/curso-avanzado-de-arte-latte.webp": `${ASSETS_BASE_URL}/images/eventos/curso-avanzado-de-arte-latte.webp`,
  "/img/curso-basico-de-arte-latte.webp": `${ASSETS_BASE_URL}/images/eventos/curso-basico-de-arte-latte.webp`,
  "/img/talleres y cursos/artelatte.webp": `${ASSETS_BASE_URL}/images/eventos/categorias/artelatte.webp`,
  "/img/talleres y cursos/barista-especializado.webp": `${ASSETS_BASE_URL}/images/eventos/categorias/barista-especializado.webp`,
  "/img/talleres y cursos/brewcoldbrew.webp": `${ASSETS_BASE_URL}/images/eventos/categorias/brewcoldbrew.webp`,
  "/img/talleres y cursos/bubbletea.webp": `${ASSETS_BASE_URL}/images/eventos/categorias/bubbletea.webp`,
  "/img/talleres y cursos/formacionbarista.webp": `${ASSETS_BASE_URL}/images/eventos/categorias/formacionbarista.webp`,
  "/img/talleres y cursos/formacionemprendedores.webp": `${ASSETS_BASE_URL}/images/eventos/categorias/formacionemprendedores.webp`,
  "/img/talleres y cursos/mixologia.webp": `${ASSETS_BASE_URL}/images/eventos/categorias/mixologia.webp`,
  "/recursosmkt/rasayel/otono-2024/emprendedores.jpeg": `${ASSETS_BASE_URL}/images/eventos/emprendedores.webp`,
  "/recursosmkt/rasayel/otono-2024/mixologia.jpg": `${ASSETS_BASE_URL}/images/eventos/mixologia.webp`,
  "/recursosmkt/rasayel/otono-2024/taller-baristas.jpg": `${ASSETS_BASE_URL}/images/eventos/taller-baristas.webp`,
};

/** Local image per categoryId (fallback when the event's own image is not mirrored). */
const CATEGORY_IMAGES: Readonly<Record<number, string>> = {
  1: `${ASSETS_BASE_URL}/images/eventos/categorias/formacionbarista.webp`,
  2: `${ASSETS_BASE_URL}/images/eventos/curso-basico-de-arte-latte.webp`,
  4: `${ASSETS_BASE_URL}/images/eventos/categorias/brewcoldbrew.webp`,
  7: `${ASSETS_BASE_URL}/images/eventos/categorias/bubbletea.webp`,
  9: `${ASSETS_BASE_URL}/images/eventos/categorias/mixologia.webp`,
  10: `${ASSETS_BASE_URL}/images/eventos/categorias/formacionemprendedores.webp`,
  12: `${ASSETS_BASE_URL}/images/eventos/categorias/bubbletea.webp`,
  16: `${ASSETS_BASE_URL}/images/eventos/categorias/barista-especializado.webp`,
  26: `${ASSETS_BASE_URL}/images/eventos/curso-avanzado-de-arte-latte.webp`,
  38: `${ASSETS_BASE_URL}/images/eventos/categorias/brewcoldbrew.webp`
};

function localPath(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith(`${ASSETS_BASE_URL}/`)) return path;
  if (path.startsWith('/assets/')) return ASSETS_BASE_URL + path.slice('/assets'.length);
  let p = path.replace(/^https?:\/\/(www\.)?cafeetrusca\.com/i, '').split('?')[0];
  try {
    p = decodeURI(p);
  } catch {
    /* keep raw */
  }
  return LOCAL_EVENT_IMAGES[p.toLowerCase()] ?? null;
}

/**
 * Site-relative image for an /api/Event object: its own image or its category image when
 * mirrored locally, else the category fallback above, else `fallback` (e.g. the course banner).
 */
export function localEventImage(event: any, fallback = ''): string {
  return (
    localPath(event?.image) ??
    localPath(event?.category?.image) ??
    CATEGORY_IMAGES[Number(event?.categoryId)] ??
    fallback
  );
}
