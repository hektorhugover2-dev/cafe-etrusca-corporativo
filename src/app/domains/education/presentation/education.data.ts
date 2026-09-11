export type EduKind = 'cursos' | 'experiencias' | 'talleres' | 'sesiones';

export interface EduCategory {
  slug: EduKind;
  label: string;
  navLabel: string;
  title: string;
  subtitle: string;
  body: string;
  icon: string;
  tone: 'lime' | 'sand' | 'cream' | 'yellow';
  heroImage: string;
  stats: { label: string; value: string; hint?: string }[];
}

export interface CourseDate {
  days: string;
  month: string;
  branch: string;
  duration: string;
  hours: string;
  start?: string;
  end?: string;
  email?: string;
  telephone?: string;
  mapUrl?: string;
  mapEmbed?: string;
  locationName?: string;
  categoryName?: string;
  emailBarista?: string;
}

export interface Course {
  id: number | null;
  slug: string;
  kind: EduKind;
  kicker: string;
  title: string;
  summary: string;
  duration: string;
  hours: string;
  schedule: string;
  image: string;
  banner: string;
  ideal?: string;
  highlights: { title: string; text: string }[];
  synopsis: string;
  syllabus: { title: string; text: string }[];
  learn: string[];
  audience: string[];
  includes: string[];
  quote?: { text: string; name: string; place: string };
  dates: CourseDate[];
  // NUEVO: Agregamos el objeto SEO
  seo?: {
    title: string;
    description: string;
    keywords: string;
  };
}

const INCLUDES_BASE = [
  'Material de apoyo',
  'Prácticas guiadas',
  'Diploma de participación',
  'Uso de equipos profesionales',
  'Acompañamiento del instructor'
];

const DATES_WEEKEND: CourseDate[] = [
  { days: '18-19', month: 'Junio', branch: 'Viaducto', duration: '2 días', hours: '14 hrs' },
  { days: '18-19', month: 'Junio', branch: 'Zona Rosa', duration: '2 días', hours: '14 hrs' },
  { days: '18-19', month: 'Junio', branch: 'Mérida', duration: '2 días', hours: '14 hrs' },
  { days: '25-26', month: 'Julio', branch: 'Vallejo', duration: '2 días', hours: '14 hrs' }
];

const DATES_DAY: CourseDate[] = [
  { days: '06', month: 'Junio', branch: 'Viaducto', duration: '1 día', hours: '6 hrs' },
  { days: '13', month: 'Junio', branch: 'Zona Rosa', duration: '1 día', hours: '6 hrs' },
  { days: '20', month: 'Julio', branch: 'Vallejo', duration: '1 día', hours: '6 hrs' }
];

export const EDU_NAV: EduCategory[] = [
  {
    slug: 'cursos',
    label: 'Cursos',
    navLabel: 'Cursos',
    title: 'Nuestros cursos',
    subtitle: 'Formación completa para quienes quieren construir bases sólidas, profesionalizarse y llevar su pasión por el café al siguiente nivel.',
    body: 'Formación completa para quienes quieren construir bases sólidas, profesionalizarse y llevar su pasión por el café al siguiente nivel.',
    icon: '/assets/images/educacion/icon-cursos.png',
    tone: 'lime',
    heroImage: '/assets/images/educacion/cursos-photo.png',
    stats: [
      { label: 'Metodología', value: '100% integral', hint: '(Teoría + Práctica)' },
      { label: 'Duración', value: '2 días', hint: '(14 horas)' },
      { label: 'Horario', value: '9:00 a.m. inicio' }
    ]
  },
  {
    slug: 'experiencias',
    label: 'Experiencias',
    navLabel: 'Experiencias',
    title: 'Experiencias',
    subtitle: 'Encuentros sensoriales para vivir el café y el té con todos los sentidos.',
    body: 'Sesiones cortas, inmersivas y diseñadas para descubrir perfiles, orígenes y rituales.',
    icon: '/assets/images/educacion/icon-experiencias.png',
    tone: 'sand',
    heroImage: '/assets/images/educacion/curso-photo.png',
    stats: [
      { label: 'Formato', value: 'Inmersivo', hint: '(Sensorial + cata)' },
      { label: 'Duración', value: '1 día', hint: '(3 a 4 horas)' },
      { label: 'Horario', value: '10:00 a.m. inicio' }
    ]
  },
  {
    slug: 'talleres',
    label: 'Talleres',
    navLabel: 'Talleres',
    title: 'Talleres de especialización',
    subtitle: 'Práctica intensiva para perfeccionar una técnica puntual.',
    body: 'Arte latte, métodos de extracción y más. Un día, manos a la barra.',
    icon: '/assets/images/educacion/icon-talleres.png',
    tone: 'cream',
    heroImage: '/assets/images/educacion/baristas.png',
    stats: [
      { label: 'Metodología', value: '70% práctica', hint: '(Manos a la barra)' },
      { label: 'Duración', value: '1 día', hint: '(6 horas)' },
      { label: 'Horario', value: '9:00 a.m. inicio' }
    ]
  },
  {
    slug: 'sesiones',
    label: 'Sesiones',
    navLabel: 'Sesiones sabatinas',
    title: 'Sesiones sabatinas',
    subtitle: 'Encuentros de fin de semana para seguir aprendiendo en comunidad.',
    body: 'Formato abierto, calendario rotativo y cupo limitado por sucursal.',
    icon: '/assets/images/educacion/icon-sesiones.png',
    tone: 'yellow',
    heroImage: '/assets/images/calendario-sesiones-slider.webp',
    stats: [
      { label: 'Formato', value: 'Comunidad', hint: '(Cupo limitado)' },
      { label: 'Duración', value: '1 sábado', hint: '(4 horas)' },
      { label: 'Horario', value: '10:00 a.m. inicio' }
    ]
  }
];

const SESION_H = { duration: '1 día', hours: '4 hrs' } as const;
const sesionQro = (days: string, month: string) => [{ days, month, branch: 'Querétaro', ...SESION_H }];
const sesionMty = (days: string, month: string) =>
  ['Monterrey', 'Viaducto (CDMX)', 'Puebla', 'Tijuana', 'Iztapalapa (CDMX)'].map((branch) => ({
    days,
    month,
    branch,
    ...SESION_H
  }));
const sesionGdl = (days: string, month: string) =>
  ['Guadalajara', 'Zona Rosa (CDMX)', 'Xalapa', 'Toluca', 'Mérida', 'León'].map((branch) => ({
    days,
    month,
    branch,
    ...SESION_H
  }));

