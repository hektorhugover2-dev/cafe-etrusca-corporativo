import { EMPRENDE_BRANCHES, EMPRENDE_PATH } from '../../../domains/education/presentation/pages/course-branch-page/course-branch.data';
import { canonicalPath } from './site-url';

/**
 * Migas (BreadcrumbList JSON-LD) de p\u00e1ginas indexables que no arman las suyas (reauditor\u00eda SEO 5-nov-2026).
 * SeoService.set() las agrega si la p\u00e1gina no trae ya un BreadcrumbList. Etiquetas = H1 / men\u00fa del sitio.
 */
const HOME: [string, string] = ['Inicio', '/'];
const CURSOS: [string, string] = ['Cursos y talleres', '/cursos-para-baristas-y-talleres-para-cafeterias'];
const EMPRENDE: [string, string] = ['Emprendiendo mi negocio de barra de caf\u00e9 y cafeter\u00eda', '/' + EMPRENDE_PATH];

const PAGE_CRUMBS: Record<string, Array<[string, string]>> = {
  '/': [HOME],
  '/nosotros/': [HOME, ['Nosotros', '/nosotros']],
  '/contacto/': [HOME, ['Contacto', '/contacto']],
  '/recetas/': [HOME, ['Recetas', '/recetas']],
  '/videoteca/': [HOME, ['Videoteca', '/videoteca']],
  '/insumos-y-equipo-para-cafeterias/': [HOME, ['Insumos y equipo para cafeter\u00edas', '/insumos-y-equipo-para-cafeterias']],
  '/aviso-de-privacidad/': [HOME, ['Aviso de privacidad', '/aviso-de-privacidad']],
  '/aviso-de-privacidad-simplificado/': [HOME, ['Aviso de privacidad simplificado', '/aviso-de-privacidad-simplificado']],
  '/politica-de-productos-perecederos/': [HOME, ['Pol\u00edtica de productos perecederos', '/politica-de-productos-perecederos']],
  '/terminos-y-condiciones/': [HOME, ['T\u00e9rminos y condiciones', '/terminos-y-condiciones']],
  '/politicas-externas-cursos/': [HOME, CURSOS, ['Pol\u00edticas externas', '/politicas-externas-cursos']],
  '/cursos-para-baristas-y-talleres-para-cafeterias/': [HOME, CURSOS],
  '/educacion/cursos/': [HOME, CURSOS, ['Nuestros cursos', '/educacion/cursos']],
  '/educacion/talleres/': [HOME, CURSOS, ['Talleres de especializaci\u00f3n', '/educacion/talleres']],
  '/educacion/sesiones/': [HOME, CURSOS, ['Sesiones sabatinas', '/educacion/sesiones']],
  '/educacion/experiencias/': [HOME, CURSOS, ['Experiencias', '/educacion/experiencias']],
  ['/' + EMPRENDE_PATH + '/']: [HOME, CURSOS, EMPRENDE]
};
for (const b of EMPRENDE_BRANCHES) {
  PAGE_CRUMBS['/' + EMPRENDE_PATH + '-en-' + b.citySlug + '/'] = [HOME, CURSOS, EMPRENDE, [b.cityLabel, '/' + EMPRENDE_PATH + '-en-' + b.citySlug]];
}

/** Migas para una ruta del sitio (canonical), o null si la p\u00e1gina no est\u00e1 en el mapa. */
export function pageBreadcrumbs(path: string): Array<[string, string]> | null {
  return PAGE_CRUMBS[canonicalPath(path)] ?? null;
}
