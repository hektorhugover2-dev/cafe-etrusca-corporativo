/**
 * Artículos de blog/guías (tandas 1 a 4 de los briefs SEO del 20 oct 2026).
 * Convención: https://cafeetrusca.com/blog/<slug>/ · sin índice /blog/ · fuera de menú, home y footer.
 * Todo lo marcado como "por confirmar con Héctor" se muestra como placeholder visible: no inventar datos.
 */

export type BlogBlock =
  | { t: 'p'; html: string }
  | { t: 'h3'; text: string }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'table'; caption?: string; head: string[]; rows: string[][] }
  /** Placeholder visible: dato pendiente de Héctor. */
  | { t: 'todo'; html: string }
  /** Imagen dentro del artículo (path relativo a assets: images/...). */
  | { t: 'img'; src: string; alt: string; width: number; height: number; caption?: string }
  /** Texto rescatado VERBATIM del blog anterior (párrafos/listas en HTML). */
  | { t: 'rescued'; from: string; html: string[] }
  /** Llamada a la acción con botón (componente reutilizable app-blog-link-cta). */
  | { t: 'linkCta'; text: string; label: string; path: string }
  /** Bloque destacado con varios botones (internos o externos en pestaña nueva) y nota opcional en HTML. */
  | { t: 'ctaGroup'; text: string; buttons: Array<{ label: string; href: string; external?: boolean }>; note?: string; highlight?: boolean };

export interface BlogSection {
  h2: string;
  id?: string;
  blocks: BlogBlock[];
}

export interface BlogFaq {
  q: string;
  /** Texto plano: se usa igual en la página y en el FAQPage. */
  a: string;
  /** true = respuesta pendiente: se muestra con placeholder y NO entra al FAQPage. */
  pending?: boolean;
}

export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  h1: string;
  kicker: string;
  intro: string;
  hero: { src: string; alt: string; width: number; height: number; provisional?: string };
  sections: BlogSection[];
  faq: BlogFaq[];
  /** ItemList opcional (solo URLs del sitio verificadas). */
  itemList?: { name: string; items: Array<{ name: string; path?: string }> };
  /** HowTo opcional: solo pasos reales sin cantidades inventadas. */
  howTo?: { name: string; steps: Array<{ name: string; text?: string; id?: string }> };
  cta: { text: string; links: Array<{ label: string; path: string }>; todo?: string };
  /** Avisos generales visibles al inicio (pendientes de Héctor). */
  notes?: string[];
  /** Invitación general a /recetas/ antes de las FAQ (guías de recetas o bebidas preparadas). */
  recipesCta?: { text: string; label: string; path?: string; cards?: Array<{ name: string; path: string; img: string }> };
  /** Invitación al webinar en vivo de los jueves (YouTube); `podcast` añade Travesías del Sabor como enlace secundario. */
  webinarCta?: { text: string; podcast?: boolean };
}

/** Fecha placeholder del lanzamiento (por confirmar con Héctor): se ajusta en el build de publicación. */
export const BLOG_DATE_PUBLISHED = '2026-10-30T09:00:00-06:00';

const TODO = (txt: string) => `<strong>Por confirmar con Héctor:</strong> ${txt}`;
/** Texto del blog anterior que no se pudo recuperar (vive solo en la BD del sitio .NET). */
const MISSING = (post: string, what: string) =>
  `<strong>Texto pendiente del blog anterior:</strong> ${what} del post “${post}” no se pudo recuperar (está solo en la base de datos del sitio anterior). Se copia verbatim cuando Héctor lo comparta; no se reescribe.`;

const A = (path: string, label: string) => `<a href="${path}">${label}</a>`;
const IMG = (p: string) => `images/${p}`;

/** Calculadora de precios (/calculadora-de-precios/, página prerenderizada del sitio). */
const CALC = '/calculadora-de-precios/';
const CALC_A = (label: string) => A(CALC, label);

/** Webinar en vivo de los jueves y podcast Travesías del Sabor (canal de YouTube de Café Etrusca). */
export const WEBINAR_URL = 'https://www.youtube.com/@Caf%C3%A9Etrusca/streams';
export const PODCAST_URL = 'https://www.youtube.com/@Caf%C3%A9Etrusca/podcasts';

/* ============================== TANDA 1 ============================== */

const PROCESO: BlogArticle = {
  slug: 'proceso-del-cafe-de-la-planta-a-la-taza',
  title: 'Proceso del café: de la planta a la taza | Café Etrusca',
  description:
    'Conoce el proceso del café paso a paso: cultivo, cosecha, beneficio, secado, tostado, molienda y extracción. Qué cambia en la taza y cómo elegir café.',
  h1: 'Proceso del café: de la planta a la taza',
  kicker: 'Guía de café',
  intro:
    'El café pasa por siete etapas antes de llegar a la taza: cultivo, cosecha, beneficio (lavado, natural o honey), secado, trillado, tostado y, al final, molienda y extracción. Cada etapa cambia el sabor. Aquí te explicamos cada una y qué revisar al elegir café para tu barra.',
  hero: {
    src: IMG('blog/proceso-del-cafe-de-la-planta-a-la-taza/de-la-tierra-a-la-mesa.webp'),
    alt: 'Cerezas de café rojas y verdes en la rama del cafeto',
    width: 1600, height: 900
  },
  sections: [
    { h2: 'Por qué conocer el proceso del café', blocks: [
      { t: 'rescued', from: 'De la tierra a la mesa: conoce el proceso de producción del buen café (22 abr 2024)', html: [
        'Porque, como en todo negocio, siempre hay que saber con exactitud qué es lo que ofrecemos. No forzosamente hay que convertirse en un experto cafetalero, pero sí debes adquirir cierto bagaje en el tema. ¿Cómo saber que un proveedor nos da la misma calidad que nos prometió?, ¿de qué manera voy a armar mi menú? o simplemente, ¿qué es lo que le voy a ofrecer a mis clientes? Te dejamos un poco de contexto:'
      ] }
    ] },
    { h2: 'Las etapas del café en resumen', blocks: [
      { t: 'table', caption: 'Etapas del proceso del café', head: ['Etapa', 'Qué pasa', 'En qué afecta la taza'], rows: [
        ['Cultivo', 'La planta crece y da fruto (la cereza de café).', 'Variedad, suelo y altura marcan el potencial de sabor.'],
        ['Cosecha', 'Se recolectan las cerezas.', 'Las cerezas maduras dan más dulzor; las verdes, sabores astringentes.'],
        ['Beneficio', 'Se separa el grano del fruto: lavado, natural u honey.', 'Define buena parte del perfil: limpieza, cuerpo o dulzor.'],
        ['Secado y trillado', 'El grano se seca y se le quita la cascarilla: queda el café verde.', 'Un secado parejo conserva el sabor y la vida del grano.'],
        ['Tostado', 'El calor desarrolla aroma y sabor.', 'Tueste claro, medio u oscuro cambia acidez, dulzor y amargor.'],
        ['Molienda y extracción', 'Se muele y se prepara en espresso o método de filtrado.', 'La molienda y la receta definen si la taza sale equilibrada.']
      ] }
    ] },
    { h2: 'Cultivo', blocks: [
      { t: 'p', html: 'Las dos especies más conocidas son arábica y robusta. La arábica suele dar tazas más aromáticas y con más acidez; la robusta, más cuerpo y amargor. La altura, el clima y el suelo influyen en cómo madura el fruto y, por lo tanto, en el sabor.' },
      { t: 'p', html: 'México cultiva café en varias regiones del sur y del centro del país.' },
      { t: 'h3', text: 'Plantación' },
      { t: 'rescued', from: 'De la tierra a la mesa (22 abr 2024)', html: [
        'Durante este proceso se hace un análisis de las semillas de café, se seleccionan solo las que tienen mejores características y se eliminan de aquellas que son débiles, deformes, amarillas, quebradas o torcidas.',
        'Seguido de la selección, las semillas son plantadas en pequeñas bolsas de plástico negro especiales para cultivo. Con la finalidad de que germinen adecuadamente, se deben colocar en un punto medio dentro de la bolsa; es decir, que no sea superficial ni profundo.',
        'Las pequeñas plantas de café se cuidan en un invernadero para protegerlas de plagas, pestes y las inclemencias del clima. Cuando tienen la edad y el tamaño suficientes, son trasplantadas a los campos de cultivo.'
      ] },
      { t: 'h3', text: 'Floración del cafeto' },
      { t: 'rescued', from: 'De la tierra a la mesa (22 abr 2024)', html: [
        'En el periodo donde inicia esta fase influyen diferentes factores como: la duración del día, la época de siembra, la temperatura y la disponibilidad de agua. Se considera como primera floración el momento en que, por lo menos, el 50% de las plantas hayan florecido.'
      ] },
      { t: 'todo', html: MISSING('De la tierra a la mesa', 'El resto de la sección “Floración del cafeto” y las etapas siguientes') },
      { t: 'todo', html: TODO('qué orígenes y fincas reales vende Café Etrusca, para mencionar solo esos.') }
    ] },
    { h2: 'Cosecha', blocks: [
      { t: 'p', html: 'La cosecha puede ser selectiva (se cortan solo las cerezas maduras, en varias pasadas) o por barrido (se cosecha todo de una vez). La selectiva cuesta más trabajo, pero da un lote más parejo: las cerezas maduras aportan dulzor y las verdes dan sabores ásperos.' }
    ] },
    { h2: 'Beneficio', blocks: [
      { t: 'p', html: 'El beneficio es el proceso que separa el grano del fruto. Hay tres formas principales:' },
      { t: 'h3', text: 'Lavado' },
      { t: 'p', html: 'Se retira la pulpa y el mucílago con agua antes de secar. Suele dar una taza más limpia y con acidez más clara.' },
      { t: 'h3', text: 'Natural' },
      { t: 'p', html: 'La cereza se seca entera, con el fruto. Suele dar más cuerpo y notas frutales.' },
      { t: 'h3', text: 'Honey' },
      { t: 'p', html: 'Se retira la pulpa pero se deja parte del mucílago al secar. Suele quedar entre los dos: más dulzor que el lavado y más limpieza que el natural.' }
    ] },
    { h2: 'Secado y trillado', blocks: [
      { t: 'p', html: `Después del beneficio el grano se seca hasta que se puede guardar. En el trillado se le quita la cascarilla (pergamino) y queda el café verde: el grano crudo que se conserva más tiempo y que compran los tostadores. Conoce nuestro ${A('/productos/cafe/verde/', 'café en verde')}.` }
    ] },
    { h2: 'Tostado', blocks: [
      { t: 'p', html: 'El tostado transforma el grano verde: desarrolla aroma, dulzor y color. Un tueste claro conserva más acidez y notas del origen; uno medio equilibra dulzor y cuerpo; uno oscuro acentúa el amargor y los sabores tostados.' },
      { t: 'p', html: `Si quieres aprender a tostar, revisa el ${A('/taller-basico-de-tostado-de-cafe/', 'Taller básico de tostado de café')} y los ${A('/maquinaria-y-equipo-para-cafeterias/tostadores/', 'tostadores')} que vendemos.` }
    ] },
    { h2: 'Molienda y extracción', blocks: [
      { t: 'p', html: 'La molienda define qué tan rápido se extrae el café. Para espresso se usa una molienda fina; para métodos de filtrado, una más gruesa. Si la molienda es demasiado fina, el café se sobreextrae y sale amargo; si es demasiado gruesa, se subextrae y sale ácido o aguado.' },
      { t: 'p', html: `Revisa los ${A('/maquinaria-y-equipo-para-cafeterias/molinos/', 'molinos para cafetería')}, los ${A('/accesorios-para-poner-una-cafeteria/metodo-extraccion/', 'accesorios para métodos de extracción')} y el ${A('/taller-de-brew-bar/', 'taller de brew bar')}.` }
    ] },
    { h2: 'Cómo elegir café para tu cafetería', blocks: [
      { t: 'p', html: `Piensa en tu menú y en tu cliente: qué bebidas vendes más, si trabajas con leche y qué perfil buscas en la taza. Compara nuestro ${A('/productos/cafe/especialidad/', 'café de especialidad')} y nuestro ${A('/productos/cafe/premium/', 'café premium')}: en cada página explicamos para qué barra conviene.` }
    ] }
  ],
  webinarCta: { text: 'Aprende más sobre café con nuestros expertos en el webinar en vivo de los jueves.', podcast: true },
  faq: [
    { q: '¿Cuáles son las etapas del proceso del café?', a: 'Cultivo, cosecha, beneficio, secado, trillado, tostado, molienda y extracción. Las primeras pasan en la finca y las últimas en el tostador y en tu barra.' },
    { q: '¿Qué es el beneficio del café?', a: 'Es el proceso que separa el grano del fruto. Puede ser lavado, natural u honey, y cada uno da un perfil de sabor distinto.' },
    { q: '¿Qué diferencia hay entre café verde y café tostado?', a: 'El verde es el grano seco sin tostar y se conserva más tiempo. El tostado ya desarrolló aroma y sabor y está listo para moler.' },
    { q: '¿Qué tueste conviene para espresso?', a: 'Depende del perfil que busques. Los tuestes medios y medio-oscuros son comunes en espresso de cafetería. La recomendación propia de Café Etrusca está por confirmar.', pending: true },
    { q: '¿Cómo influye la molienda en la taza?', a: 'La molienda define qué tan rápido se extrae el café. Si es muy fina, sobreextrae (sale amargo); si es muy gruesa, subextrae (sale ácido o aguado).' },
    { q: '¿Dónde aprendo a tostar café?', a: 'En el Taller básico de tostado de café de Café Etrusca. Fechas y sedes en la página del taller.' }
  ],
  cta: { text: 'Conoce el café de Café Etrusca y aprende a prepararlo en barra.', links: [
    { label: 'Ver café', path: '/productos/cafe/' },
    { label: 'Curso de formación barista', path: '/educacion/talleres/formacion-barista/' }
  ] }
};

const ERRORES: BlogArticle = {
  slug: 'errores-al-abrir-una-cafeteria',
  title: 'Errores al abrir una cafetería y cómo evitarlos | Etrusca',
  description:
    'Los errores más comunes al abrir y operar una cafetería: ubicación, modelo de barra, menú, costos, equipo y capacitación, y cómo evitar cada uno.',
  h1: 'Errores comunes al abrir y operar una cafetería',
  kicker: 'Emprender',
  intro:
    'Los errores que más cuestan al abrir una cafetería son elegir mal el modelo de negocio y la ubicación, armar un menú demasiado grande, no costear cada bebida, comprar equipo que no corresponde al volumen y no capacitar a la barra. Abajo explicamos cada uno y qué hacer en su lugar.',
  hero: {
    src: IMG('maquinas/espresso-reneka.webp'),
    alt: 'Máquina de espresso Reneka de dos grupos para cafetería',
    width: 900, height: 704,
    provisional: 'Imagen provisional del sitio. El brief pide una foto de barra vacía con máquina y molino antes de abrir (1200×630).'
  },
  sections: [
    { h2: 'Antes de abrir', blocks: [
      { t: 'h3', text: 'No definir el modelo de negocio' },
      { t: 'p', html: 'Una barra de especialidad, una cafetería comercial o una barra pequeña piden ubicación, menú, equipo e inversión distintos. Si no lo defines desde el inicio, todo lo demás se compra “a ojo”. La barra de especialidad vende calidad y método; la comercial, volumen y variedad.' },
      { t: 'img', src: IMG('blog/errores-al-abrir-una-cafeteria/barra-de-especialidad.webp'), alt: 'Barista preparando café filtrado con dripper y báscula en una barra de especialidad', width: 1600, height: 1067 },
      { t: 'rescued', from: 'Barra de especialidad, el modelo más redituable (22 abr 2024)', html: [
        'La barra de especialidad es una tendencia innovadora en cafetería por los métodos que se emplean y, sobre todo, por su rentabilidad. En este lugar, el café especial es el único protagonista pues para que el grano sea considerado de esta manera, debe tener un cuidado integral.',
        'El ingeniero Arturo Hernández, en un artículo para El Mundo del Café, La Revista, define a las barras de especialidad como <a href="https://apreciocafe.com/wp-content/uploads/2017/08/Barra-de-Especialidad.pdf" rel="noopener" target="_blank">“el lugar donde el café y las bebidas preparadas con él, son su particularidad y su razón de ser.”</a> (p.2)',
        'Además, mencionó las cualidades que caracterizan a este modelo:',
        '<ul><li>Cuentan con una gama mínima de cinco tipos de café de diferentes zonas productoras, control de calidad, cuidado en la selección de granos, frescura del producto y combinación de tuestes para ofrecer a sus clientes la posibilidad de hacer mezclas y experimentar diferentes sabores.</li><li>Poseen un personal conocedor y especializado para dar información a los clientes sobre los diferentes tipos de granos, su origen, el cuidado del cultivo, el grado de tueste, la molienda y el método de extracción.</li><li>Cuidan la preparación de bebidas para conseguir la taza perfecta, que consta de un buen balance en cuerpo, acidez y aroma.</li><li>Tienen especialistas en técnicas de preparación y cuentan con una amplia variedad de métodos de extracción para brindar una experiencia completa y ofrecer un menú interesante.</li></ul>'
      ] },
      { t: 'todo', html: MISSING('Barra de especialidad, el modelo más redituable', 'La lista de métodos de extracción y el resto del texto') },
      { t: 'h3', text: 'Elegir la ubicación sin datos' },
      { t: 'p', html: 'Antes de firmar, observa el flujo de gente a distintas horas, quién pasa (oficinas, estudiantes, vecinos) y qué competencia hay cerca. La ubicación tiene que encajar con el modelo que elegiste.' },
      { t: 'h3', text: 'Invertir sin un plan' },
      { t: 'p', html: `Haz una lista de lo que necesitas para abrir y cotízala completa antes de comprar. Te lo explicamos paso a paso en ${A('/blog/como-abrir-una-cafeteria-en-mexico/', 'cómo abrir una cafetería en México')}.` }
    ] },
    { h2: 'Al armar la barra', blocks: [
      { t: 'h3', text: 'Comprar equipo que no corresponde al volumen' },
      { t: 'p', html: `Una máquina o un molino demasiado chicos frenan el servicio en hora pico; unos sobrados inmovilizan dinero. Elige según las bebidas que esperas vender. Revisa las ${A('/maquinaria-y-equipo-para-cafeterias/espresso/', 'máquinas de espresso')} y los ${A('/maquinaria-y-equipo-para-cafeterias/molinos/', 'molinos')}, y nuestra guía para ${A('/blog/como-elegir-maquina-de-espresso-para-cafeteria/', 'elegir máquina de espresso')}.` },
      { t: 'h3', text: 'Un menú demasiado grande o sin bebidas frías y de temporada' },
      { t: 'p', html: `Un menú enorme complica el inventario y la consistencia. Empieza con pocas bebidas bien hechas y suma bebidas frías y de temporada con ${A('/insumos-para-cafeterias/', 'insumos para cafetería')} e ideas de nuestras ${A('/recetas/', 'recetas')}. Si buscas qué incluir, lee ${A('/blog/que-vender-en-una-cafeteria/', 'qué vender en una cafetería')}. Para elegir a quién comprarle, revisa ${A('/blog/proveedores-de-insumos-para-cafeteria/', 'cómo elegir proveedor de insumos para cafetería')}.` },
      { t: 'h3', text: 'No costear las bebidas' },
      { t: 'p', html: `Si no sabes cuánto te cuesta cada taza, no sabes si ganas. Calcula el costo de insumos de cada bebida antes de poner precios: lo explicamos en ${A('/blog/cuanto-cobrar-por-un-cafe/', 'cuánto cobrar por un café')}, o ${CALC_A('calcula el costo y el precio de tus bebidas con nuestra calculadora')}.` }
    ] },
    { h2: 'Al operar', blocks: [
      { t: 'h3', text: 'No capacitar al personal' },
      { t: 'p', html: `La capacitación hace que la bebida salga igual con cualquier barista y baja la merma. Revisa la ${A('/educacion/talleres/formacion-barista/', 'formación para baristas')} y la ${A('/experiencia-servicio-al-cliente-en-barras-de-cafe/', 'experiencia de servicio al cliente en barras de café')}.` },
      { t: 'h3', text: 'Descuidar la limpieza y el mantenimiento del equipo' },
      { t: 'p', html: `Los residuos de café y leche afectan el sabor y la vida del equipo. Ten una rutina diaria y semanal con ${A('/accesorios-para-poner-una-cafeteria/limpieza/', 'productos de limpieza')}; la explicamos en ${A('/blog/como-limpiar-maquina-de-espresso-y-molino/', 'cómo limpiar tu máquina de espresso y molino')}.` },
      { t: 'h3', text: 'No tener claro el concepto, la calidad ni el servicio' },
      { t: 'rescued', from: 'Los 5 errores más comunes que podrías cometer en tu cafetería', html: [
        '<strong>Concepto:</strong> Esto es un factor fundamental para tu negocio, si no tienes bien definido el mercado al que te quieres dirigir, no va a funcionar. Incluso si es un concepto innovador.',
        'No solo sigas tu instinto y gusto personal, analiza la zona y las personas que la conforman: ¿cuál es su estilo de vida?, ¿qué comen?, ¿qué hacen en su tiempo libre?, ¿cuál es su ocupación? y ¿qué visten? Cuando reúnas esa información tendrás una idea más clara sobre cuál debería ser tu concepto para enganchar al público que pretendes.',
        '<strong>Calidad:</strong> En ocasiones se cree que la calidad del producto no es esencial y los dueños se dejan guiar por el bajo costo de algunos proveedores. Sin embargo, el precio que cobras por un alimento de calidad y el que logras con otro de cantidad son muy diferentes. Las ventas al por mayor proporcionan grandes beneficios pero estos no durarán por siempre, está comprobado que los clientes prefieren pagar por un producto que los satisfaga al 100%.',
        'Si centras la atención en el cuidado de los productos que ofreces, lograrás un mayor reconocimiento en el mercado. Busca productos de buen rendimiento, precio y sabor; con esto aseguras ganancias y la fidelidad de tu clientela.',
        '<strong>Servicio:</strong> No importará ninguno de los puntos anteriores si no se cumple de manera óptima con este. La recomendación de un cliente que se va contento es la más sólida que existe. Sé atento y busca que tu personal también lo sea, recuerda que ellos representan la imagen de tu negocio.',
        `Si te identificaste con alguno de estos errores, ten en cuenta que aún puedes solucionarlos. ¿Necesitas profundizar sobre alguno de ellos? En Etrusca contamos con asesorías gratuitas que te ayudarán a tener una visión amplia del negocio para que resuelvas tus problemas de manera efectiva, ${A('/contacto/', '¡contáctanos hoy!')}`
      ] },
      { t: 'todo', html: MISSING('Los 5 errores más comunes que podrías cometer en tu cafetería', 'La introducción y los errores 1 y 2') },
      { t: 'h3', text: 'No medir ventas ni inventario' },
      { t: 'p', html: 'Registra qué se vende, a qué hora y cuánto insumo se usa. Sin esos datos es difícil ajustar el menú, las compras o los horarios.' }
    ] },
    { h2: 'Por qué abrir una cafetería', blocks: [
      { t: 'p', html: 'Una cafetería puede ser un negocio con clientes que regresan a diario, una barra que se adapta a espacios distintos y un menú que se renueva con la temporada. Funciona mejor cuando el modelo, el menú y el equipo se planean juntos.' },
      { t: 'todo', html: MISSING('Por qué una cafetería', 'El texto propio') },
      { t: 'todo', html: TODO('las cifras de ese post (147 %, $10.12 y ROI en seis meses) son viejas y de terceros: solo se publican con su fuente y tu OK.') }
    ] },
    { h2: 'Gastos que te hacen perder dinero', blocks: [
      { t: 'todo', html: MISSING('11 cosas que te hacen perder dinero', 'El texto completo') }
    ] },
    { h2: 'Checklist antes de abrir', blocks: [
      { t: 'ul', items: [
        'Modelo de negocio y público definidos.',
        'Ubicación revisada a distintas horas.',
        'Lista de equipo e insumos cotizada completa.',
        'Menú corto con el costo de cada bebida.',
        'Equipo capacitado en preparación y servicio.',
        'Rutina de limpieza y mantenimiento por escrito.',
        'Forma de registrar ventas e inventario.'
      ] }
    ] }
  ],
  webinarCta: { text: 'Evita errores aprendiendo con nuestros expertos en el webinar en vivo de los jueves.', podcast: true },
  faq: [
    { q: '¿Cuál es el error más común al abrir una cafetería?', a: 'No definir desde el inicio el modelo de negocio y su público. De eso dependen la ubicación, el menú, el equipo y la inversión.' },
    { q: '¿Qué conviene más, una barra de especialidad o una cafetería comercial?', a: 'Depende de tu público, tu ubicación y tu presupuesto. La barra de especialidad vende calidad y método; la comercial, volumen y variedad.' },
    { q: '¿Cuántas bebidas debe tener el menú al abrir?', a: 'Pocas y bien costeadas. Mejor un menú corto que puedas preparar igual siempre, y sumar bebidas de temporada después.' },
    { q: '¿Qué equipo necesito para empezar?', a: 'Como mínimo, máquina de espresso, molino, accesorios de barra y equipo de limpieza, del tamaño que corresponda a tu volumen. Te asesoramos en la página de contacto.' },
    { q: '¿Necesito capacitar a mi personal aunque ya sepa hacer café?', a: 'Sí. La capacitación hace que la bebida salga igual con cualquier barista y baja la merma.' },
    { q: '¿Café Etrusca tiene un curso para abrir una cafetería?', a: 'Sí, “Emprendiendo mi negocio de barra de café y cafetería”. Precio, duración y sedes en la página del curso.' }
  ],
  cta: { text: 'Aprende a planear, equipar y operar tu cafetería con nosotros.', todo: TODO('si siguen vigentes las asesorías gratuitas que ofrecía el post “Los 5 errores”.'), links: [
    { label: 'Curso Emprendiendo mi negocio de barra de café y cafetería', path: '/emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria/' },
    { label: 'Cómo abrir una cafetería en México', path: '/blog/como-abrir-una-cafeteria-en-mexico/' },
    { label: 'Contacto', path: '/contacto/' }
  ] }
};

