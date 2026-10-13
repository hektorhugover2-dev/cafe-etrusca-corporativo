/**
 * Mapeo sección de Accesorios → subcategorías, tomado del PDF del cliente (hoja "Barista y espresso |
 * Métodos & Extracción | Té y Servicio | Bebidas Frías & Complementos | Catación y Medición | Limpieza y
 * Mantenimiento"). Las etiquetas de las píldoras son las del PDF, en su orden.
 *
 * La API (/api/Product) no trae subcategoría: cada subcategoría se reconoce por palabras clave en `nombre`
 * (normalizado: mayúsculas, sin acentos ni signos; sin la marca al inicio). Cada producto pertenece a UNA sola
 * sección/subcategoría: las reglas se evalúan en el orden global de ACC_RULE_ORDER (gana la primera), de lo
 * más específico a lo más genérico (p. ej. "VASO MEDIDOR" → Barista antes que "VASO" → Té y servicio;
 * "BASCULA … PARA V60" → Catación antes que "V60" → Métodos). Los productos que no encajan en ninguna
 * subcategoría no se muestran. Además del PDF hay 3 subcategorías nuevas aprobadas por el cliente (30-sep-2026):
 * Métodos → "Cafeteras moka y otros métodos" y "Filtros"; Té y servicio → "Tazas y termos".
 *
 * Marcas por sección: el PDF no las define. Se usan las marcas del sitio (ACC_BRAND_STRIP / MET_BRANDS) que
 * tienen productos con thumbnail en la sección según la API (revisado el 30-sep-2026).
 * TODO(contenido): confirmar marcas por sección con el cliente.
 */

export type AccSectionSlug =
  | 'barista-espresso'
  | 'metodo-extraccion'
  | 'te-servicio'
  | 'bebidas-frias'
  | 'catacion-medicion'
  | 'limpieza';

/**
 * Regla de coincidencia sobre el nombre normalizado. Todas las condiciones presentes deben cumplirse.
 * Una palabra clave coincide al inicio de palabra ("TAMPER" ⊂ "TAMPERS"); con espacio final es palabra
 * exacta ("TE " = la palabra TÉ).
 * - start: el nombre (sin la marca) empieza con alguna.
 * - any:   contiene alguna.
 * - all:   contiene todas.
 * - not:   no contiene ninguna.
 */
export interface AccMatch {
  start?: string[];
  any?: string[];
  all?: string[];
  not?: string[];
}

export interface AccSubcatDef {
  key: string;
  /** Texto del PDF. */
  label: string;
  match: AccMatch[];
}

export interface AccSectionConfig {
  slug: AccSectionSlug;
  brands: string[];
  /** Subcategorías del PDF, en su orden. */
  subcats: AccSubcatDef[];
}

