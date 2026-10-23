import { ASSETS_BASE_URL } from '../../../shared/kernel/config/assets-url';
/**
 * Datos de la página /insumos-para-cafeterias/jarabes/torani/.
 *
 * Fuentes (no inventar datos):
 * - Líneas (sabores, presentación, rendimiento, descripción): copiadas de `jarabesLines` / `salsasLines`
 *   en insumos-category-page.component.ts y del comparativo de jarabes en insumos.data.ts.
 *   Mantener sincronizado si cambian allá.
 * - Productos: fichas reales de tienda.cafeetrusca.com (sabores pedidos en el brief SEO del 25-sep-2026).
 *   Nombre, URL e imagen tomados de cada ficha (verificadas con HTTP 200 el 25-sep-2026).
 *   Sin precios ni existencias: esos datos viven en la tienda.
 *   Nota: la ficha IJA-102 (Fresa PET 750 ml) del brief devuelve 404 en la tienda; se usa IJA-032.
 */

export interface ToraniProduct {
  code: string;
  flavor: string;
  line: string;
  presentation: string;
  /** Nombre exacto de la ficha de tienda */
  name: string;
  url: string;
  image: string;
}

export interface ToraniLine {
  name: string;
  sub: string;
  description: string;
  formulacion: string;
  sabores: string;
  presentacion: string;
  rendimiento: string;
  image: string;
  blob: string;
  tone: 'yellow' | 'cyan' | 'lime' | 'coral';
  anchor: string;
  icons: { sabor: string; pres: string; rend: string };
}

const JAR = `${ASSETS_BASE_URL}/images/insumos/jarabes`;

export const TORANI_STORE_URL = 'https://tienda.cafeetrusca.com/productos?search=TORANI';

export const TORANI_LINES: ToraniLine[] = [
  {
    name: 'Torani', sub: 'CLÁSICO',
    description: 'Jarabe con una amplia variedad de sabores para agregar sabor a cafés, cócteles, postres y más.',
    formulacion: 'Azúcar de caña',
    sabores: '60 opciones', presentacion: '750 ml', rendimiento: 'Aprox. 25 bebidas de 450 ml',
    image: `${ASSETS_BASE_URL}/images/insumos/line-defaults/jarabes-clasico.webp`, blob: JAR + '/blob-yellow.png', tone: 'yellow', anchor: 'sabores',
    icons: { sabor: JAR + '/icon-sabor-yellow.png', pres: JAR + '/icon-pres-yellow.png', rend: JAR + '/icon-rend-yellow.png' }
  },
  {
    name: 'Torani', sub: 'SUGAR FREE',
    description: 'Formulación sin azúcar para cafés, coctelería y postres con el mismo perfil de sabor.',
    formulacion: 'Sucralosa',
    sabores: '17 opciones', presentacion: '750 ml', rendimiento: 'Aprox. 25 bebidas de 450 ml',
    image: `${ASSETS_BASE_URL}/images/insumos/line-defaults/jarabes-sugarfree.webp`, blob: JAR + '/blob-cyan.png', tone: 'cyan', anchor: 'sugar-free',
    icons: { sabor: JAR + '/icon-sabor-cyan.png', pres: JAR + '/icon-pres-cyan.png', rend: JAR + '/icon-rend-cyan.png' }
  },
  {
    name: 'Torani', sub: 'PUREMADE',
    description: 'Ingredientes naturales, sin conservadores ni colorantes artificiales.',
    formulacion: 'Ingredientes naturales',
    sabores: '2 opciones', presentacion: '750 ml', rendimiento: 'Aprox. 25 bebidas de 450 ml',
    image: JAR + '/bottle-puremade.webp', blob: JAR + '/blob-lime.png', tone: 'lime', anchor: 'sabores',
    icons: { sabor: JAR + '/icon-sabor-lime.png', pres: JAR + '/icon-pres-lime.png', rend: JAR + '/icon-rend-lime.png' }
  }
];

