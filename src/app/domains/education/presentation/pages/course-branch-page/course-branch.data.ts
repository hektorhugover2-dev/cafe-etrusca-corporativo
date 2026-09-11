export interface CourseBranchLanding {
  citySlug: string;
  cityLabel: string;
  branchFilter: string;
}

export const EMPRENDE_PATH = 'emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria';

export const EMPRENDE_KEYWORDS =
  'barra de cafe,curso de cafeteria,cafe precio,cafe e,cafe mezcla,accesorios para cafe,barras para cafeteria,barras de cafeteria,café precio,accesorios para cafeteria,negocio de cafeteria,cafeto cafe,negocio cafeteria,la barra del cafe,la barra de cafe,cursos cafeteria,barra para cafe,cursos para cafeterias,cafe cafeto,para cafetería,barras cafeteria,cafe para cafeteria,cafe de cafeteria,barro cafe,cafe para mi,accesorios cafeteria,emprender una cafeteria,barras para cafe,barras cafe,cafe en barra,cafe de la barra,cafeto café,emprendimiento de cafeteria,cafe para cafeterias,cafeteria mi cafe,emprendimiento cafeteria,mi café y tu,accesorios de cafeteria,cafe de barro,cafe la barra,emprendimiento de una cafeteria,cafetería para todos,cafetería café,cafeteria cafeto,cafes de cafeteria,negocio de café,un cafe para,emprender cafeteria,precios de cafe en cafeterias,cafeteria le cafe,café cafetería,cafes para cafeterias,cafe el cafeto,negocios cafeteria,cafeterías cafe,de cafe en cafe,cafe en cafeteria,barra de una cafeteria,cafeteria el cafe,cafeterias como negocio,cafetería cafe,café para cafeterías,emprendimiento cafe,es negocio una cafeteria,cafeterías café,cafeterias negocio,cafe para mi negocio,cafe a cafe,negocio del café,cafe cafeterias,barra cafe barra';

export const EMPRENDE_BRANCHES: CourseBranchLanding[] = [
  { citySlug: 'zona-rosa-cdmx', cityLabel: 'Zona Rosa CDMX', branchFilter: 'Zona Rosa' },
  { citySlug: 'viaducto-cdmx', cityLabel: 'Viaducto CDMX', branchFilter: 'Viaducto' },
  { citySlug: 'iztapalapa', cityLabel: 'Iztapalapa', branchFilter: 'Iztapalapa' },
  { citySlug: 'toluca', cityLabel: 'Toluca', branchFilter: 'Toluca' },
  { citySlug: 'tijuana', cityLabel: 'Tijuana', branchFilter: 'Tijuana' },
  { citySlug: 'queretaro', cityLabel: 'Querétaro', branchFilter: 'Querétaro' },
  { citySlug: 'puebla', cityLabel: 'Puebla', branchFilter: 'Puebla' },
  { citySlug: 'monterrey', cityLabel: 'Monterrey', branchFilter: 'Monterrey' },
  { citySlug: 'leon', cityLabel: 'León', branchFilter: 'León' },
  { citySlug: 'guadalajara', cityLabel: 'Guadalajara', branchFilter: 'Guadalajara' },
  { citySlug: 'xalapa', cityLabel: 'Xalapa', branchFilter: 'Xalapa' },
  { citySlug: 'merida', cityLabel: 'Mérida', branchFilter: 'Mérida' }
];

export function findEmprendeBranch(citySlug: string | null): CourseBranchLanding | null {
  if (!citySlug) return null;
  const wanted = citySlug.toLowerCase();
  return EMPRENDE_BRANCHES.find((b) => b.citySlug === wanted) || null;
}

export function emprendeLandingPath(citySlug?: string | null): string {
  return citySlug ? `/${EMPRENDE_PATH}-en-${citySlug}` : `/${EMPRENDE_PATH}`;
}

export function emprendeSeo(cityLabel?: string | null) {
  const where = cityLabel ? ` en ${cityLabel}` : '';
  return {
    title: `Emprendiendo Mi Negocio de Barra de Café y Cafetería${where}`,
    description: `Emprendiendo Mi Negocio de Barra de Café y Cafetería${where} es un taller donde aprenderás cómo abrir correctamente tu cafetería iniciándote como Barista.`,
    keywords: EMPRENDE_KEYWORDS
  };
}
