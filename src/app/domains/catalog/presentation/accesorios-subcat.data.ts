/**
 * Páginas propias de las subcategorías de Accesorios (/accesorios-para-poner-una-cafeteria/<slug>/),
 * con la estructura de Métodos de extracción. Título, descripción y etiquetas salen de ACC_CATEGORIES
 * (accesorios.data.ts); SEO de ACC_SUBCAT_SEO. Fotos del hero entregadas por el cliente (webp + móvil).
 *
 * Productos: marcas y subcategorías por sección en accesorios-secciones.config.ts (PDF de secciones),
 * tarjetas desde /api/Product con app-acc-brand-products.
 */
import { METODOS_SLUG } from './metodos-extraccion.data';

const IMG = '/assets/images/accesorios/subcategorias';

export interface AccSubcatHero {
  desktop: string;
  mobile: string;
  width: number;
  height: number;
}

const hero = (slug: string, width = 1672, height = 941): AccSubcatHero => ({
  desktop: `${IMG}/hero-${slug}.webp`,
  mobile: `${IMG}/hero-${slug}-960.webp`,
  width,
  height
});

/** Foto del hero por subcategoría (asignada por contenido de la foto). Sin entrada = hero sin foto. */
export const ACC_SUBCAT_HEROES: Record<string, AccSubcatHero> = {
  'barista-espresso': hero('barista-espresso', 1659, 948), // jarra roja, báscula, timer, tamper, bagacera, vaso shot
  'te-servicio': hero('te-servicio'), // hervidor cuello de ganso, teteras de vidrio, infusor, jarra, vasos
  'bebidas-frias': hero('bebidas-frias'), // sifón para crema, bomba dosificadora, filtros Chemex/Kalita/Toddy, colador
  'catacion-medicion': hero('catacion-medicion'), // báscula Hario, tazón de catación, cuchara, charola, vaso shot
  limpieza: hero('limpieza') // Urnex Cafiza, Rinza, Café Wipz, cepillos
};

/** Subcategorías con página propia distinta (no usan la página genérica). */
export const ACC_SUBCAT_OWN_PAGES = [METODOS_SLUG];
