/**
 * "Elige tu camino" (education hub): 5-step wizard. Each option adds one point to a profile;
 * highest count wins, ties go to the profile of the answer to question 1.
 * Recommended courses are real catalog slugs (education.data.ts COURSES).
 */
export type PathProfile = 'emprendedor' | 'barista' | 'calidad' | 'tostado' | 'aficionado';

export interface PathQuizOption {
  key: string;
  text: string;
  profile: PathProfile;
  /** Short-format answer (3 h): result and suggestions switch to experiencias only. */
  experiencia?: boolean;
}

export interface PathQuizQuestion {
  q: string;
  options: PathQuizOption[];
}

export interface PathQuizResult {
  label: string;
  heading: string;
  text: string;
  /** Main recommended course (slug in COURSES). */
  course: string;
  /** Optional secondary course (slug in COURSES). */
  secondary?: string;
}

export const PATH_QUIZ: PathQuizQuestion[] = [
  {
    q: '¿Cuál es tu meta principal en el mundo del café?',
    options: [
      { key: 'A', text: 'Montar mi propia barra o proyecto comercial', profile: 'emprendedor' },
      { key: 'B', text: 'Trabajar o profesionalizarme detrás de una barra de café.', profile: 'barista' },
      { key: 'C', text: 'Convertirme en un experto evaluando sabores, aromas y calidad del grano.', profile: 'calidad' },
      { key: 'D', text: 'Aprender a transformar el grano verde y dominar la técnica de tueste.', profile: 'tostado' },
      { key: 'E', text: 'Mejorar mis extracciones en casa y disfrutar el café como aficionado.', profile: 'aficionado' }
    ]
  },
  {
    q: '¿Qué actividad práctica te genera más curiosidad?',
    options: [
      { key: 'A', text: 'Estudiar el modelo de negocio, costos y gestión de una barra de café.', profile: 'emprendedor' },
      { key: 'B', text: 'Dominar Arte latte y los Métodos de brew bar o cold brew.', profile: 'barista' },
      { key: 'C', text: 'Realizar sesiones de Catación de café y detectar Defectos de café verde.', profile: 'calidad' },
      { key: 'D', text: 'Operar maquinaria de tueste y controlar la experiencia sensorial.', profile: 'tostado' }
    ]
  },
  {
    q: '¿Cuál es tu nivel de experiencia actual?',
    options: [
      { key: 'A', text: 'Principiante con ganas de emprender un negocio rentable.', profile: 'emprendedor' },
      { key: 'B', text: 'Básico: ya preparo café pero busco perfeccionar técnica en barra.', profile: 'barista' },
      { key: 'C', text: 'Intermedio: me interesa el análisis bastante técnico en relación con el café.', profile: 'calidad' },
      { key: 'D', text: 'Entusiasta sin experiencia previa que busca un pasatiempo práctico.', profile: 'aficionado' }
    ]
  },
  {
    q: '¿Qué habilidad te gustaría presumir al terminar tu capacitación?',
    options: [
      { key: 'A', text: 'Tener un plan de negocios sólido listo para abrir puertas.', profile: 'emprendedor' },
      { key: 'B', text: 'Diseñar bebidas espectaculares con leche y extracciones perfectas.', profile: 'barista' },
      { key: 'C', text: 'Distinguir el origen, calidad y perfil en cata de cualquier café.', profile: 'calidad' },
      { key: 'D', text: 'Tostar tu propio café y ajustar los perfiles de sabor a tu gusto.', profile: 'tostado' }
    ]
  },
  {
    q: '¿Cuánto tiempo buscas dedicarle a tu aprendizaje?',
    options: [
      { key: 'A', text: 'Una formación integral enfocada en la creación de empresas. (14 hrs)', profile: 'emprendedor' },
      { key: 'B', text: 'Un taller técnico y práctico enfocado en el servicio y la preparación. (6 hrs)', profile: 'barista' },
      { key: 'C', text: 'Un taller especializado en control de calidad y análisis sensorial. (6 hrs)', profile: 'calidad' },
      { key: 'D', text: 'Un taller amigable, dinámico y enfocado en el disfrute personal. (3 hrs)', profile: 'aficionado', experiencia: true }
    ]
  }
];