export const COURSES: Course[] = [
  {
    id: 10,
    slug: 'formacion-de-emprendedores',
    kind: 'cursos',
    kicker: 'Curso',
    title: 'Formación de emprendedores',
    summary: 'Sumérgete en el mundo completo del emprendimiento cafetero, explorando todos los aspectos clave para convertir tu pasión en un negocio.',
    duration: '2 días',
    hours: '14 horas',
    schedule: '9:00 a.m. - 5:00 p.m.',
    image: '/assets/images/educacion/curso-formacion-emprendedores.webp',
    banner: '/assets/images/educacion/curso-formacion-emprendedores.webp',
    ideal: 'Ideal si quieres abrir, mejorar o estructurar tu cafetería y convertir tu pasión en un negocio rentable.',
    highlights: [
      { title: 'Planeación estratégica', text: 'Define tu propuesta de valor, analiza el mercado y construye un plan sólido.' },
      { title: 'Herramientas operativas', text: 'Estandariza procesos, controla costos y asegura la eficiencia de tu operación.' },
      { title: 'Modelos de negocio flexibles', text: 'Explora formatos como Matcha Bar, Bubble Tea Lab, barras de café por olas y otras.' }
    ],
    synopsis: '¿Estás considerando unirte al creciente mercado de las barras de café? Este curso de dos días está diseñado para proporcionarte los conocimientos esenciales y las herramientas prácticas para lanzar y hacer crecer tu negocio con éxito. Nuestro objetivo es ofrecerte una ruta clara para comprender los factores clave que determinan la viabilidad y rentabilidad de tu emprendimiento.',
    syllabus: [
      { title: 'Introducción al emprendimiento', text: 'Panorama del mercado, oportunidades y errores frecuentes al abrir una barra.' },
      { title: 'Planeación estratégica y modelos de negocio', text: 'Propuesta de valor, ticket, mix de menú y formatos flexibles.' },
      { title: 'Gestión operativa y rentabilidad', text: 'Costos, merma, mermas de receta y control de inventario.' },
      { title: 'Temas prácticos de barra y bebidas', text: 'Flujo de estación, recetas base y estándares de servicio.' },
      { title: 'Catación, protocolos y mantenimiento', text: 'Calidad en taza, protocolos SCA y cuidado de equipos.' }
    ],
    learn: [
      'Gestión y rentabilidad del negocio',
      'Operación de equipos profesionales',
      'Estándares de calidad internacionales (SCA)',
      'Catación y atributos del café'
    ],
    audience: [
      'Personas que desean abrir una cafetería.',
      'Emprendedores que buscan escalar su negocio.',
      'Dueños de cafetería que desean profesionalizar su operación.'
    ],
    includes: INCLUDES_BASE,
    quote: {
      text: 'Excelente formación en Café Etrusca. El Curso de 2 días vale totalmente la pena; los instructores tienen una paciencia increíble para explicar la teoría y luego aplicarla en la práctica.',
      name: 'Javier S.',
      place: 'Querétaro'
    },
    dates: DATES_WEEKEND,
    seo: {
      title: "Emprendiendo Mi Negocio de Barra de Café y Cafetería",
      description: "Emprendiendo Mi Negocio de Barra de Café y Cafetería es un taller donde aprenderás cómo abrir correctamente tu cafetería iniciándote como Barista.",
      keywords: "barra de cafe,curso de cafeteria,negocio de cafeteria,barras de cafeteria,cursos cafeteria,emprendimiento cafetero,Café Etrusca,cursos para barista"
    }
  },
  {
    id: 5,
    slug: 'tostado-basico',
    kind: 'cursos',
    kicker: 'Curso',
    title: 'Tostado básico',
    summary: 'Adquiere un conocimiento completo de las etapas de tueste y desarrolla la habilidad de interpretar con precisión las curvas de tostado.',
    duration: '2 días',
    hours: '15 horas',
    schedule: '9:00 a.m. - 5:00 p.m.',
    image: '/assets/images/educacion/curso-tostado.webp',
    banner: '/assets/images/educacion/curso-tostado.webp',
    ideal: 'Ideal si quieres entender el grano, el proceso de tueste y cómo influyen en el sabor de tu café.',
    highlights: [
      { title: 'El grano verde', text: 'Identifica origen, densidad, humedad y defectos antes de tostar.' },
      { title: 'Curvas de tueste', text: 'Lee y ajusta perfiles para resaltar dulzor, acidez y cuerpo.' },
      { title: 'Control de calidad', text: 'Cata el resultado y corrige el perfil para tu menú.' }
    ],
    synopsis: 'En dos días recorres el proceso completo de tueste: del café verde a la taza. Aprendes a manejar el tostador, interpretar curvas y tomar decisiones de perfil según el origen y el uso (espresso, filtro o lote).',
    syllabus: [
      { title: 'Café verde y defectos', text: 'Selección, almacenamiento y lectura de muestra.' },
      { title: 'Máquina y variables', text: 'Carga, aire, gas y puntos de quiebre.' },
      { title: 'Desarrollo de curvas', text: 'Primer crack, desarrollo y enfriado.' },
      { title: 'Perfiles por método', text: 'Espresso, filtro y tueste medio.' },
      { title: 'Cata de control', text: 'Protocolo de mesa y ajustes.' }
    ],
    learn: [
      'Lectura de curvas de tueste',
      'Manejo seguro del tostador',
      'Perfiles según origen y método',
      'Control de calidad en taza'
    ],
    audience: [
      'Tostadores que inician.',
      'Dueños de cafetería que quieren tostar su propio café.',
      'Baristas que buscan entender el grano más allá de la barra.'
    ],
    includes: INCLUDES_BASE,
    dates: DATES_WEEKEND,
    seo: {
      title: "Taller básico de tostado de café | impartido por SCA Trainers",
      description: "Taller básico de tostado de café: Un taller teórico-práctico donde aprenderás los procesos de calidad en el tostado y cómo desarrollar perfiles de tueste.",
      keywords: "cafe tostado,tostado de cafe,tostar cafe,curso de tostado de cafe,cursos café,SCA Trainers,Café Etrusca"
    }
  },
  {
    id: 1, 
    slug: 'formacion-barista',
    kind: 'talleres',
    kicker: 'Taller',
    title: 'Formación para un barista',
    summary: 'Bases sólidas de barra: espresso, leche, servicio y estándares para operar con consistencia.',
    duration: '2 días',
    hours: '14 horas',
    schedule: '9:00 a.m. - 5:00 p.m.',
    image: '/assets/images/educacion/taller-formacion-barista.webp',
    banner: '/assets/images/educacion/taller-formacion-barista.webp',
    ideal: 'Ideal si empiezas en barra o quieres estandarizar a tu equipo.',
    highlights: [
      { title: 'Espresso consistente', text: 'Molienda, dosis, tiempo y calibración diaria.' },
      { title: 'Leche y textura', text: 'Vaporizado, microespuma y temperatura de servicio.' },
      { title: 'Flujo de estación', text: 'Mise en place, tickets y calidad bajo presión.' }
    ],
    synopsis: 'Curso inicial para formar baristas con criterio. Combinamos teoría de extracción con práctica en máquina profesional para que salgas con recetas, protocolos y seguridad en barra.',
    syllabus: [
      { title: 'El café y la extracción', text: 'Solubles, ratio y variables.' },
      { title: 'Máquina y molino', text: 'Calibración, limpieza y mantenimiento básico.' },
      { title: 'Leche y arte latte intro', text: 'Textura, jarra y patrones básicos.' },
      { title: 'Menú de barra', text: 'Bebidas clásicas y recetas Etrusca.' },
      { title: 'Servicio y calidad', text: 'Estándares, tiempos y experiencia del cliente.' }
    ],
    learn: [
      'Calibración de espresso',
      'Vaporizado de leche',
      'Recetas de barra',
      'Protocolos de limpieza'
    ],
    audience: [
      'Baristas de nuevo ingreso.',
      'Equipos de cafetería.',
      'Emprendedores que van a operar su propia barra.'
    ],
    includes: INCLUDES_BASE,
    dates: DATES_WEEKEND,
    seo: {
      title: "Taller básico para baristas - Impartido por instructores de la SCA",
      description: "Cursos Para Baristas y Talleres Para Cafeterías destinados para quien desea iniciarse en el Barismo, especializarse como Baristas y emprender una cafetería.",
      keywords: "sca cafe,cursos de baristas,cursos de café,cursos para baristas,curso para barista de cafe,taller de barista,Café Etrusca"
    }
  },
  {
    id: 21,
    slug: 'inmersiona-te',
    kind: 'experiencias',
    kicker: 'Experiencia',
    title: 'Inmersiona-Té en Navidad',
    summary: 'Inmersión sensorial al té con temática navideña: rituales, sabores de temporada y maridajes para tu menú.',
    duration: '1 día',
    hours: '3 horas',
    schedule: '10:00 a.m. - 1:00 p.m.',
    image: '/assets/images/educacion/exp-inmersiona-te.webp',
    banner: '/assets/images/educacion/exp-inmersiona-te.webp',
    ideal: 'Ideal si quieres incorporar té de especialidad a tu carta.',
    highlights: [
      { title: 'Orígenes y familias', text: 'Verde, oolong, negro y tisanas: cómo se distinguen.' },
      { title: 'Ritual de infusión', text: 'Agua, tiempo y vajilla para extraer lo mejor.' },
      { title: 'Menú y maridaje', text: 'Ideas para barra, matcha y bubble tea.' }
    ],
    synopsis: 'Una experiencia corta y sensorial para entender el té como se entiende el café: origen, proceso y taza. Sales con un mapa de productos y recetas aplicables al día siguiente.',
    syllabus: [
      { title: 'Mapa del té', text: 'Familias, orígenes y procesos.' },
      { title: 'Cata guiada', text: 'Perfiles, temperatura y tiempo.' },
      { title: 'Aplicación en menú', text: 'Fríos, calientes y mixología ligera.' }
    ],
    learn: [
      'Familias de té',
      'Protocolo de infusión',
      'Armado de menú',
      'Maridaje básico'
    ],
    audience: [
      'Coffee lovers curiosos del té.',
      'Baristas y dueños que quieren ampliar carta.',
      'Equipos de matcha bar o bubble tea.'
    ],
    includes: INCLUDES_BASE,
    dates: [...sesionGdl('14', 'Diciembre'), ...sesionMty('14', 'Diciembre'), ...sesionQro('14', 'Diciembre')],
    seo: {
      title: "Inmersiona-Té en Navidad | Experiencia Café Etrusca",
      description: 'Experiencia Inmersiona-Té en Navidad el 14 de diciembre 2026 en sucursales Etrusca.',
      keywords: 'inmersiona-té,navidad,té,experiencias,Café Etrusca'
    }
  },
  {
    id: null,
    slug: 'arte-creatividad-mixologia',
    kind: 'experiencias',
    kicker: 'Experiencia',
    title: 'El arte y la creatividad de preparar mixología',
    summary: 'Experiencia práctica para crear bebidas con técnica de mixología, creatividad y presentación de barra.',
    duration: '1 día',
    hours: '3 horas',
    schedule: '10:00 a.m. - 1:00 p.m.',
    image: '/assets/images/educacion/exp-arte-creatividad-mixologia.webp',
    banner: '/assets/images/educacion/exp-arte-creatividad-mixologia.webp',
    ideal: 'Ideal si quieres potenciar tu menú con coctelería y bebidas creativas.',
    highlights: [
      { title: 'Técnica', text: 'Balance, texturas y ensamble de vaso.' },
      { title: 'Creatividad', text: 'Sabores, garnishes y presentación.' },
      { title: 'Cupo por sucursal', text: 'Experiencia presencial en red Etrusca.' }
    ],
    synopsis: 'Una mañana de mixología aplicada a cafetería: recetas, ritmo y look de barra.',
    syllabus: [
      { title: 'Bases', text: 'Herramientas, ratios y mise en place.' },
      { title: 'Práctica', text: 'Armado de bebidas firma.' },
      { title: 'Cierre', text: 'Tips para tu carta.' }
    ],
    learn: ['Mixología', 'Presentación', 'Menú de barra', 'Servicio'],
    audience: ['Baristas.', 'Dueños de cafetería.', 'Equipos de barra.'],
    includes: INCLUDES_BASE,
    dates: [...sesionGdl('12', 'Octubre'), ...sesionMty('12', 'Octubre'), ...sesionQro('12', 'Octubre')],
    seo: {
      title: 'Mixología | Experiencia Café Etrusca',
      description: 'Experiencia de mixología el 12 de octubre 2026 en sucursales Etrusca.',
      keywords: 'mixología,experiencias,Café Etrusca'
    }
  },
  {
    id: null,
    slug: 'coffee-lover-en-invierno',
    kind: 'experiencias',
    kicker: 'Experiencia',
    title: 'Coffee lover en invierno',
    summary: 'Experiencia sensorial de café para invierno: perfiles, bebidas cálidas y ritual de taza.',
    duration: '1 día',
    hours: '3 horas',
    schedule: '10:00 a.m. - 1:00 p.m.',
    image: '/assets/images/educacion/exp-coffee-lover-en-invierno.webp',
    banner: '/assets/images/educacion/exp-coffee-lover-en-invierno.webp',
    ideal: 'Ideal para coffee lovers y equipos que quieren menú de invierno.',
    highlights: [
      { title: 'Invierno en taza', text: 'Bebidas cálidas y especiadas.' },
      { title: 'Sensorial', text: 'Cata y perfiles de temporada.' },
      { title: 'Cupo por sucursal', text: 'Experiencia presencial en red Etrusca.' }
    ],
    synopsis: 'Vive el café de invierno: aroma, extracción y recetas reconfortantes para tu barra.',
    syllabus: [
      { title: 'Calentamiento', text: 'Perfiles y objetivo del día.' },
      { title: 'Práctica', text: 'Bebidas de invierno.' },
      { title: 'Cierre', text: 'Ideas para tu menú.' }
    ],
    learn: ['Café de invierno', 'Cata', 'Bebidas cálidas', 'Menú'],
    audience: ['Coffee lovers.', 'Baristas.', 'Dueños de cafetería.'],
    includes: INCLUDES_BASE,
    dates: [...sesionGdl('09', 'Noviembre'), ...sesionMty('09', 'Noviembre'), ...sesionQro('09', 'Noviembre')],
    seo: {
      title: 'Coffee lover en invierno | Experiencia Café Etrusca',
      description: 'Experiencia Coffee lover en invierno el 9 de noviembre 2026 en sucursales Etrusca.',
      keywords: 'coffee lover,invierno,experiencias,Café Etrusca'
    }
  },
  {
    id: null, // No se encontró un ID exacto para "Experiencia sensorial" en la tabla provista
    slug: 'experiencia-sensorial',
    kind: 'experiencias',
    kicker: 'Experiencia',
    title: 'Experiencia sensorial',
    summary: 'Entrena nariz y paladar para describir café con un lenguaje común.',
    duration: '1 día',
    hours: '4 horas',
    schedule: '10:00 a.m. - 2:00 p.m.',
    image: '/assets/images/educacion/cursos-card.png',
    banner: '/assets/images/educacion/curso-banner.png',
    highlights: [
      { title: 'Aromas de referencia', text: 'Identifica notas con kits y ejercicios guiados.' },
      { title: 'Rueda de sabores', text: 'Pasa de “me gusta” a un vocabulario preciso.' },
      { title: 'Cata a ciegas', text: 'Compara orígenes y procesos en mesa.' }
    ],
    synopsis: 'Una sesión para despertar el sentido. Ideal como primer contacto con la cata o como refuerzo para equipos de barra.',
    syllabus: [
      { title: 'Olfato y memoria', text: 'Calibración con aromas.' },
      { title: 'Gusto y textura', text: 'Dulzor, acidez, amargo y cuerpo.' },
      { title: 'Mesa de cata', text: 'Protocolo simplificado y registro.' }
    ],
    learn: [
      'Vocabulario sensorial',
      'Identificación de notas',
      'Cata comparativa',
      'Registro de taza'
    ],
    audience: [
      'Coffee lovers.',
      'Baristas en formación.',
      'Equipos de calidad.'
    ],
    includes: INCLUDES_BASE,
    dates: DATES_DAY,
    seo: {
      title: "Experiencia sensorial de café | Café Etrusca",
      description: "Adquiere las habilidades para evaluar, describir y diferenciar las características de un café de especialidad. Cata guiada con rueda de sabores.",
      keywords: "experiencia sensorial,cata de café,rueda de sabores,café de especialidad,mezcla de café,Café Etrusca"
    }
  },
  {
    id: 3, 
    slug: 'catacion-de-cafe',
    kind: 'experiencias',
    kicker: 'Experiencia',
    title: 'Catación de café',
    summary: 'Protocolo de mesa para evaluar café como en la industria de especialidad.',
    duration: '1 día',
    hours: '4 horas',
    schedule: '9:00 a.m. - 1:00 p.m.',
    image: '/assets/images/educacion/cursos-photo.png',
    banner: '/assets/images/educacion/curso-banner.png',
    highlights: [
      { title: 'Protocolo SCA', text: 'Tostión de muestra, molienda, tiempo y puntaje.' },
      { title: 'Defectos en taza', text: 'Reconoce fermento, fenólico, rio y más.' },
      { title: 'Calibración de mesa', text: 'Alinea criterios con el grupo.' }
    ],
    synopsis: 'Aprende a catar con método. Útil para comprar café, armar blends o comunicar calidad a tu equipo.',
    syllabus: [
      { title: 'Setup de mesa', text: 'Agua, ratios y formato.' },
      { title: 'Evaluación', text: 'Fragancia, aroma, sabor, acidez, cuerpo y balance.' },
      { title: 'Cierre', text: 'Puntaje y decisión de compra.' }
    ],
    learn: [
      'Protocolo de catación',
      'Puntaje de taza',
      'Detección de defectos',
      'Decisión de compra'
    ],
    audience: [
      'Compradores de café.',
      'Tostadores.',
      'Baristas avanzados.'
    ],
    includes: INCLUDES_BASE,
    dates: DATES_DAY,
    seo: {
      title: "Catación de café | Protocolo SCA - Café Etrusca",
      description: "Aprende el protocolo SCA de catación: fragancia, aroma, sabor, acidez, cuerpo y balance. Reconoce defectos en taza y calibra criterios de mesa.",
      keywords: "catación de café,cupping,protocolo SCA,defectos en taza,Café Etrusca,cursos para barista"
    }
  },

  {
    id: null,
    slug: 'crear-mezcla-de-cafe',
    kind: 'experiencias',
    kicker: 'Experiencia',
    title: '¡Aprende a crear tu propia mezcla de café!',
    summary: 'Adquiere las habilidades para evaluar, describir y diferenciar las características de un café de especialidad, y crea tu propia mezcla.',
    duration: '1 día',
    hours: '3 horas',
    schedule: '10:00 a.m. - 1:00 p.m.',
    image: '/assets/images/educacion/exp-mezcla-cafe.webp',
    banner: '/assets/images/educacion/exp-mezcla-cafe.webp',
    ideal: 'Ideal si quieres entender origen y tueste para armar una mezcla que identifique tu cafetería.',
    highlights: [
      { title: 'ABC del sabor', text: 'Origen, proceso y tueste: cómo se construye el perfil en taza.' },
      { title: 'Cata comparativa', text: 'Vocabulario para evaluar, describir y diferenciar cafés de especialidad.' },
      { title: 'Tu propia mezcla', text: 'Combina orígenes y grados de tueste con el acompañamiento de catadores y tostadores.' }
    ],
    synopsis: 'A menudo nos preguntamos cuál es el mejor café, qué método usar o si el tueste debe ser medio u oscuro. Modificar estas variables te da la oportunidad de elaborar un café único. En esta experiencia creas tu propia mezcla, identificas su perfil de sabor y usas herramientas para entender cafés de alta calidad según la ocasión: un café de mañana, un cold brew o un regalo.',
    syllabus: [
      { title: 'El campo y el productor', text: 'El origen del café y las manos que lo trabajan antes de la taza.' },
      { title: 'El beneficio y el tueste', text: 'La transformación del grano y el desarrollo de un perfil de tueste.' },
      { title: 'La taza', text: 'El eslabón final: cata sensorial comparativa y preparación.' },
      { title: 'Prepara tu propia mezcla', text: 'Mezcla orígenes y tuestes para un perfil exclusivo de tu cafetería.' }
    ],
    learn: [
      'Evaluar y describir un café de especialidad',
      'Relacionar origen, proceso y tueste con el sabor',
      'Hacer una cata sensorial comparativa',
      'Crear tu propia mezcla de café'
    ],
    audience: [
      'Dueños de cafetería que quieren una mezcla propia.',
      'Coffee lovers que quieren entender el perfil de taza.',
      'Equipos que compran café de especialidad.'
    ],
    includes: INCLUDES_BASE,
    dates: DATES_DAY,
    seo: {
      title: 'Experiencia ¡Aprende a crear tu propia mezcla de café!',
      description: 'Adquiere las habilidades para evaluar, describir y diferenciar las características de un café de especialidad, y crea tu propia mezcla.',
      keywords: 'mezcla de café,café de especialidad,cata sensorial,tueste,Café Etrusca'
    }
  },
  {
    id: null,
    slug: 'oasis-bebidas-frias',
    kind: 'experiencias',
    kicker: 'Experiencia',
    title: 'El oasis del sabor con bebidas frías',
    summary: 'En esta experiencia aprenderás sobre la elaboración de bebidas frías con y sin café, integrando técnicas actuales, ingredientes de calidad y tendencias de menú.',
    duration: '1 día',
    hours: '3 horas',
    schedule: '10:00 a.m. - 1:00 p.m.',
    image: '/assets/images/educacion/exp-oasis-bebidas-frias.webp',
    banner: '/assets/images/educacion/exp-oasis-bebidas-frias.webp',
    ideal: 'Ideal si quieres ampliar el menú frío con y sin café.',
    highlights: [
      { title: 'Con café', text: 'Iced latte, iced cappuccino, cold brew / nitro, frappés y mocktails.' },
      { title: 'Sin café', text: 'Chocolates fríos, smoothies y bebidas vegetales con superfoods.' },
      { title: 'Técnica en frío', text: 'Shaker, enfriado rápido, toppings y cómo evitar la separación.' }
    ],
    synopsis: 'Aprenderás a elaborar bebidas frías con y sin café, integrando técnicas actuales, ingredientes de calidad, tendencias de mercado y creatividad para la oferta del menú.',
    syllabus: [
      { title: 'Bebidas con café', text: 'Iced latte / iced cappuccino, cold brew / nitro, frappés (moka, vainilla, caramelo) y mocktails con base de café.' },
      { title: 'Bebidas sin café', text: 'Chocolates fríos, smoothies y bebidas vegetales con superfoods.' },
      { title: 'Insumos y complementos', text: 'Leches vegetales, jams, concentrados, insumos de temporada, toppings y endulzantes.' },
      { title: 'Técnicas de preparación', text: 'Enfriado rápido, shaker y cómo evitar la separación en bebidas frías.' }
    ],
    learn: [
      'Preparar iced latte, cold brew, frappés y mocktails',
      'Elaborar chocolates fríos, smoothies y bebidas vegetales',
      'Elegir leches, toppings e insumos de temporada',
      'Aplicar técnicas de shaker y enfriado rápido'
    ],
    audience: [
      'Dueños que quieren reforzar el menú frío.',
      'Baristas de bebidas frías.',
      'Coffee lovers interesados en mixología sin alcohol.'
    ],
    includes: INCLUDES_BASE,
    dates: DATES_DAY,
    seo: {
      title: 'Experiencia el oasis del sabor con bebidas frías',
      description: 'En esta experiencia aprenderás sobre la elaboración de bebidas frías con y sin café, integrando técnicas actuales, ingredientes de calidad, tendencias de mercado y creatividad para la oferta del menú.',
      keywords: 'oasis del sabor,bebidas frías,cold brew,frappés,mocktails,Café Etrusca'
    }
  },

  {
    id: 2,
    slug: 'arte-latte',
    kind: 'talleres',
    kicker: 'Taller',
    title: 'Arte Latte',
    summary: 'Domina la textura de la leche y los patrones clásicos para elevar la presentación de cada taza.',
    duration: '1 día',
    hours: '6 horas',
    schedule: '9:00 a.m. - 3:00 p.m.',
    image: '/assets/images/educacion/taller-arte-latte.webp',
    banner: '/assets/images/educacion/taller-arte-latte.webp',
    ideal: 'Ideal si ya vaporizas leche y quieres consistencia en el arte.',
    highlights: [
      { title: 'Microespuma', text: 'Textura brillante, sin burbuja, lista para dibujar.' },
      { title: 'Patrones clásicos', text: 'Corazón, rosetta, tulipán y variaciones.' },
      { title: 'Contraste y simetría', text: 'Control del vertido y corrección en taza.' }
    ],
    synopsis: 'Taller de un día, casi todo práctica. Sales con la mano más suelta, criterios de textura y una rutina para ensayar en tu barra.',
    syllabus: [
      { title: 'Leche y jarra', text: 'Elección de leche, temperatura y ángulo.' },
      { title: 'Vertido base', text: 'Punto, flujo y altura.' },
      { title: 'Patrones', text: 'Corazón, tulip y rosetta.' },
      { title: 'Rutina de práctica', text: 'Ejercicios para llevar a casa.' }
    ],
    learn: [
      'Textura de leche',
      'Patrones clásicos',
      'Control de vertido',
      'Presentación de taza'
    ],
    audience: [
      'Baristas en barra.',
      'Equipos que quieren estandarizar presentación.',
      'Coffee lovers con práctica previa de leche.'
    ],
    includes: INCLUDES_BASE,
    dates: DATES_DAY,
    seo: {
      title: "Taller básico de arte latte - Aprende a realizar figuras en taza",
      description: "Taller de arte latte está desarrollado por Campeones Nacionales para perfeccionar tu técnica de espumado/vaciado para realizar figuras perfectas.",
      keywords: "arte latte basico,arte latte curso,curso de arte latte,figuras arte latte,figuras en la taza de café,Café Etrusca"
    }
  },
  {
    id: null, // No se encontró un ID exacto para "Métodos de extracción" (Podría ser el ID 4: BREW BAR & COLD BREW)
    slug: 'metodos-de-extraccion',
    kind: 'talleres',
    kicker: 'Taller',
    title: 'Métodos de extracción',
    summary: 'Caliente y frío: V60, prensa, batch, toddy y más, con recetas para menú.',
    duration: '1 día',
    hours: '6 horas',
    schedule: '9:00 a.m. - 3:00 p.m.',
    image: '/assets/images/educacion/cursos-photo.png',
    banner: '/assets/images/educacion/curso-banner.png',
    highlights: [
      { title: 'Filtro caliente', text: 'V60, chemex y batch brew con recetas repetibles.' },
      { title: 'Cold brew y toddy', text: 'Ratios, tiempo y servicio en barra.' },
      { title: 'Ajuste por café', text: 'Molienda y agua según origen.' }
    ],
    synopsis: 'Un día para dominar métodos más allá del espresso. Ideal para armar una carta de filtro y bebidas frías con criterio.',
    syllabus: [
      { title: 'Agua y molienda', text: 'Variables que más mueven la taza.' },
      { title: 'Métodos calientes', text: 'Manuales y batch.' },
      { title: 'Métodos fríos', text: 'Inmersión, toddy y servicio.' }
    ],
    learn: [
      'Recetas de filtro',
      'Cold brew y toddy',
      'Ajuste de molienda',
      'Carta de métodos'
    ],
    audience: [
      'Baristas de filtro.',
      'Dueños que quieren menú de métodos.',
      'Equipos de barra completa.'
    ],
    includes: INCLUDES_BASE,
    dates: DATES_DAY,
    seo: {
      title: "Taller de Brew Bar & Cold Brew",
      description: "Taller de brew bar donde aprenderás a utilizar los métodos artesanales para la preparación de cafés y podrás descubrir las tendencias en Brew Bar.",
      keywords: "Curso Brew Bar,Cold Brew,métodos de extracción,V60,café,bar de café,Café Etrusca"
    }
  },

  {
    id: 38,
    slug: 'bebidas-frias',
    kind: 'talleres',
    kicker: 'Taller',
    title: 'Bebidas Frías',
    summary: 'Aprenderás a elaborar frapés, smoothies, tisanas frías y sodas italianas utilizando correctamente bases, jarabes y licuadoras.',
    duration: '1 día',
    hours: '6 horas',
    schedule: '9:00 a.m. - 3:00 p.m.',
    image: '/assets/images/educacion/taller-bebidas-frias.webp',
    banner: '/assets/images/educacion/taller-bebidas-frias.webp',
    ideal: 'Ideal si quieres armar o mejorar el menú frío de tu barra.',
    highlights: [
      { title: 'Categorías del menú frío', text: 'Bebidas frías, frappés, sodas italianas y smoothies con impacto visual.' },
      { title: 'Preparaciones previas', text: 'Layering, shaker, licuadora, cold brew, foams, crema batida, cold tea y tisana.' },
      { title: 'Costeo y operación', text: 'Porciones, insumos, acomodo de barra fría y ejercicio práctico de costeo.' }
    ],
    synopsis: 'Hoy las bebidas frías son una de las fuentes de ingreso más altas y con mayor margen para cafeterías y barras de café. Este taller te da las herramientas para conocer las principales categorías de un menú frío, las técnicas de preparación, cantidades, uso correcto de insumos y el manejo de equipo y accesorios.',
    syllabus: [
      { title: 'Categoría de bebidas para el menú frío', text: 'Bebidas frías, smoothies, sodas italianas y opciones de temporada o festividades.' },
      { title: 'Técnicas de preparación', text: 'Insumos, porciones adecuadas y el hielo como ingrediente fundamental.' },
      { title: 'Preparaciones previas', text: 'Por capas o layering, mixing glass, shaker, licuadora, cold brew, foams, crema batida, cold tea y cold tisana.' },
      { title: 'Costeo de bebida', text: 'Ejemplo y ejercicio práctico para calcular recetas de forma independiente.' },
      { title: 'Equipos, accesorios y operación', text: 'Acomodo y operación de la barra fría para un manejo óptimo.' }
    ],
    learn: [
      'Dominar las categorías del menú frío y su presentación',
      'Aplicar técnicas de preparación de forma adecuada',
      'Hacer preparaciones previas para optimizar tiempos',
      'Mejorar la operación con insumos, porciones y equipo',
      'Calcular recetas y costeo de bebidas'
    ],
    audience: [
      'Dueños de cafetería que quieren fortalecer el menú frío.',
      'Baristas que operan barra de bebidas frías.',
      'Equipos que buscan estandarizar recetas y porciones.'
    ],
    includes: INCLUDES_BASE,
    dates: DATES_DAY,
    seo: {
      title: 'Taller Bebidas Frías',
      description: 'Domina las categorías de bebidas para el menú frío: frappés, smoothies, sodas italianas y preparaciones previas. Optimiza la operación y ganancias de tu barra.',
      keywords: 'taller bebidas frías,frappés,smoothies,sodas italianas,menú frío,barra de café,Café Etrusca'
    }
  },
  {
    id: 7,
    slug: 'bubble-tea-iced-coffee',
    kind: 'talleres',
    kicker: 'Taller',
    title: 'Bubble Tea & Iced Coffee',
    summary: 'Explora el fascinante mundo de la tapioca. Este curso te sumerge en cada aspecto de este versátil ingrediente: apariencia, sabor, color y textura.',
    duration: '1 día',
    hours: '6 horas',
    schedule: '9:00 a.m. - 3:00 p.m.',
    image: '/assets/images/educacion/taller-bubble-tea.webp',
    banner: '/assets/images/educacion/taller-bubble-tea.webp',
    ideal: 'Ideal si quieres incorporar bubble tea e iced coffee a tu menú.',
    highlights: [
      { title: 'Bases de té y milk tea', text: 'Té, tisanas, milk tea, chocolate y su combinación con toppings.' },
      { title: 'Tapioca y texturas', text: 'Cocción de tapioca, perlas explosivas y presentaciones con cuerpo.' },
      { title: 'Menú y costeo', text: 'Opciones de carta, estandarización de recetas y nociones de costos.' }
    ],
    synopsis: 'El Bubble Tea no es solo una bebida creativa: es un concepto de negocio. Por su versatilidad, personalización y diversidad de toppings se volvió un producto estrella. Revisamos la preparación de tapioca, distintos tipos de té e iced coffee para armar bebidas con sabor, color y textura.',
    syllabus: [
      { title: 'Qué es el Bubble Tea', text: 'Origen, expansión y popularidad en México.' },
      { title: 'Ingredientes base', text: 'Té, tisanas y sus beneficios; leche / milk tea y chocolate.' },
      { title: 'Toppings', text: 'Tapioca: características, beneficios y cuidados; perlas explosivas.' },
      { title: 'Técnicas de preparación', text: 'Cocer tapioca, preparar tés e iced coffee.' },
      { title: 'Menú y costeo', text: 'Opciones de menú, presentación, servicio y estandarización de recetas.' }
    ],
    learn: [
      'Elaborar recetas clásicas de Bubble Tea',
      'Cocer tapioca y preparar distintos tipos de té e iced coffee',
      'Conocer la versatilidad de los insumos y su manejo',
      'Aplicar presentación y servicio de bebidas',
      'Aplicar nociones iniciales de costos y estandarización'
    ],
    audience: [
      'Emprendedores que quieren sumar bubble tea a su barra.',
      'Baristas que preparan bebidas frías y con textura.',
      'Dueños que buscan un producto estrella para el menú.'
    ],
    includes: INCLUDES_BASE,
    dates: DATES_DAY,
    seo: {
      title: 'Taller de Bubble tea & iced coffee',
      description: 'Taller de Bubble tea & iced, combina diferentes aspectos que lo hacen único: toppings originales que le dan textura a la bebida, combinación de sabores, presentación atractiva y la posibilidad de personalizar tu bebida.',
      keywords: 'Taller de Bubble tea & iced coffee,curso de bubble tea,curso de iced coffee,tapioca,boba,Café Etrusca'
    }
  },
  {
    id: 16,
    slug: 'formacion-barista-especializado',
    kind: 'talleres',
    kicker: 'Taller',
    title: 'Formación para un barista especializado',
    summary: 'Es momento de analizar el espresso pues es la base principal de una bebida. Perfecciona extracción, calibración y flujo de trabajo en barra.',
    duration: '1 día',
    hours: '6 horas',
    schedule: '9:00 a.m. - 3:00 p.m.',
    image: '/assets/images/educacion/taller-barista-especializado.webp',
    banner: '/assets/images/educacion/taller-barista-especializado.webp',
    ideal: 'Ideal si ya operas barra y quieres profundizar espresso, TDS y estándares SCA.',
    highlights: [
      { title: 'Espresso con criterio', text: 'Sub-extracción, sobre-extracción, EBF, porcentaje de extracción y TDS.' },
      { title: 'Flujo de estación', text: 'Manejo de estaciones, higiene y rapidez en barra.' },
      { title: 'Leche y servicio', text: 'Espumado, vertido, estándares SCA y servicio al cliente.' }
    ],
    synopsis: 'Taller práctico para el manejo y operación de barras de café, impartido por instructores certificados por la SCA. Analizamos el espresso como base de la bebida, el espacio de trabajo para un flujo constante y herramientas para medir sólidos disueltos y la espresso brew formula.',
    syllabus: [
      { title: 'Procesos del espresso', text: 'Molienda, dosificación y compactación bajo estándares internacionales.' },
      { title: 'Preparación del espresso ideal', text: 'Espresso brew fórmula, porcentaje de extracción, TDS y cuadro de control.' },
      { title: 'Evaluación sensorial', text: 'Flavor wheel, nariz del café y formato CVA (Coffee Value Assessment).' },
      { title: 'Leche y bebidas', text: 'Fases de la leche, estándares de bebidas según la SCA y vertido.' },
      { title: 'Equipo, agua e higiene', text: 'Limpieza preventiva, calidad del agua, normas de higiene en México y servicio al cliente.' }
    ],
    learn: [
      'Calibración correcta del molino',
      'Técnicas depuradas para espresso',
      'Identificar sub-extracción y sobre-extracción',
      'Espumado y vertido correcto de leche',
      'Manejo de estación, higiene y mantenimiento preventivo'
    ],
    audience: [
      'Baristas que ya operan barra y quieren especializarse.',
      'Equipos de cafetería que buscan estándares SCA.',
      'Emprendedores que van a profesionalizar su operación.'
    ],
    includes: INCLUDES_BASE,
    dates: DATES_DAY,
    seo: {
      title: 'Taller básico para baristas especializado - Curso con instructores certificados SCA',
      description: 'Aprende espresso, extracción, calibración, leche, estándares de la SCA y servicio al cliente en nuestro taller para baristas especializados. Ideal para principiantes y cafeterías.',
      keywords: 'curso barista especializado,taller de barista,curso barista SCA,curso de espresso,barista profesional,Café Etrusca'
    }
  },
  {
    id: 26,
    slug: 'arte-latte-especializado',
    kind: 'talleres',
    kicker: 'Taller',
    title: 'Arte Latte Especializado',
    summary: 'Perfecciona tu técnica de espumado y vaciado para diseños más allá de los patrones básicos, con estándares SCA.',
    duration: '1 día',
    hours: '6 horas',
    schedule: '9:00 a.m. - 3:00 p.m.',
    image: '/assets/images/educacion/taller-arte-latte-especializado.webp',
    banner: '/assets/images/educacion/taller-arte-latte-especializado.webp',
    ideal: 'Ideal si ya dominas corazón y rosetta y quieres patrones combinados y técnica de líneas.',
    highlights: [
      { title: 'Espresso para arte', text: 'Cómo funciona el espresso en el arte latte y su impacto en taza.' },
      { title: 'Patrones avanzados', text: 'Roseta, cisne y combinaciones: tulipán + roseta o roseta + roseta.' },
      { title: 'Estándar SCA', text: 'Latte art standard y técnica de líneas para el detalle.' }
    ],
    synopsis: 'El toque final en un cappuccino, latte o flat white es el arte latte. Este taller, desarrollado con el criterio de campeones nacionales, te enseña texturizado para diseños a partir de dos o más patrones y la técnica de líneas, además de los estándares de latte art según la Specialty Coffee Association.',
    syllabus: [
      { title: 'Espresso para arte', text: 'Comprender el espresso y su impacto en bebidas con arte latte.' },
      { title: 'Leche', text: 'Composición, estabilidad, procesos, posición de la lanceta, hissing y temperatura.' },
      { title: 'Herramientas', text: 'Tipos de jarras y estándar de leche al espumar.' },
      { title: 'Latte art standard SCA', text: 'Cómo identificar un buen diseño según la SCA.' },
      { title: 'Técnica de líneas', text: 'Detalles en diseños de dos o más patrones.' }
    ],
    learn: [
      'Elaborar espressos bajo estándares SCA para arte latte',
      'Identificar un buen diseño con el latte art standard',
      'Texturizar leche para roseta, cisne y patrones combinados',
      'Aplicar técnica de líneas para el detalle'
    ],
    audience: [
      'Baristas con práctica previa de arte latte básico.',
      'Equipos que quieren elevar la presentación en taza.',
      'Baristas que buscan el estándar SCA de latte art.'
    ],
    includes: INCLUDES_BASE,
    dates: DATES_DAY,
    seo: {
      title: 'Taller Especializado de arte latte - Aprende a realizar figuras en taza',
      description: 'Taller de arte latte especializado está desarrollado por Campeones Nacionales para perfeccionar tu técnica de espumado/vaciado para realizar figuras perfectas.',
      keywords: 'arte latte especializado,curso de arte latte,figuras en la taza de café,latte art standard,Café Etrusca'
    }
  },
  {
    id: 12,
    slug: 'bubble-tea-especializado',
    kind: 'talleres',
    kicker: 'Taller',
    title: 'Bubble Tea Especializado',
    summary: 'Descubre el secreto detrás de una de las tendencias más populares en México. Aprende a combinar sabores, texturas y colores para crear bebidas irresistibles.',
    duration: '1 día',
    hours: '6 horas',
    schedule: '9:00 a.m. - 3:00 p.m.',
    image: '/assets/images/educacion/taller-bubble-tea-especializado.webp',
    banner: '/assets/images/educacion/taller-bubble-tea-especializado.webp',
    ideal: 'Ideal si ya preparas bubble tea y quieres operar, costear e innovar la barra.',
    highlights: [
      { title: 'Modelo de negocio', text: 'Mercado latinoamericano, segmentos y plan para barras de bubble tea.' },
      { title: 'Menú y rentabilidad', text: 'Diseña tu menú, costeo y control de bases, toppings e insumos.' },
      { title: 'Nuevas texturas', text: 'Clasificaciones de bebidas, nuevos toppings, equipos y accesorios.' }
    ],
    synopsis: 'Taller para diseñar, operar y optimizar una barra de bubble tea: técnicas de preparación, costos, insumos y tendencias. El objetivo es estandarizar bebidas, cuidar calidad e innovar para un negocio rentable ante el consumidor moderno.',
    syllabus: [
      { title: 'Mercado y modelo de negocio', text: 'Mercado latinoamericano, segmentos y plan de negocio para barras bubble tea.' },
      { title: 'Menú y costeo', text: 'Diseña tu menú y principios básicos de costeo y rentabilidad.' },
      { title: 'Operación', text: 'Manejo y control de bases, toppings e insumos; higiene y seguridad.' },
      { title: 'Tendencia y texturas', text: 'Clasificaciones de bebidas, nuevos toppings, equipos y accesorios.' }
    ],
    learn: [
      'Preparar y controlar bases, toppings e insumos',
      'Elegir el modelo de negocio según tu mercado',
      'Calcular costos y maximizar rentabilidad',
      'Desarrollar un menú con bebidas de tendencia',
      'Aplicar prácticas de higiene y nuevas texturas'
    ],
    audience: [
      'Dueños de barra o cafetería con oferta de bubble tea.',
      'Emprendedores que van a abrir un concepto de bubble tea.',
      'Equipos que ya operan y quieren estandarizar e innovar.'
    ],
    includes: INCLUDES_BASE,
    dates: DATES_DAY,
    seo: {
      title: 'Taller de Bubble Tea Especializado',
      description: 'Únete al Taller de Bubble Tea Especializado, diseñado para elevar tu negocio al siguiente nivel con nuevas técnicas, sabores, texturas y presentaciones atractivas que captarán la atención en redes sociales y atraerán a más clientes.',
      keywords: 'Taller de Bubble tea especializado,curso de Bubble Tea,milk tea,tiger milk tea,jellies,crystal bobba,Café Etrusca'
    }
  },
  {
    id: 9,
    slug: 'mixologia',
    kind: 'talleres',
    kicker: 'Taller',
    title: 'Mixología',
    summary: 'Explora técnicas esenciales para crear bebidas en tendencia, incluyendo alternativas de café y opciones sin alcohol.',
    duration: '1 día',
    hours: '6 horas',
    schedule: '9:00 a.m. - 3:00 p.m.',
    image: '/assets/images/educacion/taller-mixologia.webp',
    banner: '/assets/images/educacion/taller-mixologia.webp',
    ideal: 'Ideal si quieres ampliar el menú de la cafetería con cocktails y mocktails.',
    highlights: [
      { title: 'Técnicas de elaboración', text: 'Siete técnicas principales con ingredientes de fácil adquisición y conservación.' },
      { title: 'Cocktails y mocktails', text: 'Bebidas con alcohol y sin él, aprovechando lo que ya tienes en barra.' },
      { title: 'Recetario rentable', text: 'Costeo, cristalería, utensilios y un recetario dinámico.' }
    ],
    synopsis: 'Los cocktails son una forma creativa de beber café. Este taller te permite ampliar el menú con técnicas para bebidas con alcohol y sin él, aprovechando utensilios, equipos e insumos con los que regularmente ya cuenta una cafetería.',
    syllabus: [
      { title: 'Fundamentos', text: 'Qué es la mixología, un cocktail y un mocktail.' },
      { title: 'Herramientas', text: 'Utensilios, equipos y tipos de cristalería.' },
      { title: 'Ingredientes', text: 'Frutales, especias, lácteos, extractos, maceraciones, fermentados, destilados y licores.' },
      { title: 'Técnicas y presentación', text: 'Elaboración, presentación y recetario dinámico.' },
      { title: 'Costeo y tendencia', text: 'Costeo de bebidas y tendencias o eventos relevantes en México.' }
    ],
    learn: [
      'Aplicar técnicas principales de preparación de bebidas',
      'Aprovechar insumos, accesorios y equipos de la cafetería',
      'Desarrollar bebidas con un sistema de costeo',
      'Armar un recetario rentable y dinámico'
    ],
    audience: [
      'Dueños de cafetería que quieren ampliar el menú.',
      'Baristas interesados en mocktails y cocktails de café.',
      'Equipos que buscan bebidas de tendencia sin montar un bar completo.'
    ],
    includes: INCLUDES_BASE,
    dates: DATES_DAY,
    seo: {
      title: 'Taller de mixología con café sin alcohol',
      description: 'Taller de mixología con café sin alcohol donde aprenderás a crear bebidas de tendencia y desarrollarás usos alternativos a los insumos que tiene tu negocio.',
      keywords: 'Taller de mixología,cursos mixologia,mocktails,bebidas de café,Café Etrusca'
    }
  },

{
    id: null,
    slug: 'verano-chillout',
    kind: 'sesiones',
    kicker: 'Sesión',
    title: 'Verano ChillOut',
    summary: 'Sesión gratuita de temporada para armar bebidas frías de verano, con recetas listas para barra.',
    duration: '1 día',
    hours: '4 horas',
    schedule: '10:00 a.m. - 2:00 p.m.',
    image: '/assets/images/educacion/sesion-verano-chillout.webp',
    banner: '/assets/images/educacion/curso-banner.png',
    highlights: [
      { title: 'Menú de verano', text: 'Bebidas frías y combinaciones ChillOut para la temporada.' },
      { title: 'Cupo limitado', text: 'Grupos chicos por sucursal.' },
      { title: 'Sin costo', text: 'Sesión gratuita de calendario Etrusca.' }
    ],
    synopsis: 'Práctica de menú frío de verano: recetas, emplatado y ritmo de barra para la temporada ChillOut.',
    syllabus: [
      { title: 'Calentamiento', text: 'Objetivo del día y mise en place.' },
      { title: 'Práctica guiada', text: 'Recetas frías y servicio.' },
      { title: 'Cierre', text: 'Notas para repetir en tu barra.' }
    ],
    learn: ['Bebidas frías', 'Menú de temporada', 'Ritmo de barra', 'Servicio'],
    audience: ['Baristas.', 'Dueños de cafetería.', 'Alumnos Etrusca.'],
    includes: INCLUDES_BASE,
    dates: [...sesionQro('30', 'Junio'), ...sesionMty('04', 'Julio'), ...sesionGdl('11', 'Julio')],
    seo: {
      title: 'Verano ChillOut | Sesiones Café Etrusca',
      description: 'Sesión gratuita ChillOut: bebidas frías de verano en sucursales Etrusca, julio 2026.',
      keywords: 'verano chillout,sesiones sabatinas,bebidas frías,Café Etrusca'
    }
  },
  {
    id: null,
    slug: 'bubble-power-session',
    kind: 'sesiones',
    kicker: 'Sesión',
    title: 'Bubble Power Session',
    summary: 'Sesión gratuita para dominar bubble tea y bebidas con perlas, de la receta al servicio.',
    duration: '1 día',
    hours: '4 horas',
    schedule: '10:00 a.m. - 2:00 p.m.',
    image: '/assets/images/educacion/sesion-bubble-power-session.webp',
    banner: '/assets/images/educacion/curso-banner.png',
    highlights: [
      { title: 'Bubble tea', text: 'Perlas, tes y ensamble de vaso.' },
      { title: 'Cupo limitado', text: 'Grupos chicos por sucursal.' },
      { title: 'Sin costo', text: 'Sesión gratuita de calendario Etrusca.' }
    ],
    synopsis: 'Práctica de bubble tea: texturas, recetas y presentación para vender en barra.',
    syllabus: [
      { title: 'Calentamiento', text: 'Ingredientes y flujo.' },
      { title: 'Práctica guiada', text: 'Recetas power y servicio.' },
      { title: 'Cierre', text: 'Notas para tu menú.' }
    ],
    learn: ['Bubble tea', 'Perlas', 'Montaje', 'Servicio'],
    audience: ['Baristas.', 'Dueños de cafetería.', 'Alumnos Etrusca.'],
    includes: INCLUDES_BASE,
    dates: [...sesionGdl('04', 'Julio'), ...sesionQro('07', 'Julio'), ...sesionMty('11', 'Julio')],
    seo: {
      title: 'Bubble Power Session | Sesiones Café Etrusca',
      description: 'Sesión gratuita de bubble tea en sucursales Etrusca, julio 2026.',
      keywords: 'bubble tea,bubble power,sesiones sabatinas,Café Etrusca'
    }
  },
  {
    id: null,
    slug: 'tisanas-en-verano',
    kind: 'sesiones',
    kicker: 'Sesión',
    title: 'Tisanas en verano',
    summary: 'Sesión gratuita de tisanas e infusiones para el menú de temporada.',
    duration: '1 día',
    hours: '4 horas',
    schedule: '10:00 a.m. - 2:00 p.m.',
    image: '/assets/images/educacion/sesion-tisanas-en-verano.webp',
    banner: '/assets/images/educacion/curso-banner.png',
    highlights: [
      { title: 'Tisanas', text: 'Infusiones, hielo y servicio de verano.' },
      { title: 'Cupo limitado', text: 'Grupos chicos por sucursal.' },
      { title: 'Sin costo', text: 'Sesión gratuita de calendario Etrusca.' }
    ],
    synopsis: 'Armado de tisanas de verano: recetas, tiempos de infusión y presentación.',
    syllabus: [
      { title: 'Calentamiento', text: 'Tés e infusiones.' },
      { title: 'Práctica guiada', text: 'Recetas frías y calientes.' },
      { title: 'Cierre', text: 'Notas de barra.' }
    ],
    learn: ['Tisanas', 'Infusión', 'Menú de verano', 'Servicio'],
    audience: ['Baristas.', 'Dueños de cafetería.', 'Alumnos Etrusca.'],
    includes: INCLUDES_BASE,
    dates: [...sesionQro('14', 'Julio'), ...sesionMty('18', 'Julio'), ...sesionGdl('25', 'Julio')],
    seo: {
      title: 'Tisanas en verano | Sesiones Café Etrusca',
      description: 'Sesión gratuita de tisanas de verano en sucursales Etrusca, julio 2026.',
      keywords: 'tisanas,infusiones,sesiones sabatinas,Café Etrusca'
    }
  },
  {
    id: null,
    slug: 'versatilidad-mezcla-especial-1',
    kind: 'sesiones',
    kicker: 'Sesión',
    title: 'Versatilidad de la mezcla especial No. 1',
    summary: 'Sesión gratuita para explorar la Mezcla Especial No. 1 en espresso, filtro y bebidas de barra.',
    duration: '1 día',
    hours: '4 horas',
    schedule: '10:00 a.m. - 2:00 p.m.',
    image: '/assets/images/educacion/sesion-versatilidad-mezcla-especial-1.webp',
    banner: '/assets/images/educacion/curso-banner.png',
    highlights: [
      { title: 'Una mezcla, varios usos', text: 'Espresso, filtro y menú con la Especial No. 1.' },
      { title: 'Cupo limitado', text: 'Grupos chicos por sucursal.' },
      { title: 'Sin costo', text: 'Sesión gratuita de calendario Etrusca.' }
    ],
    synopsis: 'Práctica con la Mezcla Especial No. 1: perfil, extracción y recetas versátiles.',
    syllabus: [
      { title: 'Calentamiento', text: 'Perfil de la mezcla.' },
      { title: 'Práctica guiada', text: 'Espresso, filtro y bebidas.' },
      { title: 'Cierre', text: 'Notas de receta.' }
    ],
    learn: ['Mezcla especial', 'Espresso', 'Filtro', 'Menú'],
    audience: ['Baristas.', 'Dueños de cafetería.', 'Alumnos Etrusca.'],
    includes: INCLUDES_BASE,
    dates: [
      ...sesionGdl('18', 'Julio'),
      ...sesionQro('21', 'Julio'),
      ...sesionMty('25', 'Julio'),
      ...sesionGdl('29', 'Agosto'),
      ...sesionQro('08', 'Septiembre'),
      ...sesionMty('12', 'Septiembre')
    ],
    seo: {
      title: 'Mezcla especial No. 1 | Sesiones Café Etrusca',
      description: 'Sesión gratuita sobre la versatilidad de la Mezcla Especial No. 1, jul-sep 2026.',
      keywords: 'mezcla especial,sesiones sabatinas,Café Etrusca'
    }
  },
  {
    id: null,
    slug: 'orgullo-mexicano',
    kind: 'sesiones',
    kicker: 'Sesión',
    title: 'Orgullo mexicano: nuestros galardonados',
    summary: 'Sesión gratuita alrededor de los cafés mexicanos galardonados de Etrusca.',
    duration: '1 día',
    hours: '4 horas',
    schedule: '10:00 a.m. - 2:00 p.m.',
    image: '/assets/images/educacion/sesion-orgullo-mexicano.webp',
    banner: '/assets/images/educacion/curso-banner.png',
    highlights: [
      { title: 'Origen México', text: 'Cafés galardonados y su historia en taza.' },
      { title: 'Cupo limitado', text: 'Grupos chicos por sucursal.' },
      { title: 'Sin costo', text: 'Sesión gratuita de calendario Etrusca.' }
    ],
    synopsis: 'Cata y barra con los cafés mexicanos premiados de Etrusca.',
    syllabus: [
      { title: 'Calentamiento', text: 'Orígenes y premios.' },
      { title: 'Práctica guiada', text: 'Cata y recetas.' },
      { title: 'Cierre', text: 'Notas para tu menú.' }
    ],
    learn: ['Café mexicano', 'Cata', 'Origen', 'Menú'],
    audience: ['Baristas.', 'Dueños de cafetería.', 'Alumnos Etrusca.'],
    includes: INCLUDES_BASE,
    dates: [
      ...sesionQro('28', 'Julio'),
      ...sesionMty('01', 'Agosto'),
      ...sesionGdl('08', 'Agosto'),
      ...sesionQro('25', 'Agosto'),
      ...sesionMty('29', 'Agosto'),
      ...sesionGdl('12', 'Septiembre')
    ],
    seo: {
      title: 'Orgullo mexicano | Sesiones Café Etrusca',
      description: 'Sesión gratuita de cafés mexicanos galardonados, jul-sep 2026.',
      keywords: 'orgullo mexicano,café de México,sesiones sabatinas,Café Etrusca'
    }
  },
  {
    id: null,
    slug: 'bubble-lab',
    kind: 'sesiones',
    kicker: 'Sesión',
    title: 'Bubble Lab',
    summary: 'Laboratorio gratuito de bubble tea: recetas, perlas y montaje de vaso.',
    duration: '1 día',
    hours: '4 horas',
    schedule: '10:00 a.m. - 2:00 p.m.',
    image: '/assets/images/educacion/sesion-bubble-lab.webp',
    banner: '/assets/images/educacion/curso-banner.png',
    highlights: [
      { title: 'Lab de bubble', text: 'Pruebas de receta y texturas.' },
      { title: 'Cupo limitado', text: 'Grupos chicos por sucursal.' },
      { title: 'Sin costo', text: 'Sesión gratuita de calendario Etrusca.' }
    ],
    synopsis: 'Práctica de laboratorio para bubble tea: perlas, bases y servicio.',
    syllabus: [
      { title: 'Calentamiento', text: 'Ingredientes y estaciones.' },
      { title: 'Práctica guiada', text: 'Recetas de lab.' },
      { title: 'Cierre', text: 'Notas de receta.' }
    ],
    learn: ['Bubble tea', 'Perlas', 'Recetas', 'Servicio'],
    audience: ['Baristas.', 'Dueños de cafetería.', 'Alumnos Etrusca.'],
    includes: INCLUDES_BASE,
    dates: [...sesionGdl('01', 'Agosto'), ...sesionQro('04', 'Agosto'), ...sesionMty('08', 'Agosto')],
    seo: {
      title: 'Bubble Lab | Sesiones Café Etrusca',
      description: 'Sesión gratuita Bubble Lab en sucursales Etrusca, agosto 2026.',
      keywords: 'bubble lab,bubble tea,sesiones sabatinas,Café Etrusca'
    }
  },
  {
    id: null,
    slug: 'innovacion-en-jarabes',
    kind: 'sesiones',
    kicker: 'Sesión',
    title: 'Innovación en jarabes',
    summary: 'Sesión gratuita para armar bebidas con jarabes de temporada y técnicas de barra.',
    duration: '1 día',
    hours: '4 horas',
    schedule: '10:00 a.m. - 2:00 p.m.',
    image: '/assets/images/educacion/sesion-innovacion-en-jarabes.webp',
    banner: '/assets/images/educacion/curso-banner.png',
    highlights: [
      { title: 'Jarabes', text: 'Usos, dosificación y menú de temporada.' },
      { title: 'Cupo limitado', text: 'Grupos chicos por sucursal.' },
      { title: 'Sin costo', text: 'Sesión gratuita de calendario Etrusca.' }
    ],
    synopsis: 'Práctica con jarabes: recetas nuevas, balance y servicio.',
    syllabus: [
      { title: 'Calentamiento', text: 'Catálogo y dosificación.' },
      { title: 'Práctica guiada', text: 'Bebidas de menú.' },
      { title: 'Cierre', text: 'Notas para tu carta.' }
    ],
    learn: ['Jarabes', 'Balance', 'Menú', 'Servicio'],
    audience: ['Baristas.', 'Dueños de cafetería.', 'Alumnos Etrusca.'],
    includes: INCLUDES_BASE,
    dates: [
      ...sesionQro('11', 'Agosto'),
      ...sesionQro('15', 'Agosto'),
      ...sesionMty('15', 'Agosto'),
      ...sesionGdl('22', 'Agosto'),
      ...sesionGdl('19', 'Septiembre'),
      ...sesionQro('22', 'Septiembre'),
      ...sesionMty('26', 'Septiembre')
    ],
    seo: {
      title: 'Innovación en jarabes | Sesiones Café Etrusca',
      description: 'Sesión gratuita de jarabes de temporada en sucursales Etrusca, ago-sep 2026.',
      keywords: 'jarabes,sesiones sabatinas,Café Etrusca'
    }
  },
  {
    id: null,
    slug: 'matchamania',
    kind: 'sesiones',
    kicker: 'Sesión',
    title: 'Matchamanía',
    summary: 'Sesión gratuita de matcha: batido, recetas y bebidas de menú.',
    duration: '1 día',
    hours: '4 horas',
    schedule: '10:00 a.m. - 2:00 p.m.',
    image: '/assets/images/educacion/sesion-matchamania.webp',
    banner: '/assets/images/educacion/curso-banner.png',
    highlights: [
      { title: 'Matcha', text: 'Preparación, textura y recetas de barra.' },
      { title: 'Cupo limitado', text: 'Grupos chicos por sucursal.' },
      { title: 'Sin costo', text: 'Sesión gratuita de calendario Etrusca.' }
    ],
    synopsis: 'Práctica de matcha para barra: usucha, lattes y bebidas de temporada.',
    syllabus: [
      { title: 'Calentamiento', text: 'Calidad y batido.' },
      { title: 'Práctica guiada', text: 'Recetas de menú.' },
      { title: 'Cierre', text: 'Notas para tu carta.' }
    ],
    learn: ['Matcha', 'Latte', 'Textura', 'Menú'],
    audience: ['Baristas.', 'Dueños de cafetería.', 'Alumnos Etrusca.'],
    includes: INCLUDES_BASE,
    dates: [
      ...sesionGdl('15', 'Agosto'),
      ...sesionQro('18', 'Agosto'),
      ...sesionMty('22', 'Agosto'),
      ...sesionQro('15', 'Septiembre'),
      ...sesionMty('19', 'Septiembre'),
      ...sesionGdl('26', 'Septiembre')
    ],
    seo: {
      title: 'Matchamanía | Sesiones Café Etrusca',
      description: 'Sesión gratuita de matcha en sucursales Etrusca, ago-sep 2026.',
      keywords: 'matcha,matchamanía,sesiones sabatinas,Café Etrusca'
    }
  }
  ,
  {
    id: null,
    slug: 'elixir-del-terror',
    kind: 'sesiones',
    kicker: 'Sesión',
    title: 'Elixir del terror',
    summary: 'Sesión gratuita de temporada para armar bebidas de terror listas para barra en octubre.',
    duration: '1 día',
    hours: '4 horas',
    schedule: '10:00 a.m. - 2:00 p.m.',
    image: '/assets/images/educacion/sesion-elixir-del-terror.webp',
    banner: '/assets/images/educacion/curso-banner.png',
    highlights: [
      { title: 'Temporada de terror', text: 'Bebidas creativas con vibe Halloween.' },
      { title: 'Cupo limitado', text: 'Grupos chicos por sucursal.' },
      { title: 'Sin costo', text: 'Sesión gratuita de calendario Etrusca.' }
    ],
    synopsis: 'Práctica de menú de terror: recetas, presentación y ritmo de barra para octubre.',
    syllabus: [
      { title: 'Calentamiento', text: 'Objetivo del día y mise en place.' },
      { title: 'Práctica guiada', text: 'Recetas y servicio.' },
      { title: 'Cierre', text: 'Notas para repetir en tu barra.' }
    ],
    learn: ['Bebidas de temporada', 'Presentación', 'Ritmo de barra', 'Servicio'],
    audience: ['Baristas.', 'Dueños de cafetería.', 'Alumnos Etrusca.'],
    includes: INCLUDES_BASE,
    dates: [...sesionGdl('03', 'Octubre'), ...sesionQro('05', 'Octubre'), ...sesionMty('10', 'Octubre')],
    seo: {
      title: 'Elixir del terror | Sesiones Café Etrusca',
      description: 'Sesión gratuita Elixir del terror en sucursales Etrusca, octubre 2026.',
      keywords: 'elixir del terror,sesiones sabatinas,Halloween,Café Etrusca'
    }
  },
  {
    id: null,
    slug: 'pumpkin-vibes',
    kind: 'sesiones',
    kicker: 'Sesión',
    title: 'Pumpkin vibes',
    summary: 'Sesión gratuita de bebidas pumpkin para la temporada de otoño.',
    duration: '1 día',
    hours: '4 horas',
    schedule: '10:00 a.m. - 2:00 p.m.',
    image: '/assets/images/educacion/sesion-pumpkin-vibes.webp',
    banner: '/assets/images/educacion/curso-banner.png',
    highlights: [
      { title: 'Pumpkin season', text: 'Sabores y texturas de calabaza para barra.' },
      { title: 'Cupo limitado', text: 'Grupos chicos por sucursal.' },
      { title: 'Sin costo', text: 'Sesión gratuita de calendario Etrusca.' }
    ],
    synopsis: 'Práctica de menú pumpkin: recetas, balance y servicio para otoño.',
    syllabus: [
      { title: 'Calentamiento', text: 'Ingredientes y flujo.' },
      { title: 'Práctica guiada', text: 'Recetas pumpkin y servicio.' },
      { title: 'Cierre', text: 'Notas para tu menú de temporada.' }
    ],
    learn: ['Sabores pumpkin', 'Menú de otoño', 'Ritmo de barra', 'Servicio'],
    audience: ['Baristas.', 'Dueños de cafetería.', 'Alumnos Etrusca.'],
    includes: INCLUDES_BASE,
    dates: [
      ...sesionMty('03', 'Octubre'),
      ...sesionGdl('10', 'Octubre'),
      ...sesionMty('17', 'Octubre'),
      ...sesionQro('19', 'Octubre'),
      ...sesionGdl('24', 'Octubre')
    ],
    seo: {
      title: 'Pumpkin vibes | Sesiones Café Etrusca',
      description: 'Sesión gratuita Pumpkin vibes en sucursales Etrusca, octubre 2026.',
      keywords: 'pumpkin vibes,sesiones sabatinas,otoño,Café Etrusca'
    }
  },
  {
    id: null,
    slug: 'un-otono-calido',
    kind: 'sesiones',
    kicker: 'Sesión',
    title: 'Un otoño cálido',
    summary: 'Sesión gratuita de bebidas cálidas y reconfortantes de otoño.',
    duration: '1 día',
    hours: '4 horas',
    schedule: '10:00 a.m. - 2:00 p.m.',
    image: '/assets/images/educacion/sesion-un-otono-calido.webp',
    banner: '/assets/images/educacion/curso-banner.png',
    highlights: [
      { title: 'Otoño en taza', text: 'Bebidas calientes y especiadas para la temporada.' },
      { title: 'Cupo limitado', text: 'Grupos chicos por sucursal.' },
      { title: 'Sin costo', text: 'Sesión gratuita de calendario Etrusca.' }
    ],
    synopsis: 'Práctica de menú cálido de otoño: recetas, extracción y servicio.',
    syllabus: [
      { title: 'Calentamiento', text: 'Perfiles y mise en place.' },
      { title: 'Práctica guiada', text: 'Bebidas cálidas y servicio.' },
      { title: 'Cierre', text: 'Notas para repetir en barra.' }
    ],
    learn: ['Bebidas cálidas', 'Especias de temporada', 'Ritmo de barra', 'Servicio'],
    audience: ['Baristas.', 'Dueños de cafetería.', 'Alumnos Etrusca.'],
    includes: INCLUDES_BASE,
    dates: [
      ...sesionGdl('17', 'Octubre'),
      ...sesionMty('24', 'Octubre'),
      ...sesionQro('26', 'Octubre'),
      ...sesionGdl('31', 'Octubre'),
      ...sesionMty('07', 'Noviembre')
    ],
    seo: {
      title: 'Un otoño cálido | Sesiones Café Etrusca',
      description: 'Sesión gratuita Un otoño cálido en sucursales Etrusca, oct-nov 2026.',
      keywords: 'otoño cálido,sesiones sabatinas,bebidas calientes,Café Etrusca'
    }
  },
  {
    id: null,
    slug: 'sorbos-de-chillout-en-otono',
    kind: 'sesiones',
    kicker: 'Sesión',
    title: 'Sorbos de ChillOut en otoño',
    summary: 'Sesión gratuita ChillOut con bebidas frescas adaptadas al otoño.',
    duration: '1 día',
    hours: '4 horas',
    schedule: '10:00 a.m. - 2:00 p.m.',
    image: '/assets/images/educacion/sesion-sorbos-de-chillout-en-otono.webp',
    banner: '/assets/images/educacion/curso-banner.png',
    highlights: [
      { title: 'ChillOut de otoño', text: 'Recetas frías con vibe de temporada.' },
      { title: 'Cupo limitado', text: 'Grupos chicos por sucursal.' },
      { title: 'Sin costo', text: 'Sesión gratuita de calendario Etrusca.' }
    ],
    synopsis: 'Práctica ChillOut: recetas frías, texturas y servicio para otoño.',
    syllabus: [
      { title: 'Calentamiento', text: 'Líneas ChillOut y mise en place.' },
      { title: 'Práctica guiada', text: 'Recetas y ensamble.' },
      { title: 'Cierre', text: 'Notas para tu barra.' }
    ],
    learn: ['ChillOut', 'Bebidas frías', 'Temporada', 'Servicio'],
    audience: ['Baristas.', 'Dueños de cafetería.', 'Alumnos Etrusca.'],
    includes: INCLUDES_BASE,
    dates: [...sesionMty('31', 'Octubre'), ...sesionGdl('07', 'Noviembre'), ...sesionQro('10', 'Noviembre')],
    seo: {
      title: 'Sorbos de ChillOut en otoño | Sesiones Café Etrusca',
      description: 'Sesión gratuita ChillOut de otoño en sucursales Etrusca, oct-nov 2026.',
      keywords: 'chillout,sesiones sabatinas,otoño,Café Etrusca'
    }
  },
  {
    id: null,
    slug: 'cafe-de-temporada',
    kind: 'sesiones',
    kicker: 'Sesión',
    title: 'Café de temporada',
    summary: 'Sesión gratuita para trabajar cafés y bebidas de temporada en barra.',
    duration: '1 día',
    hours: '4 horas',
    schedule: '10:00 a.m. - 2:00 p.m.',
    image: '/assets/images/educacion/sesion-cafe-de-temporada.webp',
    banner: '/assets/images/educacion/curso-banner.png',
    highlights: [
      { title: 'Café de temporada', text: 'Perfiles y recetas para nov-dic.' },
      { title: 'Cupo limitado', text: 'Grupos chicos por sucursal.' },
      { title: 'Sin costo', text: 'Sesión gratuita de calendario Etrusca.' }
    ],
    synopsis: 'Práctica de café de temporada: extracción, recetas y servicio.',
    syllabus: [
      { title: 'Calentamiento', text: 'Perfiles y objetivo del día.' },
      { title: 'Práctica guiada', text: 'Recetas de temporada.' },
      { title: 'Cierre', text: 'Notas para tu menú.' }
    ],
    learn: ['Café de temporada', 'Extracción', 'Recetas', 'Servicio'],
    audience: ['Baristas.', 'Dueños de cafetería.', 'Alumnos Etrusca.'],
    includes: INCLUDES_BASE,
    dates: [
      ...sesionGdl('21', 'Noviembre'),
      ...sesionMty('21', 'Noviembre'),
      ...sesionQro('23', 'Noviembre'),
      ...sesionGdl('12', 'Diciembre'),
      ...sesionQro('15', 'Diciembre'),
      ...sesionMty('19', 'Diciembre')
    ],
    seo: {
      title: 'Café de temporada | Sesiones Café Etrusca',
      description: 'Sesión gratuita Café de temporada en sucursales Etrusca, nov-dic 2026.',
      keywords: 'café de temporada,sesiones sabatinas,Café Etrusca'
    }
  },
  {
    id: null,
    slug: 'tisanas-para-las-posadas',
    kind: 'sesiones',
    kicker: 'Sesión',
    title: 'Tisanas para las posadas',
    summary: 'Sesión gratuita de tisanas e infusiones para la temporada de posadas.',
    duration: '1 día',
    hours: '4 horas',
    schedule: '10:00 a.m. - 2:00 p.m.',
    image: '/assets/images/educacion/sesion-tisanas-para-las-posadas.webp',
    banner: '/assets/images/educacion/curso-banner.png',
    highlights: [
      { title: 'Tisanas de posadas', text: 'Infusiones y servicio para la temporada.' },
      { title: 'Cupo limitado', text: 'Grupos chicos por sucursal.' },
      { title: 'Sin costo', text: 'Sesión gratuita de calendario Etrusca.' }
    ],
    synopsis: 'Práctica de tisanas: tiempos de infusión, recetas y presentación.',
    syllabus: [
      { title: 'Calentamiento', text: 'Bases e infusiones.' },
      { title: 'Práctica guiada', text: 'Recetas de posadas.' },
      { title: 'Cierre', text: 'Notas para barra.' }
    ],
    learn: ['Tisanas', 'Infusiones', 'Temporada', 'Servicio'],
    audience: ['Baristas.', 'Dueños de cafetería.', 'Alumnos Etrusca.'],
    includes: INCLUDES_BASE,
    dates: [...sesionGdl('28', 'Noviembre'), ...sesionQro('30', 'Noviembre'), ...sesionMty('05', 'Diciembre')],
    seo: {
      title: 'Tisanas para las posadas | Sesiones Café Etrusca',
      description: 'Sesión gratuita de tisanas para posadas en sucursales Etrusca, nov-dic 2026.',
      keywords: 'tisanas,posadas,sesiones sabatinas,Café Etrusca'
    }
  },
  {
    id: null,
    slug: 'nochebuena-calida',
    kind: 'sesiones',
    kicker: 'Sesión',
    title: 'Nochebuena cálida',
    summary: 'Sesión gratuita de bebidas cálidas para la temporada de Nochebuena.',
    duration: '1 día',
    hours: '4 horas',
    schedule: '10:00 a.m. - 2:00 p.m.',
    image: '/assets/images/educacion/sesion-nochebuena-calida.webp',
    banner: '/assets/images/educacion/curso-banner.png',
    highlights: [
      { title: 'Nochebuena', text: 'Bebidas cálidas y festivas para diciembre.' },
      { title: 'Cupo limitado', text: 'Grupos chicos por sucursal.' },
      { title: 'Sin costo', text: 'Sesión gratuita de calendario Etrusca.' }
    ],
    synopsis: 'Práctica de menú Nochebuena: recetas cálidas, aroma y servicio.',
    syllabus: [
      { title: 'Calentamiento', text: 'Ingredientes y flujo.' },
      { title: 'Práctica guiada', text: 'Recetas cálidas.' },
      { title: 'Cierre', text: 'Notas para tu menú festivo.' }
    ],
    learn: ['Bebidas cálidas', 'Temporada festiva', 'Ritmo de barra', 'Servicio'],
    audience: ['Baristas.', 'Dueños de cafetería.', 'Alumnos Etrusca.'],
    includes: INCLUDES_BASE,
    dates: [
      ...sesionMty('28', 'Noviembre'),
      ...sesionGdl('05', 'Diciembre'),
      ...sesionQro('07', 'Diciembre'),
      ...sesionMty('12', 'Diciembre'),
      ...sesionGdl('19', 'Diciembre')
    ],
    seo: {
      title: 'Nochebuena cálida | Sesiones Café Etrusca',
      description: 'Sesión gratuita Nochebuena cálida en sucursales Etrusca, nov-dic 2026.',
      keywords: 'nochebuena,sesiones sabatinas,bebidas cálidas,Café Etrusca'
    }
  }

];

