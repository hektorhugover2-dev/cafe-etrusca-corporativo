/** Íconos lineales (viewBox 24) por familia de sabor, asignados por palabra clave. */
export type FlavorIconKey = 'vainilla' | 'chocolate' | 'caramelo' | 'cafe' | 'menta' | 'nuez' | 'coco' | 'flor' | 'especia' | 'te' | 'citrico' | 'frutosRojos' | 'fruta' | 'tropical' | 'crema' | 'generico';

export const FLAVOR_ICON_PATHS: Record<FlavorIconKey, string[]> = {
  vainilla: ['M12 21c-1.5-5-1.5-12 0-18', 'M12 3c1.5 6 1.5 12 0 18', 'M12 8c-2-2-5-2-6 0 2 1 4 1 6 0z', 'M12 8c2-2 5-2 6 0-2 1-4 1-6 0z'],
  chocolate: ['M6 3h12v18H6z', 'M6 9h12', 'M6 15h12', 'M12 3v18'],
  caramelo: ['M7 12a5 5 0 1 0 10 0a5 5 0 1 0-10 0', 'M7 12L3 9v6z', 'M17 12l4-3v6z', 'M10 10c1-1 3-1 4 1'],
  cafe: ['M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z', 'M17 10h1.5a2.5 2.5 0 0 1 0 5H17', 'M8 3c-1 1 1 2 0 3', 'M12 3c-1 1 1 2 0 3'],
  menta: ['M5 19C5 10 10 5 19 5c0 9-5 14-14 14z', 'M5 19l9-9', 'M10 14h4', 'M12 12V8'],
  nuez: ['M12 3c4 0 7 3 7 7 0 6-4 11-7 11s-7-5-7-11c0-4 3-7 7-7z', 'M5.3 9h13.4', 'M12 3v6'],
  coco: ['M12 4a8 8 0 1 0 0 16a8 8 0 1 0 0-16z', 'M4.5 10c2 2 5 3 7.5 3s5.5-1 7.5-3', 'M10 7h.01', 'M14 7h.01'],
  flor: ['M12 10a2 2 0 1 0 0 4a2 2 0 1 0 0-4z', 'M12 10c-2-3-1-6 0-7 1 1 2 4 0 7z', 'M14 12c3-2 6-1 7 0-1 1-4 2-7 0z', 'M12 14c2 3 1 6 0 7-1-1-2-4 0-7z', 'M10 12c-3 2-6 1-7 0 1-1 4-2 7 0z'],
  especia: ['M12 3l1.8 5.2L19 7l-3.2 4.3L19 16l-5.2-1.2L12 20l-1.8-5.2L5 16l3.2-4.7L5 7l5.2 1.2z', 'M12 10.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 1 0 0-3z'],
  te: ['M5 9h12v4a6 6 0 0 1-12 0z', 'M17 10h1a2 2 0 0 1 0 4h-1', 'M11 9V4l3 2', 'M4 21h14'],
  citrico: ['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z', 'M12 6v12', 'M6 12h12', 'M7.8 7.8l8.4 8.4', 'M16.2 7.8l-8.4 8.4'],
  frutosRojos: ['M12 8c4 0 7 2 7 5 0 4-4 8-7 8s-7-4-7-8c0-3 3-5 7-5z', 'M8 5l4 3 4-3', 'M12 8V3', 'M10 13h.01', 'M14 13h.01', 'M12 17h.01'],
  fruta: ['M12 7c-3-2-8-1-8 5 0 5 4 9 6 9 1 0 1.5-.5 2-.5s1 .5 2 .5c2 0 6-4 6-9 0-6-5-7-8-5z', 'M12 7V4', 'M12 5c1-2 3-2 4-1-1 1-2 2-4 1z'],
  tropical: ['M12 10c-3 0-5 3-5 6.5S9.2 21 12 21s5-1 5-4.5S15 10 12 10z', 'M12 10c-1-3-3-5-5-6', 'M12 10c1-3 3-5 5-6', 'M12 10V3', 'M9.5 14l5 4', 'M14.5 14l-5 4'],
  crema: ['M9 3h6v3l2 3v12H7V9l2-3z', 'M7 12h10', 'M9 6h6'],
  generico: ['M12 3c3 5 6 8 6 12a6 6 0 0 1-12 0c0-4 3-7 6-12z', 'M9.5 15a2.5 2.5 0 0 0 2.5 2.5']
};

const RULES: [FlavorIconKey, RegExp][] = [
  ['menta', /menta|mint|hierbabuena/],
  ['cafe', /cafe|caffe|coffee|espresso|capuch|capuc|cappuc|moka|mocha|frappe|tiramisu|latte|java/],
  ['chocolate', /chocolat|cocoa|cacao|brownie|cookie|galleta|oreo|velvet/],
  ['caramelo', /caramel|cajeta|butter|scotch|brulee|dulce|dulce de leche|toffee|butterscotch|miel|maple|agave|azucar|piloncillo|algodon|bubble ?gum|chicle|marshmallow|malvavisco/],
  ['vainilla', /vainill|vanill/],
  ['coco', /\bcoco\b|coconut/],
  ['nuez', /nuez|avellana|hazelnut|almendr|almond|amaretto|pistach|cacahuat|peanut|macadamia|pecan|nut\b|amaret|mazapan/],
  ['flor', /lavanda|lavender|rosas?\b|rose\b|jazmin|jasmin|garden|jamaica|hibisc|flor|violet|manzanilla|chamomile|azahar|sauco|elderflower/],
  ['especia', /canela|cinnamon|chai|jengibre|ginger|especia|pumpkin|calabaza|clavo|cardamom|horchata|anis|pan de muerto|spice|ponche|curcuma/],
  ['te', /\bte\b|\bté\b|matcha|tea\b|taro|earl|verde|negro|oolong|rooibos|green|black\b|breakfast|herbal|paris|christmas/],
  ['citrico', /limon|lima\b|naranja|mandarina|toronja|lemon|lime|orange|grapefruit|citric|yuzu|tangerin|curacao/],
  ['frutosRojos', /fresa|cherry|frambuesa|mora|zarzamora|arandano|cereza|berry|berries|uva|frutos rojos|cranberr|blueberr|strawberr|raspberr|grosella/],
  ['tropical', /pina|pineapple|mango|maracuya|passion|guayaba|guava|papaya|pitaya|dragon|lichi|lychee|tropical|kiwi|tamarindo|platano|banana/],
  ['fruta', /manzana|apple|durazno|melocoton|peach|pera\b|pear|sandia|watermelon|melon|frut|fruit|granada|pomegranate|ciruela|granadina|longan|nispero|honeydew/],
  ['crema', /crema|cream|leche|milk|irish|cheese ?cake|yogur|horchata|neutr|natural|original|clasic/]
];

export function normFlavor(s: string): string {
  return (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export function flavorIcon(name: string): FlavorIconKey {
  const n = normFlavor(name);
  for (const [k, re] of RULES) if (re.test(n)) return k;
  return 'generico';
}