const FRAPPE: BlogArticle = {
  slug: 'frappe-para-cafeteria',
  title: 'Frappé para cafetería: bases y recetas | Café Etrusca',
  description:
    'Cómo hacer frappé en tu cafetería: base neutra o con sabor, jarabes y salsas, licuadora y recetas como el salted caramel frappé. Insumos Chillout y Mocafe.',
  h1: 'Frappé para cafetería: bases, dosificación y recetas',
  kicker: 'Bebidas frías',
  intro:
    'Para hacer frappé en una cafetería necesitas una base en polvo (neutra o con sabor), hielo, leche o agua, una licuadora de alto rendimiento y, si quieres variar sabores, jarabes o salsas. La base neutra te deja crear cualquier sabor; la base con sabor sale igual con menos pasos.',
  hero: { src: IMG('recetas/recetas-hero-frappe.webp'), alt: 'Frappé rosa con crema batida y fresa', width: 421, height: 926,
    provisional: 'Imagen del sitio. El brief pide un frappé de caramelo con crema batida (1200×630).' },
  sections: [
    { h2: 'Qué necesitas para hacer frappé', blocks: [
      { t: 'ul', items: ['Base en polvo para frappé (neutra o con sabor).', 'Líquido: leche o agua.', 'Hielo.', 'Sabor: jarabe, salsa o la propia base.', 'Licuadora de uso comercial.', 'Vaso, tapa y popote.'] }
    ] },
    { h2: 'Base neutra o base con sabor', blocks: [
      { t: 'p', html: 'La base neutra no trae sabor: da cuerpo, textura y estabilidad, y el sabor lo pones con jarabes o salsas. Te permite tener muchos sabores con una sola base. La base con sabor ya lo trae listo, así que la bebida sale igual con menos pasos.' },
      { t: 'p', html: `Encuentra bases ChillOut, Mocafe y otras en ${A('/insumos-para-cafeterias/bases-en-polvo/', 'bases en polvo')} y la línea completa en ${A('/insumos-para-cafeterias/bases-en-polvo/chillout/', 'ChillOut')}.` }
    ] },
    { h2: 'Cómo dosificar', blocks: [
      { t: 'p', html: 'Un frappé se arma en capas: base en polvo, líquido y hielo, y se licúa hasta que quede uniforme. Lo importante es usar siempre la misma medida por tamaño de vaso para que salga igual.' },
      { t: 'p', html: 'Como ejemplo, nuestro Salted Caramel Frappé de 360 ml lleva 20 g de polvo, 30 ml de jarabe, un espresso doble y un vaso de 360 ml lleno de hielos (receta completa abajo).' },
      { t: 'todo', html: TODO('dosis estándar de base por tamaño de vaso según la ficha técnica de ChillOut o Mocafe.') },
      { t: 'p', html: `Para otros sabores, sigue la dosis de la etiqueta o de nuestras ${A('/recetas/', 'recetas')}.` }
    ] },
    { h2: 'Dar sabor con jarabes y salsas', blocks: [
      { t: 'p', html: `Con una base neutra, el jarabe o la salsa definen el sabor. Revisa los ${A('/insumos-para-cafeterias/jarabes/', 'jarabes')}, los ${A('/insumos-para-cafeterias/jarabes/torani/', 'jarabes Torani')}, las ${A('/insumos-para-cafeterias/salsas/', 'salsas')} y los ${A('/insumos-para-cafeterias/toppings/', 'toppings')} para decorar.` }
    ] },
    { h2: 'Equipo', blocks: [
      { t: 'p', html: `Necesitas una licuadora de uso comercial que triture hielo de forma continua. Revisa las opciones en ${A('/maquinaria-y-equipo-para-cafeterias/licuadoras/', 'licuadoras')} y los ${A('/accesorios-para-poner-una-cafeteria/bebidas-frias/', 'accesorios para bebidas frías')}.` }
    ] },
    { h2: 'Recetas de frappé', blocks: [
      { t: 'h3', text: 'Salted Caramel Frappé 360 ml' },
      { t: 'img', src: IMG('blog/frappe-para-cafeteria/salted-caramel-frappe.webp'), alt: 'Salted Caramel Frappé de 360 ml con caramelo en vaso de vidrio', width: 452, height: 585 },
      { t: 'rescued', from: 'Receta Salted Caramel Frappé (blog anterior)', html: [
        '<ul><li>30 ml de jarabe Torani® Caramelo salado</li><li>20 g de polvo Chillout® Chocolate Blanco</li><li>1 espresso doble con café Etrusca® Mezcla Especial 1</li><li>1 vaso de 360 ml lleno de hielos</li></ul>',
        'Agrega todos los ingredientes al vaso de la licuadora comenzando por los líquidos y mezcla hasta obtener una textura frappé.',
        '15 min de preparación'
      ] },
      { t: 'h3', text: 'Toffee Nut Frappé' },
      { t: 'img', src: IMG('blog/frappe-para-cafeteria/toffee-nut-frappe.webp'), alt: 'Toffee Nut Frappé con crema y nuez en vaso de vidrio', width: 452, height: 585 },
      { t: 'todo', html: MISSING('Toffee Nut Frappé', 'Los ingredientes y la preparación') },
      { t: 'h3', text: 'Trufa de Chocolate Frappé' },
      { t: 'img', src: IMG('blog/frappe-para-cafeteria/trufa-de-chocolate-frappe.webp'), alt: 'Trufa de Chocolate Frappé con trozos de chocolate en vaso de vidrio', width: 452, height: 585 },
      { t: 'todo', html: MISSING('Trufa de Chocolate Frappé', 'Los ingredientes y la preparación') },
      { t: 'h3', text: 'Más recetas de frappé en el sitio' },
      { t: 'ul', items: [
        A('/recetas/frappe-mexicano/', 'Frappé mexicano'),
        A('/recetas/frappe-de-moras-y-cereza/', 'Frappé de moras y cereza'),
        A('/recetas/matcha-azul-frappe-480ml/', 'Matcha azul frappé'),
        A('/recetas/pina-colada-frappe/', 'Piña colada frappé')
      ] }
    ] },
    { h2: 'Cómo venderlo', blocks: [
      { t: 'p', html: `Un frappé de temporada renueva el menú sin cambiar tu equipo. Calcula el costo de cada vaso antes de ponerle precio (${A('/blog/cuanto-cobrar-por-un-cafe/', 'cómo costear tus bebidas')} o ${CALC_A('la calculadora de precios para tus bebidas')}) y aprende recetas en el ${A('/educacion/talleres/bebidas-frias/', 'taller de bebidas frías')}.` }
    ] }
  ],
  recipesCta: { text: 'Inspírate con más recetas para tu cafetería: frappés, bebidas frías y calientes paso a paso.', label: 'Ver todas las recetas para cafetería' },
  webinarCta: { text: 'Aprende con nuestros expertos en el webinar en vivo de los jueves.' },
  faq: [
    { q: '¿Qué es una base para frappé?', a: 'Un polvo que da cuerpo, textura y estabilidad al frappé licuado con hielo. Puede ser neutra o traer sabor.' },
    { q: '¿Qué diferencia hay entre base neutra y base con sabor?', a: 'La neutra no trae sabor y se combina con jarabes o salsas. La de sabor ya lo trae listo, así que la bebida sale igual con menos pasos.' },
    { q: '¿Cuánta base lleva un frappé?', a: 'Depende de la marca y del tamaño del vaso, así que sigue la dosis de la ficha técnica o de nuestras recetas. La dosis estándar está por confirmar.', pending: true },
    { q: '¿Puedo usar jarabes para dar sabor al frappé?', a: 'Sí. Con una base neutra, el jarabe o la salsa definen el sabor. Torani tiene muchos sabores para eso.' },
    { q: '¿Qué licuadora necesito para frappé?', a: 'Una licuadora de uso comercial que triture hielo de forma continua. Revisa las opciones en nuestra categoría de licuadoras.' },
    { q: '¿Cómo se hace un salted caramel frappé?', a: 'En el vaso de la licuadora agrega 30 ml de jarabe Torani Caramelo salado, 20 g de polvo Chillout Chocolate Blanco, un espresso doble con café Etrusca Mezcla Especial 1 y un vaso de 360 ml lleno de hielos, comenzando por los líquidos, y licúa hasta obtener una textura frappé.' },
    { q: '¿Dónde compro bases para frappé?', a: 'En la tienda en línea de Café Etrusca y con un asesor en la página de contacto. Mayoreo y envíos, por confirmar.', pending: true }
  ],
  cta: { text: 'Encuentra bases, jarabes y salsas para tus frappés.', links: [
    { label: 'Bases en polvo', path: '/insumos-para-cafeterias/bases-en-polvo/' },
    { label: 'Contacto', path: '/contacto/' }
  ] }
};

const MUERTOS: BlogArticle = {
  slug: 'bebidas-de-dia-de-muertos-para-cafeteria',
  title: 'Bebidas de Día de Muertos para cafetería | Café Etrusca',
  description:
    'Ideas de bebidas de Día de Muertos para tu cafetería: latte y frappé de pan de muerto, chocolate y atole, con los insumos para prepararlas en tu barra.',
  h1: 'Bebidas de Día de Muertos para tu cafetería',
  kicker: 'Temporada',
  intro:
    'Las bebidas de Día de Muertos que más se ven en cafeterías son el latte de pan de muerto, el frappé de pan de muerto, el chocolate caliente y el atole. Se arman con espresso o una base, más jarabes, salsas y toppings de sabores como vainilla, naranja, canela o chocolate. Aquí tienes ideas y los insumos para prepararlas.',
  hero: { src: IMG('recetas/calabaza/calabaza-y-espresso-latte.webp'), alt: 'Latte de calabaza y espresso, bebida caliente de otoño', width: 500, height: 500,
    provisional: 'PLACEHOLDER: no hay foto de pan de muerto en el sitio. El brief pide un latte de pan de muerto con pan y cempasúchil (1200×630).' },
  notes: [TODO('fecha de publicación: con el sitio nuevo a fin de mes (recomendado, queda lista para 2027) o una versión corta antes en el sitio actual.')],
  sections: [
    { h2: 'Por qué sumar bebidas de temporada en octubre y noviembre', blocks: [
      { t: 'p', html: 'Las bebidas de temporada le dan al cliente un motivo para volver y renuevan la carta sin cambiar tu equipo. Para Día de Muertos, las grandes cadenas ya lanzan cada año líneas inspiradas en el pan de muerto; tu barra puede ofrecer su propia versión con los insumos que ya usa.' }
    ] },
    { h2: 'Ideas de bebidas', blocks: [
      { t: 'h3', text: 'Latte de pan de muerto' },
      { t: 'p', html: `Espresso, leche vaporizada y jarabes o salsas con notas de vainilla, naranja o mantequilla, terminado con un topping. Revisa los ${A('/insumos-para-cafeterias/jarabes/', 'jarabes')} y los ${A('/insumos-para-cafeterias/jarabes/torani/', 'jarabes Torani')}.` },
      { t: 'todo', html: TODO('qué sabores Torani usar para el pan de muerto, si están en existencia y las cantidades.') },
      { t: 'h3', text: 'Frappé de pan de muerto' },
      { t: 'p', html: `Base neutra para frappé, leche, hielo, jarabe del sabor y topping encima. La base da la textura y el jarabe el sabor. Te explicamos cómo en nuestra guía de ${A('/blog/frappe-para-cafeteria/', 'frappé para cafetería')}.` },
      { t: 'h3', text: 'Chocolate caliente de temporada' },
      { t: 'p', html: `Un chocolate caliente con canela o naranja acompaña muy bien al pan de muerto. Prepáralo con ${A('/insumos-para-cafeterias/bases-en-polvo/', 'bases en polvo')} y dale un giro con ${A('/insumos-para-cafeterias/salsas/', 'salsas')}.` },
      { t: 'h3', text: 'Atole o bebida tradicional' },
      { t: 'todo', html: TODO('si Café Etrusca vende un insumo para atole. Si no, esta sección se quita.') }
    ] },
    { h2: 'Cómo presentarlas en la carta', blocks: [
      { t: 'ul', items: [
        'Dales un nombre de temporada fácil de pedir.',
        `Decora con ${A('/insumos-para-cafeterias/toppings/', 'toppings')} que recuerden al pan de muerto: azúcar, canela o chocolate.`,
        'Usa un vaso o una taza que se vea bien en foto: muchas ventas de temporada empiezan en redes.',
        'Ponlas en la carta desde mediados de octubre hasta el 2 de noviembre.'
      ] }
    ] },
    { h2: 'Más bebidas de otoño', blocks: [
      { t: 'ul', items: [
        A('/recetas/calabaza-y-espresso-latte/', 'Calabaza y espresso latte'),
        A('/recetas/dirty-pumpkin-chai/', 'Dirty pumpkin chai'),
        A('/recetas/affogato-de-otono/', 'Affogato de otoño'),
        A('/recetas/manzana-acaramelada/', 'Manzana acaramelada'),
        `Sesión ${A('/educacion/sesiones/un-otono-calido/', 'Un otoño cálido')} y ${A('/educacion/sesiones/cafe-de-temporada/', 'Café de temporada')}`,
        `Guía de ${A('/blog/menu-pumpkin-bebidas-de-otono-cafeteria/', 'menú pumpkin y bebidas de otoño')}`
      ] }
    ] }
  ],
  recipesCta: { text: 'Inspírate con más recetas para tu cafetería y arma tu menú de temporada.', label: 'Ver recetas para cafetería' },
  faq: [
    { q: '¿Qué bebidas vender en Día de Muertos?', a: 'Las más comunes en cafetería son el latte y el frappé de pan de muerto, el chocolate caliente y el atole. Son bebidas de temporada que se arman con insumos que ya tienes en barra.' },
    { q: '¿Cómo se hace un latte de pan de muerto?', a: 'Con espresso, leche vaporizada y jarabes o salsas con notas de vainilla, naranja o mantequilla, decorado con topping. Las cantidades están por confirmar.', pending: true },
    { q: '¿Qué jarabes sirven para el sabor a pan de muerto?', a: 'Por confirmar qué combinación recomienda Café Etrusca con los sabores en existencia.', pending: true },
    { q: '¿Cuándo conviene lanzar el menú de Día de Muertos?', a: 'Desde mediados de octubre hasta el 2 de noviembre, que es cuando la gente busca y pide estas bebidas.' },
    { q: '¿Puedo servir el frappé de pan de muerto con base neutra?', a: 'Sí. La base neutra da textura, y el sabor viene del jarabe y el topping.' },
    { q: '¿Dónde compro los insumos?', a: 'En la tienda en línea de Café Etrusca y con un asesor en la página de contacto.' }
  ],
  cta: { text: 'Arma tu menú de temporada con jarabes, salsas y toppings.', links: [
    { label: 'Insumos para cafetería', path: '/insumos-para-cafeterias/' },
    { label: 'Contacto', path: '/contacto/' }
  ], todo: TODO('si la promo “Día de muertos” de la tienda sigue vigente para enlazarla.') }
};