export const THIS_MONTH = [
  COURSES[0],
  COURSES[3],
  COURSES[6]
];

export interface PathItem {
  label: string;
  link?: string;
}

export interface FormationPath {
  name: string;
  tone: 'barista' | 'catador' | 'tostador' | 'lover';
  items: PathItem[];
}

export const PATHS: FormationPath[] = [
  {
    name: 'Barista',
    tone: 'barista',
    items: [
      { label: 'Formación básico', link: '/educacion/talleres/formacion-barista' },
      { label: 'Especializado', link: '/educacion/talleres/formacion-barista-especializado' },
      { label: 'Arte latte básico', link: '/educacion/talleres/arte-latte' },
      { label: 'Especializado', link: '/educacion/talleres/arte-latte-especializado' },
      { label: 'Bubble tea básico / especializado', link: '/educacion/talleres/bubble-tea-iced-coffee' },
      { label: 'Bebidas frías', link: '/educacion/talleres/bebidas-frias' },
      { label: 'Experiencias', link: '/educacion/experiencias' },
      { label: 'Brew & Cold Brew', link: '/educacion/talleres/metodos-de-extraccion' }
    ]
  },
  {
    name: 'Catador',
    tone: 'catador',
    items: [
      { label: 'Experiencias', link: '/educacion/experiencias' },
      { label: 'Tostado', link: '/educacion/cursos/tostado-basico' }
    ]
  },
  {
    name: 'Tostador',
    tone: 'tostador',
    items: [
      { label: 'Experiencias', link: '/educacion/experiencias' }
    ]
  },
  {
    name: 'Coffee lover',
    tone: 'lover',
    items: [
      { label: 'Formación básico', link: '/educacion/talleres/formacion-barista' },
      { label: 'Arte latte básico', link: '/educacion/talleres/arte-latte' },
      { label: 'Brew / Cold Brew', link: '/educacion/talleres/metodos-de-extraccion' },
      { label: 'Experiencias', link: '/educacion/experiencias' },
      { label: 'Bubble tea básico / especializado', link: '/educacion/talleres/bubble-tea-iced-coffee' },
      { label: 'Bebidas frías', link: '/educacion/talleres/bebidas-frias' }
    ]
  }
];

