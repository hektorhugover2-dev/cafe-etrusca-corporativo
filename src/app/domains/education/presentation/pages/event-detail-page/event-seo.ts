export interface EventSeo {
  description: string;
  keywords: string;
}

const SEO_BUBBLE: EventSeo = {
  description:
    'Taller de Bubble tea & iced, combina diferentes aspectos que lo hacen único: Toppings originales que le dan textura a la bebida, combinación de sabores, presentación atractiva y la posibilidad de personalizar tu bebida.',
  keywords:
    'Taller de Bubble tea & iced coffee,curso de bubble tea, curso de iced coffee,boba tapiocatea bubble,te de tapioca,te de boba,te con tapioca,pearl boba tea,bebida boba,bubble tapioca,bobas tea,te tapioca,bubble tea original,té para,tapioca te,bubble tea mexico,bobas de tapioca,bebida bubble tea,boba tea que es,bubble bebidas,bebidas con boba,boba tea mexico,bebidas de boba,bubbles de tapioca,bebida boba tea,bubble tea méxico,te con boba,te o tea,te de tea,beber té,bubble tea con tapioca,té tea,bubble tea en mexico,bobas bebidas,para tea,para té,bebidas bubble,bubble tea historia,bubble tea bebida,bubble tea de tapioca,bubble tea te,bubbles para bebidas,tea de boba,té en sobre,té sobre'
};

const SEO_BARISTA: EventSeo = {
  description:
    'Cursos Para Baristas y Talleres Para Cafeterías destinados para quien desea iniciarse en el Barismo, especializarse como Baristas y emprender una cafetería.',
  keywords:
    'curso basico de café,curso basico de café en méxico,cafe de especialidad,catación,curso barista,barista curso,tipos de cafe,tipos de café,barista cafe,cafe especialidad,catador de cafe,tipos de cafes,cata de cafe,curso de barista online,catacion de cafe,tipo de cafe,curso de cafe,cafe online,curso de barismo,curso barista online,taller cafe,cafe tipos,clases de cafe,curso de cafeteria,bebidas con cafe,cursos de barismo,curso de barista presencial,curso cafe,catar cafe,cafes especiales,tipo de café,bebidas de cafe,un buen cafe,barista de cafe,sabores de cafe,tipos cafe,diferentes tipos de cafe,cafeteria de especialidad,sabor del cafe,da cafe,café etrusca,clases de barista,tipos de cafe para tomar,curso barista cafe,tueste cafe,café de especialidad comprar,curso de barista profesional'
};

const SEO_LATTE: EventSeo = {
  description:
    'Curso de Arte Latte, donde aprenderás técnicas avanzadas para crear diseños espectaculares en café utilizando leche texturizada y espumas perfectas.',
  keywords:
    'arte latte,curso de arte latte,diseños en café,figuras en café,latte art,curso de latte art,arte en café,decoración en café,técnicas de arte latte,figuras con espuma,barista latte art,aprende latte art,latte art básico,arte con café,curso de decoración en café'
};

const SEO_MIXO: EventSeo = {
  description:
    'Taller de mixología con café sin alcohol donde aprenderás a crear bebidas de tendencia y desarrollarás usos alternativos a los insumos que tiene tu negocio.',
  keywords:
    'Taller de mixología,cursos mixologia, curso mixologia, cursos de mixologia, curso de mixologia, curso, cursos, mixologia, mixology, bebidas, preparacion, molecular, mexico, cdmx,presencial, escuela, online, distancia'
};

const SEO_BREW: EventSeo = {
  description:
    'Taller de brew bar donde aprenderás a utilizar los métodos artesanales para la preparación de cafés y podrás descubrir las tendencias en Brew Bar.',
  keywords: 'Curso Brew Bar,brew,café,bar,bar de café'
};

const SEO_EMPRENDE: EventSeo = {
  description:
    'Emprendiendo Mi Negocio de Barra de Café y Cafetería es un taller donde aprenderás cómo abrir correctamente tu cafetería iniciándote como Barista.',
  keywords:
    'Emprendiendo Mi Negocio de Barra de Café y Cafetería, taller de cómo abrir una cafetería, iniciarse como Barista, curso de negocios de café.'
};

export function eventSeoForCategory(categoryId: number | null | undefined): EventSeo {
  switch (categoryId) {
    case 12:
    case 7:
    case 38:
      return SEO_BUBBLE;
    case 1:
    case 16:
      return SEO_BARISTA;
    case 2:
    case 26:
      return SEO_LATTE;
    case 9:
      return SEO_MIXO;
    case 4:
      return SEO_BREW;
    default:
      return SEO_EMPRENDE;
  }
}

export function absoluteAsset(path: string | null | undefined): string {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  return 'https://cafeetrusca.com' + (path.startsWith('/') ? path : '/' + path);
}

export function slugFromEventUrl(url: string | null | undefined): string {
  if (!url) return '';
  const clean = url.split('?')[0].replace(/\/+$/, '');
  const i = clean.lastIndexOf('/');
  return i >= 0 ? decodeURIComponent(clean.slice(i + 1)) : '';
}