const BARISTA: BlogArticle = {
  slug: 'que-hace-un-barista',
  title: 'Qué hace un barista: funciones y cómo empezar | Etrusca',
  description:
    'Qué hace un barista en una cafetería: funciones, habilidades, cuánto gana en México y cómo empezar a trabajar como barista con un curso.',
  h1: 'Qué hace un barista: funciones, sueldo y cómo empezar',
  kicker: 'Oficio',
  intro:
    'Un barista es la persona que prepara y sirve el café en una cafetería: calibra el molino, extrae el espresso, texturiza la leche, prepara bebidas calientes y frías, mantiene limpio el equipo y atiende al cliente. Para empezar no necesitas título, pero un curso te da la técnica y la práctica que piden las cafeterías.',
  hero: { src: IMG('educacion/taller-formacion-barista.webp'), alt: 'Manos de barista colocando el portafiltro en la máquina de espresso', width: 750, height: 375 },
  sections: [
    { h2: 'Qué hace un barista', blocks: [
      { t: 'ul', items: [
        'Calibra el molino para que el espresso salga en su punto.',
        'Extrae el espresso y cuida que salga igual en cada taza.',
        'Texturiza la leche y hace arte latte.',
        'Prepara bebidas frías y de temporada.',
        'Limpia y mantiene la máquina, el molino y la barra.',
        'Atiende al cliente y recomienda bebidas.',
        'Lleva el control de los insumos de la barra.'
      ] }
    ] },
    { h2: 'Habilidades que necesita', blocks: [
      { t: 'p', html: 'Las técnicas: espresso, leche y métodos de filtrado. Las de servicio: atender rápido, explicar el menú y cuidar la experiencia del cliente.' },
      { t: 'ul', items: [
        A('/taller-de-arte-latte-nivel-basico/', 'Taller de arte latte nivel básico'),
        A('/taller-de-brew-bar/', 'Taller de brew bar'),
        A('/educacion/talleres/bebidas-frias/', 'Taller de bebidas frías'),
        A('/experiencia-servicio-al-cliente-en-barras-de-cafe/', 'Experiencia de servicio al cliente en barras de café')
      ] }
    ] },
    { h2: 'Barista de cafetería y barista de especialidad', blocks: [
      { t: 'p', html: 'El barista de cafetería prepara el menú de la casa con rapidez y consistencia. El de especialidad, además, trabaja con cafés de origen, ajusta recetas por café y domina varios métodos de extracción.' }
    ] },
    { h2: '¿Cuánto gana un barista en México?', blocks: [
      { t: 'p', html: 'El sueldo varía según la ciudad, el tipo de cafetería y las propinas.' },
      { t: 'todo', html: TODO('si se publica un rango de sueldo y con qué fuente pública citada y fechada. Sin fuente aprobada no va ninguna cifra.') }
    ] },
    { h2: 'Cómo empezar como barista', blocks: [
      { t: 'ol', items: [
        'Aprende lo básico: qué es un espresso, cómo se muele y cómo se texturiza la leche.',
        'Practica todo lo que puedas en una máquina real.',
        `Toma un curso: ${A('/educacion/talleres/formacion-barista/', 'formación barista')} o el ${A('/curso-de-barista-cdmx/', 'curso de barista en CDMX')}. Consulta todas las sedes en ${A('/cursos-para-baristas-y-talleres-para-cafeterias/', 'cursos para baristas y talleres')}.`,
        'Busca tu primer empleo en barra.',
        `Especialízate con el ${A('/taller-para-baristas-especializados/', 'taller para baristas especializados')} y los demás ${A('/educacion/talleres/', 'talleres')}.`
      ] },
      { t: 'todo', html: TODO('qué página de curso es la principal para enlazar (formación barista o curso de barista CDMX).') }
    ] },
    { h2: 'Herramientas del barista', blocks: [
      { t: 'p', html: `Jarra de leche, tamper, báscula y accesorios de barra: revisa los ${A('/accesorios-para-poner-una-cafeteria/barista-espresso/', 'accesorios para barista y espresso')} y las ${A('/maquinaria-y-equipo-para-cafeterias/espresso/', 'máquinas de espresso')}. Si quieres entender de dónde viene lo que preparas, lee el ${A('/blog/proceso-del-cafe-de-la-planta-a-la-taza/', 'proceso del café')}.` }
    ] }
  ],
  webinarCta: { text: 'Aprende con nuestros expertos en el webinar en vivo de los jueves: resuelve tus dudas sobre el oficio de barista.', podcast: true },
  faq: [
    { q: '¿Qué hace un barista?', a: 'Prepara y sirve café y otras bebidas en una cafetería: calibra el molino, extrae espresso, texturiza leche, cuida el equipo y atiende al cliente.' },
    { q: '¿Qué se necesita para ser barista?', a: 'No se pide título. Se necesita técnica de espresso y leche, práctica y buen servicio, y un curso de barista acelera el aprendizaje.' },
    { q: '¿Cuánto dura un curso de barista?', a: 'Depende del curso. Revisa duración, precio y fechas en la página de cada taller.' },
    { q: '¿Qué diferencia hay entre un barista y un cafetero?', a: 'El barista se especializa en preparar las bebidas en barra; “cafetero” suele referirse a quien produce o comercializa café.' },
    { q: '¿Dónde estudiar para barista?', a: 'Café Etrusca da cursos y talleres para baristas en varias sedes de México. Consulta el calendario en la página de cursos para baristas y talleres para cafeterías.' }
  ],
  cta: { text: 'Aprende la técnica con nuestros cursos para baristas.', links: [
    { label: 'Cursos y fechas', path: '/cursos-para-baristas-y-talleres-para-cafeterias/' },
    { label: 'Formación barista', path: '/educacion/talleres/formacion-barista/' }
  ] }
};

/* ============================== TANDA 2 ============================== */

const PC = 'por confirmar';
const METODO_CAT = '/accesorios-para-poner-una-cafeteria/metodo-extraccion/';

const METODOS: BlogArticle = {
  slug: 'metodos-de-extraccion-de-cafe-comparativa',
  title: 'Métodos de extracción de café: tabla comparativa | Etrusca',
  description:
    'Compara V60, Chemex, Kalita Wave, sifón japonés y Toddy cold brew: molienda, filtro, tiempo, sabor y para qué barra conviene cada uno.',
  h1: 'Métodos de extracción de café: cuál elegir para tu barra',
  kicker: 'Métodos de filtrado',
  intro:
    'Los métodos de filtrado más usados en cafetería son V60, Chemex y Kalita Wave (goteo con papel), el sifón japonés (vacío, con quemador) y el Toddy (cold brew por inmersión en frío). Se diferencian en el filtro, la molienda, el tiempo y el cuerpo de la taza. Abajo va la tabla para comparar y elegir.',
  hero: { src: IMG('accesorios/metodos-extraccion/hero-metodos-extraccion.webp'), alt: 'Sifón japonés, Chemex, dripper y otros métodos de extracción sobre una barra', width: 1672, height: 941,
    provisional: 'Imagen del sitio. El brief pide foto de los 5 métodos juntos (1200×630).' },
  notes: [TODO('molienda, tiempo, proporción y temperatura de cada método (que los dé el instructor del taller de brew bar), y si el sifón Hario y la Chemex siguen activos en tienda.')],
  itemList: { name: 'Métodos de extracción comparados', items: [
    { name: 'V60', path: METODO_CAT }, { name: 'Chemex', path: METODO_CAT }, { name: 'Kalita Wave', path: METODO_CAT },
    { name: 'Sifón japonés', path: METODO_CAT }, { name: 'Toddy cold brew', path: METODO_CAT }
  ] },
  sections: [
    { h2: 'Tabla comparativa', blocks: [
      { t: 'table', caption: 'Comparativa de métodos de extracción', head: ['Método', 'Extracción', 'Filtro', 'Molienda', 'Tiempo', 'Taza', 'Capacidad que vendemos'], rows: [
        ['V60 (Hario)', 'Goteo / percolación', 'Papel cónico V60', PC, PC, 'Limpia, acidez marcada', PC],
        ['Chemex', 'Goteo / percolación', 'Papel grueso Chemex', PC, PC, 'Muy limpia, cuerpo ligero', '3 tazas'],
        ['Kalita Wave', 'Goteo, fondo plano', 'Papel ondulado Kalita', PC, PC, 'Pareja, más dulce', 'Kalita Wave 185 (2 a 4 tazas)'],
        ['Sifón japonés', 'Vacío + calor', 'Filtro de tela del sifón', PC, PC, 'Aromática, cuerpo medio', 'Hario de 5 tazas'],
        ['Toddy cold brew', 'Inmersión en frío', 'Fieltro reusable o papel Toddy', PC, `${PC} (horas)`, 'Baja acidez, para bebidas frías', 'Sistema de 2.13 L']
      ] },
      { t: 'todo', html: TODO('molienda y tiempo de cada método, y validar con el instructor la descripción de la taza.') }
    ] },
    { h2: 'Método por método', blocks: [
      { t: 'h3', text: 'V60' },
      { t: 'p', html: 'Dripper cónico de Hario con un orificio grande. El agua se vierte poco a poco sobre el café y atraviesa un filtro de papel cónico. Da una taza limpia y con acidez marcada, y deja mucho control del flujo, por eso es el favorito para lucir cafés de especialidad en barra. Pide práctica para que salga igual en cada taza.' },
      { t: 'h3', text: 'Chemex' },
      { t: 'p', html: 'Jarra de vidrio con filtro de papel grueso. El filtro retiene más aceites y sedimentos, así que la taza sale muy limpia y de cuerpo ligero. Sirve para preparar varias tazas a la vez y se ve muy bien en la barra.' },
      { t: 'h3', text: 'Kalita Wave' },
      { t: 'p', html: 'Dripper de fondo plano con tres orificios y filtro de papel ondulado. La extracción es más pareja y perdona más errores de vertido, por eso funciona bien cuando varios baristas preparan el mismo café. Suele dar una taza dulce y equilibrada.' },
      { t: 'h3', text: 'Sifón japonés' },
      { t: 'p', html: 'Método de vacío: el agua sube por calor a la cámara superior, se mezcla con el café y, al apagar el quemador, baja filtrada. Da una taza aromática y de cuerpo medio. Es lento y vistoso: conviene en barras de especialidad donde la preparación es parte de la experiencia.' },
      { t: 'h3', text: 'Toddy cold brew' },
      { t: 'p', html: `Sistema de inmersión en frío: el café molido reposa varias horas en agua fría y se filtra con fieltro o papel Toddy. Da un concentrado de baja acidez que se prepara por lote, ideal para un menú de bebidas frías. Aprende más en el ${A('/taller-de-cold-brew/', 'taller de cold brew')}.` }
    ] },
    { h2: '¿Cuál conviene a tu cafetería?', blocks: [
      { t: 'ul', items: [
        '<strong>Barra de alto volumen:</strong> goteo con papel (V60 o Kalita Wave), que es rápido y fácil de repetir.',
        '<strong>Barra de especialidad o de show:</strong> sifón japonés o Chemex, que hacen de la preparación parte de la experiencia.',
        '<strong>Menú de bebidas frías:</strong> Toddy cold brew, que se prepara por lote y se sirve rápido.'
      ] }
    ] },
    { h2: 'Filtros y accesorios que necesitas', blocks: [
      { t: 'ul', items: ['Filtros de papel del tamaño de tu método.', 'Hervidor de cuello de ganso para controlar el vertido.', 'Báscula para pesar café y agua.'] },
      { t: 'p', html: `Encuéntralos en ${A(METODO_CAT, 'métodos de extracción')} y en todos los ${A('/accesorios-para-poner-una-cafeteria/', 'accesorios para cafetería')}. Te explicamos cada uno en ${A('/blog/accesorios-para-metodos-de-filtrado/', 'accesorios para métodos de filtrado')}.` }
    ] },
    { h2: 'Aprende a prepararlos', blocks: [
      { t: 'p', html: `Practica todos estos métodos en el ${A('/taller-de-brew-bar/', 'taller de brew bar')} y el ${A('/taller-de-cold-brew/', 'taller de cold brew')}. Para el grano, revisa nuestro ${A('/productos/cafe/especialidad/', 'café de especialidad')}.` }
    ] }
  ],
  recipesCta: { text: 'Inspírate con más recetas para tu cafetería, de café filtrado a bebidas con espresso.', label: 'Ver recetas de café' },
  webinarCta: { text: 'Aprende con nuestros expertos en el webinar en vivo de los jueves y lleva tus métodos a otro nivel.', podcast: true },
  faq: [
    { q: '¿Cuál es la diferencia entre V60 y Chemex?', a: 'Los dos son goteo con papel; Chemex usa un filtro más grueso que da una taza más limpia y ligera, y V60 da más control del flujo.' },
    { q: '¿Qué método es mejor para cafetería?', a: 'Depende del volumen: para servicio rápido, goteo con papel (V60 o Kalita); para bebidas frías en lote, Toddy.' },
    { q: '¿Qué es el sifón japonés?', a: 'Un método de vacío: el agua sube por calor, se mezcla con el café y baja filtrada al apagar el quemador.' },
    { q: '¿Qué filtro usa la Kalita Wave?', a: 'Filtro de papel ondulado de fondo plano, en tamaño 185 para la Kalita Wave 185.' },
    { q: '¿Cómo se hace cold brew con Toddy?', a: 'Por inmersión de café molido en agua fría durante varias horas, con filtrado de fieltro o papel Toddy. Los tiempos y la proporción están por confirmar.', pending: true },
    { q: '¿Dónde aprendo métodos de filtrado?', a: 'En el taller de brew bar de Café Etrusca.' }
  ],
  cta: { text: 'Equipa tu brew bar con métodos, filtros y accesorios.', links: [
    { label: 'Métodos de extracción', path: METODO_CAT },
    { label: 'Taller de brew bar', path: '/taller-de-brew-bar/' }
  ] }
};

const CHAI: BlogArticle = {
  slug: 'chai-david-rio-sabores',
  title: 'Chai David Rio: sabores Tigre, Elefante y más | Etrusca',
  description:
    'Qué sabor es cada chai David Rio: Tigre, Elefante, Tortuga, Flamingo y Orca. Versiones con y sin azúcar, presentaciones y cómo prepararlo.',
  h1: 'Chai David Rio: guía de sabores para tu cafetería',
  kicker: 'Insumos',
  intro:
    'David Rio nombra cada chai con un animal: Tigre es el chai tradicional, Elefante es vainilla, Tortuga es té verde, Flamingo es vainilla sin azúcar y Orca es tradicional sin azúcar. Todos son bases en polvo para chai latte caliente o frío; en Café Etrusca hay bote chico y grande.',
  hero: { src: IMG('recetas/chillout/chai-caramel.webp'), alt: 'Chai latte con caramelo en taza de vidrio', width: 1066, height: 1600,
    provisional: 'PLACEHOLDER: no hay foto de los botes David Rio en el sitio. El brief pide los botes Tigre, Elefante, Tortuga, Flamingo y Orca juntos (1200×630).' },
  notes: [TODO('qué SKUs siguen activos (Tucán, tamaños) y si Tigre, Elefante y Tortuga llevan azúcar. Los precios no se publican.')],
  /* Rescate: el texto de “Chai verde, el producto más vendido” no se pudo recuperar (sección abajo). */
  itemList: { name: 'Sabores de chai David Rio', items: [
    { name: 'Tigre (Tiger Spice)' }, { name: 'Elefante' }, { name: 'Tortuga' }, { name: 'Flamingo' }, { name: 'Orca' }
  ] },
  sections: [
    { h2: 'Tabla de sabores', blocks: [
      { t: 'table', caption: 'Sabores de chai David Rio', head: ['Animal', 'Sabor', 'Azúcar', 'Presentaciones', 'SKU'], rows: [
        ['Tigre (Tiger Spice)', 'Tradicional', 'Con azúcar*', '398 g · 1.814 kg', 'IBP-100 · IBP-085'],
        ['Elefante', 'Vainilla', 'Con azúcar*', '398 g · 1.814 kg', 'IBP-099 · IBP-086'],
        ['Tortuga', 'Té verde', 'Con azúcar*', '398 g · 1.814 kg', 'IBP-101 · IBP-087'],
        ['Flamingo', 'Vainilla', 'Sin azúcar', '1.520 kg', 'IBP-092'],
        ['Orca', 'Tradicional', 'Sin azúcar', '337 g', 'IBP-102'],
        ['Tucán', 'Mango', 'Con azúcar*', '1.814 kg', 'IBP-094 (por confirmar si sigue activo)']
      ] },
      { t: 'todo', html: TODO('*“con azúcar” se tomó de que la ficha no dice “sin azúcar”. Confirmar, y confirmar si Tucán sigue a la venta.') }
    ] },
    { h2: 'Qué sabor elegir según tu menú', blocks: [
      { t: 'h3', text: 'Clásico' },
      { t: 'p', html: 'Tigre es el chai especiado tradicional: el punto de partida para un chai latte de menú.' },
      { t: 'h3', text: 'Vainilla' },
      { t: 'p', html: 'Elefante suaviza las especias con vainilla; funciona para quien busca un chai más dulce y redondo.' },
      { t: 'h3', text: 'Té verde' },
      { t: 'p', html: 'Tortuga combina el chai con té verde: una opción distinta para clientes que buscan algo más herbal.' },
      { t: 'h3', text: 'Sin azúcar' },
      { t: 'p', html: 'Orca (tradicional) y Flamingo (vainilla) son para los clientes que piden bebidas sin azúcar.' }
    ] },
    { h2: 'Cómo preparar un chai latte', blocks: [
      { t: 'p', html: 'Mientras confirmamos la receta de la casa, sigue las instrucciones de la etiqueta del bote.' },
      { t: 'todo', html: TODO('dosis y preparación de chai latte caliente y frío (gramos por vaso de 12 y 16 oz, leche).') }
    ] },
    { h2: 'Chai verde, el producto más vendido', blocks: [
      { t: 'todo', html: MISSING('Chai verde, el producto más vendido', 'El texto completo') },
      { t: 'todo', html: TODO('el precio de $335 y los rendimientos de ese post son de 2023: confirmar antes de publicarlos.') },
      { t: 'p', html: `Para saber cuánto te deja cada bote, ${CALC_A('calcula la ganancia por bote y el precio de tu chai latte con nuestra calculadora')}, usando el precio de compra y los gramos por vaso de tu receta.` }
    ] },
    { h2: '¿Qué es el chai?', blocks: [
      { t: 'p', html: 'El chai es un té negro especiado de origen indio. David Rio lo vende listo en polvo, así que solo se mezcla con leche, caliente o fría.' }
    ] },
    { h2: 'Otras bases de chai', blocks: [
      { t: 'p', html: `Además de David Rio hay chai de ChillOut, Mocafe Spiced Chai y Cool Capp chai vainilla. Revísalos en ${A('/insumos-para-cafeterias/bases-en-polvo/', 'bases en polvo')}, la línea ${A('/insumos-para-cafeterias/bases-en-polvo/chillout/', 'ChillOut')} y nuestros ${A('/insumos-para-cafeterias/te/', 'tés')}. Para bebidas frías, mira el ${A('/educacion/talleres/bebidas-frias/', 'taller de bebidas frías')} y las ${A('/recetas/', 'recetas')}.` }
    ] }
  ],
  recipesCta: { text: 'Inspírate con más recetas para tu cafetería: lattes, chai y bebidas frías.', label: 'Explorar todas nuestras recetas' },
  faq: [
    { q: '¿Qué sabor es el chai Tigre de David Rio?', a: 'El tradicional especiado (Tiger Spice), con azúcar.' },
    { q: '¿Cuál chai David Rio no tiene azúcar?', a: 'Orca (tradicional) y Flamingo (vainilla).' },
    { q: '¿Qué es el chai Tortuga?', a: 'Chai con té verde.' },
    { q: '¿Qué es el chai Elefante?', a: 'Chai sabor vainilla.' },
    { q: '¿Se puede preparar frío?', a: 'Sí, como chai latte frío o frappé. La dosis está por confirmar.', pending: true },
    { q: '¿Qué presentaciones hay?', a: 'Bote de 398 g y de 1.814 kg en Tigre, Elefante y Tortuga; Flamingo de 1.520 kg; Orca de 337 g.' },
    { q: '¿El chai tiene cafeína?', a: 'Lleva té, así que sí tiene cafeína. La cantidad está por confirmar con la ficha técnica; si no se confirma, esta pregunta se quita.', pending: true }
  ],
  cta: { text: 'Encuentra el chai David Rio y otras bases para tu menú.', links: [
    { label: 'Bases en polvo', path: '/insumos-para-cafeterias/bases-en-polvo/' },
    { label: 'Contacto', path: '/contacto/' }
  ] }
};