export interface ScaCert {
  id: string;
  label: string;
  lines: string[];
  icon: string;
}

export interface Barista {
  name: string;
  place: string;
  role?: string;
  photo: string;
  certs: string[];
}

export const SCA_CERTS: ScaCert[] = [
  { id: 'intro', label: 'Introducción café', lines: ['INTRODUCCIÓN CAFÉ'], icon: '/assets/images/educacion/iconos-certificados/INTRODUCCIO%CC%81N%20CAFE%CC%81.svg' },
  { id: 'barista', label: 'Barista', lines: ['BARISTA FUNDAMENTOS', 'BARISTA INTERMEDIO'], icon: '/assets/images/educacion/iconos-certificados/BARISTAS%20FUNDAMENTOS-INTERMEDIO.svg' },
  { id: 'brew', label: 'Brew', lines: ['BREW FUNDAMENTOS', 'BREW INTERMEDIO'], icon: '/assets/images/educacion/iconos-certificados/BREW%20FUNDAMENTOS-INTERMEDIO.svg' },
  { id: 'tostado', label: 'Tostado', lines: ['TOSTADO FUNDAMENTOS', 'TOSTADO INTERMEDIO'], icon: '/assets/images/educacion/iconos-certificados/TOSTADO%20FUNDAMENTOS-INTERMEDIO.svg' },
  { id: 'tea', label: 'Professional tea', lines: ['PROFESSIONAL TEA'], icon: '/assets/images/educacion/iconos-certificados/PROFESSIONAL%20TEA.svg' },
  { id: 'green', label: 'Green coffee', lines: ['GREEN COFFEE'], icon: '/assets/images/educacion/iconos-certificados/GREEN%20COFFEE.svg' },
  { id: 'sensory', label: 'Sensory skills', lines: ['SENSORY SKILLS'], icon: '/assets/images/educacion/iconos-certificados/SENSORY%20SKILLS.svg' },
  { id: 'qgrader', label: 'Q Grader', lines: ['Q GRADER'], icon: '/assets/images/educacion/iconos-certificados/Q%20GRADER.svg' },
  { id: 'cva', label: 'CVA', lines: ['CVA'], icon: '/assets/images/educacion/iconos-certificados/CVA.svg' }
];

