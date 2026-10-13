import { siteUrl } from '../../../shared/kernel/config/site-url';

/** Shared education breadcrumb + BreadcrumbList JSON-LD helpers. */
export const EDUCATION_HUB_PATH = '/cursos-para-baristas-y-talleres-para-cafeterias';

export interface EduCrumb {
  label: string;
  path?: string; // omit on current page
}

export function educationCrumbs(courseTitle: string, cityLabel?: string | null): EduCrumb[] {
  const crumbs: EduCrumb[] = [
    { label: 'Inicio', path: '/' },
    { label: 'Cursos', path: EDUCATION_HUB_PATH },
    { label: courseTitle },
  ];
  if (cityLabel) {
    crumbs[crumbs.length - 1] = { label: courseTitle, path: undefined };
    // Rebuild: Inicio > Cursos > Course > City (city is current)
    return [
      { label: 'Inicio', path: '/' },
      { label: 'Cursos', path: EDUCATION_HUB_PATH },
      { label: courseTitle },
      { label: cityLabel },
    ];
  }
  return crumbs;
}

export function breadcrumbJsonLd(origin: string, crumbs: EduCrumb[], currentUrl: string) {
  const items = crumbs.map((c, i) => {
    const isLast = i === crumbs.length - 1;
    const item: Record<string, unknown> = {
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
    };
    if (!isLast && c.path) {
      // Canonical URLs always use the configured site origin + trailing slash.
      item['item'] = c.path.startsWith('http') ? c.path : siteUrl(c.path);
    } else if (isLast) {
      item['item'] = currentUrl;
    }
    return item;
  });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}