const MAQUINA: BlogArticle = {
  slug: 'como-elegir-maquina-de-espresso-para-cafeteria',
  title: 'Máquina de espresso para cafetería: cómo elegir | Etrusca',
  description:
    'Cómo elegir máquina de espresso para tu cafetería: 1 o 2 grupos, voltaje, volumen de tazas, molino, instalación y servicio. Modelos Reneka.',
  h1: 'Cómo elegir máquina de espresso para tu cafetería',
  kicker: 'Equipo',
  intro:
    'Para elegir máquina de espresso para cafetería, define cuántas bebidas vas a sacar en hora pico, cuántos baristas trabajan a la vez (1 o 2 grupos), el voltaje de tu local (110 V o 220 V) y quién te dará instalación y servicio. La máquina va siempre con un buen molino.',
  hero: { src: IMG('maquinas/viva.webp'), alt: 'Máquina de espresso Reneka VIVA', width: 2048, height: 2048,
    provisional: 'Imagen del sitio. El brief pide una Reneka de 2 grupos en barra de cafetería (1200×630).' },
  notes: [TODO('precios, tazas por hora, voltaje y potencia por modelo; si LIFE y VIVA BASIC 2 siguen vigentes; nombre exacto de OEM; qué incluye instalación, garantía y preventivo.')],
  itemList: { name: 'Modelos Reneka', items: [
    { name: 'Reneka VIVA', path: '/maquinaria-y-equipo-para-cafeterias/espresso/' },
    { name: 'Reneka OEM', path: '/maquinaria-y-equipo-para-cafeterias/espresso/' },
    { name: 'Reneka LIFE', path: '/maquinaria-y-equipo-para-cafeterias/espresso/' },
    { name: 'Reneka VIVA BASIC 2', path: '/maquinaria-y-equipo-para-cafeterias/espresso/' }
  ] },
  sections: [
    { h2: '5 preguntas antes de comprar', blocks: [
      { t: 'h3', text: '¿Cuántas bebidas sacarás en hora pico?' },
      { t: 'p', html: 'El volumen en tu hora más fuerte, no el promedio del día, es lo que define el tamaño de la máquina.' },
      { t: 'h3', text: '¿Cuántos grupos necesitas?' },
      { t: 'p', html: 'Cada grupo es un cabezal: con dos grupos, dos baristas sacan bebidas a la vez.' },
      { t: 'h3', text: '¿Qué voltaje tiene tu local?' },
      { t: 'p', html: 'Revisa si tu instalación es de 110 V o 220 V antes de elegir modelo; algunas máquinas piden una instalación eléctrica especial.' },
      { t: 'h3', text: '¿Cómo es tu agua?' },
      { t: 'p', html: 'El agua dura deja sarro en la caldera. Considera un filtro o suavizador desde el inicio.' },
      { t: 'h3', text: '¿Quién te dará servicio?' },
      { t: 'p', html: 'Pregunta por instalación, mantenimiento preventivo y refacciones antes de comprar.' }
    ] },
    { h2: '¿1 o 2 grupos?', blocks: [
      { t: 'table', caption: 'Máquinas de 1 y 2 grupos', head: ['', '1 grupo', '2 grupos'], rows: [
        ['Para quién', 'Barra chica, 1 barista', 'Barra con flujo constante, 2 baristas'],
        ['Modelos Reneka', 'Reneka VIVA (110 V)', 'Reneka VIVA 2 grupos (220 V), OEM, LIFE, VIVA BASIC 2'],
        ['Voltaje', '110 V (VIVA)', `220 V (${PC} por modelo)`],
        ['Tazas por hora', PC, PC],
        ['Precio', PC, PC]
      ] }
    ] },
    { h2: 'Modelos Reneka que vendemos', blocks: [
      { t: 'ul', items: [
        '<strong>VIVA:</strong> 110 V; también hay versión de 2 grupos a 220 V.',
        '<strong>OEM:</strong> 2 grupos, automática.',
        '<strong>LIFE:</strong> 2 grupos, automática.',
        '<strong>VIVA BASIC 2:</strong> especificaciones por confirmar.'
      ] },
      { t: 'p', html: `Mira los modelos en ${A('/maquinaria-y-equipo-para-cafeterias/espresso/', 'máquinas de espresso')} y todo el ${A('/maquinaria-y-equipo-para-cafeterias/', 'equipo para cafetería')}.` }
    ] },
    { h2: 'No olvides el molino', blocks: [
      { t: 'p', html: `La mejor máquina no compensa un molino que no muele parejo. Compara opciones en nuestra guía de ${A('/blog/molinos-para-cafeteria-fiorenzato-comandante-baratza/', 'molinos para cafetería')} y en la categoría de ${A('/maquinaria-y-equipo-para-cafeterias/molinos/', 'molinos')}.` }
    ] },
    { h2: 'Instalación, preventivo y servicio', blocks: [
      { t: 'p', html: 'Café Etrusca ofrece instalación, mantenimiento preventivo y servicio en <a href="https://servicio-y-refacciones.cafeetrusca.com/" rel="noopener">servicio y refacciones</a>.' },
      { t: 'todo', html: TODO('qué incluye la instalación, la garantía y el preventivo.') }
    ] },
    { h2: 'Mantenimiento diario', blocks: [
      { t: 'p', html: `Un retrolavado diario y la limpieza de la lanceta alargan la vida de la máquina. Te lo explicamos en ${A('/blog/como-limpiar-maquina-de-espresso-y-molino/', 'cómo limpiar tu máquina de espresso y molino')}, y encuentras los accesorios en ${A('/accesorios-para-poner-una-cafeteria/barista-espresso/', 'accesorios para barista y espresso')}.` }
    ] },
    { h2: 'Aprende a usarla', blocks: [
      { t: 'p', html: `Saca el máximo provecho de tu máquina con la ${A('/educacion/talleres/formacion-barista/', 'formación barista')} o el ${A('/curso-de-barista-cdmx/', 'curso de barista en CDMX')}.` }
    ] }
  ],
  webinarCta: { text: '¿Dudas para elegir equipo? Aprende con nuestros expertos en el webinar en vivo de los jueves.' },
  faq: [
    { q: '¿Qué máquina de espresso necesito para una cafetería?', a: 'Una profesional de 1 o 2 grupos según tu volumen en hora pico y cuántos baristas trabajan a la vez.' },
    { q: '¿Cuál es la diferencia entre 1 y 2 grupos?', a: 'El número de cabezales: con 2 grupos salen dos bebidas a la vez.' },
    { q: '¿Necesito 220 V?', a: 'Depende del modelo; la Reneka VIVA de 1 grupo trabaja a 110 V y la versión de 2 grupos a 220 V.' },
    { q: '¿Cuánto cuesta una máquina de espresso para cafetería?', a: 'Depende del modelo y del número de grupos. Pide una cotización en la página de contacto.' },
    { q: '¿Incluye instalación?', a: 'Café Etrusca ofrece instalación, preventivo y servicio. Las condiciones están por confirmar.', pending: true },
    { q: '¿Qué molino va con la máquina?', a: 'Uno de espresso con dosificación constante; revisa nuestra guía de molinos.' }
  ],
  cta: { text: 'Cotiza tu máquina de espresso con un asesor.', links: [
    { label: 'Pedir cotización', path: '/contacto/' },
    { label: 'Máquinas de espresso', path: '/maquinaria-y-equipo-para-cafeterias/espresso/' }
  ] }
};

const LIMPIEZA: BlogArticle = {
  slug: 'como-limpiar-maquina-de-espresso-y-molino',
  title: 'Cómo limpiar tu máquina de espresso y molino | Etrusca',
  description:
    'Qué es Cafiza, para qué sirve Rinza y cómo usar Grindz en el molino. Guía de limpieza diaria y semanal de la barra con productos Urnex.',
  h1: 'Cómo limpiar tu máquina de espresso y tu molino',
  kicker: 'Mantenimiento',
  intro:
    'Cafiza limpia los grupos de la máquina de espresso (retrolavado), Rinza limpia la lanceta de vapor y las jarras de leche, y Grindz son pastillas que limpian las fresas del molino. Los tres son de Urnex y se venden en Café Etrusca.',
  hero: { src: IMG('accesorios/subcategorias/hero-limpieza.webp'), alt: 'Productos Urnex Cafiza, Rinza y Grindz con cepillos de limpieza', width: 1672, height: 941 },
  notes: [TODO('qué son exactamente ALM-001, ALM-008 y ALM-009 (presentaciones de Cafiza y Grindz), y dosis, tiempos y frecuencia de limpieza de Urnex o del equipo técnico.')],
  itemList: { name: 'Productos de limpieza Urnex', items: [
    { name: 'Cafiza', path: '/accesorios-para-poner-una-cafeteria/limpieza/' },
    { name: 'Rinza', path: '/accesorios-para-poner-una-cafeteria/limpieza/' },
    { name: 'Grindz', path: '/accesorios-para-poner-una-cafeteria/limpieza/' },
    { name: 'Cepillos Urnex', path: '/accesorios-para-poner-una-cafeteria/limpieza/' }
  ] },
  sections: [
    { h2: 'Qué producto usar para cada parte', blocks: [
      { t: 'table', caption: 'Productos Urnex por parte del equipo', head: ['Producto Urnex', 'Para qué parte', 'Forma', 'SKU'], rows: [
        ['Cafiza', 'Grupos, portafiltros y canastillas (retrolavado)', `Polvo o tabletas (${PC} formatos)`, `ALM-001 (${PC})`],
        ['Rinza', 'Lanceta de vapor y jarras de leche', 'Líquido 1 L', 'ALM-002'],
        ['Grindz', 'Fresas del molino', 'Pastillas', `ALM-008 (${PC})`],
        ['Cepillos Urnex', 'Grupo (recto) y lanceta', 'Cepillo', 'ALM-030 · ALM-029']
      ] }
    ] },
    { h2: 'Limpieza diaria de la máquina', blocks: [
      { t: 'ol', items: [
        'Al cierre, haz un retrolavado de cada grupo con filtro ciego y Cafiza.',
        'Purga la lanceta de vapor después de cada uso y límpiala con un paño húmedo.',
        'Cepilla el grupo y la regadera para quitar restos de café.'
      ] },
      { t: 'p', html: 'Sigue las instrucciones de la etiqueta para la cantidad de producto y los ciclos.' },
      { t: 'todo', html: TODO('dosis, tiempos y número de ciclos del retrolavado (de Urnex o del equipo técnico).') }
    ] },
    { h2: 'Limpieza semanal', blocks: [
      { t: 'ul', items: [
        'Deja canastillas y portafiltros en remojo con Cafiza.',
        'Limpia las jarras de leche con Rinza.',
        'Revisa empaques y regaderas.'
      ] }
    ] },
    { h2: 'Cómo limpiar el molino con Grindz', blocks: [
      { t: 'ol', items: [
        'Vacía la tolva de café.',
        'Muele las pastillas Grindz como si fueran café.',
        'Muele un poco de café después para retirar los restos y desecha esa molienda.'
      ] },
      { t: 'todo', html: TODO('dosis de Grindz y frecuencia recomendada.') }
    ] },
    { h2: 'Errores comunes', blocks: [
      { t: 'ul', items: [
        'Usar jabón de trastes, que deja olor y sabor.',
        'No purgar la lanceta, lo que deja leche dentro del tubo.',
        'Olvidar la lanceta y las jarras en la rutina.',
        'Limpiar el molino solo cuando ya hay un problema.'
      ] }
    ] },
    { h2: 'Servicio y preventivo', blocks: [
      { t: 'p', html: `Además de la limpieza diaria, programa un mantenimiento preventivo en <a href="https://servicio-y-refacciones.cafeetrusca.com/" rel="noopener">servicio y refacciones</a>. Encuentra los productos en ${A('/accesorios-para-poner-una-cafeteria/limpieza/', 'limpieza')} y en nuestras ${A('/sucursales/', 'sucursales')}. Si vas a comprar equipo, lee ${A('/blog/como-elegir-maquina-de-espresso-para-cafeteria/', 'cómo elegir máquina de espresso')} y nuestra guía de ${A('/blog/molinos-para-cafeteria-fiorenzato-comandante-baratza/', 'molinos')}.` }
    ] }
  ],
  faq: [
    { q: '¿Qué es Cafiza?', a: 'Un limpiador Urnex para quitar residuos de café y aceites de los grupos y portafiltros de la máquina de espresso.' },
    { q: '¿Cuál es la diferencia entre Cafiza y Rinza?', a: 'Cafiza es para el circuito de café (grupos); Rinza es para la leche (lanceta y jarras).' },
    { q: '¿Qué es Grindz?', a: 'Pastillas Urnex que se muelen como café para limpiar las fresas del molino sin desarmarlo.' },
    { q: '¿Cada cuándo se limpia la máquina de espresso?', a: 'El retrolavado se hace a diario al cierre. La frecuencia exacta está por confirmar.', pending: true },
    { q: '¿Cuánta Cafiza se usa?', a: 'La que indica la etiqueta del producto. La cantidad está por confirmar.', pending: true },
    { q: '¿Dónde compro Cafiza en México?', a: 'En la tienda en línea y las sucursales de Café Etrusca.' },
    { q: '¿Cuánto cuesta Cafiza?', a: 'Consulta el precio vigente en la ficha del producto en la tienda.' }
  ],
  cta: { text: 'Mantén tu barra limpia con productos Urnex.', links: [
    { label: 'Productos de limpieza', path: '/accesorios-para-poner-una-cafeteria/limpieza/' },
    { label: 'Sucursales', path: '/sucursales/' }
  ] }
};

/** Baratza confirmado por Héctor (20 oct 2026): URL definitiva. */
const MOLINOS: BlogArticle = {
  slug: 'molinos-para-cafeteria-fiorenzato-comandante-baratza',
  title: 'Fiorenzato F64 EVO vs Comandante vs Baratza | Café Etrusca',
  description:
    'Compara molinos para cafetería: Fiorenzato F64 EVO (eléctrico de espresso), Comandante C40 (manual) y Baratza. Para qué sirve cada uno y cuál elegir.',
  h1: 'Molinos de café para cafetería: Fiorenzato, Comandante o Baratza',
  kicker: 'Equipo',
  intro:
    'Fiorenzato F64 EVO es un molino eléctrico de espresso para barra comercial; Comandante C40 es un molino manual de precisión para métodos de filtrado y para el barista; Baratza es eléctrico de entrada para filtrado. Para una cafetería con espresso, el molino principal es el eléctrico; el manual es complemento.',
  hero: { src: IMG('maquinas/comandante-negro.webp'), alt: 'Molino manual Comandante negro', width: 2048, height: 2048,
    provisional: 'Imagen del sitio. El brief pide el Fiorenzato F64 EVO junto al Comandante C40 (1200×630).' },
  notes: [
    TODO('nombres reales de MMO-061 y MMO-062; fresas, tolva, voltaje, potencia y precios; versión de Comandante (¿C40 MK4?).')
  ],
  itemList: { name: 'Molinos comparados', items: [
    { name: 'Fiorenzato F64 EVO', path: '/maquinaria-y-equipo-para-cafeterias/molinos/' },
    { name: 'Comandante C40', path: '/maquinaria-y-equipo-para-cafeterias/molinos/' },
    { name: 'Baratza Encore' }
  ] },
  sections: [
    { h2: 'Tabla comparativa', blocks: [
      { t: 'table', caption: 'Comparativa de molinos', head: ['', 'Fiorenzato F64 EVO', 'Comandante C40', 'Baratza Encore'], rows: [
        ['Tipo', 'Eléctrico, espresso', 'Manual', 'Eléctrico'],
        ['Uso ideal', 'Barra comercial', 'Filtrado, barista', 'Filtrado, molino de entrada'],
        ['Fresas', PC, 'Acero inoxidable extra afiladas', PC],
        ['Capacidad', `Tolva ${PC}`, 'Frasco de 40 g (versión cherry)', 'Tolva de 225 g'],
        ['Voltaje', PC, 'No aplica', '110 V'],
        ['Colores / SKU', `${PC} (MMO-061 / MMO-062)`, 'Negro AAB-054, rojo AAB-053, cherry AAB-052', 'Blanco MMO-007, negro MMO-008'],
        ['Precio', PC, PC, PC]
      ] }
    ] },
    { h2: 'Fiorenzato F64 EVO', blocks: [
      { t: 'p', html: 'Molino eléctrico italiano para espresso, pensado para el ritmo de una barra comercial. Para barras con menos volumen existe también el Fiorenzato F4 EVO.' },
      { t: 'todo', html: TODO('diferencias entre F64 EVO y F64 EVO PRO, y especificaciones técnicas.') }
    ] },
    { h2: 'Comandante C40', blocks: [
      { t: 'p', html: 'Molino manual hecho en Alemania, con fresas de acero inoxidable extra afiladas. Se usa sobre todo para métodos de filtrado y es la herramienta personal de muchos baristas. Lo vendemos en negro, rojo y cherry.' },
      { t: 'todo', html: TODO('versión de Comandante que se vende (¿C40 MK4?).') }
    ] },
    { h2: 'Baratza', blocks: [
      { t: 'p', html: 'Baratza es una marca estadounidense de molinos eléctricos para filtrado. El Baratza Encore (tolva de 225 g, 110 V) es un molino de entrada para preparar métodos en barra o en casa; para espresso en servicio conviene un molino de espresso como el Fiorenzato.' },
      { t: 'p', html: `Consulta la ficha del <a href="https://tienda.cafeetrusca.com/producto/detalle/MMO-007/MOLINO-ELEC.-BARATZA-ENCORE-BLANCO-TOLVA-225g-110V" rel="noopener">Baratza Encore en nuestra tienda en línea</a> o revisa la categoría de ${A('/maquinaria-y-equipo-para-cafeterias/molinos/', 'molinos')}.` }
    ] },
    { h2: '¿Manual o eléctrico? ¿Para espresso o filtrado?', blocks: [
      { t: 'ul', items: [
        '<strong>Espresso en servicio:</strong> molino eléctrico de espresso, como el Fiorenzato F64 EVO.',
        '<strong>Métodos de filtrado en barra:</strong> un molino que dé molienda más gruesa y pareja; el Comandante es una opción manual.',
        '<strong>Para el barista:</strong> un manual de precisión como complemento, no como molino principal.'
      ] },
      { t: 'p', html: `Si vas a preparar métodos de filtrado, revisa los ${A('/accesorios-para-poner-una-cafeteria/metodo-extraccion/', 'accesorios para métodos de extracción')}, nuestra ${A('/blog/metodos-de-extraccion-de-cafe-comparativa/', 'comparativa de métodos')} y el ${A('/taller-de-brew-bar/', 'taller de brew bar')}.` }
    ] },
    { h2: 'Otros molinos que vendemos', blocks: [
      { t: 'p', html: `También tenemos molinos Ceado, Eureka y Pietro. Revísalos en la categoría de ${A('/maquinaria-y-equipo-para-cafeterias/molinos/', 'molinos')} y elige máquina con nuestra guía para ${A('/blog/como-elegir-maquina-de-espresso-para-cafeteria/', 'elegir máquina de espresso')}.` }
    ] },
    { h2: 'Limpieza del molino', blocks: [
      { t: 'p', html: `Las fresas acumulan aceites que cambian el sabor. Te explicamos cómo usar Grindz en ${A('/blog/como-limpiar-maquina-de-espresso-y-molino/', 'cómo limpiar tu máquina de espresso y molino')}.` }
    ] }
  ],
  webinarCta: { text: 'Aprende con nuestros expertos en el webinar en vivo de los jueves y elige mejor tu molino.' },
  faq: [
    { q: '¿Qué molino necesito para una cafetería?', a: 'Un molino eléctrico de espresso como el Fiorenzato F64 EVO para la barra; uno manual sirve para métodos.' },
    { q: '¿Qué es el Fiorenzato F64 EVO?', a: 'Un molino eléctrico italiano para espresso en cafetería.' },
    { q: '¿El Comandante C40 sirve para espresso?', a: 'Es manual y se usa sobre todo para filtrado; para servicio de espresso en cafetería no es práctico. Por confirmar con Héctor.', pending: true },
    { q: '¿Cuál es la diferencia entre F64 EVO y F64 EVO PRO?', a: 'Por confirmar con la ficha técnica; si no se confirma, esta pregunta se quita.', pending: true },
    { q: '¿Venden Baratza en México?', a: 'Sí, Café Etrusca vende molinos Baratza, como el Baratza Encore. Consulta la ficha en la tienda en línea.' },
    { q: '¿Cada cuándo se limpia el molino?', a: 'Revisa nuestra guía de limpieza con Grindz. La frecuencia está por confirmar.', pending: true }
  ],
  cta: { text: 'Te ayudamos a elegir el molino para tu barra.', links: [
    { label: 'Molinos', path: '/maquinaria-y-equipo-para-cafeterias/molinos/' },
    { label: 'Contacto', path: '/contacto/' }
  ] }
};

/* ============================== TANDA 4 ============================== */

const PUMPS: BlogArticle = {
  slug: 'cuantos-pumps-de-jarabe-por-bebida',
  title: 'Cuántos pumps de jarabe lleva cada bebida | Café Etrusca',
  description:
    'Cuántos pumps de jarabe poner por tamaño de vaso, cómo calcular cuántas bebidas rinde una botella y cuánto cuesta el jarabe por vaso en tu cafetería.',
  h1: 'Cuántos pumps de jarabe lleva cada bebida',
  kicker: 'Insumos',
  intro:
    'La cantidad de pumps depende del tamaño del vaso y de la receta de tu cafetería; lo importante es fijar una dosis por tamaño y usar siempre el mismo dosificador. Con los mililitros que entrega tu dosificador por pump puedes calcular cuántas bebidas rinde una botella de jarabe y cuánto te cuesta el jarabe en cada vaso.',
  hero: { src: IMG('insumos/line-defaults/jarabes-clasico.webp'), alt: 'Botella de jarabe Torani sabor roca de almendra de 750 ml', width: 197, height: 751,
    provisional: 'Imagen del sitio. El brief pide un barista dosificando jarabe Torani con dosificador (1200×630).' },
  notes: [TODO('mililitros por pump del dosificador Rieke (ficha AAC-046) y si Café Etrusca tiene una dosis estándar por tamaño de vaso.')],
  howTo: { name: 'Calcular cuántas bebidas rinde una botella de jarabe', steps: [
    { name: 'Mide los ml por pump', text: 'Revisa en la ficha de tu dosificador cuántos mililitros entrega en una presión completa, o mídelo con una probeta.' },
    { name: 'Calcula los ml por bebida', text: 'Multiplica los pumps que usas por bebida por los ml que entrega cada pump.' },
    { name: 'Divide la botella', text: 'Divide los ml de la botella entre los ml por bebida: el resultado es cuántas bebidas rinde.' }
  ] },
  sections: [
    { h2: 'Qué es un pump y cuánto mide', blocks: [
      { t: 'p', html: 'Un pump es lo que entrega el dosificador en una presión completa.' },
      { t: 'h3', text: 'Cada dosificador entrega una cantidad distinta' },
      { t: 'p', html: 'Los mililitros por pump cambian según la marca y el modelo del dosificador, así que tu receta debe basarse en el dosificador que usas en tu barra.' },
      { t: 'todo', html: TODO('ml por pump del dosificador Rieke (AAC-046).') }
    ] },
    { h2: 'Dosificación por tamaño de vaso', blocks: [
      { t: 'table', caption: 'Pumps de jarabe por tamaño de vaso', head: ['Tamaño de vaso', 'Pumps de jarabe', 'ml de jarabe'], rows: [
        ['Chico (__ oz)', PC, '= pumps × ml por pump'],
        ['Mediano (__ oz)', PC, '= pumps × ml por pump'],
        ['Grande (__ oz)', PC, '= pumps × ml por pump']
      ] },
      { t: 'todo', html: TODO('dosis estándar por tamaño (recetas de Café Etrusca o Torani). Si no existe un estándar propio, la tabla queda para que cada cafetería la llene.') }
    ] },
    { h2: 'Cuántas bebidas rinde una botella', blocks: [
      { t: 'p', html: '<strong>Bebidas por botella = ml de la botella ÷ (pumps por bebida × ml por pump)</strong>' },
      { t: 'p', html: 'Por ejemplo, con una botella de B ml, P pumps por bebida y M ml por pump, la botella rinde B ÷ (P × M) bebidas. Las botellas de jarabe Torani son de 750 ml.' },
      { t: 'todo', html: TODO('reconfirmar contra la ficha que la botella Torani es de 750 ml.') }
    ] },
    { h2: 'Cuánto cuesta el jarabe por vaso', blocks: [
      { t: 'p', html: '<strong>Costo de jarabe por vaso = precio de la botella ÷ bebidas por botella</strong>' },
      { t: 'p', html: `Suma ese costo al resto de los insumos de la bebida; te explicamos cómo en ${A('/blog/cuanto-cobrar-por-un-cafe/', 'cuánto cobrar por un café')}, o ${CALC_A('calcula el costo por bebida, jarabe incluido, con nuestra calculadora de precios')}.` },
      { t: 'todo', html: TODO('precio de la botella (o leerlo de la ficha en el build; nunca escrito a mano).') }
    ] },
    { h2: 'Cómo estandarizar la dosis en tu barra', blocks: [
      { t: 'ul', items: [
        'Usa el mismo dosificador en cada botella.',
        'Al cambiar de botella, purga el dosificador y revisa que entregue una presión completa.',
        'Pega una etiqueta con la dosis por tamaño en la barra.',
        'Ten la receta escrita por tamaño de vaso para todo el equipo.'
      ] }
    ] },
    { h2: 'Bebidas frías, calientes y sugar free', blocks: [
      { t: 'p', html: 'En bebidas frías el hielo diluye el sabor, y los jarabes sugar free pueden sentirse distinto en dulzor; ajusta la receta probándola en tu barra.' },
      { t: 'todo', html: TODO('dosis específicas para bebidas frías y sugar free.') }
    ] },
    { h2: 'Dónde comprar', blocks: [
      { t: 'p', html: `En Café Etrusca encuentras el dosificador Rieke, cuchara medidora y los ${A('/insumos-para-cafeterias/jarabes/torani/', 'jarabes Torani')}. Revisa todos los ${A('/insumos-para-cafeterias/jarabes/', 'jarabes')}, las ${A('/insumos-para-cafeterias/salsas/', 'salsas')} y aprende recetas en el ${A('/educacion/talleres/bebidas-frias/', 'taller de bebidas frías')}.` }
    ] }
  ],
  recipesCta: { text: 'Aplica tus dosis en recetas reales: inspírate con más recetas para tu cafetería.', label: 'Ver recetas con jarabes y salsas' },
  faq: [
    { q: '¿Cuántos pumps de jarabe lleva un latte?', a: 'Depende del tamaño del vaso y de tu receta; usa la tabla por tamaño de esta guía y mantén la misma dosis siempre. La dosis de referencia está por confirmar.', pending: true },
    { q: '¿Cuánto es un pump de jarabe?', a: 'Es lo que entrega el dosificador en una presión completa y cambia según la marca del dosificador; revisa la ficha de tu dosificador. Los ml del Rieke están por confirmar.', pending: true },
    { q: '¿Cuántas bebidas rinde una botella de jarabe de 750 ml?', a: 'Divide 750 ml entre los mililitros que usas por bebida (pumps × ml por pump).' },
    { q: '¿Cómo calculo el costo del jarabe por bebida?', a: 'Divide el precio de la botella entre el número de bebidas que rinde.' },
    { q: '¿Necesito un dosificador para cada botella?', a: 'Es recomendable para no mezclar sabores y mantener la dosis. Por confirmar si Café Etrusca lo recomienda así.', pending: true },
    { q: '¿Dónde compro dosificadores y jarabes Torani?', a: 'En Café Etrusca: dosificador Rieke y jarabes Torani en la tienda en línea.' }
  ],
  cta: { text: 'Encuentra jarabes Torani y dosificadores para tu barra.', links: [
    { label: 'Jarabes Torani', path: '/insumos-para-cafeterias/jarabes/torani/' },
    { label: 'Contacto', path: '/contacto/' }
  ] }
};