export const LEARN_ITEMS = [
  { icon: '/assets/images/educacion/icon-coffee.png', label: 'Bases técnicas reales' },
  { icon: '/assets/images/educacion/icon-machine.png', label: 'Práctica con equipo profesional' },
  { icon: '/assets/images/educacion/icon-person.png', label: 'Acompañamiento de instructores' },
  { icon: '/assets/images/educacion/icon-docs.png', label: 'Material de apoyo' },
  { icon: '/assets/images/educacion/icon-diploma.png', label: 'Certificado de participación' },
  { icon: '/assets/images/educacion/icon-book.png', label: 'Aplicación inmediata' }
];

export const METHODOLOGY = [
  { n: '1', title: 'Conoce los fundamentos' },
  { n: '2', title: 'Practica con tu guía' },
  { n: '3', title: 'Resuelve dudas en tiempo real' },
  { n: '4', title: 'Aplica lo aprendido' }
];

export const FAQ = [
  { q: '¿Necesito tener conocimientos previos?', a: 'Depende del programa. Los cursos de emprendedores y coffee lover no requieren experiencia previa. Los de tostado, catación o SCA sí recomiendan bases técnicas.' },
  { q: '¿Qué incluye el curso?', a: 'Material de apoyo, prácticas guiadas, uso de equipos profesionales, acompañamiento del instructor y diploma de participación.' },
  { q: '¿Qué sucede si llego tarde?', a: 'Te pedimos puntualidad para no perder el bloque teórico. Si hay un imprevisto, avísanos para reubicarte en el grupo.' },
  { q: '¿Cómo puedo apartar mi lugar?', a: 'Escríbenos con un asesor o reserva desde el calendario. El lugar se confirma con el anticipo indicado.' },
  { q: '¿Debo llevar algo?', a: 'Ropa cómoda y cerrada. El resto del material y equipo lo ponemos nosotros.' },
  { q: '¿Qué pasa si no puedo asistir en la fecha programada?', a: 'Puedes reprogramar con aviso previo según la política de la sucursal, sujeto a cupo de la siguiente fecha.' }
];

