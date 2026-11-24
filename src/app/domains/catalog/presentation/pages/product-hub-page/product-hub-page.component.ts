import { HeroCrumbsComponent, HeroCrumb, breadcrumbJsonLd } from '../../../../../shared/ui/hero-crumbs/hero-crumbs.component';
import { Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CafeNavComponent } from '../../components/cafe-nav/cafe-nav.component';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { InsumosCtaComponent } from '../../components/insumos-cta/insumos-cta.component';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';
import { ASSETS_BASE_URL } from '../../../../../shared/kernel/config/assets-url';
import { RecipeCardComponent } from '../../../../../shared/ui/recipe-card/recipe-card.component';
import { recipeBySlug, type Recipe } from '../recipes-page/recetas.data';

interface HubSubcat {
  title: string;
  desc: string;
  link: string;
  icon: string;
  /** Foto de producto (solo cards de líneas de café). */
  shot?: string;
  /** Tono pastel de la card (solo líneas de café). */
  tone?: string;
}

/**
 * SEO propio de cada subcategoría de accesorios (/accesorios-para-poner-una-cafeteria/<slug>/).
 * Derivado solo de los nombres/descripciones existentes de cada tarjeta (sin claims nuevos).
 * Estas páginas aún comparten el cuerpo del hub (sin productos propios), por eso NO están en el sitemap.
 */
const ACCESORIOS_SUBCAT_SEO: Record<string, { title: string; description: string; keywords: string }> = {
  'barista-espresso': {
    title: 'Accesorios de barista y espresso | Café Etrusca',
    description:
      'Accesorios de barista y espresso para tu cafetería: herramientas para preparar espresso en barra. Explora los accesorios de Café Etrusca o pide asesoría.',
    keywords: 'accesorios de barista, accesorios para espresso, accesorios para cafetería, Café Etrusca'
  },
  'metodo-extraccion': {
    title: 'Accesorios para métodos de extracción | Café Etrusca',
    description:
      'Accesorios y elementos para métodos de extracción manual en tu cafetería. Explora los accesorios de Café Etrusca o pide asesoría.',
    keywords: 'accesorios para métodos de extracción, métodos manuales, accesorios para cafetería, Café Etrusca'
  },
  'te-servicio': {
    title: 'Accesorios para té y servicio | Café Etrusca',
    description:
      'Accesorios para té y servicio en tu cafetería, para disfrutar cada infusión. Explora los accesorios de Café Etrusca o pide asesoría.',
    keywords: 'accesorios para té, accesorios de servicio, accesorios para cafetería, Café Etrusca'
  },
  'bebidas-frias': {
    title: 'Accesorios para bebidas frías y complementos | Café Etrusca',
    description:
      'Accesorios y complementos para bebidas frías y creativas en tu cafetería. Explora los accesorios de Café Etrusca o pide asesoría.',
    keywords: 'accesorios para bebidas frías, complementos para cafetería, accesorios para cafetería, Café Etrusca'
  },
  'catacion-medicion': {
    title: 'Accesorios de catación y medición | Café Etrusca',
    description:
      'Accesorios de catación y medición para tu cafetería, con precisión en cada preparación. Explora los accesorios de Café Etrusca o pide asesoría.',
    keywords: 'accesorios de catación, medición de café, accesorios para cafetería, Café Etrusca'
  },
  limpieza: {
    title: 'Accesorios de limpieza y mantenimiento | Café Etrusca',
    description:
      'Accesorios de limpieza y mantenimiento para cuidar el equipo de tu cafetería. Explora los accesorios de Café Etrusca o pide asesoría.',
    keywords: 'limpieza de máquinas de café, mantenimiento, accesorios para cafetería, Café Etrusca'
  }
};

