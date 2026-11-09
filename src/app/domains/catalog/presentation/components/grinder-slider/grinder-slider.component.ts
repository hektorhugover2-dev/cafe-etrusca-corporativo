import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { BuyModalService } from '../../components/buy-modal/buy-modal.service';
import {
  GrinderBrand,
  GrinderColor,
  GrinderSlide,
  GrinderSpec,
  fiorenzatoLeadFromApi,
  mapFiorenzatoApi
} from '../../grinders.data';

@Component({
  selector: 'app-grinder-slider',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './grinder-slider.component.html',
  styleUrls: ['./grinder-slider.component.scss']
})
export class GrinderSliderComponent implements OnInit {
  @Input({ required: true }) brand!: GrinderBrand;
  @Input() hideLogo = false;
  /**
   * Respaldo de "Comprar en línea" (catálogo de la sección). Con SKU, el modal busca
   * la ficha en la tienda; si no, abre este catálogo.
   */
  @Input() catalogUrl = '';
  /** Marca fuera de catálogo: oculta Comprar y muestra aviso + CTAs de asesoría. */
  @Input() discontinued = false;

  private http = inject(HttpClient);
  private buyModal = inject(BuyModalService);
  private cdr = inject(ChangeDetectorRef);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  slides: GrinderSlide[] = [];
  lead = '';
  index = 0;
  colorAt = 0;
  marqueeLoop = [0, 1, 2, 3, 4, 5, 6, 7];

  /** Enlaces a marcas vigentes según la categoría de la marca descontinuada. */
  get altLinks(): Array<{ label: string; href: string }> {
    const id = this.brand?.id || '';
    const cat = this.brand?.categoryId || '';
    if (cat === 'molinos' || ['eureka', 'comandante', 'anfim', 'mahlkonig'].includes(id)) {
      return [
        { label: 'Fiorenzato', href: '/maquinaria-y-equipo-para-cafeterias/molinos' },
        { label: 'Ceado', href: '/maquinaria-y-equipo-para-cafeterias/molinos' }
      ];
    }
    if (cat === 'licuadoras' || id === 'blendtec') {
      return [
        { label: 'Hamilton Beach', href: '/maquinaria-y-equipo-para-cafeterias/licuadoras' }
      ];
    }
    // Melitta / autoservicio: sin alternativa de marca en catálogo; solo asesoría.
    return [];
  }

  ngOnInit() {
    this.discontinued = this.discontinued || !!this.brand.discontinued;
    this.slides = this.brand.slides;
    this.lead = this.brand.lead;
    if (this.brand.api && this.isBrowser) {
      this.http.get<any[]>(this.brand.api).subscribe({
        next: (data) => {
          const mapped = mapFiorenzatoApi(data);
          if (mapped.length) {
            // Conserva slides estáticos de Pietro (sin foto en API de Fiorenzato eléctrica).
            const pietro = this.brand.slides.filter((s) => /pietro/i.test(s.titulo));
            this.slides = [...mapped, ...pietro];
            this.index = 0;
            this.colorAt = 0;
          }
          const lead = fiorenzatoLeadFromApi(data);
          if (lead) this.lead = lead;
          this.cdr.markForCheck();
        },
        error: () => {}
      });
    }
  }

  get slide(): GrinderSlide | null {
    return this.slides[this.index] || null;
  }

  get color(): GrinderColor | null {
    return this.slide?.colores?.[this.colorAt] || this.slide?.colores?.[0] || null;
  }

  get titulo(): string {
    return this.color?.titulo || this.slide?.titulo || '';
  }

  get descripcion(): string {
    return this.color?.descripcion || this.slide?.descripcion || '';
  }

  get sku(): string {
    return this.color?.sku || this.slide?.sku || '';
  }

  get img(): string {
    return this.color?.img || this.slide?.img || '';
  }

  get ficha(): GrinderSpec[] {
    return this.color?.ficha || this.slide?.ficha || [];
  }

  get fichaLeft(): GrinderSpec[] {
    return this.ficha.slice(0, Math.ceil(this.ficha.length / 2));
  }

  get fichaRight(): GrinderSpec[] {
    return this.ficha.slice(Math.ceil(this.ficha.length / 2));
  }

  buy(ev: Event) {
    if (this.discontinued) return;
    const sku = this.sku;
    this.buyModal.open(
      {
        title: this.titulo,
        brand: this.brand.name,
        lookup: sku ? { query: this.brand.name, code: sku } : null,
        fallbackUrl: this.catalogUrl,
        fallbackLabel: 'Catálogo de equipos',
        theme: { btn: this.brand.leadColor || '#070c3b', ink: '#fff' }
      },
      ev
    );
  }

  prev() {
    if (!this.slides.length) return;
    this.index = (this.index - 1 + this.slides.length) % this.slides.length;
    this.colorAt = 0;
  }

  next() {
    if (!this.slides.length) return;
    this.index = (this.index + 1) % this.slides.length;
    this.colorAt = 0;
  }

  pickColor(i: number) {
    this.colorAt = i;
  }
}