const COBRAR: BlogArticle = {
  slug: 'cuanto-cobrar-por-un-cafe',
  title: 'Cuánto cobrar por un café: costo por taza | Café Etrusca',
  description:
    'Calcula el costo por taza de espresso, americano y latte con una fórmula simple y define el precio de venta de tu café. Incluye tabla para tu cafetería.',
  h1: 'Cuánto cobrar por un café en tu cafetería',
  kicker: 'Emprender',
  intro:
    'Para saber cuánto cobrar por un café, primero calcula lo que te cuesta cada taza (café, leche, jarabe, vaso y tapa) y luego súmale tus gastos fijos y la ganancia que buscas. Esta guía trae la fórmula y una tabla para espresso, americano y latte que puedes llenar con tus propios costos.',
  hero: { src: IMG('educacion/cta-cafe.webp'), alt: 'Latte con arte latte en forma de hoja', width: 740, height: 430,
    provisional: 'Imagen del sitio. El brief pide espresso, americano y latte con una libreta de costeo (1200×630).' },
  notes: [TODO('gramos por bebida del estándar de Café Etrusca y precios de café, leche y desechables. No se usan precios de otras marcas ni de internet.')],
  howTo: { name: 'Calcular el costo de una taza de café', steps: [
    { name: 'Costo del café', text: 'Multiplica los gramos de café de la bebida por el precio por gramo (precio del kg ÷ 1000).' },
    { name: 'Suma leche y jarabe', text: 'Suma el costo de la leche y del jarabe o salsa que lleva la bebida.' },
    { name: 'Suma desechables', text: 'Suma el vaso, la tapa y lo demás que entregas con la bebida.' },
    { name: 'Define el precio', text: 'Divide el costo de insumos entre el porcentaje de costo que quieres manejar.' }
  ] },
  sections: [
    { h2: 'Cómo calcular el costo de una taza', blocks: [
      { t: 'h3', text: 'Café' },
      { t: 'p', html: '<strong>Costo del café = gramos por bebida × precio del kg ÷ 1000</strong>' },
      { t: 'linkCta', text: '¿Prefieres no hacer la cuenta a mano? Captura tus insumos y obtén el costo y el precio sugerido de cada bebida.', label: 'Calcula el precio de tus bebidas con nuestra calculadora', path: CALC },
      { t: 'h3', text: 'Leche' },
      { t: 'p', html: 'Costo de la leche = ml por bebida × precio del litro ÷ 1000.' },
      { t: 'h3', text: 'Jarabe o salsa' },
      { t: 'p', html: `Usa el costo por vaso que explicamos en ${A('/blog/cuantos-pumps-de-jarabe-por-bebida/', 'cuántos pumps de jarabe lleva cada bebida')}.` },
      { t: 'h3', text: 'Desechables' },
      { t: 'p', html: 'Vaso, tapa, popote, manga o servilleta: todo lo que sale con la bebida.' }
    ] },
    { h2: 'Tabla de costo por bebida', blocks: [
      { t: 'table', caption: 'Costo de insumos por bebida', head: ['Bebida', 'Café (g)', 'Leche (ml)', 'Jarabe (ml)', 'Vaso y tapa', 'Costo de insumos'], rows: [
        ['Espresso', PC, '—', '—', '[precio]', '= suma'],
        ['Americano', PC, '—', '—', '[precio]', '= suma'],
        ['Latte', PC, PC, 'Opcional (ver guía de pumps)', '[precio]', '= suma']
      ] },
      { t: 'todo', html: TODO('gramos y ml por bebida, y precios de café, leche y desechables.') }
    ] },
    { h2: 'Del costo al precio de venta', blocks: [
      { t: 'h3', text: 'Por porcentaje de costo' },
      { t: 'p', html: '<strong>Precio = costo de insumos ÷ porcentaje de costo objetivo</strong>. Si quieres que los insumos sean una fracción del precio, divide el costo entre esa fracción. El porcentaje lo define cada cafetería.' },
      { t: 'h3', text: 'Por costo más gastos y ganancia' },
      { t: 'p', html: '<strong>Precio = costo de insumos + gastos fijos por taza + ganancia</strong>. Los gastos fijos por taza salen de dividir tus gastos del mes entre las tazas que vendes.' },
      { t: 'todo', html: TODO('si se cita el rango de El Economista (mar 2026) de cuánto pesa el café en el precio de la taza; hay que reconfirmar el artículo antes.') }
    ] },
    { h2: 'Fija tu margen y evalúa tu propuesta', blocks: [
      { t: 'todo', html: MISSING('Cómo fijar los precios para tu cafetería', 'El inicio del texto') },
      { t: 'rescued', from: 'Cómo fijar los precios para tu cafetería', html: [
        '<strong>Fija el porcentaje de beneficio o rentabilidad que deseas obtener:</strong> ¿Cuánto quieres ganar?, ¿cuánto crees que valen tus productos? Te recomendamos que lo consideres en porcentaje, así te será más sencillo el manejo de tu negocio. Piénsalo como “Quiero tener un margen de utilidad del 25%, por cada producto vendido”.',
        'Recuerda que este porcentaje impactará en el método de fijación de precios y siempre toma en cuenta el tipo de mercado en el que te encuentras.',
        '<strong>Evalúa tu propuesta de fijación de precios.</strong> Este punto lo consideramos de suma importancia e indispensable para concluir con el proceso. Es necesario que tomes en cuenta:',
        '<ul><li>¿Qué propuesta le darás a tus futuros clientes?</li><li>¿Qué valor les dará tu producto y/o servicio para resolver sus necesidades?</li><li>¿Tu menú tiene un balance entre costos variables bajos y un producto de calidad?</li><li>¿Qué tan eficaz serás en resolver sus necesidades, en comparación con la competencia?</li></ul>'
      ] },
      { t: 'p', html: 'El 25 % es un ejemplo ilustrativo, no una recomendación: cada cafetería define su margen.' }
    ] },
    { h2: 'Gastos que se olvidan', blocks: [
      { t: 'ul', items: ['Renta.', 'Sueldos.', 'Luz, agua y gas.', 'Merma: bebidas que se tiran o se repiten.', 'Comisiones de la terminal de pago.'] }
    ] },
    { h2: 'Cuándo ajustar precios', blocks: [
      { t: 'p', html: 'Revisa tu costeo cada vez que suben tus insumos clave (café en grano, leche) o el dólar, y además de forma periódica, aunque nada haya cambiado.' }
    ] },
    { h2: 'Ejemplo', blocks: [
      { t: 'p', html: 'Si un latte lleva G gramos de café, L ml de leche, un vaso con tapa de precio V y quieres que los insumos sean una fracción F del precio: precio = (G × precio por gramo + L × precio por ml + V) ÷ F.' },
      { t: 'todo', html: TODO('si se publica un ejemplo con precios de Café Etrusca.') }
    ] },
    { h2: 'Siguiente paso', blocks: [
      { t: 'rescued', from: 'Cómo fijar los precios para tu cafetería', html: [
        `En Etrusca siempre queremos ver a tu negocio entre los mejores, por ello, si te quedó alguna duda en cuanto a costos, operación o cualquier otro tema relacionado al extraordinario y redituable mundo del café, ${A('/contacto/', '¡contáctanos!')}, tenemos una solución para ti.`,
        `No olvides preguntar por nuestro curso ${A('/emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria/', 'Emprendiendo Mi Negocio de Barra de Café y Cafetería')}, que ha catapultado cientos de proyectos al éxito.`
      ] },
      { t: 'p', html: `Aprende a costear tu menú completo en el curso ${A('/emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria/', 'Emprendiendo mi negocio de barra de café y cafetería')} y revisa nuestro ${A('/productos/cafe/', 'café')}: ${A('/productos/cafe/especialidad/', 'especialidad')} y ${A('/productos/cafe/premium/', 'premium')}. Para armar tu carta, lee ${A('/blog/que-vender-en-una-cafeteria/', 'qué vender en una cafetería')}, y para la técnica, la ${A('/educacion/talleres/formacion-barista/', 'formación barista')}.` }
    ] }
  ],
  webinarCta: { text: 'Aprende con nuestros expertos en el webinar en vivo de los jueves: costos, operación y más.' },
  faq: [
    { q: '¿Cuánto cobrar por un café en una cafetería?', a: 'Depende de tu costo por taza y tus gastos fijos; calcula el costo de insumos y divide entre el porcentaje de costo que quieras manejar.' },
    { q: '¿Cómo calculo el costo de una taza de café?', a: 'Multiplica los gramos de café por el precio por gramo y súmale leche, jarabe y desechables.' },
    { q: '¿Cuántos gramos de café lleva un espresso?', a: 'Por confirmar con el estándar de Café Etrusca y del curso de barista; si no hay uno, esta pregunta se quita.', pending: true },
    { q: '¿Qué porcentaje del precio debe ser el costo del café?', a: 'Cada cafetería lo define según sus gastos y su ganancia objetivo.' },
    { q: '¿Cada cuánto debo revisar mis precios?', a: 'Cada vez que suben tus insumos clave (café, leche, dólar) y de forma periódica.' },
    { q: '¿Dónde aprendo a costear mi menú?', a: 'En el curso Emprendiendo mi negocio de barra de café y cafetería de Café Etrusca.' }
  ],
  cta: { text: 'Aprende a costear y poner precio a tu menú.', links: [
    { label: 'Curso Emprendiendo mi negocio', path: '/emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria/' },
    { label: 'Ver café', path: '/productos/cafe/' }
  ] }
};

const VENDER: BlogArticle = {
  slug: 'que-vender-en-una-cafeteria',
  title: 'Qué vender en una cafetería: lista y productos | Etrusca',
  description:
    'Lista de bebidas y productos que puedes vender en tu cafetería: café, frappés, chai, tisanas, bubble tea y más, con los insumos y equipo que necesitas.',
  h1: 'Qué vender en una cafetería: bebidas y productos para tu carta',
  kicker: 'Emprender',
  intro:
    'En una cafetería se venden sobre todo bebidas de café (espresso, americano, capuchino, latte), bebidas frías y frappés, chai, té y tisanas, chocolate y, cada vez más, bubble tea. Arma tu carta con una base de café y suma 2–3 líneas sin café; abajo está la lista con los insumos y el equipo de cada una.',
  hero: { src: IMG('insumos/jarabes/hero-collage.webp'), alt: 'Bebidas frías de frutos rojos y naranja con perlas', width: 1757, height: 1600,
    provisional: 'Imagen del sitio. El brief pide una barra con latte, frappé, chai y bubble tea (1200×630).' },
  notes: [TODO('si está de acuerdo con la recomendación editorial de sumar 2–3 líneas sin café.')],
  itemList: { name: 'Líneas para la carta de una cafetería', items: [
    { name: 'Bebidas de café', path: '/productos/cafe/' },
    { name: 'Bebidas de café con sabor', path: '/insumos-para-cafeterias/jarabes/' },
    { name: 'Frappés y bebidas frías', path: '/insumos-para-cafeterias/bases-en-polvo/' },
    { name: 'Chai, té y tisanas', path: '/insumos-para-cafeterias/te/' },
    { name: 'Bubble tea', path: '/insumos-para-cafeterias/toppings/' },
    { name: 'Chocolate y bebidas de temporada', path: '/insumos-para-cafeterias/salsas/' }
  ] },
  sections: [
    { h2: 'Resumen de la carta', blocks: [
      { t: 'table', caption: 'Líneas de carta, insumos y equipo', head: ['Línea', 'Ejemplos', 'Insumos', 'Equipo'], rows: [
        ['Café', 'Espresso, americano, capuchino, latte, filtrados', 'Café en grano, leche', 'Máquina de espresso, molino, métodos'],
        ['Café con sabor', 'Latte de vainilla, caramelo', 'Jarabes, salsas', 'Dosificador'],
        ['Frappés y bebidas frías', 'Frappé, smoothies', 'Bases en polvo, purés', 'Licuadora'],
        ['Chai, té y tisanas', 'Chai latte, tisanas frías y calientes', 'Chai, té, tisanas', 'Agua caliente, jarras'],
        ['Bubble tea', 'Milk tea, frutales con perlas', 'Toppings, bases', 'Vaso y popote grueso'],
        ['Chocolate y temporada', 'Chocolate, pumpkin', 'Bases, salsas, toppings', 'Vaporizador']
      ] }
    ] },
    { h2: 'Bebidas de café', blocks: [
      { t: 'p', html: `Espresso, americano, capuchino y latte son la base de casi cualquier carta; los métodos de filtrado suman variedad. Necesitas ${A('/productos/cafe/', 'café')}, ${A('/maquinaria-y-equipo-para-cafeterias/espresso/', 'máquina de espresso')}, ${A('/maquinaria-y-equipo-para-cafeterias/molinos/', 'molino')} y, para filtrados, ${A('/accesorios-para-poner-una-cafeteria/metodo-extraccion/', 'métodos de extracción')} con sus ${A('/blog/accesorios-para-metodos-de-filtrado/', 'accesorios')}.` }
    ] },
    { h2: 'Bebidas de café con sabor', blocks: [
      { t: 'p', html: `Un latte de vainilla o caramelo se arma con tu espresso y un jarabe o salsa. Revisa los ${A('/insumos-para-cafeterias/jarabes/', 'jarabes')}, los ${A('/insumos-para-cafeterias/jarabes/torani/', 'jarabes Torani')} y las ${A('/insumos-para-cafeterias/salsas/', 'salsas')}.` }
    ] },
    { h2: 'Frappés y bebidas frías', blocks: [
      { t: 'p', html: `Con ${A('/insumos-para-cafeterias/bases-en-polvo/', 'bases en polvo')} (como ${A('/insumos-para-cafeterias/bases-en-polvo/chillout/', 'ChillOut')}), ${A('/insumos-para-cafeterias/pures/', 'purés')} y una ${A('/maquinaria-y-equipo-para-cafeterias/licuadoras/', 'licuadora')} sacas frappés y bebidas frías. Te explicamos cómo en ${A('/blog/frappe-para-cafeteria/', 'frappé para cafetería')}.` }
    ] },
    { h2: 'Chai, té y tisanas', blocks: [
      { t: 'p', html: `Para quien no toma café: ${A('/insumos-para-cafeterias/te/', 'té')}, chai (lee nuestra ${A('/blog/chai-david-rio-sabores/', 'guía de chai David Rio')}), ${A('/insumos-para-cafeterias/tisanas/', 'tisanas')} y ${A('/insumos-para-cafeterias/tisanas/chillout/', 'tisanas ChillOut')}. Más ideas en ${A('/blog/tisanas-para-cafeteria/', 'tisanas para cafetería')}.` }
    ] },
    { h2: 'Bubble tea', blocks: [
      { t: 'p', html: `El bubble tea suma una línea distinta con perlas y ${A('/insumos-para-cafeterias/toppings/', 'toppings')}. Te contamos qué insumos necesitas en ${A('/blog/bubble-tea-para-cafeteria-insumos/', 'bubble tea para cafetería')}.` }
    ] },
    { h2: 'Chocolate y bebidas de temporada', blocks: [
      { t: 'p', html: `El chocolate caliente y las bebidas de temporada renuevan la carta: usa ${A('/insumos-para-cafeterias/salsas/', 'salsas')} y busca ideas en la sesión ${A('/educacion/sesiones/pumpkin-vibes/', 'Pumpkin vibes')} y en nuestras ${A('/recetas/', 'recetas')}.` }
    ] },
    { h2: 'Por qué vender café de especialidad', blocks: [
      { t: 'p', html: `El café de especialidad le da a tu barra algo que contar: origen, proceso y perfil de taza. Atrae a clientes que buscan calidad y te permite ofrecer métodos de filtrado además del espresso. Revisa nuestro ${A('/productos/cafe/especialidad/', 'café de especialidad')}.` },
      { t: 'todo', html: MISSING('La importancia de vender café de especialidad', 'El texto completo') }
    ] },
    { h2: 'Cómo elegir qué poner en tu carta', blocks: [
      { t: 'ul', items: [
        '<strong>Por tipo de cafetería:</strong> una barra de especialidad se centra en café; una comercial suma más bebidas frías y de sabor.',
        '<strong>Por el equipo que ya tienes:</strong> empieza con lo que puedes preparar sin comprar más.',
        '<strong>Por temporada:</strong> bebidas frías en calor, pumpkin, chai y tisanas calientes en frío.'
      ] },
      { t: 'p', html: `Antes de sumar una bebida, calcula su costo: ${A('/blog/cuanto-cobrar-por-un-cafe/', 'cuánto cobrar por un café')}. Para probar varias opciones rápido, ${CALC_A('calcula el precio de cada bebida nueva con nuestra calculadora')}.` }
    ] },
    { h2: 'Aprende a prepararlas', blocks: [
      { t: 'p', html: `Revisa los ${A('/cursos-para-baristas-y-talleres-para-cafeterias/', 'cursos para baristas y talleres')} y el curso ${A('/emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria/', 'Emprendiendo mi negocio de barra de café y cafetería')}.` }
    ] }
  ],
  recipesCta: { text: '¿Ya sabes qué vender? Inspírate con más recetas para tu cafetería.', label: 'Ver recetas para tu menú' },
  webinarCta: { text: '¿Armando tu menú? Aprende con nuestros expertos en el webinar en vivo de los jueves.' },
  faq: [
    { q: '¿Qué se vende en una cafetería?', a: 'Principalmente bebidas de café calientes y frías, más frappés, chai, té, tisanas, chocolate y bubble tea; muchas suman pan o snacks.' },
    { q: '¿Qué bebidas no pueden faltar en una cafetería?', a: 'Espresso, americano, capuchino y latte son la base de casi cualquier carta.' },
    { q: '¿Qué productos necesito para abrir una cafetería?', a: 'Café en grano, leche, jarabes y salsas, bases para frappé, desechables, y equipo: máquina de espresso, molino y licuadora.' },
    { q: '¿Qué bebidas sin café puedo vender?', a: 'Chai, té, tisanas, chocolate, frappés de base cremosa y bubble tea.' },
    { q: '¿Qué vender en temporada de frío?', a: 'Bebidas calientes de temporada como pumpkin, chai y tisanas calientes.' },
    { q: '¿Dónde compro insumos para cafetería?', a: 'En Café Etrusca: café, jarabes, bases, té, tisanas, toppings, máquinas y accesorios.' }
  ],
  cta: { text: 'Encuentra todos los insumos para tu carta.', links: [
    { label: 'Insumos para cafetería', path: '/insumos-para-cafeterias/' },
    { label: 'Contacto', path: '/contacto/' }
  ] }
};

