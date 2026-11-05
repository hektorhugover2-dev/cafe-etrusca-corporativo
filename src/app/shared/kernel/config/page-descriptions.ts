/** Descripciones propias para URLs alias que comparten plantilla con otra p\u00e1gina (canonical). */
export const PAGE_DESCRIPTIONS: Record<string, string> = {
  '/experiencia-el-oasis-del-sabor-con-bebidas-frias/': 'Experiencia Oasis del sabor (TYC-015): bebidas fr\u00edas con caf\u00e9 como iced latte, cold brew y frapp\u00e9s, y sin caf\u00e9 como smoothies y chocolates fr\u00edos. 3 horas.',
  '/educacion/experiencias/oasis-bebidas-frias/': 'Bebidas fr\u00edas sin caf\u00e9 en la experiencia Oasis del sabor: smoothies, bebidas vegetales con superfoods, jarabes, toppings y perlas de tapioca. 1 d\u00eda, 3 h.',
  '/experiencia-aprende-a-crear-tu-propia-mezcla-de-cafe/': 'Experiencia Crea tu propia mezcla de caf\u00e9 (TYC-015): eval\u00faa origen y tueste de un caf\u00e9 de especialidad y define el perfil de sabor de tu mezcla. 3 horas.',
  '/educacion/experiencias/crear-mezcla-de-cafe/': 'Aprende el vocabulario para describir y diferenciar caf\u00e9s de especialidad y crea una mezcla \u00fanica que identifique tu cafeter\u00eda. Experiencia de 3 horas.',
  '/taller-de-cold-brew-en-merida/': 'Taller de Cold Brew en M\u00e9rida (TYC-009): extracci\u00f3n en fr\u00edo y en caliente con est\u00e1ndares SCA, proporci\u00f3n agua-caf\u00e9 y los 7 elementos de extracci\u00f3n. 6 horas.',
  '/taller-de-brew-bar-en-merida/': 'Taller de Brew Bar y Cold Brew en Sucursal M\u00e9rida (TYC-009): m\u00e9todos artesanales, caf\u00e9 americano y bebidas fr\u00edas como sodas con caf\u00e9. 1 d\u00eda, 6 h.'
};
export function pageDescription(url: string): string | undefined {
  let p = String(url || '').split(/[?#]/)[0];
  if (!p.endsWith('/')) p += '/';
  return PAGE_DESCRIPTIONS[p];
}