export const QUIZ = [
  {
    q: '¿Cuál es tu nivel de experiencia con el café?',
    options: [
      { label: 'Principiante', hint: 'Soy nuevo en el mundo del café y quiero explorar las bases, desde el grano hasta la taza.', path: 'cursos' },
      { label: 'Intermedio', hint: 'Tengo algo de experiencia técnica o en barra y busco profesionalizar mis conocimientos para emprender.', path: 'cursos' },
      { label: 'Avanzado', hint: 'Soy barista con experiencia o tostador y busco perfeccionar mi técnica con certificaciones internacionales.', path: 'talleres' }
    ]
  },
  {
    q: '¿Qué te interesa más ahora?',
    options: [
      { label: 'Abrir o mejorar mi cafetería', hint: 'Negocio, costos y operación.', path: 'cursos' },
      { label: 'Técnica de barra', hint: 'Latte art, extracción y servicio.', path: 'talleres' },
      { label: 'Cata y sentidos', hint: 'Perfiles, té y experiencias.', path: 'experiencias' }
    ]
  },
  {
    q: '¿Cuánto tiempo puedes invertir?',
    options: [
      { label: 'Un sábado', hint: '4 horas o menos.', path: 'sesiones' },
      { label: 'Un día completo', hint: 'Taller o experiencia.', path: 'talleres' },
      { label: 'Un fin de semana', hint: 'Curso de 2 días.', path: 'cursos' }
    ]
  },
  {
    q: '¿Cuál es tu objetivo principal?',
    options: [
      { label: 'Emprender', hint: 'Convertir la pasión en negocio.', path: 'cursos' },
      { label: 'Certificarme', hint: 'SCA y estándares internacionales.', path: 'cursos' },
      { label: 'Disfrutar y conocer', hint: 'Coffee lover y experiencias.', path: 'experiencias' }
    ]
  },
  {
    q: '¿Prefieres aprender cómo?',
    options: [
      { label: 'En grupo y comunidad', hint: 'Sesiones sabatinas.', path: 'sesiones' },
      { label: 'Con práctica intensa', hint: 'Talleres de especialización.', path: 'talleres' },
      { label: 'Con ruta completa', hint: 'Cursos de formación.', path: 'cursos' }
    ]
  }
];