export const PATH_QUIZ_RESULTS: Record<PathProfile, PathQuizResult> = {
  emprendedor: {
    label: 'Emprendedor',
    heading: 'Tu camino: emprender tu propio proyecto de café',
    text: 'Tus respuestas apuntan a crear y gestionar un negocio. Te recomendamos empezar por la Formación de emprendedores.',
    course: 'formacion-de-emprendedores'
  },
  barista: {
    label: 'Barista',
    heading: 'Tu camino: profesionalizarte detrás de la barra',
    text: 'Tus respuestas apuntan a la técnica de barra y la preparación de bebidas. Te recomendamos la Formación para un barista y, como complemento, Arte Latte.',
    course: 'formacion-barista',
    secondary: 'arte-latte'
  },
  calidad: {
    label: 'Calidad y catación',
    heading: 'Tu camino: calidad y análisis sensorial',
    text: 'Tus respuestas apuntan a evaluar sabores, aromas y calidad del café. Te recomendamos la experiencia de Catación de café y, como complemento, la Experiencia sensorial.',
    course: 'catacion-de-cafe',
    secondary: 'experiencia-sensorial'
  },
  tostado: {
    label: 'Tostado',
    heading: 'Tu camino: el tueste del café',
    text: 'Tus respuestas apuntan a transformar el grano verde y trabajar perfiles de tueste. Te recomendamos el curso de Tostado básico.',
    course: 'tostado-basico'
  },
  aficionado: {
    label: 'Aficionado',
    heading: 'Tu camino: disfrutar el café en casa',
    text: 'Tus respuestas apuntan a preparar y disfrutar mejor tu café. Te recomendamos el taller de Métodos de extracción.',
    course: 'metodos-de-extraccion'
  }
};

/**
 * Results when question 5 is answered with the 3-hour option: only experiencias
 * (kind 'experiencias' in education.data.ts), preferring the 3-hour ones.
 */
export const PATH_QUIZ_RESULTS_EXPERIENCIA: Record<PathProfile, PathQuizResult> = {
  emprendedor: {
    label: 'Emprendedor',
    heading: 'Tu camino: ideas para tu menú en formato corto',
    text: 'Tus respuestas apuntan al negocio, pero buscas algo breve. Te recomendamos la experiencia El oasis del sabor con bebidas frías, enfocada en bebidas y tendencias de menú.',
    course: 'oasis-bebidas-frias',
    secondary: 'formacion-de-emprendedores'
  },
  barista: {
    label: 'Barista',
    heading: 'Tu camino: la barra en formato corto',
    text: 'Tus respuestas apuntan a la preparación de bebidas en un formato breve. Te recomendamos la experiencia El arte y la creatividad de preparar mixología.',
    course: 'arte-creatividad-mixologia',
    secondary: 'formacion-barista'
  },
  calidad: {
    label: 'Calidad y catación',
    heading: 'Tu camino: calidad y análisis sensorial',
    text: 'Tus respuestas apuntan a evaluar sabores, aromas y calidad del café. Te recomendamos la experiencia de Catación de café.',
    course: 'catacion-de-cafe',
    secondary: 'tostado-basico'
  },
  tostado: {
    label: 'Tostado',
    heading: 'Tu camino: el grano y sus perfiles en formato corto',
    text: 'Tus respuestas apuntan al grano y sus perfiles de sabor en un formato breve. Te recomendamos la experiencia ¡Aprende a crear tu propia mezcla de café!',
    course: 'crear-mezcla-de-cafe',
    secondary: 'tostado-basico'
  },
  aficionado: {
    label: 'Aficionado',
    heading: 'Tu camino: disfrutar el café',
    text: 'Tus respuestas apuntan a disfrutar el café en un formato breve y dinámico. Te recomendamos la experiencia Coffee lover en invierno.',
    course: 'coffee-lover-en-invierno',
    secondary: 'metodos-de-extraccion'
  }
};