@Component({
  selector: 'app-product-hub-page',
  standalone: true,
  imports: [HeroCrumbsComponent, RouterLink, InsumosCtaComponent, ScrollWaveComponent, CafeNavComponent, RecipeCardComponent],
  template: `
    <div class="ins-page" [class.hub-cafe]="hubKey === 'cafe'">
      <section
        class="ins-hero hub-hero"
        [class.hub-hero-photo]="hubKey === 'cafe'"
        [style.background]="hubKey === 'cafe' ? null : heroBg"
      >
        @if (hubKey === 'cafe') {
          <picture class="hub-hero__bg" aria-hidden="true">
            <source media="(max-width: 800px)" [attr.srcset]="cafeHero.mobile" type="image/webp">
            <img [src]="cafeHero.desktop" alt="" width="1774" height="887" fetchpriority="high" decoding="async">
          </picture>
        }
        <div class="ins-hero-copy">
          @if (crumbs.length) { <app-hero-crumbs [items]="crumbs" /> }
          <h1>{{ title }}</h1>
          <p class="lead">{{ lead }}</p>
          @if (hubKey === 'cafe' && subcats.length) {
            <p class="body">Explora nuestras líneas de café: Premium para barra diaria, Café de especialidad Barista Champ y Café en verde como materia prima con trazabilidad.</p>
            <a class="btn-catalog" href="#lineas">Explorar cafés <span class="cta-arrow" aria-hidden="true">→</span></a>
          } @else if (hubKey === 'accesorios' && subcats.length) {
            <p class="body">Herramientas para preparar, medir, servir y mantener tu barra. Equipa tu negocio con accesorios de calidad para llevar cada taza al siguiente nivel.</p>
            <a class="btn-catalog" href="#categorias-accesorios">Explorar accesorios</a>
          } @else {
            <p class="body">Estamos armando esta categoría con el mismo detalle que Insumos. Mientras tanto explora el catálogo o pide asesoría.</p>
            <a class="btn-catalog" routerLink="/insumos-para-cafeterias">Ver insumos</a>
          }
        </div>
        @if (hubKey !== 'cafe') {
          <div class="ins-hero-media">
            <img [src]="img" [alt]="title">
          </div>
        }
        <app-scroll-wave position="bottom" [fillColor]="hubKey === 'cafe' ? '#ffffff' : heroBg" [compact]="hubKey === 'cafe'"></app-scroll-wave>
      </section>

      @if (hubKey === 'cafe') {
        <app-cafe-nav [allColor]="true"></app-cafe-nav>
      }

      @if ((hubKey === 'cafe' || hubKey === 'accesorios') && subcats.length) {
        <section class="ins-section" [attr.id]="hubKey === 'accesorios' ? 'categorias-accesorios' : hubKey === 'cafe' ? 'lineas' : null" [attr.aria-label]="hubKey === 'accesorios' ? 'Categorías de accesorios' : 'Subcategorías de café'">
          <h2 class="section-title-center">{{ hubKey === 'accesorios' ? 'Categorías' : 'Líneas de café' }}</h2>
          @if (hubKey === 'cafe') {
            <div class="cafe-lines">
              @for (s of subcats; track s.link) {
                <a class="cafe-line" [attr.data-tone]="s.tone" [routerLink]="s.link">
                  <span class="cafe-line-head">
                    <span class="cafe-line-icon" aria-hidden="true"><img [src]="s.icon" alt="" width="40" height="53"></span>
                    <strong>{{ s.title }}</strong>
                  </span>
                  <span class="cafe-line-desc">{{ s.desc }}</span>
                  <span class="cafe-line-foot">
                    @if (s.shot) {
                      <img class="cafe-line-shot" [src]="s.shot" alt="" width="220" height="200" loading="lazy" decoding="async">
                    }
                    <span class="cafe-line-go" aria-hidden="true">→</span>
                  </span>
                </a>
              }
            </div>
          } @else {
            <div class="hub-subcats">
              @for (s of subcats; track s.link) {
                <a class="hub-subcat" [class.is-active]="s.link === activeLink" [routerLink]="s.link" [attr.aria-current]="s.link === activeLink ? 'page' : null">
                  <img [src]="s.icon" alt="" width="72" height="72">
                  <div>
                    <strong>{{ s.title }}</strong>
                    <span>{{ s.desc }}</span>
                  </div>
                </a>
              }
            </div>
          }
        </section>
      }

      @if (hubKey === 'cafe') {
        <section class="ins-section" id="temporada" aria-labelledby="cafe-temporada-title">
          <h2 class="section-title-center" id="cafe-temporada-title">Café de temporada</h2>
          <p class="cafe-extra-text">Una selección especial que celebra los sabores de cada estación.</p>
          <div class="cafe-season">
            <div class="cafe-season-media">
              <img [src]="assetsBase + '/images/cafe/cafe-de-temporada-otono-invierno-2026.webp'" alt="Bolsa de Café de temporada otoño invierno de Café Etrusca" width="1080" height="1080" loading="lazy" decoding="async">
            </div>
            <div class="cafe-season-copy">
              <p class="cafe-season-title">Café de Temporada</p>
              <p class="cafe-season-tag">
                <img [src]="assetsBase + '/images/educacion/nav-linea/cafe-de-temporada-negro.webp'" alt="" aria-hidden="true" width="28" height="28">
                <span>Lanzamiento recurrente</span>
              </p>
              <a class="cafe-season-btn" href="https://wa.me/525541668777" target="_blank" rel="noopener noreferrer" aria-label="Pregunta a tu asesor por WhatsApp (se abre en otra pestaña)">Pregunta a tu asesor <span class="cta-arrow" aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <section class="ins-section cafe-valor" id="valor" aria-labelledby="cafe-valor-title">
          <app-scroll-wave class="cafe-valor-wave" position="top" [compact]="true" fillColor="#ffffff"></app-scroll-wave>
          <h2 class="section-title-center" id="cafe-valor-title">Mucho más que café</h2>
          <p class="cafe-valor-lead">En Café Etrusca te ofrecemos cafés pensados para tu negocio, con calidad, constancia y el respaldo que necesitas para crecer y sorprender a tus clientes.</p>
          <div class="ins-lines cafe-valor-grid">
            @for (b of cafeBenefits; track b.title) {
              <article class="ins-line">
                <span class="cafe-valor-icon" [attr.data-tone]="b.tone" aria-hidden="true"><img [src]="b.icon" alt="" width="44" height="44" loading="lazy" decoding="async"></span>
                <h3>{{ b.title }}</h3>
                <p>{{ b.text }}</p>
              </article>
            }
          </div>
          <app-scroll-wave class="cafe-valor-wave" position="bottom" [compact]="true" fillColor="#ffffff"></app-scroll-wave>
        </section>

        <section class="ins-section ins-inspira" id="inspirate" aria-labelledby="cafe-inspira-title">
          <h2 class="section-title-center" id="cafe-inspira-title">Inspírate con nuestro café</h2>
          <div class="row g-4 justify-content-center mt-3 inspira-recipes cafe-inspira-recipes">
            @for (r of cafeRecipes; track r.slug; let i = $index) {
              <app-recipe-card [recipe]="r" [index]="i"></app-recipe-card>
            }
          </div>
          <p class="cafe-extra-actions">
            <a class="btn-catalog" routerLink="/recetas">Ver recetas</a>
          </p>
        </section>
      }

      @if (hubKey === 'cafe') {
        <div class="hub-cta-wave">
          <app-scroll-wave position="top" [compact]="true" fillColor="#ffffff"></app-scroll-wave>
          <app-insumos-cta></app-insumos-cta>
        </div>
      } @else {
        <app-insumos-cta></app-insumos-cta>
      }
    </div>
  `,
  styles: [`
    /* cafe-blob: mismo blob que el hero de jarabes */
    .hub-hero-blob {
      position: absolute; right: 0; bottom: 0;
      height: min(94%, 760px); width: auto; max-width: 62%;
      object-fit: contain; object-position: right bottom;
      z-index: 2; pointer-events: none; user-select: none;
    }
    .hub-hero .ins-hero-copy { position: relative; z-index: 3; }
    @media (max-width: 800px) {
      .hub-hero-blob { height: auto; max-height: 52%; max-width: 92%; }
    }

    /* Hero de Cafe: mismo patron que Accesorios (foto a sangre + ola compacta). Sin velo crema ni recorte. */
    .hub-cafe .hub-hero.hub-hero-photo {
      position: relative;
      isolation: isolate;
      overflow: hidden;
      background: #ffffff;
      background-image: none;
      grid-template-columns: 1fr;
      align-items: start;
    }
    .hub-cafe .hub-hero__bg {
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }
    .hub-cafe .hub-hero__bg img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }
    .hub-cafe .hub-hero.hub-hero-photo app-scroll-wave {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      pointer-events: none;
    }
    .hub-cafe .hub-hero.hub-hero-photo .ins-hero-copy {
      position: relative;
      z-index: 3;
    }
    /* Halo claro (como Accesorios) + degradado suave solo detras del texto, no sobre toda la foto ni la ola. */
    .hub-cafe .hub-hero.hub-hero-photo .ins-hero-copy h1,
    .hub-cafe .hub-hero.hub-hero-photo .ins-hero-copy .lead,
    .hub-cafe .hub-hero.hub-hero-photo .ins-hero-copy .body,
    .hub-cafe .hub-hero.hub-hero-photo .ins-hero-copy ::ng-deep .tor-crumbs,
    .hub-cafe .hub-hero.hub-hero-photo .ins-hero-copy ::ng-deep .tor-crumbs a {
      text-shadow: 0 0 10px rgba(250, 235, 219, 0.9), 0 0 2px rgba(250, 235, 219, 0.9);
    }
    .hub-cafe .hub-hero.hub-hero-photo .ins-hero-copy::before {
      content: '';
      position: absolute;
      z-index: -1;
      inset: -1.4rem -2.4rem -1.6rem -2rem;
      border-radius: 32px;
      background: radial-gradient(ellipse at 28% 40%, rgba(250, 235, 219, 0.86) 0%, rgba(250, 235, 219, 0.48) 48%, rgba(250, 235, 219, 0) 76%);
      pointer-events: none;
    }
    @media (min-width: 1024px) {
      .hub-cafe .hub-hero.hub-hero-photo {
        min-height: min(830px, calc(100vw * 830 / 1440));
        padding: 3.75rem clamp(1.2rem, 3.8vw, 3.44rem) 11.875rem;
      }
    }
    @media (max-width: 800px) {
      .hub-cafe .hub-hero__bg img { object-position: center 42%; }
      .hub-cafe .hub-hero.hub-hero-photo app-scroll-wave ::ng-deep .scroll-wave-divider.compact svg { height: 56px; }
    }

    /* hub-h2-home-sep */
    .ins-section > h2 {
      margin: 0 0 0.35rem;
      font-weight: 700;
      font-size: 2.2rem;
      letter-spacing: normal;
      text-transform: none;
      color: var(--etrusca-navy-900, #283039);
      line-height: 1.15;
      text-align: center;
    }
    .ins-section > h2::after {
      content: "";
      display: block;
      width: min(549px, 80%);
      height: 30px;
      margin: 0.35rem auto 1.6rem;
      background: url('https://imagenes.cafeetrusca.com/corporativo/assets/images/separador.webp') center / contain no-repeat;
    }

    .hub-subcats {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1rem;
    }
    .hub-subcat {
      display: flex;
      gap: 1rem;
      align-items: center;
      text-decoration: none;
      color: inherit;
      background: #f7f3ec;
      border: 1.5px solid #eadcc8;
      border-radius: 22px;
      padding: 1.15rem 1.2rem;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .hub-subcat.is-active {
      border-color: var(--etrusca-navy-900, #283039);
      box-shadow: 0 0 0 2px var(--etrusca-navy-900, #283039) inset;
    }
    .hub-subcat:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px rgba(20, 17, 14, 0.08);
      color: inherit;
    }
    .hub-subcat img {
      width: 84px;
      height: 84px;
      object-fit: contain;
      flex: 0 0 auto;
      border-radius: 50%;
      background: #e8e8e8;
      padding: 14px;
      box-sizing: border-box;
    }
    .hub-subcat:nth-child(1) img { background: #f6e27a; }
    .hub-subcat:nth-child(2) img { background: #ffd19a; }
    .hub-subcat:nth-child(3) img { background: #c6f08a; }
    .hub-subcat strong {
      display: block;
      font-weight: 900;
      font-size: 1.15rem;
      color: var(--etrusca-navy-900, #283039);
      margin-bottom: 0.25rem;
    }
    .hub-subcat span {
      display: block;
      font-size: 0.95rem;
      line-height: 1.4;
      color: rgba(20, 17, 14, 0.75);
    }
    .cafe-extra-text,
    .cafe-valor-lead {
      margin: 0 auto 1.25rem;
      max-width: 46rem;
      text-align: center;
      font-size: 1.05rem;
      line-height: 1.5;
      color: #3d342c;
    }
    .cafe-extra-actions {
      margin: 0 0 0.5rem;
      text-align: center;
    }
    .cafe-valor-grid {
      margin-top: 0.4rem;
    }
    .cafe-valor-grid .ins-line h3 {
      text-transform: none;
      letter-spacing: normal;
    }
    @media (max-width: 640px) {
      .hub-subcats { grid-template-columns: 1fr; }
    }
    /* ===== rediseno-cafe-2026-11-11: variante café según mockup (solo .hub-cafe) ===== */
    .hub-cafe .cta-arrow { display: inline-block; margin-left: 0.55rem; transition: transform 0.18s ease; }
    .hub-cafe a:hover .cta-arrow, .hub-cafe a:focus-visible .cta-arrow { transform: translateX(3px); }
    .hub-cafe a:focus-visible { outline: 3px solid #192966; outline-offset: 3px; }
    .hub-cafe .hub-hero .btn-catalog { padding: 0.9rem 1.7rem; }

    /* H2: se usa el estándar global h2.section-title-center (mayúsculas + separador del sitio) */
    /* Chips pastel (Premium amarillo, Especialidad turquesa, Verde rosa) */
    .hub-cafe ::ng-deep .cafe-nav .cafe-cat-premium .ins-cat-icon { background: #f6e27a !important; }
    .hub-cafe ::ng-deep .cafe-nav .cafe-cat-especialidad .ins-cat-icon { background: #8fe8f4 !important; }
    .hub-cafe ::ng-deep .cafe-nav .cafe-cat-verde .ins-cat-icon { background: #ffc2e0 !important; }
    .hub-cafe ::ng-deep .cafe-nav .ins-cat { width: 108px; }
    .hub-cafe ::ng-deep .cafe-nav .ins-cat-icon { width: 92px; height: 92px; box-shadow: 0 8px 18px rgba(7, 12, 59, 0.08); }
    .hub-cafe ::ng-deep .cafe-nav .ins-cat-label { color: #070c3b; }
    .hub-cafe ::ng-deep .cafe-nav { gap: 1.2rem 2.6rem; }

    /* Cards de líneas de café */
    .cafe-lines {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1.4rem;
      max-width: 1180px;
      margin: 0 auto;
    }
    .cafe-line {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      min-height: 360px;
      padding: 1.6rem 1.5rem 1.4rem;
      border-radius: 28px;
      background: #f6e27a;
      color: #070c3b;
      text-decoration: none;
      overflow: hidden;
      transition: transform 0.18s ease, box-shadow 0.18s ease;
    }
    .cafe-line[data-tone='cyan'] { background: #8fe8f4; }
    .cafe-line[data-tone='lime'] { background: #dff08a; }
    .cafe-line:hover, .cafe-line:focus-visible {
      color: #070c3b;
      transform: translateY(-3px);
      box-shadow: 0 16px 30px rgba(7, 12, 59, 0.12);
    }
    .cafe-line-head { display: flex; align-items: center; gap: 0.85rem; }
    .cafe-line-icon {
      flex: 0 0 auto;
      width: 62px; height: 62px;
      border-radius: 50%;
      background: #fff;
      display: grid; place-items: center;
    }
    .cafe-line-icon img { width: 34px; height: 40px; object-fit: contain; }
    .cafe-line strong { font-weight: 800; font-size: 1.3rem; line-height: 1.15; }
    .cafe-line-desc { font-size: 0.98rem; line-height: 1.5; color: #1d2240; max-width: 22rem; }
    .cafe-line-foot {
      margin-top: auto;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 0.8rem;
    }
    .cafe-line-shot {
      width: auto; height: 170px; max-width: 70%;
      object-fit: contain; object-position: left bottom;
      filter: drop-shadow(0 12px 16px rgba(7, 12, 59, 0.18));
      margin-bottom: -0.4rem;
    }
    .cafe-line-go {
      flex: 0 0 auto;
      width: 52px; height: 52px;
      border-radius: 50%;
      background: #111;
      color: #fff;
      display: grid; place-items: center;
      font-size: 1.35rem; font-weight: 700;
      transition: transform 0.18s ease;
    }
    .cafe-line:hover .cafe-line-go, .cafe-line:focus-visible .cafe-line-go { transform: translateX(3px); }

    /* Banda vino de temporada */
    .cafe-season {
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      align-items: center;
      gap: 1.5rem;
      max-width: 1100px;
      margin: 0.4rem auto 0;
      background: #6e1f3a;
      color: #fff;
      border-radius: 32px;
      overflow: hidden;
      padding: 1.6rem clamp(1.2rem, 4vw, 3rem);
      position: relative;
    }
    .cafe-season::after {
      content: "";
      position: absolute; right: -60px; top: -60px;
      width: 220px; height: 220px; border-radius: 50%;
      background: rgba(255, 255, 255, 0.06);
      pointer-events: none;
    }
    .cafe-season-media { display: flex; justify-content: center; }
    .cafe-season-media img {
      width: min(100%, 320px);
      height: auto;
      aspect-ratio: 1 / 1;
      object-fit: contain;
      object-position: center;
      border-radius: 20px;
      filter: drop-shadow(0 18px 24px rgba(0, 0, 0, 0.3));
    }
    .cafe-season-copy { position: relative; z-index: 1; }
    .cafe-season-title {
      margin: 0 0 1rem;
      font-weight: 800;
      font-size: clamp(1.7rem, 3vw, 2.4rem);
      line-height: 1.1;
      color: #fff;
    }
    .cafe-season-tag {
      display: inline-flex; align-items: center; gap: 0.6rem;
      margin: 0 0 1.3rem;
      background: #f4eee4;
      color: #070c3b;
      font-weight: 700;
      border-radius: 14px;
      padding: 0.6rem 1rem;
    }
    .cafe-season-tag img { width: 28px; height: 28px; object-fit: contain; }
    .cafe-season-btn {
      display: inline-flex; align-items: center; justify-content: center;
      background: #fff;
      color: #6e1f3a;
      font-weight: 800;
      border-radius: 999px;
      padding: 0.85rem 1.6rem;
      text-decoration: none;
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    }
    .cafe-season-btn:hover, .cafe-season-btn:focus-visible {
      color: #6e1f3a;
      transform: translateY(-1px);
      box-shadow: 0 10px 22px rgba(0, 0, 0, 0.25);
    }
    .hub-cafe .cafe-season a:focus-visible { outline-color: #fff; }

    /* Sección lavanda con ondas */
    .cafe-valor {
      position: relative;
      background: #ebe8fb;
      padding-top: 150px !important;
      padding-bottom: 150px !important;
      margin-top: 2.5rem;
    }
    .cafe-valor-wave { position: static; }
    .cafe-valor .cafe-valor-grid { max-width: 1180px; margin-left: auto; margin-right: auto; }
    .cafe-valor .ins-line {
      background: #fff;
      border: 0;
      border-radius: 24px;
      box-shadow: 0 12px 26px rgba(7, 12, 59, 0.07);
      padding: 1.5rem 1.3rem;
      text-align: left;
      transition: transform 0.18s ease;
    }
    .cafe-valor .ins-line:hover { transform: translateY(-2px); }
    .cafe-valor .ins-line h3 { font-weight: 800; font-size: 1.1rem; color: #070c3b; }
    .cafe-valor-icon {
      width: 64px; height: 64px;
      border-radius: 50%;
      display: grid; place-items: center;
      margin-bottom: 0.9rem;
      background: #f6e27a;
    }
    .cafe-valor-icon[data-tone='cyan'] { background: #c8f4f7; }
    .cafe-valor-icon[data-tone='pink'] { background: #ffd6e8; }
    .cafe-valor-icon[data-tone='lime'] { background: #e9f5b0; }
    .cafe-valor-icon[data-tone='yellow'] { background: #fbefb5; }
    .cafe-valor-icon img { width: 40px; height: 40px; object-fit: contain; }

    /* Inspírate: cards de receta del sitio (app-recipe-card), 3 por fila en escritorio y 1 en móvil */
    .cafe-inspira-recipes { max-width: 1080px; margin-left: auto; margin-right: auto; margin-bottom: 1.6rem; }
    .cafe-inspira-recipes ::ng-deep .recipe-item { flex: 0 0 auto; width: 100%; max-width: 420px; margin-bottom: 1.4rem; }
    .cafe-inspira-recipes ::ng-deep .recipe-sub { max-width: 300px; margin-left: auto; margin-right: auto; }
    @media (min-width: 768px) {
      .cafe-inspira-recipes ::ng-deep .recipe-item { width: 33.3333%; max-width: none; margin-bottom: 0; }
    }

    /* Banda de asesoría con onda superior */
    .hub-cta-wave { position: relative; }
    .hub-cta-wave ::ng-deep .ins-cta-band { padding-top: 150px; padding-bottom: 4.5rem; }
    .hub-cta-wave ::ng-deep .ins-cta-band .card { border-radius: 32px; padding: 2.6rem 2rem; }

    @media (max-width: 1100px) {
      .cafe-lines { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 800px) {
      .cafe-season { grid-template-columns: 1fr; text-align: center; padding: 1.6rem 1.2rem 2rem; }
      .cafe-season-media img { height: 220px; }
      .cafe-season-btn { width: 100%; }
      .cafe-valor { padding-top: 110px !important; padding-bottom: 110px !important; }
      .hub-cta-wave ::ng-deep .ins-cta-band { padding-top: 110px; }
    }
    @media (max-width: 640px) {
      .cafe-lines { grid-template-columns: 1fr; }
      .cafe-line { min-height: 0; }
      .hub-cafe .hub-hero .btn-catalog { width: 100%; }
      .hub-cafe ::ng-deep .cafe-nav { gap: 1rem 1.2rem; }
    }
    @media (prefers-reduced-motion: reduce) {
      .cafe-line, .cafe-line-go, .cta-arrow, .cafe-season-btn { transition: none; }
    }

  `],
  styleUrls: ['../../insumos-theme.scss']
})
export class ProductHubPageComponent {
  title = 'Productos';
  lead = '';
  img = `/assets/images/insumos/cafe-bag-sin-fondo.webp`;
  heroBg = '#f4eee4';
  hubKey = '';
  subcats: HubSubcat[] = [];
  activeLink = '';
  crumbs: HeroCrumb[] = [];
  protected readonly assetsBase = ASSETS_BASE_URL;
  /** Foto a sangre del hero de Cafe (mismo patron que Accesorios). */
  readonly cafeHero = {
    desktop: `${ASSETS_BASE_URL}/images/cafe/hero-cafe-cereza-verde-2026.webp`,
    mobile: `${ASSETS_BASE_URL}/images/cafe/hero-cafe-cereza-verde-2026-movil.webp`
  };
  readonly cafeBenefits = [
    { title: 'Origen y selección', text: 'Cafés de regiones reconocidas, cuidadosamente seleccionados por su calidad y perfil en taza.', icon: `${ASSETS_BASE_URL}/images/insumos/icon-medal.webp`, tone: 'yellow' },
    { title: 'Consistencia para tu barra', text: 'Perfiles estables y confiables que garantizan la misma calidad en cada servicio.', icon: `${ASSETS_BASE_URL}/images/insumos/icon-trust.webp`, tone: 'cyan' },
    { title: 'Versatilidad en preparaciones', text: 'Gran desempeño en espresso, filtrados y bebidas con leche, para un menú más completo.', icon: `${ASSETS_BASE_URL}/images/insumos/icon-heart.webp`, tone: 'pink' },
    { title: 'Apoyo para crear tu menú', text: 'Opciones y perfiles que te permiten diseñar bebidas clásicas y de autor.', icon: `${ASSETS_BASE_URL}/images/insumos/icon-idea.webp`, tone: 'lime' }
  ];
  /**
   * "Inspírate con nuestro café": 3 recetas reales del recetario (recetas.data.ts) de tipo café
   * (recetas-listado.config.ts), populares y de temporada invernal; se muestran con <app-recipe-card>.
   */
  readonly cafeRecipes: Recipe[] = ['pan-de-jengibre-latte', 'caramelo-navideno-caliente', 'cerveza-navidena']
    .map((slug) => recipeBySlug(slug))
    .filter((r): r is Recipe => !!r && r.published);