/** Sabores Torani Clásico más buscados (Search Console, jun-sep 2026) */
export const TORANI_CLASICO: ToraniProduct[] = [
  { code: 'IJA-097', flavor: 'Caramel', line: 'Clásico', presentation: 'Botella PET 750 ml', name: "TORANI JARABE CLASICO SABOR CARAMEL BOTELLA PET 750ml", url: 'https://tienda.cafeetrusca.com/producto/detalle/IJA-097/TORANI-JARABE-CLASICO-SABOR-CARAMEL-BOTELLA-PET-750ml', image: `${ASSETS_BASE_URL}/images/torani/productos/IJA-097.webp` },
  { code: 'IJA-186', flavor: 'Vainilla francesa', line: 'Clásico', presentation: 'Botella PET 750 ml', name: "TORANI JARABE CLASICO SABOR VAINILLA FRANCESA BOTELLA PET 750ml", url: 'https://tienda.cafeetrusca.com/producto/detalle/IJA-186/TORANI-JARABE-CLASICO-SABOR-VAINILLA-FRANCESA-BOTELLA-PET-750ml', image: `${ASSETS_BASE_URL}/images/torani/productos/IJA-186.webp` },
  { code: 'IJA-104', flavor: 'Vainilla', line: 'Clásico', presentation: 'Botella PET 750 ml', name: "TORANI JARABE CLASICO SABOR VAINILLA BOTELLA PET 750ml", url: 'https://tienda.cafeetrusca.com/producto/detalle/IJA-104/TORANI-JARABE-CLASICO-SABOR-VAINILLA-BOTELLA-PET-750ml', image: `${ASSETS_BASE_URL}/images/torani/productos/IJA-104.webp` },
  { code: 'IJA-032', flavor: 'Fresa', line: 'Clásico', presentation: 'Botella 750 ml', name: "TORANI JARABE CLASICO SABOR FRESA BOTELLA 750ml", url: 'https://tienda.cafeetrusca.com/producto/detalle/IJA-032/TORANI-JARABE-CLASICO-SABOR-FRESA-BOTELLA-750ml', image: `${ASSETS_BASE_URL}/images/torani/productos/IJA-032.webp` },
  { code: 'IJA-100', flavor: 'Avellana', line: 'Clásico', presentation: 'Botella PET 750 ml', name: "TORANI JARABE CLASICO SABOR AVELLANA BOTELLA PET 750ml", url: 'https://tienda.cafeetrusca.com/producto/detalle/IJA-100/TORANI-JARABE-CLASICO-SABOR-AVELLANA-BOTELLA-PET-750ml', image: `${ASSETS_BASE_URL}/images/torani/productos/IJA-100.webp` },
  { code: 'IJA-005', flavor: 'Chocolate blanco', line: 'Clásico', presentation: 'Botella 750 ml', name: "TORANI JARABE CLASICO SABOR CHOCOLATE BLANCO BOTELLA 750ml", url: 'https://tienda.cafeetrusca.com/producto/detalle/IJA-005/TORANI-JARABE-CLASICO-SABOR-CHOCOLATE-BLANCO-BOTELLA-750ml', image: `${ASSETS_BASE_URL}/images/torani/productos/IJA-005.webp` },
  { code: 'IJA-019', flavor: 'Crema de menta', line: 'Clásico', presentation: 'Botella 750 ml', name: "TORANI JARABE CLASICO SABOR CREMA DE MENTA BOTELLA 750ml", url: 'https://tienda.cafeetrusca.com/producto/detalle/IJA-019/TORANI-JARABE-CLASICO-SABOR-CREMA-DE-MENTA-BOTELLA-750ml', image: `${ASSETS_BASE_URL}/images/torani/productos/IJA-019.webp` },
  { code: 'IJA-012', flavor: 'Blueberry', line: 'Clásico', presentation: 'Botella 750 ml', name: "TORANI JARABE CLASICO SABOR BLUEBERRY BOTELLA 750ml", url: 'https://tienda.cafeetrusca.com/producto/detalle/IJA-012/TORANI-JARABE-CLASICO-SABOR-BLUEBERRY-BOTELLA-750ml', image: `${ASSETS_BASE_URL}/images/torani/productos/IJA-012.webp` },
  { code: 'IJA-098', flavor: 'Cereza', line: 'Clásico', presentation: 'Botella PET 750 ml', name: "TORANI JARABE CLASICO SABOR CEREZA BOTELLA PET 750ml", url: 'https://tienda.cafeetrusca.com/producto/detalle/IJA-098/TORANI-JARABE-CLASICO-SABOR-CEREZA-BOTELLA-PET-750ml', image: `${ASSETS_BASE_URL}/images/torani/productos/IJA-098.webp` }
];

