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
}

export interface Course {
  slug: string;
  kind: EduKind;
  kicker: string;
  title: string;
  summary: string;
  duration: string;
  hours: string;
  schedule?: string;
  image: string;
  bullets?: string[];
  ideal?: string;
}

export const EDU_NAV: EduCategory[] = [
  {
    slug: 'cursos',
    label: 'Cursos',
    navLabel: 'Cursos',
    title: 'Nuestros cursos',
    subtitle: 'Formación completa para quienes quieren construir bases sólidas, profesionalizarse y llevar su pasión por el café al siguiente nivel.',
    body: 'Metodología 100% integral (teoría + práctica). Duración típica de 2 días.',
    icon: '/assets/images/educacion/icon-cursos.png',
    tone: 'lime'
  },
  {
    slug: 'experiencias',
    label: 'Experiencias',
    navLabel: 'Experiencias',
    title: 'Experiencias',
    subtitle: 'Encuentros sensoriales para vivir el café y el té con todos los sentidos.',
    body: 'Sesiones cortas, inmersivas y diseñadas para descubrir perfiles, orígenes y rituales.',
    icon: '/assets/images/educacion/icon-experiencias.png',
    tone: 'sand'
  },
  {
    slug: 'talleres',
    label: 'Talleres',
    navLabel: 'Talleres',
    title: 'Talleres de especialización',
    subtitle: 'Práctica intensiva para perfeccionar una técnica puntual.',
    body: 'Arte latte, métodos de extracción y más. Un día, manos a la barra.',
    icon: '/assets/images/educacion/icon-talleres.png',
    tone: 'cream'
  },
  {
    slug: 'sesiones',
    label: 'Sesiones',
    navLabel: 'Sesiones sabatinas',
    title: 'Sesiones sabatinas',
    subtitle: 'Encuentros de fin de semana para seguir aprendiendo en comunidad.',
    body: 'Formato abierto, calendario rotativo y cupo limitado por sucursal.',
    icon: '/assets/images/educacion/icon-sesiones.png',
    tone: 'yellow'
  }
];

export const COURSES: Course[] = [
  {
    slug: 'formacion-de-emprendedores',
    kind: 'cursos',
    kicker: 'Curso',
    title: 'Formación de emprendedores',
    summary: 'Sumérgete en el mundo completo del emprendimiento cafetero, explorando todos los aspectos desde la gestión hasta la barra.',
    duration: '2 días',
    hours: '14 horas',
    schedule: '9:00 a.m. - 5:00 p.m.',
    image: '/assets/images/educacion/cursos-card.png',
    ideal: 'Ideal si quieres abrir, mejorar o estructurar tu cafetería y convertir tu pasión en un negocio rentable.',
    bullets: [
      'Planeación estratégica y propuesta de valor',
      'Gestión operativa y rentabilidad',
      'Temas prácticos de barra y bebidas'
    ]
  },
  {
    slug: 'tostado-basico',
    kind: 'cursos',
    kicker: 'Curso',
    title: 'Tostado básico',
    summary: 'Adquiere un conocimiento completo de las etapas de tueste y desarrolla la habilidad de interpretar con precisión las curvas de tostado.',
    duration: '2 días',
    hours: '15 horas',
    schedule: '9:00 a.m. - 5:00 p.m.',
    image: '/assets/images/educacion/cursos-photo.png',
    ideal: 'Ideal si quieres entender el grano, el proceso de tueste y cómo influyen en el sabor de tu café.'
  },
  {
    slug: 'inmersiona-te',
    kind: 'experiencias',
    kicker: 'Experiencia',
    title: 'Inmersiona-Té',
    summary: 'Una inmersión sensorial al mundo del té: orígenes, rituales y maridajes para tu menú.',
    duration: '1 día',
    hours: '3 horas',
    image: '/assets/images/educacion/curso-photo.png'
  },
  {
    slug: 'arte-latte',
    kind: 'talleres',
    kicker: 'Taller',
    title: 'Arte Latte',
    summary: 'Domina la textura de la leche y los patrones clásicos para elevar la presentación de cada taza.',
    duration: '1 día',
    hours: '6 horas',
    image: '/assets/images/educacion/baristas.png'
  },
  {
    slug: 'sesion-sabatina',
    kind: 'sesiones',
    kicker: 'Sesión',
    title: 'Sesión sabatina',
    summary: 'Práctica guiada de fin de semana para reforzar técnica, cata o barra junto a la comunidad Etrusca.',
    duration: '1 día',
    hours: '4 horas',
    image: '/assets/images/calendario-sesiones-sabatinas.webp'
  }
];

