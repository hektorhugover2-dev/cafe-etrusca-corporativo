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
   * Respaldo de "Comprar en línea" (catálogo de la sección, el de "Explora el catálogo"). Con SKU, el modal busca
   * la ficha en la tienda (/api/Product por marca; sólo si hay existencia); si no, abre este catálogo.
   * TODO(contenido): SKU para los modelos que no lo tienen (Reneka, Melitta, licuadoras, Fiorenzato API…).
   */
  @Input() catalogUrl = '';

  private http = inject(HttpClient);
  private buyModal = inject(BuyModalService);
  private cdr = inject(ChangeDetectorRef);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  slides: GrinderSlide[] = [];
  lead = '';
  index = 0;
  colorAt = 0;
  marqueeLoop = [0, 1, 2, 3, 4, 5, 6, 7];

  ngOnInit() {
    this.slides = this.brand.slides;
    this.lead = this.brand.lead;
    if (this.brand.api && this.isBrowser) {
      this.http.get<any[]>(this.brand.api).subscribe({
        next: (data) => {
          const mapped = mapFiorenzatoApi(data);
          if (mapped.length) {
            this.slides = mapped;
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

  /** "Comprar" → modal de compra (en línea / en sucursal). */
  buy(ev: Event) {
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