export const TORANI_SUGAR_FREE: ToraniProduct[] = [
  { code: 'IJA-195', flavor: 'Vainilla', line: 'Sugar Free', presentation: 'Botella PET 750 ml', name: "TORANI JARABE SUGAR FREE SABOR VAINILLA BOTELLA PET 750ml", url: 'https://tienda.cafeetrusca.com/producto/detalle/IJA-195/TORANI-JARABE-SUGAR-FREE-SABOR-VAINILLA-BOTELLA-PET-750ml', image: `${ASSETS_BASE_URL}/images/torani/productos/IJA-195.webp` },
  { code: 'IJA-194', flavor: 'Caramelo', line: 'Sugar Free', presentation: 'Botella PET 750 ml', name: "TORANI JARABE SUGAR FREE SABOR CARAMELO BOTELLA PET 750ml", url: 'https://tienda.cafeetrusca.com/producto/detalle/IJA-194/TORANI-JARABE-SUGAR-FREE-SABOR-CARAMELO-BOTELLA-PET-750ml', image: `${ASSETS_BASE_URL}/images/torani/productos/IJA-194.webp` },
  { code: 'IJA-193', flavor: 'Avellana', line: 'Sugar Free', presentation: 'Botella PET 750 ml', name: "TORANI JARABE SUGAR FREE SABOR AVELLANA BOTELLA PET 750ml", url: 'https://tienda.cafeetrusca.com/producto/detalle/IJA-193/TORANI-JARABE-SUGAR-FREE-SABOR-AVELLANA-BOTELLA-PET-750ml', image: `${ASSETS_BASE_URL}/images/torani/productos/IJA-193.webp` },
  { code: 'IJA-197', flavor: 'Fresa', line: 'Sugar Free', presentation: 'Botella PET 750 ml', name: "TORANI JARABE SUGAR FREE SABOR FRESA BOTELLA PET 750ml", url: 'https://tienda.cafeetrusca.com/producto/detalle/IJA-197/TORANI-JARABE-SUGAR-FREE-SABOR-FRESA-BOTELLA-PET-750ml', image: `${ASSETS_BASE_URL}/images/torani/productos/IJA-197.webp` },
  { code: 'IJA-198', flavor: 'Vainilla francesa', line: 'Sugar Free', presentation: 'Botella PET 750 ml', name: "TORANI JARABE SUGAR FREE SABOR VAINILLA FRANCESA BOTELLA PET 750ml", url: 'https://tienda.cafeetrusca.com/producto/detalle/IJA-198/TORANI-JARABE-SUGAR-FREE-SABOR-VAINILLA-FRANCESA-BOTELLA-PET-750ml', image: `${ASSETS_BASE_URL}/images/torani/productos/IJA-198.webp` },
  { code: 'IJA-196', flavor: 'Crema irlandesa', line: 'Sugar Free', presentation: 'Botella PET 750 ml', name: "TORANI JARABE SUGAR FREE SABOR CREMA IRLANDESA BOTELLA PET 750ml", url: 'https://tienda.cafeetrusca.com/producto/detalle/IJA-196/TORANI-JARABE-SUGAR-FREE-SABOR-CREMA-IRLANDESA-BOTELLA-PET-750ml', image: `${ASSETS_BASE_URL}/images/torani/productos/IJA-196.webp` }
];

export const TORANI_SALSAS: ToraniProduct[] = [
  { code: 'ISA-021', flavor: 'Caramelo', line: 'Salsa Puremade', presentation: 'Bote 1.89 L', name: "TORANI SALSA PUREMADE SABOR CARAMELO BOTE 1.89 l", url: 'https://tienda.cafeetrusca.com/producto/detalle/ISA-021/TORANI-SALSA-PUREMADE-SABOR-CARAMELO-BOTE-1-89-l', image: `${ASSETS_BASE_URL}/images/torani/productos/ISA-021.webp` },
  { code: 'ISA-019', flavor: 'Chocolate oscuro', line: 'Salsa Puremade', presentation: 'Bote 1.89 L', name: "TORANI SALSA PUREMADE SABOR CHOCOLATE OSCURO BOTE 1.89 l", url: 'https://tienda.cafeetrusca.com/producto/detalle/ISA-019/TORANI-SALSA-PUREMADE-SABOR-CHOCOLATE-OSCURO-BOTE-1-89-l', image: `${ASSETS_BASE_URL}/images/torani/productos/ISA-019.webp` },
  { code: 'ISA-020', flavor: 'Chocolate blanco', line: 'Salsa Puremade', presentation: 'Bote 1.89 L', name: "TORANI SALSA PUREMADE SABOR CHOCOLATE BLANCO BOTE 1.89 l", url: 'https://tienda.cafeetrusca.com/producto/detalle/ISA-020/TORANI-SALSA-PUREMADE-SABOR-CHOCOLATE-BLANCO-BOTE-1-89-l', image: `${ASSETS_BASE_URL}/images/torani/productos/ISA-020.webp` },
  { code: 'ISA-014', flavor: 'Caramelo', line: 'Salsa Sugar Free', presentation: 'Bote 1.89 L', name: "TORANI SALSA SUGAR FREE SABOR CARAMELO BOTE 1.89 l", url: 'https://tienda.cafeetrusca.com/producto/detalle/ISA-014/TORANI-SALSA-SUGAR-FREE-SABOR-CARAMELO-BOTE-1-89-l', image: `${ASSETS_BASE_URL}/images/torani/productos/ISA-014.webp` },
  { code: 'ISA-012', flavor: 'Chocolate oscuro', line: 'Salsa Sugar Free', presentation: 'Bote 1.89 L', name: "TORANI SALSA SUGAR FREE SABOR CHOCOLATE OSCURO BOTE 1.89 l", url: 'https://tienda.cafeetrusca.com/producto/detalle/ISA-012/TORANI-SALSA-SUGAR-FREE-SABOR-CHOCOLATE-OSCURO-BOTE-1-89-l', image: `${ASSETS_BASE_URL}/images/torani/productos/ISA-012.webp` },
  { code: 'ISA-013', flavor: 'Chocolate blanco', line: 'Salsa Sugar Free', presentation: 'Bote 1.89 L', name: "TORANI SALSA SUGAR FREE SABOR CHOCOLATE BLANCO BOTE 1.89 l", url: 'https://tienda.cafeetrusca.com/producto/detalle/ISA-013/TORANI-SALSA-SUGAR-FREE-SABOR-CHOCOLATE-BLANCO-BOTE-1-89-l', image: `${ASSETS_BASE_URL}/images/torani/productos/ISA-013.webp` }
];