export const AUDIENCE_LISTING = [
  'Emprendedores',
  'Baristas que desean reforzar sus bases',
  'Dueños de cafeterías',
  'Amantes del café',
  'Equipos que deseen capacitarse'
];

export const BARISTAS: Barista[] = [
  { name: 'Ana García', place: 'CEDIS Vallejo, CDMX', photo: '/assets/images/educacion/baristas/ANA%20GARCI%CC%81A.webp', certs: ['barista', 'brew', 'qgrader', 'cva'] },
  { name: 'Araceli García', place: 'CEDIS Vallejo, CDMX', role: 'Barista líder · juez internacional', photo: '/assets/images/educacion/baristas/ARACELI%20GARCIA.webp', certs: ['intro', 'barista', 'brew', 'tostado', 'tea', 'green', 'sensory', 'qgrader', 'cva'] },
  { name: 'Eder Valdez', place: 'Sucursal Monterrey', photo: '/assets/images/educacion/baristas/EDER%20VALDEZ.webp', certs: ['barista'] },
  { name: 'Esmeralda Martínez', place: 'Sucursal Zona Rosa, CDMX', role: 'Barista instructor', photo: '/assets/images/educacion/baristas/VANESSA.webp', certs: ['barista'] },
  { name: 'Fernando Hernández', place: 'CEDIS Vallejo, CDMX', role: 'Instructor SCA', photo: '/assets/images/educacion/baristas/FERNANDO%20HERNA%CC%81NDEZ.webp', certs: ['barista', 'cva'] },
  { name: 'Gabriela Pérez', place: 'Sucursal Tijuana', photo: '/assets/images/educacion/baristas/GABRIELA%20PE%CC%81REZ.webp', certs: ['barista', 'brew'] },
  { name: 'Héctor Hernández', place: 'CEDIS Vallejo, CDMX', role: 'Formación continua', photo: '/assets/images/educacion/baristas/HE%CC%81CTOR%20HERNA%CC%81NDEZ.webp', certs: ['tostado', 'qgrader', 'cva'] },
  { name: 'Hermelinda Flores', place: 'Sucursal León', photo: '/assets/images/educacion/baristas/HERMELINDA%20FLORES.webp', certs: ['barista', 'brew'] },
  { name: 'Humberto Ramiro', place: 'Sucursal Puebla', photo: '/assets/images/educacion/baristas/HUMBERTO%20RAMIRO.webp', certs: ['barista', 'brew'] },
  { name: 'Jorge Gutiérrez', place: 'Sucursal Querétaro', photo: '/assets/images/educacion/baristas/JORGE%20ADRIAN.webp', certs: ['barista', 'brew'] },
  { name: 'Julio Aguilar', place: 'CEDIS Vallejo, CDMX', role: 'Barista instructor', photo: '/assets/images/educacion/baristas/JULIO%20AGUILAR.webp', certs: ['barista', 'brew', 'qgrader', 'cva'] },
  { name: 'Luis Guardado', place: 'Sucursal Guadalajara', photo: '/assets/images/educacion/baristas/LUIS%20ALBERTO.webp', certs: ['barista', 'brew', 'cva'] },
  { name: 'Mariana Quiroz', place: 'Sucursal Viaducto, CDMX', role: 'Barista instructor', photo: '/assets/images/educacion/baristas/MARIANA%20QUIROZ.webp', certs: ['barista', 'brew'] },
  { name: 'Ribian Caamal', place: 'Sucursal Mérida', photo: '/assets/images/educacion/baristas/RIBIAN%20EMMANUEL.webp', certs: ['barista', 'brew'] }
];

