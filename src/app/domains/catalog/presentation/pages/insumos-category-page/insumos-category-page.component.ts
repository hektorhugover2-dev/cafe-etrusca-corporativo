import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InsumosNavComponent } from '../../components/insumos-nav/insumos-nav.component';
import { InsumosCtaComponent } from '../../components/insumos-cta/insumos-cta.component';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import {
  InsumosCategory,
  INSPIRA_MENU,
  findCategory
} from '../../insumos.data';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';

const JAR = '/assets/images/insumos/jarabes';

@Component({
  selector: 'app-insumos-category-page',
  standalone: true,
  imports: [RouterLink, InsumosNavComponent, InsumosCtaComponent, ScrollWaveComponent],
  templateUrl: './insumos-category-page.component.html',
  styleUrls: ['../../insumos-theme.scss', '../../jarabes-theme.scss', '../../pures-theme.scss']
})
export class InsumosCategoryPageComponent implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  presentations: Record<string, { src: string; alt: string }[]> = {};
  slideAt: Record<string, number> = {};
  private slideTimer: ReturnType<typeof setInterval> | null = null;
  private readonly productCacheTtlMs = 12 * 60 * 60 * 1000;
  private readonly productMemory = new Map<string, Array<Record<string, string>>>();
  private readonly productInflight = new Map<string, Promise<Array<Record<string, string>>>>();
  cat: InsumosCategory | null = null;
  menu = INSPIRA_MENU;

  jarabesLines = [
    {
      name: 'ChillOut',
      brand: 'chillout',
      sub: '',
      description: 'Una marca mexicana con opciones para desarrollar, complementar y dar personalidad a bebidas frías y calientes.',
      sabores: '14 opciones',
      presentacion: '1 L',
      rendimiento: 'Aprox. 30 bebidas de 450 ml',
      image: '/assets/images/insumos/line-defaults/jarabes-chillout.webp',
      blob: JAR + '/blob-coral.png',
      tone: 'coral',
      icons: { sabor: JAR + '/icon-sabor-coral.png', pres: JAR + '/icon-pres-coral.png', rend: JAR + '/icon-rend-coral.png' }
    },
    {
      name: 'Clásico',
      brand: 'Torani',
      sub: 'CLÁSICO',
      description: 'Jarabe con una amplia variedad de sabores para agregar sabor a cafés, cócteles, postres y más.',
      sabores: '60 opciones',
      presentacion: '750 ml',
      rendimiento: 'Aprox. 25 bebidas de 450 ml',
      image: '/assets/images/insumos/line-defaults/jarabes-clasico.webp',
      blob: JAR + '/blob-yellow.png',
      tone: 'yellow',
      icons: { sabor: JAR + '/icon-sabor-yellow.png', pres: JAR + '/icon-pres-yellow.png', rend: JAR + '/icon-rend-yellow.png' }
    },
    {
      name: 'Sugar Free',
      brand: 'Torani',
      sub: 'SUGAR FREE',
      description: 'Formulación sin azúcar para cafés, coctelería y postres con el mismo perfil de sabor.',
      sabores: '17 opciones',
      presentacion: '750 ml',
      rendimiento: 'Aprox. 25 bebidas de 450 ml',
      image: '/assets/images/insumos/line-defaults/jarabes-sugarfree.webp',
      blob: JAR + '/blob-cyan.png',
      tone: 'cyan',
      icons: { sabor: JAR + '/icon-sabor-cyan.png', pres: JAR + '/icon-pres-cyan.png', rend: JAR + '/icon-rend-cyan.png' }
    },
    {
      name: 'Puremade',
      brand: 'Torani',
      sub: 'PUREMADE',
      description: 'Ingredientes naturales, sin conservadores ni colorantes artificiales.',
      sabores: '2 opciones',
      presentacion: '750 ml',
      rendimiento: 'Aprox. 25 bebidas de 450 ml',
      image: '/assets/images/insumos/jarabes/bottle-puremade.webp',
      blob: JAR + '/blob-lime.png',
      tone: 'lime',
      icons: { sabor: JAR + '/icon-sabor-lime.png', pres: JAR + '/icon-pres-lime.png', rend: JAR + '/icon-rend-lime.png' }
    }
  ];



  teLines = [
    {
      name: 'Euro Te',
      brand: 'Eurote',
      sub: '',
      description: 'Euro te ofrece tés con combinaciones de ingredientes que aportan variedad de perfiles y sabores.',
      sabores: '9 opciones',
      presentacion: '250 g y 1 kg',
      rendimiento: 'Según preparación',
      image: '/assets/images/insumos/te/line-vector.webp',
      blob: '/assets/images/insumos/jarabes/blob-yellow.png',
      tone: 'yellow',
      apiMode: 'euro',
      icons: { sabor: '/assets/images/insumos/jarabes/icon-sabor-yellow.png', pres: '/assets/images/insumos/jarabes/icon-pres-yellow.png', rend: '/assets/images/insumos/jarabes/icon-rend-yellow.png' }
    },
    {
      name: 'Stash Descafeinado',
      brand: 'Stash',
      sub: 'DESCAFEINADO',
      description: 'Stash ofrece una variedad de perfiles y sabores para quienes prefieren disfrutar de una bebida libre de cafeína.',
      sabores: 'Según catálogo',
      presentacion: '18 y 20 sobres',
      rendimiento: 'Según preparación',
      image: '/assets/images/insumos/te/line-frame.webp',
      blob: '/assets/images/insumos/jarabes/blob-coral.png',
      tone: 'coral',
      apiMode: 'stash-decaf',
      icons: { sabor: '/assets/images/insumos/jarabes/icon-sabor-coral.png', pres: '/assets/images/insumos/jarabes/icon-pres-coral.png', rend: '/assets/images/insumos/jarabes/icon-rend-coral.png' }
    },
    {
      name: 'Stash',
      brand: 'Stash',
      sub: '',
      description: 'Tés Stash con sabor intenso para armar cartas calientes y frías con perfiles consistentes.',
      sabores: 'Según catálogo',
      presentacion: '18 y 20 sobres',
      rendimiento: 'Según preparación',
      image: '/assets/images/insumos/te/hero-teapot.webp',
      blob: '/assets/images/insumos/jarabes/blob-cyan.png',
      tone: 'cyan',
      apiMode: 'stash',
      icons: { sabor: '/assets/images/insumos/jarabes/icon-sabor-cyan.png', pres: '/assets/images/insumos/jarabes/icon-pres-cyan.png', rend: '/assets/images/insumos/jarabes/icon-rend-cyan.png' }
    }
  ];

  teMenu = [
    { title: 'Soda italiana', image: '/assets/images/insumos/jarabes/drink-soda-orange.png', tone: 'yellow', link: '/productos/insumos/te' },
    { title: 'Pistache cósmico', image: '/assets/images/insumos/jarabes/drink-pistache.png', tone: 'lime', link: '/productos/insumos/te' },
    { title: 'Soda italiana', image: '/assets/images/insumos/jarabes/drink-soda-pink.png', tone: 'pink', link: '/productos/insumos/te' }
  ];

  teSeleccion = [
    { image: '/assets/images/insumos/te/hero-teapot.webp', alt: 'Tetera de té', tone: 'yellow' },
    { image: '/assets/images/insumos/te/line-frame.webp', alt: 'Presentación de té', tone: 'coral' },
    { image: '/assets/images/insumos/te/line-vector.webp', alt: 'Línea de té', tone: 'cyan' }
  ];

  tisanasLines = [
    {
      name: 'ChillOut Tisana',
      brand: 'ChillOut',
      sub: 'TISANA',
      description: 'Mezclas frutales y herbales vibrantes, creadas para inspirar momentos de bienestar, sabor y equilibrio.',
      sabores: 'Según catálogo',
      presentacion: 'Bolsa 250 g',
      rendimiento: 'Según preparación',
      image: '/assets/images/insumos/tisanas/line-a.webp',
      blob: '/assets/images/insumos/jarabes/blob-coral.png',
      tone: 'coral',
      apiMode: 'tisana-chillout',
      icons: { sabor: '/assets/images/insumos/jarabes/icon-sabor-coral.png', pres: '/assets/images/insumos/jarabes/icon-pres-coral.png', rend: '/assets/images/insumos/jarabes/icon-rend-coral.png' }
    },
    {
      name: 'Euro Te Tisana',
      brand: 'Eurote',
      sub: 'TISANA',
      description: 'Euro te desarrolla tisanas combinando frutas, flores y hierbas seleccionadas, ofreciendo mezclas originales sin cafeína.',
      sabores: 'Según catálogo',
      presentacion: 'Bolsa 250 g',
      rendimiento: 'Según preparación',
      image: '/assets/images/insumos/tisanas/line-b.webp',
      blob: '/assets/images/insumos/jarabes/blob-yellow.png',
      tone: 'yellow',
      apiMode: 'tisana-euro',
      icons: { sabor: '/assets/images/insumos/jarabes/icon-sabor-yellow.png', pres: '/assets/images/insumos/jarabes/icon-pres-yellow.png', rend: '/assets/images/insumos/jarabes/icon-rend-yellow.png' }
    }
  ];

  tisanasMenu = [
    { title: 'Infusión frutal', image: '/assets/images/insumos/drink-soda.png', tone: 'coral', link: '/productos/insumos/tisanas' },
    { title: 'Tisana herbal', image: '/assets/images/insumos/drink-matcha.png', tone: 'yellow', link: '/productos/insumos/tisanas' },
    { title: 'Bienestar over ice', image: '/assets/images/insumos/drink-frappe.png', tone: 'cyan', link: '/productos/insumos/tisanas' }
  ];

  tisanasSeleccion = [
    { image: '/assets/images/insumos/tisanas/hero-drinks.webp', alt: 'Selección de tisanas', tone: 'coral' },
    { image: '/assets/images/insumos/tisanas/line-a.webp', alt: 'Tisana ChillOut', tone: 'yellow' }
  ];

  basesLines = [
    {
      name: 'ChillOut',
      brand: 'ChillOut',
      sub: '',
      description: 'Línea de polvos saborizados con gran variedad de opciones para crear tus propias recetas especiales.',
      sabores: '31 sabores',
      presentacion: '2 kg y 700 g',
      rendimiento: 'Según preparación',
      image: '/assets/images/insumos/bases/logo-chillout.webp',
      blob: '/assets/images/insumos/jarabes/blob-coral.png',
      tone: 'coral',
      apiMode: 'bases-mix',
      icons: { sabor: '/assets/images/insumos/jarabes/icon-sabor-coral.png', pres: '/assets/images/insumos/jarabes/icon-pres-coral.png', rend: '/assets/images/insumos/jarabes/icon-rend-coral.png' }
    },
    {
      name: 'ChillOut Just Fruit',
      brand: 'ChillOut',
      sub: 'JUST FRUIT',
      description: 'Polvos de fruta deshidratada para bebidas naturales, refrescantes y llenas de sabor frutal intenso.',
      sabores: '3 sabores',
      presentacion: '2 kg y 700 g',
      rendimiento: 'Según preparación',
      image: '/assets/images/insumos/bases/logo-chillout-2.webp',
      blob: '/assets/images/insumos/jarabes/blob-yellow.png',
      tone: 'yellow',
      apiMode: 'bases-just-fruit',
      icons: { sabor: '/assets/images/insumos/jarabes/icon-sabor-yellow.png', pres: '/assets/images/insumos/jarabes/icon-pres-yellow.png', rend: '/assets/images/insumos/jarabes/icon-rend-yellow.png' }
    },
    {
      name: 'David Rio Chai',
      brand: 'David Rio',
      sub: 'CHAI',
      description: 'Mezclas premium de chai, té e infusiones con especias y sabores excepcionales reconocidos mundialmente.',
      sabores: '9 sabores',
      presentacion: 'Desde 398 g',
      rendimiento: 'Según preparación',
      image: '/assets/images/insumos/bases/logo-2.webp',
      blob: '/assets/images/insumos/jarabes/blob-cyan.png',
      tone: 'cyan',
      apiMode: 'bases-david-rio',
      icons: { sabor: '/assets/images/insumos/jarabes/icon-sabor-cyan.png', pres: '/assets/images/insumos/jarabes/icon-pres-cyan.png', rend: '/assets/images/insumos/jarabes/icon-rend-cyan.png' }
    },
    {
      name: 'MoCafé',
      brand: 'MoCafé',
      sub: '',
      description: 'Bases en polvo para una amplia variedad de bebidas frías y calientes de café y especialidades.',
      sabores: '24 sabores',
      presentacion: '1.360 kg',
      rendimiento: 'Según preparación',
      image: '/assets/images/insumos/bases/logo-3.webp',
      blob: '/assets/images/insumos/jarabes/blob-lime.png',
      tone: 'lime',
      apiMode: 'bases-mocafe',
      icons: { sabor: '/assets/images/insumos/jarabes/icon-sabor-lime.png', pres: '/assets/images/insumos/jarabes/icon-pres-lime.png', rend: '/assets/images/insumos/jarabes/icon-rend-lime.png' }
    },
    {
      name: 'Cool Capps',
      brand: 'Cool Capps',
      sub: '',
      description: 'Bases para frappés, smoothies y bebidas frías cremosas con gran rendimiento en barra comercial.',
      sabores: '12 sabores',
      presentacion: '1.580 kg',
      rendimiento: 'Según preparación',
      image: '/assets/images/insumos/bases/logo-4.webp',
      blob: '/assets/images/insumos/jarabes/blob-coral.png',
      tone: 'coral',
      icons: { sabor: '/assets/images/insumos/jarabes/icon-sabor-coral.png', pres: '/assets/images/insumos/jarabes/icon-pres-coral.png', rend: '/assets/images/insumos/jarabes/icon-rend-coral.png' }
    },
    {
      name: 'Cappuccine',
      brand: 'Cappuccine',
      sub: '',
      description: 'Premezclas para bebidas de rápida preparación: lattes, cappuccinos, mocha y más opciones deliciosas.',
      sabores: '16 sabores',
      presentacion: '1.360 kg',
      rendimiento: 'Según preparación',
      image: '/assets/images/insumos/bases/logo-5.webp',
      blob: '/assets/images/insumos/jarabes/blob-yellow.png',
      tone: 'yellow',
      icons: { sabor: '/assets/images/insumos/jarabes/icon-sabor-yellow.png', pres: '/assets/images/insumos/jarabes/icon-pres-yellow.png', rend: '/assets/images/insumos/jarabes/icon-rend-yellow.png' }
    },
    {
      name: 'Hollander',
      brand: 'Hollander',
      sub: 'CHOCOLATE',
      description: 'Chocolate en polvo elaborado con cacao de alta calidad para bebidas calientes y frías de autor.',
      sabores: '1 sabor',
      presentacion: '1.130 kg',
      rendimiento: 'Según preparación',
      image: '/assets/images/insumos/bases/logo-6.webp',
      blob: '/assets/images/insumos/jarabes/blob-cyan.png',
      tone: 'cyan',
      apiMode: 'bases-hollander',
      icons: { sabor: '/assets/images/insumos/jarabes/icon-sabor-cyan.png', pres: '/assets/images/insumos/jarabes/icon-pres-cyan.png', rend: '/assets/images/insumos/jarabes/icon-rend-cyan.png' }
    },
    {
      name: 'Don Gustavo',
      brand: 'Don Gustavo',
      sub: 'CHOCOLATE',
      description: 'Chocolate Don Gustavo, chocolate tradicional mexicano con cerca de 100 años de historia.',
      sabores: '1 sabor',
      presentacion: 'Diferentes formatos',
      rendimiento: 'Según preparación',
      image: '/assets/images/insumos/bottle-cpm.png',
      blob: '/assets/images/insumos/jarabes/blob-lime.png',
      tone: 'lime',
      apiMode: 'bases-don-gustavo',
      icons: { sabor: '/assets/images/insumos/jarabes/icon-sabor-lime.png', pres: '/assets/images/insumos/jarabes/icon-pres-lime.png', rend: '/assets/images/insumos/jarabes/icon-rend-lime.png' }
    }
  ];

  basesMenu = [
    { title: 'Soda italiana', image: '/assets/images/insumos/drink-soda.png', tone: 'yellow', link: '/productos/insumos/bases-en-polvo' },
    { title: 'Pistache cósmico', image: '/assets/images/insumos/drink-pistache.png', tone: 'lime', link: '/productos/insumos/bases-en-polvo' },
    { title: 'Matcha frappé', image: '/assets/images/insumos/drink-frappe.png', tone: 'cyan', link: '/productos/insumos/bases-en-polvo' }
  ];

  basesSeleccion = [
    { image: '/assets/images/insumos/bases/hero-drink.webp', alt: 'Base en polvo', tone: 'yellow' },
    { image: '/assets/images/insumos/bases/logo-3.webp', alt: 'MoCafé', tone: 'coral' },
    { image: '/assets/images/insumos/bases/logo-2.webp', alt: 'David Rio Chai', tone: 'cyan' },
    { image: '/assets/images/insumos/bases/logo-6.webp', alt: 'Hollander', tone: 'lime' }
  ];

  toppingsTipos = [
    {
      title: 'Tapioca',
      description: 'Perlas masticables de almidón de yuca con consistencia suave y elástica.',
      image: '/assets/images/insumos/toppings/tipo-tapioca.webp',
      tone: 'cyan'
    },
    {
      title: 'Perlas',
      description: 'Con relleno líquido, opciones en tendencia y especificaciones adaptadas a cada modelo de negocio.',
      image: '/assets/images/insumos/toppings/tipo-perlas.webp',
      tone: 'lime'
    },
    {
      title: 'Trozos de jalea',
      description: 'Trozos de jalea versátiles para aportar textura y dulzura natural a una gran variedad de bebidas y postres.',
      image: '/assets/images/insumos/toppings/tipo-trozos-de-jalea.webp',
      tone: 'yellow'
    },
    {
      title: 'Jelly',
      description: 'Gelatinas pequeñas con consistencia firme agregando sabor y textura.',
      image: '/assets/images/insumos/toppings/tipo-jelly.webp',
      tone: 'coral'
    }
  ];

  toppingsBloques = [
    {
      num: 1,
      label: 'Tapioca',
      tone: 'cyan',
      names: ['Tapioca', 'Tapioca instantánea']
    },
    {
      num: 2,
      label: 'Perlas',
      tone: 'lime',
      names: ['POP', 'Perlas explosivas', 'Crystal Boba']
    },
    {
      num: 3,
      label: 'Trozos de jalea',
      tone: 'yellow',
      names: ['Trozos de jalea']
    },
    {
      num: 4,
      label: 'Jelly',
      tone: 'coral',
      names: ['Jelly']
    }
  ];

  linesForBlock(block: { names: string[] }) {
    return this.toppingsLines.filter((line) => block.names.includes(line.name));
  }

  toppingsLines = [
    {
      name: 'Tapioca',
      brand: 'Tapioca',
      sub: '',
      description: 'Tapioca en perlas para bubble tea. Cocidas adquieren una textura gelatinosa.',
      sabores: 'Según preparación',
      presentacion: '3 kg y 1 kg',
      rendimiento: 'Hasta 100 / 33 bebidas aprox.*',
      image: '/assets/images/insumos/toppings/logo-chillout-1.webp',
      logo: '/assets/images/insumos/toppings/logo-chillout-1.webp',
      blob: '/assets/images/insumos/jarabes/blob-cyan.png',
      tone: 'cyan',
      apiMode: 'toppings-tapioca',
      icons: { sabor: '/assets/images/insumos/jarabes/icon-sabor-cyan.png', pres: '/assets/images/insumos/jarabes/icon-pres-cyan.png', rend: '/assets/images/insumos/jarabes/icon-rend-cyan.png' }
    },
    {
      name: 'Tapioca instantánea',
      brand: 'Tapioca',
      sub: 'INSTANTÁNEA',
      description: 'Tapioca instantánea en porciones individuales. Lista tras un minuto de calentado.',
      sabores: 'Según preparación',
      presentacion: 'Caja 50 sobres de 50 g',
      rendimiento: '50 bebidas (1 sobre por bebida)',
      image: '/assets/images/insumos/toppings/logo-chillout-2.webp',
      logo: '/assets/images/insumos/toppings/logo-chillout-2.webp',
      blob: '/assets/images/insumos/jarabes/blob-lime.png',
      tone: 'lime',
      apiMode: 'toppings-tapioca-instantanea',
      icons: { sabor: '/assets/images/insumos/jarabes/icon-sabor-lime.png', pres: '/assets/images/insumos/jarabes/icon-pres-lime.png', rend: '/assets/images/insumos/jarabes/icon-rend-lime.png' }
    },
    {
      name: 'Popping Boba',
      brand: 'Popping Boba',
      sub: '',
      description: 'Perlas con cubierta gelatinosa y relleno líquido de diferentes sabores.',
      sabores: '14 opciones',
      presentacion: '3.4 kg',
      rendimiento: 'Hasta 113 bebidas aprox.*',
      image: '/assets/images/insumos/toppings/line-1.webp',
      logo: '/assets/images/insumos/toppings/line-1.webp',
      blob: '/assets/images/insumos/jarabes/blob-coral.png',
      tone: 'coral',
      apiMode: 'toppings-popping-boba',
      icons: { sabor: '/assets/images/insumos/jarabes/icon-sabor-coral.png', pres: '/assets/images/insumos/jarabes/icon-pres-coral.png', rend: '/assets/images/insumos/jarabes/icon-rend-coral.png' }
    },
    {
      name: 'POP',
      brand: 'POP',
      sub: '',
      description: 'Perlas con o sin relleno que aportan sabor y textura en cada preparación.',
      sabores: '14 opciones y 4 rellenas',
      presentacion: '1.25 kg y rellenas 850 g',
      rendimiento: 'Hasta 43 bebidas aprox.*',
      image: '/assets/images/insumos/toppings/line-2.webp',
      logo: '/assets/images/insumos/toppings/line-2.webp',
      blob: '/assets/images/insumos/jarabes/blob-yellow.png',
      tone: 'yellow',
      apiMode: 'toppings-pop',
      icons: { sabor: '/assets/images/insumos/jarabes/icon-sabor-yellow.png', pres: '/assets/images/insumos/jarabes/icon-pres-yellow.png', rend: '/assets/images/insumos/jarabes/icon-rend-yellow.png' }
    },
    {
      name: 'Perlas explosivas',
      brand: 'Perlas explosivas',
      sub: '',
      description: 'Perlas rellenas de líquido sabor a frutas. Ideales para complementar bebidas frías.',
      sabores: '3 opciones',
      presentacion: '3.2 kg',
      rendimiento: 'Hasta 106 bebidas aprox.*',
      image: '/assets/images/insumos/toppings/line-3.webp',
      logo: '/assets/images/insumos/toppings/line-3.webp',
      blob: '/assets/images/insumos/jarabes/blob-cyan.png',
      tone: 'cyan',
      apiMode: 'toppings-perlas-explosivas',
      icons: { sabor: '/assets/images/insumos/jarabes/icon-sabor-cyan.png', pres: '/assets/images/insumos/jarabes/icon-pres-cyan.png', rend: '/assets/images/insumos/jarabes/icon-rend-cyan.png' }
    },
    {
      name: 'Crystal Boba',
      brand: 'Crystal Boba',
      sub: '',
      description: 'Perlas de konjac semitransparentes y suaves para agregar textura y un toque visual único.',
      sabores: '6 opciones',
      presentacion: '2 kg y 1 kg',
      rendimiento: 'Hasta 66 bebidas aprox.*',
      image: '/assets/images/insumos/toppings/line-4.webp',
      logo: '/assets/images/insumos/toppings/line-4.webp',
      blob: '/assets/images/insumos/jarabes/blob-lime.png',
      tone: 'lime',
      apiMode: 'toppings-crystal-boba',
      icons: { sabor: '/assets/images/insumos/jarabes/icon-sabor-lime.png', pres: '/assets/images/insumos/jarabes/icon-pres-lime.png', rend: '/assets/images/insumos/jarabes/icon-rend-lime.png' }
    },
    {
      name: 'Trozos de jalea',
      brand: 'Trozos de jalea',
      sub: '',
      description: 'Trozos de jalea versátiles para aportar textura y dulzura natural a bebidas y postres.',
      sabores: '5 opciones',
      presentacion: '4 kg',
      rendimiento: 'Hasta 133 bebidas aprox.*',
      image: '/assets/images/insumos/toppings/logo-teazone.webp',
      logo: '/assets/images/insumos/toppings/logo-teazone.webp',
      blob: '/assets/images/insumos/jarabes/blob-yellow.png',
      tone: 'yellow',
      icons: { sabor: '/assets/images/insumos/jarabes/icon-sabor-yellow.png', pres: '/assets/images/insumos/jarabes/icon-pres-yellow.png', rend: '/assets/images/insumos/jarabes/icon-rend-yellow.png' }
    },
    {
      name: 'Jelly',
      brand: 'Jelly',
      sub: '',
      description: 'Gelatinas pequeñas con consistencia firme, agregando sabor y textura.',
      sabores: '8 opciones',
      presentacion: '3.85 kg',
      rendimiento: 'Hasta 128 bebidas aprox.*',
      image: '/assets/images/insumos/toppings/logo-chillout.webp',
      logo: '/assets/images/insumos/toppings/logo-chillout.webp',
      blob: '/assets/images/insumos/jarabes/blob-coral.png',
      tone: 'coral',
      icons: { sabor: '/assets/images/insumos/jarabes/icon-sabor-coral.png', pres: '/assets/images/insumos/jarabes/icon-pres-coral.png', rend: '/assets/images/insumos/jarabes/icon-rend-coral.png' }
    }
  ];

  toppingsMenu = [
    { title: 'Soda italiana', image: '/assets/images/insumos/jarabes/drink-soda-orange.png', tone: 'yellow', link: '/productos/insumos/toppings' },
    { title: 'Pistache cósmico', image: '/assets/images/insumos/jarabes/drink-pistache.png', tone: 'lime', link: '/productos/insumos/toppings' },
    { title: 'Soda italiana', image: '/assets/images/insumos/jarabes/drink-soda-pink.png', tone: 'pink', link: '/productos/insumos/toppings' }
  ];

  toppingsMaquinasRec = [
    {
      title: 'Licuadoras profesionales',
      desc: 'Potencia y rendimiento para frappés, smoothies y bebidas con toppings.',
      image: '/assets/images/maquinas/hbb908r.webp',
      link: '/maquinaria-y-equipo-para-cafeterias',
      fragment: 'licuadoras',
      tone: 'cyan'
    },
    {
      title: 'Máquinas de espresso',
      desc: 'Equipo confiable para tu barra: calidad, instalación y servicio Etrusca.',
      image: '/assets/images/maquinas/viva.webp',
      link: '/maquinaria-y-equipo-para-cafeterias',
      fragment: 'espresso',
      tone: 'coral'
    }
  ];

    toppingsSeleccion = [
    { image: '/assets/images/insumos/toppings/hero-drink.webp', alt: 'Toppings', tone: 'cyan' },
    { image: '/assets/images/insumos/toppings/line-1.webp', alt: 'Popping Boba', tone: 'coral' },
    { image: '/assets/images/insumos/toppings/line-3.webp', alt: 'Perlas explosivas', tone: 'yellow' },
    { image: '/assets/images/insumos/toppings/hero-alt.webp', alt: 'Selección toppings', tone: 'lime' }
  ];




  salsasLines = [
    {
      name: 'Hollander',
      brand: 'Hollander',
      sub: '',
      description: 'Salsas de textura suave y sabor intenso para mezclar, complementar y decorar bebidas y postres.',
      sabores: 'Chocolate y caramelo',
      presentacion: '1.89 L y 443 ml',
      rendimiento: 'Según dosificación',
      image: '/assets/images/insumos/line-defaults/salsas-hollander.webp',
      blob: JAR + '/blob-coral.png',
      tone: 'coral',
      icons: { sabor: JAR + '/icon-sabor-coral.png', pres: JAR + '/icon-pres-coral.png', rend: JAR + '/icon-rend-coral.png' }
    },
    {
      name: 'ChillOut Chamoy',
      brand: 'chillout',
      sub: '',
      description: 'El chamoy de ChillOut tiene un sabor equilibrado entre lo ácido, dulce y salado. Ideal para dar ese toque de sabor en tus bebidas.',
      sabores: 'Único sabor',
      presentacion: '1 L',
      rendimiento: 'Aprox. 33 bebidas de 480 ml*',
      image: '/assets/images/insumos/salsas-bottle-chamoy.webp',
      blob: JAR + '/blob-yellow.png',
      tone: 'yellow',
      icons: { sabor: JAR + '/icon-sabor-yellow.png', pres: JAR + '/icon-pres-yellow.png', rend: JAR + '/icon-rend-yellow.png' }
    },
    {
      name: 'Sugar Free',
      brand: 'Torani',
      sub: 'SUGAR FREE',
      description: 'Salsas sin azúcar para aportar sabor, textura y decoración a bebidas y postres.',
      sabores: 'Caramelo, chocolate oscuro y chocolate blanco.',
      presentacion: '1.89 L',
      rendimiento: 'Aprox. 63 bebidas de 480 ml*',
      image: '/assets/images/insumos/line-defaults/salsas-sugarfree.webp',
      blob: JAR + '/blob-cyan.png',
      tone: 'cyan',
      icons: { sabor: JAR + '/icon-sabor-cyan.png', pres: JAR + '/icon-pres-cyan.png', rend: JAR + '/icon-rend-cyan.png' }
    },
    {
      name: 'Puremade',
      brand: 'Torani',
      sub: 'PUREMADE',
      description: 'Línea de salsas para complementar, mezclar y decorar bebidas y postres.',
      sabores: 'Caramelo, chocolate oscuro, chocolate blanco y chocolate y avellana**.',
      presentacion: '1.89 L y 488 ml',
      rendimiento: 'Hasta 63 bebidas aprox. en 1.89 L*',
      image: '/assets/images/insumos/line-defaults/salsas-puremade.webp',
      blob: JAR + '/blob-lime.png',
      tone: 'lime',
      icons: { sabor: JAR + '/icon-sabor-lime.png', pres: JAR + '/icon-pres-lime.png', rend: JAR + '/icon-rend-lime.png' }
    }
  ];

  salsasSeleccion = [
    { image: '/assets/images/insumos/salsas-bottle-hollander.webp', alt: 'Hollander salsa de caramelo', tone: 'lime' },
    { image: '/assets/images/insumos/salsas-bottle-sugarfree.webp', alt: 'Torani Sugar Free', tone: 'cyan' },
    { image: '/assets/images/insumos/salsas-bottle-chamoy.webp', alt: 'ChillOut Chamoy', tone: 'yellow' }
  ];


  puresLines = [
    {
      name: 'ChillOut Fruit Concentrate',
      brand: 'ChillOut Fruit Concentrate',
      tone: 'concentrate',
      blob: '/assets/images/insumos/jarabes/blob-yellow.png',
      description: 'Concentrados líquidos para preparar bebidas con sabores intensos de forma rápida y práctica.',
      sabores: '6',
      presentacion: '5 kg',
      rendimiento: 'Hasta 167 bebidas',
      image: '/assets/images/insumos/line-defaults/pures-concentrate.webp',
      icons: {"sabor":"/assets/images/insumos/jarabes/icon-sabor-yellow.png","pres":"/assets/images/insumos/jarabes/icon-pres-yellow.png","rend":"/assets/images/insumos/jarabes/icon-rend-yellow.png"}
    },
    {
      name: 'ChillOut Jam',
      brand: 'ChillOut Jam',
      tone: 'jam',
      blob: '/assets/images/insumos/jarabes/blob-lime.png',
      description: 'Preparados de fruta tipo mermelada. Incluye trozos de fruta que aportan más sabor.',
      sabores: '9',
      presentacion: '4.5 / 4.2 / 1.3 / 1.2 / 1.1 kg',
      rendimiento: '24–100',
      image: '/assets/images/insumos/line-defaults/pures-jam.webp',
      icons: {"sabor":"/assets/images/insumos/jarabes/icon-sabor-lime.png","pres":"/assets/images/insumos/jarabes/icon-pres-lime.png","rend":"/assets/images/insumos/jarabes/icon-rend-lime.png"}
    },
    {
      name: 'Torani Purée Blend',
      brand: 'Torani Purée Blend',
      tone: 'puree',
      blob: '/assets/images/insumos/jarabes/blob-coral.png',
      description: 'Fruta cocida y colada, con textura espesa y sabor intenso para bebidas y coctelería.',
      sabores: '5',
      presentacion: '1.89 L',
      rendimiento: 'Hasta 66',
      image: '/assets/images/insumos/line-defaults/pures-blend.webp',
      icons: {"sabor":"/assets/images/insumos/jarabes/icon-sabor-coral.png","pres":"/assets/images/insumos/jarabes/icon-pres-coral.png","rend":"/assets/images/insumos/jarabes/icon-rend-coral.png"}
    },
    {
      name: 'Torani Smoothie Mix',
      brand: 'Torani Smoothie Mix',
      tone: 'smoothie',
      blob: '/assets/images/insumos/jarabes/blob-coral.png',
      description: 'Preparados de fruta con consistencia homogénea, ideales para smoothies, frappés y bebidas frutales.',
      sabores: '6',
      presentacion: '1.89 L',
      rendimiento: 'Hasta 63',
      image: '/assets/images/insumos/line-defaults/pures-smoothie.webp',
      icons: {"sabor":"/assets/images/insumos/jarabes/icon-sabor-coral.png","pres":"/assets/images/insumos/jarabes/icon-pres-coral.png","rend":"/assets/images/insumos/jarabes/icon-rend-coral.png"}
    }
  ];

  puresEnjoy = [
    { label: 'Frappés', image: '/assets/images/insumos/pures%20y%20concentrados/Frame.png' },
    { label: 'Smoothies', image: '/assets/images/insumos/pures%20y%20concentrados/Frame-1.png' },
    { label: 'Sodas italianas', image: '/assets/images/insumos/pures%20y%20concentrados/Frame-2.png' },
    { label: 'Coctelería', image: '/assets/images/insumos/pures%20y%20concentrados/Frame-3.png' },
    { label: 'Bebidas frías', image: '/assets/images/insumos/pures%20y%20concentrados/Frame-4.png' }
  ];

  puresMenu = [
    { title: 'Soda italiana', image: '/assets/images/insumos/jarabes/drink-soda-orange.png' },
    { title: 'Preparado cósmico', image: '/assets/images/insumos/jarabes/drink-pistache.png' },
    { title: 'Matcha frappé', image: '/assets/images/insumos/drink-frappe.png' }
  ];

  puresSeleccion = [
    { image: '/assets/images/insumos/pures-drink-2.png', alt: 'Producto ChillOut de purés y concentrados' },
    { image: '/assets/images/insumos/bottle-abc.png', alt: 'Botella Torani' }
  ];
  jarabesMenu = [
    { title: 'Soda italiana', image: '/assets/images/insumos/jarabes/drink-soda-orange.png', tone: 'yellow', link: '/productos/insumos/jarabes' },
    { title: 'Pistache cósmico', image: '/assets/images/insumos/jarabes/drink-pistache.png', tone: 'lime', link: '/productos/insumos/jarabes' },
    { title: 'Soda italiana', image: '/assets/images/insumos/jarabes/drink-soda-pink.png', tone: 'pink', link: '/productos/insumos/jarabes' }
  ];

  seleccion = [
    { image: '/assets/images/insumos/bottle-abc.png', alt: 'Torani French', tone: 'lime' },
    { image: '/assets/images/insumos/cafe-bag.png', alt: 'Café de la casa', tone: 'cyan' },
    { image: '/assets/images/insumos/product-tall-2.png', alt: 'Torani Mango', tone: 'yellow' }
  ];

  private seo = inject(SeoService);

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.startSlideTimer();
    this.route.paramMap.subscribe((params) => {
      const found = findCategory(params.get('slug'));
      if (!found) {
        this.router.navigate(['/productos/insumos']);
        return;
      }
      this.cat = found;
      this.hydrateLines();
      this.seo.set({
        title: found.label + ' para cafeterías | Café Etrusca',
        description: found.subtitle || found.body,
        keywords: found.label + ', insumos para cafeterías, Café Etrusca',
        image: found.heroImage
      });
    });
  }



  ngOnDestroy() {
    if (this.slideTimer) {
      clearInterval(this.slideTimer);
      this.slideTimer = null;
    }
  }

  private startSlideTimer() {
    if (this.slideTimer || typeof window === 'undefined') return;
    this.slideTimer = setInterval(() => this.advanceSlides(), 4000);
  }

  private advanceSlides() {
    const lines = this.activeLines();
    if (!lines) return;
    for (const line of lines) {
      if ((this.presentations[line.name]?.length || 0) > 1) this.stepSlide(line, 1);
    }
  }

  lineQuery(name: string): string {
    if (this.cat?.layout === 'jarabes' && name === 'ChillOut') return 'CHILLOUT JARABE DE AGAVE';
    if (this.cat?.layout === 'jarabes' && name === 'Sugar Free') return 'TORANI JARABE SUGAR FREE SABOR';
    if (this.cat?.layout === 'jarabes' && name === 'Puremade') return 'TORANI JARABE PUREMADE';
    if (this.cat?.layout === 'pures' && name === 'ChillOut Fruit Concentrate') return 'CHILLOUT FRUIT CONCENTRADO';
    if (this.cat?.layout === 'pures' && name === 'ChillOut Jam') return 'CHILLOUT JAM SABOR';
    if (this.cat?.layout === 'pures' && name === 'Torani Purée Blend') return 'TORANI PUREE BLEND SABOR';
    if (this.cat?.layout === 'salsas' && name === 'Hollander') return 'HOLLANDER SALSA SABOR';
    if (this.cat?.layout === 'salsas' && name === 'Puremade') return 'TORANI SALSA PUREMADE';
    if (this.cat?.layout === 'salsas' && name === 'Sugar Free') return 'TORANI SALSA SUGAR FREE SABOR';
    if (this.cat?.layout === 'pures' && name === 'Torani Smoothie Mix') return 'TORANI REAL SMOOTHIE';
    if (this.cat?.layout === 'te' && (name === 'Euro Te' || name === 'Eurote')) return 'EUROTÉ TÉ';
    if (this.cat?.layout === 'te' && (name === 'Stash Descafeinado' || name === 'Stash')) return 'STASH TÉ';
    if (this.cat?.layout === 'tisanas' && name === 'ChillOut Tisana') return 'CHILLOUT TISANA';
    if (this.cat?.layout === 'tisanas' && name === 'Euro Te Tisana') return 'EUROTÉ TISANA';
    if (this.cat?.layout === 'bases' && name === 'ChillOut') return 'CHILLOUT MIX BASE EN POLVO';
    if (this.cat?.layout === 'bases' && name === 'ChillOut Just Fruit') return 'CHILLOUT JUST FRUIT';
    if (this.cat?.layout === 'bases' && name === 'David Rio Chai') return 'DAVID RIO CHAI';
    if (this.cat?.layout === 'bases' && name === 'MoCafé') return 'MOCAFE BASE EN POLVO';
    if (this.cat?.layout === 'bases' && name === 'Don Gustavo') return 'DON GUSTAVO CHOCOLATE EN POLVO';
    if (this.cat?.layout === 'bases' && name === 'Hollander') return 'HOLLANDER CHOCOLATE';
    if (this.cat?.layout === 'toppings' && name === 'Tapioca') return 'TAPIOCA';
    if (this.cat?.layout === 'toppings' && name === 'Tapioca instantánea') return 'CHILLOUT PERLAS DE TAPIOCA INSTANTANEAS';
    if (this.cat?.layout === 'toppings' && name === 'Crystal Boba') return 'CRYSTAL BOBA ORIGINAL';
    if (this.cat?.layout === 'toppings' && name === 'Perlas explosivas') return 'TEA ZONE PERLAS EXPLOSIVAS';
    if (this.cat?.layout === 'toppings' && name === 'POP') return 'CHILLOUT CAVIAR POPPING';
    if (this.cat?.layout === 'toppings' && name === 'Popping Boba') return 'POPPING BOBA';
    const map: Record<string, string> = {
      'Clásico': 'TORANI JARABE CLASICO SABOR',
      'ChillOut Chamoy': 'chamoy'
    };
    return map[name] || name;
  }

  private activeLines() {
    const layout = this.cat?.layout;
    if (layout === 'salsas') return this.salsasLines;
    if (layout === 'pures') return this.puresLines;
    if (layout === 'jarabes') return this.jarabesLines;
    if (layout === 'te') return this.teLines;
    if (layout === 'tisanas') return this.tisanasLines;
    if (layout === 'bases') return this.basesLines;
    if (layout === 'toppings') return this.toppingsLines;
    return null;
  }

  hydrateLines() {
    if (!this.isBrowser) return;
    this.clearLegacyProductCache();
    const lines = this.activeLines();
    if (!lines) return;
    for (const line of lines) {
      const logo = (line as { logo?: string; image?: string }).logo || line.image;
      if (logo && !(this.presentations[line.name]?.length)) {
        this.presentations = {
          ...this.presentations,
          [line.name]: [{ src: logo, alt: (line as { brand?: string }).brand || line.name }]
        };
        this.slideAt = { ...this.slideAt, [line.name]: 0 };
      }
      this.loadLine(line);
    }
  }

  private clearLegacyProductCache() {
    try {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && (k.startsWith('etrusca.product.v1:') || k.startsWith('etrusca.product.v2:'))) keys.push(k);
      }
      for (const k of keys) localStorage.removeItem(k);
    } catch {}
  }

  private productCacheKey(q: string, exact: boolean) {
    return 'etrusca.product.v3:' + q + ':T1:' + (exact ? 'all' : '20');
  }

  private readProductCache(key: string): Array<Record<string, string>> | null {
    if (this.productMemory.has(key)) return this.productMemory.get(key)!;
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as { at: number; rows: Array<Record<string, string>> };
      if (!parsed?.at || !Array.isArray(parsed.rows)) return null;
      if (Date.now() - parsed.at > this.productCacheTtlMs) {
        localStorage.removeItem(key);
        return null;
      }
      this.productMemory.set(key, parsed.rows);
      return parsed.rows;
    } catch {
      return null;
    }
  }

  private writeProductCache(key: string, rows: Array<Record<string, string>>) {
    this.productMemory.set(key, rows);
    try {
      localStorage.setItem(key, JSON.stringify({ at: Date.now(), rows }));
    } catch {
      // quota / private mode
    }
  }

  private fetchProducts(q: string, exact: boolean) {
    const key = this.productCacheKey(q, exact);
    const cached = this.readProductCache(key);
    if (cached) return Promise.resolve(cached);
    const inflight = this.productInflight.get(key);
    if (inflight) return inflight;

    let params = new HttpParams().set('q', q).set('Type', '1');
    if (!exact) params = params.set('limit', '20');
    const req = new Promise<Array<Record<string, string>>>((resolve) => {
      this.http.get<Array<Record<string, string>>>('https://cafeetrusca.com/api/product', { params }).subscribe({
        next: (rows) => {
          const list = Array.isArray(rows) ? rows : [];
          this.writeProductCache(key, list);
          this.productInflight.delete(key);
          resolve(list);
        },
        error: () => {
          this.productInflight.delete(key);
          resolve([]);
        }
      });
    });
    this.productInflight.set(key, req);
    return req;
  }

  private loadLine(line: { name: string; sabores: string; image?: string; apiMode?: string }) {
    const q = this.lineQuery(line.name);
    const mode = line.apiMode || '';
    let needle = '';
    if (mode === 'euro' || (this.cat?.layout === 'te' && (line.name === 'Euro Te' || line.name === 'Eurote'))) {
      needle = 'EUROTÉ TÉ';
    } else if (mode === 'stash-decaf' || mode === 'stash' || (this.cat?.layout === 'te' && (line.name === 'Stash Descafeinado' || line.name === 'Stash'))) {
      needle = 'STASH TÉ';
    } else if (mode === 'tisana-chillout' || (this.cat?.layout === 'tisanas' && line.name === 'ChillOut Tisana')) {
      needle = 'CHILLOUT TISANA';
    } else if (mode === 'tisana-euro' || (this.cat?.layout === 'tisanas' && line.name === 'Euro Te Tisana')) {
      needle = 'EUROTÉ TISANA';
    } else if (mode === 'bases-mix' || (this.cat?.layout === 'bases' && line.name === 'ChillOut')) {
      needle = 'CHILLOUT MIX BASE EN POLVO';
    } else if (mode === 'bases-just-fruit' || (this.cat?.layout === 'bases' && line.name === 'ChillOut Just Fruit')) {
      needle = 'CHILLOUT JUST FRUIT';
    } else if (mode === 'bases-david-rio' || (this.cat?.layout === 'bases' && line.name === 'David Rio Chai')) {
      needle = 'DAVID RIO CHAI';
    } else if (mode === 'bases-mocafe' || (this.cat?.layout === 'bases' && line.name === 'MoCafé')) {
      needle = 'MOCAFE BASE EN POLVO';
    } else if (mode === 'bases-don-gustavo' || (this.cat?.layout === 'bases' && line.name === 'Don Gustavo')) {
      needle = 'DON GUSTAVO CHOCOLATE EN POLVO';
    } else if (mode === 'bases-hollander' || (this.cat?.layout === 'bases' && line.name === 'Hollander')) {
      needle = 'HOLLANDER CHOCOLATE';
    } else if (mode === 'toppings-tapioca' || (this.cat?.layout === 'toppings' && line.name === 'Tapioca')) {
      needle = 'CHILLOUT TAPIOCA|PERLAS DE TAPIOCA|TEA ZONE PERLAS DE TAPIOCA';
    } else if (mode === 'toppings-tapioca-instantanea' || (this.cat?.layout === 'toppings' && line.name === 'Tapioca instantánea')) {
      needle = 'CHILLOUT PERLAS DE TAPIOCA INSTANTANEAS';
    } else if (mode === 'toppings-crystal-boba' || (this.cat?.layout === 'toppings' && line.name === 'Crystal Boba')) {
      needle = 'CRYSTAL BOBA ORIGINAL';
    } else if (mode === 'toppings-perlas-explosivas' || (this.cat?.layout === 'toppings' && line.name === 'Perlas explosivas')) {
      needle = 'TEA ZONE PERLAS EXPLOSIVAS';
    } else if (mode === 'toppings-pop' || (this.cat?.layout === 'toppings' && line.name === 'POP')) {
      needle = 'CHILLOUT CAVIAR POPPING';
    } else if (mode === 'toppings-popping-boba' || (this.cat?.layout === 'toppings' && line.name === 'Popping Boba')) {
      needle = 'POPPING BOBA';
    } else if (this.cat?.layout === 'jarabes' && line.name === 'ChillOut') {
      needle = 'CHILLOUT JARABE DE AGAVE';
    } else if (this.cat?.layout === 'jarabes' && line.name === 'Sugar Free') {
      needle = 'TORANI JARABE SUGAR FREE SABOR';
    } else if (mode === 'jarabe-puremade' || (this.cat?.layout === 'jarabes' && line.name === 'Puremade')) {
      needle = 'TORANI JARABE PUREMADE'; // jarabe-puremade
    } else if (this.cat?.layout === 'pures' && line.name === 'ChillOut Fruit Concentrate') {
      needle = 'CHILLOUT FRUIT CONCENTRADO';
    } else if (this.cat?.layout === 'pures' && line.name === 'ChillOut Jam') {
      needle = 'CHILLOUT JAM SABOR';
    } else if (this.cat?.layout === 'pures' && line.name === 'Torani Purée Blend') {
      needle = 'TORANI PUREE BLEND SABOR';
    } else if (this.cat?.layout === 'salsas' && line.name === 'Hollander') {
      needle = 'HOLLANDER SALSA SABOR';
    } else if (this.cat?.layout === 'salsas' && line.name === 'Puremade') {
      needle = 'TORANI SALSA PUREMADE';
    } else if (this.cat?.layout === 'salsas' && line.name === 'Sugar Free') {
      needle = 'TORANI SALSA SUGAR FREE SABOR';
    } else if (this.cat?.layout === 'pures' && line.name === 'Torani Smoothie Mix') {
      needle = 'TORANI REAL SMOOTHIE';
    } else if (line.name === 'Clásico') {
      needle = 'TORANI JARABE CLASICO SABOR';
    }
    const exact = needle.length > 0;
    this.fetchProducts(q, exact).then((rows) => this.applyProductRows(line, rows, needle, exact, mode));
  }

  private hasSalsaWord(nombre: string): boolean {
    const n = (nombre || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
      .replace(/\s+/g, ' ')
      .trim();
    return n.includes('SALSA');
  }

  private hasTisanaWord(nombre: string): boolean {
    const n = (nombre || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
      .replace(/\s+/g, ' ')
      .trim();
    return n.includes('TISANA');
  }

  private isDecafName(nombre: string): boolean {
    const n = (nombre || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
      .replace(/\s+/g, ' ')
      .trim();
    return (
      n.includes('LIBRE DE CAFEINA') ||
      n.includes('LIBRE CAFEINA') ||
      n.includes('DECAF') ||
      n.includes('DESCAFEIN') ||
      n.includes('CAFFEINE FREE') ||
      n.includes('CAFEINE FREE')
    );
  }

  private applyProductRows(
    line: { name: string; sabores: string; image?: string; apiMode?: string },
    rows: Array<Record<string, string>>,
    needle: string,
    exact: boolean,
    mode: string = ''
  ) {
    const norm = (s: string) =>
      (s || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase()
        .replace(/\s+/g, ' ')
        .trim();
    const needleN = norm(needle);
    const needleParts = needleN.split('|').map((p) => p.trim()).filter(Boolean);
    const list = (Array.isArray(rows) ? rows : []).filter((row) => {
      if (!exact) return true;
      const name = norm(row['nombre'] || row['Title'] || '');
      if (!needleParts.length) return false;
      if (mode === 'toppings-popping-boba') {
        return name.includes('POPPING BOBA');
      }
      if (mode === 'toppings-tapioca') {
        if (name.includes('INSTANTANE')) return false;
        if (name.includes('JARABE')) return false;
        return (
          name.startsWith('CHILLOUT TAPIOCA') ||
          name.startsWith('PERLAS DE TAPIOCA') ||
          name.startsWith('TEA ZONE PERLAS DE TAPIOCA') ||
          (name.includes('PERLAS DE TAPIOCA') && !name.includes('INSTANTANE') && !name.includes('JARABE'))
        );
      }
      return needleParts.some((part) => name === part || name.startsWith(part + ' '));
    }).filter((row) => {
      const nombre = row['nombre'] || row['Title'] || '';
      if (mode === 'stash-decaf' || mode === 'stash') {
        if (this.hasTisanaWord(nombre)) return false;
        const decaf = this.isDecafName(nombre);
        return mode === 'stash-decaf' ? decaf : !decaf;
      }
      if (mode === 'jarabe-puremade' || needleN.includes('JARABE PUREMADE') || (this.cat?.layout === 'jarabes' && needleN.includes('JARABE'))) {
        if (this.hasSalsaWord(nombre)) return false;
      }
      if (mode === 'toppings-tapioca') {
        const n = norm(nombre);
        if (n.includes('INSTANTANE')) return false;
        if (n.includes('JARABE')) return false;
      }
      return true;
    });
    const host = 'https://cafeetrusca.com';
    const productKeys = new Set<string>();
    const slides: { src: string; alt: string; key: string }[] = [];
    for (const row of list) {
      const alt = row['nombre'] || row['Title'] || row['title'] || line.name;
      const key = String(row['codigo'] || row['Codigo'] || alt)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toUpperCase()
        .replace(/\s+/g, ' ')
        .trim();
      if (!key || productKeys.has(key)) continue;
      productKeys.add(key);

      const raw = row['image'] || row['image_thumbnail'] || row['Image'] || row['ImageThumbnail'] || '';
      const built = raw.startsWith('http') ? raw : raw ? host + (raw.startsWith('/') ? raw : '/' + raw) : '';
      const src = this.toWebp(built);
      if (!src) continue;
      slides.push({ src, alt, key });
    }
    const logoSrc = ((line as { logo?: string }).logo || '').trim();
    const productSlides = exact ? slides : slides.slice(0, 12);
    const withLogo = logoSrc
      ? [{ src: this.toWebp(logoSrc), alt: line.name, key: 'logo-default' }, ...productSlides.filter((sl) => sl.src !== this.toWebp(logoSrc))]
      : productSlides;
    if (withLogo.length) {
      this.presentations = {
        ...this.presentations,
        [line.name]: withLogo
      };
      this.slideAt = { ...this.slideAt, [line.name]: 0 };
      // keep line.image as logo fallback; do not overwrite with product shot
      if (!line.image && withLogo[0]?.src) line.image = withLogo[0].src;
    }
    if (productKeys.size) line.sabores = String(productKeys.size);
    this.cdr.markForCheck();
  }

  private toWebp(src: string) {
    if (!src) return '';
    return src.replace(/\.(png|jpe?g|gif)(?=([?#]|$))/i, '.webp');
  }
  private withCacheBust(src: string) {
    if (!src) return '';
    const seconds = Math.floor(Date.now() / 1000);
    const sep = src.includes('?') ? '&' : '?';
    return src + sep + 'v=1.' + seconds;
  }

  slideSrc(line: { name: string; image?: string }) {
    const slides = this.presentations[line.name];
    const src = slides?.length
      ? slides[this.slideAt[line.name] || 0].src
      : line.image || '';
    return this.withCacheBust(this.toWebp(src));
  }

  slideAlt(line: { name: string }) {
    const slides = this.presentations[line.name];
    if (slides?.length) return slides[this.slideAt[line.name] || 0].alt;
    return line.name;
  }

  slideCount(line: { name: string }) {
    return this.presentations[line.name]?.length || 0;
  }

  stepSlide(line: { name: string }, dir: number) {
    const slides = this.presentations[line.name];
    if (!slides?.length) return;
    const cur = this.slideAt[line.name] || 0;
    this.slideAt[line.name] = (cur + dir + slides.length) % slides.length;
    this.cdr.markForCheck();
  }

  compareTone(linea: string) {
    const map: Record<string, string> = {
      ChillOut: 'coral',
      'Sugar Free': 'cyan',
      Puremade: 'lime',
      'Clásico': 'yellow',
      Clasico: 'yellow',
      'Euro Te': 'yellow',
      Eurote: 'yellow',
      'Stash Descafeinado': 'coral',
      Stash: 'cyan',
      'ChillOut Tisana': 'coral',
      'Euro Te Tisana': 'yellow',
      'David Rio Chai': 'cyan',
      'MoCafé': 'lime',
      'Cool Capps': 'coral',
      Cappuccine: 'yellow',
      Hollander: 'cyan',
      'Don Gustavo': 'lime',
      'ChillOut Just Fruit': 'yellow',
      'Popping Boba': 'coral',
      POP: 'yellow',
      'Perlas explosivas': 'cyan',
      'Crystal Boba': 'lime',
      Jelly: 'coral',
      'Trozos de jalea': 'yellow',
      Tapioca: 'cyan',
      'Tapioca instantánea': 'lime'
    };
    return map[linea] || 'yellow';
  }

  asCompare(extra: Record<string, unknown> | undefined) {
    return (extra?.['compare'] as Array<Record<string, string>>) ?? [];
  }

  asSeasonal(extra: Record<string, unknown> | undefined) {
    return extra?.['seasonal'] as
      | { title: string; text: string; tag: string; image: string }
      | undefined;
  }

  asSteps(extra: Record<string, unknown> | undefined) {
    return (extra?.['steps'] as Array<{ n: string; title: string; text: string; image: string }>) ?? [];
  }

  asJam(extra: Record<string, unknown> | undefined) {
    return (extra?.['jamTable'] as Array<Record<string, string>>) ?? [];
  }

  asEnjoy(extra: Record<string, unknown> | undefined) {
    return (extra?.['enjoy'] as string[]) ?? [];
  }
}