const FILTRADO: BlogArticle = {
  slug: 'accesorios-para-metodos-de-filtrado',
  title: 'Accesorios para café de filtrado: Brewista y oncero',
  description:
    'Qué necesitas para tu brew bar: tetera cuello de ganso Brewista, jarra de servicio (oncero), báscula y filtros. Guía de compra para cafeterías.',
  h1: 'Accesorios para métodos de filtrado: tetera, oncero y más',
  kicker: 'Brew bar',
  intro:
    'Para preparar café de filtrado en tu cafetería necesitas, además del dripper, una tetera o jarra de cuello de ganso para controlar el vertido, una báscula, filtros y un oncero o jarra de servicio. Aquí te explicamos para qué sirve cada uno y qué modelos tenemos en Café Etrusca.',
  hero: { src: IMG('accesorios/metodos-extraccion/hervidor-cuello-ganso-brewista.webp'), alt: 'Hervidor de cuello de ganso Brewista', width: 260, height: 260 },
  notes: [TODO('modelos Brewista, oncero, báscula y temporizador que se venden (nombres y SKU desde la tienda).')],
  itemList: { name: 'Accesorios para brew bar', items: [
    { name: 'Jarra de cuello de ganso Barista Space 600 ml' }, { name: 'Jarra de cuello de ganso Barista Space 850 ml' },
    { name: 'Jarra de cuello de ganso La Fenice 1200 ml' }, { name: 'Jarra de cuello de ganso La Fenice 700 ml' }
  ] },
  sections: [
    { h2: 'Qué lleva un brew bar', blocks: [
      { t: 'ul', items: ['Dripper o método de filtrado.', 'Filtros.', 'Tetera o jarra de cuello de ganso.', 'Báscula y temporizador.', 'Molino.', 'Oncero o jarra de servicio.'] }
    ] },
    { h2: 'Tetera o jarra de cuello de ganso', blocks: [
      { t: 'p', html: 'El cuello largo y delgado deja verter el agua despacio y con precisión sobre el café, que es lo que hace que un filtrado salga igual cada vez.' },
      { t: 'h3', text: 'Eléctrica o de estufa' },
      { t: 'p', html: 'La eléctrica con control de temperatura facilita repetir la receta; la de estufa con termómetro es una opción más sencilla.' },
      { t: 'h3', text: 'Brewista' },
      { t: 'todo', html: TODO('modelos Brewista que vende Café Etrusca, con nombre y SKU.') },
      { t: 'h3', text: 'Barista Space y La Fenice' },
      { t: 'p', html: 'Tenemos jarras de cuello de ganso Barista Space de 600 ml y de 850 ml con termómetro, y La Fenice de 1200 ml con termómetro y de 700 ml.' }
    ] },
    { h2: 'Oncero o jarra de servicio', blocks: [
      { t: 'p', html: 'El oncero es la jarra donde cae el café filtrado y desde la que se sirve.' },
      { t: 'todo', html: TODO('modelos de oncero en tienda (SKU).') }
    ] },
    { h2: 'Báscula y temporizador', blocks: [
      { t: 'p', html: 'Pesar el café y el agua y medir el tiempo es lo que permite repetir una receta.' },
      { t: 'todo', html: TODO('si Café Etrusca vende báscula y temporizador (SKU). Si no, esta sección se quita.') }
    ] },
    { h2: 'Filtros', blocks: [
      { t: 'p', html: `Cada método usa su filtro: V60, Chemex y Kalita. Encuéntralos en ${A('/accesorios-para-poner-una-cafeteria/metodo-extraccion/', 'métodos de extracción')} y compara los métodos en nuestra ${A('/blog/metodos-de-extraccion-de-cafe-comparativa/', 'tabla comparativa de métodos de extracción')}.` }
    ] },
    { h2: 'Dripper premium: Paragon de Nucleus', blocks: [
      { t: 'p', html: 'Para barras de especialidad que buscan un dripper distinto, tenemos el Paragon de Nucleus.' },
      { t: 'todo', html: TODO('descripción y ficha del Paragon que se vende.') }
    ] },
    { h2: 'Tabla comparativa', blocks: [
      { t: 'table', caption: 'Accesorios para métodos de filtrado', head: ['Accesorio', 'Modelo (SKU)', 'Capacidad', 'Termómetro / control de temperatura', 'Para qué'], rows: [
        ['Jarra cuello de ganso', 'Barista Space (ABC-094)', '600 ml', '—', 'Vertido'],
        ['Jarra cuello de ganso', 'Barista Space (ABC-099)', '850 ml', 'Con termómetro', 'Vertido'],
        ['Jarra cuello de ganso', 'La Fenice (ABC-093)', '1200 ml', 'Con termómetro', 'Vertido'],
        ['Jarra cuello de ganso', 'La Fenice (ABC-100)', '700 ml', '—', 'Vertido'],
        ['Tetera Brewista', PC, PC, PC, 'Vertido'],
        ['Oncero', PC, PC, '—', 'Servicio']
      ] }
    ] },
    { h2: 'Aprende a usarlos', blocks: [
      { t: 'p', html: `Practica con todo el equipo en el ${A('/taller-de-brew-bar/', 'taller de brew bar')} y la ${A('/educacion/talleres/formacion-barista/', 'formación barista')}. Completa tu barra con ${A('/accesorios-para-poner-una-cafeteria/barista-espresso/', 'accesorios de barista')}, ${A('/maquinaria-y-equipo-para-cafeterias/molinos/', 'molinos')} y ${A('/productos/cafe/especialidad/', 'café de especialidad')}. Para la carta, lee ${A('/blog/que-vender-en-una-cafeteria/', 'qué vender en una cafetería')}.` },
      { t: 'todo', html: TODO('qué fecha de la Experiencia Brew Bar & Cold Brew enlazar (las de octubre caducan).') }
    ] }
  ],
  webinarCta: { text: 'Aprende con nuestros expertos en el webinar en vivo de los jueves y saca más de tus métodos de filtrado.', podcast: true },
  faq: [
    { q: '¿Para qué sirve una jarra de cuello de ganso?', a: 'Para verter el agua despacio y con precisión sobre el café en métodos de filtrado como V60, Chemex o Kalita.' },
    { q: '¿Qué es un oncero?', a: 'Es la jarra donde cae el café filtrado y desde la que se sirve.' },
    { q: '¿Qué es Brewista?', a: 'Es una marca de teteras y accesorios para café de filtrado. Los modelos que vende Café Etrusca están por confirmar.', pending: true },
    { q: '¿Tetera eléctrica o de estufa?', a: 'La eléctrica con control de temperatura facilita repetir la receta; la de estufa con termómetro es una opción más sencilla.' },
    { q: '¿Qué necesito para armar un brew bar en mi cafetería?', a: 'Dripper, filtros, tetera de cuello de ganso, báscula, molino y oncero.' },
    { q: '¿Dónde compro accesorios para métodos de filtrado?', a: 'En Café Etrusca, en la categoría de métodos de extracción.' }
  ],
  cta: { text: 'Arma tu brew bar con nuestros accesorios.', links: [
    { label: 'Métodos de extracción', path: '/accesorios-para-poner-una-cafeteria/metodo-extraccion/' },
    { label: 'Comparativa de métodos', path: '/blog/metodos-de-extraccion-de-cafe-comparativa/' }
  ] }
};

/* ============================== TANDA 3 ============================== */

const BUBBLE: BlogArticle = {
  slug: 'bubble-tea-para-cafeteria-insumos',
  title: 'Bubble tea para tu cafetería: insumos y cómo empezar',
  description:
    'Qué necesitas para vender bubble tea: tapioca, perlas explosivas, bases como taro, popotes y vasos. Insumos ChillOut y taller en Café Etrusca.',
  h1: 'Bubble tea para tu cafetería: insumos, perlas y popotes',
  kicker: 'Bebidas frías',
  intro:
    'Para vender bubble tea en tu cafetería necesitas cinco cosas: una base (té, leche o polvo como taro), perlas (tapioca o perlas explosivas), popotes anchos para tapioca, vasos con tapa o sellado y utensilios para servir las perlas. En Café Etrusca encuentras insumos ChillOut y otras marcas, y un taller para aprender a prepararlo.',
  hero: { src: IMG('educacion/taller-bubble-tea.webp'), alt: 'Bubble tea con perlas de tapioca en vaso', width: 750, height: 375,
    provisional: 'Imagen del sitio. El brief pide vasos de bubble tea con tapioca y perlas explosivas en barra (1200×630).' },
  notes: [TODO('nombre y SKU de ICT-056 e ICT-038, cuchara y perlas mora azul; contenido y precio del KIT-003; si se vende selladora o “máquina de boba”; mayoreo y envío.')],
  sections: [
    { h2: 'Qué es el bubble tea', blocks: [
      { t: 'p', html: 'Es una bebida, fría o caliente, a base de té, leche o una base en polvo, que se sirve con perlas en el fondo y un popote ancho para tomarlas.' }
    ] },
    { h2: 'Insumos para bubble tea', blocks: [
      { t: 'h3', text: 'Bases: té, leche y polvos' },
      { t: 'p', html: `La base puede ser ${A('/insumos-para-cafeterias/te/', 'té')}, leche o un polvo como el taro de ${A('/insumos-para-cafeterias/bases-en-polvo/chillout/', 'ChillOut')}.` },
      { t: 'h3', text: 'Tapioca e instantánea' },
      { t: 'p', html: 'La tapioca es la perla masticable que se cuece; la instantánea se prepara en menos tiempo. Sigue siempre las instrucciones del empaque.' },
      { t: 'todo', html: TODO('tiempo de preparación de la tapioca instantánea según la ficha.') },
      { t: 'h3', text: 'Perlas explosivas' },
      { t: 'p', html: `Tienen una capa delgada con jugo de sabor dentro y se sirven listas. Las tenemos en fresa (ICT-028), maracuyá (ICT-034), cereza (ICT-040), manzana verde (ICT-033) y mango (ICT-031), dentro de ${A('/insumos-para-cafeterias/toppings/', 'toppings')}.` },
      { t: 'todo', html: TODO('SKU de las perlas de mora azul.') },
      { t: 'h3', text: 'Popotes, vasos y cucharas' },
      { t: 'p', html: `Popotes de papel para tapioca en paquete de 50 piezas (ICT-051) y vasos y accesorios en ${A('/accesorios-para-poner-una-cafeteria/bebidas-frias/', 'accesorios para bebidas frías')}.` },
      { t: 'todo', html: TODO('SKU de la cuchara para perlas.') },
      { t: 'h3', text: 'Equipo: selladora y licuadora' },
      { t: 'p', html: `Para versiones frappé necesitas una ${A('/maquinaria-y-equipo-para-cafeterias/licuadoras/', 'licuadora')}.` },
      { t: 'todo', html: TODO('si Café Etrusca vende selladora o máquina para boba tea.') }
    ] },
    { h2: 'Kit Bubble Tea', blocks: [
      { t: 'p', html: 'Tenemos un kit para empezar a vender bubble tea (KIT-003).' },
      { t: 'todo', html: TODO('contenido y precio del KIT-003.') }
    ] },
    { h2: 'Cómo ponerlo en tu menú', blocks: [
      { t: 'ul', items: [
        'Ofrécelo frío en calor y caliente en temporada fría.',
        'Deja que el cliente elija perla: tapioca o explosiva.',
        'Usa nombres de sabor claros y fotos con las perlas visibles.'
      ] },
      { t: 'p', html: `Si estás armando tu carta, lee ${A('/blog/que-vender-en-una-cafeteria/', 'qué vender en una cafetería')} y ${A('/blog/como-abrir-una-cafeteria-en-mexico/', 'cómo abrir una cafetería en México')}.` }
    ] },
    { h2: 'Aprende a prepararlo', blocks: [
      { t: 'p', html: `Café Etrusca imparte el ${A('/taller-de-bubble-tea-&-iced-coffee/', 'taller de Bubble Tea & Iced Coffee')} y el ${A('/taller-de-bubble-tea-especializado/', 'taller de Bubble Tea Especializado')} en varias sedes.` }
    ] },
    { h2: 'Recetas con perlas', blocks: [
      { t: 'ul', items: [A('/recetas/bubble-pumpkin/', 'Bubble pumpkin')] },
      { t: 'p', html: `Más ideas en nuestras ${A('/recetas/', 'recetas')}.` }
    ] }
  ],
  recipesCta: { text: 'Inspírate con más recetas para tu cafetería: bubble tea, iced coffee y más.', label: 'Ver todas las recetas' },
  webinarCta: { text: 'Aprende con nuestros expertos en el webinar en vivo de los jueves.' },
  faq: [
    { q: '¿Qué necesito para vender bubble tea en mi cafetería?', a: 'Una base o té, perlas (tapioca o perlas explosivas), popotes anchos para tapioca, vasos con tapa o sellado y una cuchara o colador para servir las perlas. En Café Etrusca encuentras estos insumos y un taller para aprender a prepararlo.' },
    { q: '¿Qué diferencia hay entre tapioca y perlas explosivas?', a: 'La tapioca es una perla masticable que se cuece; las perlas explosivas tienen una capa delgada con jugo de sabor dentro y se sirven listas. Muchas cafeterías ofrecen las dos.' },
    { q: '¿Qué es la tapioca instantánea?', a: 'Es tapioca que se prepara en menos tiempo que la tradicional. El tiempo exacto depende de la marca: sigue las instrucciones del empaque.' },
    { q: '¿Qué popote se usa para tapioca?', a: 'Uno de diámetro ancho para que pase la perla. Café Etrusca vende popotes de papel para tapioca en paquete de 50 piezas.' },
    { q: '¿Hay curso de bubble tea?', a: 'Sí. Café Etrusca imparte el taller de Bubble Tea & Iced Coffee y un taller de Bubble Tea Especializado en varias sedes.' },
    { q: '¿Qué es el taro?', a: 'Es un tubérculo de sabor dulce y color morado que se usa en polvo como base de bebidas; ChillOut tiene base de taro.' }
  ],
  cta: { text: 'Encuentra perlas, bases y popotes para tu bubble tea.', links: [
    { label: 'Toppings y perlas', path: '/insumos-para-cafeterias/toppings/' },
    { label: 'Contacto', path: '/contacto/#contacto-form' }
  ], todo: TODO('condiciones de mayoreo y envío.') }
};

const SIFON: BlogArticle = {
  slug: 'sifon-para-crema-batida-capsulas-n2o',
  title: 'Sifón para crema batida y cápsulas N2O: guía',
  description:
    'Cómo elegir sifón para crema batida y cápsulas de óxido nitroso (N2O) para tu cafetería: tamaños, refacciones Bestwhip y uso seguro.',
  h1: 'Sifón para crema batida y cápsulas N2O: guía de compra',
  kicker: 'Accesorios',
  intro:
    'Un sifón para crema batida es un recipiente a presión que, con una cápsula de óxido nitroso (N2O), convierte crema líquida en crema batida al momento. Para una cafetería conviene elegir el tamaño según cuántas bebidas con crema vendes, usar solo cápsulas de N2O para crema y tener a la mano duyas y refacciones.',
  hero: { src: IMG('recetas/recetas-hero-frappe.webp'), alt: 'Frappé con crema batida y fresa', width: 421, height: 926,
    provisional: 'PLACEHOLDER: no hay foto de sifón en el sitio. El brief pide un sifón sirviendo crema sobre un frappé (1200×630).' },
  notes: [TODO('qué sifones y cápsulas vende hoy (marcas, capacidades, SKU); si se publican indicaciones de uso propias o solo se remite al fabricante; venta de cápsulas por caja o mayoreo.')],
  sections: [
    { h2: 'Qué es y para qué se usa en cafetería', blocks: [
      { t: 'p', html: `Sirve para coronar frappés, mokas y bebidas de temporada con crema batida hecha al momento. Mira ideas en ${A('/recetas/pumpkin-cold-brew/', 'Pumpkin cold brew')}, ${A('/recetas/frappe-mexicano/', 'Frappé mexicano')} y nuestra guía de ${A('/blog/menu-pumpkin-bebidas-de-otono-cafeteria/', 'menú pumpkin')}.` }
    ] },
    { h2: 'Cómo elegir un sifón', blocks: [
      { t: 'h3', text: 'Capacidad' },
      { t: 'p', html: 'Elige según cuántas bebidas con crema vendes: un sifón más grande rinde más entre recargas.' },
      { t: 'todo', html: TODO('capacidades que vende Café Etrusca (por ejemplo 500 ml o 1 L).') },
      { t: 'h3', text: 'Material' },
      { t: 'p', html: 'Los hay de aluminio, más ligeros, y de acero inoxidable, más resistentes al uso diario.' },
      { t: 'h3', text: 'Marcas' },
      { t: 'todo', html: TODO('si ISI y Bestwhip están en tienda.') }
    ] },
    { h2: 'Cápsulas N2O, “de nitrógeno” y CO2', blocks: [
      { t: 'p', html: 'En cafetería se les dice “cápsulas de nitrógeno”, pero las de crema batida son de óxido nitroso (N2O). Las de CO2 son para sodas y no sirven para crema.' },
      { t: 'todo', html: TODO('gramos por cápsula según la ficha.') }
    ] },
    { h2: 'Refacciones', blocks: [
      { t: 'p', html: `Vendemos duya tulipán (AAC-007) y cargador (AAC-009) Bestwhip para sifón de crema batida. Encuentra más en ${A('/accesorios-para-poner-una-cafeteria/', 'accesorios para cafetería')}.` },
      { t: 'todo', html: TODO('SKU de empaques y en qué subcategoría vive el sifón (barista y espresso o bebidas frías).') }
    ] },
    { h2: 'Uso, limpieza y seguridad', blocks: [
      { t: 'p', html: 'Sigue siempre el instructivo del fabricante para cargar, usar y limpiar tu sifón, y usa solo cápsulas compatibles con tu modelo.' }
    ] },
    { h2: 'No es un sifón japonés', blocks: [
      { t: 'p', html: `El sifón japonés es un método para extraer café con vapor y vacío; el de crema batida trabaja con crema a presión. Si buscas el de café, revisa ${A('/accesorios-para-poner-una-cafeteria/metodo-extraccion/', 'métodos de extracción')} y nuestra ${A('/blog/metodos-de-extraccion-de-cafe-comparativa/', 'comparativa de métodos')}.` }
    ] }
  ],
  recipesCta: { text: 'Pon la crema batida en práctica: inspírate con más recetas para tu cafetería.', label: 'Ver recetas con crema batida y más' },
  faq: [
    { q: '¿Qué es un sifón para crema batida?', a: 'Es un recipiente a presión que, con una cápsula de óxido nitroso (N2O), convierte crema líquida en crema batida al momento. Se usa en cafeterías para frappés, mokas y bebidas de temporada.' },
    { q: '¿Las cápsulas de nitrógeno son lo mismo que las de óxido nitroso?', a: 'En cafetería se les dice «cápsulas de nitrógeno», pero las de crema batida son de óxido nitroso (N2O). No uses cápsulas de CO2, que son para sodas.' },
    { q: '¿Cuántas cápsulas lleva un sifón?', a: 'Depende de la capacidad del sifón y del fabricante. Revisa el instructivo de tu sifón; Café Etrusca te asesora con el modelo que compres.' },
    { q: '¿Qué tamaño de sifón conviene para una cafetería?', a: 'Depende de cuántas bebidas con crema vendas. Pregunta a Café Etrusca por los tamaños disponibles.' },
    { q: '¿El sifón de crema batida es lo mismo que el sifón japonés?', a: 'No. El sifón japonés es un método para extraer café con vapor; el sifón de crema batida sirve para crema a presión.' },
    { q: '¿Venden refacciones para sifón?', a: 'Sí. Café Etrusca vende duyas y cargadores de repuesto Bestwhip para sifón de crema batida.' }
  ],
  cta: { text: 'Pregúntanos por sifones, cápsulas y refacciones.', links: [
    { label: 'Contacto', path: '/contacto/#contacto-form' },
    { label: 'Taller de bebidas frías', path: '/educacion/talleres/bebidas-frias/' }
  ] }
};

const PUMPKIN_RECETAS: Array<[string, string]> = [
  ['pumpkin-cold-brew', 'Pumpkin cold brew'], ['dirty-pumpkin-chai', 'Dirty pumpkin chai'],
  ['calabaza-brulee-latte', 'Calabaza brûlée latte'], ['mokalabaza-latte', 'Mokalabaza latte'],
  ['affogato-de-otono', 'Affogato de otoño'], ['bubble-pumpkin', 'Bubble pumpkin'],
  ['calabaza-y-espresso-latte', 'Calabaza y espresso latte'], ['calabaza-y-matcha-latte', 'Calabaza y matcha latte'],
  ['calabaza-brulee', 'Calabaza brûlée'], ['dulce-de-calabaza-molecular', 'Dulce de calabaza molecular']
];