export const ACC_SECTIONS: Record<AccSectionSlug, AccSectionConfig> = {
  'barista-espresso': {
    slug: 'barista-espresso',
    brands: ['La fenice'],
    subcats: [
      { key: 'jarras-espumadoras', label: 'Jarras espumadoras', match: [{ start: ['JARRA ESPUMADORA', 'JARRAS ESPUMADORAS', 'JARRA PARA ESPUMAR', 'PITCHER'] }] },
      { key: 'tampers', label: 'Tampers', match: [{ start: ['TAMPER', 'COMPACTADOR'] }] },
      { key: 'vasos-medidores', label: 'Vasos medidores', match: [{ start: ['VASO MEDIDOR', 'VASOS MEDIDORES', 'VASO SHOT'] }] },
      { key: 'tazas-dosificadoras', label: 'Tazas dosificadoras', match: [{ start: ['TAZA DOSIFICADORA', 'TAZAS DOSIFICADORAS', 'ANILLO DOSIFICADOR', 'EMBUDO DOSIFICADOR'] }] },
      { key: 'termometros', label: 'Termómetros', match: [{ start: ['TERMOMETRO'] }] },
      { key: 'reloj-extraccion', label: 'Reloj de extracción', match: [{ start: ['RELOJ'] }] },
      { key: 'bases-cojines', label: 'Bases/cojines compactadores', match: [{ start: ['COJIN', 'BASE ELEVADA', 'BASE COMPACTADORA', 'BASE PARA COMPACTAR', 'TAPETE'] }] },
      // + repuestos de bagacera (p. ej. goma La Fenice AAC-085)
      { key: 'bagaceras', label: 'Bagaceras', match: [{ start: ['BAGACERA', 'KNOCK BOX'] }, { start: ['REPUESTO'], any: ['BAGACERA'] }] },
      { key: 'charolas-escurridoras', label: 'Charolas escurridoras', match: [{ start: ['CHAROLA ESCURRIDORA', 'CHAROLAS ESCURRIDORAS'] }] },
      { key: 'jarras-espresso', label: 'Jarras para espresso', match: [{ start: ['JARRA'], any: ['ESPRESSO', 'ESPRESO'] }] }
    ]
  },
  'metodo-extraccion': {
    slug: 'metodo-extraccion',
    brands: [], // Métodos usa MET_BRANDS (marcas de su diseño)
    subcats: [
      // + Hario Zebrang (cafetera de doble taza = dripper, ABC-314)
      { key: 'drippers', label: 'Drippers', match: [{ any: ['DRIPPER'] }, { any: ['ZEBRANG'] }] },
      { key: 'v60', label: 'V60', match: [{ any: ['V60'] }] },
      { key: 'prensas-francesas', label: 'Prensas francesas', match: [{ start: ['PRENSA'] }] },
      { key: 'chemex', label: 'Chemex', match: [{ any: ['CHEMEX'] }] },
      { key: 'aeropress', label: 'AeroPress', match: [{ any: ['AEROPRESS'] }] },
      { key: 'sifon-japones', label: 'Sifón japonés', match: [{ any: ['SIFON JAPONES'] }] },
      { key: 'toddy-cold-brew', label: 'Toddy/cold brew', match: [{ any: ['TODDY', 'COLD BREW', 'MIZUDASHI', 'TORRE EN FRIO', 'CAFE FRIO'] }] },
      {
        key: 'jarras-cuello-ganso',
        label: 'Jarras cuello de ganso',
        // Las teteras Brewista Artisan son hervidores de cuello de ganso (el diseño de Métodos las muestra
        // como "Hervidor Cuello de Ganso").
        match: [{ any: ['CUELLO DE GANSO', 'GOOSENECK', 'HERVIDOR'] }, { all: ['TETERA', 'ARTISAN'] }]
      },
      { key: 'molinos-manuales', label: 'Molinos manuales', match: [{ all: ['MOLINO', 'MANUAL'] }] },
      // Nuevas (no están en el PDF; aprobadas por el cliente el 30-sep-2026). Van al final de ACC_RULE_ORDER:
      // sólo toman productos que no encajan en ninguna otra subcategoría (los filtros de V60/Chemex/Toddy se
      // quedan con su método).
      {
        key: 'moka-otros-metodos',
        label: 'Cafeteras moka y otros métodos',
        match: [{ start: ['MOKITA', 'MOKA', 'CAFETERA MOKA', 'CAFETERA MANUAL', 'KIT PARA PREPARAR CAFE', 'METODO DE EXTRACCION'] }]
      },
      {
        key: 'filtros',
        label: 'Filtros',
        match: [{ start: ['FILTRO ', 'FILTROS ', 'STEEPING FILTER'] }, { start: ['RECIPIENTE'], any: ['FILTROS'] }]
      }
    ]
  },
  'te-servicio': {
    slug: 'te-servicio',
    brands: ['La fenice', 'Hario', 'Brewista', 'Chemex'],
    subcats: [
      { key: 'infusores', label: 'Infusores', match: [{ any: ['INFUSOR'] }] },
      { key: 'teteras', label: 'Teteras', match: [{ start: ['TETERA'] }] },
      { key: 'vasos', label: 'Vasos', match: [{ start: ['VASO'] }] },
      {
        key: 'jarras-servidoras',
        label: 'Jarras servidoras',
        match: [{ start: ['JARRA SERVIDORA', 'JARRA DE SERVICIO', 'JARRA DE VIDRIO', 'JARRA DE CRISTAL', 'DECANTADOR', 'SERVIDOR'] }]
      },
      { key: 'accesorios-te', label: 'Accesorios relacionados con té', match: [{ any: ['TE ', 'MATCHA', 'CHASEN'] }] },
      // Nueva (no está en el PDF; aprobada por el cliente el 30-sep-2026). Al final de ACC_RULE_ORDER: no quita
      // tazas dosificadoras (Barista) ni tazones de catación. "TERMO " con espacio: no confunde "TERMOMETRO".
      {
        key: 'tazas-termos',
        label: 'Tazas y termos',
        match: [{ start: ['TAZA ', 'TAZAS ', 'TERMO ', 'PLATO Y TAZA'], not: ['DOSIFICADORA', 'CATACION'] }]
      }
    ]
  },
  'bebidas-frias': {
    slug: 'bebidas-frias',
    brands: ['La fenice', 'BestWhip'],
    subcats: [
      { key: 'bombas-salsas', label: 'Bombas para salsas', match: [{ all: ['BOMBA'], any: ['SALSA'] }] },
      { key: 'dosificadores-jarabe', label: 'Dosificadores para jarabe', match: [{ any: ['DOSIFICADOR', 'BOMBA', 'PUMP'], all: ['JARABE'] }] },
      { key: 'cucharas-tapioca', label: 'Cucharas para tapioca', match: [{ all: ['CUCHARA', 'TAPIOCA'] }] },
      { key: 'sifones-crema', label: 'Sifones para crema', match: [{ all: ['SIFON', 'CREMA'] }, { all: ['SIFON'], any: ['DUYA'] }] },
      { key: 'sifones-soda', label: 'Sifones para soda', match: [{ all: ['SODA'], any: ['SIFON', 'CAPSULA', 'CARGA'] }] },
      {
        key: 'complementos-barra',
        label: 'Complementos de barra',
        match: [
          { start: ['POPOTE', 'SHAKER', 'COCTELERA', 'PALETA MEZCLADORA', 'CUCHARA MEZCLADORA', 'SALERO', 'ESPOLVOREADOR', 'FRASCO ESPECIERO', 'DISPENSADOR'] },
          { any: ['SELLADO', 'SELLADORA'] }
        ]
      }
    ]
  },
  'catacion-medicion': {
    slug: 'catacion-medicion',
    brands: ['La fenice', 'Hario'],
    subcats: [
      {
        key: 'tazones-cucharas-catacion',
        label: 'Tazones y cucharas de catación',
        match: [{ all: ['CATACION'], any: ['TAZON', 'CUCHARA'] }, { any: ['CUPPING'] }]
      },
      { key: 'bandejas', label: 'Bandejas', match: [{ start: ['BANDEJA', 'CHAROLA PARA MUESTRA'] }] },
      { key: 'basculas', label: 'Básculas', match: [{ any: ['BASCULA'] }] },
      { key: 'temporizadores', label: 'Temporizadores', match: [{ start: ['TEMPORIZADOR', 'TIMER', 'CRONOMETRO'] }] },
      {
        key: 'herramientas-medicion',
        label: 'Herramientas de medición',
        match: [{ start: ['CUCHARA MEDIDORA', 'CUCHARA DOSIFICADORA', 'REFRACTOMETRO', 'MEDIDOR', 'PROBETA'] }]
      }
    ]
  },
  limpieza: {
    slug: 'limpieza',
    brands: ['La fenice', 'Urnex'],
    subcats: [
      // + repuestos de cepillo (p. ej. La Fenice ALM-035)
      { key: 'cepillos', label: 'Cepillos', match: [{ start: ['CEPILLO', 'BROCHA', 'ESCOBILLA'] }, { start: ['REPUESTO DE CEPILLO'] }] },
      { key: 'filtros-ciegos', label: 'Filtros ciegos', match: [{ any: ['FILTRO CIEGO', 'FILTROS CIEGOS', 'DISCO CIEGO', 'BLIND'] }] },
      { key: 'cafiza', label: 'Cafiza', match: [{ any: ['CAFIZA'] }] },
      { key: 'rinza', label: 'Rinza', match: [{ any: ['RINZA'] }] },
      { key: 'descalcificadores', label: 'Descalcificadores', match: [{ any: ['DESCALCIFICADOR', 'DEZCAL', 'DESINCRUSTANTE'] }] },
      {
        key: 'herramientas-limpieza',
        label: 'Herramientas de limpieza',
        match: [{ any: ['LIMPIADOR', 'LIMPIADORA', 'LIMPIEZA', 'WIPZ', 'GRINDZ', 'TABZ', 'LAVA JARRAS'] }]
      }
    ]
  }
};