export const THIS_MONTH = [
  COURSES[0],
  COURSES[2],
  COURSES[3]
];

export const PATHS = [
  {
    name: 'Barista',
    items: ['Formación para un barista', 'Métodos de extracción en caliente y frío', 'Arte latte', 'Experiencia sensorial']
  },
  {
    name: 'Catador',
    items: ['Defectos de café verde', 'Experiencia sensorial', 'Catación de café', 'Tostado básico']
  },
  {
    name: 'Tostador',
    items: ['Defectos de café verde', 'Catación de café', 'Tostado básico']
  },
  {
    name: 'Coffee lover',
    items: ['Formación para un barista', 'Arte latte', 'Métodos de extracción', 'Experiencia sensorial', 'Catación de café']
  }
];

export const SCA_CERTS = [
  'Introducción café',
  'Barista',
  'Brew',
  'Tostado',
  'Professional tea',
  'Green coffee',
  'Sensory skills',
  'Q Grader',
  'CVA'
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

export const SYLLABUS = [
  'Introducción al emprendimiento',
  'Planeación estratégica y modelos de negocio',
  'Gestión operativa y rentabilidad',
  'Temas prácticos de barra y bebidas',
  'Catación, protocolos y mantenimiento'
];

export const INCLUDES = [
  'Material de apoyo',
  'Prácticas guiadas',
  'Diploma de participación',
  'Uso de equipos profesionales',
  'Acompañamiento del instructor'
];

export const AUDIENCE = [
  'Personas que desean abrir una cafetería.',
  'Emprendedores que buscan escalar su negocio.',
  'Dueños de cafetería que desean profesionalizar su operación.',
  'Baristas que desean reforzar sus bases.',
  'Equipos que deseen capacitarse.'
];

export const DATES = [
  { days: '18-19', month: 'Junio', branch: 'Viaducto', duration: '2 días', hours: '14 hrs' },
  { days: '18-19', month: 'Junio', branch: 'Zona Rosa', duration: '2 días', hours: '14 hrs' },
  { days: '25-26', month: 'Julio', branch: 'Vallejo', duration: '2 días', hours: '14 hrs' }
];

export const BARISTAS = [
  { name: 'Araceli García', place: 'CEDIS Vallejo, CDMX', role: 'Barista líder · juez internacional' },
  { name: 'Fernando Hernández', place: 'CEDIS Vallejo, CDMX', role: 'Instructor SCA' },
  { name: 'Héctor Hernández', place: 'CEDIS Vallejo, CDMX', role: 'Formación continua' },
  { name: 'Julio Aguilar', place: 'CEDIS Vallejo, CDMX', role: 'Barista instructor' },
  { name: 'Esmeralda Martínez', place: 'Zona Rosa, CDMX', role: 'Barista instructor' },
  { name: 'Mariana Quiroz', place: 'Viaducto, CDMX', role: 'Barista instructor' }
];

export function categoryBySlug(slug: string | null) {
  return EDU_NAV.find(c => c.slug === slug) ?? null;
}

export function coursesByKind(kind: EduKind) {
  return COURSES.filter(c => c.kind === kind);
}

export function courseBySlug(slug: string | null) {
  return COURSES.find(c => c.slug === slug) ?? null;
}