const PUMPKIN: BlogArticle = {
  slug: 'menu-pumpkin-bebidas-de-otono-cafeteria',
  title: 'Menú pumpkin: bebidas de otoño para tu cafetería',
  description:
    'Ideas de bebidas pumpkin y de otoño para tu cafetería con Torani, Hollander y ChillOut: latte, cold brew, chai y frappé, con recetas.',
  h1: 'Menú pumpkin y bebidas de otoño para tu cafetería',
  kicker: 'Temporada',
  intro:
    'Para armar un menú de otoño en tu cafetería, combina un sabor pumpkin o de calabaza (salsa, jarabe o base en polvo) con bebidas que ya vendes: latte, cold brew, chai y frappé. Con Torani, Hollander y ChillOut puedes ofrecer versiones calientes, frías y sin azúcar.',
  hero: { src: IMG('recetas/calabaza/pumpkin-cold-brew.webp'), alt: 'Pumpkin cold brew, bebida fría de otoño con calabaza', width: 481, height: 519 },
  notes: [TODO('SKU vigentes de Torani Pumpkin Spice y Hollander pumpkin pie y su disponibilidad de temporada; si se publica con el lanzamiento aunque la temporada esté cerrando.')],
  itemList: { name: 'Recetas de otoño', items: PUMPKIN_RECETAS.map(([s, n]) => ({ name: n, path: `/recetas/${s}/` })) },
  sections: [
    { h2: 'Insumos pumpkin y de calabaza', blocks: [
      { t: 'ul', items: [
        'Salsa Torani Puremade Pumpkin Pie (ISA-022).',
        'Jarabe Torani Pumpkin Pie sin azúcar (IJA-125).',
        'Jarabe Torani Pumpkin Spice (SKU por confirmar).',
        'Base en polvo ChillOut Dulce de Calabaza (IBP-064 / IBP-265).',
        'Salsa Hollander pumpkin pie (SKU por confirmar).'
      ] },
      { t: 'p', html: `Encuéntralos en ${A('/insumos-para-cafeterias/salsas/', 'salsas')}, ${A('/insumos-para-cafeterias/jarabes/', 'jarabes')}, ${A('/insumos-para-cafeterias/jarabes/torani/', 'jarabes Torani')} y ${A('/insumos-para-cafeterias/bases-en-polvo/chillout/', 'ChillOut')}.` }
    ] },
    { h2: 'Salsa, jarabe o base: cuál usar', blocks: [
      { t: 'ul', items: [
        '<strong>Salsa:</strong> más espesa, aporta cuerpo y color; ideal en lattes y para decorar.',
        '<strong>Jarabe:</strong> líquido, se disuelve fácil en bebidas frías y calientes; hay versión sin azúcar.',
        '<strong>Base en polvo:</strong> da textura y sabor en frappés y bebidas licuadas.'
      ] }
    ] },
    { h2: 'Recetas de otoño del sitio', blocks: [
      { t: 'ul', items: PUMPKIN_RECETAS.map(([s, n]) => A(`/recetas/${s}/`, n)) },
      { t: 'p', html: 'Las dosis están en cada receta.' }
    ] },
    { h2: 'Cómo lanzar el menú de temporada', blocks: [
      { t: 'ul', items: [
        'Lánzalo en septiembre u octubre y mantenlo hasta noviembre.',
        'Ponle un nombre de temporada fácil de recordar.',
        'Muéstralo en vitrina, pizarrón y redes.',
        'Ofrece una versión sin azúcar.',
        `Corona con crema batida: te explicamos el ${A('/blog/sifon-para-crema-batida-capsulas-n2o/', 'sifón para crema batida')}.`
      ] }
    ] },
    { h2: 'Aprende en una sesión', blocks: [
      { t: 'ul', items: [
        A('/educacion/sesiones/pumpkin-vibes/', 'Pumpkin vibes'),
        A('/educacion/sesiones/un-otono-calido/', 'Un otoño cálido'),
        A('/educacion/sesiones/sorbos-de-chillout-en-otono/', 'Sorbos de ChillOut en otoño'),
        A('/educacion/sesiones/cafe-de-temporada/', 'Café de temporada')
      ] }
    ] },
    { h2: 'Después del otoño', blocks: [
      { t: 'p', html: `Sigue con ${A('/blog/bebidas-de-dia-de-muertos-para-cafeteria/', 'bebidas de Día de Muertos')} y recetas de invierno como el ${A('/recetas/noche-de-invierno-latte/', 'Noche de invierno latte')}. ¿Y en diciembre? Arma tu ${A('/blog/bebidas-navidenas-para-cafeteria/', 'menú de bebidas navideñas')}.` }
    ] }
  ],
  recipesCta: { text: '¿Buscas más ideas de temporada? Inspírate con más recetas para tu cafetería.', label: 'Explorar recetas de bebidas para tu menú' },
  faq: [
    { q: '¿Qué bebidas de otoño puedo poner en mi cafetería?', a: 'Latte, cold brew, chai y frappé con sabor pumpkin o calabaza, hechos con salsa, jarabe o base en polvo. Café Etrusca tiene recetas como Pumpkin Cold Brew, Dirty Pumpkin Chai y Calabaza Brûlée Latte.' },
    { q: '¿Qué diferencia hay entre salsa y jarabe pumpkin?', a: 'La salsa es más espesa y aporta cuerpo y color; el jarabe es líquido y se disuelve fácil en bebidas frías y calientes. Muchas cafeterías usan los dos.' },
    { q: '¿Qué productos pumpkin vende Café Etrusca?', a: 'Salsa Torani Puremade Pumpkin Pie, jarabe Torani Pumpkin Pie sin azúcar, base en polvo ChillOut Dulce de Calabaza y salsa Hollander pumpkin pie, según disponibilidad de temporada.' },
    { q: '¿Cuándo empiezo a vender bebidas de otoño?', a: 'Muchas cafeterías las lanzan en septiembre u octubre y las mantienen hasta noviembre.' },
    { q: '¿Hay talleres de bebidas de otoño?', a: 'Sí. Café Etrusca tiene sesiones de temporada como Pumpkin Vibes, Un otoño cálido y Sorbos de ChillOut en otoño.' },
    { q: '¿Puedo hacer bebidas pumpkin sin azúcar?', a: 'Sí, con jarabe Torani Pumpkin Pie Sugar Free.' }
  ],
  cta: { text: 'Prepara tu menú de otoño con salsas, jarabes y bases.', links: [
    { label: 'Jarabes Torani', path: '/insumos-para-cafeterias/jarabes/torani/' },
    { label: 'Salsas', path: '/insumos-para-cafeterias/salsas/' }
  ] }
};

const TISANAS: BlogArticle = {
  slug: 'tisanas-para-cafeteria',
  title: 'Tisanas para cafetería: qué son y cómo venderlas',
  description:
    'Qué es una tisana, en qué se distingue del té y cómo ponerla en el menú de tu cafetería en caliente y en frío. Ideas, recetas y tisanas ChillOut.',
  h1: 'Tisanas para cafetería: qué son, cómo prepararlas y venderlas',
  kicker: 'Bebidas sin café',
  intro:
    'Una tisana es una infusión de frutas, flores, hierbas o especias que no lleva hoja de té y generalmente no tiene cafeína. En una cafetería funciona como la bebida sin café del menú: se sirve caliente en temporada fría, y fría o en limonadas en verano.',
  hero: { src: IMG('insumos/tisanas/hero-drinks.webp'), alt: 'Tisana frutal roja en tetera de vidrio con taza y frutos rojos', width: 813, height: 636 },
  notes: [TODO('dosis, tiempo y temperatura en caliente y en frío, rendimiento por bolsa y cafeína por sabor; SKU de mango maracuyá; si las recetas de té helado y de moras con jamaica llevan tisana.')],
  sections: [
    { h2: 'Qué es una tisana', blocks: [
      { t: 'p', html: 'Son infusiones de frutas, hierbas y flores, generalmente sin cafeína. No llevan hoja de té.' }
    ] },
    { h2: 'Tisana, té e infusión', blocks: [
      { t: 'p', html: `El té viene de la planta Camellia sinensis (té negro, verde, blanco). La tisana no lleva esa hoja: se hace con frutas, flores, hierbas o especias. “Infusión” es el nombre general de preparar cualquiera de las dos en agua caliente. Revisa nuestros ${A('/insumos-para-cafeterias/te/', 'tés')} si buscas la versión con hoja de té.` }
    ] },
    { h2: 'Tipos de tisana', blocks: [
      { t: 'ul', items: [
        '<strong>Frutales:</strong> como las tisanas ChillOut.',
        '<strong>Florales:</strong> con flores como jamaica o lavanda.',
        '<strong>Herbales:</strong> como la tisana Eurote de manzanilla y lavanda.'
      ] },
      { t: 'p', html: `Mira todas las ${A('/insumos-para-cafeterias/tisanas/', 'tisanas')}.` }
    ] },
    { h2: 'Cómo prepararla en caliente y en frío', blocks: [
      { t: 'h3', text: 'En caliente' },
      { t: 'p', html: 'Infusiona la tisana en agua caliente y sírvela en taza o tetera.' },
      { t: 'h3', text: 'En frío' },
      { t: 'p', html: 'Prepárala, enfríala y sírvela con hielo, o úsala como base de limonadas y sodas.' },
      { t: 'p', html: 'Mientras confirmamos la receta de la casa, sigue la ficha de cada producto.' },
      { t: 'todo', html: TODO('dosis, tiempo y temperatura en caliente y en frío (de Café Etrusca o ChillOut).') }
    ] },
    { h2: 'Cómo venderla en tu menú', blocks: [
      { t: 'ul', items: [
        'Preséntala como la opción sin café del menú.',
        'Funciona muy bien por la tarde y la noche.',
        'Caliente en temporada fría, fría o en limonada en verano.',
        'Pon el nombre del sabor y el color visibles en la carta.'
      ] },
      { t: 'p', html: `Aprende a preparar y costear bebidas frías en el ${A('/educacion/talleres/bebidas-frias/', 'taller de bebidas frías')}.` }
    ] },
    { h2: 'Recetas con tisana', blocks: [
      { t: 'ul', items: [A('/recetas/strawberry-matcha-lemonade/', 'Strawberry matcha lemonade')] }
    ] },
    { h2: 'Tisanas ChillOut que vendemos', blocks: [
      { t: 'p', html: 'ChillOut tiene tisanas frutales en bolsa de 250 g, en sabores como mango fresa, fresa kiwi y moras, que se preparan en caliente o en frío.' },
      { t: 'p', html: `Conoce sabores y presentaciones en ${A('/insumos-para-cafeterias/tisanas/chillout/', 'tisanas ChillOut')}.` }
    ] }
  ],
  recipesCta: { text: 'Inspírate con más recetas para tu cafetería, también con tisanas y té.', label: 'Ver recetas de bebidas calientes y frías' },
  faq: [
    { q: '¿Qué es una tisana?', a: 'Es una infusión de frutas, flores, hierbas o especias que no lleva hoja de té. Por eso se distingue del té, que viene de la planta Camellia sinensis.' },
    { q: '¿La tisana tiene cafeína?', a: 'Generalmente no, porque no lleva hoja de té ni café. Revisa la ficha de cada producto para confirmarlo.' },
    { q: '¿Se puede servir fría?', a: 'Sí. La misma tisana se sirve caliente o fría con hielo, y sirve de base para limonadas y sodas.' },
    { q: '¿Cómo vendo tisanas en mi cafetería?', a: 'Ofrécela como la opción sin café del menú: caliente en temporada fría y fría en verano, con nombre de sabor y color visibles en la carta.' },
    { q: '¿Qué tisanas vende Café Etrusca?', a: 'Tisanas frutales ChillOut en bolsa de 250 g, en sabores como mango fresa, fresa kiwi y moras, y tisanas Eurote.' },
    { q: '¿Dónde aprendo a preparar tisanas?', a: 'En el taller de Bebidas Frías de Café Etrusca y en sesiones de temporada como Tisanas para las posadas.' }
  ],
  cta: { text: 'Suma tisanas a tu menú.', links: [
    { label: 'Tisanas ChillOut', path: '/insumos-para-cafeterias/tisanas/chillout/' },
    { label: 'Sesión Tisanas para las posadas', path: '/educacion/sesiones/tisanas-para-las-posadas/' },
    { label: 'Contacto', path: '/contacto/#contacto-form' }
  ] }
};

const ABRIR_PASOS: Array<[string, string]> = [
  ['Elige tu modelo', 'Decide entre barra de café, cafetería comercial o cafetería de especialidad.'],
  ['Ubicación y local', 'Elige un local con el flujo de gente y la instalación que pide tu modelo.'],
  ['Trámites', 'Revisa en tu municipio los permisos y avisos necesarios para abrir.'],
  ['Equipo', 'Cotiza máquina de espresso, molino, licuadora y accesorios de barra según tu volumen.'],
  ['Insumos y menú', 'Arma un menú corto con una base de café y elige sus insumos.'],
  ['Costos, precios e inversión', 'Calcula el costo de cada bebida y pide cotización de equipo e insumos.'],
  ['Capacitación', 'Capacítate a ti y a tu equipo en preparación, costeo y servicio.'],
  ['Mantenimiento', 'Programa limpieza diaria y mantenimiento preventivo del equipo.']
];

const ABRIR: BlogArticle = {
  slug: 'como-abrir-una-cafeteria-en-mexico',
  title: 'Cómo abrir una cafetería en México: guía paso a paso',
  description:
    'Pasos para abrir una cafetería en México: elige modelo (barra, comercial o especialidad), equipo, insumos, trámites y capacitación.',
  h1: 'Cómo abrir una cafetería en México: modelos, equipo e insumos',
  kicker: 'Emprender',
  intro:
    'Para abrir una cafetería en México primero elige el modelo (barra de café, cafetería comercial o de especialidad); después define local y trámites, equipo, insumos y menú, y capacita a tu equipo antes de abrir. La inversión cambia mucho según el modelo y el local, por eso conviene cotizar equipo e insumos desde el principio.',
  hero: { src: IMG('accesorios/subcategorias/hero-barista-espresso.webp'), alt: 'Jarra de leche, tamper, báscula y accesorios de barista sobre una barra', width: 1659, height: 948,
    provisional: 'Imagen del sitio. El brief pide una barra con máquina de espresso y molino lista para abrir (1200×630).' },
  notes: [TODO('rangos de inversión: no se publica ninguno salvo cifras propias; lista de trámites o fuente oficial.')],
  sections: [
    { h2: 'Paso 1: Elige tu modelo', id: 'paso-1', blocks: [
      { t: 'h3', text: 'Barra de café' },
      { t: 'p', html: 'Ocupa poco espacio y equipo, con un menú corto y servicio rápido, muchas veces para llevar.' },
      { t: 'h3', text: 'Cafetería comercial' },
      { t: 'p', html: 'Con mesas y un menú más amplio, que suele sumar bebidas frías, de sabor y alimentos. Pide más inversión y personal.' },
      { t: 'h3', text: 'Cafetería de especialidad' },
      { t: 'p', html: 'Se centra en café de origen y métodos de extracción. Vende calidad y la experiencia de la preparación.' },
      { t: 'p', html: `Antes de decidir, revisa los ${A('/blog/errores-al-abrir-una-cafeteria/', 'errores más comunes al abrir una cafetería')}.` }
    ] },
    { h2: 'Paso 2: Ubicación y local', id: 'paso-2', blocks: [
      { t: 'ul', items: [
        'Observa el flujo de gente a distintas horas y días.',
        'Identifica quién pasa: oficinas, estudiantes, vecinos.',
        'Revisa la competencia cercana.',
        'Confirma que el local tenga la instalación eléctrica, el agua y el drenaje que pide tu equipo.'
      ] },
      { t: 'img', src: IMG('blog/como-abrir-una-cafeteria-en-mexico/ubicacion-cafeteria.webp'), alt: 'Clientes y baristas en la barra de una cafetería con mucho movimiento', width: 1600, height: 494 },
      { t: 'rescued', from: 'Cómo elegir la ubicación perfecta para tu cafetería (12 sep 2023)', html: [
        'La ubicación es un aspecto indispensable para el éxito en este tipo de emprendimientos, por lo que, no solo debes fijarte en los metros de tu local, el potencial de los clientes y realizar una investigación exploratoria y descriptiva. Hay muchos otros factores que debes tomar en cuenta, por ejemplo, el tipo de zona:',
        '<ul><li><strong>Aislada pero de tránsito peatonal:</strong> Por lo regular presenta pocos competidores y es apropiada para la venta de productos de compra habitual y de compra impulsiva, ya que se orienta a la comodidad/proximidad del consumidor.</li><li><strong>Comercial:</strong> Abarca un gran número de establecimientos que proporcionan una oferta variada, tanto en productos como en precios, y el tráfico peatonal y vehicular son muy intensos.</li><li><strong>Centro comercial:</strong> La diferencia con la zona comercial es que se trata de centros comerciales organizados como los supermercados, las galerías comerciales, los establecimientos asociados, los parques comerciales, etc.</li></ul>',
        'Una vez elegida la zona, presta atención a los siguientes detalles:',
        '<strong>1. Competencia</strong>',
        'Directa: es aquella que ofrece lo mismo que tú.',
        'Indirecta: son quienes se dedican a lo mismo que tú, pero venden sus productos o servicios de diferente manera.',
        'Tómalo con calma, si en la posible ubicación tienes competencia indirecta, una buena opción es ubicarte cerca de esta para que se desarrolle una “zona de negocios similares” que, al ser conocida, genere una buena afluencia de consumidores procedentes de diferentes sitios.'
      ] },
      { t: 'todo', html: MISSING('Cómo elegir la ubicación perfecta para tu cafetería', 'El final de “1. Competencia” y las secciones “2. Público Objetivo” y “3. Accesibilidad, Visibilidad y Tránsito”') }
    ] },
    { h2: 'Paso 3: Trámites', id: 'paso-3', blocks: [
      { t: 'p', html: 'Los trámites cambian por municipio. En general se piden:' },
      { t: 'ul', items: ['Uso de suelo.', 'Licencia de funcionamiento.', 'Aviso de funcionamiento sanitario.', 'Alta en el SAT.'] },
      { t: 'todo', html: TODO('validar esta lista de trámites o la fuente oficial a citar. No se publican costos.') }
    ] },
    { h2: 'Paso 4: Equipo', id: 'paso-4', blocks: [
      { t: 'p', html: `La base es una ${A('/maquinaria-y-equipo-para-cafeterias/espresso/', 'máquina de espresso')}, un ${A('/maquinaria-y-equipo-para-cafeterias/molinos/', 'molino')}, una ${A('/maquinaria-y-equipo-para-cafeterias/licuadoras/', 'licuadora')} y ${A('/accesorios-para-poner-una-cafeteria/', 'accesorios de barra')}. Si quieres autoservicio, revisa el ${A('/maquinaria-y-equipo-para-cafeterias/autoservicio/', 'equipo de autoservicio')}. Te ayudamos a elegir en ${A('/blog/como-elegir-maquina-de-espresso-para-cafeteria/', 'cómo elegir máquina de espresso')}.` }
    ] },
    { h2: 'Paso 5: Insumos y menú', id: 'paso-5', blocks: [
      { t: 'p', html: `Arma un menú corto con una base de café y suma líneas como frappés, chai, tisanas o bubble tea con nuestros ${A('/insumos-para-cafeterias/', 'insumos para cafetería')}. Ideas en ${A('/blog/que-vender-en-una-cafeteria/', 'qué vender en una cafetería')}, ${A('/blog/bubble-tea-para-cafeteria-insumos/', 'bubble tea')}, ${A('/blog/tisanas-para-cafeteria/', 'tisanas')} y ${A('/blog/menu-pumpkin-bebidas-de-otono-cafeteria/', 'menú pumpkin')}. Para elegir a quién comprarle, lee ${A('/blog/proveedores-de-insumos-para-cafeteria/', 'cómo elegir proveedor de insumos para cafetería')}.` }
    ] },
    { h2: 'Paso 6: Costos, precios e inversión', id: 'paso-6', blocks: [
      { t: 'p', html: `La inversión depende del modelo, el local y el equipo; pide una cotización de equipo e insumos. Para tus precios, calcula el costo de cada bebida como explicamos en ${A('/blog/cuanto-cobrar-por-un-cafe/', 'cuánto cobrar por un café')} y ${CALC_A('pon precio a cada bebida de tu menú con nuestra calculadora')}.` }
    ] },
    { h2: 'Paso 7: Capacitación', id: 'paso-7', blocks: [
      { t: 'p', html: `Capacítate a ti y a tu equipo en preparación, costeo y servicio: curso ${A('/emprendiendo-mi-negocio-de-barra-de-cafe-y-cafeteria/', 'Emprendiendo mi negocio de barra de café y cafetería')}, ${A('/curso-de-cafeteria/', 'curso de cafetería')}, ${A('/educacion/talleres/formacion-barista/', 'formación barista')} y todos los ${A('/cursos-para-baristas-y-talleres-para-cafeterias/', 'cursos para baristas y talleres')}.` }
    ] },
    { h2: 'Paso 8: Mantenimiento', id: 'paso-8', blocks: [
      { t: 'p', html: `Programa mantenimiento preventivo en <a href="https://servicio-y-refacciones.cafeetrusca.com/" rel="noopener">servicio y refacciones</a> y ten una rutina diaria: ${A('/blog/como-limpiar-maquina-de-espresso-y-molino/', 'cómo limpiar tu máquina de espresso y molino')}.` }
    ] },
    { h2: 'Visítanos', blocks: [
      { t: 'p', html: `Conoce el equipo en persona en nuestras ${A('/sucursales/', 'sucursales')} o pide una ${A('/contacto/#contacto-form', 'cotización')}.` }
    ] }
  ],
  howTo: { name: 'Cómo abrir una cafetería en México', steps: ABRIR_PASOS.map(([name, text], i) => ({ name, text, id: `paso-${i + 1}` })) },
  webinarCta: { text: '¿Vas a abrir tu cafetería? Aprende con nuestros expertos en el webinar en vivo de los jueves.', podcast: true },
  faq: [
    { q: '¿Qué necesito para abrir una cafetería en México?', a: 'Un modelo de negocio (barra, cafetería comercial o de especialidad), local, trámites, equipo (máquina de espresso, molino, licuadora), insumos, personal capacitado y un plan de costos y precios.' },
    { q: '¿Cuánto cuesta abrir una cafetería?', a: 'Depende del modelo, el local y el equipo. Café Etrusca te ayuda a cotizar equipo e insumos para tu proyecto.' },
    { q: '¿Qué es mejor, barra de café o cafetería?', a: 'Una barra necesita menos espacio y equipo; una cafetería con mesas permite más menú, pero pide más inversión y personal. Depende de tu ubicación y presupuesto.' },
    { q: '¿Qué equipo necesito para empezar?', a: 'Como base: máquina de espresso, molino, licuadora, refrigeración y accesorios de barra como jarras, tamper y básculas.' },
    { q: '¿Hay cursos para abrir una cafetería?', a: 'Sí. Café Etrusca imparte el curso Emprendiendo mi negocio de barra de café y cafetería en varias ciudades, además de cursos para baristas.' },
    { q: '¿Necesito saber de café para abrir una cafetería?', a: 'Ayuda mucho. Capacitarte a ti y a tu equipo en preparación, costeo y servicio reduce errores al abrir.' }
  ],
  cta: { text: 'Cotiza el equipo y los insumos de tu cafetería.', links: [
    { label: 'Pedir cotización', path: '/contacto/#contacto-form' },
    { label: 'Errores al abrir una cafetería', path: '/blog/errores-al-abrir-una-cafeteria/' }
  ] }
};

