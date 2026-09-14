import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
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
  imports: [ScrollWaveComponent],
  templateUrl: './grinder-slider.component.html',
  styleUrls: ['./grinder-slider.component.scss']
})
export class GrinderSliderComponent implements OnInit {
  @Input({ required: true }) brand!: GrinderBrand;
  @Input() topWave = false;

  private http = inject(HttpClient);
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
