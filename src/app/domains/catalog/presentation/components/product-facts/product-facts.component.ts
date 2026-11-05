import { Component, Input } from '@angular/core';
import { PRODUCT_FACTS, type ProductFacts } from './product-facts.data';
import { NUTRITION, type ProductNutrition } from './product-nutrition.data';

/**
 * Badges Vegano / Vegetariano + bloque desplegable "Ingredientes y alérgenos" para cards de producto de insumos.
 * Datos: product-facts.data.ts (por clave SAP) + product-nutrition.data.ts (tabla nutrimental de etiqueta).
 * Si la clave no tiene datos, no pinta nada.
 * Guía Lizbeth: Poppins, navy #070C3B/#192966, chips redondeados, texto #283039.
 */
@Component({
  selector: 'app-product-facts',
  standalone: true,
  template: `
    @if (facts || nutri) {
      <div class="pf">
        @if (facts?.vg === 'SI' || facts?.vt === 'SI') {
          <ul class="pf-badges" aria-label="Apto para">
            @if (facts?.vg === 'SI') { <li class="pf-badge pf-vegan">Vegano</li> }
            @if (facts?.vt === 'SI') { <li class="pf-badge pf-veg">Vegetariano</li> }
          </ul>
        }
        @if (showPortions && nutri?.por) { <p class="pf-por">{{ nutri!.por }}</p> }
        <details class="pf-details" [open]="open">
          <summary>{{ facts ? 'Ingredientes, alérgenos y tabla nutrimental' : 'Tabla nutrimental' }}</summary>
          @if (facts; as f) {
            <p class="pf-allergens"><strong>Alérgenos:</strong> {{ allergens(f) }}</p>
            @for (p of paragraphs(f); track $index) { <p class="pf-ingr">{{ p }}</p> }
          }
          @if (nutri; as n) {
            <div class="pf-nutri">
              <p class="pf-nutri__title">Declaración nutrimental</p>
              @if (n.te) { <p class="pf-nutri__te">Contenido energético del envase: {{ n.te }}</p> }
              <table class="pf-nutri__table">
                @if (n.b) { <caption>Por {{ n.b }}</caption> }
                <tbody>
                  @if (n.e) { <tr class="pf-e"><th scope="row">Contenido energético</th><td>{{ n.e }}</td></tr> }
                  @if (n.p) { <tr><th scope="row">Proteínas</th><td>{{ n.p }}</td></tr> }
                  @if (n.g) { <tr><th scope="row">Grasas totales</th><td>{{ n.g }}</td></tr> }
                  @if (n.gs) { <tr class="sub"><th scope="row">Grasas saturadas</th><td>{{ n.gs }}</td></tr> }
                  @if (n.gt) { <tr class="sub"><th scope="row">Grasas trans</th><td>{{ n.gt }}</td></tr> }
                  @if (n.hc) { <tr><th scope="row">Hidratos de carbono disponibles</th><td>{{ n.hc }}</td></tr> }
                  @if (n.az) { <tr class="sub"><th scope="row">Azúcares</th><td>{{ n.az }}</td></tr> }
                  @if (n.aa) { <tr class="sub"><th scope="row">Azúcares añadidos</th><td>{{ n.aa }}</td></tr> }
                  @if (n.f) { <tr><th scope="row">Fibra dietética</th><td>{{ n.f }}</td></tr> }
                  @if (n.na) { <tr><th scope="row">Sodio</th><td>{{ n.na }}</td></tr> }
                </tbody>
              </table>
            </div>
          }
        </details>
      </div>
    }
  `,
  styles: [`
    :host { display: block; }
    .pf { margin: .35rem 0 .5rem; font-family: 'Poppins', system-ui, sans-serif; }
    .pf-badges { list-style: none; margin: 0 0 .45rem; padding: 0; display: flex; flex-wrap: wrap; gap: .35rem; }
    .pf-badge { display: inline-flex; align-items: center; gap: .3rem; padding: .18rem .7rem; border-radius: 999px; font-size: .74rem; font-weight: 700; letter-spacing: .02em; line-height: 1.4; }
    .pf-badge::before { content: ''; width: .45rem; height: .45rem; border-radius: 50%; background: currentColor; }
    .pf-vegan { background: #e4f4d6; color: #3d6b12; }
    .pf-veg { background: #e8ebf7; color: #192966; }
    .pf-por { margin: 0 0 .4rem; font-size: .78rem; font-weight: 600; color: #192966; }
    .pf-details { border-top: 1px solid #eef0f2; padding-top: .35rem; }
    .pf-details summary { cursor: pointer; list-style: none; font-size: .82rem; font-weight: 700; color: #283039; display: flex; align-items: center; gap: .4rem; }
    .pf-details summary::-webkit-details-marker { display: none; }
    .pf-details summary::after { content: '+'; display: grid; place-items: center; width: 1.15rem; height: 1.15rem; border-radius: 50%; background: #e8ebf7; color: #192966; font-weight: 900; font-size: .8rem; flex: none; }
    .pf-details[open] summary::after { content: '-'; }
    .pf-details summary:focus-visible { outline: 2px solid #192966; outline-offset: 2px; border-radius: 6px; }
    .pf-details p { margin: .45rem 0 0; font-size: .78rem; line-height: 1.5; color: #4a525c; }
    .pf-allergens strong { color: #283039; }
    .pf-nutri { margin-top: .6rem; border: 1.5px solid #283039; border-radius: 10px; padding: .45rem .6rem .5rem; }
    .pf-details .pf-nutri__title { margin: 0; font-size: .78rem; font-weight: 800; color: #070C3B; text-transform: uppercase; letter-spacing: .03em; }
    .pf-details .pf-nutri__te { margin: .2rem 0 0; font-size: .74rem; }
    .pf-nutri__table { width: 100%; border-collapse: collapse; margin-top: .3rem; font-size: .74rem; color: #283039; }
    .pf-nutri__table caption { text-align: left; font-size: .72rem; color: #4a525c; padding-bottom: .15rem; caption-side: top; }
    .pf-nutri__table th { text-align: left; font-weight: 400; padding: .12rem 0; }
    .pf-nutri__table td { text-align: right; font-weight: 600; padding: .12rem 0; white-space: nowrap; }
    .pf-nutri__table tr + tr { border-top: 1px solid #eef0f2; }
    .pf-nutri__table tr.sub th { padding-left: .8rem; font-weight: 600; }
    .pf-nutri__table tr.pf-e th, .pf-nutri__table tr.pf-e td { font-weight: 800; }
  `]
})
export class ProductFactsComponent {
  facts: ProductFacts | null = null;
  nutri: ProductNutrition | null = null;
  /** Solo para pruebas/visualización: abre el desplegable. */
  @Input() open = false;
  /** false donde la página ya muestra porciones/servings (David Rio). */
  @Input() showPortions = true;
  @Input() set code(v: string | null | undefined) {
    const k = (v || '').trim();
    this.facts = (k && PRODUCT_FACTS[k]) || null;
    this.nutri = (k && NUTRITION[k]) || null;
  }

  allergens(f: ProductFacts): string {
    const a = (f.a || '').trim();
    const m = a.match(/^SI\s*\((.+)\)$/i);
    if (m) { const s = m[1].toLowerCase(); return 'Contiene ' + s; }
    if (/^SI$/i.test(a)) return 'Contiene alérgenos (ver ingredientes).';
    if (/^NO$/i.test(a)) return 'No declara alérgenos.';
    return a || 'Sin dato';
  }

  paragraphs(f: ProductFacts): string[] {
    return (f.i || '').split(/\n+/).map((s) => s.trim()).filter(Boolean);
  }
}
