import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ScrollWaveComponent } from '../../../../../shared/ui/scroll-wave/scroll-wave.component';
import { SeoService } from '../../../../../shared/kernel/services/seo.service';

export type CafeSlug = 'premium' | 'verde' | 'especialidad';

export interface CafePageContent {
  slug: CafeSlug;
  theme: 'premium' | 'verde' | 'especialidad';
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  seoImage: string;
}

const WA = 'https://wa.me/525541668777';

@Component({
  selector: 'app-cafe-category-page',
  standalone: true,
  imports: [RouterLink, ScrollWaveComponent],
  templateUrl: './cafe-category-page.component.html',
  styleUrls: ['../../cafe-theme.scss']
})
export class CafeCategoryPageComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private seo = inject(SeoService);
  private sub?: Subscription;

  readonly wa = WA;

  slug: CafeSlug | null = null;

  private readonly pages: Record<CafeSlug, CafePageContent> = {
    premium: {
      slug: 'premium',
      theme: 'premium',
      seoTitle: 'Café Premium | Mezclas especiales para cafeterías | Café Etrusca',
      seoDescription:
        'Línea confiable y balanceada de Café Premium Etrusca: perfiles consistentes para espresso y leche, presentaciones listas para tu menú y mezclas especiales.',
      seoKeywords: 'Café Premium, mezcla especial, espresso, cafetería, Café Etrusca, tueste medio',
      seoImage: '/assets/images/cafe/premium/hero-composition.png'
    },
    verde: {
      slug: 'verde',
      theme: 'verde',
      seoTitle: 'Café en verde | Materia prima con trazabilidad | Café Etrusca',
      seoDescription:
        'Café en verde de Café Etrusca: materia prima con trazabilidad, control de calidad y perfiles listos para tueste profesional.',
      seoKeywords: 'Café verde, café en verde, trazabilidad, tostadores, Café Etrusca',
      seoImage: '/assets/images/cafe/verde/hero.png'
    },
    especialidad: {
      slug: 'especialidad',
      theme: 'especialidad',
      seoTitle: 'Café de especialidad Barista Champ | Café Etrusca',
      seoDescription:
        'Barista Champ, café de especialidad mexicano: orígenes de Chiapas, Veracruz, Puebla, Hidalgo y Nayarit, con trazabilidad, procesos cuidados y más de 80 puntos SCA.',
      seoKeywords:
        'café de especialidad,Barista Champ,café mexicano,SCA,finca pajaritos,café Veracruz,café Puebla,Café Etrusca',
      seoImage: '/assets/images/cafe/especialidad/hero-bags.webp'
    }
  };

  get content(): CafePageContent | null {
    return this.slug ? this.pages[this.slug] : null;
  }

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe((params) => {
      const raw = (params.get('slug') || '').toLowerCase();
      if (raw !== 'premium' && raw !== 'verde' && raw !== 'especialidad') {
        this.router.navigate(['/productos/cafe']);
        return;
      }
      this.slug = raw as CafeSlug;
      const page = this.pages[raw];
      this.seo.set({
        title: page.seoTitle,
        description: page.seoDescription,
        keywords: page.seoKeywords,
        image: page.seoImage,
        canonical: 'https://cafeetrusca.com/productos/cafe/' + raw
      });
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}