export function categoryBySlug(slug: string | null) {
  return EDU_NAV.find(c => c.slug === slug) ?? null;
}


const MONTH_INDEX: Record<string, number> = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11
};

/** Interpreta una fecha de curso (día + mes en español, o start ISO). Fin del día local. */
export function courseDateToDate(date: CourseDate, ref: Date = new Date()): Date | null {
  if (date.start) {
    const parsed = new Date(date.start);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  const monthKey = (date.month || '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .trim();
  const month = MONTH_INDEX[monthKey];
  const day = parseInt(String(date.days ?? '').replace(/[^\d].*/, ''), 10);
  if (month == null || !Number.isFinite(day) || day < 1) return null;
  const year = ref.getFullYear();
    // Año actual: fin del día para que la sesión de hoy siga visible.
  // Cruce dic→ene: si ya pasó y el mes es temprano mientras hoy es fin de año, usa el siguiente.
  let dt = new Date(year, month, day, 23, 59, 59, 999);
  const startOfToday = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate()).getTime();
  if (dt.getTime() < startOfToday && month <= 1 && ref.getMonth() >= 10) {
    dt = new Date(year + 1, month, day, 23, 59, 59, 999);
  }
  return dt;
}

export function isCourseDatePast(date: CourseDate, ref: Date = new Date()): boolean {
  const dt = courseDateToDate(date, ref);
  if (!dt) return false;
  return dt.getTime() < ref.getTime();
}

export function upcomingCourseDates(dates: CourseDate[] | undefined, ref: Date = new Date()): CourseDate[] {
  return (dates || []).filter((d) => !isCourseDatePast(d, ref));
}

/** true si no hay fechas, o si queda al menos una fecha vigente. */
export function hasUpcomingCourseDates(course: Pick<Course, 'dates'>, ref: Date = new Date()): boolean {
  const dates = course.dates || [];
  if (!dates.length) return true;
  return upcomingCourseDates(dates, ref).length > 0;
}
export function coursesByKind(kind: EduKind) {
  return COURSES.filter((c) => c.kind === kind).filter((c) =>
    kind === 'sesiones' || kind === 'experiencias' ? hasUpcomingCourseDates(c) : true
  );
}

export function courseBySlug(slug: string | null) {
  return COURSES.find(c => c.slug === slug) ?? null;
}
