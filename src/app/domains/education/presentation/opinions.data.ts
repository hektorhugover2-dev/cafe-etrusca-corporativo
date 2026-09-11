export interface ReviewCard {
  id: string;
  initials: string;
  name: string;
  rating: number;
  text: string;
}

export const OPINIONS: ReviewCard[] = [
  {
    id: 'javier-s',
    initials: 'JS',
    name: 'Javier S.',
    rating: 5,
    text: 'Excelente formación en Café Etrusca. El Curso de 2 días vale totalmente la pena; los instructores tienen una paciencia increíble para explicar la teoría y luego aplicarla en la práctica.'
  },
  {
    id: 'laura-m',
    initials: 'LM',
    name: 'Laura M.',
    rating: 3,
    text: 'Todo super. Los filtrados del Brew Bar se entendieron muy claro.'
  },
  {
    id: 'maria-j',
    initials: 'MJ',
    name: 'María J.',
    rating: 5,
    text: 'Salí con más seguridad en la barra. El ritmo del taller y el acompañamiento del barista hicieron que la práctica se sintiera real, no de salón.'
  },
  {
    id: 'carlos-r',
    initials: 'CR',
    name: 'Carlos R.',
    rating: 4,
    text: 'Muy completo para quien va a abrir cafetería. Se va de la receta a la operación del día a día, y eso es justo lo que necesitaba.'
  },
  {
    id: 'ana-p',
    initials: 'AP',
    name: 'Ana P.',
    rating: 5,
    text: 'El arte latte me tenía trabada y en un día ya veía el corazón en la taza. Recomendadísimo si quieres pulir técnica.'
  },
  {
    id: 'diego-l',
    initials: 'DL',
    name: 'Diego L.',
    rating: 4,
    text: 'Buena mezcla de teoría y práctica. Las herramientas para medir la extracción me quitaron varias dudas que traía de la barra.'
  },
  {
    id: 'sofia-g',
    initials: 'SG',
    name: 'Sofía G.',
    rating: 5,
    text: 'La experiencia de catación fue un antes y un después. Ahora sí distingo origen, tueste y defectos con criterio, no a ciegas.'
  },
  {
    id: 'luis-h',
    initials: 'LH',
    name: 'Luis H.',
    rating: 4,
    text: 'Tostado básico está muy bien armado. Las curvas se explican sin rodeos y sales con una idea clara de cómo repetir el perfil en planta.'
  },
  {
    id: 'paola-v',
    initials: 'PV',
    name: 'Paola V.',
    rating: 5,
    text: 'Nos encantó Inmersiona-Té. El grupo, el material y el cierre sensorial se sienten de escuela, no de plática comercial.'
  }
];