  private seo = inject(SeoService);

  constructor(route: ActivatedRoute) {
    const key = route.snapshot.data['hub'] as string;
    this.hubKey = key;
    const map: Record<string, { title: string; lead: string; img: string; heroBg: string }> = {
      cafe: {
        title: 'CAFÉ',
        lead: 'Perfiles que despiertan los sentidos.',
        img: `/assets/images/insumos/cafe-bag-sin-fondo.webp`,
        heroBg: '#f4eee4'
      },
      accesorios: {
        title: 'ACCESORIOS',
        lead: 'Herramientas para preparar, medir, servir y mantener tu barra.',
        img: `${ASSETS_BASE_URL}/images/insumos/hero-products-left.webp`,
        heroBg: '#283039'
      },
      maquinas: {
        title: 'MÁQUINAS',
        lead: 'Rendimiento y tecnología para tu operación.',
        img: `${ASSETS_BASE_URL}/images/insumos/baristas.webp`,
        heroBg: '#f4eee4'
      }
    };
    const v = map[key];
    if (v) {
      this.title = v.title;
      this.lead = v.lead;
      this.img = v.img;
      this.heroBg = v.heroBg;
    }

    if (key === 'cafe') {
      this.subcats = [
        {
          title: 'Café Premium',
          desc: 'Línea confiable y balanceada para espresso, leche y menú diario.',
          link: '/productos/cafe/premium',
          icon: `${ASSETS_BASE_URL}/images/cafe/nav/premium.webp`,
          shot: `${ASSETS_BASE_URL}/images/cafe/premium/bag-main.webp`,
          tone: 'yellow'
        },
        {
          title: 'Café de especialidad',
          desc: 'Barista Champ: orígenes mexicanos con trazabilidad y más de 80 puntos SCA.',
          link: '/productos/cafe/especialidad',
          icon: `${ASSETS_BASE_URL}/images/cafe/nav/especialidad.webp`,
          shot: `${ASSETS_BASE_URL}/images/cafe/especialidad/hero-bags.webp`,
          tone: 'cyan'
        },
        {
          title: 'Café en verde',
          desc: 'Materia prima con trazabilidad y control de calidad para tueste.',
          link: '/productos/cafe/verde',
          icon: `${ASSETS_BASE_URL}/images/cafe/nav/verde.webp`,
          shot: `${ASSETS_BASE_URL}/images/cafe/verde/value.webp`,
          tone: 'lime'
        }
      ];
    }

    if (key === 'accesorios') {
      this.subcats = [
        {
          title: 'Barista y Espresso',
          desc: 'Herramientas para un espresso perfecto.',
          link: '/accesorios-para-poner-una-cafeteria/barista-espresso',
          icon: `${ASSETS_BASE_URL}/images/accesorios/nav/barista-espresso.webp`
        },
        {
          title: 'Método de extracción',
          desc: 'Elementos para métodos manuales.',
          link: '/accesorios-para-poner-una-cafeteria/metodo-extraccion',
          icon: `${ASSETS_BASE_URL}/images/accesorios/nav/metodo-extraccion.webp`
        },
        {
          title: 'Té y servicio',
          desc: 'Accesorios para disfrutar cada infusión.',
          link: '/accesorios-para-poner-una-cafeteria/te-servicio',
          icon: `${ASSETS_BASE_URL}/images/accesorios/nav/te-servicio.webp`
        },
        {
          title: 'Bebidas frías y Complementos',
          desc: 'Soluciones para bebidas frías y creativas.',
          link: '/accesorios-para-poner-una-cafeteria/bebidas-frias',
          icon: `${ASSETS_BASE_URL}/images/accesorios/nav/bebidas-frias.webp`
        },
        {
          title: 'Catación y medición',
          desc: 'Precisión para mejores resultados.',
          link: '/accesorios-para-poner-una-cafeteria/catacion-medicion',
          icon: `${ASSETS_BASE_URL}/images/accesorios/nav/catacion-medicion.webp`
        },
        {
          title: 'Limpieza y mantenimiento',
          desc: 'Cuida tu equipo y alarga su vida útil.',
          link: '/accesorios-para-poner-una-cafeteria/limpieza',
          icon: `${ASSETS_BASE_URL}/images/accesorios/nav/limpieza.webp`
        }
      ];
    }

    const seoMap: Record<string, { title: string; description: string; keywords: string }> = {
      cafe: {
        title: 'Mezclas especiales y café de especialidad | Café Etrusca',
        description:
          'Cafés especiales de alta calidad, de buenas prácticas agrícolas, procesos muy bien cuidados y de trabajo directo en campo junto con los productores.',
        keywords: 'Café,Premium,Mezcla,Especial,cafeteria,cafe puro,tueste'
      },
      accesorios: {
        title: 'Accesorios para poner una cafetería - Encuentra todo lo que necesitas',
        description:
          'Accesorios para poner una cafetería: En Etrusca encontrarás todo lo que necesitas para poner, renovar o innovar en tu negocio de cafetería',
        keywords: 'Accesorios para poner una cafetería, equipo para barista, jarras, molinos, Café Etrusca'
      },
      maquinas: {
        title: 'Máquina y Equipo para poner una cafetería - Encuentra todo lo que necesitas',
        description:
          'Máquina y Equipo para poner una cafetería: En Etrusca encontrarás todo lo que necesitas para poner, renovar o innovar en tu negocio de cafetería',
        keywords: 'Máquina y Equipo para poner una cafetería, cafeteria,como iniciar una cafeteria,como poner una cafeteria'
      }
    };
    const seo = seoMap[key];
    const hubTitle = this.title;
    const hubLead = this.lead;
    // The component is reused between /accesorios-para-poner-una-cafeteria/:slug pages: react to the param.
    route.paramMap.subscribe((params) => {
      const slug = params.get('slug') || '';
      const sub = key === 'accesorios' && slug ? this.subcats.find((s) => s.link.endsWith('/' + slug)) : undefined;
      const subSeo = sub ? ACCESORIOS_SUBCAT_SEO[slug] : undefined;
      this.activeLink = sub ? sub.link : '';
      const hubPath = key === 'cafe' ? '/productos/cafe' : '';
      const hubLabel = key === 'cafe' ? 'Café' : '';
      this.crumbs = hubPath ? [{ label: 'Inicio', path: '/' }, { label: 'Insumos y equipo para cafeterías', path: '/insumos-y-equipo-para-cafeterias' }, { label: hubLabel, path: hubPath }] : [];
      this.title = sub ? sub.title.toUpperCase() : hubTitle;
      this.lead = sub ? sub.desc : hubLead;
      const meta = subSeo || seo;
      if (meta) {
        this.seo.set({
          ...meta,
          image: this.img,
          ...(this.crumbs.length ? { jsonLd: () => [breadcrumbJsonLd(this.crumbs)] } : {})
        });
      }
    });
  }
}