/** Orden: tanda 1, 2 (molinos al final por slug provisional), 4 y 3. */
/* ============================== TANDA 2 (21 oct 2026) ============================== */

/** WhatsApp de asesores (el mismo del bloque de contacto de /recetas/; por confirmar si es el canal de Etrusca Comercial). */
export const ASESORES_WHATSAPP = 'https://wa.me/525541668777';
export const ETRUSCA_BIZ = 'https://etrusca.biz';
const EXT = (href: string, label: string) => `<a href="${href}" target="_blank" rel="noopener">${label}</a>`;

const PROVEEDORES: BlogArticle = {
  slug: 'proveedores-de-insumos-para-cafeteria',
  title: 'Proveedores de insumos para cafetería: cómo elegir | Café Etrusca',
  description:
    'Qué pedirle a un proveedor de café, jarabes, polvos y equipo para tu cafetería en México: surtido, envíos, servicio técnico y capacitación.',
  h1: 'Cómo elegir proveedor de insumos para tu cafetería',
  kicker: 'Negocio',
  intro:
    'Un buen proveedor de insumos para cafetería te surte café, jarabes, polvos y equipo con entrega constante, te da servicio técnico y refacciones, y te ayuda a sacar el costo de cada bebida. Antes de elegir, compara surtido, tiempos de entrega, soporte y capacitación, no solo el precio por pieza.',
  hero: { src: IMG('insumos/jarabes/hero-collage.webp'), alt: 'Bebidas frías de frutos rojos y naranja preparadas con jarabes y bases para cafetería', width: 1757, height: 1600,
    provisional: 'Imagen del sitio. El brief pide una foto propia de un anaquel con jarabes, bases en polvo y café en grano (1200×630); por confirmar con Héctor qué fotos hay.' },
  notes: [
    TODO('pedido mínimo, condiciones de mayoreo y crédito, cobertura de envíos y número de sucursales.'),
    TODO('si https://wa.me/525541668777 es el canal correcto para los asesores de Etrusca Comercial, qué incluye el servicio técnico y qué URL de servicio y refacciones se enlaza.')
  ],
  sections: [
    { h2: 'Qué necesita surtir una cafetería', blocks: [
      { t: 'ul', items: [
        `<strong>Café en grano:</strong> ${A('/productos/cafe/', 'café para cafetería')} y ${A('/productos/cafe/especialidad/', 'café de especialidad')}.`,
        `<strong>Jarabes y salsas:</strong> ${A('/insumos-para-cafeterias/jarabes/', 'jarabes')} y ${A('/insumos-para-cafeterias/salsas/', 'salsas')}.`,
        `<strong>Bases en polvo</strong> para frappé, chai, matcha y bubble tea: ${A('/insumos-para-cafeterias/bases-en-polvo/', 'bases en polvo')} y ${A('/insumos-para-cafeterias/bases-en-polvo/chillout/', 'ChillOut')}.`,
        `<strong>Tés y tisanas:</strong> ${A('/insumos-para-cafeterias/te/', 'té para cafetería')}.`,
        `<strong>Desechables y accesorios:</strong> ${A('/accesorios-para-poner-una-cafeteria/', 'accesorios para cafetería')}.`,
        `<strong>Máquina y molino:</strong> ${A('/maquinaria-y-equipo-para-cafeterias/', 'maquinaria y equipo')}, con ${A('/maquinaria-y-equipo-para-cafeterias/espresso/', 'máquinas de espresso')}.`
      ] },
      { t: 'p', html: `Todo el catálogo está en ${A('/insumos-para-cafeterias/', 'insumos para cafetería')}. Si estás empezando, revisa ${A('/blog/como-abrir-una-cafeteria-en-mexico/', 'cómo abrir una cafetería en México')} y ${A('/blog/que-vender-en-una-cafeteria/', 'qué vender en una cafetería')}.` }
    ] },
    { h2: '7 cosas que pedirle a un proveedor', blocks: [
      { t: 'h3', text: '1. Surtido completo de una sola fuente' },
      { t: 'p', html: 'Café, jarabes, polvos, desechables y equipo con el mismo proveedor: menos pedidos, menos facturas y un solo contacto cuando algo falla.' },
      { t: 'h3', text: '2. Marcas reconocidas' },
      { t: 'p', html: `Marcas para uso profesional como Torani, Mocafe, David Rio y ChillOut dan sabor constante de un pedido a otro. Mira ${A('/insumos-para-cafeterias/jarabes/torani/', 'jarabes Torani')}, ${A('/insumos-para-cafeterias/bases-en-polvo/', 'bases en polvo')} y ${A('/blog/chai-david-rio-sabores/', 'los sabores de chai David Rio')}.` },
      { t: 'h3', text: '3. Disponibilidad y tiempos de entrega en tu ciudad' },
      { t: 'p', html: 'Pregunta cuánto tarda un pedido en llegar a tu ciudad y qué pasa si un producto se agota. Quedarte sin café o sin tu jarabe más vendido detiene la barra.' },
      { t: 'h3', text: '4. Servicio técnico y refacciones' },
      { t: 'p', html: `Una máquina parada es venta perdida. Elige un proveedor que dé mantenimiento y tenga refacciones; lee también ${A('/blog/como-elegir-maquina-de-espresso-para-cafeteria/', 'cómo elegir máquina de espresso')}.` },
      { t: 'h3', text: '5. Capacitación para tu personal' },
      { t: 'p', html: `Un proveedor que capacita te ayuda a que cada bebida salga igual. Conoce nuestros ${A('/cursos-para-baristas-y-talleres-para-cafeterias/', 'cursos para baristas y talleres para cafetería')}.` },
      { t: 'h3', text: '6. Fichas técnicas y rendimiento por bebida' },
      { t: 'p', html: 'Pide cuántas bebidas rinde cada botella o bolsa y la ficha del producto: con eso calculas costos y comparas proveedores.' },
      { t: 'h3', text: '7. Condiciones de pago y pedido mínimo' },
      { t: 'todo', html: TODO('pedido mínimo y condiciones de pago, mayoreo y crédito de Café Etrusca.') }
    ] },
    { h2: 'Cómo comparar precios de verdad: costo por bebida, no por botella', blocks: [
      { t: 'p', html: 'Una botella más barata no siempre sale más barata por vaso: lo que cuenta es cuántas bebidas rinde. Divide el precio entre las bebidas que rinde y compara ese costo por bebida entre proveedores.' },
      { t: 'p', html: `Te explicamos el cálculo en ${A('/blog/cuantos-pumps-de-jarabe-por-bebida/', 'cuántos pumps de jarabe lleva cada bebida')} y en ${A('/blog/cuanto-cobrar-por-un-cafe/', 'cuánto cobrar por un café')}.` },
      { t: 'linkCta', text: 'Compara proveedores con números: captura el precio y el rendimiento de cada insumo.', label: 'Calcula el costo de tus bebidas con la calculadora de precios', path: CALC }
    ] },
    { h2: 'Dónde comprar jarabes para café', blocks: [
      { t: 'p', html: `Compra jarabes con un distribuidor que maneje marcas para uso profesional y te entregue en tu ciudad. En Café Etrusca encuentras los ${A('/insumos-para-cafeterias/jarabes/torani/', 'jarabes Torani')} y el resto de ${A('/insumos-para-cafeterias/jarabes/', 'jarabes para cafetería')} en sucursal y en línea. Para dosificarlos, lee ${A('/blog/cuantos-pumps-de-jarabe-por-bebida/', 'cuántos pumps de jarabe por bebida')}.` },
      { t: 'ctaGroup', text: '¿Dudas sobre qué insumos necesitas? Habla con nuestros asesores expertos de Etrusca Comercial.', buttons: [
        { label: 'Escríbenos por WhatsApp (call center)', href: ASESORES_WHATSAPP, external: true },
        { label: 'Ir a contacto', href: '/contacto/' }
      ], note: `Conoce Etrusca Comercial en ${EXT(ETRUSCA_BIZ, 'etrusca.biz')}.` }
    ] },
    { h2: 'Un proveedor o varios', blocks: [
      { t: 'ul', items: [
        '<strong>Un solo proveedor:</strong> simplifica pedidos, pagos y soporte, y suele dar mejor seguimiento.',
        '<strong>Varios proveedores:</strong> más trabajo de compras, pero un respaldo si algo se agota.',
        '<strong>Punto medio:</strong> un proveedor principal y uno de respaldo para lo más crítico, como el café.'
      ] }
    ] },
    { h2: 'Señales de alerta', blocks: [
      { t: 'ul', items: [
        'No ofrece servicio técnico ni refacciones para el equipo que vende.',
        'No entrega factura.',
        'Las entregas llegan tarde o incompletas.',
        'El producto llega sin fecha de caducidad o con empaque dañado.'
      ] }
    ] },
    { h2: 'Café Etrusca como proveedor', blocks: [
      { t: 'p', html: `Surtimos café, jarabes, bases en polvo, tés, accesorios y equipo para cafetería. Visítanos en nuestras ${A('/sucursales/', 'sucursales')}, compra en la ${EXT('https://tienda.cafeetrusca.com/', 'tienda en línea')}, capacita a tu equipo con nuestros ${A('/cursos-para-baristas-y-talleres-para-cafeterias/', 'cursos')} y pide mantenimiento en ${EXT('https://servicio-y-refacciones.cafeetrusca.com/', 'servicio y refacciones')}.` },
      { t: 'todo', html: TODO('número de sucursales, ciudades con envío, pedido mínimo y condiciones de mayoreo; URL exacta de servicio y refacciones.') },
      { t: 'ctaGroup', text: 'Cuéntanos de tu cafetería y nuestros asesores expertos de Etrusca Comercial te ayudan a armar tu surtido.', buttons: [
        { label: 'Escríbenos por WhatsApp', href: ASESORES_WHATSAPP, external: true },
        { label: 'Contacto', href: '/contacto/' }
      ], note: `También puedes conocer Etrusca Comercial en ${EXT(ETRUSCA_BIZ, 'etrusca.biz')}.`, highlight: true }
    ] }
  ],
  recipesCta: { text: '¿Buscas qué preparar con estos insumos? Mira ideas de bebidas en nuestras recetas.', label: 'Ver recetas para cafetería' },
  faq: [
    { q: '¿Qué debe ofrecer un proveedor de insumos para cafetería?', a: 'Surtido de café, jarabes, polvos y equipo, entregas constantes, servicio técnico, refacciones y capacitación.' },
    { q: '¿Dónde comprar jarabes para café para mi cafetería?', a: 'Con un distribuidor que maneje marcas para uso profesional, como Torani, y que te entregue en tu ciudad; en Café Etrusca los encuentras en sucursal y en línea.' },
    { q: '¿Conviene tener un solo proveedor?', a: 'Un solo proveedor simplifica pedidos y soporte; tener uno de respaldo para lo más crítico (café) reduce el riesgo de quedarte sin producto.' },
    { q: '¿Cómo comparo precios entre proveedores?', a: 'Compara el costo por bebida, no por botella o bolsa; usa la calculadora de precios.' },
    { q: '¿Qué pasa si se descompone mi máquina?', a: 'Elige un proveedor con servicio técnico y refacciones. Por confirmar con Héctor: qué incluye el servicio de Café Etrusca.', pending: true },
    { q: '¿Café Etrusca vende a cafeterías en todo México?', a: 'Por confirmar con Héctor: cobertura de envíos y sucursales.', pending: true }
  ],
  cta: { text: 'Arma el surtido de tu cafetería con nosotros.', links: [
    { label: 'Insumos para cafetería', path: '/insumos-para-cafeterias/' },
    { label: 'Calculadora de precios', path: CALC },
    { label: 'Contacto', path: '/contacto/' }
  ] }
};

const NAVIDAD_RECETAS: Array<{ slug: string; name: string; base: string; sabor: string; temp: string }> = [
  { slug: 'pan-de-jengibre-latte', name: 'Pan de jengibre latte', base: 'Espresso y leche', sabor: 'Jarabe Torani Gingerbread', temp: 'Caliente' },
  { slug: 'copito-de-chocolate-blanco', name: 'Copito de chocolate blanco', base: 'ChillOut mix chocolate blanco y leche', sabor: 'Torani crema de menta y salsa Hollander chocolate blanco', temp: 'Caliente' },
  { slug: 'tiramisu-menta', name: 'Tiramisú menta', base: 'Polvo Mint Chip Cappuccine y leche', sabor: 'Jarabe Torani tiramisú', temp: 'Caliente' },
  { slug: 'caramelo-navideno-caliente', name: 'Caramelo navideño', base: 'Espresso y leche', sabor: 'Polvo Cappuccine Toffee coffee', temp: 'Caliente' },
  { slug: 'noche-de-invierno-latte', name: 'Noche de invierno latte', base: 'Chill Out Mix Crème Brûlée y Noosh de avena', sabor: 'ChillOut agave azul crema de avellana', temp: 'Caliente' },
  { slug: 'ponche-de-invierno', name: 'Ponche de invierno', base: 'Tisana Etrusca guayaba', sabor: 'Jarabe Torani canela y azúcar morena', temp: 'Caliente' },
  { slug: 'ponche-navideno-calentito', name: 'Ponche navideño calentito (con mezcal)', base: 'Tisana Etrusca guayaba', sabor: 'Torani canela', temp: 'Caliente' },
  { slug: 'caramelo-navideno-frio', name: 'Caramelo navideño frappé', base: 'Cappuccine chocolate blanco y leche', sabor: 'ChillOut fruit y ChillOut pearls (cereza o fresa)', temp: 'Fría' },
  { slug: 'cerveza-navidena', name: 'Cerveza navideña', base: 'Cold brew Mezcla especial No. 1 (nitro, en sifón)', sabor: 'Torani canela y azúcar morena', temp: 'Fría' }
];
/** Filtro del recetario por temporada (recipes-page: /recetas?temporada=invierno; las 9 recetas están etiquetadas invierno). */
const RECETAS_INVIERNO = '/recetas/?temporada=invierno';

const NAVIDAD: BlogArticle = {
  slug: 'bebidas-navidenas-para-cafeteria',
  title: 'Bebidas navideñas para cafetería: menú de diciembre | Café Etrusca',
  description:
    'Ideas de bebidas navideñas para tu cafetería con menta, chocolate y especias: latte, chai y frappé de temporada con jarabes y polvos.',
  h1: 'Bebidas navideñas para tu cafetería: arma tu menú de diciembre',
  kicker: 'Temporada',
  intro:
    'Las bebidas navideñas que mejor funcionan en cafetería usan sabores que el cliente ya relaciona con diciembre: menta, chocolate, canela y especias. Con pocos jarabes y bases en polvo puedes armar un menú corto de temporada, calientes y frías, sin cambiar tu operación.',
  hero: { src: IMG('recetas/navidad/pan-de-jengibre-latte.webp'), alt: 'Pan de jengibre latte, bebida caliente navideña con espresso y Torani Gingerbread', width: 1066, height: 1600,
    provisional: 'Imagen de receta del sitio. El brief pide latte de menta, chocolate caliente y chai en barra con decoración navideña (1200×630).' },
  notes: [TODO('SKUs navideños disponibles (¿Torani menta, otros de temporada?) y que las 9 recetas de la tabla sean las que etiquetas como Navideña/Invierno.')],
  itemList: { name: 'Bebidas navideñas y de invierno', items: NAVIDAD_RECETAS.map((r) => ({ name: r.name, path: `/recetas/${r.slug}/` })) },
  sections: [
    { h2: 'Por qué tener menú navideño y cuándo lanzarlo', blocks: [
      { t: 'p', html: 'El cliente espera sabores de temporada en diciembre y una bebida nueva le da un motivo para volver. Planea el menú en noviembre (insumos, recetas y fotos) y lánzalo al inicio de diciembre.' }
    ] },
    { h2: 'Sabores de temporada', blocks: [
      { t: 'h3', text: 'Menta' },
      { t: 'p', html: `Fresca y fácil de combinar con chocolate. Busca el sabor en los ${A('/insumos-para-cafeterias/jarabes/torani/', 'jarabes Torani')}.` },
      { t: 'h3', text: 'Chocolate y salsas' },
      { t: 'p', html: `Chocolate, chocolate blanco y caramelo en ${A('/insumos-para-cafeterias/salsas/', 'salsas')} y ${A('/insumos-para-cafeterias/bases-en-polvo/', 'bases en polvo')}; corona con ${A('/insumos-para-cafeterias/toppings/', 'toppings')}.` },
      { t: 'h3', text: 'Canela y especias' },
      { t: 'p', html: `Canela, jengibre y azúcar morena en ${A('/insumos-para-cafeterias/jarabes/', 'jarabes')}.` },
      { t: 'h3', text: 'Chai' },
      { t: 'p', html: `El chai especiado funciona caliente y frío; conoce ${A('/blog/chai-david-rio-sabores/', 'los sabores de chai David Rio')}.` },
      { t: 'todo', html: TODO('lista exacta de SKUs de temporada que vende Café Etrusca.') }
    ] },
    { h2: 'Ideas de bebidas', blocks: [
      { t: 'table', caption: 'Bebidas navideñas y de invierno del recetario', head: ['Bebida', 'Base', 'Jarabe o polvo', 'Caliente o fría'],
        rows: NAVIDAD_RECETAS.map((r) => [r.name, r.base, r.sabor, r.temp]) },
      { t: 'ul', items: NAVIDAD_RECETAS.map((r) => `${A(`/recetas/${r.slug}/`, `Receta: ${r.name}`)}`) },
      { t: 'p', html: 'Las dosis y los pasos están en cada receta.' }
    ] },
    { h2: 'Cómo armar el menú', blocks: [
      { t: 'ul', items: [
        'Elige de 3 a 5 bebidas para no complicar la barra.',
        `Incluye una sin cafeína, por ejemplo con ${A('/insumos-para-cafeterias/tisanas/chillout/', 'tisanas ChillOut')} (lee ${A('/blog/tisanas-para-cafeteria/', 'tisanas para cafetería')}).`,
        'Suma al menos una fría, como un frappé.',
        'Usa insumos que ya tienes para otras bebidas.'
      ] },
      { t: 'p', html: `¿Vienes del menú de otoño? Revisa también el ${A('/blog/menu-pumpkin-bebidas-de-otono-cafeteria/', 'menú pumpkin')}.` }
    ] },
    { h2: 'Costo y precio de la bebida de temporada', blocks: [
      { t: 'p', html: `Una bebida de temporada lleva más insumos: saca el costo por vaso antes de ponerle precio. Para el jarabe, usa ${A('/blog/cuantos-pumps-de-jarabe-por-bebida/', 'cuántos pumps de jarabe por bebida')}.` },
      { t: 'linkCta', text: 'Captura los insumos de tu bebida navideña y obtén su costo por vaso.', label: 'Saca el costo por vaso con la calculadora de precios', path: CALC }
    ] },
    { h2: 'Aprende en vivo', blocks: [
      { t: 'ul', items: [
        A('/educacion/sesiones/nochebuena-calida/', 'Sesión Nochebuena cálida'),
        A('/educacion/sesiones/tisanas-para-las-posadas/', 'Sesión Tisanas para las posadas')
      ] },
      { t: 'todo', html: TODO('fechas de las sesiones y si se menciona el webinar del 3 de diciembre.') }
    ] }
  ],
  recipesCta: { text: 'Encuentra más bebidas navideñas y de invierno en nuestras recetas.', label: 'Ver recetas de invierno', path: RECETAS_INVIERNO,
    cards: ['pan-de-jengibre-latte', 'copito-de-chocolate-blanco', 'tiramisu-menta', 'caramelo-navideno-frio'].map((s) => {
      const r = NAVIDAD_RECETAS.find((x) => x.slug === s)!;
      return { name: r.name, path: `/recetas/${s}/`, img: IMG(`recetas/${s === 'copito-de-chocolate-blanco' ? 'invierno' : 'navidad'}/${s}.webp`) };
    }) },
  webinarCta: { text: 'Aprende con nuestros expertos en el webinar en vivo de los jueves.' },
  faq: [
    { q: '¿Qué bebidas navideñas vender en una cafetería?', a: 'Latte de menta, chocolate caliente, chai especiado y una versión fría tipo frappé; elige 3 a 5 para no complicar la barra.' },
    { q: '¿Cuándo debo lanzar el menú navideño?', a: 'Planéalo en noviembre y lánzalo al inicio de diciembre.' },
    { q: '¿Qué jarabes usar para bebidas navideñas?', a: 'Menta, chocolate y especias; en Café Etrusca los encuentras en jarabes Torani.' },
    { q: '¿Hay opciones sin café?', a: 'Sí: chocolate, chai y tisanas.' },
    { q: '¿Cómo calculo el precio de una bebida de temporada?', a: 'Suma el costo de cada insumo por vaso con la calculadora de precios.' }
  ],
  cta: { text: 'Arma tu menú de diciembre con nuestros insumos.', links: [
    { label: 'Jarabes', path: '/insumos-para-cafeterias/jarabes/' },
    { label: 'Calculadora de precios', path: CALC },
    { label: 'Recetas de invierno', path: RECETAS_INVIERNO }
  ] }
};

export const BLOG_ARTICLES: BlogArticle[] = [
  PROCESO, ERRORES, FRAPPE, MUERTOS, BARISTA,
  METODOS, CHAI, MAQUINA, LIMPIEZA,
  PUMPS, COBRAR, VENDER, FILTRADO,
  BUBBLE, SIFON, PUMPKIN, TISANAS, ABRIR,
  MOLINOS,
  PROVEEDORES, NAVIDAD
];

export const BLOG_BY_SLUG: Record<string, BlogArticle> = Object.fromEntries(BLOG_ARTICLES.map((a) => [a.slug, a]));