/**
 * Orden global de evaluación "sección/subcategoría" (gana la primera regla que coincide).
 * De lo específico a lo genérico; ver comentario del archivo.
 */
export const ACC_RULE_ORDER: string[] = [
  'limpieza/filtros-ciegos',
  'limpieza/cafiza',
  'limpieza/rinza',
  'limpieza/descalcificadores',
  'limpieza/cepillos',
  'limpieza/herramientas-limpieza',
  'catacion-medicion/tazones-cucharas-catacion',
  'catacion-medicion/basculas',
  'catacion-medicion/temporizadores',
  'catacion-medicion/bandejas',
  'barista-espresso/jarras-espumadoras',
  'barista-espresso/tampers',
  'barista-espresso/vasos-medidores',
  'barista-espresso/tazas-dosificadoras',
  'barista-espresso/termometros',
  'barista-espresso/reloj-extraccion',
  'barista-espresso/bases-cojines',
  'barista-espresso/bagaceras',
  'barista-espresso/charolas-escurridoras',
  'barista-espresso/jarras-espresso',
  'catacion-medicion/herramientas-medicion',
  'bebidas-frias/bombas-salsas',
  'bebidas-frias/dosificadores-jarabe',
  'bebidas-frias/cucharas-tapioca',
  'bebidas-frias/sifones-soda',
  'bebidas-frias/sifones-crema',
  'bebidas-frias/complementos-barra',
  'metodo-extraccion/jarras-cuello-ganso',
  'metodo-extraccion/molinos-manuales',
  'te-servicio/teteras',
  'te-servicio/infusores',
  'te-servicio/jarras-servidoras',
  'te-servicio/vasos',
  'metodo-extraccion/v60',
  'metodo-extraccion/chemex',
  'metodo-extraccion/aeropress',
  'metodo-extraccion/sifon-japones',
  'metodo-extraccion/toddy-cold-brew',
  'metodo-extraccion/drippers',
  'metodo-extraccion/prensas-francesas',
  'te-servicio/accesorios-te',
  // Subcategorías nuevas (fuera del PDF): al final, sólo para lo que no encajó arriba.
  'metodo-extraccion/moka-otros-metodos',
  'metodo-extraccion/filtros',
  'te-servicio/tazas-termos'
];

export function isAccSection(slug: string | null | undefined): slug is AccSectionSlug {
  return !!slug && Object.prototype.hasOwnProperty.call(ACC_SECTIONS, slug);
}