export const TORANI_SALSA_LINES = [
  {
    sub: 'SUGAR FREE',
    description: 'Salsas sin azúcar para aportar sabor, textura y decoración a bebidas y postres.',
    sabores: 'Caramelo, chocolate oscuro y chocolate blanco.',
    presentacion: '1.89 L',
    tone: 'cyan'
  },
  {
    sub: 'PUREMADE',
    description: 'Línea de salsas para complementar, mezclar y decorar bebidas y postres.',
    sabores: 'Caramelo, chocolate oscuro, chocolate blanco y chocolate y avellana.',
    presentacion: '1.89 L y 488 ml',
    tone: 'lime'
  }
];

export interface ToraniFaq {
  q: string;
  a: string;
}

// TODO(Héctor): confirmar la política de mayoreo y la cobertura de envíos antes de publicar
// una respuesta más específica en la pregunta 5 (hoy solo remite a un asesor, sin promesas).
export const TORANI_FAQ: ToraniFaq[] = [
  {
    q: '¿Qué sabores de jarabe Torani venden?',
    a: 'Manejamos tres líneas de jarabes Torani en botella de 750 ml: Clásico (60 opciones), Sugar Free (17 opciones) y Puremade (2 opciones). Entre los sabores más buscados están caramelo, vainilla francesa, vainilla, fresa y avellana; revisa la disponibilidad de cada sabor en la tienda en línea.'
  },
  {
    q: '¿Tienen Torani sin azúcar (sugar free)?',
    a: 'Sí. Torani Sugar Free es una formulación sin azúcar, con sucralosa, para cafés, coctelería y postres, con 17 opciones en botella de 750 ml. También hay salsas Torani Sugar Free de caramelo, chocolate oscuro y chocolate blanco.'
  },
  {
    q: '¿Cuánto rinde una botella de 750 ml?',
    a: 'Como referencia, una botella de 750 ml de Torani Clásico, Sugar Free o Puremade rinde aproximadamente 25 bebidas de 450 ml. El rendimiento real depende de la dosis que uses en cada receta.'
  },
  {
    q: '¿Cuál es la diferencia entre jarabe y salsa Torani?',
    a: 'Los jarabes se integran en la bebida para darle sabor a cafés, coctelería y postres. Las salsas, además de sabor, aportan textura y sirven para decorar bebidas y postres, por ejemplo con líneas o espirales.'
  },
  {
    q: '¿Venden Torani al mayoreo y hacen envíos a todo México?',
    a: 'Para compras por volumen y envíos, habla con un asesor de ventas: te confirmamos disponibilidad, condiciones y cobertura de entrega para tu negocio. También puedes comprar en la tienda en línea de Café Etrusca.'
  },
  {
    q: '¿Dónde compro Torani en CDMX o en sucursal?',
    a: 'Puedes comprar en la tienda en línea o visitar una sucursal Café Etrusca; en la página de Contacto encuentras las sucursales de Ciudad de México y del resto del país. Te recomendamos confirmar la disponibilidad del sabor antes de tu visita.'
  }
];
