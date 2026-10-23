/**
 * "Nuestra selección": 3 cards por página, cada una liga a un apartado relacionado (nunca a la misma página).
 * Rutas verificadas en app.routes.ts / app.routes.server.ts. Imágenes: versiones ligeras (webp, 520 px)
 * en R2 de la foto del hero o de la card de cada apartado destino. Color = color de la categoría destino.
 */
import { ASSETS_BASE_URL } from '../../../shared/kernel/config/assets-url';

export interface SeleccionCard {
  title: string;
  link: string;
  image: string;
  /** Color de fondo de la categoría destino. */
  color: string;
}

const IMG = `${ASSETS_BASE_URL}/images/insumos/seleccion`;

/** Apartados destino. color = color del hero de esa categoría (scroll-wave) o de su card en Accesorios. */
const D = {
  torani: { title: 'Jarabes Torani', link: '/insumos-para-cafeterias/jarabes/torani', image: `${IMG}/torani.webp`, color: '#ffd4c8' },
  jarabes: { title: 'Jarabes', link: '/insumos-para-cafeterias/jarabes', image: `${IMG}/jarabes.webp`, color: '#ffd4c8' },
  salsas: { title: 'Salsas', link: '/insumos-para-cafeterias/salsas', image: `${IMG}/salsas.webp`, color: '#f4eee4' },
  pures: { title: 'Purés y concentrados', link: '/insumos-para-cafeterias/pures', image: `${IMG}/pures.webp`, color: '#a4f6fb' },
  te: { title: 'Tés', link: '/insumos-para-cafeterias/te', image: `${IMG}/te.webp`, color: '#ffe566' },
  tisanas: { title: 'Tisanas', link: '/insumos-para-cafeterias/tisanas', image: `${IMG}/tisanas.webp`, color: '#f2a8a8' },
  tisanasChillout: { title: 'Tisanas ChillOut', link: '/insumos-para-cafeterias/tisanas/chillout', image: `${IMG}/tisanas.webp`, color: '#f2a8a8' },
  bases: { title: 'Bases en polvo', link: '/insumos-para-cafeterias/bases-en-polvo', image: `${IMG}/bases-en-polvo.webp`, color: '#fce4c0' },
  basesChillout: { title: 'Bases en polvo ChillOut', link: '/insumos-para-cafeterias/bases-en-polvo/chillout', image: `${IMG}/bases-chillout.webp`, color: '#fce4c0' },
  toppings: { title: 'Bubble tea', link: '/insumos-para-cafeterias/toppings', image: `${IMG}/toppings.webp`, color: '#b4b4fa' },
  accTe: { title: 'Accesorios para té', link: '/accesorios-para-poner-una-cafeteria/te-servicio', image: `${IMG}/acc-te-servicio.webp`, color: '#ffc145' },
  accFrias: { title: 'Accesorios para bebidas frías', link: '/accesorios-para-poner-una-cafeteria/bebidas-frias', image: `${IMG}/acc-bebidas-frias.webp`, color: '#ccaaff' }
} satisfies Record<string, SeleccionCard>;

/** Por slug de la categoría de insumos (página actual). */
export const SELECCION_CARDS: Record<string, SeleccionCard[]> = {
  jarabes: [D.torani, D.salsas, D.pures],
  salsas: [D.torani, D.jarabes, D.bases],
  pures: [D.jarabes, D.toppings, D.accFrias],
  te: [D.tisanas, D.accTe, D.toppings],
  tisanas: [D.tisanasChillout, D.te, D.accTe],
  'bases-en-polvo': [D.basesChillout, D.toppings, D.accFrias],
  toppings: [D.bases, D.pures, D.accFrias]
};
